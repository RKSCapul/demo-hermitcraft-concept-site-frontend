<template>
  <q-layout view="lHh LpR lFr">
    <q-toolbar class="font-open-sans">
      <q-btn 
        flat 
        round 
        dense 
        icon="r_menu" 
        @click="leftDrawerOpen = !leftDrawerOpen"
      />
      <q-space />
      <q-btn flat stretch label="Back to demo homescreen" :to="getHomePage()"/>
      <q-btn flat stretch label="Back to post" />
    </q-toolbar>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-grey-1 text-grey"
    >
      <q-list class="text-black">
        <q-item-label
          header 
          class="font-open-sans"
        >
          r.cpl | 2020
        </q-item-label>

        <q-item clickable v-ripple class="text-red-10" :to="getHomePage() + 'livestream'">
          <q-item-section avatar>
            <q-icon color="red-10" name="r_live_tv" />
          </q-item-section>

          <q-item-section class="text-weight-bold text-uppercase">
            Hermitcraft Live
          </q-item-section>
        </q-item>

        <q-expansion-item
          expand-separator
          v-if="hermitsOrganized.active"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon name="r_how_to_reg" />
            </q-item-section>

            <q-item-section class="text-weight-bold text-uppercase">
              Active
            </q-item-section>

            <q-item-section side>
              <div class="row items-center" v-if="displayActiveTwitchStreams()">
                <q-avatar class="color-twitch" size="sm" text-color="white">
                  {{ activeTwitchStreams }}
                </q-avatar>
              </div>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section class="hermit-card-2 font-open-sans">
              <q-list>
                <q-item 
                  v-for="hermit in hermitsOrganized.active" 
                  :key="hermit.channel.youTube"
                  :to="getHomePage() + 'hermit/' + hermit.username"
                  clickable 
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="hermit.accountPicture" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    {{hermit.name}}
                  </q-item-section>
                  <q-item-section side v-if="hermit.livestreams.twitch.isChannelLive">
                    <q-badge class="color-twitch" label="LIVE" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-item v-else>
          <q-item-section>
            <q-skeleton animation="wave" />
          </q-item-section>
        </q-item>

        <q-expansion-item
          expand-separator
          v-if="hermitsOrganized.inactive"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon name="r_person" />
            </q-item-section>

            <q-item-section class="text-weight-bold text-uppercase">
              Inactive
            </q-item-section>
          </template>

          <q-card>
            <q-card-section class="q-pa-none font-open-sans ">
              <q-list>
                <q-item 
                  v-for="hermit in hermitsOrganized.inactive" 
                  :key="hermit.channel.youTube"
                  clickable 
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="hermit.accountPicture" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    {{hermit.name}}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-item v-else>
          <q-item-section>
            <q-skeleton animation="wave" />
          </q-item-section>
        </q-item>

        <q-expansion-item expand-separator>
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon name="r_link" />
            </q-item-section>

            <q-item-section class="text-weight-bold text-uppercase">
              Links
            </q-item-section>
          </template>

          <q-card>
            <q-card-section class="q-pa-none font-open-sans">
              <q-list class="font-open-sans">
                <q-item clickable v-ripple>
                  <q-item-section>Hermitcraft Seeds</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>
                    Hermitcraft Recap
                    <q-item-label class="text-caption">With Pixlriffs &amp; ZloyXP</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>Hermitcraft on Reddit</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>Hermitcraft on Twitter</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>Hermitcraft on Twitch</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item expand-separator>
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon name="r_maps" />
            </q-item-section>

            <q-item-section class="text-weight-bold text-uppercase">
              Maps
            </q-item-section>
          </template>

          <q-card>
            <q-card-section class="hermit-card-2 font-open-sans">
              <q-list class="font-open-sans">
                <q-item clickable v-ripple>
                  <q-item-section>
                    Vanilla Season 1
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>
                    Vanilla Season 2
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>
                    Vanilla Season 3
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="main-container q-pl-lg">
        <q-page-container class="no-padding">
          <router-view />
        </q-page-container>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
  .main-container {
    min-width: 300px;
  }

  .live-on-twitch {
    background-color: red !important;
  }
</style>

<script>
  import {
    fetchChannels, 
    getData 
  } from '../data/api-endpoints.js';

  export default {
    name: 'HermitcraftLayout',

    data () {
      return {
        activeTwitchStreams: 0,
        activeYouTubeStreams: 0,
        leftDrawerOpen: false,
        loadingHermitsComplete: false,
        hermitsOrganized: {},
      }
    },

    created () {
      this.fetchChannelsFromApi();
    },

    methods: {
      externalRedirect(href) {
        window.open(href, '_blank');
      },

      showNotification(name, profile, platform) {
        this.$q.notify({
          message: `${name} is live now on ${platform}!`,
          position: 'top-right',
          classes: `color-${platform.toLowerCase()} font-open-sans`,

          avatar: profile,
          timeout: 10000,
          actions: [
            { label: 'Watch Now!', color: 'white', handler: () => { /* ... */ } },
            { label: 'Watch Later', color: 'white', handler: () => { /* ... */ } }
          ]
        })
      },

      countActiveStreams(item) {
        if (item.livestreams.twitch.isChannelLive) {
          this.activeTwitchStreams++;

          this.showNotification(
            item.name, 
            item.accountPicture,
            'Twitch',
          );
        }

        if (item.livestreams.youtube.isChannelLive) {
          this.activeYouTubeStreams++;
        }
      },

      displayActiveTwitchStreams() {
        return this.activeTwitchStreams || false
      },

      organizeHermits() {
        const _data = getData();
        const { data } = _data;

        let tempHermits = {
          active: [],
          inactive: []
        };

        data.map(item => {
          if (item.status === "active") {
            tempHermits.active.push(item);

            this.countActiveStreams(item);
          } else {
            tempHermits.inactive.push(item);
          }
        });

        this.hermitsOrganized = tempHermits;
        this.loadingHermitsComplete = true;
      },

      fetchChannelsFromApi() {
        fetchChannels().then(() => this.organizeHermits())
      },

      getHomePage() {
        return '/';
      }
    }
  }
</script>
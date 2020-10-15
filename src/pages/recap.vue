<template>
  <div>
    <vue-headful :title="title" />
    <div class="title-header">
      <div class="text-h4 font-montserrat text-uppercase">
        Hermitcraft 
        <span class="font-shadows-into-light text-secondary text-bold">
          Recap
        </span>
      </div>
      <div class="text-h6 font-open-sans text-primary">
        with Pixlriffs &amp; ZloyXP
      </div> 
    </div>

    <div class="q-pr-lg q-ml-md q-pb-lg">
      <div class="row">
        <div class="col-12 col-md-9 col-lg-10 q-mt-md">
          <q-card dark bordered class="bg-primary video-column">
            <q-card-section class="q-pb-none q-mb-none">
              <div class="text-h5">Watch the new recap episode!</div>
            </q-card-section>

            <q-card-section>
              <q-video class="video-section" src="https://www.youtube.com/embed/vAgA7ETU68E" />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-3 col-lg-2 q-mt-md q-ml-sm-lg team-group-column">
          <q-card dark bordered class="bg-grey-9 q-pb-md">
            <q-card-section>
              <div class="text-h5 text-center">Meet the Recap Team</div>
            </q-card-section>
            <q-list :v-if="recapTeamLoaded">
              <q-item 
                v-for="members in recapTeam"
                :key="members.id"
                @click="openChannel(members.channel)"
                clickable 
                v-ripple 
              >
                <q-item-section top avatar>
                  <q-avatar>
                    <img :src="members.accountPicture" />
                  </q-avatar>
                </q-item-section>

                <q-item-section class="q-mt-none">
                  <q-item-label class="text-h6">{{members.member}}</q-item-label>
                  <q-item-label class="text-subtitle1 font-open-sans">{{members.role}}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon :name="fasExternalLink" color="white" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  @import '~quasar-variables' 

  .team-group-column .team-group-column-item
    margin-left: map-get($space-sm, "x")

  .video-column
    margin-right: map-get($space-sm, "x")

  @media (min-width: $breakpoint-xs-min) and (max-width: $breakpoint-sm-max)
    .team-group-column .team-group-column-item
      margin-left: 0

    .video-column
      margin-right: 0
</style>

<style>
  .title-header {
    text-align: center;
  }

  .text-none {
    text-transform: none !important;
  }

  .card-icon-ico {
    font-size: 32px;
  }

  .card-icon-bg {
    min-width: 40px;
    min-height: 40px;
  }

  .my-card {
    width: 100%;
  }

  .video-section {
    height: 56.25vw;
    max-height: 600px;
  }
</style>

<script>
  import { fasExternalLinkAlt } from "@quasar/extras/fontawesome-v5";

  export default {
    name: 'Recap',
    layout: 'HermitcraftLayout',
    
    data () {
      return {
        title: 'The Recap Team | Hermitcraft Concept Redesign | r_coder demo',
        recapTeam: [],
        recapTeamLoaded: false,
        fasExternalLink: fasExternalLinkAlt,
      }
    },

    created () {
      this.recapTeam = [
        {
          id: 1,
          member: "Pixlriffs",
          accountPicture: "https://yt3.ggpht.com/a/AATXAJzuiYwDRraceHykUxRfrlZquCLj1P0WIXJlVxe4=s100-c-k-c0xffffffff-no-rj-mo",
          channel: "https://www.youtube.com/channel/UCgGjBqZZtAjxfpGSba7d6ww",
          role: "Host / Writer",
        },
        {
          id: 2,
          member: "Zloy XP",
          accountPicture: "https://yt3.ggpht.com/a/AATXAJyWnioMNuW0XQAofYZbB66NulRoY5RjoTkAMVjAOQ=s176-c-k-c0x00ffffff-no-rj-mo",
          channel: "https://www.youtube.com/channel/UCvFZqf1gW_XSCZyTku15LSA",
          role: "Video Producer / Writer",
        }
      ];

      this.recapTeamLoaded = true;
    },

    methods: {
      openChannel(url) {
        window.open(url, "_blank");
      }
    }
  }
</script>
<template>
  <div class="main">
    <div class="row" v-if="isComponentLoading">
      <div class="col text-center">
        <div class="text-h5">
          <q-spinner
            color="white"
            class="q-my-md"
            size="2em"
          />
        </div>
      </div>
    </div>
    <div class="row justify-center q-pa-md" v-else>
      <div class="col-xs-12 col-md-3 col-lg-2 text-center profile">
        <div>
          <q-avatar size="100px" class="q-mt-md">
            <img :src="hermit.accountPicture" />
          </q-avatar>
        </div>
        <div class="username q-my-md text-center">
          <div class="text-h4 text-bold">{{hermit.name}}</div>
          <div class="text-h5 text-weight-regular font-open-sans q-mb-md">
            <q-icon 
              :name="icon.youtube"
              :style="'color: ' + colors.youtube"
              class="q-mr-xs"
              size="20px"
            />
            {{hermit.subCount}} subscribers
          </div>
        </div>
      </div>
      <q-space class="gt-sm"/>
      <div class="col-xs-12 col-md-3 socials font-open-sans">
        <q-list dense padding>
          <q-item 
            clickable 
            v-ripple
          >
            <q-item-section avatar>
              <q-icon 
                :name="icon['youtube']"
                :style="'color: ' + colors['youtube']" 
              />
            </q-item-section>
            <q-item-section>
              YouTube
            </q-item-section>
          </q-item>
          <q-item 
            clickable 
            v-ripple
          >
            <q-item-section avatar>
              <q-icon 
                :name="icon['twitch']"
                :style="'color: ' + colors['twitch']" 
              />
            </q-item-section>
            <q-item-section>
              Twitch
            </q-item-section>
          </q-item>
          <q-item 
            clickable 
            v-ripple
          >
            <q-item-section avatar>
              <q-icon 
                :name="icon['twitter']"
                :style="'color: ' + colors['twitter']" 
              />
            </q-item-section>
            <q-item-section>
              Twitter
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  @import '../styles/sass/quasar.variables.sass'  

  @media (max-width: $breakpoint-xs-max)
    .username
      
</style>

<style>
  .header {
    text-align: center;
  }
  
  .main {
    border-radius: 5px;
    background-image: url(https://images.unsplash.com/photo-1593265023836-502b46fd1bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);
  }

  .header .site-logo {
    height: 100px;
    width: 100px;
  }

  .profile, .socials {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.7);
  }

  .username {
    margin-top: auto;
    margin-bottom: auto;
  }
</style>

<script>
  import { 
    fabYoutube,
    fabInstagram,
    fabTwitter,
    fabTwitch,
  } from '@quasar/extras/fontawesome-v5';

  import brandColors from '../data/data-brand-colors.js'

  export default {
    name: 'ProfileSocialsComponent',
    props: [ 'hermit', 'loading' ],
    data () {
      return {
        loading_: false,
        colors: brandColors,
      }
    },

    computed: {
      isComponentLoading() {
        return this.loading;
      },
    },

    watch: {
      loading_: (val) => this.updateLoading(val),
    },

    created () {
      this.icon = {
        twitter: fabTwitter,
        instagram: fabInstagram,
        youtube: fabYoutube,
        twitch: fabTwitch,
      };
    },

    methods: {
      externalRedirect(href) {
        window.open(href, '_blank');
      },

      updateLoading(value) {
        this.loading_ = value
      }
    }
  };
</script>
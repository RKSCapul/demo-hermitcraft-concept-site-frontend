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
    <div class="q-pa-xs" v-else>
      <div class="row justify-start items-center profile q-pa-md">
        <q-avatar :size="$q.screen.lt.md ? '50px' : '100px'">
          <img :src="hermit.accountPicture" />
        </q-avatar>
        <div class="header text-left q-ml-md">
          <span class="youtube-channel">{{hermit.name}}</span>
          <div class="youtube-subscribers font-open-sans">
            <q-icon 
              :name="icon.youtube"
              :style="'color: ' + colors.youtube"
              class="q-mr-xs"
              size="20px"
            />
            {{hermit.subCount}} subscribers
          </div>
        </div>
        <q-space />
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  @import '~quasar-variables' 

  .header .youtube-channel
    font-size: map-get($h4, "size")
    font-weight: 500

  .header .youtube-subscribers
    font-size: map-get($h6, "size")

  @media (min-width: $breakpoint-xs-min) and (max-width: $breakpoint-sm-max)
    .header .youtube-channel
      font-size: map-get($h6, "size")

    .header .youtube-subscribers
      font-size: map-get($body1, "size")  
</style>

<style>
  .main {
    border-radius: 5px;
    background-image: url(https://images.unsplash.com/photo-1593265023836-502b46fd1bda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);
  }

  .profile, .socials {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.7);
  }

  .profile-img {
    border: 3px solid red;
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
    name: 'ProfileHeaderComponent',
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
      this.colors = brandColors
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
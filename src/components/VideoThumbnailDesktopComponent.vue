<template>
  <q-card class="q-my-sm q-pa-xs">
    <q-card-section horizontal>
      <q-card-section class="desktop-thumbnail container">
        <div>
          <img :src="videoData.thumbnail" />
        </div>
      </q-card-section>

      <q-card-section class="q-py-xs desktop-video-data">
        <div class="video-title">{{ videoData.title }}</div>
        <div class="video-statistics font-open-sans">
          <span class="q-mr-sm"><q-icon name="r_visibility" size="20px" /> {{ videoData.statistics.views }}</span>
          <span class="q-mr-sm"><q-icon name="r_thumb_up" size="20px" /> {{ videoData.statistics.likes }}</span>
          <span class="q-mr-sm"><q-icon name="r_chat" size="20px" /> {{ videoData.statistics.comments }}</span>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<style lang="sass">
  @import '~quasar-variables' 
  
  .container
    height: 98px

  .desktop-video-data .video-title
    font-size: map-get($h5, 'size')
    font-weight: 500

  .video-thumbnail-component
    padding: map-get($space-xs, "x")

  @media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-sm-max)
    .video-title
      font-size: map-get($h6, "size")

  @media (min-width: $breakpoint-xs-min) and (max-width: $breakpoint-sm-max)
    .video-thumbnail-component
      padding: 0
</style>

<style>
  .desktop-thumbnail {
    display: block;
    padding-top: 56.25%;
    min-width: 175px;
    margin: 0;
    overflow: hidden;
    border-radius: inherit !important;
  }

  .desktop-thumbnail img {
    position: absolute;
    width: 175px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<script>
  import brandColors from '../data/data-brand-colors.js'

  export default {
    name: 'VideoThumbnailDesktopComponent',
    props: [ 'videoData' ],
    data () {
      return {
        colors: brandColors,
      }
    },

    methods: {
      externalRedirect(href) {
        window.open(href, '_blank');
      },
    }
  };
</script>
<template>
  <q-card class="q-my-sm q-pa-xs">
    <div class="mobile-thumbnail">
      <img 
        :src="videoData.thumbnail" 
        @click="openVideo()"
        class="pointer"
      />
    </div>
    <q-card-section class="q-pa-sm mobile-video-data">
      <div 
        class="video-title q-mb-xs pointer"
        @click="openVideo()"
      >{{ videoData.title }}</div>
      <div class="video-statistics font-open-sans">
        <span class="q-mr-sm"><q-icon name="r_visibility" size="15px" /> {{ videoData.statistics.views }}</span>
        <span class="q-mr-sm"><q-icon name="r_thumb_up" size="15px" /> {{ videoData.statistics.likes }}</span>
        <span class="q-mr-sm"><q-icon name="r_chat" size="15px" /> {{ videoData.statistics.comments }}</span>
      </div>
    </q-card-section>
  </q-card>
</template>

<style lang="sass">
  @import '~quasar-variables' 
  
  .mobile-video-data .video-title
    font-size: map-get($body1, 'size')
    font-weight: 500
    &:hover
      text-decoration: underline

  .mobile-video-data .video-statistics
    font-size: map-get($caption, 'size')
    font-weight: 500
</style>

<style>
  .mobile-thumbnail {
    width: 100%;
    overflow: hidden;
    margin: 0;
    padding-top: 56.25%;
    position: relative;
    border-radius: inherit !important;
  }

  .mobile-thumbnail img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
</style>

<script>
  import brandColors from '../data/data-brand-colors.js'

  export default {
    name: 'VideoThumbnailMobileComponent',
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

      openVideo() {
        this.externalRedirect(`https://youtube.com/watch?v=${this.videoData.id}`);
      },
    }
  };
</script>
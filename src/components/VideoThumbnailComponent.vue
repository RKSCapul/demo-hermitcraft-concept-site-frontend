<template>
  <div>
    <video-thumbnail-mobile-component :videoData="video" v-if="$q.screen.lt.sm" />
    <video-thumbnail-desktop-component :videoData="video" v-else />
  </div>
</template>

<script>
  import VideoThumbnailMobileComponent from './VideoThumbnailMobileComponent.vue'
  import VideoThumbnailDesktopComponent from './VideoThumbnailDesktopComponent.vue'

  export default {
    name: 'VideoThumbnailComponent',
    props: [ 'video' ],
    components: {
      VideoThumbnailMobileComponent,
      VideoThumbnailDesktopComponent,
    }
  };
</script>
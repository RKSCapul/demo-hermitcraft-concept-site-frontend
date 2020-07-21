<template>
  <q-card flat class="q-mb-md">
    <q-card-section class="container" horizontal>
      <q-card-section class="thumbnail">
        <div>
          <img :src="videoData.thumbnail" class="rounded-borders"/>
        </div>
      </q-card-section>

      <q-card-section class="q-py-sm">
        <div class="text-h5 text-bold font-open-sans">{{ videoData.title }}</div>
        <div>

        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<style>
  .container {
    height: 98px;
  }

  .thumbnail {
    display: block;
    padding-top: 56.25%;
    min-width: 175px;
    margin: 0;
    overflow: hidden;
  }

  .thumbnail img {
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
    name: 'VideoThumbnailComponent',
    props: [ 'videoData' ],
    data () {
      return {
        loading_: false,
        colors: brandColors,
      }
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
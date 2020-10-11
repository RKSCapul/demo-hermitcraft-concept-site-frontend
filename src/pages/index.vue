<template>
  <div>
    <vue-headful :title="title" />
    <div class="title-header">
      <div class="text-h4 font-montserrat text-uppercase">
        Recent Uploads
      </div>
    </div>
    <div class="q-pr-lg q-ml-md">
      <div v-if="hermitActiveRecentVideosFetched">
        <div class="row" v-if="hermitActiveRecentVideosLoading">
          <div class="col text-center">
            <q-spinner
              color="primary"
              class="q-my-md"
              size="2em"
            />
          </div>
        </div>
        <div class="row" v-else>
          <div class="col q-mt-md">
            <div class="video-column">
              <video-thumbnail-component
                v-for="videos in mappedHermitActiveRecentVideos"
                :key="videos.id"
                :video="videos"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" v-if="!hermitActiveRecentVideosLoading && hermitActiveRecentVideosFetched">
      <div 
        class="text-h3 font-shadows-into-light text-bold text-grey-6 q-pa-lg q-my-lg"
      >
        Hermitcraft Season 7
      </div>
    </div>
  </div>
</template>

<style>
  .title-header, .footer {
    text-align: center;
  }
</style>

<script>
  import VideoThumbnailComponent from "../components/VideoThumbnailComponent.vue";

  import {
    fetchHermitActiveRecentVideos,
    getHermitActiveRecentVideos
  } from "../data/api/hermits.js";

  export default {
    name: 'Home',
    components: {
      VideoThumbnailComponent,
    },

    data () {
      return {
        title: 'Hermitcraft Concept Redesign | r_coder demo',
        mappedHermitActiveRecentVideos: [],
        hermitActiveRecentVideosLoading: true,
        hermitActiveRecentVideosFetched: true,
      }
    },

    created () {
      this.executeFetchHermitActiveRecentVideos();
    },

    methods: {
      mapHermitActiveRecentVideos() {
        console.log("executing");

        const data = getHermitActiveRecentVideos();

        this.mappedHermitActiveRecentVideos = data;
        this.hermitActiveRecentVideosLoading = false;
      },

      executeFetchHermitActiveRecentVideos() {
        this.hermitActiveRecentVideosFetched = true;
        this.hermitActiveRecentVideosLoading = true;

        fetchHermitActiveRecentVideos()
          .then(() => this.mapHermitActiveRecentVideos())
          .catch(() => this.hermitActiveRecentVideosFetched = false);
      }
    }
  }
</script>
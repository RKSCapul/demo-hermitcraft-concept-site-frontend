<template>
  <div>
    <div class="q-pr-lg q-pb-lg no-wrap q-gutter-md">
      <ProfileSocialsComponent
        :hermit="mappedHermitData[0]" 
        :loading="!dataLoaded"
      />
    </div>
    <div class="q-pr-lg">
      <div class="row" v-if="videosLoaded && dataLoaded">
        <div class="col-8 col-lg-10">
          <div class="q-mr-sm">
            <div class="text-h5 text-bold text-uppercase">Videos</div>
            <q-separator class="q-mt-sm q-mb-md"/>
            <VideoThumbnailComponent 
              v-for="videos in mappedHermitVideos"
              :key="videos.id"
              :videoData="videos"
            />
          </div>
        </div>
        <div class="col-4 col-lg-2">
          <div class="q-ml-sm">
            <div class="text-h5 text-bold text-uppercase">Groups</div>
            <q-separator class="q-my-sm"/>
            <div class="q-mb-sm text-h6">Main</div>
          </div>
        </div>
      </div>
      <div class="row justify-center" v-else>
        <div class="col text-center">
          <div class="text-h5">
            <q-spinner
              color="green-10"
              class="q-my-md"
              size="2em"
            />        
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .title-header {
    text-align: center;
  }

  .text-none {
    text-transform: none !important;
  }

  .my-card {
    width: 100%;
    max-width: 300px;
  }

  .item-caption {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }
</style>

<script>
  import ProfileSocialsComponent from '../components/ProfileSocialsComponent.vue';
  import VideoThumbnailComponent from '../components/VideoThumbnailComponent.vue';

  import { 
    fetchChannel,
    getChannelData,
    fetchChannelVideos,
    getChannelVideos,
  } from '../data/api-endpoints.js'

  export default {
    name: 'IndexDemo',
    props: [ 'username' ],
    components: {
      ProfileSocialsComponent,
      VideoThumbnailComponent
    },
    
    watch: {
      username() {
        this.fetchHermitData(this.username);
        this.fetchHermitVideos(this.username);
      }
    },

    data () {
      return {
        hermitData: [],
        mappedHermitData: [],
        mappedHermitVideos: [],
        dataLoaded: false,
        videosLoaded: false,
        twitchStatTriggered: false,
        rightDrawerOpen: true,
        tab: 'mails'
      }
    },

    created () {
      this.fetchHermitData(this.username);
      this.fetchHermitVideos(this.username);
    },

    methods: {
      getHermitData() {
        const _data = getChannelData();
        const { data } = _data;

        this.mappedHermitData = data;
        this.dataLoaded = true;
      },

      fetchHermitData(username) {
        this.dataLoaded = false;
        fetchChannel(username).then(() => this.getHermitData());
      },

      getHermitVideos() {
        const _data = getChannelVideos();
        const { data } = _data;
        
        this.mappedHermitVideos = data;
        this.videosLoaded = true;
      },

      fetchHermitVideos(username) {
        this.videosLoaded = false;
        fetchChannelVideos(username).then(() => this.getHermitVideos());
      },
    }
  }
</script>
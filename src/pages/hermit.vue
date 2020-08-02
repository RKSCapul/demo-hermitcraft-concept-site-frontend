<template>
  <div>
    <vue-headful :title="getTitle()" />
    <div class="q-pr-lg q-ml-md no-wrap">
      <profile-header-component
        :hermit="mappedHermitData[0]" 
        :loading="!dataLoaded"
      />
    </div>
    <div class="q-pr-lg q-ml-md">
      <div v-if="dataLoaded">
        <div v-if="videosFetched">
          <div class="row" v-if="videosLoaded">
            <div class="col-12 col-md-9 col-lg-10 q-mt-md">
              <div class="video-column">
                <div class="text-h5 text-bold text-uppercase">Videos</div>
                <video-thumbnail-component
                  v-for="videos in mappedHermitVideos"
                  :key="videos.id"
                  :video="videos"
                />
              </div>
            </div>
            <div class="col-12 col-md-3 col-lg-2 q-mt-md social-group-column">
              <div class="q-mb-md social-group-column-item">
                <div class="text-h5 text-bold text-uppercase">Socials</div>
                <sidebar-social-item-component />
              </div>
              <div class="social-group-column-item">
                <div class="text-h5 text-bold text-uppercase">Groups</div>
                <sidebar-group-item-component />
              </div>
            </div>
          </div>
          <div class="row" v-if="videosLoaded">
            <profile-footer-component :hermit="mappedHermitData[0]" />
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
        <div v-else>
          An error has occured
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  @import '~quasar-variables' 

  .social-group-column .social-group-column-item
    margin-left: map-get($space-sm, "x")

  .video-column
    margin-right: map-get($space-sm, "x")

  @media (min-width: $breakpoint-xs-min) and (max-width: $breakpoint-sm-max)
    .social-group-column .social-group-column-item
      margin-left: 0

    .video-column
      margin-right: 0
</style>

<script>
  import ProfileHeaderComponent from '../components/ProfileHeaderComponent.vue';
  import VideoThumbnailComponent from '../components/VideoThumbnailComponent.vue';
  import SidebarGroupItemComponent from '../components/SidebarGroupItemComponent.vue';
  import SidebarSocialItemComponent from '../components/SidebarSocialItemComponent.vue';
  import ProfileFooterComponent from '../components/ProfileFooterComponent.vue';

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
      ProfileHeaderComponent,
      VideoThumbnailComponent,
      SidebarGroupItemComponent,
      SidebarSocialItemComponent,
      ProfileFooterComponent,
    },
    
    watch: {
      username() {
        this.fetchHermitData(this.username);
      }
    },

    data () {
      return {
        title: 'r.cpl demo | Hermitcraft Concept Redesign',
        hermitData: [],
        mappedHermitData: [],
        mappedHermitVideos: [],
        dataLoaded: false,
        videosFetched: true,
        videosLoaded: false,
        twitchStatTriggered: false,
        rightDrawerOpen: true,
        tab: 'mails'
      }
    },

    created () {
      this.fetchHermitData(this.username);
    },

    methods: {
      getTitle() {
        if (this.dataLoaded) {
          return `${this.mappedHermitData[0].name} | ${this.title}`;
        }

        return this.title;
      },

      getHermitData() {
        const _data = getChannelData();
        const { data } = _data;

        this.mappedHermitData = data;
        this.dataLoaded = true;

        this.fetchHermitVideos(this.username);
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
        this.videosFetched = true;
        this.videosLoaded = false;
        fetchChannelVideos(username)
          .then(() => this.getHermitVideos())
          .catch(() => this.videosFetched = false);
      },
    }
  }
</script>
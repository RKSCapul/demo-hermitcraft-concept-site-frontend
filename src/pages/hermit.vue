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
                <div class="text-h5 text-bold text-uppercase">Main Channels</div>
                <sidebar-social-item-component 
                  v-for="data in mappedHermitChannels"
                  :key="data.index"
                  :socials="data"
                />
              </div>
              <div class="q-mb-md social-group-column-item">
                <div class="text-h5 text-bold text-uppercase">Socials</div>
                <sidebar-social-item-component 
                  v-for="data in socialData"
                  :key="data.index"
                  :socials="data"
                />
              </div>
              <div class="social-group-column-item">
                <div class="text-h5 text-bold text-uppercase">Groups</div>
                <sidebar-group-item-component 
                  v-for="data in hermitGroups"
                  :key="data.index"
                  :group="data" 
                />
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
    fetchHermitData,
    fetchHermitVideos,

    getHermitData,
    getHermitVideos
  } from "../data/api/hermits.js";

  import {
    fetchHermitGroup,
    getHermitGroup,
  } from "../data/api/groups.js";

  import groupIcons from '../data/data-vector-icon-collection.js';
  import socialIcons from '../data/data-icons-social-media-collection.js';
  import brandColors from '../data/data-brand-colors.js'
  import sites from '../data/data-channel-urls.js'

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
        this.executeFetchHermitData(this.username);
      }
    },

    data () {
      return {
        title: 'Hermitcraft Concept Redesign | r_coder demo',
        hermitData: [],
        hermitGroups: [],
        mappedHermitData: [],
        mappedHermitVideos: [],
        mappedHermitChannels: [],
        dataLoaded: false,
        videosFetched: true,
        videosLoaded: false,
        twitchStatTriggered: false,
        rightDrawerOpen: true,
        tab: 'mails'
      }
    },

    created () {
      this.executeFetchHermitData(this.username);
      
      // TODO: Temporary mock data, while backend not yet integrated with frontend.
      this.socialData = [
        {
          index: 1,
          site: sites["twitter"],
          icon: socialIcons["twitter"],
          color: brandColors["twitter"],
          channel: "",
        },
        {
          index: 2,
          site: sites["instagram"],
          icon: socialIcons["instagram"],
          color: brandColors["instagram"],
          channel: "",
        }
      ];
    },

    methods: {
      getTitle() {
        if (this.dataLoaded) {
          return `${this.mappedHermitData[0].name} | ${this.title}`;
        }

        return this.title;
      },

      getData() {
        const data = getHermitData();

        this.mappedHermitData = data;
        this.dataLoaded = true;

        this.executeFetchHermitVideos(this.username);
        this.executeFetchHermitGroups(this.username);
        
        this.organizeMainChannels(this.mappedHermitData);
      },

      executeFetchHermitData(username) {
        this.dataLoaded = false;
        this.hermitGroups = [];
        fetchHermitData(username).then(() => this.getData());
      },

      getVideos() {
        const data = getHermitVideos();
        
        this.mappedHermitVideos = data;
        this.videosLoaded = true;
      },

      executeFetchHermitVideos(username) {
        this.videosFetched = true;
        this.videosLoaded = false;
        fetchHermitVideos(username)
          .then(() => this.getVideos())
          .catch(() => this.videosFetched = false);
      },

      getGroups() {
        const data = getHermitGroup();

        this.hermitGroups = data.map(item => {
          return {
            ...item,
            icon: groupIcons.redstone,
          }
        });
      },

      executeFetchHermitGroups(username) {
        fetchHermitGroup(username)
          .then(() => this.getGroups());
      },

      openChannel(url) {
        window.open(url, "_blank");
      },

      organizeMainChannels(data) {
        let x = 0;

        this.mappedHermitChannels = Object.keys(data[0].channel).map(key => {
          x++;

          return {
            index: x,
            site: sites[key],
            icon: socialIcons[key],
            color: brandColors[key],
            channel: data[0].channel[key],
          }
        });
      }
    }
  }
</script>
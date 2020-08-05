<template>
  <div>
    <vue-headful :title="title" />
    <div class="title-header">
      <div class="text-h4 font-montserrat q-mb-md">
        <span class="text-uppercase">Hermitcraft Timeline</span>
      </div>
    </div>

    <div class="q-mx-lg">
      <timeline-item-component
        v-for="data in items"
        :key="data.id"
        :timeline="data"
      />
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

  .subtitle {
    opacity: 1 !important;
  }

  .wrap-text {
    word-wrap: break-word;
  }
</style>

<script>
  import TimelineItemComponent from '../components/TimelineItemComponent.vue';
  
  import timelineData from '../data/data-timeline.js'

  export default {
    name: 'TimelineHome',
    layout: 'HermitcraftLayout',
    components: {
      TimelineItemComponent,
    },
    
    data () {
      return {
        title: 'Timeline | r.cpl demo | Hermitcraft Concept Redesign',
        items: [],
      }
    },

    created () {
      this.items = this.getTimelines();
    },

    methods: {
      getTimelines() {
        const timelineKeys = Object.keys(timelineData);

        return timelineKeys.map(key => {
          return {
            id: key,
            title: timelineData[key].header,
          };
        });
      }
    }
  }
</script>
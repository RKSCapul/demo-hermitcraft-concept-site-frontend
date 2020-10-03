<template>
  <div>
    <vue-headful :title="title" />
    <div class="title-header">
      <div class="text-h4 font-montserrat q-mb-md">
        <span class="text-uppercase">Hermitcraft Timeline</span>
        <div class="text-h6 font-open-sans">
          Presents
        </div> 
      </div>
      <div 
        class="text-h3 font-shadows-into-light text-bold q-mb-xl text-secondary"
      >
        {{ timeline.header }}
      </div>
    </div>

    <div class="q-mx-lg">
      <q-timeline 
        :layout="$q.screen.lt.md ? 'dense' : timeline.style" 
        side="right" 
        color="secondary"
      >
        <q-timeline-entry 
          v-for="item in timeline.data"
          :key="item.index"
          :side="item.side"
        >
          <template v-slot:subtitle>
            <span 
              class="text-h6 subtitle"
            >
              {{item.date}}
            </span>
          </template>
          <template v-slot:title>
            <span 
              class="text-h6 subtitle"
            >
              {{item.title}}
            </span>
          </template>
          <div class="font-open-sans wrap-text">
            {{ item.description }}
          </div>
        </q-timeline-entry>
      </q-timeline>
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
  import timelineData from '../data/data-timeline.js';

  export default {
    name: 'TimelineView',
    layout: 'HermitcraftLayout',
    props: [ '_name' ],
    components: {
      
    },
    
    data () {
      return {
        title: 'Timeline | Hermitcraft Concept Redesign | r_coder demo',
        isRight: false,
        timeline: {},
        timelineLoaded: false,
        timelineTitle: '',
      }
    },

    created () {
      this.isRight = false;
      this.timeline = this.formatData(timelineData[this._name]);
      this.title = `${this.timeline.header} | Hermitcraft Concept Redesign | r_coder demo`;
    },

    methods: {
      invertSide() {
        this.isRight = !this.isRight;

        return this.isRight ? 'right' : 'left';
      },

      getPHTime() {
        return '';
      },

      formatData(_data) {
        const style = _data.style;
        const header = _data.header;
        const mappedData = _data.data.map(item => {
          return {
            ...item,
            side: this.invertSide()
          };
        });

        mappedData.sort((a, b) => { return b.index - a.index })

        return {
          style,
          header,
          data: mappedData,
        };
      },
    }
  }
</script>
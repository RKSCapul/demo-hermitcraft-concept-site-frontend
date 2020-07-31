<template>
  <div>
    <vue-headful :title="title" />
    <div class="title-header">
      <div class="text-h2 font-montserrat text-uppercase">
        Hermitcraft 
        <span class="font-shadows-into-light text-red-7 text-bold">
          Live!
        </span>
      </div>
    </div>
    <div class="q-pa-md row justify-center">
      <q-btn-group>
        <q-btn color="green" @click="timeSelect = true">Select your area</q-btn>
        <q-btn color="green" disable icon="r_schedule" label="Manila (UTC+8:00)" />
      </q-btn-group>
    </div>
    <div class="q-pa-md row justify-center q-gutter-md">
      <div v-if="scheduleLoaded" class="full-width">
        <LivestreamScheduleTableComponent 
          v-for="schedule in items" 
          :key="schedule.livestreamCode" 
          :livestream="schedule" 
          :status="livestreamStatus[schedule.livestreamCode]"
        />
      </div>
    </div>

    <q-dialog
      v-model="timeSelect"
    >
      <q-card style="width: 300px" class="font-open-sans">
        <q-card-section>
          <div class="text-h6 font-merriweather">Choose your area</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            color="teal"
            label-color="teal" 
            label="Continent"
            v-model="selectedContinent" 
            :options="continents"
          />
          <q-select
            color="teal"
            label-color="teal" 
            label="Contry"
            v-model="selectedCountry"
            :options="continents"
          />
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup class="text-bold" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
</style>

<script>
  import LivestreamScheduleTableComponent from '../components/LivestreamScheduleTableComponent.vue';

  //import livestreamDay from '../data/data-livestream-day.js';

  import { 
    fetchLivestreams, 
    getLivestreams,
    fetchLivestreamStatus,
    getLivestreamStatus 
  } from '../data/api-endpoints.js'

  export default {
    name: 'IndexDemo',
    layout: 'HermitcraftLayout',
    components: {
      LivestreamScheduleTableComponent,
    },
    
    data () {
      return {
        title: 'Live | r.cpl demo | Hermitcraft Concept Redesign',
        items: [],
        livestreamStatus: [],
        continents: [
          'Africa',
          'North America',
          'South America',
          'Asia',
          'Europe',
          'Oceania'
        ],
        selectedContinent: null,
        selectedCountry: null,
        timeSelect: false,
        scheduleLoaded: true,
        status_interval: null,
      }
    },

    created () {
      this.fetchLivestreamSchedule()
      this.fetchLivestreamStatusInterval()
    },

    methods: {
      getPHTime() {
        return '';
      },

      setMappedSchedule(data) {
        this.items = data;
        this.scheduleLoaded = true;
      },

      getLivestreamSchedule() {
        const _data = getLivestreams()
        const { data } = _data;

        this.items = data;
        this.scheduleLoaded = true;
      },

      async fetchLivestreamSchedule() {
        this.scheduleLoaded = false;
        await fetchLivestreams().then(() => this.getLivestreamSchedule())
      },

      getLivestreamStatus() {
        const _data = getLivestreamStatus()
        const { data } = _data;

        this.livestreamStatus = data;
      },

      async fetchLivestreamStatus() {
        await fetchLivestreamStatus().then(() => this.getLivestreamStatus())
      },

      fetchLivestreamStatusInterval() {
        this.fetchLivestreamStatus()

        this.status_interval = setInterval(() => {
          this.fetchLivestreamStatus()
        }, 150000)
      }
    }
  }
</script>
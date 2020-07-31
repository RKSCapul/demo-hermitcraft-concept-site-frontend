<template>
  <div>
    <vue-headful :title="title" />
    <div class="title-header">
      <div class="text-h4 font-montserrat text-uppercase">
        Hermitcraft 
        <span class="font-shadows-into-light text-red-7 text-bold">
          Live!
        </span>
      </div>
    </div>
    <div class="row q-px-md q-pt-sm justify-center">
      <q-card
        bordered 
        class="home-card q-mt-lg full-width" 
      >
        <q-item 
          clickable 
          v-ripple 
          class="no-padding"
          @click="timeSelect = true"
        >
          <q-card-section horizontal>
            <q-card-section>
              <div class="flex flex-center">
                <q-icon 
                  color="primary"
                  name="r_scheduler"
                  size="sm"
                />
              </div>
            </q-card-section>
            <q-card-section class="q-pl-none text-h6">
              <span class="no-margin text-primary font-open-sans">
                Select your area: 
              </span>
              <span class="text-weight-bold no-margin text-bold">
                Manila, PH (UTC+8)
              </span>
            </q-card-section>
          </q-card-section>
        </q-item>
      </q-card>
    </div>
    <div 
      class="row q-px-md q-pt-md justify-center"
      v-if="scheduleLoaded"
    >
      <LivestreamScheduleTableComponent 
        v-for="schedule in items" 
        class="full-width"
        :key="schedule.livestreamCode" 
        :livestream="schedule" 
        :status="livestreamStatus[schedule.livestreamCode]"
      />
    </div>
    <div 
      class="row q-px-md q-pt-md justify-center"
      v-else
    >
      <q-spinner
        color="secondary"
        class="q-my-md"
        size="2em"
      />
    </div>

    <q-dialog
      v-model="timeSelect"
    >
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Choose your area</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            color="secondary"
            label="Continent"
            v-model="selectedContinent" 
            :options="continents"
          />
          <q-select
            color="secondary" 
            label="Contry"
            v-model="selectedCountry"
            :options="continents"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" v-close-popup class="bg-primary text-white" />
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

  .card-icon-ico {
    font-size: 32px;
  }

  .card-icon-bg {
    min-width: 40px;
    min-height: 40px;
  }

  .my-card {
    width: 100%;
    max-width: 300px;
  }
</style>

<script>
  import LivestreamScheduleTableComponent from '../components/LivestreamScheduleTableComponent.vue';

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
        scheduleLoaded: false,
        status_interval: null,
      }
    },

    created () {
      this.fetchLivestreamSchedule()
      //this.fetchLivestreamStatusInterval()
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
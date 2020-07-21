<template>
  <div class="q-pt-md full-width">
    <q-table 
      :title="title"
      class="my-sticky-header-column-table"
      :columns="columns"
      :data="schedule"
      :rows-per-page-options="[0]" 
      :pagination.sync="pagination"
      row-key="hermit"
      hide-bottom
    >

      <template v-slot:top bg-color="warning">
        <div>
          <div class="text-h5 text-weight-bold text-uppercase">{{description}}</div>
          <div class="text-h6 font-open-sans text-weight-regular">{{date}}</div>
        </div>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            :key="props.cols[0].name"
            :props="props"
          > 
            <div class="font-open-sans text-h6 text-bold text-green-10">{{ props.cols[0].label.toUpperCase() }}</div>
          </q-th>
          <q-th auto-width />
          <q-th
            v-for="col in props.cols.slice(1)"
            class="gt-sm"
            :key="col.name"
            :props="props"
          >
            <div class="font-open-sans text-h6 text-bold text-green-10">{{ col.label.toUpperCase() }}</div>
          </q-th>
        </q-tr>
      </template>
      
      <template v-slot:body="props">
        <q-tr 
          :props="props" :class="liveStreamState[props.row.hermitCode] ? 'is-live' : ''"
        >
          <q-td>
            <div class="row">
              <q-avatar size="42px" class="q-mr-sm">
                <img :src="props.row.accountPicture || '../assets/images/others/redstone.png'">
              </q-avatar>
              <div class="font-open-sans">
                <div class="text-bold text-h6">{{props.row.hermit}}</div>
                <q-space />
                <q-badge 
                  align="middle"
                  :style="'background-color: ' + colors[props.row.platform.toLowerCase()]"
                  :label="props.row.platform"
                />
              </div>
            </div>
          </q-td>
          <q-td>
            <q-btn 
              v-if="liveStreamState[props.row.hermitCode]"
              rounded
              flat
              size="md"
              label="Live"
              class="text-white"
              :style="'background-color: ' + colors[props.row.platform.toLowerCase()]"
            />
            <q-btn 
              round 
              dense 
              size="md"
              class="text-white lt-md q-ml-sm"
              :style="'background-color: ' + colors[props.row.platform.toLowerCase()]"
              @click="props.expand = !props.expand" 
              :icon="props.expand ? 'r_expand_less' : 'r_expand_more'" 
            />
          </q-td>
          <q-td
            v-for="col in props.cols.slice(1)"
            class="gt-sm"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props" class="lt-md">
          <q-td colspan="100%">
            <q-list dense separator class="rounded-borders">
              <q-item 
                v-for="col in props.cols.slice(1)"
                :key="col.name"
              >
                <q-item-section>
                  <div class="row">
                    <div class="text-weight-bold q-mr-sm">{{ col.label }}</div>
                    <div class="font-open-sans">{{ col.value }}</div>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style>
  .header-container {
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .header {
    text-align: center;
  }

  .header-title {
    color: var(--q-color-negative);
  }

  tr.is-live {
    background-color: #D1C4E9 !important;
  }
</style>

<style lang="sass">
  .my-sticky-header-column-table

    .q-table__top,
    .q-table__bottom
      /* bg color is important for th; just specify one */
      background-color: #c1f4cd

    // td:first-child
    //   /* bg color is important for td; just specify one */
    //   background-color: #fff !important

    tr th
      position: sticky
      /* higher than z-index for td below */
      z-index: 2
      /* bg color is important; just specify one */
      background: #fff

    /* this will be the loading indicator */
    thead tr:last-child th
      /* height of all previous header rows */
      top: 48px
      /* highest z-index */
      z-index: 3
    thead tr:first-child th
      top: 0
      z-index: 1
    tr:first-child th:first-child
      /* highest z-index */
      z-index: 3

    td:first-child
      z-index: 1

    td:first-child, th:first-child
      position: sticky
      left: 0
</style>

<script>
  import columns from '../data/data-livestream-columns.js';
  import timezones from '../data/data-default-timezones.js';
  import brandColors from '../data/data-brand-colors.js';

  import moment from 'moment-timezone';

  export default {
    name: 'LivestreamScheduleTableComponent',
    props: [ 'livestream', 'status' ],

    data () {
      return {
        pagination: {
          page: 1,    
          rowsPerPage: 0, // 0 means all rows    
        },
        schedule: [],
        title: '',
        liveStreamState: {},
        colors: brandColors
      }
    },

    created () {
      this.columns = columns;
      this.date = this.constructHeaderDate(this.livestream.date);
      this.description = this.livestream.title;
      this.schedule = this.getTimeZones(this.livestream.schedule);
    },

    methods: {
      constructHeaderDate(_title) {
        return moment(_title).format('DD MMMM yyyy');
      },

      constructDate(_date, timezone) {
        let dateFormat = 'h:mm a'
        if (_date.split('T')[1].split(':')[1] === '00') {
          dateFormat = 'h a'
        }

        const time = moment(_date).tz(timezone.toString()).format(dateFormat);
        return time.toUpperCase();
      },

      constructTimeslot(start, end, tz) {
        let startTime = this.constructDate(start, tz);
        let endTime = this.constructDate(end, tz);

        return `${startTime} - ${endTime}`;
      },

      assignTimeZones(start, end) {
        let _timezones = timezones;
        let timeslots = [];
        
        _timezones.push({
          label: 'yourArea',
          location: 'Asia/Manila'
        });

        timezones.map(area => {
          timeslots.push({
            type: area.label,
            slot: this.constructTimeslot(start, end, area.location),
          });
        });

        return timeslots;
      },

      getImagePath(hermit) {
        try {
          return require(`../assets/images/${hermit.replace(' ', '').toLowerCase()}.png`);
        } catch (err) {
          return null;
        }
      },

      getLivestreamStatus(hermitCode) {
        if (!this.status) return false;

        const index = this.status.findIndex(hermit => hermit.hermitCode === hermitCode);
        const data = this.status[index];

        const twitchLive = data.livestreams.twitch.isChannelLive;

        return twitchLive;
      },

      getTimeZones(data) {
        return data.map(item => {
          const hermit = `${item.member}  `

          this.liveStreamState[item.hermitCode] = this.getLivestreamStatus(item.hermitCode)

          return {
            hermitCode: item.hermitCode,
            hermit,
            accountPicture: item.accountPicture,
            time: this.assignTimeZones(
                    item.startTimeUTC,
                    item.endTimeUTC
                  ),
            platform: item.platform, 
          };
        });
      }
    }
  }
</script>

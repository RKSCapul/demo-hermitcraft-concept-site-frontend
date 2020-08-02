<template>
  <q-card
    flat
    bordered 
    class="home-card q-mt-sm full-width" 
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
        <q-card-section class="q-pl-none">
          <span class="caption font-open-sans no-margin">
            Twitte
          </span>
        </q-card-section>
      </q-card-section>
    </q-item>
  </q-card>
</template>

<style lang="sass">
  @import '~quasar-variables' 

  .caption 
    font-size: map-get($h6, "size")

  @media (min-width: $breakpoint-xs-min) and (max-width: $breakpoint-sm-max)
    .caption
      font-size: map-get($body1, "size")
</style>

<script>
  import brandColors from '../data/data-brand-colors.js'

  export default {
    name: 'SidebarSocialItemComponent',
    data () {
      return {
        colors: brandColors,
      }
    },

    methods: {
      externalRedirect(href) {
        window.open(href, '_blank');
      },
    }
  };
</script>
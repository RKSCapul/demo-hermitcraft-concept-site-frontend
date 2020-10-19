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
      @click="openChannel(socials.site.url + socials.url)"
    >
      <q-card-section horizontal>
        <q-card-section>
          <div class="flex flex-center">
            <q-icon 
              :style="'color: ' + socials.color"
              :name="socials.icon"
              size="sm"
            />
          </div>
        </q-card-section>
        <q-card-section class="q-pl-none">
          <span class="caption font-open-sans no-margin">
            {{ socials.site.name }}
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
  export default {
    name: 'SidebarSocialItemComponent',
    props: [ 'socials' ],

    methods: {
      openChannel(url) {
        window.open(url, "_blank");
      },
    }
  };
</script>
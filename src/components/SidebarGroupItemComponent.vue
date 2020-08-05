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
        <q-card-section class="q-py-xs">
          <div class="flex flex-center">
            <img :src="loadVector(group.icon)" class="icon" />
          </div>
        </q-card-section>
        <q-card-section class="q-pl-none">
          <div class="caption font-open-sans no-margin">
            {{ group.name }}
          </div>
        </q-card-section>
      </q-card-section>
    </q-item>
  </q-card>
</template>

<style lang="sass">
  @import '~quasar-variables' 

  .caption 
    font-size: map-get($h6, "size")

  .icon
    width: 45px

  @media (min-width: $breakpoint-xs-min) and (max-width: $breakpoint-sm-max)
    .caption
      font-size: map-get($body1, "size")
</style>

<script>
  export default {
    name: 'SidebarGroupItemComponent',
    props: [ 'group' ],
    
    methods: {
      loadVector(filename) {
        return require(`../assets/vectors/${filename}`)
      }
    }
  };
</script>
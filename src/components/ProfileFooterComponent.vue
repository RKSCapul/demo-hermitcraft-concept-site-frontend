<template>
  <div class="q-pa-lg q-my-lg font-shadows-into-light text-grey-6 footer full-width">
    <div>- {{hermit.name}} -</div>
  </div>
</template>

<style lang="sass">
  @import '~quasar-variables' 

  .footer
    font-size: map-get($h2, "size")
    font-weight: 800
    text-align: center

  @media (min-width: $breakpoint-xs-min) and (max-width: $breakpoint-sm-max)
    .footer
      font-size: map-get($h4, "size")

  @media (min-width: $breakpoint-md-min) and (max-width: $breakpoint-md-max)
    .footer
      font-size: map-get($h3, "size")
</style>

<script>
  export default {
    name: 'ProfileFooterComponent',
    props: [ 'hermit' ],
    data () {
      return {
        loading_: false,
      }
    },

    computed: {
      isComponentLoading() {
        return this.loading;
      },
    },

    watch: {
      loading_: (val) => this.updateLoading(val),
    },

    methods: {
      updateLoading(value) {
        this.loading_ = value
      }
    }
  };
</script>
<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
  const defaultLayout = 'hermitcraft';

  export default {
    computed: {
      layout () {
        return (this.$route.meta.layout || defaultLayout) + '-layout';
      }
    }
  }
</script>
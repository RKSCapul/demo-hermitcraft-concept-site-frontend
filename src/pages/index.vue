<template>
  <div class="flex flex-center">
    <vue-headful :title="title" />
    Homepage
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        title: 'r.cpl demo | Hermitcraft Concept Redesign',
      }
    },
  }
</script>
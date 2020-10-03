<template>
  <div class="flex flex-center">
    <vue-headful :title="title" />
    <div class="text-h4 font-montserrat text-uppercase">
      Recent Uploads
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        title: 'Hermitcraft Concept Redesign | r_coder demo',
      }
    },
  }
</script>
<template>
  <q-card
    bordered 
    class="home-card q-mt-lg full-width" 
  >
    <q-item 
      clickable 
      v-ripple 
      class="no-padding"
      :to="goToPath(timeline.id)"
    >
      <q-card-section horizontal>
        <q-card-section>
          <div class="flex flex-center">
            <q-icon 
              color="primary"
              name="r_history"
              size="sm"
            />
          </div>
        </q-card-section>
        <q-card-section class="q-pl-none text-h6">
          <span class="no-margin text-uppercase">
            {{ timeline.title }}
          </span>
          <span class="no-margin font-open-sans text-weight-bold">
            
          </span>
        </q-card-section>
      </q-card-section>
    </q-item>
  </q-card>
</template>

<script>
  export default {
    name: 'TimelineItemComponent',
    props: [ 'timeline' ],

    methods: {
      goToPath(path) {
        return `timeline/${path}`;
      }
    }
  };
</script>
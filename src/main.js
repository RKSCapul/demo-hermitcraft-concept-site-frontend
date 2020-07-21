import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import HermitcraftLayout from './layouts/HermitcraftLayout.vue';

import routes from './routes';
import './quasar';

Vue.component('hermitcraft-layout', HermitcraftLayout);

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({ 
  mode: 'history',
  routes
});

new Vue({ 
  router,
  render: h => h(App),
}).$mount('#app');

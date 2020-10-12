
const routes = [
  {
    path: '/',
    name: 'home', 
    component: require('./pages/index.vue').default
  },
  {
    path: '/livestream',
    name: 'livestream', 
    component: require('./pages/livestream-day.vue').default,
  },
  {
    path: '/recap',
    name: 'recap',
    component: require('./pages/recap.vue').default,
  },
  {
    path: '/timeline',
    name: 'timeline', 
    component: require('./pages/timeline-home.vue').default,
  },
  {
    path: '/timeline/:_name',
    name: 'timeline', 
    meta: { layout: 'hermitcraft'},
    component: require('./pages/timeline-view.vue').default,
    props: true,
  },
  {
    path: '/hermit/:username',
    name: 'hermitcraft-concept-site-demo-profile',
    meta: { layout: 'hermitcraft'},
    component: require('./pages/hermit.vue').default,
    props: true,
  }
];

export default routes;
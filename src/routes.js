
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
    path: '/hermit/:username',
    name: 'hermitcraft-concept-site-demo-profile',
    meta: { layout: 'hermitcraft'},
    component: require('./pages/hermit.vue').default,
    props: true,
  }
];

export default routes;
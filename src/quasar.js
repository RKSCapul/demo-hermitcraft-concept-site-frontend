// Main
import Vue from 'vue';
import { Quasar } from 'quasar';

// Styles 
import './styles/css/fonts.css';
import './styles/quasar.sass';

// Icons (CSS)
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css';

import iconSet from 'quasar/icon-set/material-icons-round.js';

Vue.use(Quasar, {
  config: {},
  components: { /* not needed if importStrategy is not 'manual' */ },
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: {
  },
  iconSet: iconSet
})
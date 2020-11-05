import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './lang';
// import './mock';
import './utils/boost';
import './utils/create-api';
import '@/assets/styles/css/index.scss';
import '@/assets/styles/css/home.scss';

import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  error: '@/assets/img/error.png'
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

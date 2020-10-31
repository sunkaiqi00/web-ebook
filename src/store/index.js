import Vue from 'vue';
import Vuex from 'vuex';
import book from './book/book';
import store from './store/store';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    book,
    store
  }
});

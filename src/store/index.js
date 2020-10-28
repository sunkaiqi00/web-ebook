import Vue from 'vue';
import Vuex from 'vuex';
import book from './module/book';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    book
  }
});

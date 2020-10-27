import Vue from 'vue';
import Vuex from 'vuex';
import book from './module/book';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {},
  getters: {
    getCount(state) {
      return state.count;
    }
  },
  actions: {},
  modules: {
    book
  }
});

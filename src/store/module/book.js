const book = {
  state: {
    user: {
      name: 'kaihuai',
      age: 21
    }
  },
  mutations: {},
  getters: {
    getName(state) {
      return state.user.name;
    },
    getInfo(state, getters) {
      return getters.getName + state.user.age;
    }
  },
  actions: {}
};
export default book;

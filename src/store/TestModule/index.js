const getDefaultState = () => {
  return {
    test: false,
  };
};

export default {
  state: getDefaultState(),
  getters: {},
  mutations: {
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    resetTestState({ commit }) {
      commit("resetState");
    },
  },
  modules: {},
};

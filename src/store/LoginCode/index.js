export default {
  state: {
    invalidLoginCodeStatus: false,
    invalidLoginCodeMessage: "",
  },
  getters: {
    invalidLoginCodeStatus: (state) => state.invalidLoginCodeStatus,
    invalidLoginCodeMessage: (state) => state.invalidLoginCodeMessage,
  },
  mutations: {
    updateLoginCodeStatus: (state, status) => {
      state.invalidLoginCodeStatus = status;
    },
    updateLoginCodeMessage: (state, msg) => {
      state.invalidLoginCodeMessage = msg;
    },
  },
  actions: {
    updateLoginCodeStatus(context, status) {
      context.commit("updateLoginCodeStatus", status);
    },
    updateLoginCodeMessage(context, status, msg) {
      context.commit("updateLoginCodeMessage", status, msg);
    },
  },
  modules: {},
};

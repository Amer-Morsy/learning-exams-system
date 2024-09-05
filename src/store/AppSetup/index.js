import { getStateInterface } from "./state-interface";

export default {
  modules: {},
  state: {
    running: null,
    data: getStateInterface(),
    isResourcesAvailable: null,
  },
  getters: {
    appLanguages: (state) => state.data.appLanguages,
    appThemes: (state) => state.data.appThemes,
    appLayouts: (state) => state.data.appLayouts,
    isResourcesAvailable: (state) => state.isResourcesAvailable,
  },
  actions: {
    resetStateAppSetup(context) {
      context.commit("resetStateAppSetup");
    },
    setInitialState(context, data) {
      context.commit("setInitialState", data);
    },
    setIsResourcesAvailable(context, status) {
      context.commit("setIsResourcesAvailable", status);
    },
  },
  mutations: {
    resetStateAppSetup(state) {
      if (!state.running) {
        state.data = null;
        state.running = true;
      }
    },
    setInitialState(state, data) {
      state.data = data;
    },
    setIsResourcesAvailable(state, status) {
      state.isResourcesAvailable = status;
    },
  },
};

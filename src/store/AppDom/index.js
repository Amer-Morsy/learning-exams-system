import { getStateInterface } from "./state-interface";

export default {
  modules: {},
  state: {
    running: null,
    data: getStateInterface(),
    isSidebarOpened: true,
    isBarsPreloaderShown: false,
    isContentOverlayShown: false,
    isAppLayerShown: false,
    currentLayerComponent: null,
    currentProps: null,
    currentItemInAction: null,
  },
  getters: {
    currentLanguage: (state) => state.data.currentLanguage,
    currentTheme: (state) => state.data.currentTheme,
    currentLayout: (state) => state.data.currentLayout,
    isSidebarOpened: (state) => state.isSidebarOpened,
    isBarsPreloaderShown: (state) => state.isBarsPreloaderShown,
    isContentOverlayShown: (state) => state.isContentOverlayShown,
    isAppLayerShown: (state) => state.isAppLayerShown,
    currentLayerComponent: (state) => state.currentLayerComponent,
    currentProps: (state) => state.currentProps,
    currentItemInAction: (state) => state.currentItemInAction,
  },
  mutations: {
    resetStateAppDom(state) {
      if (!state.running) {
        state.data = null;
        state.running = true;
      }
    },
    loadInitialState(state, data) {
      state.data = null;
      state.data = data;
    },
    setCurrentLanguage(state, language) {
      state.data.currentLanguage = language;
    },
    setCurrentTheme(state, theme) {
      state.data.currentTheme = theme;
    },
    setCurrentLayout(state, layout) {
      state.data.currentLayout = layout;
    },

    toggleSidebarStatus(state) {
      state.isSidebarOpened = !state.isSidebarOpened;
    },
    hideBarsPreloader(state) {
      state.isBarsPreloaderShown = false;
    },
    showBarsPreloader(state) {
      state.isBarsPreloaderShown = true;
    },
    hideContentOverlay(state) {
      state.isContentOverlayShown = false;
    },
    showContentOverlay(state) {
      state.isContentOverlayShown = true;
    },
    hideAppLayer(state) {
      state.isAppLayerShown = false;
    },
    showAppLayer(state) {
      state.isAppLayerShown = true;
    },
    setCurrentLayerComponent(state, componentName) {
      state.currentLayerComponent = componentName;
    },
    setCurrentProps(state, props) {
      state.currentProps = props;
    },
    setCurrentItemInAction(state, item) {
      state.currentItemInAction = item;
    },
  },
  actions: {
    resetStateAppDom(context) {
      context.commit("resetStateAppDom");
    },
    loadInitialState(context, data) {
      context.commit("loadInitialState", data);
    },
    setCurrentLanguage(context, language) {
      context.commit("setCurrentLanguage", language);
    },
    setCurrentTheme(context, theme) {
      context.commit("setCurrentTheme", theme);
    },
    setCurrentLayout(context, layout) {
      context.commit("setCurrentLayout", layout);
    },
    toggleSidebarStatus(context) {
      context.commit("toggleSidebarStatus");
    },
    hideBarsPreloader(context) {
      context.commit("hideBarsPreloader");
    },
    showBarsPreloader(context) {
      context.commit("showBarsPreloader");
    },
    hideContentOverlay(context) {
      context.commit("hideContentOverlay");
    },
    showContentOverlay(context) {
      context.commit("showContentOverlay");
    },
    hideAppLayer(context) {
      context.commit("hideAppLayer");
    },
    showAppLayer(context) {
      context.commit("showAppLayer");
    },
    setCurrentLayerComponent(context, componentName) {
      context.commit("setCurrentLayerComponent", componentName);
    },
    setCurrentProps(context, props) {
      context.commit("setCurrentProps", props);
    },
    setCurrentItemInAction(context, item) {
      context.commit("setCurrentItemInAction", item);
    },
  },
};

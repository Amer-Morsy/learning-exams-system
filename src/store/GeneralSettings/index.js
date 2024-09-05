export default {
  state: {
    generalSetting: null,
    paginationIsClosed: false,
    alertsList: [],
    haveAlerts: false,
    isDangerAlert: true,
  },
  getters: {
    generalSetting: (state) => state.generalSetting,
    paginationIsClosed: (state) => state.paginationIsClosed,
    alertsList: (state) => state.alertsList,
    haveAlerts: (state) => state.haveAlerts,
    isDangerAlert: (state) => state.isDangerAlert,
  },
  mutations: {
    setGeneralSetting: (state, generalSetting) => {
      state.generalSetting = generalSetting;
    },
    togglePaginationStatus: (state) => {
      state.paginationIsClosed = !state.paginationIsClosed;
    },
    clearAlertsList: (state) => {
      state.alertsList = [];
      state.haveAlerts = false;
    },
    addAlert: (state, alert) => {
      // state.alertsList = [...state.alertsList];
      state.alertsList = [];
      state.alertsList.push(alert);
      state.haveAlerts = true;
    },
    setIsDangerAlert: (state, status) => {
      state.isDangerAlert = status;
    },
  },
  actions: {
    setGeneralSetting(context, generalSetting) {
      context.commit("setGeneralSetting", generalSetting);
    },
    togglePaginationStatus(context) {
      context.commit("togglePaginationStatus");
    },
    clearAlertsList(context) {
      context.commit("clearAlertsList");
    },
    addAlert(context, alert) {
      context.commit("addAlert", alert);
    },
    setIsDangerAlert(context, status) {
      context.commit("setIsDangerAlert", status);
    },
  },
  modules: {},
};

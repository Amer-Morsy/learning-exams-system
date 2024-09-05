import { DEFAULT_PAGES } from "./../../utils/constants";
import router from "./../../router";
import i18n from "./../../i18n";

export default {
  state: {
    userAuthorizeToken: null,
    ownerUserToken: null,
    loginStatus: false,
    isTeacherLogged: false,
    userPersonalData: null,
    userData: null,
    constantsListsData: null,
    usersPrivilegeData: null,
    userHomePage: DEFAULT_PAGES.notLoggedIn,
  },
  getters: {
    userAuthorizeToken: (state) => state.userAuthorizeToken,
    ownerUserToken: (state) => state.ownerUserToken,
    loginStatus: (state) => state.loginStatus,
    isTeacherLogged: (state) => state.isTeacherLogged,
    userPersonalData: (state) => state.userPersonalData,
    userData: (state) => state.userData,
    constantsListsData: (state) => state.constantsListsData,
    usersPrivilegeData: (state) => state.usersPrivilegeData,
    userHomePage: (state) => state.userHomePage,
  },
  mutations: {
    UPDATE_USER_DATA: (state, data) => {
      state.userAuthorizeToken = data.userAuthorizeToken ?? null;
      state.loginStatus = true;
      state.isTeacherLogged = data.isTeacherLogged;
      state.userPersonalData = data.userPersonalDataObject ?? null;
      state.userData = data.userData ?? null;
      state.constantsListsData = data.constantsListsData ?? null;
      state.usersPrivilegeData = data.usersPrivilegeData ?? null;
      state.userHomePage = "";
    },
    LOGOUT_USER: (state) => {
      state.userAuthorizeToken = null;
      state.ownerUserToken = null;
      state.loginStatus = false;
      state.isTeacherLogged = false;
      state.userPersonalData = null;
      state.userData = null;
      state.constantsListsData = null;
      state.usersPrivilegeData = null;
      state.userHomePage = DEFAULT_PAGES.notLoggedIn;
    },
    UPDATE_USER_AUTHORIZE_TOKEN: (state, userAuthorizeToken) => {
      state.userAuthorizeToken = userAuthorizeToken ?? null;
    },
    UPDATE_OWNER_USER_TOKEN: (state, ownerUserToken) => {
      state.ownerUserToken = ownerUserToken ?? null;
    },
    UPDATE_LOGIN_STATUS: (state, loginStatus) => {
      state.loginStatus = loginStatus;
    },
    SET_USER_HOME_PAGE: (state, userHomePage) => {
      state.userHomePage = userHomePage;
    },
  },
  actions: {
    loginUser({ commit }, data) {
      // localStorage.clear();
      // localStorage.setItem("currentLanguage", rootGetters.currentLanguage);
      // console.log(rootGetters);
      commit("UPDATE_USER_DATA", data);
    },
    logoutUser(context, message = i18n.t("logoutDone")) {
      context.commit("LOGOUT_USER");
      context.dispatch("setGeneralSetting", null);
      context.dispatch("addAlert", message);
      router.push({ name: DEFAULT_PAGES.notLoggedIn }).catch(() => {});
    },
    updateUserAuthorizeToken(context, token) {
      context.commit("UPDATE_USER_AUTHORIZE_TOKEN", token);
    },
    updateOwnerUserToken(context, token) {
      context.commit("UPDATE_OWNER_USER_TOKEN", token);
    },
    updateLoginStatus(context, status) {
      context.commit("UPDATE_LOGIN_STATUS", status);
    },
    setUserHomePage(context, userHomePage) {
      context.commit("SET_USER_HOME_PAGE", userHomePage);
    },
  },
  modules: {},
};

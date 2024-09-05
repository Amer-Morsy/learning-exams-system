import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persist-indexeddb";
import createPersistedState from "vuex-persistedstate";
// import * as Cookies from "js-cookie";
import SecureLS from "secure-ls";

import AppSetup from "./AppSetup";
import AppDom from "./AppDom";
import UserData from "./UserData";
import LoginCode from "./LoginCode";
import GeneralSettings from "./GeneralSettings";
import TestModule from "./TestModule";

const ls = new SecureLS({ isCompression: false });
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    appSetup: AppSetup,
    appDom: AppDom,
    UserData,
    LoginCode,
    GeneralSettings,
    TestModule,
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
        clear: () => ls.clear(),
      },
    }),
  ],
});

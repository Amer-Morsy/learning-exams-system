import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./api/axios";
import i18n from "./i18n/index";

import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import VueFileAgent from "vue-file-agent";
import VueFileAgentStyles from "vue-file-agent/dist/vue-file-agent.css";
import VCalendar from "v-calendar";

//#region styles
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-multiselect/dist/vue-multiselect.min.css";
import "./assets/styles/app.scss";
//#endregion styles

Vue.use(VueBottomSheet);
Vue.use(VueFileAgent);
Vue.use(VueFileAgentStyles);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VCalendar);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

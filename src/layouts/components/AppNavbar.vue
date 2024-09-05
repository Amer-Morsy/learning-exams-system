<template>
  <AuthNavbar
    v-if="layoutType == appLayouts.auth"
    @showOverlay="showContentOverlay()"
    @hideOverlay="hideContentOverlay()"
    @setAppTheme="setAppTheme($event)"
    @setAppLanguage="setAppLanguage($event)"
  />
  <DashboardNavbar
    v-else-if="layoutType == appLayouts.dashboard"
    @logout="logout()"
    @showOverlay="showContentOverlay()"
    @hideOverlay="hideContentOverlay()"
    @setAppTheme="setAppTheme($event)"
    @setAppLanguage="setAppLanguage($event)"
  />
  <AuthNavbar
    v-else
    @showOverlay="showContentOverlay()"
    @hideOverlay="hideContentOverlay()"
    @setAppTheme="setAppTheme($event)"
    @setAppLanguage="setAppLanguage($event)"
  />
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import AppDomController from "./../../controllers/AppDomController";
import AuthNavbar from "./AuthNavbar.vue";
import DashboardNavbar from "./DashboardNavbar.vue";
import apiUser from "./../../api/users/user";

export default {
  name: "AppNavbar",
  beforeCreate() {},
  props: {
    layoutType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      appDomController: new AppDomController(),
      showOverlay: false,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: { AuthNavbar, DashboardNavbar },
  computed: { ...mapGetters(["appLayouts"]) },
  methods: {
    ...mapActions(["hideContentOverlay", "showContentOverlay", "logoutUser"]),
    setAppTheme(theme) {
      this.appDomController.updateTheme(theme);
    },
    async setAppLanguage(lang) {
      await this.appDomController.updateLanguage(lang);
      localStorage.setItem("currentLanguage", lang);
      window.location.reload();
    },
    async logout() {
      await apiUser.logout();
      await this.hideContentOverlay();
      await this.logoutUser();
    },
  },
};
</script>

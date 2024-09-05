<template>
  <div class="app-layout dashboard-layout">
    <div
      class="app-navbar dashboard-navbar animate__animated animate__fadeInDown"
    >
      <AppNavbar :layoutType="appLayouts.dashboard" />
    </div>
    <div class="app-content dashboard-content">
      <BarsPreloader
        v-if="isBarsPreloaderShown"
        class="dashboard"
        :class="{
          'sidebar-opend': isSidebarOpened,
          'sidebar-closed': !isSidebarOpened,
          left: currentLanguage == appLanguages.enUS,
          right: currentLanguage == appLanguages.arEG,
        }"
      />
      <AppOverlay v-if="isContentOverlayShown" />
      <AppLayer
        v-if="isAppLayerShown"
        class="dashboard"
        :class="{
          'sidebar-opend': isSidebarOpened,
          'sidebar-closed': !isSidebarOpened,
          left: currentLanguage == appLanguages.enUS,
          right: currentLanguage == appLanguages.arEG,
        }"
        :currentLayerComponent="currentLayerComponent"
        @hideAppLayer="hideAppLayer()"
      />

      <div class="app-content-container">
        <div
          class="dashboard-content-container"
          :class="isSidebarOpened ? 'sidebar-opend' : 'sidebar-closed'"
        >
          <div
            class="dashboard-sidebar"
            :class="isSidebarOpened ? 'sidebar-opend' : 'sidebar-closed'"
          >
            <DashboardSidebar class="animate__animated animate__fadeInDown" />
          </div>
          <router-view
            class="main-content-container"
            :class="isSidebarOpened ? 'sidebar-opend' : 'sidebar-closed'"
          />
        </div>

        <div class="app-footer">
          <AppFooter />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import AppNavbar from "./components/AppNavbar.vue";
import BarsPreloader from "./../components/preloaders/BarsPreloader.vue";
import AppOverlay from "../components/general/AppOverlay.vue";
import AppLayer from "../components/general/AppLayer.vue";
import DashboardSidebar from "./components/DashboardSidebar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "DashboardLayout",

  beforeCreate() {},
  props: {},
  data() {
    return {};
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    AppNavbar,
    BarsPreloader,
    AppOverlay,
    AppLayer,
    DashboardSidebar,
    AppFooter,
  },
  computed: {
    ...mapGetters([
      "appLayouts",
      "appLanguages",
      "currentLanguage",
      "isBarsPreloaderShown",
      "isContentOverlayShown",
      "isAppLayerShown",
      "currentLayerComponent",
      "isSidebarOpened",
      "isContentOverlayShown",
    ]),
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
  },
};
</script>

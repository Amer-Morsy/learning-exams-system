<template>
  <div class="app-layout auth-layout">
    <div class="app-navbar auth-navbar animate__animated animate__fadeInDown">
      <AppNavbar :layoutType="appLayouts.auth" />
    </div>

    <div class="app-content auth-content">
      <BarsPreloader v-if="isBarsPreloaderShown" />
      <AppOverlay v-if="isContentOverlayShown" />
      <AppLayer
        v-if="isAppLayerShown"
        :currentLayerComponent="currentLayerComponent"
        @hideAppLayer="hideAppLayer()"
      />
      <div class="app-content-container">
        <router-view class="main-content-container" />
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
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "AuthLayout",
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
    AppFooter,
  },
  computed: {
    ...mapGetters([
      "appLayouts",
      "isBarsPreloaderShown",
      "isContentOverlayShown",
      "isAppLayerShown",
      "currentLayerComponent",
    ]),
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
  },
};
</script>

<template>
  <nav class="navbar-container auth-container" ref="navbarContainer">
    <div class="actions">
      <!-- @click="showloginLayer()" -->
      <router-link
        v-if="!loginStatus"
        class="actions-container"
        :to="{ name: 'Login' }"
      >
        <div class="link-with-icon">
          <img class="icon-md login-icon navbar-icon-home" :src="loginIcon" />
          <span class="link-title  cut-1line">{{ $t("login") }}</span>
        </div>
      </router-link>
    </div>
    <div class="prand ">
      <div class="prand-container">
        <router-link class="link-with-icon" :to="{ name: 'Home' }">
          <img
            class="icon-lg logo-icon"
            src="./../../assets/images/logo.png"
            alt=""
          />
          <span class="link-title  cut-1line">{{
            $t("projectName")
          }}</span></router-link
        >
      </div>
    </div>
    <div class="settings">
      <div class="settings-container">
        <SettingsDropdown
          @showOverlay="$emit('showOverlay')"
          @hideOverlay="$emit('hideOverlay')"
          @setAppTheme="$emit('setAppTheme', $event)"
          @setAppLanguage="$emit('setAppLanguage', $event)"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import loginIcon from "./../../assets/Icons/login1.svg";
import SettingsDropdown from "./../../components/dropdowns/SettingsDropdown.vue";

export default {
  name: "AuthNavbar",
  beforeCreate() {},
  props: {},
  data() {
    return {
      loginIcon,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    SettingsDropdown,
  },
  computed: {
    ...mapGetters(["loginStatus"]),
  },
  methods: {
    ...mapActions([
      "toggleSidebarStatus",
      "setCurrentLayerComponent",
      "showAppLayer",
    ]),
    showloginLayer() {
      this.setCurrentLayerComponent("Login");
      this.showAppLayer();
    },
  },
};
</script>

<template>
  <nav class="navbar-container dashboard-container" ref="navbarContainer">
    <div class="actions">
      <div class="actions-container">
        <div class="link-with-icon">
          <img
            class="icon-lg logo-icon"
            src="./../../assets/images/logo.png"
            alt=""
          />
          <span class="link-title  cut-2line">{{ $t("projectName") }}</span>
        </div>

        <img
          v-if="isSidebarOpened"
          class="icon-md navbar-icon toggel-sidebar-icon"
          :src="closeSidebarIcon"
          @click="toggleSidebarStatus()"
        />
        <img
          v-else
          class="icon-md navbar-icon toggel-sidebar-icon"
          :src="openSidebarIcon"
          @click="toggleSidebarStatus()"
        />
      </div>
    </div>
    <div class="prand ">
      <div class="prand-container">
        <div class="link-with-icon page-title-container">
          <img
            class="icon-lg"
            :src="require('@/assets/images/' + this.$route.meta.pageIcon)"
          />
          <span class="link-title cut-1line page-title">{{
            this.$route.meta.pageName
          }}</span>
        </div>
      </div>
    </div>
    <div class="page-actions">
      <!-- <i class="fas fa-bell icon-sc"></i> -->
    </div>
    <div class="settings">
      <div class="settings-container">
        <SettingsDropdown
          :model="users"
          @setUserData="setUserData($event)"
          :layoutType="appLayouts.dashboard"
          @logout="$emit('logout')"
          @showOverlay="$emit('showOverlay')"
          @hideOverlay="$emit('hideOverlay')"
          @setAppTheme="$emit('setAppTheme', $event)"
          @setAppLanguage="$emit('setAppLanguage', $event)"
        />
      </div>
    </div>
    <UserChangePassword
      :refName="'NavUserChangePassword'"
      @logout="$emit('logout')"
    />
    <UserUpdate :model="users" :fullbackAction="reLoadPage" />
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import closeSidebarIcon from "./../../assets/Icons/xmark.svg";
import openSidebarIcon from "./../../assets/Icons/bars-regular.svg";
import SettingsDropdown from "./../../components/dropdowns/SettingsDropdown.vue";
import settingIcon from "./../../assets/Icons/setting.svg";
import PrivilegeController from "./../../controllers/privilege/PrivilegeController";
import UserChangePassword from "./../../views/users/componets/UserChangePassword.vue";
import UserUpdate from "./../../views/users/componets/Update.vue";
import Users from "./../../models/users/Users";
import { USER_MODEL_NAME } from "../../utils/constants";

export default {
  name: "DashboardNavbar",
  beforeCreate() {},
  props: {},
  data() {
    return {
      users: new Users(USER_MODEL_NAME.Teacher),
      closeSidebarIcon,
      openSidebarIcon,
      settingIcon,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    SettingsDropdown,
    UserChangePassword,
    UserUpdate,
  },
  computed: {
    ...mapGetters(["isSidebarOpened", "appLayouts"]),
    hasAdd() {
      return PrivilegeController.hasAdd(this.$route.meta.privilegeModuleToken);
    },
  },
  methods: {
    ...mapActions([
      "toggleSidebarStatus",
      "setCurrentLayerComponent",
      "showAppLayer",
    ]),
    add() {
      this.setCurrentLayerComponent("Add");
      this.showAppLayer();
    },
    setUserData(user) {
      this.users.user.setInitialValue();
      this.users.user.fillData(user);
    },
    reLoadPage() {
      window.location.reload();

    },
  },
};
</script>

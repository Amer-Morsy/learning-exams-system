<template>
  <div class="dropdown-container">
    <template v-if="layoutType == appLayouts.dashboard">
      <b-dropdown
        toggle-class="text-decoration-none"
        no-caret
        variant="link"
        id="dropdown-id-navbar-settings-dashboard"
        :right="currentLanguage == appLanguages.enUS ? true : false"
        :left="currentLanguage == appLanguages.arEG ? true : false"
        @shown="$emit('showOverlay')"
        @hidden="$emit('hideOverlay')"
      >
        <template #button-content>
          <div class="user-profile">
            <span class="usert-name">{{ employeeName }}</span>
            <img
              class="icon-lg"
              :src="employeeImage"
              :onerror="`this.src='${require('@/assets/images/user.svg')}'`"
            />
          </div>
        </template>
        <!-- #region Profile -->
        <b-dropdown-item
          v-if="isTeacherLogged"
          @click="
            $emit('setUserData', userData);
            openBottomSheet(model.metaData.components.Update.refName);
          "
        >
          <div class="dropdown-item-container">
            <img class="icon-md" :src="userIcon" /><span>{{
              $t("userProfile")
            }}</span>
          </div>
        </b-dropdown-item>
        <!-- #endregion Profile -->
        <!-- #region Theme -->
        <b-dropdown-item
          v-if="currentTheme == appThemes.dark"
          @click="$emit('setAppTheme', appThemes.light)"
        >
          <div class="dropdown-item-container">
            <img class="icon-md" :src="themeLightIcon" /><span>{{
              $t("lightMode")
            }}</span>
          </div>
        </b-dropdown-item>
        <b-dropdown-item
          v-if="currentTheme == appThemes.light"
          @click="$emit('setAppTheme', appThemes.dark)"
        >
          <div class="dropdown-item-container">
            <img class="icon-md" :src="themeDarkIcon" /><span>{{
              $t("darkMode")
            }}</span>
          </div>
        </b-dropdown-item>
        <!-- #endregion Theme -->
        <!-- #region Language -->
        <b-dropdown-item
          v-if="currentLanguage == appLanguages.enUS"
          @click="$emit('setAppLanguage', appLanguages.arEG)"
        >
          <div class="dropdown-item-container">
            <img class="icon-md" :src="langArIcon" /><span>{{
              $t("general.langAr")
            }}</span>
          </div>
        </b-dropdown-item>
        <b-dropdown-item
          v-if="currentLanguage == appLanguages.arEG"
          @click="$emit('setAppLanguage', appLanguages.enUS)"
        >
          <div class="dropdown-item-container">
            <img class="icon-md" :src="langEnIcon" /><span>{{
              $t("general.langEn")
            }}</span>
          </div>
        </b-dropdown-item>
        <b-dropdown-item v-b-modal.UserChangePassword>
          <div class="dropdown-item-container">
            <img class="icon-md" src="@/assets/images/changePassword.svg" />
            <span>{{ $t("changePassword") }}</span>
          </div>
        </b-dropdown-item>
        <b-dropdown-item @click="$emit('logout')">
          <div class="dropdown-item-container">
            <img class="icon-md" src="@/assets/images/logout.svg" />
            <span>{{ $t("logout") }}</span>
          </div>
        </b-dropdown-item>

        <!-- #endregion Language -->
      </b-dropdown>
    </template>
    <template v-else>
      <b-dropdown
        toggle-class="text-decoration-none"
        no-caret
        variant="link"
        id="dropdown-id-navbar-settings-dashboard"
        :right="currentLanguage == appLanguages.enUS ? true : false"
        :left="currentLanguage == appLanguages.arEG ? true : false"
        @shown="$emit('showOverlay')"
        @hidden="$emit('hideOverlay')"
      >
        <template #button-content>
          <img
            class="icon-md navbar-icon-home settings-icon"
            :src="settingIcon"
          />
        </template>
        <!-- #region Theme -->
        <b-dropdown-item
          v-if="currentTheme == appThemes.dark"
          @click="$emit('setAppTheme', appThemes.light)"
        >
          <div class="dropdown-item-container">
            <img class="icon-md" :src="themeLightIcon" /><span>{{
              $t("lightMode")
            }}</span>
          </div>
        </b-dropdown-item>
        <b-dropdown-item
          v-if="currentTheme == appThemes.light"
          @click="$emit('setAppTheme', appThemes.dark)"
        >
          <div class="dropdown-item-container">
            <img class="icon-md" :src="themeDarkIcon" /><span>{{
              $t("darkMode")
            }}</span>
          </div>
        </b-dropdown-item>
        <!-- #endregion Theme -->
        <!-- #region Language -->
        <b-dropdown-item
          v-if="currentLanguage == appLanguages.enUS"
          @click="$emit('setAppLanguage', appLanguages.arEG)"
        >
          <div class="dropdown-item-container">
            <img class="icon-md" :src="langArIcon" /><span>{{
              $t("general.langAr")
            }}</span>
          </div>
        </b-dropdown-item>
        <b-dropdown-item
          v-if="currentLanguage == appLanguages.arEG"
          @click="$emit('setAppLanguage', appLanguages.enUS)"
        >
          <div class="dropdown-item-container">
            <img class="icon-md" :src="langEnIcon" /><span>{{
              $t("general.langEn")
            }}</span>
          </div>
        </b-dropdown-item>
        <!-- #endregion Language -->
      </b-dropdown>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import userIcon from "@/assets/images/user.svg";
import settingIcon from "@/assets/Icons/setting.svg";
import themeLightIcon from "@/assets/Icons/theme-light.svg";
import themeDarkIcon from "@/assets/Icons/theme-dark.svg";
import langArIcon from "@/assets/Icons/lang-ar.svg";
import langEnIcon from "@/assets/Icons/lang-en.svg";
import { BASE_URL } from "./../../utils/constants";
import generalMixin from "./../../utils/generalMixin";

export default {
  name: "SettingsDropdown",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    layoutType: {
      type: String,
      default: "",
    },
    model: {
      type: Object,
    },
  },
  data() {
    return {
      userIcon,
      settingIcon,
      themeLightIcon,
      themeDarkIcon,
      langArIcon,
      langEnIcon,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {},
  computed: {
    ...mapGetters([
      "isTeacherLogged",
      "userData",
      "appLayouts",
      "userPersonalData",
      "appLanguages",
      "appThemes",
      "currentLanguage",
      "currentTheme",
    ]),
    employeeName: function() {
      return this.userPersonalData.userNameCurrent ?? "";
    },
    employeeImage: function() {
      return BASE_URL + this.userPersonalData.userImagePath ?? "";
    },
  },
  methods: {},
};
</script>
<style lang="scss"></style>

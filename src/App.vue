<template>
  <div id="app" ref="viewBox">
    <component
      v-if="isResourcesAvailable"
      id="app-container"
      :is="resolveLayout"
    >
      <router-view></router-view>
    </component>
    <!-- <template v-if="currentProperties">
      <component :is="currentComponent" v-bind="currentProperties"></component>
    </template> -->
    <!-- <template v-if="currentComponent"> -->
    <!-- <component :is="currentComponent"></component> -->
    <!-- <component
          v-for="field in fields"
          :is="field.comp"
          :key="field.id"
        ></component> -->
    <!-- v-bind="currentProperties" -->
    <!-- </template> -->
  </div>
</template>

<script>
import "animate.css";
import AppDomController from "./controllers/AppDomController";
import AppSetupController from "./controllers/AppSetupController";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import AuthLayout from "./layouts/AuthLayout.vue";
import DashboardLayout from "./layouts/DashboardLayout.vue";
import BlankLayout from "./layouts/BlankLayout.vue";
import generalMixin from "./utils/generalMixin";

export default {
  name: "App",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {},
  data() {
    return {
      appDomController: new AppDomController(),
      appSetupController: new AppSetupController(),

      fields: [
        {
          comp: this.componentAdd,
          id: this.count++,
        },
      ],
      count: 0,
    };
  },
  created() {
    this.hideContentOverlay();
  },
  watch: {
    invalidLoginCodeStatus: function(v) {
      if (v) {
        this.$router.push({ name: "InvalidLoginClode" }).catch(() => {});
      }
    },
    // currentProps: function() {
    //   // this.openBottomSheet("QuestionBankTitleAdd");
    //   // setTimeout(function() {
    //   //   this.$root.$emit("openBottomSheet", "QuestionBankTitleAdd");
    //   // }, 500);
    //   this.$root.$emit("openBottomSheet", "QuestionBankTitleAdd");
    //   // this.$refs["QuestionBankTitleAdd"].open();
    // },
    haveAlerts(v) {
      if (v) this.showAlerts();
    },
  },
  beforeMount() {},
  mounted() {},
  components: {
    AuthLayout,
    DashboardLayout,
    BlankLayout,
  },
  computed: {
    ...mapGetters([
      "haveAlerts",
      "alertsList",
      "isDangerAlert",
      "currentLayerComponent",
      "currentProps",
      "isResourcesAvailable",
      "invalidLoginCodeStatus",
      "appLanguages",
      "appThemes",
      "appLayouts",
      "currentLanguage",
      "currentTheme",
    ]),

    // currentComponent() {
    //   let path = this.currentLayerComponent;
    //   const Component = () => import(`./views/${path}`);
    //   return Component;
    // },
    // currentProperties() {
    //   return this.currentProps;
    // },

    resolveLayout: function() {
      this.appDomController.updateLanguage(this.currentLanguage);
      this.appDomController.updateTheme(this.currentTheme);
      let currentLayout = this.$route.meta.layout;
      this.appDomController.setCurrentLayout(currentLayout);
      const appLayoutClasses = this.appDomController.get_appLayoutClasses();
      switch (currentLayout) {
        case this.appLayouts.auth:
          return appLayoutClasses.auth;
        case this.appLayouts.dashboard:
          return appLayoutClasses.dashboard;
        case this.appLayouts.blank:
          return appLayoutClasses.blank;
        default:
          return appLayoutClasses.default;
      }
    },
  },
  methods: {
    ...mapActions(["hideContentOverlay"]),

    showAlerts() {
      this.alertsList.forEach((alertMsg) => {
        this.showMsg(alertMsg, !this.isDangerAlert);
      });
    },
  },
};
</script>

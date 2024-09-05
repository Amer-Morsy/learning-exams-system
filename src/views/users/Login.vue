<template>
  <div class="page-container login-container">
    <!-- v-if="isAppLayerShown" -->
    <!-- class="animate__animated animate__bounceIn" -->
    <LoginForm
      :userLogin="userLogin"
      :userSignUp="userSignUp"
      @login="login()"
      @signUp="signUp()"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import UserLogin from "./../../models/users/UserLogin";
import UserSignUp from "./../../models/users/UserSignUp";
import LoginForm from "./componets/LoginForm.vue";
import generalMixin from "../../utils/generalMixin";
import GeneralSetting from "../../models/general/generalSettings/GeneralSetting";
import apiUser from "./../../api/users/user";
import {
  USER_TYPE,
  AUTHENTICATION_LOGIN_TYPE_TOKENS,
  CODE_IN_LOGIN_TYPE_TOKENS,
} from "./../../utils/constantLists";
// import { objectToFormDataJSON } from "./../../utils/functions";
import AppSetupController from "./../../controllers/AppSetupController";
import PrivilegeController from "./../../controllers/privilege/PrivilegeController";

export default {
  name: "Login",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {},
  data() {
    return {
      userLogin: new UserLogin(),
      userSignUp: new UserSignUp(),
      generalSetting: new GeneralSetting(),
      userHomePage: "",
    };
  },
  created() {
    // console.log("login");
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: { LoginForm },
  computed: {
    ...mapGetters(["isAppLayerShown", "loginStatus"]),
  },
  methods: {
    ...mapActions(["setGeneralSetting"]),

    async signUp() {
      let objData = {
        establishmentToken: this.userSignUp.establishmentToken,
        userData: this.userSignUp.userData,
        userPlatformSessionData: this.userSignUp.userPlatformSessionData,
        userDeviceData: this.userSignUp.userDeviceData,
        userAppSettingData: this.userSignUp.userAppSettingData,
      };
      let dataJson = JSON.stringify(objData);
      let formData = new FormData();
      formData.append("registrationModule", dataJson);
      const response = await apiUser.signUp(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        await this.saveUserData(response.data.apiAppData);
        if (this.loginStatus) this.showMsg(response.data.msg, true);
      } else if (response.data.status == this.STATUS.INVALID_LOGIN_CODE) {
        this.handelLoginCode(response);
      } else {
        this.showMsg(response.data.msg);
      }
    },
    async login() {
      const response = await apiUser.login(this.userLogin);
      if (response.data.status == this.STATUS.SUCCESS) {
        let isStudentLogged =
          response.data.apiAppData.userData.userTypeToken == USER_TYPE.Student;
        // console.log("zz", isStudentLogged);

        if (isStudentLogged) {
          this.showMsg(
            this.$t("sorryStudentDoNotHaveThisPermissionToLoginFromWeb")
          );
          apiUser.logout();
          this.$store.dispatch("logoutUser");
        } else {
          await this.saveUserData(response.data.apiAppData);
          if (this.loginStatus) this.showMsg(response.data.msg, true);
        }
      } else if (response.data.status == this.STATUS.INVALID_LOGIN_CODE) {
        this.handelLoginCode(response);
      } else {
        this.showMsg(response.data.msg);
      }
    },
    handelLoginCode(response) {
      let codeInLoginTypeToken =
        response.data.apiAppData.userData.establishmentRoleData
          .codeInLoginTypeToken;

      let authenticationLoginTypeToken =
        response.data.apiAppData.userData.establishmentRoleData
          .authenticationLoginTypeToken;

      if (
        codeInLoginTypeToken == CODE_IN_LOGIN_TYPE_TOKENS.DeviceGenerated &&
        (authenticationLoginTypeToken ==
          AUTHENTICATION_LOGIN_TYPE_TOKENS.Option_1 ||
          authenticationLoginTypeToken ==
            AUTHENTICATION_LOGIN_TYPE_TOKENS.Option_3)
      ) {
        // logout
        this.showMsg(this.$t("UserLoginCodes.canNotLoginToThisPlatFrom"));
        setTimeout(function() {
          this.$store.dispatch("logoutUser", response.data.msg);
        }, 2000);
      } else if (
        codeInLoginTypeToken == CODE_IN_LOGIN_TYPE_TOKENS.DeviceGenerated &&
        (authenticationLoginTypeToken ==
          AUTHENTICATION_LOGIN_TYPE_TOKENS.Option_2 ||
          authenticationLoginTypeToken ==
            AUTHENTICATION_LOGIN_TYPE_TOKENS.Option_4)
      ) {
        // login
        // console.log("Login case 1 - login");
        this.saveUserData(response.data.apiAppData);
      } else if (
        codeInLoginTypeToken == CODE_IN_LOGIN_TYPE_TOKENS.SystemGenerated
      ) {
        // get code
        // console.log("Login case 2 - get code");
        this.$store.dispatch("updateLoginCodeStatus", true);
        this.$store.dispatch("updateLoginCodeMessage", response.data.msg);
        this.saveUserData(response.data.apiAppData);
      } else {
        // console.log("Login case 3 - else");
        this.showMsg(response.data.msg);
      }
    },
    async saveUserData(apiAppData) {
      let userHomePage = "EducationalCategories";

      let isTeacherLogged =
        apiAppData.userData.userTypeToken == USER_TYPE.Teacher;

      let isAdminLogged =
        apiAppData.userData.userTypeToken == USER_TYPE.AdminsEgypt;

      if (apiAppData) {
        const userPersonalDataObject = {
          userEmail: apiAppData.userData.userEmail,
          userImagePath: apiAppData.userData.userImagePath,
          userName: apiAppData.userData.userName,
          userNameAr: apiAppData.userData.userNameAr,
          userNameCurrent: apiAppData.userData.userNameCurrent,
          userNameEn: apiAppData.userData.userNameEn,
          userNameUnd: apiAppData.userData.userNameUnd,
          userPassword: apiAppData.userData.userPassword,
          userPhone: apiAppData.userData.userPhone,
          userPhoneCountryCode: apiAppData.userData.userPhoneCountryCode,
          userPhoneCountryCodeName:
            apiAppData.userData.userPhoneCountryCodeName,
          userPhoneWithCC: apiAppData.userData.userPhoneWithCC,
          userToken: apiAppData.userData.userToken,
          userActivityTypeToken: apiAppData.userData.userActivityTypeToken,
          userTypeNameAr: apiAppData.userData.userTypeNameAr,
          userTypeNameCurrent: apiAppData.userData.userTypeNameCurrent,
          userTypeNameEn: apiAppData.userData.userTypeNameEn,
          userTypeNameUnd: apiAppData.userData.userTypeNameUnd,
          userTypeToken: apiAppData.userData.userTypeToken,
          activationTypeToken: apiAppData.userData.activationTypeToken,
        };

        let data = {
          userAuthorizeToken: apiAppData.userAuthorizeToken,
          isTeacherLogged: isTeacherLogged,
          userPersonalDataObject,
          userData: apiAppData.userData,
          constantsListsData: apiAppData.constantsListsData,
          usersPrivilegeData:
            apiAppData.userData.establishmentRoleData.modulePrivilegeData,
        };
        if (
          !data.usersPrivilegeData.length &&
          userPersonalDataObject.userTypeToken != USER_TYPE.AdminsEgypt
        ) {
          this.showMsg(this.$t("sorryYouDoNotHaveThisPermission"));
          this.$store.dispatch(
            "updateUserAuthorizeToken",
            data.userAuthorizeToken
          );
          apiUser.logout();
          this.$store.dispatch("logoutUser");
        } else {
          this.setGeneralSetting(this.generalSetting);
          this.$store.dispatch("loginUser", data);
          if (!isAdminLogged) {
            this.$store.dispatch(
              "updateOwnerUserToken",
              apiAppData.userData.userToken
            );
            userHomePage = await this.getFirstVaildRoute();
          }
          if (userHomePage) {
            this.$store.dispatch("setUserHomePage", userHomePage);
            this.$store.dispatch("hideAppLayer");
            this.$router.push({ name: userHomePage }).catch(() => {});
          } else {
            this.showMsg(this.$t("sorryYouDoNotHaveThisPermission"));
            this.$store.dispatch(
              "updateUserAuthorizeToken",
              data.userAuthorizeToken
            );
            apiUser.logout();
            this.$store.dispatch("logoutUser");
          }
        }
      } else {
        this.showMsg(this.$t("Login.noData"));
      }
    },
    async getFirstVaildRoute() {
      let routeName = "";
      const APPLAYOUTS = AppSetupController.appLayouts();

      let dashboardRoutes = this.$router.options.routes
        .filter((r) => r.meta.layout == APPLAYOUTS.dashboard)
        .map((res) => {
          let hasView = PrivilegeController.hasView(
            res.meta.privilegeModuleToken
          );
          let obj = {
            name: res.name,
            hasView: hasView,
          };
          return obj;
        })
        .filter((v) => v.hasView);

      if (dashboardRoutes.length) routeName = dashboardRoutes[0]["name"];

      return routeName;
    },
  },
};
</script>

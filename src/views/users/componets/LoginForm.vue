<template>
  <div v-if="!showSignUp" class="login-form-container">
    <div
      class="login100-pic js-tilt animate__animated animate__fadeInDown"
      data-tilt
    >
      <img src="@/assets/images/illustrator-login.svg" alt="IMG" />
    </div>

    <form
      class="login100-form validate-form"
      method="post"
      @submit.prevent="loginSubmit"
    >
      <div class="container-logo animate__animated animate__fadeInDown">
        <img src="@/assets/images/logo.png" alt="LOGO" class="logo" />
      </div>

      <div class="row ">
        <CustomInput
          className="col-12"
          id="userNameOrPhoneOrEmail"
          :errors="errors_user"
          :value="userLogin.user"
          v-on:changeValue="
            userLogin.user = $event;
            $v.userLogin.user.$touch();
          "
          :title="$t('userNameOrPhoneOrEmail')"
          :imgName="'man.svg'"
          class="animate__animated animate__fadeInUpBig"
        />
        <CustomInputPassword
          className="col-12"
          id="userPassword"
          :errors="errors_userPassword"
          :value="userLogin.userPassword"
          v-on:changeValue="
            userLogin.userPassword = $event;
            $v.userLogin.userPassword.$touch();
          "
          :title="$t('password')"
          :imgName="'passwordlock.svg'"
          class="animate__animated animate__fadeInUpBig"
        />
      </div>
      <div
        class="login-form-container-form-btn animate__animated animate__fadeInUpBig"
      >
        <button name="login" type="submit" class="login100-form-btn">
          {{ $t("login") }}
        </button>
      </div>
      <div class="login-form-container-form-link centering mt-3">
        <span
          @click="
            userSignUp.setInitialValue;
            showSignUp = true;
          "
          class="link animate__animated animate__fadeInUpBig"
        >
          {{ $t("signUp") }}
        </span>
      </div>
    </form>
  </div>
  <div v-else class="login-form-container">
    <div
      class="login100-pic js-tilt animate__animated animate__fadeInDown"
      data-tilt
    >
      <img src="@/assets/images/logo.png" alt="LOGO" class="logo" />
    </div>

    <form
      class="login100-form validate-form"
      method="post"
      @submit.prevent="loginSubmit"
    >
      <div class="row animate__animated animate__fadeInUpBig">
        <CustomInput
          :className="'col-md-12'"
          :id="`SignUp-userNameAr`"
          :value="userSignUp.userData.userNameAr"
          v-on:changeValue="userSignUp.userData.userNameAr = $event"
          :title="$t('general.nameAr')"
          :imgName="'user.svg'"
        />
        <CustomInput
          :className="'col-md-12'"
          :id="`SignUp-userNameEn`"
          :value="userSignUp.userData.userNameEn"
          v-on:changeValue="userSignUp.userData.userNameEn = $event"
          :title="$t('general.nameEn')"
          :imgName="'user.svg'"
        />
        <CustomPhonePicker
          :className="'col-md-12'"
          :id="`SignUp-phone`"
          :countryCodeName="userSignUp.userData.userPhoneCountryCodeName"
          :countryCode="userSignUp.userData.userPhoneCountryCode"
          :phoneNumber="userSignUp.userData.userPhone"
          :title="$t('Users.phone')"
          :imgName="'phone.svg'"
          v-on:changeValue="setPhone($event)"
        />
        <CustomInput
          :className="'col-md-12'"
          :id="`SignUp-email`"
          :value="userSignUp.userData.userEmail"
          v-on:changeValue="userSignUp.userData.userEmail = $event"
          :title="$t('Users.email')"
          :imgName="'email.svg'"
        />
        <CustomInput
          :className="'col-md-12'"
          :id="`SignUp-userName`"
          :value="userSignUp.userData.userName"
          v-on:changeValue="userSignUp.userData.userName = $event"
          :title="$t('Users.userName')"
          :imgName="'users.svg'"
        />
        <CustomInputPassword
          className="col-12"
          id="SignUp-userPassword"
          :value="userSignUp.userData.userPassword"
          v-on:changeValue="userSignUp.userData.userPassword = $event"
          :title="$t('password')"
          :imgName="'passwordlock.svg'"
        />
      </div>
      <div
        class="login-form-container-form-btn animate__animated animate__fadeInDownBig"
      >
        <button name="signUp" type="submit" class="login100-form-btn">
          {{ $t("signUp") }}
        </button>
      </div>
      <div class="login-form-container-form-link centering mt-3">
        <span
          @click="
            userSignUp.setInitialValue;
            showSignUp = false;
          "
          class="link animate__animated animate__fadeInDownBig"
        >
          {{ $t("login") }}
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import CustomInput from "../../../components/inputs/CustomInput.vue";
import CustomPhonePicker from "../../../components/inputs/CustomPhonePicker.vue";
import CustomInputPassword from "../../../components/inputs/CustomInputPassword.vue";
import { isValidPassword } from "../../../utils/validationHelper";
import generalMixin from "../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "LoginForm",
  mixins: [validationMixin, generalMixin],
  beforeCreate() {},
  props: {
    userLogin: {
      type: Object,
      default: null,
    },
    userSignUp: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showSignUp: false,
    };
  },
  created() {},
  validations: {
    userLogin: {
      user: { required },
      phoneOrEmail: { required },
      userPassword: { isValidPassword },
    },
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomInput,
    CustomPhonePicker,
    CustomInputPassword,
  },
  computed: {
    errors_user() {
      let errors = [];
      if (this.$v.userLogin.user.$error) {
        if (!this.$v.userLogin.user.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_phoneOrEmail() {
      let errors = [];
      if (this.$v.userLogin.phoneOrEmail.$error) {
        if (!this.$v.userLogin.phoneOrEmail.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userPassword() {
      let errors = [];
      if (this.$v.userLogin.userPassword.$error) {
        if (!this.$v.userLogin.userPassword.isValidPassword)
          errors.push(this.$t("validation.passwordIsNotValid"));
      }
      return errors;
    },
  },
  methods: {
    setPhone(data) {
      this.userSignUp.userData.userPhoneCountryCodeName = data.countryCodeName;
      this.userSignUp.userData.userPhoneCountryCode = data.countryCode;
      this.userSignUp.userData.userPhone = data.phoneNumber;
    },
    async loginSubmit() {
      if (this.showSignUp) {
        // this.userSignUp.fillData(this.userSignUp);
        this.$emit("signUp");
      } else {
        this.$v.$touch();
        if (
          this.$v.userLogin.user.required &&
          this.$v.userLogin.userPassword.isValidPassword
        ) {
          this.$emit("login");
        }
      }
    },
  },
  destroyed() {
    this.userLogin.setInitialValue();
  },
};
</script>

<style lang="scss"></style>

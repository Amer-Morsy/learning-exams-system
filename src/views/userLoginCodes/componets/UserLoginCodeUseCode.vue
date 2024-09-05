<template>
  <div class="">
    <CustomBottomSheet
      :refName="'UserLoginCodeUseCode'"
      size="xl"
      :headerText="$t('UserLoginCodes.useLoginCode')"
      :headerIcon="icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <div class="">
        <form autocomplete="off" @submit.prevent="useLoginCode()">
          <div class="row">
            <h2>{{ invalidLoginCodeMessage }}</h2>
          </div>
          <div class="use-code-form-content-container">
            <div class="use-code-form-content-img">
              <img src="@/assets/images/illustrator-login.svg" alt="IMG" />
            </div>
            <div class="use-code-form-content-data">
              <div class="row">
                <CustomInput
                  :className="'col-md-12'"
                  :id="`loginCode`"
                  :value="loginCode"
                  v-on:changeValue="loginCode = $event"
                  :title="$t('UserLoginCodes.loginCode')"
                  :imgName="'UserLoginCodes.svg'"
                />
              </div>
            </div>
          </div>

          <div class="form-actions">
            <div class="icon-submit" @click.prevent="useLoginCode()">
              <img
                src="@/assets/images/check-icon.svg"
                :title="$t('UserLoginCodes.useLoginCode')"
              />
            </div>
            <div class="icon-cancel" @click.prevent="logoutUser()">
              <img
                src="@/assets/images/cancel-icon.svg"
                :title="$t('logout')"
              />
            </div>
          </div>
        </form>
      </div>
    </CustomBottomSheet>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CustomBottomSheet from "../../../components/general/CustomBottomSheet.vue";
import CustomInput from "../../../components/inputs/CustomInput.vue";
import icon from "@/assets/images/UserLoginCodes.svg";
import { STATUS } from "../../../utils/constants";
import { objectToFormData } from "../../../utils/functions";
import apiUserLoginCode from "./../../../api/userLoginCodes/userLoginCode";
import generalMixin from "../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomBottomSheet,
    CustomInput,
  },
  data() {
    return {
      icon,
      loginCode: "",
    };
  },
  computed: {
    ...mapGetters(["userHomePage", "invalidLoginCodeMessage"]),
  },
  methods: {
    async useLoginCode() {
      let formData = objectToFormData({ loginCode: this.loginCode });
      try {
        const response = await apiUserLoginCode.useLoginCode(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(true, response.data.msg);
          this.$store.dispatch("updateLoginCodeStatus", false);
          this.$store.dispatch("updateLoginCodeMessage", "");
          this.$store.dispatch(
            "updateUserAuthorizeToken",
            response.data.userAuthorizeToken
          );
          this.$router.push({ name: this.userHomePage }).catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
    },
    async logoutUser() {
      this.isLoading = true;
      this.$store.dispatch("updateLoginCodeStatus", false);
      this.$store.dispatch("updateLoginCodeMessage", "");
      this.$store.dispatch("logoutUser", this.$t("logoutDone"));
    },
  },
};
</script>
<style scoped>
.use-code-form-content-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
  max-height: 90%;
}
.use-code-form-content-img,
.use-code-form-content-data {
  width: 50%;
}
.use-code-form-content-img img {
  width: 100%;
  height: 500px;
}
</style>

<template>
  <b-modal id="UserLoginCodeReset" scrollable centered hide-footer>
    <template #modal-title>
      <h3 v-if="isResetTypeLoginCode">
        <img src="@/assets/images/UserLoginCodes.svg" class="icon-lg" />
        {{ $t("UserLoginCodes.resetCode") }}
      </h3>
      <h3 v-else>
        <img src="@/assets/images/pc.svg" class="icon-lg" />
        {{ $t("UserLoginCodes.resetDevice") }}
      </h3>
    </template>

    <div class="row">
      <CustomCheckbox
        :className="'col-md-12'"
        :value="userLoginCode.resetForAllPlatFrom"
        v-on:changeValue="userLoginCode.resetForAllPlatFrom = $event"
        :title="$t('UserLoginCodes.resetForAllPlatFrom')"
      />
      <CustomSelectBox
        v-if="!userLoginCode.resetForAllPlatFrom"
        :className="'col-12'"
        :id="'userLoginCodePlatFromToken'"
        :value="userLoginCode.userLoginCodePlatFromToken"
        :options="userLoginCodePlatFromTokenOptions"
        v-on:changeValue="userLoginCode.userLoginCodePlatFromToken = $event"
        :title="$t('PlatFroms.select')"
        :imgName="'type.svg'"
      />
    </div>

    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="reset"
      >
        {{ $t("ok") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('UserLoginCodeReset')"
      >
        {{ $t("cancel") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import CustomSelectBox from "../../../components/inputs/CustomSelectBox.vue";
import CustomCheckbox from "../../../components/inputs/CustomCheckbox.vue";
import { STATUS } from "../../../utils/constants";
import { objectToFormData } from "../../../utils/functions";
import { getDialogOfPlatFormType } from "../../../utils/dialogsOfConstantsLists";
import UserLoginCodes from "./../../../models/userLoginCodes/UserLoginCodes";
import apiUserLoginCode from "./../../../api/userLoginCodes/userLoginCode";
import generalMixin from "../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomSelectBox,
    CustomCheckbox,
  },
  data() {
    return {
      userLoginCodePlatFromTokenOptions: getDialogOfPlatFormType() || [],
      userLoginCode: {},
    };
  },
  props: {
    userTypeToken: {
      type: String,
      default: "",
    },
    loginCodeModelName: {
      type: String,
      default: "",
    },
    userToken: {
      type: String,
      default: "",
    },
    isResetTypeLoginCode: {
      type: Boolean,
      default: true,
    },
  },
  computed: {},
  methods: {
    async reset() {
      let model = {
        userToken: this.userToken,
        userTypeToken: this.userTypeToken,
        resetForAllPlatFrom: this.userLoginCode.resetForAllPlatFrom,
        userLoginCodePlatFromToken: this.userLoginCode
          .userLoginCodePlatFromToken,
      };
      let formData = objectToFormData(model);
      if (this.isResetTypeLoginCode) {
        this.ResetUserLoginCode(formData);
      } else {
        this.ResetUserDeviceCode(formData);
      }
    },
    async ResetUserLoginCode(formData) {
      try {
        const response = await apiUserLoginCode.ResetUserLoginCode(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          setTimeout(() => {
            this.$bvModal.hide("UserLoginCodeReset");
            this.$emit("refresh");
          }, 2000);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
    },
    async ResetUserDeviceCode(formData) {
      try {
        const response = await apiUserLoginCode.ResetUserDeviceCode(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          setTimeout(() => {
            this.$bvModal.hide("UserLoginCodeReset");
            this.$emit("refresh");
          }, 2000);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
    },
  },
  async created() {
    this.userLoginCode = new UserLoginCodes(
      this.loginCodeModelName
    ).userLoginCode;
  },
};
</script>

<template>
  <div class="">
    <form class="" autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="userWalletTransaction.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              userWalletTransaction.userWalletTransactionImagePath,
              userWalletTransaction.defaultImg
            )
          "
        />
      </div>
      <div class="row">
        <template v-if="!isPaySalary">
          <CustomSelectBox
            :className="'col-md-10'"
            :id="`${id}-userToken`"
            :errors="errors_userToken"
            :value="userWalletTransaction.userToken"
            :options="userTokenOptions"
            v-on:changeValue="
              userWalletTransaction.userToken = $event;
              $v.userWalletTransaction.userToken.$touch();
            "
            :title="$t('Users.select')"
            :imgName="'user.svg'"
          />

          <CustomInput
            :className="'col-md-5'"
            :id="`${id}-fullCode`"
            :value="userWalletTransaction.fullCode"
            v-on:changeValue="userWalletTransaction.fullCode = $event"
            :title="$t('UserWalletTransactions.code')"
            :imgName="'code.svg'"
          />
          <CustomSelectBox
            :className="'col-md-5'"
            :id="`${id}-userWalletTransactionTypeToken`"
            :errors="errors_userWalletTransactionTypeToken"
            :value="userWalletTransaction.userWalletTransactionTypeToken"
            :options="userWalletTransactionTypeTokenOptions"
            v-on:changeValue="
              userWalletTransaction.userWalletTransactionTypeToken = $event;
              $v.userWalletTransaction.userWalletTransactionTypeToken.$touch();
            "
            :title="$t('UserWalletTransactions.type')"
            :imgName="'type.svg'"
          />

          <CustomInputFloat
            :className="'col-md-5'"
            :id="`${id}-userWalletTransactionValue`"
            :errors="errors_userWalletTransactionValue"
            :value="userWalletTransaction.userWalletTransactionValue"
            v-on:changeValue="
              userWalletTransaction.userWalletTransactionValue = $event;
              $v.userWalletTransaction.userWalletTransactionValue.$touch();
            "
            :title="$t('general.value')"
            :imgName="'money.svg'"
          />
          <CustomSelectBox
            :className="'col-md-5'"
            :id="`${id}-userWalletTransactionMethodToken`"
            :value="userWalletTransaction.userWalletTransactionMethodToken"
            :options="userWalletTransactionMethodTokenOptions"
            v-on:changeValue="
              userWalletTransaction.userWalletTransactionMethodToken = $event
            "
            :title="$t('paymentMethod')"
            :imgName="'paymentMethods.svg'"
          />

          <TextArea
            :className="'col-md-10'"
            :id="`${id}-userWalletTransactionNotes`"
            :value="userWalletTransaction.userWalletTransactionNotes"
            v-on:changeValue="
              userWalletTransaction.userWalletTransactionNotes = $event
            "
            :title="$t('general.notes')"
            :imgName="'notes.svg'"
          />
        </template>
        <template v-else>
          <CustomInput
            :className="'col-md-5'"
            :id="`${id}-fullCode`"
            :value="userWalletTransaction.fullCode"
            v-on:changeValue="userWalletTransaction.fullCode = $event"
            :title="$t('UserWalletTransactions.code')"
            :imgName="'code.svg'"
          />
          <CustomInputFloat
            :className="'col-md-5'"
            :id="`${id}-userWalletTransactionValue`"
            :errors="errors_userWalletTransactionValue"
            :value="userWalletTransaction.userWalletTransactionValue"
            v-on:changeValue="
              userWalletTransaction.userWalletTransactionValue = $event;
              $v.userWalletTransaction.userWalletTransactionValue.$touch();
            "
            :title="$t('general.value')"
            :imgName="'money.svg'"
          />

          <CustomSelectBox
            :className="'col-md-10'"
            :id="`${id}-userWalletTransactionMethodToken`"
            :value="userWalletTransaction.userWalletTransactionMethodToken"
            :options="userWalletTransactionMethodTokenOptions"
            v-on:changeValue="
              userWalletTransaction.userWalletTransactionMethodToken = $event
            "
            :title="$t('paymentMethod')"
            :imgName="'paymentMethods.svg'"
          />

          <TextArea
            :className="'col-md-10'"
            :id="`${id}-userWalletTransactionNotes`"
            :value="userWalletTransaction.userWalletTransactionNotes"
            v-on:changeValue="
              userWalletTransaction.userWalletTransactionNotes = $event
            "
            :title="$t('general.notes')"
            :imgName="'notes.svg'"
          />
        </template>
      </div>

      <div class="form-actions">
        <div class="icon-submit" @click.prevent="submitForm">
          <img src="@/assets/images/check-icon.svg" />
        </div>
        <div @click="$emit('close')" class="icon-cancel">
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CustomInput from "../../../components/inputs/CustomInput.vue";
import CustomInputFloat from "../../../components/inputs/CustomInputFloat.vue";
import TextArea from "../../../components/inputs/TextArea.vue";
import CustomFileInput from "../../../components/inputs/CustomFileInput.vue";
import CustomSelectBox from "../../../components/inputs/CustomSelectBox.vue";
import {
  getDialogOflistPaymentMethod,
  getDialogOfWalletTransactionType,
} from "../../../utils/dialogsOfConstantsLists";
import { getUsersDialog } from "../../../utils/dialogsOfApi";
import { USER_TYPE } from "../../../utils/constantLists";
import { USER_MODEL_NAME } from "../../../utils/constants";
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../utils/functions";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import generalMixin from "./../../../utils/generalMixin";

export default {
  name: "UserWalletTransactionForm",
  mixins: [validationMixin, generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
    id: {
      type: String,
      default: "id",
    },
    isRendered: {
      type: Boolean,
      default: false,
    },
    userWalletTransaction: {
      type: Object,
    },
  },
  validations: {
    userWalletTransaction: {
      userToken: { required },
      userWalletTransactionTypeToken: { required },
      userWalletTransactionValue: { required },
    },
  },
  data() {
    return {
      userWalletTransactionMethodTokenOptions: getDialogOflistPaymentMethod(),
      userTokenOptions: [],
      userWalletTransactionTypeTokenOptions:
        getDialogOfWalletTransactionType().slice(0, 2),
    };
  },

  created() {},
  watch: {
    async isRendered(v) {
      if (!this.isPaySalary) {
        if (v) {
          switch (this.userTypeToken) {
            case USER_TYPE.Student:
              await this.getStudentsDialog();
              break;
            case USER_TYPE.Teacher:
              await this.getTeachersDialog();
              break;
            case USER_TYPE.Employee:
              await this.getEmployeesDialog();
              break;
            case USER_TYPE.Parent:
              await this.getParentsDialog();
              break;
            case USER_TYPE.MasterAdmin:
              await this.getMasterAdminsDialog();
              break;
          }
        }
      }
    },
  },
  beforeMount() {},
  mounted() {},
  components: {
    CustomInput,
    CustomInputFloat,
    TextArea,
    CustomFileInput,
    CustomSelectBox,
  },
  computed: {
    isPaySalary() {
      return this.model.isPaySalary;
    },
    userTypeToken() {
      return this.userWalletTransaction.userTypeToken;
    },

    errors_userToken() {
      let errors = [];
      if (this.$v.userWalletTransaction.userToken.$error) {
        if (!this.$v.userWalletTransaction.userToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userWalletTransactionValue() {
      let errors = [];
      if (this.$v.userWalletTransaction.userWalletTransactionValue.$error) {
        if (!this.$v.userWalletTransaction.userWalletTransactionValue.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userWalletTransactionTypeToken() {
      let errors = [];
      if (this.$v.userWalletTransaction.userWalletTransactionTypeToken.$error) {
        if (
          !this.$v.userWalletTransaction.userWalletTransactionTypeToken.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
  },
  methods: {
    fullPathFileFromServer,
    async getStudentsDialog() {
      let params = {
        modelName: USER_MODEL_NAME.Student,
        userTypeToken: USER_TYPE.Student,
      };
      this.userTokenOptions = await getUsersDialog(params);
    },
    async getTeachersDialog() {
      let params = {
        modelName: USER_MODEL_NAME.Teacher,
        userTypeToken: USER_TYPE.Teacher,
      };
      this.userTokenOptions = await getUsersDialog(params);
    },
    async getEmployeesDialog() {
      let params = {
        modelName: USER_MODEL_NAME.Employee,
        userTypeToken: USER_TYPE.Employee,
      };
      this.userTokenOptions = await getUsersDialog(params);
    },
    async getParentsDialog() {
      let params = {
        modelName: USER_MODEL_NAME.Parent,
        userTypeToken: USER_TYPE.Parent,
      };
      this.userTokenOptions = await getUsersDialog(params);
    },
    async getMasterAdminsDialog() {
      let params = {
        modelName: USER_MODEL_NAME.MasterAdmin,
        userTypeToken: USER_TYPE.MasterAdmin,
      };
      this.userTokenOptions = await getUsersDialog(params);
    },

    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (!this.isPaySalary) {
        if (
          this.$v.userWalletTransaction.userToken.required &&
          this.$v.userWalletTransaction.userWalletTransactionValue.required &&
          this.$v.userWalletTransaction.userWalletTransactionTypeToken.required
        ) {
          this.$emit("submitForm");
        }
      } else {
        this.$emit("submitForm");
      }
    },
  },
};
</script>

<template>
  <div class="">
    <form class="" autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="userLoginCode.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              userLoginCode.userLoginCodeImagePath,
              userLoginCode.defaultImg
            )
          "
          :deleteFileStatus="deleteFileStatus"
          @deleteFile="$emit('deleteFile')"
        />
      </div>
      <div class="row">
        <CustomInput
          :className="'col-md-6'"
          :id="`${id}-fullCode`"
          :value="userLoginCode.fullCode"
          v-on:changeValue="userLoginCode.fullCode = $event"
          :title="$t('UserLoginCodes.code')"
          :imgName="'code.svg'"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="`${id}-userToken`"
          :errors="errors_userToken"
          :value="userLoginCode.userToken"
          :options="userTokenOptions"
          v-on:changeValue="
            userLoginCode.userToken = $event;
            $v.userLoginCode.userToken.$touch();
          "
          :title="$t('Users.select')"
          :imgName="'user.svg'"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="`${id}-userLoginCodePlatFromToken`"
          :errors="errors_userLoginCodePlatFromToken"
          :value="userLoginCode.userLoginCodePlatFromToken"
          :options="userLoginCodePlatFromTokenOptions"
          v-on:changeValue="
            userLoginCode.userLoginCodePlatFromToken = $event;
            $v.userLoginCode.userLoginCodePlatFromToken.$touch();
          "
          :title="$t('PlatFroms.select')"
          :imgName="'type.svg'"
        />
        <CustomInput
          :isSync="true"
          :syncTitle="$t('UserLoginCodes.loginCodeSuggestion')"
          :syncImgName="'sync.svg'"
          @sync="loginCodeSuggestion()"
          :className="'col-md-6'"
          :id="`${id}-loginCode`"
          :value="userLoginCode.loginCode"
          v-on:changeValue="userLoginCode.loginCode = $event"
          :title="$t('UserLoginCodes.loginCode')"
          :imgName="'UserLoginCodes.svg'"
        />

        <CustomInput
          :className="'col-md-6'"
          :id="`${id}-userLoginCodeNameAr`"
          :errors="errors_userLoginCodeNameAr"
          :value="userLoginCode.userLoginCodeNameAr"
          v-on:changeValue="
            userLoginCode.userLoginCodeNameAr = $event;
            $v.userLoginCode.userLoginCodeNameAr.$touch();
          "
          :title="$t('UserLoginCodes.nameAr')"
          :imgName="'UserLoginCodes.svg'"
        />
        <CustomInput
          :className="'col-md-6'"
          :id="`${id}-userLoginCodeNameEn`"
          :errors="errors_userLoginCodeNameEn"
          :value="userLoginCode.userLoginCodeNameEn"
          v-on:changeValue="
            userLoginCode.userLoginCodeNameEn = $event;
            $v.userLoginCode.userLoginCodeNameEn.$touch();
          "
          :title="$t('UserLoginCodes.nameEn')"
          :imgName="'UserLoginCodes.svg'"
        />

        <TextArea
          :className="'col-md-6'"
          :id="`${id}-userLoginCodeDescriptionAr`"
          :errors="errors_userLoginCodeDescriptionAr"
          :value="userLoginCode.userLoginCodeDescriptionAr"
          v-on:changeValue="
            userLoginCode.userLoginCodeDescriptionAr = $event;
            $v.userLoginCode.userLoginCodeDescriptionAr.$touch();
          "
          :title="$t('UserLoginCodes.descriptionAr')"
          :imgName="'description.svg'"
        />
        <TextArea
          :className="'col-md-6'"
          :id="`${id}-userLoginCodeDescriptionEn`"
          :errors="errors_userLoginCodeDescriptionEn"
          :value="userLoginCode.userLoginCodeDescriptionEn"
          v-on:changeValue="
            userLoginCode.userLoginCodeDescriptionEn = $event;
            $v.userLoginCode.userLoginCodeDescriptionEn.$touch();
          "
          :title="$t('UserLoginCodes.descriptionEn')"
          :imgName="'description.svg'"
        />

        <CustomCheckbox
          :className="'col-md-12'"
          :value="userLoginCode.codeIsActiveUnTileUserSignOut"
          v-on:changeValue="
            userLoginCode.codeIsActiveUnTileUserSignOut = $event
          "
          :title="$t('UserLoginCodes.codeIsActiveUnTileUserSignOut')"
        />
        <template v-if="!userLoginCode.codeIsActiveUnTileUserSignOut">
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-codeActiveFromDateTime`"
            type="dateTime"
            :value="userLoginCode.codeActiveFromDateTime"
            :title="$t('UserLoginCodes.codeActiveFromDateTime')"
            v-on:changeValue="
              userLoginCode.codeActiveFromDateTime = $event.dateTime
            "
            :language="language"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-codeActiveToDateTime`"
            type="dateTime"
            :value="userLoginCode.codeActiveToDateTime"
            :title="$t('UserLoginCodes.codeActiveToDateTime')"
            v-on:changeValue="
              userLoginCode.codeActiveToDateTime = $event.dateTime
            "
            :language="language"
          />
        </template>
        <TextArea
          :className="'col-md-12'"
          :id="`${id}-userLoginCodeNotes`"
          :value="userLoginCode.userLoginCodeNotes"
          v-on:changeValue="userLoginCode.userLoginCodeNotes = $event"
          :title="$t('general.notes')"
          :imgName="'notes.svg'"
        />
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
import TextArea from "../../../components/inputs/TextArea.vue";
import CustomCheckbox from "../../../components/inputs/CustomCheckbox.vue";
import CustomFileInput from "../../../components/inputs/CustomFileInput.vue";
import CustomSelectBox from "../../../components/inputs/CustomSelectBox.vue";
import DateTimePicker from "../../../components/inputs/DateTimePicker.vue";
import { getDialogOfPlatFormType } from "../../../utils/dialogsOfConstantsLists";
import { getUsersDialog } from "../../../utils/dialogsOfApi";
import { USER_TYPE } from "../../../utils/constantLists";
import { USER_MODEL_NAME } from "../../../utils/constants";
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
  getLanguage,
} from "./../../../utils/functions";
import {
  isValidTextAr,
  isValidTextEn,
} from "./../../../utils/validationHelper";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import apiUserLoginCode from "./../../../api/userLoginCodes/userLoginCode";
import generalMixin from "./../../../utils/generalMixin";

export default {
  name: "UserLoginCodeForm",
  mixins: [validationMixin, generalMixin],
  beforeCreate() {},
  props: {
    id: {
      type: String,
      default: "id",
    },
    deleteFileStatus: {
      type: Boolean,
      default: false,
    },
    isRendered: {
      type: Boolean,
      default: false,
    },
    userLoginCode: {
      type: Object,
    },
  },
  validations: {
    userLoginCode: {
      userToken: { required },
      userLoginCodePlatFromToken: { required },
      userLoginCodeNameAr: { isValidTextAr },
      userLoginCodeNameEn: { isValidTextEn },
      userLoginCodeDescriptionAr: { isValidTextAr },
      userLoginCodeDescriptionEn: { isValidTextEn },
    },
  },
  data() {
    return {
      userLoginCodePlatFromTokenOptions: getDialogOfPlatFormType() || [],
      language: getLanguage(),
      userTokenOptions: [],
    };
  },

  created() {},
  watch: {
    async isRendered(v) {
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
    },
  },
  beforeMount() {},
  mounted() {},
  components: {
    CustomInput,
    TextArea,
    CustomCheckbox,
    CustomFileInput,
    CustomSelectBox,
    DateTimePicker,
  },
  computed: {
    userTypeToken() {
      return this.userLoginCode.userTypeToken;
    },
    errors_userToken() {
      let errors = [];
      if (this.$v.userLoginCode.userToken.$error) {
        if (!this.$v.userLoginCode.userToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userLoginCodePlatFromToken() {
      let errors = [];
      if (this.$v.userLoginCode.userLoginCodePlatFromToken.$error) {
        if (!this.$v.userLoginCode.userLoginCodePlatFromToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },

    errors_userLoginCodeNameAr() {
      let errors = [];
      if (this.$v.userLoginCode.userLoginCodeNameAr.$error) {
        if (!this.$v.userLoginCode.userLoginCodeNameAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_userLoginCodeNameEn() {
      let errors = [];
      if (this.$v.userLoginCode.userLoginCodeNameEn.$error) {
        if (!this.$v.userLoginCode.userLoginCodeNameEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    errors_userLoginCodeDescriptionAr() {
      let errors = [];
      if (this.$v.userLoginCode.userLoginCodeDescriptionAr.$error) {
        if (!this.$v.userLoginCode.userLoginCodeDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_userLoginCodeDescriptionEn() {
      let errors = [];
      if (this.$v.userLoginCode.userLoginCodeDescriptionEn.$error) {
        if (!this.$v.userLoginCode.userLoginCodeDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
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
    async loginCodeSuggestion() {
      let paramsAvailableToCall = true;
      if (!this.userLoginCode.userToken) {
        this.showMsg(this.$t("Users.select"));
        paramsAvailableToCall = false;
      }

      if (!this.userLoginCode.userLoginCodePlatFromToken) {
        this.showMsg(this.$t("PlatFroms.select"));
        paramsAvailableToCall = false;
      }
      if (paramsAvailableToCall) {
        this.getSuggestion();
      }
    },
    async getSuggestion() {
      try {
        let params = {
          userToken: this.userLoginCode.userToken,
          userLoginCodePlatFromToken: this.userLoginCode
            .userLoginCodePlatFromToken,
        };
        const response = await apiUserLoginCode.getSuggestion(params);
        if (response.data.status == this.STATUS.SUCCESS) {
          this.userLoginCode.loginCode = response.data.userLoginCode;
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.userLoginCode.userToken.required &&
        this.$v.userLoginCode.userLoginCodePlatFromToken.required &&
        this.$v.userLoginCode.userLoginCodeNameAr.isValidTextAr &&
        this.$v.userLoginCode.userLoginCodeNameEn.isValidTextEn &&
        this.$v.userLoginCode.userLoginCodeDescriptionAr.isValidTextAr &&
        this.$v.userLoginCode.userLoginCodeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
  },
};
</script>

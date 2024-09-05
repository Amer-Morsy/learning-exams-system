<template>
  <div class="">
    <form class="" autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-10'"
          @changeValue="user.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(user.userImagePath, user.defaultImg)
          "
          :deleteFileStatus="deleteFileStatus"
          @deleteFile="$emit('deleteFile')"
        />
      </div>
      <div class="row">
        <CustomInput
          :className="'col-md-5'"
          :id="`${id}-userNameAr`"
          :errors="errors_userNameAr"
          :value="user.userNameAr"
          v-on:changeValue="
            user.userNameAr = $event;
            $v.user.userNameAr.$touch();
          "
          :title="$t('general.nameAr')"
          :imgName="'user.svg'"
        />
        <CustomInput
          :className="'col-md-5'"
          :id="`${id}-userNameEn`"
          :errors="errors_userNameEn"
          :value="user.userNameEn"
          v-on:changeValue="
            user.userNameEn = $event;
            $v.user.userNameEn.$touch();
          "
          :title="$t('general.nameEn')"
          :imgName="'user.svg'"
        />
        <CustomPhonePicker
          :className="'col-md-10'"
          :id="`${id}-phone`"
          :countryCodeName="user.userPhoneCountryCodeName"
          :countryCode="user.userPhoneCountryCode"
          :phoneNumber="user.userPhone"
          :title="$t('Users.phone')"
          :imgName="'phone.svg'"
          v-on:changeValue="setPhone($event)"
        />
        <CustomInput
          :className="'col-md-5'"
          :id="`${id}-email`"
          :errors="errors_userEmail"
          :value="user.userEmail"
          v-on:changeValue="
            user.userEmail = $event;
            $v.user.userEmail.$touch();
          "
          :title="$t('Users.email')"
          :imgName="'email.svg'"
        />
        <CustomInput
          :className="'col-md-5'"
          :id="`${id}-userName`"
          :value="user.userName"
          v-on:changeValue="user.userName = $event"
          :title="$t('Users.userName')"
          :imgName="'users.svg'"
        />
        <CustomSelectBox
          :className="'col-md-5'"
          :id="`${id}-userGenderToken`"
          :value="user.userProfileData.userGenderToken"
          :options="userGenderTokenOptions"
          v-on:changeValue="user.userProfileData.userGenderToken = $event"
          :title="$t('Users.gender')"
          :imgName="'gender.svg'"
        />
        <CustomSelectBox
          :className="'col-md-5'"
          :id="`${id}-userReligionToken`"
          :value="user.userProfileData.userReligionToken"
          :options="userReligionTokenOptions"
          v-on:changeValue="user.userProfileData.userReligionToken = $event"
          :title="$t('Users.religion')"
          :imgName="'religions.svg'"
        />
        <CustomSelectBox
          v-if="!isTeacherLogged"
          :className="'col-md-10'"
          :id="`${id}-establishmentRoleToken`"
          :value="user.establishmentRoleToken"
          :options="establishmentRoleTokenOptions"
          v-on:changeValue="user.establishmentRoleToken = $event"
          :title="$t('EstablishmentRoles.select')"
          :imgName="'establishmentRole.svg'"
        />
        <CustomInputFloat
          v-if="isCurrentTabIsTeacher && !isTeacherLogged"
          :className="'col-md-10'"
          :id="`${id}-lecturerPercentage`"
          :value="user.lecturerPercentage"
          v-on:changeValue="user.lecturerPercentage = $event"
          :title="$t('Teachers.percentage')"
          :imgName="'percentage.svg'"
        />
        <TextArea
          :className="'col-md-10'"
          :id="`${id}-userGeneralNotes`"
          :value="user.userProfileData.userGeneralNotes"
          v-on:changeValue="user.userProfileData.userGeneralNotes = $event"
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
import { mapGetters } from "vuex";
import CustomInput from "../../../components/inputs/CustomInput.vue";
import CustomInputFloat from "../../../components/inputs/CustomInputFloat.vue";
import TextArea from "../../../components/inputs/TextArea.vue";
import CustomPhonePicker from "../../../components/inputs/CustomPhonePicker.vue";
import CustomFileInput from "../../../components/inputs/CustomFileInput.vue";
import CustomSelectBox from "../../../components/inputs/CustomSelectBox.vue";
import {
  getDialogOfGender,
  getDialogOfReligion,
} from "../../../utils/dialogsOfConstantsLists";
import { getEstablishmentRolesDialog } from "../../../utils/dialogsOfApi";
import { USER_TYPE } from "../../../utils/constantLists";
import { ESTABLISHMENTROLE_MODEL_NAME } from "../../../utils/constants";
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../utils/functions";
import {
  isValidUserNameAr,
  isValidUserNameEn,
  isValidEmail,
} from "./../../../utils/validationHelper";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "UserForm",
  mixins: [validationMixin],
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
    user: {
      type: Object,
    },
  },
  validations: {
    user: {
      userNameAr: { required, isValidUserNameAr },
      userNameEn: { required, isValidUserNameEn },
      userEmail: { isValidEmail },
    },
  },
  data() {
    return {
      userGenderTokenOptions: getDialogOfGender(),
      userReligionTokenOptions: getDialogOfReligion(),
      establishmentRoleTokenOptions: [],
    };
  },

  created() {},
  watch: {
    isRendered(v) {
      if (v) {
        this.getEstablishmentRoleDialog();
      }
    },
  },
  beforeMount() {},
  mounted() {},
  components: {
    CustomInput,
    CustomInputFloat,
    TextArea,
    CustomPhonePicker,
    CustomFileInput,
    CustomSelectBox,
  },
  computed: {
    ...mapGetters(["isTeacherLogged"]),
    isCurrentTabIsTeacher() {
      return this.userTypeToken == USER_TYPE.Teacher;
    },
    errors_userNameAr() {
      let errors = [];
      if (this.$v.user.userNameAr.$error) {
        if (
          !this.$v.user.userNameAr.required &&
          !this.$v.user.userNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.user.userNameAr.required &&
          !this.$v.user.userNameAr.isValidUserNameAr
        )
          errors.push(this.$t("validation.userNameIsRequiredInAr"));
      }
      return errors;
    },
    errors_userNameEn() {
      let errors = [];
      if (this.$v.user.userNameEn.$error) {
        if (
          !this.$v.user.userNameAr.required &&
          !this.$v.user.userNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.user.userNameEn.required &&
          !this.$v.user.userNameEn.isValidUserNameEn
        )
          errors.push(this.$t("validation.userNameIsRequiredInEn"));
      }
      return errors;
    },
    errors_userEmail() {
      let errors = [];
      if (this.$v.user.userEmail.$error) {
        if (!this.$v.user.userEmail.isValidEmail)
          errors.push(this.$t("validation.fieldMustBeEmail"));
      }
      return errors;
    },
    userTypeToken() {
      return this.user.userTypeToken;
    },
  },
  methods: {
    fullPathFileFromServer,
    async getEstablishmentRoleDialog() {
      let modelName = "";
      switch (this.userTypeToken) {
        case USER_TYPE.Student:
          modelName = ESTABLISHMENTROLE_MODEL_NAME.StudentEstablishmentsRole;
          break;
        case USER_TYPE.Teacher:
          modelName = ESTABLISHMENTROLE_MODEL_NAME.TeacherEstablishmentsRole;
          break;
        case USER_TYPE.Employee:
          modelName = ESTABLISHMENTROLE_MODEL_NAME.EmployeeEstablishmentsRole;
          break;
        case USER_TYPE.Parent:
          modelName = ESTABLISHMENTROLE_MODEL_NAME.ParentEstablishmentsRole;
          break;
        case USER_TYPE.MasterAdmin:
          modelName =
            ESTABLISHMENTROLE_MODEL_NAME.MasterAdminEstablishmentsRole;
          break;

        default:
          break;
      }

      this.establishmentRoleTokenOptions = await getEstablishmentRolesDialog(
        modelName
      );
    },
    setPhone(data) {
      this.user.userPhoneCountryCodeName = data.countryCodeName;
      this.user.userPhoneCountryCode = data.countryCode;
      this.user.userPhone = data.phoneNumber;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        (this.$v.user.userNameAr.required &&
          this.$v.user.userNameAr.isValidUserNameAr) ||
        (this.$v.user.userNameEn.required &&
          this.$v.user.userNameEn.isValidUserNameEn &&
          this.$v.user.userEmail.isValidEmail)
      ) {
        this.$emit("submitForm");
      }
    },
  },
};
</script>

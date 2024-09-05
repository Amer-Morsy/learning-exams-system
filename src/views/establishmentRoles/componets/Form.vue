<template>
  <div class="">
    <form class="" autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="establishmentRole.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              establishmentRole.establishmentRoleImagePath,
              establishmentRole.defaultImg
            )
          "
          :deleteFileStatus="deleteFileStatus"
          @deleteFile="$emit('deleteFile')"
        />
      </div>
      <div class="row">
        <CustomInput
          :className="'col-md-12'"
          :id="'fullCode'"
          :value="establishmentRole.fullCode"
          v-on:changeValue="establishmentRole.fullCode = $event"
          :title="$t('EstablishmentRoles.code')"
          :imgName="'code.svg'"
        />
        <CustomSelectBox
          :className="'col-md-6'"
          :id="`authenticationLoginTypeToken`"
          :value="establishmentRole.authenticationLoginTypeToken"
          :options="authenticationLoginTypeTokenOptions"
          v-on:changeValue="
            establishmentRole.authenticationLoginTypeToken = $event
          "
          :title="$t('EstablishmentRoles.selectLoginType')"
          :imgName="'type.svg'"
        />

        <CustomSelectBox
          :className="'col-md-6'"
          :id="`codeInLoginTypeToken`"
          :value="establishmentRole.codeInLoginTypeToken"
          :options="codeInLoginTypeTokenOptions"
          v-on:changeValue="establishmentRole.codeInLoginTypeToken = $event"
          :title="$t('EstablishmentRoles.codeType')"
          :imgName="'code.svg'"
        />

        <CustomInput
          :className="'col-md-6'"
          :id="'establishmentRoleNameAr'"
          :errors="errors_establishmentRoleNameAr"
          :value="establishmentRole.establishmentRoleNameAr"
          v-on:changeValue="
            establishmentRole.establishmentRoleNameAr = $event;
            $v.establishmentRole.establishmentRoleNameAr.$touch();
          "
          :title="$t('EstablishmentRoles.nameAr')"
          :imgName="'establishmentRole.svg'"
        />
        <CustomInput
          :className="'col-md-6'"
          :id="'establishmentRoleNameEn'"
          :errors="errors_establishmentRoleNameEn"
          :value="establishmentRole.establishmentRoleNameEn"
          v-on:changeValue="
            establishmentRole.establishmentRoleNameEn = $event;
            $v.establishmentRole.establishmentRoleNameEn.$touch();
          "
          :title="$t('EstablishmentRoles.nameEn')"
          :imgName="'establishmentRole.svg'"
        />

        <TextArea
          :className="'col-md-6'"
          :id="'establishmentRoleDescriptionAr'"
          :errors="errors_establishmentRoleDescriptionAr"
          :value="establishmentRole.establishmentRoleDescriptionAr"
          v-on:changeValue="
            establishmentRole.establishmentRoleDescriptionAr = $event;
            $v.establishmentRole.establishmentRoleDescriptionAr.$touch();
          "
          :title="$t('EstablishmentRoles.descriptionAr')"
          :imgName="'description.svg'"
        />
        <TextArea
          :className="'col-md-6'"
          :id="'establishmentRoleDescriptionEn'"
          :errors="errors_establishmentRoleDescriptionEn"
          :value="establishmentRole.establishmentRoleDescriptionEn"
          v-on:changeValue="
            establishmentRole.establishmentRoleDescriptionEn = $event;
            $v.establishmentRole.establishmentRoleDescriptionEn.$touch();
          "
          :title="$t('EstablishmentRoles.descriptionEn')"
          :imgName="'description.svg'"
        />

        <TextArea
          :className="'col-md-12'"
          :id="'establishmentRoleNotes'"
          :value="establishmentRole.establishmentRoleNotes"
          v-on:changeValue="establishmentRole.establishmentRoleNotes = $event"
          :title="$t('general.notes')"
          :imgName="'notes.svg'"
        />
        <CustomCheckbox
          :className="'col-md-6'"
          :value="establishmentRole.establishmentRoleDefaultStatus"
          v-on:changeValue="
            establishmentRole.establishmentRoleDefaultStatus = $event
          "
          :title="$t('EstablishmentRoles.defaultStatus')"
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
import {
  getDialogOfAuthenticationLoginType,
  getDialogOfCodeInLoginType,
} from "../../../utils/dialogsOfConstantsLists";
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
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
    establishmentRole: {
      type: Object,
    },
  },
  validations: {
    establishmentRole: {
      establishmentRoleNameAr: { required, isValidNameAr },
      establishmentRoleNameEn: { required, isValidNameEn },
      establishmentRoleDescriptionAr: { isValidTextAr },
      establishmentRoleDescriptionEn: { isValidTextEn },
    },
  },
  data() {
    return {
      authenticationLoginTypeTokenOptions:
        getDialogOfAuthenticationLoginType() || [],
      codeInLoginTypeTokenOptions: getDialogOfCodeInLoginType() || [],
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomInput,
    TextArea,
    CustomCheckbox,
    CustomFileInput,
    CustomSelectBox,
  },
  computed: {
    errors_establishmentRoleNameAr() {
      let errors = [];
      if (this.$v.establishmentRole.establishmentRoleNameAr.$error) {
        if (
          !this.$v.establishmentRole.establishmentRoleNameAr.required &&
          !this.$v.establishmentRole.establishmentRoleNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.establishmentRole.establishmentRoleNameAr.required &&
          !this.$v.establishmentRole.establishmentRoleNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_establishmentRoleNameEn() {
      let errors = [];
      if (this.$v.establishmentRole.establishmentRoleNameEn.$error) {
        if (
          !this.$v.establishmentRole.establishmentRoleNameAr.required &&
          !this.$v.establishmentRole.establishmentRoleNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.establishmentRole.establishmentRoleNameEn.required &&
          !this.$v.establishmentRole.establishmentRoleNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_establishmentRoleDescriptionAr() {
      let errors = [];
      if (this.$v.establishmentRole.establishmentRoleDescriptionAr.$error) {
        if (
          !this.$v.establishmentRole.establishmentRoleDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_establishmentRoleDescriptionEn() {
      let errors = [];
      if (this.$v.establishmentRole.establishmentRoleDescriptionEn.$error) {
        if (
          !this.$v.establishmentRole.establishmentRoleDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    fullPathFileFromServer,

    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.establishmentRole.establishmentRoleNameAr.required &&
          this.$v.establishmentRole.establishmentRoleNameAr.isValidNameAr) ||
          (this.$v.establishmentRole.establishmentRoleNameEn.required &&
            this.$v.establishmentRole.establishmentRoleNameEn.isValidNameEn)) &&
        this.$v.establishmentRole.establishmentRoleDescriptionAr
          .isValidTextAr &&
        this.$v.establishmentRole.establishmentRoleDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
  },
};
</script>

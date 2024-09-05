<template>
  <div class="">
    <form class="" autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="educationalCourseLevel.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              educationalCourseLevel.educationalCourseLevelImagePath,
              educationalCourseLevel.defaultImg
            )
          "
          :deleteFileStatus="deleteFileStatus"
          @deleteFile="$emit('deleteFile')"
        />
      </div>
      <div class="row">
        <CustomSelectBox
          :className="'col-md-11'"
          :id="`${id}-educationalCourseToken`"
          :errors="errors_educationalCourseToken"
          :value="educationalCourseLevel.educationalCourseToken"
          :options="educationalCourseTokenOptions"
          v-on:changeValue="
            educationalCourseLevel.educationalCourseToken = $event;
            $v.educationalCourseLevel.educationalCourseToken.$touch();
          "
          :title="$t('EducationalCourses.select')"
          :imgName="'EducationalCourses.svg'"
        />
        <CustomInput
          :className="'col-md-6'"
          :id="`${id}-educationalCourseLevelNameAr`"
          :errors="errors_educationalCourseLevelNameAr"
          :value="educationalCourseLevel.educationalCourseLevelNameAr"
          v-on:changeValue="
            educationalCourseLevel.educationalCourseLevelNameAr = $event;
            $v.educationalCourseLevel.educationalCourseLevelNameAr.$touch();
          "
          :title="$t('general.nameAr')"
          :imgName="'EducationalCourseLevels.svg'"
        />
        <CustomInput
          :className="'col-md-6'"
          :id="`${id}-educationalCourseLevelNameEn`"
          :errors="errors_educationalCourseLevelNameEn"
          :value="educationalCourseLevel.educationalCourseLevelNameEn"
          v-on:changeValue="
            educationalCourseLevel.educationalCourseLevelNameEn = $event;
            $v.educationalCourseLevel.educationalCourseLevelNameEn.$touch();
          "
          :title="$t('general.nameEn')"
          :imgName="'EducationalCourseLevels.svg'"
        />
        <TextArea
          :className="'col-md-6'"
          :id="`${id}-educationalCourseLevelDescriptionAr`"
          :errors="errors_educationalCourseLevelDescriptionAr"
          :value="educationalCourseLevel.educationalCourseLevelDescriptionAr"
          v-on:changeValue="
            educationalCourseLevel.educationalCourseLevelDescriptionAr = $event;
            $v.educationalCourseLevel.educationalCourseLevelDescriptionAr.$touch();
          "
          :title="$t('general.descriptionAr')"
          :imgName="'description.svg'"
        />
        <TextArea
          :className="'col-md-6'"
          :id="`${id}-educationalCourseLevelDescriptionEn`"
          :errors="errors_educationalCourseLevelDescriptionEn"
          :value="educationalCourseLevel.educationalCourseLevelDescriptionEn"
          v-on:changeValue="
            educationalCourseLevel.educationalCourseLevelDescriptionEn = $event;
            $v.educationalCourseLevel.educationalCourseLevelDescriptionEn.$touch();
          "
          :title="$t('general.descriptionEn')"
          :imgName="'description.svg'"
        />

        <TextArea
          :className="'col-md-12'"
          :id="`${id}-educationalCourseLevelNotes`"
          :value="educationalCourseLevel.educationalCourseLevelNotes"
          v-on:changeValue="
            educationalCourseLevel.educationalCourseLevelNotes = $event
          "
          :title="$t('general.notes')"
          :imgName="'notes.svg'"
        />
        <CustomCheckbox
          :className="'col-md-12'"
          :value="educationalCourseLevel.openSpecificTimeStatus"
          v-on:changeValue="
            educationalCourseLevel.openSpecificTimeStatus = $event
          "
          :title="$t('EducationalCourseLevels.openSpecificTimeStatus')"
        />
        <template v-if="educationalCourseLevel.openSpecificTimeStatus">
          <DateTimePicker
            class="col-md-12"
            :id="`${id}-openInDateTime`"
            type="dateTime"
            :value="educationalCourseLevel.openInDateTime"
            :title="$t('EducationalCourseLevels.openInDateTime')"
            v-on:changeValue="
              educationalCourseLevel.openInDateTime = $event.dateTime
            "
            :language="language"
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
import CustomInput from "../../../../components/inputs/CustomInput.vue";
import CustomSelectBox from "../../../../components/inputs/CustomSelectBox.vue";
import CustomFileInput from "../../../../components/inputs/CustomFileInput.vue";
import TextArea from "../../../../components/inputs/TextArea.vue";
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
  getLanguage,
} from "./../../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomCheckbox from "./../../../../components/inputs/CustomCheckbox.vue";
import DateTimePicker from "./../../../../components/inputs/DateTimePicker.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { getEducationalCoursesDialog } from "./../../../../utils/dialogsOfApi";

export default {
  name: "EducationalCourseLevelForm",
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
    educationalCourseLevel: {
      type: Object,
    },
  },
  validations: {
    educationalCourseLevel: {
      educationalCourseToken: { required },
      educationalCourseLevelNameAr: { required, isValidNameAr },
      educationalCourseLevelNameEn: { required, isValidNameEn },
      educationalCourseLevelDescriptionAr: { isValidTextAr },
      educationalCourseLevelDescriptionEn: { isValidTextEn },
    },
  },
  data() {
    return {
      language: getLanguage(),
      educationalCourseTokenOptions: [],
    };
  },
  created() {
    this.getEducationalCoursesDialog();
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomInput,
    CustomSelectBox,
    CustomFileInput,
    CustomCheckbox,
    DateTimePicker,
    TextArea,
  },
  computed: {
    errors_educationalCourseToken() {
      let errors = [];
      if (this.$v.educationalCourseLevel.educationalCourseToken.$error) {
        if (!this.$v.educationalCourseLevel.educationalCourseToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_educationalCourseLevelNameAr() {
      let errors = [];
      if (this.$v.educationalCourseLevel.educationalCourseLevelNameAr.$error) {
        if (
          !this.$v.educationalCourseLevel.educationalCourseLevelNameAr
            .required &&
          !this.$v.educationalCourseLevel.educationalCourseLevelNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.educationalCourseLevel.educationalCourseLevelNameAr
            .required &&
          !this.$v.educationalCourseLevel.educationalCourseLevelNameAr
            .isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalCourseLevelNameEn() {
      let errors = [];
      if (this.$v.educationalCourseLevel.educationalCourseLevelNameEn.$error) {
        if (
          !this.$v.educationalCourseLevel.educationalCourseLevelNameAr
            .required &&
          !this.$v.educationalCourseLevel.educationalCourseLevelNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.educationalCourseLevel.educationalCourseLevelNameEn
            .required &&
          !this.$v.educationalCourseLevel.educationalCourseLevelNameEn
            .isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_educationalCourseLevelDescriptionAr() {
      let errors = [];
      if (
        this.$v.educationalCourseLevel.educationalCourseLevelDescriptionAr
          .$error
      ) {
        if (
          !this.$v.educationalCourseLevel.educationalCourseLevelDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalCourseLevelDescriptionEn() {
      let errors = [];
      if (
        this.$v.educationalCourseLevel.educationalCourseLevelDescriptionEn
          .$error
      ) {
        if (
          !this.$v.educationalCourseLevel.educationalCourseLevelDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    fullPathFileFromServer,
    async getEducationalCoursesDialog() {
      this.educationalCourseTokenOptions = await getEducationalCoursesDialog();
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.educationalCourseLevel.educationalCourseToken.required &&
        ((this.$v.educationalCourseLevel.educationalCourseLevelNameAr
          .required &&
          this.$v.educationalCourseLevel.educationalCourseLevelNameAr
            .isValidNameAr) ||
          (this.$v.educationalCourseLevel.educationalCourseLevelNameEn
            .required &&
            this.$v.educationalCourseLevel.educationalCourseLevelNameEn
              .isValidNameEn)) &&
        this.$v.educationalCourseLevel.educationalCourseLevelDescriptionAr
          .isValidTextAr &&
        this.$v.educationalCourseLevel.educationalCourseLevelDescriptionEn
          .isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
  },
};
</script>

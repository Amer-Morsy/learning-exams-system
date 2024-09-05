<template>
  <div class="">
    <form class="" autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="educationalCategory.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              educationalCategory.educationalCategoryImagePath,
              educationalCategory.defaultImg
            )
          "
          :deleteFileStatus="deleteFileStatus"
          @deleteFile="$emit('deleteFile')"
        />
      </div>
      <div class="row">
        <CustomSelectBox
          :className="'col-md-11'"
          :id="`${id}-parentEducationalCategoryToken`"
          :value="educationalCategory.parentEducationalCategoryToken"
          :options="parentEducationalCategoryTokenOptions"
          v-on:changeValue="
            educationalCategory.parentEducationalCategoryToken = $event
          "
          :title="$t('EducationalCategories.parent')"
          :imgName="'EducationalCategories.svg'"
        />
        <CustomInput
          :className="'col-md-6'"
          :id="`${id}-educationalCategoryNameAr`"
          :errors="errors_educationalCategoryNameAr"
          :value="educationalCategory.educationalCategoryNameAr"
          v-on:changeValue="
            educationalCategory.educationalCategoryNameAr = $event;
            $v.educationalCategory.educationalCategoryNameAr.$touch();
          "
          :title="$t('general.nameAr')"
          :imgName="'EducationalCategories.svg'"
        />
        <CustomInput
          :className="'col-md-6'"
          :id="`${id}-educationalCategoryNameEn`"
          :errors="errors_educationalCategoryNameEn"
          :value="educationalCategory.educationalCategoryNameEn"
          v-on:changeValue="
            educationalCategory.educationalCategoryNameEn = $event;
            $v.educationalCategory.educationalCategoryNameEn.$touch();
          "
          :title="$t('general.nameEn')"
          :imgName="'EducationalCategories.svg'"
        />
        <TextArea
          :className="'col-md-6'"
          :id="`${id}-educationalCategoryDescriptionAr`"
          :errors="errors_educationalCategoryDescriptionAr"
          :value="educationalCategory.educationalCategoryDescriptionAr"
          v-on:changeValue="
            educationalCategory.educationalCategoryDescriptionAr = $event;
            $v.educationalCategory.educationalCategoryDescriptionAr.$touch();
          "
          :title="$t('general.descriptionAr')"
          :imgName="'description.svg'"
        />
        <TextArea
          :className="'col-md-6'"
          :id="`${id}-educationalCategoryDescriptionEn`"
          :errors="errors_educationalCategoryDescriptionEn"
          :value="educationalCategory.educationalCategoryDescriptionEn"
          v-on:changeValue="
            educationalCategory.educationalCategoryDescriptionEn = $event;
            $v.educationalCategory.educationalCategoryDescriptionEn.$touch();
          "
          :title="$t('general.descriptionEn')"
          :imgName="'description.svg'"
        />

        <TextArea
          :className="'col-md-12'"
          :id="`${id}-educationalCategoryNotes`"
          :value="educationalCategory.educationalCategoryNotes"
          v-on:changeValue="
            educationalCategory.educationalCategoryNotes = $event
          "
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
import CustomInput from "../../../../components/inputs/CustomInput.vue";
import CustomSelectBox from "../../../../components/inputs/CustomSelectBox.vue";
import CustomFileInput from "../../../../components/inputs/CustomFileInput.vue";
import TextArea from "../../../../components/inputs/TextArea.vue";
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { getEducationalCategoriesDialogCustomize } from "./../../../../utils/dialogsOfApi";

export default {
  name: "EducationalCategoryForm",
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
    educationalCategory: {
      type: Object,
    },
    filterData: {
      type: Object,
    },
    isOpened: {
      type: Boolean,
      default: false,
    },
  },
  validations: {
    educationalCategory: {
      educationalCategoryNameAr: { required, isValidNameAr },
      educationalCategoryNameEn: { required, isValidNameEn },
      educationalCategoryDescriptionAr: { isValidTextAr },
      educationalCategoryDescriptionEn: { isValidTextEn },
    },
  },
  data() {
    return {
      parentEducationalCategoryTokenOptions: [],
    };
  },
  created() {
    // this.getEducationalCategoriesDialog();
  },
  watch: {
    isOpened(v) {
      if (v) {
        this.getEducationalCategoriesDialog();
      }
    },
  },
  beforeMount() {},
  mounted() {},
  components: {
    CustomInput,
    CustomSelectBox,
    CustomFileInput,
    TextArea,
  },
  computed: {
    errors_educationalCategoryNameAr() {
      let errors = [];
      if (this.$v.educationalCategory.educationalCategoryNameAr.$error) {
        if (
          !this.$v.educationalCategory.educationalCategoryNameAr.required &&
          !this.$v.educationalCategory.educationalCategoryNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.educationalCategory.educationalCategoryNameAr.required &&
          !this.$v.educationalCategory.educationalCategoryNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalCategoryNameEn() {
      let errors = [];
      if (this.$v.educationalCategory.educationalCategoryNameEn.$error) {
        if (
          !this.$v.educationalCategory.educationalCategoryNameAr.required &&
          !this.$v.educationalCategory.educationalCategoryNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.educationalCategory.educationalCategoryNameEn.required &&
          !this.$v.educationalCategory.educationalCategoryNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_educationalCategoryDescriptionAr() {
      let errors = [];
      if (this.$v.educationalCategory.educationalCategoryDescriptionAr.$error) {
        if (
          !this.$v.educationalCategory.educationalCategoryDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalCategoryDescriptionEn() {
      let errors = [];
      if (this.$v.educationalCategory.educationalCategoryDescriptionEn.$error) {
        if (
          !this.$v.educationalCategory.educationalCategoryDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    fullPathFileFromServer,
    async getEducationalCategoriesDialog() {
      console.log(this.id, this.filterData.parentEducationalCategoryToken);
      let params = {};
      if (this.filterData.parentEducationalCategoryToken) {
        params = {
          parentEducationalCategoryToken:
            this.filterData.parentEducationalCategoryToken,
          getOnlyParentEducationalCategories: false,
          getOnlyChildEducationalCategories: true,
        };
      }

      this.parentEducationalCategoryTokenOptions =
        await getEducationalCategoriesDialogCustomize(params);
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.educationalCategory.educationalCategoryNameAr.required &&
          this.$v.educationalCategory.educationalCategoryNameAr
            .isValidNameAr) ||
          (this.$v.educationalCategory.educationalCategoryNameEn.required &&
            this.$v.educationalCategory.educationalCategoryNameEn
              .isValidNameEn)) &&
        this.$v.educationalCategory.educationalCategoryDescriptionAr
          .isValidTextAr &&
        this.$v.educationalCategory.educationalCategoryDescriptionEn
          .isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
  },
};
</script>

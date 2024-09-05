<template>
  <div class="">
    <form class="" autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="questionBankTitle.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              questionBankTitle.questionBankTitleImagePath,
              questionBankTitle.defaultImg
            )
          "
          :deleteFileStatus="deleteFileStatus"
          @deleteFile="$emit('deleteFile')"
        />
      </div>
      <div class="row">
        <CustomInput
          :className="'col-md-6'"
          :id="`${id}-questionBankTitleNameAr`"
          :errors="errors_questionBankTitleNameAr"
          :value="questionBankTitle.questionBankTitleNameAr"
          v-on:changeValue="
            questionBankTitle.questionBankTitleNameAr = $event;
            $v.questionBankTitle.questionBankTitleNameAr.$touch();
          "
          :title="$t('general.nameAr')"
          :imgName="'questionBankTitle.svg'"
        />
        <CustomInput
          :className="'col-md-6'"
          :id="`${id}-questionBankTitleNameEn`"
          :errors="errors_questionBankTitleNameEn"
          :value="questionBankTitle.questionBankTitleNameEn"
          v-on:changeValue="
            questionBankTitle.questionBankTitleNameEn = $event;
            $v.questionBankTitle.questionBankTitleNameEn.$touch();
          "
          :title="$t('general.nameEn')"
          :imgName="'questionBankTitle.svg'"
        />
        <TextArea
          :className="'col-md-6'"
          :id="`${id}-questionBankTitleDescriptionAr`"
          :errors="errors_questionBankTitleDescriptionAr"
          :value="questionBankTitle.questionBankTitleDescriptionAr"
          v-on:changeValue="
            questionBankTitle.questionBankTitleDescriptionAr = $event;
            $v.questionBankTitle.questionBankTitleDescriptionAr.$touch();
          "
          :title="$t('general.descriptionAr')"
          :imgName="'description.svg'"
        />
        <TextArea
          :className="'col-md-6'"
          :id="`${id}-questionBankTitleDescriptionEn`"
          :errors="errors_questionBankTitleDescriptionEn"
          :value="questionBankTitle.questionBankTitleDescriptionEn"
          v-on:changeValue="
            questionBankTitle.questionBankTitleDescriptionEn = $event;
            $v.questionBankTitle.questionBankTitleDescriptionEn.$touch();
          "
          :title="$t('general.descriptionEn')"
          :imgName="'description.svg'"
        />
        <TextArea
          :className="'col-md-12'"
          :id="`${id}-questionBankTitleNotes`"
          :value="questionBankTitle.questionBankTitleNotes"
          v-on:changeValue="questionBankTitle.questionBankTitleNotes = $event"
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
import CustomInput from "../../../../../components/inputs/CustomInput.vue";
import CustomFileInput from "../../../../../components/inputs/CustomFileInput.vue";
import TextArea from "../../../../../components/inputs/TextArea.vue";
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../../utils/validationHelper";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "QuestionBankTitleForm",
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
    questionBankTitle: {
      type: Object,
    },
  },
  validations: {
    questionBankTitle: {
      questionBankTitleNameAr: { required, isValidNameAr },
      questionBankTitleNameEn: { required, isValidNameEn },
      questionBankTitleDescriptionAr: { isValidTextAr },
      questionBankTitleDescriptionEn: { isValidTextEn },
    },
  },
  data() {
    return {};
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomInput,
    CustomFileInput,
    TextArea,
  },
  computed: {
    errors_questionBankTitleNameAr() {
      let errors = [];
      if (this.$v.questionBankTitle.questionBankTitleNameAr.$error) {
        if (
          !this.$v.questionBankTitle.questionBankTitleNameAr.required &&
          !this.$v.questionBankTitle.questionBankTitleNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.questionBankTitle.questionBankTitleNameAr.required &&
          !this.$v.questionBankTitle.questionBankTitleNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_questionBankTitleNameEn() {
      let errors = [];
      if (this.$v.questionBankTitle.questionBankTitleNameEn.$error) {
        if (
          !this.$v.questionBankTitle.questionBankTitleNameAr.required &&
          !this.$v.questionBankTitle.questionBankTitleNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.questionBankTitle.questionBankTitleNameEn.required &&
          !this.$v.questionBankTitle.questionBankTitleNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_questionBankTitleDescriptionAr() {
      let errors = [];
      if (this.$v.questionBankTitle.questionBankTitleDescriptionAr.$error) {
        if (
          !this.$v.questionBankTitle.questionBankTitleDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_questionBankTitleDescriptionEn() {
      let errors = [];
      if (this.$v.questionBankTitle.questionBankTitleDescriptionEn.$error) {
        if (
          !this.$v.questionBankTitle.questionBankTitleDescriptionEn
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
        ((this.$v.questionBankTitle.questionBankTitleNameAr.required &&
          this.$v.questionBankTitle.questionBankTitleNameAr.isValidNameAr) ||
          (this.$v.questionBankTitle.questionBankTitleNameEn.required &&
            this.$v.questionBankTitle.questionBankTitleNameEn.isValidNameEn)) &&
        this.$v.questionBankTitle.questionBankTitleDescriptionAr
          .isValidTextAr &&
        this.$v.questionBankTitle.questionBankTitleDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
  },
};
</script>

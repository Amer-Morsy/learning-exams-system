<template>
  <div class="">
    <form class="" autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="questionParagraph.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              questionParagraph.questionParagraphImagePath,
              questionParagraph.defaultImg
            )
          "
          :deleteFileStatus="deleteFileStatus"
          @deleteFile="$emit('deleteFile')"
        />
      </div>
      <div class="row">
        <CustomSelectBox
          :className="'col-md-11'"
          :id="`${id}-questionBankTitleToken`"
          :errors="errors_questionBankTitleToken"
          :value="questionParagraph.questionBankTitleToken"
          :options="questionBankTitleTokenOptions"
          v-on:changeValue="
            questionParagraph.questionBankTitleToken = $event;
            $v.questionParagraph.questionBankTitleToken.$touch();
          "
          :title="$t('QuestionBankTitles.select')"
          :imgName="'questionBankTitle.svg'"
        />
        <CustomInput
          :className="'col-md-6'"
          :id="`${id}-questionParagraphTitle`"
          :errors="errors_questionParagraphTitle"
          :value="questionParagraph.questionParagraphTitle"
          v-on:changeValue="
            questionParagraph.questionParagraphTitle = $event;
            $v.questionParagraph.questionParagraphTitle.$touch();
          "
          :title="$t('general.title')"
          :imgName="'questionParagraph.svg'"
        />
        <CustomInput
          :className="'col-md-6'"
          :id="`${id}-questionParagraphDescription_HTML`"
          :value="questionParagraph.questionParagraphDescription_HTML"
          v-on:changeValue="
            questionParagraph.questionParagraphDescription_HTML = $event
          "
          :title="$t('general.description')"
          :imgName="'questionParagraph.svg'"
        />

        <TextArea
          :className="'col-md-12'"
          :id="`${id}-questionParagraphNotes`"
          :value="questionParagraph.questionParagraphNotes"
          v-on:changeValue="questionParagraph.questionParagraphNotes = $event"
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
import CustomSelectBox from "../../../../../components/inputs/CustomSelectBox.vue";
import CustomFileInput from "../../../../../components/inputs/CustomFileInput.vue";
import TextArea from "../../../../../components/inputs/TextArea.vue";
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../../../utils/functions";
import { getQuestionBankTitlesDialog } from "./../../../../../utils/dialogsOfApi";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "QuestionParagraphForm",
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
    questionParagraph: {
      type: Object,
    },
  },
  validations: {
    questionParagraph: {
      questionBankTitleToken: { required },
      questionParagraphTitle: { required },
    },
  },
  data() {
    return {
      questionBankTitleTokenOptions: [],
    };
  },
  created() {
    this.getQuestionBankTitlesDialog();
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomInput,
    CustomSelectBox,
    CustomFileInput,
    TextArea,
  },
  computed: {
    errors_questionBankTitleToken() {
      let errors = [];
      if (this.$v.questionParagraph.questionBankTitleToken.$error) {
        if (!this.$v.questionParagraph.questionBankTitleToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_questionParagraphTitle() {
      let errors = [];
      if (this.$v.questionParagraph.questionParagraphTitle.$error) {
        if (!this.$v.questionParagraph.questionParagraphTitle.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
  },
  methods: {
    fullPathFileFromServer,
    async getQuestionBankTitlesDialog() {
      this.questionBankTitleTokenOptions = await getQuestionBankTitlesDialog();
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (this.$v.questionParagraph.questionParagraphTitle.required) {
        this.$emit("submitForm");
      }
    },
  },
};
</script>

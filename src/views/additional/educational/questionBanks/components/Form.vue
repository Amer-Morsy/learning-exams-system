<template>
  <div class="">
    <form class="" autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="questionBank.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              questionBank.questionBankImagePath,
              questionBank.defaultImg
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
          :value="questionBank.questionBankTitleToken"
          :options="questionBankTitleTokenOptions"
          v-on:changeValue="
            questionBank.questionBankTitleToken = $event;
            $v.questionBank.questionBankTitleToken.$touch();
          "
          :title="$t('QuestionBankTitles.select')"
          :imgName="'questionBankTitle.svg'"
        />
        <CustomInput
          :className="'col-md-6'"
          :id="`${id}-questionBankNameCurrent`"
          :value="questionBank.questionBankNameCurrent"
          v-on:changeValue="
            questionBank.questionBankNameAr = $event;
            questionBank.questionBankNameEn = $event;
          "
          :title="$t('general.name')"
          :imgName="'questionBank.svg'"
        />

        <TextArea
          :className="'col-md-6'"
          :id="`${id}-questionBankDescriptionCurrent`"
          :value="questionBank.questionBankDescriptionCurrent"
          v-on:changeValue="
            questionBank.questionBankDescriptionAr = $event;
            questionBank.questionBankDescriptionEn = $event;
          "
          :title="$t('general.description')"
          :imgName="'description.svg'"
        />

        <TextArea
          :className="'col-md-12'"
          :id="`${id}-questionBankNotes`"
          :value="questionBank.questionBankNotes"
          v-on:changeValue="questionBank.questionBankNotes = $event"
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
import CustomSelectBox from "../../../../../components/inputs/CustomSelectBox.vue";
import CustomInput from "../../../../../components/inputs/CustomInput.vue";
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
  name: "QuestionBankForm",
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
    questionBank: {
      type: Object,
    },
  },
  validations: {
    questionBank: {
      questionBankTitleToken: { required },
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
    CustomSelectBox,
    CustomInput,
    CustomFileInput,
    TextArea,
  },
  computed: {
    errors_questionBankTitleToken() {
      let errors = [];
      if (this.$v.questionBank.questionBankTitleToken.$error) {
        if (!this.$v.questionBank.questionBankTitleToken.required)
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
      if (this.$v.questionBank.questionBankTitleToken.required) {
        this.$emit("submitForm");
      }
    },
  },
};
</script>

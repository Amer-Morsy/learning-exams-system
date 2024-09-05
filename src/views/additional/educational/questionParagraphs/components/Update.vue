<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('QuestionParagraphs.update')"
    :headerIcon="headerIcon"
  >
    <div class="">
      <QuestionParagraphForm
        :key="refreshKey"
        :id="'update'"
        :deleteFileStatus="hasDeleteImage"
        :questionParagraph="questionParagraph"
        @submitForm="update"
        @deleteFile="deleteFile()"
        @close="closeBottomSheet(refName)"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import CustomBottomSheet from "../../../../../components/general/CustomBottomSheet.vue";
import QuestionParagraphForm from "./Form.vue";
import generalMixin from "./../../../../../utils/generalMixin";
import { objectToFormData } from "./../../../../../utils/functions";
import apiQuestionParagraph from "../../../../../api/additional/educational/questionParagraphs/questionParagraph";

export default {
  name: "QuestionParagraphUpdate",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
    fullbackAction: {
      type: Function,
    },
  },
  data() {
    return {
      refreshKey: null,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    QuestionParagraphForm,
    CustomBottomSheet,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),
    refName() {
      return this.model.metaData.components.Update.refName;
    },
    questionParagraph() {
      return this.model.questionParagraph;
    },
    hasDeleteImage() {
      return (
        this.model.metaData.privileges.deleteImage &&
        !this.questionParagraph.questionParagraphImageIsDefault
      );
    },
    headerIcon() {
      return this.questionParagraph.icon;
    },
    apiQuestionParagraph() {
      return this.model.metaData.api;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async update() {
      let formData = objectToFormData(this.questionParagraph);
      const response = await apiQuestionParagraph.update(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.closeBottomSheet(this.refName);
        this.runFullbackAction();
      } else {
        this.showMsg(response.data.msg);
      }
    },
    async deleteFile() {
      let formData = objectToFormData({
        token: this.questionParagraph.questionParagraphToken,
      });
      const response = await apiQuestionParagraph.deleteImage(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.questionParagraph.questionParagraphImagePath = "";
        this.questionParagraph.questionParagraphImageIsDefault = true;
        this.refreshKey = new Date();
      } else {
        this.showMsg(response.data.msg);
      }
    },
    runFullbackAction() {
      this.fullbackAction();
    },
  },
};
</script>

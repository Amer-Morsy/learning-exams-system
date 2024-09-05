<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('Questions.update')"
    :headerIcon="headerIcon"
    @opened="isOpened = true"
    @closed="isOpened = false"
  >
    <div class="">
      <QuestionForm
        :key="refreshKey"
        :id="'update'"
        :deleteFileStatus="hasDeleteImage"
        :isOpened="isOpened"
        :questionModel="question"
        @submitForm="update($event)"
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
import QuestionForm from "./Form.vue";
import generalMixin from "./../../../../../utils/generalMixin";
import { objectToFormData } from "./../../../../../utils/functions";
import apiQuestion from "../../../../../api/additional/educational/questions/question";

export default {
  name: "QuestionUpdate",
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
      isOpened: false,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    QuestionForm,
    CustomBottomSheet,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),
    refName() {
      return this.model.metaData.components.Update.refName;
    },
    question() {
      return this.model.question;
    },
    hasDeleteImage() {
      return (
        this.model.metaData.privileges.deleteImage &&
        !this.question.questionMediaIsDefoultImage
      );
    },
    headerIcon() {
      return this.question.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async update(questionList) {
      let formatedQuestionList = questionList.map((q) => {
        let formatedItem = {
          mediaFile: q.mediaFile,
          questionDescription_Media: q.questionDescription_Media,
          questionAnswerA_Media: q.questionAnswerA_Media,
          questionAnswerB_Media: q.questionAnswerB_Media,
          questionAnswerC_Media: q.questionAnswerC_Media,
          questionAnswerD_Media: q.questionAnswerD_Media,
          dataJson: q,
        };

        return formatedItem;
      });

      let formData = objectToFormData(
        {
          questions: formatedQuestionList,
        },
        true
      );
      // formData.append("ownerUserToken", this.model.filterData.ownerUserToken);
      const response = await apiQuestion.update(formData);
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
        token: this.question.questionToken,
      });
      const response = await apiQuestion.deleteImage(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.question.questionMediaPath = "";
        this.question.questionMediaIsDefoultImage = true;
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

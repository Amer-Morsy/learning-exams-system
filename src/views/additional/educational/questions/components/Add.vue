<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('Questions.add')"
    :headerIcon="headerIcon"
    :swipeAble="false"
    :clickToClose="false"
    @opened="
      question.setInitialValue();
      isOpened = true;
    "
    @closed="isOpened = false"
  >
    <div class="">
      <QuestionForm
        :id="'add'"
        :questionModel="question"
        :isOpened="isOpened"
        @submitForm="add($event)"
        @close="closeBottomSheet(refName)"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CustomBottomSheet from "../../../../../components/general/CustomBottomSheet.vue";
import QuestionForm from "./Form.vue";
import generalMixin from "../../../../../utils/generalMixin";
import { objectToFormData } from "../../../../../utils/functions";
import apiQuestion from "../../../../../api/additional/educational/questions/question";

export default {
  name: "QuestionAdd",
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
      isOpened: false,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomBottomSheet,
    QuestionForm,
  },
  computed: {
    ...mapGetters(["userPersonalData"]),
    refName() {
      return this.model.metaData.components.Add.refName;
    },
    question() {
      return this.model.question;
    },
    headerIcon() {
      return this.question.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async add(questionList) {
      let formatedQuestionList = questionList.map((q) => {
        let formatedItem = {
          mediaFile: q.mediaFile,
          questionDescription_Media: q.questionDescription_Media,
          questionAnswerA_Media: q.questionAnswerA_Media,
          questionAnswerB_Media: q.questionAnswerB_Media,
          questionAnswerC_Media: q.questionAnswerC_Media,
          questionAnswerD_Media: q.questionAnswerD_Media,
          dataJson: Object.fromEntries(
            Object.entries(q).filter(([key]) => key != "questionToken")
          ),
        };

        return formatedItem;
      });

      let formData = objectToFormData(
        {
          questions: formatedQuestionList,
        },
        true
      );
      formData.append("ownerUserToken", this.model.filterData.ownerUserToken);
      const response = await apiQuestion.add(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.runFullbackAction();
        this.closeBottomSheet(this.refName);
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

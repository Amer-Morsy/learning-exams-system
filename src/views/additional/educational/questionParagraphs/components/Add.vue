<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('QuestionParagraphs.add')"
    :headerIcon="headerIcon"
    :swipeAble="false"
    :clickToClose="false"
    @opened="questionParagraph.setInitialValue()"
  >
    <div class="">
      <QuestionParagraphForm
        :id="'add'"
        :questionParagraph="questionParagraph"
        @submitForm="add"
        @close="closeBottomSheet(refName)"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapActions } from "vuex";
import CustomBottomSheet from "../../../../../components/general/CustomBottomSheet.vue";
import QuestionParagraphForm from "./Form.vue";
import generalMixin from "../../../../../utils/generalMixin";
import { objectToFormData } from "../../../../../utils/functions";
import apiQuestionParagraph from "../../../../../api/additional/educational/questionParagraphs/questionParagraph";

export default {
  name: "QuestionParagraphAdd",
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
    return {};
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomBottomSheet,
    QuestionParagraphForm,
  },
  computed: {
    refName() {
      return this.model.metaData.components.Add.refName;
    },
    questionParagraph() {
      return this.model.questionParagraph;
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
    async add() {
      this.questionParagraph.ownerUserToken = this.model.filterData.ownerUserToken;
      let formData = objectToFormData(this.questionParagraph);
      const response = await apiQuestionParagraph.add(formData);
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

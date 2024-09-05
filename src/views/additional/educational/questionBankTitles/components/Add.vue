<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('QuestionBankTitles.add')"
    :headerIcon="headerIcon"
    :swipeAble="false"
    :clickToClose="false"
    @opened="questionBankTitle.setInitialValue()"
  >
    <div class="">
      <QuestionBankTitleForm
        :id="'add'"
        :questionBankTitle="questionBankTitle"
        @submitForm="add"
        @close="closeBottomSheet(refName)"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapActions } from "vuex";
import CustomBottomSheet from "../../../../../components/general/CustomBottomSheet.vue";
import QuestionBankTitleForm from "./Form.vue";
import generalMixin from "../../../../../utils/generalMixin";
import { objectToFormData } from "../../../../../utils/functions";
import apiQuestionBankTitle from "../../../../../api/additional/educational/questionBankTitles/questionBankTitle";

export default {
  name: "QuestionBankTitleAdd",
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
    QuestionBankTitleForm,
  },
  computed: {
    refName() {
      return this.model.metaData.components.Add.refName;
    },
    questionBankTitle() {
      return this.model.questionBankTitle;
    },
    headerIcon() {
      return this.questionBankTitle.icon;
    },
    apiQuestionBankTitle() {
      return this.model.metaData.api;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async add() {
      this.questionBankTitle.ownerUserToken = this.model.filterData.ownerUserToken;
      let formData = objectToFormData(this.questionBankTitle);
      const response = await apiQuestionBankTitle.add(formData);
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

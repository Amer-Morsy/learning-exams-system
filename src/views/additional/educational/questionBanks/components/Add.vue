<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('QuestionBanks.add')"
    :headerIcon="headerIcon"
    :swipeAble="false"
    :clickToClose="false"
    @opened="questionBank.setInitialValue()"
  >
    <div class="">
      <QuestionBankForm
        :id="'add'"
        :questionBank="questionBank"
        @submitForm="add"
        @close="closeBottomSheet(refName)"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapActions } from "vuex";
import CustomBottomSheet from "../../../../../components/general/CustomBottomSheet.vue";
import QuestionBankForm from "./Form.vue";
import generalMixin from "../../../../../utils/generalMixin";
import { objectToFormData } from "../../../../../utils/functions";
import apiQuestionBank from "../../../../../api/additional/educational/questionBanks/questionBank";

export default {
  name: "QuestionBankAdd",
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
    QuestionBankForm,
  },
  computed: {
    refName() {
      return this.model.metaData.components.Add.refName;
    },
    questionBank() {
      return this.model.questionBank;
    },
    headerIcon() {
      return this.questionBank.icon;
    },
    apiQuestionBank() {
      return this.model.metaData.api;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async add() {
      this.questionBank.ownerUserToken = this.model.filterData.ownerUserToken;
      let formData = objectToFormData(this.questionBank);
      const response = await apiQuestionBank.add(formData);
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

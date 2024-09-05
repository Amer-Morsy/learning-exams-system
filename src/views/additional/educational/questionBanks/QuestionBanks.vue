<template>
  <div class="page-container">
    <div class="pagination-with-content">
      <CustomPageHeader
        :model="questionBanks"
        :addFullbackAction="getAllQuestionBanks"
        :filterFullbackAction="getAllQuestionBanks"
        :sortFullbackAction="getAllQuestionBanks"
        :toggelActivationFullbackAction="getAllQuestionBanks"
      />
      <template v-if="hasData">
        <QuestionBankTable
          v-if="viewType == VIEW_TYPES.table"
          :model="questionBanks"
          :updateFullbackAction="getAllQuestionBanks"
          :deleteFullbackAction="getAllQuestionBanks"
          :changeActivationFullbackAction="getAllQuestionBanks"
          @setQuestionBankData="questionBanks.questionBank.fillData($event)"
          class=""
        />
        <QuestionBankCard
          v-if="viewType == VIEW_TYPES.cards"
          :model="questionBanks"
          :updateFullbackAction="getAllQuestionBanks"
          :deleteFullbackAction="getAllQuestionBanks"
          :changeActivationFullbackAction="getAllQuestionBanks"
          @setQuestionBankData="questionBanks.questionBank.fillData($event)"
          class=""
        />
        <QuestionBankInfo :model="questionBanks" />
        <QuestionBankUpdate
          :model="questionBanks"
          :fullbackAction="getAllQuestionBanks"
        />
        <QuestionBankDelete
          :model="questionBanks"
          :fullbackAction="getAllQuestionBanks"
        />
        <ChangeActivationType
          :model="questionBanks"
          :fullbackAction="getAllQuestionBanks"
        />
        <CustomPagination
          :paginationData="questionBanks.filterData"
          @changePagination="changePagination($event)"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <QuestionBankFilter
        :model="questionBanks"
        :fullbackAction="getAllQuestionBanks"
      />
      <QuestionBankSort
        :model="questionBanks"
        :fullbackAction="getAllQuestionBanks"
      />
      <QuestionBankAdd
        :model="questionBanks"
        :fullbackAction="getAllQuestionBanks"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { mapActions } from "vuex";
import generalMixin from "../../../../utils/generalMixin";
import ExceptionWithImg from "../../../../components/general/ExceptionWithImg.vue";
import CustomPageHeader from "../../../../components/general/CustomPageHeader.vue";
import QuestionBanks from "../../../../models/additional/educational/questionBanks/QuestionBanks";
import apiQuestionBank from "../../../../api/additional/educational/questionBanks/questionBank";
import QuestionBankTable from "./components/Table.vue";
import QuestionBankCard from "./components/Card.vue";
import QuestionBankAdd from "./components/Add.vue";
import QuestionBankInfo from "./components/Info.vue";
import QuestionBankUpdate from "./components/Update.vue";
import QuestionBankDelete from "./components/Delete.vue";
import ChangeActivationType from "./components/ChangeActivationType.vue";
import CustomPagination from "../../../../components/general/CustomPagination.vue";
import QuestionBankFilter from "./components/Filter.vue";
import QuestionBankSort from "./components/Sort.vue";

export default {
  name: "QuestionBanks",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    userTeacherToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      questionBanks: new QuestionBanks(),
      showTable: false,
    };
  },
  created() {
    this.questionBanks.filterData.ownerUserToken = this.userTeacherToken;
    this.getAllQuestionBanks();
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    ExceptionWithImg,
    QuestionBankTable,
    QuestionBankCard,
    QuestionBankAdd,
    QuestionBankInfo,
    QuestionBankUpdate,
    QuestionBankDelete,
    ChangeActivationType,
    CustomPageHeader,
    CustomPagination,
    QuestionBankFilter,
    QuestionBankSort,
  },
  computed: {
    ...mapGetters(["userPersonalData", "generalSetting"]),
    hasData() {
      return this.questionBanks.questionBanksData.length != 0;
    },
    viewType() {
      return this.generalSetting[this.questionBanks.metaData.name].viewType;
    },
  },
  methods: {
    changePagination(pagination) {
      this.questionBanks.filterData.fillData(pagination);
      this.getAllQuestionBanks();
    },

    async getAllQuestionBanks() {
      try {
        this.questionBanks.questionBanksData = [];
        const response = await apiQuestionBank.getAll(
          this.questionBanks.filterData
        );
        if (response.data.status == this.STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == this.STATUS.NO_INTERNET) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noInternet.svg";
        } else if (response.data.status == this.STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.questionBanks.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
  },
};
</script>

<style lang="scss"></style>

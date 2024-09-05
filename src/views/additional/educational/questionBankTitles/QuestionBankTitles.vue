<template>
  <div class="page-container">
    <div class="pagination-with-content">
      <CustomPageHeader
        :model="questionBankTitles"
        :addFullbackAction="getAllQuestionBankTitles"
        :filterFullbackAction="getAllQuestionBankTitles"
        :sortFullbackAction="getAllQuestionBankTitles"
        :toggelActivationFullbackAction="getAllQuestionBankTitles"
      />
      <template v-if="hasData">
        <QuestionBankTitleTable
          v-if="viewType == VIEW_TYPES.table"
          :model="questionBankTitles"
          :updateFullbackAction="getAllQuestionBankTitles"
          :deleteFullbackAction="getAllQuestionBankTitles"
          :changeActivationFullbackAction="getAllQuestionBankTitles"
          @setQuestionBankTitleData="
            questionBankTitles.questionBankTitle.fillData($event)
          "
          class=""
        />
        <QuestionBankTitleCard
          v-if="viewType == VIEW_TYPES.cards"
          :model="questionBankTitles"
          :updateFullbackAction="getAllQuestionBankTitles"
          :deleteFullbackAction="getAllQuestionBankTitles"
          :changeActivationFullbackAction="getAllQuestionBankTitles"
          @setQuestionBankTitleData="
            questionBankTitles.questionBankTitle.fillData($event)
          "
          class=""
        />
        <QuestionBankTitleInfo :model="questionBankTitles" />
        <QuestionBankTitleUpdate
          :model="questionBankTitles"
          :fullbackAction="getAllQuestionBankTitles"
        />
        <QuestionBankTitleDelete
          :model="questionBankTitles"
          :fullbackAction="getAllQuestionBankTitles"
        />
        <ChangeActivationType
          :model="questionBankTitles"
          :fullbackAction="getAllQuestionBankTitles"
        />
        <CustomPagination
          :paginationData="questionBankTitles.filterData"
          @changePagination="changePagination($event)"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <QuestionBankTitleFilter
        :model="questionBankTitles"
        :fullbackAction="getAllQuestionBankTitles"
      />
      <QuestionBankTitleSort
        :model="questionBankTitles"
        :fullbackAction="getAllQuestionBankTitles"
      />
      <QuestionBankTitleAdd
        :model="questionBankTitles"
        :fullbackAction="getAllQuestionBankTitles"
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
import QuestionBankTitles from "../../../../models/additional/educational/questionBankTitles/QuestionBankTitles";
import apiQuestionBankTitle from "../../../../api/additional/educational/questionBankTitles/questionBankTitle";
import QuestionBankTitleTable from "./components/Table.vue";
import QuestionBankTitleCard from "./components/Card.vue";
import QuestionBankTitleAdd from "./components/Add.vue";
import QuestionBankTitleInfo from "./components/Info.vue";
import QuestionBankTitleUpdate from "./components/Update.vue";
import QuestionBankTitleDelete from "./components/Delete.vue";
import ChangeActivationType from "./components/ChangeActivationType.vue";
import CustomPagination from "../../../../components/general/CustomPagination.vue";
import QuestionBankTitleFilter from "./components/Filter.vue";
import QuestionBankTitleSort from "./components/Sort.vue";

export default {
  name: "QuestionBankTitles",
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
      questionBankTitles: new QuestionBankTitles(),
      showTable: false,
    };
  },
  created() {
    this.questionBankTitles.filterData.ownerUserToken = this.userTeacherToken;
    this.getAllQuestionBankTitles();
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    ExceptionWithImg,
    QuestionBankTitleTable,
    QuestionBankTitleCard,
    QuestionBankTitleAdd,
    QuestionBankTitleInfo,
    QuestionBankTitleUpdate,
    QuestionBankTitleDelete,
    ChangeActivationType,
    CustomPageHeader,
    CustomPagination,
    QuestionBankTitleFilter,
    QuestionBankTitleSort,
  },
  computed: {
    ...mapGetters(["userPersonalData", "generalSetting"]),
    hasData() {
      return this.questionBankTitles.questionBankTitlesData.length != 0;
    },
    viewType() {
      return this.generalSetting[this.questionBankTitles.metaData.name]
        .viewType;
    },
  },
  methods: {
    changePagination(pagination) {
      this.questionBankTitles.filterData.fillData(pagination);
      this.getAllQuestionBankTitles();
    },

    async getAllQuestionBankTitles() {
      try {
        this.questionBankTitles.questionBankTitlesData = [];
        const response = await apiQuestionBankTitle.getAll(
          this.questionBankTitles.filterData
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
        this.questionBankTitles.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
  },
};
</script>

<style lang="scss"></style>

<template>
  <div class="page-container">
    <div class="pagination-with-content">
      <CustomPageHeader
        :model="questionParagraphs"
        :addFullbackAction="getAllQuestionParagraphs"
        :filterFullbackAction="getAllQuestionParagraphs"
        :sortFullbackAction="getAllQuestionParagraphs"
        :toggelActivationFullbackAction="getAllQuestionParagraphs"
      />
      <template v-if="hasData">
        <QuestionParagraphTable
          v-if="viewType == VIEW_TYPES.table"
          :model="questionParagraphs"
          :updateFullbackAction="getAllQuestionParagraphs"
          :deleteFullbackAction="getAllQuestionParagraphs"
          :changeActivationFullbackAction="getAllQuestionParagraphs"
          @setQuestionParagraphData="
            questionParagraphs.questionParagraph.fillData($event)
          "
          class=""
        />
        <QuestionParagraphCard
          v-if="viewType == VIEW_TYPES.cards"
          :model="questionParagraphs"
          :updateFullbackAction="getAllQuestionParagraphs"
          :deleteFullbackAction="getAllQuestionParagraphs"
          :changeActivationFullbackAction="getAllQuestionParagraphs"
          @setQuestionParagraphData="
            questionParagraphs.questionParagraph.fillData($event)
          "
          class=""
        />
        <QuestionParagraphInfo :model="questionParagraphs" />
        <QuestionParagraphUpdate
          :model="questionParagraphs"
          :fullbackAction="getAllQuestionParagraphs"
        />
        <QuestionParagraphDelete
          :model="questionParagraphs"
          :fullbackAction="getAllQuestionParagraphs"
        />
        <ChangeActivationType
          :model="questionParagraphs"
          :fullbackAction="getAllQuestionParagraphs"
        />
        <CustomPagination
          :paginationData="questionParagraphs.filterData"
          @changePagination="changePagination($event)"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <QuestionParagraphFilter
        :model="questionParagraphs"
        :fullbackAction="getAllQuestionParagraphs"
      />
      <QuestionParagraphSort
        :model="questionParagraphs"
        :fullbackAction="getAllQuestionParagraphs"
      />
      <QuestionParagraphAdd
        :model="questionParagraphs"
        :fullbackAction="getAllQuestionParagraphs"
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
import QuestionParagraphs from "../../../../models/additional/educational/questionParagraphs/QuestionParagraphs";
import apiQuestionParagraph from "../../../../api/additional/educational/questionParagraphs/questionParagraph";
import QuestionParagraphTable from "./components/Table.vue";
import QuestionParagraphCard from "./components/Card.vue";
import QuestionParagraphAdd from "./components/Add.vue";
import QuestionParagraphInfo from "./components/Info.vue";
import QuestionParagraphUpdate from "./components/Update.vue";
import QuestionParagraphDelete from "./components/Delete.vue";
import ChangeActivationType from "./components/ChangeActivationType.vue";
import CustomPagination from "../../../../components/general/CustomPagination.vue";
import QuestionParagraphFilter from "./components/Filter.vue";
import QuestionParagraphSort from "./components/Sort.vue";

export default {
  name: "QuestionParagraphs",
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
      questionParagraphs: new QuestionParagraphs(),
      showTable: false,
    };
  },
  created() {
    this.questionParagraphs.filterData.ownerUserToken = this.userTeacherToken;
    this.getAllQuestionParagraphs();
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    ExceptionWithImg,
    QuestionParagraphTable,
    QuestionParagraphCard,
    QuestionParagraphAdd,
    QuestionParagraphInfo,
    QuestionParagraphUpdate,
    QuestionParagraphDelete,
    ChangeActivationType,
    CustomPageHeader,
    CustomPagination,
    QuestionParagraphFilter,
    QuestionParagraphSort,
  },
  computed: {
    ...mapGetters(["userPersonalData", "generalSetting"]),
    hasData() {
      return this.questionParagraphs.questionParagraphsData.length != 0;
    },
    viewType() {
      return this.generalSetting[this.questionParagraphs.metaData.name]
        .viewType;
    },
  },
  methods: {
    changePagination(pagination) {
      this.questionParagraphs.filterData.fillData(pagination);
      this.getAllQuestionParagraphs();
    },

    async getAllQuestionParagraphs() {
      try {
        this.questionParagraphs.questionParagraphsData = [];
        const response = await apiQuestionParagraph.getAll(
          this.questionParagraphs.filterData
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
        this.questionParagraphs.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
  },
};
</script>

<style lang="scss"></style>

<template>
  <div class="page-container">
    <div class="pagination-with-content">
      <CustomPageHeader
        :model="questions"
        :canToggleView="false"
        :addFullbackAction="getAllQuestions"
        :filterFullbackAction="getAllQuestions"
        :sortFullbackAction="getAllQuestions"
        :toggelActivationFullbackAction="getAllQuestions"
      />
      <template v-if="hasData">
        <QuestionTable
          :model="questions"
          :updateFullbackAction="getAllQuestions"
          :deleteFullbackAction="getAllQuestions"
          :changeActivationFullbackAction="getAllQuestions"
          @setQuestionData="questions.question.fillData($event)"
          class=""
        />
        <!-- <QuestionCard
          v-if="viewType == VIEW_TYPES.cards"
          :model="questions"
          :updateFullbackAction="getAllQuestions"
          :deleteFullbackAction="getAllQuestions"
          :changeActivationFullbackAction="getAllQuestions"
          @setQuestionData="questions.question.fillData($event)"
          class=""
        /> -->
        <QuestionInfo :model="questions" />
        <QuestionMedia :model="questions" />
        <QuestionUpdate :model="questions" :fullbackAction="getAllQuestions" />
        <QuestionDelete :model="questions" :fullbackAction="getAllQuestions" />
        <ChangeActivationType
          :model="questions"
          :fullbackAction="getAllQuestions"
        />
        <CustomPagination
          :paginationData="questions.filterData"
          @changePagination="changePagination($event)"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <QuestionFilter :model="questions" :fullbackAction="getAllQuestions" />
      <QuestionSort :model="questions" :fullbackAction="getAllQuestions" />
      <QuestionAdd :model="questions" :fullbackAction="getAllQuestions" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { mapActions } from "vuex";
import generalMixin from "../../../../utils/generalMixin";
import ExceptionWithImg from "../../../../components/general/ExceptionWithImg.vue";
import CustomPageHeader from "../../../../components/general/CustomPageHeader.vue";
import Questions from "../../../../models/additional/educational/questions/Questions";
import apiQuestion from "../../../../api/additional/educational/questions/question";
import QuestionTable from "./components/Table.vue";
// import QuestionCard from "./components/Card.vue";
import QuestionAdd from "./components/Add.vue";
import QuestionInfo from "./components/Info.vue";
import QuestionMedia from "./components/Media.vue";
import QuestionUpdate from "./components/Update.vue";
import QuestionDelete from "./components/Delete.vue";
import ChangeActivationType from "./components/ChangeActivationType.vue";
import CustomPagination from "../../../../components/general/CustomPagination.vue";
import QuestionFilter from "./components/Filter.vue";
import QuestionSort from "./components/Sort.vue";

export default {
  name: "Questions",
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
      questions: new Questions(),
      showTable: false,
    };
  },
  created() {
    this.questions.filterData.ownerUserToken = this.userTeacherToken;
    this.getAllQuestions();
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    ExceptionWithImg,
    QuestionTable,
    // QuestionCard,
    QuestionAdd,
    QuestionInfo,
    QuestionMedia,
    QuestionUpdate,
    QuestionDelete,
    ChangeActivationType,
    CustomPageHeader,
    CustomPagination,
    QuestionFilter,
    QuestionSort,
  },
  computed: {
    ...mapGetters(["userPersonalData", "generalSetting"]),
    hasData() {
      return this.questions.questionsData.length != 0;
    },
    viewType() {
      return this.generalSetting[this.questions.metaData.name].viewType;
    },
  },
  methods: {
    changePagination(pagination) {
      this.questions.filterData.fillData(pagination);
      this.getAllQuestions();
    },

    async getAllQuestions() {
      try {
        this.questions.questionsData = [];
        const response = await apiQuestion.getAll(this.questions.filterData);
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
        this.questions.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
  },
};
</script>

<style lang="scss"></style>

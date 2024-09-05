<template>
  <div class="page-container">
    <div class="pagination-with-content">
      <template>
        <div class="row">
          <div class="col-md-12">
            <!-- EducationalCourse selected -->
            <b-button
              v-b-toggle="`SelectedEducationalCourseLevel`"
              class="btn btn-lg btn-collapse"
            >
              <span>{{ $t("EducationalCourseLevels.name") }} </span>
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </b-button>
            <b-collapse :id="`SelectedEducationalCourseLevel`">
              <div class="row data-collapse">
                <div class="row">
                  <DataLabelGroup
                    :className="'col-md-6'"
                    :value="
                      educationalCourseLevels.educationalCourseLevel
                        .educationalCourseLevelNameCurrent
                    "
                    :title="$t('general.name')"
                    :imgName="'EducationalCourseLevels.svg'"
                  />
                  <DataLabelGroup
                    :className="'col-md-6'"
                    :value="
                      educationalCourseLevels.educationalCourseLevel
                        .educationalCourseInfo
                        ? educationalCourseLevels.educationalCourseLevel
                            .educationalCourseInfo.educationalCourseNameCurrent
                        : ''
                    "
                    :title="$t('EducationalCourses.name')"
                    :imgName="'EducationalCourses.svg'"
                  />
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </template>
      <CustomPageHeader
        :canAdd="canAdd"
        :canSort="false"
        :canChangeActivationType="false"
        :canToggleView="false"
        :model="educationalCourseLevelQuestions"
        :addFullbackAction="getAllEducationalCourseLevelQuestions"
        :filterFullbackAction="getAllEducationalCourseLevelQuestions"
        :sortFullbackAction="getAllEducationalCourseLevelQuestions"
        :toggelActivationFullbackAction="getAllEducationalCourseLevelQuestions"
      />
      <template v-if="hasData">
        <EducationalCourseLevelQuestionTable
          :model="educationalCourseLevelQuestions"
          :updateFullbackAction="getAllEducationalCourseLevelQuestions"
          @setEducationalCourseLevelQuestionData="
            educationalCourseLevelQuestions.educationalCourseLevelQuestion.fillData(
              $event
            )
          "
          @setQuestionData="questions.question.fillData($event)"
          class=""
        />

        <EducationalCourseLevelQuestionInfo
          :model="educationalCourseLevelQuestions"
        />
        <QuestionMedia :model="questions" />
        <CustomPagination
          :paginationData="educationalCourseLevelQuestions.filterData"
          @changePagination="changePagination($event)"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <EducationalCourseLevelQuestionFilter
        :model="educationalCourseLevelQuestions"
        :educationalCourseLevelsModel="educationalCourseLevels"
        :fullbackAction="getAllEducationalCourseLevelQuestions"
      />
      <EducationalCourseLevelQuestionAdd
        :model="educationalCourseLevelQuestions"
        :educationalCourseLevelsModel="educationalCourseLevels"
        :fullbackAction="getAllEducationalCourseLevelQuestions"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import generalMixin from "../../../utils/generalMixin";
import DataLabelGroup from "../../../components/previews/DataLabelGroup.vue";
import ExceptionWithImg from "../../../components/general/ExceptionWithImg.vue";
import CustomPageHeader from "../../../components/general/CustomPageHeader.vue";
import Questions from "../../../models/additional/educational/questions/Questions";
import EducationalCourseLevelQuestions from "../../../models/educationals/educationalCourseLevelQuestions/EducationalCourseLevelQuestions";
import apiEducationalCourseLevelQuestion from "../../../api/educationals/educationalCourseLevelQuestions/educationalCourseLevelQuestion";
import EducationalCourseLevelQuestionTable from "./components/Table.vue";
import EducationalCourseLevelQuestionAdd from "./components/Add.vue";
import EducationalCourseLevelQuestionInfo from "./components/Info.vue";
import CustomPagination from "../../../components/general/CustomPagination.vue";
import EducationalCourseLevelQuestionFilter from "./components/Filter.vue";
import EducationalCourseLevels from "../../../models/educationals/educationalCourseLevels/EducationalCourseLevels";
import QuestionMedia from "./../../additional/educational/questions/components/Media.vue";

export default {
  name: "EducationalCourseLevelQuestions",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    educationalCourseLevelToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      educationalCourseLevelQuestions: new EducationalCourseLevelQuestions(),
      educationalCourseLevels: new EducationalCourseLevels(),
      questions: new Questions(),
    };
  },
  created() {
    if (this.educationalCourseLevelToken) {
      this.setFilter();
    } else {
      this.educationalCourseLevelQuestions.filterData.setInitialValue();
    }
    this.getAllEducationalCourseLevelQuestions();
  },
  watch: {
    "filterData.educationalCourseLevelToken": function(v) {
      this.educationalCourseLevelQuestions.filterData.educationalCourseLevelToken =
        v || this.educationalCourseLevelToken;
    },
    educationalCourseLevelToken: function(v) {
      if (v) {
        this.setFilter();
      } else {
        this.educationalCourseLevelQuestions.filterData.setInitialValue();
      }
      this.getAllEducationalCourseLevelQuestions();
    },
  },
  beforeMount() {},
  mounted() {},
  components: {
    DataLabelGroup,
    ExceptionWithImg,
    EducationalCourseLevelQuestionTable,
    EducationalCourseLevelQuestionAdd,
    EducationalCourseLevelQuestionInfo,
    CustomPageHeader,
    CustomPagination,
    EducationalCourseLevelQuestionFilter,
    QuestionMedia,
  },
  computed: {
    ...mapGetters(["userPersonalData", "generalSetting", "isTeacherLogged"]),
    hasData() {
      return (
        this.educationalCourseLevelQuestions.educationalCourseLevelQuestionsData
          .length != 0
      );
    },

    canAdd() {
      return this.educationalCourseLevelToken ||
        this.educationalCourseLevelQuestions.filterData
          .educationalCourseLevelToken
        ? true
        : false;
    },
  },
  methods: {
    setFilter() {
      this.educationalCourseLevelQuestions.filterData.educationalCourseLevelToken = this.educationalCourseLevelToken;
      // this.educationalCourseLevelQuestions.educationalCourseLevelQuestion.educationalCourseLevelToken = this.educationalCourseLevelToken;
    },
    changePagination(pagination) {
      this.educationalCourseLevelQuestions.filterData.fillData(pagination);
      this.getAllEducationalCourseLevelQuestions();
    },

    async getAllEducationalCourseLevelQuestions() {
      // this.educationalCourseLevelQuestions.filterData.ownerUserToken = this.userPersonalData.userToken;
      try {
        this.educationalCourseLevelQuestions.educationalCourseLevelQuestionsData = [];
        const response = await apiEducationalCourseLevelQuestion.getAll(
          this.educationalCourseLevelQuestions.filterData
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
        this.educationalCourseLevelQuestions.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
  },
};
</script>

<style lang="scss"></style>

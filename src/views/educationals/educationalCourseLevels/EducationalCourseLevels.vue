<template>
  <div class="page-container">
    <div class="pagination-with-content">
      <template>
        <div class="row">
          <div class="col-md-12">
            <!-- EducationalCourse selected -->
            <b-button
              v-b-toggle="`SelectedEducationalCourse`"
              class="btn btn-lg btn-collapse"
            >
              <span>{{ $t("EducationalCourses.name") }} </span>
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </b-button>
            <b-collapse :id="`SelectedEducationalCourse`">
              <div class="row data-collapse">
                <div class="row">
                  <DataLabelGroup
                    :className="'col-md-6'"
                    :value="
                      educationalCourses.educationalCourse
                        .educationalCourseNameCurrent
                    "
                    :title="$t('general.name')"
                    :imgName="'EducationalCourses.svg'"
                  />
                  <DataLabelGroup
                    v-if="
                      educationalCourses.educationalCourse
                        .educationalCategoryInfoData
                    "
                    :className="'col-md-6'"
                    :value="
                      educationalCourses.educationalCourse
                        .educationalCategoryInfoData
                        .educationalCategoryNameCurrent
                    "
                    :title="$t('EducationalCategories.name')"
                    :imgName="'EducationalCategories.svg'"
                  />
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </template>
      <CustomPageHeader
        :model="educationalCourseLevels"
        :canToggleView="false"
        :addFullbackAction="getAllEducationalCourseLevels"
        :filterFullbackAction="getAllEducationalCourseLevels"
        :sortFullbackAction="getAllEducationalCourseLevels"
        :toggelActivationFullbackAction="getAllEducationalCourseLevels"
      />
      <template v-if="hasData">
        <EducationalCourseLevelTable
          :model="educationalCourseLevels"
          :updateFullbackAction="getAllEducationalCourseLevels"
          :deleteFullbackAction="getAllEducationalCourseLevels"
          :changeActivationFullbackAction="getAllEducationalCourseLevels"
          @setEducationalCourseLevelData="
            educationalCourseLevels.educationalCourseLevel.fillData($event)
          "
          :hasAddUpdateQuestions="hasAddUpdateQuestions"
          class=""
        />
        <!-- <EducationalCourseLevelCard
          v-if="viewType == VIEW_TYPES.cards"
          :model="educationalCourseLevels"
          :updateFullbackAction="getAllEducationalCourseLevels"
          :deleteFullbackAction="getAllEducationalCourseLevels"
          :changeActivationFullbackAction="getAllEducationalCourseLevels"
          @setEducationalCourseLevelData="
            educationalCourseLevels.educationalCourseLevel.fillData($event)
          "
          :hasAddUpdateQuestions="hasAddUpdateQuestions"
          class=""
        /> -->
        <EducationalCourseLevelInfo :model="educationalCourseLevels" />
        <EducationalCourseLevelMedia :model="educationalCourseLevels" />
        <EducationalCourseLevelUpdate
          :model="educationalCourseLevels"
          :fullbackAction="getAllEducationalCourseLevels"
        />
        <EducationalCourseLevelDelete
          :model="educationalCourseLevels"
          :fullbackAction="getAllEducationalCourseLevels"
        />
        <ChangeActivationType
          :model="educationalCourseLevels"
          :fullbackAction="getAllEducationalCourseLevels"
        />
        <CustomPagination
          :paginationData="educationalCourseLevels.filterData"
          @changePagination="changePagination($event)"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <EducationalCourseLevelFilter
        :model="educationalCourseLevels"
        :educationalCoursesModel="educationalCourses"
        :fullbackAction="getAllEducationalCourseLevels"
      />
      <EducationalCourseLevelSort
        :model="educationalCourseLevels"
        :fullbackAction="getAllEducationalCourseLevels"
      />
      <!-- <EducationalCourseLevelReSort
        :model="educationalCourseLevels"
        :fullbackAction="getAllEducationalCourseLevels"
      /> -->
      <EducationalCourseLevelAdd
        :model="educationalCourseLevels"
        :fullbackAction="getAllEducationalCourseLevels"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import generalMixin from "../../../utils/generalMixin";
import ExceptionWithImg from "../../../components/general/ExceptionWithImg.vue";
import DataLabelGroup from "../../../components/previews/DataLabelGroup.vue";
import CustomPageHeader from "../../../components/general/CustomPageHeader.vue";
import EducationalCourseLevels from "../../../models/educationals/educationalCourseLevels/EducationalCourseLevels";
import apiEducationalCourseLevel from "../../../api/educationals/educationalCourseLevels/educationalCourseLevel";
import EducationalCourseLevelTable from "./components/Table.vue";
// import EducationalCourseLevelCard from "./components/Card.vue";
import EducationalCourseLevelAdd from "./components/Add.vue";
import EducationalCourseLevelInfo from "./components/Info.vue";
import EducationalCourseLevelMedia from "./components/Media.vue";
import EducationalCourseLevelUpdate from "./components/Update.vue";
import EducationalCourseLevelDelete from "./components/Delete.vue";
import ChangeActivationType from "./components/ChangeActivationType.vue";
import CustomPagination from "../../../components/general/CustomPagination.vue";
import EducationalCourseLevelFilter from "./components/Filter.vue";
import EducationalCourseLevelSort from "./components/Sort.vue";
// import EducationalCourseLevelReSort from "./components/ReSort.vue";
import EducationalCourses from "../../../models/educationals/educationalCourses/EducationalCourses";
// import EducationalCourseLevelQuestions from "../../../models/educationals/educationalCourseLevelQuestions/EducationalCourseLevelQuestions";

export default {
  name: "EducationalCourseLevels",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    educationalCourseToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      educationalCourseLevels: new EducationalCourseLevels(),
      // educationalCourseLevelQuestions: new EducationalCourseLevelQuestions(),
      educationalCourses: new EducationalCourses(),
    };
  },
  created() {
    if (this.educationalCourseToken) {
      this.educationalCourseLevels.filterData.educationalCourseToken =
        this.educationalCourseToken;
      this.educationalCourseLevels.educationalCourseLevel.educationalCourseToken =
        this.educationalCourseToken;
    } else {
      this.educationalCourseLevels.filterData.setInitialValue();
    }
    this.getAllEducationalCourseLevels();
  },
  watch: {
    educationalCourseToken: function (v) {
      if (v) {
        this.educationalCourseLevels.filterData.educationalCourseToken =
          this.educationalCourseToken;
        this.educationalCourseLevels.educationalCourseLevel.educationalCourseToken =
          this.educationalCourseToken;
      } else {
        this.educationalCourseLevels.filterData.setInitialValue();
      }
      this.getAllEducationalCourseLevels();
    },
  },
  beforeMount() {},
  mounted() {},
  components: {
    DataLabelGroup,
    ExceptionWithImg,
    EducationalCourseLevelTable,
    // EducationalCourseLevelCard,
    EducationalCourseLevelAdd,
    EducationalCourseLevelInfo,
    EducationalCourseLevelMedia,
    EducationalCourseLevelUpdate,
    EducationalCourseLevelDelete,
    ChangeActivationType,
    CustomPageHeader,
    CustomPagination,
    EducationalCourseLevelFilter,
    EducationalCourseLevelSort,
    // EducationalCourseLevelReSort,
  },
  computed: {
    ...mapGetters(["userPersonalData", "generalSetting", "isTeacherLogged"]),
    // canAdd() {
    //   return this.isTeacherLogged;
    // },
    hasData() {
      return (
        this.educationalCourseLevels.educationalCourseLevelsData.length != 0
      );
    },
    viewType() {
      return this.generalSetting[this.educationalCourseLevels.metaData.name]
        .viewType;
    },
    hasAddUpdateQuestions() {
      return this.educationalCourseLevels.metaData.privileges
        .addUpdateQuestions;
    },
  },
  methods: {
    changePagination(pagination) {
      this.educationalCourseLevels.filterData.fillData(pagination);
      this.getAllEducationalCourseLevels();
    },

    async getAllEducationalCourseLevels() {
      // this.educationalCourseLevels.filterData.ownerUserToken = this.userPersonalData.userToken;
      try {
        this.educationalCourseLevels.educationalCourseLevelsData = [];
        const response = await apiEducationalCourseLevel.getAll(
          this.educationalCourseLevels.filterData
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
        this.educationalCourseLevels.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
  },
};
</script>

<style lang="scss"></style>

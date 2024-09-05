<template>
  <div class="page-container">
    <div class="pagination-with-content">
      <template>
        <div class="row">
          <div class="col-md-12">
            <!-- EducationalCategory selected -->
            <b-button
              v-b-toggle="`SelectedEducationalCategory`"
              class="btn btn-lg btn-collapse"
            >
              <span>{{ $t("EducationalCategories.name") }} </span>
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </b-button>
            <b-collapse :id="`SelectedEducationalCategory`">
              <div class="row data-collapse">
                <div class="row">
                  <DataLabelGroup
                    :className="'col-md-6'"
                    :value="
                      educationalCategories.educationalCategory
                        .educationalCategoryNameCurrent
                    "
                    :title="$t('general.name')"
                    :imgName="'EducationalCategories.svg'"
                  />

                  <DataLabelGroup
                    :className="'col-md-6'"
                    :value="
                      educationalCategories.educationalCategory
                        .educationalCategoryDescriptionCurrent
                    "
                    :title="$t('general.description')"
                    :imgName="'description.svg'"
                  />

                  <DataLabelGroup
                    :className="'col-md-12'"
                    :value="
                      educationalCategories.educationalCategory
                        .educationalCategoryNotes
                    "
                    :title="$t('general.notes')"
                    :imgName="'notes.svg'"
                  />
                  <DataLabelGroup
                    v-if="
                      educationalCategories.educationalCategory
                        .parentEducationalCategoryInfoData
                    "
                    :className="'col-md-12'"
                    :value="
                      educationalCategories.educationalCategory
                        .parentEducationalCategoryInfoData
                        .educationalCategoryNameCurrent
                    "
                    :title="$t('EducationalCategories.parent')"
                    :imgName="'EducationalCategories.svg'"
                  />
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </template>
      <CustomPageHeader
        :model="educationalCourses"
        :canAdd="canAdd"
        :addFullbackAction="getAllEducationalCourses"
        :filterFullbackAction="getAllEducationalCourses"
        :sortFullbackAction="getAllEducationalCourses"
        :toggelActivationFullbackAction="getAllEducationalCourses"
      />
      <template v-if="hasData">
        <EducationalCourseTable
          v-if="viewType == VIEW_TYPES.table"
          :model="educationalCourses"
          :modelLevels="educationalCourseLevels"
          :updateFullbackAction="getAllEducationalCourses"
          :deleteFullbackAction="getAllEducationalCourses"
          :changeActivationFullbackAction="getAllEducationalCourses"
          @setEducationalCourseData="
            educationalCourses.educationalCourse.fillData($event)
          "
          @setEducationalCourseLevelData="
            educationalCourseLevels.educationalCourseLevel.educationalCourseToken = $event
          "
          class=""
        />
        <EducationalCourseCard
          v-if="viewType == VIEW_TYPES.cards"
          :model="educationalCourses"
          :modelLevels="educationalCourseLevels"
          :updateFullbackAction="getAllEducationalCourses"
          :deleteFullbackAction="getAllEducationalCourses"
          :changeActivationFullbackAction="getAllEducationalCourses"
          @setEducationalCourseData="
            educationalCourses.educationalCourse.fillData($event)
          "
          @setEducationalCourseLevelData="
            educationalCourseLevels.educationalCourseLevel.educationalCourseToken = $event
          "
          class=""
        />
        <EducationalCourseInfo :model="educationalCourses" />
        <EducationalCourseUpdate
          :model="educationalCourses"
          :fullbackAction="getAllEducationalCourses"
        />
        <EducationalCourseDelete
          :model="educationalCourses"
          :fullbackAction="getAllEducationalCourses"
        />
        <ChangeActivationType
          :model="educationalCourses"
          :fullbackAction="getAllEducationalCourses"
        />
        <ChangeStartEnd
          :model="educationalCourses"
          :fullbackAction="getAllEducationalCourses"
        />
        <CustomPagination
          :paginationData="educationalCourses.filterData"
          @changePagination="changePagination($event)"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <EducationalCourseFilter
        :model="educationalCourses"
        :educationalCategoriesModel="educationalCategories"
        :fullbackAction="getAllEducationalCourses"
      />
      <EducationalCourseSort
        :model="educationalCourses"
        :fullbackAction="getAllEducationalCourses"
      />
      <EducationalCourseAdd
        :model="educationalCourses"
        :fullbackAction="getAllEducationalCourses"
      />
      <EducationalCourseLevelReSort
        :model="educationalCourseLevels"
        :fullbackAction="getAllEducationalCourses"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DataLabelGroup from "../../../components/previews/DataLabelGroup.vue";
import generalMixin from "../../../utils/generalMixin";
import ExceptionWithImg from "../../../components/general/ExceptionWithImg.vue";
import CustomPageHeader from "../../../components/general/CustomPageHeader.vue";
import EducationalCourses from "../../../models/educationals/educationalCourses/EducationalCourses";
import apiEducationalCourse from "../../../api/educationals/educationalCourses/educationalCourse";
import EducationalCourseTable from "./components/Table.vue";
import EducationalCourseCard from "./components/Card.vue";
import EducationalCourseAdd from "./components/Add.vue";
import EducationalCourseInfo from "./components/Info.vue";
import EducationalCourseUpdate from "./components/Update.vue";
import EducationalCourseDelete from "./components/Delete.vue";
import ChangeActivationType from "./components/ChangeActivationType.vue";
import ChangeStartEnd from "./components/ChangeStartEnd.vue";
import CustomPagination from "../../../components/general/CustomPagination.vue";
import EducationalCourseFilter from "./components/Filter.vue";
import EducationalCourseSort from "./components/Sort.vue";
import EducationalCourseLevels from "../../../models/educationals/educationalCourseLevels/EducationalCourseLevels";
import EducationalCourseLevelReSort from "../../../views/educationals/educationalCourseLevels/components/ReSort.vue";
import EducationalCategories from "../../../models/educationals/educationalCategories/EducationalCategories";

export default {
  name: "EducationalCourses",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    parentEducationalCategoryToken: {
      type: String,
      default: "",
    },
    educationalCategoryToken: {
      type: String,
      default: "",
    },
    userTeacherToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      educationalCourses: new EducationalCourses(),
      showTable: false,
      educationalCourseLevels: new EducationalCourseLevels(),
      educationalCategories: new EducationalCategories(),
    };
  },
  async created() {
    await this.setFilter();
    // if (this.educationalCategoryToken) {
    //   this.setFilter();
    // } else {
    //   this.educationalCourses.filterData.setInitialValue();
    // }
    this.getAllEducationalCourses();
  },
  watch: {
    educationalCategoryToken: async function() {
      await this.setFilter();
      // if (v) {
      //   this.setFilter();
      // } else {
      //   this.educationalCourses.filterData.setInitialValue();
      // }
      this.getAllEducationalCourses();
    },
    "filterData.ownerUserToken": function(token) {
      this.setOwnerUserToken(token);
    },
    "filterData.educationalCategoryToken": async function() {
      await this.setFilter();
    },
  },
  beforeMount() {},
  mounted() {},
  components: {
    DataLabelGroup,
    ExceptionWithImg,
    EducationalCourseTable,
    EducationalCourseCard,
    EducationalCourseAdd,
    EducationalCourseInfo,
    EducationalCourseUpdate,
    EducationalCourseDelete,
    ChangeActivationType,
    ChangeStartEnd,
    CustomPageHeader,
    CustomPagination,
    EducationalCourseFilter,
    EducationalCourseSort,
    EducationalCourseLevelReSort,
  },
  computed: {
    ...mapGetters([
      "userPersonalData",
      "generalSetting",
      "isTeacherLogged",
      "ownerUserToken",
    ]),
    hasData() {
      return this.educationalCourses.educationalCoursesData.length != 0;
    },
    viewType() {
      return this.generalSetting[this.educationalCourses.metaData.name]
        .viewType;
    },
    canAdd() {
      return this.ownerUserToken &&
        (this.educationalCategoryToken ||
          this.educationalCourses.filterData.educationalCategoryToken)
        ? true
        : false;
    },
  },
  methods: {
    ...mapActions(["updateOwnerUserToken"]),
    setOwnerUserToken(token) {
      this.updateOwnerUserToken(token);
    },
    changePagination(pagination) {
      this.educationalCourses.filterData.fillData(pagination);
      this.getAllEducationalCourses();
    },
    setFilter() {
      this.educationalCourses.filterData.parentEducationalCategoryToken =
        this.parentEducationalCategoryToken || "";
      this.educationalCourses.filterData.educationalCategoryToken = this.educationalCategoryToken;
      this.educationalCourses.filterData.ownerUserToken = this.userTeacherToken;
      this.educationalCourses.educationalCourse.educationalCategoryToken = this.educationalCourses.filterData.educationalCategoryToken;
      if (
        this.parentEducationalCategoryToken != " " &&
        this.parentEducationalCategoryToken != ""
      ) {
        this.educationalCourses.filterData.getOnlyParentEducationalCategories = false;
        this.educationalCourses.filterData.getOnlyChildEducationalCategories = true;
      } else {
        this.educationalCourses.filterData.getOnlyParentEducationalCategories = true;
        this.educationalCourses.filterData.getOnlyChildEducationalCategories = false;
      }
    },

    async getAllEducationalCourses() {
      this.educationalCourses.educationalCourse.ownerUserToken = this.educationalCourses.filterData.ownerUserToken;
      // this.educationalCourses.filterData.ownerUserToken = this.userPersonalData.userToken;
      try {
        this.educationalCourses.educationalCoursesData = [];
        const response = await apiEducationalCourse.getAll(
          this.educationalCourses.filterData
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
        this.educationalCourses.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
  },
};
</script>

<style lang="scss"></style>

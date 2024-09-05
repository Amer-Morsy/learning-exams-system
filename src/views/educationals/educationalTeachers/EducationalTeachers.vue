<template>
  <div class="page-container">
    <div class="pagination-with-content">
      <CustomPageHeader
        :model="educationalTeachers"
        :canAdd="false"
        :canChangeActivationType="false"
        :canToggleView="false"
        :addFullbackAction="getAllEducationalTeachers"
        :filterFullbackAction="getAllEducationalTeachers"
        :sortFullbackAction="getAllEducationalTeachers"
        :toggelActivationFullbackAction="getAllEducationalTeachers"
      />
      <template v-if="hasData">
        <EducationalTeacherTable
          :model="educationalTeachers"
          :updateFullbackAction="getAllEducationalTeachers"
          :deleteFullbackAction="getAllEducationalTeachers"
          :changeActivationFullbackAction="getAllEducationalTeachers"
          @setEducationalTeacherData="
            educationalTeachers.educationalTeacher.fillData($event)
          "
          class=""
        />

        <CustomPagination
          :paginationData="educationalTeachers.filterData"
          @changePagination="changePagination($event)"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <EducationalTeacherFilter
        :model="educationalTeachers"
        :educationalCategoriesModel="educationalCategories"
        :fullbackAction="getAllEducationalTeachers"
      />
      <EducationalTeacherSort
        :model="educationalTeachers"
        :fullbackAction="getAllEducationalTeachers"
      />
      <BlockTeacher
        :userTeacherToken="
          educationalTeachers.educationalTeacher.userTeacherToken
        "
        :educationalCategoryToken="educationalCategoryToken"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import generalMixin from "../../../utils/generalMixin";
import ExceptionWithImg from "../../../components/general/ExceptionWithImg.vue";
import CustomPageHeader from "../../../components/general/CustomPageHeader.vue";
import EducationalTeachers from "../../../models/educationals/educationalTeachers/EducationalTeachers";
import apiEducationalTeacher from "../../../api/educationals/educationalTeachers/educationalTeacher";
import EducationalTeacherTable from "./components/Table.vue";
import CustomPagination from "../../../components/general/CustomPagination.vue";
import EducationalTeacherFilter from "./components/Filter.vue";
import EducationalTeacherSort from "./components/Sort.vue";
import BlockTeacher from "./components/BlockTeacher.vue";
import EducationalCategories from "../../../models/educationals/educationalCategories/EducationalCategories";

export default {
  name: "EducationalTeachers",
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
  },
  data() {
    return {
      educationalCategories: new EducationalCategories(),
      educationalTeachers: new EducationalTeachers(),
    };
  },
  async created() {
    await this.setFilter();

    // if (this.educationalCategoryToken) {
    //   this.educationalTeachers.filterData.educationalCategoryToken = this.educationalCategoryToken;
    //   this.educationalTeachers.educationalTeacher.educationalCategoryToken = this.educationalCategoryToken;
    //   this.educationalTeachers.filterData.parentEducationalCategoryToken = this.parentEducationalCategoryToken;
    //   this.educationalTeachers.educationalTeacher.parentEducationalCategoryToken = this.parentEducationalCategoryToken;
    // } else {
    //   this.educationalTeachers.filterData.setInitialValue();
    // }
    this.getAllEducationalTeachers();
  },
  watch: {
    educationalCategoryToken: async function() {
      await this.setFilter();
      // if (v) {
      //   this.educationalTeachers.filterData.educationalCategoryToken = this.educationalCategoryToken;
      //   this.educationalTeachers.educationalTeacher.educationalCategoryToken = this.educationalCategoryToken;
      //   this.educationalTeachers.filterData.parentEducationalCategoryToken = this.parentEducationalCategoryToken;
      //   this.educationalTeachers.educationalTeacher.parentEducationalCategoryToken = this.parentEducationalCategoryToken;
      // } else {
      //   this.educationalTeachers.filterData.setInitialValue();
      // }
      this.getAllEducationalTeachers();
    },
  },
  beforeMount() {},
  mounted() {},
  components: {
    ExceptionWithImg,
    EducationalTeacherTable,
    CustomPageHeader,
    CustomPagination,
    EducationalTeacherFilter,
    EducationalTeacherSort,
    BlockTeacher,
  },
  computed: {
    ...mapGetters(["userPersonalData", "generalSetting"]),
    hasData() {
      return this.educationalTeachers.educationalTeachersData.length != 0;
    },
    viewType() {
      return this.generalSetting[this.educationalTeachers.metaData.name]
        .viewType;
    },
    canAdd() {
      return this.educationalCategoryToken ||
        this.educationalTeachers.filterData.educationalCategoryToken
        ? true
        : false;
    },
  },
  methods: {
    setFilter() {
      this.educationalTeachers.filterData.educationalCategoryToken = this.educationalCategoryToken;
      this.educationalTeachers.educationalTeacher.educationalCategoryToken = this.educationalCategoryToken;
      this.educationalTeachers.filterData.parentEducationalCategoryToken = this.parentEducationalCategoryToken;
      this.educationalTeachers.educationalTeacher.parentEducationalCategoryToken = this.parentEducationalCategoryToken;

      if (
        this.parentEducationalCategoryToken != " " &&
        this.parentEducationalCategoryToken != ""
      ) {
        this.educationalTeachers.filterData.getOnlyParentEducationalCategories = false;
        this.educationalTeachers.filterData.getOnlyChildEducationalCategories = true;
      } else {
        this.educationalTeachers.filterData.getOnlyParentEducationalCategories = true;
        this.educationalTeachers.filterData.getOnlyChildEducationalCategories = false;
      }
    },
    changePagination(pagination) {
      this.educationalTeachers.filterData.fillData(pagination);
      this.getAllEducationalTeachers();
    },

    async getAllEducationalTeachers() {
      this.educationalTeachers.educationalTeacher.ownerUserToken = this.educationalTeachers.filterData.ownerUserToken;
      // this.educationalTeachers.filterData.ownerUserToken = this.userPersonalData.userToken;
      try {
        this.educationalTeachers.educationalTeachersData = [];
        const response = await apiEducationalTeacher.getAll(
          this.educationalTeachers.filterData
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
        this.educationalTeachers.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
  },
};
</script>

<style lang="scss"></style>

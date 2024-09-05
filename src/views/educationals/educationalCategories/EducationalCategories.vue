<template>
  <div class="page-container">
    <div class="pagination-with-content">
      <CustomPageHeader
        :model="educationalCategories"
        :addFullbackAction="getAllEducationalCategories"
        :filterFullbackAction="getAllEducationalCategories"
        :sortFullbackAction="getAllEducationalCategories"
        :toggelActivationFullbackAction="getAllEducationalCategories"
      />
      <template v-if="hasData">
        <EducationalCategoryTable
          v-if="viewType == VIEW_TYPES.table"
          :model="educationalCategories"
          :hasViewEducationalTeachers="hasViewEducationalTeachers"
          :updateFullbackAction="getAllEducationalCategories"
          :deleteFullbackAction="getAllEducationalCategories"
          :changeActivationFullbackAction="getAllEducationalCategories"
          @setEducationalCategoryData="
            educationalCategories.educationalCategory.fillData($event)
          "
          class=""
        />
        <EducationalCategoryCard
          v-if="viewType == VIEW_TYPES.cards"
          :model="educationalCategories"
          :hasViewEducationalTeachers="hasViewEducationalTeachers"
          :updateFullbackAction="getAllEducationalCategories"
          :deleteFullbackAction="getAllEducationalCategories"
          :changeActivationFullbackAction="getAllEducationalCategories"
          @setEducationalCategoryData="
            educationalCategories.educationalCategory.fillData($event)
          "
          class=""
        />
        <EducationalCategoryInfo :model="educationalCategories" />
        <EducationalCategoryUpdate
          :model="educationalCategories"
          :fullbackAction="getAllEducationalCategories"
        />
        <EducationalCategoryDelete
          :model="educationalCategories"
          :fullbackAction="getAllEducationalCategories"
        />
        <ChangeActivationType
          :model="educationalCategories"
          :fullbackAction="getAllEducationalCategories"
        />
        <CustomPagination
          :paginationData="educationalCategories.filterData"
          @changePagination="changePagination($event)"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <EducationalCategoryFilter
        :model="educationalCategories"
        :fullbackAction="getAllEducationalCategories"
      />
      <EducationalCategorySort
        :model="educationalCategories"
        :fullbackAction="getAllEducationalCategories"
      />
      <EducationalCategoryAdd
        :model="educationalCategories"
        :fullbackAction="getAllEducationalCategories"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { mapActions } from "vuex";
import generalMixin from "../../../utils/generalMixin";
import ExceptionWithImg from "../../../components/general/ExceptionWithImg.vue";
import CustomPageHeader from "../../../components/general/CustomPageHeader.vue";
import EducationalCategories from "../../../models/educationals/educationalCategories/EducationalCategories";
import EducationalTeachers from "../../../models/educationals/educationalTeachers/EducationalTeachers";
import apiEducationalCategory from "../../../api/educationals/educationalCategories/educationalCategory";
import EducationalCategoryTable from "./components/Table.vue";
import EducationalCategoryCard from "./components/Card.vue";
import EducationalCategoryAdd from "./components/Add.vue";
import EducationalCategoryInfo from "./components/Info.vue";
import EducationalCategoryUpdate from "./components/Update.vue";
import EducationalCategoryDelete from "./components/Delete.vue";
import ChangeActivationType from "./components/ChangeActivationType.vue";
import CustomPagination from "../../../components/general/CustomPagination.vue";
import EducationalCategoryFilter from "./components/Filter.vue";
import EducationalCategorySort from "./components/Sort.vue";

export default {
  name: "EducationalCategories",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    parentEducationalCategoryToken: {
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
  created() {
    if (this.parentEducationalCategoryToken) {
      this.educationalCategories.filterData.parentEducationalCategoryToken =
        this.parentEducationalCategoryToken;
      this.educationalCategories.educationalCategory.parentEducationalCategoryToken =
        this.parentEducationalCategoryToken;
      this.educationalCategories.filterData.getOnlyParentEducationalCategories = false;
      this.educationalCategories.filterData.getOnlyChildEducationalCategories = true;
    } else {
      this.educationalCategories.filterData.setInitialValue();
    }
    this.getAllEducationalCategories();
  },
  watch: {
    parentEducationalCategoryToken: function (v) {
      if (v) {
        this.educationalCategories.filterData.parentEducationalCategoryToken =
          this.parentEducationalCategoryToken;
        this.educationalCategories.educationalCategory.parentEducationalCategoryToken =
          this.parentEducationalCategoryToken;
        this.educationalCategories.filterData.getOnlyParentEducationalCategories = false;
        this.educationalCategories.filterData.getOnlyChildEducationalCategories = true;
      } else {
        this.educationalCategories.filterData.setInitialValue();
      }
      this.getAllEducationalCategories();
    },
  },
  beforeMount() {},
  mounted() {},
  components: {
    ExceptionWithImg,
    EducationalCategoryTable,
    EducationalCategoryCard,
    EducationalCategoryAdd,
    EducationalCategoryInfo,
    EducationalCategoryUpdate,
    EducationalCategoryDelete,
    ChangeActivationType,
    CustomPageHeader,
    CustomPagination,
    EducationalCategoryFilter,
    EducationalCategorySort,
  },
  computed: {
    ...mapGetters(["userPersonalData", "generalSetting", "isTeacherLogged"]),
    // canAdd() {
    //   return this.isTeacherLogged ? true : false;
    // },
    hasData() {
      return this.educationalCategories.educationalCategoriesData.length != 0;
    },
    viewType() {
      return this.generalSetting[this.educationalCategories.metaData.name]
        .viewType;
    },
    hasViewEducationalTeachers() {
      return this.educationalTeachers.metaData.privileges.view;
    },
  },
  methods: {
    changePagination(pagination) {
      this.educationalCategories.filterData.fillData(pagination);
      this.getAllEducationalCategories();
    },

    async getAllEducationalCategories() {
      this.educationalCategories.filterData.ownerUserToken =
        this.userPersonalData.userToken;
      try {
        this.educationalCategories.educationalCategoriesData = [];
        const response = await apiEducationalCategory.getAll(
          this.educationalCategories.filterData
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
        this.educationalCategories.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
  },
};
</script>

<style lang="scss"></style>

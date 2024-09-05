<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('EducationalCourses.add')"
    :headerIcon="headerIcon"
    :swipeAble="false"
    :clickToClose="false"
    @opened="
      educationalCourse.setInitialValue(
        educationalCourse.ownerUserToken,
        model.filterData.educationalCategoryToken
      )
    "
  >
    <div class="">
      <EducationalCourseForm
        :id="'add'"
        :educationalCourse="educationalCourse"
        @submitForm="add"
        @close="closeBottomSheet(refName)"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapActions } from "vuex";
import CustomBottomSheet from "../../../../components/general/CustomBottomSheet.vue";
import EducationalCourseForm from "./Form.vue";
import generalMixin from "../../../../utils/generalMixin";
import { objectToFormData } from "../../../../utils/functions";
import apiEducationalCourse from "../../../../api/educationals/educationalCourses/educationalCourse";

export default {
  name: "EducationalCourseAdd",
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
    EducationalCourseForm,
  },
  computed: {
    refName() {
      return this.model.metaData.components.Add.refName;
    },
    educationalCourse() {
      return this.model.educationalCourse;
    },
    headerIcon() {
      return this.educationalCourse.icon;
    },
    apiEducationalCourse() {
      return this.model.metaData.api;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async add() {
      // console.log(this.educationalCourse);
      let formData = objectToFormData(this.educationalCourse);
      const response = await apiEducationalCourse.add(formData);
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

<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('EducationalCourseLevels.add')"
    :headerIcon="headerIcon"
    :swipeAble="false"
    :clickToClose="false"
    @opened="
      educationalCourseLevel.setInitialValue(
        educationalCourseLevel.educationalCourseToken
      )
    "
  >
    <!-- @opened="
      educationalCourseLevel.setInitialValue(
        educationalCourseLevel.ownerUserToken,
        educationalCourseLevel.educationalCategoryToken,
        educationalCourseLevel.educationalCourseToken
      )
    " -->
    <div class="">
      <EducationalCourseLevelForm
        :id="'add'"
        :educationalCourseLevel="educationalCourseLevel"
        @submitForm="add"
        @close="closeBottomSheet(refName)"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapActions } from "vuex";
import CustomBottomSheet from "../../../../components/general/CustomBottomSheet.vue";
import EducationalCourseLevelForm from "./Form.vue";
import generalMixin from "../../../../utils/generalMixin";
import { objectToFormData } from "../../../../utils/functions";
import apiEducationalCourseLevel from "../../../../api/educationals/educationalCourseLevels/educationalCourseLevel";

export default {
  name: "EducationalCourseLevelAdd",
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
    EducationalCourseLevelForm,
  },
  computed: {
    refName() {
      return this.model.metaData.components.Add.refName;
    },
    educationalCourseLevel() {
      return this.model.educationalCourseLevel;
    },
    headerIcon() {
      return this.educationalCourseLevel.icon;
    },
    apiEducationalCourseLevel() {
      return this.model.metaData.api;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async add() {
      // console.log(this.educationalCourseLevel);
      let formData = objectToFormData(this.educationalCourseLevel);
      const response = await apiEducationalCourseLevel.add(formData);
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

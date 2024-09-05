<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('EducationalCourseLevels.update')"
    :headerIcon="headerIcon"
  >
    <div class="">
      <EducationalCourseLevelForm
        :key="refreshKey"
        :id="'update'"
        :deleteFileStatus="hasDeleteImage"
        :educationalCourseLevel="educationalCourseLevel"
        @submitForm="update"
        @deleteFile="deleteFile()"
        @close="closeBottomSheet(refName)"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import CustomBottomSheet from "../../../../components/general/CustomBottomSheet.vue";
import EducationalCourseLevelForm from "./Form.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { objectToFormData } from "./../../../../utils/functions";
import apiEducationalCourseLevel from "../../../../api/educationals/educationalCourseLevels/educationalCourseLevel";

export default {
  name: "EducationalCourseLevelUpdate",
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
    return {
      refreshKey: null,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    EducationalCourseLevelForm,
    CustomBottomSheet,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),
    refName() {
      return this.model.metaData.components.Update.refName;
    },
    educationalCourseLevel() {
      return this.model.educationalCourseLevel;
    },
    hasDeleteImage() {
      return (
        this.model.metaData.privileges.deleteImage &&
        !this.educationalCourseLevel.educationalCourseLevelFileIsDefault
      );
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
    async update() {
      let formData = objectToFormData(this.educationalCourseLevel);
      const response = await apiEducationalCourseLevel.update(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.closeBottomSheet(this.refName);
        this.runFullbackAction();
      } else {
        this.showMsg(response.data.msg);
      }
    },
    async deleteFile() {
      let formData = objectToFormData({
        token: this.educationalCourseLevel.educationalCourseLevelToken,
      });
      const response = await apiEducationalCourseLevel.deleteImage(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.educationalCourseLevel.educationalCourseLevelFilePath = "";
        this.educationalCourseLevel.educationalCourseLevelFileIsDefault = true;
        this.refreshKey = new Date();
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

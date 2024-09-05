<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('EducationalCategories.update')"
    :headerIcon="headerIcon"
    @opened="isOpened = true"
    @closed="isOpened = false"
  >
    <div class="">
      <EducationalCategoryForm
        :key="refreshKey"
        :id="'update'"
        :isOpened="isOpened"
        :deleteFileStatus="hasDeleteImage"
        :educationalCategory="educationalCategory"
        :filterData="filterData"
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
import EducationalCategoryForm from "./Form.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { objectToFormData } from "./../../../../utils/functions";
import apiEducationalCategory from "../../../../api/educationals/educationalCategories/educationalCategory";

export default {
  name: "EducationalCategoryUpdate",
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
      isOpened: false,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    EducationalCategoryForm,
    CustomBottomSheet,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),
    refName() {
      return this.model.metaData.components.Update.refName;
    },
    educationalCategory() {
      return this.model.educationalCategory;
    },
    hasDeleteImage() {
      return (
        this.model.metaData.privileges.deleteImage &&
        !this.educationalCategory.educationalCategoryImageIsDefault
      );
    },
    headerIcon() {
      return this.educationalCategory.icon;
    },
    apiEducationalCategory() {
      return this.model.metaData.api;
    },
    filterData() {
      return this.model.filterData;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async update() {
      let formData = objectToFormData(this.educationalCategory);
      const response = await apiEducationalCategory.update(formData);
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
        token: this.educationalCategory.educationalCategoryToken,
      });
      const response = await apiEducationalCategory.deleteImage(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.educationalCategory.educationalCategoryImagePath = "";
        this.educationalCategory.educationalCategoryImageIsDefault = true;
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

<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('EducationalCategories.add')"
    :headerIcon="headerIcon"
    :swipeAble="false"
    :clickToClose="false"
    @opened="
      isOpened = true;
      educationalCategory.setInitialValue(
        educationalCategory.parentEducationalCategoryToken
      );
    "
    @closed="isOpened = false"
  >
    <div class="">
      <EducationalCategoryForm
        :id="'add'"
        :isOpened="isOpened"
        :educationalCategory="educationalCategory"
        :filterData="filterData"
        @submitForm="add"
        @close="closeBottomSheet(refName)"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapActions } from "vuex";
import CustomBottomSheet from "../../../../components/general/CustomBottomSheet.vue";
import EducationalCategoryForm from "./Form.vue";
import generalMixin from "../../../../utils/generalMixin";
import { objectToFormData } from "../../../../utils/functions";
import apiEducationalCategory from "../../../../api/educationals/educationalCategories/educationalCategory";

export default {
  name: "EducationalCategoryAdd",
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
      isOpened: false,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomBottomSheet,
    EducationalCategoryForm,
  },
  computed: {
    refName() {
      return this.model.metaData.components.Add.refName;
    },
    educationalCategory() {
      return this.model.educationalCategory;
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
    async add() {
      // console.log(this.educationalCategory);
      let formData = objectToFormData(this.educationalCategory);
      const response = await apiEducationalCategory.add(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.runFullbackAction();
      } else {
        this.showMsg(response.data.msg);
      }
      this.closeBottomSheet(this.refName);
    },
    runFullbackAction() {
      this.fullbackAction();
    },
  },
};
</script>

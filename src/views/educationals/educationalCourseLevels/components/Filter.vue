<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('general.filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-11'"
        :id="`educationalCourseToken`"
        :value="model.filterData.educationalCourseToken"
        :options="educationalCourseTokenOptions"
        v-on:changeValue="
          model.filterData.educationalCourseToken = $event;
          setItemSelected();
        "
        :title="$t('EducationalCourses.select')"
        :imgName="'EducationalCourses.svg'"
      />
      <CustomBaseEntityFilter
        :className="'row'"
        :value="model.filterData"
        v-on:changeValue="model.filterData.fillData($event)"
      />
    </div>

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="search">
        <img src="@/assets/images/search-icon.svg" :title="$t('search')" />
      </div>
      <div @click.prevent="closeBottomSheet(refName)" class="icon-cancel">
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import CustomSelectBox from "./../../../../components/inputs/CustomSelectBox.vue";
import CustomBaseEntityFilter from "./../../../../components/general/CustomBaseEntityFilter.vue";
import generalMixin from "./../../../../utils/generalMixin";
import icon from "@/assets/images/filter.svg";
import { getEducationalCoursesDialogCustom } from "./../../../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin],
  props: {
    model: {
      type: Object,
      default: null,
    },
    educationalCoursesModel: {
      type: Object,
      default: null,
    },
    fullbackAction: {
      type: Function,
    },
  },
  data() {
    return {
      icon,
      educationalCourseTokenOptions: [],
    };
  },
  async created() {
    await this.getEducationalCoursesDialog();
    this.setItemSelected();
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
    CustomBaseEntityFilter,
  },
  computed: {
    refName() {
      return this.model.metaData.components.Filter.refName;
    },
  },
  methods: {
    async getEducationalCoursesDialog() {
      this.educationalCourseTokenOptions = await getEducationalCoursesDialogCustom();
    },
    setItemSelected() {
      let item = this.educationalCourseTokenOptions.filter((el) => {
        if (el.value == this.model.filterData.educationalCourseToken) {
          return el;
        }
      });

      if (item.length) {
        this.educationalCoursesModel.educationalCourse.fillData(
          item[0]["educationalCourse"]
        );
      } else {
        this.educationalCoursesModel.educationalCourse.setInitialValue();
      }
    },
    search() {
      this.closeBottomSheet(this.refName);
      this.runFullbackAction();
    },
    runFullbackAction() {
      this.fullbackAction();
    },
  },
};
</script>

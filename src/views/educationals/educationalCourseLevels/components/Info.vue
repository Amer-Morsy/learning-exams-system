<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('EducationalCourseLevels.data')"
    :headerIcon="headerIcon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourseLevel.educationalCourseLevelNameAr"
        :title="$t('general.nameAr')"
        :imgName="'EducationalCourseLevels.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourseLevel.educationalCourseLevelNameEn"
        :title="$t('general.nameEn')"
        :imgName="'EducationalCourseLevels.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourseLevel.educationalCourseLevelDescriptionAr"
        :title="$t('general.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourseLevel.educationalCourseLevelDescriptionEn"
        :title="$t('general.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourseLevel.educationalCourseLevelNotes"
        :title="$t('general.notes')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          formateDateTimeLang(
            educationalCourseLevel.openInDate,
            educationalCourseLevel.openInTime
          )
        "
        :title="$t('EducationalCourseLevels.openInDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourseLevel.educationalCourseLevelSortNumber"
        :title="$t('EducationalCourseLevels.sortNumber')"
        :imgName="'number.svg'"
      />

      <CustomCheckbox
        :showAsInfo="true"
        :className="'col-md-6'"
        :value="educationalCourseLevel.openSpecificTimeStatus"
        :title="$t('EducationalCourseLevels.openSpecificTimeStatus')"
      />
    </div>
    <div class="form-actions">
      <div @click.prevent="closeBottomSheet(refName)" class="icon-cancel">
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "../../../../components/general/CustomBottomSheet.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import generalMixin from "./../../../../utils/generalMixin";
import { formateDateTimeLang } from "./../../../../utils/functions";
import DataLabelGroup from "../../../../components/previews/DataLabelGroup.vue";
import CustomCheckbox from "../../../../components/inputs/CustomCheckbox.vue";

export default {
  name: "EducationalCourseLevelInfo",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
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
    DataLabelGroup,
    CustomCheckbox,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),
    educationalCourseLevel() {
      return this.model.educationalCourseLevel;
    },
    refName() {
      return this.model.metaData.components.Info.refName;
    },
    headerIcon() {
      return this.educationalCourseLevel.icon;
    },
  },
  methods: {
    formateDateTimeLang,
    ...mapActions(["hideAppLayer"]),
  },
};
</script>

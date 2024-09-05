<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('EducationalCourses.data')"
    :headerIcon="headerIcon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-12'"
        :value="educationalCourse.fullCode"
        :title="$t('general.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourse.educationalCourseInitialCountLevels"
        :title="$t('EducationalCourses.initialCountLevels')"
        :imgName="'number.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourse.educationalCoursePriceWithCurrency"
        :title="$t('general.priceOrigin')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourse.educationalCoursePriceInOfferWithCurrency"
        :title="$t('general.priceInOffer')"
        :imgName="'money.svg'"
      />
      <CustomCheckbox
        :showAsInfo="true"
        :className="'col-md-6'"
        :value="educationalCourse.educationalCoursePriceOfferStatus"
        :title="$t('general.offerActiveStatus')"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourse.educationalCourseNameAr"
        :title="$t('general.nameAr')"
        :imgName="'EducationalCourses.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourse.educationalCourseNameEn"
        :title="$t('general.nameEn')"
        :imgName="'EducationalCourses.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourse.educationalCourseDescriptionAr"
        :title="$t('general.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourse.educationalCourseDescriptionEn"
        :title="$t('general.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="educationalCourse.educationalCourseNotes"
        :title="$t('general.notes')"
        :imgName="'notes.svg'"
      />

      <template v-if="educationalCourse.educationalCategoryInfoData">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalCourse.educationalCategoryInfoData.fullCode"
          :title="$t('EducationalCategories.code')"
          :imgName="'code.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            educationalCourse.educationalCategoryInfoData
              .educationalCategoryNameCurrent
          "
          :title="$t('EducationalCategories.name')"
          :imgName="'EducationalCategories.svg'"
        />
      </template>
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
import DataLabelGroup from "../../../../components/previews/DataLabelGroup.vue";
import CustomCheckbox from "../../../../components/inputs/CustomCheckbox.vue";

export default {
  name: "EducationalCourseInfo",
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
    educationalCourse() {
      return this.model.educationalCourse;
    },
    refName() {
      return this.model.metaData.components.Info.refName;
    },
    headerIcon() {
      return this.educationalCourse.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
  },
};
</script>

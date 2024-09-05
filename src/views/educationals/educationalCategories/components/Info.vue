<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('EducationalCategories.data')"
    :headerIcon="headerIcon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCategory.educationalCategoryNameAr"
        :title="$t('general.nameAr')"
        :imgName="'EducationalCategories.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCategory.educationalCategoryNameEn"
        :title="$t('general.nameEn')"
        :imgName="'EducationalCategories.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCategory.educationalCategoryDescriptionAr"
        :title="$t('general.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCategory.educationalCategoryDescriptionEn"
        :title="$t('general.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="educationalCategory.educationalCategoryNotes"
        :title="$t('general.notes')"
        :imgName="'notes.svg'"
      />
      <DataLabelGroup
        v-if="educationalCategory.parentEducationalCategoryInfoData"
        :className="'col-md-12'"
        :value="
          educationalCategory.parentEducationalCategoryInfoData
            .educationalCategoryNameCurrent
        "
        :title="$t('EducationalCategories.parent')"
        :imgName="'EducationalCategories.svg'"
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
import DataLabelGroup from "../../../../components/previews/DataLabelGroup.vue";

export default {
  name: "EducationalCategoryInfo",
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
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),
    educationalCategory() {
      return this.model.educationalCategory;
    },
    refName() {
      return this.model.metaData.components.Info.refName;
    },
    headerIcon() {
      return this.educationalCategory.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
  },
};
</script>

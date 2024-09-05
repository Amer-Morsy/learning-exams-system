<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('media')"
    :headerIcon="headerIcon"
  >
    <div class="row" style="height: 100%">
      <ShowMedia :class="'col-md-12'" :media="educationalCourseLevel" />
    </div>
    <!-- <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourseLevel.educationalCourseLevelNameCurrent"
        :title="$t('general.name')"
        :imgName="'EducationalCourseLevels.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourseLevel.educationalCourseLevelNotes"
        :title="$t('general.notes')"
        :imgName="'notes.svg'"
      />
    </div> -->
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
// import DataLabelGroup from "../../../../components/previews/DataLabelGroup.vue";
import ShowMedia from "./ShowMedia.vue";

export default {
  name: "EducationalCourseLevelMedia",
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
    ShowMedia,
    // DataLabelGroup,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),
    educationalCourseLevel() {
      return this.model.educationalCourseLevel;
    },
    refName() {
      return this.model.metaData.components.Media.refName;
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

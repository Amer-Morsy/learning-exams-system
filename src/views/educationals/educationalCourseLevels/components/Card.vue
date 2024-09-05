<template>
  <div class="row custom-cards" v-if="educationalCourseLevelsData.length">
    <CustomCard
      v-for="(educationalCourseLevel, index) in educationalCourseLevelsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="educationalCourseLevel.educationalCourseLevelNameCurrent"
      :description="educationalCourseLevel.fullCode"
      :imagePath="educationalCourseLevel.educationalCourseLevelImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          @click="
            setEducationalCourseLevelData(educationalCourseLevel);
            openBottomSheet(model.metaData.components.Info.refName);
          "
          :title="$t('general.info')"
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li v-if="hasUpdate">
        <button
          @click="
            setEducationalCourseLevelData(educationalCourseLevel);
            openBottomSheet(model.metaData.components.Update.refName);
          "
          :title="$t('general.edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="hasFinalDelete">
        <button
          v-b-modal="`${model.metaData.components.Delete.refName}`"
          :title="$t('general.delete')"
          @click="setEducationalCourseLevelData(educationalCourseLevel)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="hasChangeActivationType">
        <button
          v-b-modal="
            `${model.metaData.components.ChangeActivationType.refName}`
          "
          :title="$t('changeActivationType')"
          @click="setEducationalCourseLevelData(educationalCourseLevel)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li v-if="hasAddUpdateQuestions">
        <router-link
          :to="{
            name: 'EducationalCourseLevelQuestions',
            params: {
              educationalCourseLevelToken:
                educationalCourseLevel.educationalCourseLevelToken,
            },
          }"
          :title="$t('EducationalCourseLevelQuestions.add')"
        >
          <img src="@/assets/images/EducationalCourseLevelQuestions.svg" />
        </router-link>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import {
  isDataExist,
  fullPathFileFromServer,
} from "../../../../utils/functions";
import { mapActions } from "vuex";
import CustomCard from "../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "EducationalCourseLevelCard",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    hasAddUpdateQuestions: {
      type: Boolean,
    },
    model: {
      type: Object,
      default: null,
    },
    updateFullbackAction: {
      type: Function,
    },
    deleteFullbackAction: {
      type: Function,
    },
    changeActivationFullbackAction: {
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
  components: { CustomCard },
  computed: {
    educationalCourseLevelsData() {
      return this.model.educationalCourseLevelsData;
    },
    educationalCourseLevel() {
      return this.model.educationalCourseLevel;
    },
    filterData() {
      return this.model.filterData;
    },
    defaultImg() {
      return this.model.educationalCourseLevel.defaultImg;
    },
    hasUpdate() {
      return this.model.metaData.privileges.update;
    },
    hasFinalDelete() {
      return this.model.metaData.privileges.finalDelete;
    },
    hasChangeActivationType() {
      return this.model.metaData.privileges.changeActivationType;
    },
  },
  methods: {
    ...mapActions([
      "setCurrentLayerComponent",
      "setCurrentProps",
      "setCurrentItemInAction",
      "showAppLayer",
    ]),

    isDataExist,
    fullPathFileFromServer,
    setEducationalCourseLevelData(educationalCourseLevel) {
      this.$emit("setEducationalCourseLevelData", educationalCourseLevel);
    },
  },
};
</script>

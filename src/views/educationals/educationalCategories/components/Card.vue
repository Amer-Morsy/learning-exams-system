<template>
  <div class="row custom-cards" v-if="educationalCategoriesData.length">
    <CustomCard
      v-for="(educationalCategory, index) in educationalCategoriesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="educationalCategory.educationalCategoryNameCurrent"
      :description="educationalCategory.fullCode"
      :imagePath="educationalCategory.educationalCategoryImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li v-if="educationalCategory.isHaveChildrenStatus">
        <router-link
          :to="{
            name: 'EducationalCategories',
            params: {
              parentEducationalCategoryToken:
                educationalCategory.educationalCategoryToken,
            },
          }"
          :title="$t('EducationalCategories.modelName')"
        >
          <img src="@/assets/images/open.svg" />
        </router-link>
      </li>
      <li>
        <button
          @click="setAndOppenInfo(educationalCategory)"
          :title="$t('general.info')"
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li v-if="hasUpdate">
        <button
          @click="
            setEducationalCategoryData(educationalCategory);
            openBottomSheet(model.metaData.components.Update.refName);
          "
          :title="$t('general.edit')"
        >
          <!-- @click="setAndOppenUpdate(educationalCategory)" -->
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="hasFinalDelete">
        <button
          v-b-modal="`${model.metaData.components.Delete.refName}`"
          :title="$t('general.delete')"
          @click="setEducationalCategoryData(educationalCategory)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="hasChangeActivationType">
        <button
          :title="$t('changeActivationType')"
          @click="setAndOppenChangeActivationType(educationalCategory)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li v-if="!educationalCategory.isHaveChildrenStatus">
        <router-link
          :to="{
            name: 'EducationalCourses',
            params: {
              parentEducationalCategoryToken:
                educationalCategory.parentEducationalCategoryToken || ' ',
              educationalCategoryToken:
                educationalCategory.educationalCategoryToken,
            },
          }"
          target="_blank"
          :title="$t('EducationalCourses.modelName')"
        >
          <img src="@/assets/images/EducationalCourses.svg" />
        </router-link>
      </li>
      <li
        v-if="
          !isTeacherLogged &&
          hasViewEducationalTeachers &&
          !educationalCategory.isHaveChildrenStatus
        "
      >
        <router-link
          :to="{
            name: 'EducationalTeachers',
            params: {
              parentEducationalCategoryToken:
                educationalCategory.parentEducationalCategoryToken || ' ',
              educationalCategoryToken:
                educationalCategory.educationalCategoryToken,
            },
          }"
          target="_blank"
          :title="$t('Teachers.modelName')"
        >
          <img src="@/assets/images/EducationalTeachers.svg" />
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
import { mapActions, mapGetters } from "vuex";
import CustomCard from "../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "EducationalCategoryCard",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
    hasViewEducationalTeachers: {
      type: Boolean,
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
    ...mapGetters(["isTeacherLogged"]),

    educationalCategoriesData() {
      return this.model.educationalCategoriesData;
    },
    educationalCategory() {
      return this.model.educationalCategory;
    },
    filterData() {
      return this.model.filterData;
    },
    defaultImg() {
      return this.model.educationalCategory.defaultImg;
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

    async setAndOppenInfo(item) {
      await this.educationalCategory.fillData(item);
      this.setCurrentLayerComponent(this.model.metaData.components.Info.link);
      this.setCurrentProps({
        model: this.model,
      });
      this.openBottomSheet(this.model.metaData.components.Info.refName);
    },
    async setAndOppenUpdate(item) {
      await this.educationalCategory.fillData(item);
      this.setCurrentLayerComponent(this.model.metaData.components.Update.link);
      this.setCurrentProps({
        model: this.model,
        fullbackAction: this.updateFullbackAction,
      });
      this.openBottomSheet(this.model.metaData.components.Update.refName);
    },
    async setAndOppenDelete(item) {
      await this.educationalCategory.fillData(item);
      this.setCurrentLayerComponent(this.model.metaData.components.Delete.link);
      this.setCurrentProps({
        model: this.model,
        fullbackAction: this.deleteFullbackAction,
      });
      this.$bvModal.show(this.model.metaData.components.Delete.refName);
    },
    async setAndOppenChangeActivationType(item) {
      await this.educationalCategory.fillData(item);
      this.setCurrentLayerComponent(
        this.model.metaData.components.ChangeActivationType.link
      );
      this.setCurrentProps({
        model: this.model,
        fullbackAction: this.changeActivationFullbackAction,
      });
      this.$bvModal.show(
        this.model.metaData.components.ChangeActivationType.refName
      );
    },
    setEducationalCategoryData(educationalCategory) {
      this.$emit("setEducationalCategoryData", educationalCategory);
    },
  },
};
</script>

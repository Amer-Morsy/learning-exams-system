<template>
  <div class="table-container" v-if="educationalCategoriesData.length">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("EducationalCategories.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(educationalCategory, index) in educationalCategoriesData"
          :key="index"
        >
          <td>
            {{ ++index + filterData.currentIndex }}
          </td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  educationalCategory.educationalCategoryImagePath,
                  educationalCategory.defaultImg
                )
              "
              :onerror="`this.src='${educationalCategory.defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(educationalCategory.fullCode) }}</td>
          <td>
            {{
              isDataExist(educationalCategory.educationalCategoryNameCurrent)
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
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
                        educationalCategory.parentEducationalCategoryToken ||
                        ' ',
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
                        educationalCategory.parentEducationalCategoryToken ||
                        ' ',
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
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  isDataExist,
  fullPathFileFromServer,
} from "../../../../utils/functions";
import { mapActions, mapGetters } from "vuex";
import FloatingMenu from "../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "EducationalCategoryTable",
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
  components: { FloatingMenu },
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

<style lang="scss"></style>

<template>
  <div class="table-container" v-if="educationalCoursesData.length">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="7">{{ $t("EducationalCourses.data") }}</th>
          <th colspan="2">{{ $t("EducationalCategories.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("EducationalCourses.countLevels") }}</th>
          <th>{{ $t("EducationalCourses.countSubscribed") }}</th>
          <th>{{ $t("price") }}</th>
          <th>{{ $t("general.state") }}</th>

          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(educationalCourse, index) in educationalCoursesData"
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
                  educationalCourse.educationalCourseImagePath,
                  educationalCourse.defaultImg
                )
              "
              :onerror="`this.src='${educationalCourse.defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(educationalCourse.fullCode) }}</td>
          <td>
            {{ isDataExist(educationalCourse.educationalCourseNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(educationalCourse.countLevels) }}
          </td>
          <td>
            {{ isDataExist(educationalCourse.countSubscribedInCourse) }}
          </td>
          <td v-if="educationalCourse.educationalCoursePriceOfferStatus">
            <span>
              {{
                isDataExist(
                  educationalCourse.educationalCoursePriceInOfferWithCurrency
                )
              }}</span
            ><br />
            <span style="text-decoration: line-through 2px red;">
              {{
                isDataExist(
                  educationalCourse.educationalCoursePriceWithCurrency
                )
              }}</span
            >
          </td>
          <td v-else>
            <span>
              {{
                isDataExist(
                  educationalCourse.educationalCoursePriceWithCurrency
                )
              }}</span
            >
          </td>
          <td>
            <span>
              {{
                isDataExist(
                  educationalCourse.educationalCoursePeriodStatusTypeNameCurrent
                )
              }}</span
            >
          </td>
          <td>
            {{
              isDataExist(
                educationalCourse.educationalCategoryInfoData
                  ? educationalCourse.educationalCategoryInfoData.fullCode
                  : ""
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalCourse.educationalCategoryInfoData
                  ? educationalCourse.educationalCategoryInfoData
                      .educationalCategoryNameCurrent
                  : ""
              )
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="educationalCourse.isHaveChildrenStatus">
                <router-link
                  :to="{
                    name: 'EducationalCourses',
                    params: {
                      parentEducationalCourseToken:
                        educationalCourse.educationalCourseToken,
                    },
                  }"
                  :title="$t('EducationalCourses.modelName')"
                >
                  <img src="@/assets/images/open.svg" />
                </router-link>
              </li>
              <li>
                <button
                  @click="
                    setEducationalCourseData(educationalCourse);
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
                    setEducationalCourseData(educationalCourse);
                    openBottomSheet(model.metaData.components.Update.refName);
                  "
                  :title="$t('general.edit')"
                >
                  <!-- @click="setAndOppenUpdate(educationalCourse)" -->
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="hasFinalDelete">
                <button
                  v-b-modal="`${model.metaData.components.Delete.refName}`"
                  :title="$t('general.delete')"
                  @click="setEducationalCourseData(educationalCourse)"
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
                  @click="setEducationalCourseData(educationalCourse)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li v-if="hasChangeSort">
                <button
                  @click="
                    setEducationalCourseLevelData(
                      educationalCourse.educationalCourseToken
                    );
                    openBottomSheet(
                      modelLevels.metaData.components.ReSort.refName
                    );
                  "
                  :title="$t('general.sort')"
                >
                  <img src="@/assets/images/sort.svg" />
                </button>
              </li>
              <li
                v-if="
                  hasStart &&
                    educationalCourse.educationalCoursePeriodStatusTypeToken ==
                      EDUCATIONAL_COURSE_PERIOD_STATUS_TYPE.Closed
                "
              >
                <button
                  v-b-modal="
                    `${model.metaData.components.ChangeStartEnd.refName}`
                  "
                  :title="$t('general.open')"
                  @click="setEducationalCourseData(educationalCourse)"
                >
                  <img src="@/assets/images/start.svg" />
                </button>
              </li>

              <li
                v-if="
                  hasEnd &&
                    educationalCourse.educationalCoursePeriodStatusTypeToken ==
                      EDUCATIONAL_COURSE_PERIOD_STATUS_TYPE.Open
                "
              >
                <button
                  v-b-modal="
                    `${model.metaData.components.ChangeStartEnd.refName}`
                  "
                  :title="$t('general.close')"
                  @click="setEducationalCourseData(educationalCourse)"
                >
                  <img src="@/assets/images/stop.svg" />
                </button>
              </li>
              <li v-if="hasViewLevels">
                <router-link
                  :to="{
                    name: 'EducationalCourseLevels',
                    params: {
                      educationalCourseToken:
                        educationalCourse.educationalCourseToken,
                    },
                  }"
                  :title="$t('EducationalCourseLevels.modelName')"
                >
                  <img src="@/assets/images/EducationalCourseLevels.svg" />
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
import { mapActions } from "vuex";
import FloatingMenu from "../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { EDUCATIONAL_COURSE_PERIOD_STATUS_TYPE } from "./../../../../utils/constantLists";

export default {
  name: "EducationalCourseTable",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
    modelLevels: {
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
    return {
      EDUCATIONAL_COURSE_PERIOD_STATUS_TYPE,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: { FloatingMenu },
  computed: {
    educationalCoursesData() {
      return this.model.educationalCoursesData;
    },
    educationalCourse() {
      return this.model.educationalCourse;
    },
    filterData() {
      return this.model.filterData;
    },
    defaultImg() {
      return this.model.educationalCourse.defaultImg;
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
    hasChangeSort() {
      return this.model.metaData.privileges.changeSort;
    },
    hasStart() {
      return this.model.metaData.privileges.startEducationalCoursePeriod;
    },
    hasEnd() {
      return this.model.metaData.privileges.endEducationalCoursePeriod;
    },
    hasViewLevels() {
      return this.modelLevels.metaData.privileges.view;
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

    setEducationalCourseData(educationalCourse) {
      this.$emit("setEducationalCourseData", educationalCourse);
    },
    setEducationalCourseLevelData(educationalCourseToken) {
      this.$emit("setEducationalCourseLevelData", educationalCourseToken);
    },
  },
};
</script>

<style lang="scss"></style>

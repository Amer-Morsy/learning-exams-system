<template>
  <div class="table-container" v-if="educationalCourseLevelsData.length">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("EducationalCourseLevels.data") }}</th>
          <th colspan="2">
            {{ $t("EducationalCourseLevels.openSpecificTimeStatus") }}
          </th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("media") }}</th>
          <!-- <th>{{ $t("EducationalCourseLevels.sortNumber") }}</th> -->
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th class="cell-lg">
            {{ $t("EducationalCourseLevels.questionsCount") }}
          </th>

          <th>{{ $t("general.state") }}</th>
          <th class="cell-lg">
            {{ $t("EducationalCourseLevels.openInDateTime") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(educationalCourseLevel, index) in educationalCourseLevelsData"
          :key="index"
        >
          <td>
            {{ ++index + filterData.currentIndex }}
          </td>
          <td>
            <button
              @click="
                setEducationalCourseLevelData(educationalCourseLevel);
                openBottomSheet(model.metaData.components.Media.refName);
              "
              :title="$t('media')"
            >
              <img
                v-if="
                  educationalCourseLevel.educationalCourseLevelFileTypeToken ==
                    MEDIA_TYPE_TOKENS.image
                "
                src="@/assets/images/image.svg"
              />
              <img
                v-else-if="
                  educationalCourseLevel.educationalCourseLevelFileTypeToken ==
                    MEDIA_TYPE_TOKENS.video
                "
                src="@/assets/images/video.svg"
              />
              <img
                v-else-if="
                  educationalCourseLevel.educationalCourseLevelFileTypeToken ==
                    MEDIA_TYPE_TOKENS.audio
                "
                src="@/assets/images/audio.svg"
              />
              <img
                v-else-if="
                  educationalCourseLevel.educationalCourseLevelFileTypeToken ==
                    MEDIA_TYPE_TOKENS.pdf
                "
                src="@/assets/images/pdf.svg"
              />
              <img
                v-else-if="
                  educationalCourseLevel.educationalCourseLevelFileTypeToken ==
                    MEDIA_TYPE_TOKENS.excel
                "
                src="@/assets/images/excel.svg"
              />
              <img
                v-else-if="
                  educationalCourseLevel.educationalCourseLevelFileTypeToken ==
                    MEDIA_TYPE_TOKENS.word
                "
                src="@/assets/images/word.svg"
              />
              <img
                v-else-if="
                  educationalCourseLevel.educationalCourseLevelFileTypeToken ==
                    MEDIA_TYPE_TOKENS.powerPoint
                "
                src="@/assets/images/powerpoint.svg"
              />
              <img v-else src="@/assets/images/media.svg" />
            </button>
            <!-- <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  educationalCourseLevel.educationalCourseLevelImagePath,
                  educationalCourseLevel.defaultImg
                )
              "
              :onerror="`this.src='${educationalCourseLevel.defaultImg}'`"
            /> -->
          </td>
          <!-- <td>
            {{
              isDataExist(
                educationalCourseLevel.educationalCourseLevelSortNumber
              )
            }}
          </td> -->
          <td>
            {{
              isDataExist(
                educationalCourseLevel.educationalCourseLevelNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalCourseLevel.levelQuestionStatistics
                  .totalCountQuestions
              )
            }}
          </td>
          <td>
            <CustomCheckbox
              :showAsInfo="true"
              :withoutTitle="true"
              :centerStatus="true"
              :value="educationalCourseLevel.openSpecificTimeStatus"
              class="mt-3"
            />
          </td>
          <td>
            <template v-if="educationalCourseLevel.openSpecificTimeStatus">
              {{
                formateDateTimeLang(
                  educationalCourseLevel.openInDate,
                  educationalCourseLevel.openInTime
                )
              }}
            </template>
            <template v-else> - </template>
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
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
                  <img
                    src="@/assets/images/EducationalCourseLevelQuestions.svg"
                  />
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
  formateDateTimeLang,
} from "../../../../utils/functions";
import { MEDIA_TYPE_TOKENS } from "./../../../../utils/constants";
import { mapActions } from "vuex";
import FloatingMenu from "../../../../components/general/FloatingMenu.vue";
import CustomCheckbox from "../../../../components/inputs/CustomCheckbox.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "EducationalCourseLevelTable",
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
    return {
      MEDIA_TYPE_TOKENS,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    FloatingMenu,
    CustomCheckbox,
  },
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
    formateDateTimeLang,
    setEducationalCourseLevelData(educationalCourseLevel) {
      this.$emit("setEducationalCourseLevelData", educationalCourseLevel);
    },
  },
};
</script>

<style lang="scss"></style>

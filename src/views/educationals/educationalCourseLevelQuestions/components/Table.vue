<template>
  <div
    class="table-container"
    v-if="educationalCourseLevelQuestionsData.length"
  >
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="6">{{ $t("Questions.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("media") }}</th>
          <th>{{ $t("general.degree") }}</th>
          <th class="cell-lg">{{ $t("general.title") }}</th>
          <th class="cell-lg">{{ $t("questionsTypes.name") }}</th>
          <th class="cell-lg">{{ $t("QuestionBanks.name") }}</th>
          <th class="cell-lg">{{ $t("QuestionParagraphs.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(educationalCourseLevelQuestion,
          index) in educationalCourseLevelQuestionsData"
          :key="index"
        >
          <td>
            {{ ++index + filterData.currentIndex }}
          </td>
          <td>
            <button
              @click="
                setQuestionData(educationalCourseLevelQuestion.questionData);
                openBottomSheet('QuestionMedia');
              "
              :title="$t('media')"
            >
              <img
                v-if="
                  educationalCourseLevelQuestion.questionData
                    .questionMediaTypeToken == MEDIA_TYPE_TOKENS.image
                "
                src="@/assets/images/image.svg"
              />
              <img
                v-else-if="
                  educationalCourseLevelQuestion.questionData
                    .questionMediaTypeToken == MEDIA_TYPE_TOKENS.video
                "
                src="@/assets/images/video.svg"
              />
              <img
                v-else-if="
                  educationalCourseLevelQuestion.questionData
                    .questionMediaTypeToken == MEDIA_TYPE_TOKENS.audio
                "
                src="@/assets/images/audio.svg"
              />
              <img
                v-else-if="
                  educationalCourseLevelQuestion.questionData
                    .questionMediaTypeToken == MEDIA_TYPE_TOKENS.pdf
                "
                src="@/assets/images/pdf.svg"
              />
              <img
                v-else-if="
                  educationalCourseLevelQuestion.questionData
                    .questionMediaTypeToken == MEDIA_TYPE_TOKENS.excel
                "
                src="@/assets/images/excel.svg"
              />
              <img
                v-else-if="
                  educationalCourseLevelQuestion.questionData
                    .questionMediaTypeToken == MEDIA_TYPE_TOKENS.word
                "
                src="@/assets/images/word.svg"
              />
              <img
                v-else-if="
                  educationalCourseLevelQuestion.questionData
                    .questionMediaTypeToken == MEDIA_TYPE_TOKENS.powerPoint
                "
                src="@/assets/images/powerpoint.svg"
              />
              <img v-else src="@/assets/images/media.svg" />
            </button>
          </td>
          <td>
            {{ isDataExist(educationalCourseLevelQuestion.questionDegree) }}
          </td>
          <td>
            {{
              isDataExist(
                educationalCourseLevelQuestion.questionData.questionTitle
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalCourseLevelQuestion.questionData
                  .questionTypeNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalCourseLevelQuestion.questionData.questionBankInfoData
                  .questionBankNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalCourseLevelQuestion.questionData
                  .questionParagraphDataDB
                  ? educationalCourseLevelQuestion.questionData
                      .questionParagraphDataDB.questionParagraphTitle
                  : ""
              )
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setEducationalCourseLevelQuestionData(
                      educationalCourseLevelQuestion
                    );
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
                    setEducationalCourseLevelQuestionData(
                      educationalCourseLevelQuestion
                    );
                    openBottomSheet(model.metaData.components.Update.refName);
                  "
                  :title="$t('general.edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
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
import { MEDIA_TYPE_TOKENS } from "./../../../../utils/constants";
export default {
  name: "EducationalCourseLevelQuestionTable",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
    updateFullbackAction: {
      type: Function,
    },
  },
  data() {
    return { MEDIA_TYPE_TOKENS };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    FloatingMenu,
  },
  computed: {
    educationalCourseLevelQuestionsData() {
      return this.model.educationalCourseLevelQuestionsData;
    },
    educationalCourseLevelQuestion() {
      return this.model.educationalCourseLevelQuestion;
    },
    filterData() {
      return this.model.filterData;
    },
    defaultImg() {
      return this.model.educationalCourseLevelQuestion.defaultImg;
    },
    hasUpdate() {
      return this.model.metaData.privileges.update;
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

    setEducationalCourseLevelQuestionData(educationalCourseLevelQuestion) {
      this.$emit(
        "setEducationalCourseLevelQuestionData",
        educationalCourseLevelQuestion
      );
    },
    setQuestionData(question) {
      this.$emit("setQuestionData", question);
    },
  },
};
</script>

<style lang="scss"></style>

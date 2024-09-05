<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('EducationalCourseLevelQuestions.data')"
    :headerIcon="headerIcon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="educationalCourseLevelQuestion.questionDegree"
        :title="$t('general.degree')"
        :imgName="'number.svg'"
      />

      <template v-if="educationalCourseLevelQuestion.questionData">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalCourseLevelQuestion.questionData.questionTitle"
          :title="$t('general.title')"
          :imgName="'EducationalCourseLevelQuestions.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            educationalCourseLevelQuestion.questionData.questionTypeNameCurrent
          "
          :title="$t('questionsTypes.name')"
          :imgName="'type.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            educationalCourseLevelQuestion.questionData.questionBankInfoData
              .questionBankNameCurrent
          "
          :title="$t('QuestionBanks.name')"
          :imgName="'questionBank.svg'"
        />
        <DataLabelGroup
          :className="'col-md-12'"
          :value="
            educationalCourseLevelQuestion.questionData.questionParagraphDataDB
              ? educationalCourseLevelQuestion.questionData
                  .questionParagraphDataDB.questionParagraphTitle
              : ''
          "
          :title="$t('QuestionParagraphs.name')"
          :imgName="'questionParagraph.svg'"
        />
        <template
          v-if="
            educationalCourseLevelQuestion.questionData.questionTypeToken ==
              QUESTION_TYPE.TrueFalse
          "
        >
          <CustomCheckbox
            :className="'col-md-12 centering mt-3'"
            :value="
              educationalCourseLevelQuestion.questionData.trueFalseQuestionData
                .questionAnswer
            "
            :showAsInfo="true"
            :title="$t('Questions.rightAnswer')"
          />
        </template>
        <template
          v-if="
            educationalCourseLevelQuestion.questionData.questionTypeToken ==
              QUESTION_TYPE.Chose
          "
        >
          <div class="my-card row">
            <span class="my-card-title">
              {{ $t("Questions.answers") }}
            </span>

            <div class="table-container">
              <table class="my-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>
                      {{ $t("Questions.answerText") }}
                    </th>
                    <th>
                      {{ $t("Questions.rightAnswer") }}
                    </th>
                    <th>
                      {{ $t("general.image") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-if="
                      educationalCourseLevelQuestion.questionData
                        .mCQQuestionData.questionMCQAnswerData.length == 0
                    "
                  >
                    <tr>
                      <th colspan="4">
                        {{ $t("Questions.noAnswers") }}
                      </th>
                    </tr>
                  </template>
                  <template v-else>
                    <tr
                      v-for="(item,
                      indexAnswer) in educationalCourseLevelQuestion
                        .questionData.mCQQuestionData.questionMCQAnswerData"
                      :key="indexAnswer"
                    >
                      <td>{{ indexAnswer + 1 }}</td>
                      <td>
                        <CustomInput
                          :id="`table-info-${indexAnswer}-answerText`"
                          :value="item.answerText"
                          :withOutDesign="true"
                          :isDisabled="true"
                        />
                      </td>
                      <td>
                        <CustomCheckbox
                          :id="`table-info-${indexAnswer}-answerIsTrue`"
                          :value="item.answerIsTrue"
                          :showAsInfo="true"
                          :centerStatus="true"
                          :withOutTitle="true"
                        />
                      </td>
                      <td>
                        <img
                          v-if="
                            indexAnswer == 0 &&
                              educationalCourseLevelQuestion.questionData
                                .questionAnswerA_MediaPath
                          "
                          class="item-img-table"
                          :src="
                            fullPathFileFromServer(
                              educationalCourseLevelQuestion.questionData
                                .questionAnswerA_MediaPath,
                              educationalCourseLevelQuestion.defaultImg
                            )
                          "
                          :onerror="
                            `this.src='${educationalCourseLevelQuestion.defaultImg}'`
                          "
                        />
                        <img
                          v-else-if="
                            indexAnswer == 1 &&
                              educationalCourseLevelQuestion.questionData
                                .questionAnswerB_MediaPath
                          "
                          class="item-img-table"
                          :src="
                            fullPathFileFromServer(
                              educationalCourseLevelQuestion.questionData
                                .questionAnswerB_MediaPath,
                              educationalCourseLevelQuestion.defaultImg
                            )
                          "
                          :onerror="
                            `this.src='${educationalCourseLevelQuestion.defaultImg}'`
                          "
                        />
                        <img
                          v-else-if="
                            indexAnswer == 2 &&
                              educationalCourseLevelQuestion.questionData
                                .questionAnswerC_MediaPath
                          "
                          class="item-img-table"
                          :src="
                            fullPathFileFromServer(
                              educationalCourseLevelQuestion.questionData
                                .questionAnswerC_MediaPath,
                              educationalCourseLevelQuestion.defaultImg
                            )
                          "
                          :onerror="
                            `this.src='${educationalCourseLevelQuestion.defaultImg}'`
                          "
                        />
                        <img
                          v-else-if="
                            indexAnswer == 3 &&
                              educationalCourseLevelQuestion.questionData
                                .questionAnswerD_MediaPath
                          "
                          class="item-img-table"
                          :src="
                            fullPathFileFromServer(
                              educationalCourseLevelQuestion.questionData
                                .questionAnswerD_MediaPath,
                              educationalCourseLevelQuestion.defaultImg
                            )
                          "
                          :onerror="
                            `this.src='${educationalCourseLevelQuestion.defaultImg}'`
                          "
                        />
                        <span v-else>--</span>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </template>
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
import {
  formateDateTimeLang,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import { QUESTION_TYPE } from "./../../../../utils/constantLists";
import DataLabelGroup from "../../../../components/previews/DataLabelGroup.vue";
import CustomCheckbox from "../../../../components/inputs/CustomCheckbox.vue";
import CustomInput from "../../../../components/inputs/CustomInput.vue";

export default {
  name: "EducationalCourseLevelQuestionInfo",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      QUESTION_TYPE,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomBottomSheet,
    DataLabelGroup,
    CustomCheckbox,
    CustomInput,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),
    educationalCourseLevelQuestion() {
      return this.model.educationalCourseLevelQuestion;
    },
    refName() {
      return this.model.metaData.components.Info.refName;
    },
    headerIcon() {
      return this.educationalCourseLevelQuestion.icon;
    },
  },
  methods: {
    formateDateTimeLang,
    fullPathFileFromServer,
    ...mapActions(["hideAppLayer"]),
  },
};
</script>

<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('Questions.data')"
    :headerIcon="headerIcon"
  >
    <div class="row">
      <div
        class="col-md-12"
        v-if="question.questionDescription_MediaPath"
        style="display: flex; justify-content: center;"
      >
        <img
          style="max-width: 200px;max-height: 200px;"
          class=""
          :src="
            fullPathFileFromServer(
              question.questionDescription_MediaPath,
              question.defaultImg
            )
          "
          :onerror="`this.src='${question.defaultImg}'`"
          :title="$t('Questions.answerDescriptionImg')"
        />
      </div>
      <DataLabelGroup
        :className="'col-md-6'"
        :value="question.questionTitle"
        :title="$t('Questions.title')"
        :imgName="'question.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="question.questionDescription_HTML"
        :title="$t('general.description')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          question.questionBankInfoData
            ? question.questionBankInfoData.questionBankNameCurrent
            : ''
        "
        :title="$t('QuestionBanks.name')"
        :imgName="'questionBank.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          question.questionParagraphInfoData
            ? question.questionParagraphInfoData.questionParagraphTitle
            : ''
        "
        :title="$t('QuestionParagraphs.name')"
        :imgName="'questionParagraph.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="question.questionAnswerDescription_HTML"
        :title="$t('Questions.answerDescription')"
        :imgName="'description.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="question.questionTypeNameCurrent"
        :title="$t('questionsTypes.name')"
        :imgName="'type.svg'"
      />

      <template v-if="question.questionTypeToken == QUESTION_TYPE.TrueFalse">
        <CustomCheckbox
          :className="'col-md-12 centering mt-3'"
          :value="question.trueFalseQuestionData.questionAnswer"
          :showAsInfo="true"
          :title="$t('Questions.rightAnswer')"
        />
      </template>
      <template v-if="question.questionTypeToken == QUESTION_TYPE.Chose">
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
                    question.mCQQuestionData.questionMCQAnswerData.length == 0
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
                    v-for="(item, indexAnswer) in question.mCQQuestionData
                      .questionMCQAnswerData"
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
                        v-if="indexAnswer == 0"
                        class="item-img-table"
                        :src="
                          fullPathFileFromServer(
                            question.questionAnswerA_MediaPath,
                            question.defaultImg
                          )
                        "
                        :onerror="`this.src='${question.defaultImg}'`"
                      />
                      <img
                        v-if="indexAnswer == 1"
                        class="item-img-table"
                        :src="
                          fullPathFileFromServer(
                            question.questionAnswerB_MediaPath,
                            question.defaultImg
                          )
                        "
                        :onerror="`this.src='${question.defaultImg}'`"
                      />
                      <img
                        v-if="indexAnswer == 2"
                        class="item-img-table"
                        :src="
                          fullPathFileFromServer(
                            question.questionAnswerC_MediaPath,
                            question.defaultImg
                          )
                        "
                        :onerror="`this.src='${question.defaultImg}'`"
                      />
                      <img
                        v-if="indexAnswer == 3"
                        class="item-img-table"
                        :src="
                          fullPathFileFromServer(
                            question.questionAnswerD_MediaPath,
                            question.defaultImg
                          )
                        "
                        :onerror="`this.src='${question.defaultImg}'`"
                      />
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
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
import CustomBottomSheet from "../../../../../components/general/CustomBottomSheet.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import generalMixin from "./../../../../../utils/generalMixin";
import { QUESTION_TYPE } from "./../../../../../utils/constantLists";
import { fullPathFileFromServer } from "../../../../../utils/functions";
import DataLabelGroup from "../../../../../components/previews/DataLabelGroup.vue";
import CustomCheckbox from "../../../../../components/inputs/CustomCheckbox.vue";
import CustomInput from "../../../../../components/inputs/CustomInput.vue";

export default {
  name: "QuestionInfo",
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
    question() {
      return this.model.question;
    },
    refName() {
      return this.model.metaData.components.Info.refName;
    },
    headerIcon() {
      return this.question.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    fullPathFileFromServer,
  },
};
</script>

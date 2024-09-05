<template>
  <div class="">
    <form class="" autocomplete="off">
      <!-- main selector -->
      <template v-if="isAdd">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-11'"
            :id="`${id}-mainQuestionBankTitleToken`"
            :value="questionModel.mainQuestionBankTitleToken"
            :options="questionBankTitleTokenOptions"
            v-on:changeValue="
              questionModel.mainQuestionBankTitleToken = $event;
              questionModel.mainQuestionBankToken = '';
              questionModel.mainQuestionParagraphToken = '';
              mainQuestionBankTitleTokenChanged($event);
              getQuestionBanksDialog();
              getQuestionParagraphsDialog();
            "
            :title="$t('QuestionBankTitles.select')"
            :imgName="'questionBankTitle.svg'"
          />
          <template v-if="questionModel.mainQuestionBankTitleToken">
            <CustomSelectBox
              :className="'col-md-5'"
              :id="`${id}-mainQuestionParagraphToken`"
              :value="questionModel.mainQuestionParagraphToken"
              :options="questionParagraphTokenOptions"
              v-on:changeValue="
                questionModel.mainQuestionParagraphToken = $event;
                mainQuestionParagraphTokenChanged($event);
              "
              :title="$t('QuestionParagraphs.select')"
              :imgName="'questionParagraph.svg'"
            />
            <CustomSelectBox
              :className="'col-md-5'"
              :id="`${id}-mainQuestionBankToken`"
              :value="questionModel.mainQuestionBankToken"
              :options="questionBankTokenOptions"
              v-on:changeValue="
                questionModel.mainQuestionBankToken = $event;
                mainQuestionBankTokenChanged($event);
              "
              :title="$t('QuestionBanks.select')"
              :imgName="'questionBank.svg'"
            />
          </template>
        </div>
      </template>

      <!-- add -->
      <template>
        <div
          class="my-card"
          v-for="(question, indexQuestion) in questionsList"
          :key="indexQuestion"
        >
          <span class="my-card-title">{{ indexQuestion + 1 }}</span>

          <span v-if="questionsList.length > 1" class="remove-slice-container">
            <button
              @click="removeQuestionSlice(indexQuestion)"
              type="button"
              class="btn btn-remove-slice"
            >
              ×
            </button>
          </span>
          <div class="row">
            <CustomFileInput
              :className="'col-12'"
              @changeValue="question.mediaFile = $event.file"
              :defaultImg="
                fullPathFileFromServer(
                  question.questionMediaPath,
                  question.defaultImg
                )
              "
              :deleteFileStatus="deleteFileStatus"
              @deleteFile="$emit('deleteFile')"
            />
          </div>
          <div class="row">
            <TextArea
              :className="'col-md-12'"
              :id="`${id}-${indexQuestion}-questionTitle`"
              :value="question.questionTitle"
              v-on:changeValue="question.questionTitle = $event"
              :title="$t('Questions.title')"
              :imgName="'question.svg'"
            />

            <!-- <TextArea
              :className="'col-md-6'"
              :id="`${id}-${indexQuestion}-questionDescription_HTML`"
              :value="question.questionDescription_HTML"
              v-on:changeValue="question.questionDescription_HTML = $event"
              :title="$t('general.description')"
              :imgName="'description.svg'"
            /> -->

            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-${indexQuestion}-questionParagraphToken`"
              :value="question.questionParagraphToken"
              :options="questionParagraphTokenOptions"
              v-on:changeValue="question.questionParagraphToken = $event"
              :title="$t('QuestionParagraphs.select')"
              :imgName="'questionParagraph.svg'"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-${indexQuestion}-questionBankToken`"
              :value="question.questionBankToken"
              :options="questionBankTokenOptions"
              v-on:changeValue="question.questionBankToken = $event"
              :title="$t('QuestionBanks.select')"
              :imgName="'questionBank.svg'"
            />
            <TextArea
              :className="'col-md-6'"
              :id="`${id}-${indexQuestion}-questionAnswerDescription_HTML`"
              :value="question.questionAnswerDescription_HTML"
              v-on:changeValue="
                question.questionAnswerDescription_HTML = $event
              "
              :title="$t('Questions.answerDescription')"
              :imgName="'description.svg'"
              :rows="7"
            />
            <CustomFileInput
              :className="'col-md-6'"
              @changeValue="question.questionDescription_Media = $event.file"
              :defaultImg="
                fullPathFileFromServer(
                  question.questionDescription_MediaPath,
                  question.defaultImg
                )
              "
              :title="$t('Questions.answerDescriptionImg')"
            />
            <CustomSelectBox
              :className="'col-md-12'"
              :id="`${id}-${indexQuestion}-questionTypeToken`"
              :value="question.questionTypeToken"
              :options="questionTypeTokensOptions"
              v-on:changeValue="question.questionTypeToken = $event"
              :title="$t('questionsTypes.select')"
              :imgName="'type.svg'"
            />

            <template
              v-if="question.questionTypeToken == QUESTION_TYPE.TrueFalse"
            >
              <CustomCheckbox
                :className="'col-md-12 centering mt-3'"
                :value="question.trueFalseQuestionData.questionAnswer"
                v-on:changeValue="
                  question.trueFalseQuestionData.questionAnswer = $event
                "
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
                        <th>{{ $t("general.delete") }}</th>
                        <th class="cell-lg">
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
                          question.mCQQuestionData.questionMCQAnswerData
                            .length == 0
                        "
                      >
                        <tr>
                          <th colspan="3">
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
                            <button
                              :title="$t('general.delete')"
                              @click.prevent="
                                removeSliceAnswer(indexQuestion, indexAnswer)
                              "
                            >
                              <img src="@/assets/images/trash.svg" />
                            </button>
                          </td>
                          <td>
                            <TextArea
                              :id="`${id}-table-${indexAnswer}-answerText`"
                              :value="item.answerText"
                              v-on:changeValue="item.answerText = $event"
                              :withOutDesign="true"
                            />
                          </td>
                          <td>
                            <CustomCheckbox
                              :id="`${id}-table-${indexAnswer}-answerIsTrue`"
                              :value="item.answerIsTrue"
                              v-on:changeValue="
                                item.answerIsTrue = $event;
                                unchekExept(indexQuestion, indexAnswer);
                              "
                              :centerStatus="true"
                              :withOutTitle="true"
                            />
                          </td>
                          <td>
                            <CustomFileInput
                              v-if="indexAnswer == 0"
                              :className="'col-12'"
                              @changeValue="
                                question.questionAnswerA_Media = $event.file
                              "
                              :defaultImg="
                                fullPathFileFromServer(
                                  question.questionAnswerA_MediaPath,
                                  question.defaultImg
                                )
                              "
                            />
                            <CustomFileInput
                              v-if="indexAnswer == 1"
                              :className="'col-12'"
                              @changeValue="
                                question.questionAnswerB_Media = $event.file
                              "
                              :defaultImg="
                                fullPathFileFromServer(
                                  question.questionAnswerB_MediaPath,
                                  question.defaultImg
                                )
                              "
                            />
                            <CustomFileInput
                              v-if="indexAnswer == 2"
                              :className="'col-12'"
                              @changeValue="
                                question.questionAnswerC_Media = $event.file
                              "
                              :defaultImg="
                                fullPathFileFromServer(
                                  question.questionAnswerC_MediaPath,
                                  question.defaultImg
                                )
                              "
                            />
                            <CustomFileInput
                              v-if="indexAnswer == 3"
                              :className="'col-12'"
                              @changeValue="
                                question.questionAnswerD_Media = $event.file
                              "
                              :defaultImg="
                                fullPathFileFromServer(
                                  question.questionAnswerD_MediaPath,
                                  question.defaultImg
                                )
                              "
                              class=""
                            />
                            <span v-else>--</span>
                          </td>
                        </tr>
                      </template>
                      <template
                        v-if="
                          question.mCQQuestionData.questionMCQAnswerData
                            .length <= 3
                        "
                      >
                        <tr>
                          <th colspan="7">
                            <button
                              class="btn btn-primary btn-block"
                              @click.prevent="addSliceAnswer(indexQuestion)"
                            >
                              {{ $t("general.add") }}
                            </button>
                          </th>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div v-if="!isUpdate" class="add-slice-container">
          <button
            @click="addQuestionSlice()"
            type="button"
            class="btn btn-add-slice"
            :title="$t('addSlice')"
          >
            +
          </button>
        </div>
      </template>

      <div class="form-actions">
        <div class="icon-submit" @click.prevent="submitForm">
          <img src="@/assets/images/check-icon.svg" />
        </div>
        <div @click="$emit('close')" class="icon-cancel">
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// import CustomInput from "../../../../../components/inputs/CustomInput.vue";
import CustomSelectBox from "../../../../../components/inputs/CustomSelectBox.vue";
import CustomCheckbox from "../../../../../components/inputs/CustomCheckbox.vue";
import CustomFileInput from "../../../../../components/inputs/CustomFileInput.vue";
import TextArea from "../../../../../components/inputs/TextArea.vue";
import { fullPathFileFromServer } from "./../../../../../utils/functions";
import { QUESTION_TYPE } from "./../../../../../utils/constantLists";
import { getDialogOfQuestionType } from "./../../../../../utils/dialogsOfConstantsLists";
import {
  getQuestionBankTitlesDialog,
  getQuestionBanksDialog,
  getQuestionParagraphsDialog,
} from "./../../../../../utils/dialogsOfApi";
import AddUpdateQuestion from "../../../../../models/additional/educational/questions/AddUpdateQuestion";
import ItemMcqQuestionAnswer from "../../../../../models/additional/educational/questions/ItemMcqQuestionAnswer";

export default {
  name: "QuestionForm",
  mixins: [],
  beforeCreate() {},
  props: {
    id: {
      type: String,
      default: "id",
    },
    deleteFileStatus: {
      type: Boolean,
      default: false,
    },
    isOpened: {
      type: Boolean,
      default: false,
    },
    questionModel: {
      type: Object,
    },
  },
  data() {
    return {
      QUESTION_TYPE,
      questionTypeTokenList: getDialogOfQuestionType(),
      questionBankTitleTokenOptions: [],
      questionBankTokenOptions: [],
      questionParagraphTokenOptions: [],
      questionsList: [],
    };
  },
  created() {
    if (this.id == "update") {
      this.questionsList = [];
      let questionUpdate = new AddUpdateQuestion();
      questionUpdate.fillData(this.questionModel);
      this.questionsList.push(questionUpdate);
    }
  },
  watch: {
    isOpened(v) {
      if (v) {
        this.getQuestionBankTitlesDialog();
        this.getQuestionBanksDialog();
        this.getQuestionParagraphsDialog();
        this.questionsList = [];
        if (this.id == "update") {
          let questionUpdate = new AddUpdateQuestion();
          questionUpdate.fillData(this.questionModel);
          this.questionsList.push(questionUpdate);
        } else {
          this.questionsList.push(new AddUpdateQuestion());
          for (let index = 0; index < 3; index++) {
            this.addSliceAnswer(0);
          }
        }
      }
    },
  },
  beforeMount() {},
  mounted() {},
  components: {
    // CustomInput,
    CustomSelectBox,
    CustomCheckbox,
    CustomFileInput,
    TextArea,
  },
  computed: {
    isUpdate() {
      return this.id == "update";
    },
    isAdd() {
      return this.id == "add";
    },
    questionTypeTokensOptions: function() {
      return this.questionTypeTokenList.filter(
        (t) =>
          t.value == QUESTION_TYPE.TrueFalse || t.value == QUESTION_TYPE.Chose
      );
    },
  },
  methods: {
    async mainQuestionBankTitleTokenChanged(token) {
      if (!token) {
        this.questionsList = await this.questionsList.map((q) => {
          q.questionBankToken = "";
          return q;
        });
        this.questionsList = await this.questionsList.map((q) => {
          q.questionParagraphToken = "";
          return q;
        });
      }
    },
    async mainQuestionBankTokenChanged(token) {
      this.questionsList = await this.questionsList.map((q) => {
        q.questionBankToken = token;
        return q;
      });
    },
    async mainQuestionParagraphTokenChanged(token) {
      this.questionsList = await this.questionsList.map((q) => {
        q.questionParagraphToken = token;
        return q;
      });
    },
    async getQuestionBankTitlesDialog() {
      this.questionBankTitleTokenOptions = await getQuestionBankTitlesDialog();
    },
    async getQuestionBanksDialog() {
      let params = {
        questionBankTitleToken: this.questionModel.mainQuestionBankTitleToken,
      };
      this.questionBankTokenOptions = await getQuestionBanksDialog(params);
    },
    async getQuestionParagraphsDialog() {
      let params = {
        questionBankTitleToken: this.questionModel.mainQuestionBankTitleToken,
      };
      this.questionParagraphTokenOptions = await getQuestionParagraphsDialog(
        params
      );
    },
    async addQuestionSlice() {
      this.questionsList.push(new AddUpdateQuestion());
      for (let index = 0; index < 3; index++) {
        this.addSliceAnswer(this.questionsList.length - 1);
      }
      this.questionsList = await this.questionsList.map((q) => {
        q.questionBankToken = this.questionModel.mainQuestionBankToken;
        return q;
      });
      this.questionsList = await this.questionsList.map((q) => {
        q.questionParagraphToken = this.questionModel.mainQuestionParagraphToken;
        return q;
      });
    },
    removeQuestionSlice(index) {
      this.questionsList.splice(index, 1);
    },
    addSliceAnswer(indexQuestion) {
      let index = this.questionsList[indexQuestion].mCQQuestionData
        .questionMCQAnswerData.length;

      this.questionsList[
        indexQuestion
      ].mCQQuestionData.questionMCQAnswerData.push(
        new ItemMcqQuestionAnswer(index + 1)
      );
    },
    removeSliceAnswer(indexQuestion, indexAnswer) {
      this.questionsList[
        indexQuestion
      ].mCQQuestionData.questionMCQAnswerData.splice(indexAnswer, 1);
    },
    unchekExept(indexQuestion, indexAnswer) {
      this.questionsList[
        indexQuestion
      ].mCQQuestionData.questionMCQAnswerData.map((item, key) => {
        if (key != indexAnswer) {
          item.answerIsTrue = false;
        } else {
          item.answerIsTrue = true;
        }
      });
    },
    fullPathFileFromServer,
    async submitForm() {
      this.$emit("submitForm", this.questionsList);
    },
  },
};
</script>

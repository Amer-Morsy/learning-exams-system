<template>
  <div class="">
    <form class="" autocomplete="off">
      <!-- level -->
      <div class="row">
        <CustomSelectBox
          :isDisabled="true"
          :className="'col-md-11'"
          :id="`${id}-educationalCourseLevelToken`"
          :value="model.filterData.educationalCourseLevelToken"
          :options="educationalCourseLevelTokenOptions"
          v-on:changeValue="
            model.filterData.educationalCourseLevelToken = $event
          "
          :title="$t('EducationalCourseLevels.select')"
          :imgName="'EducationalCourseLevels.svg'"
        />
        <CustomSelectBox
          v-if="!isTeacherLogged"
          :className="'col-md-11'"
          :id="`educationalCourseLevelsModel-filter-ownerUserToken`"
          :value="educationalCourseLevelsModel.filterData.ownerUserToken"
          :options="userTokenOptions"
          v-on:changeValue="
            educationalCourseLevelsModel.filterData.ownerUserToken = $event;
            getQuestionsDialog();
          "
          :title="$t('Users.select')"
          :imgName="'user.svg'"
        />
      </div>
      <!-- series filter -->
      <template
        v-if="model.filterData.educationalCourseLevelToken && isTeacherLogged"
      >
        <div class="row">
          <CustomSelectBox
            :className="'col-md-11'"
            :id="`${id}-questionBankTitleToken`"
            :value="model.filterData.questionBankTitleToken"
            :options="questionBankTitleTokenOptions"
            v-on:changeValue="
              model.filterData.questionBankTitleToken = $event;
              model.filterData.questionBankToken = $event
                ? model.filterData.questionBankToken
                : '';
              model.filterData.questionParagraphToken = $event
                ? model.filterData.questionParagraphToken
                : '';
              getQuestionBanksDialog();
              getQuestionsDialog();
            "
            :title="$t('QuestionBankTitles.select')"
            :imgName="'questionBankTitle.svg'"
          />
          <template v-if="model.filterData.questionBankTitleToken">
            <CustomSelectBox
              :className="'col-md-5'"
              :id="`${id}-questionParagraphToken`"
              :value="model.filterData.questionParagraphToken"
              :options="questionParagraphTokenOptions"
              v-on:changeValue="
                model.filterData.questionParagraphToken = $event;
                filterQuestionsList();
              "
              :title="$t('QuestionParagraphs.select')"
              :imgName="'questionParagraph.svg'"
            />
            <CustomSelectBox
              :className="'col-md-5'"
              :id="`${id}-questionBankToken`"
              :value="model.filterData.questionBankToken"
              :options="questionBankTokenOptions"
              v-on:changeValue="
                model.filterData.questionBankToken = $event;
                getQuestionsDialog();
              "
              :title="$t('QuestionBanks.select')"
              :imgName="'questionBank.svg'"
            />
          </template>
        </div>
      </template>

      <template v-if="model.filterData.educationalCourseLevelToken">
        <!-- Questions -->
        <b-button
          v-b-toggle="`SystemQuestions`"
          class="btn btn-lg btn-collapse arrow-end"
        >
          <span
            >{{ $t("EducationalCourseLevelQuestions.systemQuestions") }}
          </span>
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse :id="`SystemQuestions`">
          <div class="row data-collapse">
            <div :key="reRenderKey" class="row">
              <template>
                <div class="my-card row">
                  <span class="my-card-title">
                    {{ $t("Questions.modelName") }}
                  </span>

                  <div class="table-container">
                    <table class="my-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>{{ $t("general.select") }}</th>
                          <th class="cell-lg">
                            {{ $t("general.title") }}
                          </th>
                          <th class="cell-lg">
                            {{ $t("QuestionBanks.name") }}
                          </th>
                          <th class="cell-lg">
                            {{ $t("QuestionParagraphs.name") }}
                          </th>
                          <th>
                            {{ $t("general.type") }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-if="questionOptionsList.length == 0">
                          <tr>
                            <th colspan="6">
                              {{ $t("general.noData") }}
                            </th>
                          </tr>
                        </template>
                        <template v-else>
                          <tr
                            v-for="(item,
                            indexQuestionOption) in questionOptionsList"
                            :key="indexQuestionOption"
                          >
                            <td>{{ indexQuestionOption + 1 }}</td>
                            <td>
                              <CustomCheckbox
                                :id="
                                  `${id}-table-${indexQuestionOption}-isSelected`
                                "
                                :value="item.isSelected"
                                v-on:changeValue="
                                  item.isSelected = $event;
                                  toggleItemInMainList($event, item);
                                "
                                :centerStatus="true"
                                :withOutTitle="true"
                              />
                            </td>
                            <td>
                              {{ item.questionTitle }}
                            </td>
                            <td>
                              {{ item.questionBankName }}
                            </td>
                            <td>
                              {{ item.questionParagraphTitle || "--" }}
                            </td>
                            <td>
                              {{ item.questionType }}
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </b-collapse>
        <!-- level Questions -->
        <b-button
          v-b-toggle="`SelectedQuestions`"
          class="btn btn-lg btn-collapse arrow-end mt-3"
        >
          <span
            >{{ $t("EducationalCourseLevelQuestions.selectedQuestions") }}
          </span>
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse :id="`SelectedQuestions`">
          <div class="row data-collapse">
            <div class="row">
              <template>
                <div class="my-card row">
                  <span class="my-card-title">
                    {{ $t("Questions.modelName") }}
                  </span>

                  <div class="table-container">
                    <table class="my-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>{{ $t("general.delete") }}</th>
                          <th class="cell-lg">
                            {{ $t("general.title") }}
                          </th>
                          <th class="cell-lg">
                            {{ $t("QuestionBanks.name") }}
                          </th>
                          <th class="cell-lg">
                            {{ $t("QuestionParagraphs.name") }}
                          </th>
                          <th>
                            {{ $t("general.type") }}
                          </th>
                          <th>
                            {{ $t("general.degree") }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-if="model.questionsData.length == 0">
                          <tr>
                            <th colspan="7">
                              {{ $t("general.noData") }}
                            </th>
                          </tr>
                        </template>
                        <template v-else>
                          <tr
                            v-for="(item, indexQuestion) in model.questionsData"
                            :key="indexQuestion"
                          >
                            <td>{{ indexQuestion + 1 }}</td>
                            <td>
                              <button
                                :title="$t('general.delete')"
                                @click.prevent="
                                  removeSliceQuestion(
                                    indexQuestion,
                                    item.questionToken
                                  )
                                "
                              >
                                <img src="@/assets/images/trash.svg" />
                              </button>
                            </td>
                            <td>
                              {{ item.questionTitle }}
                            </td>
                            <td>
                              {{ item.questionBankName }}
                            </td>
                            <td>
                              {{ item.questionParagraphTitle || "--" }}
                            </td>
                            <td>
                              {{ item.questionType }}
                            </td>
                            <td>
                              <CustomInputFloat
                                :id="
                                  `${id}-table-${indexQuestion}-questionDegree`
                                "
                                :value="item.questionDegree"
                                v-on:changeValue="item.questionDegree = $event"
                                :withOutDesign="true"
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
          </div>
        </b-collapse>
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
import { mapGetters } from "vuex";
import CustomInputFloat from "../../../../components/inputs/CustomInputFloat.vue";
import CustomSelectBox from "../../../../components/inputs/CustomSelectBox.vue";
import CustomCheckbox from "./../../../../components/inputs/CustomCheckbox.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { USER_TYPE } from "./../../../../utils/constantLists";
import { USER_MODEL_NAME } from "./../../../../utils/constants";
import {
  fullPathFileFromServer,
  getLanguage,
} from "./../../../../utils/functions";
import {
  getQuestionBankTitlesDialog,
  getQuestionBanksDialog,
  // getQuestionParagraphsDialog,
  getEducationalCourseLevelsDialogCustom,
  getUsersDialog,
  getQuestionsDialogCustom,
} from "./../../../../utils/dialogsOfApi";

export default {
  name: "EducationalCourseLevelQuestionForm",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
    id: {
      type: String,
      default: "id",
    },
    isOpened: {
      type: Boolean,
      default: false,
    },
    deleteFileStatus: {
      type: Boolean,
      default: false,
    },
    educationalCourseLevelQuestion: {
      type: Object,
    },
    educationalCourseLevelsModel: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      language: getLanguage(),
      educationalCourseLevelTokenOptions: [],
      userTokenOptions: [],
      questionOptionsList: [],
      reRenderKey: null,

      questionBankTitleTokenOptions: [],
      questionBankTokenOptions: [],
      questionParagraphTokenOptions: [],
    };
  },
  created() {
    this.getQuestionBankTitlesDialog();
    this.getQuestionBanksDialog();
    // this.getQuestionParagraphsDialog();

    this.getQuestionsDialog();
    if (!this.isTeacherLogged) {
      this.getTeachersDialog();
    }
  },
  watch: {
    async isOpened(v) {
      if (v) {
        // this.questionOptionsList = [];
        // this.educationalCourseLevelTokenOptions = [];
        this.getEducationalCourseLevelsDialog();
        this.getQuestionsDialog();
      }
    },
  },
  beforeMount() {},
  mounted() {},
  components: {
    CustomInputFloat,
    CustomSelectBox,
    CustomCheckbox,
  },
  computed: {
    ...mapGetters(["isTeacherLogged"]),
  },

  methods: {
    fullPathFileFromServer,
    async getEducationalCourseLevelsDialog() {
      this.educationalCourseLevelTokenOptions = await getEducationalCourseLevelsDialogCustom();
    },
    async getTeachersDialog() {
      let params = {
        modelName: USER_MODEL_NAME.Teacher,
        userTypeToken: USER_TYPE.Teacher,
      };
      this.userTokenOptions = await getUsersDialog(params);
    },

    async getQuestionsDialog() {
      let params = {};
      if (!this.isTeacherLogged) {
        //admin
        params = {
          ownerUserToken: this.educationalCourseLevelsModel.filterData
            .ownerUserToken,
        };
      } else {
        //teacher
        params = {
          questionBankTitleToken: this.model.filterData.questionBankTitleToken,
          questionBankToken: this.model.filterData.questionBankToken,
          questionParagraphToken: this.model.filterData.questionParagraphToken,
        };
      }
      this.questionOptionsList = await getQuestionsDialogCustom(params);
      await this.setQuestionParagraphsDialog();
    },

    async getQuestionBankTitlesDialog() {
      this.questionBankTitleTokenOptions = await getQuestionBankTitlesDialog();
    },
    async getQuestionBanksDialog() {
      this.questionBankTokenOptions = [];
      let params = {
        questionBankTitleToken: this.model.filterData.questionBankTitleToken,
      };
      this.questionBankTokenOptions = await getQuestionBanksDialog(params);
    },
    async setQuestionParagraphsDialog() {
      this.questionParagraphTokenOptions = [];
      let questionParagraphInfoData = this.questionOptionsList.map(
        (q) => q.questionParagraphInfoData
      );

      questionParagraphInfoData.forEach((questionParagraph) => {
        // check if exist
        let isExist = false;
        this.questionParagraphTokenOptions.forEach((i) => {
          if (isExist) {
            return;
          }
          if (questionParagraph) {
            isExist = i.value == questionParagraph.questionParagraphToken;
          } else {
            isExist = i.value == "NoVal";
          }
        });

        if (!isExist) {
          if (questionParagraph) {
            this.questionParagraphTokenOptions.push({
              value: questionParagraph.questionParagraphToken,
              text: questionParagraph.questionParagraphTitle,
              image: fullPathFileFromServer(
                questionParagraph.questionParagraphImagePath
              ),
            });
          } else {
            this.questionParagraphTokenOptions.push({
              value: "NoVal",
              text: this.$t("Questions.withoutParagraph"),
              image: fullPathFileFromServer(""),
            });
          }
        }
      });
    },
    async filterQuestionsList() {
      await this.getQuestionsDialog();
      if (this.model.filterData.questionParagraphToken) {
        if (this.model.filterData.questionParagraphToken != "NoVal") {
          this.questionOptionsList = this.questionOptionsList.filter(
            (q) =>
              q.questionParagraphInfoData &&
              q.questionParagraphInfoData.questionParagraphToken ==
                this.model.filterData.questionParagraphToken
          );
        } else {
          this.questionOptionsList = this.questionOptionsList.filter(
            (q) => q.questionParagraphInfoData == null
          );
        }
      }
    },

    removeSliceQuestion(indexQuestion, questionToken) {
      this.model.questionsData.splice(indexQuestion, 1);
      this.uncheckQuestion(questionToken);
    },
    uncheckQuestion(questionToken) {
      this.questionOptionsList.map((i) => {
        if (i.questionToken == questionToken) {
          i.isSelected = false;
        }
        return i;
      });
      this.reRenderKey = `${new Date()}`;
    },
    toggleItemInMainList(status, item) {
      if (status) {
        let currentList = this.model.questionsData;
        let isItemExist = currentList.filter(
          (i) => i.questionToken == item.questionToken
        );
        if (isItemExist.length) {
          this.showMsg(this.$t("general.selectedBefore"));
          this.uncheckQuestion(item.questionToken);
        } else {
          item.questionDegree = 1;
          this.model.questionsData.push(item);
        }
      } else {
        let indexQuestion = null;
        this.model.questionsData.map((el, index) => {
          if (el.questionToken == item.questionToken) {
            indexQuestion = index;
          }
        });
        this.removeSliceQuestion(indexQuestion, item.questionToken);
      }
    },
    async submitForm() {
      this.$emit("submitForm");
    },
  },
};
</script>

<template>
  <div class="table-container" v-if="questionsData.length">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="5">{{ $t("Questions.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("media") }}</th>
          <th class="cell-lg">{{ $t("Questions.title") }}</th>
          <th class="cell-lg">{{ $t("QuestionBanks.name") }}</th>
          <th class="cell-lg">{{ $t("QuestionParagraphs.name") }}</th>
          <th class="cell-lg">{{ $t("questionsTypes.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(question, index) in questionsData" :key="index">
          <td>
            {{ ++index + filterData.currentIndex }}
          </td>
          <td>
            <button
              @click="
                setQuestionData(question);
                openBottomSheet(model.metaData.components.Media.refName);
              "
              :title="$t('media')"
            >
              <img
                v-if="
                  question.questionMediaTypeToken == MEDIA_TYPE_TOKENS.image
                "
                src="@/assets/images/image.svg"
              />
              <img
                v-else-if="
                  question.questionMediaTypeToken == MEDIA_TYPE_TOKENS.video
                "
                src="@/assets/images/video.svg"
              />
              <img
                v-else-if="
                  question.questionMediaTypeToken == MEDIA_TYPE_TOKENS.audio
                "
                src="@/assets/images/audio.svg"
              />
              <img
                v-else-if="
                  question.questionMediaTypeToken == MEDIA_TYPE_TOKENS.pdf
                "
                src="@/assets/images/pdf.svg"
              />
              <img
                v-else-if="
                  question.questionMediaTypeToken == MEDIA_TYPE_TOKENS.excel
                "
                src="@/assets/images/excel.svg"
              />
              <img
                v-else-if="
                  question.questionMediaTypeToken == MEDIA_TYPE_TOKENS.word
                "
                src="@/assets/images/word.svg"
              />
              <img
                v-else-if="
                  question.questionMediaTypeToken ==
                    MEDIA_TYPE_TOKENS.powerPoint
                "
                src="@/assets/images/powerpoint.svg"
              />
              <img v-else src="@/assets/images/media.svg" />
            </button>
          </td>
          <td>
            {{ isDataExist(question.questionTitle) }}
          </td>
          <td>
            {{
              isDataExist(question.questionBankInfoData.questionBankNameCurrent)
            }}
          </td>
          <td>
            {{
              isDataExist(
                question.questionParagraphInfoData
                  ? question.questionParagraphInfoData.questionParagraphTitle
                  : ""
              )
            }}
          </td>
          <td>
            {{ isDataExist(question.questionTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="setAndOppenInfo(question)"
                  :title="$t('general.info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li v-if="hasUpdate">
                <button
                  @click="
                    setQuestionData(question);
                    openBottomSheet(model.metaData.components.Update.refName);
                  "
                  :title="$t('general.edit')"
                >
                  <!-- @click="setAndOppenUpdate(question)" -->
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="hasFinalDelete">
                <button
                  v-b-modal="`${model.metaData.components.Delete.refName}`"
                  :title="$t('general.delete')"
                  @click="setQuestionData(question)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="hasChangeActivationType">
                <button
                  :title="$t('changeActivationType')"
                  @click="setAndOppenChangeActivationType(question)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
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
} from "../../../../../utils/functions";
import { mapActions } from "vuex";
import FloatingMenu from "../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";
import { MEDIA_TYPE_TOKENS } from "./../../../../../utils/constants";

export default {
  name: "QuestionTable",
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
    deleteFullbackAction: {
      type: Function,
    },
    changeActivationFullbackAction: {
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
  components: { FloatingMenu },
  computed: {
    questionsData() {
      return this.model.questionsData;
    },
    question() {
      return this.model.question;
    },
    filterData() {
      return this.model.filterData;
    },
    defaultImg() {
      return this.model.question.defaultImg;
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
      await this.question.fillData(item);
      this.setCurrentLayerComponent(this.model.metaData.components.Info.link);
      this.setCurrentProps({
        model: this.model,
      });
      this.openBottomSheet(this.model.metaData.components.Info.refName);
    },
    async setAndOppenUpdate(item) {
      await this.question.fillData(item);
      this.setCurrentLayerComponent(this.model.metaData.components.Update.link);
      this.setCurrentProps({
        model: this.model,
        fullbackAction: this.updateFullbackAction,
      });
      this.openBottomSheet(this.model.metaData.components.Update.refName);
    },
    async setAndOppenDelete(item) {
      await this.question.fillData(item);
      this.setCurrentLayerComponent(this.model.metaData.components.Delete.link);
      this.setCurrentProps({
        model: this.model,
        fullbackAction: this.deleteFullbackAction,
      });
      this.$bvModal.show(this.model.metaData.components.Delete.refName);
    },
    async setAndOppenChangeActivationType(item) {
      await this.question.fillData(item);
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
    setQuestionData(question) {
      this.$emit("setQuestionData", question);
    },
  },
};
</script>

<style lang="scss"></style>

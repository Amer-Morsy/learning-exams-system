<template>
  <div class="table-container" v-if="questionBankTitlesData.length">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("QuestionBankTitles.data") }}</th>
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
          v-for="(questionBankTitle, index) in questionBankTitlesData"
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
                  questionBankTitle.questionBankTitleImagePath,
                  questionBankTitle.defaultImg
                )
              "
              :onerror="`this.src='${questionBankTitle.defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(questionBankTitle.fullCode) }}</td>
          <td>
            {{ isDataExist(questionBankTitle.questionBankTitleNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="setAndOppenInfo(questionBankTitle)"
                  :title="$t('general.info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li v-if="hasUpdate">
                <button
                  @click="
                    setQuestionBankTitleData(questionBankTitle);
                    openBottomSheet(model.metaData.components.Update.refName);
                  "
                  :title="$t('general.edit')"
                >
                  <!-- @click="setAndOppenUpdate(questionBankTitle)" -->
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="hasFinalDelete">
                <button
                  v-b-modal="`${model.metaData.components.Delete.refName}`"
                  :title="$t('general.delete')"
                  @click="setQuestionBankTitleData(questionBankTitle)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="hasChangeActivationType">
                <button
                  :title="$t('changeActivationType')"
                  @click="setAndOppenChangeActivationType(questionBankTitle)"
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

export default {
  name: "QuestionBankTitleTable",
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
    return {};
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: { FloatingMenu },
  computed: {
    questionBankTitlesData() {
      return this.model.questionBankTitlesData;
    },
    questionBankTitle() {
      return this.model.questionBankTitle;
    },
    filterData() {
      return this.model.filterData;
    },
    defaultImg() {
      return this.model.questionBankTitle.defaultImg;
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
      await this.questionBankTitle.fillData(item);
      this.setCurrentLayerComponent(this.model.metaData.components.Info.link);
      this.setCurrentProps({
        model: this.model,
      });
      this.openBottomSheet(this.model.metaData.components.Info.refName);
    },
    async setAndOppenUpdate(item) {
      await this.questionBankTitle.fillData(item);
      this.setCurrentLayerComponent(this.model.metaData.components.Update.link);
      this.setCurrentProps({
        model: this.model,
        fullbackAction: this.updateFullbackAction,
      });
      this.openBottomSheet(this.model.metaData.components.Update.refName);
    },
    async setAndOppenDelete(item) {
      await this.questionBankTitle.fillData(item);
      this.setCurrentLayerComponent(this.model.metaData.components.Delete.link);
      this.setCurrentProps({
        model: this.model,
        fullbackAction: this.deleteFullbackAction,
      });
      this.$bvModal.show(this.model.metaData.components.Delete.refName);
    },
    async setAndOppenChangeActivationType(item) {
      await this.questionBankTitle.fillData(item);
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
    setQuestionBankTitleData(questionBankTitle) {
      this.$emit("setQuestionBankTitleData", questionBankTitle);
    },
  },
};
</script>

<style lang="scss"></style>

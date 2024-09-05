<template>
  <div class="row custom-cards" v-if="questionBankTitlesData.length">
    <CustomCard
      v-for="(questionBankTitle, index) in questionBankTitlesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="questionBankTitle.questionBankTitleNameCurrent"
      :description="questionBankTitle.fullCode"
      :imagePath="questionBankTitle.questionBankTitleImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
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
    </CustomCard>
  </div>
</template>

<script>
import {
  isDataExist,
  fullPathFileFromServer,
} from "../../../../../utils/functions";
import { mapActions } from "vuex";
import CustomCard from "../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "QuestionBankTitleCard",
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
  components: { CustomCard },
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

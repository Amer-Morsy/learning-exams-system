<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('general.filter')"
    :headerIcon="icon"
    @opened="
      getQuestionBankTitlesDialog();
      getQuestionBanksDialog();
    "
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-5'"
        :id="`filter-questionBankTitleToken`"
        :value="model.filterData.questionBankTitleToken"
        :options="questionBankTitleTokenOptions"
        v-on:changeValue="
          model.filterData.questionBankTitleToken = $event;
          getQuestionBanksDialog();
        "
        :title="$t('QuestionBankTitles.select')"
        :imgName="'questionBankTitle.svg'"
      />
      <CustomSelectBox
        :className="'col-md-5'"
        :id="`filter-questionBankToken`"
        :value="model.filterData.questionBankToken"
        :options="questionBankTokenOptions"
        v-on:changeValue="model.filterData.questionBankToken = $event"
        :title="$t('QuestionBanks.select')"
        :imgName="'questionBank.svg'"
      />
      <!-- <CustomSelectBox
        :className="'col-md-5'"
        :id="`filter-questionParagraphToken`"
        :value="model.filterData.questionParagraphToken"
        :options="questionParagraphTokenOptions"
        v-on:changeValue="model.filterData.questionParagraphToken = $event"
        :title="$t('QuestionParagraphs.select')"
        :imgName="'questionParagraph.svg'"
      /> -->
      <CustomBaseEntityFilter
        :className="'row'"
        :value="model.filterData"
        v-on:changeValue="model.filterData.fillData($event)"
      />
    </div>

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="search">
        <img src="@/assets/images/search-icon.svg" :title="$t('search')" />
      </div>
      <div @click.prevent="closeBottomSheet(refName)" class="icon-cancel">
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import CustomBaseEntityFilter from "./../../../../../components/general/CustomBaseEntityFilter.vue";
import CustomSelectBox from "../../../../../components/inputs/CustomSelectBox.vue";
import generalMixin from "./../../../../../utils/generalMixin";
import {
  getQuestionBankTitlesDialog,
  getQuestionBanksDialog,
  // getQuestionParagraphsDialog,
} from "./../../../../../utils/dialogsOfApi";
import icon from "@/assets/images/filter.svg";

export default {
  mixins: [generalMixin],
  props: {
    model: {
      type: Object,
      default: null,
    },
    fullbackAction: {
      type: Function,
    },
  },
  data() {
    return {
      icon,
      questionBankTitleTokenOptions: [],
      questionBankTokenOptions: [],
      // questionParagraphTokenOptions: [],
    };
  },
  components: {
    CustomBottomSheet,
    CustomBaseEntityFilter,
    CustomSelectBox,
  },
  computed: {
    refName() {
      return this.model.metaData.components.Filter.refName;
    },
  },
  methods: {
    async getQuestionBankTitlesDialog() {
      this.questionBankTitleTokenOptions = await getQuestionBankTitlesDialog();
    },
    async getQuestionBanksDialog() {
      let params = {
        questionBankTitleToken: this.model.filterData.questionBankTitleToken,
      };
      this.questionBankTokenOptions = await getQuestionBanksDialog(params);
    },
    // async getQuestionParagraphsDialog() {
    //   let params = {
    //     questionBankTitleToken: this.model.filterData.questionBankTitleToken,
    //   };
    //   this.questionParagraphTokenOptions = await getQuestionParagraphsDialog(
    //     params
    //   );
    // },
    search() {
      this.closeBottomSheet(this.refName);
      this.runFullbackAction();
    },
    runFullbackAction() {
      this.fullbackAction();
    },
  },
};
</script>

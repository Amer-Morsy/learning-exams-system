<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('general.filter')"
    :headerIcon="icon"
    @opened="getQuestionBankTitlesDialog()"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-11'"
        :id="`filter-questionBankTitleToken`"
        :value="model.filterData.questionBankTitleToken"
        :options="questionBankTitleTokenOptions"
        v-on:changeValue="model.filterData.questionBankTitleToken = $event"
        :title="$t('QuestionBankTitles.select')"
        :imgName="'questionBankTitle.svg'"
      />
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
import { getQuestionBankTitlesDialog } from "./../../../../../utils/dialogsOfApi";
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

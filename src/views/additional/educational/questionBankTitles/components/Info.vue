<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('QuestionBankTitles.data')"
    :headerIcon="headerIcon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="questionBankTitle.questionBankTitleNameAr"
        :title="$t('general.nameAr')"
        :imgName="'questionBankTitle.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="questionBankTitle.questionBankTitleNameEn"
        :title="$t('general.nameEn')"
        :imgName="'questionBankTitle.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="questionBankTitle.questionBankTitleDescriptionAr"
        :title="$t('general.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="questionBankTitle.questionBankTitleDescriptionEn"
        :title="$t('general.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="questionBankTitle.questionBankTitleNotes"
        :title="$t('general.notes')"
        :imgName="'notes.svg'"
      />
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
import DataLabelGroup from "../../../../../components/previews/DataLabelGroup.vue";

export default {
  name: "QuestionBankTitleInfo",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),
    questionBankTitle() {
      return this.model.questionBankTitle;
    },
    refName() {
      return this.model.metaData.components.Info.refName;
    },
    headerIcon() {
      return this.questionBankTitle.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
  },
};
</script>

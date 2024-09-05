<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('QuestionBanks.data')"
    :headerIcon="headerIcon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="questionBank.questionBankNameAr"
        :title="$t('general.nameAr')"
        :imgName="'questionBank.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="questionBank.questionBankNameEn"
        :title="$t('general.nameEn')"
        :imgName="'questionBank.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="questionBank.questionBankDescriptionAr"
        :title="$t('general.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="questionBank.questionBankDescriptionEn"
        :title="$t('general.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="questionBank.questionBankNotes"
        :title="$t('general.notes')"
        :imgName="'notes.svg'"
      />
      <div class="col-12" v-if="questionBank.questionBankTitleInfoData">
        <b-button
          v-b-toggle="`QuestionBankTitleInfoData_${questionBank.fullCode}`"
          class="btn btn-lg btn-collapse arrow-end"
        >
          <span>{{ $t("QuestionBankTitles.data") }} </span>
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse :id="`QuestionBankTitleInfoData_${questionBank.fullCode}`">
          <div class="row data-collapse">
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                questionBank.questionBankTitleInfoData
                  .questionBankTitleNameCurrent
              "
              :title="$t('general.name')"
              :imgName="'questionBankTitle.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                questionBank.questionBankTitleInfoData
                  .questionBankTitleDescriptionCurrent
              "
              :title="$t('general.description')"
              :imgName="'description.svg'"
            />

            <DataLabelGroup
              :className="'col-md-12'"
              :value="
                questionBank.questionBankTitleInfoData.questionBankTitleNotes
              "
              :title="$t('general.notes')"
              :imgName="'notes.svg'"
            />
          </div>
        </b-collapse>
      </div>
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
  name: "QuestionBankInfo",
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
    questionBank() {
      return this.model.questionBank;
    },
    refName() {
      return this.model.metaData.components.Info.refName;
    },
    headerIcon() {
      return this.questionBank.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
  },
};
</script>

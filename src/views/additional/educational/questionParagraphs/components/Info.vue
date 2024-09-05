<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('QuestionParagraphs.data')"
    :headerIcon="headerIcon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="questionParagraph.questionParagraphTitle"
        :title="$t('general.title')"
        :imgName="'questionParagraph.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="questionParagraph.questionParagraphDescription_HTML"
        :title="$t('general.description')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="questionParagraph.questionParagraphNotes"
        :title="$t('general.notes')"
        :imgName="'notes.svg'"
      />
      <div class="col-12" v-if="questionParagraph.questionBankTitleInfoData">
        <b-button
          v-b-toggle="`QuestionBankTitleInfoData_${questionParagraph.fullCode}`"
          class="btn btn-lg btn-collapse arrow-end"
        >
          <span>{{ $t("QuestionBankTitles.data") }} </span>
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </b-button>
        <b-collapse
          :id="`QuestionBankTitleInfoData_${questionParagraph.fullCode}`"
        >
          <div class="row data-collapse">
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                questionParagraph.questionBankTitleInfoData
                  .questionBankTitleNameCurrent
              "
              :title="$t('general.name')"
              :imgName="'questionBankTitle.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                questionParagraph.questionBankTitleInfoData
                  .questionBankTitleDescriptionCurrent
              "
              :title="$t('general.description')"
              :imgName="'description.svg'"
            />

            <DataLabelGroup
              :className="'col-md-12'"
              :value="
                questionParagraph.questionBankTitleInfoData
                  .questionBankTitleNotes
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
  name: "QuestionParagraphInfo",
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
    questionParagraph() {
      return this.model.questionParagraph;
    },
    refName() {
      return this.model.metaData.components.Info.refName;
    },
    headerIcon() {
      return this.questionParagraph.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
  },
};
</script>

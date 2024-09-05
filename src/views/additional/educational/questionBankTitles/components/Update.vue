<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('QuestionBankTitles.update')"
    :headerIcon="headerIcon"
  >
    <div class="">
      <QuestionBankTitleForm
        :key="refreshKey"
        :id="'update'"
        :deleteFileStatus="hasDeleteImage"
        :questionBankTitle="questionBankTitle"
        @submitForm="update"
        @deleteFile="deleteFile()"
        @close="closeBottomSheet(refName)"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import CustomBottomSheet from "../../../../../components/general/CustomBottomSheet.vue";
import QuestionBankTitleForm from "./Form.vue";
import generalMixin from "./../../../../../utils/generalMixin";
import { objectToFormData } from "./../../../../../utils/functions";
import apiQuestionBankTitle from "../../../../../api/additional/educational/questionBankTitles/questionBankTitle";

export default {
  name: "QuestionBankTitleUpdate",
  mixins: [generalMixin],
  beforeCreate() {},
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
      refreshKey: null,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    QuestionBankTitleForm,
    CustomBottomSheet,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),
    refName() {
      return this.model.metaData.components.Update.refName;
    },
    questionBankTitle() {
      return this.model.questionBankTitle;
    },
    hasDeleteImage() {
      return (
        this.model.metaData.privileges.deleteImage &&
        !this.questionBankTitle.questionBankTitleImageIsDefault
      );
    },
    headerIcon() {
      return this.questionBankTitle.icon;
    },
    apiQuestionBankTitle() {
      return this.model.metaData.api;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async update() {
      let formData = objectToFormData(this.questionBankTitle);
      const response = await apiQuestionBankTitle.update(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.closeBottomSheet(this.refName);
        this.runFullbackAction();
      } else {
        this.showMsg(response.data.msg);
      }
    },
    async deleteFile() {
      let formData = objectToFormData({
        token: this.questionBankTitle.questionBankTitleToken,
      });
      const response = await apiQuestionBankTitle.deleteImage(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.questionBankTitle.questionBankTitleImagePath = "";
        this.questionBankTitle.questionBankTitleImageIsDefault = true;
        this.refreshKey = new Date();
      } else {
        this.showMsg(response.data.msg);
      }
    },
    runFullbackAction() {
      this.fullbackAction();
    },
  },
};
</script>

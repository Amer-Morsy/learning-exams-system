<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('EducationalCourseLevelQuestions.add')"
    :headerIcon="headerIcon"
    :swipeAble="false"
    :clickToClose="false"
    @opened="
      isOpened = true;
      educationalCourseLevelQuestion.setInitialValue();
    "
    @closed="isOpened = false"
  >
    <div class="">
      <EducationalCourseLevelQuestionForm
        :model="model"
        :educationalCourseLevelsModel="educationalCourseLevelsModel"
        :id="'add'"
        :isOpened="isOpened"
        :educationalCourseLevelQuestion="educationalCourseLevelQuestion"
        @submitForm="changeCourseLevelQuestions"
        @close="closeBottomSheet(refName)"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import CustomBottomSheet from "../../../../components/general/CustomBottomSheet.vue";
import EducationalCourseLevelQuestionForm from "./Form.vue";
import generalMixin from "../../../../utils/generalMixin";
import apiEducationalCourseLevelQuestion from "../../../../api/educationals/educationalCourseLevelQuestions/educationalCourseLevelQuestion";

export default {
  name: "EducationalCourseLevelQuestionAdd",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
    educationalCourseLevelsModel: {
      type: Object,
      default: null,
    },
    fullbackAction: {
      type: Function,
    },
  },
  data() {
    return {
      isOpened: false,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomBottomSheet,
    EducationalCourseLevelQuestionForm,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
    refName() {
      return this.model.metaData.components.Add.refName;
    },
    educationalCourseLevelQuestion() {
      return this.model.educationalCourseLevelQuestion;
    },
    headerIcon() {
      return this.educationalCourseLevelQuestion.icon;
    },
    apiEducationalCourseLevelQuestion() {
      return this.model.metaData.api;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async changeCourseLevelQuestions() {
      let questionsData = this.model.questionsData.map((i) => {
        let obj = {
          questionToken: i.questionToken,
          questionDegree: i.questionDegree,
        };
        return obj;
      });

      const response = await apiEducationalCourseLevelQuestion.changeCourseLevelQuestions(
        {
          userAuthorizeToken: this.userAuthorizeToken,
          educationalCourseLevelToken: this.model.filterData
            .educationalCourseLevelToken,
          questionsData: questionsData,
        }
      );
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.runFullbackAction();
        this.closeBottomSheet(this.refName);
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

import GeneralModel from "./../../general/GeneralModel";
import EducationalCourseLevelQuestion from "./EducationalCourseLevelQuestion";
import EducationalCourseLevelQuestionsFilter from "./EducationalCourseLevelQuestionsFilter";
import PrivilegeController from "./../../../controllers/privilege/PrivilegeController";

export default class EducationalCourseLevelQuestions extends GeneralModel {
  constructor() {
    super();
    this.metaData = this.getMetaData();
    this.setInitialValue();
  }
  getMetaData() {
    return {
      name: PrivilegeController.getPrivilegeModuleTokens()
        .EducationalCourseLevelQuestion,
      privileges: {
        view: PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourseLevel
        ),
        add: PrivilegeController.hasUpdateQuestionsEducationalCourseLevel(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourseLevel
        ),
      },
      components: {
        Add: {
          type: "bottomSheet",
          refName: "EducationalCourseLevelQuestionAdd",
          link:
            "additional/educational/educationalCourseLevelQuestions/components/Add.vue",
        },
        Info: {
          type: "bottomSheet",
          refName: "EducationalCourseLevelQuestionInfo",
          link:
            "additional/educational/educationalCourseLevelQuestions/components/Info.vue",
        },
        Filter: {
          type: "bottomSheet",
          refName: "EducationalCourseLevelQuestionFilter",
          link:
            "additional/educational/educationalCourseLevelQuestions/components/Filter.vue",
        },
      },
    };
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalCourseLevelQuestionsData = [];
    this.questionsData = [];
    this.educationalCourseLevelQuestion = new EducationalCourseLevelQuestion();
    this.filterData = new EducationalCourseLevelQuestionsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.fillQuestionsData(data.educationalCourseLevelQuestionsData ?? []);
      this.educationalCourseLevelQuestionsData =
        data.educationalCourseLevelQuestionsData ?? [];
      let filter = {
        ...this.filterData,
        ...data.pagination,
      };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }

  fillQuestionsData(educationalCourseLevelQuestionsData) {
    this.questionsData = educationalCourseLevelQuestionsData.map((item) => {
      let obj = {
        questionToken: item.questionData.questionToken,
        questionTitle: item.questionData.questionTitle,
        questionType: item.questionData.questionTypeNameCurrent,
        questionDegree: item.questionDegree,
      };
      return obj;
    });
  }
}

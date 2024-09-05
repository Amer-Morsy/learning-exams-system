import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
// import store from "./../../../store";

export default class EducationalCourseLevelQuestionsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    // this.activationTypeTokens =
    //   store.getters.generalSetting.EducationalCourseLevelQuestion
    //     .activationTypeTokens || [];

    this.educationalCourseLevelQuestionToken = "";
    this.educationalCourseLevelToken = ""; //must

    this.questionBankTitleToken = ""; 
    this.questionBankToken = ""; 
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.educationalCourseLevelQuestionToken = data.educationalCourseLevelQuestionToken ?? "";
      this.educationalCourseLevelToken = data.educationalCourseLevelToken ?? "";
      this.questionBankTitleToken = data.questionBankTitleToken ?? "";
      this.questionBankToken = data.questionBankToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}

import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/EducationalCourseLevelQuestions.svg";

export default class EducationalCourseLevelQuestion extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.educationalCourseLevelQuestionToken = "";
    this.questionDegree = 0;
    this.questionData = null;
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.educationalCourseLevelQuestionToken =
        data.educationalCourseLevelQuestionToken ?? "";
      this.questionDegree = data.questionDegree ?? 0;
      this.questionData = data.questionData ?? null;
    } else {
      this.setInitialValue();
    }
  }
}

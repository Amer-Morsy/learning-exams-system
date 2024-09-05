import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class EducationalCourseLevelsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.EducationalCourseLevel
        .activationTypeTokens || [];

    this.educationalCourseLevelToken = "";
    this.educationalCourseToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);

      this.educationalCourseLevelToken = data.educationalCourseLevelToken ?? "";
      this.educationalCourseToken = data.educationalCourseToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}

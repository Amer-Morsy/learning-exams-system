import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class EducationalTeachersFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.EducationalTeacher.activationTypeTokens ||
      [];

    this.parentEducationalCategoryToken = "";
    this.educationalCategoryToken = "";
    this.userTeacherToken = "";
    // this.getOnlyParentEducationalCategories = true;
    // this.getOnlyChildEducationalCategories = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.parentEducationalCategoryToken =
        data.parentEducationalCategoryToken ?? "";
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.userTeacherToken = data.userTeacherToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}

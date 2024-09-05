import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class EducationalCoursesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.EducationalCourse.activationTypeTokens || [];

    this.educationalCategoryToken = "";
    this.educationalCourseToken = "";
    this.parentEducationalCourseToken = "";
    this.parentEducationalCourseDataInclude = true;
    this.getOnlyParentEducationalCourses = true;
    this.getOnlyChildEducationalCourses = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.educationalCourseToken = data.educationalCourseToken ?? "";
      this.parentEducationalCourseToken =
        data.parentEducationalCourseToken ?? "";
      this.parentEducationalCourseDataInclude =
        data.parentEducationalCourseDataInclude ?? true;
      this.getOnlyParentEducationalCourses =
        data.getOnlyParentEducationalCourses ?? true;
      this.getOnlyChildEducationalCourses =
        data.getOnlyChildEducationalCourses ?? false;
    } else {
      this.setInitialValue();
    }
  }
}

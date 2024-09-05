import BaseEntityModelFilter from "./../../general/BaseEntityModelFilter";
import store from "./../../../store";

export default class EducationalCategoriesFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.EducationalCategory.activationTypeTokens ||
      [];

    this.educationalCategoryToken = "";
    this.parentEducationalCategoryToken = "";
    this.parentEducationalCategoryDataInclude = true;
    this.getOnlyParentEducationalCategories = true;
    this.getOnlyChildEducationalCategories = false;
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.parentEducationalCategoryToken =
        data.parentEducationalCategoryToken ?? "";
      this.parentEducationalCategoryDataInclude =
        data.parentEducationalCategoryDataInclude ?? true;
      this.getOnlyParentEducationalCategories =
        data.getOnlyParentEducationalCategories ?? true;
      this.getOnlyChildEducationalCategories =
        data.getOnlyChildEducationalCategories ?? false;
    } else {
      this.setInitialValue();
    }
  }
}

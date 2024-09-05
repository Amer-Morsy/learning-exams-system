import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
import store from "./../../store";

export default class UserLoginCodesFilter extends BaseEntityModelFilter {
  constructor(modelName) {
    super();
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName = "") {
    this.setFilterInitialValue();
    this.userInfoDataInclude = true;
    this.userTypeToken = "";
    this.activationTypeTokens =
      store.getters.generalSetting[modelName].activationTypeTokens ?? [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.userInfoDataInclude = data.userInfoDataInclude ?? true;
      this.userTypeToken = data.userTypeToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}

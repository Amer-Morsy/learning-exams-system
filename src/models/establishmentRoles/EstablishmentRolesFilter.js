import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
import store from "./../../store";

export default class EstablishmentRolesFilter extends BaseEntityModelFilter {
  constructor(modelName) {
    super();
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName = "") {
    this.setFilterInitialValue();
    this.userTypeToken = "";
    this.activationTypeTokens =
      store.getters.generalSetting[modelName].activationTypeTokens || [];
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.userTypeToken = data.userTypeToken;
    } else {
      this.setInitialValue();
    }
  }
}

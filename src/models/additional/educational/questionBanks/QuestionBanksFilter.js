import BaseEntityModelFilter from "./../../../general/BaseEntityModelFilter";
import store from "./../../../../store";

export default class QuestionBanksFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.QuestionBank.activationTypeTokens || [];

    // this.userToken = "";
    this.questionBankTitleToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.questionBankTitleToken = data.questionBankTitleToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}

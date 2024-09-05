import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
// import store from "./../../store";

export default class UserWalletTransactionsFilter extends BaseEntityModelFilter {
  constructor(modelName) {
    super();
    this.setInitialValue(modelName);
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.userInfoDataInclude = true;
    this.userTypeToken = "";
    this.userWalletTransactionTypeToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.userInfoDataInclude = data.userInfoDataInclude ?? true;
      this.userTypeToken = data.userTypeToken ?? "";
      this.userWalletTransactionTypeToken =
        data.userWalletTransactionTypeToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}

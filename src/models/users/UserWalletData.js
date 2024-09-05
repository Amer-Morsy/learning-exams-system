export default class UserWalletData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userWalletTransactionTotalCount = 0;
    this.userWalletTransactionChargeBalanceCount = 0;
    this.userWalletTransactionWithdrawalBalanceCount = 0;
    this.userWalletTransactionBuyCount = 0;
    this.userWalletBalance = 0;
    this.userWalletBalanceText = "";
    this.userWalletBalanceWithCurrency = "";
    this.userWalletDebt = 0;
    this.userWalletDebtText = "";
    this.userWalletDebtWithCurrency = "";
    this.userWalletBuy = 0;
    this.userWalletBuyText = "";
    this.userWalletBuyWithCurrency = "";
  }
  fillData(data) {
    if (data) {
      this.userWalletTransactionTotalCount =
        data.userWalletTransactionTotalCount ?? 0;
      this.userWalletTransactionChargeBalanceCount =
        data.userWalletTransactionChargeBalanceCount ?? 0;
      this.userWalletTransactionWithdrawalBalanceCount =
        data.userWalletTransactionWithdrawalBalanceCount ?? 0;
      this.userWalletTransactionBuyCount =
        data.userWalletTransactionBuyCount ?? 0;
      this.userWalletBalance = data.userWalletBalance ?? 0;
      this.userWalletBalanceText = data.userWalletBalanceText ?? "";
      this.userWalletBalanceWithCurrency =
        data.userWalletBalanceWithCurrency ?? "";
      this.userWalletDebt = data.userWalletDebt ?? 0;
      this.userWalletDebtText = data.userWalletDebtText ?? "";
      this.userWalletDebtWithCurrency = data.userWalletDebtWithCurrency ?? "";
      this.userWalletBuy = data.userWalletBuy ?? 0;
      this.userWalletBuyText = data.userWalletBuyText ?? "";
      this.userWalletBuyWithCurrency = data.userWalletBuyWithCurrency ?? "";
    } else {
      this.setInitialValue();
    }
  }
}

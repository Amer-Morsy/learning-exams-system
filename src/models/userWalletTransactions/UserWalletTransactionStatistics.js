export default class UserWalletTransactionStatistics {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalDepositCount = 0;
    this.totalWithdrawCount = 0;
    this.totalDepositMoney = 0;
    this.totalDepositMoneyWithCurrency = "";
    this.totalDepositMoneyText = "";
    this.totalWithdrawMoney = 0;
    this.totalWithdrawMoneyWithCurrency = "";
    this.totalWithdrawMoneyText = "";
    this.depositCountPercentage = 0;
    this.depositCountPercentageText = "";
    this.withdrawCountPercentage = 0;
    this.withdrawCountPercentageText = "";
    this.totalCount = 0;
    this.totalActiveCount = 0;
    this.totalBlockedCount = 0;
    this.totalActivePercentage = 0;
    this.totalActivePercentageText = "";
    this.totalBlockedPercentage = 0;
    this.totalBlockedPercentageText = "";
  }
  fillData(data) {
    if (data) {
      this.totalDepositCount = data.totalDepositCount ?? 0;
      this.totalWithdrawCount = data.totalWithdrawCount ?? 0;
      this.totalDepositMoney = data.totalDepositMoney ?? 0;
      this.totalDepositMoneyWithCurrency =
        data.totalDepositMoneyWithCurrency ?? "";
      this.totalDepositMoneyText = data.totalDepositMoneyText ?? "";
      this.totalWithdrawMoney = data.totalWithdrawMoney ?? 0;
      this.totalWithdrawMoneyWithCurrency =
        data.totalWithdrawMoneyWithCurrency ?? "";
      this.totalWithdrawMoneyText = data.totalWithdrawMoneyText ?? "";
      this.depositCountPercentage = data.depositCountPercentage ?? 0;
      this.depositCountPercentageText = data.depositCountPercentageText ?? "";
      this.withdrawCountPercentage = data.withdrawCountPercentage ?? 0;
      this.withdrawCountPercentageText = data.withdrawCountPercentageText ?? "";
      this.totalCount = data.totalCount ?? 0;
      this.totalActiveCount = data.totalActiveCount ?? 0;
      this.totalBlockedCount = data.totalBlockedCount ?? 0;
      this.totalActivePercentage = data.totalActivePercentage ?? 0;
      this.totalActivePercentageText = data.totalActivePercentageText ?? "";
      this.totalBlockedPercentage = data.totalBlockedPercentage ?? 0;
      this.totalBlockedPercentageText = data.totalBlockedPercentageText ?? "";
    } else {
      this.setInitialValue();
    }
  }
}

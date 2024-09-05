import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/UserWalletTransactions.svg";
import UserInfoData from "./../users/UserInfoData";

export default class UserWalletTransaction extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue(
    userToken = "",
    userTypeToken = "",
    userWalletTransactionTypeToken = ""
  ) {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.userWalletTransactionToken = "";
    this.userWalletTransactionValue = 0;
    this.userWalletTransactionValueWithCurreny = "";
    this.userWalletTransactionValueText = "";
    this.userWalletTransactionTypeToken = userWalletTransactionTypeToken;
    this.userWalletTransactionTypeNameCurrent = "";
    this.userWalletTransactionMethodToken = "";
    this.userWalletTransactionMethodNameCurrent = "";
    this.userWalletTransactionImageIsDefault = false;
    this.userWalletTransactionImagePath = "";
    this.userWalletTransactionImageSizeBytes = 0;
    this.userWalletTransactionImageSizeTextCurrent = "";
    this.userWalletTransactionNotes = "";
    this.userToken = userToken;
    this.userTypeToken = userTypeToken;
    this.userInfoData = new UserInfoData();
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = data.mediaFile ?? "";
      this.userWalletTransactionToken = data.userWalletTransactionToken ?? "";
      this.userWalletTransactionValue = data.userWalletTransactionValue ?? 0;
      this.userWalletTransactionValueWithCurreny =
        data.userWalletTransactionValueWithCurreny ?? "";
      this.userWalletTransactionValueText =
        data.userWalletTransactionValueText ?? "";
      this.userWalletTransactionTypeToken =
        data.userWalletTransactionTypeToken ?? "";
      this.userWalletTransactionTypeNameCurrent =
        data.userWalletTransactionTypeNameCurrent ?? "";
      this.userWalletTransactionMethodToken =
        data.userWalletTransactionMethodToken ?? "";
      this.userWalletTransactionMethodNameCurrent =
        data.userWalletTransactionMethodNameCurrent ?? "";
      this.userWalletTransactionImageIsDefault =
        data.userWalletTransactionImageIsDefault ?? false;
      this.userWalletTransactionImagePath =
        data.userWalletTransactionImagePath ?? "";
      this.userWalletTransactionImageSizeBytes =
        data.userWalletTransactionImageSizeBytes ?? 0;
      this.userWalletTransactionImageSizeTextCurrent =
        data.userWalletTransactionImageSizeTextCurrent ?? "";
      this.userWalletTransactionNotes = data.userWalletTransactionNotes ?? "";
      this.userToken = data.userToken ?? "";
      this.userTypeToken = data.userTypeToken ?? "";
      this.userInfoData.fillData(data.userInfoData);
    } else {
      this.setInitialValue();
    }
  }
}

import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/users.svg";
import UserProfile from "./UserProfile";
import UserStoragesSetting from "./UserStoragesSetting";

export default class User extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }

  setInitialValue(userTypeToken = "") {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.userToken = "";
    this.userNameCurrent = "";
    this.userNameAr = "";
    this.userNameEn = "";
    this.userNameUnd = "";
    this.userPassword = "";
    this.userPhoneCountryCode = "";
    this.userPhoneCountryCodeName = "";
    this.userPhone = "";
    this.userPhoneWithCC = "";
    this.userEmail = "";
    this.userName = "";
    this.userTypeToken = userTypeToken;
    this.userTypeNameCurrent = "";
    this.userImagePath = "";
    this.userImageIsDefault = false;
    this.userImageSizeBytes = 0;
    this.userImageSizeTextCurrent = "";
    this.userWalletBalance = 0;
    this.userWalletBalanceText = "";
    this.userWalletBalanceWithCurrency = "";
    this.lecturerPercentage = 75;
    this.lecturerPercentageText = "";
    this.userProfileData = new UserProfile();
    this.userStoragesSetting = new UserStoragesSetting();
    this.userEducationalBanneds = [];
    this.userEducationalInterests = [];
    this.establishmentRoleToken = "";
    this.establishmentRoleData = null;
    this.usersTokens = [];
  }

  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.userToken = data.userToken ?? "";
      this.userNameCurrent = data.userNameCurrent ?? "";
      this.userNameAr = data.userNameAr ?? "";
      this.userNameEn = data.userNameEn ?? "";
      this.userNameUnd = data.userNameUnd ?? "";
      this.userPassword = data.userPassword ?? "";
      this.userPhoneCountryCode = data.userPhoneCountryCode ?? "";
      this.userPhoneCountryCodeName = data.userPhoneCountryCodeName ?? "";
      this.userPhone = data.userPhone ?? "";
      this.userPhoneWithCC = data.userPhoneWithCC ?? "";
      this.userEmail = data.userEmail ?? "";
      this.userName = data.userName ?? "";
      this.userTypeToken = data.userTypeToken ?? "";
      this.userTypeNameCurrent = data.userTypeNameCurrent ?? "";
      this.userImagePath = data.userImagePath ?? "";
      this.userImageIsDefault = data.userImageIsDefault ?? false;
      this.userImageSizeBytes = data.userImageSizeBytes ?? 0;
      this.userImageSizeTextCurrent = data.userImageSizeTextCurrent ?? "";
      this.userEducationalBanneds = data.userEducationalBanneds ?? [];
      this.userEducationalInterests = data.userEducationalInterests ?? [];
      this.usersTokens = data.usersTokens ?? [];
      this.establishmentRoleToken = data.establishmentRoleToken ?? "";
      this.establishmentRoleData = data.establishmentRoleData ?? null;
      this.userWalletBalance = data.userWalletBalance ?? 0;
      this.userWalletBalanceText = data.userWalletBalanceText ?? "";
      this.userWalletBalanceWithCurrency =
        data.userWalletBalanceWithCurrency ?? "";
      this.lecturerPercentage = data.lecturerPercentage ?? 75;
      this.lecturerPercentageText = data.lecturerPercentageText ?? "";
      this.userProfileData.fillData(data.userProfileData);
      this.userStoragesSetting.fillData(data.userStoragesSetting);
    } else {
      // comment
      this.setInitialValue();
    }
  }
}
//#endregion model

import BaseEntityModel from "./../general/BaseEntityModel";
import defaultImg from "@/assets/images/UserLoginCodes.svg";
import UserInfoData from "./../users/UserInfoData";

export default class UserLoginCode extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue(userTypeToken = "", userToken = "") {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.userLoginCodeToken = "";
    this.userLoginCodeNameCurrent = "";
    this.userLoginCodeNameAr = "";
    this.userLoginCodeNameEn = "";
    this.userLoginCodeNameUnd = "";
    this.userLoginCodeDescriptionCurrent = "";
    this.userLoginCodeDescriptionAr = "";
    this.userLoginCodeDescriptionEn = "";
    this.userLoginCodeDescriptionUnd = "";
    this.userLoginCodePlatFromToken = "";
    this.codeIsActiveUnTileUserSignOut = false;
    this.resetForAllPlatFrom = true;
    this.userLoginCodePlatFromNameCurrent = "";
    this.codeActiveFromDateTime = "";
    this.codeActiveFromDateTimeCustomized = "";
    this.codeActiveFromDate = "";
    this.codeActiveFromTime = "";
    this.codeActiveToDateTime = "";
    this.codeActiveToDateTimeCustomized = "";
    this.codeActiveToDate = "";
    this.codeActiveToTime = "";
    this.codeActiveDurationCurrent = "";
    this.loginCode = "";
    this.loginCodeIsUsedStatus = "";
    this.loginCodeUsedInDateTime = "";
    this.loginCodeUsedInDateTimeCustomized = "";
    this.loginCodeUsedInDate = "";
    this.loginCodeUsedInTime = "";
    this.loginCodeIsExpiredStatus = "";
    this.userLoginCodeNotes = "";
    this.userLoginCodeImagePath = "";
    this.userLoginCodeImageIsDefault = "";
    this.userLoginCodeImageSizeBytes = "";
    this.userLoginCodeImageSizeTextCurrent = "";
    this.userToken = userToken || "";
    this.userInfoData = new UserInfoData();
    this.userTypeToken = userTypeToken || "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = data.mediaFile ?? "";
      this.userLoginCodeToken = data.userLoginCodeToken ?? "";
      this.userLoginCodeNameCurrent = data.userLoginCodeNameCurrent ?? "";
      this.userLoginCodeNameAr = data.userLoginCodeNameAr ?? "";
      this.userLoginCodeNameEn = data.userLoginCodeNameEn ?? "";
      this.userLoginCodeNameUnd = data.userLoginCodeNameUnd ?? "";
      this.userLoginCodeDescriptionCurrent =
        data.userLoginCodeDescriptionCurrent ?? "";
      this.userLoginCodeDescriptionAr = data.userLoginCodeDescriptionAr ?? "";
      this.userLoginCodeDescriptionEn = data.userLoginCodeDescriptionEn ?? "";
      this.userLoginCodeDescriptionUnd = data.userLoginCodeDescriptionUnd ?? "";
      this.userLoginCodePlatFromToken = data.userLoginCodePlatFromToken ?? "";
      this.codeIsActiveUnTileUserSignOut =
        data.codeIsActiveUnTileUserSignOut ?? false;
      this.resetForAllPlatFrom = data.resetForAllPlatFrom ?? true;
      this.userLoginCodePlatFromNameCurrent =
        data.userLoginCodePlatFromNameCurrent ?? "";
      this.codeActiveFromDateTime = data.codeActiveFromDateTime ?? "";
      this.codeActiveFromDateTimeCustomized =
        data.codeActiveFromDateTimeCustomized ?? "";
      this.codeActiveFromDate = data.codeActiveFromDate ?? "";
      this.codeActiveFromTime = data.codeActiveFromTime ?? "";
      this.codeActiveToDateTime = data.codeActiveToDateTime ?? "";
      this.codeActiveToDateTimeCustomized =
        data.codeActiveToDateTimeCustomized ?? "";
      this.codeActiveToDate = data.codeActiveToDate ?? "";
      this.codeActiveToTime = data.codeActiveToTime ?? "";
      this.codeActiveDurationCurrent = data.codeActiveDurationCurrent ?? "";
      this.loginCode = data.loginCode ?? "";
      this.loginCodeIsUsedStatus = data.loginCodeIsUsedStatus ?? "";
      this.loginCodeUsedInDateTime = data.loginCodeUsedInDateTime ?? "";
      this.loginCodeUsedInDateTimeCustomized =
        data.loginCodeUsedInDateTimeCustomized ?? "";
      this.loginCodeUsedInDate = data.loginCodeUsedInDate ?? "";
      this.loginCodeUsedInTime = data.loginCodeUsedInTime ?? "";
      this.loginCodeIsExpiredStatus = data.loginCodeIsExpiredStatus ?? "";
      this.userLoginCodeNotes = data.userLoginCodeNotes ?? "";
      this.userLoginCodeImagePath = data.userLoginCodeImagePath ?? "";
      this.userLoginCodeImageIsDefault = data.userLoginCodeImageIsDefault ?? "";
      this.userLoginCodeImageSizeBytes = data.userLoginCodeImageSizeBytes ?? "";
      this.userLoginCodeImageSizeTextCurrent =
        data.userLoginCodeImageSizeTextCurrent ?? "";
      this.userToken = data.userToken ?? "";
      this.userInfoData.fillData(data.userInfoData);
      this.userTypeToken =
        data.userTypeToken ?? data.userInfoData.userTypeToken;
    } else {
      this.setInitialValue();
    }
  }
}

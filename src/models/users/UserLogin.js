import {
  // checkPrivilege,
  getLanguage,
  getDeviceName,
  getBrowserName,
} from "./../../utils/functions";
import {
  ESTABLISHMENT_TOKEN,
  USER_PLATFORM_SESSION_VERSION_NUMBER,
  // DEFAULT_PAGES,
  // STATUS,
} from "./../../utils/constants";

export default class UserLogin {
  //#region UserLogin
  USER_PLATFORM_SESSION = {
    userPlatFormSessionVersionNumber: USER_PLATFORM_SESSION_VERSION_NUMBER,
    userPlatFormSessionLocalIP: "",
    userPlatFormSessionGlobalIP: "",
    userPlatFormSessionAddress: "",
    userPlatFormSessionLat: "",
    userPlatFormSessionLong: "",
    userPlatFormToken: "PFT-3",
    userFirebaseToken: "userFirebaseToken",
  };
  USER_DEVICE = {
    userDeviceUniqueCode: "WEB",
    userDeviceId: "",
    userDeviceName: "Unkonwn",
    userDeviceCompany: "",
    userDeviceOS: "",
    userDeviceVersionOS: getBrowserName() + " " + getDeviceName(),
    userDeviceEMUI: "",
    userDeviceRam: "",
    userDeviceProcessor: "",
    userDeviceDisplay: "",
    userDeviceDescription: "",
    userDeviceNotes: "",
  };
  USER_APP_SETTING = {
    languageToken: getLanguage(),
    themeToken: "",
    decimalFormatToken: "",
    timeZoneToken: "Egypt Standard Time",
    dateFormatToken: "dddd, dd MMMM yyyy",
    timeFormatToken: "hh:mm:ss tt",
    currencyToken: "EGP",
    printCodeTypeToken: "",
    startDayOfWeekToken: "",
    startMonthOfYear: 0,
    startDayOfMonth: 0,
    backAfterAddStatus: true,
    backAfterEditStatus: true,
    receiveNotificationStatus: true,
    customSettings: "",
  };
  //#endregion UserLogin

  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.user = "";
    this.userPassword = "User@1234";
    this.establishmentToken = ESTABLISHMENT_TOKEN;
    this.userPlatformSessionData = this.USER_PLATFORM_SESSION;
    this.userDeviceData = this.USER_DEVICE;
    this.userAppSettingData = this.USER_APP_SETTING;
    // this.phoneOrEmail = ""; //added by me
    // this.otpNum = ""; //added by me
  }
  fillData(data) {
    if (data) {
      this.language = data.language;
      this.user = data.user ?? "";
      this.userPassword = data.userPassword ?? "";
      this.establishmentToken = data.establishmentToken ?? ESTABLISHMENT_TOKEN;
      this.userPlatformSessionData =
        data.userPlatformSessionData ?? this.USER_PLATFORM_SESSION;
      this.userDeviceData = data.userDeviceData ?? this.USER_DEVICE;
      this.userAppSettingData =
        data.userAppSettingData ?? this.USER_APP_SETTING;
    } else {
      this.setInitialValue();
    }
  }
}

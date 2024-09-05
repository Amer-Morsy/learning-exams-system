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
import { USER_TYPE } from "./../../utils/constantLists";

export default class UserSignUp {
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
    this.userData = {
      userTypeToken: USER_TYPE.Teacher,
      lecturerPercentage: 75,
      userNameAr: "",
      userNameEn: "",
      userPassword: "",
      userPhoneCountryCode: "",
      userPhoneCountryCodeName: "",
      userPhone: "",
      userEmail: "",
      userName: "",
    };
    this.establishmentToken = ESTABLISHMENT_TOKEN;
    this.userPlatformSessionData = this.USER_PLATFORM_SESSION;
    this.userDeviceData = this.USER_DEVICE;
    this.userAppSettingData = this.USER_APP_SETTING;
  }
  fillData(data) {
    if (data) {
      // this.language = data.language;
      this.userData = data.userData ?? "";
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

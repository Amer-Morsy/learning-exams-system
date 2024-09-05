import BaseEntityModelFilter from "./../general/BaseEntityModelFilter";
import store from "./../../store";
// import { getLanguage } from "./../../utils/functions";
// import { LANGUAGES } from "./../../utils/constants";
// import i18n from "./../../i18n";

// let language = getLanguage();
export default class UsersFilter extends BaseEntityModelFilter {
  constructor(modelName) {
    super();
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName = "") {
    // switch (language) {
    //   case LANGUAGES.arEG:
    //     this.itemName = `${i18n.t("code")}: {fullCode} - ${i18n.t(
    //       "name"
    //     )}: {userNameAr}`;
    //     break;
    //   case LANGUAGES.enUS:
    //     this.itemName = `${i18n.t("code")}: {fullCode} - ${i18n.t(
    //       "name"
    //     )}: {userNameEn}`;
    //     break;
    // }

    try {
      this.activationTypeTokens =
        store.getters.generalSetting[modelName].activationTypeTokens;
    } catch (error) {
      this.activationTypeTokens = [];
    }

    this.userTypeToken = "";
    this.userToken = "";
    this.sendTo = "";
    this.dateTimeStartSearch = "";
    this.dateTimeEndSearch = "";
    this.userNotApproved = false;
    this.establishmentRoleDataInclude = false;
    this.userProfileDataInclude = true;
    this.userStoragesSettingDataInclude = false;
    this.userEducationalInterestsDataInclude = false;
    this.userLocalJobToken = "";
    this.userGenderToken = "";
    this.userReligionToken = "";
    this.userEducationalInterestToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.userTypeToken = data.userTypeToken ?? "";
      this.userToken = data.userToken ?? "";
      this.sendTo = data.sendTo ?? "";
      this.dateTimeStartSearch = data.dateTimeStartSearch ?? "";
      this.dateTimeEndSearch = data.dateTimeEndSearch ?? "";
      this.userNotApproved = data.userNotApproved ?? false;
      this.establishmentRoleDataInclude =
        data.establishmentRoleDataInclude ?? false;
      this.userProfileDataInclude = data.userProfileDataInclude ?? true;
      this.userStoragesSettingDataInclude =
        data.userStoragesSettingDataInclude ?? false;
      this.userEducationalInterestsDataInclude =
        data.userEducationalInterestsDataInclude ?? false;
      this.userLocalJobToken = data.userLocalJobToken ?? "";
      this.userGenderToken = data.userGenderToken ?? "";
      this.userReligionToken = data.userReligionToken ?? "";
      this.userEducationalInterestToken =
        data.userEducationalInterestToken ?? "";
      // } else {
      //   this.setInitialValue();
    }
  }
}

export default class UserProfile {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userGeneralNotes = "";
    this.userGenderToken = "";
    this.userGenderNameCurrent = "";
    this.userReligionToken = "";
    this.userReligionNameCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.userGeneralNotes = data.userGeneralNotes ?? "";
      this.userGenderToken = data.userGenderToken ?? "";
      this.userGenderNameCurrent = data.userGenderNameCurrent ?? "";
      this.userReligionToken = data.userReligionToken ?? "";
      this.userReligionNameCurrent = data.userReligionNameCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}

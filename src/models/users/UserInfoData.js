export default class UserInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.userToken = "";
    this.userNameCurrent = "";
    this.fullCode = "";
    this.userPhoneWithCC = "";
    this.userImagePath = "";
    this.userTypeToken = "";
    this.userTypeNameCurrent = "";
    this.userJobGradeToken = "";
    this.userJobGradeNameCurrent = "";
    this.userJobGradeImagePath = "";
  }
  fillData(data) {
    if (data) {
      this.userToken = data.userToken ?? "";
      this.userNameCurrent = data.userNameCurrent ?? "";
      this.fullCode = data.fullCode ?? "";
      this.userPhoneWithCC = data.userPhoneWithCC ?? "";
      this.userImagePath = data.userImagePath ?? "";
      this.userTypeToken = data.userTypeToken ?? "";
      this.userTypeNameCurrent = data.userTypeNameCurrent ?? "";
      this.userJobGradeToken = data.userJobGradeToken ?? "";
      this.userJobGradeNameCurrent = data.userJobGradeNameCurrent ?? "";
      this.userJobGradeImagePath = data.userJobGradeImagePath ?? "";
    } else {
      this.setInitialValue();
    }
  }
}

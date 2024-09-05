export default class GeneralDelete {
  constructor() {
    this.setGeneralDeleteInitialValue();
  }
  setGeneralDeleteInitialValue() {
    this.token = "";
    this.activationTypeToken = "";
  }
  fillGeneralDeleteData(data) {
    this.token = data.token || "";
    this.activationTypeToken = data.activationTypeToken || "";
  }
  fillData(data) {
    this.fillGeneralDeleteData(data);
  }
}

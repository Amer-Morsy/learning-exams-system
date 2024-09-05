export default class GeneralModelResponse {
  constructor() {}
  setGeneralModelResponseInitialValue() {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
  }
  fillGeneralModelResponseData(data) {
    if (data) {
      this.status = data.status || 0;
      this.msg = data.msg || "";
      this.listSort = data.listSort || [];
    } else {
      this.setGeneralModelResponseInitialValue();
    }
  }
}

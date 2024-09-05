import GeneralModelResponse from "./GeneralModelResponse";
import ActivationStatistics from "./ActivationStatistics";

export default class GeneralModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setGeneralModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.activationStatistics = new ActivationStatistics();
  }
  fillGeneralModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.activationStatistics.fillData(data.activationStatistics);
    } else {
      this.setGeneralModelInitialValue();
    }
  }
}

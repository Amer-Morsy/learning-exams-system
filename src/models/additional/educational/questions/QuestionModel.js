import GeneralModelResponse from "./../../../general/GeneralModelResponse";
import QuestionStatistics from "./QuestionStatistics";

export default class QuestionModel extends GeneralModelResponse {
  constructor() {
    super();
  }
  setQuestionModelInitialValue() {
    this.setGeneralModelResponseInitialValue();
    this.activationStatistics = new QuestionStatistics();
  }
  fillQuestionModelData(data) {
    if (data) {
      this.fillGeneralModelResponseData(data);
      this.activationStatistics.fillData(data.questionsStatistics);
    } else {
      this.setQuestionModelInitialValue();
    }
  }
}

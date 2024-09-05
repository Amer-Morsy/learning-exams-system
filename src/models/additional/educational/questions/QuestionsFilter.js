import BaseEntityModelFilter from "./../../../general/BaseEntityModelFilter";
import store from "./../../../../store";

export default class QuestionsFilter extends BaseEntityModelFilter {
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setFilterInitialValue();
    this.activationTypeTokens =
      store.getters.generalSetting.Question.activationTypeTokens || [];
    this.questionToken = "";
    this.questionTypeToken = "";
    this.questionBankTitleToken = "";
    this.questionBankToken = "";
    this.questionParagraphToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillFilterData(data);
      this.questionToken = data.questionToken ?? "";
      this.questionTypeToken = data.questionTypeToken ?? "";
      this.questionBankTitleToken = data.questionBankTitleToken ?? "";
      this.questionBankToken = data.questionBankToken ?? "";
      this.questionParagraphToken = data.questionParagraphToken ?? "";
    } else {
      this.setInitialValue();
    }
  }
}

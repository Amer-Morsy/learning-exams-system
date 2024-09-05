import ItemMcqQuestionAnswer from "./ItemMcqQuestionAnswer";

export default class McqQuestionAnswer {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.chooseOneCorrectAnswerStatus = true; //fixed
    this.chooseMultipleCorrectAnswerStatus = false; //fixed
    this.questionMCQAnswerData = [new ItemMcqQuestionAnswer()];
  }
  fillData(data) {
    if (data) {
      this.questionMCQAnswerData = data.questionMCQAnswerData ?? [
        new ItemMcqQuestionAnswer(),
      ];
    } else {
      this.setInitialValue();
    }
  }
}

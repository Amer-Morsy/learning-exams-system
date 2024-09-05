export default class ItemMcqQuestionAnswer {
  constructor(answerSortName) {
    this.setInitialValue(answerSortName);
  }
  setInitialValue(answerSortName = 1) {
    this.answerSortName = answerSortName; //fixed auto itratable
    this.answerText = "";
    this.answerIsTrue = false;
  }
  fillData(data) {
    if (data) {
      this.answerSortName = data.answerSortName ?? 1; //fixed auto itratable
      this.answerText = data.answerText ?? "";
      this.answerIsTrue = data.answerIsTrue ?? false;
    } else {
      this.setInitialValue();
    }
  }
}

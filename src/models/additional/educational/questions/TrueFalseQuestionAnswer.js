export default class TrueFalseQuestionAnswer {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.questionAnswer = false;
  }
  fillData(data) {
    if (data) {
      this.questionAnswer = data.questionAnswer ?? false;
    } else {
      this.setInitialValue();
    }
  }
}

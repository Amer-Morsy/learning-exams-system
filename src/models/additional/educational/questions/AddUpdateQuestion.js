import TrueFalseQuestionAnswer from "./TrueFalseQuestionAnswer";
import defaultImg from "@/assets/images/question.svg";
import McqQuestionAnswer from "./McqQuestionAnswer";

export default class AddUpdateQuestion {
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.mediaFile = "";
    this.questionDescription_Media = "";
    this.questionAnswerA_Media = "";
    this.questionAnswerB_Media = "";
    this.questionAnswerC_Media = "";
    this.questionAnswerD_Media = "";
    this.questionToken = "";
    this.questionMediaIsDefoultImage = false;
    this.questionMediaPath = "";
    this.questionDescription_MediaPath = "";
    this.questionAnswerA_MediaPath = "";
    this.questionAnswerB_MediaPath = "";
    this.questionAnswerC_MediaPath = "";
    this.questionAnswerD_MediaPath = "";
    this.questionTitle = "";
    this.questionDescription_HTML = "";
    this.questionTypeToken = "";
    this.questionBankToken = "";
    this.questionParagraphToken = "";
    this.questionAnswerDescription_HTML = "";
    this.trueFalseQuestionData = new TrueFalseQuestionAnswer();
    this.mCQQuestionData = new McqQuestionAnswer();
  }
  fillData(data) {
    if (data) {
      this.mediaFile = "";
      this.questionDescription_Media = "";
      this.questionAnswerA_Media = "";
      this.questionAnswerB_Media = "";
      this.questionAnswerC_Media = "";
      this.questionAnswerD_Media = "";
      this.questionToken = data.questionToken ?? "";
      this.questionMediaIsDefoultImage =
        data.questionMediaIsDefoultImage ?? false;
      this.questionMediaPath = data.questionMediaPath ?? "";
      this.questionDescription_MediaPath = data.questionDescription_MediaPath ?? "";
      this.questionAnswerA_MediaPath = data.questionAnswerA_MediaPath ?? "";
      this.questionAnswerB_MediaPath = data.questionAnswerB_MediaPath ?? "";
      this.questionAnswerC_MediaPath = data.questionAnswerC_MediaPath ?? "";
      this.questionAnswerD_MediaPath = data.questionAnswerD_MediaPath ?? "";
      this.questionTitle = data.questionTitle ?? "";
      this.questionDescription_HTML = data.questionDescription_HTML ?? "";
      this.questionTypeToken = data.questionTypeToken ?? "";
      this.questionBankToken = data.questionBankToken ?? "";
      this.questionParagraphToken = data.questionParagraphToken ?? "";
      this.questionAnswerDescription_HTML =
        data.questionAnswerDescription_HTML ?? "";
      this.trueFalseQuestionData.fillData(data.trueFalseQuestionData);
      this.mCQQuestionData.fillData(data.mCQQuestionData);
    } else {
      this.setInitialValue();
    }
  }
}

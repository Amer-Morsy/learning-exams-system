import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/question.svg";
import TrueFalseQuestionAnswer from "./TrueFalseQuestionAnswer";
import McqQuestionAnswer from "./McqQuestionAnswer";

export default class Question extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.questionDescription_Media = "";
    this.questionAnswerA_Media = "";
    this.questionAnswerB_Media = "";
    this.questionAnswerC_Media = "";
    this.questionAnswerD_Media = "";
    this.questionToken = "";
    this.questionTitle = "";
    this.questionDescription_HTML = "";
    this.questionTypeToken = "";
    this.questionTypeNameCurrent = "";
    this.questionMediaIsDefoultImage = false;
    this.questionMediaTypeToken = "";
    this.questionMediaTypeNameCurrent = "";
    this.questionMediaFileName = "";
    this.questionMediaPath = "";
    this.questionDescription_MediaPath = "";
    this.questionAnswerA_MediaPath = "";
    this.questionAnswerB_MediaPath = "";
    this.questionAnswerC_MediaPath = "";
    this.questionAnswerD_MediaPath = "";
    this.questionMediaSizeBytes = 0;
    this.questionMediaSizeTextCurrent = "";
    this.questionIsHaveAnswerDescriptionStatus = false;
    this.questionAnswerDescription_HTML = "";
    this.ownerUserToken = "";
    this.questionBankToken = "";
    this.questionBankInfoData = null;
    this.questionParagraphToken = "";
    this.questionParagraphInfoData = null;
    this.trueFalseQuestionData = new TrueFalseQuestionAnswer();
    this.mCQQuestionData = new McqQuestionAnswer();
    // added to help
    this.mainQuestionBankTitleToken = "";
    this.mainQuestionBankToken = "";
    this.mainQuestionParagraphToken = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.questionDescription_Media = "";
      this.questionAnswerA_Media = "";
      this.questionAnswerB_Media = "";
      this.questionAnswerC_Media = "";
      this.questionAnswerD_Media = "";
      this.questionToken = data.questionToken ?? "";
      this.questionTitle = data.questionTitle ?? "";
      this.questionDescription_HTML = data.questionDescription_HTML ?? "";
      this.questionTypeToken = data.questionTypeToken ?? "";
      this.questionTypeNameCurrent = data.questionTypeNameCurrent ?? "";
      this.questionMediaIsDefoultImage =
        data.questionMediaIsDefoultImage ?? false;
      this.questionMediaTypeToken = data.questionMediaTypeToken ?? "";
      this.questionMediaTypeNameCurrent =
        data.questionMediaTypeNameCurrent ?? "";
      this.questionMediaFileName = data.questionMediaFileName ?? "";
      this.questionMediaPath = data.questionMediaPath ?? "";
      this.questionDescription_MediaPath =
        data.questionDescription_MediaPath ?? "";
      this.questionAnswerA_MediaPath = data.questionAnswerA_MediaPath ?? "";
      this.questionAnswerB_MediaPath = data.questionAnswerB_MediaPath ?? "";
      this.questionAnswerC_MediaPath = data.questionAnswerC_MediaPath ?? "";
      this.questionAnswerD_MediaPath = data.questionAnswerD_MediaPath ?? "";
      this.questionMediaSizeBytes = data.questionMediaSizeBytes ?? 0;
      this.questionMediaSizeTextCurrent =
        data.questionMediaSizeTextCurrent ?? "";
      this.questionIsHaveAnswerDescriptionStatus =
        data.questionIsHaveAnswerDescriptionStatus ?? false;
      this.questionAnswerDescription_HTML =
        data.questionAnswerDescription_HTML ?? "";
      this.ownerUserToken = data.ownerUserToken ?? "";
      this.questionBankToken = data.questionBankToken ?? "";
      this.questionBankInfoData = data.questionBankInfoData ?? null;
      this.questionParagraphToken = data.questionParagraphToken ?? "";
      this.questionParagraphInfoData = data.questionParagraphInfoData ?? null;
      this.trueFalseQuestionData.fillData(data.trueFalseQuestionData);
      this.mCQQuestionData.fillData(data.mCQQuestionData);
    } else {
      this.setInitialValue();
    }
  }
}

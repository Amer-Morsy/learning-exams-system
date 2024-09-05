import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/questionParagraph.svg";

export default class QuestionParagraph extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.questionParagraphToken = "";
    this.questionParagraphTitle = "";
    this.questionParagraphDescription_HTML = "";
    this.questionParagraphNotes = "";
    this.questionParagraphImageIsDefault = false;
    this.questionParagraphImagePath = "";
    this.questionParagraphImageSizeBytes = 0;
    this.questionParagraphImageSizeTextCurrent = "";
    this.questionBankTitleToken = "";
    this.questionBankTitleInfoData = null;
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.questionParagraphToken = data.questionParagraphToken ?? "";
      this.questionParagraphTitle = data.questionParagraphTitle ?? "";
      this.questionParagraphDescription_HTML =
        data.questionParagraphDescription_HTML ?? "";
      this.questionParagraphNotes = data.questionParagraphNotes ?? "";
      this.questionParagraphImageIsDefault =
        data.questionParagraphImageIsDefault ?? false;
      this.questionParagraphImagePath = data.questionParagraphImagePath ?? "";
      this.questionParagraphImageSizeBytes =
        data.questionParagraphImageSizeBytes ?? 0;
      this.questionParagraphImageSizeTextCurrent =
        data.questionParagraphImageSizeTextCurrent ?? "";
      this.questionBankTitleToken = data.questionBankTitleToken ?? "";
      this.questionBankTitleInfoData = data.questionBankTitleInfoData ?? null;
    } else {
      this.setInitialValue();
    }
  }
}

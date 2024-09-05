import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/questionBank.svg";

export default class QuestionBank extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.questionBankToken = "";
    this.questionBankNameCurrent = "";
    this.questionBankNameAr = "";
    this.questionBankNameEn = "";
    this.questionBankNameUnd = "";
    this.questionBankDescriptionCurrent = "";
    this.questionBankDescriptionAr = "";
    this.questionBankDescriptionEn = "";
    this.questionBankDescriptionUnd = "";
    this.questionBankNotes = "";
    this.questionBankImageIsDefault = false;
    this.questionBankImagePath = "";
    this.questionBankImageSizeBytes = 0;
    this.questionBankImageSizeTextCurrent = "";
    this.questionBankTitleToken = "";
    this.questionBankTitleInfoData = null;
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.questionBankToken = data.questionBankToken ?? "";
      this.questionBankNameCurrent = data.questionBankNameCurrent ?? "";
      this.questionBankNameAr = data.questionBankNameAr ?? "";
      this.questionBankNameEn = data.questionBankNameEn ?? "";
      this.questionBankNameUnd = data.questionBankNameUnd ?? "";
      this.questionBankDescriptionCurrent =
        data.questionBankDescriptionCurrent ?? "";
      this.questionBankDescriptionAr = data.questionBankDescriptionAr ?? "";
      this.questionBankDescriptionEn = data.questionBankDescriptionEn ?? "";
      this.questionBankDescriptionUnd = data.questionBankDescriptionUnd ?? "";
      this.questionBankNotes = data.questionBankNotes ?? "";
      this.questionBankImageIsDefault =
        data.questionBankImageIsDefault ?? false;
      this.questionBankImagePath = data.questionBankImagePath ?? "";
      this.questionBankImageSizeBytes = data.questionBankImageSizeBytes ?? 0;
      this.questionBankImageSizeTextCurrent =
        data.questionBankImageSizeTextCurrent ?? "";
      this.questionBankTitleToken = data.questionBankTitleToken ?? "";
      this.questionBankTitleInfoData = data.questionBankTitleInfoData ?? null;
    } else {
      this.setInitialValue();
    }
  }
}

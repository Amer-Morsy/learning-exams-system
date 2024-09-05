import BaseEntityModel from "./../../../general/BaseEntityModel";
import defaultImg from "@/assets/images/questionBankTitle.svg";

export default class QuestionBankTitle extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue() {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.questionBankTitleToken = "";
    this.questionBankTitleNameCurrent = "";
    this.questionBankTitleNameAr = "";
    this.questionBankTitleNameEn = "";
    this.questionBankTitleNameUnd = "";
    this.questionBankTitleDescriptionCurrent = "";
    this.questionBankTitleDescriptionAr = "";
    this.questionBankTitleDescriptionEn = "";
    this.questionBankTitleDescriptionUnd = "";
    this.questionBankTitleNotes = "";
    this.questionBankTitleImageIsDefault = false;
    this.questionBankTitleImagePath = "";
    this.questionBankTitleImageSizeBytes = 0;
    this.questionBankTitleImageSizeTextCurrent = "";
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.questionBankTitleToken = data.questionBankTitleToken ?? "";
      this.questionBankTitleNameCurrent =
        data.questionBankTitleNameCurrent ?? "";
      this.questionBankTitleNameAr = data.questionBankTitleNameAr ?? "";
      this.questionBankTitleNameEn = data.questionBankTitleNameEn ?? "";
      this.questionBankTitleNameUnd = data.questionBankTitleNameUnd ?? "";
      this.questionBankTitleDescriptionCurrent =
        data.questionBankTitleDescriptionCurrent ?? "";
      this.questionBankTitleDescriptionAr =
        data.questionBankTitleDescriptionAr ?? "";
      this.questionBankTitleDescriptionEn =
        data.questionBankTitleDescriptionEn ?? "";
      this.questionBankTitleDescriptionUnd =
        data.questionBankTitleDescriptionUnd ?? "";
      this.questionBankTitleNotes = data.questionBankTitleNotes ?? "";
      this.questionBankTitleImageIsDefault =
        data.questionBankTitleImageIsDefault ?? false;
      this.questionBankTitleImagePath = data.questionBankTitleImagePath ?? "";
      this.questionBankTitleImageSizeBytes =
        data.questionBankTitleImageSizeBytes ?? 0;
      this.questionBankTitleImageSizeTextCurrent =
        data.questionBankTitleImageSizeTextCurrent ?? "";
    } else {
      this.setInitialValue();
    }
  }
}

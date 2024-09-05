import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/EducationalCategories.svg";

export default class EducationalCategory extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue(parentEducationalCategoryToken = "") {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.educationalCategoryToken = "";
    this.parentEducationalCategoryToken = parentEducationalCategoryToken;
    this.educationalCategoryNameCurrent = "";
    this.educationalCategoryNameAr = "";
    this.educationalCategoryNameEn = "";
    this.educationalCategoryNameUnd = "";
    this.educationalCategoryDescriptionCurrent = "";
    this.educationalCategoryDescriptionAr = "";
    this.educationalCategoryDescriptionEn = "";
    this.educationalCategoryDescriptionUnd = "";
    this.educationalCategoryNotes = "";
    this.educationalCategoryImageIsDefault = false;
    this.educationalCategoryImagePath = "";
    this.educationalCategoryImageSizeBytes = 0;
    this.educationalCategoryImageSizeTextCurrent = "";
    this.parentEducationalCategoryInfoData = null;
    this.mainRootToken = "";
    this.rankingUnderParent = 0;
    this.isHaveChildrenStatus = false;
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.parentEducationalCategoryToken =
        data.parentEducationalCategoryToken ?? "";
      this.educationalCategoryNameCurrent =
        data.educationalCategoryNameCurrent ?? "";
      this.educationalCategoryNameAr = data.educationalCategoryNameAr ?? "";
      this.educationalCategoryNameEn = data.educationalCategoryNameEn ?? "";
      this.educationalCategoryNameUnd = data.educationalCategoryNameUnd ?? "";
      this.educationalCategoryDescriptionCurrent =
        data.educationalCategoryDescriptionCurrent ?? "";
      this.educationalCategoryDescriptionAr =
        data.educationalCategoryDescriptionAr ?? "";
      this.educationalCategoryDescriptionEn =
        data.educationalCategoryDescriptionEn ?? "";
      this.educationalCategoryDescriptionUnd =
        data.educationalCategoryDescriptionUnd ?? "";
      this.educationalCategoryNotes = data.educationalCategoryNotes ?? "";
      this.educationalCategoryImageIsDefault =
        data.educationalCategoryImageIsDefault ?? false;
      this.educationalCategoryImagePath =
        data.educationalCategoryImagePath ?? "";
      this.educationalCategoryImageSizeBytes =
        data.educationalCategoryImageSizeBytes ?? 0;
      this.educationalCategoryImageSizeTextCurrent =
        data.educationalCategoryImageSizeTextCurrent ?? "";
      this.parentEducationalCategoryInfoData =
        data.parentEducationalCategoryInfoData ?? null;
      this.mainRootToken = data.mainRootToken ?? "";
      this.rankingUnderParent = data.rankingUnderParent ?? 0;
      this.isHaveChildrenStatus = data.isHaveChildrenStatus ?? false;
    } else {
      this.setInitialValue();
    }
  }
}

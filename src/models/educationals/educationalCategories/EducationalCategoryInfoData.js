export default class EducationalCategoryInfoData {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.fullCode = "";
    this.educationalCategoryToken = "";
    this.parentEducationalCategoryToken = "";
    this.educationalCategoryNameCurrent = "";
    this.educationalCategoryDescriptionCurrent = "";
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
      this.fullCode = data.fullCode ?? "";
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.parentEducationalCategoryToken =
        data.parentEducationalCategoryToken ?? "";
      this.educationalCategoryNameCurrent =
        data.educationalCategoryNameCurrent ?? "";
      this.educationalCategoryDescriptionCurrent =
        data.educationalCategoryDescriptionCurrent ?? "";
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

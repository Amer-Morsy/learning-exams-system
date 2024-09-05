import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/EducationalCourseLevels.svg";

export default class EducationalCourseLevel extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue(educationalCourseToken = "") {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.educationalCourseLevelToken = "";
    this.educationalCourseLevelNameCurrent = "";
    this.educationalCourseLevelNameAr = "";
    this.educationalCourseLevelNameEn = "";
    this.educationalCourseLevelNameUnd = "";
    this.educationalCourseLevelDescriptionCurrent = "";
    this.educationalCourseLevelDescriptionAr = "";
    this.educationalCourseLevelDescriptionEn = "";
    this.educationalCourseLevelDescriptionUnd = "";
    this.educationalCourseLevelFileIsDefault = false;
    this.educationalCourseLevelFilePath = "";
    this.educationalCourseLevelFileSizeBytes = 0;
    this.educationalCourseLevelFileSizeTextCurrent = "";
    this.educationalCourseLevelFileSizeTextAr = "";
    this.educationalCourseLevelFileSizeTextEn = "";
    this.educationalCourseLevelFileSizeTextUnd = "";
    this.educationalCourseLevelFileTypeToken = "";
    this.educationalCourseLevelFileTypeNameCurrent = "";
    this.educationalCourseLevelNotes = "";
    this.educationalCourseLevelSortNumber = 0;
    this.educationalCourseLevelIsFreezeStatus = false;
    this.educationalCourseLevelFreezeMessageCurrent = "";
    this.educationalCourseLevelFreezeMessageAr = "";
    this.educationalCourseLevelFreezeMessageEn = "";
    this.educationalCourseLevelFreezeMessageUnd = "";
    this.openSpecificTimeStatus = false;
    this.openInDateTime = "";
    this.openInDateTimeCustomized = "";
    this.openInDate = "";
    this.openInTime = "";
    this.openDurationCurrent = "";
    this.educationalCourseToken = educationalCourseToken;
    this.educationalCourseInfo = null;
    this.levelQuestionStatistics = null;
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.educationalCourseLevelToken = data.educationalCourseLevelToken ?? "";
      this.educationalCourseLevelNameCurrent =
        data.educationalCourseLevelNameCurrent ?? "";
      this.educationalCourseLevelNameAr =
        data.educationalCourseLevelNameAr ?? "";
      this.educationalCourseLevelNameEn =
        data.educationalCourseLevelNameEn ?? "";
      this.educationalCourseLevelNameUnd =
        data.educationalCourseLevelNameUnd ?? "";
      this.educationalCourseLevelDescriptionCurrent =
        data.educationalCourseLevelDescriptionCurrent ?? "";
      this.educationalCourseLevelDescriptionAr =
        data.educationalCourseLevelDescriptionAr ?? "";
      this.educationalCourseLevelDescriptionEn =
        data.educationalCourseLevelDescriptionEn ?? "";
      this.educationalCourseLevelDescriptionUnd =
        data.educationalCourseLevelDescriptionUnd ?? "";
      this.educationalCourseLevelFileIsDefault =
        data.educationalCourseLevelFileIsDefault ?? false;
      this.educationalCourseLevelFilePath =
        data.educationalCourseLevelFilePath ?? "";
      this.educationalCourseLevelFileSizeBytes =
        data.educationalCourseLevelFileSizeBytes ?? 0;
      this.educationalCourseLevelFileSizeTextCurrent =
        data.educationalCourseLevelFileSizeTextCurrent ?? "";
      this.educationalCourseLevelFileSizeTextAr =
        data.educationalCourseLevelFileSizeTextAr ?? "";
      this.educationalCourseLevelFileSizeTextEn =
        data.educationalCourseLevelFileSizeTextEn ?? "";
      this.educationalCourseLevelFileSizeTextUnd =
        data.educationalCourseLevelFileSizeTextUnd ?? "";
      this.educationalCourseLevelFileTypeToken =
        data.educationalCourseLevelFileTypeToken ?? "";
      this.educationalCourseLevelFileTypeNameCurrent =
        data.educationalCourseLevelFileTypeNameCurrent ?? "";
      this.educationalCourseLevelNotes = data.educationalCourseLevelNotes ?? "";
      this.educationalCourseLevelSortNumber =
        data.educationalCourseLevelSortNumber ?? 0;
      this.educationalCourseLevelIsFreezeStatus =
        data.educationalCourseLevelIsFreezeStatus ?? false;
      this.educationalCourseLevelFreezeMessageCurrent =
        data.educationalCourseLevelFreezeMessageCurrent ?? "";
      this.educationalCourseLevelFreezeMessageAr =
        data.educationalCourseLevelFreezeMessageAr ?? "";
      this.educationalCourseLevelFreezeMessageEn =
        data.educationalCourseLevelFreezeMessageEn ?? "";
      this.educationalCourseLevelFreezeMessageUnd =
        data.educationalCourseLevelFreezeMessageUnd ?? "";
      this.openSpecificTimeStatus = data.openSpecificTimeStatus ?? false;
      this.openInDateTime = data.openInDateTime ?? "";
      this.openInDateTimeCustomized = data.openInDateTimeCustomized ?? "";
      this.openInDate = data.openInDate ?? "";
      this.openInTime = data.openInTime ?? "";
      this.openDurationCurrent = data.openDurationCurrent ?? "";
      this.educationalCourseToken = data.educationalCourseToken ?? "";
      this.educationalCourseInfo = data.educationalCourseInfo ?? null;
      this.levelQuestionStatistics = data.levelQuestionStatistics ?? null;
    } else {
      this.setInitialValue();
    }
  }
}

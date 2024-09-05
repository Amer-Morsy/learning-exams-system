import BaseEntityModel from "./../../general/BaseEntityModel";
import defaultImg from "@/assets/images/EducationalCourses.svg";

export default class EducationalCourse extends BaseEntityModel {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    super();
    this.setInitialValue();
  }
  setInitialValue(ownerUserToken = "", educationalCategoryToken = "") {
    this.setInitialValueBaseEntityModel();
    this.mediaFile = "";
    this.educationalCourseToken = "";
    this.parentEducationalCourseToken = "";
    this.educationalCourseNameCurrent = "";
    this.educationalCourseNameAr = "";
    this.educationalCourseNameEn = "";
    this.educationalCourseNameUnd = "";
    this.educationalCourseDescriptionCurrent = "";
    this.educationalCourseDescriptionAr = "";
    this.educationalCourseDescriptionEn = "";
    this.educationalCourseDescriptionUnd = "";
    this.educationalCourseNotes = "";
    this.educationalCoursePeriodStatusTypeToken = "";
    this.educationalCoursePeriodStatusTypeNameCurrent = "";
    this.educationalCourseInitialCountLevels = 0;
    this.educationalCourseImageIsDefault = false;
    this.educationalCourseImagePath = "";
    this.educationalCourseImageSizeBytes = 0;
    this.educationalCourseImageSizeTextCurrent = "";
    this.parentEducationalCourseInfoData = null;
    this.mainRootToken = "";
    this.rankingUnderParent = 0;
    this.isHaveChildrenStatus = false;
    this.educationalCoursePrice = 20;
    this.educationalCoursePriceWithCurrency = "";
    this.educationalCoursePriceOfferStatus = false;
    this.educationalCoursePriceInOffer = 20;
    this.educationalCoursePriceInOfferWithCurrency = "";
    this.countLevels = 0;
    this.countSubscribedInCourse = 0;
    this.ownerUserToken = ownerUserToken;
    this.ownerUserInfoData = null;
    this.educationalCategoryToken = educationalCategoryToken;
    this.educationalCategoryInfoData = null;
    this.courseCurrentStatistics = null;
    this.courseTotalStatistics = null;
  }
  fillData(data) {
    if (data) {
      this.fillDataBaseEntityModel(data);
      this.mediaFile = "";
      this.educationalCourseToken = data.educationalCourseToken ?? "";
      this.parentEducationalCourseToken =
        data.parentEducationalCourseToken ?? "";
      this.educationalCourseNameCurrent =
        data.educationalCourseNameCurrent ?? "";
      this.educationalCourseNameAr = data.educationalCourseNameAr ?? "";
      this.educationalCourseNameEn = data.educationalCourseNameEn ?? "";
      this.educationalCourseNameUnd = data.educationalCourseNameUnd ?? "";
      this.educationalCourseDescriptionCurrent =
        data.educationalCourseDescriptionCurrent ?? "";
      this.educationalCourseDescriptionAr =
        data.educationalCourseDescriptionAr ?? "";
      this.educationalCourseDescriptionEn =
        data.educationalCourseDescriptionEn ?? "";
      this.educationalCourseDescriptionUnd =
        data.educationalCourseDescriptionUnd ?? "";
      this.educationalCourseNotes = data.educationalCourseNotes ?? "";
      this.educationalCoursePeriodStatusTypeToken =
        data.educationalCoursePeriodStatusTypeToken ?? "";
      this.educationalCoursePeriodStatusTypeNameCurrent =
        data.educationalCoursePeriodStatusTypeNameCurrent ?? "";
      this.educationalCourseInitialCountLevels =
        data.educationalCourseInitialCountLevels ?? 0;
      this.educationalCourseImageIsDefault =
        data.educationalCourseImageIsDefault ?? false;
      this.educationalCourseImagePath = data.educationalCourseImagePath ?? "";
      this.educationalCourseImageSizeBytes =
        data.educationalCourseImageSizeBytes ?? 0;
      this.educationalCourseImageSizeTextCurrent =
        data.educationalCourseImageSizeTextCurrent ?? "";
      this.parentEducationalCourseInfoData =
        data.parentEducationalCourseInfoData ?? null;
      this.mainRootToken = data.mainRootToken ?? "";
      this.rankingUnderParent = data.rankingUnderParent ?? 0;
      this.isHaveChildrenStatus = data.isHaveChildrenStatus ?? false;
      this.educationalCoursePrice = data.educationalCoursePrice ?? 20;
      this.educationalCoursePriceWithCurrency =
        data.educationalCoursePriceWithCurrency ?? "";
      this.educationalCoursePriceOfferStatus =
        data.educationalCoursePriceOfferStatus ?? false;
      this.educationalCoursePriceInOffer =
        data.educationalCoursePriceInOffer ?? 20;
      this.educationalCoursePriceInOfferWithCurrency =
        data.educationalCoursePriceInOfferWithCurrency ?? "";
      this.countLevels = data.countLevels ?? 0;
      this.countSubscribedInCourse = data.countSubscribedInCourse ?? 0;
      this.ownerUserToken = data.ownerUserToken ?? "";
      this.ownerUserInfoData = data.ownerUserInfoData ?? null;
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.educationalCategoryInfoData =
        data.educationalCategoryInfoData ?? null;
      this.courseCurrentStatistics = data.courseCurrentStatistics ?? null;
      this.courseTotalStatistics = data.courseTotalStatistics ?? null;
    } else {
      this.setInitialValue();
    }
  }
}

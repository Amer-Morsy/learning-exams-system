import defaultImg from "@/assets/images/EducationalTeachers.svg";
import UserInfoData from "./../../users/UserInfoData";
import EducationalCategoryInfoData from "./../educationalCategories/EducationalCategoryInfoData";

export default class EducationalTeacher {
  icon = defaultImg;
  defaultImg = defaultImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.totalCountUserSubscribed = 0;
    this.totalCountCourses = 0;
    this.userTeacherToken = "";
    this.parentEducationalCategoryToken = "";
    this.educationalCategoryToken = "";
    this.userInfoData = new UserInfoData();
    this.educationalCategoryInfoData = new EducationalCategoryInfoData();
  }
  fillData(data) {
    if (data) {
      this.totalCountUserSubscribed = data.totalCountUserSubscribed ?? 0;
      this.totalCountCourses = data.totalCountCourses ?? 0;
      this.userTeacherToken = data.userTeacherToken ?? "";
      this.parentEducationalCategoryToken =
        data.parentEducationalCategoryToken ?? "";
      this.educationalCategoryToken = data.educationalCategoryToken ?? "";
      this.userInfoData.fillData(data.userInfoData);
      this.educationalCategoryInfoData.fillData(
        data.educationalCategoryInfoData
      );
    } else {
      this.setInitialValue();
    }
  }
}

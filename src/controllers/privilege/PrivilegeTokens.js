import { EnumClass } from "./EnumClass";

// general functions for guard
export const GuardGeneralFunctions = {
  // view
  viewActive: EnumClass.ActivationType.Active + "1",
  viewBlocked: EnumClass.ActivationType.Blocked + "1",
  viewDialogActive: EnumClass.ActivationType.Active + "4",
  viewDialogBlocked: EnumClass.ActivationType.Blocked + "4",
  viewReportActive: EnumClass.ActivationType.Active + "7",
  viewReportBlocked: EnumClass.ActivationType.Blocked + "7",
  // actions
  itemAdd: "1",
  itemUpdate: "3",
  itemActive: "5",
  itemBlocked: "9",
  itemDeleteImage: "11",
  itemFinaleDelete: "13",
};
// general functions for view
export const GeneralFunctions = {
  // view
  viewSelfDataActive: EnumClass.ActivationType.Active + "2",
  viewAllDataActive: EnumClass.ActivationType.Active + "3",
  viewSelfDataBlocked: EnumClass.ActivationType.Blocked + "2",
  viewAllDataBlocked: EnumClass.ActivationType.Blocked + "3",
  // dialog
  viewDialogSelfDataActive: EnumClass.ActivationType.Active + "5",
  viewDialogAllDataActive: EnumClass.ActivationType.Active + "6",
  viewDialogSelfDataBlocked: EnumClass.ActivationType.Blocked + "5",
  viewDialogAllDataBlocked: EnumClass.ActivationType.Blocked + "6",
  // report
  reportingSelfDataActive: EnumClass.ActivationType.Active + "8",
  reportingAllDataActive: EnumClass.ActivationType.Active + "9",
  reportingSelfDataBlocked: EnumClass.ActivationType.Blocked + "8",
  reportingAllDataBlocked: EnumClass.ActivationType.Blocked + "9",
  notificationOnReportingData: "15",
  // actions
  itemAdd: GuardGeneralFunctions.itemAdd,
  notificationOnItemAdd: "2",
  itemUpdate: GuardGeneralFunctions.itemUpdate,
  notificationOnItemUpdate: "4",
  itemActive: GuardGeneralFunctions.itemActive,
  notificationOnItemActive: "6",
  notificationOnItemArchive: "8",
  itemBlocked: GuardGeneralFunctions.itemBlocked,
  notificationOnItemBlocked: "10",
  itemDeleteImage: GuardGeneralFunctions.itemDeleteImage,
  itemFinaleDelete: GuardGeneralFunctions.itemFinaleDelete,
  notificationOnDeleteImage: "12",
  notificationOnFinaleDeleteItem: "14",
};

export const ModulesPrivilege = {
  //#region BaseProjectsModule
  Establishment: "Establishment_",
  EstablishmentRole: "EstablishmentRole_",
  UsersVersion: "UsersVersion_",
  //#endregion BaseProjectsModule

  //#region User
  //*******************Employee******************,
  Employee: EnumClass.UserType.Employee,
  EmployeeLoginCode:
    EnumClass.UserType.Employee + EnumClass.UsersModules.UserLoginCode,
  EmployeeUserStorage:
    EnumClass.UserType.Employee + EnumClass.UsersModules.UserStorage,
  EmployeeEstablishmentsRole:
    EnumClass.UserType.Employee + EnumClass.UsersModules.EstablishmentsRoles,
  EmployeeUserWalletTransaction:
    EnumClass.UserType.Employee + EnumClass.UsersModules.UserWalletTransaction,
  //*******************Student******************,
  Student: EnumClass.UserType.Student,
  StudentLoginCode:
    EnumClass.UserType.Student + EnumClass.UsersModules.UserLoginCode,
  StudentUserStorage:
    EnumClass.UserType.Student + EnumClass.UsersModules.UserStorage,
  StudentEstablishmentsRole:
    EnumClass.UserType.Student + EnumClass.UsersModules.EstablishmentsRoles,
  StudentUserWalletTransaction:
    EnumClass.UserType.Student + EnumClass.UsersModules.UserWalletTransaction,
  //*******************Parent******************,
  Parent: EnumClass.UserType.Parent,
  ParentLoginCode:
    EnumClass.UserType.Parent + EnumClass.UsersModules.UserLoginCode,
  ParentUserStorage:
    EnumClass.UserType.Parent + EnumClass.UsersModules.UserStorage,
  ParentEstablishmentsRole:
    EnumClass.UserType.Parent + EnumClass.UsersModules.EstablishmentsRoles,
  ParentUserWalletTransaction:
    EnumClass.UserType.Parent + EnumClass.UsersModules.UserWalletTransaction,
  //*******************Teacher******************,
  Teacher: EnumClass.UserType.Teacher,
  TeacherLoginCode:
    EnumClass.UserType.Teacher + EnumClass.UsersModules.UserLoginCode,
  TeacherUserStorage:
    EnumClass.UserType.Teacher + EnumClass.UsersModules.UserStorage,
  TeacherEstablishmentsRole:
    EnumClass.UserType.Teacher + EnumClass.UsersModules.EstablishmentsRoles,
  TeacherUserWalletTransaction:
    EnumClass.UserType.Teacher + EnumClass.UsersModules.UserWalletTransaction,
  //*******************MasterAdmin******************,
  MasterAdmin: EnumClass.UserType.MasterAdmin,
  MasterAdminLoginCode:
    EnumClass.UserType.MasterAdmin + EnumClass.UsersModules.UserLoginCode,
  MasterAdminStorage:
    EnumClass.UserType.MasterAdmin + EnumClass.UsersModules.UserStorage,
  MasterAdminEstablishmentsRole:
    EnumClass.UserType.MasterAdmin + EnumClass.UsersModules.EstablishmentsRoles,
  MasterAdminUserWalletTransaction:
    EnumClass.UserType.MasterAdmin +
    EnumClass.UsersModules.UserWalletTransaction,
  //*******************AdminsEgypt******************,
  AdminsEgypt: EnumClass.UserType.AdminsEgypt,
  AdminsEgyptLoginCode:
    EnumClass.UserType.AdminsEgypt + EnumClass.UsersModules.UserLoginCode,
  AdminsEgyptStorage:
    EnumClass.UserType.AdminsEgypt + EnumClass.UsersModules.UserStorage,
  AdminsEgyptEstablishmentsRole:
    EnumClass.UserType.AdminsEgypt + EnumClass.UsersModules.EstablishmentsRoles,
  AdminsEgyptUserWalletTransaction:
    EnumClass.UserType.AdminsEgypt +
    EnumClass.UsersModules.UserWalletTransaction,
  // #endregion User

  //#region EducationsModules
  EducationalPeriod: "EducationalPeriod",
  EducationalCategory: "EducationalCategory",
  EducationalTeacher: "EducationalTeacher",
  EducationalCourse: "EducationalCourse",
  EducationalCoursePeriod: "EducationalCoursePeriod",
  EducationalCourseLevel: "EducationalCourseLevel",
  // EducationalCourseLevelQuestion: "EducationalCourseLevelQuestion",
  //#endregion

  //#region RatingModules 
  EducationalCourseReview:
    "Review" + EnumClass.ReviewModuleType.educationalCourse,
  EducationalCourseLevelReview:
    "Review" + EnumClass.ReviewModuleType.educationalCourseLevel,
  //#endregion

  //#region AdditionalSettings
  //Educational
  QuestionBankTitle: "QuestionBankTitle",
  QuestionParagraph: "QuestionParagraph",
  QuestionBank: "QuestionBank",
  Question: "Question",
  //#endregion

  //#region Custom
  Notification: "Notification",
  //#endregion
};

// //#region Custom
// export const NotificationPrivlage = {
//   NotificationView: ModulesPrivilege.Notification + "1",
//   NotificationRead: ModulesPrivilege.Notification + "2",
//   NotificationOpen: ModulesPrivilege.Notification + "3",
//   NotificationArchive: ModulesPrivilege.Notification + "4",
//   NotificationAdd: ModulesPrivilege.Notification + "5",
// };

// UTT_12800UserLoginCode_LoginCode_334
export const LoginCodesPrivlage = {
  ResetUserLoginCode: "LoginCode_" + "334",
  ResetUserDeviceUniqueCode: "LoginCode_" + "333",
};

// export const UserStoragesPrivlage = {
//   UserStorage: "UserStorage_",
//   AddUserStorageDirectory: this.UserStorage + "101",
//   UpdateUserStorageDirectory: this.UserStorage + "102",
//   AddUserStorageMedia: this.UserStorage + "103",
//   UpdateUserStorageMedia: this.UserStorage + "104",
// };

// export const UserWalletTransactionsPrivlage = {
//   UserWalletTransactions: "UserWalletTransactions_",
//   CharegeBalance: this.UserWalletTransactions + "333",
//   WithdrawalBalance: this.UserWalletTransactions + "334",
// };

export const EducationalPeriodsPrivlage = {
  Start: "EducationalPeriods_" + "100",
  End: "EducationalPeriods_" + "101",
};

export const EducationalCourseLevelsPrivlage = {
  ChangeSort: "EducationalCourses" + "100",
  // ChangeFreeze: "EducationalCourseLevel" + "101",
  UpdateQuestions: "EducationalCourseLevel" + "102",
};

// export const ReviewPrivlage = {
//   Review: "Review",
//   HideReview: this.Review + "100",
// };
// //#endregion

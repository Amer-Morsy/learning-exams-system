//#region Privileges
export const Privileges = {
  getDetails:
    "api/EstablishmentsRolesPrivileges/GetEstablishmentsRolesPrivilegeDetails",
  update:
    "api/EstablishmentsRolesPrivileges/UpdateEstablishmentsRolesPrivilege",
};
//#endregion Privileges

//#region Users
export const Users = {
  login: "api/UsersAuthentication/UserLogin",
  signUp: "api/UsersAuthentication/UserSignUp",
  logout: "api/UsersAuthentication/UserLogout",
  getDetails: "api/Users/GetUserDetails",
  getDialog: "api/Users/GetUserDialog",
  getAll: "api/Users/GetAllUsers",
  add: "api/Users/AddUser",
  update: "api/Users/UpdateUser",
  approveUserSignUp: "api/Users/ApproveUserSignUp",
  changeActivationType: "api/Users/ChangeActivationTypeUser",
  changeUserPassword: "api/UsersAuthentication/ChangeUserPassword",
  deleteImage: "api/Users/DeleteImage",
  finalDelete: "api/Users/DeleteUser",
  getLecturerStatistics: "api/Users/GetLecturerStatisticsReport",
  getInDeatailsLecturerStatistics: "api/Users/GetFullLecturerStatisticsData",
};
//#endregion Users

//#region EstablishmentRoles
export const EstablishmentRoles = {
  getDetails: "api/EstablishmentRoles/GetEstablishmentRoleDetails",
  getDialog: "api/EstablishmentRoles/GetEstablishmentRoleDialog",
  getAll: "api/EstablishmentRoles/GetAllEstablishmentRoles",
  add: "api/EstablishmentRoles/AddEstablishmentRole",
  update: "api/EstablishmentRoles/UpdateEstablishmentRole",
  changeActivationType:
    "api/EstablishmentRoles/ChangeActivationTypeEstablishmentRole",
  deleteImage: "api/EstablishmentRoles/DeleteImage",
  finalDelete: "api/EstablishmentRoles/DeleteEstablishmentRole",
};
//#endregion EstablishmentRoles

//#region UserLoginCodes
export const UserLoginCodes = {
  getAll: "/api/UserLoginCodes/GetAllUserLoginCodes",
  getDetails: "/api/UserLoginCodes/GetUserLoginCodeDetails",
  getDialog: "/api/UserLoginCodes/GetUserLoginCodeDialog",
  getSuggestion: "/api/UserLoginCodes/SuggestionNewUserLoginCode",
  add: "/api/UserLoginCodes/AddUserLoginCode",
  update: "/api/UserLoginCodes/UpdateUserLoginCode",
  resetUserLoginCode: "/api/UserLoginCodes/ResetUserLoginCode",
  resetUserDeviceCode: "/api/UserLoginCodes/ResetUserDeviceCode",
  useLoginCode: "/api/UserLoginCodes/UseLoginCode",
  changeActivationType: "/api/UserLoginCodes/ChangeActivationTypeUserLoginCode",
  finalDelete: "/api/UserLoginCodes/DeleteUserLoginCode",
  deleteImage: "/api/UserLoginCodes/DeleteImage",
};
//#endregion UserLoginCodes

//#region Additional
//#region Educational
export const QuestionBankTitles = {
  getDetails: "api/QuestionBankTitles/GetQuestionBankTitleDetails",
  getDialog: "api/QuestionBankTitles/GetQuestionBankTitleDialog",
  getAll: "api/QuestionBankTitles/GetAllQuestionBankTitles",
  add: "api/QuestionBankTitles/AddQuestionBankTitle",
  update: "api/QuestionBankTitles/UpdateQuestionBankTitle",
  changeActivationType:
    "api/QuestionBankTitles/ChangeActivationTypeQuestionBankTitle",
  deleteImage: "api/QuestionBankTitles/DeleteImage",
  finalDelete: "api/QuestionBankTitles/DeleteQuestionBankTitle",
};

export const QuestionParagraphs = {
  getDetails: "api/QuestionParagraphs/GetQuestionParagraphDetails",
  getDialog: "api/QuestionParagraphs/GetQuestionParagraphDialog",
  getAll: "api/QuestionParagraphs/GetAllQuestionParagraphs",
  add: "api/QuestionParagraphs/AddQuestionParagraph",
  update: "api/QuestionParagraphs/UpdateQuestionParagraph",
  changeActivationType:
    "api/QuestionParagraphs/ChangeActivationTypeQuestionParagraph",
  deleteImage: "api/QuestionParagraphs/DeleteImage",
  finalDelete: "api/QuestionParagraphs/DeleteQuestionParagraph",
};

export const QuestionBanks = {
  getDetails: "api/QuestionBanks/GetQuestionBankDetails",
  getDialog: "api/QuestionBanks/GetQuestionBankDialog",
  getAll: "api/QuestionBanks/GetAllQuestionBanks",
  add: "api/QuestionBanks/AddQuestionBank",
  update: "api/QuestionBanks/UpdateQuestionBank",
  changeActivationType: "api/QuestionBanks/ChangeActivationTypeQuestionBank",
  deleteImage: "api/QuestionBanks/DeleteImage",
  finalDelete: "api/QuestionBanks/DeleteQuestionBank",
};

export const Questions = {
  getDetails: "api/Questions/GetQuestionDetails",
  getDialog: "api/Questions/GetQuestionDetails",
  getAll: "api/Questions/GetAllQuestions",
  add: "api/Questions/AddQuestions",
  update: "api/Questions/UpdateQuestions",
  changeActivationType: "api/Questions/ChangeActivationTypeQuestion",
  deleteImage: "api/Questions/DeleteImage",
  finalDelete: "api/Questions/DeleteQuestion",
};
//#endregion Educational
//#endregion Additional

//#region Educationals
//#region EducationalCategories
export const EducationalCategories = {
  getAll: "/api/EducationalCategories/GetAllEducationalCategories",
  getDetails: "/api/EducationalCategories/GetEducationalCategoryDetails",
  getDialog: "/api/EducationalCategories/GetEducationalCategoryDialog",
  add: "/api/EducationalCategories/AddEducationalCategory",
  update: "/api/EducationalCategories/UpdateEducationalCategory",
  changeActivationType:
    "/api/EducationalCategories/ChangeActivationTypeEducationalCategory",
  finalDelete: "/api/EducationalCategories/DeleteEducationalCategory",
  deleteImage: "/api/EducationalCategories/DeleteImage",
};
//#endregion EducationalCategories

// -buffer if not tracher user logged in 
//#region EducationalTeachers 
export const EducationalTeachers = {
  getAll: "/api/EducationalTeachers/GetAllEducationalTeachers",
};
//#endregion EducationalTeachers

//#region EducationalCourses
export const EducationalCourses = {
  getAll: "/api/EducationalCourses/GetAllEducationalCourses",
  getDetails: "/api/EducationalCourses/GetEducationalCourseDetails",
  getDialog: "/api/EducationalCourses/GetEducationalCourseDialog",
  add: "/api/EducationalCourses/AddEducationalCourse",
  update: "/api/EducationalCourses/UpdateEducationalCourse",
  changeActivationType:
    "/api/EducationalCourses/ChangeActivationTypeEducationalCourse",
  finalDelete: "/api/EducationalCourses/DeleteEducationalCourse",
  deleteImage: "/api/EducationalCourses/DeleteImage",
};
//#endregion EducationalCourses

//#region EducationalCourseLevels
export const EducationalCourseLevels = {
  getAll: "/api/EducationalCourseLevels/GetAllEducationalCourseLevels",
  getDetails: "/api/EducationalCourseLevels/GetEducationalCourseLevelDetails",
  getDialog: "/api/EducationalCourseLevels/GetEducationalCourseLevelDialog",
  add: "/api/EducationalCourseLevels/AddEducationalCourseLevel",
  update: "/api/EducationalCourseLevels/UpdateEducationalCourseLevel",
  changeActivationType:
    "/api/EducationalCourseLevels/ChangeActivationTypeEducationalCourseLevel",
  finalDelete: "/api/EducationalCourseLevels/DeleteEducationalCourseLevel",
  deleteImage: "/api/EducationalCourseLevels/DeleteImage",
  changeSort: "/api/EducationalCourseLevels/ChangeSortEducationalCourseLevel",
  changeFreeze:
    "/api/EducationalCourseLevels/ChangeFreezeEducationalCourseLevel",
};
//#endregion EducationalCourseLevels

//#region EducationalCourseLevelQuestions
export const EducationalCourseLevelQuestions = {
  getAll:
    "/api/EducationalCourseLevelQuestions/GetAllEducationalCourseLevelQuestions",
  getDetails:
    "/api/EducationalCourseLevelQuestions/GetEducationalCourseLevelQuestionDetails",
  changeCourseLevelQuestions:
    "/api/EducationalCourseLevelQuestions/ChangeCourseLevelQuestions",
};
//#endregion EducationalCourseLevelQuestions

//#region EducationalCoursePeriods
export const EducationalCoursePeriods = {
  start: "/api/EducationalCoursePeriods/StartEducationalCoursePeriod",
  end: "/api/EducationalCoursePeriods/EndEducationalCoursePeriod",
};
//#endregion EducationalCoursePeriods

//#endregion Educationals

//#region Finance
//#region UserWalletTransactions
export const UserWalletTransactions = {
  getAll: "/api/UserWalletTransactions/GetAllUserWalletTransactions",
  getDetails: "/api/UserWalletTransactions/GetUserWalletTransactionDetails",
  add: "/api/UserWalletTransactions/AddUserWalletTransaction",
};
//#endregion UserWalletTransactions
//#endregion Finance

// #region USERS
const USER_TYPE_TOKEN_SIMPOL = "UTT_";
export const USER_TYPE = {
  Student: USER_TYPE_TOKEN_SIMPOL + "12800", // Student طالب
  Teacher: USER_TYPE_TOKEN_SIMPOL + "12600", // Teachers المُعَلمين
  Employee: USER_TYPE_TOKEN_SIMPOL + "12500", // Employee موظف
  Parent: USER_TYPE_TOKEN_SIMPOL + "13200", // Parent ولي أمر
  MasterAdmin: USER_TYPE_TOKEN_SIMPOL + "12400", // MasterAdmin مالك النظام
  AdminsEgypt: USER_TYPE_TOKEN_SIMPOL + "12300", // AdminsEgypt أدمنز إيجيبت
};
// #endregion USERS

// #region ActivationType
const ACTIVATION_TYPE_TOKEN_SIMPOL = "AST-";
export const ACTIVATION_TYPE = {
  default: ACTIVATION_TYPE_TOKEN_SIMPOL + "17400",
  Active: ACTIVATION_TYPE_TOKEN_SIMPOL + "17400",
  Archived: ACTIVATION_TYPE_TOKEN_SIMPOL + "17500",
  Blocked: ACTIVATION_TYPE_TOKEN_SIMPOL + "17600",
};
// #endregion ActivationType

// #region WalletTransactionType
const WALLET_TRANSACTION_TYPE_TOKEN_SIMPOL = "WAT-";
export const WALLET_TRANSACTION_TYPE = {
  Charge: WALLET_TRANSACTION_TYPE_TOKEN_SIMPOL + "1",
  WithDrawal: WALLET_TRANSACTION_TYPE_TOKEN_SIMPOL + "2",
  PaySalary: WALLET_TRANSACTION_TYPE_TOKEN_SIMPOL + "3",
};
// #endregion WalletTransactionType

// #region QuestionType
const QUESTION_TYPE_TOKEN_SIMPOL = "QST-";
export const QUESTION_TYPE = {
  TrueFalse: QUESTION_TYPE_TOKEN_SIMPOL + "1",
  Chose: QUESTION_TYPE_TOKEN_SIMPOL + "2",
};
// #endregion QuestionType

// #region EducationalCoursePeriodStatus
const EDUCATIONALCOURSEPERIODSTATUS_TYPE_TOKEN_SIMPOL = "CST-";
export const EDUCATIONAL_COURSE_PERIOD_STATUS_TYPE = {
  Open: EDUCATIONALCOURSEPERIODSTATUS_TYPE_TOKEN_SIMPOL + "1",
  Closed: EDUCATIONALCOURSEPERIODSTATUS_TYPE_TOKEN_SIMPOL + "2",
};
// #endregion EducationalCoursePeriodStatus

const AUTHENTICATION_LOGIN_TYPE_TOKEN_SIMPOL = "AUTHNT-";
export const AUTHENTICATION_LOGIN_TYPE_TOKENS = {
  Option_1: AUTHENTICATION_LOGIN_TYPE_TOKEN_SIMPOL + "1", // Login from one device and device installation is required
  Option_2: AUTHENTICATION_LOGIN_TYPE_TOKEN_SIMPOL + "2", //Login from one device on the platform, and device installation is not required
  Option_3: AUTHENTICATION_LOGIN_TYPE_TOKEN_SIMPOL + "3", //Login from one device on the platform, with the requirement to install the device
  Option_4: AUTHENTICATION_LOGIN_TYPE_TOKEN_SIMPOL + "4", //Multable PlatForm Multable Device
};

const CODE_IN_LOGIN_TYPE_TOKEN_SIMPOL = "CODE_LOGIN-";
export const CODE_IN_LOGIN_TYPE_TOKENS = {
  DeviceGenerated: CODE_IN_LOGIN_TYPE_TOKEN_SIMPOL + "1",
  SystemGenerated: CODE_IN_LOGIN_TYPE_TOKEN_SIMPOL + "2",
};

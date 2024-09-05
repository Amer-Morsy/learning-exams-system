const DAY_OF_WEEK_TOKEN_SIMPOL = "DOF-";
const LOCAL_JOB_TOKEN_SIMPOL = "LOCAL_JOB-";
const RELIGION_TOKEN_SIMPOL = "RELIGION-";
const GENDER_TOKEN_SIMPOL = "GET-";
const PLAT_FORM_TYPE_TOKEN_SIMPOL = "PFT-";
const MEDIA_TYPE_TOKEN_SIMPOL = "MTT-";
const PAGE_GO_TO_TOKEN_SIMPOL = "PGT-";
const USER_TYPE_TOKEN_SIMPOL = "UTT_";
const THEME_TYPE_TOKEN_SIMPOL = "THEM-";
const ACTIVATION_TYPE_TOKEN_SIMPOL = "AST-";
const RELATIVE_RELATION_TYPE_TOKEN_SIMPOL = "RRT-";
const AUTHENTICATION_LOGIN_TOKEN_SIMPOL = "AUTHNT-";
const CODE_LOGIN_TOKEN_SIMPOL = "CODE_LOGIN-";
const CALENDER_SEARCH_TYPE_TOKEN_SIMPOL = "CST-";
const WALLET_TRANSACTION_TYPE_TOKEN_SIMPOL = "WAT-";
const PAYMENT_METHOD_TYPE_TOKEN_SIMPOL = "PMT-";
const QUESTION_TYPE_TOKEN_SIMPOL = "QST-";
const CLOSED_STATE_TYPE_TOKEN_SIMPOL = "CLST-";
const REVIEW_MODULE_TYPE_TOKEN_SIMPOL = "RMT-";

export const EnumClass = {
  DaysOfWeek: {
    Saturday: DAY_OF_WEEK_TOKEN_SIMPOL + "1",
    Sunday: DAY_OF_WEEK_TOKEN_SIMPOL + "2",
    Monday: DAY_OF_WEEK_TOKEN_SIMPOL + "3",
    Tuesday: DAY_OF_WEEK_TOKEN_SIMPOL + "4",
    Wednesday: DAY_OF_WEEK_TOKEN_SIMPOL + "5",
    Thursday: DAY_OF_WEEK_TOKEN_SIMPOL + "6",
    Friday: DAY_OF_WEEK_TOKEN_SIMPOL + "7",
  },

  LocalJobType: {
    Administrative: LOCAL_JOB_TOKEN_SIMPOL + "1",
    StoreWorker: LOCAL_JOB_TOKEN_SIMPOL + "2",
    SalesWorker: LOCAL_JOB_TOKEN_SIMPOL + "3",
    DeliveryWorker: LOCAL_JOB_TOKEN_SIMPOL + "4",
    Other: LOCAL_JOB_TOKEN_SIMPOL + "5",
  },

  ReligionType: {
    Muslim: RELIGION_TOKEN_SIMPOL + "1",
    Christian: RELIGION_TOKEN_SIMPOL + "2",
    Jewish: RELIGION_TOKEN_SIMPOL + "3",
  },

  GenderType: {
    Male: GENDER_TOKEN_SIMPOL + "1",
    Female: GENDER_TOKEN_SIMPOL + "2",
    Others: GENDER_TOKEN_SIMPOL + "3",
  },

  PlatFormType: {
    Ios: PLAT_FORM_TYPE_TOKEN_SIMPOL + "1",
    Android: PLAT_FORM_TYPE_TOKEN_SIMPOL + "2",
    Web: PLAT_FORM_TYPE_TOKEN_SIMPOL + "3",
    Desktop: PLAT_FORM_TYPE_TOKEN_SIMPOL + "4",
  },

  MediaType: {
    Image: MEDIA_TYPE_TOKEN_SIMPOL + "1",
    Video: MEDIA_TYPE_TOKEN_SIMPOL + "2",
    Audio: MEDIA_TYPE_TOKEN_SIMPOL + "3",
    Pdf: MEDIA_TYPE_TOKEN_SIMPOL + "4",
    Excel: MEDIA_TYPE_TOKEN_SIMPOL + "5",
    Word: MEDIA_TYPE_TOKEN_SIMPOL + "6",
    PowerPoint: MEDIA_TYPE_TOKEN_SIMPOL + "7",
    Other: MEDIA_TYPE_TOKEN_SIMPOL + "8",
  },

  PageGoTo: {
    Establishments: PAGE_GO_TO_TOKEN_SIMPOL + "Establishments",
    EstablishmentsRoles: PAGE_GO_TO_TOKEN_SIMPOL + "EstablishmentsRoles",
    Users: PAGE_GO_TO_TOKEN_SIMPOL + "Users",
    UserLoginCodes: PAGE_GO_TO_TOKEN_SIMPOL + "UserLoginCodes",
    UserWalletTransactions: PAGE_GO_TO_TOKEN_SIMPOL + "UserWalletTransactions",
    UserStorages: PAGE_GO_TO_TOKEN_SIMPOL + "UserStorages",
    EducationalCategories: PAGE_GO_TO_TOKEN_SIMPOL + "EducationalCategories",
    EducationalTeachers: PAGE_GO_TO_TOKEN_SIMPOL + "EducationalTeachers",
    EducationalCourses: PAGE_GO_TO_TOKEN_SIMPOL + "EducationalCourses",
    EducationalCourseLevels:
      PAGE_GO_TO_TOKEN_SIMPOL + "EducationalCourseLevels",
    Reviews: PAGE_GO_TO_TOKEN_SIMPOL + "Reviews",
    QuestionBankTitles: PAGE_GO_TO_TOKEN_SIMPOL + "QuestionBankTitles",
    QuestionParagraphs: PAGE_GO_TO_TOKEN_SIMPOL + "QuestionParagraphs",
    QuestionBanks: PAGE_GO_TO_TOKEN_SIMPOL + "QuestionBanks",
    Questions: PAGE_GO_TO_TOKEN_SIMPOL + "Questions",
  },

  UserType: {
    AdminsEgypt: USER_TYPE_TOKEN_SIMPOL + "12300",
    MasterAdmin: USER_TYPE_TOKEN_SIMPOL + "12400",
    Employee: USER_TYPE_TOKEN_SIMPOL + "12500",
    Teacher: USER_TYPE_TOKEN_SIMPOL + "12600",
    Student: USER_TYPE_TOKEN_SIMPOL + "12800",
    Parent: USER_TYPE_TOKEN_SIMPOL + "13200",
  },

  UsersModules: {
    UsersFamily: "UsersFamily_",
    UserStorage: "UserStorage_",
    UserLoginCode: "UserLoginCode_",
    EstablishmentsRoles: "EstablishmentsRoles_",
    UserWalletTransaction: "UserWalletTransaction_",
  },

  ThemeType: {
    light: THEME_TYPE_TOKEN_SIMPOL + "1",
    Dark: THEME_TYPE_TOKEN_SIMPOL + "2",
  },

  ActivationType: {
    Active: ACTIVATION_TYPE_TOKEN_SIMPOL + "17400",
    Archived: ACTIVATION_TYPE_TOKEN_SIMPOL + "17500",
    Blocked: ACTIVATION_TYPE_TOKEN_SIMPOL + "17600",
  },

  RelativeRelationType: {
    Father: RELATIVE_RELATION_TYPE_TOKEN_SIMPOL + "1",
    Mother: RELATIVE_RELATION_TYPE_TOKEN_SIMPOL + "2",
    Brother: RELATIVE_RELATION_TYPE_TOKEN_SIMPOL + "3",
    Sister: RELATIVE_RELATION_TYPE_TOKEN_SIMPOL + "4",
    PaternalUncle: RELATIVE_RELATION_TYPE_TOKEN_SIMPOL + "5",
    MaternalUncle: RELATIVE_RELATION_TYPE_TOKEN_SIMPOL + "6",
    PaternalAunt: RELATIVE_RELATION_TYPE_TOKEN_SIMPOL + "7",
    MaternalAunt: RELATIVE_RELATION_TYPE_TOKEN_SIMPOL + "8",
  },

  AuthenticationLoginType: {
    //جهاز واحد في كل المنصات - جهاز واحد فقط لا غير
    SingleDeviceSameDevice: AUTHENTICATION_LOGIN_TOKEN_SIMPOL + "1",
    //جهاز واحد لكل منصه - العادية بتاعت المشاريع القديمة
    SingleDeviceForSinglPlatFormNotSameDevice:
      AUTHENTICATION_LOGIN_TOKEN_SIMPOL + "2",
    //جهاز واحد لكل منصه - بتاعتنا العادية مع تثبيت الجهاز
    SingleDeviceForSingPlatFormSameDevice:
      AUTHENTICATION_LOGIN_TOKEN_SIMPOL + "3",
    //أجهزه متعددة - في عدة منصات
    MultipleDeviceInMultiplePlatForm: AUTHENTICATION_LOGIN_TOKEN_SIMPOL + "4",
  },

  CodeInLoginType: {
    DeviceCode: CODE_LOGIN_TOKEN_SIMPOL + "1",
    SystemCode: CODE_LOGIN_TOKEN_SIMPOL + "2",
  },

  CalendarSearchType: {
    Day: CALENDER_SEARCH_TYPE_TOKEN_SIMPOL + "1",
    Week: CALENDER_SEARCH_TYPE_TOKEN_SIMPOL + "2",
    Month: CALENDER_SEARCH_TYPE_TOKEN_SIMPOL + "3",
    Year: CALENDER_SEARCH_TYPE_TOKEN_SIMPOL + "4",
    Customize: CALENDER_SEARCH_TYPE_TOKEN_SIMPOL + "5",
  },

  WalletTransactionType: {
    ChargeBalance: WALLET_TRANSACTION_TYPE_TOKEN_SIMPOL + "1",
    WithDrawalBalance: WALLET_TRANSACTION_TYPE_TOKEN_SIMPOL + "2",
    Buy: WALLET_TRANSACTION_TYPE_TOKEN_SIMPOL + "3",
    DeleteBuy: WALLET_TRANSACTION_TYPE_TOKEN_SIMPOL + "4",
  },

  PaymentMethod: {
    Cach: PAYMENT_METHOD_TYPE_TOKEN_SIMPOL + "1",
    Visa: PAYMENT_METHOD_TYPE_TOKEN_SIMPOL + "2",
    VodafoneCash: PAYMENT_METHOD_TYPE_TOKEN_SIMPOL + "3",
    OrangeCash: PAYMENT_METHOD_TYPE_TOKEN_SIMPOL + "4",
    EtisalatCash: PAYMENT_METHOD_TYPE_TOKEN_SIMPOL + "5",
    BankTransfer: PAYMENT_METHOD_TYPE_TOKEN_SIMPOL + "6",
  },

  QuestionType: {
    TrueFalse: QUESTION_TYPE_TOKEN_SIMPOL + "1",
    MCQ: QUESTION_TYPE_TOKEN_SIMPOL + "2",
    Arrived: QUESTION_TYPE_TOKEN_SIMPOL + "3",
    Sort: QUESTION_TYPE_TOKEN_SIMPOL + "4",
  },

  ClosedState: {
    Closed: CLOSED_STATE_TYPE_TOKEN_SIMPOL + "1",
    Open: CLOSED_STATE_TYPE_TOKEN_SIMPOL + "2",
  },

  ReviewModuleType: {
    EducationalCourse: REVIEW_MODULE_TYPE_TOKEN_SIMPOL + "1",
    EducationalCourseLevel: REVIEW_MODULE_TYPE_TOKEN_SIMPOL + "2",
  },
};

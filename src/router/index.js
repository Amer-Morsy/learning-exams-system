import Vue from "vue";
import VueRouter from "vue-router";
import i18n from "../i18n/index";
import store from "../store";
import { USER_TYPE } from "../utils/constantLists";
import {
  USER_MODEL_NAME,
  ESTABLISHMENTROLE_MODEL_NAME,
  LOGINCODE_MODEL_NAME,
  WALLETTRANSACTION_MODEL_NAME,
} from "../utils/constants";
import AppSetupController from "./../controllers/AppSetupController";
import PrivilegeController from "./../controllers/privilege/PrivilegeController";
import Home from "../views/home/Home.vue";
import QuestionBankTitles from "../views/additional/educational/questionBankTitles/QuestionBankTitles.vue";
import EducationalCategories from "../views/educationals/educationalCategories/EducationalCategories.vue";
import EducationalTeachers from "../views/educationals/educationalTeachers/EducationalTeachers.vue";
import EducationalCourses from "../views/educationals/educationalCourses/EducationalCourses.vue";
import EducationalCourseLevels from "../views/educationals/educationalCourseLevels/EducationalCourseLevels.vue";
import EducationalCourseLevelQuestions from "../views/educationals/educationalCourseLevelQuestions/EducationalCourseLevelQuestions.vue";
import QuestionParagraphs from "../views/additional/educational/questionParagraphs/QuestionParagraphs.vue";
import QuestionBanks from "../views/additional/educational/questionBanks/QuestionBanks.vue";
import Questions from "../views/additional/educational/questions/Questions.vue";
import Users from "../views/users/Users.vue";
import UsersNotApproved from "./../views/users/usersNotApproved/UsersNotApproved.vue";
import EstablishmentRoles from "../views/establishmentRoles/EstablishmentRoles.vue";
import UserLoginCodes from "../views/userLoginCodes/UserLoginCodes.vue";
import UserWalletTransactions from "../views/userWalletTransactions/UserWalletTransactions.vue";
import Reports from "../views/reports/Reports.vue";
import Login from "../views/users/Login.vue";
import Test from "../views/Test.vue";
import InvalidLoginClode from "../views/userLoginCodes/UserLoginCodesUseCode.vue";

Vue.use(VueRouter);

const APPLAYOUTS = AppSetupController.appLayouts();

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      pageName: i18n.t("homePage"),
      pageIcon: "home.svg",
      layout: APPLAYOUTS.auth,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      pageName: i18n.t("login"),
      pageIcon: "login1.svg",
      layout: APPLAYOUTS.auth,
    },
  },

  {
    path: "/test",
    name: "Test",
    component: Test,
    meta: {
      name: "Test",
      icon: "home.svg",
      layout: APPLAYOUTS.blank,
    },
  },

  //#region Users
  {
    path: "/users/students/:userToken?",
    name: "Students",
    components: {
      default: Users,
    },
    meta: {
      pageName: i18n.t("students.modelName"),
      pageIcon: "students.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .Student,
      userTypeToken: USER_TYPE.Student,
      modelName: USER_MODEL_NAME.Student,
      StorageSpacesRoute: "StorageSpacesStudents",
    },
    props: true,
  },
  {
    path: "/users/students-not-approved",
    name: "StudentsNotApproved",
    component: UsersNotApproved,
    meta: {
      pageName: i18n.t("students.notApproved"),
      pageIcon: "students.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .Student,
      userTypeToken: USER_TYPE.Student,
      modelName: USER_MODEL_NAME.Student,
    },
    props: true,
  },
  {
    path: "/users/teachers/:userToken?",
    name: "Teachers",
    components: {
      default: Users,
    },
    meta: {
      pageName: i18n.t("Teachers.modelName"),
      pageIcon: "teacher.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .Teacher,
      userTypeToken: USER_TYPE.Teacher,
      modelName: USER_MODEL_NAME.Teacher,
      StorageSpacesRoute: "StorageSpacesTeachers",
    },
    props: true,
  },
  {
    path: "/users/teachers-not-approved",
    name: "TeachersNotApproved",
    component: UsersNotApproved,
    meta: {
      pageName: i18n.t("students.notApproved"),
      pageIcon: "teacher.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .Teacher,
      userTypeToken: USER_TYPE.Teacher,
      modelName: USER_MODEL_NAME.Teacher,
    },
    props: true,
  },
  {
    path: "/users/employees/:userToken?",
    name: "Employees",
    components: {
      default: Users,
    },
    meta: {
      pageName: i18n.t("Employees.modelName"),
      pageIcon: "employees.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .Employee,
      userTypeToken: USER_TYPE.Employee,
      modelName: USER_MODEL_NAME.Employee,
      StorageSpacesRoute: "StorageSpacesEmployees",
    },
    props: true,
  },
  {
    path: "/users/masterAdmins/:userToken?",
    name: "MasterAdmins",
    components: {
      default: Users,
    },
    meta: {
      pageName: i18n.t("masterAdmins.modelName"),
      pageIcon: "masterAdmins.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .MasterAdmin,
      userTypeToken: USER_TYPE.MasterAdmin,
      modelName: USER_MODEL_NAME.MasterAdmin,
      StorageSpacesRoute: "StorageSpacesMasterAdmins",
    },
    props: true,
  },
  //#endregion Users

  //#region EstablishmentRoles
  {
    path: "/establishmentRoles/students",
    name: "StudentEstablishmentsRoles",
    components: {
      default: EstablishmentRoles,
    },
    meta: {
      pageName: i18n.t("students.modelName"),
      pageIcon: "students.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .StudentEstablishmentsRole,
      userTypeToken: USER_TYPE.Student,
      modelName: ESTABLISHMENTROLE_MODEL_NAME.StudentEstablishmentsRole,
    },
    props: true,
  },
  {
    path: "/establishmentRoles/teachers",
    name: "TeacherEstablishmentsRoles",
    components: {
      default: EstablishmentRoles,
    },
    meta: {
      pageName: i18n.t("Teachers.modelName"),
      pageIcon: "teacher.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .TeacherEstablishmentsRole,
      userTypeToken: USER_TYPE.Teacher,
      modelName: ESTABLISHMENTROLE_MODEL_NAME.TeacherEstablishmentsRole,
    },
    props: true,
  },
  {
    path: "/establishmentRoles/employees",
    name: "EmployeeEstablishmentsRoles",
    components: {
      default: EstablishmentRoles,
    },
    meta: {
      pageName: i18n.t("Employees.modelName"),
      pageIcon: "employees.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .EmployeeEstablishmentsRole,
      userTypeToken: USER_TYPE.Employee,
      modelName: ESTABLISHMENTROLE_MODEL_NAME.EmployeeEstablishmentsRole,
    },
    props: true,
  },
  {
    path: "/establishmentRoles/masterAdmins",
    name: "MasterAdminEstablishmentsRoles",
    components: {
      default: EstablishmentRoles,
    },
    meta: {
      pageName: i18n.t("masterAdmins.modelName"),
      pageIcon: "masterAdmins.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .MasterAdminEstablishmentsRole,
      userTypeToken: USER_TYPE.MasterAdmin,
      modelName: ESTABLISHMENTROLE_MODEL_NAME.MasterAdminEstablishmentsRole,
    },
    props: true,
  },
  //#region ModulePrivilege
  {
    path: "/privileges/edit/:establishmentRoleToken?/:modelName?",
    name: "Privileges",
    component: () =>
      import("./../views/modulePrivileges/ModulePrivilegeEdit.vue"),

    props: true,
    meta: {
      pageName: i18n.t("Privileges.modelName"),
      pageIcon: "privileges.svg",
      layout: APPLAYOUTS.dashboard,
    },
  },
  //#endregion ModulePrivilege
  //#endregion EstablishmentRoles

  //#region UserLoginCodes
  {
    path: "/userLoginCodes/students/:userLoginCodeToken?",
    name: "StudentLoginCodes",
    components: {
      default: UserLoginCodes,
    },
    meta: {
      pageName: i18n.t("students.modelName"),
      pageIcon: "students.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .StudentLoginCode,
      userTypeToken: USER_TYPE.Student,
      modelName: LOGINCODE_MODEL_NAME.StudentLoginCode,
    },
    props: true,
  },
  {
    path: "/userLoginCodes/teachers/:userLoginCodeToken?",
    name: "TeacherLoginCodes",
    components: {
      default: UserLoginCodes,
    },
    meta: {
      pageName: i18n.t("Teachers.modelName"),
      pageIcon: "teacher.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .TeacherLoginCode,
      userTypeToken: USER_TYPE.Teacher,
      modelName: LOGINCODE_MODEL_NAME.TeacherLoginCode,
    },
    props: true,
  },
  {
    path: "/userLoginCodes/employees/:userLoginCodeToken?",
    name: "EmployeeLoginCodes",
    components: {
      default: UserLoginCodes,
    },
    meta: {
      pageName: i18n.t("Employees.modelName"),
      pageIcon: "employees.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .EmployeeLoginCode,
      userTypeToken: USER_TYPE.Employee,
      modelName: LOGINCODE_MODEL_NAME.EmployeeLoginCode,
    },
    props: true,
  },
  {
    path: "/userLoginCodes/masterAdmins/:userLoginCodeToken?",
    name: "MasterAdminLoginCodes",
    components: {
      default: UserLoginCodes,
    },
    meta: {
      pageName: i18n.t("masterAdmins.modelName"),
      pageIcon: "masterAdmins.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .MasterAdminLoginCode,
      userTypeToken: USER_TYPE.MasterAdmin,
      modelName: LOGINCODE_MODEL_NAME.MasterAdminLoginCode,
    },
    props: true,
  },
  //#endregion UserLoginCodes

  //#region additional
  //#region QuestionBankTitles
  {
    path: "/additional/educational/question-bank-titles/:userTeacherToken?",
    name: "QuestionBankTitles",
    component: QuestionBankTitles,
    props: true,
    meta: {
      pageName: i18n.t("QuestionBankTitles.modelName"),
      pageIcon: "questionBankTitle.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .QuestionBankTitle,
    },
  },
  //#endregion QuestionBankTitles

  //#region QuestionParagraphs
  {
    path: "/additional/educational/question-paragraphs/:userTeacherToken?",
    name: "QuestionParagraphs",
    component: QuestionParagraphs,
    props: true,
    meta: {
      pageName: i18n.t("QuestionParagraphs.modelName"),
      pageIcon: "questionParagraph.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .QuestionParagraph,
    },
  },
  //#endregion QuestionParagraphs

  //#region QuestionBanks
  {
    path: "/additional/educational/question-banks/:userTeacherToken?",
    name: "QuestionBanks",
    component: QuestionBanks,
    props: true,
    meta: {
      pageName: i18n.t("QuestionBanks.modelName"),
      pageIcon: "questionBank.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .QuestionBank,
    },
  },
  //#endregion QuestionBanks

  //#region Questions
  {
    path: "/additional/educational/questions/:userTeacherToken?",
    name: "Questions",
    component: Questions,
    props: true,
    meta: {
      pageName: i18n.t("Questions.modelName"),
      pageIcon: "question.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .Question,
    },
  },
  //#endregion Questions
  //#endregion additional

  //#region educationals
  //#region EducationalCategories
  {
    path:
      "/educationals/educationalCategories/:parentEducationalCategoryToken?",
    name: "EducationalCategories",
    component: EducationalCategories,
    props: true,
    meta: {
      pageName: i18n.t("EducationalCategories.modelName"),
      pageIcon: "EducationalCategories.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .EducationalCategory,
    },
  },

  //#endregion EducationalCategories

  //#region EducationalTeachers
  {
    path:
      "/educationals/educationalTeachers/:parentEducationalCategoryToken?/:educationalCategoryToken?",
    name: "EducationalTeachers",
    component: EducationalTeachers,
    props: true,
    meta: {
      pageName: i18n.t("Teachers.modelName"),
      pageIcon: "EducationalTeachers.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .EducationalTeacher,
    },
  },

  //#endregion EducationalTeachers

  //#region EducationalCourses
  {
    path:
      "/educationals/educationalCourses/:parentEducationalCategoryToken?/:educationalCategoryToken?/:userTeacherToken?",
    name: "EducationalCourses",
    component: EducationalCourses,
    props: true,
    meta: {
      pageName: i18n.t("EducationalCourses.modelName"),
      pageIcon: "EducationalCourses.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .EducationalCourse,
    },
  },

  //#endregion EducationalCourses

  //#region EducationalCourseLevels
  {
    path: "/educationals/educationalCourseLevels/:educationalCourseToken?",
    name: "EducationalCourseLevels",
    component: EducationalCourseLevels,
    props: true,
    meta: {
      pageName: i18n.t("EducationalCourseLevels.modelName"),
      pageIcon: "EducationalCourseLevels.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .EducationalCourseLevel,
    },
  },
  //#endregion EducationalCourseLevels

  //#region EducationalCourseLevelQuestions
  {
    path:
      "/educationals/educationalCourseLevelQuestions/:educationalCourseLevelToken?",
    name: "EducationalCourseLevelQuestions",
    component: EducationalCourseLevelQuestions,
    props: true,
    meta: {
      pageName: i18n.t("EducationalCourseLevelQuestions.modelName"),
      pageIcon: "EducationalCourseLevelQuestions.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .EducationalCourseLevel,
    },
  },

  //#endregion EducationalCourseLevelQuestions

  //#endregion educationals

  //#region UserWalletTransactions
  {
    path: "/userWalletTransactions/students/:userToken?",
    name: "StudentUserWalletTransaction",
    component: UserWalletTransactions,
    props: true,
    meta: {
      pageName: i18n.t("students.modelName"),
      pageIcon: "UserWalletTransactions.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .StudentUserWalletTransaction,
      userTypeToken: USER_TYPE.Student,
      modelName: WALLETTRANSACTION_MODEL_NAME.StudentUserWalletTransaction,
    },
  },
  {
    path: "/userWalletTransactions/teachers/:userToken?",
    name: "TeacherUserWalletTransaction",
    component: UserWalletTransactions,
    meta: {
      pageName: i18n.t("Teachers.modelName"),
      pageIcon: "UserWalletTransactions.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .TeacherUserWalletTransaction,
      userTypeToken: USER_TYPE.Teacher,
      modelName: WALLETTRANSACTION_MODEL_NAME.TeacherUserWalletTransaction,
    },
    props: true,
  },
  // pay-salary
  {
    path:
      "/userWalletTransactions/teachers/:userToken?/:userWalletTransactionTypeToken?",
    name: "PaySalaryTeacherUserWalletTransaction",
    component: UserWalletTransactions,
    meta: {
      pageName: `${i18n.t("paySalary")} - ${i18n.t("Teachers.modelName")}`,
      pageIcon: "money.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .TeacherUserWalletTransaction,
      userTypeToken: USER_TYPE.Teacher,
      modelName: WALLETTRANSACTION_MODEL_NAME.TeacherUserWalletTransaction,
    },
    props: true,
  },
  {
    path: "/userWalletTransactions/employees/:userToken?",
    name: "EmployeeUserWalletTransaction",
    component: UserWalletTransactions,
    meta: {
      pageName: i18n.t("Employees.modelName"),
      pageIcon: "UserWalletTransactions.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .EmployeeUserWalletTransaction,
      userTypeToken: USER_TYPE.Employee,
      modelName: WALLETTRANSACTION_MODEL_NAME.EmployeeUserWalletTransaction,
    },
    props: true,
  },
  {
    path: "/userWalletTransactions/masterAdmins/:userToken?",
    name: "MasterAdminUserWalletTransaction",
    component: UserWalletTransactions,
    meta: {
      pageName: i18n.t("masterAdmins.modelName"),
      pageIcon: "UserWalletTransactions.svg",
      layout: APPLAYOUTS.dashboard,
      privilegeModuleToken: PrivilegeController.getPrivilegeModuleTokens()
        .MasterAdminUserWalletTransaction,
      userTypeToken: USER_TYPE.MasterAdmin,
      modelName: WALLETTRANSACTION_MODEL_NAME.MasterAdminUserWalletTransaction,
    },
    props: true,
  },
  //#endregion UserWalletTransactions

  {
    path: "/invalid-login-clode",
    name: "InvalidLoginClode",
    component: InvalidLoginClode,
    meta: {
      pageName: "InvalidLoginClode",
      pageIcon: "home.svg",
      layout: APPLAYOUTS.blank,
    },
  },

  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    meta: {
      pageName: i18n.t("Reports.modelName"),
      pageIcon: "statistics.svg",
      layout: APPLAYOUTS.dashboard,
    },
  },
  //#region Error
  {
    path: "/error-404",
    name: "Error404",
    components: {
      default: () => import("./../views/errors/Error-404.vue"),
      Login: Login,
    },
    meta: {
      pageName: "pageNotFound",
      pageIcon: "404-icon.svg",
      layout: APPLAYOUTS.blank,
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "Error404" },
    meta: {
      layout: APPLAYOUTS.blank,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.pageName} | ${i18n.t("projectName")}`;

  if (store.getters.invalidLoginCodeStatus && to.name != "InvalidLoginClode") {
    return next({ name: "InvalidLoginClode" });
  }

  if (to.matched.some((res) => res.meta.layout == APPLAYOUTS.dashboard)) {
    if (!store.getters.loginStatus) {
      return next({ name: "Home" });
    } else {
      if (to.name == "Privileges") {
        let hasUpdate = PrivilegeController.hasUpdate(
          PrivilegeController.getPrivilegeModuleTokens()[to.params.modelName]
        );
        if (!hasUpdate) return next({ name: "Error404" });
      } else if (to.name == "Home") {
        return next({ name: "Home" });
      } else {
        let hasView = PrivilegeController.hasView(to.meta.privilegeModuleToken);
        if (!hasView) return next({ name: "Home" });
      }
    }
  }

  if (store.getters.loginStatus && (to.name == "Home" || to.name == "Login")) {
    return next({ name: "Home" });
  }

  return next();
});

export default router;

// import { ModulesPrivilege, LoginGeneralFunctions } from "./privilegeTokens";

export default class UsersPrivilegeData {
  ModulesPrivilege = [
    "StudentEstablishmentsRole",
    "TeacherEstablishmentsRole",
    "EmployeeEstablishmentsRole",
    "MasterAdminEstablishmentsRole",
    "Student",
    "Teacher",
    "Employee",
    "MasterAdmin",
    "QuestionBankTitle",
    "QuestionParagraph",
    "QuestionBank",
  ];

  initialFunctions = {
    changeActivationType: false,
    viewActive: false,
    viewBlocked: false,
    view: false,
    viewDialogActive: false,
    viewDialogBlocked: false,
    viewDialog: false,
    viewReportActive: false,
    viewReportBlocked: false,
    viewReport: false,
    itemAdd: false,
    itemUpdate: false,
    itemActive: false,
    itemBlocked: false,
    itemDeleteImage: false,
    itemFinaleDelete: false,
    // CUSTOM
    notificationView: false,
    notificationRead: false,
    notificationOpen: false,
    notificationAdd: false,
  };
  LoginGeneralFunctions = {
    changeActivationType: false,
    viewActive: false,
    viewBlocked: false,
    view: false,
    viewDialogActive: false,
    viewDialogBlocked: false,
    viewDialog: false,
    viewReportActive: false,
    viewReportBlocked: false,
    viewReport: false,
    itemAdd: false,
    itemUpdate: false,
    itemActive: false,
    itemBlocked: false,
    itemDeleteImage: false,
  };

  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.hasPrivilegeData = false;
  }
  fillData(data) {
    if (data.length) {
      this.hasPrivilegeData = true;
      this.setModulePrivilege(data);
    } else {
      this.setInitialModulePrivilegeValue();
    }
  }
  setModulePrivilege(privilegeData) {
    for (const module in this.ModulesPrivilege) {
      let modulePrivilegeItem = "";
      modulePrivilegeItem = privilegeData.find(
        (element) => element.moduleToken == this.ModulesPrivilege[module]
      );

      if (modulePrivilegeItem) {
        this[module] = {};
        for (const privilegeFunction in this.LoginGeneralFunctions) {
          let functionItem = modulePrivilegeItem.modulePrivilegeFuncations.find(
            (func) =>
              func.funcationToken ==
              this.LoginGeneralFunctions[privilegeFunction]
          );

          if (functionItem) {
            this[module][privilegeFunction] =
              functionItem.funcationPrivilegeStatus;
          }
        }

        if (this[module]) {
          if (
            this[module]["viewActive"] != undefined &&
            this[module]["viewBlocked"] != undefined
          ) {
            this[module]["view"] =
              this[module]["viewActive"] || this[module]["viewBlocked"];
          }

          if (
            this[module]["viewDialogActive"] != undefined &&
            this[module]["viewDialogBlocked"] != undefined
          ) {
            this[module]["viewDialog"] =
              this[module]["viewDialogActive"] ||
              this[module]["viewDialogBlocked"];
          }

          if (
            this[module]["viewReportActive"] != undefined &&
            this[module]["viewReportBlocked"] != undefined
          ) {
            this[module]["viewReport"] =
              this[module]["viewReportActive"] ||
              this[module]["viewReportBlocked"];
          }

          if (
            this[module]["itemActive"] != undefined &&
            this[module]["itemBlocked"] != undefined
          ) {
            this[module]["changeActivationType"] =
              this[module]["itemActive"] || this[module]["itemBlocked"];
          }
        }
      } else {
        this[module] = this.initialFunctions;
      }
    }
  }

  setInitialModulePrivilegeValue() {
    for (const module in this.ModulesPrivilege) {
      this[module] = {};
      this[module] = this.initialFunctions;
    }
  }
}

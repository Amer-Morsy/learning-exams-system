import store from "../../store";
import {
  ModulesPrivilege,
  GuardGeneralFunctions,
  LoginCodesPrivlage,
  EducationalCourseLevelsPrivlage,
  EducationalPeriodsPrivlage,
} from "./PrivilegeTokens";
import { USER_TYPE } from "../../utils/constantLists";

export default class PrivilegeController {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.moduleNames = Object.keys(ModulesPrivilege);
    this.privilegeModuleTokens = ModulesPrivilege;
    this.guardGeneralFunctions = GuardGeneralFunctions;
    this.loginCodesPrivlageFunctions = LoginCodesPrivlage;
    this.educationalCourseLevelsPrivlageFunctions = EducationalCourseLevelsPrivlage;
    this.educationalPeriodsPrivlageFunctions = EducationalPeriodsPrivlage;
  }

  static getModuleNamesList() {
    return this.moduleNames ?? Object.keys(ModulesPrivilege);
  }

  static getModuleNamesObject() {
    const obj = {};
    for (const key of ModulesPrivilege) {
      obj[key] = key;
    }
    return obj;
  }

  static getPrivilegeModuleTokens() {
    return this.privilegeModuleTokens ?? ModulesPrivilege;
  }
  static getGuardGeneralFunctions() {
    return this.guardGeneralFunctions ?? GuardGeneralFunctions;
  }
  static getLoginCodesPrivlageFunctions() {
    return this.loginCodesPrivlageFunctions ?? LoginCodesPrivlage;
  }
  static getEducationalCourseLevelsPrivlageFunctions() {
    return (
      this.educationalCourseLevelsPrivlageFunctions ??
      EducationalCourseLevelsPrivlage
    );
  }
  static getEducationalPeriodsPrivlageFunctions() {
    return (
      this.educationalPeriodsPrivlageFunctions ?? EducationalPeriodsPrivlage
    );
  }

  static isAdminsEgyptLogged() {
    let check = false;
    try {
      check =
        store.getters.userPersonalData.userTypeToken == USER_TYPE.AdminsEgypt;
    } catch (error) {
      check = false;
    }

    return check;
  }

  static checkPrivilege(token, func, isCustom = false) {
    let check = false;
    if (this.isAdminsEgyptLogged()) {
      check = true;
    } else {
      let allSystemPrivileges = store.getters.usersPrivilegeData ?? [];
      if (allSystemPrivileges.length) {
        if (!isCustom) {
          let privilegeFunctions = allSystemPrivileges
            .filter(function(p) {
              return p.moduleToken === token;
            })
            .map((p) => p.modulePrivilegeFuncations)[0];

          if (!privilegeFunctions) {
            return check;
          }

          let funcationPrivilegeStatus = privilegeFunctions
            .filter(function(f) {
              return f.funcationToken === func;
            })
            .map((f) => f.funcationPrivilegeStatus)[0];

          check = funcationPrivilegeStatus ?? false;
        } else {
          // console.log(token, func);
          let privilegeFunctions = allSystemPrivileges
            .filter(function(p) {
              return p.moduleToken === token;
            })
            .map((p) => p.modulePrivilegeFuncations)[0];

          if (!privilegeFunctions) {
            return check;
          }

          let funcationPrivilegeStatus = privilegeFunctions
            .filter(function(f) {
              return f.funcationToken === token + func;
            })
            .map((f) => f.funcationPrivilegeStatus)[0];

          check = funcationPrivilegeStatus ?? false;
        }
      }
    }
    return check;
  }

  static hasView(token) {
    let check = false;
    let hasViewActive = this.checkPrivilege(
      token,
      this.getGuardGeneralFunctions().viewActive
    );
    let hasViewBlocked = this.checkPrivilege(
      token,
      this.getGuardGeneralFunctions().viewBlocked
    );
    check = hasViewActive || hasViewBlocked;
    // console.log(check);
    return check;
  }

  static hasAdd(token) {
    return this.checkPrivilege(token, this.getGuardGeneralFunctions().itemAdd);
  }

  static hasUpdate(token) {
    return this.checkPrivilege(
      token,
      this.getGuardGeneralFunctions().itemUpdate
    );
  }

  static hasViewDialogActive(token) {
    return this.checkPrivilege(
      token,
      this.getGuardGeneralFunctions().viewDialogActive
    );
  }
  static hasViewDialogBlocked(token) {
    return this.checkPrivilege(
      token,
      this.getGuardGeneralFunctions().viewDialogBlocked
    );
  }
  static hasViewDialog(token) {
    let check = false;
    let hasViewDialogActive = this.hasViewDialogActive(token);
    let hasViewDialogBlocked = this.hasViewDialogBlocked(token);
    check = hasViewDialogActive || hasViewDialogBlocked;

    return check;
  }

  static hasActive(token) {
    return this.checkPrivilege(
      token,
      this.getGuardGeneralFunctions().itemActive
    );
  }
  static hasBlocked(token) {
    return this.checkPrivilege(
      token,
      this.getGuardGeneralFunctions().itemBlocked
    );
  }
  static hasChangeActivationType(token) {
    let check = false;
    let hasActive = this.hasActive(token);
    let hasBlocked = this.hasBlocked(token);
    check = hasActive || hasBlocked;
    return check;
  }

  static hasDeleteImage(token) {
    return this.checkPrivilege(
      token,
      this.getGuardGeneralFunctions().itemDeleteImage
    );
  }

  static hasFinaleDelete(token) {
    return this.checkPrivilege(
      token,
      this.getGuardGeneralFunctions().itemFinaleDelete
    );
  }

  // Custom
  static hasResetUserLoginCode(token) {
    return this.checkPrivilege(
      token,
      this.getLoginCodesPrivlageFunctions().ResetUserLoginCode,
      true
    );
  }
  static hasResetUserDeviceUniqueCode(token) {
    return this.checkPrivilege(
      token,
      this.getLoginCodesPrivlageFunctions().ResetUserDeviceUniqueCode,
      true
    );
  }

  static hasChangeSortEducationalCourseLevel(token) {
    return this.checkPrivilege(
      token,
      this.getEducationalCourseLevelsPrivlageFunctions().ChangeSort,
      true
    );
  }

  static hasChangeFreezeEducationalCourseLevel(token) {
    return this.checkPrivilege(
      token,
      this.getEducationalCourseLevelsPrivlageFunctions().ChangeFreeze,
      true
    );
  }

  static hasUpdateQuestionsEducationalCourseLevel(token) {
    return this.checkPrivilege(
      token,
      this.getEducationalCourseLevelsPrivlageFunctions().UpdateQuestions,
      true
    );
  }

  static hasStartEducationalPeriod(token) {
    return this.checkPrivilege(
      token,
      this.getEducationalPeriodsPrivlageFunctions().Start,
      true
    );
  }
  static hasEndEducationalPeriod(token) {
    return this.checkPrivilege(
      token,
      this.getEducationalPeriodsPrivlageFunctions().End,
      true
    );
  }
}

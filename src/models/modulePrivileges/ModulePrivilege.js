import ModulePrivilegeFuncation from "./ModulePrivilegeFuncation";

import ModulePrivilegeImg from "@/assets/images/privileges.svg";

export default class ModulePrivilege {
  defaultImg = ModulePrivilegeImg;
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.establishmentRoleToken = "";
    this.moduleToken = "";
    this.moduleOrderNumbe = "";
    this.moduleNameCurrent = "";
    this.moduleNameAr = "";
    this.moduleNameEn = "";
    this.moduleImagePath = "";
    this.isHavePrivlage = "";
    this.modulePrivilegeFuncations = [new ModulePrivilegeFuncation()];
  }
  fillData(data) {
    if (data) {
      this.moduleToken = data.moduleToken ?? "";
      this.moduleOrderNumbe = data.moduleOrderNumbe ?? "";
      this.moduleNameCurrent = data.moduleNameCurrent ?? "";
      this.moduleNameAr = data.moduleNameAr ?? "";
      this.moduleNameEn = data.moduleNameEn ?? "";
      this.moduleImagePath = data.moduleImagePath ?? "";
      this.isHavePrivlage = data.isHavePrivlage ?? "";
      this.modulePrivilegeFuncations = data.modulePrivilegeFuncations ?? [
        new ModulePrivilegeFuncation(),
      ];
    } else {
      this.setInitialValue();
    }
  }

  // async getModulePrivilegeDetails() {
  //   return await axios.get(
  //     `/api/EstablishmentsRolesPrivileges/GetEstablishmentsRolesPrivilegeDetails?token=${this.establishmentRoleToken}`,
  //     this.basicImport.apiHeader
  //   );
  // }

  // async updateModulePrivilege(modulePrivilegeData) {
  //   var data = {
  //     language: this.basicImport.language,
  //     userAuthorizeToken: this.basicImport.userAuthorizeToken,
  //     establishmentRoleToken: this.establishmentRoleToken,
  //     modulePrivilegeData: modulePrivilegeData,
  //   };

  //   return await axios.post(
  //     `/api/EstablishmentsRolesPrivileges/UpdateEstablishmentsRolesPrivilege`,
  //     data
  //   );
  // }
}
//#endregion model

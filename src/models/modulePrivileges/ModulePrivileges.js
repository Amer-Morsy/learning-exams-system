import ModulePrivilege from "./ModulePrivilege";

export default class ModulePrivileges {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.status = 0;
    this.msg = "";
    this.modulePrivilegeData = [];
    this.modulePrivilege = new ModulePrivilege();
  }
  fillData(data) {
    this.status = data.status;
    this.msg = data.msg;
    this.modulePrivilegeData = data.modulePrivilegeData;
  }
}

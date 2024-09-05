import GeneralSettingModel from "./GeneralSettingModel";
import PrivilegeController from "./../../../controllers/privilege/PrivilegeController";

const ModuleNames = PrivilegeController.getModuleNamesList();

export default class GeneralSetting {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    ModuleNames.forEach((module) => {
      this[module] = new GeneralSettingModel();
    });
  }
  fillData(data) {
    if (data) {
      ModuleNames.forEach((module) => {
        this[module].fillData(data[this[module]]);
      });
    } else {
      this.setInitialValue();
    }
  }
}

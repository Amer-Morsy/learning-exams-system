import ActivationStatistics from "./../general/ActivationStatistics";
import UserLoginCode from "./UserLoginCode";
import UserLoginCodesFilter from "./UserLoginCodesFilter";
import PrivilegeController from "./../../controllers/privilege/PrivilegeController";
import { LOGINCODE_MODEL_NAME } from "./../../utils/constants";

export default class UserLoginCodes {
  constructor(modelName) {
    this.metaData = this.getMetaData(modelName);
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName) {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.activationStatistics = new ActivationStatistics();
    this.userLoginCodesData = [];
    this.userLoginCode = new UserLoginCode();
    this.filterData = new UserLoginCodesFilter(modelName);
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort;
      this.activationStatistics.fillData(data.activationStatistics);
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.userLoginCodesData = data.userLoginCodesData || [];
    } else {
      this.setInitialValue();
    }
  }
  getMetaData(modelName) {
    return {
      name: LOGINCODE_MODEL_NAME[modelName],
      privileges: {
        view: PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens()[modelName]
        ),
        dialog: PrivilegeController.hasViewDialog(
          PrivilegeController.getPrivilegeModuleTokens()[modelName]
        ),
        add: PrivilegeController.hasAdd(
          PrivilegeController.getPrivilegeModuleTokens()[modelName]
        ),
        update: PrivilegeController.hasUpdate(
          PrivilegeController.getPrivilegeModuleTokens()[modelName]
        ),
        active: PrivilegeController.hasActive(
          PrivilegeController.getPrivilegeModuleTokens()[modelName]
        ),
        block: PrivilegeController.hasBlocked(
          PrivilegeController.getPrivilegeModuleTokens()[modelName]
        ),
        changeActivationType: PrivilegeController.hasChangeActivationType(
          PrivilegeController.getPrivilegeModuleTokens()[modelName]
        ),
        deleteImage: PrivilegeController.hasDeleteImage(
          PrivilegeController.getPrivilegeModuleTokens()[modelName]
        ),
        finalDelete: PrivilegeController.hasFinaleDelete(
          PrivilegeController.getPrivilegeModuleTokens()[modelName]
        ),
        resetUserLoginCode: PrivilegeController.hasResetUserLoginCode(
          PrivilegeController.getPrivilegeModuleTokens()[modelName]
        ),
        resetUserDeviceUniqueCode: PrivilegeController.hasResetUserDeviceUniqueCode(
          PrivilegeController.getPrivilegeModuleTokens()[modelName]
        ),
      },
      components: {
        Add: {
          type: "bottomSheet",
          refName: "UserLoginCodesAdd",
          link: "userLoginCodes/components/Add.vue",
        },
        Update: {
          type: "bottomSheet",
          refName: "UserLoginCodesUpdate",
          link: "userLoginCodes/components/Update.vue",
        },
        Info: {
          type: "bottomSheet",
          refName: "UserLoginCodesInfo",
          link: "userLoginCodes/components/Info.vue",
        },
        Delete: {
          type: "modal",
          refName: "UserLoginCodesDelete",
          link: "userLoginCodes/components/Delete.vue",
        },
        ChangeActivationType: {
          type: "modal",
          refName: "UserLoginCodesChangeActivationType",
          link: "userLoginCodes/components/ChangeActivationType.vue",
        },
        Filter: {
          type: "bottomSheet",
          refName: "UserLoginCodesFilter",
          link: "userLoginCodes/components/Filter.vue",
        },
        Sort: {
          type: "bottomSheet",
          refName: "UserLoginCodesSort",
          link: "userLoginCodes/components/Sort.vue",
        },
      },
    };
  }
}

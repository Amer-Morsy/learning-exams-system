import ActivationStatistics from "./../general/ActivationStatistics";
import User from "./User";
import UsersFilter from "./UsersFilter";
import PrivilegeController from "./../../controllers/privilege/PrivilegeController";
import { USER_MODEL_NAME } from "./../../utils/constants";

export default class Users {
  constructor(modelName) {
    this.metaData = this.getMetaData(modelName);
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName) {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.activationStatistics = new ActivationStatistics();
    this.usersData = [];
    this.user = new User();
    this.filterData = new UsersFilter(modelName);
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort;
      this.activationStatistics.fillData(data.activationStatistics);
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.usersData = data.usersData || [];
    } else {
      this.setInitialValue();
    }
  }
  getMetaData(modelName) {
    return {
      name: USER_MODEL_NAME[modelName],
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
      },
      components: {
        Add: {
          type: "bottomSheet",
          refName: "UsersAdd",
          link: "users/components/Add.vue",
        },
        Update: {
          type: "bottomSheet",
          refName: "UsersUpdate",
          link: "users/components/Update.vue",
        },
        Info: {
          type: "bottomSheet",
          refName: "UsersInfo",
          link: "users/components/Info.vue",
        },
        Delete: {
          type: "modal",
          refName: "UsersDelete",
          link: "users/components/Delete.vue",
        },
        ChangeActivationType: {
          type: "modal",
          refName: "UsersChangeActivationType",
          link: "users/components/ChangeActivationType.vue",
        },
        Filter: {
          type: "bottomSheet",
          refName: "UsersFilter",
          link: "users/components/Filter.vue",
        },
        Sort: {
          type: "bottomSheet",
          refName: "UsersSort",
          link: "users/components/Sort.vue",
        },
      },
    };
  }
}

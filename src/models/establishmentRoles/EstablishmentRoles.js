import EstablishmentRole from "./EstablishmentRole";
import EstablishmentRolesFilter from "./EstablishmentRolesFilter";
import GeneralModel from "./../general/GeneralModel";
import PrivilegeController from "./../../controllers/privilege/PrivilegeController";
import { ESTABLISHMENTROLE_MODEL_NAME } from "./../../utils/constants";

export default class EstablishmentRoles extends GeneralModel {
  constructor(modelName) {
    super();
    this.metaData = this.getMetaData(modelName);
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName) {
    this.setGeneralModelInitialValue();
    this.establishmentRolesData = [];
    this.establishmentRole = new EstablishmentRole();
    this.filterData = new EstablishmentRolesFilter(modelName);
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.establishmentRolesData = data.establishmentRolesData ?? [];
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }

  getMetaData(modelName) {
    return {
      name: ESTABLISHMENTROLE_MODEL_NAME[modelName],
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
          refName: "EstablishmentRolesAdd",
          link: "establishmentRoles/components/Add.vue",
        },
        Update: {
          type: "bottomSheet",
          refName: "EstablishmentRolesUpdate",
          link: "establishmentRoles/components/Update.vue",
        },
        Info: {
          type: "bottomSheet",
          refName: "EstablishmentRolesInfo",
          link: "establishmentRoles/components/Info.vue",
        },
        Delete: {
          type: "modal",
          refName: "EstablishmentRolesDelete",
          link: "establishmentRoles/components/Delete.vue",
        },
        ChangeActivationType: {
          type: "modal",
          refName: "EstablishmentRolesChangeActivationType",
          link: "establishmentRoles/components/ChangeActivationType.vue",
        },
        Filter: {
          type: "bottomSheet",
          refName: "EstablishmentRolesFilter",
          link: "establishmentRoles/components/Filter.vue",
        },
        Sort: {
          type: "bottomSheet",
          refName: "EstablishmentRolesSort",
          link: "establishmentRoles/components/Sort.vue",
        },
      },
    };
  }
}

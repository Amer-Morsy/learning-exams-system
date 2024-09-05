import GeneralModel from "./../../../general/GeneralModel";
import QuestionBank from "./QuestionBank";
import QuestionBanksFilter from "./QuestionBanksFilter";
import PrivilegeController from "./../../../../controllers/privilege/PrivilegeController";

export default class QuestionBanks extends GeneralModel {
  constructor() {
    super();
    this.metaData = this.getMetaData();
    this.setInitialValue();
  }
  getMetaData() {
    return {
      name: PrivilegeController.getPrivilegeModuleTokens().QuestionBank,
      privileges: {
        view: PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBank
        ),
        dialog: PrivilegeController.hasViewDialog(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBank
        ),
        add: PrivilegeController.hasAdd(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBank
        ),
        update: PrivilegeController.hasUpdate(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBank
        ),
        active: PrivilegeController.hasActive(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBank
        ),
        block: PrivilegeController.hasBlocked(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBank
        ),
        changeActivationType: PrivilegeController.hasChangeActivationType(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBank
        ),
        deleteImage: PrivilegeController.hasDeleteImage(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBank
        ),
        finalDelete: PrivilegeController.hasFinaleDelete(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBank
        ),
      },
      components: {
        Add: {
          type: "bottomSheet",
          refName: "QuestionBankAdd",
          link: "additional/educational/questionBanks/components/Add.vue",
        },
        Update: {
          type: "bottomSheet",
          refName: "QuestionBankUpdate",
          link: "additional/educational/questionBanks/components/Update.vue",
        },
        Info: {
          type: "bottomSheet",
          refName: "QuestionBankInfo",
          link: "additional/educational/questionBanks/components/Info.vue",
        },
        Delete: {
          type: "modal",
          refName: "QuestionBankDelete",
          link: "additional/educational/questionBanks/components/Delete.vue",
        },
        ChangeActivationType: {
          type: "modal",
          refName: "QuestionBankChangeActivationType",
          link:
            "additional/educational/questionBanks/components/ChangeActivationType.vue",
        },
        Filter: {
          type: "bottomSheet",
          refName: "QuestionBankFilter",
          link: "additional/educational/questionBanks/components/Filter.vue",
        },
        Sort: {
          type: "bottomSheet",
          refName: "QuestionBankSort",
          link: "additional/educational/questionBanks/components/Sort.vue",
        },
      },
    };
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.questionBanksData = [];
    this.questionBank = new QuestionBank();
    this.filterData = new QuestionBanksFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.questionBanksData = data.questionBanksData ?? [];
      let filter = {
        ...this.filterData,
        ...data.pagination,
      };
      this.filterData.fillData(filter);
    } else {
      this.setInitialValue();
    }
  }
}

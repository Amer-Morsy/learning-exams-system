import GeneralModel from "./../../../general/GeneralModel";
import QuestionBankTitle from "./QuestionBankTitle";
import QuestionBankTitlesFilter from "./QuestionBankTitlesFilter";
import PrivilegeController from "./../../../../controllers/privilege/PrivilegeController";

export default class QuestionBankTitles extends GeneralModel {
  constructor() {
    super();
    this.metaData = this.getMetaData();
    this.setInitialValue();
  }
  getMetaData() {
    return {
      name: PrivilegeController.getPrivilegeModuleTokens().QuestionBankTitle,
      privileges: {
        view: PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBankTitle
        ),
        dialog: PrivilegeController.hasViewDialog(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBankTitle
        ),
        add: PrivilegeController.hasAdd(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBankTitle
        ),
        update: PrivilegeController.hasUpdate(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBankTitle
        ),
        active: PrivilegeController.hasActive(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBankTitle
        ),
        block: PrivilegeController.hasBlocked(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBankTitle
        ),
        changeActivationType: PrivilegeController.hasChangeActivationType(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBankTitle
        ),
        deleteImage: PrivilegeController.hasDeleteImage(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBankTitle
        ),
        finalDelete: PrivilegeController.hasFinaleDelete(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBankTitle
        ),
      },
      components: {
        Add: {
          type: "bottomSheet",
          refName: "QuestionBankTitleAdd",
          link: "additional/educational/questionBankTitles/components/Add.vue",
        },
        Update: {
          type: "bottomSheet",
          refName: "QuestionBankTitleUpdate",
          link:
            "additional/educational/questionBankTitles/components/Update.vue",
        },
        Info: {
          type: "bottomSheet",
          refName: "QuestionBankTitleInfo",
          link: "additional/educational/questionBankTitles/components/Info.vue",
        },
        Delete: {
          type: "modal",
          refName: "QuestionBankTitleDelete",
          link:
            "additional/educational/questionBankTitles/components/Delete.vue",
        },
        ChangeActivationType: {
          type: "modal",
          refName: "QuestionBankTitleChangeActivationType",
          link:
            "additional/educational/questionBankTitles/components/ChangeActivationType.vue",
        },
        Filter: {
          type: "bottomSheet",
          refName: "QuestionBankTitleFilter",
          link:
            "additional/educational/questionBankTitles/components/Filter.vue",
        },
        Sort: {
          type: "bottomSheet",
          refName: "QuestionBankTitleSort",
          link: "additional/educational/questionBankTitles/components/Sort.vue",
        },
      },
    };
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.questionBankTitlesData = [];
    this.questionBankTitle = new QuestionBankTitle();
    this.filterData = new QuestionBankTitlesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.questionBankTitlesData = data.questionBankTitlesData ?? [];
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

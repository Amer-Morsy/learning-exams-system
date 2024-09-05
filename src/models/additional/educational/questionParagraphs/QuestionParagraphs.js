import GeneralModel from "./../../../general/GeneralModel";
import QuestionParagraph from "./QuestionParagraph";
import QuestionParagraphsFilter from "./QuestionParagraphsFilter";
import PrivilegeController from "./../../../../controllers/privilege/PrivilegeController";

export default class QuestionParagraphs extends GeneralModel {
  constructor() {
    super();
    this.metaData = this.getMetaData();
    this.setInitialValue();
  }
  getMetaData() {
    return {
      name: PrivilegeController.getPrivilegeModuleTokens().QuestionParagraph,
      privileges: {
        view: PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().QuestionParagraph
        ),
        dialog: PrivilegeController.hasViewDialog(
          PrivilegeController.getPrivilegeModuleTokens().QuestionParagraph
        ),
        add: PrivilegeController.hasAdd(
          PrivilegeController.getPrivilegeModuleTokens().QuestionParagraph
        ),
        update: PrivilegeController.hasUpdate(
          PrivilegeController.getPrivilegeModuleTokens().QuestionParagraph
        ),
        active: PrivilegeController.hasActive(
          PrivilegeController.getPrivilegeModuleTokens().QuestionParagraph
        ),
        block: PrivilegeController.hasBlocked(
          PrivilegeController.getPrivilegeModuleTokens().QuestionParagraph
        ),
        changeActivationType: PrivilegeController.hasChangeActivationType(
          PrivilegeController.getPrivilegeModuleTokens().QuestionParagraph
        ),
        deleteImage: PrivilegeController.hasDeleteImage(
          PrivilegeController.getPrivilegeModuleTokens().QuestionParagraph
        ),
        finalDelete: PrivilegeController.hasFinaleDelete(
          PrivilegeController.getPrivilegeModuleTokens().QuestionParagraph
        ),
      },
      components: {
        Add: {
          type: "bottomSheet",
          refName: "QuestionParagraphAdd",
          link: "additional/educational/questionParagraphs/components/Add.vue",
        },
        Update: {
          type: "bottomSheet",
          refName: "QuestionParagraphUpdate",
          link:
            "additional/educational/questionParagraphs/components/Update.vue",
        },
        Info: {
          type: "bottomSheet",
          refName: "QuestionParagraphInfo",
          link: "additional/educational/questionParagraphs/components/Info.vue",
        },
        Delete: {
          type: "modal",
          refName: "QuestionParagraphDelete",
          link:
            "additional/educational/questionParagraphs/components/Delete.vue",
        },
        ChangeActivationType: {
          type: "modal",
          refName: "QuestionParagraphChangeActivationType",
          link:
            "additional/educational/questionParagraphs/components/ChangeActivationType.vue",
        },
        Filter: {
          type: "bottomSheet",
          refName: "QuestionParagraphFilter",
          link:
            "additional/educational/questionParagraphs/components/Filter.vue",
        },
        Sort: {
          type: "bottomSheet",
          refName: "QuestionParagraphSort",
          link: "additional/educational/questionParagraphs/components/Sort.vue",
        },
      },
    };
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.questionParagraphsData = [];
    this.questionParagraph = new QuestionParagraph();
    this.filterData = new QuestionParagraphsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.questionParagraphsData = data.questionParagraphsData ?? [];
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

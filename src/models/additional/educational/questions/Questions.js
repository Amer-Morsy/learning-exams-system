import QuestionModel from "./QuestionModel";
import Question from "./Question";
import QuestionsFilter from "./QuestionsFilter";
import PrivilegeController from "./../../../../controllers/privilege/PrivilegeController";

export default class Questions extends QuestionModel {
  constructor() {
    super();
    this.metaData = this.getMetaData();
    this.setInitialValue();
  }
  getMetaData() {
    return {
      name: PrivilegeController.getPrivilegeModuleTokens().Question,
      privileges: {
        view: PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().Question
        ),
        dialog: PrivilegeController.hasViewDialog(
          PrivilegeController.getPrivilegeModuleTokens().Question
        ),
        add: PrivilegeController.hasAdd(
          PrivilegeController.getPrivilegeModuleTokens().Question
        ),
        update: PrivilegeController.hasUpdate(
          PrivilegeController.getPrivilegeModuleTokens().Question
        ),
        active: PrivilegeController.hasActive(
          PrivilegeController.getPrivilegeModuleTokens().Question
        ),
        block: PrivilegeController.hasBlocked(
          PrivilegeController.getPrivilegeModuleTokens().Question
        ),
        changeActivationType: PrivilegeController.hasChangeActivationType(
          PrivilegeController.getPrivilegeModuleTokens().Question
        ),
        deleteImage: PrivilegeController.hasDeleteImage(
          PrivilegeController.getPrivilegeModuleTokens().Question
        ),
        finalDelete: PrivilegeController.hasFinaleDelete(
          PrivilegeController.getPrivilegeModuleTokens().Question
        ),
      },
      components: {
        Add: {
          type: "bottomSheet",
          refName: "QuestionAdd",
          link: "additional/educational/questions/components/Add.vue",
        },
        Update: {
          type: "bottomSheet",
          refName: "QuestionUpdate",
          link: "additional/educational/questions/components/Update.vue",
        },
        Info: {
          type: "bottomSheet",
          refName: "QuestionInfo",
          link: "additional/educational/questions/components/Info.vue",
        },
        Delete: {
          type: "modal",
          refName: "QuestionDelete",
          link: "additional/educational/questions/components/Delete.vue",
        },
        ChangeActivationType: {
          type: "modal",
          refName: "QuestionChangeActivationType",
          link:
            "additional/educational/questions/components/ChangeActivationType.vue",
        },
        Filter: {
          type: "bottomSheet",
          refName: "QuestionFilter",
          link: "additional/educational/questions/components/Filter.vue",
        },
        Sort: {
          type: "bottomSheet",
          refName: "QuestionSort",
          link: "additional/educational/questions/components/Sort.vue",
        },
        Media: {
          type: "bottomSheet",
          refName: "QuestionMedia",
          link: "additional/educational/questions/components/Media.vue",
        },
      },
    };
  }
  setInitialValue() {
    this.setQuestionModelInitialValue();
    this.questionsData = [];
    this.question = new Question();
    this.filterData = new QuestionsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillQuestionModelData(data);
      this.questionsData = data.questionsData ?? [];
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

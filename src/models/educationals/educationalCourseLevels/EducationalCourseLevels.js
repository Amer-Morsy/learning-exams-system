import GeneralModel from "./../../general/GeneralModel";
import EducationalCourseLevel from "./EducationalCourseLevel";
import EducationalCourseLevelsFilter from "./EducationalCourseLevelsFilter";
import PrivilegeController from "./../../../controllers/privilege/PrivilegeController";

export default class EducationalCourseLevels extends GeneralModel {
  constructor() {
    super();
    this.metaData = this.getMetaData();
    this.setInitialValue();
  }
  getMetaData() {
    return {
      name: PrivilegeController.getPrivilegeModuleTokens()
        .EducationalCourseLevel,
      privileges: {
        view: PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourseLevel
        ),
        dialog: PrivilegeController.hasViewDialog(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourseLevel
        ),
        add: PrivilegeController.hasAdd(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourseLevel
        ),
        update: PrivilegeController.hasUpdate(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourseLevel
        ),
        active: PrivilegeController.hasActive(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourseLevel
        ),
        block: PrivilegeController.hasBlocked(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourseLevel
        ),
        changeActivationType: PrivilegeController.hasChangeActivationType(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourseLevel
        ),
        deleteImage: PrivilegeController.hasDeleteImage(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourseLevel
        ),
        finalDelete: PrivilegeController.hasFinaleDelete(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourseLevel
        ),
        changeFreeze: PrivilegeController.hasChangeFreezeEducationalCourseLevel(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourseLevel
        ),
        addUpdateQuestions: PrivilegeController.hasUpdateQuestionsEducationalCourseLevel(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourseLevel
        ),
      },
      components: {
        Add: {
          type: "bottomSheet",
          refName: "EducationalCourseLevelAdd",
          link:
            "additional/educational/educationalCourseLevels/components/Add.vue",
        },
        Update: {
          type: "bottomSheet",
          refName: "EducationalCourseLevelUpdate",
          link:
            "additional/educational/educationalCourseLevels/components/Update.vue",
        },
        Info: {
          type: "bottomSheet",
          refName: "EducationalCourseLevelInfo",
          link:
            "additional/educational/educationalCourseLevels/components/Info.vue",
        },
        Media: {
          type: "bottomSheet",
          refName: "EducationalCourseLevelMedia",
          link:
            "additional/educational/educationalCourseLevels/components/Media.vue",
        },
        Delete: {
          type: "modal",
          refName: "EducationalCourseLevelDelete",
          link:
            "additional/educational/educationalCourseLevels/components/Delete.vue",
        },
        ChangeActivationType: {
          type: "modal",
          refName: "EducationalCourseLevelChangeActivationType",
          link:
            "additional/educational/educationalCourseLevels/components/ChangeActivationType.vue",
        },
        Filter: {
          type: "bottomSheet",
          refName: "EducationalCourseLevelFilter",
          link:
            "additional/educational/educationalCourseLevels/components/Filter.vue",
        },
        Sort: {
          type: "bottomSheet",
          refName: "EducationalCourseLevelSort",
          link:
            "additional/educational/educationalCourseLevels/components/Sort.vue",
        },
        ReSort: {
          type: "bottomSheet",
          refName: "EducationalCourseLevelReSort",
          link:
            "additional/educational/educationalCourseLevels/components/ReSort.vue",
        },
      },
    };
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalCourseLevelsData = [];
    this.educationalCourseLevel = new EducationalCourseLevel();
    this.filterData = new EducationalCourseLevelsFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.educationalCourseLevelsData = data.educationalCourseLevelsData ?? [];
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

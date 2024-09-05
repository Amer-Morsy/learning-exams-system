import GeneralModel from "./../../general/GeneralModel";
import EducationalCourse from "./EducationalCourse";
import EducationalCoursesFilter from "./EducationalCoursesFilter";
import PrivilegeController from "./../../../controllers/privilege/PrivilegeController";

export default class EducationalCourses extends GeneralModel {
  constructor() {
    super();
    this.metaData = this.getMetaData();
    this.setInitialValue();
  }
  getMetaData() {
    return {
      name: PrivilegeController.getPrivilegeModuleTokens().EducationalCourse,
      privileges: {
        view: PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourse
        ),
        dialog: PrivilegeController.hasViewDialog(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourse
        ),
        add: PrivilegeController.hasAdd(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourse
        ),
        update: PrivilegeController.hasUpdate(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourse
        ),
        active: PrivilegeController.hasActive(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourse
        ),
        block: PrivilegeController.hasBlocked(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourse
        ),
        changeActivationType: PrivilegeController.hasChangeActivationType(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourse
        ),
        deleteImage: PrivilegeController.hasDeleteImage(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourse
        ),
        finalDelete: PrivilegeController.hasFinaleDelete(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourse
        ),
        changeSort: PrivilegeController.hasChangeSortEducationalCourseLevel(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourse
        ),
        startEducationalCoursePeriod: PrivilegeController.hasStartEducationalPeriod(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCoursePeriod
        ),
        endEducationalCoursePeriod: PrivilegeController.hasEndEducationalPeriod(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCoursePeriod
        ),
      },
      components: {
        Add: {
          type: "bottomSheet",
          refName: "EducationalCourseAdd",
          link: "additional/educational/educationalCourses/components/Add.vue",
        },
        Update: {
          type: "bottomSheet",
          refName: "EducationalCourseUpdate",
          link:
            "additional/educational/educationalCourses/components/Update.vue",
        },
        Info: {
          type: "bottomSheet",
          refName: "EducationalCourseInfo",
          link: "additional/educational/educationalCourses/components/Info.vue",
        },
        Delete: {
          type: "modal",
          refName: "EducationalCourseDelete",
          link:
            "additional/educational/educationalCourses/components/Delete.vue",
        },
        ChangeActivationType: {
          type: "modal",
          refName: "EducationalCourseChangeActivationType",
          link:
            "additional/educational/educationalCourses/components/ChangeActivationType.vue",
        },
        Filter: {
          type: "bottomSheet",
          refName: "EducationalCourseFilter",
          link:
            "additional/educational/educationalCourses/components/Filter.vue",
        },
        Sort: {
          type: "bottomSheet",
          refName: "EducationalCourseSort",
          link: "additional/educational/educationalCourses/components/Sort.vue",
        },
        ChangeStartEnd: {
          type: "modal",
          refName: "EducationalCourseChangeStartEnd",
          link:
            "additional/educational/educationalCourses/components/ChangeStartEnd.vue",
        },
      },
    };
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalCoursesData = [];
    this.educationalCourse = new EducationalCourse();
    this.filterData = new EducationalCoursesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.educationalCoursesData = data.educationalCoursesData ?? [];
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

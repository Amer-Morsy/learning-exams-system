import GeneralModel from "./../../general/GeneralModel";
import EducationalTeacher from "./EducationalTeacher";
import EducationalTeachersFilter from "./EducationalTeachersFilter";
import PrivilegeController from "./../../../controllers/privilege/PrivilegeController";

export default class EducationalTeachers extends GeneralModel {
  constructor() {
    super();
    this.metaData = this.getMetaData();
    this.setInitialValue();
  }
  getMetaData() {
    return {
      name: PrivilegeController.getPrivilegeModuleTokens().EducationalTeacher,
      privileges: {
        view: PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().EducationalTeacher
        ),
      },
      components: {
        Filter: {
          type: "bottomSheet",
          refName: "EducationalTeacherFilter",
          link:
            "additional/educational/educationalTeachers/components/Filter.vue",
        },
        Sort: {
          type: "bottomSheet",
          refName: "EducationalTeacherSort",
          link:
            "additional/educational/educationalTeachers/components/Sort.vue",
        },
      },
    };
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalTeachersData = [];
    this.educationalTeacher = new EducationalTeacher();
    this.filterData = new EducationalTeachersFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.educationalTeachersData = data.educationalTeachersData ?? [];
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

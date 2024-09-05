import GeneralModel from "./../../general/GeneralModel";
import EducationalCategory from "./EducationalCategory";
import EducationalCategoriesFilter from "./EducationalCategoriesFilter";
import PrivilegeController from "./../../../controllers/privilege/PrivilegeController";

export default class EducationalCategories extends GeneralModel {
  constructor() {
    super();
    this.metaData = this.getMetaData();
    this.setInitialValue();
  }
  getMetaData() {
    return {
      name: PrivilegeController.getPrivilegeModuleTokens().EducationalCategory,
      privileges: {
        view: PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCategory
        ),
        dialog: PrivilegeController.hasViewDialog(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCategory
        ),
        add: PrivilegeController.hasAdd(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCategory
        ),
        update: PrivilegeController.hasUpdate(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCategory
        ),
        active: PrivilegeController.hasActive(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCategory
        ),
        block: PrivilegeController.hasBlocked(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCategory
        ),
        changeActivationType: PrivilegeController.hasChangeActivationType(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCategory
        ),
        deleteImage: PrivilegeController.hasDeleteImage(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCategory
        ),
        finalDelete: PrivilegeController.hasFinaleDelete(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCategory
        ),
      },
      components: {
        Add: {
          type: "bottomSheet",
          refName: "EducationalCategoryAdd",
          link: "additional/educational/educationalCategories/components/Add.vue",
        },
        Update: {
          type: "bottomSheet",
          refName: "EducationalCategoryUpdate",
          link:
            "additional/educational/educationalCategories/components/Update.vue",
        },
        Info: {
          type: "bottomSheet",
          refName: "EducationalCategoryInfo",
          link: "additional/educational/educationalCategories/components/Info.vue",
        },
        Delete: {
          type: "modal",
          refName: "EducationalCategoryDelete",
          link:
            "additional/educational/educationalCategories/components/Delete.vue",
        },
        ChangeActivationType: {
          type: "modal",
          refName: "EducationalCategoryChangeActivationType",
          link:
            "additional/educational/educationalCategories/components/ChangeActivationType.vue",
        },
        Filter: {
          type: "bottomSheet",
          refName: "EducationalCategoryFilter",
          link:
            "additional/educational/educationalCategories/components/Filter.vue",
        },
        Sort: {
          type: "bottomSheet",
          refName: "EducationalCategorySort",
          link: "additional/educational/educationalCategories/components/Sort.vue",
        },
      },
    };
  }
  setInitialValue() {
    this.setGeneralModelInitialValue();
    this.educationalCategoriesData = [];
    this.educationalCategory = new EducationalCategory();
    this.filterData = new EducationalCategoriesFilter();
  }
  fillData(data) {
    if (data) {
      this.fillGeneralModelData(data);
      this.educationalCategoriesData = data.educationalCategoriesData ?? [];
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

<template>
  <b-tabs content-class="">
    <b-tab
      v-for="(option, index) in userSettingsTabsLis"
      :key="index"
      @click="goTo(option.to)"
      :title-item-class="'custom-tab-outer-li'"
      :active="option.currentTab == $route.name ? true : false"
    >
      <template #title>
        <span v-b-popover.hover.bottomright="`${option.itemName}`">
          <img :src="`${option.itemImagePath}`" class="icon-tab" />
          <span>{{ option.itemName }}</span>
        </span>
      </template>
    </b-tab>
  </b-tabs>
</template>

<script>
import imgStudents from "@/assets/images/students.svg";
import imgTeachers from "@/assets/images/teacher.svg";
import imgEmployees from "@/assets/images/employees.svg";
import imgMasterAdmins from "@/assets/images/masterAdmins.svg";
import imgEstablishmentsRole from "@/assets/images/establishmentRole.svg";
import imgUserLoginCode from "@/assets/images/UserLoginCodes.svg";

import { USER_TYPE } from "./../../utils/constantLists";
import {
  USER_MODEL_NAME,
  ESTABLISHMENTROLE_MODEL_NAME,
  LOGINCODE_MODEL_NAME,
} from "./../../utils/constants";
import PrivilegeController from "./../../controllers/privilege/PrivilegeController";

export default {
  name: "UserSettingsTabs",
  props: {
    userTypeToken: {
      type: String,
      default: "",
    },
    modelName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      userTypeTokenData: this.userTypeToken || this.$route.meta.userTypeToken,
    };
  },
  computed: {
    userSettingsTabsLis() {
      let tabs = [];
      switch (this.userTypeTokenData) {
        case USER_TYPE.Student:
          tabs = this.userSettingsTabsListStudent;
          break;
        case USER_TYPE.Teacher:
          tabs = this.userSettingsTabsListTeacher;
          break;
        case USER_TYPE.Employee:
          tabs = this.userSettingsTabsListEmployee;
          break;
        case USER_TYPE.MasterAdmin:
          tabs = this.userSettingsTabsListMasterAdmin;
          break;
      }
      return tabs;
    },
    userSettingsTabsListStudent: function() {
      let tabs = [];
      if (this.hasViewUser()) {
        tabs.push({
          to: {
            name: "Students",
          },
          itemName: this.$t("students.modelName"),
          itemImagePath: imgStudents,
          currentTab: "Students",
        });
        tabs.push({
          to: {
            name: "StudentsNotApproved",
          },
          itemName: this.$t("students.notApproved"),
          itemImagePath: imgStudents,
          currentTab: "StudentsNotApproved",
        });
      }
      if (this.hasViewEstablishmentRole()) {
        tabs.push({
          to: {
            name: "StudentEstablishmentsRoles",
          },
          itemName: this.$t("UserSettings.roles"),
          itemImagePath: imgEstablishmentsRole,
          currentTab: "StudentEstablishmentsRoles",
        });
      }
      if (this.hasViewLoginCode()) {
        tabs.push({
          to: {
            name: "StudentLoginCodes",
          },
          itemName: this.$t("UserLoginCodes.modelName"),
          itemImagePath: imgUserLoginCode,
          currentTab: "StudentLoginCodes",
        });
      }
      return tabs;
    },
    userSettingsTabsListTeacher: function() {
      let tabs = [];
      if (this.hasViewUser()) {
        tabs.push({
          to: {
            name: "Teachers",
          },
          itemName: this.$t("Teachers.modelName"),
          itemImagePath: imgTeachers,
          currentTab: "Teachers",
        });
        tabs.push({
          to: {
            name: "TeachersNotApproved",
          },
          itemName: this.$t("students.notApproved"),
          itemImagePath: imgTeachers,
          currentTab: "TeachersNotApproved",
        });
      }
      if (this.hasViewEstablishmentRole()) {
        tabs.push({
          to: {
            name: "TeacherEstablishmentsRoles",
          },
          itemName: this.$t("UserSettings.roles"),
          itemImagePath: imgEstablishmentsRole,
          currentTab: "TeacherEstablishmentsRoles",
        });
      }
      if (this.hasViewLoginCode()) {
        tabs.push({
          to: {
            name: "TeacherLoginCodes",
          },
          itemName: this.$t("UserLoginCodes.modelName"),
          itemImagePath: imgUserLoginCode,
          currentTab: "TeacherLoginCodes",
        });
      }
      return tabs;
    },
    userSettingsTabsListEmployee: function() {
      let tabs = [];
      if (this.hasViewUser()) {
        tabs.push({
          to: {
            name: "Employees",
          },
          itemName: this.$t("Employees.modelName"),
          itemImagePath: imgEmployees,
          currentTab: "Employees",
        });
      }
      if (this.hasViewEstablishmentRole()) {
        tabs.push({
          to: {
            name: "EmployeeEstablishmentsRoles",
          },
          itemName: this.$t("UserSettings.roles"),
          itemImagePath: imgEstablishmentsRole,
          currentTab: "EmployeeEstablishmentsRoles",
        });
      }
      if (this.hasViewLoginCode()) {
        tabs.push({
          to: {
            name: "EmployeeLoginCodes",
          },
          itemName: this.$t("UserLoginCodes.modelName"),
          itemImagePath: imgUserLoginCode,
          currentTab: "EmployeeLoginCodes",
        });
      }
      return tabs;
    },
    userSettingsTabsListMasterAdmin: function() {
      let tabs = [];
      if (this.hasViewUser()) {
        tabs.push({
          to: {
            name: "MasterAdmins",
          },
          itemName: this.$t("masterAdmins.modelName"),
          itemImagePath: imgMasterAdmins,
          currentTab: "MasterAdmins",
        });
      }
      if (this.hasViewEstablishmentRole()) {
        tabs.push({
          to: {
            name: "MasterAdminEstablishmentsRoles",
          },
          itemName: this.$t("UserSettings.roles"),
          itemImagePath: imgEstablishmentsRole,
          currentTab: "MasterAdminEstablishmentsRoles",
        });
      }
      if (this.hasViewLoginCode()) {
        tabs.push({
          to: {
            name: "MasterAdminLoginCodes",
          },
          itemName: this.$t("UserLoginCodes.modelName"),
          itemImagePath: imgUserLoginCode,
          currentTab: "MasterAdminLoginCodes",
        });
      }
      return tabs;
    },
  },
  watch: {},
  methods: {
    hasViewUser() {
      let hasView = false;
      switch (this.userTypeTokenData) {
        case USER_TYPE.Student:
          hasView = PrivilegeController.hasView(
            PrivilegeController.getPrivilegeModuleTokens()[
              USER_MODEL_NAME.Student
            ]
          );
          break;
        case USER_TYPE.Teacher:
          hasView = PrivilegeController.hasView(
            PrivilegeController.getPrivilegeModuleTokens()[
              USER_MODEL_NAME.Teacher
            ]
          );
          break;
        case USER_TYPE.Employee:
          hasView = PrivilegeController.hasView(
            PrivilegeController.getPrivilegeModuleTokens()[
              USER_MODEL_NAME.Employee
            ]
          );
          break;
        case USER_TYPE.MasterAdmin:
          hasView = PrivilegeController.hasView(
            PrivilegeController.getPrivilegeModuleTokens()[
              USER_MODEL_NAME.MasterAdmin
            ]
          );
          break;
      }

      return hasView;
    },
    hasViewEstablishmentRole() {
      let hasView = false;
      switch (this.userTypeTokenData) {
        case USER_TYPE.Student:
          hasView = PrivilegeController.hasView(
            PrivilegeController.getPrivilegeModuleTokens()[
              ESTABLISHMENTROLE_MODEL_NAME.StudentEstablishmentsRole
            ]
          );
          break;
        case USER_TYPE.Teacher:
          hasView = PrivilegeController.hasView(
            PrivilegeController.getPrivilegeModuleTokens()[
              ESTABLISHMENTROLE_MODEL_NAME.TeacherEstablishmentsRole
            ]
          );
          break;
        case USER_TYPE.Employee:
          hasView = PrivilegeController.hasView(
            PrivilegeController.getPrivilegeModuleTokens()[
              ESTABLISHMENTROLE_MODEL_NAME.EmployeeEstablishmentsRole
            ]
          );
          break;
        case USER_TYPE.MasterAdmin:
          hasView = PrivilegeController.hasView(
            PrivilegeController.getPrivilegeModuleTokens()[
              ESTABLISHMENTROLE_MODEL_NAME.MasterAdminEstablishmentsRole
            ]
          );
          break;
      }
      return hasView;
    },
    hasViewLoginCode() {
      let hasView = false;
      switch (this.userTypeTokenData) {
        case USER_TYPE.Student:
          hasView = PrivilegeController.hasView(
            PrivilegeController.getPrivilegeModuleTokens()[
              LOGINCODE_MODEL_NAME.StudentLoginCode
            ]
          );
          break;
        case USER_TYPE.Teacher:
          hasView = PrivilegeController.hasView(
            PrivilegeController.getPrivilegeModuleTokens()[
              LOGINCODE_MODEL_NAME.TeacherLoginCode
            ]
          );
          break;
        case USER_TYPE.Employee:
          hasView = PrivilegeController.hasView(
            PrivilegeController.getPrivilegeModuleTokens()[
              LOGINCODE_MODEL_NAME.EmployeeLoginCode
            ]
          );
          break;
        case USER_TYPE.MasterAdmin:
          hasView = PrivilegeController.hasView(
            PrivilegeController.getPrivilegeModuleTokens()[
              LOGINCODE_MODEL_NAME.MasterAdminLoginCode
            ]
          );
          break;
      }
      return hasView;
    },

    goTo(path) {
      this.$router.push(path).catch(() => {});
    },
  },

  async created() {},
};
</script>

<style lang="scss"></style>

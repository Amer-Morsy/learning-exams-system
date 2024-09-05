<template>
  <div class="dashboard-sidebar-container">
    <div class="sidebar">
      <div class="menu">
        <ul class="menu-links">
          <li
            v-for="(route, index) in routes"
            :key="index"
            :class="
              !route.childrens || route.childrens.length == 0 ? '' : 'sub-menu'
            "
            class="animate__animated animate__fadeInUpBig"
          >
            <router-link
              v-if="!route.childrens || route.childrens.length == 0"
              :to="{ name: route.name }"
            >
              <span class="icon"><img class="icon-lg" :src="route.icon"/></span>
              <span class="text">{{ route.title }}</span>
            </router-link>

            <template v-else>
              <b-button v-b-toggle="route.name">
                <span class="icon"
                  ><img class="icon-lg" :src="route.icon"
                /></span>
                <span class="text">
                  <span class="sub-text">{{ route.title }}</span>
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </span>
              </b-button>
              <b-collapse :id="route.name">
                <li v-for="(route, index) in route.childrens" :key="index">
                  <router-link :to="{ name: route.name }">
                    <span class="icon"
                      ><img class="icon-lg" :src="route.icon"
                    /></span>
                    <span class="text">{{ route.title }}</span>
                  </router-link>
                </li>
              </b-collapse>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PrivilegeController from "./../../controllers/privilege/PrivilegeController";
import i18n from "./../../i18n/index";
import settingIcon from "./../../assets/Icons/setting.svg";
import reportsIcon from "./../../assets/images/statistics.svg";
import UserWalletTransactionsIcon from "./../../assets/images/UserWalletTransactions.svg";
import QuestionBankTitleIcon from "./../../assets/images/questionBankTitle.svg";
import EducationalCategoryIcon from "./../../assets/images/EducationalCategories.svg";
import EducationalCourseIcon from "./../../assets/images/EducationalCourses.svg";
import EducationalCourseLevelIcon from "./../../assets/images/EducationalCourseLevels.svg";
// import EducationalCourseLevelQuestionIcon from "./../../assets/images/EducationalCourseLevelQuestions.svg";
import QuestionParagraphIcon from "./../../assets/images/questionParagraph.svg";
import QuestionBankIcon from "./../../assets/images/questionBank.svg";
import QuestionIcon from "./../../assets/images/question.svg";
import usersIcon from "./../../assets/images/users.svg";
import studentIcon from "./../../assets/images/students.svg";
import teacherIcon from "./../../assets/images/teacher.svg";
import employeeIcon from "./../../assets/images/employees.svg";
import masterAdminIcon from "./../../assets/images/masterAdmins.svg";
import { mapGetters } from "vuex";

export default {
  name: "DashboardSidebar",
  beforeCreate() {},
  props: {},
  data() {
    return {};
  },
  async created() {
    this.getCurrentActive();
  },
  watch: {
    $route() {
      this.getCurrentActive();
    },
  },
  beforeMount() {},
  mounted() {},
  components: {
    // settingIcon
  },
  computed: {
    ...mapGetters(["isTeacherLogged"]),

    routes: function() {
      let theRoutes = [];

      //       if (
      //   PrivilegeController.hasView(
      //     PrivilegeController.getPrivilegeModuleTokens().Student
      //   )
      // ) {

      // }

      //#region Users
      let childrensUsers = [];

      if (
        PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().Student
        )
      ) {
        childrensUsers.push({
          name: "Students",
          icon: studentIcon,
          title: i18n.t("students.modelName"),
        });
      }
      if (
        PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().Teacher
        )
      ) {
        childrensUsers.push({
          name: "Teachers",
          icon: teacherIcon,
          title: i18n.t("Teachers.modelName"),
        });
      }

      if (
        PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().Employee
        )
      ) {
        childrensUsers.push({
          name: "Employees",
          icon: employeeIcon,
          title: i18n.t("Employees.modelName"),
        });
      }

      if (
        PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().MasterAdmin
        )
      ) {
        childrensUsers.push({
          name: "MasterAdmins",
          icon: masterAdminIcon,
          title: i18n.t("masterAdmins.modelName"),
        });
      }

      if (!this.isTeacherLogged) {
        theRoutes.push({
          name: "Users",
          icon: usersIcon,
          title: i18n.t("Users.modelName"),
          childrens: childrensUsers,
        });
      }
      //#endregion Users

      //#region Educationals
      let childrensEducational = [];

      if (
        PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCategory
        )
      ) {
        childrensEducational.push({
          name: "EducationalCategories",
          icon: EducationalCategoryIcon,
          title: i18n.t("EducationalCategories.modelName"),
        });
      }
      if (
        PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourse
        )
      ) {
        childrensEducational.push({
          name: "EducationalCourses",
          icon: EducationalCourseIcon,
          title: i18n.t("EducationalCourses.modelName"),
        });
      }
      if (
        PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().EducationalCourseLevel
        )
      ) {
        childrensEducational.push({
          name: "EducationalCourseLevels",
          icon: EducationalCourseLevelIcon,
          title: i18n.t("EducationalCourseLevels.modelName"),
        });
      }

      theRoutes.push({
        name: "Educational",
        icon: EducationalCategoryIcon,
        title: i18n.t("Educationals.modelName"),
        childrens: childrensEducational,
      });
      //#endregion Educationals

      //#region Additional
      let childrensAdditional = [];
      if (
        PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBankTitle
        )
      ) {
        childrensAdditional.push({
          name: "QuestionBankTitles",
          icon: QuestionBankTitleIcon,
          title: i18n.t("QuestionBankTitles.modelName"),
        });
      }
      if (
        PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().QuestionParagraph
        )
      ) {
        childrensAdditional.push({
          name: "QuestionParagraphs",
          icon: QuestionParagraphIcon,
          title: i18n.t("QuestionParagraphs.modelName"),
        });
      }
      if (
        PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().QuestionBank
        )
      ) {
        childrensAdditional.push({
          name: "QuestionBanks",
          icon: QuestionBankIcon,
          title: i18n.t("QuestionBanks.modelName"),
        });
      }
      if (
        PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens().Question
        )
      ) {
        childrensAdditional.push({
          name: "Questions",
          icon: QuestionIcon,
          title: i18n.t("Questions.modelName"),
        });
      }

      if (this.isTeacherLogged) {
        theRoutes.push({
          name: "Additional",
          icon: settingIcon,
          title: i18n.t("Additionals.modelName"),
          childrens: childrensAdditional,
        });
      }
      //#endregion Additional

      //#region Reports
      if (!this.isTeacherLogged) {
        theRoutes.push({
          name: "Reports",
          icon: reportsIcon,
          title: i18n.t("Reports.modelName"),
        });
      }
      //#endregion Reports

      //#region Finance
      if (
        this.isTeacherLogged &&
        PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens()
            .TeacherUserWalletTransaction
        )
      ) {
        theRoutes.push({
          name: "TeacherUserWalletTransaction",
          icon: UserWalletTransactionsIcon,
          title: i18n.t("UserWalletTransactions.modelName"),
        });
      }
      //#endregion Finance

      return theRoutes;
    },
  },
  methods: {
    getCurrentActive() {
      setTimeout(() => {
        const allButtons = document.querySelectorAll(".menu-links li button");
        if (allButtons != undefined && allButtons.length != 0) {
          allButtons.forEach(function(item) {
            item.classList.remove("active");
          });
        }
        const allSelectorsNotActive = document.querySelectorAll(
          ".menu-links li"
        );
        if (
          allSelectorsNotActive != undefined &&
          allSelectorsNotActive.length != 0
        ) {
          allSelectorsNotActive.forEach(function(item) {
            item.classList.remove("active");
          });
        }
        const allSelectors = document.querySelectorAll(
          ".router-link-exact-active"
        );
        if (allSelectors != undefined && allSelectors.length != 0) {
          allSelectors.forEach(function(item) {
            if (item.parentNode.parentNode.previousSibling)
              item.parentNode.parentNode.previousSibling.classList.add(
                "active"
              );
            item.parentNode.classList.add("active");
          });
        }
      }, 1000);
    },
  },
};
</script>

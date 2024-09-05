import { fullPathFileFromServer } from "./functions";
// import store from "./../store";
import i18n from "./../i18n";
import { STATUS } from "./constants";
import { ACTIVATION_TYPE } from "./constantLists";

const ACTIVATION_TYPE_TOKENS = ACTIVATION_TYPE.Active;

//#region QuestionBankTitles
import QuestionBankTitles from "./../models/additional/educational/questionBankTitles/QuestionBankTitles";
import apiQuestionBankTitle from "./../api/additional/educational/questionBankTitles/questionBankTitle";

export const getQuestionBankTitlesDialog = async (params = {}) => {
  let questionBankTitles = new QuestionBankTitles();
  questionBankTitles.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    questionBankTitles.filterData.userToken = params.userToken ?? "";
    //#endregion Filter

    const response = await apiQuestionBankTitle.getDialog(
      questionBankTitles.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            questionBankTitles.questionBankTitle.defaultImg
          ),
        });
      }
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: questionBankTitles.questionBankTitle.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: questionBankTitles.questionBankTitle.defaultImg,
    });
  }
  return options;
};
//#endregion QuestionBankTitles

//#region EstablishmentRoles
import EstablishmentRoles from "./../models/establishmentRoles/EstablishmentRoles";
import apiEstablishmentRole from "./../api/establishmentRoles/establishmentRole";
import { USER_TYPE } from "./../utils/constantLists";
import { ESTABLISHMENTROLE_MODEL_NAME } from "./../utils/constants";

export const getEstablishmentRolesDialog = async (modelName) => {
  let establishmentRoles = new EstablishmentRoles(modelName);
  establishmentRoles.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region filter
    let userTypeToken = "";
    switch (modelName) {
      case ESTABLISHMENTROLE_MODEL_NAME.StudentEstablishmentsRole:
        userTypeToken = USER_TYPE.Student;
        break;
      case ESTABLISHMENTROLE_MODEL_NAME.ParentEstablishmentsRole:
        userTypeToken = USER_TYPE.Parent;
        break;
      case ESTABLISHMENTROLE_MODEL_NAME.TeacherEstablishmentsRole:
        userTypeToken = USER_TYPE.Teacher;
        break;
      case ESTABLISHMENTROLE_MODEL_NAME.EmployeeEstablishmentsRole:
        userTypeToken = USER_TYPE.Employee;
        break;
      case ESTABLISHMENTROLE_MODEL_NAME.MasterAdminEstablishmentsRole:
        userTypeToken = USER_TYPE.MasterAdmin;
        break;
      default:
        break;
    }

    establishmentRoles.filterData.userTypeToken = userTypeToken;

    //#endregion filter
    const response = await apiEstablishmentRole.getDialog(
      establishmentRoles.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            establishmentRoles.establishmentRole.defaultImg
          ),
        });
      }
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: establishmentRoles.establishmentRole.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: establishmentRoles.establishmentRole.defaultImg,
    });
  }
  return options;
};
//#endregion EstablishmentRoles

//#region Users
import Users from "./../models/users/Users";
import apiUser from "./../api/users/user";

export const getUsersDialog = async (params) => {
  let modelName = params.modelName || "";
  let users = new Users(modelName);
  users.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    users.filterData.userTypeToken = params.userTypeToken || "";

    const response = await apiUser.getDialog(users.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            users.user.defaultImg
          ),
        });
      }
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: users.user.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: users.user.defaultImg,
    });
  }
  return options;
};

export const getUsersDialogCustomized = async (params) => {
  let modelName = params.modelName || "";
  let users = new Users(modelName);
  users.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let error = null;
  let options = [];
  try {
    users.filterData.paginationStatus = false;
    users.filterData.userTypeToken = params.userTypeToken || "";

    const response = await apiUser.getAll(users.filterData);
    const itemsData = response.data.usersData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["userToken"],
          userNameCurrent: itemsData[item]["userNameCurrent"],
          text: itemsData[item]["userNameCurrent"],
          phone: itemsData[item]["userPhoneWithCC"],
          fullCode: itemsData[item]["fullCode"],
          userName: itemsData[item]["userName"],
          image: fullPathFileFromServer(
            itemsData[item]["userImagePath"],
            users.user.defaultImg
          ),
        });
      }
    } else {
      error = response.data.msg;
    }
  } catch (e) {
    error = i18n.t("errorCatch");
  }
  return [options, error];
};
//#endregion Users

//#region QuestionBanks
import QuestionBanks from "./../models/additional/educational/questionBanks/QuestionBanks";
import apiQuestionBank from "./../api/additional/educational/questionBanks/questionBank";

export const getQuestionBanksDialog = async (params = {}) => {
  let questionBanks = new QuestionBanks();
  questionBanks.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    // questionBanks.filterData.userToken = params.userToken ?? "";
    questionBanks.filterData.questionBankTitleToken =
      params.questionBankTitleToken ?? "";
    //#endregion Filter

    const response = await apiQuestionBank.getDialog(questionBanks.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            questionBanks.questionBank.defaultImg
          ),
        });
      }
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: questionBanks.questionBank.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: questionBanks.questionBank.defaultImg,
    });
  }
  return options;
};
//#endregion QuestionBanks

//#region QuestionParagraphs
import QuestionParagraphs from "./../models/additional/educational/questionParagraphs/QuestionParagraphs";
import apiQuestionParagraph from "./../api/additional/educational/questionParagraphs/questionParagraph";

export const getQuestionParagraphsDialog = async (params = {}) => {
  let questionParagraphs = new QuestionParagraphs();
  questionParagraphs.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    questionParagraphs.filterData.questionBankTitleToken =
      params.questionBankTitleToken ?? "";
    //#endregion Filter

    const response = await apiQuestionParagraph.getDialog(
      questionParagraphs.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            questionParagraphs.questionParagraph.defaultImg
          ),
        });
      }
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: questionParagraphs.questionParagraph.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: questionParagraphs.questionParagraph.defaultImg,
    });
  }
  return options;
};
//#endregion QuestionParagraphs

//#region Questions
import Questions from "./../models/additional/educational/questions/Questions";
import apiQuestion from "./../api/additional/educational/questions/question";

export const getQuestionsDialog = async (params = {}) => {
  let questions = new Questions();
  questions.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    questions.filterData.questionTypeToken = params.questionTypeToken ?? "";
    //#endregion Filter

    const response = await apiQuestion.getDialog(questions.filterData);
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            questions.question.defaultImg
          ),
        });
      }
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: questions.question.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: questions.question.defaultImg,
    });
  }
  return options;
};

export const getQuestionsDialogCustom = async (params = {}) => {
  let questions = new Questions();
  questions.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    questions.filterData.paginationStatus = false;
    //#region Filter
    questions.filterData.questionTypeToken = params.questionTypeToken ?? "";
    questions.filterData.ownerUserToken =
      params.ownerUserToken ?? questions.filterData.ownerUserToken;

    questions.filterData.questionBankTitleToken =
      params.questionBankTitleToken ?? "";
    questions.filterData.questionBankToken = params.questionBankToken ?? "";
    questions.filterData.questionParagraphToken =
      params.questionParagraphToken ?? "";
    //#endregion Filter

    const response = await apiQuestion.getAll(questions.filterData);
    const itemsData = response.data.questionsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          // value: itemsData[item]["questionToken"],
          // text: itemsData[item]["questionTitle"],
          // image: fullPathFileFromServer(
          //   itemsData[item]["questionMediaPath"],
          //   questions.question.defaultImg
          // ),
          questionToken: itemsData[item]["questionToken"],
          questionTitle: itemsData[item]["questionTitle"],
          questionBankName:
            itemsData[item]["questionBankInfoData"]["questionBankNameCurrent"],
          questionParagraphTitle: itemsData[item]["questionParagraphInfoData"]
            ? itemsData[item]["questionParagraphInfoData"][
                "questionParagraphTitle"
              ]
            : "",
          questionParagraphInfoData:
            itemsData[item]["questionParagraphInfoData"],
          questionType: itemsData[item]["questionTypeNameCurrent"],
          trueFalseQuestionData: itemsData[item]["trueFalseQuestionData"],
          mCQQuestionData: itemsData[item]["mCQQuestionData"],
          isSelected: false,
          questionDegree: 0,
        });
      }
    } else {
      options = [];
    }
  } catch (error) {
    options = [];
  }
  return options;
};
//#endregion Questions

//#region EducationalCategories
import EducationalCategories from "./../models/educationals/educationalCategories/EducationalCategories";
import apiEducationalCategory from "./../api/educationals/educationalCategories/educationalCategory";

export const getEducationalCategoriesDialog = async (params = {}) => {
  let educationalCategories = new EducationalCategories();
  educationalCategories.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    educationalCategories.filterData.parentEducationalCategoryToken =
      params.parentEducationalCategoryToken ?? "";
    educationalCategories.filterData.parentEducationalCategoryDataInclude =
      params.parentEducationalCategoryDataInclude ?? "";
    educationalCategories.filterData.parentEducationalCategoryDataInclude =
      params.parentEducationalCategoryDataInclude ?? true;
    educationalCategories.filterData.getOnlyParentEducationalCategories =
      params.getOnlyParentEducationalCategories ?? true;
    educationalCategories.filterData.getOnlyChildEducationalCategories =
      params.getOnlyChildEducationalCategories ?? false;

    //#endregion Filter

    const response = await apiEducationalCategory.getDialog(
      educationalCategories.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            educationalCategories.educationalCategory.defaultImg
          ),
        });
      }
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: educationalCategories.educationalCategory.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: educationalCategories.educationalCategory.defaultImg,
    });
  }
  return options;
};

export const getEducationalCategoriesDialogCustomize = async (params = {}) => {
  let educationalCategories = new EducationalCategories();
  educationalCategories.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    educationalCategories.filterData.paginationStatus = false;
    //#region Filter
    educationalCategories.filterData.parentEducationalCategoryToken =
      params.parentEducationalCategoryToken ?? "";
    educationalCategories.filterData.parentEducationalCategoryDataInclude =
      params.parentEducationalCategoryDataInclude ?? true;
    educationalCategories.filterData.getOnlyParentEducationalCategories =
      params.getOnlyParentEducationalCategories ?? true;
    educationalCategories.filterData.getOnlyChildEducationalCategories =
      params.getOnlyChildEducationalCategories ?? false;

    //#endregion Filter

    const response = await apiEducationalCategory.getAll(
      educationalCategories.filterData
    );
    const itemsData = response.data.educationalCategoriesData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          educationalCategory: itemsData[item],
          isSelected: false,
          isHaveChild: itemsData[item]["isHaveChildrenStatus"],
          value: itemsData[item]["educationalCategoryToken"],
          text: itemsData[item]["educationalCategoryNameCurrent"],
          image: fullPathFileFromServer(
            itemsData[item]["educationalCategoryImagePath"],
            educationalCategories.educationalCategory.defaultImg
          ),
        });
      }
    } else {
      // options.push({
      //   value: "",
      //   text: response.data.msg,
      //   image: educationalCategories.educationalCategory.defaultImg,
      // });
    }
  } catch (error) {
    // options.push({
    //   value: "",
    //   text: i18n.t("errorCatch"),
    //   image: educationalCategories.educationalCategory.defaultImg,
    // });
  }
  return options;
};
//#endregion EducationalCategories

//#region EducationalCourses
import EducationalCourses from "./../models/educationals/educationalCourses/EducationalCourses";
import apiEducationalCourse from "./../api/educationals/educationalCourses/educationalCourse";

export const getEducationalCoursesDialog = async (params = {}) => {
  let educationalCourses = new EducationalCourses();
  educationalCourses.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    educationalCourses.filterData.educationalCourseToken =
      params.educationalCourseToken ?? "";
    //#endregion Filter

    const response = await apiEducationalCourse.getDialog(
      educationalCourses.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            educationalCourses.educationalCourse.defaultImg
          ),
        });
      }
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: educationalCourses.educationalCourse.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: educationalCourses.educationalCourse.defaultImg,
    });
  }
  return options;
};

export const getEducationalCoursesDialogCustom = async (params = {}) => {
  let educationalCourses = new EducationalCourses();
  educationalCourses.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    educationalCourses.filterData.paginationStatus = false;
    //#region Filter
    educationalCourses.filterData.educationalCourseToken =
      params.educationalCourseToken ?? "";
    //#endregion Filter

    const response = await apiEducationalCourse.getAll(
      educationalCourses.filterData
    );
    const itemsData = response.data.educationalCoursesData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          educationalCourse: itemsData[item],
          value: itemsData[item]["educationalCourseToken"],
          text: itemsData[item]["educationalCourseNameCurrent"],
          image: fullPathFileFromServer(
            itemsData[item]["educationalCourseImagePath"],
            educationalCourses.educationalCourse.defaultImg
          ),
        });
      }
    } else {
      options = [];
    }
  } catch (error) {
    options = [];
  }
  return options;
};
//#endregion EducationalCourses

//#region EducationalCourseLevels
import EducationalCourseLevels from "./../models/educationals/educationalCourseLevels/EducationalCourseLevels";
import apiEducationalCourseLevel from "./../api/educationals/educationalCourseLevels/educationalCourseLevel";

export const getEducationalCourseLevelsDialog = async (params = {}) => {
  let educationalCourseLevels = new EducationalCourseLevels();
  educationalCourseLevels.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    //#region Filter
    educationalCourseLevels.filterData.educationalCourseToken =
      params.educationalCourseToken ?? "";
    //#endregion Filter

    const response = await apiEducationalCourseLevel.getDialog(
      educationalCourseLevels.filterData
    );
    const itemsData = response.data.itemsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          value: itemsData[item]["itemToken"],
          text: itemsData[item]["itemName"],
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            educationalCourseLevels.educationalCourseLevel.defaultImg
          ),
        });
      }
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: educationalCourseLevels.educationalCourseLevel.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: educationalCourseLevels.educationalCourseLevel.defaultImg,
    });
  }
  return options;
};

export const getEducationalCourseLevelsDialogCustom = async (params = {}) => {
  let educationalCourseLevels = new EducationalCourseLevels();
  educationalCourseLevels.filterData.activationTypeTokens = ACTIVATION_TYPE_TOKENS;
  let options = [];
  try {
    educationalCourseLevels.filterData.paginationStatus = false;
    //#region Filter
    educationalCourseLevels.filterData.paginationStatus = false;
    educationalCourseLevels.filterData.educationalCourseToken =
      params.educationalCourseToken ?? "";
    //#endregion Filter

    const response = await apiEducationalCourseLevel.getAll(
      educationalCourseLevels.filterData
    );
    const itemsData = response.data.educationalCourseLevelsData;
    if (response.data.status == STATUS.SUCCESS) {
      for (let item in itemsData) {
        options.push({
          educationalCourseLevel: itemsData[item],
          value: itemsData[item]["educationalCourseLevelToken"],
          text: `${
            itemsData[item]["educationalCourseLevelNameCurrent"]
          } - ${i18n.t("EducationalCourseLevels.sortNumber")}: ${
            itemsData[item]["educationalCourseLevelSortNumber"]
          } - ${i18n.t("EducationalCourses.name")}: ${
            itemsData[item]["educationalCourseInfo"][
              "educationalCourseNameCurrent"
            ]
          }`,
          image: fullPathFileFromServer(
            itemsData[item]["itemImagePath"],
            educationalCourseLevels.educationalCourseLevel.defaultImg
          ),
        });
      }
    } else {
      options.push({
        value: "",
        text: response.data.msg,
        image: educationalCourseLevels.educationalCourseLevel.defaultImg,
      });
    }
  } catch (error) {
    options.push({
      value: "",
      text: i18n.t("errorCatch"),
      image: educationalCourseLevels.educationalCourseLevel.defaultImg,
    });
  }
  return options;
};
//#endregion EducationalCourseLevels

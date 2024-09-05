import { setDataMultiLang, fullPathFileFromServer } from "./functions";
import store from "./../store";
import defaultImgype from "@/assets/images/type.svg";
import defaultImgActivationType from "@/assets/images/changeActivationType.svg";
import defaultImgGender from "@/assets/images/gender.svg";
import defaultImgReligion from "@/assets/images/religions.svg";

export const getDialogOfConstantList = (options = [], defaultImg = "") => {
  let list = [];
  if (options.length) {
    for (let item in options) {
      list.push({
        value: options[item]["itemToken"],
        text: setDataMultiLang(
          store.getters.currentLanguage,
          options[item]["itemNameAr"],
          options[item]["itemNameEn"]
        ),
        image: fullPathFileFromServer(
          options[item]["itemImagePath"],
          defaultImg
        ),
      });
    }
  }
  return list;
};

export const getDialogOfActivationTypes = () => {
  return getDialogOfConstantList(
    store.getters.constantsListsData.listActivationType,
    defaultImgActivationType
  );
};

export const getDialogOfGender = () => {
  return getDialogOfConstantList(
    store.getters.constantsListsData.listGender,
    defaultImgGender
  );
};

export const getDialogOfReligion = () => {
  return getDialogOfConstantList(
    store.getters.constantsListsData.listReligionType,
    defaultImgReligion
  );
};

export const getDialogOfAuthenticationLoginType = () => {
  return getDialogOfConstantList(
    store.getters.constantsListsData.listAuthenticationLoginType,
    defaultImgype
  );
};

export const getDialogOfCodeInLoginType = () => {
  return getDialogOfConstantList(
    store.getters.constantsListsData.listCodeInLoginType,
    defaultImgype
  );
};

export const getDialogOfPlatFormType = () => {
  return getDialogOfConstantList(
    store.getters.constantsListsData.listPlatFormType,
    defaultImgype
  );
};

export const getDialogOfQuestionType = () => {
  return getDialogOfConstantList(
    store.getters.constantsListsData.listQuestionType,
    defaultImgype
  );
};

export const getDialogOfWalletTransactionType = () => {
  return getDialogOfConstantList(
    store.getters.constantsListsData.listWalletTransactionType,
    defaultImgype
  );
};

export const getDialogOflistPaymentMethod = () => {
  return getDialogOfConstantList(
    store.getters.constantsListsData.listPaymentMethod,
    defaultImgype
  );
};

import store from "./../store";
import i18n from "./../i18n";
import { USER_TYPE } from "./constantLists";
import { BASE_URL, VIEW_TYPES } from "./constants";
import AppSetupController from "./../controllers/AppSetupController";
import LogoImg from "./../assets/images/logo.png";

const APPLANGUAGES = AppSetupController.appLanguages();

export const setDataMultiLang = (lang, dataAr, dataEn) => {
  if (lang == APPLANGUAGES.arEG) return dataAr;
  else if (lang == APPLANGUAGES.enUS) return dataEn;
  else return "";
};

export const getLanguage = () => {
  return (
    store.getters.currentLanguage ??
    localStorage.getItem("currentLanguage") ??
    APPLANGUAGES.default
  );
};

export const getUserAuthorizeToken = () => {
  try {
    return store.getters.userAuthorizeToken;
  } catch (error) {
    return null;
  }
};

export const checkOnlineStatus = () => {
  return navigator.onLine;
};

export const checkPrivilege = (privilegeStatus, userTypeToken = "") => {
  try {
    let theUserTypeToken =
      userTypeToken == ""
        ? store.getters.userPersonalData.userTypeToken
        : userTypeToken;

    return theUserTypeToken == USER_TYPE.AdminsEgypt || privilegeStatus == true
      ? true
      : false;
  } catch (error) {
    return false;
  }
};
export const isDataExist = (data) => {
  return data || data === 0 ? data : i18n.t("notFound");
};
export const viewFileFromServer = (filePath) => {
  window.open(`${BASE_URL}${filePath}`, "_blank");
};
export const fullPathFileFromServer = (filePath, defaultFile = "") => {
  if (filePath) return `${BASE_URL}${filePath}`;
  else if (defaultFile) return defaultFile;
  else return LogoImg;
};
export const getDeviceName = () => {
  return navigator.userAgent;
};
export const getBrowserName = () => {
  let userAgent = navigator.userAgent;

  if (userAgent.includes("Firefox") && !userAgent.includes("Seamonkey"))
    return "Firefox";
  else if (userAgent.includes("Seamonkey")) return "Seamonkey";
  else if (userAgent.includes("OPR") || userAgent.includes("Opera"))
    return "Opera";
  else if (userAgent.includes("MSIE") || userAgent.includes("Trident"))
    return "Internet Explorer";
  else if (userAgent.includes("Chrome") && !userAgent.includes("Chromium"))
    return "Chrome";
  else if (userAgent.includes("Chromium")) return "Chromium";
  else if (
    userAgent.includes("Safari") &&
    (!userAgent.includes("Chrome") || !userAgent.includes("Chromium"))
  )
    return "Safari";
  else return "Unkonwn";
};

export const checkIfImageExists = (url, callback) => {
  const img = new Image();
  img.src = url;
  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  }
};

export const objectToFormData = (object = {}, formateJSON = false) => {
  let form_data = new FormData();

  for (let key in object) {
    if (typeof object[key] == "object") {
      if (Array.isArray(object[key])) {
        for (let arrKey in object[key]) {
          if (typeof object[key][arrKey] == "object") {
            for (let objKey in object[key][arrKey]) {
              if (object[key][arrKey][objKey] instanceof File) {
                form_data.append(
                  `${key}[${arrKey}].${objKey}`,
                  object[key][arrKey][objKey]
                );
              } else {
                if (!formateJSON) {
                  form_data.append(
                    `${key}[${arrKey}].${objKey}`,
                    object[key][arrKey][objKey]
                  );
                } else {
                  form_data.append(
                    `${key}[${arrKey}].${objKey}`,
                    JSON.stringify(object[key][arrKey][objKey])
                  );
                }
              }
            }
          } else {
            if (!formateJSON) {
              form_data.append(`${key}[${arrKey}]`, object[key][arrKey]);
            } else {
              form_data.append(
                `${key}[${arrKey}]`,
                JSON.stringify(object[key][arrKey])
              );
            }
          }
        }
      } else if (object[key] == null) {
        // nothing
      } else if (object[key] instanceof File) {
        // (object[key] instanceof File) OR (typeof object[key].name == "string")
        form_data.append(key, object[key]);
      } else {
        if (!formateJSON) {
          for (let objKey in object[key]) {
            form_data.append(`${key}.${objKey}`, object[key][objKey]);
          }
        } else {
          for (let objKey in object[key]) {
            form_data.append(
              `${key}.${objKey}`,
              JSON.stringify(object[key][objKey])
            );
          }
        }
      }
    } else {
      if (!formateJSON) {
        form_data.append(key, object[key]);
      } else {
        form_data.append(key, JSON.stringify(object[key]));
      }
    }
  }
  return form_data;
};

export const DEFAULT_QUERY_SELECTORS = {
  appContent: ".app-content",
  bottomSheet: ".form-body",
};

export const scrollToTop = (selectors = "") => {
  const allSelectors = document.querySelectorAll(selectors);
  if (allSelectors != undefined && allSelectors.length != 0) {
    allSelectors.forEach(function(item) {
      item.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
};

export const bottomSheetScrollToTop = () => {
  scrollToTop(DEFAULT_QUERY_SELECTORS.bottomSheet);
};
export const appContentScrollToTop = () => {
  scrollToTop(DEFAULT_QUERY_SELECTORS.appContent);
};

export const numberToEn = (number) => {
  if (number.toString().indexOf("٠") > -1)
    number = number.toString().replace(/٠/g, "0");
  if (number.toString().indexOf("١") > -1)
    number = number.toString().replace(/١/g, "1");
  if (number.toString().indexOf("٢") > -1)
    number = number.toString().replace(/٢/g, "2");
  if (number.toString().indexOf("٣") > -1)
    number = number.toString().replace(/٣/g, "3");
  if (number.toString().indexOf("٤") > -1)
    number = number.toString().replace(/٤/g, "4");
  if (number.toString().indexOf("٥") > -1)
    number = number.toString().replace(/٥/g, "5");
  if (number.toString().indexOf("٦") > -1)
    number = number.toString().replace(/٦/g, "6");
  if (number.toString().indexOf("٧") > -1)
    number = number.toString().replace(/٧/g, "7");
  if (number.toString().indexOf("٨") > -1)
    number = number.toString().replace(/٨/g, "8");
  if (number.toString().indexOf("٩") > -1)
    number = number.toString().replace(/٩/g, "9");
  return number;
};

export const checkViewType = (viewType) => {
  switch (viewType) {
    case VIEW_TYPES.table:
      return VIEW_TYPES.table;
    case VIEW_TYPES.cards:
      return VIEW_TYPES.cards;
    default:
      return VIEW_TYPES.default;
  }
};

export const formateDateTimeLang = (date, time) => {
  if (date && time) return `${date} - ${time}`;
  else return i18n.t("notFound");
};

export const getObjectOfDateTime = (dateTime = "") => {
  let response = {
    dateTimeUTC: "",
    dateTime: "",
    dateTime12: "",
    date: "",
    time: "",
    time12: "",
    timeCustomized: "",
  };

  // let theDateTime = dateTime ? new Date(dateTime) : new Date();
  let theDateTime = new Date(dateTime);
  if (!dateTime || theDateTime == "Invalid Date") return response;

  let year = theDateTime.getFullYear();
  let month = theDateTime.getMonth() + 1;
  let day = theDateTime.getDate();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  let hours = theDateTime.getHours();
  let minutes = theDateTime.getMinutes();
  let seconds = theDateTime.getSeconds();
  let m = "AM";
  let hours12;
  if (hours >= 12) {
    m = "PM";
    hours12 = hours % 12 < 10 ? `0${hours % 12}` : hours % 12;
  } else {
    hours12 = hours % 12 < 10 ? `0${hours}` : hours;
  }
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  let date = `${year}/${month}/${day}`;
  let time24 = `${hours}:${minutes}:${seconds}`;
  let time12 = `${hours12}:${minutes}:${seconds} ${m}`;
  let timeCustomized = `${hours12}:${minutes} ${m}`;
  let fullDateTime = `${date} ${time24}`;
  let fullDateTime12 = `${date} ${time12}`;

  response.dateTimeUTC = theDateTime;
  response.dateTime = fullDateTime;
  response.dateTime12 = fullDateTime12;
  response.date = date;
  response.time = time24;
  response.time12 = time12;
  response.timeCustomized = timeCustomized;
  return response;
};

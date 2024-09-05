import store from "./../store";
//#region DOM
const root = document.documentElement;

export const setRootStyleLang = () => {
  const appLanguages = store.getters.appLanguages;
  const appCurrentLanguage = store.getters.appCurrentLanguage;
  switch (appCurrentLanguage) {
    case appLanguages.arEG:
    default:
      if (root.classList.contains("app-is-ltr"))
        root.classList.remove("app-is-ltr");
      root.classList.add("app-is-rtl");
      break;
    case appLanguages.enUS:
      if (root.classList.contains("app-is-rtl"))
        root.classList.remove("app-is-rtl");
      root.classList.add("app-is-ltr");
      break;
  }
};
export const setRootStyleTheme = () => {
  const appThemes = store.getters.appThemes;
  const appCurrentTheme = store.getters.appCurrentTheme;
  switch (appCurrentTheme) {
    case appThemes.light:
    default:
      if (root.classList.contains("dark-theme"))
        root.classList.remove("dark-theme");
      root.classList.add("light-theme");
      break;
    case appThemes.dark:
      if (root.classList.contains("light-theme"))
        root.classList.remove("light-theme");
      root.classList.add("dark-theme");
      break;
  }
};
export const setRootStyleLayout = () => {
  const appLayouts = store.getters.appLayouts;
  const appCurrentLayout = store.getters.appCurrentLayout;
  switch (appCurrentLayout) {
    case appLayouts.auth:
    default:
      if (root.classList.contains("dashboard-layout"))
        root.classList.remove("dashboard-layout");
      root.classList.add("auth-layout");
      break;
    case appLayouts.dashboard:
      if (root.classList.contains("auth-layout"))
        root.classList.remove("auth-layout");
      root.classList.add("dashboard-layout");
      break;
  }
};

export const setRootDefaultStyle = async () => {
  const appInitialStateLoaded = store.getters.appInitialStateLoaded;
  const appStorageCleared = store.getters.appStorageCleared;
  const appDefaultSetupIsSet = store.getters.appDefaultSetupIsSet;
  if (!appInitialStateLoaded) {
    await store.dispatch("loadInitialState");
  }
  if (!appStorageCleared) {
    await store.dispatch("clearAppStorage");
  }
  if (!appDefaultSetupIsSet) {
    await store.dispatch("setDefaultSetup");
  }
  setRootStyleLang();
  setRootStyleTheme();
  setRootStyleLayout();
};

//#endregion DOM

import { LANGUAGES, THEMES } from "./constants";
// LAYOUTS

//#region General
// export const setRootStyleLang = () => {
//   const language = getAppLanguage();
//   const root = document.documentElement;

//   if (language == LANGUAGES.arEG) {
//     if (root.classList.contains("app-is-ltr"))
//       root.classList.remove("app-is-ltr");
//     root.classList.add("app-is-rtl");
//   } else if (language == LANGUAGES.enUS) {
//     if (root.classList.contains("app-is-rtl"))
//       root.classList.remove("app-is-rtl");
//     root.classList.add("app-is-ltr");
//   }
// };
// export const setRootStyleTheme = () => {
//   const theme = getAppTheme();
//   const root = document.documentElement;

//   if (theme == THEMES.light) {
//     if (root.classList.contains("dark-theme"))
//       root.classList.remove("dark-theme");
//     root.classList.add("light-theme");
//   } else if (theme == THEMES.dark) {
//     if (root.classList.contains("light-theme"))
//       root.classList.remove("light-theme");
//     root.classList.add("dark-theme");
//   }
// };
//#endregion General

//#region Language & Theme
export const getValidLanguage = (lang) => {
  switch (lang) {
    case LANGUAGES.arEG:
      return LANGUAGES.arEG;
    case LANGUAGES.enUS:
      return LANGUAGES.enUS;
    default:
      return LANGUAGES.default;
  }
};
export const getAppLanguage = () => {
  return getValidLanguage(localStorage.getItem("appLanguage"));
};
export const setAppLanguage = (language = LANGUAGES.default) => {
  localStorage.setItem("appLanguage", getValidLanguage(language));
  window.location.reload();
};

export const getValidTheme = (theme) => {
  switch (theme) {
    case THEMES.light:
      return THEMES.light;
    case THEMES.dark:
      return THEMES.dark;
    default:
      return THEMES.default;
  }
};
export const getAppTheme = () => {
  return getValidTheme(localStorage.getItem("appTheme"));
};
export const setAppTheme = (theme = THEMES.default) => {
  localStorage.setItem("appTheme", getValidTheme(theme));
  window.location.reload();
};
//#endregion Language & Theme

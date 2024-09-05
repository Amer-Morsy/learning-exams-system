import store from "./../store";
//#region DOM-helper
const root = document.documentElement;

export const setRootDefaultStyleLang = () => {
  const appLanguages = store.getters.appLanguages;
  const appDefaultLanguage = store.getters.appDefaultLanguage;
  switch (appDefaultLanguage) {
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
export const setRootDefaultStyleTheme = () => {
  const appThemes = store.getters.appThemes;
  const appDefaultTheme = store.getters.appDefaultTheme;
  switch (appDefaultTheme) {
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
export const setRootDefaultStyleLayout = () => {
  const appLayoutsClasses = store.getters.appLayoutsClasses;
  const appDefaultLayout = store.getters.appDefaultLayout;
  switch (appDefaultLayout) {
    case appLayoutsClasses.authClassName:
    default:
      if (root.classList.contains(appLayoutsClasses.dashboardClassName))
        root.classList.remove(appLayoutsClasses.dashboardClassName);
      root.classList.add(appLayoutsClasses.authClassName);
      break;
    case appLayoutsClasses.dashboardClassName:
      if (root.classList.contains(appLayoutsClasses.authClassName))
        root.classList.remove(appLayoutsClasses.authClassName);
      root.classList.add(appLayoutsClasses.dashboardClassName);
      break;
  }
};

export const setRootCurrentStyleLang = () => {
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
export const setRootCurrentStyleTheme = () => {
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
export const setRootCurrentStyleLayout = () => {
  const appLayoutsClasses = store.getters.appLayoutsClasses;
  const appCurrentLayout = store.getters.appCurrentLayout;
  // console.log("appCurrentLayout", appCurrentLayout);
  switch (appCurrentLayout) {
    case appLayoutsClasses.authClassName:
    default:
      if (root.classList.contains(appLayoutsClasses.dashboardClassName))
        root.classList.remove(appLayoutsClasses.dashboardClassName);
      root.classList.add(appLayoutsClasses.authClassName);
      break;
    case appLayoutsClasses.dashboardClassName:
      if (root.classList.contains(appLayoutsClasses.authClassName))
        root.classList.remove(appLayoutsClasses.authClassName);
      root.classList.add(appLayoutsClasses.dashboardClassName);
      console.log("root.classList", root.classList);
      break;
  }
  // window.location.reload();
};

const rootStyle = document.documentElement.style;
export const setRootSidebarStyleLayout = () => {
  rootStyle.setProperty("--position-start", "left");
};

//#endregion DOM-helper

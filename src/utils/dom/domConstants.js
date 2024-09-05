// import appDomExternalConstantsData from "./../../../public/resources/dom/domConstants.json";
import appSetupExternalData from "./../../../public/resources/setup/appSetup.json";

const appSetupConstantsData = {
  appLanguages: {
    default: "en-US",
    enUS: "en-US",
    arEG: "ar-EG",
  },
  appThemes: {
    default: "dark",
    dark: "dark",
    light: "light",
  },
  appLayouts: {
    default: "blank",
    blank: "blank",
    auth: "auth",
    dashboard: "dashboard",
  },
};
const appDomExternalConstantsData = {
  appLanguageClasses: {
    default: "app-is-ltr",
    ltr: "app-is-ltr",
    rtl: "app-is-rtl",
  },
  appThemeClasses: {
    default: "dark-theme",
    dark: "dark-theme",
    light: "light-theme",
  },
  appLayoutClasses: {
    default: "blank-layout",
    blank: "blank-layout",
    auth: "auth-layout",
    dashboard: "dashboard-layout",
  },
};

export const _appSetupData = () => {
  return appSetupExternalData.appSetupData ?? appSetupConstantsData;
};

export const _appLanguageClasses = () => {
  if (appDomExternalConstantsData) {
    return appDomExternalConstantsData.appLanguageClasses;
  } else {
    return {
      default: "app-is-ltr",
      ltr: "app-is-ltr",
      rtl: "app-is-rtl",
    };
  }
};

export const _appThemeClasses = () => {
  if (appDomExternalConstantsData) {
    return appDomExternalConstantsData.appThemeClasses;
  } else {
    return {
      default: "dark-theme",
      dark: "dark-theme",
      light: "light-theme",
    };
  }
};

export const _appLayoutClasses = () => {
  if (appDomExternalConstantsData) {
    return appDomExternalConstantsData.appLayoutClasses;
  } else {
    return {
      default: "blank-layout",
      blank: "blank-layout",
      auth: "auth-layout",
      dashboard: "dashboard-layout",
    };
  }
};

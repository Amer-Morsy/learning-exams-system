import {
  _appLanguageClasses,
  _appThemeClasses,
  _appLayoutClasses,
  _appSetupData,
} from "./../utils/dom/domConstants";
import { getStateInterface } from "./../store/AppDom/state-interface";
import store from "./../store";

export default class AppDomController {
  constructor(isStoreRunning = store.state.appDom.running ?? null) {
    this.root = document.documentElement;
    if (!isStoreRunning) this.runStore();
    // else this.updateState(store.state.appDom.data);
  }
  runStore() {
    this.setInitialState();
    this.resetState();
    this.loadInitialState(this.appDomData);
    this.setInitialLayout();
    this.updateState(this.appDomData);
  }
  setInitialState() {
    this.appDomData = getStateInterface();
  }
  resetState() {
    store.dispatch("resetStateAppDom");
  }
  loadInitialState(data) {
    store.dispatch("loadInitialState", data);
  }
  updateState(data) {
    if (data) {
      this.updateLayout(data);
    } else {
      this.setInitialLayout();
      this.updateLayout(this.appDomData);
    }
  }
  setInitialLayout() {
    this.appDomData = {
      currentLanguage: "en-US",
      currentTheme: "dark",
      currentLayout: "auth",
    };
  }

  updateLayout(data) {
    this.updateLanguage(data.currentLanguage);
    this.updateTheme(data.currentTheme);
    this.setCurrentLayout(data.currentLayout);
  }
  async updateLanguage(language) {
    this.setRootLanguageClass(this.getClassNameLang(language));
    this.setCurrentLanguage(language);
  }
  updateTheme(theme) {
    this.setRootThemeClass(this.getClassNameTheme(theme));
    this.setCurrentTheme(theme);
  }

  getClassNameLang(lang) {
    const appLanguages = this.get_appSetupData().appLanguages;
    const appLanguageClasses = this.get_appLanguageClasses();
    switch (lang) {
      case appLanguages.enUS:
        return appLanguageClasses.ltr;
      case appLanguages.arEG:
        return appLanguageClasses.rtl;
      default:
        return appLanguageClasses.default;
    }
  }
  getClassNameTheme(theme) {
    const appThemes = this.get_appSetupData().appThemes;
    const appThemeClasses = this.get_appThemeClasses();
    switch (theme) {
      case appThemes.dark:
        return appThemeClasses.dark;
      case appThemes.light:
        return appThemeClasses.light;
      default:
        return appThemeClasses.default;
    }
  }
  getClassNameLayout(layout) {
    const appLayouts = this.get_appSetupData().appLayouts;
    const appLayoutClasses = this.get_appLayoutClasses();
    switch (layout) {
      case appLayouts.auth:
        return appLayoutClasses.auth;
      case appLayouts.dashboard:
        return appLayoutClasses.dashboard;
      default:
        return appLayoutClasses.default;
    }
  }

  get_appSetupData() {
    return _appSetupData();
  }
  get_appLanguageClasses() {
    return _appLanguageClasses();
  }
  get_appThemeClasses() {
    return _appThemeClasses();
  }
  get_appLayoutClasses() {
    return _appLayoutClasses();
  }

  setCurrentLanguage(language) {
    store.dispatch("setCurrentLanguage", language);
  }
  setCurrentTheme(theme) {
    store.dispatch("setCurrentTheme", theme);
  }
  setCurrentLayout(layout) {
    store.dispatch("setCurrentLayout", layout);
  }

  setRootLanguageClass(className) {
    if (!className) {
      this.setRootDefaultStyleLang();
    } else {
      const appLanguageClasses = this.get_appLanguageClasses();
      switch (className) {
        case appLanguageClasses.ltr:
          if (this.root.classList.contains(appLanguageClasses.rtl))
            this.root.classList.remove(appLanguageClasses.rtl);
          this.root.classList.add(appLanguageClasses.ltr);
          break;
        case appLanguageClasses.rtl:
          if (this.root.classList.contains(appLanguageClasses.ltr))
            this.root.classList.remove(appLanguageClasses.ltr);
          this.root.classList.add(appLanguageClasses.rtl);
          break;
        default:
          this.setRootDefaultStyleLang();
      }
    }
  }
  setRootDefaultStyleLang() {
    const appLanguageClasses = this.get_appLanguageClasses();
    if (this.root.classList.contains(appLanguageClasses.ltr)) {
      this.root.classList.remove(appLanguageClasses.ltr);
    } else if (this.root.classList.contains(appLanguageClasses.rtl)) {
      this.root.classList.remove(appLanguageClasses.rtl);
    }
    this.root.classList.add(appLanguageClasses.default);
  }

  setRootThemeClass(className) {
    if (!className) {
      this.setRootDefaultStyleTheme();
    } else {
      const appThemeClasses = this.get_appThemeClasses();
      switch (className) {
        case appThemeClasses.dark:
          if (this.root.classList.contains(appThemeClasses.light))
            this.root.classList.remove(appThemeClasses.light);
          this.root.classList.add(appThemeClasses.dark);
          break;
        case appThemeClasses.light:
          if (this.root.classList.contains(appThemeClasses.dark))
            this.root.classList.remove(appThemeClasses.dark);
          this.root.classList.add(appThemeClasses.light);
          break;
        default:
          this.setRootDefaultStyleTheme();
      }
    }
  }
  setRootDefaultStyleTheme() {
    const appThemeClasses = this.get_appThemeClasses();
    if (this.root.classList.contains(appThemeClasses.dark)) {
      this.root.classList.remove(appThemeClasses.dark);
    } else if (this.root.classList.contains(appThemeClasses.light)) {
      this.root.classList.remove(appThemeClasses.light);
    }
    this.root.classList.add(appThemeClasses.default);
  }

  getCurrentLangClass() {
    const appLanguageClasses = this.get_appLanguageClasses();
    if (this.root.classList.contains(appLanguageClasses.rtl)) {
      return appLanguageClasses.rtl;
    } else if (this.root.classList.contains(appLanguageClasses.ltr)) {
      return appLanguageClasses.ltr;
    } else {
      return null;
    }
  }
  getCurrentThemeClass() {
    const appThemeClasses = this.get_appThemeClasses();
    if (this.root.classList.contains(appThemeClasses.dark)) {
      return appThemeClasses.dark;
    } else if (this.root.classList.contains(appThemeClasses.light)) {
      return appThemeClasses.light;
    } else {
      return null;
    }
  }

  setRootCurrentStyleLang() {
    const appLanguages = store.getters.appLanguages;
    const appCurrentLanguage = store.getters.currentLanguage;
    const appLanguageClasses = this.get_appLanguageClasses();
    switch (appCurrentLanguage) {
      case appLanguages.enUS:
        this.setRootLanguageClass(appLanguageClasses.ltr);
        break;
      case appLanguages.arEG:
        this.setRootLanguageClass(appLanguageClasses.rtl);
        break;
      default:
        this.setRootLanguageClass();
    }
  }
  setRootCurrentStyleTheme() {
    const appThemes = store.getters.appThemes;
    const appCurrentTheme = store.getters.currentTheme;
    const appThemeClasses = this.get_appThemeClasses();
    switch (appCurrentTheme) {
      case appThemes.dark:
        this.setRootThemeClass(appThemeClasses.dark);
        break;
      case appThemes.light:
        this.setRootThemeClass(appThemeClasses.light);
        break;
      default:
        this.setRootThemeClass();
    }
  }
}

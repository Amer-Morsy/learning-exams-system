import { getStateInterface } from "./../store/AppSetup/state-interface";
import appSetupExternalData from "./../../public/resources/setup/appSetup.json";
import { APPLANGUAGES, APPTHEMES, APPLAYOUTS } from "./../utils/constants";
import store from "./../store";

export default class AppSetupController {
  constructor(appSetupData = appSetupExternalData.appSetupData ?? null) {
    if (!store.state.appSetup.isResourcesAvailable) {
      if (!appSetupData) this.setInitialState();
      else this.updateState(appSetupData);
    } else {
      this.checkResources();
    }
  }
  setInitialState() {
    this.appSetupData = getStateInterface();
  }
  updateState(data) {
    if (data) {
      this.loadAppResources(data);
    } else {
      this.setInitialResources();
    }
  }
  setInitialResources() {
    this.appSetupData = {
      appLanguages: APPLANGUAGES,
      appThemes: APPTHEMES,
      appLayouts: APPLAYOUTS,
    };
  }
  static appLanguages() {
    return appSetupExternalData.appSetupData.appLanguages ?? APPLANGUAGES;
  }
  static appLayouts() {
    return appSetupExternalData.appSetupData.appLayouts ?? APPLAYOUTS;
  }

  async loadAppResources(data) {
    await store.dispatch("resetStateAppSetup");
    await store.dispatch("setInitialState", data);
    await this.checkResources();
  }

  async checkResources(res = store.state.appSetup) {
    if (res) store.dispatch("setIsResourcesAvailable", true);
  }
}

import Vue from "vue";
import ar from "./ar.json";
import en from "./en.json";
import VueI18n from "vue-i18n";
import AppSetupController from "./../controllers/AppSetupController";

Vue.use(VueI18n);

const APPLANGUAGES = AppSetupController.appLanguages();

const messages = {
  [APPLANGUAGES.arEG]: ar,
  [APPLANGUAGES.enUS]: en,
};

export default new VueI18n({
  locale: localStorage.getItem("currentLanguage") || APPLANGUAGES.default,
  messages: messages,
});

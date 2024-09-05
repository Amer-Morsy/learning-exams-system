import { getLanguage, apiLanguageFormate } from "@/utils/functions";
import store from "@/store";

export default class BasicImport {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.language = getLanguage();
    this.formatedLanguage = apiLanguageFormate(this.language);
    this.userAuthorizeToken = store.getters.userAuthorizeToken;
    this.apiHeader = {
      headers: {
        authorizeLanguage: this.language,
        userAuthorizeToken: this.userAuthorizeToken,
      },
    };
  }
}

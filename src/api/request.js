import axios from "axios";
import store from "./../store";
import { BASE_URL, STATUS, API_DEFULT_TIMEOUT } from "./../utils/constants";
import {
  getLanguage,
  getUserAuthorizeToken,
  checkOnlineStatus,
} from "./../utils/functions";
import i18n from "./../i18n";

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = API_DEFULT_TIMEOUT;

const METHOD = {
  GET: "get",
  POST: "post",
};

async function request(url, method, params, config) {
  store.commit("clearAlertsList");
  store.dispatch("updateLoginCodeStatus", false);

  const qs = require("qs");
  const headers = {
    userAuthorizeToken: getUserAuthorizeToken(),
    authorizeLanguage: getLanguage(),
  };

  store.dispatch("showBarsPreloader");

  if (!checkOnlineStatus()) {
    let response = {
      data: {
        status: STATUS.NO_INTERNET,
        msg: i18n.t("internetConnectionFailed"),
      },
    };

    store.dispatch("hideBarsPreloader");
    return response;
  } else {
    try {
      let response;
      switch (method) {
        case METHOD.POST:
          response = await axios.post(url, params, { headers, ...config });
          break;
        case METHOD.GET:
        default:
          response = await axios.get(url, {
            params,
            paramsSerializer: (params) => {
              return qs.stringify(params, { arrayFormat: "repeat" });
            },
            headers,
            ...config,
          });
          break;
      }

      switch (response.data.status) {
        case STATUS.INVALID_TOKEN:
          store.dispatch("logoutUser", response.data.msg);
          store.commit("addAlert", response.data.msg);
          break;
        case STATUS.INVALID_LOGIN_CODE:
          store.dispatch("logoutUser", response.data.msg);
          store.dispatch("updateLoginCodeStatus", true);
          store.dispatch("updateLoginCodeMessage", response.data.msg);
          break;
      }

      store.dispatch("hideBarsPreloader");

      return response;
    } catch (error) {
      store.dispatch("hideBarsPreloader");
      store.commit("addAlert", error.msg);
      console.log(error);
      console.log(axios.defaults.timeout);
      return {
        data: {
          status: STATUS.NO_RESPONSE,
          msg: i18n.t("serverNoResponse"),
        },
      };
    }
  }
}

export { METHOD, request };

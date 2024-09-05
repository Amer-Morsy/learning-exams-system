import { ACTIVATION_TYPE } from "./../../utils/constantLists";

export default class Helper {
  constructor() {}

  getSortTokensText(sortTokens) {
    let sortTokensText = "";

    if (sortTokens.length) {
      sortTokens.forEach((element) => {
        sortTokensText += `&sortTokens=${element}`;
      });
    }
    return sortTokensText;
  }
  getActivationTypeTokenText(activationTypeTokens) {
    let activationTypeTokensText = "";

    if (activationTypeTokens.length) {
      activationTypeTokens.forEach((element) => {
        activationTypeTokensText += `&activationTypeTokens=${element}`;
      });
    } else {
      activationTypeTokensText += `&activationTypeTokens=${ACTIVATION_TYPE.default}`;
    }

    return activationTypeTokensText;
  }
}

// import store from "@/store";
import { ACTIVATION_TYPE } from "./../../../utils/constantLists";
import { VIEW_TYPES } from "./../../../utils/constants";

export default class GeneralSettingModel {
  constructor() {
    this.setInitialValue();
  }
  setInitialValue() {
    this.viewType = VIEW_TYPES.default;
    this.activationTypeTokens = [ACTIVATION_TYPE.default];

    // try {
    //   this.activationTypeTokens =
    //     store.getters.constantsListsData.listActivationType[0].itemToken;
    // } catch (error) {
    //   this.activationTypeTokens.push(ACTIVATION_TYPE.default);
    // }
  }

  fillData(data) {
    if (data) {
      this.viewType = data.viewType ?? VIEW_TYPES.default;
      this.activationTypeTokens = data.activationTypeTokens ?? [
        ACTIVATION_TYPE.default,
      ];
    } else {
      this.setInitialValue();
    }
  }
}

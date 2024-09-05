import { checkViewType } from "./functions";
import { VIEW_TYPES } from "./constants";
import { mapGetters, mapActions } from "vuex";
import GeneralSetting from "./../models/general/generalSettings/GeneralSetting";
import GeneralSettingModel from "./../models/general/generalSettings/GeneralSettingModel";

export default {
  computed: {
    ...mapGetters(["generalSetting"]),
  },
  data() {
    return {
      GeneralSetting: new GeneralSetting(),
      generalSettingModel: new GeneralSettingModel(),
      VIEW_TYPES,
    };
  },
  methods: {
    ...mapActions(["setGeneralSetting"]),
    updateGeneralSetting(modelName, closeLoading = false) {
      this.GeneralSetting.fillData(this.generalSetting);

      this.GeneralSetting[modelName].fillData(this.generalSettingModel);

      setTimeout(() => {
        this.setGeneralSetting(this.GeneralSetting);
        if (!closeLoading) this.isLoading = false;
      }, 0);
    },
    updateViewType(modelName, viewType) {
      let valueOfViewType = checkViewType(viewType);

      this.generalSettingModel.fillData(this.generalSetting[modelName]);
      this.generalSettingModel.viewType = valueOfViewType;

      this.updateGeneralSetting(modelName);
    },
    async updateActivationTypeTokens(modelName, activationTypeTokens) {
      this.generalSettingModel.fillData(this.generalSetting[modelName]);
      this.generalSettingModel.activationTypeTokens = activationTypeTokens;

      this.updateGeneralSetting(modelName, true);
    },
  },
};

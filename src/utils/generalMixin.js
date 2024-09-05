import { getLanguage } from "./functions";
import { STATUS, VIEW_TYPES, APPLANGUAGES } from "./constants";

export default {
  data() {
    return {
      STATUS,
      VIEW_TYPES,
      // isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: getLanguage(),
    };
  },
  methods: {
    showMsg(msg = "", isSuccess = false) {
      let variant = isSuccess ? "success" : "danger";
      this.$bvToast.toast(`${msg}`, {
        title: this.$t("alert"),
        variant: variant,
        toaster: "b-toaster-bottom-center",
        autoHideDelay: 5000,
      });
    },
    openBottomSheet(bottomSheet) {
      this.$root.$emit("openBottomSheet", bottomSheet);
    },
    closeBottomSheet(bottomSheet) {
      this.$root.$emit("closeBottomSheet", bottomSheet);
    },
    setOptions() {
      this.options = this.listSort.map((i) => {
        return {
          text:
            this.language == APPLANGUAGES.enUS ? i.sortNameEn : i.sortNameAr,
          value: i.sortToken,
        };
      });
    },
  },
};

<template>
  <div class="phone-picker" :class="className">
    <CustomSelectBox
      :className="'country-code'"
      :id="`${id}-phoneCCWithCCName`"
      :value="phoneCCWithCCName || `${phoneCCName} ${phoneCC}`"
      :options="countriesCodes"
      v-on:changeValue="phoneCCWithCCName = $event"
      :title="$t('PhonePicker.countrySelectorLabel')"
      :imgName="'earth.svg'"
      :isDisabled="isDisabled"
    />
    <CustomInput
      :className="'phone-number'"
      :id="`${id}-thePhoneNumber`"
      :value="thePhoneNumber"
      v-on:changeValue="
        thePhoneNumber = $event;
        valueChanged();
      "
      :title="title ? title : $t('PhonePicker.phoneNumberLabel')"
      :imgName="imgName ? imgName : 'phone.svg'"
      :isDisabled="isDisabled"
    />
  </div>
</template>

<script>
import CustomInput from "@/components/inputs/CustomInput.vue";
import CustomSelectBox from "@/components/inputs/CustomSelectBox.vue";
import { LANGUAGES } from "./../../utils/constants";
import { getLanguage } from "./../../utils/functions";
import CountriesList from "./../../utils/CountriesList";

export default {
  name: "CustomPhonePicker",
  components: {
    CustomInput,
    CustomSelectBox,
  },

  data() {
    return {
      language: getLanguage(),
      thePhoneNumber: this.phoneNumber,
      phoneCCWithCCName: "",
      phoneCC: this.countryCode,
      phoneCCName: this.countryCodeName,
      countriesCodes: [],
    };
  },
  methods: {
    valueChanged() {
      let returnObject = {
        phoneNumber: this.thePhoneNumber,
        CCWithCCName: this.phoneCCWithCCName,
        countryCode: this.phoneCC,
        countryCodeName: this.phoneCCName,
      };
      this.$emit("changeValue", returnObject);
    },
    setPhoneCCWithCCName() {
      this.phoneCCWithCCName =
        this.countryCodeName && this.countryCode
          ? `${this.countryCodeName} ${this.countryCode}`
          : "";
    },
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "phonePicker",
    },
    phoneNumber: {
      default: "",
    },
    countryCode: {
      default: "",
    },
    countryCodeName: {
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    imgName: {
      type: String,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    phoneNumber: function(val) {
      this.thePhoneNumber = val;
    },
    countryCode: function(val) {
      this.phoneCC = val;
      this.setPhoneCCWithCCName();
    },
    countryCodeName: function(val) {
      this.phoneCCName = val;
    },

    phoneCCWithCCName: function(val) {
      let cc = val.split(" ");
      this.phoneCC = cc[1];
      this.phoneCCName = cc[0];
    },
    phoneCC: function() {
      this.valueChanged();
    },
    phoneCCName: function() {
      this.valueChanged();
    },
  },
  async created() {
    if (this.language == LANGUAGES.arEG)
      this.countriesCodes = CountriesList.map((item) => {
        return {
          value: `${item.iso2} ${item.dial_code}`,
          text: `(${item.dial_code}) ${item.name_ar}`,
        };
      });
    else
      this.countriesCodes = CountriesList.map((item) => {
        return {
          value: `${item.iso2} ${item.dial_code}`,
          text: `(${item.dial_code}) ${item.name}`,
        };
      });
  },
};
</script>

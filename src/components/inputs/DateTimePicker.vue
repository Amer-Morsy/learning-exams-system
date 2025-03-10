<template>
  <v-date-picker
    class="date-time-picker"
    :class="
      (!withOutDesign ? 'form-label-group' : 'with-out-design') +
      (errors.length == 0 ? '' : ' form-group--error')
    "
    v-model="theValue"
    :mode="dateTimeMode"
    :locale="language"
    :is24hr="is24hr"
    :max-date="maxDate"
  >
    <template v-slot="{ inputValue, inputEvents }">
      <input
        :name="id"
        :id="id"
        type="text"
        :value="inputValue"
        v-on="inputEvents"
        class="form-control"
        placeholder=" "
        :disabled="isDisabled"
      />
      <label v-if="!withOutDesign" :for="id">{{
        title ? title : $t("notFound")
      }}</label>
      <img v-if="!withOutDesign" :src="require('@/assets/images/' + imgName)" />
      <span class="error" v-for="(error, index) in errors" :key="index">
        {{ error }}
      </span>
    </template>
  </v-date-picker>
</template>

<script>
import { getObjectOfDateTime } from "./../../utils/functions";

export default {
  name: "DateTimePicker",
  data() {
    return {
      theValue: this.value,
    };
  },
  props: {
    type: {
      type: String,
      default: "dateTime",
    },
    maxDate: {},
    is24hr: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: "ar-EG",
    },
    id: {
      type: String,
      default: "id",
    },
    value: {
      default: "",
    },
    title: {
      type: String,
      default: "title",
    },
    imgName: {
      type: String,
      default: "dateAndTime.svg",
    },
    errors: {
      type: Array,
      default: () => [],
    },
    withOutDesign: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dateTimeMode: function () {
      switch (this.type) {
        case "date":
          return "date";
        case "time":
          return "time";
        case "dateTime":
        default:
          return "dateTime";
      }
    },
  },
  watch: {
    theValue: function (val) {
      this.$emit("changeValue", getObjectOfDateTime(val));
    },
    value: function (val) {
      this.theValue = val;
    },
  },
};
</script>

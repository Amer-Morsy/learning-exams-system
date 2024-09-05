<template>
  <div :class="className + (!withOutDesign ? ' form-label-group' : '')">
    <input
      :name="id"
      :id="id"
      type="text"
      v-model="theValue"
      class="form-control"
      v-on:keypress="isInt($event)"
      @paste="handlePaste($event)"
      placeholder=" "
      :maxlength="maxlength"
      :disabled="isDisabled"
    />
    <label v-if="!withOutDesign" :for="id">{{
      title ? title : $t("notFound")
    }}</label>
    <img v-if="!withOutDesign" :src="require('@/assets/images/' + imgName)" />
  </div>
</template>

<script>
import { numberToEn } from "./../../utils/functions";
import { isValidInteger } from "./../../utils/validationHelper";

export default {
  name: "CustomInputInt",
  data() {
    return {
      theValue: this.value,
    };
  },
  methods: {
    isInt(e) {
      let char = String.fromCharCode(e.keyCode);
      if (isValidInteger(numberToEn(char))) return true;
      else e.preventDefault();
    },
    handlePaste(e) {
      let char = (e.clipboardData || window.clipboardData).getData("text");
      if (isValidInteger(numberToEn(char))) return true;
      else e.preventDefault();
    },
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "textarea",
    },
    value: {
      default: "222",
    },
    title: {
      type: String,
      default: "title",
    },
    imgName: {
      type: String,
      default: "man.svg",
    },
    maxlength: {
      type: Number,
      default: 1000000,
    },
    withOutDesign: {
      type: Boolean,
      default: false,
    },
    maxValueStatus: {
      type: Boolean,
      default: false,
    },
    maxValue: {
      type: Number,
      default: 1000000,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value: function(val) {
      this.theValue = numberToEn(val);
    },
    theValue: function(val) {
      if (this.value != val)
        if (!this.maxValueStatus) {
          this.$emit(
            "changeValue",
            !val
              ? 0
              : isNaN(Number(numberToEn(val)))
              ? 0
              : Number(numberToEn(val))
          );
        } else {
          this.$emit(
            "changeValue",
            !val
              ? 0
              : isNaN(Number(numberToEn(val)))
              ? 0
              : Number(numberToEn(val)) <= Number(numberToEn(this.maxValue))
              ? Number(numberToEn(val))
              : Number(numberToEn(this.maxValue))
          );
        }
    },
  },
};
</script>

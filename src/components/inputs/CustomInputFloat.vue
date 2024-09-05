<template>
  <div
    :class="
      className +
      (!withOutDesign ? ' form-label-group' : '') +
      (errors.length == 0 ? '' : ' form-group--error')
    "
  >
    <input
      :name="id"
      :id="id"
      type="text"
      v-model="theValue"
      class="form-control"
      @keypress="isFloat($event)"
      @paste="handlePaste($event)"
      placeholder=" "
      :disabled="isDisabled"
      :maxlength="maxlength"
    />
    <label v-if="!withOutDesign" :for="id">{{
      title ? title : $t("notFound")
    }}</label>
    <img v-if="!withOutDesign" :src="require('@/assets/images/' + imgName)" />
    <img
      v-if="isSync"
      @click="emitGetLocation()"
      :title="$t('general.getLocation')"
      class="location-pin-icon"
      :src="require('@/assets/images/location-pin.svg')"
    />
    <span class="error" v-for="(error, index) in errors" :key="index">
      {{ error }}
    </span>
  </div>
</template>

<script>
import { numberToEn } from "./../../utils/functions";
import { isValidFloat } from "./../../utils/validationHelper";

export default {
  name: "CustomInputFloat",
  data() {
    return {
      theValue: this.value,
    };
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
    // value: {
    //   default: "",
    // },
    value: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "title",
    },
    imgName: {
      type: String,
      default: "man.svg",
    },
    maxValueStatus: {
      type: Boolean,
      default: false,
    },
    maxValue: {
      type: Number,
      default: 1000000,
    },
    maxlength: {
      type: Number,
      default: 1000000,
    },
    digitsNumAfterDot: {
      type: Number,
      default: 4,
    },
    errors: {
      type: Array,
      default: () => [],
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    withOutDesign: {
      type: Boolean,
      default: false,
    },
    isSync: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value: function (val) {
      // this.theValue = val;
      this.theValue = Number(val);
    },
    theValue: function (val) {
      if (this.value != val) {
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
          let returnedVal = null;
          let isNoVal = !val;
          let isNotNum = isNaN(Number(numberToEn(val)));
          let isLessMax =
            Number(numberToEn(val)) <= Number(numberToEn(this.maxValue));

          if (isNoVal) {
            returnedVal = 0;
          } else {
            if (isNotNum) {
              returnedVal = 0;
            } else if (isLessMax) {
              returnedVal = Number(numberToEn(val));
            } else {
              returnedVal = Number(numberToEn(this.maxValue));
            }
          }
          this.$emit("changeValue", returnedVal);
        }
      }
    },
  },
  async created() {},
  methods: {
    emitGetLocation() {
      this.$emit("getLocation", "");
    },
    isFloat($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      // only allow number and one dot
      if (!this.maxValueStatus) {
        if (
          ((keyCode < 48 || keyCode > 57) &&
            (keyCode !== 46 || this.value.toString().indexOf(".") != -1)) ||
          (keyCode == 46 && this.theValue.toString().indexOf(".") != -1)
        ) {
          // 46 is dot
          $event.preventDefault();
        }
      } else {
        if (this.value == this.maxValue) {
          $event.preventDefault();
          // || this.theValue >= this.maxValue
          // this.value = this.maxValue;
          // this.theValue = this.maxValue;
        } else {
          if (
            ((keyCode < 48 || keyCode > 57) &&
              (keyCode !== 46 || this.value.toString().indexOf(".") != -1)) ||
            (keyCode == 46 && this.theValue.toString().indexOf(".") != -1)
          ) {
            // 46 is dot
            $event.preventDefault();
          }
        }
      }
    },
    handlePaste(e) {
      let char = (e.clipboardData || window.clipboardData).getData("text");
      if (isValidFloat(numberToEn(char))) return true;
      else e.preventDefault();
    },
  },
};
</script>

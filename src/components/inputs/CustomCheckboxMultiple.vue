<template>
  <div
    :class="className + (centerStatus ? ' check-box-center' : '')"
    class="custom-checkbox-container"
  >
    <b-form-group>
      <template #label>
        <div class="title">
          <img :src="require('@/assets/images/' + imgName)" />
          <label>{{ title }}</label>
        </div>
      </template>

      <b-form-checkbox-group v-model="theValue" name="custom-checkbox">
        <b-form-checkbox
          v-for="(option, index) in options"
          :key="index"
          name="check-button"
          :value="option"
          :class="inlineStatus ? 'check-box-muti-inline' : ''"
        >
          <span class="checked" :style="`--color: ${colorChecked}`">
            <svg
              id="SvgjsSvg1011"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:svgjs="http://svgjs.com/svgjs"
            >
              <defs id="SvgjsDefs1012"></defs>
              <g id="SvgjsG1013">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 1792 1792"
                >
                  <path
                    d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"
                    :fill="colorChecked"
                    class="color000 svgShape"
                  ></path>
                </svg>
              </g>
            </svg>
          </span>
          <span class="unchecked" :style="`--color: ${colorUnchecked}`">
            <svg
              id="SvgjsSvg1026"
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns:svgjs="http://svgjs.com/svgjs"
            >
              <defs id="SvgjsDefs1027"></defs>
              <g id="SvgjsG1028">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 512 512"
                  viewBox="0 0 512 512"
                  width="18"
                  height="18"
                >
                  <path
                    :fill="colorUnchecked"
                    d="M339.7,258.8l156.4-156.4c22.4-22.4,22.4-58.6,0-81c-22.4-22.4-58.6-22.4-81,0L258.8,177.8l-161-161
    c-22.4-22.4-58.6-22.4-81,0c-22.4,22.4-22.4,58.6,0,81l161,161L22.3,414.3c-22.4,22.4-22.4,58.6,0,81C33.5,506.4,48.1,512,62.8,512
    s29.3-5.6,40.5-16.8l155.5-155.5l150.9,150.9c11.2,11.2,25.8,16.8,40.5,16.8c14.7,0,29.3-5.6,40.5-16.8c22.4-22.4,22.4-58.6,0-81
    L339.7,258.8z"
                    class="color231f20 svgShape"
                  ></path>
                </svg>
              </g>
            </svg>
          </span>
          <span class="text">{{ option.text }}</span>
        </b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "CustomCheckboxMultiple",
  data() {
    return {
      colorChecked: "#0075ff",
      colorUnchecked: "#f44336",
      // theValue: this.value,
      theValue: [],
      currentValue: [],
      arrayOfObjects: [],
      arrayOfValues: [],
      stopEmit: false,
    };
  },
  methods: {
    getCurrentItems(arrayOfValues) {
      if (arrayOfValues.length) {
        this.stopEmit = false;
        let currentValue = [];
        for (let i in arrayOfValues) {
          let index = this.options.findIndex(
            (x) => x.value == arrayOfValues[i]
          );

          if (index > -1) {
            currentValue.push({
              value: this.options[index].value,
              text: this.options[index].text,
            });
          }
        }
        if (JSON.stringify(this.theValue) != JSON.stringify(currentValue))
          this.theValue = currentValue;
      } else {
        this.stopEmit = true;
        this.theValue = [];
      }
    },
    changeValue(val) {
      this.arrayOfObjects = val;
      this.arrayOfValues = val.map((x) => x.value);

      if (this.returnArrayOfObjects)
        this.$emit("changeValue", this.arrayOfObjects);
      else this.$emit("changeValue", this.arrayOfValues);
    },
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    value: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    imgName: {
      type: String,
      default: "type.svg",
    },
    returnArrayOfObjects: {
      type: Boolean,
      default: false,
    },
    centerStatus: {
      type: Boolean,
      default: false,
    },
    inlineStatus: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    theValue: function (val) {
      if (!this.stopEmit || val.length > 0) this.changeValue(val);
    },
    value: function (arrayOfValues) {
      this.getCurrentItems(arrayOfValues);
    },
    options: function () {
      this.getCurrentItems(this.value);
    },
  },
  created() {
    this.getCurrentItems(this.value);
  },
};
</script>

<template>
  <div
    :class="
      className +
        (!withOutDesign ? ' form-label-group' : '') +
        (errors.length == 0 ? '' : ' form-group--error')
    "
  >
    <b-form-textarea
      :id="id"
      v-model.trim="theValue"
      placeholder=" "
      :rows="rows"
      :max-rows="maxRows"
      :maxlength="maxlength"
      :disabled="isDisabled"
    ></b-form-textarea>
    <label v-if="!withOutDesign" :for="id">{{
      title ? title : $t("notFound")
    }}</label>
    <img v-if="!withOutDesign" :src="require('@/assets/images/' + imgName)" />
    <span class="error" v-for="(error, index) in errors" :key="index">
      {{ error }}
    </span>
  </div>
</template>

<script>
export default {
  name: "TextArea",
  data() {
    return {
      theValue: this.value,
    };
  },
  methods: {},
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
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "title",
    },
    imgName: {
      type: String,
      default: "notes.svg",
    },
    maxlength: {
      default: "100000",
    },
    rows: {
      default: "1",
    },
    maxRows: {
      default: "100000",
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
  },
  watch: {
    value: function(val) {
      this.theValue = val;
    },
    theValue: function(val) {
      if (this.value != val) this.$emit("changeValue", val);
    },
  },
  async created() {
    this.theValue = this.value;
  },
};
</script>

<style lang="scss" scoped></style>

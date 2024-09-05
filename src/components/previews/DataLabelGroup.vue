<template>
  <div class="data-label-group" :class="className">
    <p>{{ value || value === 0 ? value : $t("notFound") }}</p>
    <label>{{ title ? title : $t("notFound") }}</label>
    <img :src="require('@/assets/images/' + imgName)" />
  </div>
</template>

<script>
export default {
  name: "DataLabelGroup",
  data() {
    return {};
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    value: {
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    imgName: {
      type: String,
      default: "man.svg",
    },
  },
};
</script>

<style lang="scss">
.data-label-group {
  position: relative;
  margin-bottom: 1rem;
  width: 100%;
  padding-inline-start: 5px;
  padding-inline-end: 5px;
}
.data-label-group > p {
  padding: 1.2rem var(--input-padding-x) 0.3rem;
  height: auto !important;
  border: 1px solid var(--color-text-main);
  border-radius: 2rem;
  -webkit-padding-start: 50px;
  padding-inline-start: 50px;
  user-select: text;
}
.data-label-group > label {
  display: block;
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  -webkit-padding-start: 50px;
  padding-inline-start: 50px;
  -webkit-padding-end: 50px;
  padding-inline-end: 12px;
  margin-bottom: 0;
  height: auto !important;
  width: 100%;
  position: absolute;
  top: 0;
  line-height: 1.5;
  color: var(--color-text-main-light);
  cursor: text;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 12px;
  transition: all 0.1s ease-in-out;
}
.data-label-group > img {
  position: absolute;
  top: 8px;
  margin-inline-start: 10px;
  width: 30px;
}
.data-label-group.phone-number > p {
  direction: ltr;
  padding-inline: 50px !important;
}
</style>

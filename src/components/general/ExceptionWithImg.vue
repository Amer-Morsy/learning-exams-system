<template>
  <div>
    <img
      class="icon-err"
      :src="require('@/assets/images/' + (image ? image : defaultImage))"
    />
    <p class="p-err">{{ msg }}</p>
  </div>
</template>

<script>
const defaultImage = "illustrator-something-wrong.svg";
export default {
  name: "ExceptionWithImg",
  props: {
    msg: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: defaultImage,
    },
  },
  data() {
    return {
      defaultImage: defaultImage,
    };
  },
};
</script>

<style lang="scss" scoped></style>

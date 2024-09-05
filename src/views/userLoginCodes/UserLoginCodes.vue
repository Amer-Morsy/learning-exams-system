<template>
  <UserLoginCodesComponent
    :key="userTypeToken"
    v-if="hasData"
    :userTypeToken="userTypeToken"
    :modelName="modelName"
    :userToken="userToken"
  />
</template>

<script>
import UserLoginCodesComponent from "./UserLoginCodesComponent.vue";

export default {
  name: "Users",
  mixins: [],
  beforeCreate() {},
  props: {
    userToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      userTypeToken: "",
      modelName: "",
    };
  },
  async created() {
    await this.updateUsertypeToken();
    await this.updateModelName();
  },
  watch: {
    async $route() {
      this.userTypeToken = "";
      this.modelName = "";
      await this.updateUsertypeToken();
      await this.updateModelName();
    },
  },
  beforeMount() {},
  mounted() {},
  components: {
    UserLoginCodesComponent,
  },
  computed: {
    hasData() {
      return this.userTypeToken && this.modelName ? true : false;
    },
  },
  methods: {
    async updateUsertypeToken() {
      this.userTypeToken = this.$route.meta.userTypeToken;
    },
    async updateModelName() {
      this.modelName = this.$route.meta.modelName;
    },
  },
};
</script>

<style lang="scss"></style>

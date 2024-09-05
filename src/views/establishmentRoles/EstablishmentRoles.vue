<template>
  <EstablishmentRolesComponent
    :key="userTypeToken"
    v-if="hasData"
    :userTypeToken="userTypeToken"
    :modelName="modelName"
  />
</template>

<script>
import EstablishmentRolesComponent from "./EstablishmentRolesComponent.vue";

export default {
  name: "Users",
  mixins: [],
  beforeCreate() {},
  props: {},
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
    EstablishmentRolesComponent,
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

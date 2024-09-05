<template>
  <UserWalletTransactionsComponent
    :key="userTypeToken"
    v-if="hasData"
    :userTypeToken="userTypeToken"
    :modelName="modelName"
    :userToken="userToken"
    :userWalletTransactionTypeToken="userWalletTransactionTypeToken"
  />
</template>

<script>
import { mapGetters } from "vuex";
import UserWalletTransactionsComponent from "./UserWalletTransactionsComponent.vue";

export default {
  name: "UserWalletTransactions",
  mixins: [],
  beforeCreate() {},
  props: {},
  data() {
    return {
      userWalletTransactionTypeToken: "",
      userToken: "",
      userTypeToken: "",
      modelName: "",
    };
  },
  async created() {
    await this.updateUserWalletTransactionTypeToken();
    await this.updateUserToken();
    await this.updateUsertypeToken();
    await this.updateModelName();
  },
  watch: {
    async $route() {
      this.userToken = "";
      this.userTypeToken = "";
      this.modelName = "";
      await this.updateUserWalletTransactionTypeToken();
      await this.updateUserToken();
      await this.updateUsertypeToken();
      await this.updateModelName();
    },
  },
  beforeMount() {},
  mounted() {},
  components: {
    UserWalletTransactionsComponent,
  },
  computed: {
    ...mapGetters(["isTeacherLogged", "ownerUserToken"]),
    hasData() {
      return this.userToken && this.userTypeToken && this.modelName
        ? true
        : false;
    },
  },
  methods: {
    async updateUserWalletTransactionTypeToken() {
      this.userWalletTransactionTypeToken =
        this.$route.params.userWalletTransactionTypeToken;
    },
    async updateUserToken() {
      if (this.isTeacherLogged) {
        this.userToken = this.ownerUserToken;
      } else {
        this.userToken = this.$route.params.userToken;
      }
    },
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

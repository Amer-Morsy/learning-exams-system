<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="!isPaySalary ? $t('UserWalletTransactions.add') : $t('pay')"
    :headerIcon="!isPaySalary ? headerIcon : moneyIcon"
    :swipeAble="false"
    :clickToClose="false"
    @opened="
      userWalletTransaction.setInitialValue(
        userWalletTransaction.userToken,
        userWalletTransaction.userTypeToken,
        userWalletTransaction.userWalletTransactionTypeToken
      );
      isRendered = true;
    "
    @closed="isRendered = false"
  >
    <div class="">
      <UserWalletTransactionForm
        :model="model"
        :id="'add'"
        :userWalletTransaction="userWalletTransaction"
        :isRendered="isRendered"
        @submitForm="add"
        @close="closeBottomSheet(refName)"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapActions } from "vuex";
import CustomBottomSheet from "../../../components/general/CustomBottomSheet.vue";
import UserWalletTransactionForm from "./Form.vue";
import generalMixin from "../../../utils/generalMixin";
import { objectToFormData } from "../../../utils/functions";
import apiUserWalletTransaction from "../../../api/userWalletTransactions/userWalletTransaction";
import moneyIcon from "@/assets/images/money.svg";

export default {
  name: "UserWalletTransactionAdd",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
    fullbackAction: {
      type: Function,
    },
  },
  data() {
    return {
      isRendered: false,
      moneyIcon,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomBottomSheet,
    UserWalletTransactionForm,
  },
  computed: {
    isPaySalary() {
      return this.model.isPaySalary;
    },
    refName() {
      return this.model.metaData.components.Add.refName;
    },
    userWalletTransaction() {
      return this.model.userWalletTransaction;
    },
    userToken() {
      return this.model.userWalletTransaction.userToken;
    },
    headerIcon() {
      return this.userWalletTransaction.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async add() {
      let formData = objectToFormData(this.userWalletTransaction);
      const response = await apiUserWalletTransaction.add(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.runFullbackAction();
        this.closeBottomSheet(this.refName);
      } else {
        this.showMsg(response.data.msg);
      }
    },
    runFullbackAction() {
      this.fullbackAction();
    },
  },
};
</script>

<template>
  <div class="page-container">
    <div class="pagination-with-content">
      <template v-if="userWalletTransactions.userData">
        <div class="row">
          <div class="col-md-12">
            <!-- userInfoData selected -->
            <b-button
              v-b-toggle="`UserInfoData`"
              class="btn btn-lg btn-collapse"
            >
              <span>{{ $t("Users.data") }} </span>
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </b-button>
            <b-collapse :id="`UserInfoData`">
              <div class="row data-collapse">
                <div class="row">
                  <DataLabelGroup
                    :className="'col-md-6'"
                    :value="userWalletTransactions.userData.userNameCurrent"
                    :title="$t('general.name')"
                    :imgName="'users.svg'"
                  />

                  <DataLabelGroup
                    :className="'col-md-6'"
                    :value="
                      userWalletTransactions.userData
                        .userWalletBalanceWithCurrency
                    "
                    :title="$t('UserWalletTransactions.balance')"
                    :imgName="'money.svg'"
                  />
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </template>
      <CustomPageHeader
        :model="userWalletTransactions"
        :canToggleView="false"
        :canChangeActivationType="false"
        :addFullbackAction="getAllUserWalletTransactions"
        :filterFullbackAction="getAllUserWalletTransactions"
        :sortFullbackAction="getAllUserWalletTransactions"
        :toggelActivationFullbackAction="getAllUserWalletTransactions"
      />
      <template v-if="hasData">
        <UserWalletTransactionTable
          :model="userWalletTransactions"
          :updateFullbackAction="getAllUserWalletTransactions"
          :deleteFullbackAction="getAllUserWalletTransactions"
          :changeActivationFullbackAction="getAllUserWalletTransactions"
          @setUserWalletTransactionData="setUserWalletTransactionData($event)"
          :modelName="modelName"
        />

        <UserWalletTransactionInfo :model="userWalletTransactions" />

        <CustomPagination
          :paginationData="userWalletTransactions.filterData"
          @changePagination="changePagination($event)"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <UserWalletTransactionFilter
        :model="userWalletTransactions"
        :fullbackAction="getAllUserWalletTransactions"
      />
      <UserWalletTransactionSort
        :model="userWalletTransactions"
        :fullbackAction="getAllUserWalletTransactions"
      />
      <UserWalletTransactionAdd
        :model="userWalletTransactions"
        :fullbackAction="getAllUserWalletTransactions"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DataLabelGroup from "./../../components/previews/DataLabelGroup.vue";
import UserWalletTransactions from "./../../models/userWalletTransactions/UserWalletTransactions";
import apiUserWalletTransaction from "./../../api/userWalletTransactions/userWalletTransaction";
import generalMixin from "./../../utils/generalMixin";
import CustomPageHeader from "./../../components/general/CustomPageHeader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import UserWalletTransactionTable from "./componets/Table.vue";
import UserWalletTransactionAdd from "./componets/Add.vue";
import UserWalletTransactionInfo from "./componets/Info.vue";
import CustomPagination from "./../../components/general/CustomPagination.vue";
import UserWalletTransactionFilter from "./componets/Filter.vue";
import UserWalletTransactionSort from "./componets/Sort.vue";
import { WALLET_TRANSACTION_TYPE } from "./../../utils/constantLists";

export default {
  name: "UserWalletTransactionsComponent",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    userTypeToken: {
      type: String,
      default: "",
    },
    modelName: {
      type: String,
      default: "",
    },
    userToken: {
      type: String,
      default: "",
    },
    userWalletTransactionTypeToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      userWalletTransactions: new UserWalletTransactions(this.modelName),
    };
  },
  async created() {
    this.userWalletTransactions.isPaySalary = this.isPaySalary;
    this.userWalletTransactions.filterData.userToken = this.userToken;
    this.userWalletTransactions.filterData.userWalletTransactionTypeToken =
      this.userWalletTransactionTypeToken;
    await this.updateFilterData();
    await this.getAllUserWalletTransactions();
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    DataLabelGroup,
    CustomPageHeader,
    UserWalletTransactionTable,
    UserWalletTransactionAdd,
    UserWalletTransactionInfo,
    CustomPagination,
    UserWalletTransactionSort,
    UserWalletTransactionFilter,
    ExceptionWithImg,
  },
  computed: {
    ...mapGetters(["generalSetting"]),
    hasData() {
      return this.userWalletTransactions.userWalletTransactionsData.length != 0;
    },
    viewType() {
      return this.generalSetting[this.userWalletTransactions.metaData.name]
        .viewType;
    },
    isPaySalary() {
      return (
        this.userWalletTransactionTypeToken == WALLET_TRANSACTION_TYPE.PaySalary
      );
    },
  },
  methods: {
    changePagination(pagination) {
      this.userWalletTransactions.filterData.fillData(pagination);
      this.getAllUserWalletTransactions();
    },

    setUserWalletTransactionData(userWalletTransaction) {
      this.userWalletTransactions.userWalletTransaction.setInitialValue();
      this.userWalletTransactions.userWalletTransaction.fillData(
        userWalletTransaction
      );
    },

    async updateFilterData() {
      // this.userWalletTransactions.filterData.activationTypeTokens =
      //   this.generalSetting[this.modelName].activationTypeTokens;
      this.userWalletTransactions.filterData.userToken = this.userToken;
      this.userWalletTransactions.userWalletTransaction.userToken =
        this.userToken;
      this.userWalletTransactions.userWalletTransaction.userTypeToken =
        this.userTypeToken;
      this.userWalletTransactions.filterData.userWalletTransactionTypeToken =
        this.userWalletTransactionTypeToken;
      this.userWalletTransactions.userWalletTransaction.userWalletTransactionTypeToken =
        this.userWalletTransactionTypeToken;
    },

    async getAllUserWalletTransactions() {
      try {
        this.userWalletTransactions.userWalletTransactionsData = [];
        const response = await apiUserWalletTransaction.getAll(
          this.userWalletTransactions.filterData
        );
        if (response.data.status == this.STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == this.STATUS.NO_INTERNET) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noInternet.svg";
        } else if (response.data.status == this.STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.userWalletTransactions.fillData(response.data);
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
  },
};
</script>

<style lang="scss"></style>

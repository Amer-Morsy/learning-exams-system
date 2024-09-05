<template>
  <div class="page-container">
    <div class="pagination-with-content">
      <UserSettingsTabs
        :key="userTypeToken"
        :userTypeToken="userTypeToken"
        :modelName="modelName"
      />

      <CustomPageHeader
        :model="users"
        :addFullbackAction="getAllUsers"
        :filterFullbackAction="getAllUsers"
        :sortFullbackAction="getAllUsers"
        :toggelActivationFullbackAction="getAllUsers"
      />
      <template v-if="hasData">
        <UserTable
          v-if="viewType == VIEW_TYPES.table"
          :model="users"
          :hasResetUserLoginCode="hasResetUserLoginCode"
          :hasResetUserDeviceUniqueCode="hasResetUserDeviceUniqueCode"
          :hasUserWalletTransactions="hasUserWalletTransactions"
          :updateFullbackAction="getAllUsers"
          :deleteFullbackAction="getAllUsers"
          :changeActivationFullbackAction="getAllUsers"
          @setUserData="setUserData($event)"
          @setInDeatails="inDeatails = $event"
          :modelName="modelName"
          v-on:setUserTokenReset="userTokenReset = $event"
          v-on:setIsResetTypeLoginCode="isResetTypeLoginCode = $event"
        />
        <UserCard
          v-if="viewType == VIEW_TYPES.cards"
          :model="users"
          :hasResetUserLoginCode="hasResetUserLoginCode"
          :hasResetUserDeviceUniqueCode="hasResetUserDeviceUniqueCode"
          :hasUserWalletTransactions="hasUserWalletTransactions"
          :updateFullbackAction="getAllUsers"
          :deleteFullbackAction="getAllUsers"
          :changeActivationFullbackAction="getAllUsers"
          @setUserData="setUserData($event)"
          @setInDeatails="inDeatails = $event"
          :modelName="modelName"
          v-on:setUserTokenReset="userTokenReset = $event"
          v-on:setIsResetTypeLoginCode="isResetTypeLoginCode = $event"
        />
        <UserInfo :model="users" />
        <UserUpdate :model="users" :fullbackAction="getAllUsers" />
        <UserDelete :model="users" :fullbackAction="getAllUsers" />
        <ChangeActivationType :model="users" :fullbackAction="getAllUsers" />
        <UserChangePassword :userToken="users.user.userToken" />
        <CustomPagination
          :paginationData="users.filterData"
          @changePagination="changePagination($event)"
        />
        <UserLoginCodeReset
          :userTypeToken="userTypeToken"
          :loginCodeModelName="loginCodeModelName"
          :userToken="userTokenReset"
          :isResetTypeLoginCode="isResetTypeLoginCode"
          v-on:refresh="getAllUsers()"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <UserFilter :model="users" :fullbackAction="getAllUsers" />
      <UserSort :model="users" :fullbackAction="getAllUsers" />
      <UserAdd :model="users" :fullbackAction="getAllUsers" />
      <LecturerStatisticsReportFilter
        :inDeatails="inDeatails"
        :userToken="users.user.userToken"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LecturerStatisticsReportFilter from "./../../views/reports/components/LecturerStatisticsReportFilter.vue";
import Users from "./../../models/users/Users";
import UserLoginCodes from "./../../models/userLoginCodes/UserLoginCodes";
import UserWalletTransactions from "./../../models/userWalletTransactions/UserWalletTransactions";
import apiUser from "./../../api/users/user";
import generalMixin from "./../../utils/generalMixin";
import CustomPageHeader from "./../../components/general/CustomPageHeader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import UserSettingsTabs from "./UserSettingsTabs.vue";
import UserTable from "./componets/Table.vue";
import UserCard from "./componets/Card.vue";
import UserAdd from "./componets/Add.vue";
import UserInfo from "./componets/Info.vue";
import UserUpdate from "./componets/Update.vue";
import UserDelete from "./componets/Delete.vue";
import ChangeActivationType from "./componets/ChangeActivationType.vue";
import UserChangePassword from "./componets/UserChangePassword.vue";
import CustomPagination from "./../../components/general/CustomPagination.vue";
import UserFilter from "./componets/Filter.vue";
import UserSort from "./componets/Sort.vue";
import UserLoginCodeReset from "./../userLoginCodes/componets/UserLoginCodeReset.vue";
import {
  USER_MODEL_NAME,
  LOGINCODE_MODEL_NAME,
  WALLETTRANSACTION_MODEL_NAME,
} from "../../utils/constants";

export default {
  name: "UsersComponent",
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
  },
  data() {
    return {
      users: new Users(this.modelName),
      userLoginCodes: {},
      userWalletTransactions: {},
      userTokenReset: "",
      isResetTypeLoginCode: true,
      inDeatails: false,
    };
  },
  async created() {
    this.userLoginCodes = new UserLoginCodes(this.loginCodeModelName);
    this.userWalletTransactions = new UserWalletTransactions(
      this.userWalletTransactionModelName
    );
    this.users.filterData.userToken = this.userToken;
    await this.updateFilterData();
    await this.getAllUsers();
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomPageHeader,
    UserSettingsTabs,
    UserTable,
    UserCard,
    UserAdd,
    UserInfo,
    UserUpdate,
    UserDelete,
    ChangeActivationType,
    UserChangePassword,
    CustomPagination,
    UserSort,
    UserLoginCodeReset,
    UserFilter,
    ExceptionWithImg,
    LecturerStatisticsReportFilter,
  },
  computed: {
    ...mapGetters(["generalSetting"]),
    hasData() {
      return this.users.usersData.length != 0;
    },
    viewType() {
      return this.generalSetting[this.users.metaData.name].viewType;
    },
    loginCodeModelName() {
      let loginCodeModelName = "";
      switch (this.modelName) {
        case USER_MODEL_NAME.Student:
          loginCodeModelName = LOGINCODE_MODEL_NAME.StudentLoginCode;
          break;
        case USER_MODEL_NAME.Parent:
          loginCodeModelName = LOGINCODE_MODEL_NAME.ParentLoginCode;
          break;
        case USER_MODEL_NAME.Teacher:
          loginCodeModelName = LOGINCODE_MODEL_NAME.TeacherLoginCode;
          break;
        case USER_MODEL_NAME.Employee:
          loginCodeModelName = LOGINCODE_MODEL_NAME.EmployeeLoginCode;
          break;
        case USER_MODEL_NAME.MasterAdmin:
          loginCodeModelName = LOGINCODE_MODEL_NAME.MasterAdminLoginCode;
          break;
        case USER_MODEL_NAME.AdminsEgypt:
          loginCodeModelName = LOGINCODE_MODEL_NAME.AdminsEgyptLoginCode;
          break;

        default:
          break;
      }
      return loginCodeModelName;
    },
    userWalletTransactionModelName() {
      let userWalletTransactionModelName = "";
      switch (this.modelName) {
        case USER_MODEL_NAME.Student:
          userWalletTransactionModelName =
            WALLETTRANSACTION_MODEL_NAME.StudentUserWalletTransaction;
          break;
        case USER_MODEL_NAME.Parent:
          userWalletTransactionModelName =
            WALLETTRANSACTION_MODEL_NAME.ParentUserWalletTransaction;
          break;
        case USER_MODEL_NAME.Teacher:
          userWalletTransactionModelName =
            WALLETTRANSACTION_MODEL_NAME.TeacherUserWalletTransaction;
          break;
        case USER_MODEL_NAME.Employee:
          userWalletTransactionModelName =
            WALLETTRANSACTION_MODEL_NAME.EmployeeUserWalletTransaction;
          break;
        case USER_MODEL_NAME.MasterAdmin:
          userWalletTransactionModelName =
            WALLETTRANSACTION_MODEL_NAME.MasterAdminUserWalletTransaction;
          break;
        case USER_MODEL_NAME.AdminsEgypt:
          userWalletTransactionModelName =
            WALLETTRANSACTION_MODEL_NAME.AdminsEgyptUserWalletTransaction;
          break;

        default:
          break;
      }
      return userWalletTransactionModelName;
    },
    hasUserWalletTransactions() {
      return this.userWalletTransactions.metaData.privileges.view;
    },

    hasResetUserLoginCode() {
      return this.userLoginCodes.metaData.privileges.resetUserLoginCode;
    },
    hasResetUserDeviceUniqueCode() {
      return this.userLoginCodes.metaData.privileges.resetUserDeviceUniqueCode;
    },
  },
  methods: {
    changePagination(pagination) {
      this.users.filterData.fillData(pagination);
      this.getAllUsers();
    },

    setUserData(user) {
      this.users.user.setInitialValue();
      this.users.user.fillData(user);
    },

    async updateFilterData() {
      this.users.filterData.activationTypeTokens =
        this.generalSetting[this.modelName].activationTypeTokens;
      this.users.filterData.userTypeToken = this.userTypeToken;
      this.users.user.userTypeToken = this.userTypeToken;
    },

    async getAllUsers() {
      try {
        this.users.usersData = [];
        const response = await apiUser.getAll(this.users.filterData);
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
        this.users.fillData(response.data);
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss"></style>

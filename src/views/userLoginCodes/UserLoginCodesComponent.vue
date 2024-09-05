<template>
  <div class="page-container ">
    <div class="pagination-with-content">
      <UserSettingsTabs
        :key="userTypeToken"
        :userTypeToken="userTypeToken"
        :modelName="modelName"
      />

      <CustomPageHeader
        :model="userLoginCodes"
        :addFullbackAction="getAllUserLoginCodes"
        :filterFullbackAction="getAllUserLoginCodes"
        :sortFullbackAction="getAllUserLoginCodes"
        :toggelActivationFullbackAction="getAllUserLoginCodes"
      />
      <template v-if="hasData">
        <UserLoginCodeTable
          v-if="viewType == VIEW_TYPES.table"
          :model="userLoginCodes"
          :updateFullbackAction="getAllUserLoginCodes"
          :deleteFullbackAction="getAllUserLoginCodes"
          :changeActivationFullbackAction="getAllUserLoginCodes"
          @setUserLoginCodeData="setUserLoginCodeData($event)"
          :modelName="modelName"
        />
        <UserLoginCodeCard
          v-if="viewType == VIEW_TYPES.cards"
          :model="userLoginCodes"
          :updateFullbackAction="getAllUserLoginCodes"
          :deleteFullbackAction="getAllUserLoginCodes"
          :changeActivationFullbackAction="getAllUserLoginCodes"
          @setUserLoginCodeData="setUserLoginCodeData($event)"
          :modelName="modelName"
        />
        <UserLoginCodeInfo :model="userLoginCodes" />
        <UserLoginCodeUpdate
          :model="userLoginCodes"
          :fullbackAction="getAllUserLoginCodes"
        />
        <UserLoginCodeDelete
          :model="userLoginCodes"
          :fullbackAction="getAllUserLoginCodes"
        />
        <ChangeActivationType
          :model="userLoginCodes"
          :fullbackAction="getAllUserLoginCodes"
        />

        <CustomPagination
          :paginationData="userLoginCodes.filterData"
          @changePagination="changePagination($event)"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <UserLoginCodeFilter
        :model="userLoginCodes"
        :fullbackAction="getAllUserLoginCodes"
      />
      <UserLoginCodeSort
        :model="userLoginCodes"
        :fullbackAction="getAllUserLoginCodes"
      />
      <UserLoginCodeAdd
        :model="userLoginCodes"
        :fullbackAction="getAllUserLoginCodes"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserLoginCodes from "./../../models/userLoginCodes/UserLoginCodes";
import apiUserLoginCode from "./../../api/userLoginCodes/userLoginCode";
import generalMixin from "./../../utils/generalMixin";
import CustomPageHeader from "./../../components/general/CustomPageHeader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import UserSettingsTabs from "./../users/UserSettingsTabs.vue";
import UserLoginCodeTable from "./componets/Table.vue";
import UserLoginCodeCard from "./componets/Card.vue";
import UserLoginCodeAdd from "./componets/Add.vue";
import UserLoginCodeInfo from "./componets/Info.vue";
import UserLoginCodeUpdate from "./componets/Update.vue";
import UserLoginCodeDelete from "./componets/Delete.vue";
import ChangeActivationType from "./componets/ChangeActivationType.vue";
import CustomPagination from "./../../components/general/CustomPagination.vue";
import UserLoginCodeFilter from "./componets/Filter.vue";
import UserLoginCodeSort from "./componets/Sort.vue";

export default {
  name: "UserLoginCodesComponent",
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
    userLoginCodeToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      userLoginCodes: new UserLoginCodes(this.modelName),
    };
  },
  async created() {
    this.userLoginCodes.filterData.userLoginCodeToken = this.userLoginCodeToken;
    await this.updateFilterData();
    await this.getAllUserLoginCodes();
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomPageHeader,
    UserSettingsTabs,
    UserLoginCodeTable,
    UserLoginCodeCard,
    UserLoginCodeAdd,
    UserLoginCodeInfo,
    UserLoginCodeUpdate,
    UserLoginCodeDelete,
    ChangeActivationType,
    CustomPagination,
    UserLoginCodeSort,
    UserLoginCodeFilter,
    ExceptionWithImg,
  },
  computed: {
    ...mapGetters(["generalSetting"]),
    hasData() {
      return this.userLoginCodes.userLoginCodesData.length != 0;
    },
    viewType() {
      return this.generalSetting[this.userLoginCodes.metaData.name].viewType;
    },
  },
  methods: {
    changePagination(pagination) {
      this.userLoginCodes.filterData.fillData(pagination);
      this.getAllUserLoginCodes();
    },

    setUserLoginCodeData(userLoginCode) {
      this.userLoginCodes.userLoginCode.setInitialValue();
      this.userLoginCodes.userLoginCode.fillData(userLoginCode);
    },

    async updateFilterData() {
      this.userLoginCodes.filterData.activationTypeTokens = this.generalSetting[
        this.modelName
      ].activationTypeTokens;
      this.userLoginCodes.filterData.userTypeToken = this.userTypeToken;
      this.userLoginCodes.userLoginCode.userTypeToken = this.userTypeToken;
    },

    async getAllUserLoginCodes() {
      try {
        this.userLoginCodes.userLoginCodesData = [];
        const response = await apiUserLoginCode.getAll(
          this.userLoginCodes.filterData
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
        this.userLoginCodes.fillData(response.data);
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
  },
};
</script>

<style lang="scss"></style>

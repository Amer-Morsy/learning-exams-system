<template>
  <div class="row custom-cards" v-if="usersData.length">
    <CustomCard
      v-for="(user, index) in usersData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="user.userNameCurrent"
      :description="user.fullCode"
      :imagePath="user.userImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          @click="
            setUserData(user);
            openBottomSheet(model.metaData.components.Info.refName);
          "
          :title="$t('general.info')"
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li v-if="hasUpdate">
        <button
          @click="
            setUserData(user);
            openBottomSheet(model.metaData.components.Update.refName);
          "
          :title="$t('general.edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="hasFinalDelete">
        <button
          v-b-modal="`${model.metaData.components.Delete.refName}`"
          :title="$t('general.delete')"
          @click="setUserData(user)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="hasChangeActivationType">
        <button
          v-b-modal="
            `${model.metaData.components.ChangeActivationType.refName}`
          "
          :title="$t('changeActivationType')"
          @click="setUserData(user)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="setUserData(user)"
          v-b-modal.UserChangePassword
          :title="$t('changePassword')"
        >
          <img src="@/assets/images/changePassword.svg" />
        </button>
      </li>
      <li v-if="hasResetUserLoginCode">
        <button
          @click="
            setUserTokenReset(user.userToken);
            setIsResetTypeLoginCode(true);
          "
          v-b-modal.UserLoginCodeReset
          :title="$t('UserLoginCodes.resetCode')"
        >
          <img src="@/assets/images/UserLoginCodes.svg" />
        </button>
      </li>
      <li v-if="hasResetUserDeviceUniqueCode">
        <button
          @click="
            setUserTokenReset(user.userToken);
            setIsResetTypeLoginCode(false);
          "
          v-b-modal.UserLoginCodeReset
          :title="$t('UserLoginCodes.resetDevice')"
        >
          <img src="@/assets/images/pc.svg" />
        </button>
      </li>
      <li v-if="hasUserWalletTransactions">
        <router-link
          :to="goTo(user.userToken)"
          :title="$t('UserWalletTransactions.modelName')"
        >
          <img
            src="@/assets/images/UserWalletTransactions.svg"
            class="icon-lg"
          />
        </router-link>
      </li>
      <li v-if="hasUserWalletTransactions && isCurrentTabIsTeacher">
        <router-link
          :to="{
            name: 'PaySalaryTeacherUserWalletTransaction',
            params: {
              userToken: user.userToken,
              userWalletTransactionTypeToken: WALLET_TRANSACTION_TYPE.PaySalary,
            },
          }"
          :title="$t('paySalary')"
        >
          <img src="@/assets/images/money.svg" class="icon-lg" />
        </router-link>
      </li>
      <template v-if="isCurrentTabIsTeacher">
        <!-- <li>
          <button
            @click="
              $emit('setInDeatails', false);
              openBottomSheet('LecturerStatisticsReportFilter');
            "
            :title="$t('Reports.lecturerStatistics')"
          >
            <img src="@/assets/images/report.svg" />
          </button>
        </li> -->
        <li>
          <button
            @click="
              $emit('setInDeatails', true);
              setUserData(user);
              openBottomSheet('LecturerStatisticsReportFilter');
            "
            :title="$t('Reports.lecturerStatisticsInDeatails')"
          >
            <img src="@/assets/images/statistics.svg" />
          </button>
        </li>
      </template>
    </CustomCard>
  </div>
</template>

<script>
import { isDataExist, fullPathFileFromServer } from "../../../utils/functions";
import { mapActions } from "vuex";
import CustomCard from "../../../components/general/CustomCard.vue";
import generalMixin from "./../../../utils/generalMixin";
import {
  USER_MODEL_NAME,
  WALLETTRANSACTION_MODEL_NAME,
} from "../../../utils/constants";
import { WALLET_TRANSACTION_TYPE } from "../../../utils/constantLists";

export default {
  name: "UserCard",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
    updateFullbackAction: {
      type: Function,
    },
    deleteFullbackAction: {
      type: Function,
    },
    changeActivationFullbackAction: {
      type: Function,
    },
    modelName: {
      type: String,
      default: "",
    },
    hasResetUserLoginCode: {
      type: Boolean,
      default: false,
    },
    hasResetUserDeviceUniqueCode: {
      type: Boolean,
      default: false,
    },
    hasUserWalletTransactions: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      WALLET_TRANSACTION_TYPE,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: { CustomCard },
  computed: {
    isCurrentTabIsTeacher() {
      return this.modelName == USER_MODEL_NAME.Teacher;
    },
    // isCurrentTabTeature() {
    //   return this.$route.name == "Teachers";
    // },
    usersData() {
      return this.model.usersData;
    },
    user() {
      return this.model.user;
    },
    filterData() {
      return this.model.filterData;
    },
    defaultImg() {
      return this.model.user.defaultImg;
    },
    hasUpdate() {
      return this.model.metaData.privileges.update;
    },
    hasFinalDelete() {
      return this.model.metaData.privileges.finalDelete;
    },
    hasChangeActivationType() {
      return this.model.metaData.privileges.changeActivationType;
    },
  },
  methods: {
    isDataExist,
    fullPathFileFromServer,

    ...mapActions([
      "setCurrentLayerComponent",
      "setCurrentProps",
      "setCurrentItemInAction",
      "showAppLayer",
    ]),

    goTo(userToken) {
      let routeName = "";

      switch (this.modelName) {
        case USER_MODEL_NAME.Student:
          // code block
          routeName = WALLETTRANSACTION_MODEL_NAME.StudentUserWalletTransaction;
          break;
        case USER_MODEL_NAME.Employee:
          // code block
          routeName =
            WALLETTRANSACTION_MODEL_NAME.EmployeeUserWalletTransaction;
          break;
        case USER_MODEL_NAME.Parent:
          // code block
          routeName = WALLETTRANSACTION_MODEL_NAME.ParentUserWalletTransaction;
          break;
        case USER_MODEL_NAME.Teacher:
          // code block
          routeName = WALLETTRANSACTION_MODEL_NAME.TeacherUserWalletTransaction;
          break;
        case USER_MODEL_NAME.MasterAdmin:
          // code block
          routeName =
            WALLETTRANSACTION_MODEL_NAME.MasterAdminUserWalletTransaction;
          break;
        case USER_MODEL_NAME.AdminsEgypt:
          // code block
          routeName =
            WALLETTRANSACTION_MODEL_NAME.AdminsEgyptUserWalletTransaction;
          break;
      }

      return {
        name: routeName,
        params: {
          userToken: userToken,
        },
      };
    },

    setUserData(user) {
      this.$emit("setUserData", user);
    },
    setUserTokenReset(token) {
      this.$emit("setUserTokenReset", token);
    },
    setIsResetTypeLoginCode(status) {
      this.$emit("setIsResetTypeLoginCode", status);
    },
  },
};
</script>

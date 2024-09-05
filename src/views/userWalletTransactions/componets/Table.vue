<template>
  <div class="table-container" v-if="userWalletTransactionsData.length">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="6">{{ $t("UserWalletTransactions.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.type") }}</th>
          <th class="cell-lg">{{ $t("userName") }}</th>
          <th class="cell-lg">{{ $t("general.value") }}</th>
          <th>{{ $t("PaymentMethods.type") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(userWalletTransaction, index) in userWalletTransactionsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  userWalletTransaction.userWalletTransactionImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(userWalletTransaction.fullCode) }}</td>
          <td>
            {{
              isDataExist(
                userWalletTransaction.userWalletTransactionTypeNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(userWalletTransaction.userInfoData.userNameCurrent)
            }}
          </td>
          <td>
            {{
              isDataExist(
                userWalletTransaction.userWalletTransactionValueWithCurreny
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                userWalletTransaction.userWalletTransactionMethodNameCurrent
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setUserWalletTransactionData(userWalletTransaction);
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
                    setUserWalletTransactionData(userWalletTransaction);
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
                  @click="setUserWalletTransactionData(userWalletTransaction)"
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
                  @click="setUserWalletTransactionData(userWalletTransaction)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  isDataExist,
  fullPathFileFromServer,
  formateDateTimeLang,
} from "../../../utils/functions";
import { mapActions } from "vuex";
import FloatingMenu from "../../../components/general/FloatingMenu.vue";
import generalMixin from "../../../utils/generalMixin";

export default {
  name: "UserLoginCodeTable",
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
  },
  data() {
    return {};
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: { FloatingMenu },
  computed: {
    userWalletTransactionsData() {
      return this.model.userWalletTransactionsData;
    },
    userWalletTransaction() {
      return this.model.userWalletTransaction;
    },
    filterData() {
      return this.model.filterData;
    },
    defaultImg() {
      return this.model.userWalletTransaction.defaultImg;
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
    ...mapActions([
      "setCurrentLayerComponent",
      "setCurrentProps",
      "setCurrentItemInAction",
      "showAppLayer",
    ]),

    isDataExist,
    fullPathFileFromServer,
    formateDateTimeLang,

    setUserWalletTransactionData(userWalletTransaction) {
      this.$emit("setUserWalletTransactionData", userWalletTransaction);
    },
  },
};
</script>

<style lang="scss"></style>

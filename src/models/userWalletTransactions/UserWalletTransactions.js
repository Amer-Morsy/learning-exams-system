import UserWalletTransactionStatistics from "./UserWalletTransactionStatistics";
import User from "./../users/User";
import UserWalletTransaction from "./UserWalletTransaction";
import UserWalletTransactionsFilter from "./UserWalletTransactionsFilter";
import PrivilegeController from "./../../controllers/privilege/PrivilegeController";
import { WALLETTRANSACTION_MODEL_NAME } from "./../../utils/constants";

export default class UserWalletTransactions {
  constructor(modelName) {
    this.metaData = this.getMetaData(modelName);
    this.setInitialValue(modelName);
  }
  setInitialValue(modelName) {
    this.status = 0;
    this.msg = "";
    this.listSort = [];
    this.activationStatistics = new UserWalletTransactionStatistics();
    this.userData = new User();
    this.userWalletTransactionsData = [];
    this.isPaySalary = false;
    this.userWalletTransaction = new UserWalletTransaction();
    this.filterData = new UserWalletTransactionsFilter(modelName);
  }
  fillData(data) {
    if (data) {
      this.status = data.status;
      this.msg = data.msg;
      this.listSort = data.listSort;
      this.activationStatistics.fillData(data.userWalletTransactionStatistics);
      this.userData.fillData(data.userData);
      let filter = { ...this.filterData, ...data.pagination };
      this.filterData.fillData(filter);
      this.userWalletTransactionsData = data.userWalletTransactionsData || [];
    } else {
      this.setInitialValue();
    }
  }
  getMetaData(modelName) {
    return {
      name: WALLETTRANSACTION_MODEL_NAME[modelName],
      privileges: {
        view: PrivilegeController.hasView(
          PrivilegeController.getPrivilegeModuleTokens()[modelName]
        ),
        add: PrivilegeController.hasAdd(
          PrivilegeController.getPrivilegeModuleTokens()[modelName]
        ),
      },
      components: {
        Add: {
          type: "bottomSheet",
          refName: "UserWalletTransactionsAdd",
          link: "userWalletTransactions/components/Add.vue",
        },
        Info: {
          type: "bottomSheet",
          refName: "UserWalletTransactionsInfo",
          link: "userWalletTransactions/components/Info.vue",
        },
        Filter: {
          type: "bottomSheet",
          refName: "UserWalletTransactionsFilter",
          link: "userWalletTransactions/components/Filter.vue",
        },
        Sort: {
          type: "bottomSheet",
          refName: "UserWalletTransactionsSort",
          link: "userWalletTransactions/components/Sort.vue",
        },
      },
    };
  }
}

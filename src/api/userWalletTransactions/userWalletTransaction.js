import { METHOD, request } from "./../request";
import { UserWalletTransactions } from "./../links";

async function getDetails(params) {
  return request(UserWalletTransactions.getDetails, METHOD.GET, params);
}

async function getAll(params) {
  return request(UserWalletTransactions.getAll, METHOD.GET, params);
}

async function add(data) {
  return request(UserWalletTransactions.add, METHOD.POST, data);
}

export default {
  getDetails,
  getAll,
  add,
};

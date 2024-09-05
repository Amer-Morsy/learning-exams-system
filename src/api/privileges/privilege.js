import { METHOD, request } from "./../request";
import { Privileges } from "./../links";

async function getDetails(params) {
  return request(Privileges.getDetails, METHOD.GET, params);
}

async function update(data) {
  return request(Privileges.update, METHOD.POST, data);
}

export default {
  getDetails,
  update,
};

import { METHOD, request } from "./../../../request";
import { Questions } from "./../../../links";
import { API_LONG_TIMEOUT } from "./../../../../utils/constants";

async function getDetails(params) {
  return request(Questions.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Questions.getDialog, METHOD.GET, params);
}
async function getAll(params) {
  return request(Questions.getAll, METHOD.GET, params);
}

async function add(data) {
  return request(Questions.add, METHOD.POST, data, {
    timeout: API_LONG_TIMEOUT,
  });
}
async function update(data) {
  return request(Questions.update, METHOD.POST, data, {
    timeout: API_LONG_TIMEOUT,
  });
}
async function changeActivationType(data) {
  return request(Questions.changeActivationType, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Questions.deleteImage, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(Questions.finalDelete, METHOD.POST, data);
}

export default {
  getDetails,
  getDialog,
  getAll,
  add,
  update,
  changeActivationType,
  deleteImage,
  finalDelete,
};

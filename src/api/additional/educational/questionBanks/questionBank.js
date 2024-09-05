import { METHOD, request } from "./../../../request";
import { QuestionBanks } from "./../../../links";

async function getDetails(params) {
  return request(QuestionBanks.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(QuestionBanks.getDialog, METHOD.GET, params);
}
async function getAll(params) {
  return request(QuestionBanks.getAll, METHOD.GET, params);
}

async function add(data) {
  return request(QuestionBanks.add, METHOD.POST, data);
}
async function update(data) {
  return request(QuestionBanks.update, METHOD.POST, data);
}
async function changeActivationType(data) {
  return request(QuestionBanks.changeActivationType, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(QuestionBanks.deleteImage, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(QuestionBanks.finalDelete, METHOD.POST, data);
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

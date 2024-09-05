import { METHOD, request } from "./../../../request";
import { QuestionBankTitles } from "./../../../links";

async function getDetails(params) {
  return request(QuestionBankTitles.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(QuestionBankTitles.getDialog, METHOD.GET, params);
}
async function getAll(params) {
  return request(QuestionBankTitles.getAll, METHOD.GET, params);
}

async function add(data) {
  return request(QuestionBankTitles.add, METHOD.POST, data);
}
async function update(data) {
  return request(QuestionBankTitles.update, METHOD.POST, data);
}
async function changeActivationType(data) {
  return request(QuestionBankTitles.changeActivationType, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(QuestionBankTitles.deleteImage, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(QuestionBankTitles.finalDelete, METHOD.POST, data);
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

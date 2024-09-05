import { METHOD, request } from "./../../../request";
import { QuestionParagraphs } from "./../../../links";

async function getDetails(params) {
  return request(QuestionParagraphs.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(QuestionParagraphs.getDialog, METHOD.GET, params);
}
async function getAll(params) {
  return request(QuestionParagraphs.getAll, METHOD.GET, params);
}

async function add(data) {
  return request(QuestionParagraphs.add, METHOD.POST, data);
}
async function update(data) {
  return request(QuestionParagraphs.update, METHOD.POST, data);
}
async function changeActivationType(data) {
  return request(QuestionParagraphs.changeActivationType, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(QuestionParagraphs.deleteImage, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(QuestionParagraphs.finalDelete, METHOD.POST, data);
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

import { METHOD, request } from "./../../request";
import { EducationalCategories } from "./../../links";

async function getDetails(params) {
  return request(EducationalCategories.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(EducationalCategories.getDialog, METHOD.GET, params);
}
async function getAll(params) {
  return request(EducationalCategories.getAll, METHOD.GET, params);
}

async function add(data) {
  return request(EducationalCategories.add, METHOD.POST, data);
}
async function update(data) {
  return request(EducationalCategories.update, METHOD.POST, data);
}
async function changeActivationType(data) {
  return request(EducationalCategories.changeActivationType, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(EducationalCategories.deleteImage, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(EducationalCategories.finalDelete, METHOD.POST, data);
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

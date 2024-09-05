import { METHOD, request } from "./../../request";
import { EducationalCourseLevels } from "./../../links";

async function getDetails(params) {
  return request(EducationalCourseLevels.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(EducationalCourseLevels.getDialog, METHOD.GET, params);
}
async function getAll(params) {
  return request(EducationalCourseLevels.getAll, METHOD.GET, params);
}

async function add(data) {
  return request(EducationalCourseLevels.add, METHOD.POST, data);
}
async function update(data) {
  return request(EducationalCourseLevels.update, METHOD.POST, data);
}
async function changeActivationType(data) {
  return request(
    EducationalCourseLevels.changeActivationType,
    METHOD.POST,
    data
  );
}
async function deleteImage(data) {
  return request(EducationalCourseLevels.deleteImage, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(EducationalCourseLevels.finalDelete, METHOD.POST, data);
}
async function changeSort(data) {
  return request(EducationalCourseLevels.changeSort, METHOD.POST, data);
}
async function changeFreeze(data) {
  return request(EducationalCourseLevels.changeFreeze, METHOD.POST, data);
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
  changeSort,
  changeFreeze,
};

import { METHOD, request } from "./../../request";
import { EducationalCourses, EducationalCoursePeriods } from "./../../links";

async function getDetails(params) {
  return request(EducationalCourses.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(EducationalCourses.getDialog, METHOD.GET, params);
}
async function getAll(params) {
  return request(EducationalCourses.getAll, METHOD.GET, params);
}

async function add(data) {
  return request(EducationalCourses.add, METHOD.POST, data);
}
async function update(data) {
  return request(EducationalCourses.update, METHOD.POST, data);
}
async function changeActivationType(data) {
  return request(EducationalCourses.changeActivationType, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(EducationalCourses.deleteImage, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(EducationalCourses.finalDelete, METHOD.POST, data);
}

async function start(data) {
  return request(EducationalCoursePeriods.start, METHOD.POST, data);
}

async function end(data) {
  return request(EducationalCoursePeriods.end, METHOD.POST, data);
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

  start,
  end,
};

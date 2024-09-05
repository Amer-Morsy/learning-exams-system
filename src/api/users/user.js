import { METHOD, request } from "./../request";
import { Users } from "./../links";

async function login(data) {
  return request(Users.login, METHOD.POST, data);
}
async function signUp(data) {
  return request(Users.signUp, METHOD.POST, data);
}
async function logout() {
  return request(Users.logout, METHOD.POST, null);
}
async function getDetails(params) {
  return request(Users.getDetails, METHOD.GET, params);
}
async function getLecturerStatistics(params) {
  return request(Users.getLecturerStatistics, METHOD.GET, params);
}
async function getInDeatailsLecturerStatistics(params) {
  return request(Users.getInDeatailsLecturerStatistics, METHOD.GET, params);
}
async function getDialog(params) {
  return request(Users.getDialog, METHOD.GET, params);
}
async function getAll(params) {
  return request(Users.getAll, METHOD.GET, params);
}

async function add(data) {
  return request(Users.add, METHOD.POST, data);
}
async function update(data) {
  return request(Users.update, METHOD.POST, data);
}
async function approveUserSignUp(data) {
  return request(Users.approveUserSignUp, METHOD.POST, data);
}
async function changeActivationType(data) {
  return request(Users.changeActivationType, METHOD.POST, data);
}
async function changeUserPassword(data) {
  return request(Users.changeUserPassword, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(Users.deleteImage, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(Users.finalDelete, METHOD.POST, data);
}

export default {
  login,
  signUp,
  logout,
  getDetails,
  getDialog,
  getAll,
  getLecturerStatistics,
  getInDeatailsLecturerStatistics,
  add,
  update,
  approveUserSignUp,
  changeActivationType,
  changeUserPassword,
  deleteImage,
  finalDelete,
};

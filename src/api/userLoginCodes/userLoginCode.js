import { METHOD, request } from "./../request";
import { UserLoginCodes } from "./../links";

async function getAll(params) {
  return request(UserLoginCodes.getAll, METHOD.GET, params);
}
async function getDetails(params) {
  return request(UserLoginCodes.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(UserLoginCodes.getDialog, METHOD.GET, params);
}
async function getSuggestion(params) {
  return request(UserLoginCodes.getSuggestion, METHOD.GET, params);
}

async function add(data) {
  return request(UserLoginCodes.add, METHOD.POST, data);
}
async function update(data) {
  return request(UserLoginCodes.update, METHOD.POST, data);
}
async function ResetUserLoginCode(data) {
  return request(UserLoginCodes.resetUserLoginCode, METHOD.POST, data);
}
async function ResetUserDeviceCode(data) {
  return request(UserLoginCodes.resetUserDeviceCode, METHOD.POST, data);
}

async function useLoginCode(data) {
  return request(UserLoginCodes.useLoginCode, METHOD.POST, data);
}

async function changeActivationType(data) {
  return request(UserLoginCodes.changeActivationType, METHOD.POST, data);
}

async function finalDelete(data) {
  return request(UserLoginCodes.finalDelete, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(UserLoginCodes.deleteImage, METHOD.POST, data);
}

export default {
  getAll,
  getDetails,
  getDialog,
  getSuggestion,
  add,
  update,
  ResetUserLoginCode,
  ResetUserDeviceCode,
  useLoginCode,
  changeActivationType,
  finalDelete,
  deleteImage,
};

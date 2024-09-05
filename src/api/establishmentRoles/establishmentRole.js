import { METHOD, request } from "./../request";
import { EstablishmentRoles } from "./../links";

async function getDetails(params) {
  return request(EstablishmentRoles.getDetails, METHOD.GET, params);
}
async function getDialog(params) {
  return request(EstablishmentRoles.getDialog, METHOD.GET, params);
}
async function getAll(params) {
  return request(EstablishmentRoles.getAll, METHOD.GET, params);
}

async function add(data) {
  return request(EstablishmentRoles.add, METHOD.POST, data);
}
async function update(data) {
  return request(EstablishmentRoles.update, METHOD.POST, data);
}
async function changeActivationType(data) {
  return request(EstablishmentRoles.changeActivationType, METHOD.POST, data);
}
async function deleteImage(data) {
  return request(EstablishmentRoles.deleteImage, METHOD.POST, data);
}
async function finalDelete(data) {
  return request(EstablishmentRoles.finalDelete, METHOD.POST, data);
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

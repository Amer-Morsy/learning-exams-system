import { METHOD, request } from "./../../request";
import { EducationalTeachers } from "./../../links";

async function getAll(params) {
  return request(EducationalTeachers.getAll, METHOD.GET, params);
}

export default {
  getAll,
};

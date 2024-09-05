import { METHOD, request } from "./../../request";
import { EducationalCourseLevelQuestions } from "./../../links";

async function getDetails(params) {
  return request(
    EducationalCourseLevelQuestions.getDetails,
    METHOD.GET,
    params
  );
}
async function getAll(params) {
  return request(EducationalCourseLevelQuestions.getAll, METHOD.GET, params);
}

async function changeCourseLevelQuestions(data) {
  return request(
    EducationalCourseLevelQuestions.changeCourseLevelQuestions,
    METHOD.POST,
    data
  );
}

export default {
  getDetails,
  getAll,
  changeCourseLevelQuestions,
};

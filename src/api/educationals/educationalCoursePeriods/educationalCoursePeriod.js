import { METHOD, request } from "./../../request";
import { EducationalCoursePeriods } from "./../../links";

async function start(data) {
  return request(EducationalCoursePeriods.start, METHOD.POST, data);
}

async function end(data) {
  return request(EducationalCoursePeriods.end, METHOD.POST, data);
}

export default {
  start,
  end,
};

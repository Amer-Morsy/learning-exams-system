<template>
  <b-modal :id="refName" scrollable centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/alert.svg" class="icon-lg" />
        {{ $t("alert") }}
      </h3>
    </template>

    <h4 v-if="isOpened" class="text-center">
      {{ $t("areYouSureToFinishStart") }}
      <span class="co-red">{{
        educationalCourse.educationalCourseNameCurrent
      }}</span>
      {{ $t("areYouSureToCloseEnd") }}
    </h4>
    <h4 v-if="isClosed" class="text-center">
      {{ $t("areYouSureToStartStart") }}
      <span class="co-green">{{
        educationalCourse.educationalCourseNameCurrent
      }}</span>
      {{ $t("areYouSureToOpenEnd") }}
    </h4>

    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="changeStartEnd"
      >
        {{ $t("ok") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide(refName)"
      >
        {{ $t("cancel") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import { STATUS } from "./../../../../utils/constants";
import { EDUCATIONAL_COURSE_PERIOD_STATUS_TYPE } from "./../../../../utils/constantLists";
import { objectToFormData } from "./../../../../utils/functions";
import apiEducationalCourse from "../../../../api/educationals/educationalCourses/educationalCourse";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "EducationalCourseChangeStartEnd",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
    fullbackAction: {
      type: Function,
    },
  },
  data() {
    return {};
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {},
  computed: {
    educationalCourse() {
      return this.model.educationalCourse;
    },
    refName() {
      return this.model.metaData.components.ChangeStartEnd.refName;
    },
    isOpened() {
      return (
        this.educationalCourse.educationalCoursePeriodStatusTypeToken ==
        EDUCATIONAL_COURSE_PERIOD_STATUS_TYPE.Open
      );
    },
    isClosed() {
      return (
        this.educationalCourse.educationalCoursePeriodStatusTypeToken ==
        EDUCATIONAL_COURSE_PERIOD_STATUS_TYPE.Closed
      );
    },
  },
  methods: {
    async changeStartEnd() {
      let formData = objectToFormData({
        educationalCourseToken: this.educationalCourse.educationalCourseToken,
      });
      let response = null;
      if (this.isOpened) {
        response = await apiEducationalCourse.end(formData);
      } else if (this.isClosed) {
        response = await apiEducationalCourse.start(formData);
      }
      if (response.data.status == STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.runFullbackAction();
        this.$bvModal.hide(this.refName);
      } else {
        this.showMsg(response.data.msg);
      }
    },
    runFullbackAction() {
      this.fullbackAction();
    },
  },
};
</script>

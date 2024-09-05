<template>
  <CustomBottomSheet
    :refName="'LecturerStatisticsReportFilter'"
    size="xl"
    :headerText="
      inDeatails
        ? $t('Reports.lecturerStatisticsInDeatails')
        : $t('Reports.lecturerStatistics')
    "
    :headerIcon="icon"
    @opened="getDialogs()"
  >
    <div class="row">
      <CustomSelectBox
        v-if="inDeatails"
        :className="'col-md-11'"
        :id="`filter-userToken`"
        :value="users.filterData.userToken"
        :options="userTokenOptions"
        v-on:changeValue="users.filterData.userToken = $event"
        :title="$t('Teachers.select')"
        :imgName="'teacher.svg'"
      />
      <CustomInput
        :className="'col-md-12'"
        :id="`sendTo`"
        :value="users.filterData.sendTo"
        v-on:changeValue="users.filterData.sendTo = $event"
        :title="$t('Reports.sendTo')"
        :imgName="'email.svg'"
      />

      <DateTimePicker
        class="col-md-6"
        id="dateTimeFrom"
        type="dateTime"
        :value="users.filterData.dateTimeStartSearch"
        v-on:changeValue="
          users.filterData.dateTimeStartSearch = $event.dateTime
        "
        :title="$t('Reports.dateTimeFrom')"
        :language="language"
      />
      <DateTimePicker
        class="col-md-6"
        id="dateTimeTo"
        type="dateTime"
        :value="users.filterData.dateTimeEndSearch"
        v-on:changeValue="users.filterData.dateTimeEndSearch = $event.dateTime"
        :title="$t('Reports.dateTimeTo')"
        :language="language"
      />
    </div>

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="getReport">
        <img
          src="@/assets/images/check-icon.svg"
          :title="$t('Reports.print')"
        />
      </div>
      <div
        @click.prevent="closeBottomSheet('LecturerStatisticsReportFilter')"
        class="icon-cancel"
      >
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>


<script>
import CustomInput from "../../../components/inputs/CustomInput.vue";
import CustomSelectBox from "../../../components/inputs/CustomSelectBox.vue";
import DateTimePicker from "../../../components/inputs/DateTimePicker.vue";
import CustomBottomSheet from "../../../components/general/CustomBottomSheet.vue";
import generalMixin from "../../../utils/generalMixin";
import Users from "../../../models/users/Users";
import apiUser from "../../../api/users/user";
import { getLanguage, viewFileFromServer } from "../../../utils/functions";
import { USER_MODEL_NAME } from "../../../utils/constants";
import { USER_TYPE } from "../../../utils/constantLists";
import { getUsersDialog } from "../../../utils/dialogsOfApi";
import icon from "@/assets/images/reports.svg";

export default {
  name: "LecturerStatisticsReportFilter",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    inDeatails: {
      type: Boolean,
      default: false,
    },
    userToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      users: new Users(USER_MODEL_NAME.Teacher),
      language: getLanguage(),
      icon,
      userTokenOptions: [],
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomInput,
    CustomSelectBox,
    DateTimePicker,
    CustomBottomSheet,
  },
  computed: {},
  methods: {
    getDialogs() {
      if (this.inDeatails) {
        this.users.filterData.userToken = this.userToken;
        this.getTeachersDialog();
      }
    },
    async getTeachersDialog() {
      let params = {
        modelName: USER_MODEL_NAME.Teacher,
        userTypeToken: USER_TYPE.Teacher,
      };
      this.userTokenOptions = await getUsersDialog(params);
    },
    async getReport() {
      let response = "";
      if (this.inDeatails) {
        response = await apiUser.getInDeatailsLecturerStatistics(
          this.users.filterData
        );
      } else {
        response = await apiUser.getLecturerStatistics(this.users.filterData);
      }
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.closeBottomSheet("LecturerStatisticsReportFilter");
        viewFileFromServer(response.data.reportPath);
      } else {
        this.showMsg(response.data.msg);
      }
    },
  },
};
</script>

<style lang="scss"></style>

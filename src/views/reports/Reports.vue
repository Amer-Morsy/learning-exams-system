<template>
  <div class="page-container">
    <div class="reports-cards">
      <div
        class="reports-card"
        @click="openBottomSheet('LecturerStatisticsReportFilter')"
      >
        <div class="flex">
          <img src="@/assets/images/statistics.svg" />
          <h4>{{ $t("Reports.lecturerStatistics") }}</h4>
        </div>
      </div>
      <div
        class="reports-card"
        @click="
          inDeatails = true;
          openBottomSheet('LecturerStatisticsReportFilter');
        "
      >
        <div class="flex">
          <img src="@/assets/images/statistics.svg" />
          <h4>{{ $t("Reports.lecturerStatisticsInDeatails") }}</h4>
        </div>
      </div>

      <LecturerStatisticsReportFilter :inDeatails="inDeatails" />
    </div>
  </div>
</template>

<script>
import LecturerStatisticsReportFilter from "./components/LecturerStatisticsReportFilter.vue";
import generalMixin from "../../utils/generalMixin";

export default {
  name: "Reports",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {},
  data() {
    return {
      inDeatails: false,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    LecturerStatisticsReportFilter,
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
</style>

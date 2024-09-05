<template>
  <div v-if="viewReport.reportAppearance" class="my-card-main row">
    <div class="my-card-title-main">
      <CustomCheckbox
        :isSwitch="false"
        class="my-card-title-main-check"
        :value="isHavePrivlageReport"
        v-on:changeValue="isHavePrivlageReport = $event"
        :title="$t('Privileges.report')"
      />
    </div>
    <div :class="innerClass">
      <div v-if="viewReport.activeAppearance" class="my-card row">
        <div class="my-card-title-main">
          <CustomCheckbox
            :isSwitch="false"
            class="my-card-title-main-check"
            :value="isHavePrivlageReportActive"
            v-on:changeValue="isHavePrivlageReportActive = $event"
            :title="$t('Privileges.active')"
          />
        </div>

        <CustomCheckbox
          :isSwitch="false"
          v-for="(funcation, activeIndex) in viewReport.active"
          :key="`${funcation.funcationWithModuleToken}${activeIndex}`"
          :className="'col-md-12'"
          :value="funcation.funcationPrivilegeStatus"
          v-on:changeValue="
            funcation.funcationPrivilegeStatus = $event;
            emitAtLeastOneReports();
          "
          :title="`${funcation.funcationNameCurrent}`"
        />
      </div>
    </div>

    <div :class="innerClass">
      <div v-if="viewReport.blockedAppearance" class="my-card row">
        <div class="my-card-title-main">
          <CustomCheckbox
            :isSwitch="false"
            class="my-card-title-main-check"
            :value="isHavePrivlageReportBlocked"
            v-on:changeValue="isHavePrivlageReportBlocked = $event"
            :title="$t('Privileges.blocked')"
          />
        </div>
        <CustomCheckbox
          :isSwitch="false"
          v-for="(funcation, blockedIndex) in viewReport.blocked"
          :key="`${funcation.funcationWithModuleToken}${blockedIndex}`"
          :className="'col-md-12'"
          :value="funcation.funcationPrivilegeStatus"
          v-on:changeValue="
            funcation.funcationPrivilegeStatus = $event;
            emitAtLeastOneReports();
          "
          :title="`${funcation.funcationNameCurrent}`"
        />
      </div>
    </div>
    <div :class="'col-md-12'">
      <div v-if="viewReport.notificationAppearance" class="my-card row">
        <div class="my-card-title-main">
          <CustomCheckbox
            :isSwitch="false"
            class="my-card-title-main-check"
            :value="isHavePrivlageReportNotification"
            v-on:changeValue="isHavePrivlageReportNotification = $event"
            :title="$t('Privileges.notification')"
          />
        </div>
        <CustomCheckbox
          :isSwitch="false"
          v-for="(funcation, notificationIndex) in viewReport.notification"
          :key="`${funcation.funcationWithModuleToken}${notificationIndex}`"
          :className="'col-md-12'"
          :value="funcation.funcationPrivilegeStatus"
          v-on:changeValue="
            funcation.funcationPrivilegeStatus = $event;
            emitAtLeastOneReports();
          "
          :title="`${funcation.funcationNameCurrent}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { GeneralFunctions } from "./../../../controllers/privilege/PrivilegeTokens";
import CustomCheckbox from "./../../../components/inputs/CustomCheckbox.vue";

export default {
  components: {
    CustomCheckbox,
  },
  props: ["funcations", "forceChangeParentOfReports"],

  computed: {
    isHavePrivlageReportActive: {
      get: function() {
        return this.checkAllStatusesIsTrue(this.viewReport.active);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.viewReport.active, status);
        this.emitAtLeastOneReports();
      },
    },
    isHavePrivlageReportBlocked: {
      get: function() {
        return this.checkAllStatusesIsTrue(this.viewReport.blocked);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.viewReport.blocked, status);
        this.emitAtLeastOneReports();
      },
    },
    isHavePrivlageReportNotification: {
      get: function() {
        return this.checkAllStatusesIsTrue(this.viewReport.notification);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.viewReport.notification, status);
        this.emitAtLeastOneReports();
      },
    },

    isHavePrivlageReport: {
      get: function() {
        return this.checkAllIsTrue([
          this.isHavePrivlageReportActive,
          this.isHavePrivlageReportBlocked,
          this.isHavePrivlageReportNotification,
        ]);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.viewReport.active, status);
        this.updateStatutsOfFunctions(this.viewReport.blocked, status);
        this.updateStatutsOfFunctions(this.viewReport.notification, status);
        this.emitAtLeastOneReports();
      },
    },

    innerClass() {
      let arr = [
        this.viewReport.activeAppearance,
        this.viewReport.blockedAppearance,
      ];
      const numOfInnerSector = arr.filter((a) => a).length;
      if (numOfInnerSector == 2) {
        return "col-md-6";
      } else {
        return "col-md-12";
      }
    },
  },
  data() {
    return {
      viewReportSelfDataActive: GeneralFunctions.reportingSelfDataActive,
      viewReportAllDataActive: GeneralFunctions.reportingAllDataActive,
      viewReportSelfDataBlocked: GeneralFunctions.reportingSelfDataBlocked,
      viewReportAllDataBlocked: GeneralFunctions.reportingAllDataBlocked,
      notificationOnReportingData: GeneralFunctions.notificationOnReportingData,

      viewReport: {
        active: [],
        blocked: [],
        notification: [],
        activeAppearance: false,
        blockedAppearance: false,
        notificationAppearance: false,
        reportAppearance: false,
      },
    };
  },
  watch: {
    isHavePrivlageReport(val) {
      this.updateParentCheckStatusOfReports(val);
      this.emitAtLeastOneReports();
    },
    forceChangeParentOfReports(val) {
      this.isHavePrivlageReport = val;
    },
  },
  methods: {
    emitAtLeastOneReports() {
      let status = this.checkOneAtLeastStatusesIsTrue([
        ...this.viewReport.active,
        ...this.viewReport.blocked,
        ...this.viewReport.notification,
      ]);

      this.$emit("emitAtLeastOneReports", status);
    },
    updateParentCheckStatusOfReports(status) {
      this.$emit("updateParentCheckStatusOfReports", status);
    },
    updateStatutsOfFunctions(arrFunc, status) {
      arrFunc.forEach((element) => {
        element.funcationPrivilegeStatus = status;
      });
    },

    checkAllStatusesIsTrue(arrFunctions) {
      let Statuses = this.getStatutsOfFunctions(arrFunctions);
      return this.checkAllIsTrue(Statuses);
    },

    checkOneAtLeastStatusesIsTrue(arrFunctions) {
      let Statuses = this.getStatutsOfFunctions(arrFunctions);

      return this.checkOneAtLeastIsTrue(Statuses);
    },

    async setViewReport() {
      this.viewReport.active = this.funcations.filter(
        (fun) =>
          fun.appearanceStatus &&
          (fun.funcationToken == this.viewReportSelfDataActive ||
            fun.funcationToken == this.viewReportAllDataActive)
      );
      this.viewReport.activeAppearance = this.viewReport.active.length
        ? true
        : false;

      this.viewReport.blocked = this.funcations.filter(
        (fun) =>
          fun.appearanceStatus &&
          (fun.funcationToken == this.viewReportSelfDataBlocked ||
            fun.funcationToken == this.viewReportAllDataBlocked)
      );
      this.viewReport.blockedAppearance = this.viewReport.blocked.length
        ? true
        : false;
      this.viewReport.notification = this.funcations.filter(
        (fun) =>
          fun.appearanceStatus &&
          fun.funcationToken == this.notificationOnReportingData
      );
      this.viewReport.notificationAppearance = this.viewReport.notification
        .length
        ? true
        : false;

      this.viewReport.reportAppearance = this.checkOneAtLeastIsTrue([
        this.viewReport.activeAppearance,
        this.viewReport.blockedAppearance,
        this.viewReport.notificationAppearance,
      ]);
    },

    // helper
    checkOneAtLeastIsTrue(arr) {
      return arr.filter((a) => a).length ? true : false;
    },
    checkAllIsTrue(arr) {
      return arr.filter((a) => a == false).length ? false : true;
    },
    getStatutsOfFunctions(arrFunc) {
      let Statuses = [];
      arrFunc.forEach((element) => {
        Statuses.push(element.funcationPrivilegeStatus);
      });
      return Statuses;
    },
  },
  async created() {
    this.setViewReport();
    this.emitAtLeastOneReports();
  },
};
</script>

<style lang="scss"></style>

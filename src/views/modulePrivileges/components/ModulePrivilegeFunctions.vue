<template>
  <div>
    <PrivilegeReport
      :funcations="funcations"
      :forceChangeParentOfReports="forceChangeParentOfReports"
      v-on:emitAtLeastOneReports="atLeastOneReports = $event"
    />

    <PrivilegeActions
      :funcations="funcations"
      :forceChangeParentOfActions="forceChangeParentOfActions"
      v-on:emitAtLeastOneActions="atLeastOneActions = $event"
    />
    <PrivilegeDialog
      :funcations="funcations"
      :forceChangeParentOfDialogs="forceChangeParentOfDialogs"
      v-on:emitAtLeastOneDialogs="atLeastOneDialogs = $event"
    />
    <!-- others functions -->
    <div class="my-card row" v-if="listOtherFunctions.length">
      <CustomCheckbox
        :isSwitch="false"
        v-for="(funcation, othersIndex) in listOtherFunctions"
        :key="`${funcation.funcationWithModuleToken}${othersIndex}`"
        :className="'col-md-6'"
        :value="funcation.funcationPrivilegeStatus"
        v-on:changeValue="
          funcation.funcationPrivilegeStatus = $event;
          updateAtLeastOneOthers();
        "
        :title="`${funcation.funcationNameCurrent}`"
      />
    </div>
  </div>
</template>

<script>
import PrivilegeReport from "./PrivilegeReport.vue";
import PrivilegeActions from "./PrivilegeActions.vue";
import PrivilegeDialog from "./PrivilegeDialog.vue";
import { GeneralFunctions } from "./../../../controllers/privilege/PrivilegeTokens";
import CustomCheckbox from "./../../../components/inputs/CustomCheckbox.vue";

export default {
  components: {
    PrivilegeReport,
    PrivilegeActions,
    PrivilegeDialog,
    CustomCheckbox,
  },
  props: ["funcations", "forceChangeParentOfAll"],

  data() {
    return {
      allGeneralFunctionsToken: [
        // report
        { funcationToken: GeneralFunctions.reportingSelfDataActive },
        { funcationToken: GeneralFunctions.reportingAllDataActive },

        { funcationToken: GeneralFunctions.reportingSelfDataBlocked },
        { funcationToken: GeneralFunctions.reportingAllDataBlocked },
        { funcationToken: GeneralFunctions.notificationOnReportingData },

        // dialog
        { funcationToken: GeneralFunctions.viewDialogSelfDataActive },
        { funcationToken: GeneralFunctions.viewDialogAllDataActive },
        { funcationToken: GeneralFunctions.viewDialogSelfDataBlocked },
        { funcationToken: GeneralFunctions.viewDialogAllDataBlocked },

        // actions
        { funcationToken: GeneralFunctions.viewSelfDataActive },
        { funcationToken: GeneralFunctions.viewAllDataActive },
        { funcationToken: GeneralFunctions.viewSelfDataBlocked },
        { funcationToken: GeneralFunctions.viewAllDataBlocked },

        { funcationToken: GeneralFunctions.itemAdd },
        { funcationToken: GeneralFunctions.itemUpdate },
        { funcationToken: GeneralFunctions.itemDeleteImage },
        { funcationToken: GeneralFunctions.itemFinaleDelete },
        { funcationToken: GeneralFunctions.notificationOnItemAdd },
        { funcationToken: GeneralFunctions.notificationOnItemUpdate },
        { funcationToken: GeneralFunctions.notificationOnDeleteImage },
        { funcationToken: GeneralFunctions.notificationOnFinaleDeleteItem },

        { funcationToken: GeneralFunctions.itemActive },
        { funcationToken: GeneralFunctions.notificationOnItemActive },
        { funcationToken: GeneralFunctions.itemBlocked },
        { funcationToken: GeneralFunctions.notificationOnItemBlocked },
      ],

      listOtherFunctions: [],

      parentCheckStatusOfReports: false,
      forceChangeParentOfReports: false,

      parentCheckStatusOfActions: false,
      forceChangeParentOfActions: false,

      parentCheckStatusOfDialogs: false,
      forceChangeParentOfDialogs: false,

      parentCheckStatusOfOthers: false,
      forceChangeParentOfOthers: false,

      atLeastOneReports: false,
      atLeastOneActions: false,
      atLeastOneDialogs: false,
      atLeastOneOthers: false,
    };
  },
  computed: {
    atLeastOne: {
      get: function() {
        return (
          this.atLeastOneReports ||
          this.atLeastOneActions ||
          this.atLeastOneDialogs ||
          this.atLeastOneOthers
        );
      },
    },
    parentCheckStatusOfAll: {
      get: function() {
        return this.checkAllIsTrue([
          this.parentCheckStatusOfReports,
          this.parentCheckStatusOfActions,
          this.parentCheckStatusOfDialogs,
          this.parentCheckStatusOfOthers,
        ]);
      },
      set: function(status) {
        this.updateParentCheckStatusOfAll(status);
      },
    },
  },
  watch: {
    atLeastOne(val) {
      this.emitAtLeastOne(val);
    },
    parentCheckStatusOfAll(val) {
      this.emitParentStatusOfAll(val);
    },
    forceChangeParentOfAll(val) {
      this.parentCheckStatusOfAll = val;
    },
    forceChangeParentOfOthers(val) {
      this.forceOther(val);
    },
  },
  methods: {
    emitAtLeastOne(status) {
      this.$emit("emitAtLeastOne", status);
    },
    emitParentStatusOfAll(status) {
      this.$emit("emitParentStatusOfAll", status);
    },

    checkAllIsTrue(arr) {
      return arr.filter((a) => a == false).length ? false : true;
    },

    updateParentCheckStatusOfReports(data) {
      if (this.parentCheckStatusOfReports != data) {
        this.parentCheckStatusOfReports = data;
      }
    },
    updateParentCheckStatusOfActions(data) {
      if (this.parentCheckStatusOfActions != data) {
        this.parentCheckStatusOfActions = data;
      }
    },
    updateParentCheckStatusOfDialogs(data) {
      if (this.parentCheckStatusOfDialogs != data) {
        this.parentCheckStatusOfDialogs = data;
      }
    },

    updateParentCheckStatusOfAll(status) {
      this.forceChangeParentOfReports = status;
      this.forceChangeParentOfActions = status;
      this.forceChangeParentOfDialogs = status;
      this.forceChangeParentOfOthers = status;
    },

    updateAtLeastOneOthers() {
      let statuses = this.getStatutsOfFunctions(this.listOtherFunctions);
      let isOneChecked = statuses.some((element) => element);
      this.atLeastOneOthers = isOneChecked;
    },

    getStatutsOfFunctions(arrFunc) {
      let Statuses = [];
      arrFunc.forEach((element) => {
        Statuses.push(element.funcationPrivilegeStatus);
      });
      return Statuses;
    },

    forceOther(val) {
      this.listOtherFunctions.forEach((element) => {
        element.funcationPrivilegeStatus = val;
      });
    },
    async diffTowLists(left, right, compareFunction) {
      return left.filter(
        (leftValue) =>
          !right.some((rightValue) => compareFunction(leftValue, rightValue))
      );
    },

    async setListOtherFunctions() {
      // tow lists
      let a = this.allGeneralFunctionsToken;
      let b = this.funcations;
      // condetion
      const isSameToken = (a, b) => a.funcationToken === b.funcationToken;
      // diff in functiins
      let diffInB = this.diffTowLists(b, a, isSameToken);

      Promise.all([diffInB]).then((values) => {
        let list = values[0];
        this.listOtherFunctions = list.filter((fun) => fun.appearanceStatus);
      });
    },
  },
  async created() {
    this.setListOtherFunctions();
  },
};
</script>

<style lang="scss"></style>

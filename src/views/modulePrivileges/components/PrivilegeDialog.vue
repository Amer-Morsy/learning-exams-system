<template>
  <div v-if="viewDialog.dialogAppearance" class="my-card-main row">
    <div class="my-card-title-main">
      <CustomCheckbox
        :isSwitch="false"
        class="my-card-title-main-check"
        :value="isHavePrivlageDialog"
        v-on:changeValue="isHavePrivlageDialog = $event"
        :title="$t('Privileges.dialog')"
      />
    </div>
    <div :class="innerClass">
      <div v-if="viewDialog.activeAppearance" class="my-card row">
        <div class="my-card-title-main">
          <CustomCheckbox
            :isSwitch="false"
            class="my-card-title-main-check"
            :value="isHavePrivlageDialogActive"
            v-on:changeValue="isHavePrivlageDialogActive = $event"
            :title="$t('Privileges.active')"
          />
        </div>

        <CustomCheckbox
          :isSwitch="false"
          v-for="(funcation, activeIndex) in viewDialog.active"
          :key="`${funcation.funcationWithModuleToken}${activeIndex}`"
          :className="'col-md-12'"
          :value="funcation.funcationPrivilegeStatus"
          v-on:changeValue="
            funcation.funcationPrivilegeStatus = $event;
            emitAtLeastOneDialogs();
          "
          :title="`${funcation.funcationNameCurrent}`"
        />
      </div>
    </div>

    <div :class="innerClass">
      <div v-if="viewDialog.blockedAppearance" class="my-card row">
        <div class="my-card-title-main">
          <CustomCheckbox
            :isSwitch="false"
            class="my-card-title-main-check"
            :value="isHavePrivlageDialogBlocked"
            v-on:changeValue="isHavePrivlageDialogBlocked = $event"
            :title="$t('Privileges.blocked')"
          />
        </div>
        <CustomCheckbox
          :isSwitch="false"
          v-for="(funcation, blockedIndex) in viewDialog.blocked"
          :key="`${funcation.funcationWithModuleToken}${blockedIndex}`"
          :className="'col-md-12'"
          :value="funcation.funcationPrivilegeStatus"
          v-on:changeValue="
            funcation.funcationPrivilegeStatus = $event;
            emitAtLeastOneDialogs();
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
  props: ["funcations", "forceChangeParentOfDialogs"],

  computed: {
    isHavePrivlageDialogActive: {
      get: function() {
        return this.checkAllStatusesIsTrue(this.viewDialog.active);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.viewDialog.active, status);
        this.emitAtLeastOneDialogs();
      },
    },
    isHavePrivlageDialogBlocked: {
      get: function() {
        return this.checkAllStatusesIsTrue(this.viewDialog.blocked);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.viewDialog.blocked, status);
        this.emitAtLeastOneDialogs();
      },
    },
    isHavePrivlageDialog: {
      get: function() {
        return this.checkAllIsTrue([
          this.isHavePrivlageDialogActive,
          this.isHavePrivlageDialogBlocked,
        ]);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.viewDialog.active, status);
        this.updateStatutsOfFunctions(this.viewDialog.blocked, status);

        // this.updateParentCheckStatusOfDialogs(status);
        this.emitAtLeastOneDialogs();
      },
    },

    innerClass() {
      let arr = [
        this.viewDialog.activeAppearance,
        this.viewDialog.blockedAppearance,
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
      viewDialogSelfDataActive: GeneralFunctions.viewDialogSelfDataActive,
      viewDialogAllDataActive: GeneralFunctions.viewDialogAllDataActive,
      viewDialogSelfDataBlocked: GeneralFunctions.viewDialogSelfDataBlocked,
      viewDialogAllDataBlocked: GeneralFunctions.viewDialogAllDataBlocked,

      viewDialog: {
        active: [],
        blocked: [],
        activeAppearance: false,
        blockedAppearance: false,
        dialogAppearance: false,
      },
    };
  },
  watch: {
    isHavePrivlageDialog: function(val) {
      this.updateParentCheckStatusOfDialogs(val);
      this.emitAtLeastOneDialogs();
    },
    forceChangeParentOfDialogs: function(val) {
      this.isHavePrivlageDialog = val;
    },
  },
  methods: {
    emitAtLeastOneDialogs() {
      let status = this.checkOneAtLeastStatusesIsTrue([
        ...this.viewDialog.active,
        ...this.viewDialog.blocked,
      ]);

      this.$emit("emitAtLeastOneDialogs", status);
    },
    updateParentCheckStatusOfDialogs(status) {
      this.$emit("updateParentCheckStatusOfDialogs", status);
    },
    isOneChecked() {
      let viewDialogArrs = [
        ...this.viewDialog.active,
        ...this.viewDialog.blocked,
      ];
      let statuses = this.getStatutsOfFunctions(viewDialogArrs);
      let isOneChecked = statuses.some((element) => element);
      return isOneChecked;
    },

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
    async setViewDialog() {
      this.viewDialog.active = this.funcations.filter(
        (fun) =>
          fun.appearanceStatus &&
          (fun.funcationToken == this.viewDialogSelfDataActive ||
            fun.funcationToken == this.viewDialogAllDataActive)
      );
      this.viewDialog.activeAppearance = this.viewDialog.active.length
        ? true
        : false;

      this.viewDialog.blocked = this.funcations.filter(
        (fun) =>
          fun.appearanceStatus &&
          (fun.funcationToken == this.viewDialogSelfDataBlocked ||
            fun.funcationToken == this.viewDialogAllDataBlocked)
      );
      this.viewDialog.blockedAppearance = this.viewDialog.blocked.length
        ? true
        : false;

      this.viewDialog.dialogAppearance = this.checkOneAtLeastIsTrue([
        this.viewDialog.activeAppearance,
        this.viewDialog.blockedAppearance,
      ]);
    },
  },
  async created() {
    this.setViewDialog();
    this.emitAtLeastOneDialogs();
  },
};
</script>

<style lang="scss"></style>

<template>
  <div v-if="viewAction.appearance" class="my-card-main row">
    <div class="my-card-title-main">
      <CustomCheckbox
        :isSwitch="false"
        class="my-card-title-main-check"
        :value="isHavePrivlageAllActions"
        v-on:changeValue="isHavePrivlageAllActions = $event"
        :title="$t('Privileges.action.modelName')"
      />
    </div>

    <!-- #region viewAction -->
    <template>
      <div v-if="viewAction.appearance" class="my-card-main row">
        <div class="my-card-title-main">
          <CustomCheckbox
            :isSwitch="false"
            class="my-card-title-main-check"
            :value="isHavePrivlageViewAction"
            v-on:changeValue="isHavePrivlageViewAction = $event"
            :title="$t('Privileges.action.view')"
          />
        </div>
        <div :class="innerClassView">
          <div v-if="viewAction.activeAppearance" class="my-card row">
            <div class="my-card-title-main">
              <CustomCheckbox
                :isSwitch="false"
                class="my-card-title-main-check"
                :value="isHavePrivlageViewActionActive"
                v-on:changeValue="isHavePrivlageViewActionActive = $event"
                :title="$t('Privileges.active')"
              />
            </div>

            <CustomCheckbox
              :isSwitch="false"
              v-for="(funcation, activeIndex) in viewAction.active"
              :key="`${funcation.funcationWithModuleToken}${activeIndex}`"
              :className="'col-md-12'"
              :value="funcation.funcationPrivilegeStatus"
              v-on:changeValue="
                funcation.funcationPrivilegeStatus = $event;
                emitAtLeastOneActions();
              "
              :title="`${funcation.funcationNameCurrent}`"
            />
          </div>
        </div>
        <div :class="innerClassView">
          <div v-if="viewAction.blockedAppearance" class="my-card row">
            <div class="my-card-title-main">
              <CustomCheckbox
                :isSwitch="false"
                class="my-card-title-main-check"
                :value="isHavePrivlageViewActionBlocked"
                v-on:changeValue="isHavePrivlageViewActionBlocked = $event"
                :title="$t('Privileges.blocked')"
              />
            </div>
            <CustomCheckbox
              :isSwitch="false"
              v-for="(funcation, blockedIndex) in viewAction.blocked"
              :key="`${funcation.funcationWithModuleToken}${blockedIndex}`"
              :className="'col-md-12'"
              :value="funcation.funcationPrivilegeStatus"
              v-on:changeValue="
                funcation.funcationPrivilegeStatus = $event;
                emitAtLeastOneActions();
              "
              :title="`${funcation.funcationNameCurrent}`"
            />
          </div>
        </div>
      </div>
    </template>
    <!-- #endregion viewAction -->

    <!-- #region makeAction -->
    <template>
      <div v-if="makeAction.appearance" class="my-card-main row">
        <div class="my-card-title-main">
          <CustomCheckbox
            :isDisabled="!isOneOfViewActionTrue"
            :isSwitch="false"
            class="my-card-title-main-check"
            :value="isHavePrivlageMakeAction"
            v-on:changeValue="isHavePrivlageMakeAction = $event"
            :title="$t('Privileges.action.make')"
          />
        </div>
        <div :class="innerClassMake">
          <div v-if="makeAction.addAppearance" class="my-card row">
            <div class="my-card-title-main">
              <CustomCheckbox
                :isDisabled="!isOneOfViewActionTrue"
                :isSwitch="false"
                class="my-card-title-main-check"
                :value="isHavePrivlageMakeActionAdd"
                v-on:changeValue="isHavePrivlageMakeActionAdd = $event"
                :title="$t('Privileges.action.add')"
              />
            </div>
            <CustomCheckbox
              :isDisabled="!isOneOfViewActionTrue"
              :isSwitch="false"
              v-for="(funcation, addIndex) in makeAction.add"
              :key="`${funcation.funcationWithModuleToken}${addIndex}`"
              :className="'col-md-12'"
              :value="funcation.funcationPrivilegeStatus"
              v-on:changeValue="
                funcation.funcationPrivilegeStatus = $event;
                emitAtLeastOneActions();
              "
              :title="`${funcation.funcationNameCurrent}`"
            />
          </div>
        </div>
        <div :class="innerClassMake">
          <div v-if="makeAction.updateAppearance" class="my-card row">
            <div class="my-card-title-main">
              <CustomCheckbox
                :isDisabled="!isOneOfViewActionTrue"
                :isSwitch="false"
                class="my-card-title-main-check"
                :value="isHavePrivlageMakeActionUpdate"
                v-on:changeValue="isHavePrivlageMakeActionUpdate = $event"
                :title="$t('Privileges.action.update')"
              />
            </div>
            <CustomCheckbox
              :isDisabled="!isOneOfViewActionTrue"
              :isSwitch="false"
              v-for="(funcation, updateIndex) in makeAction.update"
              :key="`${funcation.funcationWithModuleToken}${updateIndex}`"
              :className="'col-md-12'"
              :value="funcation.funcationPrivilegeStatus"
              v-on:changeValue="
                funcation.funcationPrivilegeStatus = $event;
                emitAtLeastOneActions();
              "
              :title="`${funcation.funcationNameCurrent}`"
            />
          </div>
        </div>
        <div :class="innerClassMake">
          <div v-if="makeAction.deleteAppearance" class="my-card row">
            <div class="my-card-title-main">
              <CustomCheckbox
                :isDisabled="!isOneOfViewActionTrue"
                :isSwitch="false"
                class="my-card-title-main-check"
                :value="isHavePrivlageMakeActionDelete"
                v-on:changeValue="isHavePrivlageMakeActionDelete = $event"
                :title="$t('Privileges.action.delete')"
              />
            </div>
            <CustomCheckbox
              :isDisabled="!isOneOfViewActionTrue"
              :isSwitch="false"
              v-for="(funcation, deleteIndex) in makeAction.delete"
              :key="`${funcation.funcationWithModuleToken}${deleteIndex}`"
              :className="'col-md-12'"
              :value="funcation.funcationPrivilegeStatus"
              v-on:changeValue="
                funcation.funcationPrivilegeStatus = $event;
                emitAtLeastOneActions();
              "
              :title="`${funcation.funcationNameCurrent}`"
            />
          </div>
        </div>
        <div :class="innerClassMake">
          <div v-if="makeAction.imageAppearance" class="my-card row">
            <div class="my-card-title-main">
              <CustomCheckbox
                :isDisabled="!isOneOfViewActionTrue"
                :isSwitch="false"
                class="my-card-title-main-check"
                :value="isHavePrivlageMakeActionImage"
                v-on:changeValue="isHavePrivlageMakeActionImage = $event"
                :title="$t('Privileges.action.image')"
              />
            </div>
            <CustomCheckbox
              :isDisabled="!isOneOfViewActionTrue"
              :isSwitch="false"
              v-for="(funcation, imageIndex) in makeAction.image"
              :key="`${funcation.funcationWithModuleToken}${imageIndex}`"
              :className="'col-md-12'"
              :value="funcation.funcationPrivilegeStatus"
              v-on:changeValue="
                funcation.funcationPrivilegeStatus = $event;
                emitAtLeastOneActions();
              "
              :title="`${funcation.funcationNameCurrent}`"
            />
          </div>
        </div>
      </div>
    </template>
    <!-- #endregion makeAction -->

    <!-- #region generalMakeAction -->
    <template>
      <div v-if="generalMakeAction.appearance" class="my-card-main row">
        <div class="my-card-title-main">
          <CustomCheckbox
            :isDisabled="!canGeneralMakeAction"
            :isSwitch="false"
            class="my-card-title-main-check"
            :value="isHavePrivlageGeneralMakeAction"
            v-on:changeValue="isHavePrivlageGeneralMakeAction = $event"
            :title="$t('Privileges.action.general')"
          />
        </div>
        <div :class="innerClassGeneralMake">
          <div v-if="generalMakeAction.activeAppearance" class="my-card row">
            <div class="my-card-title-main">
              <CustomCheckbox
                :isDisabled="!canGeneralMakeActive"
                :isSwitch="false"
                class="my-card-title-main-check"
                :value="isHavePrivlageGeneralMakeActionActive"
                v-on:changeValue="
                  isHavePrivlageGeneralMakeActionActive = $event
                "
                :title="$t('Privileges.active')"
              />
            </div>

            <CustomCheckbox
              :isDisabled="!canGeneralMakeActive"
              :isSwitch="false"
              v-for="(funcation, activeIndex) in generalMakeAction.active"
              :key="`${funcation.funcationWithModuleToken}${activeIndex}`"
              :className="'col-md-12'"
              :value="funcation.funcationPrivilegeStatus"
              v-on:changeValue="
                funcation.funcationPrivilegeStatus = $event;
                emitAtLeastOneActions();
              "
              :title="`${funcation.funcationNameCurrent}`"
            />
          </div>
        </div>

        <div :class="innerClassGeneralMake">
          <div v-if="generalMakeAction.blockedAppearance" class="my-card row">
            <div class="my-card-title-main">
              <CustomCheckbox
                :isDisabled="!canGeneralMakeBlocked"
                :isSwitch="false"
                class="my-card-title-main-check"
                :value="isHavePrivlageGeneralMakeActionBlocked"
                v-on:changeValue="
                  isHavePrivlageGeneralMakeActionBlocked = $event
                "
                :title="$t('Privileges.blocked')"
              />
            </div>
            <CustomCheckbox
              :isDisabled="!canGeneralMakeBlocked"
              :isSwitch="false"
              v-for="(funcation, blockedIndex) in generalMakeAction.blocked"
              :key="`${funcation.funcationWithModuleToken}${blockedIndex}`"
              :className="'col-md-12'"
              :value="funcation.funcationPrivilegeStatus"
              v-on:changeValue="
                funcation.funcationPrivilegeStatus = $event;
                emitAtLeastOneActions();
              "
              :title="`${funcation.funcationNameCurrent}`"
            />
          </div>
        </div>
      </div>
    </template>
    <!-- #endregion generalMakeAction -->
  </div>
</template>

<script>
import { GeneralFunctions } from "./../../../controllers/privilege/PrivilegeTokens";
import CustomCheckbox from "./../../../components/inputs/CustomCheckbox.vue";

export default {
  components: {
    CustomCheckbox,
  },
  props: ["funcations", "forceChangeParentOfActions"],

  computed: {
    // #region ViewAction
    isHavePrivlageViewActionActive: {
      get: function() {
        return this.checkAllStatusesIsTrue(this.viewAction.active);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.viewAction.active, status);
        this.emitAtLeastOneActions();
      },
    },

    isHavePrivlageViewActionBlocked: {
      get: function() {
        return this.checkAllStatusesIsTrue(this.viewAction.blocked);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.viewAction.blocked, status);
        this.emitAtLeastOneActions();
      },
    },
    isHavePrivlageViewAction: {
      get: function() {
        return this.checkAllIsTrue([
          this.isHavePrivlageViewActionActive,
          this.isHavePrivlageViewActionBlocked,
        ]);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.viewAction.active, status);
        this.updateStatutsOfFunctions(this.viewAction.blocked, status);
        this.emitAtLeastOneActions();
      },
    },
    // #endregion ViewAction

    // #region MakeAction
    isHavePrivlageMakeActionAdd: {
      get: function() {
        return this.checkAllStatusesIsTrue(this.makeAction.add);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.makeAction.add, status);
        this.emitAtLeastOneActions();
      },
    },
    isHavePrivlageMakeActionUpdate: {
      get: function() {
        return this.checkAllStatusesIsTrue(this.makeAction.update);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.makeAction.update, status);
        this.emitAtLeastOneActions();
      },
    },
    isHavePrivlageMakeActionDelete: {
      get: function() {
        return this.checkAllStatusesIsTrue(this.makeAction.delete);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.makeAction.delete, status);
        this.emitAtLeastOneActions();
      },
    },
    isHavePrivlageMakeActionImage: {
      get: function() {
        return this.checkAllStatusesIsTrue(this.makeAction.image);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.makeAction.image, status);
        this.emitAtLeastOneActions();
      },
    },
    isHavePrivlageMakeAction: {
      get: function() {
        return this.checkAllIsTrue([
          this.isHavePrivlageMakeActionAdd,
          this.isHavePrivlageMakeActionUpdate,
          this.isHavePrivlageMakeActionDelete,
          this.isHavePrivlageMakeActionImage,
        ]);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.makeAction.add, status);
        this.updateStatutsOfFunctions(this.makeAction.update, status);
        this.updateStatutsOfFunctions(this.makeAction.delete, status);
        this.updateStatutsOfFunctions(this.makeAction.image, status);
        this.emitAtLeastOneActions();
      },
    },
    isOneOfViewActionTrue: {
      get: function() {
        return this.isOneOfViewActionChecked();
      },
      set: function() {},
    },

    // #endregion MakeAction

    // #region GeneralMakeAction
    isHavePrivlageGeneralMakeActionActive: {
      get: function() {
        return this.checkAllStatusesIsTrue(this.generalMakeAction.active);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.generalMakeAction.active, status);
        this.emitAtLeastOneActions();
      },
    },
    isHavePrivlageGeneralMakeActionBlocked: {
      get: function() {
        return this.checkAllStatusesIsTrue(this.generalMakeAction.blocked);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.generalMakeAction.blocked, status);
        this.emitAtLeastOneActions();
      },
    },
    isHavePrivlageGeneralMakeAction: {
      get: function() {
        return this.checkAllIsTrue([
          this.isHavePrivlageGeneralMakeActionActive,
          this.isHavePrivlageGeneralMakeActionBlocked,
        ]);
      },
      set: function(status) {
        this.updateStatutsOfFunctions(this.generalMakeAction.active, status);
        this.updateStatutsOfFunctions(this.generalMakeAction.blocked, status);
        this.emitAtLeastOneActions();
      },
    },
    canGeneralMakeActive: {
      get: function() {
        return this.canDoGeneralMakeActionActive();
      },
      set: function() {},
    },
    canGeneralMakeBlocked: {
      get: function() {
        return this.canDoGeneralMakeActionBlocked();
      },
      set: function() {},
    },
    canGeneralMakeAction: {
      get: function() {
        return this.canGeneralMakeActive && this.canGeneralMakeBlocked;
      },
      set: function() {},
    },
    // #endregion GeneralMakeAction

    // #region AllActions
    isHavePrivlageAllActions: {
      get: function() {
        return this.checkAllIsTrue([
          this.isHavePrivlageViewAction,
          this.isHavePrivlageMakeAction,
          this.isHavePrivlageGeneralMakeAction,
        ]);
      },
      set: function(status) {
        this.isHavePrivlageViewAction = status;
        this.isHavePrivlageMakeAction = status;
        this.isHavePrivlageGeneralMakeAction = status;

        this.updateParentCheckStatusOfAllActions(status);
        this.emitAtLeastOneActions();
      },
    },
    // #endregion AllActions

    // #region Design
    // #region ViewAction
    innerClassView() {
      let arr = [
        this.viewAction.activeAppearance,
        this.viewAction.blockedAppearance,
      ];
      const numOfInnerSector = arr.filter((a) => a).length;
      if (numOfInnerSector == 2) {
        return "col-md-6";
      } else {
        return "col-md-12";
      }
    },
    // #endregion ViewAction
    // #region MakeAction
    innerClassMake() {
      let arr = [
        this.makeAction.addAppearance,
        this.makeAction.updateAppearance,
        this.makeAction.deleteAppearance,
        this.makeAction.imageAppearance,
      ];
      const numOfInnerSector = arr.filter((a) => a).length;
      if (numOfInnerSector == 3) {
        return "col-md-4";
      } else if (numOfInnerSector == 2 || numOfInnerSector == 4) {
        return "col-md-6";
      } else {
        return "col-md-12";
      }
    },
    // #endregion MakeAction
    // #region GeneralMakeAction
    innerClassGeneralMake() {
      let arr = [
        this.generalMakeAction.activeAppearance,
        this.generalMakeAction.blockedAppearance,
      ];
      const numOfInnerSector = arr.filter((a) => a).length;
      if (numOfInnerSector == 2) {
        return "col-md-6";
      } else {
        return "col-md-12";
      }
    },
    // #endregion GeneralMakeAction
    // #endregion Design
  },

  data() {
    return {
      // #region ViewAction
      viewActionSelfDataActive: GeneralFunctions.viewSelfDataActive,
      viewActionAllDataActive: GeneralFunctions.viewAllDataActive,
      viewActionSelfDataBlocked: GeneralFunctions.viewSelfDataBlocked,
      viewActionAllDataBlocked: GeneralFunctions.viewAllDataBlocked,

      viewAction: {
        active: [],
        blocked: [],
        activeAppearance: false,
        blockedAppearance: false,
        appearance: false,
      },
      // #endregion ViewAction

      // #region MakeAction
      itemAdd: GeneralFunctions.itemAdd,
      itemUpdate: GeneralFunctions.itemUpdate,
      itemDeleteImage: GeneralFunctions.itemDeleteImage,
      itemFinaleDelete: GeneralFunctions.itemFinaleDelete,
      notificationOnItemAdd: GeneralFunctions.notificationOnItemAdd,
      notificationOnItemUpdate: GeneralFunctions.notificationOnItemUpdate,
      notificationOnDeleteImage: GeneralFunctions.notificationOnDeleteImage,
      notificationOnFinaleDeleteItem:
        GeneralFunctions.notificationOnFinaleDeleteItem,

      makeAction: {
        add: [],
        update: [],
        delete: [],
        image: [],
        addAppearance: false,
        updateAppearance: false,
        deleteAppearance: false,
        imageAppearance: false,
        appearance: false,
      },
      // #endregion MakeAction

      // #region GeneralMakeAction
      itemActive: GeneralFunctions.itemActive,
      notificationOnItemActive: GeneralFunctions.notificationOnItemActive,
      itemBlocked: GeneralFunctions.itemBlocked,
      notificationOnItemBlocked: GeneralFunctions.notificationOnItemBlocked,

      generalMakeAction: {
        active: [],
        blocked: [],
        activeAppearance: false,
        blockedAppearance: false,
        appearance: false,
      },
      // #endregion GeneralMakeAction
    };
  },
  watch: {
    isOneOfViewActionTrue: function(val) {
      if (!val) {
        this.isHavePrivlageMakeAction = false;
      }
    },
    canGeneralMakeActive: function(val) {
      if (!val) {
        this.isHavePrivlageGeneralMakeActionActive = false;
      }
    },
    canGeneralMakeBlocked: function(val) {
      if (!val) {
        this.isHavePrivlageGeneralMakeActionBlocked = false;
      }
    },
    canGeneralMakeAction: function(val) {
      if (!val) {
        this.isHavePrivlageGeneralMakeAction = false;
      }
    },
    isHavePrivlageAllActions: function(val) {
      this.updateParentCheckStatusOfAllActions(val);
      this.emitAtLeastOneActions();
    },
    forceChangeParentOfActions: function(val) {
      this.isHavePrivlageAllActions = val;
    },
  },

  methods: {
    updateParentCheckStatusOfAllActions(status) {
      this.$emit("updateParentCheckStatusOfActions", status);
    },

    isOneOfViewActionChecked() {
      let viewActionArrs = [
        ...this.viewAction.active,
        ...this.viewAction.blocked,
      ];
      let statuses = this.getStatutsOfFunctions(viewActionArrs);
      let isOneOfViewActionChecked = statuses.some((element) => element);
      return isOneOfViewActionChecked;
    },
    isOneOfMakeActionChecked() {
      let makeActionArrs = [
        ...this.makeAction.add,
        ...this.makeAction.update,
        ...this.makeAction.delete,
        ...this.makeAction.image,
      ];
      let statuses = this.getStatutsOfFunctions(makeActionArrs);
      let isOneOfMakeActionChecked = statuses.some((element) => element);
      return isOneOfMakeActionChecked;
    },
    canDoGeneralMakeActionActive() {
      let statuses = this.getStatutsOfFunctions([...this.viewAction.blocked]);
      let isOneChecked = statuses.some((element) => element);

      return isOneChecked;
    },
    canDoGeneralMakeActionBlocked() {
      let statuses = this.getStatutsOfFunctions([...this.viewAction.active]);
      let isOneChecked = statuses.some((element) => element);

      return isOneChecked;
    },
    isOneOfGeneralMakeActionChecked() {
      let generalMakeActionArrs = [
        ...this.generalMakeAction.active,
        ...this.generalMakeAction.blocked,
      ];
      let statuses = this.getStatutsOfFunctions(generalMakeActionArrs);
      let isOneOfGeneralMakeActionChecked = statuses.some((element) => element);
      return isOneOfGeneralMakeActionChecked;
    },
    emitAtLeastOneActions() {
      let ch1 = this.isOneOfViewActionChecked();
      let ch2 = this.isOneOfMakeActionChecked();
      let ch3 = this.isOneOfGeneralMakeActionChecked();
      let status = this.checkOneAtLeastIsTrue([ch1, ch2, ch3]);

      this.$emit("emitAtLeastOneActions", status);
    },

    checkOneAtLeastIsTrue(arr) {
      return arr.filter((a) => a).length ? true : false;
    },
    checkAllIsTrue(arr) {
      return arr.filter((a) => a == false).length ? false : true;
    },
    IsArrayHaveValue(arr) {
      return arr.length > 0 ? true : false;
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
    filterAppearedFunctionsBy(filter1, filter2) {
      return this.funcations.filter(
        (fun) =>
          fun.appearanceStatus &&
          (fun.funcationToken == filter1 || fun.funcationToken == filter2)
      );
    },
    async setViewAction() {
      this.viewAction.active = this.filterAppearedFunctionsBy(
        this.viewActionSelfDataActive,
        this.viewActionAllDataActive
      );
      this.viewAction.activeAppearance = this.IsArrayHaveValue(
        this.viewAction.active
      );

      this.viewAction.blocked = this.filterAppearedFunctionsBy(
        this.viewActionSelfDataBlocked,
        this.viewActionAllDataBlocked
      );
      this.viewAction.blockedAppearance = this.IsArrayHaveValue(
        this.viewAction.blocked
      );

      this.viewAction.appearance = this.checkOneAtLeastIsTrue([
        this.viewAction.activeAppearance,
        this.viewAction.blockedAppearance,
      ]);
    },
    async setMakeAction() {
      this.makeAction.add = this.filterAppearedFunctionsBy(
        this.itemAdd,
        this.notificationOnItemAdd
      );
      this.makeAction.addAppearance = this.IsArrayHaveValue(
        this.makeAction.add
      );

      this.makeAction.update = this.filterAppearedFunctionsBy(
        this.itemUpdate,
        this.notificationOnItemUpdate
      );
      this.makeAction.updateAppearance = this.IsArrayHaveValue(
        this.makeAction.update
      );

      this.makeAction.delete = this.filterAppearedFunctionsBy(
        this.itemFinaleDelete,
        this.notificationOnFinaleDeleteItem
      );
      this.makeAction.deleteAppearance = this.IsArrayHaveValue(
        this.makeAction.delete
      );

      this.makeAction.image = this.filterAppearedFunctionsBy(
        this.itemDeleteImage,
        this.notificationOnDeleteImage
      );
      this.makeAction.imageAppearance = this.IsArrayHaveValue(
        this.makeAction.image
      );

      this.makeAction.appearance = this.checkOneAtLeastIsTrue([
        this.makeAction.addAppearance,
        this.makeAction.updateAppearance,
        this.makeAction.deleteAppearance,
        this.makeAction.imageAppearance,
      ]);
    },
    async setGeneralMakeAction() {
      this.generalMakeAction.active = this.filterAppearedFunctionsBy(
        this.itemActive,
        this.notificationOnItemActive
      );
      this.generalMakeAction.activeAppearance = this.IsArrayHaveValue(
        this.generalMakeAction.active
      );

      this.generalMakeAction.blocked = this.filterAppearedFunctionsBy(
        this.itemBlocked,
        this.notificationOnItemBlocked
      );
      this.generalMakeAction.blockedAppearance = this.IsArrayHaveValue(
        this.generalMakeAction.blocked
      );

      this.generalMakeAction.appearance = this.checkOneAtLeastIsTrue([
        this.generalMakeAction.activeAppearance,
        this.generalMakeAction.blockedAppearance,
      ]);
    },
  },
  async created() {
    this.setViewAction();
    this.setMakeAction();
    this.setGeneralMakeAction();
    this.emitAtLeastOneActions();
  },
};
</script>

<style lang="scss"></style>

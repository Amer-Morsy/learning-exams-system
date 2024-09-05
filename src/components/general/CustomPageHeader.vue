<template>
  <div class="page-header-actions">
    <div class="actions">
      <div v-if="hasAdd" class="add">
        <img
          class="icon-md icon-action filtered"
          :title="$t('general.add')"
          src="@/assets/images/plus.svg"
          @click="openBottomSheet(model.metaData.components.Add.refName)"
        />
        <!-- @click="setAndOppenAdd()" -->
      </div>

      <div
        v-if="canSort"
        class="sort"
        :title="$t('general.sort')"
        @click="openBottomSheet(model.metaData.components.Sort.refName)"
      >
        <i class="fas fa-sliders-h icon-action" aria-hidden="true"></i>
      </div>

      <div
        class="filter"
        :title="$t('general.filter')"
        @click="openBottomSheet(model.metaData.components.Filter.refName)"
      >
        <!-- @click="setAndOppenFilter()" -->
        <i class="fa fa-filter icon-action" aria-hidden="true"></i>
      </div>

      <div v-if="canToggleView" class="toggel-view">
        <img
          v-if="viewType == VIEW_TYPES.cards"
          class="icon-md icon-action filtered"
          :title="$t('general.viewAsTable')"
          src="@/assets/images/view-list.svg"
          @click="updateView(VIEW_TYPES.table)"
        />
        <img
          v-if="viewType == VIEW_TYPES.table"
          class="icon-md icon-action filtered"
          :title="$t('general.viewAsCards')"
          src="@/assets/images/view-grid.svg"
          @click="updateView(VIEW_TYPES.cards)"
        />
      </div>

      <div v-if="canChangeActivationType" class="toggel-activation">
        <img
          v-if="activationType == ACTIVATION_TYPE.Active"
          class="icon-md icon-action"
          src="@/assets/images/activation-type-blocked.svg"
          :title="$t('general.blockedView')"
          @click="updateActivation(ACTIVATION_TYPE.Blocked)"
        />
        <img
          v-if="activationType == ACTIVATION_TYPE.Blocked"
          class="icon-md icon-action"
          src="@/assets/images/activation-type-actived.svg"
          :title="$t('general.activeView')"
          @click="updateActivation(ACTIVATION_TYPE.Active)"
        />
      </div>
    </div>

    <div v-if="canChangeActivationType" class="preview">
      <template v-if="activationType == ACTIVATION_TYPE.Active">
        <img
          class="icon-md"
          src="@/assets/images/activation-type-actived.svg"
        />
        <span>{{ $t("general.active") }}:</span>
        <span>{{ model.activationStatistics.totalActiveCount }}</span>
      </template>
      <template v-if="activationType == ACTIVATION_TYPE.Blocked">
        <img
          class="icon-md"
          src="@/assets/images/activation-type-blocked.svg"
        />
        <span>{{ $t("general.blocked") }}:</span>
        <span>{{ model.activationStatistics.totalBlockedCount }}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import generalSettingsMixin from "../../utils/generalSettingsMixin";
import generalMixin from "../../utils/generalMixin";
import { ACTIVATION_TYPE } from "../../utils/constantLists";

export default {
  name: "CustomPageHeader",
  mixins: [generalSettingsMixin, generalMixin],
  beforeCreate() {},
  props: {
    canAdd: {
      type: Boolean,
      default: true,
    },
    canSort: {
      type: Boolean,
      default: true,
    },
    canChangeActivationType: {
      type: Boolean,
      default: true,
    },
    canToggleView: {
      type: Boolean,
      default: true,
    },
    model: {
      type: Object,
      default: null,
    },
    addFullbackAction: {
      type: Function,
    },
    filterFullbackAction: {
      type: Function,
    },
    sortFullbackAction: {
      type: Function,
    },
    toggelActivationFullbackAction: {
      type: Function,
    },
  },
  data() {
    return {
      ACTIVATION_TYPE,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {},
  computed: {
    viewType() {
      return this.generalSetting[this.model.metaData.name].viewType;
    },
    activationType() {
      return this.generalSetting[this.model.metaData.name]
        .activationTypeTokens[0];
    },
    hasAdd() {
      return this.canAdd && this.model.metaData.privileges.add;
    },
    hasActive() {
      return this.model.metaData.privileges.active;
    },
    hasBlock() {
      return this.model.metaData.privileges.block;
    },
  },
  methods: {
    ...mapActions(["setCurrentLayerComponent", "setCurrentProps"]),

    // setAndOppenAdd() {
    //   this.setCurrentLayerComponent(this.model.metaData.components.Add.link);
    //   this.setCurrentProps({
    //     model: this.model,
    //     fullbackAction: this.addFullbackAction,
    //   });
    //   this.openBottomSheet(this.model.metaData.components.Add.refName);
    // },
    // setAndOppenFilter() {
    //   this.setCurrentLayerComponent(this.model.metaData.components.Filter.link);
    //   this.setCurrentProps({
    //     model: this.model,
    //     fullbackAction: this.filterFullbackAction,
    //   });
    //   this.openBottomSheet(this.model.metaData.components.Filter.refName);
    // },
    // setAndOppenSort() {
    //   this.setCurrentLayerComponent(this.model.metaData.components.Sort.link);
    //   this.setCurrentProps({
    //     model: this.model,
    //     fullbackAction: this.sortFullbackAction,
    //   });
    //   this.openBottomSheet(this.model.metaData.components.Sort.refName);
    // },

    updateView(viewType) {
      this.updateViewType(this.model.metaData.name, viewType);
    },

    updateActivation(activationType) {
      this.updateActivationTypeTokens(this.model.metaData.name, [
        activationType,
      ]);
      this.model.filterData.activationTypeTokens = [activationType];
      this.toggelActivationFullbackAction();
    },
  },
};
</script>

<style lang="scss"></style>

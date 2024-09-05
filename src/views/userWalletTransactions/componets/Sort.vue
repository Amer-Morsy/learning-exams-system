<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('general.sort')"
    :headerIcon="sortIcon"
    @opened="
      setOptions();
      setSortTokens();
    "
  >
    <div class="row">
      <b-form-group v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="sortTokensData"
          :options="options"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
        ></b-form-checkbox-group>
      </b-form-group>
    </div>
    <div class="form-actions">
      <div class="icon-submit" @click.prevent="changeSort">
        <img src="@/assets/images/check-icon.svg" :title="$t('search')" />
      </div>
      <div @click.prevent="closeBottomSheet(refName)" class="icon-cancel">
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import sortIcon from "@/assets/images/sort.svg";
import generalMixin from "@/utils/generalMixin";

export default {
  name: "UserWalletTransactionSort",
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
    return {
      sortIcon,
      options: [],
      sortTokensData: [],
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomBottomSheet,
  },
  computed: {
    refName() {
      return this.model.metaData.components.Sort.refName;
    },
    listSort() {
      return this.model.listSort;
    },
    sortTokens() {
      return this.model.filterData.sortTokens;
    },
  },
  methods: {
    // setOptions() {
    //   this.options = this.listSort.map((i) => {
    //     return { text: i.sortNameEn, value: i.sortToken };
    //   });
    // },
    setSortTokens() {
      this.sortTokensData = this.sortTokens;
    },
    changeSort() {
      this.model.filterData.sortTokens = this.sortTokensData;
      this.runFullbackAction();
      this.closeBottomSheet(this.refName);
    },
    runFullbackAction() {
      this.fullbackAction();
    },
  },
};
</script>

<style lang="scss"></style>

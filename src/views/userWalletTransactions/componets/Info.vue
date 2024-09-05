<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('UserWalletTransactions.data')"
    :headerIcon="headerIcon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userWalletTransaction.fullCode"
        :title="$t('UserWalletTransactions.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userWalletTransaction.userWalletTransactionTypeNameCurrent"
        :title="$t('general.type')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userWalletTransaction.userWalletTransactionValueWithCurreny"
        :title="$t('general.value')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userWalletTransaction.userWalletTransactionMethodNameCurrent"
        :title="$t('PaymentMethods.type')"
        :imgName="'paymentMethods.svg'"
      />

      <DataLabelGroup
        :className="'col-md-12'"
        :value="userWalletTransaction.userWalletTransactionNotes"
        :title="$t('general.notes')"
        :imgName="'notes.svg'"
      />
    </div>
    <div class="form-actions">
      <div @click.prevent="closeBottomSheet(refName)" class="icon-cancel">
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "../../../components/general/CustomBottomSheet.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import generalMixin from "./../../../utils/generalMixin";
import DataLabelGroup from "../../../components/previews/DataLabelGroup.vue";

export default {
  name: "UserWalletTransactionInfo",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),

    refName() {
      return this.model.metaData.components.Info.refName;
    },
    headerIcon() {
      return this.model.userWalletTransaction.icon;
    },
    userWalletTransaction() {
      return this.model.userWalletTransaction;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
  },
};
</script>

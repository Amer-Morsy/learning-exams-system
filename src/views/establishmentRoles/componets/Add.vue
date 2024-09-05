<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('EstablishmentRoles.add')"
    :headerIcon="headerIcon"
    :swipeAble="false"
    :clickToClose="false"
    @opened="establishmentRole.setInitialValue(userTypeToken)"
  >
    <div class="">
      <EstablishmentRoleForm
        :id="'add'"
        :establishmentRole="establishmentRole"
        @submitForm="add"
        @close="closeBottomSheet(refName)"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapActions } from "vuex";
import CustomBottomSheet from "../../../components/general/CustomBottomSheet.vue";
import EstablishmentRoleForm from "./Form.vue";
import generalMixin from "../../../utils/generalMixin";
import { objectToFormData } from "../../../utils/functions";
import apiEstablishmentRole from "../../../api/establishmentRoles/establishmentRole";

export default {
  name: "EstablishmentRoleAdd",
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
  components: {
    CustomBottomSheet,
    EstablishmentRoleForm,
  },
  computed: {
    refName() {
      return this.model.metaData.components.Add.refName;
    },
    establishmentRole() {
      return this.model.establishmentRole;
    },
    userTypeToken() {
      return this.model.establishmentRole.userTypeToken;
    },
    headerIcon() {
      return this.establishmentRole.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async add() {
      let formData = objectToFormData(this.establishmentRole);
      const response = await apiEstablishmentRole.add(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.runFullbackAction();
        this.closeBottomSheet(this.refName);
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

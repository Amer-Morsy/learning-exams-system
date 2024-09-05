<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('EstablishmentRoles.update')"
    :headerIcon="headerIcon"
  >
    <div class="">
      <EstablishmentRoleForm
        :key="refreshKey"
        :id="'update'"
        :deleteFileStatus="hasDeleteImage"
        :establishmentRole="establishmentRole"
        @submitForm="update"
        @deleteFile="deleteFile()"
        @close="closeBottomSheet(refName)"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import CustomBottomSheet from "../../../components/general/CustomBottomSheet.vue";
import EstablishmentRoleForm from "./Form.vue";
import generalMixin from "./../../../utils/generalMixin";
import { objectToFormData } from "./../../../utils/functions";
import apiEstablishmentRole from "../../../api/establishmentRoles/establishmentRole";

export default {
  name: "EstablishmentRoleUpdate",
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
      refreshKey: null,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    EstablishmentRoleForm,
    CustomBottomSheet,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),
    refName() {
      return this.model.metaData.components.Update.refName;
    },
    establishmentRole() {
      return this.model.establishmentRole;
    },
    hasDeleteImage() {
      return (
        this.model.metaData.privileges.deleteImage &&
        !this.establishmentRole.establishmentRoleImageIsDefault
      );
    },
    headerIcon() {
      return this.establishmentRole.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async update() {
      let formData = objectToFormData(this.establishmentRole);
      const response = await apiEstablishmentRole.update(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.closeBottomSheet(this.refName);
        this.runFullbackAction();
      } else {
        this.showMsg(response.data.msg);
      }
    },
    async deleteFile() {
      let formData = objectToFormData({
        token: this.establishmentRole.establishmentRoleToken,
        userTypeToken: this.establishmentRole.userTypeToken,
      });
      const response = await apiEstablishmentRole.deleteImage(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.establishmentRole.establishmentRoleImagePath = "";
        this.establishmentRole.establishmentRoleImageIsDefault = true;
        this.refreshKey = new Date();
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

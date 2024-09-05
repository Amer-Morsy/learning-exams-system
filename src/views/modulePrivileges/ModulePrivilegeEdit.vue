<template>
  <div class="page-container">
    <div class="pagination-with-content">
      <div class="row">
        <CustomSelectBox
          :className="'col-md-10 mt-3'"
          :id="'establishmentRoleToken'"
          :value="modulePrivileges.modulePrivilege.establishmentRoleToken"
          :options="establishmentRoleTokenOptions"
          :title="$t('EstablishmentRoles.select')"
          :imgName="'establishmentRole.svg'"
        />
      </div>

      <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

      <ModulePrivilegeForm
        v-if="hasData"
        :modulePrivilege="modulePrivileges.modulePrivilegeData"
        v-on:updateModulePrivilege="updateModulePrivilege($event)"
        :submitName="$t('general.edit')"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CustomSelectBox from "./../../components/inputs/CustomSelectBox.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import ModulePrivilegeForm from "./components/ModulePrivilegeForm.vue";
import ModulePrivileges from "./../../models/modulePrivileges/ModulePrivileges";
import apiPrivilege from "./../../api/privileges/privilege";
import { getEstablishmentRolesDialog } from "./../../utils/dialogsOfApi";
import generalMixin from "./../../utils/generalMixin";
// import { objectToFormData } from "./../../utils/functions";

export default {
  mixins: [generalMixin],
  components: {
    CustomSelectBox,
    ExceptionWithImg,
    ModulePrivilegeForm,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
    hasData() {
      return this.modulePrivileges.modulePrivilegeData.length != 0;
    },
  },
  data() {
    return {
      modulePrivileges: new ModulePrivileges(),
      establishmentRoleTokenOptions: [],
    };
  },
  props: {
    establishmentRoleToken: {
      type: String,
      default: "",
    },
    modelName: {
      type: String,
      default: "",
    },
  },
  methods: {
    async getEstablishmentRolesDialog() {
      this.establishmentRoleTokenOptions = await getEstablishmentRolesDialog(
        this.modelName
      );
    },

    async establishmentRoleChanged(data) {
      this.modulePrivileges.modulePrivilege.establishmentRoleToken = data;
      if (data) {
        await this.getModulePrivilegeDetails();
      } else {
        this.modulePrivileges.modulePrivilegeData = [];
      }
    },

    async getModulePrivilegeDetails() {
      this.modulePrivileges.modulePrivilegeData = [];
      try {
        let response = await apiPrivilege.getDetails({
          token: this.establishmentRoleToken,
        });
        if (response.data.status == this.STATUS.SUCCESS) {
          this.modulePrivileges.fillData(response.data);
        } else {
          this.exceptionMsg = response.data.msg;
        }
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
      }
    },

    async updateModulePrivilege(modulePrivilegeData) {
      // let formData = objectToFormData({
      //   modulePrivilegeData: modulePrivilegeData,
      // });

      try {
        const response = await apiPrivilege.update({
          userAuthorizeToken: this.userAuthorizeToken,
          establishmentRoleToken: this.establishmentRoleToken,
          modulePrivilegeData: modulePrivilegeData,
        });
        if (response.data.status == this.STATUS.SUCCESS) {
          this.modulePrivileges.modulePrivilege.setInitialValue();
          this.showMsg(response.data.msg, true);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
    },
  },
  async created() {
    if (this.establishmentRoleToken && this.modelName) {
      await this.establishmentRoleChanged(this.establishmentRoleToken);
      await this.getEstablishmentRolesDialog();
    } else {
      this.exceptionMsg = this.$t("UserValidSettings.select");
    }
  },
};
</script>

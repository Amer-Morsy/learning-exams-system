<template>
  <div class="page-container ">
    <div class="pagination-with-content">
      <UserSettingsTabs
        :key="userTypeToken"
        :userTypeToken="userTypeToken"
        :modelName="modelName"
      />

      <CustomPageHeader
        :model="establishmentRoles"
        :addFullbackAction="getAllEstablishmentRoles"
        :filterFullbackAction="getAllEstablishmentRoles"
        :sortFullbackAction="getAllEstablishmentRoles"
        :toggelActivationFullbackAction="getAllEstablishmentRoles"
      />
      <template v-if="hasData">
        <EstablishmentRoleTable
          v-if="viewType == VIEW_TYPES.table"
          :model="establishmentRoles"
          :updateFullbackAction="getAllEstablishmentRoles"
          :deleteFullbackAction="getAllEstablishmentRoles"
          :changeActivationFullbackAction="getAllEstablishmentRoles"
          @setEstablishmentRoleData="setEstablishmentRoleData($event)"
          :modelName="modelName"
        />
        <EstablishmentRoleCard
          v-if="viewType == VIEW_TYPES.cards"
          :model="establishmentRoles"
          :updateFullbackAction="getAllEstablishmentRoles"
          :deleteFullbackAction="getAllEstablishmentRoles"
          :changeActivationFullbackAction="getAllEstablishmentRoles"
          @setEstablishmentRoleData="setEstablishmentRoleData($event)"
          :modelName="modelName"
        />
        <EstablishmentRoleInfo :model="establishmentRoles" />
        <EstablishmentRoleUpdate
          :model="establishmentRoles"
          :fullbackAction="getAllEstablishmentRoles"
        />
        <EstablishmentRoleDelete
          :model="establishmentRoles"
          :fullbackAction="getAllEstablishmentRoles"
        />
        <ChangeActivationType
          :model="establishmentRoles"
          :fullbackAction="getAllEstablishmentRoles"
        />
        <CustomPagination
          :paginationData="establishmentRoles.filterData"
          @changePagination="changePagination($event)"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <EstablishmentRoleFilter
        :model="establishmentRoles"
        :fullbackAction="getAllEstablishmentRoles"
      />
      <EstablishmentRoleSort
        :model="establishmentRoles"
        :fullbackAction="getAllEstablishmentRoles"
      />
      <EstablishmentRoleAdd
        :model="establishmentRoles"
        :fullbackAction="getAllEstablishmentRoles"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EstablishmentRoles from "./../../models/establishmentRoles/EstablishmentRoles";
import apiEstablishmentRole from "./../../api/establishmentRoles/establishmentRole";
import generalMixin from "./../../utils/generalMixin";
import CustomPageHeader from "./../../components/general/CustomPageHeader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import UserSettingsTabs from "./../users/UserSettingsTabs.vue";
import EstablishmentRoleTable from "./componets/Table.vue";
import EstablishmentRoleCard from "./componets/Card.vue";
import EstablishmentRoleAdd from "./componets/Add.vue";
import EstablishmentRoleInfo from "./componets/Info.vue";
import EstablishmentRoleUpdate from "./componets/Update.vue";
import EstablishmentRoleDelete from "./componets/Delete.vue";
import ChangeActivationType from "./componets/ChangeActivationType.vue";
import CustomPagination from "./../../components/general/CustomPagination.vue";
import EstablishmentRoleFilter from "./componets/Filter.vue";
import EstablishmentRoleSort from "./componets/Sort.vue";

export default {
  name: "EstablishmentRolesComponent",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    userTypeToken: {
      type: String,
      default: "",
    },
    modelName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      establishmentRoles: new EstablishmentRoles(this.modelName),
    };
  },
  async created() {
    await this.updateFilterData();
    await this.getAllEstablishmentRoles();
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomPageHeader,
    UserSettingsTabs,
    EstablishmentRoleTable,
    EstablishmentRoleCard,
    EstablishmentRoleAdd,
    EstablishmentRoleInfo,
    EstablishmentRoleUpdate,
    EstablishmentRoleDelete,
    ChangeActivationType,
    CustomPagination,
    EstablishmentRoleSort,
    EstablishmentRoleFilter,
    ExceptionWithImg,
  },
  computed: {
    ...mapGetters(["generalSetting"]),
    hasData() {
      return this.establishmentRoles.establishmentRolesData.length != 0;
    },
    viewType() {
      return this.generalSetting[this.establishmentRoles.metaData.name]
        .viewType;
    },
  },
  methods: {
    changePagination(pagination) {
      this.establishmentRoles.filterData.fillData(pagination);
      this.getAllEstablishmentRoles();
    },
    setEstablishmentRoleData(establishmentRole) {
      this.establishmentRoles.establishmentRole.setInitialValue();
      this.establishmentRoles.establishmentRole.fillData(establishmentRole);
    },

    async updateFilterData() {
      this.establishmentRoles.filterData.activationTypeTokens = this.generalSetting[
        this.modelName
      ].activationTypeTokens;
      this.establishmentRoles.filterData.userTypeToken = this.userTypeToken;
      this.establishmentRoles.establishmentRole.userTypeToken = this.userTypeToken;
    },

    async getAllEstablishmentRoles() {
      try {
        this.establishmentRoles.establishmentRolesData = [];
        const response = await apiEstablishmentRole.getAll(
          this.establishmentRoles.filterData
        );
        if (response.data.status == this.STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == this.STATUS.NO_INTERNET) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noInternet.svg";
        } else if (response.data.status == this.STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.establishmentRoles.fillData(response.data);
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
  },
};
</script>

<style lang="scss"></style>

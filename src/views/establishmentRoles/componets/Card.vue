<template>
  <div class="row custom-cards" v-if="establishmentRolesData.length">
    <CustomCard
      v-for="(establishmentRole, index) in establishmentRolesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="establishmentRole.establishmentRoleNameCurrent"
      :description="establishmentRole.fullCode"
      :imagePath="establishmentRole.establishmentRoleImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          @click="
            setEstablishmentRoleData(establishmentRole);
            openBottomSheet(model.metaData.components.Info.refName);
          "
          :title="$t('general.info')"
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li v-if="hasUpdate">
        <button
          @click="
            setEstablishmentRoleData(establishmentRole);
            openBottomSheet(model.metaData.components.Update.refName);
          "
          :title="$t('general.edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="hasFinalDelete">
        <button
          v-b-modal="`${model.metaData.components.Delete.refName}`"
          :title="$t('general.delete')"
          @click="setEstablishmentRoleData(establishmentRole)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="hasChangeActivationType">
        <button
          v-b-modal="
            `${model.metaData.components.ChangeActivationType.refName}`
          "
          :title="$t('changeActivationType')"
          @click="setEstablishmentRoleData(establishmentRole)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li v-if="hasUpdate">
        <router-link
          :to="{
            name: 'Privileges',
            params: {
              establishmentRoleToken: establishmentRole.establishmentRoleToken,
              modelName: modelName,
            },
          }"
          :title="$t('Privileges.modelName')"
        >
          <img src="@/assets/images/establishmentRole.svg" />
        </router-link>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import { isDataExist, fullPathFileFromServer } from "../../../utils/functions";
import { mapActions } from "vuex";
import CustomCard from "../../../components/general/CustomCard.vue";
import generalMixin from "./../../../utils/generalMixin";

export default {
  name: "EstablishmentRoleCard",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
    updateFullbackAction: {
      type: Function,
    },
    deleteFullbackAction: {
      type: Function,
    },
    changeActivationFullbackAction: {
      type: Function,
    },
    modelName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: { CustomCard },
  computed: {
    establishmentRolesData() {
      return this.model.establishmentRolesData;
    },
    establishmentRole() {
      return this.model.establishmentRole;
    },
    filterData() {
      return this.model.filterData;
    },
    defaultImg() {
      return this.model.establishmentRole.defaultImg;
    },
    hasUpdate() {
      return this.model.metaData.privileges.update;
    },
    hasFinalDelete() {
      return this.model.metaData.privileges.finalDelete;
    },
    hasChangeActivationType() {
      return this.model.metaData.privileges.changeActivationType;
    },
  },
  methods: {
    ...mapActions([
      "setCurrentLayerComponent",
      "setCurrentProps",
      "setCurrentItemInAction",
      "showAppLayer",
    ]),

    isDataExist,
    fullPathFileFromServer,

    setEstablishmentRoleData(establishmentRole) {
      this.$emit("setEstablishmentRoleData", establishmentRole);
    },
  },
};
</script>

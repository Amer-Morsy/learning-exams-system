<template>
  <div class="table-container" v-if="establishmentRolesData.length">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("EstablishmentRoles.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(establishmentRole, index) in establishmentRolesData"
          :key="index"
        >
          <td>
            {{ ++index + filterData.currentIndex }}
          </td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  establishmentRole.establishmentRoleImagePath,
                  establishmentRole.defaultImg
                )
              "
              :onerror="`this.src='${establishmentRole.defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(establishmentRole.fullCode) }}</td>
          <td>
            {{ isDataExist(establishmentRole.establishmentRoleNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
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
                      establishmentRoleToken:
                        establishmentRole.establishmentRoleToken,
                      modelName: modelName,
                    },
                  }"
                  :title="$t('Privileges.modelName')"
                >
                  <img src="@/assets/images/establishmentRole.svg" />
                </router-link>
              </li>
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { isDataExist, fullPathFileFromServer } from "../../../utils/functions";
import { mapActions } from "vuex";
import FloatingMenu from "../../../components/general/FloatingMenu.vue";
import generalMixin from "../../../utils/generalMixin";

export default {
  name: "EstablishmentRoleTable",
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
  components: { FloatingMenu },
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

<style lang="scss"></style>

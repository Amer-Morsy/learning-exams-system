<template>
  <div class="table-container" v-if="userLoginCodesData.length">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("UserLoginCodes.data") }}</th>
          <th rowspan="2">{{ $t("UserLoginCodes.loginCode") }}</th>
          <th colspan="3">{{ $t("UserLoginCodes.codeIsActive") }}</th>
          <th rowspan="2">{{ $t("PlatFroms.modelName") }}</th>
          <th colspan="2">{{ $t("UserLoginCodes.loginCodeStatus") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("UserLoginCodes.codeIsActiveFrom") }}</th>
          <th>{{ $t("UserLoginCodes.codeIsActiveTo") }}</th>
          <th>{{ $t("UserLoginCodes.codeIsActiveDuration") }}</th>

          <th>{{ $t("UserLoginCodes.loginCodeStatusUsed") }}</th>
          <th>{{ $t("UserLoginCodes.loginCodeStatusExpired") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(userLoginCode, index) in userLoginCodesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  userLoginCode.userLoginCodeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(userLoginCode.fullCode) }}</td>
          <td>
            {{ isDataExist(userLoginCode.userLoginCodeNameCurrent) }}
          </td>
          <td>
            <span class="font-en">{{
              isDataExist(userLoginCode.loginCode)
            }}</span>
          </td>
          <td>
            {{
              formateDateTimeLang(
                userLoginCode.codeActiveFromDate,
                userLoginCode.codeActiveFromTime
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                userLoginCode.codeActiveToDate,
                userLoginCode.codeActiveToTime
              )
            }}
          </td>
          <td>{{ isDataExist(userLoginCode.codeActiveDurationCurrent) }}</td>
          <td>
            {{ isDataExist(userLoginCode.userLoginCodePlatFromNameCurrent) }}
          </td>
          <td>
            {{ userLoginCode.loginCodeIsUsedStatus ? $t("yes") : $t("no") }}
          </td>
          <td>
            {{ userLoginCode.loginCodeIsExpiredStatus ? $t("yes") : $t("no") }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setUserLoginCodeData(userLoginCode);
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
                    setUserLoginCodeData(userLoginCode);
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
                  @click="setUserLoginCodeData(userLoginCode)"
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
                  @click="setUserLoginCodeData(userLoginCode)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  isDataExist,
  fullPathFileFromServer,
  formateDateTimeLang,
} from "../../../utils/functions";
import { mapActions } from "vuex";
import FloatingMenu from "../../../components/general/FloatingMenu.vue";
import generalMixin from "../../../utils/generalMixin";

export default {
  name: "UserLoginCodeTable",
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
    userLoginCodesData() {
      return this.model.userLoginCodesData;
    },
    userLoginCode() {
      return this.model.userLoginCode;
    },
    filterData() {
      return this.model.filterData;
    },
    defaultImg() {
      return this.model.userLoginCode.defaultImg;
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
    formateDateTimeLang,

    setUserLoginCodeData(userLoginCode) {
      this.$emit("setUserLoginCodeData", userLoginCode);
    },
  },
};
</script>

<style lang="scss"></style>

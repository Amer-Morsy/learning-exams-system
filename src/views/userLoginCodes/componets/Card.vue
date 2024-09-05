<template>
  <div class="row custom-cards" v-if="userLoginCodesData.length">
    <CustomCard
      v-for="(userLoginCode, index) in userLoginCodesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="userLoginCode.userLoginCodeNameCurrent"
      :description="userLoginCode.fullCode"
      :imagePath="userLoginCode.userLoginCodeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
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
    </CustomCard>
  </div>
</template>

<script>
import { isDataExist, fullPathFileFromServer } from "../../../utils/functions";
import { mapActions } from "vuex";
import CustomCard from "../../../components/general/CustomCard.vue";
import generalMixin from "./../../../utils/generalMixin";

export default {
  name: "UserLoginCodeCard",
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

    setUserLoginCodeData(userLoginCode) {
      this.$emit("setUserLoginCodeData", userLoginCode);
    },
  },
};
</script>

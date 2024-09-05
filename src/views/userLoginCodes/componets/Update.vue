<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('UserLoginCodes.update')"
    :headerIcon="headerIcon"
    @opened="isRendered = true"
    @closed="isRendered = false"
  >
    <div class="">
      <UserLoginCodeForm
        :key="refreshKey"
        :id="'update'"
        :deleteFileStatus="hasDeleteImage"
        :userLoginCode="userLoginCode"
        :isRendered="isRendered"
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
import UserLoginCodeForm from "./Form.vue";
import generalMixin from "./../../../utils/generalMixin";
import { objectToFormData } from "./../../../utils/functions";
import apiUserLoginCode from "../../../api/userLoginCodes/userLoginCode";

export default {
  name: "UserLoginCodeUpdate",
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
      isRendered: false,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    UserLoginCodeForm,
    CustomBottomSheet,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),
    refName() {
      return this.model.metaData.components.Update.refName;
    },
    userLoginCode() {
      return this.model.userLoginCode;
    },
    hasDeleteImage() {
      return (
        this.model.metaData.privileges.deleteImage &&
        !this.userLoginCode.userLoginCodeImageIsDefault
      );
    },
    headerIcon() {
      return this.userLoginCode.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async update() {
      let formData = objectToFormData(this.userLoginCode);
      const response = await apiUserLoginCode.update(formData);
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
        token: this.userLoginCode.userLoginCodeToken,
        userTypeToken: this.userLoginCode.userTypeToken,
      });
      const response = await apiUserLoginCode.deleteImage(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.userLoginCode.userLoginCodeImagePath = "";
        this.userLoginCode.userLoginCodeImageIsDefault = true;
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

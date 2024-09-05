<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('Users.update')"
    :headerIcon="headerIcon"
    @opened="isRendered = true"
    @closed="isRendered = false"
  >
    <div class="">
      <UserForm
        :key="refreshKey"
        :id="'update'"
        :deleteFileStatus="hasDeleteImage"
        :user="user"
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
import UserForm from "./Form.vue";
import generalMixin from "./../../../utils/generalMixin";
import { objectToFormData } from "./../../../utils/functions";
import apiUser from "../../../api/users/user";

export default {
  name: "UserUpdate",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
    isRunFullBackAction: {
      type: Boolean,
      default: true,
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
    UserForm,
    CustomBottomSheet,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),
    refName() {
      return this.model.metaData.components.Update.refName;
    },
    user() {
      return this.model.user;
    },
    hasDeleteImage() {
      return (
        this.model.metaData.privileges.deleteImage &&
        !this.user.userImageIsDefault
      );
    },
    headerIcon() {
      return this.user.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async update() {
      let formData = objectToFormData(this.user);
      const response = await apiUser.update(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.closeBottomSheet(this.refName);
        if (this.isRunFullBackAction) this.runFullbackAction();
      } else {
        this.showMsg(response.data.msg);
      }
    },
    async deleteFile() {
      let formData = objectToFormData({
        token: this.user.userToken,
        userTypeToken: this.user.userTypeToken,
      });
      const response = await apiUser.deleteImage(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.user.userImagePath = "";
        this.user.userImageIsDefault = true;
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

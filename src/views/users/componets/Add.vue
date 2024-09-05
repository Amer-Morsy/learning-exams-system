<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('Users.add')"
    :headerIcon="headerIcon"
    :swipeAble="false"
    :clickToClose="false"
    @opened="
      user.setInitialValue(userTypeToken);
      isRendered = true;
    "
    @closed="isRendered = false"
  >
    <div class="">
      <UserForm
        :id="'add'"
        :user="user"
        :isRendered="isRendered"
        @submitForm="add"
        @close="closeBottomSheet(refName)"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapActions } from "vuex";
import CustomBottomSheet from "../../../components/general/CustomBottomSheet.vue";
import UserForm from "./Form.vue";
import generalMixin from "../../../utils/generalMixin";
import { objectToFormData } from "../../../utils/functions";
import apiUser from "../../../api/users/user";

export default {
  name: "UserAdd",
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
      isRendered: false,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomBottomSheet,
    UserForm,
  },
  computed: {
    refName() {
      return this.model.metaData.components.Add.refName;
    },
    user() {
      return this.model.user;
    },
    userTypeToken() {
      return this.model.user.userTypeToken;
    },
    headerIcon() {
      return this.user.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async add() {
      let formData = objectToFormData(this.user);
      const response = await apiUser.add(formData);
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

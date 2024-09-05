<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('UserLoginCodes.add')"
    :headerIcon="headerIcon"
    :swipeAble="false"
    :clickToClose="false"
    @opened="
      userLoginCode.setInitialValue(userTypeToken);
      isRendered = true;
    "
    @closed="isRendered = false"
  >
    <div class="">
      <UserLoginCodeForm
        :id="'add'"
        :userLoginCode="userLoginCode"
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
import UserLoginCodeForm from "./Form.vue";
import generalMixin from "../../../utils/generalMixin";
import { objectToFormData } from "../../../utils/functions";
import apiUserLoginCode from "../../../api/userLoginCodes/userLoginCode";

export default {
  name: "UserLoginCodeAdd",
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
    UserLoginCodeForm,
  },
  computed: {
    refName() {
      return this.model.metaData.components.Add.refName;
    },
    userLoginCode() {
      return this.model.userLoginCode;
    },
    userTypeToken() {
      return this.model.userLoginCode.userTypeToken;
    },
    headerIcon() {
      return this.userLoginCode.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async add() {
      let formData = objectToFormData(this.userLoginCode);
      const response = await apiUserLoginCode.add(formData);
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

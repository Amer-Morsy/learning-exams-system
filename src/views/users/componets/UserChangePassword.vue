<template>
  <b-modal :id="refName" scrollable centered hide-footer>
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/changePassword.svg" class="icon-lg" />
        {{ $t("changePassword") }}
      </h3>
    </template>
    <div class="row">
      <CustomInputPassword
        :className="'col-12'"
        :id="'UserChangePassword-userPassword'"
        :value="userPassword"
        v-on:changeValue="userPassword = $event"
        :title="$t('password')"
        :imgName="'passwordlock.svg'"
      />
      <CustomInputPassword
        :className="'col-12'"
        :id="'UserChangePassword-userPasswordConfirm'"
        :value="userPasswordConfirm"
        v-on:changeValue="userPasswordConfirm = $event"
        :title="$t('passwordConfirm')"
        :imgName="'passwordlock.svg'"
      />
    </div>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="changeUserPassword"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('UserChangePassword')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
import ExceptionWithImg from "../../../components/general/ExceptionWithImg.vue";
import CustomInputPassword from "../../../components/inputs/CustomInputPassword.vue";
import generalMixin from "../../../utils/generalMixin";
import apiUser from "../../../api/users/user";
import { getLanguage, objectToFormData } from "../../../utils/functions";

export default {
  name: "UserChangePassword",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    refName: {
      type: String,
      default: "UserChangePassword",
    },
    userToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      language: getLanguage(),
      userPassword: "User@1234",
      userPasswordConfirm: "User@1234",
      showPassword: true,
      showPasswordConfirm: true,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    ExceptionWithImg,
    CustomInputPassword,
  },
  computed: {
    ...mapGetters(["userPersonalData"]),
  },
  methods: {
    async changeUserPassword() {
      let userToken = this.userToken || this.userPersonalData.userToken;

      let formData = objectToFormData({
        language: this.language,
        userToken: userToken,
        userPassword: this.userPassword,
      });

      if (this.userPassword !== this.userPasswordConfirm) {
        this.showMsg(this.$t("twoPasswordsDoesNotMatched"));
      } else {
        const response = await apiUser.changeUserPassword(formData);

        if (response.data.status == this.STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("UserChangePassword");
          this.$emit("logout");
        } else {
          this.showMsg(response.data.msg);
        }
      }
    },
  },
};
</script>

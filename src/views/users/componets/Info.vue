<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('Users.data')"
    :headerIcon="headerIcon"
    @opened="getUserDetails()"
  >
    <ExceptionWithImg
      v-if="exceptionMsg"
      :msg="exceptionMsg"
      :image="exceptionImg"
    />
    <template v-else>
      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.fullCode"
          :title="$t('Users.code')"
          :imgName="'code.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userTypeNameCurrent"
          :title="$t('Users.type')"
          :imgName="'type.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userNameAr"
          :title="$t('general.nameAr')"
          :imgName="'user.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userNameEn"
          :title="$t('general.nameEn')"
          :imgName="'user.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6 phone-number'"
          :value="user.userPhoneWithCC"
          :title="$t('Users.phone')"
          :imgName="'phone.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userEmail"
          :title="$t('Users.email')"
          :imgName="'email.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userName"
          :title="$t('Users.userName')"
          :imgName="'user.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            user.establishmentRoleData
              ? user.establishmentRoleData.establishmentRoleNameCurrent
              : ''
          "
          :title="$t('EstablishmentRoles.name')"
          :imgName="'type.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.userGenderNameCurrent"
          :title="$t('Users.gender')"
          :imgName="'gender.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.userReligionNameCurrent"
          :title="$t('Users.religion')"
          :imgName="'religions.svg'"
        />
        <DataLabelGroup
          :className="'col-md-12'"
          :value="user.userProfileData.userGeneralNotes"
          :title="$t('general.notes')"
          :imgName="'notes.svg'"
        />
      </div>
      <div class="form-actions">
        <div @click.prevent="closeBottomSheet(refName)" class="icon-cancel">
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </template>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "../../../components/general/CustomBottomSheet.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import generalMixin from "./../../../utils/generalMixin";
import DataLabelGroup from "../../../components/previews/DataLabelGroup.vue";
import User from "./../../../models/users/User";
import apiUser from "./../../../api/users/user";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";

export default {
  name: "UserInfo",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      user: new User(),
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomBottomSheet,
    DataLabelGroup,
    ExceptionWithImg,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),

    userToken() {
      return this.model.user.userToken;
    },
    refName() {
      return this.model.metaData.components.Info.refName;
    },
    headerIcon() {
      return this.model.user.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    async getUserDetails() {
      try {
        const response = await apiUser.getDetails({
          token: this.userToken,
        });
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
        this.user.fillData(response.data.user);
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
  },
};
</script>

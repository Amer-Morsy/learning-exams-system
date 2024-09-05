<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('UserLoginCodes.data')"
    :headerIcon="headerIcon"
    @opened="getUserLoginCodeDetails()"
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
        :value="userLoginCode.fullCode"
        :title="$t('UserLoginCodes.code')"
        :imgName="'code.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.userLoginCodeNameAr"
        :title="$t('UserLoginCodes.nameAr')"
        :imgName="'UserLoginCodes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.userLoginCodeNameEn"
        :title="$t('UserLoginCodes.nameEn')"
        :imgName="'UserLoginCodes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.userLoginCodeDescriptionAr"
        :title="$t('UserLoginCodes.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.userLoginCodeDescriptionEn"
        :title="$t('UserLoginCodes.descriptionEn')"
        :imgName="'description.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.userLoginCodeNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.loginCode"
        :title="$t('UserLoginCodes.loginCode')"
        :imgName="'UserLoginCodes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userLoginCode.userLoginCodePlatFromNameCurrent"
        :title="$t('PlatFroms.modelName')"
        :imgName="'type.svg'"
      />

      <DataLabelGroup
        :className="'col-md-4'"
        :value="
          formateDateTimeLang(
            userLoginCode.codeActiveFromDate,
            userLoginCode.codeActiveFromTime
          )
        "
        :title="
          $t('UserLoginCodes.codeIsActive') +
          ' ' +
          $t('UserLoginCodes.codeIsActiveFrom')
        "
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-md-4'"
        :value="
          formateDateTimeLang(
            userLoginCode.codeActiveToDate,
            userLoginCode.codeActiveToTime
          )
        "
        :title="
          $t('UserLoginCodes.codeIsActive') +
          ' ' +
          $t('UserLoginCodes.codeIsActiveTo')
        "
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-md-4'"
        :value="userLoginCode.codeActiveDurationCurrent"
        :title="$t('UserLoginCodes.codeIsActiveDuration')"
        :imgName="'dateAndTime.svg'"
      />

      <CustomCheckbox
        :className="'col-md-4'"
        :value="userLoginCode.codeIsActiveUnTileUserSignOut"
        :title="$t('UserLoginCodes.codeIsActiveUnTileUserSignOut')"
        :showAsInfo="true"
      />
      <CustomCheckbox
        :className="'col-md-4'"
        :value="userLoginCode.loginCodeIsUsedStatus"
        :title="`${$t('UserLoginCodes.loginCodeStatus')} [${$t(
          'UserLoginCodes.loginCodeStatusUsed'
        )}]`"
        :showAsInfo="true"
      />
      <CustomCheckbox
        :className="'col-md-4'"
        :value="userLoginCode.loginCodeIsExpiredStatus"
        :title="`${$t('UserLoginCodes.loginCodeStatus')} [${$t(
          'UserLoginCodes.loginCodeStatusExpired'
        )}]`"
        :showAsInfo="true"
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
import CustomCheckbox from "../../../components/inputs/CustomCheckbox.vue";
import DataLabelGroup from "../../../components/previews/DataLabelGroup.vue";
import UserLoginCode from "./../../../models/userLoginCodes/UserLoginCode";
import apiUserLoginCode from "./../../../api/userLoginCodes/userLoginCode";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import { formateDateTimeLang } from "./../../../utils/functions";

export default {
  name: "UserLoginCodeInfo",
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
      userLoginCode: new UserLoginCode(),
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomBottomSheet,
    CustomCheckbox,
    DataLabelGroup,
    ExceptionWithImg,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),

    userLoginCodeToken() {
      return this.model.userLoginCode.userLoginCodeToken;
    },
    refName() {
      return this.model.metaData.components.Info.refName;
    },
    headerIcon() {
      return this.model.userLoginCode.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
    formateDateTimeLang,

    async getUserLoginCodeDetails() {
      try {
        const response = await apiUserLoginCode.getDetails({
          token: this.userLoginCodeToken,
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
        this.userLoginCode.fillData(response.data.userLoginCode);
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
  },
};
</script>

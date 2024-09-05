<template>
  <b-modal :id="refName" scrollable centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/changeActivationType.svg" class="icon-lg" />
        {{ $t("changeActivationType") }}
      </h3>
    </template>

    <h4 class="text-center">
      (
      <span class="co-red">
        {{ educationalCourseLevel.educationalCourseLevelNameCurrent }}
      </span>
      )
    </h4>

    <div class="row">
      <CustomSelectBox
        :className="'col-12'"
        :id="'activationTypeToken'"
        :value="model.educationalCourseLevel.activationTypeToken"
        :options="activationTypesTokensOptions"
        v-on:changeValue="
          model.educationalCourseLevel.activationTypeToken = $event
        "
        :title="$t('general.selectActivationType')"
        :imgName="'changeActivationType.svg'"
        :imgStatus="true"
      />
    </div>

    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="changeActivationType"
      >
        {{ $t("ok") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide(refName)"
      >
        {{ $t("cancel") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import CustomSelectBox from "./../../../../components/inputs/CustomSelectBox.vue";
import { STATUS } from "./../../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../../utils/constantLists";
import { objectToFormData } from "./../../../../utils/functions";
import { getDialogOfActivationTypes } from "./../../../../utils/dialogsOfConstantsLists";
import apiEducationalCourseLevel from "../../../../api/educationals/educationalCourseLevels/educationalCourseLevel";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "ChangeActivationType",
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
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: { CustomSelectBox },
  computed: {
    educationalCourseLevel() {
      return this.model.educationalCourseLevel;
    },
    refName() {
      return this.model.metaData.components.ChangeActivationType.refName;
    },
    hasActive() {
      return this.model.metaData.privileges.active;
    },
    hasBlock() {
      return this.model.metaData.privileges.block;
    },
    activationTypesTokensOptions: function() {
      let arr = [];
      if (this.hasActive) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        if (obj) arr.push(obj);
      }

      if (this.hasBlock) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  methods: {
    async changeActivationType() {
      let formData = objectToFormData({
        token: this.educationalCourseLevel.educationalCourseLevelToken,
        activationTypeToken: this.educationalCourseLevel.activationTypeToken,
      });
      const response = await apiEducationalCourseLevel.changeActivationType(
        formData
      );
      if (response.data.status == STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.$bvModal.hide(this.refName);
        this.runFullbackAction();
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

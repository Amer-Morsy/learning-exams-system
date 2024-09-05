<template>
  <b-modal :id="refName" scrollable centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/alert.svg" class="icon-lg" />
        {{ $t("alert") }}
      </h3>
    </template>
    <h4 class="text-center">
      {{ $t("areYouSureToDeleteStart") }}
      <span class="co-red">{{
        questionBankTitle.questionBankTitleNameCurrent
      }}</span>
      {{ $t("areYouSureToDeleteEnd") }}
    </h4>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="deleteQuestionBankTitle"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide(refName)"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import generalMixin from "../../../../../utils/generalMixin";
import { objectToFormData } from "../../../../../utils/functions";
import apiQuestionBankTitle from "../../../../../api/additional/educational/questionBankTitles/questionBankTitle";

export default {
  name: "QuestionBankTitleDelete",
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
      // questionBankTitle: new QuestionBankTitle(),
    };
  },
  created() {
    // this.questionBankTitle.fillData(this.currentItemInAction);
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {},
  computed: {
    questionBankTitle() {
      return this.model.questionBankTitle;
    },
    refName() {
      return this.model.metaData.components.Delete.refName;
    },
  },
  methods: {
    async deleteQuestionBankTitle() {
      let formData = objectToFormData({
        token: this.questionBankTitle.questionBankTitleToken,
      });
      try {
        let response = await apiQuestionBankTitle.finalDelete(formData);
        if (response.data.status == this.STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.runFullbackAction();
          this.$bvModal.hide(this.refName);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
    },
    runFullbackAction() {
      this.fullbackAction();
    },
  },
};
</script>

<style lang="scss"></style>

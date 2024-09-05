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
      <span class="co-red">{{ question.questionTitle }}</span>
      {{ $t("areYouSureToDeleteEnd") }}
    </h4>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="deleteQuestion"
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
import apiQuestion from "../../../../../api/additional/educational/questions/question";

export default {
  name: "QuestionDelete",
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
      // question: new Question(),
    };
  },
  created() {
    // this.question.fillData(this.currentItemInAction);
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {},
  computed: {
    question() {
      return this.model.question;
    },
    refName() {
      return this.model.metaData.components.Delete.refName;
    },
  },
  methods: {
    async deleteQuestion() {
      let formData = objectToFormData({
        token: this.question.questionToken,
      });
      try {
        let response = await apiQuestion.finalDelete(formData);
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

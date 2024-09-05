<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('general.sort')"
    :headerIcon="sortIcon"
    @opened="getEducationalCourseLevelsDialog()"
  >
    <div class="">
      <form class="" autocomplete="off">
        <div class="row">
          <CustomSortable
            v-if="sortList.length"
            :className="'col-md-11'"
            :list="sortList"
            @changeValue="sortList = $event"
            :canRemove="false"
          />
        </div>

        <div class="form-actions">
          <div class="icon-submit" @click.prevent="changeSort">
            <img src="@/assets/images/check-icon.svg" />
          </div>
          <div @click="closeBottomSheet(refName)" class="icon-cancel">
            <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
          </div>
        </div>
      </form>
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapGetters } from "vuex";
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import CustomSortable from "./../../../../components/inputs/CustomSortable.vue";
import sortIcon from "@/assets/images/sort.svg";
import generalMixin from "@/utils/generalMixin";
import { getEducationalCourseLevelsDialog } from "./../../../../utils/dialogsOfApi";
import apiEducationalCourseLevel from "../../../../api/educationals/educationalCourseLevels/educationalCourseLevel";

export default {
  name: "EducationalCourseLevelSort",
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
      sortIcon,
      educationalCourseLevelTokenOptions: [],
      sortList: [],
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomBottomSheet,
    CustomSortable,
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),

    refName() {
      return this.model.metaData.components.ReSort.refName;
    },
    educationalCourseToken() {
      return this.model.educationalCourseLevel.educationalCourseToken;
    },
    educationalCourseLevelsTokens() {
      return this.sortList.map((x) => x.value);
    },
  },
  methods: {
    async changeSort() {
      const response = await apiEducationalCourseLevel.changeSort({
        userAuthorizeToken: this.userAuthorizeToken,
        educationalCourseToken: this.educationalCourseToken,
        educationalCourseLevelsTokens: this.educationalCourseLevelsTokens,
      });
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.closeBottomSheet(this.refName);
        this.runFullbackAction();
      } else {
        this.showMsg(response.data.msg);
      }
    },
    runFullbackAction() {
      this.fullbackAction();
    },
    async getEducationalCourseLevelsDialog() {
      this.sortList = [];
      let params = {
        educationalCourseToken: this.educationalCourseToken,
      };
      this.educationalCourseLevelTokenOptions =
        await getEducationalCourseLevelsDialog(params);
      this.sortList = this.educationalCourseLevelTokenOptions;
    },
  },
};
</script>

<style lang="scss"></style>

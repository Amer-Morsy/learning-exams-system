<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('general.filter')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-11'"
        :id="`educationalCourseLevelToken`"
        :value="model.filterData.educationalCourseLevelToken"
        :options="educationalCourseLevelTokenOptions"
        v-on:changeValue="
          model.filterData.educationalCourseLevelToken = $event;
          setItemSelected();
        "
        :title="$t('EducationalCourseLevels.select')"
        :imgName="'EducationalCourseLevels.svg'"
      />
      <CustomSelectBox
        v-if="!isTeacherLogged"
        :className="'col-md-11'"
        :id="`educationalCourseLevelsModel-filter-ownerUserToken`"
        :value="educationalCourseLevelsModel.filterData.ownerUserToken"
        :options="userTokenOptions"
        v-on:changeValue="
          educationalCourseLevelsModel.filterData.ownerUserToken = $event
        "
        :title="$t('Users.select')"
        :imgName="'user.svg'"
      />
      <CustomBaseEntityFilter
        :className="'row'"
        :value="model.filterData"
        v-on:changeValue="model.filterData.fillData($event)"
      />
    </div>

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="search">
        <img src="@/assets/images/search-icon.svg" :title="$t('search')" />
      </div>
      <div @click.prevent="closeBottomSheet(refName)" class="icon-cancel">
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import { mapGetters } from "vuex";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import CustomSelectBox from "./../../../../components/inputs/CustomSelectBox.vue";
import CustomBaseEntityFilter from "./../../../../components/general/CustomBaseEntityFilter.vue";
import generalMixin from "./../../../../utils/generalMixin";
import icon from "@/assets/images/filter.svg";
import { USER_TYPE } from "./../../../../utils/constantLists";
import { USER_MODEL_NAME } from "./../../../../utils/constants";
import {
  getEducationalCourseLevelsDialogCustom,
  getUsersDialog,
} from "./../../../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin],
  props: {
    model: {
      type: Object,
      default: null,
    },
    educationalCourseLevelsModel: {
      type: Object,
      default: null,
    },
    fullbackAction: {
      type: Function,
    },
  },
  data() {
    return {
      icon,
      educationalCourseLevelTokenOptions: [],
      userTokenOptions: [],
    };
  },
  async created() {
    await this.getEducationalCourseLevelsDialog();
    this.setItemSelected();
    this.getTeachersDialog();
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
    CustomBaseEntityFilter,
  },
  computed: {
    ...mapGetters(["isTeacherLogged"]),
    refName() {
      return this.model.metaData.components.Filter.refName;
    },
  },
  methods: {
    async getEducationalCourseLevelsDialog() {
      this.educationalCourseLevelTokenOptions = await getEducationalCourseLevelsDialogCustom();
    },
    async getTeachersDialog() {
      let params = {
        modelName: USER_MODEL_NAME.Teacher,
        userTypeToken: USER_TYPE.Teacher,
      };
      this.userTokenOptions = await getUsersDialog(params);
    },
    setItemSelected() {
      let item = this.educationalCourseLevelTokenOptions.filter((el) => {
        if (el.value == this.model.filterData.educationalCourseLevelToken) {
          return el;
        }
      });
      if (item.length) {
        this.educationalCourseLevelsModel.educationalCourseLevel.fillData(
          item[0]["educationalCourseLevel"]
        );
      } else {
        this.educationalCourseLevelsModel.educationalCourseLevel.setInitialValue();
      }
    },
    search() {
      this.closeBottomSheet(this.refName);
      this.runFullbackAction();
    },
    runFullbackAction() {
      this.fullbackAction();
    },
  },
};
</script>

<template>
  <CustomBottomSheet
    :refName="refName"
    size="xl"
    :headerText="$t('general.filter')"
    :headerIcon="icon"
  >
    <!-- @opened="getEducationalCategoriesDialog()" -->
    <div class="row">
      <CustomSelectBox
        :className="'col-md-11'"
        :id="`filter-educationalCategoryToken`"
        :value="model.filterData.educationalCategoryToken"
        :options="educationalCategoryTokenOptions"
        v-on:changeValue="
          model.filterData.educationalCategoryToken = $event;
          setItemSelected();
        "
        :title="$t('EducationalCategories.select')"
        :imgName="'EducationalCategories.svg'"
      />
      <CustomSelectBox
        :className="'col-md-11'"
        :id="`filter-userTeacherToken`"
        :value="model.filterData.userTeacherToken"
        :options="userTokenOptions"
        v-on:changeValue="model.filterData.userTeacherToken = $event"
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
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import CustomBaseEntityFilter from "./../../../../components/general/CustomBaseEntityFilter.vue";
import CustomSelectBox from "./../../../../components/inputs/CustomSelectBox.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { USER_TYPE } from "./../../../../utils/constantLists";
import { USER_MODEL_NAME } from "./../../../../utils/constants";
import icon from "@/assets/images/filter.svg";
import {
  getEducationalCategoriesDialogCustomize,
  getUsersDialog,
} from "./../../../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin],
  props: {
    model: {
      type: Object,
      default: null,
    },
    educationalCategoriesModel: {
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
      educationalCategoryTokenOptions: [],
      userTokenOptions: [],
    };
  },
  async created() {
    await this.getEducationalCategoriesDialog();
    this.setItemSelected();
    this.getTeachersDialog();
  },
  components: {
    CustomBottomSheet,
    CustomBaseEntityFilter,
    CustomSelectBox,
  },

  computed: {
    refName() {
      return this.model.metaData.components.Filter.refName;
    },
  },
  methods: {
    async getEducationalCategoriesDialog() {
      let params = {
        parentEducationalCategoryToken:
          this.model.filterData.parentEducationalCategoryToken,
        getOnlyParentEducationalCategories:
          this.model.filterData.getOnlyParentEducationalCategories,
        getOnlyChildEducationalCategories:
          this.model.filterData.getOnlyChildEducationalCategories,
      };
      this.educationalCategoryTokenOptions =
        await getEducationalCategoriesDialogCustomize(params);
    },
    async getTeachersDialog() {
      let params = {
        modelName: USER_MODEL_NAME.Teacher,
        userTypeToken: USER_TYPE.Teacher,
      };
      this.userTokenOptions = await getUsersDialog(params);
    },
    setItemSelected() {
      let item = this.educationalCategoryTokenOptions.filter((el) => {
        if (el.value == this.model.filterData.educationalCategoryToken) {
          return el;
        }
      });
      if (item.length) {
        this.educationalCategoriesModel.educationalCategory.fillData(
          item[0]["educationalCategory"]
        );
      } else {
        this.educationalCategoriesModel.educationalCategory.setInitialValue();
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

<template>
  <div class="">
    <form class="" autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="educationalCourse.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              educationalCourse.educationalCourseImagePath,
              educationalCourse.defaultImg
            )
          "
          :deleteFileStatus="deleteFileStatus"
          @deleteFile="$emit('deleteFile')"
        />
      </div>
      <div class="row">
        <!-- educationalCategoryToken -->
        <!-- <template>
          <div class="my-card row">
            <div class="col-8">
              <h6>
                {{ $t("general.selected") }}
                {{ selectedEducationalCategoryName }}
              </h6>
            </div>
            <div v-if="showOld" class="col-4">
              <span
                @click="
                  loadOldList = true;
                  showOld = false;
                "
              >
                {{ $t("general.previus") }}</span
              >
            </div>
            <span class="my-card-title">
              {{ $t("EducationalCategories.select") }}
            </span>

            <div class="table-container">
              <table class="my-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th class="cell-lg">
                      {{ $t("EducationalCategories.name") }}
                    </th>
                    <th>
                      {{ $t("Questions.rightAnswer") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="educationalCategoryTokenOptions.length == 0">
                    <tr>
                      <th colspan="3">
                        {{ $t("general.noData") }}
                      </th>
                    </tr>
                  </template>
                  <template v-else>
                    <tr
                      v-for="(item, index) in educationalCategoryTokenOptions"
                      :key="index"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>
                        {{ item.text }}
                      </td>
                      <td>
                        <CustomCheckbox
                          :id="`${id}-table-${index}-answerIsTrue`"
                          :value="item.isSelected"
                          v-on:changeValue="
                            item.isSelected = $event;
                            selectedChanged($event, item, index);
                          "
                          :centerStatus="true"
                          :withOutTitle="true"
                        />
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </template> -->
        <!-- <template>
          <CustomSelectBox
            :className="'col-md-11'"
            :id="`${id}-educationalCategoryToken`"
            :errors="errors_educationalCategoryToken"
            :value="educationalCourse.educationalCategoryToken"
            :options="apiEducationalCategoryTokenOptions"
            v-on:changeValue="
              educationalCourse.educationalCategoryToken = $event;
              $v.educationalCourse.educationalCategoryToken.$touch();
            "
            :title="$t('EducationalCategories.select')"
            :imgName="'EducationalCategories.svg'"
          />
        </template> -->
        <CustomInputInt
          :className="'col-md-6'"
          :id="`${id}-educationalCourseInitialCountLevels`"
          :value="educationalCourse.educationalCourseInitialCountLevels"
          v-on:changeValue="
            educationalCourse.educationalCourseInitialCountLevels = $event
          "
          :title="$t('EducationalCourses.initialCountLevels')"
          :imgName="'number.svg'"
          :isDisabled="isDisabled"
        />
        <CustomInputFloat
          :className="'col-md-6'"
          :id="`${id}-educationalCoursePrice`"
          :value="educationalCourse.educationalCoursePrice"
          v-on:changeValue="educationalCourse.educationalCoursePrice = $event"
          :title="$t('general.priceOrigin')"
          :imgName="'money.svg'"
        />
        <CustomInputFloat
          :className="'col-md-6'"
          :id="`${id}-educationalCoursePriceInOffer`"
          :value="educationalCourse.educationalCoursePriceInOffer"
          v-on:changeValue="
            educationalCourse.educationalCoursePriceInOffer = $event
          "
          :title="$t('general.priceInOffer')"
          :imgName="'money.svg'"
        />
        <CustomCheckbox
          :className="'col-md-6'"
          :value="educationalCourse.educationalCoursePriceOfferStatus"
          v-on:changeValue="
            educationalCourse.educationalCoursePriceOfferStatus = $event
          "
          :title="$t('general.offerActiveStatus')"
        />
        <CustomInput
          :className="'col-md-6'"
          :id="`${id}-educationalCourseNameAr`"
          :errors="errors_educationalCourseNameAr"
          :value="educationalCourse.educationalCourseNameAr"
          v-on:changeValue="
            educationalCourse.educationalCourseNameAr = $event;
            $v.educationalCourse.educationalCourseNameAr.$touch();
          "
          :title="$t('general.nameAr')"
          :imgName="'EducationalCourses.svg'"
        />
        <CustomInput
          :className="'col-md-6'"
          :id="`${id}-educationalCourseNameEn`"
          :errors="errors_educationalCourseNameEn"
          :value="educationalCourse.educationalCourseNameEn"
          v-on:changeValue="
            educationalCourse.educationalCourseNameEn = $event;
            $v.educationalCourse.educationalCourseNameEn.$touch();
          "
          :title="$t('general.nameEn')"
          :imgName="'EducationalCourses.svg'"
        />
        <TextArea
          :className="'col-md-6'"
          :id="`${id}-educationalCourseDescriptionAr`"
          :errors="errors_educationalCourseDescriptionAr"
          :value="educationalCourse.educationalCourseDescriptionAr"
          v-on:changeValue="
            educationalCourse.educationalCourseDescriptionAr = $event;
            $v.educationalCourse.educationalCourseDescriptionAr.$touch();
          "
          :title="$t('general.descriptionAr')"
          :imgName="'description.svg'"
        />
        <TextArea
          :className="'col-md-6'"
          :id="`${id}-educationalCourseDescriptionEn`"
          :errors="errors_educationalCourseDescriptionEn"
          :value="educationalCourse.educationalCourseDescriptionEn"
          v-on:changeValue="
            educationalCourse.educationalCourseDescriptionEn = $event;
            $v.educationalCourse.educationalCourseDescriptionEn.$touch();
          "
          :title="$t('general.descriptionEn')"
          :imgName="'description.svg'"
        />

        <TextArea
          :className="'col-md-12'"
          :id="`${id}-educationalCourseNotes`"
          :value="educationalCourse.educationalCourseNotes"
          v-on:changeValue="educationalCourse.educationalCourseNotes = $event"
          :title="$t('general.notes')"
          :imgName="'notes.svg'"
        />
      </div>

      <div class="form-actions">
        <div class="icon-submit" @click.prevent="submitForm">
          <img src="@/assets/images/check-icon.svg" />
        </div>
        <div @click="$emit('close')" class="icon-cancel">
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CustomInput from "../../../../components/inputs/CustomInput.vue";
import CustomInputInt from "../../../../components/inputs/CustomInputInt.vue";
import CustomInputFloat from "../../../../components/inputs/CustomInputFloat.vue";
import CustomCheckbox from "../../../../components/inputs/CustomCheckbox.vue";
// import CustomSelectBox from "../../../../components/inputs/CustomSelectBox.vue";
import CustomFileInput from "../../../../components/inputs/CustomFileInput.vue";
import TextArea from "../../../../components/inputs/TextArea.vue";
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { getEducationalCategoriesDialogCustomize } from "./../../../../utils/dialogsOfApi";
import generalMixin from "../../../../utils/generalMixin";

export default {
  name: "EducationalCourseForm",
  mixins: [validationMixin, generalMixin],
  beforeCreate() {},
  props: {
    id: {
      type: String,
      default: "id",
    },
    deleteFileStatus: {
      type: Boolean,
      default: false,
    },
    educationalCourse: {
      type: Object,
    },
  },
  validations: {
    educationalCourse: {
      educationalCourseNameAr: { required, isValidNameAr },
      educationalCourseNameEn: { required, isValidNameEn },
      educationalCourseDescriptionAr: { isValidTextAr },
      educationalCourseDescriptionEn: { isValidTextEn },
      educationalCategoryToken: { required },
    },
  },
  data() {
    return {
      // apiEducationalCategoryTokenOptions: [],
      // selectedEducationalCategoryToken: "",
      // selectedEducationalCategoryName: "",
      // selectedIsHaveChild: false,
      // loadOldList: false,
      // showOld: false,
      // oldList: [],
    };
  },
  async created() {
    // await this.getEducationalCategoriesDialog();
    // if (!this.oldList.length) {
    //   this.oldList = this.apiEducationalCategoryTokenOptions;
    // }
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomInput,
    CustomInputInt,
    CustomInputFloat,
    CustomCheckbox,
    // CustomSelectBox,
    CustomFileInput,
    TextArea,
  },
  computed: {
    isDisabled() {
      return this.id == "update";
    },
    // educationalCategoryTokenOptions() {
    //   let list = [];
    //   if (this.loadOldList) {
    //     list = this.oldList;
    //   } else {
    //     list = this.apiEducationalCategoryTokenOptions;
    //   }
    //   return list;
    // },
    // paramsEducationalCategory() {
    //   let params = {
    //     parentEducationalCategoryToken: this.selectedEducationalCategoryToken,
    //     getOnlyParentEducationalCategories: true,
    //     getOnlyChildEducationalCategories: false,
    //   };
    //   if (this.selectedIsHaveChild) {
    //     params.getOnlyParentEducationalCategories = false;
    //     params.getOnlyChildEducationalCategories = true;
    //   }
    //   return params;
    // },
    // errors_educationalCategoryToken() {
    //   let errors = [];
    //   if (this.$v.educationalCourse.educationalCategoryToken.$error) {
    //     if (!this.$v.educationalCourse.educationalCategoryToken.required)
    //       errors.push(this.$t("validation.fieldIsRequired"));
    //   }
    //   return errors;
    // },
    errors_educationalCourseNameAr() {
      let errors = [];
      if (this.$v.educationalCourse.educationalCourseNameAr.$error) {
        if (
          !this.$v.educationalCourse.educationalCourseNameAr.required &&
          !this.$v.educationalCourse.educationalCourseNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.educationalCourse.educationalCourseNameAr.required &&
          !this.$v.educationalCourse.educationalCourseNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalCourseNameEn() {
      let errors = [];
      if (this.$v.educationalCourse.educationalCourseNameEn.$error) {
        if (
          !this.$v.educationalCourse.educationalCourseNameAr.required &&
          !this.$v.educationalCourse.educationalCourseNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.educationalCourse.educationalCourseNameEn.required &&
          !this.$v.educationalCourse.educationalCourseNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_educationalCourseDescriptionAr() {
      let errors = [];
      if (this.$v.educationalCourse.educationalCourseDescriptionAr.$error) {
        if (
          !this.$v.educationalCourse.educationalCourseDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalCourseDescriptionEn() {
      let errors = [];
      if (this.$v.educationalCourse.educationalCourseDescriptionEn.$error) {
        if (
          !this.$v.educationalCourse.educationalCourseDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    fullPathFileFromServer,
    // async selectedChanged(status, item, index) {
    //   if (status) {
    //     console.log(item, index);
    //     this.selectedEducationalCategoryToken = item.value;
    //     this.selectedEducationalCategoryName = item.text;
    //     this.selectedIsHaveChild = item.isHaveChild;
    //     if (!this.loadOldList) {
    //       this.oldList = this.apiEducationalCategoryTokenOptions;
    //     }

    //     await this.getEducationalCategoriesDialog();

    //     this.showOld = true;
    //     this.loadOldList = false;
    //   } else {
    //     console.log(status, item, index);
    //     this.selectedEducationalCategoryToken = "";
    //     this.selectedEducationalCategoryName = "";
    //     this.selectedIsHaveChild = false;
    //   }
    // },
    isValidRangeInitialCountLevels(v) {
      if (v == 0 || v > 26) {
        return false;
      } else {
        return true;
      }
    },
    isValidRangeCoursePrice(v) {
      if (v <= 19 || v >= 1000000000) {
        return false;
      } else {
        return true;
      }
    },
    isValidRangeCoursePriceInOffer(v) {
      if (v <= 19 || v >= 1000000000) {
        return false;
      } else {
        return true;
      }
    },
    async getEducationalCategoriesDialog() {
      let params = this.paramsEducationalCategory;
      this.apiEducationalCategoryTokenOptions = await getEducationalCategoriesDialogCustomize(
        params
      );
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.educationalCourse.educationalCourseNameAr.required &&
          this.$v.educationalCourse.educationalCourseNameAr.isValidNameAr) ||
          (this.$v.educationalCourse.educationalCourseNameEn.required &&
            this.$v.educationalCourse.educationalCourseNameEn.isValidNameEn)) &&
        this.$v.educationalCourse.educationalCourseDescriptionAr
          .isValidTextAr &&
        this.$v.educationalCourse.educationalCourseDescriptionEn
          .isValidTextEn &&
        this.$v.educationalCourse.educationalCategoryToken.required
      ) {
        let errors = false;
        console.log("xx");
        if (
          !this.isValidRangeInitialCountLevels(
            this.educationalCourse.educationalCourseInitialCountLevels
          )
        ) {
          errors = true;
          this.showMsg(
            this.$t("EducationalCourses.isValidRangeInitialCountLevels")
          );
        }
        if (
          !this.isValidRangeCoursePrice(
            this.educationalCourse.educationalCoursePrice
          )
        ) {
          errors = true;
          this.showMsg(this.$t("EducationalCourses.isValidRangeCoursePrice"));
        }
        if (this.educationalCourse.educationalCoursePriceOfferStatus) {
          if (
            !this.isValidRangeCoursePriceInOffer(
              this.educationalCourse.educationalCoursePriceInOffer
            )
          ) {
            errors = true;
            this.showMsg(this.$t("EducationalCourses.isValidRangeCoursePrice"));
          }
        }
        if (!errors) this.$emit("submitForm");
      }
    },
  },
};
</script>

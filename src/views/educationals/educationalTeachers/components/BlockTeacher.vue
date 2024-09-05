<template>
  <CustomBottomSheet
    :refName="'BlockTeacher'"
    size="xl"
    :headerText="$t('general.block')"
    :headerIcon="blockIcon"
    @opened="
      getUserDetails();
      getEducationalCategoryDetails();
    "
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
          :value="user.userNameCurrent"
          :title="$t('general.name')"
          :imgName="'teacher.svg'"
        />
      </div>
      <form class="" autocomplete="off">
        <div class="row">
          <div class="col-6">
            <!-- options banned list -->
            <template>
              <!-- OptionsBannedList -->
              <b-button
                v-b-toggle="`OptionsBannedList`"
                class="btn btn-lg btn-collapse arrow-end"
              >
                <span>{{ $t("general.options") }} </span>
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </b-button>
              <b-collapse :id="`OptionsBannedList`">
                <div class="row data-collapse">
                  <div :key="reRenderKey" class="row">
                    <template>
                      <div class="my-card row">
                        <span class="my-card-title">
                          {{ $t("EducationalCategories.modelName") }}
                        </span>

                        <div class="table-container">
                          <table class="my-table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>{{ $t("general.select") }}</th>
                                <th>
                                  {{ $t("general.code") }}
                                </th>
                                <th class="cell-lg">
                                  {{ $t("general.name") }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <template
                                v-if="
                                  optionsEducationalCategoriesLis.length == 0
                                "
                              >
                                <tr>
                                  <th colspan="5">
                                    {{ $t("general.noData") }}
                                  </th>
                                </tr>
                              </template>
                              <template v-else>
                                <tr
                                  v-for="(
                                    item, indexOption
                                  ) in optionsEducationalCategoriesLis"
                                  :key="indexOption"
                                >
                                  <td>{{ indexOption + 1 }}</td>
                                  <td>
                                    <CustomCheckbox
                                      :id="`table-${indexOption}-isSelected`"
                                      :value="item.isSelected"
                                      v-on:changeValue="
                                        item.isSelected = $event;
                                        moveToBannedList(indexOption, item);
                                      "
                                      :centerStatus="true"
                                      :withOutTitle="true"
                                    />
                                  </td>
                                  <td>
                                    {{ item.fullCode }}
                                  </td>
                                  <td>
                                    {{ item.educationalCategoryNameCurrent }}
                                  </td>
                                </tr>
                              </template>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </b-collapse>
            </template>
          </div>
          <div class="col-6">
            <!-- banned list -->
            <template>
              <!-- BannedList -->
              <b-button
                v-b-toggle="`BannedList`"
                class="btn btn-lg btn-collapse arrow-end"
              >
                <span>{{ $t("general.blocked") }} </span>
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </b-button>
              <b-collapse :id="`BannedList`">
                <div class="row data-collapse">
                  <div :key="reRenderKey" class="row">
                    <template>
                      <div class="my-card row">
                        <span class="my-card-title">
                          {{ $t("EducationalCategories.modelName") }}
                        </span>

                        <div class="table-container">
                          <table class="my-table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>{{ $t("general.delete") }}</th>
                                <th>
                                  {{ $t("general.code") }}
                                </th>
                                <th class="cell-lg">
                                  {{ $t("general.name") }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <template
                                v-if="user.userEducationalBanneds.length == 0"
                              >
                                <tr>
                                  <th colspan="5">
                                    {{ $t("general.noData") }}
                                  </th>
                                </tr>
                              </template>
                              <template v-else>
                                <tr
                                  v-for="(
                                    item, index
                                  ) in user.userEducationalBanneds"
                                  :key="index"
                                >
                                  <td>{{ index + 1 }}</td>
                                  <td>
                                    <button
                                      :title="$t('general.delete')"
                                      @click.prevent="
                                        moveToOptionsList(index, item)
                                      "
                                    >
                                      <img src="@/assets/images/trash.svg" />
                                    </button>
                                  </td>
                                  <td>
                                    {{ item.fullCode }}
                                  </td>
                                  <td>
                                    {{ item.educationalCategoryNameCurrent }}
                                  </td>
                                </tr>
                              </template>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </b-collapse>
            </template>
          </div>
        </div>
        <div class="form-actions">
          <div class="icon-submit" @click.prevent="blockTeacher">
            <img src="@/assets/images/check-icon.svg" :title="$t('search')" />
          </div>
          <div
            @click.prevent="closeBottomSheet('BlockTeacher')"
            class="icon-cancel"
          >
            <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
          </div>
        </div>
      </form>
    </template>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import ExceptionWithImg from "../../../../components/general/ExceptionWithImg.vue";
import DataLabelGroup from "../../../../components/previews/DataLabelGroup.vue";
import CustomCheckbox from "./../../../../components/inputs/CustomCheckbox.vue";
import blockIcon from "@/assets/images/activation-type-blocked.svg";
import generalMixin from "@/utils/generalMixin";
import User from "../../../../models/users/User";
import apiUser from "../../../../api/users/user";
import EducationalCategory from "../../../../models/educationals/educationalCategories/EducationalCategory";
import apiEducationalCategory from "../../../../api/educationals/educationalCategories/educationalCategory";
import { objectToFormData } from "../../../../utils/functions";

export default {
  name: "BlockTeacher",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    userTeacherToken: {
      type: String,
      default: "",
    },
    educationalCategoryToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      blockIcon,
      user: new User(),
      educationalCategory: new EducationalCategory(),
      optionsEducationalCategoriesLis: [],
      reRenderKey: null,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomBottomSheet,
    ExceptionWithImg,
    DataLabelGroup,
    CustomCheckbox,
  },
  computed: {},
  methods: {
    async getUserDetails() {
      this.user.setInitialValue();
      try {
        const response = await apiUser.getDetails({
          token: this.userTeacherToken,
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
        this.user.userEducationalBanneds = this.user.userEducationalBanneds.map(
          (i) => {
            return {
              ...i.educationalCategoryInfoData,
              isSelected: false,
            };
          }
        );
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
    async getEducationalCategoryDetails() {
      this.educationalCategory.setInitialValue();
      this.optionsEducationalCategoriesLis = [];
      try {
        const response = await apiEducationalCategory.getDetails({
          token: this.educationalCategoryToken,
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
        this.educationalCategory.fillData(response.data.educationalCategory);
        this.optionsEducationalCategoriesLis.push({
          ...response.data.educationalCategory,
          isSelected: false,
        });
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },
    moveToBannedList(index, item) {
      item.isSelected = false;
      this.user.userEducationalBanneds.push(item);
      this.optionsEducationalCategoriesLis.splice(index, 1);
    },
    moveToOptionsList(index, item) {
      this.optionsEducationalCategoriesLis.push(item);
      this.user.userEducationalBanneds.splice(index, 1);
    },
    async blockTeacher() {
      let userEducationalBannedTokens = this.user.userEducationalBanneds.map(
        (i) => {
          return i.educationalCategoryToken;
        }
      );
      delete this.user.userEducationalBanneds;

      let formData = objectToFormData(this.user);
      for (let tokenIndex in userEducationalBannedTokens) {
        formData.append(
          `userEducationalBannedTokens`,
          userEducationalBannedTokens[tokenIndex]
        );
      }
      const response = await apiUser.update(formData);
      if (response.data.status == this.STATUS.SUCCESS) {
        this.showMsg(response.data.msg, true);
        this.closeBottomSheet("BlockTeacher");
      } else {
        this.showMsg(response.data.msg);
      }
    },
  },
};
</script>

<style lang="scss"></style>

<template>
  <div class="table-container" v-if="educationalTeachersData.length">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("Teachers.data") }}</th>
          <th colspan="2">{{ $t("EducationalCategories.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("general.name") }}</th>
          <th>{{ $t("Users.phone") }}</th>

          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(educationalTeacher, index) in educationalTeachersData"
          :key="index"
        >
          <td>
            {{ ++index + filterData.currentIndex }}
          </td>

          <td>{{ isDataExist(educationalTeacher.userInfoData.fullCode) }}</td>
          <td>
            {{ isDataExist(educationalTeacher.userInfoData.userNameCurrent) }}
          </td>
          <td class="table-phone-number">
            {{ isDataExist(educationalTeacher.userInfoData.userPhoneWithCC) }}
          </td>
          <td>
            {{
              isDataExist(
                educationalTeacher.educationalCategoryInfoData.fullCode
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalTeacher.educationalCategoryInfoData
                  .educationalCategoryNameCurrent
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setEducationalTeacherData(educationalTeacher);
                    openBottomSheet('BlockTeacher');
                  "
                  :title="$t('general.block')"
                >
                  <img src="@/assets/images/activation-type-blocked.svg" />
                </button>
              </li>
              <li>
                <router-link
                  @click.native="
                    setOwnerUserToken(educationalTeacher.userTeacherToken)
                  "
                  :to="{
                    name: 'EducationalCourses',
                    params: {
                      parentEducationalCategoryToken:
                        educationalTeacher.educationalCategoryInfoData
                          .parentEducationalCategoryToken || ' ',
                      educationalCategoryToken:
                        educationalTeacher.educationalCategoryInfoData
                          .educationalCategoryToken,
                      userTeacherToken: educationalTeacher.userTeacherToken,
                    },
                  }"
                  target="_blank"
                  :title="$t('EducationalCourses.modelName')"
                >
                  <img src="@/assets/images/EducationalCourses.svg" />
                </router-link>
              </li>

              <li>
                <router-link
                  @click.native="
                    setOwnerUserToken(educationalTeacher.userTeacherToken)
                  "
                  :to="{
                    name: 'QuestionBankTitles',
                    params: {
                      userTeacherToken: educationalTeacher.userTeacherToken,
                    },
                  }"
                  target="_blank"
                  :title="$t('QuestionBankTitles.modelName')"
                >
                  <img src="@/assets/images/questionBankTitle.svg" />
                </router-link>
              </li>
              <li>
                <router-link
                  @click.native="
                    setOwnerUserToken(educationalTeacher.userTeacherToken)
                  "
                  :to="{
                    name: 'QuestionParagraphs',
                    params: {
                      userTeacherToken: educationalTeacher.userTeacherToken,
                    },
                  }"
                  target="_blank"
                  :title="$t('QuestionParagraphs.modelName')"
                >
                  <img src="@/assets/images/questionParagraph.svg" />
                </router-link>
              </li>
              <li>
                <router-link
                  @click.native="
                    setOwnerUserToken(educationalTeacher.userTeacherToken)
                  "
                  :to="{
                    name: 'QuestionBanks',
                    params: {
                      userTeacherToken: educationalTeacher.userTeacherToken,
                    },
                  }"
                  target="_blank"
                  :title="$t('QuestionBanks.modelName')"
                >
                  <img src="@/assets/images/questionBank.svg" />
                </router-link>
              </li>
              <li>
                <router-link
                  @click.native="
                    setOwnerUserToken(educationalTeacher.userTeacherToken)
                  "
                  :to="{
                    name: 'Questions',
                    params: {
                      userTeacherToken: educationalTeacher.userTeacherToken,
                    },
                  }"
                  target="_blank"
                  :title="$t('Questions.modelName')"
                >
                  <img src="@/assets/images/question.svg" />
                </router-link>
              </li>
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  isDataExist,
  fullPathFileFromServer,
} from "../../../../utils/functions";
import { mapActions } from "vuex";
import FloatingMenu from "../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { EDUCATIONAL_COURSE_PERIOD_STATUS_TYPE } from "./../../../../utils/constantLists";

export default {
  name: "EducationalTeacherTable",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
    modelLevels: {
      type: Object,
      default: null,
    },
    updateFullbackAction: {
      type: Function,
    },
    deleteFullbackAction: {
      type: Function,
    },
    changeActivationFullbackAction: {
      type: Function,
    },
  },
  data() {
    return {
      EDUCATIONAL_COURSE_PERIOD_STATUS_TYPE,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    FloatingMenu,
  },
  computed: {
    educationalTeachersData() {
      return this.model.educationalTeachersData;
    },
    educationalTeacher() {
      return this.model.educationalTeacher;
    },
    filterData() {
      return this.model.filterData;
    },
    defaultImg() {
      return this.model.educationalTeacher.defaultImg;
    },
  },
  methods: {
    ...mapActions([
      "setCurrentLayerComponent",
      "setCurrentProps",
      "setCurrentItemInAction",
      "showAppLayer",
      "updateOwnerUserToken",
    ]),

    setOwnerUserToken(token) {
      this.updateOwnerUserToken(token);
    },

    isDataExist,
    fullPathFileFromServer,

    setEducationalTeacherData(educationalTeacher) {
      this.$emit("setEducationalTeacherData", educationalTeacher);
    },
    setEducationalTeacherLevelData(educationalTeacherToken) {
      this.$emit("setEducationalTeacherLevelData", educationalTeacherToken);
    },
  },
};
</script>

<style lang="scss"></style>

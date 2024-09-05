<template>
  <div class="page-container">
    <div class="pagination-with-content">
      <UserSettingsTabs
        :key="userTypeToken"
        :userTypeToken="userTypeToken"
        :modelName="modelName"
      />
      <template v-if="hasData">
        <form>
          <div class="row">
            <CustomInput
              class="mt-2"
              :className="'col-md-8'"
              :id="'filterTable'"
              :value="filterTable"
              :title="$t('search')"
              :imgName="'search.svg'"
              v-on:changeValue="filterTable = $event"
            />
            <button
              name="submit"
              type="submit"
              class="btn btn-submit col-md-3 mt-2"
              @click.prevent="addStudents"
            >
              {{ $t("approveSignUp") }}
            </button>
            <div class="table-container">
              <table class="my-table">
                <thead>
                  <tr>
                    <th rowspan="2">#</th>
                    <th rowspan="2">
                      <input
                        v-if="filteredUserTokensOptions.length > 0"
                        type="checkbox"
                        id="selectAll"
                        @click="selectAll()"
                        v-model="selectedAll"
                        class="checkbox"
                      />

                      {{ $t("general.all") }}
                    </th>

                    <th colspan="3">{{ $t("Users.data") }}</th>
                  </tr>
                  <tr>
                    <th>{{ $t("general.image") }}</th>
                    <th>{{ $t("general.code") }}</th>
                    <th>{{ $t("general.name") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in filteredUserTokensOptions"
                    :key="index"
                  >
                    <td>{{ ++index }}</td>
                    <td>
                      <input
                        type="checkbox"
                        v-model="users.user.usersTokens"
                        :value="item.userToken"
                        @click="select(item.userToken)"
                        class="checkbox"
                      />
                    </td>

                    <td>
                      <img
                        class="item-img-table"
                        :src="`${BASE_URL}${item.userImagePath}`"
                        :onerror="`this.src='${users.user.defaultImg}'`"
                      />
                    </td>
                    <td>{{ isDataExist(item.fullCode) }}</td>
                    <td>{{ isDataExist(item.userNameCurrent) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  objectToFormData,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../utils/functions";
import Users from "./../../../models/users/Users";
import apiUser from "./../../../api/users/user";
import generalMixin from "./../../../utils/generalMixin";
import UserSettingsTabs from "./../UserSettingsTabs.vue";
import { BASE_URL } from "./../../../utils/constants";
import CustomInput from "./../../../components/inputs/CustomInput.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";

export default {
  name: "UsersNotApproved",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {},
  data() {
    return {
      BASE_URL,
      filterTable: "",
      selectedAll: false,
      userTypeToken: this.$route.meta.userTypeToken,
      modelName: this.$route.meta.modelName,
      users: new Users(this.modelName),
      userTokensOptions: [],
    };
  },
  async created() {
    await this.updateFilterData();
    await this.getAllUsers();
  },
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    UserSettingsTabs,
    CustomInput,
    ExceptionWithImg,
  },
  computed: {
    ...mapGetters(["generalSetting"]),
    hasData() {
      return this.users.usersData.length != 0;
    },
    filteredUserTokensOptions() {
      const searchableKeys = ["fullCode", "userNameCurrent"];
      return this.userTokensOptions.filter((item) => {
        if (this.filterTable == "") return true;

        return searchableKeys.some((key) => {
          return (
            item[key]
              .toString()
              .toLowerCase()
              .indexOf(this.filterTable.toLowerCase()) >= 0
          );
        });
      });
    },
  },
  methods: {
    objectToFormData,
    isDataExist,
    fullPathFileFromServer,

    async updateFilterData() {
      this.users.filterData.activationTypeTokens =
        this.generalSetting[this.modelName].activationTypeTokens;
      this.users.filterData.userTypeToken = this.userTypeToken;
      this.users.filterData.userNotApproved = true;
      this.users.filterData.paginationStatus = false;
      this.users.user.userTypeToken = this.userTypeToken;
    },
    async getAllUsers() {
      try {
        this.users.usersData = [];
        this.userTokensOptions = [];
        const response = await apiUser.getAll(this.users.filterData);
        if (response.data.status == this.STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == this.STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == this.STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        await this.users.fillData(response.data);
        this.userTokensOptions = this.users.usersData;
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
    },

    selectAll() {
      this.filterTable = "";
      this.users.user.usersTokens = [];
      this.selectedAll = !this.selectedAll;
      if (this.selectedAll) {
        for (let ietm in this.userTokensOptions) {
          this.users.user.usersTokens.push(
            this.userTokensOptions[ietm].userToken
          );
        }
      }
    },
    select(value) {
      console.log(value);
      const indexItem = this.users.user.usersTokens.indexOf(value);

      if (indexItem > -1) {
        this.users.user.usersTokens.splice(indexItem, 1);
      }
      setTimeout(() => {
        if (
          this.userTokensOptions.length == this.users.user.usersTokens.length
        ) {
          this.selectedAll = true;
        } else {
          this.selectedAll = false;
        }
      }, 1000);
    },

    async addStudents() {
      let params = {
        approveStatus: true,
        userTypeToken: this.userTypeToken,
        usersTokens: this.users.user.usersTokens,
      };
      let formData = objectToFormData(params);

      try {
        const response = await apiUser.approveUserSignUp(formData);
        if (response.data.status == this.STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.getAllUsers();
        } else if (response.data.status == this.STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
    },
  },
};
</script>

<style lang="scss"></style>
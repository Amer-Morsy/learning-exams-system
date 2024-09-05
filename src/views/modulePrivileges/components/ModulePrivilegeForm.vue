<template>
  <div class="row">
    <div class="col-12">
      <form autocomplete="off">
        <div class="" v-if="list.length">
          <div class="form-footer">
            <CustomCheckbox
              :isSwitch="false"
              :value="activeAllPrivileges"
              v-on:changeValue="activeAllPrivileges = $event"
              :title="$t('Privileges.activeAllPrivileges')"
            />
            <button
              name="submit"
              type="submit"
              class="btn btn-submit"
              @click.prevent="updateModulePrivilege"
            >
              {{ submitName }}
            </button>
          </div>
          <div
            v-for="(privilege, index) in list"
            :key="privilege.moduleToken"
            class="container-collapse-with-btns"
          >
            <div class="collapse-actions">
              <CustomCheckbox
                :value="privilege.grandParentStatus"
                v-on:changeValue="privilege.grandParentStatus = $event"
                :withOutTitle="true"
              />
            </div>
            <b-button
              v-b-toggle="`${privilege.moduleToken}${index}`"
              class="btn btn-lg btn-collapse collapse-data"
              :class="privilege.isHavePrivlage ? 'bg-green' : 'bg-red'"
            >
              <div class="p-t-container">
                <img
                  :src="
                    fullPathFileFromServer(
                      privilege.moduleImagePath,
                      defaultImg
                    )
                  "
                  :onerror="`this.src='${defaultImg}'`"
                  class="icon-lg"
                />
                <span class="btn-collapse-text">{{
                  privilege.moduleNameCurrent
                }}</span>
                <div class="collapse-icon">
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </div>
              </div>
            </b-button>
            <b-collapse :id="`${privilege.moduleToken}${index}`">
              <div class="my-card no-margin">
                <ModulePrivilegeFunctions
                  :funcations="privilege.modulePrivilegeFuncations"
                  :forceChangeParentOfAll="privilege.grandParentStatus"
                  @emitAtLeastOne="privilege.isHavePrivlage = $event"
                />
              </div>
            </b-collapse>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CustomCheckbox from "./../../../components/inputs/CustomCheckbox.vue";
import { fullPathFileFromServer } from "./../../../utils/functions";
import ModulePrivilegeImg from "@/assets/images/privileges.svg";
import ModulePrivilegeFunctions from "./ModulePrivilegeFunctions.vue";

export default {
  components: {
    CustomCheckbox,
    ModulePrivilegeFunctions,
  },
  props: ["modulePrivilege", "submitName"],
  computed: {},
  data() {
    return {
      isLoading: false,
      list: [],
      defaultImg: ModulePrivilegeImg,
      activeAllPrivileges: false,
    };
  },
  watch: {
    async activeAllPrivileges(val) {
      this.isLoading = true;
      await this.forceAllPrivileges(val);
      this.isLoading = false;
    },
  },
  methods: {
    fullPathFileFromServer,

    async forceAllPrivileges(val) {
      this.list.forEach((module) => {
        module.grandParentStatus = val;
      });
    },

    async updateModulePrivilege() {
      this.$emit("updateModulePrivilege", this.modulePrivilege);
    },

    async setGrandParentStatus() {
      this.list = this.modulePrivilege.map(function(module) {
        let grandParentStatus = false;
        return { ...module, grandParentStatus: grandParentStatus };
      });
    },
  },
  async created() {
    await this.setGrandParentStatus();
  },
};
</script>

<style lang="scss">
.bg-green {
  background-color: green !important;
}
.bg-red {
  background-color: red !important;
}
</style>

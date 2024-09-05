<template>
  <CustomBottomSheet
    :refName="refName"
    size="lg"
    :headerText="$t('EstablishmentRoles.data')"
    :headerIcon="headerIcon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="establishmentRole.fullCode"
        :title="$t('EstablishmentRoles.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="establishmentRole.userTypeNameCurrent"
        :title="$t('general.type')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="establishmentRole.establishmentRoleNameAr"
        :title="$t('general.nameAr')"
        :imgName="'establishmentRole.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="establishmentRole.establishmentRoleNameEn"
        :title="$t('general.nameEn')"
        :imgName="'establishmentRole.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="establishmentRole.establishmentRoleDescriptionAr"
        :title="$t('general.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="establishmentRole.establishmentRoleDescriptionEn"
        :title="$t('general.descriptionEn')"
        :imgName="'description.svg'"
      />

      <DataLabelGroup
        :className="'col-md-12'"
        :value="establishmentRole.establishmentRoleNotes"
        :title="$t('general.notes')"
        :imgName="'notes.svg'"
      />
    </div>
    <div class="form-actions">
      <div @click.prevent="closeBottomSheet(refName)" class="icon-cancel">
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "../../../components/general/CustomBottomSheet.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import generalMixin from "./../../../utils/generalMixin";
import DataLabelGroup from "../../../components/previews/DataLabelGroup.vue";

export default {
  name: "EstablishmentRoleInfo",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {
    model: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  computed: {
    ...mapGetters(["currentItemInAction"]),
    establishmentRole() {
      return this.model.establishmentRole;
    },
    refName() {
      return this.model.metaData.components.Info.refName;
    },
    headerIcon() {
      return this.establishmentRole.icon;
    },
  },
  methods: {
    ...mapActions(["hideAppLayer"]),
  },
};
</script>

<template>
  <div :class="className">
    <CustomInput
      :className="'col-md-12'"
      :id="'textSearch'"
      :value="value.textSearch"
      :title="$t('search')"
      :imgName="'search.svg'"
      v-on:changeValue="value.textSearch = $event"
    />

    <!-- <DateTimePicker
      class="col-md-6"
      id="creationDateTimeFrom"
      type="dateTime"
      :value="value.creationDateTimeFrom"
      :title="$t('filters.creationDateTimeFrom')"
      v-on:changeValue="value.creationDateTimeFrom = $event.dateTime"
      :language="language"
    />
    <DateTimePicker
      class="col-md-6"
      id="creationDateTimeTo"
      type="dateTime"
      :value="value.creationDateTimeTo"
      :title="$t('filters.creationDateTimeTo')"
      v-on:changeValue="value.creationDateTimeTo = $event.dateTime"
      :language="language"
    />

    <DateTimePicker
      class="col-md-6"
      id="lastUpdateDateTimeFrom"
      type="dateTime"
      :value="value.lastUpdateDateTimeFrom"
      :title="$t('filters.lastUpdateDateTimeFrom')"
      v-on:changeValue="value.lastUpdateDateTimeFrom = $event.dateTime"
      :language="language"
    />
    <DateTimePicker
      class="col-md-6"
      id="lastUpdateDateTimeTo"
      type="dateTime"
      :value="value.lastUpdateDateTimeTo"
      :title="$t('filters.lastUpdateDateTimeTo')"
      v-on:changeValue="value.lastUpdateDateTimeTo = $event.dateTime"
      :language="language"
    />

    <DateTimePicker
      class="col-md-6"
      id="lastArchiveDateTimeFrom"
      type="dateTime"
      :value="value.lastArchiveDateTimeFrom"
      :title="$t('filters.lastArchiveDateTimeFrom')"
      v-on:changeValue="value.lastArchiveDateTimeFrom = $event.dateTime"
      :language="language"
    />
    <DateTimePicker
      class="col-md-6"
      id="lastArchiveDateTimeTo"
      type="dateTime"
      :value="value.lastArchiveDateTimeTo"
      :title="$t('filters.lastArchiveDateTimeTo')"
      v-on:changeValue="value.lastArchiveDateTimeTo = $event.dateTime"
      :language="language"
    />

    <DateTimePicker
      class="col-md-6"
      id="lastBlockedDateTimeFrom"
      type="dateTime"
      :value="value.lastBlockedDateTimeFrom"
      :title="$t('filters.lastBlockedDateTimeFrom')"
      v-on:changeValue="value.lastBlockedDateTimeFrom = $event.dateTime"
      :language="language"
    />
    <DateTimePicker
      class="col-md-6"
      id="lastBlockedDateTimeTo"
      type="dateTime"
      :value="value.lastBlockedDateTimeTo"
      :title="$t('filters.lastBlockedDateTimeTo')"
      v-on:changeValue="value.lastBlockedDateTimeTo = $event.dateTime"
      :language="language"
    /> -->
  </div>
</template>

<script>
import CustomInput from "@/components/inputs/CustomInput.vue";
// import DateTimePicker from "@/components/general/DateTimePicker.vue";
import { getLanguage } from "@/utils/functions";

export default {
  name: "CustomBaseEntityFilter",
  components: {
    CustomInput,
    // DateTimePicker,
  },
  data() {
    return {
      language: getLanguage(),
      theValue: this.value,
    };
  },
  methods: {},
  props: {
    className: {
      type: String,
      default: "",
    },

    value: {
      type: Object,
    },
  },
  watch: {
    theValue: function (val) {
      this.$emit("changeValue", val ? val : "");
    },
    value: function (val) {
      this.theValue = val;
    },
  },
  async created() {
    this.theValue = this.value;
  },
};
</script>

<style lang="scss" scoped></style>

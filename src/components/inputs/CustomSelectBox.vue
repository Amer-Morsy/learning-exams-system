<template>
  <div
    v-if="!disabledStatus"
    class="select-box-with-img"
    :class="
      className +
        (openDown ? ' open-down' : '') +
        (errors.length == 0 ? '' : ' form-group--error') +
        (hideImg ? ' hide-images' : '')
    "
  >
    <span
      v-if="isSync"
      class="sync-icon"
      @click="sync()"
      :class="{ rotate: isClicked }"
      :title="syncTitle"
    >
      <img class="sync-image-add" :src="require('@/assets/images/sync.svg')" />
      <img
        class="sync-image-dialog"
        :src="require('@/assets/images/plus.svg')"
      />
    </span>

    <multiselect
      v-model="theValue"
      :placeholder="title ? title : $t('notFound')"
      label="text"
      track-by="value"
      :options="options"
      :option-height="104"
      :show-labels="true"
      :selectedLabel="$t('selectBox.selectedLabel')"
      :selectLabel="$t('selectBox.selectLabel')"
      :deselectLabel="$t('selectBox.deselectLabel')"
      :disabled="isDisabled"
    >
      <!-- :custom-label="customLabel" -->
      <template slot="singleLabel" slot-scope="props">
        <div class="image">
          <!-- <img :src="require('@/assets/images/' + imgName)" /> -->
        </div>
        <label class="label" :for="id">{{
          title ? title : $t("notFound")
        }}</label>
        <div class="select-box-container">
          <!-- v-if="props.option.image && imgStatus" -->
          <img
            v-if="props.option.image"
            class="option__image"
            :src="props.option.image"
            :onerror="`this.src='${require('@/assets/images/' + imgName)}'`"
          />
          <span class="option__desc">
            <span class="option__title">{{ props.option.text }}</span>
          </span>
        </div>
      </template>
      <template slot="option" slot-scope="props">
        <!-- v-if="props.option.image && imgStatus" -->
        <img
          v-if="props.option.image"
          class="option__image"
          :src="props.option.image"
          :onerror="`this.src='${require('@/assets/images/' + imgName)}'`"
        />
        <div class="option__desc">
          <span class="option__title">{{ props.option.text }}</span>
          <!-- <span class="option__small">{{ props.option.desc }}</span> -->
        </div>
      </template>
      <template slot="noOptions">
        {{ $t("selectBox.noOptions") }}
      </template>
      <template slot="noResult">
        {{ $t("selectBox.noElementsFoundOfThisSearch") }}
      </template>
    </multiselect>

    <img
      class="placeholder-image"
      :src="require('@/assets/images/' + imgName)"
    />
    <span class="error" v-for="(error, index) in errors" :key="index">
      {{ error }}
    </span>
  </div>
  <DataLabelGroup
    v-else
    :class="className"
    :value="value"
    :title="title"
    :imgName="imgName"
  />
</template>

<script>
import Multiselect from "vue-multiselect";
import DataLabelGroup from "@/components/previews/DataLabelGroup.vue";
import i18n from "../../i18n";

export default {
  components: {
    Multiselect,
    DataLabelGroup,
  },
  data() {
    return {
      theValue: null,
      isClicked: false,
    };
  },
  methods: {
    // customLabel({ title, desc }) {
    //   return `${title} - ${desc}`;
    // },
    getCurrentItem(val) {
      let index = this.options.findIndex((x) => x.value == val);

      if (index > -1) {
        this.theValue = {
          value: this.options[index].value,
          text: this.options[index].text,
          image: this.options[index].image,
        };
      } else {
        this.theValue = null;
        // this.$emit("changeValue", "");
      }
    },
    sync() {
      this.isClicked = true;
      this.$emit("synchronization", "");
    },
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "textarea",
    },
    isSync: {
      type: Boolean,
      default: false,
    },
    syncTitle: {
      type: String,
      default: i18n.t("selectBox.synchronization"),
    },
    imgSyncName: {
      type: String,
      default: "sync.svg",
    },
    value: {
      default: "",
    },
    title: {
      type: String,
      default: "title",
    },
    imgName: {
      type: String,
      default: "man.svg",
    },
    options: {
      type: Array,
    },
    imgStatus: {
      type: Boolean,
      default: false,
    },
    disabledStatus: {
      type: Boolean,
      default: false,
    },
    emitObject: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    hideImg: {
      type: Boolean,
      default: false,
    },
    openDown: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    theValue: function(val) {
      if (val == null) {
        this.value = "";
        this.$emit("changeValue", "");
      } else if (val.value != this.value) {
        if (this.emitObject) {
          this.$emit("changeValue", val ? val : "");
        } else {
          this.$emit("changeValue", val ? val.value : "");
        }
      }
    },
    value: function(val) {
      this.getCurrentItem(val);
      // this.$emit("valueLoaded");
    },
    options: function() {
      this.getCurrentItem(this.value);
    },
  },
  async created() {
    this.getCurrentItem(this.value);
    // this.$emit("valueLoaded");
  },
};
</script>

<style lang="scss">

</style>

<template>
  <vue-bottom-sheet
    :ref="refName"
    :class="sheetMaxWidth[sheetSize] == '100%' ? 'full-height' : ''"
    :maxWidth="sheetMaxWidth[sheetSize]"
    :maxHeight="sheetMaxHeight[sheetSize]"
    :click-to-close="clickToClose"
    :swipe-able="swipeAble"
    @opened="$emit('opened')"
    @closed="$emit('closed')"
  >
    <h3 v-if="headerStatus" class="bottom-sheet__header">
      <span class="title">
        <img :src="headerIcon" />
        {{ headerText }}
      </span>
    </h3>

    <div class="bottom-sheet__content-data p-2">
      <slot></slot>
    </div>
    <!-- <ConfirmCloseSheet :bottomSheetName="refName" /> -->
  </vue-bottom-sheet>
</template>

<script>
// import ConfirmCloseSheet from "./ConfirmCloseSheet.vue";

export default {
  props: {
    refName: {
      type: String,
      default: "bottomSheetComponent",
    },
    size: {
      type: String,
      default: "md",
    },
    headerStatus: {
      type: Boolean,
      default: true,
    },
    clickToClose: {
      type: Boolean,
      default: true,
    },
    swipeAble: {
      type: Boolean,
      default: true,
    },

    headerText: {
      type: String,
      default: "",
    },
    headerIcon: {
      type: String,
      default: "UserValidSettings.svg",
    },
  },
  data() {
    return {
      sheetMaxWidth: {
        sm: "640px",
        md: "720px",
        lg: "90%",
        xl: "100%",
      },
      sheetMaxHeight: {
        sm: "640px",
        md: "720px",
        lg: "90%",
        xl: "100%",
      },
    };
  },
  components: {
    // ConfirmCloseSheet,
    // CustomInput,
  },
  methods: {
    open(x) {
      this.$refs[x].open();
    },
    close(x) {
      this.$refs[x].close();
    },
  },
  computed: {
    sheetSize: function() {
      switch (this.size) {
        case "sm":
          return "sm";
        case "lg":
          return "lg";
        case "xl":
          return "xl";
        case "md":
        default:
          return "md";
      }
    },
  },
  mounted() {
    this.$root.$on("openBottomSheet", ($event) => {
      if ($event == this.refName) {
        this.open($event);
      }
    });
    this.$root.$on("closeBottomSheet", ($event) => {
      if ($event == this.refName) {
        this.close($event);
      }
    });
  },
  watch: {
    "this.$root": function(v) {
      console.log(v);
    },
  },
};
</script>

<style lang="scss"></style>

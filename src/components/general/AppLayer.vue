<template>
  <div class="app-content-layer">
    <div v-if="!isDashboard" class="app-layer-actions">
      <img
        class="icon-lg close-layer"
        :src="closeIcon"
        @click="$emit('hideAppLayer')"
      />
    </div>
    <router-view class="app-layer-container" :name="currentLayerComponent" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import closeIcon from "@/assets/images/cancel.svg";

export default {
  name: "AppLayer",
  mixins: [],
  beforeCreate() {},
  props: {
    currentLayerComponent: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      closeIcon,
    };
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {},
  computed: {
    ...mapGetters(["appLayouts", "currentLayout"]),
    isDashboard() {
      return this.currentLayout == this.appLayouts.dashboard;
    },
  },
  methods: {},
};
</script>
<style lang="scss"></style>

<template>
  <div class="app-content-overlay"></div>
</template>

<script>
export default {
  name: "AppOverlay",
  mixins: [],
  beforeCreate() {},
  props: {},
  data() {
    return {};
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: {},
  computed: {},
  methods: {},
};
</script>
<style lang="scss">
.app-content-overlay {
  cursor: pointer;
  height: 100%;
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-bg-forthy-trans);
  backdrop-filter: blur(1px);
}
</style>

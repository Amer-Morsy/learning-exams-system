<template>
  <div class="app-layout blank-layout">
    <div class="app-content blank-content">
      <div class="app-content-container">
        <router-view class="main-content-container" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlankLayout",
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

<template>
  <div>
    <div class="app-content pagination-with-content">
      <UserLoginCodeUseCode />
    </div>
  </div>
</template>
<script>
import UserLoginCodeUseCode from "./componets/UserLoginCodeUseCode.vue";
import generalMixin from "./../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    UserLoginCodeUseCode,
  },

  data() {
    return {};
  },
  computed: {},
  methods: {},
  async created() {},
  mounted() {
    this.openBottomSheet("UserLoginCodeUseCode");
  },
  watch: {},
};
</script>

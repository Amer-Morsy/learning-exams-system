<template>
  <div class="home">
    <template>
      <div>
        <HomeComponent />
      </div>
    </template>
  </div>
</template>

<script>
import HomeComponent from "./components/HomeComponent.vue";
import generalMixin from "../../utils/generalMixin";

export default {
  name: "Home",
  mixins: [generalMixin],
  beforeCreate() {},
  props: {},
  data() {
    return {};
  },
  created() {},
  watch: {},
  beforeMount() {},
  mounted() {},
  components: { HomeComponent },
  computed: {},
  methods: {},
};
</script>

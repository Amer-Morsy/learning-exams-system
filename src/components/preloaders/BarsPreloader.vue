<template>
  <div class="preloader-container">
    <div class="preloader">
      <div class="bar bar1"></div>
      <div class="bar bar2"></div>
      <div class="bar bar3"></div>
      <div class="bar bar4"></div>
      <div class="bar bar5"></div>
      <div class="bar bar6"></div>
      <div class="bar bar7"></div>
      <div class="bar bar8"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BarsPreloader",
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
.preloader-container {
  .preloader {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 11111;
    top: 0;
    display: flex;
    gap: 2px;
    align-items: center;
    justify-content: center;
    background: #00000067;
    backdrop-filter: blur(1px);
    .bar {
      width: 10px;
      height: 70px;
      background: transparent;
      // background: #f05a28;
      display: inline-block;
      transform-origin: bottom center;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      animation: loader 1.2s linear infinite;
    }
    .bar1 {
      animation-delay: 0.1s;
    }
    .bar2 {
      animation-delay: 0.2s;
    }
    .bar3 {
      animation-delay: 0.3s;
    }
    .bar4 {
      animation-delay: 0.4s;
    }
    .bar5 {
      animation-delay: 0.5s;
    }
    .bar6 {
      animation-delay: 0.6s;
    }
    .bar7 {
      animation-delay: 0.7s;
    }
    .bar8 {
      animation-delay: 0.8s;
    }
    @keyframes loader {
      0% {
        transform: scaleY(0.1);
        background: transparent;
      }
      50% {
        transform: scaleY(1);
        background: #f05a28;
      }
      100% {
        transform: scaleY(0.1);
        background: transparent;
      }
    }
  }
  &.dashboard {
    &.left {
      &.sidebar-opend {
        .preloader {
          width: 100%;
          // width: calc(100% - var(--sidebar-width-open));
          // left: var(--sidebar-width-open);
          left: 0;
        }
      }
      &.sidebar-closed {
        .preloader {
          width: 100%;
          // width: calc(100% - var(--sidebar-width-close));
          // left: var(--sidebar-width-close);
          left: 0;
        }
      }
    }
    &.right {
      &.sidebar-opend {
        .preloader {
          width: 100%;
          // width: calc(100% - var(--sidebar-width-open));
          // right: var(--sidebar-width-open);
          right: 0;
        }
      }
      &.sidebar-closed {
        .preloader {
          width: 100%;
          // width: calc(100% - var(--sidebar-width-close));
          // right: var(--sidebar-width-close);
          right: 0;
        }
      }
    }
  }
}
</style>

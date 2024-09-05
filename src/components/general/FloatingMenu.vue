<template>
  <div class="fmenu-item" :class="className">
    <div class="trigger-menu" :class="open ? 'open' : ''" @click="open = !open">
      <i class="fas fa-sliders-h"></i>
    </div>
    <ul class="floating-menu" :class="open ? 'open' : ''">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      open: false,
    };
  },
  methods: {},
  props: {
    className: {
      type: String,
      default: "",
    },
  },
  watch: {},
  created() {},
};
</script>

<style lang="scss">
.fmenu-item {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  column-gap: 5px;
  .trigger-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    overflow: hidden;
    background-color: #f05a28;
    cursor: pointer;

    i {
      display: block;
      margin: 0;
      font-size: 1.1rem;
      transition: 1s;
    }
    span.text {
      display: block;
      font-size: 1rem;
      padding: 0 1ch;
      color: #fff;
    }
  }
  .trigger-menu.expanded,
  .trigger-menu.open {
    max-width: unset !important;
  }
  .trigger-menu.open i,
  .trigger-menu:hover:not(.expanded) i {
    color: #0060a9;
    transform: rotate(270deg);
  }

  .floating-menu {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    max-width: 0px;
    z-index: 1;
    opacity: 0;
    transition: max-width ease 0.6s, opacity ease 1s;

    $childs: 5;
    @for $i from 1 through $childs {
      li:nth-child(#{$i}) {
        --nth-child: $i;
      }
    }

    li:nth-child(1) {
      --nth-child: 1;
    }
    li:nth-child(2) {
      --nth-child: 2;
    }
    li:nth-child(3) {
      --nth-child: 3;
    }
    li:nth-child(4) {
      --nth-child: 4;
    }
    li:nth-child(5) {
      --nth-child: 5;
    }
    li:nth-child(6) {
      --nth-child: 6;
    }
    li:nth-child(7) {
      --nth-child: 7;
    }
    li:nth-child(8) {
      --nth-child: 8;
    }
    li:nth-child(9) {
      --nth-child: 9;
    }
    li:nth-child(10) {
      --nth-child: 10;
    }
    li:nth-child(11) {
      --nth-child: 11;
    }
    li:nth-child(12) {
      --nth-child: 12;
    }
    li:nth-child(13) {
      --nth-child: 13;
    }
    li:nth-child(14) {
      --nth-child: 14;
    }
    li:nth-child(15) {
      --nth-child: 15;
    }

    > li {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.3rem;
      margin: 0;
      border: 1px solid #f05a28;
      border-radius: 50%;
      opacity: 0;
      backdrop-filter: blur(3px);
      transition: scale ease 0.6s;
      box-shadow: inset 0 0 5px #f05a28;
      a,
      button {
        display: flex;
        padding: 3px;
        width: 30px;
        height: 30px;
        align-items: center;
        justify-content: center;
        img,
        canvas {
          width: 100%;
          height: 100%;
          scale: 0.9;
        }
        > div {
          display: flex;
        }
      }
      a:hover,
      button:hover {
        color: #0060a9;
      }
      &:hover {
        box-shadow: inset 0 0 20px #f05a28;
        img,
        canvas {
          scale: 1;
        }
      }
    }
  }
}
.fmenu-item .floating-menu.open,
.fmenu-item:hover .floating-menu {
  opacity: 1;
  max-width: unset !important;
  position: absolute;
  margin-inline-end: 2.5rem;
  li {
    transition-delay: calc(var(--nth-child) * 0.1s);
    opacity: 1;
  }
}

.fmenu-item-container {
  width: 3rem;
}
</style>

<template>
  <div :class="className">
    <draggable
      :list="theList"
      class="list-group"
      handle=".handle"
      v-bind="dragOptions"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <transition-group type="transition" name="flip-list">
        <div
          class="list-group-item handle"
          v-for="(element, idx) in theList"
          :key="`${element.value}-${idx}`"
        >
          <span class="counter">{{ counterIndex(idx) }}</span>

          <img
            class="img-item"
            :src="fullPathFileFromServer(element.image, defaultImg)"
            :onerror="`this.src='${defaultImg}'`"
          />

          <span class="txt-item cut-1line">{{ element.text }}</span>

          <i
            v-if="canRemove"
            class="fa fa-times close"
            @click="removeAt(idx)"
          ></i>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import defaultImg from "@/assets/images/sort.svg";
import { fullPathFileFromServer } from "@/utils/functions";

export default {
  name: "CustomSortable",
  components: {
    draggable,
  },
  data() {
    return {
      theList: this.list,
      dragging: false,
      defaultImg: defaultImg,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  methods: {
    fullPathFileFromServer,
    counterIndex(idx) {
      return ++idx;
    },
    removeAt(idx) {
      this.$emit("sortableItemRemoved", this.list[idx]);
      this.list.splice(idx, 1);
    },
  },
  props: {
    className: {
      type: String,
      default: "col-md-6",
    },
    list: {
      type: Array,
    },
    canRemove: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    list: function(val) {
      this.theValue = val;
    },
    theList: function(val) {
      this.$emit("changeValue", val);
    },
  },
  async created() {},
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group-item {
  display: flex;
  align-items: center;
  cursor: move;
  padding: 0.75rem !important;
}
.img-item {
  width: 30px;
  height: 30px;
  flex-basis: 20%;
}
.counter {
  display: inline-flex;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #555;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.txt-item {
  flex-grow: 2;
  color: #fff;
}
.close {
  cursor: pointer;
}
.close {
  font-size: 20px;
}
.list-group-item {
  background-color: #000 !important;
  border-radius: 13px !important;
  border: 1px solid;
  margin-bottom: 0.25rem !important;
}
@media (max-width: 768px) {
  .img-item {
    width: 20px;
    height: 20px;
    flex-basis: 17%;
  }
  .counter {
    width: 20px;
    height: 20px;
  }
  .close::before {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .img-item {
    width: 16px;
    height: 16px;
    flex-basis: 15%;
  }
  .counter {
    width: 16px;
    height: 16px;
  }
  .close::before {
    font-size: 12px;
    padding-bottom: 3px;
  }
}
</style>

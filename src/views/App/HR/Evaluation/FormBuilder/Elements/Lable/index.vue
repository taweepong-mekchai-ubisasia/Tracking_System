<template>
  {{ element }}dasdsa
  <template v-draggable="[list, { group: 'g1' }]">
    <div class="w-full relative" v-for="(v, i) in element" :key="v.name">
      <span
        class="w-full m-0 bg-transparent absolute right-0 top-[-.4rem] z-10 text-right"
      >
        <span class="bg-white">
          <div class="join">
            <button
              class="btn btn-xs text-success join-item bg-transparent"
              @click="$emit('changeFontSize', 'up')"
            >
              <Icon icon="tabler:plus" />
            </button>
            <button
              class="btn btn-xs text-error join-item bg-transparent"
              @click="$emit('changeFontSize', 'down')"
            >
              <Icon icon="material-symbols:remove" />
            </button>
            <button
              class="btn btn-xs text-error join-item bg-transparent"
              @click="$emit('changeFontSize', 'down')"
            >
              <Icon icon="material-symbols:close" />
            </button>
            <button
              class="btn btn-xs text-error join-item bg-transparent"
              @click="$emit('changeFontSize', 'down')"
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>
        </span>
      </span>
      <input
        type="text"
        v-model="element[i]"
        class="input input-xs sm:input-sm md:input-md input-bordered w-full bg-transparent border-dashed"
      /></div
  ></template>
</template>

<script>
import { vDraggable } from "vue-draggable-plus";
export default {
  directives: {
    draggable: vDraggable,
  },
  props: {
    element: {
      type: Array,
      required: true,
    },
  },
  emits: ["remove", "addOption", "changeType", "changeType"],
  data() {
    return {
      newOption: "",
      type: "",
    };
  },
  methods: {
    addOption() {
      this.$emit("addOption", { newOption: this.newOption, type: this.type });
      this.newOption = "";
      this.type = "";
    },
  },
};
</script>

<style scoped>
/* .div{
    height:100px;
    width:100%;
    border:1px solid ;
} */

.textInBlockRight {
  width: 100%;
  margin-top: -10px;
  margin-left: 0px;
  background: transparent;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}
</style>

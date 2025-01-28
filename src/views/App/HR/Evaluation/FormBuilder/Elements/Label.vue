<template>
  <!-- {{ element }}dasdsa -->
  <div class="w-full relative ">
    <span class="w-full m-0 bg-transparent absolute right-0 top-[-.4rem] z-10 text-right">
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
            class="btn btn-xs font-bold join-item bg-transparent"
            @click="$emit('changeFontSize', 'bold')"
          >
            <!-- <Icon icon="material-symbols:close" /> -->
            B
          </button>
          <!-- <button
            class="btn btn-xs text-error join-item bg-transparent"
            @click="$emit('changeFontSize', 'down')"
          >
            <Icon icon="material-symbols:close" />
          </button> -->
        </div>
      </span>
    </span>
    {{ value }}
    <input
      type="text"
      v-model="value"
      class="input input-xs sm:input-sm md:input-md input-bordered w-full bg-transparent border-dashed"
      @click="$emit('labelValue', value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    element: Object,
  },
  emits: ["remove", "addOption", "changeFontSize", "labelValue"],
  data() {
    return {
      newOption: "",
      type: "",
      value: this.element.value
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

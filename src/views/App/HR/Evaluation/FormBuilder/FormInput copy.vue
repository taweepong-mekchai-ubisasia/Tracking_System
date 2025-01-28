<template>
  <div class="w-full flex items-center p-1">
    <div class=" pr-2" :class="element.type === 'label'?'w-full':'w-1/3'">
      <input
        type="text"
        v-model="element.label"
        class="input input-xs sm:input-sm md:input-md input-bordered w-full bg-transparent border-dashed"
      />
    </div>
    <div class="join w-2/3" v-if="element.type !== 'label'">
      <input
        v-if="element.type === 'text'"
        :id="`input-${element.id}`"
        type="text"
        class="join-item input input-xs sm:input-sm md:input-md input-bordered w-full"
      />
      <input
        v-else-if="element.type === 'number'"
        :id="`input-${element.id}`"
        type="number"
        class="join-item input input-xs sm:input-sm md:input-md input-bordered w-full"
      />
      <input
        v-else-if="element.type === 'date'"
        :id="`input-${element.id}`"
        type="date"
        class="join-item input input-xs sm:input-sm md:input-md input-bordered w-full"
      />
      <input
        v-else-if="element.type === 'email'"
        :id="`input-${element.id}`"
        type="email"
        class="join-item input input-xs sm:input-sm md:input-md input-bordered w-full"
      />
      <select
        v-else-if="element.type === 'select'"
        :id="`input-${element.id}`"
        class="join-item select select-xs sm:select-sm md:select-md select-bordered w-full"
      >
        <option v-for="option in element.options" :key="option">
          {{ option }}
        </option>
      </select>
      <div
        v-else-if="element.type === 'checkbox'"
        class="join-item w-full bg-base-100 border border-base-300 flex flex-row flex-nowrap content-center items-center justify-around"
      >
        <div
          v-for="option in element.options"
          :key="option"
          class="form-control"
        >
          <label class="label cursor-pointer">
            <span class="label-text">{{ option }}</span
            ><br />
            <input
              type="checkbox"
              class="checkbox checkbox-xs sm:checkbox-sm md:checkbox-md checkbox-primary"
            />
          </label>
        </div>
      </div>
      <label
        v-if="element.type === 'checkbox' || element.type === 'select'"
        :for="`add-option-${element.id}`"
        class="join-item btn btn-xs sm:btn-sm md:btn-md btn-primary text-white"
      >
        <Icon icon="tabler:plus" class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
      </label>
      <select
        v-model="element.type"
        class="join-item select select-xs sm:select-sm md:select-md select-bordered"
        @change="$emit('changeType', element.type)"
      >
      <option value="label">Label</option>
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="email">Email</option>
        <option value="select">Select</option>
        <option value="checkbox">Checkbox</option>
      </select>
    </div>
    <div v-if="element.type === 'checkbox' || element.type === 'select'">
      <input
        type="checkbox"
        :id="`add-option-${element.id}`"
        class="modal-toggle"
      />
      <div class="modal" :id="`add-option-modal-${element.id}`">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Add New Option</h3>
          <input
            type="text"
            v-model="newOption"
            class="input input-xs sm:input-sm md:input-md input-bordered w-full"
          />
          <div class="modal-action">
            <label
              :for="`add-option-${element.id}`"
              class="btn btn-primary"
              @click="addOption"
              >Add</label
            >
            <label :for="`add-option-${element.id}`" class="btn">Cancel</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    element: Object,
  },
  emits: ["remove", "addOption", "changeType"],
  data() {
    return {
      newOption: "",
    };
  },
  methods: {
    addOption() {
      this.$emit("addOption", this.newOption);
      this.newOption = "";
    },
  },
};
</script>

<style scoped>
.handle {
  cursor: move;
}
</style>

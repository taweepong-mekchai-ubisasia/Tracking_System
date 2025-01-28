<template>
  <div class="w-full flex items-center p-1">
    <div
      class="flex border border-dashed p-1 gap-1"
      :class="element.type === 'label' ? 'w-full' : 'w-auto'"
    >
      <!-- {{ element.fontSize }} -->
      <!-- <span class=" text-5xl">
        {{ element.label }}
      </span> -->
      <!-- <span > -->
      <!-- {{element.values}} -->
      <!-- <ElementsLabel v-for="(o, i) in element.labels" :key="o" :element="{value:o}" :class="' join-item'" @keyup="$emit('changeLabel', o)" /> -->
      <!-- </span> -->
      <!-- <input
        type="text"
        v-model="element.label"
        class="input input-xs sm:input-sm md:input-md input-bordered w-full bg-transparent border-dashed join-item"
      /> -->
      <div class="w-full relative join-item" v-for="(o, i) in element.labels">
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
        <input
          type="text"
          v-model="element.labels[i]"
          class="input input-xs sm:input-sm md:input-md input-bordered w-full bg-transparent border-dashed"
        />
          <!-- @keyup="$emit('changeLabel', o)" -->
      </div>
    </div>
    <div class="join min-w-[50%] min-w-1/3 pr-2" v-if="element.type !== 'label'">
      <input
        v-if="element.type === 'text'"
        :id="`input-${element.id}`"
        type="text"
        class="join-item input input-xs sm:input-sm md:input-md input-bordered w-full"
        :placeholder="element.type === 'text' ? 'ข้อความ' : ''"
        v-for="(o, i) in element.values"
        :key="o"
      />
      <input
        v-else-if="element.type === 'number'"
        :id="`input-${element.id}`"
        type="number"
        class="join-item input input-xs sm:input-sm md:input-md input-bordered w-full"
        :placeholder="element.type === 'text' ? 'ตัวเลข' : ''"
      />
      <input
        v-else-if="element.type === 'date'"
        :id="`input-${element.id}`"
        type="date"
        class="join-item input input-xs sm:input-sm md:input-md input-bordered w-full"
        :placeholder="element.type === 'text' ? 'วันที่' : ''"
      />
      <input
        v-else-if="element.type === 'email'"
        :id="`input-${element.id}`"
        type="email"
        class="join-item input input-xs sm:input-sm md:input-md input-bordered w-full"
        :placeholder="
          element.type === 'text' ? 'ช่องกรอกข้อมูลประเภทข้อความ' : ''
        "
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
      <div
        v-else-if="element.type === 'radio'"
        class="join-item w-full bg-base-100 border border-base-300 flex flex-row flex-nowrap content-center items-center justify-around"
      >
        <div
          v-for="option in element.options"
          :key="option"
          class="form-control"
        >
          <!-- <label class="label cursor-pointer">
            <span class="label-text">{{ option }}</span
            ><br />
            <input type="radio" name="radio-1" class="radio" />
          </label> -->
          <label class="label cursor-pointer">
            <span class="label-text">{{ option }}</span>
            <input
              type="radio"
              name="radio-10"
              class="radio radio-xs sm:radio-sm md:radio-md checked:bg-base-300"
              checked="checked"
            />
          </label>
        </div>
      </div>
      <!-- v-if="
          element.type === 'checkbox' ||
          element.type === 'select' ||
          element.type === 'radio'
        " -->
      <label
        :for="`add-option-${element.id}`"
        class="join-item btn btn-xs sm:btn-sm md:btn-md btn-primary text-white"
      >
        <Icon icon="tabler:plus" class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
      </label>
    </div>
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
      <option value="tel">Tel</option>
      <option value="select">Select</option>
      <option value="checkbox">Checkbox</option>
      <option value="radio">Radio</option>
    </select>
    <!-- v-if="
        element.type === 'checkbox' ||
        element.type === 'select' ||
        element.type === 'radio'
      " -->
    <div>
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
            class="input input-xs sm:input-sm md:input-md input-bordered w-full mt-5"
            placeholder="..."
          />
          <select
            v-model="type"
            class="join-item select select-xs sm:select-sm md:select-md select-bordered w-full mt-1"
          >
            <option value="" disabled>Select Type</option>
            <option value="label">Label</option>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="email">Email</option>
            <option value="tel">Tel</option>
          </select>
          <div class="modal-action">
            <label
              :for="`add-option-${element.id}`"
              class="btn btn-sm btn-primary"
              @click="addOption"
            >
              Add
            </label>
            <label :for="`add-option-${element.id}`" class="btn btn-sm">Cancel</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElementsLabel from "./Elements/Label.vue";
export default {
  components: { ElementsLabel },
  props: {
    element: Object,
  },
  emits: ["remove", "addOption", "changeType"],
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
.handle {
  cursor: move;
}
</style>

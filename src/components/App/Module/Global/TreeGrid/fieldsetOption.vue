<template>
  <div class="flex justify-end text-center items-center">
    <div class="dropdown dropdown-bottom dropdown-end">
      <div tabindex="0" role="button" class="btn btn-xs btn-link">
        <Icon icon="lucide:more-vertical" />
      </div>
      <div
        tabindex="0"
        class="dropdown-content card card-compact bg-base-100 border border-base-300 text-primary-content z-[15] w-64 shadow-xl overflow-auto h-96"
      >
        <div class="card-body h-auto">
          <span
            class="label-text font-semibold mb-2 relative text-white"
            :class="enabled ? 'bg-base-300' : ' bg-primary'"
          >
            Table Columns
            <span class="absolute right-0 top-0 z-10">
              <button
                @click="enabled = !enabled"
                class="btn btn-link btn-xs"
                :class="enabled ? 'text-error' : 'text-white'"
              >
                <Icon icon="bx:edit" />
              </button>
            </span>
          </span>
          <div class="bg-base-100 overflow-auto h-56">
            <draggable
              v-model="base.data.columns"
              group="people"
              @start="drag = true"
              @end="drag = false"
              item-key="id"
              :move="checkMove"
              :disabled="!enabled"
            >
              <template #item="{ element }">
                <div
                  class="flex items-center border px-2"
                  :class="{ 'border-dashed': enabled }"
                >
                  <input
                    :disabled="!enabled"
                    type="checkbox"
                    :checked="isColumnVisible(element)"
                    @change="toggleColumn(element)"
                    class="mr-2"
                  />

                  <span class="mr-2">
                    <button @click="toggleLockColumn(element)">
                      <Icon
                        :icon="
                          isColumnLocked(element)
                            ? 'iconamoon:lock-fill'
                            : 'iconamoon:lock-off-fill'
                        "
                        :class="
                          isColumnLocked(element)
                            ? enabled
                              ? 'text-primary'
                              : 'text-base-300'
                            : enabled
                            ? 'text-error'
                            : 'text-base-200'
                        "
                      />
                    </button>
                  </span>
                  <label>{{ element.column.title }}</label>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import {
  ref,
  reactive,
  computed,
  onMounted,
  defineComponent,
  watch,
  nextTick,
} from "vue";

export default defineComponent({
  components: {
    draggable,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  emits: ["base-edit", "base-remove"],
  setup(props, { emit }) {
    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    // base.value.data.columns = [];

    console.log(base.value);
    console.log(
      "FASASASASASASASASASASASASASASASASASASASASASASASASASASASASASASASASASASASASASASASASASASASAS"
    );

    function toggleColumn(obj) {
      obj.status = !obj.status;
    }

    function toggleLockColumn(obj) {
      obj.lock = !obj.lock;
    }

    function isColumnVisible(obj) {
      return obj.status !== false;
    }

    function isColumnLocked(obj) {
      return obj.lock !== false;
    }

    // onMounted(() => {
    //   nextTick(() => {
    //     // emit("ready", null);
    //   });
    // });

    const checkMove = function (e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    };

    const enabled = ref(false);

    return {
      base,
      toggleColumn,
      toggleLockColumn,
      isColumnVisible,
      isColumnLocked,
      checkMove,
      enabled,
    };
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: 90%;
  max-height: 90%;
}
</style>

<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.modal" />
    <div class="modal z-50">
      <div class="modal-box relative max-w-sm">
        <button
          @click="base.modal = false"
          class="btn btn-xs sm:btn-sm  btn-circle absolute right-2 top-2"
            :disabled="base.loading"
        >
          ✕
        </button>
        <h3 class="text-lg font-bold text-error">REMOVE ITEM</h3>
        <div class="divider mt-1"></div>
        <div class="card-body overflow-auto max-h-[60vh] italic">
          Are your sure for remove this item?
        </div>
        <div class="backdrop-blur sticky top-0 items-center gap-3 px-2 flex">
          <div class="flex-1 form-control mt-6">
            <button
              @click="base.modal = false"
              class="btn btn-xs sm:btn-sm md:btn-md"
              :disabled="base.loading"
            >
              Cancel
            </button>
          </div>
          <div class="flex-1 form-control mt-6">
            <button
              class="btn btn-xs sm:btn-sm md:btn-md btn-error text-white"
              @click="confirm_remove()"
              :disabled="base.loading"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";

import {
  defineAsyncComponent,
  shallowRef,
  computed,
  defineComponent,
  ref,
  watch,
  getCurrentInstance,
} from "vue";

export default defineComponent({
  name: "Remove",
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:modelValue", "update:success"],
  setup(props, { emit }) {
    const { appContext } = getCurrentInstance();
    const moment = appContext.config.globalProperties.$moment;

    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const confirm_remove = async () => {
      if (base.value.loading) return;
      base.value.loading = true;
      try {
        const body = {
          code: base.value.current,
          rows: base.value.rows ? [ base.value.rows ] : [{ code: base.value.code, item: base.value?.item ? base.value.item : null }],
        };
        const path = buildPath(null, base.value.path);
        const res = await fetchQuery({}, "DELETE", path, body);

        if (!res.success) {
          console.error("Failed to save data");
          return;
        }

        if (base.value.current === 0) {
          base.value.current = res.rows[0].code;
        }

        base.value.modal = false;
      } catch (error) {
        console.error("An error occurred during save operation:", error);
      } finally {
        base.value.loading = false;
        emit("update:success", null);
      }
    };

    return {
      base,
      confirm_remove,
    };
  },
});
</script>

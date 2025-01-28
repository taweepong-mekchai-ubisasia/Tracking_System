<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.modal" />
    <div class="modal">
      <div class="modal-box relative p-0">
        <button
          @click="base.modal = false"
          class="btn btn-xs sm:btn-sm btn-link absolute right-2 top-2 no-underline hover:no-underline text-base-content"
          :disabled="base.loading"
        >
          ✕
        </button>
        <!-- <h3 class="text-lg font-bold text-success">Approve Item</h3> -->
        <!-- <div class="divider mt-1"></div> -->
        <div
          class="card-body overflow-auto max-h-[60vh] grid content-center items-center justify-center mt-0"
        >
          <div class="avatar placeholder place-content-center mb-4">
            <div class="w-24 rounded-full border-4 border-success">
              <span class="text-3xl text-success">
                <Icon icon="mingcute:check-fill" />
              </span>
            </div>
          </div>
          <h3 class="text-lg font-bold text-success">
            Are your sure for <span class="underline underline-offset-2 decoration-double">Acknowledge</span> this item?
          </h3>
        </div>

        <div class="backdrop-blur sticky top-0 items-center gap-2 p-4 flex">
          <div class="flex-1 form-control">
            <button
              @click="base.modal = false"
              class="btn btn-xs sm:btn-sm md:btn-md btn-ghost"
              :disabled="base.loading"
            >
              Cancel
            </button>
          </div>
          <div class="flex-1 form-control">
            <button
              class="btn btn-xs sm:btn-sm md:btn-md btn-success text-white"
              @click="confirm()"
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

    const confirm = async () => {
      if (base.value.loading) return;
      base.value.loading = true;
      try {
        const body = {
          code: base.value.current,
          
          process:true,
          rows: base.value.rows
            ? base.value.rows
            : [{ code: base.value.code, process: "approve" }],
        };
        const path = buildPath(null, base.value.path);
        const res = await fetchQuery({}, "PUT", path, body);
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
      confirm,
    };
  },
});
</script>

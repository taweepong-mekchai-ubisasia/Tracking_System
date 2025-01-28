<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.form.modal" />
    <div class="modal" v-if="base.form.modal">
      <div
        class="modal-box relative w-8/12 sm:w-7/12 md:w-6/12 lg:w-4/12 max-w-5xl p-2 lg:p-4 max-h-screen"
      >
        <button
          @click="base.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">NEW TITLE</h3>
        <div class="divider my-1"></div>

        <div class="card-body overflow-auto max-h-[60vh] p-2 lg:p-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text text-xs sm:text-sm md:text-md"
                >Title</span
              >
            </label>
            <input
              type="text"
              placeholder="ระบุหัวข้อ ..."
              class="input input-xs sm:input-sm md:input-md input-bordered border-base-content"
              v-model="base.form.object.name"
            />
          </div>
        </div>
        <div class="backdrop-blur sticky top-0 items-center gap-3 px-0 flex">
          <div class="flex-1 form-control mt-4">
            <button
              @click="base.form.modal = false"
              class="btn btn-xs sm:btn-sm md:btn-md"
              :disabled="base.form.loading"
            >
              Cancel
            </button>
          </div>
          <div class="flex-1 form-control mt-4" @click="fnBase.save()">
            <button
              class="btn btn-primary text-white btn-xs sm:btn-sm md:btn-md"
              :disabled="base.form.loading"
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
  onMounted,
} from "vue";

export default defineComponent({
  inheritAttrs: false,
  name: "Branch",
  components: {},
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    createValue: {
      type: String,
      required: "",
    },
  },
  emits: ["update:modelValue", "update:success"],
  setup(props, { emit }) {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const fnBase = {
      create: () => {
        base.value.form.current = 0;
        base.value.form.object = {
          title: "",
        };
        base.value.form.method = "POST";
        base.value.form.modal = true;
      },
      edit: (code, index) => {
        base.value.form.object = { ...base.value.rows[index] };
        base.value.form.current = code;
        base.value.form.method = "PUT";

        base.value.form.modal = true;
      },
      save: async () => {
        if (base.value.form.loading) return;
        base.value.form.loading = true;
        try {
          const queryBody = {
            code: base.value.form.current,
            rows: [
              {
                ...base.value.form.object,
              },
            ],
          };

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/HR/visitor/visitor_title"
          );
          const method = base.value.form.method || "POST";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
          }

          if (base.value.form.current === 0) {
            base.value.form.current = res.rows[0].code;
          }
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          base.value.form.modal = false;
          base.value.form.loading = false;
          emit("update:success", null);
        }
      },
    };
    onMounted(() => {
      console.log("Mounted Mounted", props.createValue);
      if (props.createValue) {
        base.value.form.object.name = props.createValue;
      }
    });
    watch(
      () => props.createValue,
      (newVal) => {
        if (newVal) {
          base.value.form.object.name = newVal;
        }
      }
    );

    return { base, fnBase };
  },
});
</script>

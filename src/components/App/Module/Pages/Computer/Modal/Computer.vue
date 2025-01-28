<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.form.modal" />
    <div class="modal" v-if="base.form.modal">
      <div
        class="modal-box relative max-w-xl p-2 lg:p-4 max-h-screen"
      >
        <button
          @click="base.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">New Computer</h3>
        <div class="divider my-1"></div>
        <div class="card-body overflow-auto max-h-[60vh] p-2 lg:p-4">
          <!-- {{ base.form.object }} -->
          <div class="grid gap-3 grid-cols-2">
            <div class="form-control">
              <AppModuleGlobalCombobox
                :url="`api/controllers/MYSQL/INTERNAL/IT/type`"
                :label="'ประเภทคอมพิวเตอร์'"
                :selectMode="'single'"
                :image="false"
                :fieldDisplay="'title'"
                :lastDisplay="base.form.object.type_title"
                :lastFile="''"
                :objectData="['code','title']"
                :component="'App/Module/Pages/Computer/Modal/Type'"
                v-model="base.form.object.type"
              />
            </div>
            <div class="form-control">
              <AppModuleGlobalCombobox
                :url="`api/controllers/MYSQL/INTERNAL/IT/manu`"
                :label="'ผู้ผลิต'"
                :selectMode="'single'"
                :image="false"
                :fieldDisplay="'title'"
                :lastDisplay="base.form.object.manu_title"
                :lastFile="''"
                :objectData="['code','title']"
                :component="'App/Module/Pages/Computer/Modal/Manu'"
                v-model="base.form.object.manu"
              />
            </div>
            <div class="form-control col-span-2">
              <AppModuleGlobalCombobox
                :url="`api/controllers/MYSQL/INTERNAL/IT/model`"
                :label="'รุ่น'"
                :selectMode="'single'"
                :image="false"
                :fieldDisplay="'title'"
                :lastDisplay="base.form.object.model_title"
                :lastFile="''"
                :objectData="['code','title']"
                :component="'App/Module/Pages/Computer/Modal/Model'"
                v-model="base.form.object.model"
              />
            </div>
            <div class="form-control">
              <AppModuleGlobalCombobox
                :url="`api/controllers/MYSQL/INTERNAL/IT/property`"
                :label="'ประเภททรัพย์สิน'"
                :selectMode="'single'"
                :image="false"
                :fieldDisplay="'title'"
                :lastDisplay="base.form.object.property_title"
                :lastFile="''"
                :objectData="['code','title']"
                :component="'App/Module/Pages/Computer/Modal/Property'"
                v-model="base.form.object.property"
              />
            </div>
            <div class="form-control">
              <AppModuleGlobalCombobox
                :url="`api/controllers/MYSQL/INTERNAL/IT/network`"
                :label="'เน็ตเวอร์ค'"
                :selectMode="'single'"
                :image="false"
                :fieldDisplay="'title'"
                :lastDisplay="base.form.object.network_title"
                :lastFile="''"
                :objectData="['code','title']"
                :component="'App/Module/Pages/Computer/Modal/Network'"
                v-model="base.form.object.network"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">PO</span>
              </label>
              <input
                type="text"
                placeholder="Type Purchase Order"
                class="input input-xs sm:input-sm md:input-md input-bordered border-base-content text-xs sm:text-sm md:text-md"
                v-model="base.form.object.po"
              />
            </div>
            <div class="form-control">
              <AppModuleGlobalCombobox
                :url="`api/controllers/MYSQL/INTERNAL/IT/source`"
                :label="'อัพเดทแหล่งที่มา'"
                :selectMode="'single'"
                :image="false"
                :fieldDisplay="'title'"
                :lastDisplay="base.form.object.source_title"
                :lastFile="''"
                :objectData="['code','title']"
                :component="'App/Module/Pages/Computer/Modal/Source'"
                v-model="base.form.object.source"
              />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">UUID</span>
            </label>
            <div class="join">
              <input
                type="date"
                placeholder="Type UUID"
                class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content text-sm w-full"
                v-model="base.form.object.uuid_start"
              />
              <button class="join-item btn btn-xs sm:btn-sm md:btn-md disabled:border-base-content disabled:text-black disabled:bg-white" disabled>-</button>
              <input
                type="date"
                placeholder="Type UUID"
                class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content text-sm w-full"
                v-model="base.form.object.uuid_end"
              />
            </div>
          </div>
        </div>
        <div
          class="backdrop-blur sticky top-0 items-center gap-2 xs:px-0 sm:px-0 px-4 flex"
        >
          <div class="flex-1 form-control mt-6">
            <button
              @click="base.form.modal = false"
              class="btn btn-xs sm:btn-sm md:btn-md"
              :disabled="base.form.loading"
            >
              Cancel
            </button>
          </div>
          <div class="flex-1 form-control mt-6" @click="fnBase.save()">
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

import AppModuleGlobalCombobox from "@/components/App/Module/Global/Combobox.vue";

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
  inheritAttrs: false,
  name: "Computer",
  components: {
    AppModuleGlobalCombobox
  },
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

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const fnBase = {
      create: () => {
        base.value.form.current = 0;
        base.value.form.object = {}

        base.value.form.method = "POST";
        base.value.form.modal = true;
      },
      edit: (code, index) => {
        base.value.form.object = base.value.rows[index];
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
              { ...base.value.form.object }
            ],
          };

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/IT/computer"
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

    return { base, fnBase };
  },
});
</script>

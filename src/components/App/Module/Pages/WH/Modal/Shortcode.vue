<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.form.modal" />
    <div class="modal" v-if="base.form.modal">
      <div
        class="modal-box relative w-8/12 sm:w-7/12 md:w-6/12 lg:w-4/12 max-w-5xl p-4 max-h-screen"
      >
        <button
          @click="base.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">Short Code</h3>
        <div class="divider my-1"></div>
        <div class="card-body overflow-auto max-h-[70vh] p-3">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Short Code</span>
            </label>
            <input
              type="text"
              placeholder="Short Code"
              class="input input-bordered border-base-content"
              v-model="base.form.object.short_code"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Data format</span>
            </label>
            <select
              class="join-item select select-bordered border-base-content w-auto"
              v-model="base.form.object.selectType"
            >
              <option selected value="" disabled>Select Option</option>
              <option value="1">SAP</option>
              <option value="2">Rebuild</option>
            </select>
          </div>
          <div v-if="base.form.object.selectType == '2'">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Item Name</span>
              </label>
              <input
                type="text"
                placeholder="Item Name"
                class="input input-bordered border-base-content"
                v-model="base.form.object.item_name"
              />
            </div>
          </div>
          <div v-if="base.form.object.selectType == '1'">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Branch</span>
              </label>
              <select
                class="join-item select select-bordered border-base-content w-auto"
                v-model="base.form.object.wh"
              >
								<option selected value="" disabled>Select Base</option>
                <option value="UBA">UBA</option>
                <option value="UBP">UBP</option>
              </select>
            </div>
            <div class="form-control">
              <div v-if="base.form.method == 'POST'">
								<label class="label" v-if="base.form.object.wh">
									<span class="label-text">Item Name</span>
								</label>
                <AppModuleGlobalSelectSearch
                  v-if="base.form.object.wh == 'UBA' && base.form.modal"
                  :placeholder="'Item Name'"
                  :label="'ItemName'"
                  :code="'ItemCode'"
                  :minChar="1"
                  :delay="0.5"
                  :limit="10"
                  :customClass="`input input-bordered border-base-content `"
                  :current="base.form.object.item_code"
                  @updateValue="
                    (obj) => {
                      base.form.object.item_code = obj.ItemCode;
                      base.form.object.item_name = obj.ItemName;
                    }
                  "
                  :url="`${base.form.url}api/controllers/SAP/UBA/oitm`"
                  :param="`&total=1`"
                />
                <AppModuleGlobalSelectSearch
                  v-if="base.form.object.wh == 'UBP' && base.form.modal"
                  :placeholder="'Item Name'"
                  :label="'ItemName'"
                  :code="'ItemCode'"
                  :minChar="1"
                  :delay="0.5"
                  :limit="10"
                  :customClass="`input input-bordered border-base-content `"
                  :current="base.form.object.item_code"
                  @updateValue="
                    (obj) => {
                      base.form.object.item_code = obj.ItemCode;
                      base.form.object.item_name = obj.ItemName;
                    }
                  "
                  :url="`${base.form.url}api/controllers/SAP/UBP/oitm`"
                  :param="`&total=1`"
                />
              </div>
              <input
                v-else
                type="text"
                placeholder="item_name"
                class="input input-bordered border-base-content"
                v-model="base.form.object.item_name"
                :disabled="true"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Item Code</span>
              </label>
              <input
                type="text"
                placeholder="item_code"
                class="input input-bordered border-base-content input-disabled"
                v-model="base.form.object.item_code"
                readonly
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
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";

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
  name: "Branch",
  components: {
    AppModuleGlobalSelectSearch,
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

    const user = computed(() => store.getters.user);
		const serviceUrl = computed(() => store.getters.serviceUrl);

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const fnBase = {
      create: () => {
        base.value.form.current = 0;
        base.value.form.object = {
					selectType: "",
          short_code: "",
          item_name: "",
          wh: "",
          item_code: "",
        };
				base.value.form.url = serviceUrl.value
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
          // const obj = {
          //   base: base.value,
          // };

          const queryBody = {
            code: base.value.form.current,
            rows: [
              {
                ...base.value.form.object,
              },
            ],
          };

          // const path = `api/controllers/MYSQL/INTERNAL/System/branch`;
          // const saveMethod = base.value.method === "create" ? "POST" : "PUT";
          // const saveResult = await Query.fetch(obj, saveMethod, path, queryBodyData);

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/WH/shelfshort"
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

          // base.value.page = 1;
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

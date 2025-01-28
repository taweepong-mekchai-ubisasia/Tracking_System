<template>
  <teleport to="#app">
    <input
      type="checkbox"
      class="modal-toggle"
      v-model="detail.data.form.modal"
    />
    <div class="modal z-40">
      <div class="modal-box relative max-w-2xl p-2 lg:p-4 max-h-screen">
        <button
          @click="detail.data.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="detail.data.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">System Config</h3>
        <div class="divider my-1"></div>
        <div class="overflow-auto max-h-[80vh]">
          <table class="table table-xs">
            <thead>
              <tr>
                <th>Warehouse</th>
                <th>Department Owners</th>
                <th>Add Department</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(v, i) in base.dept">
                <td class="font-semibold">{{ v.title }}</td>
                <td>
                  <div class="flex flex-col gap-1">
                    <span
                      class="badge badge-sm text-xs font-bold hover:shadow-xl"
                      :class="
                        bg.filter((x) => x.dept == vd.dept).length
                          ? bg.find((x) => x.dept == vd.dept).color
                          : 'badge-error'
                      "
                      v-for="vd in detail.data.rows.filter(
                        (x) => x.wh == v.owner
                      )"
                    >
                      {{ vd.title }}
                      <label
                        class="ml-1 text-white cursor-pointer"
                        @click="
                          fnRemove.item(
                            `${vd.code}`,
                            'api/controllers/MYSQL/INTERNAL/WHI/whi_config'
                          )
                        "
                      >
                        <Icon icon="ic:round-cancel" />
                      </label>
                    </span>
                  </div>
                </td>
                <td class="join">
                  <select
                    class="join-item select select-xs select-bordered w-full"
                    v-model="detail.data.select[i - 1]"
                  >
                    <option
                      v-for="vv in detail.data.dept"
                      :value="vv.code"
                      :disabled="
                        detail.data.rows
                          .filter((x) => x.wh == v.owner)
                          .find((x) => x.dept == vv.code)
                          ? true
                          : false
                      "
                    >
                      {{ vv.title }}
                    </option>
                  </select>
                  <button
                    class="join-item btn btn-xs bg-success text-white"
                    @click="fnDetail.save(i)"
                    :disabled="!detail.data.select[i - 1]"
                  >
                    <Icon icon="dashicons:plus-alt" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <AppModuleGlobalRemove
      v-model="remove"
      @update:success="fnRemove.success"
      ref="removeModal"
    />
  </teleport>
</template>

<script>
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModulePagesWHIndirectModalCatalogItem from "@/components/App/Module/Pages/WHIndirect/Modal/CatalogItem";
import AppModulePagesWHIndirectModalIssue from "@/components/App/Module/Pages/WHIndirect/Modal/Issue";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";
import moment from "moment";

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
  name: "Config",
  components: {
    AppModuleGlobalUpload,
    AppModulePagesWHIndirectModalCatalogItem,
    AppModulePagesWHIndirectModalIssue,
    AppModuleGlobalRemove,
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
    from: {
      type: String,
      default: "request",
    },
  },
  emits: ["update:modelValue", "update:success"],
  created: function () {
    this.moment = moment;
  },
  setup(props, { emit }) {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const bg = ref([
      { dept: "170564984084c6f", color: "bg-orange-500" },
      { dept: "17056498404bf20", color: "bg-amber-500" },
      { dept: "170564984092be0", color: "bg-yellow-500" },
      { dept: "1705649840cabf2", color: "bg-lime-500" },
      { dept: "17056498404fe0b", color: "bg-green-500" },
      { dept: "17056498405bb45", color: "bg-emerald-500" },
      { dept: "1705649840b0cd6", color: "bg-teal-500" },
      { dept: "1721103490tpyEU", color: "bg-cyan-500" },
      { dept: "1721103499WUnje", color: "bg-sky-500" },
    ]);

    const detail = ref({
      pagination: {
        page: 1,
        row: 20,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        dept: [],
        rows: [],
        select: [],
        form: {
          loading: false,
          modal: false,
          object: {
            title: "",
          },
        },
      },
    });

    const remove = ref({
      current: 0,
      model: false,
      path: "",
      loading: false,
    });

    const fnDetail = {
      search: async () => {
        try {
          detail.value.data.rows = [];
          detail.value.data.dept = [];
          detail.value.data.select = [];
          await fnDetail.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (detail.value.pagination.loading) return;
        detail.value.pagination.loading = true;
        try {
          const queryParams = {
            getTotal: true,
          };

          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/WHI/whi_config"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            detail.value.data.dept = res.dept;
            detail.value.data.rows = res.rows;
            detail.value.data.permission = res.permission;
            detail.value.pagination.total = res.total;
            detail.value.pagination.next =
              detail.value.pagination.page * detail.value.pagination.row <
              detail.value.pagination.total;
            detail.value.pagination.back = detail.value.pagination.page > 1;
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          detail.value.pagination.loading = false;

          detail.value.data.form.modal = true;
        }
      },
      save: async (index) => {
        if (detail.value.data.form.loading) return;
        detail.value.data.form.loading = true;
        try {
          const queryBody = {
            code: detail.value.data.form.current,
            rows: [
              {
                wh: base.value.dept[index].owner,
                dept: detail.value.data.select[index - 1],
              },
            ],
          };

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/WHI/whi_config"
          );
          const method = detail.value.data.form.method || "POST";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
          }
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          // detail.value.data.form.modal = false;
          detail.value.data.form.loading = false;
          // emit("update:success", null);

					fnDetail.search();
        }
      },
    };

    const fnRemove = {
      item: (code, path) => {
        remove.value.modal = true;
        remove.value.code = code;
        remove.value.path = path;
      },
      success: () => {
        fnDetail.search();
      },
    };

    return {
      base,
      detail,
      fnDetail,
      remove,
      fnRemove,
      bg,
    };
  },
});
</script>

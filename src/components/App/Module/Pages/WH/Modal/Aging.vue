<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.form.modal" />
    <div class="modal" v-if="base.form.modal">
      <div
        class="modal-box relative p-4 max-h-screen max-w-7xl"
      >
        <button
          class="join-item btn btn-xs w-fit absolute left-4 top-4"
          @click="exportExcel()"
        >
          <Icon icon="file-icons:microsoft-excel" />
          Export
        </button> 
        <button
          @click="base.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">{{ base.form.current }}<br><span class="text-xs text-secondary">( Summary Quantity: {{new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(detail.data.summary)}} KG. )</span></h3>
        <div class="divider my-1"></div>

        <div class="card-body overflow-auto max-h-[75vh] p-3">
          <div class="form-control">
            <div class="overflow-x-auto max-h-[65vh]">
              <table class="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <th>Item Code</th>
                    <td>Item Description</td>
                    <td>Whse</td>
                    <td>Lot no.</td>
                    <td>Date</td>
                    <td>Batch Attribute 2</td>
                    <th class="text-center">STATUS</th>
                    <td class="text-right">Quantity (KG.)</td>
                    <td class="text-right">Summary Shelf Life</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v, i) in detail.data.rows">
                    <th>{{ v.ItemCode }}</th>
                    <td>
                      <div class="flex items-center space-x-3">
                        <div>
                          <div>
                            {{ v.ItemName }}
                          </div>
                          <div>
                            <span class="font-semibold">Fname:</span> {{ v.FrgnName || '-'}}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{{ v.Whse }}</td>
                    <td>{{ v.LotNum }}</td>
                    <td>
                      <div class="flex items-center space-x-3">
                        <div>
                          <div>
                            Manufacturing: <span class="italic font-semibold text-blue-500">{{ $moment(v.MnfDate.date).format("DD-MM-YYYY") }}</span>
                          </div>
                          <div>
                            Expiration: <span class="italic font-semibold text-red-500">{{ $moment(v.ExpDate.date).format("DD-MM-YYYY") }}</span>
                          </div>
                          <div>
                            Receipt: <span class="italic font-semibold text-gray-500">{{ $moment(v.InDate.date).format("DD-MM-YYYY") }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{{ v.IntrSerial }}</td>
                    <th
                      class="text-center font-bold text-gray-700"
                      :class="v.Statuss == 'Expire' ? 'bg-error' : v.Statuss == 'Warning' ? 'bg-warning' : v.Statuss == 'Normal' ? 'bg-success' : 'bg-gray-500 text-white'" 
                    >
                      {{ v.Statuss }}
                    </th>
                    <td class="text-right">
                      {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(v.Quantity) }}
                    </td>
                    <td :class="`text-right ${v.DateDiff < 0 ? 'text-error font-bold' : v.DateDiff < 30 ? 'text-orange-400 font-bold' : 'font-semibold'}`">
                      <!-- {{ ($moment(v.expire)).diff($moment(), 'day') }} -->
                      {{ v.DateDiff }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <AppModuleGlobalPagination
            v-model="detail.pagination"
            @update:page="fnBase.get"
          />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";

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
  name: "Stock",
  components: {
    AppModuleGlobalPagination
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

    const detail = ref({
      pagination: {
        page: 1,
        row: 10,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        summary: "",
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            title: "",
          },
        },
        batch_parent: 0,
      }
    });

    const fnBase = {
      search: async () => {
        try {
          detail.value.pagination.page = 1;
          await fnBase.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        console.log(base.value.form.current)
        if (!base.value.form.current) return;
        if (detail.value.pagination.loading) return;
        detail.value.pagination.loading = true;
        base.value.form.loading = true;
        try {
          const queryParams = {
            page: detail.value.pagination.page,
            row: detail.value.pagination.row,
            range: base.value.form.current,
            getTotal: true,
          };
          base.value.form.condition.substr(0, 2) == 'fg' ? queryParams['fg'] = true : queryParams['rm'] = true;

          const path = buildPath(
            queryParams,
            `api/controllers/SAP/${base.value.form.condition.substr(2)}/Inventory/RBTN`
          );
          const res = await fetchQuery({}, "GET", path);

          if (res.success) {
            detail.value.data.summary = res.summary;
            detail.value.data.rows = res.rows;
            detail.value.pagination.total = res.total;
            detail.value.pagination.next =
              detail.value.pagination.page * detail.value.pagination.row <
              detail.value.pagination.total;
            detail.value.pagination.back = detail.value.pagination.page > 1;
          } else {
            console.error("Error fetching detail:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          detail.value.pagination.loading = false;
          base.value.form.loading = false;
          base.value.form.modal = true;
        }
      },
    };

    const exportExcel = () => {
      return window.open(`${serviceUrl.value}api/controllers/SAP/Excel/${base.value.form.condition.substr(2)}/wh?for=expire_inspec&total=true&range=${
        base.value.form.current}&whNot=AHS${base.value.form.condition.substr(0, 2) == 'fg' ? `&fg=true` : `&rm=true`}`);
    }

    return { base, fnBase, detail, exportExcel };
  },
});
</script>

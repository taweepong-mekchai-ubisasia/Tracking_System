<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.form.modal_movement" />
    <div class="modal" v-if="base.form.modal_movement">
      <div
        class="modal-box relative p-4 max-h-screen"
        :class="detail.planning ? 'max-w-5xl' : 'max-w-lg'"
      >
        <button
          class="join-item btn btn-xs w-fit absolute left-4 top-4"
          @click="exportExcel()"
        >
          <Icon icon="file-icons:microsoft-excel" />
          Export
        </button> 
        <button
          @click="base.form.modal_movement = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">{{ base.form.object.ItemCode }}</h3>
        <div class="divider my-1"></div>

        <div class="card-body overflow-auto max-h-[70vh] p-3">
          <div class="flex justify-center" v-if="detail.pagination.loading">
            <span class="loading loading-spinner loading-lg"></span>
          </div>
          <div class="form-control" v-else>
            <div class="overflow-x-auto max-h-[60vh]">
              <table class="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr v-if="detail.planning">
                    <td colspan="6"></td>
                    <td class="text-right">In Stock:</td>
                    <td class="text-right">
                      {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(base.form.object.InStock)}}
                    </td>
                  </tr>
                  <tr>
                    <td>#</td>
                    <td>Document</td>
                    <td v-if="detail.planning">CardName</td>
                    <td>Order Date</td>
                    <td v-if="!detail.planning">Start Date</td>
                    <td>Delivery Date</td>
                    <td v-if="detail.planning" class="text-right">Ordered</td>
                    <td class="text-right">Committed</td>
                    <td v-if="detail.planning" class="text-right">Available</td>
                    <td v-if="detail.planning">Unit of Measure</td>
                    <td v-if="detail.planning" class="text-center">Item/Unit</td>
                    <td v-if="detail.planning">Warehouse</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v, i) in detail.data.rows">
                    <td class="font-bold">{{ i+1 }}</td>
                    <td>{{ v.Document }}</td>
                    <td v-if="detail.planning">{{ v.CardName }}</td>
                    <td>
                      {{ $moment(v.PostDate.date).format("DD-MM-YYYY") }}
                    </td>
                    <td class="font-semibold" :class='$moment(v.StartDate.date).format("YYYY-MM-DD") < $moment().format("YYYY-MM-DD") ? "text-error" : ""'>
                      {{ $moment(v.StartDate.date).format("DD-MM-YYYY") }}
                    </td>
                    <td v-if="!detail.planning">
                      {{ $moment(v.DueDate.date).format("DD-MM-YYYY") }}
                    </td>
                    <td class="text-right" v-if="detail.planning">
                      {{ v.Series ? new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(v.Committed) : '' }}
                    </td>
                    <td class="text-right">
                      {{ !v.Series ? new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(v.Committed) : '' }}
                    </td>
                    <td v-if="detail.planning" class="text-right font-bold">
                      {{ 
                        new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(parseFloat(base.form.object.InStock) 
                          + parseFloat(detail.data.rows.filter((x ,j) => j <= i && x.Series).reduce((sum, x) => sum + parseFloat(x.Committed), 0))
                          - parseFloat(detail.data.rows.filter((x ,j) => j <= i && !x.Series).reduce((sum, x) => sum + parseFloat(x.Committed), 0))
                        )
                      }}
                    </td>
                    <td v-if="detail.planning">{{ v.InvntryUom }}</td>
                    <td v-if="detail.planning" class="text-center">
                      {{ Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(v.NumInBuy) }}
                    </td>
                    <td v-if="detail.planning">{{ v.WhsName }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr v-if="detail.planning">
                    <td colspan="4"></td>
                    <td class="text-right">Summary:</td>
                    <td class="text-right">
                      {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(parseFloat(detail.data.sumOrder)) }}
                    </td>
                    <td class="text-right">
                      {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(parseFloat(detail.data.sumCommit)) }}
                    </td>
                  </tr>
                  <tr v-else>
                    <td colspan="2"></td>
                    <td class="text-right">In Stock:</td>
                    <td class="text-right">
                      {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(base.form.object.InStock)}}
                    </td>
                    <td class="text-right">Summary:</td>
                    <td class="text-right">
                      {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(detail.data.sumCommit)}}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
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
} from "vue";

export default defineComponent({
  inheritAttrs: false,
  name: "Movement",
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
    const serviceUrl = computed(() => store.getters.serviceUrl);

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    
    const detail = ref({
      pagination: {
        page: 1,
        row: 30,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            title: "",
          },
        },
        planning: false,
        sunCommit: 0,
        sunOrder: 0
      },
      search: [
        {
          type: "date",
          id: "dateFrom",
          placeholder: "Search",
          label: "Start Date",
          value: "",
        },
        {
          type: "date",
          id: "dateTo",
          placeholder: "Search",
          label: "End Date",
          value: "",
        },
      ],
    });

    const fnBase = {
      edit: (code, index, dateFrom = null, dateTo = null, dept = null) => {
        base.value.form.object = { ...base.value.rows[index] };
        base.value.form.current = code;
        detail.value.search[0].value = dateFrom
        detail.value.search[1].value = dateTo
        
        if (dept) detail.value.planning = true;
        base.value.form.method = "PUT";

        base.value.form.modal_movement = true;
        fnDetail.search()
      },
    };

    const fnDetail = {
      search: async () => {
        try {
          detail.value.pagination.page = 1;
          await fnDetail.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (detail.value.pagination.loading) return;
        detail.value.pagination.loading = true;
        try {
          console.log(detail.value.planning)
          const queryParams = {
            page: detail.value.pagination.page,
            row: detail.value.pagination.row,
            search: detail.value.search,
            getTotal: true,
            code: base.value.form.current,
            planning: detail.value.planning,
          };
          const path = buildPath(
            queryParams,
            `api/controllers/SAP/${base.value.company}/Inventory/inven_status`
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            res['sumCommit'] = 0
            res['sumOrder'] = 0
            res.rows.forEach((v, i) => {
              if (v.Series) res.sumOrder += parseFloat(v.Committed);
              else res.sumCommit += parseFloat(v.Committed);
            });

            detail.value.data.rows = res.rows;
            detail.value.data.sumCommit = res.sumCommit;
            detail.value.data.sumOrder = res.sumOrder;
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
          setTimeout(() => {
            detail.value.pagination.loading = false;
          }, 200);
        }
      },
    }

    const exportExcel = () => {
      return window.open(`${serviceUrl.value}api/controllers/SAP/Excel/${base.value.company}/wh?for=${
        detail.value.planning ? 'inven_status_atp&planning=1' : 'inven_status_detail'}&total=1&instock=${
      base.value.form.object.InStock}&code=${base.value.form.current}${detail.value.search[0].value ? `&dateFrom=${
        detail.value.search[0].value}` : ''}${detail.value.search[1].value ? `&dateTo=${detail.value.search[1].value}` : ''}`);
    }

    return { base, detail, fnBase, exportExcel };
  },
});
</script>

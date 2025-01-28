<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.form.modal_batch" />
    <div class="modal" v-if="base.form.modal_batch">
      <div
        class="modal-box relative max-w-5xl p-4 max-h-screen"
      >
        <button
          class="join-item btn btn-xs w-fit absolute left-4 top-4"
          :disabled="detail.data.rows.length == 0"
          @click="exportExcel()"
        >
          <Icon icon="file-icons:microsoft-excel" />
          Export
        </button> 
        <button
          @click="base.form.modal_batch = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">Batch Number Transaction</h3>
        <div class="divider my-1"></div>

        <div class="card-body overflow-auto max-h-[70vh] p-3">
          <div class="flex justify-center" v-if="detail.pagination.loading">
            <span class="loading loading-spinner loading-lg"></span>
          </div>
          <div class="form-control" v-else>
            <div class="overflow-x-auto max-h-[60vh]">
              <div v-if="!detail.pagination.loading && detail.data.rows.length == 0">
                <AppModuleGlobalEmptyData
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <table class="table table-xs table-pin-rows table-pin-cols" v-else>
                <thead>
                  <tr>
                    <td>Item No.</td>
                    <td>Item Description</td>
                    <td>Batch</td>
                    <td class="text-right">Whse</td>
                    <td class="text-right">Quantity</td>
                    <td>Batch Attribute 1</td>
                    <td>Expiration Date</td>
                    <td>Manufacturing Date</td>
                    <td>Admission Date</td>
                    <!-- <td>System Number</td>
                    <td>Origin</td> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v, i) in detail.data.rows" :class="base.transaction.find(x => x.batch == v.BatchNum) ? 'cursor-not-allowed' : 'cursor-pointer hover'" @click="base.transaction.find(x => x.batch == v.BatchNum) ? '' : fnBase.select(i)">
                    <td>{{ v.ItemCode }}</td>
                    <td>{{ v.ItemName }}</td>
                    <td class="font-semibold">{{ v.BatchNum }}</td>
                    <td class="text-right">{{ v.WhsCode }}</td>
                    <td class="text-right font-bold">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(v.Quantity) }}</td>
                    <td>{{ v.SuppSerial }}</td>
                    <td>{{ $moment(v.ExpDate.date).format("DD-MM-YYYY") }}</td>
                    <td>{{ $moment(v.PrdDate.date).format("DD-MM-YYYY") }}</td>
                    <td>{{ $moment(v.InDate.date).format("DD-MM-YYYY") }}</td>
                    <!-- <td>{{ v.SysNumber }}</td>
                    <td>{{ v.U_Origin }}</td> -->
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3"></td>
                    <td>Summary: </td>
                    <td class="text-right">
                      {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(detail.data.sum)}}
                    </td>
                    <td colspan="6"></td>
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
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";

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
  components: {
    AppModuleGlobalEmptyData
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
        batch_parent: 0,
      }
    });

    const fnBase = {
      edit: (code, index, array) => {
        base.value.form.object = { ...base.value.rows[index] };
        base.value.form.current = code;
        base.value.form.method = "PUT";

        detail.value.batch_parent = array+index;

        base.value.form.modal_batch = true;
        fnDetail.search()
      },
      select: (index) => {
        base.value.transaction.push({
          code: detail.value.data.rows[index].ItemCode,
          batch: detail.value.data.rows[index].BatchNum,
          qty: '',
          packsize: '',
          unit: '',
          pallet: '',
        })

        if (detail.value.data.rows[index].ItemName.toLowerCase().indexOf('kg') > -1) {
          let descrip = detail.value.data.rows[index].ItemName.replace('(', '');
          descrip = descrip.replace(')', '');
          descrip = descrip.replace('x', ' ');
          descrip = descrip.replace('k', ' k');

          let descrip_array = descrip.split(' ');

          if (detail.value.data.rows[index].WhsCode.indexOf('FC2') > -1) {
            base.value.transaction[base.value.transaction.length-1].qty = detail.value.data.rows[index].Quantity/descrip_array[1];
          } else {
            base.value.transaction[base.value.transaction.length-1].qty = 1;
          }
          base.value.transaction[base.value.transaction.length-1].packsize = descrip_array[1]
          base.value.transaction[base.value.transaction.length-1].unit = descrip_array[2].toLowerCase()
        }

        base.value.form.modal_batch = false;
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
          const queryParams = {
            page: detail.value.pagination.page,
            row: detail.value.pagination.row,
            getTotal: true,
            ItemCode: base.value.form.current,
          };
          const path = buildPath(
            queryParams,
            `api/controllers/SAP/${base.value.company}/Inventory/fix_lot`
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            res['sum'] = 0
            res.rows.forEach((v, i) => {
              res.sum += parseFloat(v.Quantity);
            });

            detail.value.data.rows = res.rows;
            detail.value.data.sum = res.sum;
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
          }, 100);
        }
      },
    }

    const exportExcel = () => {
      return window.open(`${serviceUrl.value}api/controllers/SAP/Excel/${base.value.company}/wh?for=inven_status_batch&total=1&ItemCode=${base.value.form.current}`);
    }

    return { base, detail, fnBase, exportExcel };
  },
});
</script>

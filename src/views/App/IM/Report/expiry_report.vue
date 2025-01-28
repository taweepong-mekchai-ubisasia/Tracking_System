<template>
  <AppLayout ref="AppLayoutComponent">
    <template #modal>
      <!-- <AppModulePagesWHModalMovement
        v-model="base.data"
        @update:success="fnBase.success"
        ref="baseModal"
      />
      <AppModulePagesWHModalBatch
        v-model="base.data"
        @update:success="fnBase.success"
        ref="batchModal"
      /> -->
    </template>
    <template #view>
      <div class="grid grid-cols-1 gap-3">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-5">
            <div>
              <div
                v-if="base.pagination.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div :class="`${base.pagination.loading ? 'blur-sm' : ''}`">
                <div ref="titleZone">
                  <div
                    class="gap-2 sm:gap-4 flex-row flex w-full justify-end items-center relative"
                  >
                    <h3 class="text-lg font-bold text-primary sm:block hidden">PRODUCT&nbsp;EXPIRY&nbsp;DATE&nbsp;INSPECTION</h3>
                    <div
                      class="gap-2 sm:gap-4 flex-row flex w-full justify-end relative"
                    >
                      <button
                        class="join-item btn sm:btn-sm btn-xs"
                        @click="exportExcel()"
                      >
                        <Icon icon="file-icons:microsoft-excel" />
                      </button>
                      <AppModuleGlobalSearchV2
                        @update:search="fnBase.search"
                        v-model="base.search"
                        :loading="base.pagination.loading"
                      />
                      <select
                        class="join-item select sm:select-sm select-xs select-bordered bg-primary text-white font-semibold"
                        v-model="base.data.company"
                        @change="
                          base.pagination.page = 1;
                          base.data.transaction = [];
                          base.search[0].value = '';
                          base.search[1].value = '';
                          base.search[2].value = '';
                          base.data.condition = 'all'
                          wh = [ 
                            `${base.data.company == 'UBA' ? 'A' : 'P'}FC`,
                            `${base.data.company == 'UBA' ? 'A' : 'P'}FC2`,
                            `${base.data.company == 'UBA' ? 'A' : 'P'}HS`,
                            `${base.data.company == 'UBA' ? 'A' : 'P'}LB`,
                            `${base.data.company == 'UBA' ? 'A' : 'P'}PD`,
                            `${base.data.company == 'UBA' ? 'A' : 'P'}QC`,
                            `${base.data.company == 'UBA' ? 'A' : 'P'}RE`,
                            `${base.data.company == 'UBA' ? 'A' : 'P'}RT`,
                            `${base.data.company == 'UBA' ? 'A' : 'P'}WS`,
                            `${base.data.company == 'UBA' ? 'A' : 'P'}CU` 
                          ];
                          fnBase.search();
                        "
                      >
                        <option value="UBP">UBP</option>
                        <option value="UBA">UBA</option>
                      </select>
                    </div>
                  </div>
                  <div class="divider my-1"></div>
                  <!-- {{ wh }} -->
                  <div class="border-2 rounded-xl grid lg:grid-cols-10 grid-cols-5">
                    <div class="form-control bg-base-200 rounded-l-xl">
                      <label class="label cursor-pointer flex justify-center gap-2">
                        <input type="checkbox" class="checkbox checkbox-xs" :value="`${base.data.company == 'UBA' ? 'A' : 'P'}CU`" v-model="wh" />
                        <span class="label-text text-xs">Customer</span>
                      </label>
                    </div>
                    <div class="form-control">
                      <label class="label cursor-pointer flex justify-center gap-2">
                        <input type="checkbox" class="checkbox checkbox-xs" :value="`${base.data.company == 'UBA' ? 'A' : 'P'}FC`" v-model="wh" />
                        <span class="label-text text-xs">FAC</span>
                      </label>
                    </div>
                    <div class="form-control bg-base-200">
                      <label class="label cursor-pointer flex justify-center gap-2">
                        <input type="checkbox" class="checkbox checkbox-xs" :value="`${base.data.company == 'UBA' ? 'A' : 'P'}FC2`" v-model="wh" />
                        <span class="label-text text-xs">FAC2</span>
                      </label>
                    </div>
                    <div class="form-control">
                      <label class="label cursor-pointer flex justify-center gap-2">
                        <input type="checkbox" class="checkbox checkbox-xs" :value="`${base.data.company == 'UBA' ? 'A' : 'P'}HS`" v-model="wh" />
                        <span class="label-text text-xs">Hold Store</span>
                      </label>
                    </div>
                    <div class="form-control bg-base-200">
                      <label class="label cursor-pointer flex justify-center gap-2">
                        <input type="checkbox" class="checkbox checkbox-xs" :value="`${base.data.company == 'UBA' ? 'A' : 'P'}LB`" v-model="wh" />
                        <span class="label-text text-xs">Lab</span>
                      </label>
                    </div>
                    <div class="form-control">
                      <label class="label cursor-pointer flex justify-center gap-2">
                        <input type="checkbox" class="checkbox checkbox-xs" :value="`${base.data.company == 'UBA' ? 'A' : 'P'}PD`" v-model="wh" />
                        <span class="label-text text-xs">Production</span>
                      </label>
                    </div>
                    <div class="form-control bg-base-200">
                      <label class="label cursor-pointer flex justify-center gap-2">
                        <input type="checkbox" class="checkbox checkbox-xs" :value="`${base.data.company == 'UBA' ? 'A' : 'P'}QC`" v-model="wh" />
                        <span class="label-text text-xs">QC</span>
                      </label>
                    </div>
                    <div class="form-control">
                      <label class="label cursor-pointer flex justify-center gap-2">
                        <input type="checkbox" class="checkbox checkbox-xs" :value="`${base.data.company == 'UBA' ? 'A' : 'P'}RE`" v-model="wh" />
                        <span class="label-text text-xs">Retain</span>
                      </label>
                    </div>
                    <div class="form-control bg-base-200">
                      <label class="label cursor-pointer flex justify-center gap-2">
                        <input type="checkbox" class="checkbox checkbox-xs" :value="`${base.data.company == 'UBA' ? 'A' : 'P'}RT`" v-model="wh" />
                        <span class="label-text text-xs">R&T</span>
                      </label>
                    </div>
                    <div class="form-control">
                      <label class="label cursor-pointer flex justify-center gap-2">
                        <input type="checkbox" class="checkbox checkbox-xs" :value="`${base.data.company == 'UBA' ? 'A' : 'P'}WS`" v-model="wh" />
                        <span class="label-text text-xs">Waste</span>
                      </label>
                    </div>
                  </div>
                  <div class="grid sm:grid-cols-4 grid-cols-2 gap-3 mt-3">
                    <div 
                      class="border-4 border-t border-l rounded-xl p-1 items-center shadow cursor-pointer hover:shadow-lg"
                      :class="base.data.condition == 'all' ? 'border-white text-white bg-info' : 'border-info bg-base-100'"
                      @click="
                        base.data.condition = 'all';
                        fnBase.search();
                      "
                    >
                      <h3 class="font-bold">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(parseFloat(base.data.summary.normal)+parseFloat(base.data.summary.warning)+parseFloat(base.data.summary.expire)) }}</h3>
                      <h3 class="font-bold">Total Qty.</h3>
                    </div>
                    <div 
                      class="border-4 border-t border-l rounded-xl p-1 items-center shadow cursor-pointer hover:shadow-lg"
                      :class="base.data.condition == 'normal' ? 'border-white text-white bg-success' : 'border-success bg-base-100'"
                      @click="
                        base.data.condition = 'normal';
                        fnBase.search();
                      "
                    >
                      <h3 class="font-bold">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(base.data.summary.normal) }}</h3>
                      <h3 class="font-bold">Normal Qty.</h3>
                    </div>
                    <div 
                      class="border-4 border-t border-l rounded-xl p-1 items-center shadow cursor-pointer hover:shadow-lg"
                      :class="base.data.condition == 'warning' ? 'border-white text-white bg-warning' : 'border-warning bg-base-100'"
                      @click="
                        base.data.condition = 'warning';
                        fnBase.search();
                      "
                    >
                      <h3 class="font-bold">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(base.data.summary.warning) }}</h3>
                      <h3 class="font-bold">Warning Qty.</h3>
                    </div>
                    <div 
                      class="border-4 border-t border-l rounded-xl p-1 items-center shadow cursor-pointer hover:shadow-lg"
                      :class="base.data.condition == 'expire' ? 'border-white text-white bg-error' : 'border-error bg-base-100'"
                      @click="
                        base.data.condition = 'expire';
                        fnBase.search();
                      "
                    >
                      <h3 class="font-bold">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(base.data.summary.expire) }}</h3>
                      <h3 class="font-bold">Expire Qty.</h3>
                    </div>
                  </div>
                </div>
                <div
                  class="overflow-x-auto w-full my-2"
                  :style="{
                    maxHeight: contentHeight,
                    minHeight: contentHeight,
                  }"
                >
                  <div
                    v-if="base.pagination.loading"
                    class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
                  >
                    <AppModuleGlobalLoadingText
                      :type="'text'"
                      :class="`p-4 py-12 text-3xl text-center`"
                    />
                  </div>
                  <div class="w-full my-2">
                    <div v-if="!base.pagination.loading && base.data.rows.length == 0">
                      <AppModuleGlobalEmptyData
                        :class="`p-4 py-12 text-3xl text-center`"
                      />
                    </div>
                    <table class="table table-xs table-pin-rows table-pin-cols table-zebra-zebra" v-else>
                      <thead>
                        <tr>
                          <th>Item Code</th>
                          <td>Item Description</td>
                          <td>Item Fname</td>
                          <td>Whse</td>
                          <td>Lot no.</td>
                          <td class="text-center">Manufacturing Date</td>
                          <td class="text-center">Expiration Date</td>
                          <td class="text-center">Receipt Date</td>
                          <td>Batch Attribute 2</td>
                          <th class="text-center">STATUS</th>
                          <td v-if="base.search[3].value" class="text-right">ราคาต่อหน่วย</td>
                          <td class="text-right">Quantity (KG.)</td>
                          <td v-if="base.search[3].value" class="text-right">มูลค่าของสินค้าคงคลัง</td>
                          <td class="text-right">Summary Shelf Life</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(row, i) in base.data.rows" class="hover">
                          <th>{{ row.ItemCode }}</th>
                          <td>{{ row.ItemName }}</td>
                          <td>{{ row.FrgnName }}</td>
                          <td>{{ row.Whse }}</td>
                          <td>{{ row.LotNum }}</td>
                          <td class="text-center">{{ $moment(row.MnfDate.date).format("DD-MM-YYYY") }}</td>
                          <td class="text-center">{{ $moment(row.ExpDate.date).format("DD-MM-YYYY") }}</td>
                          <td class="text-center">{{ $moment(row.InDate.date).format("DD-MM-YYYY") }}</td>
                          <td>{{ row.IntrSerial }}</td>
                          <th
                            class="text-center font-bold text-gray-700"
                            :class="row.Statuss == 'Expire' ? 'bg-error' : row.Statuss == 'Warning' ? 'bg-warning' : row.Statuss == 'Normal' ? 'bg-success' : 'bg-gray-500 text-white'" 
                          >
                          <!-- :class="($moment(row.expire)).diff($moment(), 'day') < 0 ? 'bg-error' : ($moment(row.expire)).diff($moment(), 'day') < 30 ? 'bg-warning' : 'bg-success'"  -->
                            <!-- {{ ($moment(row.expire)).diff($moment(), 'day') < 0 ? 'Expire' : ($moment(row.expire)).diff($moment(), 'day') < 30 ? 'Warning' : 'Normal' }} -->
                            {{ row.Statuss }}
                          </th>
                          <td v-if="base.search[3].value" class="text-right">
                            {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(row.AvgPrice) }}
                          </td>
                          <td class="text-right">
                            {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(row.Quantity) }}
                          </td>
                          <td v-if="base.search[3].value" class="text-right">
                            {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(row.AvgPrice*row.Quantity) }}
                          </td>
                          <td :class="`text-right ${row.DateDiff < 0 ? 'text-error font-bold' : row.DateDiff < 30 ? 'text-orange-400 font-bold' : 'font-semibold'}`">
                            <!-- {{ ($moment(row.expire)).diff($moment(), 'day') }} -->
                            {{ row.DateDiff }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <AppModuleGlobalPagination
                  v-model="base.pagination"
                  @update:page="fnBase.get"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import { useContentHeight } from "@/composables/useContentHeightDynamic";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref, getCurrentInstance } from "vue";

import AppLayout from "@/components/App/layout.vue";

import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";

import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModuleGlobalOptionSelection from "@/components/App/Module/Global/OptionSelection.vue";
import AppModuleGlobalCombobox from "@/components/App/Module/Global/Combobox.vue";
// import Query from "@/assets/js/fetch.js";

export default {
  name: "ExpiryInspection",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModuleGlobalOptionSelection,
    AppModuleGlobalRemove,
    AppModuleGlobalCombobox
  },
  setup() {
    const { appContext } = getCurrentInstance();
    const moment = appContext.config.globalProperties.$moment;

    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);
    const serviceUrl = computed(() => store.getters.serviceUrl);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone, 2);

    const base = ref({
      pagination: {
        page: 1,
        row: 20,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        summary: [],
        rows: [],
        form: {
          loading: false,
          object: {},
        },
        company: 'UBP',
        condition: 'all',
      },
      search: [
        {
          type: "search",
          id: "q",
          placeholder: "Search",
          label: "Search",
          value: "",
        },
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
        {
          type: "checkbox",
          id: "Cost",
          placeholder: "Cost",
          label: "Cost",
          value: false,
        },
      ],
    });

    const wh = ref([ 
      `${base.value.data.company == 'UBA' ? 'A' : 'P'}FC`,
      `${base.value.data.company == 'UBA' ? 'A' : 'P'}FC2`,
      `${base.value.data.company == 'UBA' ? 'A' : 'P'}HS`,
      `${base.value.data.company == 'UBA' ? 'A' : 'P'}LB`,
      `${base.value.data.company == 'UBA' ? 'A' : 'P'}PD`,
      `${base.value.data.company == 'UBA' ? 'A' : 'P'}QC`,
      `${base.value.data.company == 'UBA' ? 'A' : 'P'}RE`,
      `${base.value.data.company == 'UBA' ? 'A' : 'P'}RT`,
      `${base.value.data.company == 'UBA' ? 'A' : 'P'}WS`,
      `${base.value.data.company == 'UBA' ? 'A' : 'P'}CU` 
    ]);

    const fnBase = {
      search: async () => {
        try {
          base.value.pagination.page = 1;
          await fnBase.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (base.value.pagination.loading) return;
        base.value.pagination.loading = true;
        try {
          const queryParams = {
            page: base.value.pagination.page,
            row: base.value.pagination.row,
            search: base.value.search,
            getTotal: true,
            debug: true
          };

          switch(base.value.data.condition) {
            case 'normal':
              queryParams['normal_total'] = true;
              break;
            case 'warning':
              queryParams['warning_total'] = true;
              break;
            case 'expire':
              queryParams['expire_total'] = true;
              break;
            default:
              // code block
          }

          let temp = "";
          wh.value.forEach((x, i) => {
            if (i) temp += ",";
            temp += "'";
            temp += x;
            temp += "'";
          })
          // console.log(temp)
          queryParams['wh'] = temp;

          const path = buildPath(
            queryParams,
            `api/controllers/SAP/${base.value.data.company}/Inventory/RBTN`
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            base.value.data.summary = res.summary;

            res.rows.forEach(x => {
              // console.log(x.LotNum, x.ExpDate)
              x['expire'] = x.IntrSerial ? moment(x.IntrSerial, 'DD.MM.YY').format("YYYY-MM-DD HH:mm:ss:000000") : x.ExpDate?.date;
            })

            base.value.data.rows = res.rows;
            base.value.pagination.total = res.total;
            base.value.pagination.next =
              base.value.pagination.page * base.value.pagination.row <
              base.value.pagination.total;
            base.value.pagination.back = base.value.pagination.page > 1;
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          base.value.pagination.loading = false;
        }
      },
      success() {
        base.value.pagination.page = 1;
        fnBase.search();
      }
    };

    fnBase.search();

    const exportExcel = () => {
      let status = "";
      switch(base.value.data.condition) {
        case 'normal':
          status = "normal_total";
          break;
        case 'warning':
          status = "warning_total";
          break;
        case 'expire':
          status = "expire_total";
          break;
        default:
          // code block
      }

      let temp = "";
      wh.value.forEach((x, i) => {
        if (i) temp += ",";
        temp += "'";
        temp += x;
        temp += "'";
      })

      return window.open(`${serviceUrl.value}api/controllers/SAP/Excel/${base.value.data.company}/wh?for=expire_inspec&total=true${
        base.value.search[0].value ? `&q=${base.value.search[0].value}` : ""}${
      base.value.search[1].value ? `&dateFrom=${base.value.search[1].value}` : ''}${
        base.value.search[2].value ? `&dateTo=${base.value.search[2].value}` : ''}${
      status ? `&${status}=true` : ''}${base.value.search[3].value ? `&show=true` : ''}${temp ? `&wh=${temp}` : ''}`);
    }

    return {
      base,
      fnBase,
      exportExcel,
      titleZone,
      contentHeight,
      AppLayoutComponent,
      // descripObj
      wh
    };
  },
  watch: {
    "wh": function (v) {
      console.log(v)
      if (v) {
        this.fnBase.search();
      }
    }
  }
};
</script>

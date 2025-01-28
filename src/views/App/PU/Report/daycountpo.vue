<template>
  <AppLayout ref="AppLayoutComponent">
    <!-- <template #modal></template> -->
    <template #view>
      <div class="grid grid-cols-1 gap-6">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-2 lg:p-4">
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
                    <h3 class="text-xl font-extrabold text-primary px-4 sm:block hidden">PR&nbsp;to&nbsp;PO&nbsp;day&nbsp;count&nbsp;report<br><span class="text-sm text-primary-content">( ข้อมูลระยะเวลาการทำรายการ PO )</span></h3>
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
                    </div>
                  </div>
                  <div class="divider my-1"></div>
                  <div class="grid lg:grid-cols-4 grid-cols-2 gap-3" v-if="base.pagination.total">
                    <div class="border-2 border-dashed rounded-xl p-1 flex items-center gap-3">
                      <h3 class="font-bold ml-5">Average :</h3>
                    </div>
                    <div class="border-2 border-dashed rounded-xl p-1 flex items-center gap-3">
                      <div class="badge badge-info badge-md ml-5"></div>
                      <div class="flex gap-3" v-if="!avg.loading">
                        <h3><span class="font-bold">{{ avg.data.form.object.dayPRtoDraft }}</span> <span class="text-sm">วัน</span></h3>
                        <h3><span class="font-bold">{{ avg.data.form.object.hourPRtoDraft }}</span> <span class="text-sm">ชั่วโมง</span></h3>
                      </div>
                      <span class="loading loading-dots loading-xs" v-else></span>
                    </div>
                    <div class="border-2 border-dashed rounded-xl p-1 flex items-center gap-3">
                      <div class="badge badge-warning badge-md ml-5"></div>
                      <div class="flex gap-3" v-if="!avg.loading">
                        <h3><span class="font-bold">{{ avg.data.form.object.dayDrafttoApprove }}</span> <span class="text-sm">วัน</span></h3>
                        <h3><span class="font-bold">{{ avg.data.form.object.hourDrafttoApprove }}</span> <span class="text-sm">ชั่วโมง</span></h3>
                      </div>
                      <span class="loading loading-dots loading-xs" v-else></span>
                    </div>
                    <div class="border-2 border-dashed rounded-xl p-1 flex items-center gap-3">
                      <div class="badge badge-success badge-md ml-5"></div>
                      <div class="flex gap-3" v-if="!avg.loading">
                        <h3><span class="font-bold">{{ avg.data.form.object.dayApprovetoPO }}</span> <span class="text-sm">วัน</span></h3>
                        <h3><span class="font-bold">{{ avg.data.form.object.hourApprovetoPO }}</span> <span class="text-sm">ชั่วโมง</span></h3>
                      </div>
                      <span class="loading loading-dots loading-xs" v-else></span>
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
                    v-if="
                      !base.pagination.loading && base.data.rows.length == 0
                    "
                  >
                    <AppModuleGlobalEmptyData
                      :class="`p-4 py-12 text-3xl text-center`"
                    />
                  </div>
                  <table
                    v-else
                    class="table table-pin-rows table-pin-cols table-zebra"
                  >
                    <thead>
                      <tr class="bg-primary text-white">
                        <td>เลขที่ PR</td>
                        <td>วันที่ PR</td>
                        <td>เลขที่ Draft</td>
                        <td>วันที่ Draft</td>
                        <td class="text-right">วันที่ PR ถึง Draft</td>
                        <td>วันที่ Approve</td>
                        <!-- <td class="text-right">วันที่ PR - Approve</td> -->
                        <td class="text-right">วันที่ Draft ถึง Approve</td>
                        <td>เลขที่ PO</td>
                        <td>วันที่ PO</td>
                        <!-- <td class="text-right">วันที่ PR - PO</td>
                        <td class="text-right">วันที่ Draft - PO</td> -->
                        <td class="text-right">วันที่ Approve ถึง PO</td>
                      </tr>
                    </thead>
                    <tbody class="text-xs">
                      <tr v-for="(row, i) in base.data.rows" class="hover">
                        <td>{{ row.PRNo }}</td>
                        <td>{{ $moment(row.PRDate.date).format("DD-MM-YYYY") }}</td>
                        <td>{{ row.DraftPONo }}</td>
                        <td>{{ $moment(row.DraftDate.date).format("DD-MM-YYYY") }}</td>
                        <td class="text-right text-blue-500 font-extrabold">{{ row.PRtoDraft }} วัน</td>
                        <td>{{ $moment(row.ApproveDate.date).format("DD-MM-YYYY") }}</td>
                        <!-- <td class="text-right">{{ row.PRtoApprove }} วัน</td> -->
                        <td class="text-right text-yellow-700 font-extrabold">{{ row.DrafttoApprove }} วัน</td>
                        <td>{{ row.PONo }}</td>
                        <td>{{ $moment(row.PODate.date).format("DD-MM-YYYY") }}</td>
                        <!-- <td class="text-right">{{ row.PRtoPO }} วัน</td>
                        <td class="text-right">{{ row.DrafttoPO }} วัน</td> -->
                        <td class="text-right text-green-600 font-extrabold">{{ row.ApprovetoPO }} วัน</td>
                        <!-- <td>{{ $moment(row.PRDate.date).format("DD-MM-YYYY") }}</td>
                        <td class="text-green-600 font-bold">{{ row.U_Autholize }}</td>
                        <th>{{ row.PONum }}</th>
                        <td>{{ $moment(row.PODate.date).format("DD-MM-YYYY") }}</td>
                        <td class="text-blue-500 font-bold">{{ row.UserApproveName }}</td>
                        <td>{{ $moment(row.DeliveryDate.date).format("DD-MM-YYYY") }}</td>
                        <td>{{ row.DeptName }}</td>
                        <td>{{ row.Vendor }}</td>
                        <td>{{ row.POitemcode }}</td>
                        <td>{{ row.Dscription }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.POQty) }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.POOpenQty) }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.UnitPrice) }}</td>
                        <td>{{ row.Currency }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.Rate) }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.POLineTotalFC) }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.POLineTotalTHB) }}</td>
                        <td>{{ row.GRPONo || '-' }}</td>
                        <td>{{ row.VendorRefNo || '-' }}</td>
                        <td>{{ row.GRPODate ? $moment(row.GRPODate.date).format("DD-MM-YYYY") : '-' }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.GRPOQty) }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.GRPOLineTotal) }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.PriceAfterVAT) }}</td>
                        <td>{{ row.APNo || '-' }}</td>
                        <td>{{ row.APDate ? $moment(row.APDate.date).format("DD-MM-YYYY") : '-' }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.APQty) }}</td>
                        <td class="text-right">{{ row.APLineTotal ? new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.APLineTotal) : '-' }}</td>
                        <td>{{ row.VendorRefNoAPInvoice || '-' }}</td>
                        <td>{{ row.Remark }}</td> -->
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
    </template>
  </AppLayout>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import { useContentHeight } from "@/composables/useContentHeightDynamic";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref } from "vue";

import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";

export default {
  name: "PRtoPO",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData
  },
  setup() {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);
    const serviceUrl = computed(() => store.getters.serviceUrl);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone, 4.5);

    const base = ref({
      pagination: {
        page: 1,
        row: 15,
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
          value: "2024-01-01",
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

    const avg = ref({
      pagination: {
        page: 1,
        row: 15,
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
      },
    });

    const remove = ref({
      current: 0,
      model: false,
      path: "",
      loading: false,
    });

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
          };
          const path = buildPath(
            queryParams,
            `api/controllers/SAP/UBA/Purchase/day_count`
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            base.value.data.rows = res.rows;
            base.value.pagination.total = res.total;
            base.value.pagination.next =
              base.value.pagination.page * base.value.pagination.row <
              base.value.pagination.total;
            base.value.pagination.back = base.value.pagination.page > 1;

            fnAvg.search();
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
      },
    };

    const fnAvg = {
      search: async () => {
        try {
          avg.value.pagination.page = 1;
          await fnAvg.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (avg.value.pagination.loading) return;
        avg.value.pagination.loading = true;
        try {
          const queryParams = {
            search: base.value.search,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            `api/controllers/SAP/UBA/Purchase/day_count`
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            avg.value.data.rows = res.rows;
            avg.value.pagination.total = res.total;

            let sumPRtoDraft = (avg.value.data.rows).reduce((acc, curr) => acc + curr.PRtoDraft, 0);
            let sumDrafttoApprove = (avg.value.data.rows).reduce((acc, curr) => acc + curr.DrafttoApprove, 0);
            let sumApprovetoPO = (avg.value.data.rows).reduce((acc, curr) => acc + curr.ApprovetoPO, 0);
  
            let avgPRtoDraft = sumPRtoDraft / res.total
            let avgDrafttoApprove = sumDrafttoApprove / res.total
            let avgApprovetoPO = sumApprovetoPO / res.total
  
            let dayPRtoDraft = avgPRtoDraft.toString().split('.')[0]
            let dayDrafttoApprove = avgDrafttoApprove.toString().split('.')[0]
            let dayApprovetoPO = avgApprovetoPO.toString().split('.')[0]
  
            let hourPRtoDraft = ( avgPRtoDraft.toString().split('.')[1].slice(0, 1)*24 ) / 10
            let hourDrafttoApprove = ( avgDrafttoApprove.toString().split('.')[1].slice(0, 1)*24 ) / 10
            let hourApprovetoPO = ( avgApprovetoPO.toString().split('.')[1].slice(0, 1)*24 ) / 10
  
            avg.value.data.form.object = {
              dayPRtoDraft: dayPRtoDraft,
              hourPRtoDraft: hourPRtoDraft ? hourPRtoDraft.toString().split('.')[0] : hourPRtoDraft,
              dayDrafttoApprove: dayDrafttoApprove,
              hourDrafttoApprove: hourDrafttoApprove ? hourDrafttoApprove.toString().split('.')[0] : hourDrafttoApprove,
              dayApprovetoPO: dayApprovetoPO,
              hourApprovetoPO: hourApprovetoPO ? hourApprovetoPO.toString().split('.')[0] : hourApprovetoPO,
            }
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          avg.value.pagination.loading = false;
        }
      },
      success() {
        avg.value.pagination.page = 1;
        fnAvg.search();
      },
    };

    const fnRemove = {
      item: (code, path) => {
        remove.value.modal = true;
        remove.value.code = code;
        remove.value.path = path;
      },
      success: () => {
        base.value.pagination.page = 1;
        fnBase.search();
      },
    };

    fnBase.search();

    const exportExcel = () => {
      return window.open(`${serviceUrl.value}/api/controllers/SAP/Excel/UBA/pu?for=daycount&total=1${base.value.search[0].value ? `&q=${
      base.value.search[0].value}` : ""}${base.value.search[1].value ? `&dateFrom=${
        base.value.search[1].value}` : ''}${base.value.search[2].value ? `&dateTo=${
      base.value.search[2].value}` : ''}`);
    }

    return {
      base,
      avg,
      remove,
      fnBase,
      fnRemove,
      titleZone,
      contentHeight,
      AppLayoutComponent,
      exportExcel
    };
  },
};
</script>

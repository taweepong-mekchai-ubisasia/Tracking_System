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
                    <h3 class="text-xl font-extrabold text-primary px-4 sm:block hidden">PURCHASE&nbsp;APPROVER<br><span class="text-sm text-primary-content">( ข้อมูลการอนุมัติใบสั่งซื้อสินค้า )</span></h3>
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
                        v-model="company"
                        @change="
                          base.pagination.page = 1;
                          base.data.transaction = [];
                          base.search[0].value = '';
                          base.search[1].value = '';
                          base.search[2].value = '';
                          fnBase.search();
                        "
                    >
                        <option value="UBP">UBP</option>
                        <option value="UBA">UBA</option>
                      </select>
                    </div>
                  </div>
                  <div class="divider my-1"></div>
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
                      <!-- <tr> -->
                        <th class="bg-primary">PR No.</th>
                        <!-- <th>PR No.</th> -->
                        <td>PR Date</td>
                        <td>PR Approve</td>
                        <th class="bg-primary">PO NO.</th>
                        <!-- <th>PO NO.</th> -->
                        <td>PO Date</td>
                        <td>PO Approve</td>
                        <td>Approve Date</td>
                        <td>Delivery Date</td>
                        <td>Department</td>
                        <td>Vendor</td>
                        <td>Item Code</td>
                        <td>Description</td>
                        <td class="text-right">Quantity</td>
                        <td class="text-right">Open Quantity</td>
                        <td class="text-right">Price</td>
                        <td>Currency</td>
                        <td class="text-right">Rate</td>
                        <td class="text-right">Total FC</td>
                        <td class="text-right">Total THB</td>
                        <td>GRPO No.</td>
                        <td>Vendor Ref No.</td>
                        <td>GRPO Date</td>
                        <td class="text-right">GRPO Quantity</td>
                        <td class="text-right">GRPO Total</td>
                        <td class="text-right">Price After VAT</td>
                        <td>AP No.</td>
                        <td>AP Date</td>
                        <td class="text-right">AP Quantity</td>
                        <td class="text-right">AP Total</td>
                        <td>Vendor Ref No. AP Invoice</td>
                        <td>Remarks</td>
                      </tr>
                    </thead>
                    <tbody class="text-xs">
                      <tr v-for="(row, i) in base.data.rows" class="hover">
                        <th class="font-bold">{{ row.PRNum || '-' }}</th>
                        <td>{{ row.PRDate ? $moment(row.PRDate.date).format("DD-MM-YYYY") : '-' }}</td>
                        <td class="text-green-600 font-bold">{{ row.U_Autholize }}</td>
                        <th>{{ row.PONum }}</th>
                        <td>{{ $moment(row.PODate.date).format("DD-MM-YYYY") }}</td>
                        <td class="text-blue-500 font-bold">{{ row.UserApproveName }}</td>
                        <td>
                          {{ $moment(row.ApproveDate.date).format("DD-MM-YYYY") }} 
                          <!-- {{ row.ApproveTime }} -->
                          {{ 
                            row.ApproveTime.toString().length < 4
                              ? `0${row.ApproveTime.toString()[0]}:${row.ApproveTime.toString()[1]}${row.ApproveTime.toString()[2]}` 
                              : `${row.ApproveTime.toString()[0]}${row.ApproveTime.toString()[1]}:${row.ApproveTime.toString()[2]}${row.ApproveTime.toString()[3]}` 
                          }}
                        </td>
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
                        <td>{{ row.Remark }}</td>
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
import { useContentHeight } from "@/composables/useContentHeight";
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
  name: "AllPO",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
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

    const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone);

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

    const company = ref('UBA')

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
            `api/controllers/SAP/${company.value}/Purchase/dept_appr`
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
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
      return window.open(`${serviceUrl.value}/api/controllers/SAP/Excel/${company.value}/pu?for=allpo&total=1${base.value.search[0].value ? `&q=${
      base.value.search[0].value}` : ""}${base.value.search[1].value ? `&dateFrom=${
        base.value.search[1].value}` : ''}${base.value.search[2].value ? `&dateTo=${
      base.value.search[2].value}` : ''}`);
    }

    return {
      base,
      remove,
      company,
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

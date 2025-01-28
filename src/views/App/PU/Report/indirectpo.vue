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
                    <h3 class="text-xl font-extrabold text-primary px-4 sm:block hidden">LAST&nbsp;INDIRECT&nbsp;PURCHASE<br><span class="text-sm text-primary-content">( ข้อมูลรายการ PO แบบ Indirect ล่าสุด )</span></h3>
                    <div
                      class="gap-2 sm:gap-4 flex-row flex w-full justify-end relative"
                    >
                      <button
                        class="join-item btn sm:btn-sm btn-xs"
                        @click="exportExcel()"
                      >
                        <Icon icon="file-icons:microsoft-excel" />
                      </button>
                      <div class="w-full xl:max-w-md max-w-sm" >
                        <AppModuleGlobalCombobox
                          :url="`api/controllers/SAP/${company}/Purchase/indirect_po`"
                          :label="'Description'"
                          :selectMode="'single'"
                          :image="false"
                          :fieldDisplay="'Dscription'"
                          :lastDisplay="descrip"
                          :objectData="['DocEntry', 'Dscription']"
                          :param="[
                            {
                              group: true
                            }
                          ]"
                          v-model="descripObj"
                        />
                      </div>
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
                        <td>วันที่ PR</td>
                        <td>เลขที่ PR</td>
                        <td>Item Code</td>
                        <td>Description</td>
                        <td>เลขที่ PO</td>
                        <th class="bg-primary">วันที่ PO</th>
                        <td>Department</td>
                        <td>Supplier</td>
                        <td class="text-right">Quantity</td>
                        <td>หน่วย</td>
                        <td class="text-right">Unit Price</td>
                        <td>Currency</td>
                        <td class="text-right">Total Price</td>
                        <td>Currency</td>
                        <th class="bg-primary">GRPO Date</th>
                      </tr>
                    </thead>
                    <tbody class="text-xs">
                      <tr v-for="(row, i) in base.data.rows" class="hover">
                        <td>{{ $moment(row.PRDate.date).format("DD-MM-YYYY") }}</td>
                        <td>{{ row.PRNum }}</td>
                        <td>{{ row.ItemCode }}</td>
                        <td>{{ row.Dscription }}</td>
                        <td>{{ company == 'UBA' ? `APO${row.PONum}` : `PPO${row.PONum}` }}</td>
                        <th class="text-primary">{{ $moment(row.PODate.date).format("DD-MM-YYYY") }}</th>
                        <td>{{ row.DeptName }}</td>
                        <td>{{ row.Supplier }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.POQty) }}</td>
                        <td>{{ row.UomCode }}</td>
                        <td class="font-semibold text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.UnitPrice) }}</td>
                        <td>{{ row.Currency }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.TotalPrice) }}</td>
                        <td>{{ row.Currency }}</td>
                        <th class="font-semibold" :class="!row.GRPODate ? 'text-error' : 'text-blue-500'">{{ row.GRPODate ? $moment(row.GRPODate.date).format("DD-MM-YYYY") : 'ยังไม่ได้รับ' }}</th>
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
import AppModuleGlobalCombobox from "@/components/App/Module/Global/Combobox.vue";

export default {
  name: "IndirectPO",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalUpload,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModuleGlobalCombobox
  },
  setup() {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);
    const serviceUrl = computed(() => store.getters.serviceUrl);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone);

    const company = ref('UBA')
    const descrip = ref('')
    const descripObj = ref([])
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
        // {
        //   type: "combobox",
        //   id: "descrip",
        //   placeholder: "combobox",
        //   label: "Description",
        //   dataComponent: {
        //     url: `api/controllers/SAP/${company.value}/Purchase/indirect_po`,
        //     label: "Dscription",
        //     selectMode: "single",
        //     image: false,
        //     fieldDisplay: "Dscription",
        //     imagePath: "Dscription",
        //     lastFile: "",
        //     component: "App/Module/Pages/TRR/Visitor/Modal/Visitor",
        //     objectData: ["DocEntry", "Dscription"],
        //   },
        //   value: "",
        // },
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
          console.log(descrip.value)
          const queryParams = {
            page: base.value.pagination.page,
            row: base.value.pagination.row,
            search: base.value.search,
            descrip: descrip.value,
            getTotal: true,
          };
          console.log(queryParams)

          const path = buildPath(
            queryParams,
            `api/controllers/SAP/${company.value}/Purchase/indirect_po`
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
      return window.open(`${serviceUrl.value}/api/controllers/SAP/Excel/${company.value}/pu?for=indirectpo&total=1${base.value.search[0].value ? `&q=${
      base.value.search[0].value}` : ""}${base.value.search[1].value ? `&dateFrom=${
        base.value.search[1].value}` : ''}${base.value.search[2].value ? `&dateTo=${
      base.value.search[2].value}` : ''}${descrip.value ? `&descrip=${descrip.value}` : ''}`);
    }

    return {
      base,
      remove,
      company,
      descrip,
      descripObj,
      fnBase,
      fnRemove,
      titleZone,
      contentHeight,
      AppLayoutComponent,
      exportExcel
    };
  },
  watch: {
    "descripObj": function (v) {
      if (v) {
        if (v.length) {
          this.descrip = v[0]['Dscription'];
        } else {
          this.descrip = "";
        }

        this.fnBase.search();
      }
    }
  }
};
</script>

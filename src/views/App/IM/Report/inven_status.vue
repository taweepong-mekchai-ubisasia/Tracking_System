<template>
  <AppLayout ref="AppLayoutComponent">
    <template #modal>
      <AppModulePagesWHModalMovement
        v-model="base.data"
        @update:success="fnBase.success"
        ref="baseModal"
      />
      <AppModulePagesWHModalBatch
        v-model="base.data"
        @update:success="fnBase.success"
        ref="batchModal"
      />
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
                    <h3 class="text-lg font-bold text-primary sm:block hidden">INVENTORY&nbsp;STATUS&nbsp;MOVEMENT</h3>
                    <div
                      class="gap-2 sm:gap-4 flex-row flex w-full justify-end relative"
                    >
                      <!-- <button
                        class="join-item btn btn-warning sm:btn-sm btn-xs font-bold"
                        @click="$refs.batchModal.fnBase.edit()"
                      >
                        Transfer
                      </button>
                      <div class="border-r-2"></div> -->
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
                    <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                      <thead>
                        <tr>
                          <td>Item Code</td>
                          <td>Description</td>
                          <td class="text-right">In Stock (kg)</td>
                          <td v-if="base.search[3].value" class="text-right">{{ base.data.company == 'UBA' ? 'A' : 'P' }}FC<br>(kg)</td>
                          <td v-if="base.search[4].value" class="text-right">{{ base.data.company == 'UBA' ? 'A' : 'P' }}FC2<br>(kg)</td>
                          <td v-if="base.search[5].value" class="text-right">{{ base.data.company == 'UBA' ? 'A' : 'P' }}HS<br>(kg)</td>
                          <td v-if="base.search[6].value" class="text-right">{{ base.data.company == 'UBA' ? 'A' : 'P' }}PD<br>(kg)</td>
                          <td v-if="base.search[7].value" class="text-right">{{ base.data.company == 'UBA' ? 'A' : 'P' }}RT<br>(kg)</td>
                          <!-- <td class="text-right">Summary<br>(kg)</td> -->
                          <td class="text-right">Committed (kg)</td>

                          <td class="text-right">Available (kg)</td>
                          <td class="text-center">Lot No.</td>
                          <td class="text-center">Qty<br>(จำนวน × packsize)</td>
                          <td class="text-center">Total<br>Net Weight</td>
                          <td class="text-center">Q'ty<br>(Pallet)</td>
                          <!-- <td class="text-center">Remark</td> -->
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(row, i) in base.data.rows" class="hover" :class="row.InStock != row.Summary ? 'text-error' : ''">
                          <td class="font-bold" width="10%">
                            {{ row.ItemCode }}
                          </td>
                          <td width="10%">
                            {{ row.ItemName }}
                          </td>
                          <td class="font-bold text-right" width="10%">
                            {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(row.InStock) }}
                          </td>
                          <td v-if="base.search[3].value" class="text-right" width="10%">
                            {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(row.FCOnHand) }}
                          </td>
                          <td v-if="base.search[4].value" class="text-right" width="10%">
                            {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(row.FC2OnHand) }}
                          </td>
                          <td v-if="base.search[5].value" class="text-right" width="10%">
                            {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(row.HSOnHand) }}
                          </td>
                          <td v-if="base.search[6].value" class="text-right" width="10%">
                            {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(row.PDOnHand) }}
                          </td>
                          <td v-if="base.search[7].value" class="text-right" width="10%">
                            {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(row.RTOnHand) }}
                          </td>
                          <!-- <td class="text-right">
                            {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(row.Summary) }}
                          </td> -->
                          <td class="flex items-center justify-end">
                            <span class="font-semibold"> {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(row.Committed) }} </span>
                            <div class="tooltip tooltip-success font-semibold" data-tip="view production order number">
                              <label 
                                class="btn btn-xs btn-circle btn-ghost ml-1"
                                @click="$refs.baseModal.fnBase.edit(row.ItemCode, i, base.search[1].value, base.search[2].value)"
                              >
                                <Icon icon="material-symbols:more-horiz" width="16" height="16" />
                              </label>
                            </div>
                          </td>
                          <td class="text-right" :class="row.FCOnHand - row.Committed < 0 ? 'text-error' : ''" width="10%">
                            <span v-if="row.FCOnHand - row.Committed < 0">(</span>
                            {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(row.FCOnHand - row.Committed < 0 ? Math.abs(row.FCOnHand - row.Committed) : row.FCOnHand - row.Committed) }}
                            <span v-if="row.FCOnHand - row.Committed < 0">)</span>
                          </td>
                          <td class="text-center items-center" width="10%">
                            <div 
                              class="flex items-center justify-between bg-neutral rounded-xl mb-1 w-full border-primary" 
                              v-if="base.data.transaction.find(x => x.code == row.ItemCode)"
                              v-for="v in base.data.transaction.filter(x => x.code == row.ItemCode)"
                            >
                              <span class="font-bold text-neutral-content ps-3">{{ v.batch }}</span>
                              <label 
                                class="join-item btn btn-xs btn-circle text-error border-error"
                                @click="fnBase.cancel(v.batch)"
                              >
                                <!-- @click="$refs.batchModal.fnBase.edit(row.ItemCode, i, (base.pagination.page-1)*base.pagination.row)" -->
                                <Icon icon="mdi:cancel-circle" width="16" height="16" />
                              </label>
                            </div>
                            <div class="tooltip tooltip-success font-semibold" data-tip="select lot no.">
                              <label 
                                class="btn btn-xs btn-primary btn-circle text-white"
                                @click="$refs.batchModal.fnBase.edit(row.ItemCode, i, (base.pagination.page-1)*base.pagination.row)"
                              >
                                <Icon icon="mdi:cart" width="16" height="16" />
                              </label>
                            </div>
                          </td>
                          <td class="flex flex-col" width="10%">
                            <div
                              class="join mb-1"
                              v-if="base.data.transaction.find(x => x.code == row.ItemCode)"
                              v-for="v in base.data.transaction.filter(x => x.code == row.ItemCode)"
                            >
                              <input 
                                type="number" 
                                class="join-item input input-bordered input-xs border-gray-300 shadow w-16"
                                min="0"
                                v-model="v.qty"
                              />
                              <button
                                class="join-item btn btn-xs disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                                disabled
                              >
                                x
                              </button>
                              <input 
                                type="number" 
                                class="join-item input input-bordered input-xs border-gray-300 shadow w-16"
                                min="0"
                                v-model="v.packsize"
                              />
                              <button
                                class="join-item btn btn-xs disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                                disabled
                              >
                                {{ v.unit || '.....' }}
                              </button>
                            </div>
                            <div class="join">
                              <input class="join-item input input-bordered input-xs border-gray-300 shadow w-16" disabled />
                              <button class="join-item btn btn-xs" disabled>
                                x
                              </button>
                              <input class="join-item input input-bordered input-xs border-gray-300 shadow w-16" disabled />
                              <button class="join-item btn btn-xs" disabled>
                                .....
                              </button>
                            </div>
                          </td>
                          <td class="text-center" width="10%">
                            <div 
                              class="mb-3"
                              v-if="base.data.transaction.find(x => x.code == row.ItemCode)"
                              v-for="v in base.data.transaction.filter(x => x.code == row.ItemCode)"
                              :class="base.data.transaction.find(x => x.code == row.ItemCode) ? 'text-primary font-bold' : ''"
                            >
                              {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(v.qty * v.packsize) }}
                            </div>
                            <span class="italic opacity-50">...</span>
                          </td>
                          <td width="10%">
                            <div 
                              class="mb-1"
                              v-if="base.data.transaction.find(x => x.code == row.ItemCode)"
                              v-for="v in base.data.transaction.filter(x => x.code == row.ItemCode)"
                            >
                              <input 
                                type="number" 
                                class="join-item input input-bordered input-xs border-gray-300 shadow w-12"
                                min="0"
                                v-model="v.pallet"
                              />
                            </div>
                            <input class="join-item input input-bordered input-xs border-gray-300 shadow w-12" disabled>
                          </td>
                          <!-- <td width="10%">
                            {{ '~remark' }}
                          </td> -->
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <AppModuleGlobalPagination
                  v-model="base.pagination"
                  @update:page="fnBase.get"
                />
                <!-- </div> -->
              <!-- </div> -->
              <!-- <div class="col-span-3 md:block hidden">
                <AppModuleGlobalOptionSelection
                  :label="'Item Code'"
                  @lists="(v) => search.itemcode = v"
                  :create="[true, true, true]"
                  :url="`${serviceUrl}api/controllers/SAP/${search.comp}/Inventory/inven_status`"
                  :options="{
                    id: 'ajax1',
                    label: 'ItemCode',
                    'track-by': 'ItemCode',
                    id: 'ajax1',
                    placeholder: 'Type to search',
                    'open-direction': 'bottom',
                    multiple: true,
                    searchable: true,
                    'internal-search': false,
                    'clear-on-select': false,
                    'close-on-select': false,
                    'options-limit': 800,
                    limit: 999,
                    'max-height': 200,
                    'show-no-results': true,
                    'hide-selected': false,
                    taggable: true,
                  }"
                />
              </div> -->
            <!-- </div> -->
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
import { useContentHeight } from "@/composables/useContentHeight";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref } from "vue";

import AppLayout from "@/components/App/layout.vue";

// import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
// import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";
import AppModulePagesWHModalMovement from "@/components/App/Module/Pages/WH/Modal/Movement.vue";
import AppModulePagesWHModalBatch from "@/components/App/Module/Pages/WH/Modal/Batch.vue";

import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModuleGlobalOptionSelection from "@/components/App/Module/Global/OptionSelection.vue";
// import Query from "@/assets/js/fetch.js";


export default {
  name: "InventoryStatus",
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
    AppModulePagesWHModalMovement,
    AppModulePagesWHModalBatch
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
        row: 20,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        rows: [],
        // transaction: {
        //   batch: [],
        //   qty: [],
        //   packsize: [],
        //   unit: [],
        //   pallet: [],
        // },
        transaction: [],
        form: {
          loading: false,
          modal_movement: false,
          modal_batch: false,
          object: {
            title: "",
          },
        },
        company: 'UBP'
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
          id: "FAC",
          placeholder: "FAC",
          label: "FAC",
          value: true,
        },
        {
          type: "checkbox",
          id: "FAC2",
          placeholder: "FAC2",
          label: "FAC2",
          value: true,
        },
        {
          type: "checkbox",
          id: "Hold Store",
          placeholder: "Hold Store",
          label: "Hold Store",
          value: true,
        },
        {
          type: "checkbox",
          id: "Production",
          placeholder: "Production",
          label: "Production",
          value: false,
        },
        {
          type: "checkbox",
          id: "RT",
          placeholder: "R&T",
          label: "R&T",
          value: false,
        },
      ],
      show: true,
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
          let item = []
          if (base.value.search.itemcode) {
            let v = base.value.search.itemcode
            v.forEach(x => {
              item.push(x.ItemCode)
            })
          }

          const queryParams = {
            page: base.value.pagination.page,
            row: base.value.pagination.row,
            search: base.value.search,
            getTotal: true,
            ubis: true,
          };
          const path = buildPath(
            queryParams,
            `api/controllers/SAP/${base.value.data.company}/Inventory/inven_status`
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
      cancel(batch) {
        base.value.data.transaction = base.value.data.transaction.filter(x => x.batch != batch)
      }
    };

    fnBase.search();

    const exportExcel = () => {
      let item = []
      if (base.value.search.itemcode) {
        let v = base.value.search.itemcode
        v.forEach(x => {
          item.push(x.ItemCode)
        })
      }

      return window.open(`${serviceUrl.value}api/controllers/SAP/Excel/${base.value.data.company}/wh?for=inven_status&total=1&ubis=1&company=${base.value.data.company}${
        base.value.search[0].value ? `&q=${base.value.search[0].value}` : ""}${base.value.search[1].value ? `&dateFrom=${base.value.search[1].value}` : ''}${
      base.value.search[2].value ? `&dateTo=${base.value.search[2].value}` : ''}${base.value.data.transaction ? `&transaction=${JSON.stringify(base.value.data.transaction)}` : ''}`);
    }

    return {
      base,
      fnBase,
      exportExcel,
      titleZone,
      contentHeight,
      AppLayoutComponent,
    };
  }
};
</script>

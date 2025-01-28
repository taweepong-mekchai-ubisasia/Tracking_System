<template>
  <div class="grid grid-cols-1">
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
                <h3 class="text-lg font-bold text-primary w-full text-left">
                  RACK&nbsp;TRANSACTION
                </h3>
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
                class="table table-xs table-pin-rows table-pin-cols table-zebra"
              >
                <thead>
                  <tr>
                    <th>Rack</th>
                    <td>Date Time</td>
                    <td>Transaction</td>
                    <!-- <td>Customer</td> -->
                    <td>Short Code</td>
                    <td>Item Name</td>
                    <td>Lot No.</td>
                    <!-- <td>Qty</td>
                    <td>Pack Size</td> -->
                    <td class="text-right">Total Quantity</td>
                    <!-- <td>Unit</td> -->
                    <td>Comments</td>
                    <td v-if="!show" @click="show = !show" class="cursor-pointer" ><Icon icon="mdi:show-outline" /></td>
                    <td v-if="show" @click="show = !show"  class="cursor-pointer flex items-center gap-3"><Icon icon="mdi:show" /> Code</td>
                    <td v-if="show">Ref</td>
                    <td v-if="show">Ref2</td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="hover"
                    v-for="(v, i) in base.data.rows"
                    :key="v.code"
                  >
                    <th>
                      <div class="flex items-center space-x-3">
                        <div>
                          <div
                            class="overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            {{ v.rack }}-{{ v.bay }}-{{ v.level }}-{{ v.type }}
                          </div>
                          <div
                            class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            ( {{ v.id }} )
                          </div>
                        </div>
                      </div>
                    </th>
                    <td>
                      <div class="flex items-center space-x-3">
                        <div>
                          <div
                            class="overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            {{ v.created_at ? $moment(v.created_at).format('DD-MM-YYYY HH:mm:ss') : "-" }}
                          </div>
                          <div
                            class="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            {{ v.created_fullname ? v.created_fullname : "-" }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="font-bold">
                      {{
                        v.ref && v.ref2
                          ? "Join"
                          : v.transref == "I" && v.ref && v.b_check
                          ? "Balance"
                          : v.transref == "I" && v.ref
                          ? "Move"
                          : v.transref == "O" && v.req_ref
                          ? v.req_for == 'T' ? 'Test' : 'Extend'
                          : v.transref == "O" && v.ref
                          ? "Dispose"
                          : v.transref == "I" && !v.ref
                          ? "In"
                          : "-"
                      }}
                    </td>
                    <!-- <td>{{ v.customerTitle }}</td> -->
                    <td>{{ v.item_short_code }}</td>
                    <td>{{ v.item_name }}</td>
                    <td>{{ v.batch }}</td>
                    <td class="text-right">
                      {{ new Intl.NumberFormat("th-TH").format(v.qty) }}
                    <!-- </td>
                    <td class="text-center"> -->
                      x
                      {{ new Intl.NumberFormat("th-TH").format(v.pack_size) }}
                    <!-- </td>
                    <td class="text-right"> -->
                      =
                      {{ new Intl.NumberFormat("th-TH").format(v.summary) }}
                    <!-- </td>
                    <td> -->
                      {{ v.uom }}
                    </td>
                    <td>
                      <div class="flex items-center space-x-3">
                        <div>
                          <div
                            class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            {{ v.comments }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td v-if="!show"></td>
                    <td v-if="show">{{ v.code }}</td>
                    <td v-if="show">{{ v.ref }}</td>
                    <td v-if="show">{{ v.ref2 }}</td>
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
<script>
import { useStore } from "vuex";
import { useContentHeight } from "@/composables/useContentHeightDynamic";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref } from "vue";

import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";

export default {
  name: "Transaction",
  components: {
    AppLayout,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
  },
  props: {
    wh: {
      type: String,
      default: "ubp",
    },
  },
  setup(props) {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);
    const serviceUrl = computed(() => store.getters.serviceUrl);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone, 10);

    const show = ref(false);

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
        transref: '',
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
          type: "select",
          id: "transref",
          placeholder: "Select",
          label: "Trans Ref",
          value: "",
          child: [
            {
              value: 'I', label: 'In'
            },
            {
              value: 'O', label: 'Dispose'
            },
            {
              value: 'M', label: 'Move'
            },
          ]
        },
      ],
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
            wh: props.wh,
            transref: base.value.data.transref,
            Order: true,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/QA/Retain/shelf"
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

    fnBase.search();

    const exportExcel = () => {
      return window.open(
        `${serviceUrl.value}api/controllers/MYSQL/INTERNAL/QA/exports?for=transaction${base.value.search[0].value ? `&q=${base.value.search[0].value}` : ""}${
      base.value.search[1].value ? `&dateFrom=${base.value.search[1].value}` : ""}${base.value.search[2].value ? `&dateTo=${base.value.search[2].value}` : ""}&wh=${
        props.wh}&transref=${base.value.data.transref}&Order=1&total=1`
      );
    }

    return {
      base,
      fnBase,
      show,
      titleZone,
      contentHeight,
      AppLayoutComponent,
      exportExcel
    };
  },
};
</script>

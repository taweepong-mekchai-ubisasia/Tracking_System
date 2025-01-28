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
                  STOCK&nbsp;ON&nbsp;HAND&nbsp;<span class="text-xs">( Total&nbsp;Quantitys:&nbsp;{{ new Intl.NumberFormat("th-TH").format(base.data.quantitys_total) }} gram )</span>
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
                    <th rowspan="2">Rack</th>
                    <td rowspan="2">Create</td>
                    <td rowspan="2">Update</td>
                    <!-- <td rowspan="2">Customer</td> -->
                    <td rowspan="2">Short Code</td>
                    <td rowspan="2">Item Name</td>
                    <td rowspan="2">Lot No.</td>
                    <!-- <td rowspan="2">Qty</td>
                    <td rowspan="2">Pack Size</td> -->
                    <td rowspan="2" class="text-right">Total Quantity</td>
                    <!-- <td rowspan="2">Unit</td> -->
                    <td rowspan="2">Shelf Life</td>
                    <td
                      colspan="4"
                      class="bg-yellow-100 text-center font-bold text-black"
                    >
                      Calculated from the date of receive
                    </td>
                    <td
                      colspan="4"
                      class="bg-cyan-100 text-center font-bold text-black"
                    >
                      Calculated from the date of MFG
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-yellow-100 font-bold text-black">
                      Receive Date
                    </td>
                    <td class="bg-yellow-100 font-bold text-black">Exp</td>
                    <td class="bg-yellow-100 font-bold text-black">Life</td>
                    <td class="bg-yellow-100 font-bold text-black">YMD</td>
                    <td class="bg-cyan-100 font-bold text-black">MFG Date</td>
                    <td class="bg-cyan-100 font-bold text-black">Exp</td>
                    <td class="bg-cyan-100 font-bold text-black">Life</td>
                    <td class="bg-cyan-100 font-bold text-black">YMD</td>
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
                            {{
                              v.created_at
                                ? $moment(v.created_at).format(
                                    "DD-MM-YYYY HH:mm:ss"
                                  )
                                : "-"
                            }}
                          </div>
                          <div
                            class="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            {{ v.created_fullname ? v.created_fullname : "-" }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="flex items-center space-x-3">
                        <div>
                          <div
                            class="overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            {{ v.updated_at ? v.updated_at : "-" }}
                          </div>
                          <div
                            class="text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            {{ v.updated_fullname ? v.updated_fullname : "-" }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <!-- <td class="font-semibold">{{ v.customerTitle }}</td> -->
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
                    <td>{{ v.shelf_life_sample ? v.shelf_life_sample : "-" }}</td>
                    <td
                      class="bg-yellow-100"
                      :class="`${
                        parseInt(
                          v.receive_date && v.shelf_life_sample
                            ? $moment(v.receive_date)
                                .add(parseInt(v.shelf_life_sample) + 1, 'days')
                                .diff($moment(new Date()), 'days')
                            : '0'
                        ) <= 30
                          ? 'text-red-500'
                          : ''
                      }`"
                    >
                      <div class="flex items-center space-x-3">
                        <div>
                          <div
                            class="overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            {{
                              v.receive_date && v.shelf_life_sample
                                ? $moment(v.receive_date).format("DD-MM-YYYY")
                                : "-"
                            }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="bg-yellow-100"
                      :class="`${
                        parseInt(
                          v.receive_date && v.shelf_life_sample
                            ? $moment(v.receive_date)
                                .add(parseInt(v.shelf_life_sample) + 1, 'days')
                                .diff($moment(new Date()), 'days')
                            : '0'
                        ) <= 30
                          ? 'text-red-500'
                          : ''
                      }`"
                    >
                      <div class="flex items-center space-x-3">
                        <div>
                          <div
                            class="overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            Expire
                            {{
                              v.receive_date && v.shelf_life_sample
                                ? $moment(v.receive_date)
                                    .add(parseInt(v.shelf_life_sample), "days")
                                    .format("DD-MM-YYYY")
                                : "-"
                            }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="bg-yellow-100"
                      :class="`${
                        parseInt(
                          v.receive_date && v.shelf_life_sample
                            ? $moment(v.receive_date)
                                .add(parseInt(v.shelf_life_sample) + 1, 'days')
                                .diff($moment(new Date()), 'days')
                            : '0'
                        ) <= 30
                          ? 'text-red-500'
                          : ''
                      }`"
                    >
                      <div class="flex items-center space-x-3">
                        <div>
                          <div
                            class="overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            Life
                            {{
                              v.receive_date && v.shelf_life_sample
                                ? $moment(v.receive_date)
                                    .add(parseInt(v.shelf_life_sample), "days")
                                    .diff($moment(new Date()), "days")
                                : "0"
                            }}
                            days
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="bg-yellow-100"
                      :class="`${
                        parseInt(
                          v.receive_date && v.shelf_life_sample
                            ? $moment(v.receive_date)
                                .add(parseInt(v.shelf_life_sample) + 1, 'days')
                                .diff($moment(new Date()), 'days')
                            : '0'
                        ) <= 30
                          ? 'text-red-500'
                          : ''
                      }`"
                    >
                      <div class="flex items-center space-x-3">
                        <div>
                          <div
                            class="overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            {{
                              v.receive_date && v.shelf_life_sample
                                ? $moment
                                    .duration(
                                      $moment(v.receive_date)
                                        .add(parseInt(v.shelf_life_sample) + 1, "days")
                                        .diff($moment(new Date()), "days"),
                                      "days"
                                    )
                                    .years()
                                : "0"
                            }}Y
                            {{
                              v.receive_date && v.shelf_life_sample
                                ? $moment
                                    .duration(
                                      $moment(v.receive_date)
                                        .add(parseInt(v.shelf_life_sample) + 1, "days")
                                        .diff($moment(new Date()), "days"),
                                      "days"
                                    )
                                    .months()
                                : "0"
                            }}M
                            {{
                              v.receive_date && v.shelf_life_sample
                                ? $moment
                                    .duration(
                                      $moment(v.receive_date)
                                        .add(parseInt(v.shelf_life_sample) + 1, "days")
                                        .diff($moment(new Date()), "days"),
                                      "days"
                                    )
                                    .days()
                                : "0"
                            }}D
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="bg-cyan-100"
                      :class="`${
                        parseInt(
                          v.manufacturing_date && v.shelf_life_sample
                            ? $moment(v.manufacturing_date)
                                .add(parseInt(v.shelf_life_sample) + 1, 'days')
                                .diff($moment(new Date()), 'days')
                            : '0'
                        ) <= 30
                          ? 'text-red-500'
                          : ''
                      }`"
                    >
                      <div class="flex items-center space-x-3">
                        <div>
                          <div
                            class="overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            {{
                              v.manufacturing_date && v.shelf_life_sample
                                ? $moment(v.manufacturing_date).format(
                                    "DD-MM-YYYY"
                                  )
                                : "-"
                            }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="bg-cyan-100"
                      :class="`${
                        parseInt(
                          v.manufacturing_date && v.shelf_life_sample
                            ? $moment(v.manufacturing_date)
                                .add(parseInt(v.shelf_life_sample) + 1, 'days')
                                .diff($moment(new Date()), 'days')
                            : '0'
                        ) <= 30
                          ? 'text-red-500'
                          : ''
                      }`"
                    >
                      <div class="flex items-center space-x-3">
                        <div>
                          <div
                            class="overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            Expire
                            {{
                              v.manufacturing_date && v.shelf_life_sample
                                ? $moment(v.manufacturing_date)
                                    .add(parseInt(v.shelf_life_sample), "days")
                                    .format("DD-MM-YYYY")
                                : "-"
                            }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="bg-cyan-100"
                      :class="`${
                        parseInt(
                          v.manufacturing_date && v.shelf_life_sample
                            ? $moment(v.manufacturing_date)
                                .add(parseInt(v.shelf_life_sample) + 1, 'days')
                                .diff($moment(new Date()), 'days')
                            : '0'
                        ) <= 30
                          ? 'text-red-500'
                          : ''
                      }`"
                    >
                      <div class="flex items-center space-x-3">
                        <div>
                          <div
                            class="overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            Life
                            {{
                              v.manufacturing_date && v.shelf_life_sample
                                ? $moment(v.manufacturing_date)
                                    .add(parseInt(v.shelf_life_sample), "days")
                                    .diff($moment(new Date()), "days")
                                : "0"
                            }}
                            days
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="bg-cyan-100"
                      :class="`${
                        parseInt(
                          v.manufacturing_date && v.shelf_life_sample
                            ? $moment(v.manufacturing_date)
                                .add(parseInt(v.shelf_life_sample) + 1, 'days')
                                .diff($moment(new Date()), 'days')
                            : '0'
                        ) <= 30
                          ? 'text-red-500'
                          : ''
                      }`"
                    >
                      <div class="flex items-center space-x-3">
                        <div>
                          <div
                            class="overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            {{
                              v.manufacturing_date && v.shelf_life_sample
                                ? $moment
                                    .duration(
                                      $moment(v.manufacturing_date)
                                        .add(parseInt(v.shelf_life_sample) + 1, "days")
                                        .diff($moment(new Date()), "days"),
                                      "days"
                                    )
                                    .years()
                                : "0"
                            }}Y
                            {{
                              v.manufacturing_date && v.shelf_life_sample
                                ? $moment
                                    .duration(
                                      $moment(v.manufacturing_date)
                                        .add(parseInt(v.shelf_life_sample) + 1, "days")
                                        .diff($moment(new Date()), "days"),
                                      "days"
                                    )
                                    .months()
                                : "0"
                            }}M
                            {{
                              v.manufacturing_date && v.shelf_life_sample
                                ? $moment
                                    .duration(
                                      $moment(v.manufacturing_date)
                                        .add(parseInt(v.shelf_life_sample) + 1, "days")
                                        .diff($moment(new Date()), "days"),
                                      "days"
                                    )
                                    .days()
                                : "0"
                            }}D
                          </div>
                        </div>
                      </div>
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
  name: "StockOnHand",
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
        quantitys_total: '',
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
            transref: 'I',
            transref_type_null: true,
            getTotal: true,
            sumQuantitys: true,
            getOrder: true
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/QA/Retain/shelf"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            // res.rows.forEach(x => {
            //   x['customerTitle'] = '';
            //   JSON.parse(x.customer).forEach(y => {
            //     x['customerTitle'] += y.title;
            //   })
            // })

            base.value.data.rows = res.rows;
            base.value.data.quantitys_total = res.quantitys_total
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
        `${serviceUrl.value}api/controllers/MYSQL/INTERNAL/QA/exports?for=stockOnHand${base.value.search[0].value ? `&q=${base.value.search[0].value}` : ""}${
          base.value.search[1].value ? `&dateFrom=${base.value.search[1].value}` : ""}${base.value.search[2].value ? `&dateTo=${base.value.search[2].value}` : ""
        }&wh=${props.wh}&transref=I&transref_type_null=true&total=1&sumQuantitys=true`
      );
    }

    return {
      base,
      fnBase,
      titleZone,
      contentHeight,
      AppLayoutComponent,
      exportExcel
    };
  },
};
</script>

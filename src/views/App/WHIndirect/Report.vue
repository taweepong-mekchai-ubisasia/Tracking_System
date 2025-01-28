<template>
  <AppLayout ref="AppLayoutComponent">
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
                    <h3 class="text-lg font-bold text-primary px-4">
                      TRANSACTION&nbsp;REPORT
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
                        <th>Transaction Code</th>
                        <td>ผู้ทำรายการ</td>
                        <td>Status</td>
                        <td>Item</td>
                        <td>Document</td>
                        <td class="text-right">Quantity</td>
                        <td class="text-right">Price</td>
                        <td class="text-right">Total Cost</td>
                        <td>Comments</td>
                        <td>Deletion</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(v, i) in base.data.rows"
                        :key="v.code"
                        class="hover"
                        :class="
                          v.deleted_at
                            ? ` text-gray-500 line-through decoration-red-500`
                            : ``
                        "
                      >
                        <th>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="text-xs">
                                {{
                                  $moment(v.created_at).format(
                                    "DD-MM-YYYY HH:mm:ss"
                                  )
                                }}
                              </div>
                              <div class="text-xs opacity-50">
                                ( {{ v.id }} )
                              </div>
                            </div>
                          </div>
                        </th>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="text-xs italic">
                                {{
                                  v.created_fullname ? v.created_fullname : "-"
                                }}
                              </div>
                              <div class="text-xs text-gray-500">
                                ( {{ v.d_title ? v.d_title : "-" }} )
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          class="font-bold"
                          :class="
                            v.deleted_at
                              ? 'text-gray-500'
                              : v.status == 'export'
                              ? 'text-red-500'
                              : 'text-blue-500'
                          "
                        >
                          {{ v.status == "export" ? "issue" : v.status }}
                        </td>
                        <td>
                          {{ v.title || "-" }}
                        </td>
                        <td>
                          {{ v.requestTitle || "-" }}
                        </td>
                        <td class="text-right">
                          {{ new Intl.NumberFormat().format(v.qty) }}
                        </td>
                        <td class="text-right" v-if="v.status == 'import'">
                          {{
                            v.price
                              ? new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                }).format(v.price)
                              : "0.00"
                          }}
                          ฿
                        </td>
                        <td class="text-right" v-else>
                          {{
                            v.price
                              ? new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                }).format(v.price)
                              : "-"
                          }}
                        </td>
                        <td class="text-right" v-if="v.status == 'import'">
                          {{
                            v.sum
                              ? new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                }).format(v.sum)
                              : "0.00"
                          }}
                          ฿
                        </td>
                        <td class="text-right" v-else>
                          {{
                            v.sum
                              ? new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                }).format(v.sum)
                              : "-"
                          }}
                        </td>
                        <td>
                          {{ v.comments || "-" }}
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="text-xs" v-if="v.deleted_at">
                                {{
                                  v.deleted_fullname ? v.deleted_fullname : "-"
                                }}
                              </div>
                              <div class="text-xs">
                                {{
                                  v.deleted_at
                                    ? $moment(v.deleted_at).format(
                                        "DD-MM-YYYY HH:mm:ss"
                                      )
                                    : "-"
                                }}
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
  </AppLayout>
</template>

<style>
.crop {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 1px;
}
</style>

<script>
import { useStore } from "vuex";
import { useContentHeight } from "@/composables/useContentHeight";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref } from "vue";

import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";

export default {
  name: "IndirectReport",
  components: {
    AppLayout,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
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
        permission: "",
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
            action: "all",
            fromReport: true,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/WHI/transaction"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            base.value.data.permission = res.permission;
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
        `${
          serviceUrl.value
        }api/controllers/MYSQL/INTERNAL/WHI/exports?for=transaction&total=1&fromReport=1${
          base.value.data.permission != "superadmin"
            ? `&dept=${user.value.department}`
            : ""
        }${
          base.value.search[0].value ? `&q=${base.value.search[0].value}` : ""
        }${
          base.value.search[1].value
            ? `&dateFrom=${base.value.search[1].value}`
            : ""
        }${
          base.value.search[2].value
            ? `&dateTo=${base.value.search[2].value}`
            : ""
        }`
      );
    };

    return {
      titleZone,
      contentHeight,
      AppLayoutComponent,
      base,
      fnBase,
      exportExcel,
    };
  },
};
</script>

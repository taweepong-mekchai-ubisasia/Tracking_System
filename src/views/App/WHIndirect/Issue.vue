<template>
  <AppLayout ref="AppLayoutComponent">
    <template #modal>
      <AppModulePagesWHIndirectModalRequest
        :from="'issue'"
        v-model="base.data"
        @update:success="fnBase.success"
        ref="baseModal"
      />
      <AppModulePagesWHIndirectModalIssue
        v-model="base.data"
        @update:success="fnBase.success"
        ref="issueModal"
      />
    </template>
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
                    <h3 class="text-lg font-bold text-primary px-4">ISSUE</h3>
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
                    class="table table-xs table-pin-rows table-pin-cols table-zebra w-full"
                  >
                    <thead>
                      <tr>
                        <th>Doc Status</th>
                        <td>เอกสาร</td>
                        <td>วันที่ต้องการ</td>
                        <td>ผู้ทำรายการ</td>
                        <td>Item</td>
                        <th class="text-center">Item Issue</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(v, i) in base.data.rows"
                        :key="v.code"
                        class="hover"
                      >
                        <th class="p-0">
                          <div
                            class="flex justify-center items-center h-4 w-24"
                            :class="
                              v.doc_status == 'close'
                                ? 'bg-success text-base-100'
                                : v.doc_status == 'approve'
                                ? 'bg-info text-base-100'
                                : v.doc_status == 'reject'
                                ? 'bg-error text-base-100'
                                : v.doc_status == 'request'
                                ? 'bg-warning text-base-100'
                                : ''
                            "
                          >
                            {{ v.doc_status }}
                          </div>
                        </th>
                        <td>
                          <div class="flex items-center gap-3">
                            <div class="font-semibold">
                              <div>
                                {{ v.doc_title }}
                              </div>
                              <div class="text-gray-400" v-if="v.description.length > 70">
                                - {{ v.description.slice(0, 70) }}...
                                <span class="text-primary">
                                  (
                                  <label
                                    class="cursor-pointer hover:underline"
                                    @click="
                                      $refs.baseModal.fnBase.edit(`${v.doc}`, `${i}`)
                                    "
                                  >
                                    รายละเอียด
                                  </label>
                                  )
                                </span>
                              </div>
                              <div class="text-gray-400" v-else>
                                - {{ v.description }}
                                <span class="text-primary">
                                  (
                                  <label
                                    class="cursor-pointer hover:underline"
                                    @click="
                                      $refs.baseModal.fnBase.edit(`${v.doc}`, `${i}`)
                                    "
                                  >
                                    รายละเอียด
                                  </label>
                                  )
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="italic">
                          {{
                            v.request_at
                              ? $moment(v.request_at).format("DD-MM-YYYY")
                              : "-"
                          }}
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="text-xs">
                                {{ v.created_fullname }}
                              </div>
                              <div class="text-xs font-semibold opacity-50">
                                (
                                <span class="font-bold">{{
                                  v.dept_title
                                }}</span>
                                )
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="flex items-center gap-3">
                            <div class="font-semibold">
                              <div>
                                {{ v.title }}
                              </div>
                              <div class="opacity-50">
                                จำนวนจ่ายต่อจำนวนเบิก: <span class="text-blue-500">{{ v.issue || 0 }}</span> / {{ v.qty }} {{ v.unit || '' }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <th class="text-center" v-if="v.doc_status != 'close' && v.issue != v.qty">
                          <label
                            for="modal-detail"
                            class="join-item btn btn-ghost modal-button btn-xs text-error hover:text-black"
                            @click="$refs.issueModal.fnBase.edit(`${v.doc}`, `${i}`)"
                          >
                            <span class="underline underline-offset-2">issue</span>
                          </label>
                        </th>
                        <th class="text-center text-gray-500" v-else>
                          done
                        </th>
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
// @ is an alias to /src
import { useStore } from "vuex";
import { useContentHeight } from "@/composables/useContentHeight";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref } from "vue";

import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModulePagesWHIndirectModalRequest from "@/components/App/Module/Pages/WHIndirect/Modal/Request";
import AppModulePagesWHIndirectModalIssue from "@/components/App/Module/Pages/WHIndirect/Modal/Issue";

export default {
  name: "IndirectIssue",
  components: {
    AppLayout,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModulePagesWHIndirectModalRequest,
    AppModulePagesWHIndirectModalIssue,
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
          issue_modal: false,
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
            approve: true,
            noreject: true,
            fromIssue: true,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/WHI/request_item"
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
        }api/controllers/MYSQL/INTERNAL/WHI/exports?for=issue_item&total=1&approve=1${
          user.value.access.WarehouseIndirect.WHIndirectRequest == "user"
            ? `&su=${user.value.code}`
            : user.value.access.WarehouseIndirect.WHIndirectRequest ==
                "superuser" ||
              user.value.access.WarehouseIndirect.WHIndirectRequest == "admin"
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
      base,
      fnBase,
      titleZone,
      contentHeight,
      AppLayoutComponent,
      user,
      exportExcel,
    };
  },
};
</script>

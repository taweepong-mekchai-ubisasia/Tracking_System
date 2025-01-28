<template>
  <AppLayout ref="AppLayoutComponent">
    <template #modal>
      <AppModuleGlobalStatusApprove
        v-model="approve"
        @update:success="fnApprove.success"
        ref="statusApproveModal"
      />
      <AppModuleGlobalStatusReject
        v-model="reject"
        @update:success="fnReject.success"
        ref="statusRejectModal"
      />
      <AppModuleGlobalStatusCancel
        v-model="cancel"
        @update:success="fnCancel.success"
        ref="statusCancelModal"
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
                    <h3 class="text-lg font-bold text-primary px-2 sm:px-4">APPROVE&nbsp;REQUEST&nbsp;LISTS</h3>
                    <div
                      class="gap-2 sm:gap-4 flex-row flex w-full justify-end relative"
                    >
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
                        <td colspan="5" class="text-center bg-orange-400 text-sm">รายการ Booking</td>
                        <td colspan="4" class="text-center bg-blue-400 text-sm">รายการ Request</td>
                      </tr>
                      <tr>
                        <td width="10%" class="bg-orange-200" style="height: 26px">ผู้เยี่ยมชม</td>
                        <td width="10%" class="bg-orange-200" style="height: 26px">หัวข้อ</td>
                        <td width="10%" class="bg-orange-200" style="height: 26px">รายละเอียด</td>
                        <td width="10%" class="bg-orange-200" style="height: 26px">ผู้ทำรายการ</td>
                        <td width="10%" class="bg-orange-200" style="height: 26px">วันที่ต้องการ</td>
                        <td width="12.5%" class="bg-blue-200" style="height: 26px">สิ่งที่ต้องการ</td>
                        <td width="12.5%" class="bg-blue-200" style="height: 26px">จำนวน</td>
                        <td width="12.5%" class="bg-blue-200" style="height: 26px">หน่วย</td>
                        <td width="12.5%" class="bg-blue-200 text-right" style="height: 26px">approve / reject / cancel</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(v, i) in base.data.rows" :key="v.code" :class="v.process == 'reject' ? 'opacity-50 line-through decoration-rose-500' : ''">
                        <td class="font-bold">
                          {{ v.visitorTitle }}
                        </td>
                        <td>{{ v.title }}</td>
                        <td>{{ v.description }}</td>
                        <td>{{ v.created_fullname }}</td>
                        <td>
                          {{ $moment(v.desired_date).format("DD-MM-YYYY") }}
                          {{ v.desired_time }}
                        </td>
                        <td class="font-bold">
                          {{ v.item_name }}
                        </td>
                        <td>{{ v.item_qty }}</td>
                        <td>{{ v.unit_name }}</td>
                        <th class="text-right">
                          <span
                            v-if="
                              v.process != 'approve' &&
                              v.process != 'reject' &&
                              v.status != 'Completed'
                            "
                          >
                            <label
                              class="join-item btn btn-link text-success no-underline modal-button btn-xs"
                              @click="
                                fnApprove.item(
                                  v,
                                  'api/controllers/MYSQL/INTERNAL/TRR/visitor'
                                )
                              "
                            >
                              <Icon
                                icon="mingcute:check-fill"
                                class="w-4 h-4 block lg:hidden"
                              />
                              <span class="hidden lg:block">Approve</span>
                            </label>
                            <label
                              class="join-item btn btn-link text-error no-underline modal-button btn-xs"
                              @click="
                                fnReject.item(
                                  v,
                                  'api/controllers/MYSQL/INTERNAL/TRR/visitor'
                                )
                              "
                            >
                              <Icon
                                icon="iconoir:cancel"
                                class="w-4 h-4 block lg:hidden"
                              />
                              <span class="hidden lg:block">Reject</span>
                            </label>
                            <label
                              class="join-item btn btn-link text-gray-500 no-underline modal-button btn-xs"
                              @click="
                                fnCancel.item(
                                  v,
                                  'api/controllers/MYSQL/INTERNAL/TRR/visitor'
                                )
                              "
                            >
                              <Icon
                                icon="mage:cancel"
                                class="w-4 h-4 block lg:hidden"
                              />
                              <span class="hidden lg:block">Cancel</span>
                            </label>
                          </span>
                          <span
                            v-else-if="
                              v.process != 'approve' &&
                              v.process != 'reject' &&
                              v.status == 'Completed'
                            "
                          >
                            <button
                              class="join-item btn modal-button btn-xs disabled:bg-base-100 disabled:text-success italic"
                              disabled
                            >
                              <span>Completed</span>
                            </button>
                          </span>
                          <span
                            v-else-if="v.process == 'approve'"
                          >
                            <label
                              v-if="v.status != 'Completed'"
                              class="join-item btn btn-link text-gray-500 no-underline modal-button btn-xs"
                              @click="
                                fnCancel.item(
                                  v,
                                  'api/controllers/MYSQL/INTERNAL/TRR/visitor'
                                )
                              "
                            >
                              <Icon
                                icon="mage:cancel"
                                class="w-4 h-4 block lg:hidden"
                              />
                              <span class="hidden lg:block">Cancel</span>
                            </label>
                            <button
                              v-else
                              class="join-item btn modal-button btn-xs disabled:bg-base-100 disabled:text-success italic"
                              disabled
                            >
                              <span>Completed</span>
                            </button>
                          </span>
                          <span
                            v-else-if="v.process == 'reject'"
                          >
                            <button
                              class="join-item btn modal-button btn-xs disabled:bg-base-100 disabled:text-error italic"
                              disabled
                            >
                              <span>Rejected</span>
                            </button>
                          </span>
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
<script>
import { useStore } from "vuex";
import { useContentHeight } from "@/composables/useContentHeight";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";

import {
  defineAsyncComponent,
  shallowRef,
  computed,
  defineComponent,
  ref,
  watch,
  getCurrentInstance,
  nextTick,
  onMounted,
} from "vue";

import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModulePagesHRVisitorModalItem from "@/components/App/Module/Pages/HR/Visitor/Modal/Item.vue";
import AppModuleGlobalStatusApprove from "@/components/App/Module/Global/StatusApprove.vue";
import AppModuleGlobalStatusReject from "@/components/App/Module/Global/StatusReject.vue";
import AppModuleGlobalStatusCancel from "@/components/App/Module/Global/StatusCancel.vue";

import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";

export default {
  name: "Request",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPagination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModulePagesHRVisitorModalItem,
    AppModuleGlobalStatusApprove,
    AppModuleGlobalStatusReject,
    AppModuleGlobalStatusCancel,
    AppModuleGlobalSearchV2,
  },
  setup() {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);

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
          label: "วันที่เริ่ม",
          value: "",
        },
        {
          type: "date",
          id: "dateTo",
          placeholder: "Search",
          label: "วันที่สิ้นสุด",
          value: "",
        },
      ],
    });

    const fnBase = {
      search: async () => {
        try {
          base.value.page = 1;
          await fnBase.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (base.value.pagination.loading) return;
        base.value.pagination.loading = true;
        try {
          const queryObj = {
            page: base.value.pagination.page,
            row: base.value.pagination.row,
            search: base.value.search,
            getTotal: true,
            findObject: true,
          };
          user.value.access.HR.HRVisitorManagementRequestList == 'user' ? queryObj['department'] = user.value.department : "";
          const path = buildPath(
            queryObj,
            "api/controllers/MYSQL/INTERNAL/TRR/visitor"
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
      success: () => {
        base.value.pagination.page = 1;
        fnBase.search();
      },
    };

    const approve = ref({
      current: 0,
      rows: [],
      model: false,
      path: "",
      loading: false,
    });
    const reject = ref({
      current: 0,
      rows: [],
      model: false,
      path: "",
      loading: false,
    });
    const cancel = ref({
      current: 0,
      rows: [],
      model: false,
      path: "",
      loading: false,
    });

    const fnApprove = {
      item: (v, path) => {
        approve.value.modal = true;
        approve.value.rows = [
          {
            code: v.code,
            idx: v.array_index,
            itemCode: v.item_code,
            process: "approve",
          },
        ];
        approve.value.path = path;
      },
      success: (res) => {
        approve.value.modal = false;
        fnBase.search();
      },
    };
    const fnCancel = {
      item: (v, path) => {
        cancel.value.modal = true;
        cancel.value.rows = [
          {
            code: v.code,
            idx: v.array_index,
            itemCode: v.item_code,
            process: "cancel",
          },
        ];
        cancel.value.path = path;
      },
      success: (res) => {
        cancel.value.modal = false;
        fnBase.search();
      },
    };
    const fnReject = {
      item: (v, path) => {
        reject.value.modal = true;
        reject.value.rows = [
          {
            code: v.code,
            idx: v.array_index,
            itemCode: v.item_code,
            process: "reject",
          },
        ];
        reject.value.path = path;
      },
      success: (res) => {
        reject.value.modal = false;
        fnBase.search();
      },
    };

    onMounted(() => {
      nextTick(() => {
        if (user.value) {
          fnBase.search();
        }
      });
    });

    watch(user, async (v, o) => {
      if (v) {
        fnBase.search();
      }
    });

    return {
      base,
      approve,
      reject,
      fnBase,
      fnApprove,
      fnReject,
      fnCancel,
      cancel,
      titleZone,
      contentHeight,
      AppLayoutComponent,
    };
  },
};
</script>

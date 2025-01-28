<template>
  <AppLayout ref="AppLayoutComponent">
    <template #modal>
      <AppModulePagesQARetainModalRequest
        v-model="base.data"
        @update:success="fnBase.success"
        @update:confirm="fnBase.confirm"
        ref="baseModal"
      />
      <AppModuleGlobalModalConfirm
        v-model="base.data"
        @update:success="fnBase.success"
        ref="baseModalConfirm"
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
                    <h3 class="text-lg font-bold text-primary w-full text-left">APPROVE&nbsp;RETAIN&nbsp;REQUEST</h3>

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
                        <td>รายการ</td>
                        <td>ผู้ทำรายการ</td>
                        <td>แผนก</td>
                        <td>Short Code</td>
                        <td>Lot No.</td>
                        <td>Quantitys</td>
                        <td>สถานะ</td>
                        <td></td>
                        <th class="text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(v, i) in base.data.rows"
                        :key="v.code"
                        :class="
                          v.currentStatus == 'opening'
                            ? 'text-amber-500'
                            : v.currentStatus == 'reject'
                            ? 'text-error'
                            : v.currentStatus == 'approve'
                            ? 'text-success'
                            : v.currentStatus == 'cancel'
                            ? 'opacity-50 line-through decoration-rose-500'
                            : 'text-teal-900'
                        "
                      >
                        <td class="font-bold">
                          <div class="text-xs">
                            {{ v.create_timestamp }}
                          </div>
                          <div class="text-xs opacity-50">( {{ v.id }} )</div>
                        </td>
                        <td>{{ v.created_fullname }}</td>
                        <td>{{ v.dept }}</td>
                        <td>{{ v.shortcode }}</td>
                        <td>{{ v.lotTitle }}</td>
                        <td>{{ v.qty }} x {{ v.packsize }} = {{ v.summary }} {{ v.unit }}</td>
                        <td class="font-bold italic">{{ v.currentStatus.toUpperCase() }}</td>
                        <td v-if="v.current_timestamp">
                          <div class="text-xs">
                            By : {{ v.current_fullname }}
                          </div>
                          <div class="text-xs">{{ v.current_timestamp }}</div>
                        </td>
                        <td v-else>
                          -
                        </td>
                        <th class="text-right">
                          <button
                            class="btn btn-outline btn-success modal-button btn-xs"
                            :class="v.currentStatus == 'approve' || v.currentStatus == 'close' ? 'disabled:bg-success' :'btn-outline'"
                            @click="
                              fnBase.confirm('approve', i)
                            "
                            :disabled="v.currentStatus != 'opening'"
                          >
                          <Icon icon="icon-park:correct" />
                          </button>
                          <button
                            class="btn btn-error modal-button btn-xs ml-1"
                            :class="v.currentStatus == 'reject' ? 'disabled:bg-error' :'btn-outline'"
                            @click="
                              fnBase.confirm('reject', i)
                            "
                            :disabled="v.currentStatus != 'opening'"
                          >
                          <Icon icon="icon-park:error" />
                          </button>
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
import { computed, ref } from "vue";

import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModulePagesQARetainModalRequest from "@/components/App/Module/Pages/QA/Retain/Modal/Request";
import AppModuleGlobalModalConfirm from "@/components/App/Module/Global/Modal/Confirm";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";

export default {
  name: "Approve",
  components: {
    AppLayout,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModulePagesQARetainModalRequest,
    AppModuleGlobalModalConfirm,
    AppModuleGlobalRemove,
  },
  setup() {
    const store = useStore();
    configureQuery(store);

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
          confirm: false,
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
            noStatus: 'cancel',
            wh: 'ubp',
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/QA/Retain/request"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            res.rows.forEach(x => {
              x.lot = JSON.parse(x.lot);
              x.currentStatus = x.status;
              x.current_fullname = x.closed_fullname || x.rejected_fullname || x.canceled_fullname || x.approved_fullname;
              x.current_timestamp = x.close_timestamp || x.reject_timestamp || x.cancel_timestamp || x.approve_timestamp;
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
      confirm(status, index) {
        base.value.data.form.method = "PUT";
        base.value.data.form.object = base.value.data.rows[index];
        // base.value.data.form.object.shortcode_obj = base.value.data.form.object.shortcode_obj
        //   ? Array.isArray(base.value.data.form.object.shortcode_obj) 
        //     ? base.value.data.form.object.shortcode_obj 
        //     : JSON.parse(base.value.data.form.object.shortcode_obj)
        //   : [];
        // base.value.data.form.object.lot = JSON.parse(base.value.data.form.object.lot);
        base.value.data.form.object.status = status;
        base.value.data.form.confirm = true;
      },
      success() {
        base.value.pagination.page = 1;
        fnBase.search();
      },
    };

    const baseModal = ref(null)
    const baseModalConfirm = ref(null)
    fnBase.search();

    return {
      base,
      fnBase,
      baseModal,
      baseModalConfirm,
      titleZone,
      contentHeight,
      AppLayoutComponent,
    };
  },
};
</script>

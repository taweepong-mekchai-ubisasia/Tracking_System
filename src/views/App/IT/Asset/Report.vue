<template>
  <AppLayout ref="AppLayoutComponent">
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
                    <!-- <h3 class="text-lg font-bold text-primary">COMPUTER&nbsp;REPORT</h3> -->
                    <h3 class="text-lg font-bold text-primary">REPORT</h3>
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
                    v-if="base.pagination.loading"
                    class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
                  >
                    <AppModuleGlobalLoadingText
                      :type="'text'"
                      :class="`p-4 py-12 text-3xl text-center`"
                    />
                  </div>
                  <div class="w-full my-2">
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
                      class="table table-zebra table-xs table-pin-rows table-pin-cols"
                      v-else
                    >
                      <thead>
												<tr>
                          <td class="text-center text-lg text-accent underline underline-offset-2" colspan="6">จำนวน Computer เช่าทั้งหมดแบ่งตามบริษัทย่อย</td>
                        </tr>
                        <tr>
                          <td>รุ่น</td>
                          <td class="text-center">Ubis ใช้งานอยู่</td>
                          <td class="text-center">BL ใช้งานอยู่</td>
                          <td class="text-center">จำนวนรายการที่ใช้งานอยู่</td>
                          <td class="text-center">ว่างอยู่</td>
                          <td class="text-center">จำนวนทั้งหมด</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="hover" v-for="(v, i) in base.data.rows.filter(x => x.property_title == 'ประเภทเช่าใช้งาน')">
                          <td>{{ v.model_title }}</td>
                          <td class="text-center text-orange-500 font-bold">{{ v.ubis_count }}</td>
                          <td class="text-center text-gray-500 font-bold">{{ v.bl_count }}</td>
                          <td class="text-center text-yellow-500 font-bold">{{ v.all_count }}</td>
                          <td class="text-center text-green-500 font-bold">{{ v.free_count }}</td>
                          <td class="text-center text-blue-500 font-bold">{{ v.qty }}</td>
                        </tr>
                      </tbody>
                      <thead>
												<tr>
                          <td class="text-center text-lg text-accent underline underline-offset-2" colspan="6">จำนวน Computer ที่เป็นทรัพย์สินบริษัทที่ถูกใช้งานอยู่</td>
                        </tr>
                        <tr>
                          <td>รุ่น</td>
                          <td class="text-center">Ubis ใช้งานอยู่</td>
                          <td class="text-center">BL ใช้งานอยู่</td>
                          <td class="text-center">จำนวนรายการที่ใช้งานอยู่</td>
                          <td class="text-center">ว่างอยู่</td>
                          <td class="text-center">จำนวนทั้งหมด</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="hover" v-for="(v, i) in base.data.rows.filter(x => x.property_title == 'ทรัพย์สินบริษัท')">
                          <td>{{ v.model_title }}</td>
                          <td class="text-center text-orange-500 font-bold">{{ v.ubis_count }}</td>
                          <td class="text-center text-gray-500 font-bold">{{ v.bl_count }}</td>
                          <td class="text-center text-yellow-500 font-bold">{{ v.all_count }}</td>
                          <td class="text-center text-green-500 font-bold">{{ v.free_count }}</td>
                          <td class="text-center text-blue-500 font-bold">{{ v.qty }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <!-- <AppModuleGlobalPagination
                  v-model="base.pagination"
                  @update:page="fnBase.get"
                /> -->
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

import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModuleGlobalOptionSelection from "@/components/App/Module/Global/OptionSelection.vue";

import AppModuleGlobalTreeGrid from "@/components/App/Module/Global/TreeGrid/";
// import Query from "@/assets/js/fetch.js";

export default {
  name: "ComputerReport",
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
    AppModuleGlobalTreeGrid,
  },
  setup() {
    const store = useStore();
    configureQuery(store);

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
        emp: [],
        transaction: [],
        form: {
          loading: false,
          modal: false,
          object: {
            title: "",
          },
          temp: {
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
          const queryParams = {
            // page: base.value.pagination.page,
            // row: base.value.pagination.row,
            search: base.value.search,
						group: true,
            getTotal: true,
            all: true
          };

          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/IT/computer"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            base.value.data.rows = res.rows;
            base.value.data.emp = res.emp;
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

    const baseModal = ref(null);
    const removeModal = ref(null);

    const exportExcel = () => {
      return window.open(
        `${serviceUrl.value}api/controllers/MYSQL/INTERNAL/IT/exports?for=report&group=1&total=1`
      );
      // return window.open(
      //   `http://localhost:8080/services/api/controllers/MYSQL/INTERNAL/IT/exports?for=computer&total=1`
      // );
    };

    return {
      base,
      fnBase,
      baseModal,
      remove,
      fnRemove,
      removeModal,
      exportExcel,
      titleZone,
      contentHeight,
      AppLayoutComponent,
    };
  },
};
</script>

<template>
  <AppLayout ref="AppLayoutComponent">
    <template #modal>
      <AppModulePagesWHIndirectModalStock
        :from="'issue'"
        v-model="base.data"
        @update:success="fnBase.success"
        ref="baseModal"
      />
      <AppModulePagesWHIndirectModalRepurchase
        v-model="base.data"
        @update:success="fnBase.success"
        ref="repurchaseModal"
      />
      <AppModulePagesWHIndirectModalConfig
        v-model="base.data"
        @update:success="fnBase.success"
        ref="configModal"
      />
      <AppModuleGlobalRemove
        v-model="remove"
        @update:success="fnRemove.success"
        ref="removeModal"
      />
      <AppModuleGlobalShowImage :src="imageSrc" />
    </template>
    <template #view>
      <div class="grid grid-cols-1 gap-6">
        <label
          v-if="base.data.permission == 'superadmin'"
          for="modal-config"
          class="btn btn-circle btn-xs bg-red-500 hover:bg-red-700 w-fit px-2 text-white absolute right-1 top-16 mt-1"
          @click="$refs.configModal.fnDetail.search"
        >
          <Icon icon="bi:database-fill-gear" width="16" height="16" />
          <span class="md:block hidden">System Config</span>
        </label>
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
                    <div class="join max-w-sm w-full shadow">
                      <select
                        class="join-item select select-sm select-bordered w-full font-semibold"
                        v-model="by.tab"
                        @change="setCheckbox()"
                      >
                        <option v-for="v in base.data.dept" :value="v.owner">
                          {{ v.title }}
                        </option>
                      </select>
                      <div class="indicator">
                        <span
                          class="indicator-item badge badge-sm badge-error text-xs font-bold border-red-600 text-white"
                          >{{ base.data.noti }}</span
                        >
                        <label
                          class="join-item btn btn-sm btn-secondary w-36 px-2 text-white"
                          @click="$refs.repurchaseModal.fnDetail.search"
                        >
                          รายการที่ต้องซื้อคืน
                        </label>
                      </div>
                    </div>
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
                    class="table table-zebra table-xs table-pin-rows table-pin-cols"
                  >
                    <thead>
                      <tr>
                        <th>รูปประกอบ</th>
                        <td>Item</td>
                        <td>Status</td>
                        <td class="text-right">คงเหลือในคลัง</td>
                        <td class="text-right">จำนวนขั้นต่ำ</td>
                        <td>หน่วย</td>
                        <td
                          v-if="base.data.permission.indexOf('admin') > -1"
                          class="text-right"
                        >
                          ราคา (฿)
                        </td>
                        <th
                          v-if="
                            base.data.permission != 'user'
                              ? base.data.permission != 'superadmin'
                                ? base.data.owner.find((x) => x.wh == by.tab)
                                : true
                              : false
                          "
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(v, i) in base.data.rows"
                        :key="v.code"
                        class="hover"
                      >
                        <th>
                          <div class="avatar static shadow">
                            <div class="w-12 h-12 bg-white">
                              <label
                                for="modal_showImage"
                                class="btn btn-link p-0 flex justify-center"
                                v-if="v.image.length > 0"
                                @click="
                                  v.image.length > 0
                                    ? (imageSrc = `${
                                        v.image[v.master ? v.master : 0].temp
                                          ? `${serviceUrl}tmps/image/`
                                          : v.imageLink
                                          ? `${v.imageLink}IndirectItem/${v.code}/`
                                          : `${serviceUrl}tmps/image/`
                                      }${
                                        v.image[v.master ? v.master : 0].file
                                      }`)
                                    : ''
                                "
                              >
                                <img
                                  :src="`${
                                    v.image[v.master ? v.master : 0].temp
                                      ? `${serviceUrl}tmps/image/`
                                      : v.imageLink
                                      ? `${v.imageLink}IndirectItem/${v.code}/`
                                      : `${serviceUrl}tmps/image/`
                                  }${v.image[v.master ? v.master : 0].file}`"
                                  alt="Image"
                                  style="object-fit: contain"
                                />
                              </label>
                              <img
                                width="auto"
                                height="auto"
                                class="max-h-44 object-cover bg-cover"
                                v-else
                                :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyImage.jpg&s=10`"
                                alt="Image"
                              />
                            </div>
                          </div>
                        </th>
                        <td>
                          <div class="flex items-center gap-3">
                            <div class="font-semibold">
                              <div class="text-sm">
                                {{ v.title }}
                              </div>
                              <div class="text-gray-500">
                                {{ v.description ? `${v.description}` : "-" }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div
                            class="flex items-center gap-2"
                            v-if="parseInt(v.min) < parseInt(v.amount)"
                          >
                            <span class="badge badge-success badge-xs"></span
                            ><span class="font-bold text-success"
                              >มีของเพียงพอแล้ว</span
                            >
                          </div>
                          <div class="flex items-center gap-2" v-else>
                            <span class="badge badge-error badge-xs"></span
                            ><span class="font-bold text-error"
                              >ต้องเติมของเพิ่ม</span
                            >
                          </div>
                        </td>
                        <td class="text-right">
                          {{ new Intl.NumberFormat().format(v.amount) }}
                        </td>
                        <td class="text-right">
                          {{ new Intl.NumberFormat().format(v.min) }}
                        </td>
                        <td>{{ v.unit || "-" }}</td>
                        <td
                          v-if="base.data.permission.indexOf('admin') > -1"
                          class="text-right"
                        >
                          {{
                            new Intl.NumberFormat("th-TH", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(v.current_price)
                          }}
                        </td>
                        <th
                          class="text-right"
                          v-if="
                            base.data.permission != 'user'
                              ? base.data.permission != 'superadmin'
                                ? base.data.owner.find((x) => x.wh == by.tab)
                                : true
                              : false
                          "
                        >
                          <label
                            for="modal-base"
                            class="btn btn-primary modal-button btn-xs text-white"
                            @click="
                              $refs.baseModal.fnBase.create(`${v.code}`, `${i}`)
                            "
                          >
                            รายละเอียด
                          </label>
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
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModulePagesWHIndirectModalStock from "@/components/App/Module/Pages/WHIndirect/Modal/Stock";
import AppModulePagesWHIndirectModalRepurchase from "@/components/App/Module/Pages/WHIndirect/Modal/Repurchase";
import AppModulePagesWHIndirectModalConfig from "@/components/App/Module/Pages/WHIndirect/Modal/Config";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";

export default {
  name: "IndirectReceive",
  components: {
    AppLayout,
    AppModuleGlobalSearchV2,
    AppModuleGlobalPagination,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModuleGlobalRemove,
    AppModuleGlobalShowImage,
    AppModulePagesWHIndirectModalStock,
    AppModulePagesWHIndirectModalRepurchase,
    AppModulePagesWHIndirectModalConfig,
  },
  setup() {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);
    const serviceUrl = computed(() => store.getters.serviceUrl);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone);

    const imageSrc = ref(null);

    const by = ref({ tab: "" });
    const first_search = ref(true);

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
        noti: "",
        permission: "",
        owner: [],
        dept: [],
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
            page: base.value.pagination.page,
            row: base.value.pagination.row,
            search: base.value.search,
            first_search: first_search.value ? first_search.value : null,
            owner: first_search.value ? null : by.value.tab,
            fromStock: true,
            getTotal: true,
          };

          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/WHI/item"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });

            base.value.data.dept = res.dept;
            base.value.data.owner = res.owner;
            base.value.data.rows = res.rows;
            base.value.data.permission = res.permission;
            base.value.data.noti = res.noti;
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

    const exportExcel = () => {
      return window.open(
        `${
          serviceUrl.value
        }api/controllers/MYSQL/INTERNAL/WHI/exports?for=manage_item&total=1&owner=${
          by.value.tab
        }&user_dept=${user.value.department}${
          first_search.value ? `&first_search=${first_search.value}` : ""
        }${
          base.value.search[0].value ? `&q=${base.value.search[0].value}` : ""
        }`
      );
    };

    const setCheckbox = () => {
      base.value.search[0].value = "";
      base.value.pagination.page = 1;
      fnBase.search();
    };

    fnBase.search().then(() => {
      by.value.tab = base.value.data.owner[0].wh;
      first_search.value = false;
    });

    return {
      AppLayoutComponent,
      titleZone,
      contentHeight,
      base,
      fnBase,
      remove,
      fnRemove,
      by,
      setCheckbox,
      imageSrc,
      user,
      exportExcel,
      serviceUrl
    };
  },
};
</script>

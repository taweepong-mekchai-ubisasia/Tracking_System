<template>
  <AppLayout ref="AppLayoutComponent">
    <template #modal>
      <AppModulePagesWHIndirectModalItemMaster
        v-model="base.data"
        @update:success="fnBase.success"
        ref="baseModal"
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
                      ITEM&nbsp;MASTER
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
                      <label
                        class="btn btn-xs sm:btn-sm btn-primary text-white"
                        @click="$refs.baseModal.fnBase.create"
                        v-if="base.data.permission != 'user'"
                      >
                        <Icon
                          icon="material-symbols:add"
                          class="w-4 h-4 block lg:hidden"
                        />
                        <span class="hidden lg:block">Create</span>
                      </label>
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
                        <th>รูปประกอบ</th>
                        <td>Item</td>
                        <td>รายละเอียด</td>
                        <td class="text-right">จำนวนขั้นต่ำ</td>
                        <td>หน่วย</td>
                        <td>บันทึกรายการ</td>
                        <td>แก้ไขรายการล่าสุด</td>
                        <th v-if="base.data.permission != 'user'"></th>
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
                              <div class="text-primary">
                                {{ v.dept_title || "-" }}
                              </div>
                              <div class="text-sm">
                                {{ v.title }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {{ v.description || "-" }}
                        </td>
                        <td class="text-right">
                          {{
                            new Intl.NumberFormat("en-US").format(
                              parseFloat(Math.abs(v.min))
                            )
                          }}
                        </td>
                        <td>
                          {{ v.unit || "-" }}
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="font-semibold">
                                {{ v.created_fullname }}
                              </div>
                              <div class="italic opacity-50">
                                {{
                                  $moment(v.created_at).format(
                                    "DD-MM-YYYY HH:mm:ss"
                                  )
                                }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="font-semibold" v-if="v.updated_at">
                                {{ v.updated_fullname }}
                              </div>
                              <div class="italic opacity-50">
                                {{
                                  v.updated_at
                                    ? $moment(v.updated_at).format(
                                        "DD-MM-YYYY HH:mm:ss"
                                      )
                                    : "-"
                                }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <th
                          class="text-right"
                          v-if="base.data.permission != 'user'"
                        >
                          <label
                            class="btn btn-link text-warning no-underline btn-xs"
                            @click="
                              $refs.baseModal.fnBase.edit(`${v.code}`, `${i}`)
                            "
                          >
                            <Icon
                              icon="icon-park-solid:edit"
                              class="w-4 h-4 block lg:hidden"
                            />
                            <span class="hidden lg:block">Edit</span>
                          </label>
                          <label
                            class="btn btn-link text-error no-underline btn-xs"
                            @click="
                              fnRemove.item(
                                `${v.code}`,
                                'api/controllers/MYSQL/INTERNAL/WHI/item'
                              )
                            "
                            v-if="base.data.permission == 'superadmin'"
                          >
                            <Icon
                              icon="material-symbols:delete"
                              class="w-4 h-4 block lg:hidden"
                            />
                            <span class="hidden lg:block">Remove</span>
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
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModulePagesWHIndirectModalItemMaster from "@/components/App/Module/Pages/WHIndirect/Modal/ItemMaster";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";

export default {
  name: "IndirectItem",
  components: {
    AppLayout,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModulePagesWHIndirectModalItemMaster,
    AppModuleGlobalRemove,
    AppModuleGlobalShowImage,
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
        permission: "",
        owner: [],
        dept: [],
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
            fromItem: true,
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
            base.value.data.permission = res.permission;
            base.value.data.owner = res.owner;
            base.value.data.dept = res.dept;
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
      return window.open(
        `${
          serviceUrl.value
        }api/controllers/MYSQL/INTERNAL/WHI/exports?for=item_master&total=1${
          base.value.data.permission != "superadmin"
            ? `&dept=${user.value.department}`
            : ""
        }${
          base.value.search[0].value ? `&q=${base.value.search[0].value}` : ""
        }`
      );
    };

    return {
      AppLayoutComponent,
      titleZone,
      contentHeight,
      base,
      remove,
      fnBase,
      fnRemove,
      exportExcel,
      user,
      imageSrc,
      serviceUrl
    };
  },
};
</script>

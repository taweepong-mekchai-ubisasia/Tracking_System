<template>
  <AppLayout ref="AppLayoutComponent">
    <template #modal>
      <AppModulePagesSystemBranchModalBranch
        v-model="base.data"
        @update:success="fnBase.success"
        ref="baseModal"
      />

      <AppModuleGlobalRemove
        v-model="remove"
        @update:success="fnRemove.success"
        ref="removeModal"
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
                      <h3 class="text-lg font-bold text-primary px-4">BRANCH</h3>
                      <div
                        class="gap-2 sm:gap-4 flex-row flex w-full justify-end relative"
                      >
                        <AppModuleGlobalSearchV2
                          @update:search="fnBase.search"
                          v-model="base.search"
                          :loading="base.pagination.loading"
                        />
                        <label
                          class="btn btn-xs sm:btn-sm btn-primary modal-button text-white"
                          @click="$refs.baseModal.fnBase.create"
                        >
                        <Icon icon="material-symbols:add" class="w-4 h-4 block lg:hidden" />
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
                          <th>#</th>
                          <td>Code</td>
                          <td>Branch Title</td>
                          <td>Creation</td>
                          <td>Updation</td>
                          <th class="text-right"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          class="hover"
                          v-for="(v, i) in base.data.rows"
                          :key="v.code"
                        >
                          <th>{{ v.id }}</th>
                          <td>{{ v.code }}</td>
                          <td class="font-bold">{{ v.title }}
                          </td>
                          <td>
                            <div class="flex items-center space-x-3">
                              <div>
                                <div class="text-xs">
                                  {{
                                    v.created_at &&
                                    $moment(v.created_at).format("YYYY") >
                                      "2000"
                                      ? $moment(v.created_at).format("DD-MM-YYYY HH:mm:ss")
                                      : "-"
                                  }}
                                </div>
                                <div class="text-xs opacity-50">
                                  {{
                                    v.created_fullname
                                      ? v.created_fullname
                                      : "-"
                                  }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="flex items-center space-x-3">
                              <div>
                                <div class="text-xs">
                                  {{
                                    v.updated_at &&
                                    $moment(v.updated_at).format("YYYY") >
                                      "2000"
                                      ? $moment(v.updated_at).format("DD-MM-YYYY HH:mm:ss")
                                      : "-"
                                  }}
                                </div>
                                <div class="text-xs opacity-50">
                                  {{
                                    v.updated_fullname
                                      ? v.updated_fullname
                                      : "-"
                                  }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <th class="text-right">
                            <label
                              class="btn btn-link text-warning no-underline modal-button btn-xs"
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
                              for="modal-remove"
                              class="btn btn-link text-error no-underline modal-button btn-xs"
                              @click="
                                fnRemove.item(
                                  `${v.code}`,
                                  'api/controllers/MYSQL/INTERNAL/System/branch'
                                )
                              "
                            >
                              <Icon
                                icon="material-symbols:delete"
                                class="w-4 h-4 block lg:hidden"
                              />
                              <!-- <iconify-icon icon="material-symbols:delete"></iconify-icon> -->
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
import AppModulePagesSystemBranchModalBranch from "@/components/App/Module/Pages/System/Branch/Modal/Branch";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";

export default {
  name: "Branch",
  components: {
    AppLayout,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModulePagesSystemBranchModalBranch,
    AppModuleGlobalRemove,
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
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/System/branch"
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

    return {
      base,
      remove,
      fnBase,
      fnRemove,
      titleZone,
      contentHeight,
      AppLayoutComponent,
    };
  },
};
</script>

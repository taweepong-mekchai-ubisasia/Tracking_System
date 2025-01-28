<template>
  <AppLayout ref="AppLayoutComponent">
    <template #modal>
      <AppModulePagesHRModalEmployee
        v-model="base.data"
        @update:success="fnBase.success"
        @update:removeItem="fnRemove.item"
        @update:removeAllItem="fnRemove.all_item"
        ref="baseModal"
      />
      <AppModuleGlobalRemove
        v-model="remove"
        @update:success="fnRemove.success"
        ref="removeModal"
      />
      <AppModuleGlobalShowImage :src="base.imageSrc" />
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
                    <h3 class="text-lg font-bold text-primary px-4">EMPLOYEE</h3>
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
                        <!-- <th>#</th> -->
                        <td></td>
                        <td>Code</td>
                        <td>Information</td>
                        <td>Computer</td>
                        <td>Contact</td>
                        <td>Position</td>
                        <td>Access</td>
                        <td>Date</td>
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
                        <!-- <th>{{ v.id }}</th> -->
                        <td class="text-center">
                          <div class="avatar static">
                            <div class="w-12 h-12">
                              <label
                                for="modal_showImage"
                                class="btn btn-link p-0"
                                v-if="v.image.length > 0"
                                @click="
                                  v.image.length > 0
                                    ? (base.imageSrc = `${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=employee/${v.code}/${v.image[0].file}&s=100`)
                                    : ''
                                "
                              >
                                <img
                                  :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=employee/${v.code}/${v.image[0].file}&s=25`"
                                  alt="Image"
                                  style="object-fit: contain"
                                  @error="
                                    (e) => {
                                      e.target.src = `${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyProfile.png&s=10`;
                                    }
                                  "
                                />
                              </label>
                              <img
                                width="auto"
                                height="auto"
                                class="max-h-44 object-cover bg-cover"
                                v-else
                                :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyProfile.png&s=10`"
                                alt="Image"
                              />
                            </div>
                          </div>
                        </td>
                        <td>{{ v.code }}</td>
                        <td class="text-center">
                          <div class="flex items-center gap-3">
                            <div class="text-left">
                              <div
                                class="font-bold"
                                v-if="v.lastname || v.lastname"
                              >
                                <span class="pr-2" v-if="v.firstname">{{
                                  v.firstname
                                }}</span>
                                <span v-if="v.lastname">{{ v.lastname }}</span>
                              </div>
                              <div class="font-bold" v-else>-</div>
                              <div class="text-sm">
                                UID : {{ v.uid ? v.uid : "-" }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="font-bold" :class="v.computer ? 'text-success' : 'text-error'">
                          {{ v.computer ? 'YES' : 'no' }}
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="font-bold">
                                {{ v.emailTitle ? v.emailTitle : "-" }}
                              </div>
                              <div class="text-sm">
                                Tel : {{ v.tel ? v.tel : "-" }}
                              </div>
                              <div class="text-sm">
                                Birthday :
                                {{
                                  v.birthdate &&
                                  $moment(v.birthdate).format("YYYY") >
                                    "2000"
                                    ? $moment(v.birthdate).format("DD-MM-YYYY")
                                    : "-"
                                }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="font-bold">
                                {{ v.position ? v.position : "-" }}
                              </div>
                              <div class="text-sm">
                                Department : {{ v.depTitle ? v.depTitle : "-" }}
                              </div>
                              <div class="text-sm">
                                {{ v.branchTitle ? v.branchTitle : "-" }} {{ v.branchTitle == 'โรงงานสมุทรสาคร' ? `( ${v.companyTitle ? v.companyTitle : "-"} )` : '' }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="font-bold">
                                {{ v.accessTitle ? v.accessTitle : "-" }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="text-sm">
                                Start :
                                {{
                                  v.started_at &&
                                  $moment(v.started_at).format("YYYY") >
                                    "2000"
                                    ? $moment(v.started_at).format("DD-MM-YYYY")
                                    : "-"
                                }}
                              </div>
                              <div class="text-sm">
                                End :
                                {{
                                  v.leaves_at &&
                                  $moment(v.leaves_at).format("YYYY") >
                                    "2000"
                                    ? $moment(v.leaves_at).format("DD-MM-YYYY")
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
                                  v.updated_fullname ? v.updated_fullname : "-"
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
                                'api/controllers/MYSQL/INTERNAL/HR/employee'
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
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModulePagesHRModalEmployee from "@/components/App/Module/Pages/HR/Modal/Employee";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";
// import Query from "@/assets/js/fetch.js";

export default {
  name: "Employee",
  components: {
    AppLayout,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModulePagesHRModalEmployee,
    AppModuleGlobalRemove
  },
  setup() {
    const store = useStore();
    configureQuery(store);

    const serviceUrl = computed(() => store.getters.serviceUrl);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone);

    const base = ref({
      removing: false,
      imageSrc: null,
      pagination: {
        page: 1,
        row: 10,
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
            page: base.value.pagination.page,
            row: base.value.pagination.row,
            search: base.value.search,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/HR/employee"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].file = v.file ? JSON.parse(v.file) : [];
              res.rows[i].master = 0;
            });

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
        // base.value.pagination.page = 1;
        fnBase.get();
      },
    };

    const fnRemove = {
      item: (code, path) => {
        remove.value.modal = true;
        remove.value.code = code;
        remove.value.path = path;
      },
      all_item: (rows, path) => {
        remove.value.modal = true;
        remove.value.rows = rows;
        remove.value.path = path;
      },
      success: () => {
        base.value.data.form.modal = false;
        base.value.pagination.page = 1;
        fnBase.search();
      },
    };

    fnBase.search();

    const baseModal = ref(null)
    const removeModal = ref(null)

    return {
      base,
      fnBase,
      baseModal,
      remove,
      fnRemove,
      removeModal,
      titleZone,
      contentHeight,
      AppLayoutComponent,
      serviceUrl
    };
  },
};
</script>

<style>
tr.disabled {
  pointer-events: none;
  opacity: 0.3;
  text-decoration: line-through;
  text-decoration-color: red;
}
</style>

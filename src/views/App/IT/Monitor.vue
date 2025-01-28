<template>
  <AppLayout ref="AppLayoutComponent">
    <template #modal>
      <AppModulePagesComputerModalComputer
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
                    <h3 class="text-lg font-bold text-primary">
                      COMPUTER
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
                      class="table table-xs table-pin-rows table-pin-cols"
                      v-else
                    >
                      <thead>
                        <tr>
                          <td>PO</td>
                          <!-- <td>ประเภททรัพสินย์</td> -->
                          <td>รายละเอียด</td>
                          <td class="text-right">มีผู้ถือครอง</td>
                          <td class="text-right">จำนวน</td>
                          <td class="text-center">Contract</td>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-for="(v, i) in base.data.rows">
                          <tr class="hover">
                            <td class="font-bold">{{ v.po || '-' }}</td>
                            <!-- <td>{{ v.property_title }}</td> -->
                            <td>{{ v.model_title }}</td>
                            <td class="flex items-center justify-end font-bold gap-3">
                              {{ base.data.emp.filter(x => x.model_code == v.code).length }}
                              <button 
                                class="btn btn-circle btn-xs text-white"
                                :class="v.show ? 'btn-error' : 'btn-success'"
                                @click="v.show = !v.show"
                              >
                                <Icon height=16 width="16" icon="material-symbols:cancel-outline" v-if="v.show" />
                                <!-- <Icon height=16 width="16" icon="material-symbols:face-down" v-else /> -->
                                <Icon height=16 width="16" icon="material-symbols:face-outline" v-else />
                              </button>
                            </td>
                            <td class="text-right">
                              <div class="join">
                                <button 
                                  class="join-item btn btn-xs btn-warning w-12"
                                  v-if="v.qty != v.balance"
                                  @click="fnBase.save(i)"
                                >
                                  update
                                </button>
                                <input 
                                  type="number" 
                                  class="join-item input input-xs input-bordered text-right font-semibold"
                                  :class="v.qty != v.balance ? 'w-12' : 'w-24'"
                                  min=1
                                  v-model="v.qty"
                                />
                              </div>
                            </td>
                            <td class="text-center" v-if="v.property_title == 'ประเภทเช่าใช้งาน'">
                              {{ $moment(v.uuid_start).format("DD MMMM YYYY") }} - {{ $moment(v.uuid_end).format("DD MMMM YYYY") }}
                            </td>
                            <td class="text-center text-primary font-bold" v-else>
                              {{ v.property_title }}
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
                                    'api/controllers/MYSQL/INTERNAL/IT/computer'
                                  )
                                "
                              >
                                <Icon
                                  icon="material-symbols:delete"
                                  class="w-4 h-4 block lg:hidden"
                                />
                                <span class="hidden lg:block">Remove</span>
                              </label>
                            </th>
                          </tr>
                          <tr v-if="v.show" class="bg-neutral">
                            <td colspan="10">
                              <div class="accordian-body overflow-x-auto border-solid border-2 rounded-lg shadow">
                                <table class="table">
                                  <thead>
                                    <tr class="text-center text-primary">
                                      <td class="underline underline-offset-2" colspan="7">พนักงานที่ถือครอง</td> 
                                    </tr>
                                    <tr class="bg-primary text-white">
                                      <td>Serial No.</td> 
                                      <td>รหัสพนักงาน</td> 
                                      <td>ชื่อ</td> 
                                      <td>นามสกุล</td> 
                                      <td>แผนก</td>
                                      <td>สาขา-ที่ตั้ง</td>
                                      <td class="text-center">ใบรับมอบ</td>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr class="bg-base-100" v-for="val in base.data.emp.filter(x => x.model_code == v.code)">
                                      <td>{{ val.serial }}</td>
                                      <td>{{ val.uid }}</td>
                                      <td>{{ val.firstname }}</td>
                                      <td>{{ val.lastname }}</td>
                                      <td>{{ val.dept_title }}</td>
                                      <td>{{ val.branch_title }} <span v-if="val.branch_title != 'สำนักงานใหญ่'">( {{ val.company_title }} )</span></td>
                                      <td class="text-right" v-if="val.file">
                                        <a class="text-primary font-semibold hover:underline hover:underline-offset-2" :href="`${serviceUrl}/upload/computer/${val.code}/${val.file}`" target="_blank">{{ val.name }}</a>
                                      </td>
                                      <td class="text-center" v-else>
                                        <!-- <kbd class="kbd kbd-xs font-semibold">ไม่มีไฟล์</kbd> -->
                                        <span class="font-semibold text-slate-500">ไม่มีไฟล์</span>
                                      </td>
                                    </tr>
                                  </tbody> 
                                </table>
                              </div>
                            </td>
                          </tr>
                        </template>
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
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";
import AppModulePagesComputerModalComputer from "@/components/App/Module/Pages/Computer/Modal/Computer.vue";

import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModuleGlobalOptionSelection from "@/components/App/Module/Global/OptionSelection.vue";

import AppModuleGlobalTreeGrid from "@/components/App/Module/Global/TreeGrid/";
// import Query from "@/assets/js/fetch.js";

export default {
  name: "Computer",
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
    AppModuleGlobalRemove,
    AppModulePagesComputerModalComputer,
    AppModuleGlobalTreeGrid
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
          // const queryParams = {
          //   page: base.value.pagination.page,
          //   row: base.value.pagination.row,
          //   search: base.value.search,
          //   getTotal: true,
          //   all: true,
          // };

          // const path = buildPath(
          //   queryParams,
          //   "api/controllers/MYSQL/INTERNAL/IT/computer"
          // );
          // const res = await fetchQuery({}, "GET", path);
          // if (res.success) {
          //   res.rows.forEach((v, i) => {
          //     res.rows[i].show = false

          //     res.rows[i].type = JSON.parse(v.type)
          //     res.rows[i].manu = JSON.parse(v.manu)
          //     res.rows[i].model = JSON.parse(v.model)
          //     res.rows[i].property = JSON.parse(v.property)
          //     res.rows[i].network= JSON.parse(v.network)
          //     res.rows[i].source = JSON.parse(v.source)

          //     res.rows[i].balance = v.qty
          //   });

          //   res.emp.forEach((v, i) => {
          //     let file = JSON.parse(res.emp[i].image)
          //     res.emp[i].file = file.length ? file[0].file : null
          //     res.emp[i].name = file.length ? file[0].name : null
          //   });

          //   base.value.data.rows = res.rows;
          //   base.value.data.emp = res.emp;
          //   base.value.pagination.total = res.total;
          //   base.value.pagination.next =
          //     base.value.pagination.page * base.value.pagination.row <
          //     base.value.pagination.total;
          //   base.value.pagination.back = base.value.pagination.page > 1;
          // } else {
          //   console.error("Error fetching base:", res.errorMsg);
          // }

          // const response = await fetch(`https://${}/api/table.xml?content=sensors&columns=sensor&output=csvtable&apitoken=${}`);
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
          
            const json = await response.json();
            console.log(json);

          return [];
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          base.value.pagination.loading = false;
        }
      },
      save: async (index) => {
        if (base.value.data.form.loading) return;
        base.value.data.form.loading = true;
        try {
          const queryBody = {
            code: base.value.data.rows[index].code,
            rows: base.value.data.rows,
          };

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/IT/computer"
          );
          const method = "PUT";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
          }
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          base.value.data.form.loading = false;
          fnBase.success()
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

    const baseModal = ref(null)
    const removeModal = ref(null)

    const exportExcel = () => {
      return window.open(
        `${serviceUrl.value}api/controllers/MYSQL/INTERNAL/IT/exports?for=computer&total=1`
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
      serviceUrl,
    };
  },
};
</script>

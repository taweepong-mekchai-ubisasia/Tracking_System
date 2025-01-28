<template>
  <div class="Visitor">
    <AppLayout ref="AppLayoutComponent">
      <template #modal>
        <AppModulePagesTRRVisitorModalBooking
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
                        BOOKING
                      </h3>

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
                          <Icon
                            icon="material-symbols:add"
                            class="w-4 h-4 block lg:hidden"
                          />

                          <span class="hidden lg:block">Create</span>
                        </label>
                        <AppModuleGlobalTreeGridFieldsetOption
                          v-model="base"
                          ref="refFieldsetOption"
                        />
                      </div>
                    </div>
                    <div class="divider my-1"></div>
                  </div>
                  
                  <!-- <div
                    class="overflow-x-auto w-full max-h-[60vh] min-h-[60vh] my-4"
                  > -->
                  <!-- // parentUrl: {
                            //   type: String,
                            //   default:
                            //     "http://localhost:8080/kay/rewrite_demo/services/api/controllers/MYSQL/INTERNAL/HR/employee",
                            // },
                            // childUrl: {
                            //   type: String,
                            //   default:
                            //     "http://localhost:8080/kay/rewrite_demo/services/api/controllers/MYSQL/INTERNAL/HR/email",
                            // },
                          -->
                  <AppModuleGlobalTreeGrid
                    :refFieldsetOption="refFieldsetOption"
                    v-model="base"
                    :tree="[
                      {
                        // path: `api/controllers/MYSQL/INTERNAL/HR/employee`,
                        path: `api/controllers/MYSQL/INTERNAL/TRR/visitor`,
                        ref: '',
                        title: '',
                        columns: [
                          // { field: 'code', title: 'รหัส' },
                          { field: 'title', title: 'หัวข้อ' },
                          { field: 'visitorTitle', title: 'ผู้เยี่ยมชม' },
                          { field: 'description', title: 'รายละเอียด' },
                          { field: 'desired_date', title: 'วันที่ต้องการ' },
                          { field: 'desired_time', title: 'เวลาที่ต้องการ' },
                    
                          { field: 'reminder_before', title: 'แจ้งเตือนล่วงหน้า ( วัน )' },
                          
                          // { field: 'firstname', title: 'firstname' },
                          // { field: 'lastname', title: 'lastname' },
                          // { field: 'tel', title: 'เบอร์โทรศัพท์' },
                          // { field: 'tel', title: 'เบอร์โทรศัพท์' },
                          // {field:'branch',title:''},
                          // {field:'',title:''},
                          // {field:'',title:''},


  //     'id': '36',
  //     'code': '1728272267D82GE',
  //     'visitor': '1726819792eNFfr',
  //     'title': '124124555',
  //     'description': '4444',
  //     'item': '[{\'name\':\'test ITEM \\u0e17\\u0e35\\u0e48 1\',\'code\':\'1726799369erJfi\',\'status\':true,\'qty\':1166,\'unit_name\':\'\\u0e25\\u0e2d\\u0e07\\u0e02\\u0e2d\\u0e07\'},{\'name\':\'2415\',\'code\':\'1726745338KbT6u\',\'status\':true,\'qty\':33,\'unit_name\':\'2\'},{\'name\':\'2415\',\'code\':\'1726745338GfN4U\',\'status\':true,\'qty\':22,\'unit_name\':\'3\'}]',
  //     'desired_date': '2024-10-07',
  //     'desired_time': '10:37:00',
  //     'reminder_before': '555',
  //     'inactive_notification': '0',
  //     'created_at': '2024-10-07 10:37:47',
  //     'created_by': '1705458129d9550',
  //     'updated_at': '2024-10-07 10:54:56',
  //     'updated_by': '1705458129d9550',
  //     'deleted_at': null,
  //     'deletd_by': null,
  //     'visitorTitle': 'fassssssss'
                        ],
                        lock: [],
                        showActionsColumn: true,
                        showImageColumn: false,
                        component:
                          'App/Module/Pages/System/Branch/Modal/Branch',
                        // D:\xampp\htdocs\kay\vue\Tracking_System\src\components\App\Module\Pages\System\Branch\Modal\Branch.vue
                      },
                      {
                        // path: `api/controllers/MYSQL/INTERNAL/HR/email`,
                        // ref: '',
                        title: 'รายการที่ต้องการ',
                        columns: [
                          // { field: 'code', title: 'รหัสรายการ' },
                          { field: 'name', title: 'ชื่อรายการ' },
                          { field: 'qty', title: 'จำนวน' },
                          { field: 'unit_name', title: 'หน่วย' },
                          // { field: 'department', title: 'แผนก' },
                          { field: 'process', title: 'สถานะ' },
                        ],
                        lock: [],
                        // showActionsColumn: false,
                        // showImageColumn: false,
                        objectKey:'item'
                      },
                      // {
                      //   path: `api/controllers/MYSQL/INTERNAL/HR/email`,
                      //   ref: '',
                      //   title: 'อื่นๆ',
                      //   columns: [],

                      //   lock: [],
                      //   showActionsColumn: false,
                      //   showImageColumn: false,
                      // },
                    ]"
                    ref="TreeGrid"
                    @ready="fnBase.search()"
                    @base-edit="
                      (obj) => $refs.baseModal.fnBase.edit(obj.code, obj.index)
                    "
                    @base-remove="(obj) => fnRemove.item(obj.code, obj.path)"
                  />

                  <!-- <table
                    class="table table-xs table-pin-rows table-pin-cols table-zebra"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <td>Code</td>
                        <td>Title</td>
                        <td>Description</td>
                        <td>visitor</td>

                        <td>Email</td>
                        <td>Need item</td>
                        <td>Early notification</td>
                        <td>Desired Date</td>
                        <td>Desired Time</td>
                        <td>Creation</td>
                        <td>Updation</td>
                        <th class="text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(v, i) in base.data.rows" :key="v.code">
                        <th>{{ v.id }}</th>
                        <td>{{ v.code }}</td>
                        <td>
                          <div class="font-bold">
                            {{ v.title || "-" }}
                          </div>
                        </td>

                        <td>
                          <div class="font-bold">
                            {{ v.description || "-" }}
                          </div>
                        </td>
                        <td>
                          <div class="font-bold">
                            {{ v.visitorTitle || "-" }}
                          </div>
                        </td>
                        <td>
                          <div
                            tabindex="0"
                            class="collapse collapse-plus border border-base-300 bg-white"
                            v-if="v.need_item ? v.need_item.length > 0 : false"
                          >
                            <div class="text-xs font-medium text-center">
                              Detail
                            </div>
                            <div class="collapse-content p-0">
                              <div class="overflow-x-auto max-h-24">
                                <table
                                  class="table table-xs table-pin-rows table-pin-cols"
                                >
                                  <tbody>
                                    <tr v-for="(v, i) in v.need_item">
                                      <th>{{ i + 1 }}</th>
                                      <th>{{ v.name }}</th>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div
                            tabindex="0"
                            class="collapse collapse-plus border border-base-300 bg-white"
                            v-if="v.email ? v.email.length > 0 : false"
                          >
                            <div class="text-xs font-medium text-center">
                              Detail
                            </div>
                            <div class="collapse-content p-0">
                              <div class="overflow-x-auto max-h-24">
                                <table
                                  class="table table-xs table-pin-rows table-pin-cols"
                                >
                                  <tbody>
                                    <tr v-for="(v, i) in v.email">
                                      <th>{{ i + 1 }}</th>
                                      <th>{{ v.name }}</th>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="font-bold">
                            {{
                              v.early_notification || "-"
                            }}
                          </div>
                        </td>
                        <td>
                          <div class="font-bold">
                            {{ v.desired_date ||"-" }}
                          </div>
                        </td>
                        <td>
                          <div class="font-bold">
                            {{ v.desired_time || "-" }}
                          </div>
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="text-xs">
                                {{
                                  v.created_at &&
                                  $moment(v.created_at).format("YYYY-MM-DD") >
                                    "2000"
                                    ? v.created_at
                                    : "-"
                                }}
                              </div>
                              <div class="text-xs opacity-30">
                                {{
                                  v.created_fullname || "-"
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
                                  $moment(v.updated_at).format("YYYY-MM-DD") >
                                    "2000"
                                    ? v.updated_at
                                    : "-"
                                }}
                              </div>
                              <div class="text-xs opacity-30">
                                {{
                                  v.updated_fullname || "-"
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
                                'api/controllers/MYSQL/INTERNAL/TRR/visitor'
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
                    </tbody>
                  </table> -->
                </div>
                <!-- <AppModuleGlobalPageination
                  :page="base.pagination.page"
                  :total="base.pagination.total"
                  :row="base.pagination.row"
                  :back="base.pagination.back"
                  :next="base.pagination.next"
                  :loading="base.pagination.loading"
                  @search="
                    (res) => {
                      base.pagination.page = res.page;
                      this.base_search();
                    }
                  "
                /> -->
                <!-- {{ base.pagination }} -->
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
  </div>
</template>

<script>
import { useStore } from "vuex";
// import { useContentHeight } from "@/composables/useContentHeight";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref, onMounted, nextTick, watch } from "vue";

// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModulePagesTRRVisitorModalItem from "@/components/App/Module/Pages/TRR/Visitor/Modal/Item.vue";
// import VueMultiselect from "vue-multiselect";
// import Query from "@/assets/js/fetch.js";

import AppModuleGlobalOptionSelection from "@/components/App/Module/Global/OptionSelection.vue";

// import AppModuleGlobalChecklist from "@/components/App/Module/Global/Checklist.vue";
import AppModuleGlobalCombobox from "@/components/App/Module/Global/Combobox.vue";
import AppModuleGlobalDatePicker from "@/components/App/Module/Global/DatePicker.vue";

import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";
import AppModulePagesTRRVisitorModalBooking from "@/components/App/Module/Pages/TRR/Visitor/Modal/Booking";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalTreeGrid from "@/components/App/Module/Global/TreeGrid/";
import AppModuleGlobalTreeGridFieldsetOption from "@/components/App/Module/Global/TreeGrid/fieldsetOption";

// console.log(AppModuleGlobalOptionSelection)
export default {
  name: "Visitor",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalPagination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    // VueMultiselect,
    AppModuleGlobalLoadingText,
    AppModulePagesTRRVisitorModalItem,
    AppModuleGlobalOptionSelection,
    // AppModuleGlobalChecklist,
    AppModuleGlobalCombobox,
    AppModuleGlobalDatePicker,
    AppModuleGlobalTreeGrid,
    AppModuleGlobalRemove,
    AppModulePagesTRRVisitorModalBooking,
    AppModuleGlobalSearchV2,
    AppModuleGlobalTreeGridFieldsetOption,
  },
  data() {
    return {
      selectedCountries: [],
      countries: [],
      isLoading: false,
      value_select: [],
      options_select: [],

      value_select_email: [],
      options_select_email: [],

      loadimage: false,
      options: {
        penColor: "#c0f",
      },
      // base: {
      //   pagination: {
      //     page: 1,
      //     row: 20,
      //     next: false,
      //     back: false,
      //     loading: false,
      //     total: 0,
      //   },
      //   data: {
      //     rows: [],
      //     form: {
      //       loading: false,
      //       modal: false,
      //       object: {
      //         title: "",
      //       },
      //     },
      //   },

      //   search: [
      //     {
      //       type: "search",
      //       id: "q",
      //       placeholder: "Search",
      //       label: "Search",
      //       value: "",
      //     },
      //     {
      //       type: "date",
      //       id: "dateFrom",
      //       placeholder: "Search",
      //       label: "วันที่เริ่ม",
      //       value: "",
      //     },
      //     {
      //       type: "date",
      //       id: "dateTo",
      //       placeholder: "Search",
      //       label: "วันที่สิ้นสุด",
      //       value: "",
      //     },
      //   ],
      // },
      detail: {
        rows: [],
        total: 0,
        page: 1,
        row: 20,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
          title: "",
          ref: "",
        },
      },
      remove: {
        current: 0,
        model: false,
        method: "",
        tb: "",
      },
      imageSrc: null,
      item: {
        rows: [],
        total: 0,
        page: 1,
        row: 20,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
          title: "",
          ref: "",
        },
      },
      test: {
        rows: [],
        total: 0,
        page: 1,
        row: 6,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
          title: "",
          ref: "",
          list: [],
        },
      },
      hasNextPage: true,
    };
  },
  watch: {
    "base.data.form.desired_date": function (v) {
      if (!this.base.data.form.early_notification) {
        this.base.data.form.early_notification = v;
      }
    },
  },

  setup() {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    // const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone);

    const base = ref({
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
        {
          type: "combobox",
          id: "combobox",
          placeholder: "combobox",
          label: "combobox",
          dataComponent: {
            url: "api/controllers/MYSQL/INTERNAL/TRR/visitor_member",
            label: "Visitor",
            selectMode: "single",
            image: false,
            fieldDisplay: "name",
            imagePath: "Visitor",
            lastFile: "",
            component: "App/Module/Pages/TRR/Visitor/Modal/Visitor",
            objectData: ["code", "name"],
          },
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
    const TreeGrid = ref(null);
    const baseModal = ref(null);
    const removeModal = ref(null);

    const fnBase = {
      search: async () => {
        try {
          //   base.value.pagination.page = 1;
          await TreeGrid.value.fnBase.search();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async (newPage) => {
        // console.log(TreeGrid);
        // console.log(TreeGrid.value);
        // console.log(TreeGrid.value); // Debugging statement
        base.value.pagination.page = newPage;
        try {
          //   base.value.pagination.page = 1;

          if (TreeGrid.value) {
            console.log("TreeGrid is available");
            // ตรวจสอบว่า fnBase มีอยู่ใน TreeGrid หรือไม่
            if (TreeGrid.value.fnBase) {
              await TreeGrid.value.fnBase.get();
              // await TreeGrid.value.fnBase.search();
              console.log("fnBase accessed successfully");
            } else {
              console.error("fnBase is not defined on TreeGrid");
            }
          } else {
            console.error("TreeGrid is not defined");
          }
        } catch (error) {
          console.error("Error during search:", error);
        }

        // if (base.value.pagination.loading) return;
        // base.value.pagination.loading = true;
        // try {
        //   const queryParams = {
        //     page: base.value.pagination.page,
        //     row: base.value.pagination.row,
        //     search: base.value.search,
        //     getTotal: true,
        //   };
        //   const path = buildPath(
        //     queryParams,
        //     "api/controllers/MYSQL/INTERNAL/TRR/visitor"
        //   );
        //   const res = await fetchQuery({}, "GET", path);
        //   if (res.success) {
        //     base.value.data.rows = res.rows;
        //     base.value.pagination.total = res.total;
        //     base.value.pagination.next =
        //       base.value.pagination.page * base.value.pagination.row <
        //       base.value.pagination.total;
        //     base.value.pagination.back = base.value.pagination.page > 1;
        //   } else {
        //     console.error("Error fetching base:", res.errorMsg);
        //   }
        //   return res;
        // } catch (error) {
        //   console.error("Error fetching data:", error);
        //   return { success: false, errorMsg: error.message };
        // } finally {
        //   base.value.pagination.loading = false;
        // }
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

    // ใช้ onMounted เพื่อตรวจสอบว่า TreeGrid ได้โหลดเรียบร้อยแล้ว
    onMounted(() => {
      nextTick(() => {
        fnBase.search(); // เรียกใช้ฟังก์ชัน
      });
    });

    // Watch the TreeGrid ref
    watch(TreeGrid, (v) => {
      if (v) {
        nextTick(() => {
          fnBase.search(); // เรียกใช้ฟังก์ชัน
        });
      } else {
        console.error("TreeGrid is not yet defined");
      }
    });

    onMounted(() => {
      nextTick(() => {
        if (TreeGrid.value && TreeGrid.value.fnBase) {
          TreeGrid.value.fnBase.search();
        } else {
          console.error("fnBase is not available yet.");
        }
      });
    });

    // // fnBase.search();
    // onMounted(() => {
    //   // fnBase.search();
    //   nextTick(() => {
    //     if (TreeGrid.value && TreeGrid.value.fnBase) {
    //       TreeGrid.value.fnBase.search();
    //     } else {
    //       console.error("fnBase is not available yet.");
    //     }
    //   });
    // });

    const refFieldsetOption = ref(null);
    return {
      base,
      remove,
      fnBase,
      fnRemove,
      titleZone,
      // contentHeight,
      AppLayoutComponent,
      TreeGrid,
      baseModal,
      removeModal,
      refFieldsetOption,
    };
  },
};
</script>
<style>
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}
.tag {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 3px;
  display: flex;
  align-items: center;
}
.tag span {
  margin-left: 8px;
  cursor: pointer;
  font-weight: bold;
}
</style>

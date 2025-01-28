<template>
  <div class="Visitor">
    <AppLayout ref="AppLayoutComponent">
      <template #modal>
        <AppModulePagesHRVisitorModalBooking
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
                      <h3 class="text-lg font-bold text-primary px-2 sm:px-4">
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
                  <AppModuleGlobalTreeGrid
                    :refFieldsetOption="refFieldsetOption"
                    v-model="base"
                    :tree="[
                      {
                        path: `api/controllers/MYSQL/INTERNAL/HR/visitor/visitor`,
                        ref: '',
                        title: '',
                        columns: [
                          { field: 'titleName', title: 'หัวข้อ' },
                          { field: 'visitorTitle', title: 'ผู้เยี่ยมชม' },
                          { field: 'description', title: 'รายละเอียด' },
                          { field: 'created_fullname', title: 'ผู้ทำรายการ' },
                          { field: 'dept', title: 'แผนก' },
                          { field: 'desired_date', title: 'วันที่ต้องการ' },
                          // { field: 'desired_time', title: 'เวลาที่ต้องการ' },
                          // { field: 'reminder_before', title: 'แจ้งเตือนล่วงหน้า ( วัน )' },
                          // { field: 'noti_date', title: 'วันที่แจ้งเตือน' },
                          { field: 'phase', title: 'สถานะ' },
                        ],
                        lock: [],
                        showActionsColumn: true,
                        showImageColumn: false,
                        component:
                          'App/Module/Pages/System/Branch/Modal/Branch',
                      },
                      {
                        title: 'รายการที่ต้องการ',
                        columns: [
                          { field: 'name', title: 'ชื่อรายการ' },
                          { field: 'qty', title: 'จำนวน' },
                          { field: 'unit_name', title: 'หน่วย' },
                          { field: 'remark', title: 'หมายเหตุ' },
                          { field: 'process', title: 'สถานะ' },
                        ],
                        lock: [],
                        objectKey:'item'
                      },
                    ]"
                    ref="TreeGrid"
                    @ready="fnBase.search()"
                    @base-edit="
                      (obj) => $refs.baseModal.fnBase.edit(obj.code, obj.index)
                    "
                    @base-remove="(obj) => fnRemove.item(obj.code, obj.path)"
                  />
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
  </div>
</template>

<script>
import { useStore } from "vuex";
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
import AppModulePagesHRVisitorModalItem from "@/components/App/Module/Pages/HR/Visitor/Modal/Item.vue";

import AppModuleGlobalOptionSelection from "@/components/App/Module/Global/OptionSelection.vue";
import AppModuleGlobalCombobox from "@/components/App/Module/Global/Combobox.vue";
import AppModuleGlobalDatePicker from "@/components/App/Module/Global/DatePicker.vue";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";
import AppModulePagesHRVisitorModalBooking from "@/components/App/Module/Pages/HR/Visitor/Modal/Booking";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalTreeGrid from "@/components/App/Module/Global/TreeGrid/";
import AppModuleGlobalTreeGridFieldsetOption from "@/components/App/Module/Global/TreeGrid/fieldsetOption";

export default {
  name: "Booking",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalPagination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModulePagesHRVisitorModalItem,
    AppModuleGlobalOptionSelection,
    AppModuleGlobalCombobox,
    AppModuleGlobalDatePicker,
    AppModuleGlobalTreeGrid,
    AppModuleGlobalRemove,
    AppModulePagesHRVisitorModalBooking,
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
          temp: {
            visitor: ""
          }
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
        // {
        //   type: "combobox",
        //   id: "combobox",
        //   placeholder: "combobox",
        //   label: "combobox",
        //   dataComponent: {
        //     url: "api/controllers/MYSQL/INTERNAL/HR/visitor_member",
        //     label: "Visitor",
        //     selectMode: "single",
        //     image: false,
        //     fieldDisplay: "name",
        //     imagePath: "Visitor",
        //     lastFile: "",
        //     component: "App/Module/Pages/HR/Visitor/Modal/Visitor",
        //     objectData: ["code", "name"],
        //   },
        //   value: "",
        // },
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
          await TreeGrid.value.fnBase.search();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async (newPage) => {
        base.value.pagination.page = newPage;
        try {
          if (TreeGrid.value) {
            console.log("TreeGrid is available");
            // ตรวจสอบว่า fnBase มีอยู่ใน TreeGrid หรือไม่
            if (TreeGrid.value.fnBase) {
              await TreeGrid.value.fnBase.get();
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

    const refFieldsetOption = ref(null);
    return {
      base,
      remove,
      fnBase,
      fnRemove,
      titleZone,
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
.tooltip:before {
  max-width: 50rem !important;
}
</style>
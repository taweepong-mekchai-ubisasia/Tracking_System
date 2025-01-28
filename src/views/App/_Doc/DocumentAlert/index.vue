<template>
  <AppLayout ref="AppLayoutComponent">
    <template #view>
      <div class="grid grid-cols-1">
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
                    class="gap-2 sm:gap-4 flex-row flex w-full justify-start items-center relative overflow-x-auto py-1"
                  >
                    <button 
                      class="btn btn-xs disabled:bg-primary disabled:text-white" 
                      @click="file = 'คู่มือการใช้งาน_Document_Alert_System_V_2'" 
                      :disabled="file == 'คู่มือการใช้งาน_Document_Alert_System_V_2'"
                    >
                      คู่มือการใช้งาน Document Alert System V.2 (ปัจจุบัน)
                    </button>
                    <button 
                      class="btn btn-xs disabled:bg-primary disabled:text-white" 
                      @click="file = 'คู่มือการใช้งาน_Document_Alert_System_V_1'" 
                      :disabled="file == 'คู่มือการใช้งาน_Document_Alert_System_V_1'"
                    >
                      คู่มือการใช้งาน Document Alert System V.1 (เก่า)
                    </button>
                    <button 
                      class="btn btn-xs disabled:bg-primary disabled:text-white" 
                      @click="file = 'Requirement_Document_Alert_130624'" 
                      :disabled="file == 'Requirement_Document_Alert_130624'"
                      >
                      Requirement 13/06/2024
                    </button>
                    <button 
                      class="btn btn-xs disabled:bg-primary disabled:text-white" 
                      @click="file = 'Requirement_Document_Alert_030924'" 
                      :disabled="file == 'Requirement_Document_Alert_030924'"
                    >
                      Requirement 03/09/2024
                    </button>
                    |
                    <button 
                      class="btn btn-xs btn-neutral" 
                      @click="exportExcel" 
                    >
                      <Icon icon="file-icons:microsoft-excel" />
                      Data Templete
                    </button>
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
                  <div style="height: 74vh;" v-if="file">
                    <PDFViewer
                      :source="`${serviceUrl}/api/controllers/MYSQL/INTERNAL/Global/doc?file=${file}.pdf&path=DocumentAlert`"
                      :loading-text="'กำลังโหลด'"
                      :rendering-text="'กำลังโหลด'"
                      style="height: 100%; width: 100%"
                      @download="download"
                    />
                  </div>
                </div>
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
import { useContentHeight } from "@/composables/useContentHeightDynamic";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref } from "vue";
import PDFViewer from "pdf-viewer-vue";

import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModulePagesSystemBranchModalBranch from "@/components/App/Module/Pages/System/Branch/Modal/Branch";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";

export default {
  name: "Doc",
  components: {
    AppLayout,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModulePagesSystemBranchModalBranch,
    AppModuleGlobalRemove,
    PDFViewer,
  },
  setup() {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);
    const serviceUrl = computed(() => store.getters.serviceUrl);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone, 0);

    const file = ref('')

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
    });

    const download = (source, filename) => {
      const link = document.createElement('a');
      link.href = `${serviceUrl.value}/upload/_Doc/DocumentAlert/${file.value}.pdf`;
      link.target = '_blank';
      link.download = `${file.value}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const exportExcel = () => {
      return window.open(
        `${serviceUrl.value}upload/_Doc/DocumentAlert/ฟอร์มเก็บสัญญา_Rev5.xlsx`
      );
    };

    return {
      base,
      titleZone,
      contentHeight,
      AppLayoutComponent,
      user,
      serviceUrl,
      PDFViewer,
      download,
      exportExcel,
      file,
    };
  },
};
</script>

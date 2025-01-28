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
                      @click="file = 'คู่มือการใช้งาน_Warehouse_Retain_Sample_V2'"
                      :disabled="file == 'คู่มือการใช้งาน_Warehouse_Retain_Sample_V2'"
                    >
											คู่มือการใช้งาน Warehouse Retain Sample V.2 (ปัจจุบัน)
                    </button>
										<button
                      class="btn btn-xs disabled:bg-primary disabled:text-white"
                      @click="file = 'คู่มือการใช้งาน_Warehouse_Retain_Sample'"
                      :disabled="file == 'คู่มือการใช้งาน_Warehouse_Retain_Sample'"
                    >
											คู่มือการใช้งาน Warehouse Retain Sample (เก่า)
                    </button>
										<button
                      class="btn btn-xs disabled:bg-primary disabled:text-white"
                      @click="file = 'Drawing_Micro_Rack_Ubis_Rev02_17092024'"
                      :disabled="file == 'Drawing_Micro_Rack_Ubis_Rev02_17092024'"
                    >
                      Drawing Rack Design
                    </button>
                    |
                    <button
                      class="btn btn-xs bg-orange-200 border-orange-200 disabled:bg-orange-600 disabled:border-orange-600 disabled:text-white"
                      @click="file = 'Retain_flow_V2'"
                      :disabled="file == 'Retain_flow_V2'"
                    >
                      <Icon icon="icon-park-twotone:tree-diagram" />
                      Diagram Work Flow
                    </button>
                    |
                    <button
                      class="btn btn-xs btn-neutral"
                      @click="exportExcel()"
                    >
                      <Icon icon="file-icons:microsoft-excel" />
                      Requirement
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
                  <div style="height: 74vh" v-if="file">
										<iframe v-if="file == 'Retain_flow_V2'" frameborder="0" style="width:100%;height:100%;" src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Retain_flow_V2.drawio#R%3Cmxfile%3E%3Cdiagram%20name%3D%22%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2-1%22%20id%3D%22FWk4HcREGPmMxPCVf2fB%22%3E7V1Zd6u2Fv41Xuv2IVmImUc7cYfVnGGdtPfe0zcSyzYttlyMM%2FTXV9hIQgODHQzCyUsCsgAh7W9rz4ysm9XLT0m4WX5CMxiPTGP2MrJuR6YJbMvG%2F7KW10OL5xuHhkUSzfJOrOE%2B%2BgfmjaTbLprBLdcxRShOow3f%2BIjWa%2FiYcm1hkqBnvtscxfxTN%2BECSg33j2Est%2F4vmqXLQ6tlGQb74WcYLZb5o23Xzy9ZhaR33nW7DGfoudBkTUfWTYJQejhavdzAOJs9MjGH634s%2BZWOLIHrtMkFX8DVH1dTa%2F45sn7%2F5iR%2FzH8NPl%2F5h7s8hfEuf%2BN8sOkrmQI4wzOSn6IkXaIFWofxlLVOErRbz2D2GAOfsT53CG1wI8CNf8I0fc2XN9ylCDct01Wc%2Fyq%2FSv52W7RLHmHF%2BPPhZmMsXJhPwE8QrWCavOIOCYzDNHriVzXMiWNB%2B9FLv6IID8U0ckI23XwRczK2yKKSW6RhsoBpfhVbBHxQGAZr2i%2FNEctkyss0NUaTYIThlB34o7GTH0w80nKbH2QUaXwLH%2F8amW6M53cyi57w4SI7zLsE5KKJQ27sk59oSyDd2GNPyC83SR9LHGAwJX1s8RFjcrlvKh6RDxrPW3HcIpXyNPi8jFJ4vwn3tPOMWVNDenuCSQpfKimJUITBUwQ9f2ZsAhAqWRY4hGuUEx9HNhU0Ev48v1t%2F%2B4K50O339a%2BOO39y0ysg08igoJzvFAckVfQDftuYbzrtVcM%2BGZo5OggSJ74CHaYxns3w3yq0msYdfMp23wNctptwzS2%2B%2B%2Fcu22kmD5gRLPbLfPWIYpSMrHH2iusojcJ4v4CkJ8OaG64yBK0ftpvz8gyG9cP4NQU7Zf9dgF1Jda4C7Ie5m6P9xiUvfPbD1XaP22zFgbt5KVvu%2FY0eSMOPMRZbcuJrl6E%2FiM%2FEbYfxlyw8Xq%2BUX90wjhZrfPyIVxdiYp5kqxphAW6c%2F7CKZrM9a1ORCU9ILVAKEAQFW0EoQEEo1rkIBTgD3xZA032hdVHwbfMu7wv3%2BBXSCl4GeuFlft9yizV0AvWbEqilF4UqdD9OeMecnfL6MS%2BeFPvQq%2BiBw19eFIVueZmhcFVgV6gnjvQwssOMqeBEWzx%2B8%2BGlkGbaBNbVN9khpocwjmGMFkm4wh03MInw7GcbDf%2FbV%2FZDHYbn0Qsklo4zYdpWbTudyifm4A0LVlNUe1qh2lSwUxHDVOkguGCivFuwGZShsVTbL97IqucTNRrABePTcXvHpyeRyXQ90044cbuUTtQTFSgYWUeaFuCBQjcyfGCLCpZS08o7WwzvvCHwIlUw16xXwfwuVTBLYb0d1F5IZqZ2L7SAVnshGbd2Opjv96eDqWfK7YMi8QQmr%2F%2FPrr92yOn3%2FHb7k9sX7uy1jknUUzLxIdZSst02Je8vHSdJ%2BFrosMkcRtvCnQW%2Fk%2B8JhkdD8PEJ%2Fd3q%2FvjgMIJWnVOW90E8fEe9FH3L%2F1gfvqOjBbgD%2BzhwAxoV0Sm6FX5F0arTwMFVKp%2Be1fncTIIuFwe6cS%2BJ4kCnvmS1U1Ph1RyWyNrUfGNrJrLK5ptPX%2F47VRhj%2FsObUwoQUVhkqenHZqpgTv526eUUhZOCxcY07pcwno%2BYMzqQ0CthjHq36YioDSrzB4q3ZFZiqsL6%2FNNwi%2FuDppEhIpotq3c0G9KkXKYA0NRVaAV6gV7mtre%2F3H%2F9cl%2BFe4WpVfaS7Acm9pcQT7fS0%2FgEdcFQp0xgS0iWeBILdOHMU3tWoCu0RdOSBtAeunufyOL1G7WpF2bliZ%2Fe%2FvJbKWCPNOce7TbRGzgAONoh571YLYKmAHPbBthJWrEriE9OUK0Vi1q00P9MSrHCKyQCVxU7Ue5TpbK2Je68NJ5B4a5tV2FuLlSoX6PA44oxIFl2xmoF96tOJ2VSOl%2FsHrdsBkvY2iU6i10xmMNTsEq3U1Y59GAOu6llsH0e%2BLaJL7G9Hc9mDl5fybPMwzQPIK8MM2%2BFzdTbLHjjAfGTJyLytWWk1W%2BoOf%2B8RK7q2%2FVcldpdu%2BGqwfsQQIniNhQBVHKzaCmBklk9LXpXGRo75Y04k4DxolMSBxn7CcTHB5J2y9gt5aATfohHKdDF7UMyXLHpoCq1YAArvkVh07hIxgiA2UDeVAVMnY0zOoNPZXQbsjxiFdFF3lSklYmY%2BQge7lpyEQwirtO36YwMQLPgYXGiPBUj63aiFJv0oBiZ09SN7uiVlO2UZ0HU6nWFwBYqRDB1TMpbYsEmN7wM0jQUu4G6%2FVYPm6BVFl9etoJ37htwBPm5%2F%2FAXZ%2BjhL07TnERXLwHEkb1q3%2BFWOfd34QOMRycmIiRwG%2F0TPuzvly1OrhPimzuTkXOrnPtqShHJnZYkyp8yKhb9UcHgyrgGFgn%2FObVcDemC5vMtPEslGkdVeeAyoWHqBQ05Y%2Bsz0hkZhFDaQIY5BGSU5FMfXaTJ4Pd4frcW9niWGS2kP6uSrn3FZr9Eq4fdtqONvqyKVmGjVxka%2FHPt857TB%2B9iJljOAMvssa2bYMm81%2FO81pOZTzPB2qK1vguTqiurtS0pBKpAWkGyZ4GtBYcR4Qh9S%2BiWdiGtXr8Ja6Az5JoDQ64nFkDqBLklzpA%2BkXsXvqJdVappR9j1xNplvWPXVVX86bh4WcuWnTeYaC45FV%2FaOFS5%2BEGXufju0C07btN4aUevJFRXtuzokYsvmR97T8b3ZE1%2FYDTqNaRRTzMaVUz8cRp8mdfzWEfmtM4j0EKF1QtykUoYtnsvsOQpRNJBgdhr6vrzWi%2BV8baJ%2FyiANgCAOv3vsrIkqEMQgzRTXu%2FeUH%2FoLh%2BvqcvH0ysv2JM9CprIzGLIa%2B9o9vXIg%2B0%2BupqQbC1tkyXShbZLM%2BhEI0ux5LyUn06%2BttOnhU0EA%2BgfDUOvqU1msJ6q9SrfQsbdogZ5s9umeHTJhQqGIng02EqGbiIkmKgHj6kXeN5aaUwGz%2F0SZeKScYNm8J0AyOofQENPFya4qAeQXrXfybhbBNAdyuDzGV2%2FE%2FTYvaMnUIgQw0JPU%2Bu%2Fr5e27ZdY%2F4dd06NWe6pKAVc4MugwAT86fOCyOclbypPUaaUx9gY02vGmbkpOfKehsyqrgQnV7pRVWX1wpu7DJ%2F2mNpagdYH6pCAsU0zp9UB1Brt0AeAvOE%2FUll9qAvrw1OgjEfX%2FCZZAlQ5%2B5nixb%2FDvHdymlx2dFdjutenw8q9isQ3v2pGX%2B2whWoEepvzTtwuyC9RvF3p5zsm4FQJw%2BUf2qsNgBRmPlfug7FzKX2Fhk2XFaAtptL78aYPOvw3c5wc11es49PixoGkd50Cvcm2BbPjSOkWPEkoryavAtngZ8nCmb8IeMBQM7zKBAgy9%2FGTAkD2Ueid6M2JpBSxYw9IdHoHCDyaYn%2BTKXqx6mGQfmtjyXt1h9qlpCjouPe8r%2BxQQGrj0GJWgaTksYnbQhU0FpfWwTgzopibSgHXOXuZPzD4kWhiY5cAUk33M3jPNAoWF6dyWg%2FFmk6AneNGWA8w6dbQcAGPokapUTmsg0ellPKAjfzuvxKMjGBo4RxRNA%2F3HZmBIDh4izZWe1r%2Fz%2BMa5L5Woqad0YktmsGPRo5s9rP%2BQCmCo5IBhEX3TtF9g6FWJkY78csIqjgyZoKUGJsLoiuUIVJ8LINVfLtHNKHGJ%2FhPCAOiFKXQfzkBZxOD0cTry8yrkpcXuy3bpYoClxTOcYq22Md9HWX3ffCd47z%2BsgBK3Zhmgkh3lnFOFTxOU2TWY5Ri%2F0%2FITmmU29%2Bm%2F%3C%2Fdiagram%3E%3C%2Fmxfile%3E"></iframe>
                    <PDFViewer
                      v-else
                      :source="`${serviceUrl}/api/controllers/MYSQL/INTERNAL/Global/doc?file=${file}.pdf&path=WHRetain`"
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

    const { contentHeight } = useContentHeight(
      AppLayoutComponent,
      titleZone,
      0
    );

    const file = ref("");

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
      const link = document.createElement("a");
      link.href = `${serviceUrl.value}/upload/_Doc/WHRetain/${file.value}.pdf`;
      link.target = "_blank";
      link.download = `${file.value}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const exportExcel = (file) => {
      return window.open(
        `${serviceUrl.value}upload/_Doc/WHRetain/WH-Retain_Recap-Requirement_09-10-24.xlsx`
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

<template>
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
            <div class="join w-full justify-end p-3">
              <button
                class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                disabled
              >
                จำนวน
              </button>
              <select
                class="join-item  select select-sm select-bordered w-auto max-w-xs border-base-content"
                v-model="base.pagination.row"
                @change="fnBase.setup()"
              >
                <option selected value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
            <div class="text-2xl text-primary font-bold text-center">TOP {{ base.pagination.row }} ON HAND</div>
            <div class="grid grid-cols-2 lg:grid-cols-2 px-3">
              <div class="col-span-2 grid xl:flex xl:flex-row gap-4 mt-2">
                <div class="card-body overflow-auto pt-0 px-0 max-h-[60vh] shadow-sm shadow-primary border-2 rounded-xl bg-base-200 hover:shadow-md hover:shadow-primary">
                  <div class="card-title p-4 text-sm font-semibold underline underline-offset-2 decoration-double">BY PRODUCT</div>
                  <div class="chart-wrap">
                    <div id="chart" v-if="options[`onhand`].colors">
                      <apexchart
                        v-if="options[`onhand`].colors.length > 0"
                        type="bar"
                        height="200"
                        width="1000"
                        :options="options[`onhand`]"
                        :series="series[`onhand`]"
                      ></apexchart>
                      <div v-else>EMPTY DATA</div>
                    </div>
                  </div>
                </div>
                <!-- <div class="card-body overflow-auto pt-0 px-0 max-h-[60vh] shadow-sm shadow-primary border-2 rounded-xl bg-base-200 hover:shadow-md hover:shadow-primary">
                  <div class="card-title p-4 text-sm font-semibold underline underline-offset-2 decoration-double">FINISHED GOODS</div>
                  <div class="chart-wrap">
                    <div id="chart" v-if="options[`onhandFG`].colors">
                      <apexchart
                        v-if="options[`onhandFG`].colors.length > 0"
                        type="bar"
                        height="200"
                        width="480"
                        :options="options[`onhandFG`]"
                        :series="series[`onhandFG`]"
                      ></apexchart>
                      <div v-else>EMPTY DATA</div>
                    </div>
                  </div>
                </div>
                <div class="card-body overflow-auto pt-0 px-0 max-h-[60vh] shadow-sm shadow-primary border-2 rounded-xl bg-base-200 hover:shadow-md hover:shadow-primary">
                  <div class="card-title p-4 text-sm font-semibold underline underline-offset-2 decoration-double">SEMI</div>
                  <div class="chart-wrap">
                    <div id="chart" v-if="options[`onhandSemi`].colors">
                      <apexchart
                        v-if="options[`onhandSemi`].colors.length > 0"
                        type="bar"
                        height="200"
                        width="480"
                        :options="options[`onhandSemi`]"
                        :series="series[`onhandSemi`]"
                      ></apexchart>
                      <div v-else>EMPTY DATA</div>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
      
            <div class="text-2xl text-secondary font-bold text-center mt-2">TOP {{ base.pagination.row }} TEST & EXTEND SHELF LIFE</div>
            <div class="grid grid-cols-2 lg:grid-cols-2 px-3">
              <div class="col-span-2 grid xl:flex xl:flex-row gap-4 mt-2">
                <div class="card-body overflow-auto pt-0 px-0 max-h-[60vh] shadow-sm shadow-secondary border-2 rounded-xl bg-base-200 hover:shadow-md hover:shadow-secondary">
                  <div class="card-title p-4 text-sm font-semibold underline underline-offset-2 decoration-double">BY PRODUCT</div>
                  <div class="chart-wrap">
                    <div id="chart" v-if="options[`request`].colors">
                      <apexchart
                        v-if="options[`request`].colors.length > 0"
                        type="bar"
                        height="200"
                        width="1000"
                        :options="options[`request`]"
                        :series="series[`request`]"
                      ></apexchart>
                      <div v-else>EMPTY DATA</div>
                    </div>
                  </div>
                </div>
                <!-- <div class="card-body overflow-auto pt-0 px-0 max-h-[60vh] shadow-sm shadow-secondary border-2 rounded-xl bg-base-200 hover:shadow-md hover:shadow-secondary">
                  <div class="card-title p-4 text-sm font-semibold underline underline-offset-2 decoration-double">FINISHED GOODS</div>
                  <div class="chart-wrap">
                    <div id="chart" v-if="options[`requestFG`].colors">
                      <apexchart
                        v-if="options[`requestFG`].colors.length > 0"
                        type="bar"
                        height="200"
                        width="480"
                        :options="options[`requestFG`]"
                        :series="series[`requestFG`]"
                      ></apexchart>
                      <div v-else>EMPTY DATA</div>
                    </div>
                  </div>
                </div>
                <div class="card-body overflow-auto pt-0 px-0 max-h-[60vh] shadow-sm shadow-secondary border-2 rounded-xl bg-base-200 hover:shadow-md hover:shadow-secondary">
                  <div class="card-title p-4 text-sm font-semibold underline underline-offset-2 decoration-double">SEMI</div>
                  <div class="chart-wrap">
                    <div id="chart" v-if="options[`requestSemi`].colors">
                      <apexchart
                        v-if="options[`requestSemi`].colors.length > 0"
                        type="bar"
                        height="200"
                        width="480"
                        :options="options[`requestSemi`]"
                        :series="series[`requestSemi`]"
                      ></apexchart>
                      <div v-else>EMPTY DATA</div>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
      
            <div class="text-2xl text-accent font-bold text-center mt-2">TOP {{ base.pagination.row }} DISPOSE</div>
            <div class="grid grid-cols-2 lg:grid-cols-2 px-3 pb-3">
              <div class="col-span-2 grid xl:flex xl:flex-row gap-4 mt-2">
                <div class="card-body overflow-auto pt-0 px-0 max-h-[60vh] shadow-sm shadow-accent border-2 rounded-xl bg-base-200 hover:shadow-md hover:shadow-accent">
                  <div class="card-title p-4 text-sm font-semibold underline underline-offset-2 decoration-double">BY PRODUCT</div>
                  <div class="chart-wrap">
                    <div id="chart" v-if="options[`dispose`].colors">
                      <apexchart
                        v-if="options[`dispose`].colors.length > 0"
                        type="bar"
                        height="200"
                        width="1000"
                        :options="options[`dispose`]"
                        :series="series[`dispose`]"
                      ></apexchart>
                      <div v-else>EMPTY DATA</div>
                    </div>
                  </div>
                </div>
                <!-- <div class="card-body overflow-auto pt-0 px-0 max-h-[60vh] shadow-sm shadow-accent border-2 rounded-xl bg-base-200 hover:shadow-md hover:shadow-accent">
                  <div class="card-title p-4 text-sm font-semibold underline underline-offset-2 decoration-double">FINISHED GOODS</div>
                  <div class="chart-wrap">
                    <div id="chart" v-if="options[`disposeFG`].colors">
                      <apexchart
                        v-if="options[`disposeFG`].colors.length > 0"
                        type="bar"
                        height="200"
                        width="480"
                        :options="options[`disposeFG`]"
                        :series="series[`disposeFG`]"
                      ></apexchart>
                      <div v-else>EMPTY DATA</div>
                    </div>
                  </div>
                </div>
                <div class="card-body overflow-auto pt-0 px-0 max-h-[60vh] shadow-sm shadow-accent border-2 rounded-xl bg-base-200 hover:shadow-md hover:shadow-accent">
                  <div class="card-title p-4 text-sm font-semibold underline underline-offset-2 decoration-double">SEMI</div>
                  <div class="chart-wrap">
                    <div id="chart" v-if="options[`disposeSemi`].colors">
                      <apexchart
                        v-if="options[`disposeSemi`].colors.length > 0"
                        type="bar"
                        height="200"
                        width="480"
                        :options="options[`disposeSemi`]"
                        :series="series[`disposeSemi`]"
                      ></apexchart>
                      <div v-else>EMPTY DATA</div>
                    </div>
                  </div>
                </div> -->
              </div>
              <div class="col-span-2 mt-4">
                <div class="card-body overflow-auto pt-0 px-0 max-h-[60vh] shadow-sm shadow-accent border-2 rounded-xl bg-base-200 hover:shadow-md hover:shadow-accent">
                  <div class="card-title p-4 text-sm font-semibold underline underline-offset-2 decoration-double">BY MONTH</div>
                  <div class="chart-wrap">
                    <div id="chart">
                      <apexchart
                        type="bar"
                        height="200"
                        width="1000"
                        :options="options[`disposeMonth`]"
                        :series="series[`disposeMonth`]"
                      ></apexchart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useContentHeight } from "@/composables/useContentHeight";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref } from "vue";
import moment from "moment";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";

export default {
  name: "ReportDashboard",
  components: {
    AppModuleGlobalLoadingText
  },
  props: {
    wh: {
      type: String,
      default: "ubp",
    },
  },
  setup(props) {
    const store = useStore();
    configureQuery(store);

    const serviceUrl = computed(() => store.getters.serviceUrl);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone);

    const options = ref({
      onhand: {},
      // onhandFG: {},
      // onhandSemi: {},
      request: {},
      // requestFG: {},
      // requestSemi: {},
      dispose: {},
      // disposeFG: {},
      // disposeSemi: {},
      disposeMouth: {},
    });

    const series = ref({
      onhand: {},
      // onhandFG: {},
      // onhandSemi: {},
      request: {},
      // requestFG: {},
      // requestSemi: {},
      dispose: {},
      // disposeFG: {},
      // disposeSemi: {},
      disposeMonth: {},
    });

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
            ref: "",
          },
        },
      },
    });

    const fnBase = {
      setup: async () => {
        await fnBase.search(props.wh);
      },
      search: async () => {
        try {
          base.value.pagination.page = 1;
          await fnBase.get(props.wh);
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async (wh) => {
        if (base.value.pagination.loading) return;
        base.value.pagination.loading = true;
        try {
          const queryParams = {
            page: base.value.pagination.page,
            row: base.value.pagination.row,
            search: base.value.search,
            action: 'dashboard',
            firstchar: 'FG',
            dbwh: wh,
            transref_type_null: true,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/QA/Retain/shelf"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {

            for (const [key, value] of Object.entries(res.data)) {
              let data = [];
              let label = [];
              let colors = [
                "#E74645",
                "#FB7756",
                "#FACD60",
                "#1AC0C6",
                "#454D66",
                "#309975",
                "#58B368",
                "#DAD873",
                "#F9B4AB",
                "#264E70",
                "#679186",
                "#BBD4CE",
                "#52489C",
                "#4062BB",
                "#59C3C3",
                "#EBEBEB",
                "#F45B69",
                "#FDFA66",
                "#EFEEB4",
                "#FDEBD3",
              ];

              if (key == 'disposeMonth') {
                for (let i = 0; i < 12; i++) {
                  label.push(moment().month(i).format('MMMM'));
                  data.push(value.find(x => { return x.disposeMonth == i+1 }) ? parseFloat(value.find(x => { return x.disposeMonth == moment().month(i).format('MM') }).total).toFixed(2) : 0);
                }
              } else {
                value ? value.forEach((v, i) => {
                  label.push(v.item_short_code ? v.item_short_code : "-");
                  data.push(parseFloat(v.total).toFixed(2));
                }) : "";
              }

              function genChart(name) {
                series.value[name] = [{ name: name, data: data }];

                options.value[name] = {
                  chart: {
                    height: 350,
                    type: "bar",
                    events: {
                      click: function (chart, w, e) {
                        // console.log(chart, w, e)
                      },
                    },
                  },
                  colors: colors,
                  plotOptions: {
                    bar: {
                      columnWidth: "45%",
                      distributed: true,
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  legend: {
                    show: false,
                  },
                  xaxis: {
                    categories: label,
                    labels: {
                      style: {
                        colors: colors,
                        fontSize: "12px",
                      },
                    },
                  },
                };
              }

              genChart(key);
            }
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
        fnBase.setup();
      },
    };

    fnBase.setup();

    return {
      base,
      fnBase,
      options,
      series,
      titleZone,
      contentHeight,
      AppLayoutComponent,
      props
    };
  },
};
</script>

<style>
.crop {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 1px;
}
tr,
td {
  white-space: nowrap;
}

#my-chart-id {
  width: 50% !important;
  height: auto !important;
}

.vue-apexcharts {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div class="Timestamp">
    <AppLayout>
      <template #modal> </template>
      <template #view>
        <div class="grid grid-cols-1 gap-6">
          <div class="card shadow-lg bg-base-100">
            <div class="card-body overflow-auto p-2 lg:p-4">
              <!-- <div class="lg:col-span-1 col-span-2"> -->
              <!-- </div> -->
              <div
                class="md:join w-full flex lg:justify-end justify-center md:block flex-col-reverse gap-2 lg:gap-0 text-right"
              >
                <!-- {{ parseInt(ticket.get) > 0 ? false : true }} -->

                <!-- <button
                  v-if="base.total > 0"
                  class="btn btn-outline btn-primary btn-sm join-item border-2"
                  @click="() => detail_save('static')"
                  :disabled="parseInt(ticket.get) > 0 ? false : true"
                >
                  (
                  {{ ticket.hours }}H {{ ticket.minutes }}m ) GET
                  {{ ticket.get }}
                  TICKET
                </button> -->

                <!-- <div class="join join-item lg:mt-5 w-full md:justify-center lg:justify-end lg:contents"> -->
                <div class="sm:join join-item">
                  <AppModuleGlobalSearch
                    :class="`join-item input lg:input-sm input-xs input-bordered border-base-content md:max-w-xs w-full`"
                    @search="
                      (q) => {
                        dashboard.q = q;
                        typeof dashboard.q == 'string' ? dashboard_search() : '';

                        if (this.tab == 'Tickets') {
                          base.q = q;
                          typeof base.q == 'string' ? base_search() : '';
                        } else {
                          detail.q = q;
                          typeof detail.q == 'string' ? detail_search() : '';
                        }
                      }
                      "
                  />
                </div>
                <div class="sm:join join-item">
                  <div class="join sm:join-item">
                    <button
                      class="w-[35%] sm:w-auto join-item btn btn-xs lg:btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      TOP
                    </button>
                    <select
                      class="w-[65%] sm:w-auto join-item select select-xs lg:select-sm select-bordered border-base-content"
                      style="line-height: 1em"
                      v-model="top"
                      @change="change"
                    >
                      <option selected value="10">10</option>
                      <option value="20">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                  <div class="join sm:join-item w-full sm:w-auto my-2 sm:mt-0">
                    <button
                      class="w-[35%] sm:w-auto join-item btn btn-xs lg:btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      วันที่
                    </button>
                    <input
                      type="date"
                      placeholder="title"
                      class="w-[65%] sm:w-auto join-item input input-xs lg:input-sm input-bordered border-base-content"
                      v-model="date.from"
                      @change="change"
                    />
                  </div>
                  <div class="join sm:join-item w-full sm:w-auto">
                    <button
                      class="w-[35%] sm:w-auto join-item btn btn-xs lg:btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      ถึงวันที่
                    </button>
                    <input
                      type="date"
                      placeholder="title"
                      class="w-[65%] sm:w-auto join-item input input-xs lg:input-sm input-bordered border-base-content"
                      v-model="date.to"
                      @change="change"
                    />
                  </div>
                </div>
                <!-- <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white"
                  @click="base_create()"
                  >Create</label
                > -->
              </div>
              <!-- <div role="tablist" class="tabs tabs-lifted">
                <input
                  type="radio"
                  role="tab"
                  class="tab"
                  name="Timestamp"
                  aria-label="Report"
                  @change="tab = 'Report'"
                  :checked="tab == 'Report' ? true : false"
                /> -->

              <div class="bg-base-100 border-base-300">
                <!-- <div class="overflow-x-auto w-full max-h-[60vh]"> -->

                <div
                  class="grid gap-4 md:grid-cols-2 grid-cols-1"
                  v-if="chartOptions.colors && pieOptions.colors"
                >
                  <div id="chart">
                    <apexchart
                      type="pie"
                      height="350"
                      :options="pieOptions"
                      :series="pieSeries"
                    ></apexchart>
                  </div>

                  <div id="chart">
                    <apexchart
                      type="bar"
                      height="350"
                      :options="chartOptions"
                      :series="series"
                    ></apexchart>
                  </div>
                </div>

                <!-- </div> -->
              </div>
              <!-- <input
                  type="radio"
                  role="tab"
                  class="tab"
                  name="Timestamp"
                  aria-label="Timestamp"
                  @change="tab = 'Timestamp'"
                  :checked="tab == 'Timestamp' ? true : false"
                /> -->

              <!-- <input
                  type="radio"
                  role="tab"
                  class="tab"
                  name="Timestamp"
                  aria-label="History"
                  @change="tab = 'History'"
                  :checked="tab == 'History' ? true : false"
                /> -->

              <div class="bg-base-100">
                <div role="tablist" class="tabs tabs-lifted">
                  <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    class="tab"
                    aria-label="Tickets"
                    checked
                    @change="changeTab('Tickets')"
                  />
                  <div
                    role="tabpanel"
                    class="tab-content bg-base-100 border-base-300 rounded-box p-3 relative"
                  >
                    <div class="bg-base-100 border-base-300">
                      <div class="overflow-x-auto w-full max-h-[60vh]">
                        <div
                          v-if="base.loading"
                          class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
                        >
                          <AppModuleGlobalLoadingText
                            :class="`p-4 py-12 text-3xl text-center`"
                          />
                        </div>
                        <div v-if="!base.loading && base.rows.length == 0">
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
                              <th>Visitor</th>
                              <td>Ticket</td>
                              <td>Create At</td>
                            </tr>
                          </thead>

                          <tbody>
                            <tr
                              v-for="(v, i) in base.rows"
                              :key="`${v.code}${i}`"
                            >
                              <th>
                                {{
                                  v.user_fullname ? v.user_fullname : v.user_ref
                                }}
                                <!-- <div class="text-[10px]">
                                  {{ v.code }}
                                </div> -->
                              </th>
                              <td>{{ v.ticket }}</td>
                              <td>
                                <div class="text-xs">
                                  {{ v.created_fullname }}
                                </div>
                                <div class="text-xs">
                                  {{
                                    v.created_at &&
                                    $moment(v.created_at).format("YYYY-MM-DD") >
                                      "2000"
                                      ? v.created_at
                                      : "-"
                                  }}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="justify-end mt-4">
                        <AppModuleGlobalPageination
                          :page="base.page"
                          :total="base.total"
                          :row="base.row"
                          :back="base.back"
                          :next="base.next"
                          :loading="base.loading"
                          @search="
                            (res) => {
                              base.page = res.page;
                              this.base_search();
                            }
                          "
                        />
                      </div>
                    </div>
                  </div>

                  <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    class="tab"
                    aria-label="History"
                    @change="changeTab('History')"
                  />
                  <div
                    role="tabpanel"
                    class="tab-content bg-base-100 border-base-300 rounded-box p-3 relative"
                  >
                    <div class="bg-base-100 border-base-300">
                      <div class="overflow-x-auto w-full max-h-[60vh]">
                        <div
                          v-if="detail.loading"
                          class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
                        >
                          <AppModuleGlobalLoadingText
                            :class="`p-4 py-12 text-3xl text-center`"
                          />
                        </div>
                        <div v-if="!detail.loading && detail.rows.length == 0">
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
                              <th>Visitor</th>
                              <td>Ticket</td>
                              <td>Create At</td>
                            </tr>
                          </thead>

                          <tbody>
                            <tr
                              v-for="(v, i) in detail.rows"
                              :key="`${v.code}${i}`"
                            >
                              <th>
                                {{
                                  v.user_fullname ? v.user_fullname : v.user_ref
                                }}
                                <!-- <div class="text-[10px]">
                                  {{ v.code }}
                                </div> -->
                              </th>
                              <td>{{ v.ticket }}</td>
                              <td>
                                <div class="text-xs">
                                  {{ v.created_fullname }}
                                </div>
                                <div class="text-xs">
                                  {{
                                    v.created_at &&
                                    $moment(v.created_at).format("YYYY-MM-DD") >
                                      "2000"
                                      ? v.created_at
                                      : "-"
                                  }}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="justify-end mt-4">
                        <AppModuleGlobalPageination
                          :page="detail.page"
                          :total="detail.total"
                          :row="detail.row"
                          :back="detail.back"
                          :next="detail.next"
                          :loading="detail.loading"
                          @search="
                            (res) => {
                              detail.page = res.page;
                              this.detail_search();
                            }
                          "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </AppLayout>
  </div>
</template>
<style>
.crop {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 1px;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import VueMultiselect from "vue-multiselect";
import Query from "@/assets/js/fetch.js";

export default {
  name: "Report",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    VueMultiselect,
    AppModuleGlobalEmptyData,
    AppModuleGlobalLoadingText,
  },
  data() {
    return {
      top: 10,
      date: {
        from: this.$moment(this.$moment(new Date()).format("YYYY")).format(
          "YYYY-MM-DD"
        ),
        to: this.$moment(new Date()).format("YYYY-MM-DD"),
      },
      pieSeries: [],
      pieOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        colors: [],
        fill: {
          color: [],
        },
        labels: [""],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },

      series: [
        {
          name: "Ticket",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
            },
          },
        },
        colors: [],
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
          categories: [
            ["Jan."],
            ["Feb."],
            ["Mar."],
            ["Apr."],
            ["May."],
            ["June"],
            ["July"],
            ["Aug."],
            ["Sept."],
            ["Oct."],
            ["Nov."],
            ["Dec."],
          ],
          labels: {
            style: {
              colors: [],
              fontSize: "12px",
            },
          },
        },
      },

      tab: "Tickets",
      value_select: [],
      options_select: [
        // { name: "โต๊ะ", code: "โต๊ะ" },
        // { name: "เก้าอี้", code: "เก้าอี้" },
      ],
      options: {
        penColor: "#c0f",
      },
      base: {
        rows: [],
        total: 0,
        page: 1,
        row: 10,
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
      detail: {
        rows: [],
        total: 0,
        page: 1,
        row: 10,
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
      dashboard: {
        rows: [],
        total: 0,
        page: 1,
        row: 10,
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
        controll: "",
        tb: "",
      },

      ticket: {
        hours: 0,
        minutes: 0,
        get: 0,
      },
    };
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      return this.$store.getters.user_token;
    },
    colors() {
      return this.$store.getters.colors;
    },
  },
  methods: {
    changeTab(t) {
      this.base.page = 1;
      this.detail.page = 1;
      this[`${t == "Tickets" ? "base" : "detail"}_search`]();
      this.tab = t;
    },
    change() {
      // this.base_search();
      this[`${this.tab == "Tickets" ? "base" : "detail"}_search`]();
      this.dashboard_search();
    },
    // base
    base_search() {
      this.base.loading = true;
      this.base_get((res) => {
        this.base.rows = res.rows;
        this.base.total = res.total;
        this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
        this.base.back = this.base.page > 1 ? true : false;
        this.base.loading = false;
      });
    },
    base_get(callback) {
      new Query("base", "get").get(
        this,
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/TRR/ticket?total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }&dash_from=${this.date.from}&dash_to=${this.date.to}`,
        (res) => {
          callback({ ...res });
        }
      );
    },
    // DETAIL
    detail_search() {
      this.detail.loading = true;
      this.detail_get((res) => {
        this.detail.rows = res.rows;
        this.detail.total = res.total;
        this.detail.next =
          this.detail.page * this.detail.row >= this.detail.total
            ? false
            : true;
        this.detail.back = this.detail.page > 1 ? true : false;
        this.detail.loading = false;
      });
    },
    detail_get(callback) {
      new Query("detail", "get").get(
        this,
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/TRR/timestamp?debug=1&total=1&page=${
          this.detail.page
        }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
          this.detail.q ? `&q=${this.detail.q}` : ""
        }&dash_from=${this.date.from}&dash_to=${this.date.to}&order=id`,
        (res) => {
          callback({ ...res });
        }
      );
    },

    // Dashboard
    dashboard_search() {
      this.dashboard.loading = true;
      this.dashboard_get((res) => {
        this.dashboard.rows = res.rows;
        this.dashboard.total = res.total;
        this.dashboard.next =
          this.dashboard.page * this.dashboard.row >= this.dashboard.total
            ? false
            : true;
        this.dashboard.back = this.dashboard.page > 1 ? true : false;
        this.dashboard.loading = false;
      });
    },
    dashboard_get(callback) {
      new Query("dashboard", "get").get(
        this,
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/TRR/ticket?report=1&top=${
          this.top
        }&dash_from=${this.date.from}&dash_to=${this.date.to}&page=${
          this.dashboard.page
        }${this.dashboard.row ? `&rows=${this.dashboard.row}` : ""}${
          this.dashboard.q ? `&q=${this.dashboard.q}` : ""
        }`,
        (res) => {
          // if (res.success) {

          // this.pieOptions.labels = [];

          if (res.user.success) {
            // const user_used = Object.groupBy(res.user.rows, ({ create_fullname }) => create_fullname);
            // user_fullname
            // const groupByCategory = res.user.reduce((group, product) => {
            //   const { create_fullname } = product;
            //   group[create_fullname] = group[create_fullname] ?? [];
            //   group[create_fullname].push(product);
            //   return group;
            // }, {});
            // this.pieOptions.labels = [""];
            // let ind = 0
            // for (const key in user_used) {
            // this.pieOptions.labels = []; 
            this.pieOptions.labels.forEach(x => {
              this.pieOptions.labels.shift();
            })
            this.pieSeries = [0];

            if (res.user.rows.length) {
              res.user.rows.forEach((v, i) => {
                // if(i==0){
                this.pieOptions.labels[i] = `${
                  v.user_fullname ? v.user_fullname + ( v.user_ref == 'current' ? '' : ' ( แอดมินเบิกให้ )') : "-"
                }`;
                // }
                // this.pieOptions.labels[ind] = `${v.create_fullname}`;
                this.pieSeries[i] = parseInt(v.total);
              });
            } else {
              // this.pieOptions.labels = [];
            }
            // ind++;
            // }
            // user_used.forEach((v, i) => {
            // });
          }
          if (res.month.success) {

            this.series[0].data = [0];
            res.month.rows.forEach((v, i) => {
              this.series[0].data[parseInt(v.m) - 1] = parseInt(v.total);
            });
          }

          // res.rows.forEach((v, i) => {
          //   res.rows[i].image = v.image ? JSON.parse(v.image) : [];
          //   res.rows[i].master = 0;
          // });
          // }
          callback({ ...res });
        }
      );
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();
      this.dashboard_search();
      this.pieOptions.colors = this.colors;
      this.chartOptions.colors = this.colors;
    });
  },
  watch: {},
};
</script>

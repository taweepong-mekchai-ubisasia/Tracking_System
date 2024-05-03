<template>
  <div class="Timestamp">
    <AppLayout>
      <template #modal> </template>
      <template #view>
        <div class="grid grid-cols-1 gap-6 lg:px-10 lg:py-2">
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body overflow-auto">
              <div
                class="lg:join lg:mt-5 w-full md:justify-center lg:justify-end flex lg:block flex-col-reverse gap-2 lg:gap-0 text-right"
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

                <div
                  class="join join-item lg:mt-5 w-full md:justify-center lg:justify-end lg:contents"
                >
                  <button
                    class="join-item btn btn-xs lg:btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    TOP
                  </button>
                  <select
                    class="join-item select select-xs lg:select-sm select-bordered border-base-content w-auto max-w-xs"
                    style="line-height: 1em"
                    v-model="top"
                    @change="change"
                  >
                    <option selected value="10">10</option>
                    <option value="20">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <button
                    class="join-item btn btn-xs lg:btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    วันที่
                  </button>
                  <input
                    type="date"
                    placeholder="title"
                    class="join-item input input-xs lg:input-sm input-bordered border-base-content"
                    v-model="date.from"
                    @change="change"
                  />
                  <button
                    class="join-item btn btn-xs lg:btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    -
                  </button>
                  <input
                    type="date"
                    placeholder="title"
                    class="join-item input input-xs lg:input-sm input-bordered border-base-content"
                    v-model="date.to"
                    @change="change"
                  />
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
                        <th>Code</th>
                        <td>Ticket</td>
                        <td>Employee</td>
                        <td>Create At</td>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        v-for="(v, i) in detail.rows"
                        :key="`${v.code}${i}`"
                      >
                        <th>{{ v.code }}</th>
                        <td>{{ v.created_fullname }}</td>
                        <td>{{ v.ticket }}</td>
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
                            </div>
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
                  <!-- </div> -->
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
        from: this.$moment(this.$moment(new Date()).format("YYYY")).format("YYYY-MM-DD"),
        to: this.$moment(new Date()).format("YYYY-MM-DD"),
      },
      pieSeries: [],
      pieOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: [],
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
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
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

      tab: "Report",
      value_select: [],
      options_select: [
        // { name: "โต๊ะ", code: "โต๊ะ" },
        // { name: "เก้าอี้", code: "เก้าอี้" },
      ],
      options: {
        penColor: "#c0f",
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
    change() {
      this.detail_search();
      this.dashboard_search();
    },
    // DETAIL
    detail_search() {
      this.detail.loading = true;
      this.detail_get((res) => {
        // console.log(res)
        this.detail.rows = res.rows;
        this.detail.total = res.total;
        this.detail.next =
          this.detail.page * this.detail.row >= this.detail.total
            ? false
            : true;
        this.detail.back = this.detail.page > 1 ? true : false;
        this.detail.loading = false;

        console.log(this.detail.rows);
      });
    },
    detail_get(callback) {
      // console.log("DASDASDASDAS")
      fetch(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/TRR/ticket?total=1&page=${
          this.detail.page
        }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
          this.detail.q ? `&q=${this.detail.q}` : ""
        }&dash_from=${this.date.from}&dash_to=${this.date.to}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          callback(
            res.success
              ? { rows: res.rows, total: res.total }
              : { rows: [], total: 0 }
          );
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },
    detail_create() {
      this.detail.current = 0;
      this.detail.form = {
        code: "",
      };
      this.detail.controll = "create";
    },
    detail_edit(code) {
      this.detail.current = code;
      let index = this.detail.rows.findIndex(
        (v) => v.code == this.detail.current
      );
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.controll = "edit";
    },
    detail_save(type) {
      this.detail.controll = "create";
      let obj = {
        ticket: this.ticket.get,
      };
      console.log(obj);
      if (this.detail.controll == "edit") {
        obj["code"] = this.detail.form.code;
      }
      fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/TRR/ticket`, {
        method: this.detail.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            this.detail.modal = false;
            if (type == "static") {
              this.detail.page = 1;
              this.detail_search();
            }
          }
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },
    // REMOVE
    remove_item(code, controll, tb) {
      console.log(code);
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    confirm_remove() {
      fetch(`${this.serviceUrl}api/${this.remove.tb}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({
          code: this.remove.code,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            // console.log(res);
            this.remove.modal = false;
            this[`${this.remove.controll}_search`]();
          }
          // callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          // callback([]);
          console.error("Error:", error);
        });
    },
    // Dashboard
    dashboard_search() {
      this.dashboard.loading = true;
      this.dashboard_get((res) => {
        // console.log(res)
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
      fetch(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/TRR/ticket?report=1&top=${
          this.top
        }&dash_from=${this.date.from}&dash_to=${this.date.to}&page=${
          this.dashboard.page
        }${this.dashboard.row ? `&rows=${this.dashboard.row}` : ""}${
          this.dashboard.q ? `&q=${this.dashboard.q}` : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res["user"].success) {
            this.pieSeries = [0];
            this.pieOptions.labels = [''];
            res["user"].rows.forEach((v, i) => {
              this.pieOptions.labels[i] = v.create_fullname;
              this.pieSeries[i] = parseInt(v.total);
            });
          }
          if (res["month"].success) {
            this.series[0].data = [0];
            res["month"].rows.forEach((v) => {
              this.series[0].data[parseInt(v.m) - 1] = parseInt(v.total);
            });
          }

          callback(
            res.success
              ? { rows: res.rows, total: res.total }
              : { rows: [], total: 0 }
          );
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.detail_search();
      console.log("DAS");
      this.dashboard_search();
      this.pieOptions.colors = this.colors;
      this.chartOptions.colors = this.colors;
    });
  },
  watch: {},
};
</script>

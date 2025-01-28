<template>
  <div class="Timestamp">
    <AppLayout>
      <template #modal>
        <!-- modal base -->
        <input
          type="checkbox"
          id="modal-base"
          class="modal-toggle"
          v-model="base.modal"
        />
        <div class="modal" v-if="base.modal">
          <div
            class="modal-box relative w-11/12 md:w-6/12 lg:w-4/12 xl:w-4/12 max-w-5xl p-2 lg:p-4 max-h-screen"
          >
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold text-primary">CREATE TIMESTAMP</h3>
            <div class="divider my-1"></div>

            <div
              class="bg-base-100 border-base-300 rounded-box p-0 lg:p-0 overflow-auto w-full max-h-[60vh]"
            >
              <div
                class="flex flex-col gap-4 w-full border-opacity-50 md:flex-row justify-around items-center content-center"
              >
                <!-- <div
                  class="grid h-40 card rounded-box place-items-center"
                  :class="`${backward ? 'hidden' : ''}`"
                >
                  <button
                    class="btn join-item btn-primary w-36 h-36"
                    @click="base_save()"
                  >
                    <Icon
                      icon="mdi:clipboard-text-time-outline"
                      class="w-36 h-36 text-white"
                    />
                  </button>
                </div>
                <div
                  class="grid h-40 card rounded-box place-items-center"
                  :class="`${backward ? 'hidden' : ''}`"
                >
                  <button
                    class="btn join-item btn-warning w-36 h-36"
                    @click="backward = true"
                  >
                    <Icon
                      icon="vaadin:time-backward"
                      class="w-36 h-36 text-white"
                    />
                  </button>
                </div> -->
                <div class="form-control">
                  <!-- <label class="label">
                    <span class="label-text">Timestamp</span>
                  </label>
                  {{ base.form.timestamp }} -->
                  <div class="join">
                    <input
                      type="time"
                      placeholder="Frist Timestamp"
                      class="input input-bordered border-base-content join-item"
                      v-model="base.form.timestamp"
                      step="2"
                    />
                    <!-- <div class="grid h-40 card rounded-box place-items-center" :class="`${backward?'hidden':''}`"> -->
                    <!-- <button
                      class="btn join-item btn-primary text-white"
                      @click="base_save()"
                    >
                      Create
                    </button> -->
                    <!-- </div> -->
                  </div>
                  <div
                    class="grid h-36 card rounded-box place-items-center"
                    :class="`${backward ? 'hidden' : ''}`"
                  >
                    <button
                      class="btn join-item btn-primary w-32 h-32"
                      @click="base_save()"
                    >
                      <Icon
                        icon="mdi:clipboard-text-time-outline"
                        class="w-32 h-32 text-white"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div class="divider p-0 m-0"></div>
              <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Frist Timestamp</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Frist Timestamp"
                    class="input input-bordered border-base-content"
                    v-model="base.form.frist_timestamp"
                    disabled
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Last Timestamp</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Timestamp"
                    class="input input-bordered border-base-content"
                    v-model="base.form.last_timestamp"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- modal detail -->
        <input
          type="checkbox"
          id="modal-detail"
          class="modal-toggle"
          v-model="detail.modal"
        />
        <div class="modal" v-if="detail.modal">
          <div
            class="modal-box relative w-11/12 md:w-4/12 max-w-5xl p-2 lg:p-4 max-h-screen"
          >
            <label
              for="modal-detail"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold text-primary">GET TICKET</h3>
            <div class="divider my-1"></div>
            <div class="card-body overflow-auto p-0 lg:p-0 max-h-[60vh]">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Ticket No.</span>
                </label>
                <div
                  class="flex flex-row justify-center items-center justify-items-center flex-nowrap"
                >
                  <input
                    type="number"
                    :placeholder="`${
                      lastticket.data ? `From *( ${lastticket.data} )` : 'From'
                    }`"
                    class="input input-bordered border-base-content w-[45%]"
                    min=1
                    v-model="detail.form.ticket_no_first"
                  /><span class="w-[5%]">-</span
                  ><input
                    type="number"
                    placeholder="To"
                    class="input input-bordered border-base-content w-[45%]"
                    min=1
                    v-model="detail.form.ticket_no_last"
                  />
                </div>
              </div>
            </div>
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <!-- <div class="flex-1 form-control mt-6">
                <label for="modal-detail" class="btn ">Cancel</label>
              </div> -->
              <div class="flex-1 form-control mt-6 mb-4">
                <button
                  class="btn btn-primary text-white"
                  @click="detail_save('static')"
                  :disabled="
                    !detail.form.ticket_no_first || !detail.form.ticket_no_last
                  "
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #view>
        <div class="grid grid-cols-1 gap-6">
          <div class="card shadow-lg bg-base-100">
            <div class="card-body overflow-auto p-2 lg:p-4">
              <div
                class="inline md:inline-flex w-full text-right justify-center lg:justify-end"
              >
                <label
                  v-if="base.total > 0"
                  :for="
                    (monthticket.data?monthticket.data.month_ticket:0) > maxticket ? '' : 'modal-detail'
                  "
                  class="btn btn-outline btn-primary btn-sm md:join-item text-white w-full sm:w-fit"
                  @click="parseInt(activeticket) > 0 ? detail_create() : ''"
                  :class="`${
                    parseInt(activeticket) > 0 ? '  ' : ' btn-disabled '
                  }`"
                >
                  GET
                  {{ activeticket }}
                  ( {{ (monthticket.data?monthticket.data.month_ticket:0) }} of {{ maxticket }} )
                  <!-- {{ ticket.get }} -->
                  <!-- month_ticket:"37"
                  user: "1705458129d9550"
                  user_ref: "current" -->
                  <!-- {{ monthticket.data.month_ticket }} -->
                  TICKETS
                </label>
                <div class="md:join join-item justify-end w-full mt-2 md:mt-0">
                  <div class="sm:join join-item">
                    <div class="join sm:join-item w-full sm:w-auto">
                      <button
                        class="w-[35%] sm:w-auto join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        วันที่
                      </button>
                      <input
                        type="date"
                        placeholder="title"
                        class="w-[65%] sm:w-auto join-item input input-sm input-bordered border-base-content"
                        v-model="date.from"
                        @change="change"
                      />
                    </div>
                    <div class="join sm:join-item w-full sm:w-auto my-2 sm:mt-0">
                      <button
                        class="w-[35%] sm:w-auto join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        ถึงวันที่
                      </button>
                      <input
                        type="date"
                        placeholder="title"
                        class="w-[65%] sm:w-auto join-item input input-sm input-bordered border-base-content"
                        v-model="date.to"
                        @change="change"
                      />
                    </div>
                  </div>
                  <div class="join join-item w-full md:w-fit sm:mt-2 md:mt-0">
                    <label
                      for="modal-base"
                      class="join-item btn-sm btn btn-primary modal-button text-white w-full md:w-fit"
                      @click="base_create()"
                    >
                      <Icon icon="mingcute:plus-fill" />
                      <span>Create</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="bg-base-100 border-base-300">
                <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div id="chart" v-if="pieOptions.colors">
                    <apexchart
                      type="pie"
                      height="350"
                      :options="pieOptions"
                      :series="pieSeries"
                    ></apexchart>
                  </div>

                  <div class="bg-base-100">
                    <div role="tablist" class="tabs tabs-lifted">
                      <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        class="tab"
                        aria-label="Current"
                        checked
                        @change="changeTab('Current')"
                      />
                      <div
                        role="tabpanel"
                        class="tab-content bg-base-100 border-base-300 rounded-box p-3"
                      >
                        <div class="grid gap-2">
                          <div
                            class="overflow-x-auto w-full max-h-[27.5vh] min-h-[27.5vh] relative"
                          >
                            <div
                              v-if="base.loading"
                              class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
                            >
                              <AppModuleGlobalLoadingText
                                :class="`p-4 py-12 text-3xl text-center`"
                              />
                            </div>
                            <div v-else>
                              <div v-if="base.rows.length == 0">
                                <AppModuleGlobalEmptyData
                                  :class="`p-4 py-12 text-3xl text-center`"
                                  :parrentClass="'max-h-[27.5vh] min-h-[25vh]'"
                                />
                              </div>
                              <table
                                v-else
                                class="table table-xs table-pin-rows table-pin-cols table-zebra"
                              >
                                <thead>
                                  <tr>
                                    <th>Visitor</th>
                                    <td>Timestamp</td>
                                    <td>Created</td>
                                    <td>Active</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="(v, i) in base.rows"
                                    :key="v.code"
                                    :style="`${
                                      v.ticket
                                        ? '    text-decoration: line-through rgba(0, 0, 0, 0.45); color:rgba(150, 150, 150, 1)'
                                        : ''
                                    }`"
                                  >
                                    <th>
                                      {{
                                        v.user_fullname
                                          ? v.user_fullname
                                          : v.user_ref
                                      }}
                                      <!-- <div class="text-[10px]">
                                        {{ v.code }}
                                      </div> -->
                                    </th>
                                    <td>
                                      {{
                                        v.timestamp &&
                                        $moment(v.timestamp).format(
                                          "YYYY-MM-DD"
                                        ) > "2000"
                                          ? v.timestamp
                                          : "-"
                                      }}
                                    </td>
                                    <td>
                                      {{
                                        v.created_at &&
                                        $moment(v.created_at).format(
                                          "YYYY-MM-DD"
                                        ) > "2000"
                                          ? v.created_at
                                          : "-"
                                      }}
                                    </td>
                                    <td>
                                      {{ v.ticket ? "Used" : "Active" }}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        class="tab"
                        aria-label="Ticket"
                        @change="changeTab('Ticket')"
                      />
                      <div
                        role="tabpanel"
                        class="tab-content bg-base-100 border-base-300 rounded-box p-3"
                      >
                        <div class="grid gap-2" v-if="detail.rows">
                          <div
                            class="overflow-x-auto w-full max-h-[27.5vh] min-h-[27.5vh] relative"
                            v-if="detail.loading"
                          >
                            <div
                              class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
                            >
                              <AppModuleGlobalLoadingText
                                :class="`p-4 py-12 text-3xl text-center`"
                              />
                            </div>
                          </div>
                          <div
                            class="overflow-x-auto w-full max-h-[27.5vh] min-h-[27.5vh] relative"
                            v-else
                          >
                            <div>
                              <div v-if="detail.rows.length == 0">
                                <AppModuleGlobalEmptyData
                                  :class="`p-4 py-12 text-3xl text-center`"
                                  :parrentClass="'max-h-[27.5vh] min-h-[25vh]'"
                                />
                              </div>
                              <table
                                v-else
                                class="table table-xs table-pin-rows table-pin-cols table-zebra"
                              >
                                <thead>
                                  <tr>
                                    <th>Visitor</th>
                                    <td>Sum Ticket</td>
                                    <td>Ticket No</td>
                                    <td>Creation</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="(v, i) in detail.rows"
                                    :key="v.code"
                                  >
                                    <th>
                                      {{
                                        v.user_fullname
                                          ? v.user_fullname
                                          : v.user_ref
                                      }}
                                      <!-- <div class="text-[10px]">
                                        {{ v.code }}
                                      </div> -->
                                    </th>
                                    <td>{{ v.ticket }}</td>
                                    <td>
                                      {{ v.ticket_no_first }} -
                                      {{ v.ticket_no_last }}
                                    </td>
                                    <td>
                                      <div class="flex items-center space-x-3">
                                        <div>
                                          <div class="text-xs">
                                            {{
                                              v.created_at &&
                                              $moment(v.created_at).format(
                                                "YYYY-MM-DD"
                                              ) > "2000"
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
                          </div>
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
                                detail_search();
                              }
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="chart" v-if="chartOptions.colors">
                  <apexchart
                    type="bar"
                    height="350"
                    :options="chartOptions"
                    :series="series"
                  ></apexchart>
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
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import Query from "@/assets/js/fetch.js";

import VueMultiselect from "vue-multiselect";

export default {
  name: "Timestamp",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    VueMultiselect,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
  },
  data() {
    return {
      activeticket: 0,
      maxticket: 25,
      backward: false,
      date: {
        from: this.$moment(this.$moment(new Date()).format("YYYY")).format(
          "YYYY-MM-DD"
        ),
        to: this.$moment(new Date()).format("YYYY-MM-DD"),
      },
      pieSeries: [0, 0, 0, 0, 0, 0, 0],
      pieOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        colors: [
          "#ff0000",
          "#fff219",
          "#ff6178",
          "#4ba26a",
          "#ffa110",
          "#10a5ff",
          "#a810ff",
        ],
        fill: {
          color: [
            "#ff0000",
            "#fff219",
            "#ff6178",
            "#4ba26a",
            "#ffa110",
            "#10a5ff",
            "#a810ff",
          ],
        },
        labels: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
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
              // colors: [],
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
      loadimage: false,
      options: {
        penColor: "#c0f",
      },
      checkbox: "",
      refresh: false,
      base: {
        rows: [],
        total: 0,
        page: 1,
        row: 1000,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
          code: "",
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
          code: "",
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
          code: "",
        },
      },
      monthticket: {
        data: null,
        next: false,
        back: false,
        loading: false,
        modal: false,
      },
      lastticket: {
        data: null,
        next: false,
        back: false,
        loading: false,
        modal: false,
      },
      remove: {
        current: 0,
        model: false,
        controll: "",
        tb: "",
      },
      imageSrc: null,
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
      this[`${t == "Current" ? "base" : "detail"}_search`]();
    },
    change() {
      this.detail.page = 1;
      this.detail_search();
      this.dashboard.page = 1;
      this.dashboard_search();
    },
    // lastticket
    // lastticket_search() {
    //   this.lastticket.loading = true;
    //   this.lastticket_get((res) => {
    //     this.lastticket.rows = res.rows;
    //     this.lastticket.total = res.total;
    //     this.lastticket.next =
    //       this.lastticket.page * this.lastticket.row >= this.lastticket.total
    //         ? false
    //         : true;
    //     this.lastticket.back = this.lastticket.page > 1 ? true : false;
    //     this.lastticket.loading = false;
    //   });
    // },
    // sum_month_ticket_get(callback) {
    //   new Query("lastticket", "get").get(
    //     this,
    //     `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/TRR/ticket?summonthticket=1`,
    //     (res) => {
    //       return callback({ ...res });
    //     }
    //   );
    // },
    lastticket_get(callback) {
      new Query("lastticket", "get").get(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/TRR/ticket?lastticket=1`,
        (res) => {
          return callback({ ...res });
        }
      );
    },
    monthticket_get(callback) {
      new Query("monthticket", "get").get(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/TRR/ticket?monthticket=1&onlyme=1`,
        (res) => {
          return callback({ ...res });
        }
      );
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
        }api/controllers/MYSQL/INTERNAL/TRR/timestamp?total=1&onlyme=1&today=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`,
        (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            // res.rows.forEach((v, i) => {
            //   res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            //   res.rows[i].master = 0;
            // });

            // let tm = res.rows.filter((v) => !v.ticket);
            // if (tm.length > 0) {
            //   this.ticket.hours = this.$moment
            //     .duration(
            //       this.$moment(tm[tm.length - 1].timestamp).diff(
            //         this.$moment(tm[0].timestamp),
            //         "minutes"
            //       ),
            //       "minutes"
            //     )
            //     .hours();

            //   this.ticket.minutes = this.$moment
            //     .duration(
            //       this.$moment(tm[tm.length - 1].timestamp).diff(
            //         this.$moment(tm[0].timestamp),
            //         "minutes"
            //       ),
            //       "minutes"
            //     )
            //     .minutes();
            // } else {
            //   this.ticket.hours = 0;
            //   this.ticket.minutes = 0;
            // }
            // this.ticket.get =
            //   this.ticket.hours + (this.ticket.minutes > 0 ? 1 : 0);
            // console.error(this.ticket.hours);
            // console.error(this.ticket.minutes);
          }
          callback({ ...res });
        }
      );
    },
    base_create() {
      this.base.current = 0;
      this.base.form = {
        code: "",
        timestamp: this.$moment().format("HH:mm:ss"),
      };

      this.base.controll = "create";

      if (this.base.rows.length > 0) {
        this.base.form.frist_timestamp =
          this.base.rows[this.base.rows.length - 1].created_at;
        this.base.form.last_timestamp = this.base.rows[0].created_at;
      } else {
        this.base.form.frist_timestamp = "-";
        this.base.form.last_timestamp = "-";
      }
      this.backward = false;
    },
    base_save() {
      let obj = {
        code: this.base.current,
        rows: [
          {
            ...Object.assign({ ...this.base.form }),
          },
        ],
      };

      new Query("base", this.base.controll == "create" ? "POST" : "PUT").set(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/TRR/timestamp`,
        obj,
        (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            this.base.modal = false;
            this.base.page = 1;
            this.base_search();
          }
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
        }api/controllers/MYSQL/INTERNAL/TRR/ticket?total=1&onlyme=1&page=${
          this.detail.page
        }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
          this.detail.q ? `&q=${this.detail.q}` : ""
        }${
          this.base.current ? `&current=${this.base.current}` : ``
        }&dash_from=${this.date.from}&dash_to=${this.date.to}`,
        (res) => {
          if (res.success) {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });
          }
          callback({ ...res });
        }
      );
    },
    detail_create() {
      this.detail.current = 0;
      this.detail.form = {
        code: "",
      };
      this.detail.controll = "create";
      this.lastticket_get(
        (res) => {
          (this.lastticket.data = res.rows.length > 0 ? res.rows[0].ticket_no_last : "");
          this.detail.form.ticket_no_first = parseInt(this.lastticket.data) + 1
        }
      );
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
      let obj = {
        code: this.detail.current,
        rows: [
          {
            ...Object.assign({ ...this.detail.form }),
            ticket: this.activeticket,
          },
        ],
      };

      new Query("base", this.detail.controll == "create" ? "POST" : "PUT").set(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/TRR/ticket`,
        obj,
        (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            this.detail.modal = false;
            this.detail.page = 1;
            this.detail_search();

            this.base.modal = false;
            this.base.page = 1;
            this.base_search();

            this.dashboard.page = 1;
            this.dashboard_search();

            this.monthticket_get(
              (res) =>
                (this.monthticket.data = res.rows.length > 0 ? res.rows[0] : "")
            );
          }
        }
      );

      // this.detail.controll = "create";
      // let obj = { ...this.detail.form };
      // obj["ticket"] = this.ticket.get;
      // if (this.detail.controll == "edit") {
      //   obj["code"] = this.detail.form.code;
      // }
      // fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/TRR/ticket`, {
      //   method: this.detail.controll == "create" ? "POST" : "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${this.user_token}`,
      //   },
      //   body: JSON.stringify(obj),
      // })
      //   .then((response) => response.json())
      //   .then((res) => {
      //              if (!res.success) {
      //   localStorage.removeItem("user_token");
      //   this.$router.push({ name: `Login` });
      // } else {
      //       this.detail.modal = false;
      //       if (type == "static") {
      //         this.base_search();
      //         this.detail.page = 1;
      //         this.detail_search();
      //       }
      //     }
      //   })
      //   .catch((error) => {
      //     callback([]);
      //     console.error("Error:", error);
      //   });
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
        }api/controllers/MYSQL/INTERNAL/TRR/ticket?onlyme=1&dashboard=1&dash_from=${
          this.date.from
        }&dash_to=${this.date.to}&page=${this.dashboard.page}${
          this.dashboard.row ? `&rows=${this.dashboard.row}` : ""
        }${this.dashboard.q ? `&q=${this.dashboard.q}` : ""}${
          this.base.current ? `&current=${this.base.current}` : ``
        }`,
        (res) => {
          if (res.week.success) {
            this.pieSeries = [0, 0, 0, 0, 0, 0, 0];

            this.pieOptions.labels = [
              "Sun.",
              "Mon.",
              "Tue.",
              "Wed.",
              "Thu.",
              "Fri.",
              "Sat.",
            ];

            res["week"].rows.forEach((v) => {
              let index = this.pieOptions.labels.findIndex(
                (vv) => vv == v.date_name
              );
              this.pieSeries[index] = parseInt(v.total);
            });
          }
          if (res.month.success) {
            this.series[0].data = [0];
            res.month.rows.forEach((v) => {
              this.series[0].data[parseInt(v.m) - 1] = parseInt(v.total);
            });
          }

          callback({ ...res });
        }
      );
    },
    updateactive (v) {
      let nn = Math.ceil(
        this.base.rows
          ? this.base.rows[0]
            ? this.base.rows[0].sum_min / 60
            : 0
          : 0
      );
      let ss = parseInt(
        this.monthticket.data ? this.monthticket.data.month_ticket : 0
      );
      this.activeticket =
        parseInt(this.base.rows ? nn : 0) -
        (parseInt(this.base.rows ? nn : 0) + ss - this.maxticket > 0
          ? parseInt(this.base.rows ? nn : 0) + ss - this.maxticket
          : 0);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();
      // this.detail_search();
      this.dashboard_search();
      this.monthticket_get(
        (res) =>
          (this.monthticket.data = res.rows.length > 0 ? res.rows[0] : "")
      );
      this.pieOptions.colors = this.colors;
      this.chartOptions.colors = this.colors;
      // this.chartOptions.xaxis.labels.style.colors = this.colors;
    });
  },
  watch: {
    "base.form.desired_date": function (v) {
      if (!this.base.form.early_notification) {
        this.base.form.early_notification = v;
      }
    },
    // visitor_select: function (v) {
    //   if (v) {
    //     this.sum_ticket = Math.ceil(this.visitor_select.sum_min / 60);
    //     let num = parseInt(this.detail.form.ticket_no_first);
    //   if (isNaN(num)) {
    //     this.detail.form.ticket_no_last = "";
    //   } else {
    //     this.detail.form.ticket_no_last = num + this.sum_ticket;
    //   }

    //   } else {
    //     this.sum_ticket = 0;
    //   }
    // },
    "monthticket.data.month_ticket": function (v) { return this.updateactive(v) },
    "base.rows": function (v) { return this.updateactive(v) },
    "detail.form.ticket_no_first": function (v) {
      // console.log(v)
      let num = parseInt(v);
      if (isNaN(num)) {
        this.detail.form.ticket_no_last = "";
      } else {
        this.detail.form.ticket_no_last = num + this.activeticket-1;
      }
    },
  },
};
</script>

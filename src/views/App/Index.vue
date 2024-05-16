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
            class="modal-box relative w-11/12 max-w-5xl p-2 lg:p-4 max-h-screen"
          >
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <!-- <h3 class="text-lg font-bold">Timestamp</h3> -->

            <div
              class="bg-base-100 border-base-300 rounded-box lg:p-6 overflow-auto w-full max-h-[60vh]"
            >
              <div
                class="flex flex-col w-full border-opacity-50 lg:flex-row justify-center items-center content-center"
              >
                <div class="grid h-40 card rounded-box place-items-center">
                  <button
                    class="btn join-item btn-primary w-40 h-40"
                    @click="base_save()"
                  >
                    <Icon
                      icon="mdi:clipboard-text-time-outline"
                      class="w-40 h-40 text-white"
                    />
                  </button>
                </div>
              </div>
              <div class="divider"></div>
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
            <!-- <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-base" class="btn btn-danger">Cancle</label>
              </div>
              <div class="flex-1 form-control mt-6" @click="base_save()">
                <button class="btn btn-primary text-white">Confirm</button>
              </div>
            </div> -->
          </div>
        </div>

        <!-- modal remove -->
        <input
          type="checkbox"
          id="modal-remove"
          class="modal-toggle"
          v-model="remove.modal"
        />
        <div class="modal">
          <div class="modal-box relative">
            <label
              for="modal-remove"
              class="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 class="text-lg font-bold">Remove Item!</h3>
            <div class="card-body overflow-auto max-h-[60vh]">
              Are your sure for remove this item?
            </div>

            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-remove" class="btn btn-danger">Cancle</label>
              </div>
              <div class="flex-1 form-control mt-6">
                <button
                  class="btn btn-error text-white"
                  @click="confirm_remove()"
                >
                  Confirm
                </button>
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
          <div class="modal-box relative">
            <label
              for="modal-detail"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕</label
            >
            <h3 class="text-lg font-bold">Email</h3>
            <div class="card-body overflow-auto max-h-[60vh]">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.email"
                />
              </div>
            </div>
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-detail" class="btn btn-danger">Cancle</label>
              </div>
              <div class="flex-1 form-control mt-6">
                <button
                  class="btn btn-primary text-white"
                  @click="detail_save('static')"
                >
                  Confirm
                </button>
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
          <div class="modal-box relative">
            <label
              for="modal-detail"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕</label
            >
            <h3 class="text-lg font-bold">Ticket No.</h3>
            <div class="card-body overflow-auto max-h-[60vh]">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">No.</span>
                </label>
                <input
                  type="text"
                  placeholder="No."
                  class="input input-bordered border-base-content"
                  v-model="detail.form.ticket_no"
                />
              </div>
            </div>
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-detail" class="btn btn-danger">Cancle</label>
              </div>
              <div class="flex-1 form-control mt-6">
                <button
                  class="btn btn-primary text-white"
                  @click="detail_save('static')"
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
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body overflow-auto p-4">
              <div style="width: 100%; position: relative">
                <div
                  class="bg-primary min-h-[15vh] h-auto text-white rounded-t-xl"
                >
                  <div class="text-4xl lg:text-5xl font-bold pt-4">
                    {{ date2 }}
                  </div>
                  <div class="text-3xl lg:text-4xl font-bold pt-4">
                    {{ time2 }}
                  </div>
                  <div
                    class="text-md opacity-80 py-4 flex flex-row flex-nowrap content-center items-start justify-center"
                  >
                    <Icon
                      icon="lets-icons:clock"
                      class="w-auto h-full p-2 text-white"
                    />08:30 - 17:30
                  </div>
                </div>
                <div class="absolute w-full h-[50px] bg-primary">
                  <div
                    class="relative w-full grid content-center justify-center"
                  ></div>
                </div>
              </div>
              <div
                class="bg-base-100 border-base-300 rounded-box lg:p-6 overflow-auto w-full relative"
                style="box-shadow: inset 0px 10px 10px -10px rgba(0, 0, 0, 0.3)"
              >
                <div class="w-full mt-4 lg:mt-0 rounded-t-xl">
                  <button
                    class="btn btn-accent text-white border-rad rounded-xl"
                    style="
                      box-shadow: inset 0px 10px 10px -10px rgba(0, 0, 0, 0.3);
                    "
                  >
                    <Icon
                      icon="lets-icons:clock"
                      class="w-auto h-full p-2 text-white"
                    />
                    Check In - Out
                  </button>
                </div>
              </div>
              <!-- <div
                class="bg-base-100 border-base-300 rounded-box lg:p-6 overflow-auto w-full relative max-h-[60vh]"
              > -->

              <!-- <div class="divider"></div> -->
              <!-- <div class="grid gap-4 md:grid-cols-2 grid-cols-1"> -->
              <!-- <div>
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
                  </div> -->

              <!-- <div
                    class="flex flex-col w-full border-opacity-50 lg:flex-row justify-center items-center content-center"
                  >
                    <div class="grid h-40 card rounded-box place-items-center">
                      <button
                        class="btn join-item btn-primary w-40 h-40"
                        @click="base_save()"
                      >
                        <Icon
                          icon="lets-icons:clock"
                          class="w-40 h-40 text-white"
                        />
                      </button>
                    </div>
                  </div> -->
              <!-- </div> -->
              <!-- </div> -->

              <!-- <div
                class="lg:join lg:mt-5 w-full md:justify-center lg:justify-end flex lg:block flex-col-reverse gap-2 lg:gap-0 text-right"
              >
                <label
                  v-if="base.total > 0"
                  for="modal-detail"
                  class="btn btn-outline btn-primary btn-sm join-item border-2 text-white"
                  @click="parseInt(ticket.get) > 0 ? detail_create() : ''"
                  :class="`${
                    parseInt(ticket.get) > 0 ? '  ' : ' btn-disabled '
                  }`"
                  >( {{ ticket.hours }}H {{ ticket.minutes }}m ) GET
                  {{ ticket.get }}
                  TICKET
                </label>
                <div
                  class="join join-item lg:mt-5 w-full md:justify-center lg:justify-end lg:contents"
                >
                  <button
                    class="join-item btn btn-xs lg:btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
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
                    class="join-item btn btn-xs lg:btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
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
                <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white"
                  @click="base_create()"
                  >Create</label
                >
              </div> -->
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
                <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div class="bg-base-100 border-base-300">
                    <h3 class="text-xl font-bold text-primary">
                      Current Timestamp
                    </h3>
                    <div class="overflow-x-auto w-full max-h-[25vh]">
                      <table
                        class="table table-xs table-pin-rows table-pin-cols table-zebra"
                      >
                        <thead>
                          <tr>
                            <th>Code</th>
                            <td>Timestamp</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(v, i) in base.rows" :key="v.code">
                            <th>{{ v.code }}</th>
                            <td>
                              <div class="flex items-center space-x-3">
                                <div>
                                  <div class="text-xs">
                                    {{
                                      v.created_at
                                        ? v.created_at &&
                                          $moment(v.created_at).format(
                                            "YYYY-MM-DD"
                                          ) > "2000"
                                          ? v.created_at
                                          : "-"
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
                </div>
              </div>
              <div class="join w-full justify-center lg:justify-end">
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

import VueMultiselect from "vue-multiselect";
let colors = [
  "#E74645",
  "#FB7756",
  "#FACD60",
  "#FDFA66",
  "#1AC0C6",
  "#454D66",
  "#309975",
  "#58B368",
  "#DAD873",
  "#EFEEB4",
  "#F9B4AB",
  "#FDEBD3",
  "#264E70",
  "#679186",
  "#BBD4CE",
  "#52489C",
  "#4062BB",
  "#59C3C3",
  "#EBEBEB",
  "#F45B69",
];

var week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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
  },
  data() {
    return {
      timerID: null,

      time2: "",
      date2: "",
      date: {
        from: this.$moment(new Date()).format("YYYY-MM-DD"),
        to: this.$moment(new Date()).format("YYYY-MM-DD"),
      },
      series2: [44, 55, 13, 43, 22],
      chartOptions2: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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
          data: [21, 22, 10, 28, 16, 21, 13, 30],
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
          categories: [
            ["John", "Doe"],
            ["Joe", "Smith"],
            ["Jake", "Williams"],
            "Amber",
            ["Peter", "Brown"],
            ["Mary", "Evans"],
            ["David", "Wilson"],
            ["Lily", "Roberts"],
          ],
          labels: {
            style: {
              colors: colors,
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

      category: {
        rows: [],
        page: 1,
        row: 9999,
        q: "",
      },
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
      // // console.log("token");
      // //console.log(this.$store.getters.user_token);
      return this.$store.getters.user_token;
    },
  },
  methods: {
    change() {
      this.base_search();
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
      fetch(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/TRR/timestamp?total=1&onlyme=1&today=1&emptyTicket=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
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
          if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            this.ticket.hours = this.$moment
              .duration(
                this.$moment(res.rows[0].created_at).diff(
                  this.$moment(res.rows[res.rows.length - 1].created_at),
                  "minutes"
                ),
                "minutes"
              )
              .hours();

            this.ticket.minutes = this.$moment
              .duration(
                this.$moment(res.rows[0].created_at).diff(
                  this.$moment(res.rows[res.rows.length - 1].created_at),
                  "minutes"
                ),
                "minutes"
              )
              .minutes();

            this.ticket.get =
              this.ticket.hours + (this.ticket.minutes > 0 ? 1 : 0);
            // console.error(this.ticket.hours);
          }
          callback(
            res.success
              ? { rows: res.rows, total: res.total }
              : { rows: [], total: 0 }
          );
        })
        .catch((error) => {
          // callback([]);
          // localStorage.removeItem("user_token");
          // this.$router.push({name:"AppLogin"})
          console.error("Error:", error);
        });
    },
    base_create() {
      this.base.current = 0;
      this.base.form = {
        code: "",
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
    },
    base_save() {
      let vm = this;
      let obj = { ...this.base.form };
      fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/TRR/timestamp`, {
        method: this.base.controll == "create" ? "POST" : "PUT",
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
            this.base.modal = false;
            this.base_search();
            // this.detail_search();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
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

        // console.log(this.detail.rows);
      });
    },
    detail_get(callback) {
      fetch(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/TRR/ticket?total=1&onlyme=1&today=1&page=${
          this.detail.page
        }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
          this.detail.q ? `&q=${this.detail.q}` : ""
        }${this.base.current ? `&current=${this.base.current}` : ``}`,
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
      let obj = { ...this.detail.form };
      obj["ticket"] = this.ticket.get;
      // console.log(obj);
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
              this.base_search();
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
      // console.log(code);
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
    updateTime() {
      let cd = new Date();
      this.time2 =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date2 =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        week[cd.getDay()];
    },
    zeroPadding(num, digit) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
  },
  unmounted() {
    clearInterval(this.timerID);
  },
  mounted() {
    this.$nextTick(() => {
      // this.base_search();
      // this.detail_search();
      this.timerID = setInterval(this.updateTime, 1000);
      this.updateTime();
    });
  },
  watch: {
    "base.form.desired_date": function (v) {
      if (!this.base.form.early_notification) {
        this.base.form.early_notification = v;
      }
    },
  },
};
</script>
<style scrop>
tr,
td {
  white-space: nowrap;
}
/* 
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  } */

#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #000000, #000000);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.container {
  width: "100%";
  padding: 8px 16px;
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}
</style>

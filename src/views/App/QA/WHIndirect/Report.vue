<template>
  <AppLayout>
      <template #modal></template>
      <template #view>
        <div class="gap-3 lg:px-3 lg:py-3">
          <!-- <div class="card shadow-lg bg-base-100">
            <div class="md:card-body h-auto overflow-auto"> -->
              <!-- {{ base.rows }} -->
              <div class="grid gap-3 md:grid-cols-2 grid-cols-1">
                <div class="card shadow-lg bg-base-100 border-2">
                  <div id="chart" class="card-body overflow-auto">
                    <h3 class="font-semibold opacity-70 font-mono">
                      ราคาซื้อเข้า ของ Item Master Top 5 (มาก-น้อย)
                    </h3>
                    <apexchart
                      type="bar"
                      height="300"
                      :options="importOpions"
                      :series="importSeries"
                    ></apexchart>
                  </div>
                </div>
                <div class="card shadow-lg bg-base-100 border-2">
                  <div id="chart" class="card-body overflow-auto">
                    <h3 class="font-semibold opacity-70 font-mono">
                      จำนวนการ Issue ของ Item Master Top 5 (มาก-น้อย)
                    </h3>
                    <apexchart
                      type="bar"
                      height="300"
                      :options="exportOpions"
                      :series="exportSeries"
                    ></apexchart>
                  </div>
                </div>
                <!-- <div id="chart">
                  <apexchart
                    type="line"
                    width="380"
                    :options="chartOptions2"
                    :series="series2"
                  ></apexchart>
                </div> -->
                <!-- <div id="chart">
                  <apexchart
                    type="donut"
                    width="380"
                    :options="chartOptions2"
                    :series="series2"
                  ></apexchart>
                </div> -->
              </div>
              <AppModulePagesQAWHIndirectLogs />
              <!-- <div class="join mt-5 w-full md:justify-center lg:justify-end">
                <AppModuleGlobalSearch
                  :class="'join-item input input-sm input-bordered border-base-content w-full max-w-xs'"
                  @search="
                          (q) => {
                            base.page = 1;
                            base.q = q;
                            typeof base.q == 'string' ? base_search() : '';
                          }
                        "
                />
              </div>
              <div class="overflow-x-auto w-full max-h-[60vh]">
                <table
                  class="table table-xs table-pin-rows table-pin-cols table-zebra"
                >
                  <thead>
                    <tr>
                      <th>ลำดับ</th>
                      <td>EN</td>
                      <td>Packing List</td>
                      <td>Shipping Mark</td>
                      <td>Shipping Date</td>
                      <td>Created At</td>
                      <td>Created By</td>

                      <td>Status</td>
                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in base.rows" :key="v.code">
                      <th>{{ i + 1 }}</th>
                      <td>
                        {{ v.en }}
                      </td>

                      <td>
                        {{ v.packingList }}
                      </td>
                      <td>
                        {{ v.shippingMark }}
                      </td>
                      <td>
                        {{ v.shippingDate }}
                      </td>
                      <td>
                        {{ v.created_at }}
                      </td>
                      <td>
                        {{ v.created_by }}
                      </td>
                      <td>
                        {{ v.status }}
                      </td>

                      <th class="text-right">
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                          >receive
                        </label>
                      </th>
                    </tr>
                  </tbody>
                </table>
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
              </div> -->
            <!-- </div>
          </div> -->
        </div>
      </template>
  </AppLayout>
</template>

<style>
.crop {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 1px;
}
</style>

<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModulePagesQAWHIndirectLogs from "@/components/App/Module/Pages/QA/WHIndirect/Logs.vue";
// import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import Query from "@/assets/js/fetch.js";

let colors = [
  "#E74645",
  "#FB7756",
  "#FACD60",
  // "#FDFA66",
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
export default {
  name: "IndirectReport",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    // AppModuleGlobalShowImage,
    AppModulePagesQAWHIndirectLogs,
  },
  data() {
    return {
      // pieSeries: [44, 55, 13, 43, 22],
      // pieOptions: {
      //   chart: {
      //     width: 380,
      //     type: "donut",
      //   },
      //   labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      //   responsive: [
      //     {
      //       breakpoint: 480,
      //       options: {
      //         chart: {
      //           width: 200,
      //         },
      //         legend: {
      //           position: "bottom",
      //         },
      //       },
      //     },
      //   ],
      // },
      // barSeries: [
      //   {
      //     data: [21, 22, 10, 28, 16, 21, 13, 30],
      //   },
      // ],
      // barOptions: {
      //   chart: {
      //     height: 350,
      //     type: "bar",
      //     events: {
      //       click: function (chart, w, e) {
      //         // console.log(chart, w, e)
      //       },
      //     },
      //   },
      //   colors: colors,
      //   plotOptions: {
      //     bar: {
      //       columnWidth: "45%",
      //       distributed: true,
      //     },
      //   },
      //   dataLabels: {
      //     enabled: false,
      //   },
      //   legend: {
      //     position: "left",
      //     show: true,
      //   },
      //   xaxis: {
      //     categories: [
      //       ["John", "Doe"],
      //       ["Joe", "Smith"],
      //       ["Jake", "Williams"],
      //       "Amber",
      //       ["Peter", "Brown"],
      //       ["Mary", "Evans"],
      //       ["David", "Wilson"],
      //       ["Lily", "Roberts"],
      //     ],
      //     labels: {
      //       style: {
      //         colors: colors,
      //         fontSize: "12px",
      //       },
      //     },
      //   },
      // },

      importSeries: [ { data: [] } ],
      importOpions: [],
      exportSeries: [ { data: [] } ],
      exportOpions: [],

      selectEN: "",
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
        controll: "",
        tb: "",
      },
      // imageSrc: null,
    };
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      return this.$store.getters.user_token;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    changeData() {
      this.base.form = {
        ...this.base.rows.find((v) => v.code == this.selectEN),
      };
    },
    change() {
      this.base_search();
    },
    makeid(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      return result;
    },
    // Base
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
      new Query('base','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction?total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`, (res) => {
        if (res.success) {
          let importCategory = []
          res.rows.filter(x => x.price && x.price > 0).sort((a, b) => b.sum - a.sum).slice(0, 5).forEach(x => {
            this.importSeries[0]['data'].push(x.sum)
            importCategory.push([ x.title, '('+this.$moment(x.created_at).format("DD-MM-YYYY HH:mm:ss")+')' ])
          });

          this.importOpions = {
            chart: {
              height: 300,
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
                columnWidth: "20%",
                distributed: true,
              },
            },
            dataLabels: {
              enabled: true,
            },
            legend: {
              position: "left",
              show: false,
            },
            xaxis: {
              categories: importCategory,
              labels: {
                style: {
                  colors: colors,
                  fontSize: "12px",
                },
              },
            },
          }

          let exportCategory = []
          res.rows.filter(x => x.status == 'export').sort((a, b) => (b.qty) - a.qty).slice(0, 5).forEach(x => {
            this.exportSeries[0]['data'].push(x.qty)
            exportCategory.push([ x.title, '('+this.$moment(x.created_at).format("DD-MM-YYYY HH:mm:ss")+')' ])
          });

          // console.log(this.exportSeries)
          // console.log(exportCategory)
          // return

          this.exportOpions = {
            chart: {
              height: 300,
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
                columnWidth: "20%",
                distributed: true,
              },
            },
            dataLabels: {
              enabled: true,
            },
            legend: {
              position: "left",
              show: false,
            },
            xaxis: {
              categories: exportCategory,
              labels: {
                style: {
                  colors: colors,
                  fontSize: "12px",
                },
              },
            },
          }
        }
        callback({ ...res });
      });
    },
    // base_create() {
    //   this.base.current = 0;
    //   this.base.form = {
    //     code: this.makeid(5),
    //     status: "",
    //   };
    //   this.detail.rows = [];
    //   this.base.controll = "create";
    // },
    // base_edit(code, index) {
    //   this.base.form = { ...this.base.rows[index] };
    //   this.base.current = code;
    //   this.detail.rows = [];
    //   this.base.controll = "edit";
    //   this.detail_search();
    //   this.refresh = true;
    // },
    // base_save() {
    //   this.base.form.created_at = "2020-01-02";
    //   this.base.form.created_by = "tets";
    //   this.base.form.updated_at = "2020-01-02";
    //   this.base.form.updated_by = "tets";
    //   this.base.form.deleted_at = "2020-01-02";
    //   this.base.form.deleted_by = "tets";

    //   let index = this.transpotation.findIndex(
    //     (v) => v.code == this.base.current
    //   );
    //   index >= 0
    //     ? (this.transpotation[index] = { ...this.base.form })
    //     : this.transpotation.push({ ...this.base.form });
    //   this.$store.commit("transpotation", this.transpotation);
    //   this.base.modal = false;
    //   const promise_arr = [];
    //   if (this.base.current == 0) {
    //     let vm = this;
    //     this.base.current = this.base.form.code;
    //     let i = this.detail.rows.length;
    //     this.detail.controll = "create";
    //     for (i; i > 0; i--) {
    //       this.detail.form = {
    //         code: this.detail.rows[i - 1]["code"],
    //         transpotation_code: this.detail.rows[i - 1]["transpotation_code"],
    //         product: this.detail.rows[i - 1]["product"],
    //         lotNumber: this.detail.rows[i - 1]["lotNumber"],
    //         quantity: this.detail.rows[i - 1]["quantity"],
    //         mfg: this.detail.rows[i - 1]["mfg"],
    //         exp: this.detail.rows[i - 1]["exp"],
    //         created_at: "2020-01-02",
    //         created_by: "tets",
    //         updated_at: "2020-01-02",
    //         updated_by: "tets",
    //         deleted_at: "2020-01-02",
    //         deleted_by: "tets",
    //       };
    //       promise_arr.push(
    //         new Promise(async function (resolve, reject) {
    //           let res = await vm.detail_save("dynamic");
    //           await resolve(res);
    //           return;
    //         })
    //       );
    //     }
    //   }

    //   Promise.all(promise_arr).then((res) => {
    //     this.base_search();
    //   });
    //   return;

    //   let vm = this;
    //   fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/employee`, {
    //     method: this.base.controll == "create" ? "POST" : "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${this.user_token}`,
    //     },
    //     body: JSON.stringify({
    //       code: this.base.current,
    //       uid: this.base.form.uid,
    //       firstname: this.base.form.firstname,
    //       lastname: this.base.form.lastname,
    //       current_password: this.base.form.current_password,
    //       password: this.base.form.new_password,
    //       confirm_password: this.base.form.confirm_password,
    //       email: this.base.form.email,
    //       tel: this.base.form.tel,
    //       birthdate: this.base.form.birthdate,
    //       department: this.base.form.department,
    //       branch: this.base.form.branch,
    //       company: this.base.form.company,
    //       position: this.base.form.position,
    //       started_at: this.base.form.started_at,
    //       leaves_at: this.base.form.leaves_at,
    //       access_code: this.base.form.access_code,
    //       // image: image ? [image] : "",
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((res) => {
    //       if (!res.success) {
    //         // localStorage.removeItem("user_token");
    //         // this.$router.push({ name: `Login` });
    //       } else {
    //         this.base.modal = false;
    //         const promise_arr = [];
    //         console.log(this.base.current);
    //         if (this.base.current == 0) {
    //           this.base.current = res.row.code;
    //           let i = this.detail.rows.length;
    //           this.detail.controll = "create";
    //           for (i; i > 0; i--) {
    //             this.detail.form = {
    //               code: this.detail.rows[i - 1]["code"],
    //               title: this.detail.rows[i - 1]["title"],
    //             };
    //             promise_arr.push(
    //               new Promise(async function (resolve, reject) {
    //                 let res = await vm.detail_save("dynamic");
    //                 await resolve(res);
    //                 return;
    //               })
    //             );
    //           }
    //         }

    //         Promise.all(promise_arr)
    //           .then((res) => {
    //             // console.log(res);
    //             vm.base_search();
    //           })
    //           .catch((err) => console.error(err));
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // },
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
      let data = this.transpotationItem.filter(
        (v) => v.transpotation_code == this.base.form.code
      );
      return callback({ rows: data, total: data.length });
      fetch(
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/email?total=1&page=${
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
        code: this.makeid(5),

        product: "",
        lotNumber: "",
        quantity: "",
        mfg: "",
        exp: "",
      };
      this.detail.controll = "create";
    },
    detail_edit(code, index) {
      // console.log("detail_edit");
      // this.clearimage();
      // console.log(id,index);
      // setTimeout(() => {
      this.detail.current = code;
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.form.color = this.detail.form.color == "0" ? false : true;

      // console.log(this.detail.form.image);
      // this.detail.form.image.forEach((v, i) => {
      //   // console.log(v);
      //   this.detail.form.image[i] = Object.assign(
      //     {},
      //     this.detail.form.image[i]
      //   );
      // });

      // console.log(this.detail.form);
      // this.detail.form.image = JSON.parse(this.detail.form.image)

      // }, 5000);

      // this.base.form = this.base.rows[index]
      // this.detail.current = id;
      // this.detail_search();

      this.detail.controll = "edit";
    },
    detail_save(type) {
      if (!this.base.current) {
        if (this.detail.controll == "create") {
          this.detail.form.code = this.detail.rows.length;
          this.detail.rows = [{ ...this.detail.form }].concat(this.detail.rows);
          this.detail.modal = false;
        } else {
          let index = this.detail.rows.findIndex(
            (v) => v.code == this.detail.current
          );
          this.detail.rows[index] = { ...this.detail.form };
          this.detail.modal = false;
        }
      } else {
        let detail = {
          code: this.makeid(5),
          transpotation_code: this.base.current,
          product: this.detail.form.product,
          lotNumber: this.detail.form.lotNumber,
          quantity: this.detail.form.quantity,
          mfg: this.detail.form.mfg,
          exp: this.detail.form.exp,
          created_at: "2020-01-02",
          created_by: "tets",
          updated_at: "2020-01-02",
          updated_by: "tets",
          deleted_at: "2020-01-02",
          deleted_by: "tets",
        };

        let index = this.transpotationItem.findIndex(
          (v) => v.code == detail.code
        );
        index >= 0
          ? (this.transpotationItem[index] = { ...detail })
          : this.transpotationItem.push({ ...detail });
        this.$store.commit("transpotationItem", this.transpotationItem);
        // console.log(index)
        this.detail.modal = false;
        return;

        let obj = {
          emp: this.base.current,
          code: this.detail.form.code,
          email: this.detail.form.email,
        };
        console.log(obj);
        if (this.detail.controll == "edit") {
          obj["code"] = this.detail.form.code;
        }
        fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/email`, {
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
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
              this.detail.modal = false;

              if (type == "static") {
                this.detail_search();
              }

              // this.base_search();
            }
            // callback(res.success ? res.rows : []);
          })
          .catch((error) => {
            callback([]);
            console.error("Error:", error);
          });
      }
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
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
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
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();
    });
  },
};
</script>

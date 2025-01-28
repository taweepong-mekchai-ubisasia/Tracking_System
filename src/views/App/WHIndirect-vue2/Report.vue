<template>
  <AppLayout>
      <template #modal></template>
      <template #view>
        <div class="gap-3 py-3">
          <!-- <div class="grid gap-3 md:grid-cols-2 grid-cols-1">
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
          </div> -->
          <AppModulePagesWHIndirectLogs />
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
import AppModulePagesWHIndirectLogs from "@/components/App/Module/Pages/WHIndirect/Logs.vue";
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
    AppModulePagesWHIndirectLogs,
  },
  data() {
    return {
      dept: '',

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

      if (this.user.depRef == 224) this.dept = 'im'
      else if (this.user.depRef == 221 || this.user.depRef == 228) this.dept = 'pd'
      else if (this.user.depRef > 329 && this.user.depRef < 333) this.dept = 'rd'
      else if (this.user.depRef == 779) this.dept = 'qa'
      else if (this.user.depRef == 222 || this.user.depRef == 229) this.dept = 'qc'
      else this.dept = 'it'

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
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WHI/transaction?total=1${
        this.user.access.WarehouseIndirect.WHIndirectReport != 'superadmin' ? `&dept=${this.user.department}` : ''}&page=${
      this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
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
      this.detail.current = code;
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.form.color = this.detail.form.color == "0" ? false : true;

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
      // this.base_search();
    });
  },
};
</script>

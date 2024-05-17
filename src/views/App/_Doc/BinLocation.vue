<template>
  <div class="Timestamp">
    <AppLayout>
      <template #modal>
       
      </template>
      <template #view>
        <div class="grid grid-cols-1 gap-6 lg:px-10 lg:py-2">
          <div class="card  shadow-lg bg-base-100">
            <div class="card-body overflow-auto p-4">
             DOC BIN LOCATION อยู่ระหว่างการพัฒนา
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
import Query from "@/assets/js/fetch.js";

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
      new Query('base','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/TRR/timestamp?total=1&onlyme=1&today=1&emptyTicket=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
        } else {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
          
          this.ticket.hours = this.$moment
            .duration(
              this.$moment(res.rows[res.rows.length - 1].timestamp).diff(
                this.$moment(res.rows[0].timestamp),
                "minutes"
              ),
              "minutes"
            )
            .hours();

          this.ticket.minutes = this.$moment
            .duration(
              this.$moment(res.rows[res.rows.length - 1].timestamp).diff(
                this.$moment(res.rows[0].timestamp),
                "minutes"
              ),
              "minutes"
            )
            .minutes();

          this.ticket.get =
            this.ticket.hours + (this.ticket.minutes > 0 ? 1 : 0);
          // console.error(this.ticket.hours);
        }
        callback({ ...res });
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
      let obj = { rows: [ {...this.base.form} ] };

      new Query('base', this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/TRR/timestamp`, obj, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
        } else {
          this.base.modal = false;
          this.base_search();
          // this.detail_search();
        }
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
      new Query('detail','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/TRR/timestamp?total=1&onlyme=1&today=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }${this.base.current ? `&current=${this.base.current}` : ``}`, (res) => {
          if (res.success) {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });
          }
          callback({ ...res });
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

      new Query('detail', this.detail.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/TRR/ticket`, obj, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
        } else {
          this.detail.modal = false;
          if (type == "static") {
            this.base_search();
            this.detail.page = 1;
            this.detail_search();
          }
        }
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
      this.base_search();
      this.detail_search();
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

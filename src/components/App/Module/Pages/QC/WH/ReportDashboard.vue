<template>
  <div class="Stock">
    <div
      class="grid grid-cols-1 gap-6 px-4 py-2 lg:px-10 lg:py-5 xl:grid-cols-2"
    >
      <div class="col-span-2">
        <div class="join mt-5 w-full justify-end">
          <button
            class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
            disabled
          >
            จำนวน
          </button>
          <select
            class="join-item select select-sm select-bordered border-base-content w-auto max-w-xs"
            v-model="base.row"
          >
            <option selected value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
      <div class="col-span-2 grid xl:flex xl:flex-row gap-4">
        <p class="card-title text-primary">Finished  Goods</p>
      </div>
      <div class="col-span-2 grid xl:flex xl:flex-row mb-8 gap-4">
        <div class="card-body overflow-auto pt-0 px-0 max-h-[60vh] shadow-md">
          <p class="card-title p-4">TOP ON HAND FACTORY</p>
          <div class="chart-wrap">
            <div id="chart" v-if="options['wh1FG'].colors">
              <apexchart
                v-if="options['wh1FG'].colors.length > 0"
                type="bar"
                width="380"
                :options="options['wh1FG']"
                :series="series['wh1FG']"
              ></apexchart>
              <div v-else>EMPTY DATA</div>
            </div>
          </div>
        </div>
        <div class="card-body overflow-auto pt-0 px-0 max-h-[60vh] shadow-md">
          <p class="card-title p-4">TOP ON HAND EXTERNAL</p>
          <div class="chart-wrap">
            <div id="chart" v-if="options['wh2FG'].colors">
              <apexchart
                v-if="options['wh2FG'].colors.length > 0"
                type="bar"
                width="380"
                :options="options['wh2FG']"
                :series="series['wh2FG']"
              ></apexchart>
              <div v-else>EMPTY DATA</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2 divider"></div>
      <div class="col-span-2 grid xl:flex xl:flex-row gap-4">
        <p class="card-title text-primary">Raw Material</p>
      </div>
      <div class="col-span-2 grid xl:flex xl:flex-row mb-8 gap-4">
        <div class="card-body overflow-auto pt-0 px-0 max-h-[60vh] shadow-md">
          <p class="card-title p-4">TOP ON HAND FACTORY</p>
          <div class="chart-wrap">
            <div id="chart" v-if="options['wh1RP'].colors">
              <apexchart
                v-if="options['wh1RP'].colors.length > 0"
                type="bar"
                width="380"
                :options="options['wh1RP']"
                :series="series['wh1RP']"
              ></apexchart>
              <div v-else>EMPTY DATA</div>
            </div>
          </div>
        </div>
        <div class="card-body overflow-auto pt-0 px-0 max-h-[60vh] shadow-md">
          <p class="card-title p-4">TOP ON HAND EXTERNAL</p>
          <div class="chart-wrap">
            <div id="chart" v-if="options['wh2RP'].colors">
              <apexchart
                v-if="options['wh2RP'].colors.length > 0"
                type="bar"
                width="380"
                :options="options['wh2RP']"
                :series="series['wh2RP']"
              ></apexchart>
              <div v-else>EMPTY DATA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Query from "@/assets/js/fetch.js";

export default {
  name: "BinLocationReport",
  components: {},
  data() {
    return {
      // wh: "wh1",
      options: {
        wh1FG: {},
        wh2FG: {},
        wh1RP: {},
        wh2RP: {},
      },

      series: {
        wh1FG: {},
        wh2FG: {},
        wh1RP: {},
        wh2RP: {},
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
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      return this.$store.getters.user_token;
    },
  },
  methods: {
    // base
    base_search(firstchar, wh) {
      this.base.loading = true;
      this.base_get(firstchar, wh, (res) => {
        this.base.loading = false;
        let data = [];
        let label = [];
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

        res.rows
          ? res.rows.forEach((v, i) => {
              label.push(v.item_short_code ? v.item_short_code : "-");
              data.push(parseFloat(v.total).toFixed(2));
            })
          : "";
        function genChart(vm, name) {
          vm.series[name] = [{ name: name, data: data }];

          vm.options[name] = {
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
        return genChart(this, `${wh}${firstchar}`);
      });
    },
    base_get(firstchar, wh, callback) {
      new Query('base','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WH/shelf?action=dashboard&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }${wh ? `&wh=${wh}` : ""}${
          this.transref ? `&transref=${this.transref}` : ""
        }${firstchar ? `&firstchar=${firstchar}` : ""}
        `, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search("FG", "wh1");
      this.base_search("FG", "wh2");

      this.base_search("RP", "wh1"); // Raw + Packing
      this.base_search("RP", "wh2");
    });
  },
  watch: {
    "base.row": function (v) {
      this.base_search("FG", "wh1");
      this.base_search("FG", "wh2");

      this.base_search("RP", "wh1");
      this.base_search("RP", "wh2");
    },
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

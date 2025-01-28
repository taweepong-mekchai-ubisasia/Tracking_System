<template>
  <AppLayout>
      <template #view>
        <div class="gap-3 py-3">
          <div class="card shadow-lg bg-base-100 border-2" style="height: 40vh">
            <div class="card-body overflow-auto">
              <div
                v-if="base.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :type="'text'"
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div class="border-2 border-dashed rounded-xl p-2">
                <div class="join w-full">
                  <button
                    class="join-item btn btn-sm btn-accent shadow"
                    @click="exportExcel('base')"
                  >
                    <Icon
                      icon="mdi:file-excel-outline"
                      class="h-5 w-5"
                    />
                    Excel
                  </button>
                  <button
                    class="md:block hidden join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    เริ่มจาก:
                  </button>
                  <input 
                    type="date" 
                    class="join-item input input-bordered input-sm w-full border-gray-300 shadow"
                    :class="date.from ? 'bg-yellow-50 text-black' : ''"
                    v-model="date.from"
                    :data-date="
                      $moment(date.from).format(
                        'DD-MM-YYYY'
                      )
                    "
                  />
                  <button
                    class="md:block hidden join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    -
                  </button>
                  <input 
                    type="date" 
                    class="join-item input input-bordered input-sm w-full border-gray-300 shadow"
                    :class="date.to ? 'bg-yellow-50 text-black' : ''"
                    v-model="date.to"
                    :data-date="
                      $moment(date.to).format(
                        'DD-MM-YYYY'
                      )
                    "
                  />
                  <button class="join-item btn btn-sm btn-active text-white shadow border-gray-300" 
                    @click="searching"
                  >
                    <Icon
                      icon="tabler:search"
                      class="text-white"
                      width="18" height="18"
                    />
                      <span class="md:block hidden">ค้นหา</span>
                  </button>
                </div>
              </div>
              <div class="overflow-x-auto w-full max-h-[60vh]">
                <div v-if="!base.loading && base.rows.length == 0">
                  <AppModuleGlobalEmptyData
                    :class="`p-4 py-12 text-3xl text-center`"
                  />
                </div>
                <table class="table table-xs table-pin-rows table-pin-cols" v-else>
                  <thead>
                    <tr class="italic">
                      <td>Product</td>
                      <td>Description</td>
                      <td class="text-right">Total Lot</td>
                      <td class="text-right">Total Quantity</td>
                      <td class="text-right">Pack Size</td>
                      <td class="text-right">Total Summary</td>
                      <td>Unit</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(v, i) in base.rows"
                      :key="v.code"
                      class="hover"
                      :class="base.current == v.product ? 'text-blue-500 bg-blue-100 font-bold' : ''"
                      style="cursor: pointer"
                      @click="detail_search(v.product)"
                    >
                      <td>{{ v.product }}</td>
                      <td>{{ v.descrip }}</td>
                      <td class="text-right">{{ v.count }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("en-US").format(v.sum) }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("en-US").format(v.pack_size) }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("en-US").format(v.sum*v.pack_size) }}</td>
                      <td>{{ v.unit }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="grid gap-3 md:grid-cols-2 grid-cols-1">
                <div class="md:text-left text-center text-sm" v-if="base.total">
                  Show :
                  <select class="select select-bordered select-xs w-fit bg-yellow-50 text-black" 
                    v-model="base.row" 
                    @change="base_search()"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </select>
                  |
                  Showing {{ base.page == Math.ceil(base.total/base.row) ? 1 + (base.row*(base.page - 1)) : 1 + ((base.page - 1)*base.row) }} to {{ base.page == Math.ceil(base.total/base.row) ? base.total : base.row*base.page }} of {{ base.total }} entries
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
          <div class="grid gap-3 md:grid-cols-2 grid-cols-1 mt-3" style="height: 40vh">
            <div class="card shadow-lg bg-base-100 border-2">
              <div id="chart" class="card-body" v-if="detail.total">
                <apexchart type="bar" width="100%" height="100%" :options="chartOptions" :series="chartSeries"></apexchart>
              </div>
            </div>
            <div class="card shadow-lg bg-base-100 border-2">
              <div class="card-body">
                <div v-if="detail.total">
                  <div class="flex justify-start">
                    <button
                      class="btn btn-xs btn-outline btn-accent shadow"
                      @click="exportExcel('detail')"
                    >
                      <Icon
                        icon="mdi:file-excel-outline"
                        class="h-4 w-4"
                      />
                      Excel
                    </button>
                  </div>
                  <div class="overflow-x-auto w-full max-h-[60vh] lg:max-h-[65vh] p-2">
                    <div v-if="!detail.loading && detail.rows.length == 0">
                      <AppModuleGlobalEmptyData
                        :class="`p-4 py-12 text-3xl text-center`"
                      />
                    </div>
                    <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                      <thead>
                        <tr class="italic">
                          <td>Lot</td>
                          <td class="text-center">MFG</td>
                          <td class="text-center">EXP</td>
                          <td class="text-right">Quantity</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(v, i) in detail.rows"
                          :key="v.code"
                          class="hover"
                        >
                          <td class="font-bold">{{ v.lot }}</td>
                          <td class="text-center">{{ v.mfg }}</td>
                          <td class="text-center">{{ v.exp }}</td>
                          <td class="text-right">{{ v.quantity }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="grid gap-3 grid-cols-1 mt-2">
                    <div class="text-center text-xs">
                      Show :
                      <select class="select select-bordered select-xs w-fit bg-yellow-50 text-black" 
                        v-model="detail.row" 
                        @change="detail_search()"
                      >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                      </select>
                      |
                      Showing {{ detail.page == Math.ceil(detail.total/detail.row) ? 1 + (detail.row*(detail.page - 1)) : 1 + ((detail.page - 1)*detail.row) }} to {{ detail.page == Math.ceil(detail.total/detail.row) ? detail.total : detail.row*detail.page }} of {{ detail.total }} entries
                    </div>
                    <div class="join w-full justify-center">
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
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
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
  name: "TransporationReport",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData
    // AppModuleGlobalShowImage,
  },
  data() {
    return {
      chartSeries: [ { data: [] } ],
      chartOptions: [],
      date: {
        from: "",
        to: "",
      },
      loadimage: false,
      checkbox: "",
      refresh: false,
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
      }
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
    exportExcel(controll) {
      if (controll == 'base') {
        return window.open(`${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WMS/exports?for=reportproduct&report=1&groupby=1&total=1&from=${this.date.from}&to=${this.date.to}${
          this.base.q ? `&q=${this.base.q}` : ""}`);
      } else {
        return window.open(`${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WMS/exports?for=reportlot&product=${
          this.base.current}&groupby=1&total=1&from=${this.date.from}&to=${this.date.to}${
        this.detail.q ? `&q=${this.detail.q}` : ""}`);
      }
    },
    dateFrom() {
      let d = new Date();
      return d.getFullYear() + '-' + (d.getMonth() >= 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-01';
    },
    dateNow() {
      let d = new Date();
      return d.getFullYear() + '-' + (d.getMonth() >= 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
    },
    searching() {
      this.base.page = 1;
      this.base_search();
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
      this.base.current = ''
      this.detail.total = 0
      this.base.loading = true;
      this.base_get((res) => {
        setTimeout(() => {
          this.base.rows = res.rows;
          this.base.total = res.total;
          this.base.next =
            this.base.page * this.base.row >= this.base.total ? false : true;
          this.base.back = this.base.page > 1 ? true : false;
          this.base.loading = false;
        }, 200);
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/prod?report=1&groupby=1&total=1&page=${this.base.page}${
        this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}&from=${this.date.from}&to=${this.date.to}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    // DETAIL
    detail_search(pd = null) {
      this.base.current = pd ? pd : this.base.current;
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
      this.chartSeries = [ { data: [] } ]
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/item?product=${this.base.current}&groupby=1&total=1&page=${
          this.detail.page}${this.detail.row ? `&rows=${this.detail.row}` : ""}${this.detail.q ? `&q=${this.detail.q}` : ""}`, (res) => {
        if (res.success) {
          let labels = []
          res.rows.slice(0,20).forEach((x, i) => {
            this.chartSeries[0]['data'].push(x.quantity)
            labels[i] = x.lot
          });

          this.chartOptions = {
            chart: {
              events: {
                click: function (chart, w, e) {
                  // console.log(chart, w, e)
                },
              },
            },
            colors: colors,
            plotOptions: {
              bar: {
                columnWidth: "90%",
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
              categories: labels,
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
  },
  mounted() {
    this.$nextTick(() => {
      // this.date.from = this.dateFrom()
      this.date.to = this.dateNow()
      this.base_search();
    });
  },
};
</script>

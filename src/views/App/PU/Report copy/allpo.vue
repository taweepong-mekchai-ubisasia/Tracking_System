<template>
  <AppLayout>
    <!-- <template #modal></template> -->
    <template #view>
      <div class="gap-3 py-3">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto">
            <div class="text-left">
              <h3 class="text-2xl font-extrabold text-primary">PURCHASE APPROVER</h3> 
              <h3 class="text-sm font-semibold underline underline-offset-2">ข้อมูลการอนุมัติใบสั่งซื้อสินค้า</h3>
            </div>
            <hr class="my-1 border-dashed">
            <div class="join">
              <button
                class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-gray-200 disabled:text-base-content"
                disabled
              >
                Start Date :
              </button>
              <input
                type="date"
                placeholder="first date"
                class="join-item input input-sm input-bordered w-full border-gray-300"
                v-model="search.start"
              />
              <button
                class="md:block hidden join-item btn btn-sm disabled:border-gray-300 disabled:bg-gray-200 disabled:text-base-content"
                disabled
              >
                End Date :
              </button>
              <input
                type="date"
                placeholder="first date"
                class="join-item input input-sm input-bordered w-full border-gray-300"
                v-model="search.end"
              />
              <button
                class="md:block hidden join-item btn btn-sm disabled:border-gray-300 disabled:bg-gray-200 disabled:text-base-content"
                disabled
              >
                Company :
              </button>
              <select
                class="join-item select select-sm select-bordered w-fit border-gray-300"
                v-model="search.comp"
              >
                <option value="UBA" selected>UBA</option>
                <option value="UBP">UBP</option>
              </select>
              <button class="join-item btn btn-sm btn-primary text-white" @click="base_search()">
                <Icon
                  icon="tabler:search"
                  width="16"
                  height="16"
                />
                ค้นหา
              </button>
            </div>
            <div class="border-2 border-dashed rounded-xl p-2">
              <div class="grid grid-cols-2">
                <div class="flex justify-start join">
                  <button
                    class="join-item btn btn-sm"
                    @click="exportExcel('base')"
                  >
                    <Icon
                    icon="mdi:file-excel-outline"
                    width="16" height="16"
                    />
                    Excel
                  </button>
                </div>
                <div class="flex justify-end">
                  <AppModuleGlobalSearch
                    :class="'input input-sm input-bordered border-gray-300 w-full max-w-xs'"
                    @search="
                      (q) => {
                        base.q = q;
                        base.page = 1;
                        base_search();
                      }
                    "
                  />
                </div>
              </div>
              <div
                v-if="base.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :type="'text'"
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div class="overflow-x-auto w-full max-h-[48vh] my-2">
                <div v-if="!base.loading && base.rows.length == 0">
                  <AppModuleGlobalEmptyData
                    :class="`p-4 py-12 text-3xl text-center`"
                  />
                </div>
                <table class="table table-pin-rows table-pin-cols table-zebra" v-else>
                  <thead>
                    <tr class="bg-primary text-white">
                      <th class="bg-primary">PR No.</th>
                      <td>PR Date</td>
                      <td>PR Approve</td>
                      <th class="bg-primary">PO NO.</th>
                      <td>PO Date</td>
                      <td>PO Approve</td>
                      <td>Delivery Date</td>
                      <td>Department</td>
                      <td>Vendor</td>
                      <td>Item Code</td>
                      <td>Description</td>
                      <td class="text-right">Quantity</td>
                      <td class="text-right">Open Quantity</td>
                      <td class="text-right">Price</td>
                      <td>Currency</td>
                      <td class="text-right">Rate</td>
                      <td class="text-right">Total FC</td>
                      <td class="text-right">Total THB</td>
                      <td>GRPO No.</td>
                      <td>Vendor Ref No.</td>
                      <td>GRPO Date</td>
                      <td class="text-right">GRPO Quantity</td>
                      <td class="text-right">GRPO Total</td>
                      <td class="text-right">Price After VAT</td>
                      <td>AP No.</td>
                      <td>AP Date</td>
                      <td class="text-right">AP Quantity</td>
                      <td class="text-right">AP Total</td>
                      <td>Vendor Ref No. AP Invoice</td>
                      <td>Remarks</td>
                    </tr>
                  </thead>
                  <tbody class="text-xs">
                    <tr v-for="(row, i) in base.rows" class="hover">
                      <th class="font-bold">{{ row.PRNum }}</th>
                      <td>{{ $moment(row.PRDate.date).format("DD-MM-YYYY") }}</td>
                      <td class="text-green-600 font-bold">{{ row.U_Autholize }}</td>
                      <th>{{ row.PONum }}</th>
                      <td>{{ $moment(row.PODate.date).format("DD-MM-YYYY") }}</td>
                      <td class="text-blue-500 font-bold">{{ row.UserApproveName }}</td>
                      <td>{{ $moment(row.DeliveryDate.date).format("DD-MM-YYYY") }}</td>
                      <td>{{ row.DeptName }}</td>
                      <td>{{ row.Vendor }}</td>
                      <td>{{ row.POitemcode }}</td>
                      <td>{{ row.Dscription }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.POQty) }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.POOpenQty) }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.UnitPrice) }}</td>
                      <td>{{ row.Currency }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.Rate) }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.POLineTotalFC) }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.POLineTotalTHB) }}</td>
                      <td>{{ row.GRPONo || '-' }}</td>
                      <td>{{ row.VendorRefNo || '-' }}</td>
                      <td>{{ row.GRPODate ? $moment(row.GRPODate.date).format("DD-MM-YYYY") : '-' }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.GRPOQty) }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.GRPOLineTotal) }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.PriceAfterVAT) }}</td>
                      <td>{{ row.APNo || '-' }}</td>
                      <td>{{ row.APDate ? $moment(row.APDate.date).format("DD-MM-YYYY") : '-' }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.APQty) }}</td>
                      <td class="text-right">{{ row.APLineTotal ? new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(row.APLineTotal) : '-' }}</td>
                      <td>{{ row.VendorRefNoAPInvoice || '-' }}</td>
                      <td>{{ row.Remark }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="grid gap-3 lg:grid-cols-2 grid-cols-1">
                <div class="text-left text-sm">
                  Show :
                  <select class="select select-bordered select-xs w-fit bg-yellow-50" 
                    v-model="base.row" 
                    @change="base_search()"
                  >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                  |
                  Showing {{ base.page == Math.ceil(base.total/base.row) ? 1 + (base.row*(base.page - 1)) : 1 + ((base.page - 1)*base.row) }} to {{ base.page == Math.ceil(base.total/base.row) ? base.total : base.row*base.page }} of {{ base.total }} entries
                </div>
                <div class="join w-full lg:justify-end justify-center">
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
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import { useToast } from "vue-toastification";
import Query from "@/assets/js/fetch.js";

export default {
  name: "AllPO",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData
  },
  setup() {
    const toast = useToast();

    return {
      toast
    }
  },
  data() {
    return {
      search: {
        start: '2024-06-01',
        end: '',
        comp: 'UBA'
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
      }
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
    },
  },
  methods: {
    exportExcel(controll) {
      return window.open(`${this.serviceUrl}api/controllers/SAP/Excel/${this.search.comp}/pu?for=allpo&total=1&start=${this.search.start}&end=${this.search.end}`);
    },
    dateNow() {
      let d = new Date();
      return d.getFullYear() + '-' + (d.getMonth() >= 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
              // + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    },
    ymd(start, life) {
      let expire = new Date((new Date(start)).getTime() + life * 86400E3);
      return expire.getFullYear() + '-' + (expire.getMonth() >= 9 ? expire.getMonth() + 1 : '0' + (expire.getMonth() + 1)) + '-' + (expire.getDate() > 9 ? expire.getDate() : '0' + expire.getDate());
    },
    // Base
    base_search() {
      this.base.loading = true;
      this.base_get((res) => {
        setTimeout(() => {
          this.base.rows = res.rows;
          this.base.total = res.total;
          this.base.next =
            this.base.page * this.base.row >= this.base.total ? false : true;
          this.base.back = this.base.page > 1 ? true : false;
          this.base.loading = false;
        }, 250);
      });
    },
    base_get(callback) {
      let start = this.search.start
      let end = this.search.end
      let comp = this.search.comp

      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/SAP/${comp}/Purchase/dept_appr?start=${start}&end=${end}&total=1&page=${this.base.page}
      ${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.search.end = this.dateNow()
      this.base_search();
    });
  },
  watch: {
    base: function (v) {
      // console.log(v);
    },
    detail: function (v) {
      // console.log(v);
    },
  }
};
</script>

<style scrop>
  tr,
  td {
    white-space: nowrap;
  }
</style>

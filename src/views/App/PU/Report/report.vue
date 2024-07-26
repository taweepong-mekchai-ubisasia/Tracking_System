<template>
  <AppLayout>
    <!-- <template #modal></template> -->
    <template #view>
      <div class="gap-3 py-3">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto">
            <div class="text-left">
              <h3 class="text-2xl font-extrabold text-primary">PR to PO ( day count )</h3> 
              <h3 class="text-sm font-semibold underline underline-offset-2">ข้อมูลระยะเวลาการทำรายการ PO (APO5)</h3>
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
              <!-- <button
                class="md:block hidden join-item btn btn-sm disabled:border-gray-300 disabled:bg-gray-200 disabled:text-base-content"
                disabled
              >
                Company :
              </button>
              <select
                class="join-item select select-sm select-bordered w-full border-gray-300"
                v-model="search.comp"
              >
                <option value="UBA" selected>UBA</option>
                <option value="UBP">UBP</option>
              </select> -->
              <button class="join-item btn btn-sm btn-primary text-white" @click="base_search(); avg_get()">
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
              <div class="overflow-x-auto w-full max-h-[42vh] my-2">
                <div v-if="!base.loading && base.rows.length == 0">
                  <AppModuleGlobalEmptyData
                    :class="`p-4 py-12 text-3xl text-center`"
                    />
                </div>
                <table class="table table-pin-rows table-pin-cols table-zebra" v-else>
                  <thead>
                    <tr class="bg-primary text-white">
                      <td>เลขที่ PR</td>
                      <td>วันที่ PR</td>
                      <td>เลขที่ Draft</td>
                      <td>วันที่ Draft</td>
                      <td class="text-right">วันที่ PR ถึง Draft</td>
                      <td>วันที่ Approve</td>
                      <!-- <td class="text-right">วันที่ PR - Approve</td> -->
                      <td class="text-right">วันที่ Draft ถึง Approve</td>
                      <td>เลขที่ PO</td>
                      <td>วันที่ PO</td>
                      <!-- <td class="text-right">วันที่ PR - PO</td>
                      <td class="text-right">วันที่ Draft - PO</td> -->
                      <td class="text-right">วันที่ Approve ถึง PO</td>
                    </tr>
                  </thead>
                  <tbody class="text-xs">
                    <tr v-for="(row, i) in base.rows" class="hover">
                      <td>{{ row.PRNo }}</td>
                      <td>{{ $moment(row.PRDate.date).format("DD-MM-YYYY") }}</td>
                      <td>{{ row.DraftPONo }}</td>
                      <td>{{ $moment(row.DraftDate.date).format("DD-MM-YYYY") }}</td>
                      <td class="text-right text-blue-500 font-bold">{{ row.PRtoDraft }} วัน</td>
                      <td>{{ $moment(row.ApproveDate.date).format("DD-MM-YYYY") }}</td>
                      <!-- <td class="text-right">{{ row.PRtoApprove }} วัน</td> -->
                      <td class="text-right text-yellow-700 font-bold">{{ row.DrafttoApprove }} วัน</td>
                      <td>{{ row.PONo }}</td>
                      <td>{{ $moment(row.PODate.date).format("DD-MM-YYYY") }}</td>
                      <!-- <td class="text-right">{{ row.PRtoPO }} วัน</td>
                      <td class="text-right">{{ row.DrafttoPO }} วัน</td> -->
                      <td class="text-right text-green-600 font-bold">{{ row.ApprovetoPO }} วัน</td>
                      <!-- <td>{{ $moment(row.PRDate.date).format("DD-MM-YYYY") }}</td>
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
                      <td>{{ row.Remark }}</td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="grid gap-3 lg:grid-cols-2 grid-cols-1">
                <div class="text-left text-sm">
                  Show 
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
            <div class="grid lg:grid-cols-4 grid-cols-2 gap-3" v-if="base.total">
              <div class="border-2 border-dashed rounded-xl p-1 flex items-center gap-3">
                <h3 class="font-bold ml-5">Average :</h3>
              </div>
              <div class="border-2 border-dashed rounded-xl p-1 flex items-center gap-3">
                <div class="badge badge-info badge-md ml-5"></div>
                <div class="flex gap-3" v-if="!avg.loading">
                  <h3><span class="font-bold">{{ avg.form.dayPRtoDraft }}</span> <span class="text-sm">วัน</span></h3>
                  <h3><span class="font-bold">{{ avg.form.hourPRtoDraft }}</span> <span class="text-sm">ชั่วโมง</span></h3>
                </div>
                <span class="loading loading-dots loading-xs" v-else></span>
              </div>
              <div class="border-2 border-dashed rounded-xl p-1 flex items-center gap-3">
                <div class="badge badge-warning badge-md ml-5"></div>
                <div class="flex gap-3" v-if="!avg.loading">
                  <h3><span class="font-bold">{{ avg.form.dayDrafttoApprove }}</span> <span class="text-sm">วัน</span></h3>
                  <h3><span class="font-bold">{{ avg.form.hourDrafttoApprove }}</span> <span class="text-sm">ชั่วโมง</span></h3>
                </div>
                <span class="loading loading-dots loading-xs" v-else></span>
              </div>
              <div class="border-2 border-dashed rounded-xl p-1 flex items-center gap-3">
                <div class="badge badge-success badge-md ml-5"></div>
                <div class="flex gap-3" v-if="!avg.loading">
                  <h3><span class="font-bold">{{ avg.form.dayApprovetoPO }}</span> <span class="text-sm">วัน</span></h3>
                  <h3><span class="font-bold">{{ avg.form.hourApprovetoPO }}</span> <span class="text-sm">ชั่วโมง</span></h3>
                </div>
                <span class="loading loading-dots loading-xs" v-else></span>
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
  name: "Report",
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
        start: '2024-01-01',
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
      },
      avg: {
        rows: [],
        total: 0,
        loading: false,
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
      return window.open(`${this.serviceUrl}api/controllers/SAP/Excel/UBA/pu?for=daycount&total=1&start=${this.search.start}&end=${this.search.end}`);
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
      // let comp = this.search.comp

      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/SAP/UBA/Purchase/day_count?start=${start}&end=${end}&total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    avg_get() {
      this.avg.loading = true;
      let start = this.search.start
      let end = this.search.end

      new Query(null,'get').get(this, `${this.serviceUrl}api/controllers/SAP/UBA/Purchase/day_count?start=${start}&end=${end}&total=1${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
        if (res.success) {
          this.avg.rows = res.rows

          let sumPRtoDraft = (this.avg.rows).reduce((acc, curr) => acc + curr.PRtoDraft, 0);
          let sumDrafttoApprove = (this.avg.rows).reduce((acc, curr) => acc + curr.DrafttoApprove, 0);
          let sumApprovetoPO = (this.avg.rows).reduce((acc, curr) => acc + curr.ApprovetoPO, 0);

          let avgPRtoDraft = sumPRtoDraft / res.total
          let avgDrafttoApprove = sumDrafttoApprove / res.total
          let avgApprovetoPO = sumApprovetoPO / res.total

          let dayPRtoDraft = avgPRtoDraft.toString().split('.')[0]
          let dayDrafttoApprove = avgDrafttoApprove.toString().split('.')[0]
          let dayApprovetoPO = avgApprovetoPO.toString().split('.')[0]

          let hourPRtoDraft = ( avgPRtoDraft.toString().split('.')[1].slice(0, 1)*24 ) / 10
          let hourDrafttoApprove = ( avgDrafttoApprove.toString().split('.')[1].slice(0, 1)*24 ) / 10
          let hourApprovetoPO = ( avgApprovetoPO.toString().split('.')[1].slice(0, 1)*24 ) / 10

          this.avg.form = {
            dayPRtoDraft: dayPRtoDraft,
            hourPRtoDraft: hourPRtoDraft ? hourPRtoDraft.toString().split('.')[0] : hourPRtoDraft,
            dayDrafttoApprove: dayDrafttoApprove,
            hourDrafttoApprove: hourDrafttoApprove ? hourDrafttoApprove.toString().split('.')[0] : hourDrafttoApprove,
            dayApprovetoPO: dayApprovetoPO,
            hourApprovetoPO: hourApprovetoPO ? hourApprovetoPO.toString().split('.')[0] : hourApprovetoPO,
          }

          setTimeout(() => {
            this.avg.loading = false
          }, 100);
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.search.end = this.dateNow()
      this.base_search();
      this.avg_get();
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

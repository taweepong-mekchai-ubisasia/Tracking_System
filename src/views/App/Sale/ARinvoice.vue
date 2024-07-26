<template>
  <AppLayout>
    <!-- <template #modal></template> -->
    <template #view>
      <div class="gap-3 py-3">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto">
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
              <!-- {{ base.rows }} -->
              <div class="overflow-x-auto w-full max-h-[58vh] my-2">
                <div v-if="!base.loading && base.rows.length == 0">
                  <AppModuleGlobalEmptyData
                    :class="`p-4 py-12 text-3xl text-center`"
                  />
                </div>
                <table class="table table-pin-rows table-pin-cols" v-else>
                  <thead>
                    <tr class="bg-primary text-white">
                      <th class="bg-primary">Check</th>
                      <td class="border-l-2 border-primary">รหัสพนักงานขาย</td>
                      <td>เลขที่บัญชี</td>
                      <td>เลขที่ถูกต้อง</td>
                      <td class="border-l-2 border-primary">รหัสลูกค้า</td>
                      <td>ชื่อ</td>
                      <td>Serie No.</td>
                      <td>Doc No.</td>
                      <td>วันที่ทำรายการ</td>
                      <td>รหัสสินค้า</td>
                      <td>ชื่อสินค้า</td>
                      <td>รหัสคลัง</td>
                    </tr>
                  </thead>
                  <tbody class="text-xs">
                    <tr v-for="(row, i) in base.rows" class="hover" :class="row.correct ? 'bg-green-100' : 'bg-red-100'">
                      <th class="bg-green-100 flex justify-center" v-if="row.correct">
                        <Icon icon="line-md:confirm-circle" width="18" height="18" />
                      </th>
                      <th class="bg-red-100 flex justify-center" v-else>
                        <Icon icon="line-md:close-circle" width="18" height="18" />
                      </th>
                      <td class="border-l-2 border-primary">{{ row.SlpName }}</td>
                      <td>{{ row.FormatCode }}</td>
                      <td class="text-blue-500">{{ row.correctCode }}</td>
                      <td class="border-l-2 border-primary">{{ row.CardCode }}</td>
                      <td>{{ row.CardName }}</td>
                      <td>{{ row.Series }}</td>
                      <td>{{ row.DocNum }}</td>
                      <td>{{ $moment(row.DocDate.date).format("DD-MM-YYYY") }}</td>
                      <td>{{ row.ItemCode }}</td>
                      <td>{{ row.Dscription }}</td>
                      <td>{{ row.WhsCode }}</td>
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
  name: "ARinvoice",
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
      return window.open(`${this.serviceUrl}api/controllers/SAP/Excel/${this.search.comp}/sale?for=invoicereport&total=1&start=${this.search.start}&end=${this.search.end}`);
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

      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/SAP/${comp}/Sale/invoice?start=${start}&end=${end}&total=1&page=${this.base.page}
      ${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
        if (res.success) {
          // console.log(res)

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

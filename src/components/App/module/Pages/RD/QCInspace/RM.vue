<template>
  <div class="drawer drawer-end absolute z-50">
    <input id="drawer-search" type="checkbox" class="drawer-toggle" />

    <div class="drawer-side">
      <label
        for="drawer-search"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="p-4 w-80 min-h-full bg-base-200 text-base-content">
        <!-- <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content"> -->
        <!-- Sidebar content here -->
        <!-- <li> -->
        <div class="grid gap-2 md:grid-cols-1 grid-cols-1">
          <div class="form-control">
            <button
              class="btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
              disabled
            >
              Receipt <span>No.</span>
            </button>
          </div>
          <div class="grid gap-1">
            <div class="form-control">
              <input
                type="text"
                placeholder="Form No."
                class="input input-sm input-bordered border-base-content"
                v-model="date.from"
                @change="change"
              />
            </div>
            <div class="form-control">
              <input
                type="text"
                placeholder="To No."
                class="input input-sm input-bordered border-base-content"
                v-model="date.to"
                @change="change"
              />
            </div>
          </div>
        </div>

        <div class="grid gap-2 md:grid-cols-1 grid-cols-1">
          <div class="form-control">
            <button
          class="btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
          disabled
        >
          <span>Receipt</span> Date
        </button>
          </div>
          <div class="grid gap-1">
            <div class="form-control">
              <input
          type="date"
          placeholder="title"
          class="input input-sm input-bordered border-base-content"
          v-model="date.from"
          @change="change"
        />
            </div>
            <div class="form-control">
              <input
          type="date"
          placeholder="title"
          class="input input-sm input-bordered border-base-content"
          v-model="date.to"
          @change="change"
        />
            </div>
          </div>
        </div>

      
        <!-- </li>
        <li> -->
       
        <!-- </li>
        <li> -->
        
        <!-- </li> -->

        <!-- <li> -->
        <button class="btn btn-sm btn-primary" @click="exportExcel()">
          <Icon icon="mdi:file-excel-outline" class="h-5 w-5 text-white" />
        </button>
        <!-- </li> -->
        <!-- </ul> -->
      </div>
    </div>
  </div>
  <div class="RM">
    <div class="grid grid-cols-4 gap-6 lg:px-10 lg:py-5 xl:grid-cols-4">
      <div class="card col-span-4 row-span-4 bg-transparent">
        <div class="join mt-5 w-full md:justify-center lg:justify-end">
      
          <button
            class="join-item btn btn-sm btn-primary"
            @click="exportExcel()"
          >
            <Icon icon="mdi:file-excel-outline" class="h-5 w-5 text-white" />
          </button>

          <label for="drawer-search" class="join-item btn btn-sm btn-primary">
            <Icon icon="tabler:search" class="h-5 w-5 text-white"
          /></label>
        </div>
        <div class="join mt-5 w-full md:justify-center lg:justify-end">
          <button
            class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
            disabled
          >
            Item Code
          </button>
          <AppModuleGlobalSelectSearch
            :placeholder="'บริษัท'"
            :label="'title'"
            :code="'code'"
            :minChar="3"
            :delay="0.5"
            :limit="10"
            :customClass="`input input-bordered border-base-content input-sm join-item ${
              checkbox == 'M' ? 'input-disabled' : ''
            }`"
            :disabled="checkbox == 'M' ? true : false"
            :current="base.form.company"
            :refresh="refresh"
            @updateValue="
              (obj) => {
                base.form.company_data = obj;
                base.form.company = obj.code;
              }
            "
            @stopRefresh="
              (obj) => {
                refresh = obj.value;
              }
            "
            :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/company`"
            :param="`&total=1`"
          />

          <AppModuleGlobalSelectSearch
            :placeholder="'บริษัท'"
            :label="'title'"
            :code="'code'"
            :minChar="3"
            :delay="0.5"
            :limit="10"
            :customClass="`input input-bordered border-base-content input-sm join-item ${
              checkbox == 'M' ? 'input-disabled' : ''
            }`"
            :disabled="checkbox == 'M' ? true : false"
            :current="base.form.company"
            :refresh="refresh"
            @updateValue="
              (obj) => {
                base.form.company_data = obj;
                base.form.company = obj.code;
              }
            "
            @stopRefresh="
              (obj) => {
                refresh = obj.value;
              }
            "
            :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/company`"
            :param="`&total=1`"
          />

          <!-- </div> -->
          <!-- <div class="join mt-5 w-full md:justify-center lg:justify-end">
          <button
            class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
            disabled
          >
            สาขา
          </button>
          <select
            class="join-item select select-sm select-bordered border-base-content w-auto max-w-xs"
            v-model="wh"
          >
            <option selected value="">ALL</option>
            <option value="wh1">Factory</option>
            <option value="wh2">External</option>
          </select>
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
        </div> -->
          <!-- <div class="join mt-5 w-full md:justify-center lg:justify-end"> -->
          <button
            class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
            disabled
          >
            สาขา
          </button>
          <select
            class="join-item select select-sm select-bordered border-base-content w-auto max-w-xs"
            v-model="wh"
          >
            <option selected value="">ALL</option>
            <option value="wh1">Factory</option>
            <option value="wh2">External</option>
          </select>
          <!-- <AppModuleGlobalSearch
            :class="'join-item input input-sm input-bordered border-base-content w-full max-w-xs'"
            @search="
                          (q) => {
                            base.page = 1;
                            base.q = q;
                            typeof base.q == 'string' ? base_search() : '';
                          }
                        "
          /> -->
        </div>
      </div>

      <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
        <div class="card-body overflow-auto pt-0 max-h-[60vh]">
          <div v-if="base.loading" class="overflow-x-auto mt-10 text-center">
            <span class="loading loading-spinner loading-lg"></span>
          </div>
          <div class="overflow-x-auto w-full" v-else>
            <table
              class="table table-xs table-pin-rows table-pin-cols table-zebra"
            >
              <thead>
                <tr>
                  <!-- <th rowspan="2">Receipt No.</th>
                  <td rowspan="2">Receipt Date</td>
                  <td rowspan="2">Lot No.</td>
                  <td rowspan="2">RM Code</td>
                  <td rowspan="2">RM Name</td>
                  <td rowspan="2">Expire Date</td> -->
                  <!-- <th>#</th> -->
                  <th>Receipt No.</th>
                  <th>Receipt Date</th>
                  <th>Lot No.</th>
                  <th>RM Code</th>
                  <th>RM Name</th>
                  <th>Expire Date</th>
                  <th>Supplier Name</th>
                  <th>Supplier Lot No.</th>
                  <th class="text-right">Quantity</th>
                  <th>Checker</th>
                  <th>Approver</th>
                  <th>Results</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="hover"
                  v-for="(v, i) in base.rows"
                  :key="v.code"
                >
                  <!-- <th>
                    <div class="flex items-center space-x-3">
                      <div>
                        <div
                          class="overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{ v.rac }}-{{ v.bay }}-{{ v.level }}-{{
                            v.pallet
                          }}
                        </div>
                        <div
                          class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{ v.id }}
                        </div>
                      </div>
                    </div>
                  </th> -->
                  <th>
                    {{ v.U_ReceiptNO ? v.U_ReceiptNO : "-" }}
                  </th>
                  <td>
                    {{
                      v.U_DateRe.date
                        ? $moment(v.U_DateRe.date).format("YYYY-MM-DD")
                        : "-"
                    }}
                  </td>
                  <td>
                    {{ v.U_LotNo }}
                  </td>
                  <td>
                    {{ v.U_ItemNo }}
                  </td>
                  <td>
                    {{ v.ItemName }}
                  </td>
                  <td>
                    {{
                      v.U_ExpireDate.date
                        ? $moment(v.U_ExpireDate.date).format("YYYY-MM-DD")
                        : "-"
                    }}
                  </td>
                  <td>
                    {{ v.U_SupName }}
                  </td>
                  <td>
                    {{ v.U_SupLot }}
                  </td>
                  <td>
                    {{ v.U_ReAmount }}
                  </td>
                  <td>
                    {{ v.U_Inspected }}
                  </td>
                  <td>
                    {{ v.U_Approve ? v.U_Approve : "-" }}
                  </td>
                  <td>
                    {{ v.ItemName }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <div
            class="text-right text-ellipsis whitespace-nowrap font-bold text-primary"
          >
            Total Quantitys
            {{ new Intl.NumberFormat("th-TH").format(base.quantitys_total) }}
          </div> -->
          <AppModuleGlobalPageination
            v-if="!base.loading"
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
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "RM",
  components: {
    AppModuleGlobalPageination,
    AppModuleGlobalSearch,
    AppModuleGlobalSelectSearch,
  },
  data() {
    return {
      date: {
        from: "",
        to: "",
      },
      wh: "",
      load: false,
      
      category: {
        rows: [],
        page: 1,
        row: 9999,
        q: "",
      },
      base: {
        rows: [],
        quantitys_total: 0,
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
    exportExcel() {
      return window.open(`${
        this.serviceUrl
      }api/controllers/MYSQL/INTERNAL/WH/exports?db=shelf&total=1&page=${
        this.base.page
      }${this.base.row ? `&rows=${this.base.row}` : ""}${
        this.base.q ? `&q=${this.base.q}` : ""
      }${this.wh ? `&wh=${this.wh}` : ""}${
        this.date.from ? `&createFrom=${this.date.from}` : ""
      }${
        this.date.to ? `&createTo=${this.date.to}` : ""
      }&transref=I&transref_type_null=1

        `);
    },
    change() {
      this.base_search();
    },
    // base
    base_search() {
      this.base.loading = true;
      this.base_get((res) => {
        this.base.rows = res.rows;
        this.base.total = res.total;
        this.base.quantitys_total = res.quantitys_total;
        this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
        this.base.back = this.base.page > 1 ? true : false;
        this.base.loading = false;
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${
          this.serviceUrl
        }api/controllers/SAP/UBP/QC/rm_inspec?total=1&page=${this.base.page}${
          this.base.row ? `&rows=${this.base.row}` : ""
        }${this.base.q ? `&q=${this.base.q}` : ""}${
          this.wh ? `&wh=${this.wh}` : ""
        }${this.date.from ? `&createFrom=${this.date.from}` : ""}${
          this.date.to ? `&createTo=${this.date.to}` : ""
        }&transref=I&sumQuantitys=1
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
    base_create() {
      this.base.current = 0;
      this.base.form = {
        title: "",
        ref: "",
      };
      this.base.controll = "create";
    },
  },
  mounted() {
    this.$nextTick(() => this.base_search());
  },
  watch: {
    wh: function (v) {
      this.base_search();
    },
  },
};
</script>
<style>
tr,
td {
  white-space: nowrap;
}
</style>

<template>
  <div class="grid grid-cols-1 gap-6 p-2 lg:p-4">
    <div class="card bg-transparent">
      <div class="join w-full md:justify-center lg:justify-end">
        <button
          class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
          disabled
        >
          วันที่
        </button>
        <input
          type="date"
          placeholder="title"
          class="join-item input input-sm input-bordered border-base-content"
          v-model="date.from"
          @change="change"
        />
        <button
          class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
          disabled
        >
          -
        </button>
        <input
          type="date"
          placeholder="title"
          class="join-item input input-sm input-bordered border-base-content"
          v-model="date.to"
          @change="change"
        />
        <select
          class="join-item select select-sm select-bordered border-base-content w-auto max-w-xs"
          v-model="transref"
        >
          <option selected value="">ALL</option>
          <option value="I">In</option>
          <option value="O">Issue</option>
          <option value="M">Move</option>
        </select>
        <button class="join-item btn btn-sm btn-accent" @click="exportExcel()">
          <Icon icon="mdi:file-excel-outline" class="h-5 w-5 text-white" />
        </button>
      </div>
      <div class="join mt-5 w-full md:justify-center lg:justify-end">
        <button
          class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
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
      </div>
    </div>

    <div class="card shadow-lg bg-base-100">
      <div
        class="card-body overflow-auto pt-0 max-h-[60vh] w-full min-h-[60vh] p-2 lg:p-4"
      >
        <div
          v-if="base.loading"
          class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
        >
          <AppModuleGlobalLoadingText
            :class="`p-4 py-12 text-3xl text-center`"
          />
        </div>
        <div
          class="overflow-x-auto w-full"
          :class="`${base.loading ? 'blur-sm' : ''}`"
        >
          <table
            class="table table-xs table-pin-rows table-pin-cols table-zebra"
          >
            <thead>
              <tr>
                <th>Rack</th>
                <td>Date Time</td>
                <td>Short Code</td>
                <td>Item Name</td>
                <td>Lot No.</td>
                <td>Qty</td>
                <td>Pack Size</td>
                <td>Total Quantity</td>
                <td>Unit</td>
                <td>Comments</td>
                <td>Transaction</td>
                <td>Code</td>
                <td>Ref</td>
                <td>Ref2</td>
              </tr>
            </thead>
            <tbody>
              <tr
                class="hover"
                v-for="(v, i) in base.rows"
                :key="v.code"
              >
                <th>
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
                        ( {{ v.id }} )
                      </div>
                    </div>
                  </div>
                </th>
                <td>
                  <div class="flex items-center space-x-3">
                    <div>
                      <div
                        class="overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {{ v.created_at ? v.created_at : "-" }}
                      </div>
                      <div
                        class="text-opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {{ v.created_fullname ? v.created_fullname : "-" }}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{{ v.item_short_code }}</td>
                <td>{{ v.item_name }}</td>
                <td>{{ v.batch }}</td>
                <td class="text-center">
                  {{ new Intl.NumberFormat("th-TH").format(v.unit) }}
                </td>
                <td class="text-center">
                  {{ new Intl.NumberFormat("th-TH").format(v.pack_size) }}
                </td>
                <td class="text-right">
                  {{ new Intl.NumberFormat("th-TH").format(v.quantitys) }}
                </td>
                <td>{{ v.uom }}</td>
                <td>
                  <div class="flex items-center space-x-3">
                    <div>
                      <div
                        class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {{ v.comments }}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {{
                    v.ref && v.ref2
                      ? "Join"
                      : v.transref == "I" && v.ref && v.b_check
                      ? "Balance"
                      : v.transref == "I" && v.ref
                      ? "Move"
                      : v.transref == "O" && v.ref
                      ? "Issue"
                      : v.transref == "I" && !v.ref
                      ? "In"
                      : v.transref == "O" && !v.ref
                      ? "Issue"
                      : "-"
                  }}
                </td>
                <td>
                  {{ v.code }}
                </td>
                <td>
                  {{ v.ref }}
                </td>
                <td>
                  {{ v.ref2 }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
</template>
<script>
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "Transaction",
  components: {
    AppModuleGlobalPageination,
    AppModuleGlobalSearch,
    AppModuleGlobalLoadingText,
  },
  data() {
    return {
      date: {
        from: "",
        to: "",
      },
      transref: "",
      wh: "",
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
      remove: {
        current: 0,
        model: false,
        controll: "",
        tb: "",
      },
    };
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      return this.$store.getters.user_token;
    },
  },
  methods: {
    exportExcel() {
      return window.open(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WH/exports?type=transaction&total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }${this.wh ? `&wh=${this.wh}` : ""}${
          this.transref ? `&transref=${this.transref}` : ""
        }`
      );
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
        this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
        this.base.back = this.base.page > 1 ? true : false;
        this.base.loading = false;
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WH/shelf?log=base&total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }${this.wh ? `&wh=${this.wh}` : ""}${
          this.date.from ? `&createFrom=${this.date.from}` : ""
        }${
          this.date.to ? `&createTo=${this.date.to}` : ""
        }${
          this.transref ? `&transref=${this.transref}` : ""
        }`, (res) => {
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
    this.$nextTick(() => this.base_search());
  },
  watch: {
    wh: function (v) {
      this.base_search();
    },
    transref: function (v) {
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

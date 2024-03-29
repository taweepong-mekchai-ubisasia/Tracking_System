<template>
  <div class="Stock">
    <div class="grid grid-cols-4 gap-6 lg:px-10 lg:py-5 xl:grid-cols-4">
      <div class="card col-span-4 row-span-4 bg-transparent">
        <div class="join mt-5 w-full md:justify-center lg:justify-end">
          <button
            class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
            disabled
          >
            วันที่
          </button>
          <input
            type="date"
            placeholder="title"
            class="join-item input input-sm input-bordered"
            v-model="date.from"
            @change="change"
          />
          <button
            class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
            disabled
          >
            -
          </button>
          <input
            type="date"
            placeholder="title"
            class="join-item input input-sm input-bordered"
            v-model="date.to"
            @change="change"
          />
          <select
            class="join-item select select-sm select-bordered w-auto max-w-xs"
            v-model="transref"
          >
            <option selected value="">ALL</option>
            <option value="I">In</option>
            <option value="O">Issue</option>
            <option value="M">Move</option>
          </select>
          <button
            class="join-item btn btn-sm btn-primary"
            @click="exportExcel()"
          >
            <Icon icon="mdi:file-excel-outline" class="h-5 w-5 text-white" />
          </button>
        </div>
        <div class="join mt-5 w-full md:justify-center lg:justify-end">
          <button
            class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
            disabled
          >
            สาขา
          </button>
          <select
            class="join-item select select-sm select-bordered w-auto max-w-xs"
            v-model="wh"
          >
            <option selected value="">ALL</option>
            <option value="wh1">Factory</option>
            <option value="wh2">External</option>
          </select>
          <AppModuleGlobalSearch
            :class="'join-item input input-sm input-bordered w-full max-w-xs'"
            @search="
              (q) => {
                base.q = q;
                base_search();
              }
            "
          />
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
                  <th>Rack</th>

                  <td>Date Time</td>
                  <td>Code</td>
                  <td>Ref</td>    <td>Ref2</td>
                  <td>Transaction</td>
                  <td>Short Code</td>
                  <td>Item Name</td>
                  <td>Lot No.</td>
                  <td>Qty</td>
                  <td>Pack Size</td>
                  <td>Total Quantity</td>
                  <td>Unit</td>
                  <td>Comments</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="hover"
                  v-for="(row, index) in base.rows"
                  :key="row.code"
                >
                  <th>
                    <div class="flex items-center space-x-3">
                      <div>
                        <div
                          class="overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{ row.rac }}-{{ row.bay }}-{{ row.level }}-{{
                            row.pallet
                          }}
                        </div>
                        <div
                          class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          ( {{ row.id }} )
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
                          {{ row.created_at ? row.created_at : "-" }}
                        </div>
                        <div
                          class="text-opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{
                            row.created_fullname ? row.created_fullname : "-"
                          }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {{ row.code }}
                  </td>
                  <td>
                    {{ row.ref }}
                  </td>
                  <td>
                    {{ row.ref2 }}
                  </td>
                  <td>
                    {{
                      row.ref && row.ref2
                        ? "Join"
                        : row.transref == "I" && row.ref
                        ? "Move"
                        : row.transref == "O" && row.ref
                        ? "Issue"
                        : row.transref == "I" && !row.ref
                        ? "In"
                        : row.transref == "O" && !row.ref
                        ? "Issue"
                        : "-"
                    }}
                  </td>
                  <td>{{ row.item_short_code }}</td>
                  <td>{{ row.item_name }}</td>
                  <td>{{ row.batch }}</td>
                  <td class="text-center">
                    {{ new Intl.NumberFormat("th-TH").format(row.unit) }}
                  </td>
                  <td class="text-center">
                    {{ new Intl.NumberFormat("th-TH").format(row.pack_size) }}
                  </td>
                  <td class="text-right">
                    {{ new Intl.NumberFormat("th-TH").format(row.quantitys) }}
                  </td>
                  <td>{{ row.uom }}</td>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div>
                        <div
                          class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{ row.comments }}
                        </div>
                      </div>
                    </div>
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
export default {
  name: "BinLocationReport",
  components: {
    AppModuleGlobalPageination,
    AppModuleGlobalSearch,
  },
  data() {
    return {
      date: {
        from: "",
        to: "",
      },
      transref: "",
      wh: "",
      load: false,
      tmpsLink: "",
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
      return window.open(
        `${
          this.$store.state.serviceUrl
        }controllers/MYSQL/INTERNAL/WH/exports?type=transaction&total=1&page=${
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
      fetch(
        `${
          this.$store.state.serviceUrl
        }controllers/MYSQL/INTERNAL/WH/shelf?log=base&total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }${this.wh ? `&wh=${this.wh}` : ""}${
          this.transref ? `&transref=${this.transref}` : ""
        }`,
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

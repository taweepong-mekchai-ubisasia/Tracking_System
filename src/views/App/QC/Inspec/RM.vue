<template>
  <AppLayout>
      <template #modal>
        <!-- modal base -->
        <input
          type="checkbox"
          id="modal-base"
          class="modal-toggle"
          v-model="base.modal"
        />
        <div class="modal" v-if="base.modal">
          <div class="modal-box relative w-11/12 max-w-4xl">
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <button
              class="join-item btn btn-xs btn-outline btn-primary text-xs" style="display: flex;"
              @click="exportExcel('detail')"
            >
              <Icon
                icon="mdi:file-excel-outline"
                class="h-4 w-4"
              />
              Excel
            </button>
            <div class="overflow-auto mt-3" style="max-height: 60vh">
              <table class="table table-xs table-pin-rows table-pin-cols" v-if="!load">
                <thead>
                  <tr class="bg-accent text-white">
                    <td>Parameter</td>
                    <td>Specification</td>
                    <td>COA</td>
                    <td>samping#1</td>
                    <td>samping#2</td>
                    <td>samping#3</td>
                    <td>Samping</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="key in detail.rows">
                    <td>{{ key.U_Parameter || '-' }}</td>
                    <td>{{ key.U_Specification || '-' }}</td>
                    <td>{{ key.U_COA || '-' }}</td>
                    <td>{{ key.U_sampling1 || '-' }}</td>
                    <td>{{ key.U_sampling2 || '-' }}</td>
                    <td>{{ key.U_sampling3 || '-' }}</td>
                    <td>{{ key.U_ReAppearance || key.U_XBar || '-' }}</td>
                  </tr>
                </tbody>
              </table>
              <div v-else>
                <span class="loading loading-spinner text-primary"></span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #view>
        <div class="gap-3 py-3">
          <div class="card shadow-lg bg-base-100">
            <div class="card-body overflow-auto">
              <div class="border-dashed border-2 rounded-lg p-2">
                <h1 class="text-center text-lg font-black text-primary underline underline-offset-2">รายงานผลการทดสอบ RM</h1>
                  <div class="grid gap-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-3">
                    <div class="join lg:col-span-2 col-span-1">
                      <button
                        class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        สาขา
                      </button>
                      <select
                        class="join-item select select-sm select-bordered w-fit border-gray-300"
                        v-model="search.wh"
                      >
                        <option value="UBP" selected>UBP</option>
                        <option value="UBA">UBA</option>
                      </select>
                      <button
                        class="lg:block md:hidden block join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        Item Code
                      </button>
                      <AppModuleGlobalSelectSearch
                        :placeholder="'search code ...'"
                        :label="'ItemCode'"
                        :code="'ItemCode'"
                        :minChar="0"
                        :delay="0.5"
                        :limit="10"
                        :customClass="`input input-bordered border-base-content input-sm join-item ${
                          checkbox == 'M' ? 'input-disabled' : ''
                        }`"
                        :disabled="checkbox == 'M' ? true : false"
                        :current="search.itemCode.from"
                        :refresh="refresh.search"
                        @updateValue="
                          (obj) => {
                            search.itemCode.from = obj.ItemCode;
                          }
                        "
                        @stopRefresh="
                          (obj) => {
                            refresh.search = obj.value;
                          }
                        "
                        :url="`${this.serviceUrl}api/controllers/SAP/${search.wh}/oitm`"
                        :param="`&rm=1&total=1`"
                      />
                      <AppModuleGlobalSelectSearch
                        :placeholder="'search code'"
                        :label="'ItemCode'"
                        :code="'ItemCode'"
                        :minChar="0"
                        :delay="0.5"
                        :limit="10"
                        :customClass="`input input-bordered border-base-content input-sm join-item ${
                          checkbox == 'M' ? 'input-disabled' : ''
                        }`"
                        :current="search.itemCode.to"
                        :refresh="refresh.search"
                        @updateValue="
                          (obj) => {
                            search.itemCode.to = obj.ItemCode;
                          }
                        "
                        @stopRefresh="
                          (obj) => {
                            refresh.search = obj.value;
                          }
                        "
                        :url="`${this.serviceUrl}api/controllers/SAP/${search.wh}/oitm`"
                        :param="`&rm=1&total=1`"
                      />
                    </div>
                    <div class="join">
                      <button
                        class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        Lot No.
                      </button>
                      <input
                        type="text"
                        placeholder="lot no."
                        class="join-item input input-sm input-bordered w-full border-gray-300"
                        v-model="search.lot"
                      />
                    </div>
                    <div class="join">
                      <button
                        class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        Receipt No.
                      </button>
                      <input
                        type="text"
                        placeholder="receipt no."
                        class="join-item input input-sm input-bordered w-full border-gray-300"
                        v-model="search.receiptNo.from"
                      />
                      <input
                        type="text"
                        placeholder="to no."
                        class="join-item input input-sm input-bordered w-full border-gray-300"
                        v-model="search.receiptNo.to"
                      />
                    </div>
                    <div class="join">
                      <button
                        class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        Receipt Date
                      </button>
                      <input
                        type="date"
                        placeholder="first date"
                        class="join-item input input-sm input-bordered w-full border-gray-300"
                        v-model="search.receiptDate.from"
                      />
                      <button
                        class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        -
                      </button>
                      <input
                        type="date"
                        placeholder="second date"
                        class="join-item input input-sm input-bordered w-full border-gray-300"
                        v-model="search.receiptDate.to"
                      />
                    </div>
                    <!-- <div class="join">
                      <button
                        class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        Short Code
                      </button>
                      <AppModuleGlobalSelectSearch
                        :placeholder="'code ...'"
                        :label="'short_code'"
                        :code="'short_code'"
                        :minChar="0"
                        :delay="0.5"
                        :limit="10"
                        :customClass="`input input-bordered border-base-content input-sm join-item ${
                          checkbox == 'M' ? 'input-disabled' : ''
                        }`"
                        :disabled="checkbox == 'M' ? true : false"
                        :current="search.itemCode.from"
                        :refresh="refresh.search"
                        @updateValue="
                          (obj) => {
                            search.itemCode.from = obj.item_code;
                          }
                        "
                        @stopRefresh="
                          (obj) => {
                            refresh.search = obj.value;
                          }
                        "
                        :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort`"
                        :param="`&rm=1&total=1&wh=${wh}&action=groupby-code`"
                      />
                      <AppModuleGlobalSelectSearch
                        :placeholder="'to code'"
                        :label="'short_code'"
                        :code="'short_code'"
                        :minChar="0"
                        :delay="0.5"
                        :limit="10"
                        :customClass="`input input-bordered border-base-content input-sm join-item ${
                          checkbox == 'M' ? 'input-disabled' : ''
                        }`"
                        :current="search.itemCode.to"
                        :refresh="refresh.search"
                        @updateValue="
                          (obj) => {
                            search.itemCode.to = obj.item_code;
                          }
                        "
                        @stopRefresh="
                          (obj) => {
                            refresh.search = obj.value;
                          }
                        "
                        :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort`"
                        :param="`&rm=1&total=1&wh=${wh}&action=groupby-code`"
                      />
                    </div> -->
                    <!-- <div class="join">
                      <button
                        class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        สาขา
                      </button>
                      <select
                        class="join-item select select-sm select-bordered max-w-lg w-full border-gray-300"
                        v-model="search.wh"
                      >
                        <option value="UBP" selected>UBP</option>
                        <option value="UBA">UBA</option>
                      </select>
                    </div> -->
                    <div class="join lg:col-span-1 md:col-span-2 col-span-1">
                      <button class="hidden md:block join-item btn btn-sm btn-active btn-ghost" style="display: inline-flex; width: 50%;" @click="clearing">
                        <Icon
                          icon="icon-park-outline:clear-format"
                          class="h-5 w-5"
                        />
                        ล้าง
                      </button>
                      <button class="hidden md:block join-item btn btn-sm btn-primary text-white" style="display: inline-flex; width: 50%;" @click="searching">
                        <Icon
                          icon="tabler:search"
                          class="h-5 w-5 text-white"
                        />
                        ค้นหา
                      </button>
                    </div>
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
              <div class="mt-1" v-if="check">
                <div class="grid gap-3 grid-cols-2">
                  <button
                    class="join-item btn btn-sm btn-outline btn-primary w-24" style="display: flex;"
                    @click="exportExcel('base')"
                  >
                    <Icon
                      icon="mdi:file-excel-outline"
                      class="h-5 w-5"
                    />
                    Excel
                  </button>
                  <div class="join w-full justify-end">
                    <AppModuleGlobalSearch
                      :class="'join-item input input-sm input-bordered w-full max-w-xs'"
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
                <div class="overflow-x-auto w-full max-h-[47vh] my-2">
                  <div v-if="!base.loading && base.rows.length == 0">
                    <AppModuleGlobalEmptyData
                      :class="`p-4 py-12 text-3xl text-center`"
                    />
                  </div>
                  <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                    <thead>
                      <tr>
                        <td>Receipt No.</td>
                        <td>Receipt Date</td>
                        <td>Lot No.</td>
                        <td>RM Code</td>
                        <td>RM Name</td>
                        <td>Expire Date</td>
                        <td>Supplier Name</td>
                        <td>Supplier Lot No.</td>
                        <td class="text-right">Quantity</td>
                        <td>Checker</td>
                        <td>Approver</td>
                        <th class="text-center">Results</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(v, i) in base.rows" :key="v.DocEntry" class="hover">
                        <td>{{ v.U_ReceiptNO }}</td>
                        <td>{{ v.U_DateRe ? $moment(v.U_DateRe.date).format("DD-MM-YYYY") : "-" }}</td>
                        <td>{{ v.U_LotNo }}</td>
                        <td>{{ v.U_ItemNo }}</td>
                        <td>{{ v.ItemName }}</td>
                        <td>{{ v.U_ExpireDate ? $moment(v.U_ExpireDate.date).format("DD-MM-YYYY") : "-" }}</td>
                        <td>{{ v.U_SupName }}</td>
                        <td>{{ v.U_SupLot || '-' }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(v.U_ReAmount) }}</td>
                        <td>{{ v.U_Inspected || '-' }}</td>
                        <td>{{ v.U_Approve || '-' }}</td>
                        <th class="text-center">
                          <label
                            for="modal-base"
                            class="btn btn-primary modal-button btn-xs text-white"
                            @click="base_edit(`${v.DocEntry}`, `${i}`)"
                          >
                            Results
                          </label>
                        </th>
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
                      <option value="15">15</option>
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
              <div class="overflow-x-auto w-full h-32 mt-9" v-else>
                <span class="font-bold italic text-gray-500">{{ text }}</span>
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
import Query from "@/assets/js/fetch.js";

export default {
  name: "RM",
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
  data() {
    return {
      load: false,
      text: 'Specify Information Before Searching.',
      allow: false,
      check: 0,
      search: {
        receiptNo: {
          from: "",
          to: "",
        },
        receiptDate: {
          from: "",
          to: "",
        },
        itemCode: {
          from: "",
          to: "",
        },
        lot: "",
        wh: "UBP"
      },
      wh: "",
      checkbox: "",
      refresh: false,
      base: {
        rows: [],
        total: 0,
        page: 1,
        row: 15,
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
      if (controll == 'base') {
        return window.open(`${this.serviceUrl}api/controllers/SAP/Excel/${this.wh}/qc?for=rmreport&total=1
          ${this.search.receiptNo.from ? `&receipt_from=${this.search.receiptNo.from}` : ''}${this.search.receiptNo.to ? `&receipt_to=${this.search.receiptNo.to}` : ''}
          ${this.search.receiptDate.from ? `&start_date=${this.search.receiptDate.from}` : ''}${this.search.receiptDate.to ? `&end_date=${this.search.receiptDate.to}` : ''}
          ${this.search.itemCode.from ? `&code_from=${this.search.itemCode.from}` : ''}${this.search.itemCode.to ? `&code_to=${this.search.itemCode.to}` : ''}
          ${this.search.lot ? `&lot_no=${this.search.lot}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`);
      } else {
        return window.open(`${this.serviceUrl}api/controllers/SAP/Excel/${this.wh}/qc?for=rmresult&total=1&doc=${this.base.form.DocEntry}`);
      }
    },
    searching() {
      this.wh = this.search.wh
      this.base.page = 1
      this.allow = true
      this.base_search();
    },
    clearing() {
      this.search.receiptNo.from = ''
      this.search.receiptNo.to = ''
      this.search.receiptDate.from = ''
      this.search.receiptDate.to = ''
      this.search.itemCode.from = ''
      this.search.itemCode.to = ''
      this.search.lot = ''

      this.base.q = ''
    },
    // base
    base_search() {
      this.base.loading = true;
      setTimeout(() => {
        this.base_get((res) => {
          this.base.rows = res.rows;
          this.base.total = res.total;
          this.base.next =
            this.base.page * this.base.row >= this.base.total ? false : true;
          this.base.back = this.base.page > 1 ? true : false;
          this.base.loading = false;

          this.allow = false
        });
      }, 250);
    },
    base_get(callback) {
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/SAP/${this.search.wh}/QC/rm_inspec?total=1&page=${this.base.page}
        ${this.search.receiptNo.from ? `&receipt_from=${this.search.receiptNo.from}` : ''}${this.search.receiptNo.to ? `&receipt_to=${this.search.receiptNo.to}` : ''}
        ${this.search.receiptDate.from ? `&start_date=${this.search.receiptDate.from}` : ''}${this.search.receiptDate.to ? `&end_date=${this.search.receiptDate.to}` : ''}
        ${this.search.itemCode.from ? `&code_from=${this.search.itemCode.from}` : ''}${this.search.itemCode.to ? `&code_to=${this.search.itemCode.to}` : ''}
        ${this.search.lot ? `&lot_no=${this.search.lot}` : ""}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
        if (!res.success) {
        } else {
          this.text = !res.rows.length ? `No Information found. Can It Be ${ this.search.wh == 'UBP' ? '"UBA"' : '"UBP"' } Base?` : 'Specify Information Before Searching.'
          this.check = this.allow ? res.rows.length : this.check

          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.detail.rows = [];
      this.detail_search();
      this.refresh = true;
    },
    // DETAIL
    detail_search() {
      this.load = true

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

        setTimeout(() => {
          this.load = false
        }, 100);
      });
    },
    detail_get(callback) {
      new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/SAP/${this.wh}/QC/rm_inspec_result?total=1&doc=${this.base.form.DocEntry}`, (res) => {
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
  mounted() {},
  watch: {}
};
</script>

<style scrop>
tr,
td {
  white-space: nowrap;
}
</style>

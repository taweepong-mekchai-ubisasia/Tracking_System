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
        <div
          class="modal-box relative w-11/12 md:w-6/12 lg:w-6/12 xl:w-4/12 max-w-5xl p-2 lg:p-4 max-h-screen"
        >
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕
          </label>
          <h3 class="text-lg font-bold text-primary">APPROVE REQUEST</h3>
          <div class="divider my-1"></div>
          <div class="card-body overflow-auto max-h-[60vh] p-2 lg:p-4">
            <div class="form-control">
              <label class="label"
                ><span class="label-text">Short code</span>
              </label>
              <AppModuleGlobalSelectSearch
                v-if="base.modal && base.controll == 'create'"
                :placeholder="'Short code'"
                :label="'short_code'"
                :code="'short_code'"
                :minChar="3"
                :delay="0.5"
                :limit="10"
                :customClass="`input input-bordered border-base-content`"
                :current="base.form.item_short_code"
                @updateValue="
                  (obj) => {
                    base.form.item_short = obj;
                    base.form.item_short_code = obj.short_code;
                  }
                "
                :url="`${serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort`"
                :param="`&total=1&wh=${user.branchTitle}&action=groupby-code`"
              />
              <input
                v-else
                type="text"
                placeholder="Short code"
                class="input input-bordered border-base-content input-disabled"
                required=""
                v-model="base.form.item_short_code"
                disabled
              />
            </div>
            <div class="form-control">
              <label class="label"
                ><span class="label-text">Item Description</span>
              </label>
              <select
                v-if="base.controll == 'create'"
                class="select select-bordered border-base-content w-full"
                v-model="base.form.item_code"
              >
                <option disabled selected value="">Select Option</option>
                <option v-for="(v, i) in item.rows" :value="v.item_code">
                  {{ v.item_name }}
                </option>
              </select>
              <input
                v-else
                type="text"
                placeholder="Short code"
                class="input input-bordered border-base-content input-disabled"
                required=""
                v-model="base.form.item_short_code"
                disabled
              />
            </div>
            <div class="form-control">
              <label class="label"
                ><span class="label-text">Item Code</span>
              </label>
              <input
                type="text"
                placeholder="Item Code"
                class="input input-bordered border-base-content"
                required=""
                v-model="base.form.item_code"
                disabled
              />
            </div>
            <div class="grid grid-cols-2 w-full gap-4">
              <div class="flex-1 w-auto">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Qty</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Qty"
                    class="input input-bordered border-base-content"
                    required=""
                    min="1"
                    max="5"
                    v-model="base.form.unit"
                    :disabled="base.form.status ? true : false"
                  />
                </div>
              </div>
              <div class="flex-1 w-auto">
                <div class="form-control">
                  <label class="label"
                    ><span class="label-text">Unit</span></label
                  >
                  <input
                    type="text"
                    placeholder="Unit"
                    class="input input-bordered border-base-content w-full input-disabled"
                    required=""
                    v-model="base.form.uom"
                    readonly
                  />
                </div>
              </div>
            </div>
            <div class="form-control">
              <label class="label"
                ><span class="label-text">Status</span>
              </label>
              <label class="form-control w-full">
                <select
                  class="select select-bordered border-base-content"
                  v-model="base.form.newStatus"
                  :disabled="
                    base.form.status == 'cancel' || base.form.status == 'reject'
                  "
                >
                  <option
                    selected
                    value=""
                    :disabled="base.controll != 'create'"
                  >
                    Select Option
                  </option>
                  <option
                    value="pending"
                    :disabled="
                      base.form.status == 'approve' ||
                      base.form.status == 'reject'
                    "
                  >
                    Request
                  </option>
                  <option value="approve" disabled>Approve</option>
                  <option value="reject" disabled>Reject</option>
                  <option value="cancel" :disabled="base.controll == 'create'">
                    Cancel
                  </option>
                </select>
              </label>
            </div>
          </div>
          <div
            class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex my-4"
          >
            <div class="flex-1 form-control">
              <label for="modal-base" class="btn btn-danger">Cancel</label>
            </div>
            <div
              class="flex-1 form-control"
              v-if="
                base.form.status != 'cancel' &&
                (base.form.newStatus != base.form.status ||
                  base.controll == 'create' ||
                  base.form.status == '')
              "
            >
              <button class="btn btn-primary text-white" @click="base_save()">
                Confirm
              </button>
            </div>
            <div
              class="flex-1 form-control"
              v-if="
                base.form.status == 'cancel' || base.form.status == 'reject'
              "
            >
              <label
                for="modal-remove"
                class="btn btn-error text-white"
                @click="
                  remove_item(
                    `${base.form.code}`,
                    'base',
                    'controllers/MYSQL/INTERNAL/WH/shelf_request'
                  )
                "
              >
                Delete
              </label>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #view>
      <div class="grid grid-cols-1 gap-6">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-2 lg:p-4">
            <div>
              <div
                v-if="base.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div :class="`${base.loading ? 'blur-sm' : ''}`">
                <div
                  class="contents lg:inline-flex lg:join w-full md:justify-center lg:justify-end"
                >
                  <div class="contents sm:join md:join lg:join xl:join">
                    <div class="join join-item w-full">
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
                        placeholder="date"
                        class="join-item input input-sm input-bordered border-base-content"
                        v-model="date.to"
                        @change="change"
                      />
                    </div>
                    <div class="join join-item w-full mt-2">
                      <AppModuleGlobalSearch
                        :class="'join-item input input-sm input-bordered border-base-content w-full '"
                        @search="
                          (q) => {
                            base.page = 1;
                            base.q = q;
                            typeof base.q == 'string' ? base_search() : '';
                          }
                        "
                      />
                      <button
                        class="join-item btn btn-sm btn-accent text-white"
                        @click="exportExcel()"
                      >
                        <Icon
                          icon="mdi:file-excel-outline"
                          class="h-5 w-5 text-white"
                        />
                      </button>
                      <label
                        for="modal-base"
                        class="join-item btn-sm btn btn-primary modal-button text-white"
                        @click="base_create()"
                        >Create</label
                      >
                    </div>
                  </div>
                </div>
                <div
                  class="overflow-x-auto w-full max-h-[60vh] min-h-[60vh] my-4"
                >
                  <table
                    class="table table-xs table-pin-rows table-pin-cols table-zebra"
                  >
                    <thead>
                      <tr>
                        <th>Code</th>
                        <td>Status</td>
                        <td>Short Code</td>
                        <td>Item Description</td>
                        <td class="text-right">Qty</td>
                        <td>Unit</td>
                        <td>Requestion</td>
                        <td>Approval</td>
                        <td>Rejection</td>
                        <td>Cancellation</td>
                        <td>Creation</td>
                        <td>Updation</td>
                        <th class="text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(v, i) in base.rows"
                        :key="v.code"
                        :class="
                          v.status == 'pending'
                            ? 'text-blue-700'
                            : v.status == 'reject'
                            ? 'text-error'
                            : v.status == 'approve'
                            ? 'text-green-700'
                            : v.status == 'cancel'
                            ? 'text-gray-400 !bg-gray-100'
                            : ''
                        "
                      >
                        <th>
                          <div class="text-xs">
                            {{ v.code }}
                          </div>
                          <div class="text-xs">( {{ v.id }} )</div>
                        </th>
                        <td>
                          {{
                            v.status
                              ? v.status == "pending"
                                ? "Pending"
                                : v.status == "approve"
                                ? "Approve"
                                : v.status == "reject"
                                ? "Reject"
                                : v.status == "cancel"
                                ? "Cancel"
                                : "-"
                              : "-"
                          }}
                        </td>
                        <td>
                          {{ v.item_short_code }}
                        </td>
                        <td class="text-center">
                          {{ v.item_name }}<br />
                          ( {{ v.item_code }} )
                        </td>
                        <td class="text-right">
                          {{ v.unit }}
                        </td>
                        <td>{{ v.uom }}</td>
                        <td>
                          {{
                            v.requested_at &&
                            $moment(v.requested_at).format("YYYY-MM-DD") >
                              "2000"
                              ? v.requested_at
                              : "-"
                          }}
                          <br />
                          {{
                            v.requested_fullname
                              ? v.requested_fullname
                              : "-"
                          }}
                        </td>
                        <td>
                          {{
                            v.approved_at &&
                            $moment(v.approved_at).format("YYYY-MM-DD") >
                              "2000"
                              ? v.approved_at
                              : "-"
                          }}
                          <br />
                          {{
                            v.approved_fullname ? v.approved_fullname : "-"
                          }}
                        </td>
                        <td>
                          {{
                            v.rejected_at &&
                            $moment(v.rejected_at).format("YYYY-MM-DD") >
                              "2000"
                              ? v.rejected_at
                              : "-"
                          }}
                          <br />
                          {{
                            v.rejected_fullname ? v.rejected_fullname : "-"
                          }}
                        </td>
                        <td>
                          {{
                            v.canceled_at &&
                            $moment(v.canceled_at).format("YYYY-MM-DD") >
                              "2000"
                              ? v.canceled_at
                              : "-"
                          }}
                          <br />
                          {{
                            v.canceled_fullname ? v.canceled_fullname : "-"
                          }}
                        </td>
                        <td>
                          {{
                            v.created_at &&
                            $moment(v.created_at).format("YYYY-MM-DD") >
                              "2000"
                              ? v.created_at
                              : "-"
                          }}
                          <br />
                          {{
                            v.created_fullname ? v.created_fullname : "-"
                          }}
                        </td>
                        <td>
                          {{
                            v.updated_at &&
                            $moment(v.updated_at).format("YYYY-MM-DD") >
                              "2000"
                              ? v.updated_at
                              : "-"
                          }}
                          <br />
                          {{
                            v.updated_fullname ? v.updated_fullname : "-"
                          }}
                        </td>
                        <th class="text-right">
                          <label
                            for="modal-base"
                            class="join-item btn btn-ghost modal-button btn-xs"
                            @click="base_edit(`${v.code}`, `${i}`)"
                            >Detail
                          </label>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
    </template>
  </AppLayout>
</template>
<script>
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "Request",
  components: {
    AppLayout,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalLoadingText,
  },
  data() {
    return {
      date: {
        from: "",
        to: "",
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
          code: "",
        },
      },
      item: {
        rows: [],
        total: 0,
        page: 1,
        row: null,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
          code: "",
        },
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
    user() {
      return this.$store.getters.user;
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
        this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
        this.base.back = this.base.page > 1 ? true : false;
        this.base.loading = false;
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelf_request?total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
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
        code: "",
      };
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.form.newStatus = this.base.form.status;
      this.base.current = code;
      this.base.controll = "edit";
    },
    base_save() {
      let obj = {
        code: this.base.current,
        rows: [
          {
            ...Object.assign({ ...this.base.form }),
            status: this.base.form.newStatus,
          },
        ],
      };

      new Query('base', this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelf_request`, obj, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
        } else {
          this.base.current == 0
            ? (this.base.current = res.rows[0].code)
            : "";
          this.base.modal = false;
          this.base.page = 1;
          this.base_search();
        }
      });
    },
    // Item
    item_search(callback) {
      this.item.loading = true;
      this.item_get((res) => {
        this.item.rows = res.rows;
        this.item.total = res.total;
        this.item.next =
          this.item.page * this.item.row >= this.item.total ? false : true;
        this.item.back = this.item.page > 1 ? true : false;
        this.item.loading = false;
        callback(res);
      });
    },
    item_get(callback) {
      new Query('item','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort?total=1&wh=wh1&item_list=1&wh=${this.user.branchTitle}&short_code=${this.base.form.item_short_code}`, (res) => {
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
      this.base_search();
    });
  },
  watch: {
    "base.form.item_short_code": function (val) {
      if (this.base.controll == "create") {
        this.base.form.item_code = "";
        this.base.form.item_name = "";
      }

      if (val) {
        this.item_search((res) => {
          if (this.item.rows.length == 1) {
            this.base.form.item_code = this.item.rows[0].item_code;
            this.base.form.item_wh = this.item.rows[0].wh;
          }
        });
      }
    },
    "base.form.item_code": function (val) {
      if (val) {
        new Query('base','get').get(this, `${this.serviceUrl}api/controllers/SAP/${this.base.form.item_wh ? this.base.form.item_wh : "UBA"}/oitm?item_code=${val}`, (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            this.base.form.item_code = res.rows[0].ItemCode;
            this.base.form.item_name = res.rows[0].ItemName;
            this.base.form.uom = res.rows[0].UomCode;
          }
        });
      }
    },
  },
};
</script>

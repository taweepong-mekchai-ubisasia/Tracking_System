<template>
  <div class="Department">
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
          class="modal-box relative w-11/12 max-w-5xl p-2 lg:p-4 max-h-screen"
        >
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold">Request Item</h3>
            <div class="card">
              <div class="card-body">
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
                    :customClass="`input input-bordered border-base-content ${
                      checkbox == 'M' ? 'input-disabled' : ''
                    }`"
                    :disabled="checkbox == 'M' ? true : false"
                    :current="base.form.item_short_code"
                    :refresh="refresh.item_short_code"
                    @updateValue="
                      (obj) => {
                        base.form.item_short = obj;
                        base.form.item_short_code = obj.short_code;
                        // base.form.item_short.code = obj.code;
                      }
                    "
                    @stopRefresh="
                      (obj) => {
                        refresh.item_short_code = obj.value;
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
                        base.form.status == 'cancel' ||
                        base.form.status == 'reject'
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
                      <option
                        value="cancel"
                        :disabled="base.controll == 'create'"
                      >
                        Cancel
                      </option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <!-- {{ base.form.status }} -->
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex my-4"
            >
              <div class="flex-1 form-control">
                <label for="modal-base" class="btn btn-danger">Cancle</label>
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
                <!-- <button
                  class="btn  btn-error text-white"
                  @click="
                    remove_item(
                      `${base.form.code}`,
                      'base',
                      'controllers/MYSQL/INTERNAL/WH/shelf_request'
                    )
                  "
                >
                  Delete
                </button> -->

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

                <!-- <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/WH/shelf_request'
                            )
                          "
                          >Remove
                        </label> -->
              </div>
            </div>
          </div>
        </div>

        <!-- modal remove -->
        <input
          type="checkbox"
          id="modal-remove"
          class="modal-toggle"
          v-model="remove.modal"
        />
        <div class="modal">
          <div class="modal-box relative">
            <label
              for="modal-remove"
              class="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 class="text-lg font-bold">Remove Item!</h3>
            <div class="card-body overflow-auto max-h-[60vh] ">
              Are your sure for remove this item?
            </div>

            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-remove" class="btn btn-danger">Cancle</label>
              </div>
              <div class="flex-1 form-control mt-6">
                <button
                  class="btn btn-error text-white"
                  @click="confirm_remove()"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #view>
        <div class="grid grid-cols-1 gap-6 lg:px-10 lg:py-2">
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body overflow-auto">
              <div
                class="contents lg:inline-flex lg:join my-5 w-full md:justify-center lg:justify-end"
              >
              <div class="contents sm:join md:join lg:join xl:join">
                  <div class="join join-item">
                    <button
                      class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
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
                      class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
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
                  </div>

                  <!-- <button
                  class="join-item btn btn-sm btn-primary  border-r-white"
                  @click="exportExcel()"
                >
                  <Icon
                    icon="mdi:file-excel-outline"
                    class="h-5 w-5 text-white"
                  />
                </button> -->
                  <AppModuleGlobalSearch
                    :class="'join-item input input-sm input-bordered border-base-content w-full max-w-xs'"
                    @search="
                      (q) => {
                        base.q = q;
                        base_search();
                      }
                    "
                  />
                </div>
                <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white mr-1"
                  @click="exportExcel()"
                >
                  <Icon
                    icon="mdi:file-excel-outline"
                    class="h-5 w-5 text-white"
                /></label>

                <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white"
                  @click="base_create()"
                  >Create</label
                >
              </div>

              <!-- <div class="join mt-5 w-full md:justify-center lg:justify-end">
                <AppModuleGlobalSearch
                  :class="'join-item input input-sm input-bordered border-base-content w-full max-w-xs'"
                  @search="
                    (q) => {
                      base.q = q;
                      base_search();
                    }
                  "
                />
                <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white"
                  @click="base_create()"
                  >Create</label
                >
              </div> -->
              <div class="overflow-x-auto w-full max-h-[60vh] lg:max-h-[65vh]">
                <table
                  class="table table-xs table-pin-rows table-pin-cols table-zebra"
                >
                  <thead>
                    <tr>
                      <th>Code</th>
                      <td>Status</td>
                      <td>Short Code</td>
                      <td>Item Description</td>
                      <td>Qty</td>
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
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{ v.code }}
                            </div>
                            <div class="text-xs">( {{ v.id }} )</div>
                          </div>
                        </div>
                      </th>
                      <td>
                        <span class="pr-2">{{
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
                        }}</span>
                      </td>
                      <td>
                        <span class="pr-2">{{ v.item_short_code }}</span>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{ v.item_name }}
                            </div>
                            <div class="text-xs">( {{ v.item_code }} )</div>
                          </div>
                        </div>
                      </td>

                      <!-- <td> 
                        <span class="pr-2">{{ v.pack_size }}</span>
                      </td> -->
                      <td>
                        <span class="pr-2">{{ v.unit }}</span>
                      </td>
                      <td>
                        <span class="pr-2">{{ v.uom }}</span>
                      </td>

                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{
                                v.requested_at &&
                                $moment(v.requested_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.requested_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                v.requested_fullname
                                  ? v.requested_fullname
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{
                                v.approved_at &&
                                $moment(v.approved_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.approved_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                v.approved_fullname
                                  ? v.approved_fullname
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{
                                v.rejected_at &&
                                $moment(v.rejected_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.rejected_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                v.rejected_fullname
                                  ? v.rejected_fullname
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{
                                v.canceled_at &&
                                $moment(v.canceled_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.canceled_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                v.canceled_fullname
                                  ? v.canceled_fullname
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{
                                v.created_at &&
                                $moment(v.created_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.created_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                v.created_fullname
                                  ? v.created_fullname
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{
                                v.updated_at &&
                                $moment(v.updated_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.updated_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                v.updated_fullname
                                  ? v.updated_fullname
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </td>

                      <!-- <th class="text-right" v-if="!v.status">
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                          >รายละเอียด
                        </label>
                        <label
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            status_item(
                              `pending`,
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/WH/shelf_request'
                            )
                          "
                          >Request
                        </label>
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                          >Edit
                        </label>
                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/WH/shelf_request'
                            )
                          "
                          >Remove
                        </label>
                      </th>
                      <th class="text-right" v-if="v.status == 'reject'">
                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/WH/shelf_request'
                            )
                          "
                          >Cancel
                        </label>
                      </th>
                      <th
                        class="text-right"
                        v-else-if="v.status == 'pending'"
                      >
                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            status_item(
                              `cancel`,
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/WH/shelf_request'
                            )
                          "
                          >Cancel
                        </label>
                      </th> -->
                      <!-- <th class="text-right" v-else></th> -->
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
              <div class="w-full">
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
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";

export default {
  name: "Department",
  components: {
    AppLayout,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
  },
  data() {
    return {
      date: {
        from: "",
        to: "",
      },
      checkbox: "",
      refresh: false,
      
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
      },
      remove: {
        current: 0,
        model: false,
        controll: "",
        tb: "",
      },
      imagerow: null,
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
          name: "",
          number: "",
          size: "",
          description: "",
          category_id: "0",
          store_id: "0",
          recommend: "",
          room: "",
          imageLink: "",
          image: [],
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
        this.$store.state.serviceUrl
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
      fetch(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WH/shelf_request?total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
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
    base_create() {
      this.base.current = 0;
      this.base.form = {
        code: "",
        item_code: "",
        item_name: "",
        item_short_code: "",
        pack_size: "",
        unit: "",
        uom: "",
        status: "",
        newStatus: "",
      };
      this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.form.newStatus = this.base.form.status;
      this.base.current = code;
      this.detail.rows = [];
      this.base.controll = "edit";
      // this.detail_search();
      this.refresh = true;
    },
    base_save() {
      let vm = this;

      // let image = { ...this.base.form.image[0] };
      // delete image.temp;
      this.base.form.status = this.base.form.newStatus;
      console.log(this.base.form.status);
      fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelf_request`, {
        method: this.base.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({ ...this.base.form }),
      })
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            this.base.modal = false;
            const promise_arr = [];
            console.log(this.base.current);
            if (this.base.current == 0) {
              this.base.current = res.row.code;
              let i = this.detail.rows.length;
              this.detail.controll = "create";
              for (i; i > 0; i--) {
                this.detail.form = {
                  code: this.detail.rows[i - 1]["code"],
                  title: this.detail.rows[i - 1]["title"],
                };
                promise_arr.push(
                  new Promise(async function (resolve, reject) {
                    let res = await vm.detail_save("dynamic");
                    await resolve(res);
                    return;
                  })
                );
              }
            }

            Promise.all(promise_arr)
              .then((res) => {
                // console.log(res);
                vm.base_search();
              })
              .catch((err) => console.error(err));
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    status_item(status, code, controll, tb) {
      fetch(`${this.serviceUrl}api/${tb}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({
          code: code,
          status: status,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            // console.log(res);
            // this.remove.modal = false;
            this[`${controll}_search`]();
          }
          // callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          // callback([]);
          console.error("Error:", error);
        });
    },
    // REMOVE
    remove_item(code, controll, tb) {
      console.log(code);
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    confirm_remove() {
      fetch(`${this.serviceUrl}api/${this.remove.tb}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({
          code: this.remove.code,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            // console.log(res);
            this.remove.modal = false;
            this.base.modal = false;
            this[`${this.remove.controll}_search`]();
          }
          // callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          // callback([]);
          console.error("Error:", error);
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
      fetch(
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort?total=1&wh=wh1&item_list=1&wh=${this.user.branchTitle}&short_code=${this.base.form.item_short_code}`,
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
        fetch(
          `${this.serviceUrl}api/controllers/SAP/${
            this.base.form.item_wh ? this.base.form.item_wh : "UBA"
          }/oitm?item_code=${val}`,
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
                     if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
              this.base.form.item_code = res.rows[0].ItemCode;
              this.base.form.item_name = res.rows[0].ItemName;
              this.base.form.uom = res.rows[0].UomCode;
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
  },
};
</script>
<style scrop>
tr,
td {
  white-space: nowrap;
}
</style>

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
          <div class="modal-box relative w-6/12 max-w-5xl">
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
                    :customClass="`input input-bordered ${
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
                    :url="`${serviceUrl}controllers/MYSQL/INTERNAL/WH/shelfshort`"
                    :param="`&total=1&wh=${user.branchTitle}&action=groupby-code`"
                  />
                  <input
                    v-else
                    type="text"
                    placeholder="Short code"
                    class="input input-bordered input-disabled"
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
                    class="select select-bordered w-full"
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
                    class="input input-bordered input-disabled"
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
                    class="input input-bordered"
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
                        class="input input-bordered"
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
                        class="input input-bordered w-full input-disabled"
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
                      class="select select-bordered"
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
                              `${row.code}`,
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
            <div class="card-body overflow-auto" style="max-height: 60vh">
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
                    :class="'join-item input input-sm input-bordered w-full max-w-xs'"
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
                  :class="'join-item input input-sm input-bordered w-full max-w-xs'"
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
                      v-for="(row, index) in base.rows"
                      :key="row.code"
                      :class="
                        row.status == 'pending'
                          ? 'text-blue-700'
                          : row.status == 'reject'
                          ? 'text-error'
                          : row.status == 'approve'
                          ? 'text-green-700'
                          : row.status == 'cancel'
                          ? 'text-gray-400 !bg-gray-100'
                          : ''
                      "
                    >
                      <th>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{ row.code }}
                            </div>
                            <div class="text-xs">( {{ row.id }} )</div>
                          </div>
                        </div>
                      </th>
                      <td>
                        <span class="pr-2">{{
                          row.status
                            ? row.status == "pending"
                              ? "Pending"
                              : row.status == "approve"
                              ? "Approve"
                              : row.status == "reject"
                              ? "Reject"
                              : row.status == "cancel"
                              ? "Cancel"
                              : "-"
                            : "-"
                        }}</span>
                      </td>
                      <td>
                        <span class="pr-2">{{ row.item_short_code }}</span>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{ row.item_name }}
                            </div>
                            <div class="text-xs">( {{ row.item_code }} )</div>
                          </div>
                        </div>
                      </td>

                      <!-- <td> 
                        <span class="pr-2">{{ row.pack_size }}</span>
                      </td> -->
                      <td>
                        <span class="pr-2">{{ row.unit }}</span>
                      </td>
                      <td>
                        <span class="pr-2">{{ row.uom }}</span>
                      </td>

                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{
                                row.requested_at &&
                                $moment(row.requested_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? row.requested_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                row.requested_fullname
                                  ? row.requested_fullname
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
                                row.approved_at &&
                                $moment(row.approved_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? row.approved_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                row.approved_fullname
                                  ? row.approved_fullname
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
                                row.rejected_at &&
                                $moment(row.rejected_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? row.rejected_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                row.rejected_fullname
                                  ? row.rejected_fullname
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
                                row.canceled_at &&
                                $moment(row.canceled_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? row.canceled_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                row.canceled_fullname
                                  ? row.canceled_fullname
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
                                row.created_at &&
                                $moment(row.created_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? row.created_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                row.created_fullname
                                  ? row.created_fullname
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
                                row.updated_at &&
                                $moment(row.updated_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? row.updated_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                row.updated_fullname
                                  ? row.updated_fullname
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </td>

                      <!-- <th class="text-right" v-if="!row.status">
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${row.code}`, `${index}`)"
                          >รายละเอียด
                        </label>
                        <label
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            status_item(
                              `pending`,
                              `${row.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/WH/shelf_request'
                            )
                          "
                          >Request
                        </label>
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${row.code}`, `${index}`)"
                          >Edit
                        </label>
                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${row.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/WH/shelf_request'
                            )
                          "
                          >Remove
                        </label>
                      </th>
                      <th class="text-right" v-if="row.status == 'reject'">
                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${row.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/WH/shelf_request'
                            )
                          "
                          >Cancel
                        </label>
                      </th>
                      <th
                        class="text-right"
                        v-else-if="row.status == 'pending'"
                      >
                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            status_item(
                              `cancel`,
                              `${row.code}`,
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
                          @click="base_edit(`${row.code}`, `${index}`)"
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
      }controllers/MYSQL/INTERNAL/WH/exports?db=shelf&total=1&page=${
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
        }controllers/MYSQL/INTERNAL/WH/shelf_request?total=1&page=${
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
      fetch(`${this.serviceUrl}controllers/MYSQL/INTERNAL/WH/shelf_request`, {
        method: this.base.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({ ...this.base.form }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
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
      fetch(`${this.serviceUrl}${tb}`, {
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
          if (res.success) {
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
      fetch(`${this.serviceUrl}${this.remove.tb}`, {
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
          if (res.success) {
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
        `${this.serviceUrl}controllers/MYSQL/INTERNAL/WH/shelfshort?total=1&wh=wh1&item_list=1&wh=${this.user.branchTitle}&short_code=${this.base.form.item_short_code}`,
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
      this.tmpsLink = `${
        window.location.origin == "http://localhost:8081"
          ? `http://localhost:8080/kay/rewrite_demo/services/`
          : `${window.location.origin}/services/`
      }tmps/`;
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
          `${this.serviceUrl}controllers/SAP/${
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
            if (res.rows.length > 0) {
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

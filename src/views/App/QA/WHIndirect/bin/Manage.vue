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
          <div class="modal-box relative w-10/12 lg:w-6/12 max-w-full">
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold">Request Doc</h3>

            <div
              class="bg-base-100 border-base-300 rounded-box p-6 overflow-auto w-full max-h-[60vh]"
            >
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  class="input input-bordered border-base-content"
                  v-model="base.form.title"
                  :disabled="
                    !base.form.status || base.form.status == 'draft'
                      ? false
                      : true
                  "
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Description</span>
                </label>

                <textarea
                  class="textarea textarea-bordered h-24"
                  placeholder="Description"
                  v-model="base.form.description"
                  :disabled="
                    !base.form.status || base.form.status == 'draft'
                      ? false
                      : true
                  "
                ></textarea>
              </div>
              <div class="form-control pt-4">
                <div role="tablist" class="tabs tabs-lifted">
                  <input
                    type="radio"
                    role="tab"
                    class="tab"
                    name="Req"
                    aria-label="Item List"
                    @change="setCheckbox('ItemList')"
                    :checked="tab == 'ItemList' ? true : false"
                  />
                  <div
                    role="tabpanel"
                    class="tab-content bg-base-100 border-base-300 overflow-auto"
                    v-if="tab == 'ItemList'"
                  >
                    <div
                      class="w-full overflow-auto min-h-[20vh] max-h-[20vh] border-2"
                    >
                      <!-- <label class="label cursor-pointer">
                    <span class="label-text">Email</span>
                  </label> -->
                      <table
                        class="table table-xs table-pin-rows table-pin-cols table-zebra"
                      >
                        <thead>
                          <tr>
                            <td>ItemCode</td>
                            <td>Item</td>
                            <td>Issue</td>
                            <th
                              class="text-right"
                              v-if="
                                !base.form.status || base.form.status == 'draft'
                              "
                            >
                              <label
                                for="modal-detail"
                                class="btn btn-primary modal-button btn-xs text-white"
                                @click="detail_create()"
                                >+ new
                              </label>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="hover"
                            v-for="(v, i) in detail.rows"
                            :key="i"
                          >
                            <td>
                              {{ v.item }}
                            </td>
                            <td>
                              <div class="flex items-center space-x-3">
                                <div>
                                  <div class="font-bold">{{ v.title }}</div>
                                  <div class="text-sm">
                                    {{ v.ref_code }}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div class="font-bold">
                                {{ v.issue ? v.issue : 0 }} / {{ v.qty }}
                              </div>
                            </td>

                            <!-- <td>{{ v.price }}</td> -->
                            <!-- <td>
                            <a :href="v.link" target="_blank">
                              <font-awesome-icon
                                v-if="v.link"
                                icon="fa-solid fa-globe"
                                size="1x"
                                class="btn btn-ghost modal-button btn-xs"
                            /></a>
                          </td> -->
                            <th class="text-right" v-if="v.qty != v.issue">
                              <label
                                for="modal-detail"
                                class="btn btn-link modal-button btn-xs"
                                @click="detail_edit(`${v.code}`)"
                              >
                                Issue
                              </label>
                              <!-- |
                          <label
                            for="modal-remove"
                            class="btn btn-ghost modal-button btn-xs"
                            @click="
                              remove_item(
                                `${v.code}`,
                                'detail',
                                'controllers/MYSQL/INTERNAL/QA/Indirect/request_item'
                              )
                            "
                          >
                            ลบ
                          </label> -->
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <input
                    type="radio"
                    role="tab"
                    class="tab"
                    name="Req"
                    aria-label="Transaction"
                    @change="setCheckbox('Transaction')"
                    :checked="tab == 'Transaction' ? true : false"
                  />
                  <div
                    role="tabpanel"
                    class="tab-content bg-base-100 border-base-300 overflow-auto"
                    v-if="tab == 'Transaction'"
                  >
                    <div
                      class="w-full overflow-auto min-h-[20vh] max-h-[20vh] border-2"
                    >
                      <table
                        class="table table-xs table-pin-rows table-pin-cols table-zebra"
                      >
                        <thead>
                          <tr>
                            <!-- <th>#</th> -->
                            <!-- <td>ItemCode</td> -->
                            <td>Item</td>
                            <td>Qty</td>
                            <td>Creation</td>
                            <!-- <td>Updation</td> -->
                            <td>Deletion</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="hover"
                            v-for="(v, i) in log.rows"
                            :key="i"
                          >
                            <!-- <th>
                              {{ i + 1 }}
                            </th>
                            <td>
                              {{ v.item }}
                            </td> -->
                            <td>
                              <div class="flex items-center space-x-3">
                                <div>
                                  <div class="font-bold">{{ v.title }}</div>
                                  <!-- <div>
                                    {{ v.item }}
                                  </div> -->
                                </div>
                              </div>
                            </td>
                            <td>
                              <div class="font-bold">{{ v.qty }}</div>
                            </td>
                            <!-- <td>
                              <div class="font-bold">{{ v.issue }}</div>
                            </td> -->
                            <td>
                              <div>
                                {{
                                  v.created_at &&
                                  $moment(v.created_at).format("YYYY-MM-DD") >
                                    "2000"
                                    ? v.created_at
                                    : "-"
                                }}
                              </div>
                              <div>
                                {{
                                  v.created_fullname
                                    ? v.created_fullname
                                    : "-"
                                }}
                              </div>
                            </td>
                            <!-- <td>
                              <div>
                                {{
                                  v.updated_at &&
                                  $moment(v.updated_at).format("YYYY-MM-DD") >
                                    "2000"
                                    ? v.updated_at
                                    : "-"
                                }}
                              </div>
                              <div>
                                {{
                                  v.updated_fullname
                                    ? v.updated_fullname
                                    : "-"
                                }}
                              </div>
                            </td> -->
                            <td>
                              <div>
                                {{
                                  v.deleted_at &&
                                  $moment(v.deleted_at).format("YYYY-MM-DD") >
                                    "2000"
                                    ? v.deleted_at
                                    : "-"
                                }}
                              </div>
                              <div>
                                {{
                                  v.deleted_fullname
                                    ? v.deleted_fullname
                                    : "-"
                                }}
                              </div>
                            </td>
                            <th class="text-right" v-if="v.qty != v.issue">
                              <!-- <label
                                for="modal-detail"
                                class="btn btn-link modal-button btn-xs"
                                @click="detail_edit(`${v.code}`)"
                              >
                                Remove
                              </label>
                              | -->
                              <label
                                for="modal-remove"
                                class="btn btn-ghost modal-button btn-xs"
                                @click="
                                  remove_item(
                                    `${v.code}`,
                                    'log',
                                    'controllers/MYSQL/INTERNAL/QA/Indirect/transaction'
                                  )
                                "
                              >
                                Remove
                              </label>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="form-control">
                <label class="label">
                  <span class="label-text">Status</span>
                </label>

                <select
                  class="select select-bordered border-base-content w-full"
                  v-model="base.form.newStatus"
                  :disabled="
                    !base.form.status || base.form.status == 'draft'
                      ? false
                      : true
                  "
                >
                  <option disabled selected value="">Select Option</option>
                  <option
                    value="draft"
                    :disabled="!base.form.status ? false : true"
                  >
                    Draft
                  </option>
                  <option
                    value="pending"
                    :disabled="
                      !base.form.status || base.form.status == 'draft'
                        ? false
                        : true
                    "
                  >
                    Request
                  </option>
                  <option value="reject" disabled>Reject</option>
                  <option value="approve" disabled>Approve</option>
                  <option value="finish" disabled>Finish</option>
                </select>
              </div> -->
            </div>

            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <!-- <div class="flex-1 form-control mt-6">
                <label for="modal-base" class="btn btn-danger">Cancel</label>
              </div> -->
              <div class="flex-1 form-control mt-6" @click="base_save()">
                <button class="btn btn-primary text-white">Finish</button>
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
                <label for="modal-remove" class="btn btn-danger">Cancel</label>
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

        <!-- modal detail -->
        <input
          type="checkbox"
          id="modal-detail"
          class="modal-toggle"
          v-model="detail.modal"
        />
        <div class="modal" v-if="detail.modal">
          <div
            class="modal-box relative w-10/12 lg:w-6/12 xl:w-4/12 max-w-full"
          >
            <label
              for="modal-detail"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕</label
            >
            <h3 class="text-lg font-bold">Issue Item</h3>
            <div class="card-body overflow-auto max-h-[60vh] ">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Item</span>
                </label>
                <AppModuleGlobalSelectSearch
                  :placeholder="'Item'"
                  :label="'title'"
                  :code="'code'"
                  :minChar="3"
                  :delay="0.5"
                  :limit="10"
                  :customClass="`w-full input input-bordered border-base-content `"
                  :current="detail.form.item"
                  :refresh="refresh.item"
                  :image="true"
                  @updateValue="
                    (obj) => {
                      detail.form.item = obj ? obj.code : '';
                      detail.form.ref_code = obj ? obj.ref_code : '';
                      detail.form.title = obj ? obj.title : '';
                      detail.form.current_price = obj ? obj.current_price : 0;
                      detail.form.current_price_code = obj
                        ? obj.current_price_code
                        : 0;
                      detail.form.amount = obj ? obj.amount : 0;
                      // base.form.item_short.code = obj.code;
                    }
                  "
                  @stopRefresh="
                    (obj) => {
                      refresh.item_short_code = obj.value;
                    }
                  "
                  :url="`${serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/item`"
                  :param="`&total=1`"
                  :disabled="true"
                />
              </div>
              <!-- <div class="form-control">
                <label class="label">
                  <span class="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Ref Code"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.title"
                  :disabled="true"
                />
              </div> -->

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Amount</span>
                </label>
                <input
                  type="text"
                  placeholder="Amount"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.amount"
                  :disabled="true"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Qty</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Qty"
                    class="input input-bordered border-base-content"
                    v-model="detail.form.qty"
                    disabled
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Issue</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ref Code"
                    class="input input-bordered border-base-content"
                    v-model="detail.form.issue"
                    :disabled="true"
                  />
                </div>
              </div>
              <!-- <div class="form-control">
                <label class="label">
                  <span class="label-text">Current Price</span>
                </label>
                <input
                  type="text"
                  placeholder="Current Price"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.current_price"
                  :disabled="true"
                />
              </div> -->
              <!-- <div class="form-control">
                <label class="label">
                  <span class="label-text">Item Code</span>
                </label>
                <input
                  type="text"
                  placeholder="Item Code"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.item"
                  :disabled="true"
                />
              </div> -->
              <!-- {{detail.form}} -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Add</span>
                </label>
                <input
                  type="number"
                  placeholder="Add"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.addqty"
                />
              </div>
            </div>
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-detail" class="btn btn-danger">Cancel</label>
              </div>
              <div class="flex-1 form-control mt-6">
                <button
                  class="btn btn-primary text-white"
                  :disabled="detail.form.addqty > 0 ? false : true"
                  @click="detail_save('static')"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Open the modal using ID.showModal() method -->

        <!-- The button to open modal -->

        <!-- Put this part before </body> tag -->

        <AppModuleGlobalShowImage :src="imageSrc" />
      </template>
      <template #view>
        <div class="grid grid-cols-1 gap-6 lg:px-10 lg:py-2">
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body overflow-auto">
              <div class="join mt-5 w-full md:justify-center lg:justify-end">
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
                <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white"
                  @click="base_create()"
                  >Create</label
                >
              </div>
              <div class="overflow-x-auto w-full max-h-[60vh]">
                <table
                  class="table table-xs table-pin-rows table-pin-cols table-zebra"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <!-- <td>รูป</td> -->
                      <td>Status/Code</td>
                      <td>Title</td>
                      <td>Description</td>
                      <!-- <td>สิทธิ์การใช้งาน</td> -->
                      <!-- <td>วันที่</td> -->
                      <td>Creation</td>
                      <td>Updation</td>
                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in base.rows" :key="v.code">
                      <th>{{ v.id }}</th>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div>
                              {{ v.status ? v.status : "draft" }}
                            </div>
                            <div>
                              {{ v.code }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{{ v.title }}</td>
                      <td>{{ v.description }}</td>
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
                            <div class="text-xs opacity-30">
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
                            <div class="text-xs opacity-30">
                              {{
                                v.updated_fullname
                                  ? v.updated_fullname
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </td>

                      <th class="text-right">
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                        >
                          {{
                            !v.status || v.status == "draft"
                              ? "Edit"
                              : "Detail"
                          }}
                        </label>

                        <!-- <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/QA/Indirect/request'
                            )
                          "
                          >Remove
                        </label> -->
                      </th>
                    </tr>
                  </tbody>
                </table>
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
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "Department",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
  },
  data() {
    return {
      tab: "ItemList",
      loadimage: false,
      options: {
        penColor: "#c0f",
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
      log: {
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
      imageSrc: null,
    };
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      // console.log("token");
      //console.log(this.$store.getters.user_token);
      return this.$store.getters.user_token;
    },
  },
  methods: {
    setCheckbox(tab) {
      this.tab = tab;
    },
    error() {
      this.loadimage = false;
    },
    loaded() {
      this.loadimage = true;
    },

    change() {
      this.base_search();
    },

    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();

      alert("Open DevTools see the save data.");
      console.log(isEmpty);
      console.log(data);
    },
    // change() {
    //   this.options = {
    //     penColor: "#00f",
    //   };
    // },
    // resume() {
    //   this.options = {
    //     penColor: "#c0f",
    //   };
    // },

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
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/request?total=1&action=approve&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`, (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
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
        description: "",
      };
      this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.base.form.newStatus = this.base.form.status;
      this.detail.rows = [];
      this.base.controll = "edit";
      this.detail_search();
      this.refresh = true;
    },
    base_save() {
      let vm = this;
      this.base.form.status = 'close';

      new Query('base', this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/request`, obj, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
        } else {
          this.base.modal = false;
          const promise_arr = [];
          console.log(this.base.current);
          if (this.base.current == 0) {
            this.base.current = res.row.code;
            let i = this.detail.rows.length;
            this.detail.controll = "create";
            for (i; i > 0; i--) {
              // this.detail.form = {
              //   code: this.detail.rows[i - 1]["code"],
              //   title: this.detail.rows[i - 1]["title"],
              // };
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
      });
    },
    // DETAIL
    detail_search() {
      this.detail.loading = true;
      this.detail_get((res) => {
        // console.log(res)
        this.detail.rows = res.rows;
        this.detail.total = res.total;
        this.detail.next =
          this.detail.page * this.detail.row >= this.detail.total
            ? false
            : true;
        this.detail.back = this.detail.page > 1 ? true : false;
        this.detail.loading = false;

        console.log(this.detail.rows);
      });
    },
    detail_get(callback) {
      new Query('detail','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/request_item?total=1&page=${
          this.detail.page
        }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
          this.detail.q ? `&q=${this.detail.q}` : ""
        }${this.base.current ? `&doc=${this.base.current}` : ``}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    detail_create() {
      // console.log("detail_create");
      // this.clearimage();
      this.detail.current = 0;
      // console.log("callback");
      // this.detail.rows = [];
      this.detail.form = {
        code: "",
        addqty: 0,
        // title: "",
        // price: "",
        // image: [],
        // imageLink: "",
        // color: "",
        // color_code: "",
        // link: "",
      };
      this.detail.controll = "create";
    },
    detail_edit(code) {
      // console.log("detail_edit");
      // this.clearimage();
      // console.log(id,index);
      // setTimeout(() => {
      this.detail.current = code;
      let index = this.detail.rows.findIndex(
        (v) => v.code == this.detail.current
      );
      // this.detail.rows[index] = { ...this.detail.form };
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.form.addqty = 0;
      // this.detail.form.color = this.detail.form.color == "0" ? false : true;

      // console.log(this.detail.form.image);
      // this.detail.form.image.forEach((v, i) => {
      //   // console.log(v);
      //   this.detail.form.image[i] = Object.assign(
      //     {},
      //     this.detail.form.image[i]
      //   );
      // });

      // console.log(this.detail.form);
      // this.detail.form.image = JSON.parse(this.detail.form.image)

      // }, 5000);

      // this.base.form = this.base.rows[index]
      // this.detail.current = index;
      // this.detail_search();

      this.detail.controll = "edit";
    },
    detail_save(type) {
      let obj = {
        ...this.detail.form,
      };
      obj["doc"] = this.base.current;
      obj["qty"] = this.detail.form.addqty;
      obj["price"] = this.detail.form.current_price_code;
      obj["status"] = "export";
      this.detail.controll = "create";
      // console.log(this.detail.form)
      // return
      // console.log(obj);
      // if (this.detail.controll == "edit") {
      //   obj["code"] = this.detail.form.code;
      // }

      new Query('base', this.detail.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction`, obj, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
        } else {
          this.detail.modal = false;

          if (type == "static") {
            this.detail_search();
          }

          // this.base_search();
        }
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
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            // console.log(res);
            this.remove.modal = false;
            this[`${this.remove.controll}_search`]();
          }
          // callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          // callback([]);
          console.error("Error:", error);
        });
    },

    // Log
    log_search() {
      this.log.loading = true;
      this.log_get((res) => {
        this.log.rows = res.rows;
        this.log.total = res.total;
        this.log.next =
          this.log.page * this.log.row >= this.log.total ? false : true;
        this.log.back = this.log.page > 1 ? true : false;
        this.log.loading = false;

        console.log(this.log.rows);
      });
    },
    log_get(callback) {
      new Query('log','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction?total=1&action=all&page=${
          this.log.page
        }${this.log.row ? `&rows=${this.log.row}` : ""}${
          this.log.q ? `&q=${this.log.q}` : ""
        }${this.base.current ? `&doc=${this.base.current}` : ``}`, (res) => {
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
      //console.log(this.user_token);
      this.base_search();
      
    });
  },
  watch: {
    "detail.form.addqty": function (v) {
      let issue = this.detail.form.issue ? this.detail.form.issue : 0;
      let issuemore = this.detail.form.qty - issue;
      if (this.detail.form.addqty > issuemore) {
        console.log(this.detail.form.addqty,issuemore);
        return (this.detail.form.addqty = issuemore);
      }
      else if (this.detail.form.addqty > this.detail.form.amount) {
        console.log("bbbbbA");
        return (this.detail.form.addqty = this.detail.form.amount);
      }
      // this.detail.form.amount
      // this.detail.form.amount
      // this.detail.form.qty
      // this.detail.form.addqty
      // this.detail.form.issue
    },
    tab: function (v) {
      console.log(v);
      if (v == "Transaction") {
        this.log_search();
      } else {
        this.detail_search();
      }
    },
  },
};
</script>
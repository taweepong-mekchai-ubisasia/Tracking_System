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
        <div class="modal-box w-11/12 max-w-5xl">
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">Picking Order</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 60vh">
            <div class="grid gap-3 md:grid-cols-3 grid-cols-1">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Quantation</span><span class="text-xs text-error">{{ msg.quan }}</span>
                </label>
                <input
                  type="text"
                  placeholder="quantation"
                  class="input input-bordered"
                  v-model="base.form.quantation"
                  :readonly="edit"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Customer</span><span class="text-xs text-error">{{ msg.customer }}</span>
                </label>
                <input
                  type="text"
                  placeholder="customer"
                  class="input input-bordered"
                  v-model="base.form.customer"
                  :readonly="edit"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Sending Date</span><span class="text-xs text-error">{{ msg.send_date }}</span>
                </label>
                <input
                  type="date"
                  placeholder="sending date"
                  class="input input-bordered"
                  v-model="base.form.sending_date"
                  :readonly="edit"
                />
              </div>
            </div>
            <div class="form-control mt-5">
              <div class="overflow-x-auto min-h-40 max-h-40 border-2">
                <table
                  class="table table-xs table-pin-rows table-pin-cols table-zebra table-auto"
                >
                  <thead>
                    <tr>
                      <td>Order</td>
                      <td>Product</td>
                      <td>Description</td>
                      <td>Lot No.</td>
                      <td class="text-end">Quantity</td>
                      <td class="text-end">Pack Size</td>
                      <td>Unit</td>
                      <td class="text-end">Net Weight</td>
                      <td class="text-center">Expire Date</td>
                      <th class="text-right" v-if="status == 'picking'">
                        <label
                          for="modal-detail"
                          class="btn btn-primary modal-button btn-xs text-white me-1"
                          @click="detail_create();"
                        >
                          + new
                        </label>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="hover"
                      v-for="(row, index) in detail.rows"
                      :key="index"
                    >
                      <td class="font-bold">{{ index + 1 }}</td>
                      <td>{{ row.parent }}</td>
                      <td>{{ row.descrip }}</td>
                      <td>{{ row.lot }}</td>
                      <td class="text-end">{{ new Intl.NumberFormat("en-US").format(Math.abs(row.quantity)) }}</td>
                      <td class="text-end">{{ new Intl.NumberFormat("en-US").format(row.pack_size) }}</td>
                      <td>{{ row.unit }}</td>
                      <td class="text-end">{{ new Intl.NumberFormat("en-US").format(row.pack_size*Math.abs(row.quantity)) }}</td>
                      <td class="text-center">{{ row.exp }}</td>
                      <th class="text-right" v-if="status == 'picking'">
                        <label
                          for="modal-detail"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="detail_edit(`${row.code}`, `${index}`)"
                        >
                          edit
                        </label>
                        <label
                          for="modal-remove"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${row.code}`,
                              'detail',
                              'api/controllers/MYSQL/INTERNAL/WMS/logs'
                            )
                          "
                          v-if="base.controll != 'create'"
                        >
                          remove
                        </label>
                      </th>
                    </tr>
                  </tbody>
                  <tfoot v-if="detail.rows.length && base.controll != 'create'">
                    <tr class="text-right">
                      <td :colspan="status == 'picking' ? '9' : '8'"></td>
                      <th>Total Quantity : {{ sum }}</th>
                    </tr>
                    <tr class="text-right">
                      <td :colspan="status == 'picking' ? '9' : '8'"></td>
                      <th>Total Net Weight : {{ new Intl.NumberFormat("en-US").format(total_net) }}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div class="grid gap-3 grid-cols-2">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Creator</span>
                </label>
                <input
                  type="text"
                  placeholder="ผู้ทำรายการ"
                  class="input input-bordered"
                  disabled
                  :value="base.form.creator_name ? base.form.creator_name : user.firstname+' '+user.lastname"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Status</span>
                </label>
                <label class="form-control w-full">
                  <select class="select select-bordered" v-model="base.form.status" :disabled="locked">
                    <option disabled selected value="">เลือกรายการ</option>
                    <option value="picking">Picking</option>
                    <option value="packing">Packing</option>
                    <!-- <option value="deliver" disabled>Deliver</option> -->
                  </select>
                </label>
              </div>
            </div>
          </div>
          <hr v-if="!locked" />
          <div
            class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex"
            v-if="!locked"
          >
            <div class="flex-1 form-control mt-6">
              <label for="modal-base" class="btn">Cancel</label>
            </div>
            <div class="flex-1 form-control mt-6">
              <button
                class="btn btn-primary text-white"
                @click="base_save('static')"
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
        <div class="modal-box w-11/12 max-w-2xl">
          <label
            for="modal-detail"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">Product</h3>
          <hr class="mt-5" />
          <div class="card-body" style="max-height: 60vh;">
            <div :class="detail.controll == 'create' ? 'grid gap-3 grid-cols-2 md:grid-cols-2' : 'grid gap-3 grid-cols-3 md:grid-cols-3'">
              <!-- {{ detail.form }} -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Product</span><span class="text-xs text-error">{{ msg.product }}</span>
                </label>
                <AppModuleGlobalSelectSearch
                  v-if="
                    !edit
                  "
                  :placeholder="'product code'"
                  :label="'product'"
                  :code="'product'"
                  :minChar="3"
                  :delay="0.5"
                  :limit="10"
                  :customClass="`input input-bordered ${
                    checkbox == 'M' ? 'input-disabled' : ''
                  }`"
                  :disabled="checkbox == 'M' ? true : false"
                  :current="detail.form.parent"
                  :refresh="refresh.product"
                  @updateValue="
                    (obj) => {
                      // console.log(obj)
                      detail.form.parent = obj.product;
                      detail.form.lot = '';
                      detail.form.descrip = obj.descrip;
                      detail.form.pack_size = obj.pack_size;
                      detail.form.unit = obj.unit;
                      detail.form.exp = '';
                    }
                  "
                  @stopRefresh="
                    (obj) => {
                      refresh.product = obj.value;
                    }
                  "
                  :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/prod`"
                  :param="`&vita=true&received=1&groupby=true&total=1`"
                />
                <input
                  v-else
                  type="text"
                  placeholder="product code"
                  class="input input-bordered"
                  v-model="detail.form.parent"
                  disabled
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Lot No.</span><span class="text-xs text-error">{{ msg.lot }}</span>
                </label>
                <select class="select select-bordered w-full" v-model="detail.form.lot" v-if="!edit">
                  <option value="" disabled selected>Select Lot</option>
                  <option v-for="v in datalist">{{ v.lot }}</option>
                </select>
                <input
                  v-else
                  type="text"
                  placeholder="lot no"
                  class="input input-bordered"
                  v-model="detail.form.lot"
                  disabled
                />
              </div>
              <div class="form-control" v-if="detail.controll == 'create'">
                <label class="label">
                  <span class="label-text font-semibold">Remaining</span>
                </label>
                <input
                  type="text"
                  placeholder="remaining"
                  class="input input-bordered"
                  v-model="detail.form.remain"
                  :readonly="!edit"
                  :disabled="edit"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Picking</span><span class="text-xs text-error">{{ msg.pick }}</span>
                </label>
                <input
                  type="number"
                  placeholder="picking"
                  class="input input-bordered"
                  min="1"
                  v-model="detail.form.quantity"
                />
              </div>
            </div>
            <div class="mt-5 p-3 rounded-lg border-dotted border-2">
              <div class="grid gap-3 grid-cols-1">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Description</span>
                  </label>
                  <input
                    type="text"
                    placeholder="description"
                    class="input input-bordered"
                    v-model="detail.form.descrip"
                    disabled
                  />
                </div>
              </div>
              <div class="grid gap-3 grid-cols-1 md:grid-cols-3">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Pack Size</span>
                  </label>
                  <input
                    type="text"
                    placeholder="packing"
                    class="input input-bordered"
                    v-model="detail.form.pack_size"
                    disabled
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Unit</span>
                  </label>
                  <input
                    type="text"
                    placeholder="unit"
                    class="input input-bordered"
                    v-model="detail.form.unit"
                    disabled
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">EXP Date</span>
                  </label>
                  <input
                    type="text"
                    placeholder="exp date"
                    class="input input-bordered"
                    v-model="detail.form.exp"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div
            class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
          >
            <div class="flex-1 form-control mt-6">
              <label for="modal-detail" class="btn btn-danger">Cancel</label>
            </div>
            <div class="flex-1 form-control mt-6">
              <button
                class="btn btn-primary text-white"
                @click="detail_save('static')"
              >
                Confirm
              </button>
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
      <div class="modal" v-if="remove.modal">
        <div class="modal-box relative">
          <label
            for="modal-remove"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-error">Remove Item!</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 60vh">
            Are your sure for remove this item?
          </div>
          <hr class="" />
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
    </template>
    <template #view>
      <div class="grid grid-cols-1 gap-6 lg:px-9 lg:py-5">
        <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
          <div class="card-body overflow-auto">
            <div class="join mt-5 w-full md:justify-center lg:justify-end">
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
              <label
                for="modal-base"
                class="join-item btn-sm btn btn-primary modal-button text-white"
                @click="base_create()"
                >Create</label
              >
            </div>
            <div class="overflow-x-auto w-full max-h-[60vh] mt-9">
              <table
                  class="table table-xs table-pin-rows table-pin-cols table-zebra"
                >
                  <thead>
                    <tr>
                      <td>Order</td>
                      <td>Quantation</td>
                      <td>Customer</td>
                      <td>Sending Date</td>
                      <td>Creator</td>
                      <td>Status</td>
                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in base.rows" :class="v.status == 'picking' ? 'hover' : 'text-slate-500 hover'">
                      <td class="font-bold">{{ i + 1 }}</td>
                      <td>{{ v.quantation }}</td>
                      <td>{{ v.customer }}</td>
                      <td>{{ v.sending_date }}</td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div>
                              {{ v.creator_name }}
                            </div>
                            <div class="italic">
                              date : {{ v.created_at }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="font-bold">{{ v.status }}</td>
                      <th class="text-right" v-if="v.status == 'picking'">
                        <label
                          for="modal-base"
                          class="join-item btn btn-link no-underline text-warning modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                        >
                          <span class="underline underline-offset-2">Edit</span>
                        </label>
                        |
                        <label
                          for="modal-remove"
                          class="join-item btn btn-link no-underline text-error modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'base',
                              'api/controllers/MYSQL/INTERNAL/WMS/vita'
                            )
                          "
                        >
                        Remove
                        </label>
                      </th>
                      <th class="text-right" v-else>
                        <label
                          for="modal-base"
                          class="join-item btn btn-link no-underline modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                        >
                          <span class="underline underline-offset-2">Detail</span>
                        </label>
                        |
                        <label
                          for="modal-remove"
                          class="join-item btn btn-link no-underline text-error modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'base',
                              'api/controllers/MYSQL/INTERNAL/WMS/vita'
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
  name: "Picking",
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
      status: '',
      sum: 0,
      total_net: 0,
      locked: false,
      edit: false,
      checkbox: "",
      refresh: false,
      tmpsLink: "",
      msg: {
        quan: '',
        customer: '',
        send_date: '',
        product: '',
        lot: '',
        pick: ''
      },
      datalist: [],
      deletes: [],
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
    dateNow() {
      let d = new Date();
      return d.getFullYear() + '-' + (d.getMonth() >= 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
              + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    },
    ymd(start, life) {
      let expire = new Date((new Date(start)).getTime() + life * 86400E3);
      return expire.getFullYear() + '-' + (expire.getMonth() >= 9 ? expire.getMonth() + 1 : '0' + (expire.getMonth() + 1)) + '-' + (expire.getDate() > 9 ? expire.getDate() : '0' + expire.getDate());
    },
    makeid(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      return result;
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
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/vita?status=deliver&total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
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
      this.sum = 0
      this.total_net = 0

      this.msg.quan = ''
      this.msg.customer = ''
      this.msg.send_date = ''

      this.base.current = this.makeid(10);
      this.base.form = {
        code: this.base.current,
        quantation: '',
        customer: '',
        sending: '',
        status: 'picking',
      };
      this.status = 'picking'
  
      this.detail.rows = [];
      this.detail.new = [];
      this.base.controll = "create";
      this.locked = false;
    },
    base_edit(code, index) {
      this.sum = 0
      this.total_net = 0

      this.msg.quan = ''
      this.msg.customer = ''
      this.msg.send_date = ''

      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.detail.rows = [];
      this.detail.new = [];
      this.base.controll = "edit";
      this.detail_search();
      this.refresh = true;
      this.status = this.base.form.status
      this.edit = this.base.form.status == 'picking' ? false : true;
      this.locked = this.base.form.status == 'picking' ? false : true;
    },
    base_save(type) {
      if(!this.base.form.quantation || !this.base.form.customer || !this.base.form.sending_date) {
        if(!this.base.form.quantation) this.msg.quan = '*fill in information*'
        else this.msg.quan = ''
        if(!this.base.form.customer) this.msg.customer = '*fill in information*'
        else this.msg.customer = ''
        if(!this.base.form.sending_date) this.msg.send_date = '*fill in information*'
        else this.msg.pacsend_dateking = ''
        return;
      }

      let obj = {
        rows: [
          {
            code: this.base.form.code,
            quantation : this.base.form.quantation,
            customer : this.base.form.customer,
            sending_date: this.base.form.sending_date,
            status: this.base.form.status,
          },
        ]
      };

      new Query(null, this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/vita`, obj, (res) => {
        if (!res.success) {
        } else {
          if (this.base.controll == 'create') {
            if(this.detail.new.length) {
              let obj = { rows: [] }
              this.detail.new.forEach((x, i) => {
                obj['rows'][i] = {
                  ref_code : this.base.form.code,
                  parent : x.parent,
                  descrip : x.descrip,
                  lot : x.lot,
                  quantity : -x.quantity,
                  exp : x.exp,
                  type: 'pick'
                }
              })

              new Query(null,'post').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs`, obj, (res) => {
                if (!res.success) {
                } else {
                }
              });
            }
          }
          this.base.modal = false;

          if (type == "static") {
            this.base_search();
          }
        }
      });
    },
    // DETAIL
    detail_search() {
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

        this.deletes = res.rows;
      });
    },
    detail_get(callback) {
      new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs?ref_code=${this.base.form.code}`, (res) => {
        if (res.success) {
          res.rows.filter(x => x.code).forEach(x => {
            this.sum += parseFloat(Math.abs(x.quantity))
            x['net_weight'] = Math.abs(x.quantity)*x.pack_size
            this.total_net += x.net_weight
          })

          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    detail_create() {
      this.datalist = []

      this.msg.product = ''
      this.msg.lot = ''
      this.msg.pick = ''

      this.detail.form = {
        parent: "",
        lot: "",
        remain: "",
        quantity: "",
        descrip: "",
        pack_size: "",
        unit: "",
        mfg: "",
      };

      this.detail.controll = "create";
      this.edit = false;
    },
    detail_edit(code, index) {
      this.msg.product = ''
      this.msg.lot = ''
      this.msg.pick = ''
  
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.form.quantity = Math.abs(this.detail.form.quantity)
      this.detail.current = code;
      this.detail.controll = "edit";
      this.refresh = true;
      this.edit = true;
    },
    detail_save(type) {
      if(!this.detail.form.parent || !this.detail.form.lot || !this.detail.form.quantity) {
        if(!this.detail.form.parent) this.msg.product = '*fill in information*'
        else this.msg.product = ''
        if(!this.detail.form.lot) this.msg.lot = '*fill in information*'
        else this.msg.lot = ''
        if(!this.detail.form.quantity) this.msg.pick = '*fill in information*'
        else this.msg.pick = ''
        return;
      }
  
      if (this.base.controll == "create") {
        // console.log(this.detail.rows)
        if(this.detail.rows.find(x => x.lot == this.detail.form.lot)) {
          this.detail.controll == 'create' 
            ? this.detail.rows.find(x => x.lot == this.detail.form.lot).quantity += this.detail.form.quantity 
            : this.detail.rows.find(x => x.lot == this.detail.form.lot).quantity = this.detail.form.quantity
        } else {
          this.detail.rows.push({ ...this.detail.form });
        }
  
        if(this.detail.new.find(x => x.lot == this.detail.form.lot)) {
          this.detail.controll == 'create' 
            ? this.detail.new.find(x => x.lot == this.detail.form.lot).quantity += this.detail.form.quantity
            : this.detail.new.find(x => x.lot == this.detail.form.lot).quantity = this.detail.form.quantity
        } else {
          this.detail.new.push({ ...this.detail.form });
        }
  
        this.detail.modal = false;
      } else {
        let obj = {
          rows: [
            {
              code : this.detail.rows.filter(x => x.parent == this.detail.form.parent).length ? this.detail.rows.find(x => x.parent == this.detail.form.parent).code : this.detail.form.code,
              ref_code : this.base.form.code,
              parent : this.detail.form.parent,
              descrip : this.detail.form.descrip,
              lot : this.detail.form.lot,
              quantity : this.detail.controll == 'create'
                ? this.detail.rows.filter(x => x.parent == this.detail.form.parent).length 
                  ? parseFloat(this.detail.rows.find(x => x.parent == this.detail.form.parent).quantity) - parseFloat(this.detail.form.quantity) 
                  : -this.detail.form.quantity
                : -this.detail.form.quantity,
              exp : this.detail.form.exp,
              type: 'pick'
            },
          ],
        };

        new Query(null, this.detail.rows.filter(x => x.descrip == this.detail.form.descrip).length ? "PUT" : "POST").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs`, obj, (res) => {
          if (!res.success) {
          } else {
            this.detail.modal = false;
  
            if (type == "static") {
              this.detail_search();
            }
          }
        });
      }
    },
    // REMOVE
    remove_item(code, controll, tb) {
      // console.log(code, controll, tb)

      if (controll == 'base') {
        this.base.form.code = code;
        this.detail_search()
      }

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
          rows: [{ code: this.remove.code }]
        }),
      })
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          if (this.remove.controll == 'base') {
            let obj = {
              rows: [
                {
                  ...Object.assign({ ...this.deletes[0] }),
                },
              ]
            };

            fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.user_token}`,
              },
              body: JSON.stringify(obj),
            })
            .then((response) => response.json())
            .then((res) => {
              // console.log(res)
            })
            .catch((error) => {
              callback([]);
              console.error("Error:", error);
            });
          }

          this.sum = 0
          this.total_net = 0
          this.remove.modal = false;
          this[`${this.remove.controll}_search`]();
        }
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
        window.location.origin == "http://localhost:80811"
          ? `http://localhost:8080/kay/rewrite_demo/services/`
          : `${window.location.origin}/services/`
      }tmps/`;
    });
  },
  watch: {
    base: function (v) {
      // console.log(v);
    },
    detail: function (v) {
      // console.log(v);
    },
    "detail.form.parent": function (val) {
      if (val) {
        new Query(null,'get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs?parent=${val}&descrip=${this.detail.form.descrip}&forselect=true&total=1`, (res) => {
          if (res.success) {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });
            this.datalist = [ ...res.rows ]
          }
        });
      }
    },
    "detail.form.lot": function (val) {
      if (val && this.detail.controll == 'create') {
        this.detail.form.remain = this.datalist.find(x => x.lot == val).total_qty
        this.detail.form.exp = this.datalist.find(x => x.lot == val).exp
      }
    },
  }
};
</script>
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
            <h3 class="text-lg font-bold text-primary">Packing Order</h3>
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
                    :readonly="status == 'packing'"
                    :disabled="status == 'deliver'"
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
                    :readonly="status == 'packing'"
                    :disabled="status == 'deliver'"
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
                    :readonly="status == 'packing'"
                    :disabled="status == 'deliver'"
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
                      <!-- <option value="picking" disabled>Picking</option> -->
                      <option value="packing">Packing</option>
                      <option value="deliver">Deliver</option>
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
                <!-- <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white"
                  @click="base_create()"
                  >Create</label
                > -->
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
                    <tr v-for="(v, i) in base.rows" :class="v.status == 'packing' ? 'hover' : 'text-slate-500 hover'">
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
                      <th class="text-right">
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost no-underline modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                        >
                          Detail
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
  name: "Deliver",
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
      edit: false,
      done: false,
      checkbox: "",
      refresh: false,
      tmpsLink: "",
      msg: {
        quan: '',
        packing: '',
        mark: '',
        customer: '',
        picking: '',
        sending: ''
      },
      datalist: [],
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
      },
      detail: {
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
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/vita?status=picking&total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
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
      this.datalist = []
      this.sum = 0
      this.total_net = 0

      this.msg.quan = ''
      this.msg.packing = ''
      this.msg.mark = ''
      this.msg.customer = ''
      this.msg.picking = ''
      this.msg.sending = ''

      this.base.current = this.makeid(15);
      this.base.form = {
        quantation: "",
        packing: "",
        mark: "",
        customer: "",
        picking: "",
        sending_date: "",
        status:'picking'
      };
      this.status = 'picking'

      this.detail.rows = [];
      this.base.controll = "create";
      this.detail_search();
      this.edit = false;
      this.done = false;
    },
    base_edit(code, index) {
      this.datalist = []
      this.detail.rows = [];
      this.sum = 0
      this.total_net = 0

      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.base.controll = "edit";
      this.detail_search();
      this.refresh = true;
      this.status = this.base.form.status
      // this.edit = this.base.form.status == 'packing' ? false : true;
      this.locked = this.base.form.status == 'packing' ? false : true;
    },
    base_save(type) {
      // if(!this.base.form.quantation || !this.base.form.packing || !this.base.form.mark || !this.base.form.customer || !this.base.form.picking || !this.base.form.sending_date) {
      //   if(!this.base.form.quantation) this.msg.quan = '*fill in information*'
      //   else this.msg.quan = ''
      //   if(!this.base.form.packing) this.msg.packing = '*fill in information*'
      //   else this.msg.packing = ''
      //   if(!this.base.form.mark) this.msg.mark = '*fill in information*'
      //   else this.msg.mark = ''
      //   if(!this.base.form.customer) this.msg.customer = '*fill in information*'
      //   else this.msg.customer = ''
      //   if(!this.base.form.picking) this.msg.picking = '*fill in information*'
      //   else this.msg.picking = ''
      //   if(!this.base.form.sending_date) this.msg.sending = '*fill in information*'
      //   else this.msg.sending = ''
      //   return;
      // }

      let obj = {
        rows: [
          {
            code: this.base.form.code,
            quantation: this.base.form.quantation,
            packing: this.base.form.packing,
            mark: this.base.form.mark,
            customer: this.base.form.customer,
            picking: this.detail.rows.find(x => x.doc_name == this.base.form.picking).code,
            sending_date: this.base.form.sending_date,
            status: this.base.form.status,
          },
        ]
      };

      if(this.base.form.status == 'shipping') {
        obj['rows'][0]["shipped_at"] = this.dateNow()
        obj['rows'][0]["shipped_by"] = this.user.code
      }

      if(this.base.form.status == 'received') {
        obj['rows'][0]["received_at"] = this.dateNow()
        obj['rows'][0]["received_by"] = this.user.code
      }

      new Query('base', this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/vita`, obj, (res) => {
        if (!res.success) {
        } else {
          let obj = {
            rows: [
              {
                code: res.rows[0].picking,
                used: this.base.form.status == 'pending' ? 'Y' : 'S'
              },
            ]
          };

          new Query('base','put').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/temp`, obj, (res) => {
            if (!res.success) {
            } else {
              this.base.modal = false;
  
              if (type == "static") {
                this.base_search();
              }
            }
          });
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

        this.base.controll == 'edit' ? this.detail_list() : ''
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
    detail_list() {
      let used = this.detail.rows.find(x => x.code == this.base.form.picking || x.doc_name == this.base.form.picking)
      this.base.form.picking = used.doc_name

      new Query('datalist','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs?ref_code=${used.code}`, (res) => {
        if (res.success) {
          res.rows.filter(x => x.code).forEach(x => {
            this.sum += parseFloat(Math.abs(x.quantity))
            x['net_weight'] = Math.abs(x.quantity)*x.pack_size
            this.total_net += x.net_weight
          })

          this.datalist = res.rows
        }
      });
    },
    // REMOVE
    remove_item(code, controll, tb) {
      // console.log(code, controll, tb)

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
        // console.log(res.rows)

        if (res.success) {
          let obj = {
            rows: [
              {
                code: this.base.rows.find(x => x.code == this.remove.code).picking,
                used: 'N'
              },
            ]
          };

          new Query('base','put').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/temp`, obj, (res) => {
            if (!res.success) {
            } else {
              console.log(res)
            }
          });

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
    }
  }
};
</script>

<style scrop>
  tr,
  td {
    white-space: nowrap;
  }
</style>

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
        <div class="modal-box w-11/12 max-w-sm">
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">Return Request</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 74vh;">
            <div class="grid gap-3 grid-cols-1">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">REF: Delivery Order No.</span>
                </label>
                <AppModuleGlobalSelectSearch
                  :placeholder="'Delivery Order No.'"
                  :label="'sale'"
                  :code="'sale'"
                  :minChar="3"
                  :delay="0.5"
                  :limit="10"
                  :customClass="`input input-bordered ${
                    checkbox == 'M' ? 'input-disabled' : ''
                  } ${base.form.sale ? 'bg-green-50 text-black' : ''}`"
                  :disabled="checkbox == 'M' ? true : false"
                  :current="base.form.sale"
                  :refresh="refresh.sale"
                  @updateValue="
                    (obj) => {
                      base.form.sale = obj.sale;
                      base.form.doc_code = obj.code;
                    }
                  "
                  @stopRefresh="
                    (obj) => {
                      refresh.sale = obj.value;
                    }
                  "
                  :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/vita`"
                  :param="`&d=1&total=1`"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Lot</span>
                </label>
                <AppModuleGlobalSelectSearch
                  :placeholder="'Product Lot'"
                  :label="'lot'"
                  :code="'lot'"
                  :minChar="3"
                  :delay="0.5"
                  :limit="10"
                  :customClass="`input input-bordered ${
                    checkbox == 'M' ? 'input-disabled' : ''
                  } ${base.form.lot ? 'bg-green-50 text-black' : ''}`"
                  :disabled="checkbox == 'M' ? true : false"
                  :current="base.form.lot"
                  :refresh="refresh.lot"
                  @updateValue="
                    (obj) => {
                      base.form.ref_code = obj.ref_code;
                      base.form.lot = obj.lot;
                      base.form.mfg = obj.mfg;
                      base.form.exp = obj.exp;
                      base.form.total_qty = Math.abs(obj.quantity) - Math.abs(obj.return_qty);
                    }
                  "
                  @stopRefresh="
                    (obj) => {
                      refresh.lot = obj.value;
                    }
                  "
                  :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs`"
                  :param="`&doc_code=${base.form.doc_code}&groupby=1&total=1`"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Total Quantity</span>
                </label>
                <input
                  type="number"
                  placeholder="product code"
                  class="input input-bordered border-gray-300"
                  :value="Math.abs(base.form.total_qty)"
                  disabled
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Return Quantity</span>
                </label>
                <input
                  type="number"
                  placeholder="return"
                  class="input input-bordered border-gray-300"
                  v-model="base.form.quantity"
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
            <div class="flex-1 form-control mt-6">
              <button
                class="btn btn-primary text-white"
                @click="base_save('static', 'create')"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- modal issue -->
      <input
        type="checkbox"
        id="modal-issue"
        class="modal-toggle"
        v-model="issue.modal"
      />
      <div class="modal" v-if="issue.modal">
        <div class="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert">
          <div class="flex p-4">
            <div class="flex-shrink-0">
              <svg class="size-5 text-gray-600 mt-1 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </div>
            <div class="ms-4">
              <h3 class="text-error font-semibold dark:text-white underline underline-offset-2">
                System notification
              </h3>
              <div class="mt-2 text-sm text-slate-500 dark:text-neutral-400">
                Are your sure for issue this item?
                <textarea class="textarea textarea-bordered w-full mt-3" placeholder="Remarks" v-model="base.form.remarks"></textarea>
              </div>
              <div class="mt-4">
                <div class="flex space-x-3">
                  <label for="modal-issue" type="label" class="btn btn-xs btn-active decoration-2 font-medium text-xs text-white dark:text-blue-500">
                    Cancel
                  </label>
                  <label class="btn btn-xs btn-error decoration-2 font-semibold text-xs text-white dark:text-blue-500" @click="base_save('static', 'issue')">
                    Confirm
                  </label>
                </div>
              </div>
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
        <div class="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert">
          <div class="flex p-4">
            <div class="flex-shrink-0">
              <svg class="size-5 text-gray-600 mt-1 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </div>
            <div class="ms-4">
              <h3 class="text-error font-semibold dark:text-white underline underline-offset-2">
                System notification
              </h3>
              <div class="mt-2 text-sm text-slate-500 dark:text-neutral-400">
                Are your sure for remove this item?
              </div>
              <div class="mt-4">
                <div class="flex space-x-3">
                  <label for="modal-remove" type="label" class="btn btn-xs btn-active decoration-2 font-medium text-xs text-white dark:text-blue-500">
                    Cancel
                  </label>
                  <label class="btn btn-xs btn-error decoration-2 font-semibold text-xs text-white dark:text-blue-500" @click="confirm_remove()">
                    Confirm
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #view>
      <div class="gap-3 py-3">
        <div class="card card-compact shadow-lg bg-base-100">
          <div class="card-body overflow-auto">
            <div
              v-if="base.loading"
              class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
            >
              <AppModuleGlobalLoadingText
                :type="'text'"
                :class="`p-4 py-12 text-3xl text-center`"
              />
            </div>
            <div class="flex justify-end">
              <label
                for="modal-base"
                class="join-item btn btn-sm btn-primary modal-button text-white shadow"
                @click="base_create()"
              >
                <Icon icon="uil:create-dashboard" width="18" height="18" />
                Create Return
              </label>
            </div>
            <div class="p-2">
              <div class="flex justify-end">
                <AppModuleGlobalSearch
                :class="`join-item input input-sm input-bordered w-full max-w-xs ${base.q ? 'bg-yellow-50 text-black' : ''}`"
                @search="
                  (q) => {
                    base.q = q;
                    base.page = 1;
                    base_search();
                  }
                "
                />
              </div>
              <div class="overflow-x-auto w-full max-h-[60vh] my-3">
                <div v-if="!base.loading && base.rows.length == 0">
                  <AppModuleGlobalEmptyData
                    :class="`p-4 py-12 text-3xl text-center`"
                  />
                </div>
                <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                  <thead>
                    <tr class="italic">
                      <td>Customer</td>
                      <td>REF</td>
                      <td>Product</td>
                      <td>Lot</td>
                      <td>EXP Date</td>
                      <td>Quantity</td>
                      <td colspan="2">Pack Size</td>
                      <td colspan="2">Summary</td>
                      <td>Receiving Date</td>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in base.rows" :key="row.code" class="hover">
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div>
                              {{ row.eng_name }}
                            </div>
                            <div class="text-slate-500">
                              ( {{ row.suda_ch_name }} )
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="font-semibold">
                        <div class="flex items-center space-x-3">
                          <div>
                            <div>
                              {{ row.sale }}
                            </div>
                            <div class="opacity-50">
                              ( {{ row.issue_code ? 'issue' : row.type }} )
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{{ row.stock_desc }}</td>
                      <td>{{ row.lot }}</td>
                      <td>{{ $moment(row.exp).format("DD-MM-YYYY") }}</td>
                      <td class="text-blue-500 font-bold">{{ row.quantity }}</td>
                      <td>{{ row.pack_size }}</td>
                      <td>{{ row.unit }}</td>
                      <td>{{ row.pack_size*row.quantity }}</td>
                      <td>{{ row.unit }}</td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div>
                              {{ $moment(row.created_at).format("DD-MM-YYYY HH:mm:ss") }}
                            </div>
                            <div class="text-slate-500">
                              {{ row.creator_name }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <th v-if="!row.issue_code">
                        <label
                          for="modal-issue"
                          class="join-item btn btn-xs hover:text-white modal-button"
                          @click="issue_select(index)"
                        >
                          issue
                        </label>
                        <label
                          for="modal-remove"
                          class="join-item btn btn-xs btn-ghost text-error hover:text-black modal-button"
                          @click="
                            remove_item(
                              `${row.code}`,
                              'base',
                              'api/controllers/MYSQL/INTERNAL/WMS/logs'
                            )
                          "
                        >
                          remove
                        </label>
                      </th>
                      <th v-else>
                        <td v-if="row.issue_remarks">
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="text-slate-500">
                                Remarks issued
                              </div>
                              <div>
                                - {{ row.issue_remarks }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="text-primary" v-else>
                          This Item Already Picked Up
                        </td>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="grid gap-3 md:grid-cols-2 grid-cols-1">
                <div class="md:text-left text-center text-sm">
                  Show :
                  <select class="select select-bordered select-xs w-fit bg-yellow-50 text-black" 
                    v-model="base.row" 
                    @change="base_search()"
                  >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="25">30</option>
                    <option value="50">10</option>
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
import { socket } from "@/socket";

export default {
  name: "ReturnFormCustomer",
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
      issue: {
        modal: false,
        index: ''
      },
      remove: {
        current: 0,
        modal: false,
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
    exportExcel(controll) {
        // console.log(this.base.form)

      // if (controll == 'base') {
      //   return window.open(`${
      //     this.serviceUrl
      //   }api/controllers/MYSQL/INTERNAL/WMS/exports?for=bylot&forselect=1&total=1${
      //     this.base.q ? `&q=${this.base.q}` : ""
      //   }`);
      // } else {
      //   return window.open(`${
      //     this.serviceUrl
      //   }api/controllers/MYSQL/INTERNAL/WMS/exports?for=forlog&parent=${this.base.form.parent}&descrip=${this.base.form.descrip}&total=1${
      //     this.detail.q ? `&q=${this.detail.q}` : ""
      //   }`);
      // }
    },
    dateNow() {
      let d = new Date();
      return d.getFullYear() + '-' + (d.getMonth() >= 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
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
        setTimeout(() => {
          this.base.rows = res.rows;
          this.base.total = res.total;
          this.base.next =
            this.base.page * this.base.row >= this.base.total ? false : true;
          this.base.back = this.base.page > 1 ? true : false;
          this.base.loading = false;
        }, 200);
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs?wh=VITReturn&return=1&total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
        if (res.success) {
          // console.log(res)

          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    base_create() {
      this.base.current = this.makeid(15);
      this.base.form = {
        code: this.base.current,
        sale: '',
        doc_code: '',
        ref_code: '',
        lot: '',
        exp: '',
        total_qty: '',
        quantity: ''
      };

      this.base.controll = "create";
    },
    // base_edit(code, index) {
    //     this.detail.page = 1
    //     this.base.form = { ...this.base.rows[index] };
    //     this.base.current = code;
    //     this.detail.rows = [];
    //     this.base.controll = "edit";
    //     this.detail_search();
    //     this.refresh = true;
    // },
    base_save(type, action) {
      // console.log(this.detail.form)
      this.base.form['type'] = (action == 'create') ? 'return' : 'issue'
      this.base.form['wh'] = 'VITReturn'

      if (action == 'issue') this.base.form['doc_code'] = null

      let obj = {
        rows: [
          this.base.form
        ],
        socket: socket.id
      }

      socket.emit('logs', obj)
    },
    issue_select(index) {
      this.base.form = this.base.rows[index]
    },
    // REMOVE
    remove_item(code, controll, tb) {
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    confirm_remove() {
      socket.emit('remove', {
        rows: [
          { code: this.remove.code }
        ],
        socket: socket.id
      })
    },
    post_log(res) {
      if (res.socket != socket.id) {
        return
      }

      if (!res.success) {
      } else {
        if (this.base.modal) {
          this.base.modal = false;
        } else {
          this.issue.modal = false;
        }
      }
    },
    remove_log(res) {
      if (res.socket != socket.id) {
        return
      }

      if (!res.success) {
      } else {
        this.remove.modal = false;
        this[`${this.remove.controll}_search`]();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();

      socket.on("logs", this.post_log);
      socket.on("remove", this.remove_log);
    });
  },
  unmounted() {
    socket.off("logs", this.post_log);
    socket.off("remove", this.remove_log);
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
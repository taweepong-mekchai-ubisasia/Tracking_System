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
        <div class="modal-box w-11/12 max-w-4xl">
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">Packing Order</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 66vh;">
            <div class="grid gap-3 md:grid-cols-2 grid-cols-1">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Sale Order No.</span>
                </label>
                <input
                  type="text"
                  placeholder="sale order no."
                  class="input input-bordered"
                  v-model="base.form.sale"
                  :readonly="status != 'delivered'"
                  :disabled="status == 'delivered'"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Sending Date</span>
                </label>
                <input
                  type="date"
                  placeholder="sending date"
                  class="input input-bordered"
                  v-model="base.form.sending_date"
                  :readonly="status != 'delivered'"
                  :disabled="status == 'delivered'"
                />
              </div>
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-semibold">Customer</span>
              </label>
              <div class="join">
                <input
                  type="text"
                  placeholder="eng customer"
                  class="join-item input input-bordered border-gray-300 w-full"
                  :value="base.form.customer_eng"
                  :readonly="!locked"
                  :disabled="locked"
                />
                <input
                  type="text"
                  placeholder="ch customer"
                  class="join-item input input-bordered border-gray-300 w-full"
                  :value="base.form.customer_ch"
                  :readonly="!locked"
                  :disabled="locked"
                />
              </div>
            </div>
            <div class="form-control mt-5">
              <div class="overflow-x-auto min-h-40 max-h-40 border">
                <table class="table table-xs table-pin-rows table-pin-cols table-zebra table-auto">
                  <thead>
                    <tr>
                      <th>Order<br>(Total {{ detail.total }})</th>
                      <td>Product</td>
                      <!-- <td>Description</td> -->
                      <td>Lot No.</td>
                      <td class="text-end">Quantity</td>
                      <td class="text-center" colspan="2">Pack Size</td>
                      <td class="text-center" colspan="2">Net Weight</td>
                      <td class="text-center">Expire Date</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in detail.rows" :key="index">
                      <th class="font-bold">{{ index + 1 }}</th>
                      <!-- <td>{{ row.parent }}</td> -->
                      <td>{{ row.stock_desc }}</td>
                      <td>{{ row.lot }}</td>
                      <td class="text-end">{{ new Intl.NumberFormat("en-US").format(Math.abs(row.quantity)) }}</td>
                      <td class="text-end">{{ new Intl.NumberFormat("en-US").format(row.pack_size) }}</td>
                      <td>{{ row.unit }}</td>
                      <td class="text-end">{{ new Intl.NumberFormat("en-US").format(row.pack_size*Math.abs(row.quantity)) }}</td>
                      <td>{{ row.unit }}</td>
                      <td class="text-center">{{ $moment(row.exp).format("DD-MM-YYYY") }}</td>
                    </tr>
                  </tbody>
                  <tfoot v-if="detail.rows.length && base.controll != 'create'">
                    <tr class="text-right">
                      <td colspan="8"></td>
                      <th>Total Quantity : {{ sum }}</th>
                    </tr>
                    <tr class="text-right">
                      <td colspan="8"></td>
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
                  <select class="select select-bordered border-gray-300" v-model="base.form.status" :disabled="locked">
                    <option disabled selected value="">เลือกรายการ</option>
                    <option value="packing">Packing</option>
                    <option value="delivering">Delivering</option>
                    <option value="delivered">Delivered</option>
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
            <div class="border-2 border-dashed rounded-xl p-2">
              <div class="join w-full">
                <button
                  class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                  disabled
                >
                  Date Type:
                </button>
                <select class="join-item select select-bordered select-sm border-gray-300 w-full shadow"
                  v-model="base.date"
                >
                  <option value="sending_date" selected>sending date</option>
                  <option value="created_at">pick date</option>
                  <option value="packed_at">pack date</option>
                </select>
                <button
                  class="md:block hidden join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                  disabled
                >
                  Start from:
                </button>
                <input type="date" class="join-item input input-bordered input-sm border-gray-300 sm:w-full w-24 shadow"
                  v-model="base.from"
                />
                <button
                  class="md:block hidden join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                  disabled
                >
                  -
                </button>
                <input type="date" class="join-item input input-bordered input-sm border-gray-300 sm:w-full w-24 shadow"
                  v-model="base.to"
                />
                <button class="join-item btn btn-sm btn-active text-white shadow" 
                  @click="searching"
                >
                  <Icon
                    icon="tabler:search"
                    class="text-white"
                    width="18" height="18"
                  />
                  <span class="sm:block hidden">Search</span>
                </button>
              </div>
            </div>
            <div class="p-2">
              <!-- <div class="grid grid-cols-2 gap-3">
                <button
                  class="join-item btn btn-sm btn-outline btn-primary w-fit"
                  @click="exportExcel('base')"
                  disabled
                >
                  <Icon
                    icon="mdi:file-excel-outline"
                    width="16" height="16"
                  />
                    Excel
                </button> -->
                <!-- </div> -->
                <div class="flex justify-end">
                  <AppModuleGlobalSearch
                    :class="'join-item input input-sm input-bordered border-gray-300 w-full md:max-w-xs'"
                    @search="
                      (q) => {
                        base.q = q;
                        base.page = 1;
                        base_search();
                      }
                    "
                  />
                </div>
              <!-- </div> -->
              <div class="overflow-x-auto w-full max-h-[59vh] my-3">
                <table class="table table-xs table-pin-rows table-pin-cols table-zebra">
                  <thead>
                    <tr class="italic">
                      <th>Sale Order No.</th>
                      <td>Status</td>
                      <td>Customer</td>
                      <td>Sending</td>
                      <td>Pick</td>
                      <td>Pack</td>
                      <td colspan="2">Deliver</td>
                      <th class="text-center">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, i) in base.rows"
                    >
                    <!-- :class="row.status == 'delivered' ? 'text-emerald-700' : row.status == 'delivering' ? 'text-amber-700' : ''" -->
                      <th>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div>
                              {{ row.sale }}
                            </div>
                            <div class="opacity-50">
                              ( Code: {{ row.code }} )
                            </div>
                          </div>
                        </div>
                      </th>
                      <td>
                        <span 
                          class="badge badge-sm font-semibold italic px-4 py-2 w-20 text-base-100" 
                          :class="row.status == 'delivered' ? 'badge-success' : row.status == 'delivering' ? 'badge-warning' : 'badge-info'">
                            {{ row.status }}
                        </span>
                      </td>
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
                      <td class="italic">{{ $moment(row.sending_date).format("DD-MM-YYYY") }}</td>
                      <!-- <td><span class="badge badge-sm font-semibold italic" :class="row.status == 'delivered' ? 'badge-success text-success-content' : row.status == 'delivering' ? 'badge-warning text-warning-content' : index & 1 ? 'badge-white' : 'badge-ghost'">{{ row.status }}</span></td> -->
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
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div>
                              {{ row.packed_at ? $moment(row.packed_at).format("DD-MM-YYYY HH:mm:ss") : '-' }}
                            </div>
                            <div class="text-slate-500" v-if="row.packed_at">
                              {{ row.packer_name || '-' }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div class="text-right">
                            <div>
                              delivering at :
                            </div>
                            <hr>
                            <div>
                              delivered at :
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div>
                              {{ row.delivering_at ? $moment(row.delivering_at).format("DD-MM-YYYY HH:mm:ss")  : '-' }}
                            </div>
                            <hr v-if="row.delivering_at">
                            <div v-if="row.delivering_at">
                              {{ row.delivered_at ? $moment(row.delivered_at).format("DD-MM-YYYY HH:mm:ss")  : '-' }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <th class="text-center">
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs text-slate-500 hover:text-black"
                          @click="base_edit(`${row.code}`, `${i}`)"
                        >
                          <span class="underline underline-offset-2">detail</span>
                        </label>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="grid gap-3 md:grid-cols-2 grid-cols-1">
                <div class="md:text-left text-center text-sm">
                  Show :
                  <select class="select select-bordered select-xs w-fit bg-yellow-50" 
                    v-model="base.row" 
                    @change="base_search()"
                  >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
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
    AppModuleGlobalLoadingText
  },
  data() {
    return {
      status: '',
      sum: 0,
      total_net: 0,
      refresh: false,
      base: {
        rows: [],
        total: 0,
        page: 1,
        row: 15,
        q: "",
        date: "sending_date",
        from: "",
        to: "",
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
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
    searching() {
      this.base.page = 1;
      this.base_search();
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
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/vita?packed=1&d=1&total=1&page=${this.base.page}
        ${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}
        &date=${this.base.date}&from=${this.base.from ? this.base.from : ''}&to=${this.base.to  ? this.base.to : ''}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    base_edit(code, index) {
      this.detail.rows = [];
      this.sum = 0
      this.total_net = 0

      this.base.form = { ...this.base.rows[index] };
      this.base.form.customer_ch = this.base.form.suda_ch_name
      this.base.form.customer_eng = this.base.form.eng_name

      this.base.current = code;
      this.base.controll = "edit";
      this.detail_search();
      this.refresh = true;
      this.status = this.base.form.status
      this.locked = this.base.form.status == 'delivered' ? true : false;
    },
    base_save(type) {
      let obj = {
        rows: [
          {
            code: this.base.form.code,
            status: this.base.form.status,
          },
        ]
      };

      if(this.base.form.status == 'delivering') {
        obj['rows'][0]["delivering_at"] = this.dateNow()
        obj['rows'][0]["delivering_by"] = this.user.code
      }

      if(this.base.form.status == 'delivered') {
        obj['rows'][0]["delivered_at"] = this.dateNow()
        obj['rows'][0]["delivered_by"] = this.user.code
      }

      new Query(null, 'put').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/vita`, obj, (res) => {
        if (!res.success) {
        } else {
          // new Query(null,'get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs?ref_code=${this.base.form.code}&total=1`, (res) => {
          //   if (res.success) {
              let obj = { rows: [] }
              // console.log(this.detail.rows)
              this.detail.rows.forEach((x, i) => {
                obj['rows'][i] = {
                  code: x.code,
                  type: this.base.form.status == 'delivering' ? 'carry' : 'issue'
                }
              })
              // console.log(obj)

              new Query(null,'put').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs`, obj, (res) => {
                if (!res.success) {
                } else {
                  this.base.modal = false;

                  if (type == "static") {
                    this.base_search();
                  }
                }
              });
          //   }
          // })
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
      });
    },
    detail_get(callback) {
      new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs?doc_code=${this.base.form.code}&asc=1&total=1`, (res) => {
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
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();
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

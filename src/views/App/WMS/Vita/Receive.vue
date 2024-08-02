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
            <h3 class="text-lg font-bold text-primary">Vita Receive</h3>
            <hr class="mt-5" />
              <div class="card-body overflow-auto" style="max-height: 60vh">
                <div class="grid gap-3 grid-cols-2 md:grid-cols-3">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-semibold">Customer </span>
                    </label>
                    <input
                      type="text"
                      placeholder="customer"
                      class="input input-bordered"
                      :value="base.form.customer || 'Vita'"
                      disabled
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-semibold">EN </span>
                    </label>
                    <input
                      type="text"
                      placeholder="en"
                      class="input input-bordered"
                      v-model="base.form.en"
                      readonly
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-semibold">Ref </span>
                    </label>
                    <input
                      type="text"
                      placeholder="ref"
                      class="input input-bordered"
                      v-model="base.form.ref"
                      readonly
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-semibold">Packing List </span>
                    </label>
                    <input
                      type="text"
                      placeholder="packing list"
                      class="input input-bordered"
                      v-model="base.form.packing"
                      readonly
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-semibold">Shipping Mark </span>
                    </label>
                    <input
                      type="text"
                      placeholder="shipping mark"
                      class="input input-bordered"
                      v-model="base.form.shipping_mark"
                      readonly
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-semibold">Shipping Date </span>
                    </label>
                    <input
                      type="date"
                      placeholder="shipping date"
                      class="input input-bordered"
                      v-model="base.form.shipping_date"
                      readonly
                    />
                  </div>
                </div>
                <div class="mt-5">
                  <div class="overflow-x-auto min-h-40 max-h-40 border-2">
                    <table
                      class="table table-xs table-pin-rows table-pin-cols table-zebra table-auto"
                    >
                      <thead>
                        <tr>
                          <td>Order</td>
                          <td>Product</td>
                          <td>Description</td>
                          <!-- <td>Shelf Life</td> -->
                          <td class="text-right">Quantity</td>
                          <td class="text-right">Pack Size</td>
                          <td>Unit</td>
                          <td class="text-right">Net Weight</td>
                          <td>Latest Receive</td>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(row, index) in detail.rows"
                          :key="index"
                          :class="row.already_have == row.total_qty ? 'text-secondary hover:text-primary' : 'hover'"
                        >
                          <td class="font-bold">{{ index + 1 }}</td>
                          <td>{{ row.product }}</td>
                          <td>{{ row.descrip }}</td>
                          <!-- <td>{{ row.shelf_life }}</td> -->
                          <td class="text-right">{{ new Intl.NumberFormat("en-US").format(Math.abs(row.already_have)) }} / {{ new Intl.NumberFormat("en-US").format(Math.abs(row.total_qty)) }}</td>
                          <td class="text-right">{{ new Intl.NumberFormat("en-US").format(Math.abs(row.pack_size)) }}</td>
                          <td>{{ row.unit }}</td>
                          <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.net_weight) }}</td>
                          <td v-if="base.form.status == 'receiving' || base.form.status == 'received'">
                            <div class="flex items-center space-x-3">
                              <div class="italic">
                                <div>
                                  date : {{ row.updated_at ? row.updated_at.split(' ')[0] : '-' }}
                                </div>
                                <div>
                                  time : {{ row.updated_at ? row.updated_at.split(' ')[1] : '-' }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td v-else>-</td>
                          <th class="text-right" v-if="row.already_have == row.total_qty">
                            <label
                              for="modal-detail"
                              class="btn btn-ghost modal-button btn-xs"
                              @click="detail_edit(`${row.code}`, `${index}`)"
                            >
                              <span class="underline underline-offset-2 text-secondary hover:text-primary">Received</span>
                            </label>
                          </th>
                          <th class="text-right" v-else>
                            <label
                              class="btn btn-ghost modal-button btn-xs"
                              @click="printPaper(row.code); build = !build"
                            >
                              <span class="underline underline-offset-2">Print</span>
                            </label>
                            |
                            <label
                              for="modal-detail"
                              class="btn btn-ghost modal-button btn-xs"
                              @click="detail_edit(`${row.code}`, `${index}`)"
                            >
                              Detail
                            </label>
                          </th>
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
                      <span class="label-text font-semibold">Transaction Maker</span>
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
                      <select class="select select-bordered" v-model="base.form.status" disabled>
                        <option disabled selected value="">เลือกรายการ</option>
                        <option value="shipping">Shipped</option>
                        <option value="receiving">Receiving</option>
                        <option value="received">Received</option>
                      </select>
                    </label>
                  </div>
                </div>
              <div id="printMe" class="landscape:hidden">
                <div style="display: flex; justify-content: center;" v-for="row in datalist" v-if="build">
                  <div style="white-space: nowrap;" align="center">
                    <h1 :style="`font-size: 60px;`">{{ base.form.en }} ({{ base.form.ref }})</h1>
                    <h1 :style="`font-size: 60px;`">PALLET NO. {{ row.pallet }}/{{ datalist.length }}</h1>
                    <h1 :style="`font-size: 60px;`">
                      {{ detail.rows.find(x => x.code == detailcode).product }} 
                      = {{ row.total }} x {{ detail.rows.find(x => x.code == detailcode).pack_size }} {{ detail.rows.find(x => x.code == detailcode).unit }}
                    </h1>
                    <div v-for="v in row.item" v-if="row.item.length">
                      <h1 :style="`font-size: 60px;`">LOT NO. {{ v.lot }} = {{ v.qty }}</h1>
                    </div>
                    <div v-else>
                      <h1 :style="`font-size: 60px;`">LOT NO. {{ row.item.lot }} = {{ row.item.qty }}</h1>
                    </div>
                    <table style="width: 100%">
                      <tr>
                        <td>
                          <VueQRCodeComponent :text="'http://192.168.11.1/UAT-tin/WMS/Vita/ScanToReceive?'+detailcode+'&'+row.pallet+'&'+row.total" :size="114" />
                        </td>
                        <td>
                          <vue-barcode :value="detailcode+'&'+row.pallet+'&'+row.total" :options="{ displayValue: false, width: 2.25, height: 112.5 }" tag="img"/>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div style="break-after:page"></div>
                </div>
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
          <div class="modal-box w-12/12 max-w-2xl">
            <label
              for="modal-detail"
              class="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 class="text-lg font-bold text-primary">Product</h3>
            <hr class="mt-5" />
            <div class="card-body overflow-auto" style="max-height: 60vh">
              <div class="grid gap-3 grid-cols-2 md:grid-cols-2">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Product</span>
                  </label>
                  <input
                    type="text"
                    placeholder="short code"
                    class="input input-bordered"
                    v-model="detail.form.product"
                    disabled
                  />
                </div>
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
              <div class="grid gap-3 grid-cols-3 md:grid-cols-3">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Shelf Life</span>
                  </label>
                  <input
                    type="text"
                    placeholder="shelf life"
                    class="input input-bordered"
                    v-model="detail.form.shelf_life"
                    disabled
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Packing</span>
                  </label>
                  <input
                    type="text"
                    placeholder="packing"
                    class="input input-bordered"
                    v-model="detail.form.pack_size"
                    :disabled="detail.form.pack_size == 'None' ? false : true"
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
                    :disabled="detail.form.unit == 'None' ? false : true"
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
                        <td>Lot No.</td>
                        <td>MFG</td>
                        <td>EXP</td>
                        <td>Latest Receive</td>
                        <td class="text-right">Quantity</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        :class="row.already_have == row.quantity ? 'text-slate-500 hover' : 'hover'"
                        v-for="(row, index) in item.rows"
                        :key="index"
                      >
                        <td class="font-bold">{{ index + 1 }}</td>
                        <td>{{ row.lot }}</td>
                        <td>{{ row.mfg }}</td>
                        <td>{{ row.exp }}</td>
                        <td>
                            <div class="flex items-center space-x-3">
                              <div class="italic">
                                <div>
                                  date : {{ row.received_at ? row.received_at.split(' ')[0] : '-' }}
                                </div>
                                <div>
                                  time : {{ row.received_at ? row.received_at.split(' ')[1] : '-' }}
                                </div>
                              </div>
                            </div>
                          </td>
                        <td class="text-right">{{ new Intl.NumberFormat("en-US").format(Math.abs(row.already_have || 0)) }} / {{ new Intl.NumberFormat("en-US").format(Math.abs(row.quantity)) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
              </div>
              <div class="overflow-x-auto w-full max-h-[60vh] mt-9">
                <table
                  class="table table-xs table-pin-rows table-pin-cols table-zebra"
                >
                  <thead>
                    <tr>
                      <td>Order</td>
                      <td>EN</td>
                      <td>Ref</td>
                      <td>Shipping Date</td>
                      <td>Transaction Maker</td>
                      <td>Transaction</td>
                      <td>Status</td>
                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in base.rows" :key="row.code" :class="row.status == 'received' ? 'text-slate-500 hover' : 'hover'">
                      <td class="font-bold">{{ index + 1 }}</td>
                      <td>{{ row.en }}</td>
                      <td>{{ row.ref }}</td>
                      <td>{{ row.shipping_date }}</td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div>
                              {{ row.creator_name }}
                            </div>
                            <div class="italic">
                              date : {{ row.created_at }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="italic">
                              shipped at :  {{ row.shipped_at || '-' }}
                            </div>
                            <div class="italic">
                              received at : {{ row.received_at || '-' }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="font-bold">{{ row.status == 'shipping' ? 'shipped' : row.status }}</td>
                      <th class="text-right">
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${row.code}`, `${index}`)"
                          ><Icon icon="bx:detail" />Detail
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
import VueQRCodeComponent from "vue-qrcode-component";
import VueBarcode from '@chenfengyuan/vue-barcode';
import Query from "@/assets/js/fetch.js";

export default {
  name: "Receive",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    VueQRCodeComponent,
    VueBarcode,
  },
  data() {
    return {
      detailcode: '',
      build: false,
      sum: 0,
      total_net: 0,
      checkbox: "",
      refresh: false,
      tmpsLink: "",
      datalist: [],
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
      item: {
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
    }
  },
  methods: {
    printPaper (data) {
      this.detailcode = data
      this.datalist = JSON.parse(this.detail.rows.find(x => x.code == data).received)
      // console.log(this.detailcode, this.datalist)

      setTimeout(() => {
        this.$htmlToPaper('printMe', {styles:['/landscape.css']})
      }, 1000);
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
        this.base.rows = res.rows;
        this.base.total = res.total;
        this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
        this.base.back = this.base.page > 1 ? true : false;
        this.base.loading = false;
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/trans?status=pending&total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}`, (res) => {
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
      this.build = false
      this.sum = 0
      this.total_net = 0

      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.detail.rows = [];
      this.base.controll = "edit";
      this.detail_search();
      this.refresh = true;
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
      new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/prod?trans_code=${this.base.form.code}`, (res) => {
        if (res.success) {
          let checklist = []
          res.rows.filter(x => x.code).forEach((x, i) => {
            this.sum += parseFloat(x.total_qty)
            x['net_weight'] = x.total_qty*x.pack_size
            this.total_net += x.net_weight
  
            checklist[i] = JSON.parse(x.received) ? JSON.parse(x.received).filter(y => y.checked == true).reduce((a, b) => { return { total: a.total + b.total } }, { total: 0 }) : { total: 0 }
            x['already_have'] = checklist[i].total
          }) 

          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    detail_edit(code, index) {
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.current = code;
      this.item.rows = [];
      this.detail.controll = "edit";
      this.item_search();
      this.refresh = true;
    },
    // Item
    item_search() {
      this.item.loading = true;
      this.item_get((res) => {
        this.item.rows = res.rows;
        this.item.total = res.total;
        this.item.next =
          this.item.page * this.item.row >= this.item.total
            ? false
            : true;
        this.item.back = this.item.page > 1 ? true : false;
        this.item.loading = false;
      });
    },
    item_get(callback) {
      new Query('item','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/item?prod_code=${this.detail.form.code}&total=1`, (res) => {
        if (res.success) {
          if(this.detail.form.received) {
            let receive = JSON.parse(this.detail.form.received)
            let checklist = []
            res.rows.forEach((x, i) => {
              checklist[i] = 0
              receive.filter(y => y.checked).forEach(a => a.item.length ? (a.item.find(c => c.lot == x.lot) ? checklist[i] += a.item.find(c => c.lot == x.lot).qty : '') : a.item.lot == x.lot ? checklist[i] += a.item.qty : '')
              x['already_have'] = checklist[i]
            })
          }

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
      this.tmpsLink = `${
        window.location.origin == "http://localhost:80811"
          ? `http://localhost:8080/kay/rewrite_demo/services/`
          : `${window.location.origin}/services/`
      }tmps/`;
    });
  },
  watch: {}
};
</script>
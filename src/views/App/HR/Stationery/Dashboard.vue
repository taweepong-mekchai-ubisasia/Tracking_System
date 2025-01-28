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
          <div class="card-body overflow-auto" style="max-height: 76vh;">
            <div class="grid gap-3 md:grid-cols-3 grid-cols-1">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Sale Order No.</span><span class="text-xs text-error">{{ msg.sale }}</span>
                </label>
                <input
                  type="text"
                  placeholder="sale order no."
                  class="input input-bordered border-gray-300"
                  v-model="base.form.sale"
                  :disabled="edit"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Customer</span><span class="text-xs text-error">{{ msg.customer }}</span>
                </label>
                <input
                  type="text"
                  placeholder="customer"
                  class="input input-bordered border-gray-300"
                  v-model="base.form.customer"
                  :disabled="edit"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Sending Date</span><span class="text-xs text-error">{{ msg.send_date }}</span>
                </label>
                <input
                  type="date"
                  placeholder="sending date"
                  class="input input-bordered border-gray-300"
                  v-model="base.form.sending_date"
                  :disabled="edit"
                />
              </div>
            </div>
            <div class="form-control mt-5">
              <div class="overflow-x-auto min-h-40 max-h-40 border">
                <table class="table table-xs table-pin-rows table-pin-cols table-zebra table-auto">
                  <thead>
                    <tr>
                      <td>Order (Total {{ detail.total }})</td>
                      <td>Product</td>
                      <td>Description</td>
                      <td>Lot No.</td>
                      <td class="text-end">Quantity</td>
                      <td class="text-center" colspan="2">Pack Size</td>
                      <td class="text-center" colspan="2">Net Weight</td>
                      <td class="text-center">Expire Date</td>
                      <th class="text-right" v-if="status == 'picking'">
                        <label
                          for="modal-detail"
                          class="btn btn-primary modal-button btn-xs text-white me-1"
                          @click="detail_create();"
                        >
                          + new
                        </label>
                        <label
                          for="modal-qr"
                          class="btn btn-secondary modal-button btn-xs text-white"
                          @click="select = !select; scan = true"
                        >
                          # scan
                        </label>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="text-center" v-if="msg.detail">
                      <td colspan="10">
                        <span class="text-xs text-error">{{ msg.detail }}</span>
                      </td>
                    </tr>
                    <tr v-for="(row, index) in detail.rows" :key="index">
                      <td class="font-bold">Order No. {{ index + 1 }}</td>
                      <td>{{ row.parent }}</td>
                      <td>{{ row.descrip }}</td>
                      <td>{{ row.lot }}</td>
                      <td class="text-end">{{ new Intl.NumberFormat("en-US").format(Math.abs(row.quantity)) }}</td>
                      <td class="text-end">{{ new Intl.NumberFormat("en-US").format(row.pack_size) }}</td>
                      <td>{{ row.unit }}</td>
                      <td class="text-end">{{ new Intl.NumberFormat("en-US").format(row.pack_size*Math.abs(row.quantity)) }}</td>
                      <td>{{ row.unit }}</td>
                      <td class="text-center">{{ $moment(row.exp).format("DD-MM-YYYY") }}</td>
                      <th class="text-right" v-if="status == 'picking'">
                        <label
                          for="modal-detail"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="detail_edit(`${row.code}`, `${index}`)"
                        >
                          edit
                        </label>
                        <span class="mx-1" v-if="base.controll != 'create'">|</span>
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
                      <td :colspan="status == 'picking' ? '10' : '9'"></td>
                      <th>Total Quantity : {{ sum }}</th>
                    </tr>
                    <tr class="text-right">
                      <td :colspan="status == 'picking' ? '10' : '9'"></td>
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
                    <option value="picking">Picking</option>
                    <option value="packing">Packing</option>
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
          <div class="card-body overflow-auto" style="max-height: 76vh;">
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
                  class="input input-bordered border-gray-300"
                  v-model="detail.form.parent"
                  disabled
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Lot No.</span><span class="text-xs text-error">{{ msg.lot }}</span>
                </label>
                <select class="select select-bordered w-full border-gray-300" v-model="detail.form.lot" v-if="!edit">
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
                  class="input input-bordered border-gray-300"
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
                  class="input input-bordered border-gray-300"
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
                    type="date"
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
          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
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
      <!-- qr modal -->
      <input
        type="checkbox"
        id="modal-qr"
        class="modal-toggle"
        v-model="qrmodal.modal"
      />
      <div class="modal" v-if="qrmodal.modal">
        <div class="modal-box">
          <label
            for="modal-qr"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            @click="select = !select; scan = !scan"
          >
            ✕
          </label>
          <div class="form-control my-3">
            <label class="label cursor-pointer">
              <span class="label-text">QR Code</span> 
              <input type="checkbox" class="toggle toggle-sm" v-model="choose" />
              <span class="label-text">Barcode</span> 
            </label>
          </div>
          <qrcode-stream
            @detect="onDetect"
            @error="onError"
            @camera-on="onReady"
            :track="selected.value"
            :formats="['code_128', 'qr_code', 'ean_13', 'ean_8']"
            class="max-h-lg max-w-lg border-dashed border-2 p-2"
            v-if="!choose"
          ></qrcode-stream>
          <div class="max-h-lg max-w-lg border-dashed border-2 p-2" v-else>
            <AppModuleGlobalScannerDetect
              class="my-20"
              @response="
                (res) => {
                  input = res
                }
              "
            />
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
      <div class="grid grid-cols-1 gap-6 lg:px-9 lg:py-3">
        <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
          <div class="card-body overflow-auto">
            <div class="grid md:grid-cols-2 grid-cols-1">
              <div class="flex justify-start join mb-1">
                <button
                  class="join-item btn btn-sm btn-outline btn-primary md:w-24 w-1/2"
                  @click="exportExcel('base')"
                  disabled
                >
                  <Icon
                  icon="mdi:file-excel-outline"
                  class="h-5 w-5"
                  />
                  Excel
                </button>
                <label
                  for="modal-base"
                  class="join-item btn btn-sm btn-primary modal-button text-white md:w-20 w-1/2"
                  @click="base_create()"
                >
                  Create
                </label>
              </div>
              <div class="join flex justify-end w-full mb-1">
                <select class="join-item select select-bordered select-sm border-gray-300" style="width: 25%;" 
                  v-model="base.date"
                  @change="
                    base.page = 1;
                    base_search();
                  "
                >
                  <option value="sending_date" selected>sending date</option>
                  <option value="created_at">created date</option>
                  <option value="packed_at">packed date</option>
                </select>
                <input type="date" class="join-item input input-bordered input-sm border-gray-300" style="width: 25%;"
                  v-model="base.from"
                  @change="
                    base.page = 1;
                    base_search();
                  "
                />
                <input type="date" class="join-item input input-bordered input-sm border-gray-300" style="width: 25%;" 
                  v-model="base.to"
                  @change="
                    base.page = 1;
                    base_search();
                  "
                />
                <AppModuleGlobalSearch
                  :class="'join-item input input-sm input-bordered border-gray-300'"
                  style="width: 25%;"
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
            <div class="overflow-x-auto w-full max-h-[60vh] border">
              <table class="table table-pin-rows table-pin-cols table-zebra">
                <thead>
                  <tr>
                    <th>Sale Order No.</th>
                    <td>Customer</td>
                    <td>Sending Date</td>
                    <td class="text-center">Status</td>
                    <td>Pick by</td>
                    <td>Pick at</td>
                    <td>Pack by</td>
                    <td>Pack at</td>
                    <th class="text-center">Options</th>
                  </tr>
                </thead>
                <tbody class="text-xs">
                  <tr v-if="base.total" v-for="(row, i) in base.rows" :class="row.status == 'picking' ? 'text-rose-700' : ''">
                    <th class="font-bold">{{ row.sale }}</th>
                    <td>{{ row.customer }}</td>
                    <td>{{ $moment(row.sending_date).format("DD-MM-YYYY") }}</td>
                    <td class="text-center"><span class="badge font-semibold text-xs" :class="row.status == 'picking' ? 'badge-error text-white' : i & 1 ? '' : 'badge-ghost'">{{ row.status }}</span></td>
                    <td>{{ row.creator_name }}</td>
                    <td>{{ $moment(row.created_at).format("DD-MM-YYYY HH:MM:SS") }}</td>
                    <td>{{ row.packer_name || '-' }}</td>
                    <td>{{ row.packed_at ? $moment(row.packed_at).format("DD-MM-YYYY HH:MM:SS") : '-' }}</td>
                    <th class="text-right text-black" v-if="row.status == 'picking'">
                      <label
                        for="modal-base"
                        class="join-item btn btn-ghost text-warning hover:text-black modal-button btn-xs"
                        @click="base_edit(`${row.code}`, `${i}`)"
                      >
                        <span class="underline underline-offset-2">Edit</span>
                      </label>
                      |
                      <label
                        for="modal-remove"
                        class="join-item btn btn-ghost text-error hover:text-black modal-button btn-xs"
                        @click="
                          remove_item(
                            `${row.code}`,
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
                        class="join-item btn btn-ghost text-slate-500 hover:text-black modal-button btn-xs"
                        @click="base_edit(`${row.code}`, `${i}`)"
                      >
                        <span class="underline underline-offset-2">Detail</span>
                      </label>
                      |
                      <label
                        for="modal-remove"
                        class="join-item btn btn-ghost text-error hover:text-black modal-button btn-xs"
                        @click="
                          remove_item(
                            `${row.code}`,
                            'base',
                            'api/controllers/MYSQL/INTERNAL/WMS/vita'
                          )
                        "
                      >
                        Remove
                      </label>
                    </th>
                  </tr>
                  <tr v-else>
                    <td class="text-center" colspan="9">No Data Found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="grid gap-3 grid-cols-2 mt-1">
              <div class="text-left text-sm">
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
import AppModuleGlobalScannerDetect from "@/components/App/Module/Global/ScannerDetect.vue";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import VueQRCodeComponent from "vue-qrcode-component";
import VueBarcode from '@chenfengyuan/vue-barcode';
import { useToast } from "vue-toastification";
import Query from "@/assets/js/fetch.js";

export default {
  name: "PickAndPack",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalScannerDetect,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
    VueQRCodeComponent,
    VueBarcode,
  },
  setup() {
    const toast = useToast();

    return {
      toast
    }
  },
  data() {
    const option = [
      { text: "nothing (default)", value: undefined },
      { text: "outline", value: this.paintOutline },
      { text: "centered text", value: this.paintCenterText },
      { text: "bounding box", value: this.paintBoundingBox },
    ];
    const selected = option[1];

    return {
      camera: 'auto',
      selected: selected,
      choose: false,
      select: false,
      scan: false,
      input: '',
      status: '',
      sum: 0,
      total_net: 0,
      locked: false,
      edit: false,
      checkbox: "",
      refresh: false,
      msg: {
        sale: '',
        customer: '',
        send_date: '',
        product: '',
        lot: '',
        pick: '',
        detail: ''
      },
      datalist: [],
      deletes: [],
      base: {
        rows: [],
        total: 0,
        page: 1,
        row: 10,
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
      },
      temp: {
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
      qrmodal: {
        modal: false,
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
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
    paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height },
        } = detectedCode;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#007bff";
        ctx.strokeRect(x, y, width, height);
      }
    },
    paintCenterText(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const { boundingBox, rawValue } = detectedCode;

        const centerX = boundingBox.x + boundingBox.width / 2;
        const centerY = boundingBox.y + boundingBox.height / 2;

        const fontSize = Math.max(
          12, (50 * boundingBox.width) / ctx.canvas.width
        );
        // console.log(boundingBox.width, ctx.canvas.width);

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = "center";

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#35495e";
        ctx.strokeText(detectedCode.rawValue, centerX, centerY);

        ctx.fillStyle = "#5cb984";
        ctx.fillText(rawValue, centerX, centerY);
      }
    },
    onDetect(detectedCodes) {
      let ar = JSON.stringify(detectedCodes[0].rawValue);
      // console.log(ar)

      this.scan_search(ar, 'qr')
    },
    onReady(capabilities) {
      // console.log(capabilities);
    },
    onError(error) {
      if (error.name === "NotAllowedError") {
        console.log("user denied camera access permission");
      } else if (error.name === "NotFoundError") {
        console.log("no suitable camera device installed");
      } else if (error.name === "NotSupportedError") {
        console.log("page is not served over HTTPS (or localhost)");
      } else if (error.name === "NotReadableError") {
        console.log("maybe camera is already in use");
      } else if (error.name === "OverconstrainedError") {
        console.log("did you request the front camera although there is none?");
      } else if (error.name === "StreamApiNotSupportedError") {
        console.log("browser seems to be lacking features");
      }
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
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/vita?p=1&total=1&page=${this.base.page}
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
    base_create() {
      this.sum = 0
      this.total_net = 0

      this.msg.sale = ''
      this.msg.customer = ''
      this.msg.send_date = ''
      this.msg.detail = ''

      this.base.current = this.makeid(10);
      this.base.form = {
        code: this.base.current,
        sale: '',
        customer: '',
        sending: '',
        status: 'picking',
      };
      this.status = 'picking'
  
      this.detail.rows = [];
      this.detail.new = [];
      this.base.controll = "create";
      this.edit = false;
      this.locked = false;
    },
    base_edit(code, index) {
      this.sum = 0
      this.total_net = 0

      this.msg.sale = ''
      this.msg.customer = ''
      this.msg.send_date = ''
      this.msg.detail = ''

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
      if(!this.base.form.sale || !this.base.form.customer || !this.base.form.sending_date) {
        if(!this.base.form.sale) this.msg.sale = '*fill in information*'
        else this.msg.sale = ''
        if(!this.base.form.customer) this.msg.customer = '*fill in information*'
        else this.msg.customer = ''
        if(!this.base.form.sending_date) this.msg.send_date = '*fill in information*'
        else this.msg.send_date = ''
        return;
      } else {
        this.msg.sale = ''
        this.msg.customer = ''
        this.msg.send_date = ''
      }

      if(this.base.form.status == 'packing') {
        if(!this.detail.rows.length) {
          this.msg.detail = '*Add Product before sending*'
          return;
        }
      }

      let obj = {
        rows: [
          {
            code: this.base.form.code,
            sale : this.base.form.sale,
            customer : this.base.form.customer,
            sending_date: this.base.form.sending_date,
            status: this.base.form.status,
          },
        ]
      };

      if(this.base.form.status == 'packing') {
        obj['rows'][0]["packed_at"] = this.dateNow()
        obj['rows'][0]["packed_by"] = this.user.code
      }

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
                  // console.log(res)
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
      this.sum = 0
      this.total_net = 0

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
      new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs?ref_code=${this.base.form.code}&asc=1&total=1`, (res) => {
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
        if(this.detail.rows.find(x => x.lot == this.detail.form.lot)) {
          this.detail.controll == 'create' 
            ? this.detail.rows.find(x => x.lot == this.detail.form.lot).quantity + this.detail.form.quantity > this.detail.form.remain
              ? this.detail.rows.find(x => x.lot == this.detail.form.lot).quantity = this.detail.form.remain
              : this.detail.rows.find(x => x.lot == this.detail.form.lot).quantity + this.detail.form.quantity
            : this.detail.rows.find(x => x.lot == this.detail.form.lot).quantity = this.detail.form.quantity
        } else {
          this.detail.rows.push({ ...this.detail.form });
        }

        if(this.detail.new.find(x => x.lot == this.detail.form.lot)) {
          this.detail.controll == 'create' 
          ? this.detail.new.find(x => x.lot == this.detail.form.lot).quantity + this.detail.form.quantity > this.detail.form.remain
            ? this.detail.new.find(x => x.lot == this.detail.form.lot).quantity = this.detail.form.remain
            : this.detail.new.find(x => x.lot == this.detail.form.lot).quantity + this.detail.form.quantity
          : this.detail.new.find(x => x.lot == this.detail.form.lot).quantity = this.detail.form.quantity
        } else {
          this.detail.new.push({ ...this.detail.form });
        }
  
        this.msg.detail = ''
        this.detail.modal = false;
      } else {
        let obj = {
          rows: [
            {
              code : this.detail.rows.filter(x => x.lot == this.detail.form.lot).length ? this.detail.rows.find(x => x.lot == this.detail.form.lot).code : this.detail.form.code,
              ref_code : this.base.form.code,
              parent : this.detail.form.parent,
              descrip : this.detail.form.descrip,
              lot : this.detail.form.lot,
              quantity : this.detail.controll == 'create'
                ? this.detail.rows.filter(x => x.lot == this.detail.form.lot).length 
                  ? parseFloat(this.detail.rows.find(x => x.lot == this.detail.form.lot).quantity) - ( this.detail.form.quantity > this.detail.form.remain ? parseFloat(this.detail.form.remain) : parseFloat(this.detail.form.quantity) )
                  : -this.detail.form.quantity
                : this.detail.form.quantity > this.datalist.find(x => x.lot == this.detail.form.lot).total_qty
                  ? ( this.datalist.find(x => x.lot == this.detail.form.lot).total_qty > Math.abs(this.detail.rows.find(x => x.lot == this.detail.form.lot).quantity) ? -this.datalist.find(x => x.lot == this.detail.form.lot).total_qty : this.detail.rows.find(x => x.lot == this.detail.form.lot).quantity ) 
                  : -this.detail.form.quantity,
              exp : this.detail.form.exp,
              type: 'pick'
            },
          ],
        };

        new Query(null, this.detail.rows.filter(x => x.lot == this.detail.form.lot).length ? "PUT" : "POST").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs`, obj, (res) => {
          if (!res.success) {
          } else {
            this.msg.detail = ''
            this.detail.modal = false;
  
            if (type == "static") {
              this.detail_search();
            }
          }
        });
      }
    },
    // Scan
    scan_search(data , session) {
      this.scan = !this.scan

      if (data.indexOf('ubis') == -1) {
        this.toast.error(`It's not UBIS ${session}code.`, {
          position: "top-center",
          timeout: 4000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: false,
          draggable: true,
          draggablePercent: 0.5,
          showCloseButtonOnHover: true,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false
        });

        return;
      }

      let used
      // เช็ค QR หรือ Barcode
      if (session == 'qr') {
        used = data.split('"')[1].split('?')[1].split('&')
      } else {
        used = data.split('&')
      }
      this.code = used[0]
      this.sheet = used[1]
      this.floor = used[2]

      this.temp.loading = true;
      this.scan_get((res) => {
        this.temp.rows = res.rows;
        this.temp.total = res.total;
        this.temp.next =
        this.temp.page * this.temp.row >= this.temp.total
          ? false
          : true;
        this.temp.back = this.temp.page > 1 ? true : false;
        this.temp.loading = false;

        if (this.temp.rows == undefined) return;

        if (this.temp.rows.length) {
          let obj = { rows: [] }
          this.temp.rows.forEach((x, i) => {
            if (this.detail.rows.filter(d => d.lot == x.lot).length) {
              obj['rows'][0] = {
                code : this.detail.rows.find(d => d.lot == x.lot).code,
                quantity : parseFloat(this.detail.rows.find(d => d.lot == x.lot).quantity) - parseFloat(x.quantity),
              }
            } else {
              obj['rows'][0] = {
                ref_code : this.base.form.code,
                parent : x.parent,
                descrip : x.descrip,
                lot : x.lot,
                quantity : -x.quantity,
                exp : x.exp,
                type: 'pick'
              }
            }

            new Query(null,this.detail.rows.filter(d => d.lot == x.lot).length ? 'put' : 'post').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs`, obj, (res) => {
              if (!res.success) {
              } else {
                this.toast.success(`Finished adding products.`, {
                  position: "top-center",
                  timeout: 4000,
                  closeOnClick: true,
                  pauseOnFocusLoss: true,
                  pauseOnHover: false,
                  draggable: true,
                  draggablePercent: 0.5,
                  showCloseButtonOnHover: true,
                  hideProgressBar: true,
                  closeButton: "button",
                  icon: true,
                  rtl: false
                });

                this.qrmodal.modal = false
                this.detail_search()
              }
            });
          })
        } else {
          this.toast.error(`Not found data.`, {
            position: "top-center",
            timeout: 4000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: false,
            draggable: true,
            draggablePercent: 0.5,
            showCloseButtonOnHover: true,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          });
        }
      });
    },
    scan_get(callback) {
      new Query('temp','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs?ref_code=${this.code}&pallet=${this.sheet}&type=add&request=0`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    // REMOVE
    remove_item(code, controll, tb) {
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
    });
  },
  watch: {
    base: function (v) {
      // console.log(v);
    },
    detail: function (v) {
      // console.log(v);
    },
    select: function (v) {
      // console.log(v)
      if (!v) {
        this.choose = false
      }
    },
    input: function(v) {
      // console.log(v)
      if (v) {
        if (this.select) {
          this.scan_search(v, 'bar')
          setTimeout(() => {
            this.input = ''
          }, 500);
        }
      }
    },
    "detail.form.parent": function (val) {
      // console.log(val)
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
      // console.log(val)
      if (val && this.detail.controll == 'create') {
        this.detail.form.remain = this.datalist.find(x => x.lot == val).total_qty
        this.detail.form.exp = this.datalist.find(x => x.lot == val).exp
      }
    },
  }
};
</script>

<style scrop>
  tr,
  td {
    white-space: nowrap;
  }
</style>

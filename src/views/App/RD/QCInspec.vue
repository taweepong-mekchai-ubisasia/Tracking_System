<template>
  <div class="Home">
    <AppLayout ref="AppLayout">
      <template #modal>
        <input
          type="checkbox"
          id="modal-base"
          ref="base"
          class="modal-toggle"
          v-model="modal.base"
        />
        <div class="modal">
          <div
            class="modal-box max-w-[100vw] relative text-center m-0 p-0 max-h-[90vh] overflow-auto"
          >
            <!-- <div class="navbar absolute top-0 left-0 bg-transparent z-10 "> -->
            <div class="absolute top-0 left-0 bg-transparent z-10 w-full">
              <div class="flex-1"></div>
              <div class="flex-none">
                <label
                  for="modal-base"
                  class="btn btn-sm btn-ghost absolute right-2 top-2"
                  >✕</label
                >
              </div>
            </div>

            <div class="card-body" v-if="base.form">
              <div class="flex flex-col-reverse">
                <div
                  class="grid items-start w-full gap-2 p-2"
                  :class="`grid-cols-${base.form.pallets}`"
                  v-for="l in parseInt(base.form.levels)"
                  :key="l"
                >
                  <div
                    class="grid flex-grow place-items-center"
                    v-for="p in parseInt(base.form.pallets)"
                    :key="p"
                  >
                    <div class="stats stats-vertical shadow-lg w-full">
                      <div class="stat bg-primary p-3 pb-1">
                        <div class="stat-title font-bold text-sm relative">
                          {{ base.form.rac }}-{{ base.form.bay }}-{{ l }}-{{
                            p
                          }}

                          <div class="float-right">
                            <button
                              class="btn btn-xs bg-white text-black border-white w-full"
                              @click="
                                detail_create(
                                  base.form.rac,
                                  base.form.bay,
                                  l,
                                  p
                                )
                              "
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="stat w-full">
                          <div class="overflow-x-auto max-h-[30vh]">
                            <table
                              class="table table-xs table-pin-rows table-pin-cols"
                            >
                              <thead>
                                <tr>
                                  <td>Item</td>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(v, i) in detail.rows.filter(
                                    (v2) =>
                                      v2.rac_layout == base.form.code &&
                                      v2.level == l &&
                                      v2.pallet == p
                                  )"
                                  :key="i"
                                >
                                  <td>
                                    {{
                                      `${v.item_code} #${v.batch} = ${v.unit}x${v.pack_size}=${v.quantitys} ${v.uom}`
                                    }}
                                  </td>
                                  <th class="text-right">
                                    <button
                                      class="btn btn-xs btn-warning"
                                      @click="
                                        detail_edit(v.rac, v.bay, l, p, v)
                                      "
                                    >
                                      <font-awesome-icon
                                        icon="fa-solid fa-pen"
                                      />
                                    </button>
                                  </th>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <input
          type="checkbox"
          id="modal-detail"
          ref="detail"
          class="modal-toggle"
          v-model="modal.detail"
        />
        <div class="modal">
          <div class="modal-box relative text-center m-0 p-0">
            <div class="navbar relative top-0 left-0 bg-transparent z-10">
              <div class="flex-1 px-4">
                <h2 class="card-title">ISSUE ON SHELF</h2>
              </div>
              <div class="flex-none">
                <label for="modal-detail" class="btn btn-sm btn-ghost float-end"
                  >✕</label
                >
              </div>
            </div>

            <div
              class="card-body pb-8 pt-0 max-h-[70vh] overflow-auto"
              v-if="detail.form"
            >
              <div class="card-body bg-primary">
                <h2 class="card-title">
                  Shelf Details :
                  {{ `${temp.rac}-${temp.bay}-${temp.level}-${temp.pallet}` }}

                  <!-- {{ this.detail.current }}

                  {{ detail.form }} -->
                </h2>
              </div>
              <div class="card-body bg-base-200" v-if="detail.form.code">
                <div class="flex w-full gap-4">
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label cursor-pointer">
                        <h2 class="card-title">เลือกการจัดการ</h2>
                      </label>
                      <select
                        class="select select-bordered w-full"
                        v-model="checkbox"
                      >
                        <option disabled selected value="">เลือกรายการ</option>
                        <option value="O">
                          ISSUE ( ตัดสินค้าออกจาก Shelf )
                        </option>
                        <option value="M">
                          MOVE ( ย้ายสินค้าจาก Shelf ไปยัง Shelf อื่นๆ )
                        </option>
                        <option value="E" v-if="!detail.form.ref">
                          EDIT ( แก้ไขรายการ Shelf )
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="flex w-full gap-4" v-if="checkbox == 'M'">
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">RACK-BAY</span></label
                      >
                      <select
                        class="select select-bordered w-full"
                        v-model="detail.form.rac_data"
                      >
                        <option disabled selected value="">...</option>
                        <option :value="v" v-for="(v, i) in rac.rows">
                          {{ v.rac }}-{{ v.bay }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <!-- <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">BAY</span></label
                      >
                      <select
                        class="select select-bordered w-full"
                        v-model="detail.form.bay"
                        :class="`${detail.form.rac ? '' : 'select-disabled'}`"
                        :disabled="!detail.form.rac"
                      >
                        <option disabled selected value="">...</option>
                        <option :value="v.bay" v-for="(v, i) in bay.rows">
                          {{ v.bay }}
                        </option>
                      </select>
                    </div>
                  </div> -->
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">LEVEL</span></label
                      >
                      <select
                        v-if="detail.form.rac_data"
                        class="select select-bordered w-full"
                        v-model="detail.form.level"
                      >
                        <option disabled selected value="">...</option>
                        <option
                          :value="v"
                          v-for="v in parseInt(detail.form.rac_data.levels)"
                          :key="v"
                        >
                          {{ v }}
                        </option>
                      </select>

                      <select
                        v-else
                        class="select select-bordered w-full select-disabled"
                        disabled
                      >
                        <option disabled selected value="">...</option>
                      </select>
                    </div>
                  </div>
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">PALLET</span></label
                      >
                      <select
                        v-if="detail.form.rac_data"
                        class="select select-bordered w-full"
                        v-model="detail.form.pallet"
                      >
                        <option disabled selected value="">...</option>
                        <option
                          v-for="v in parseInt(detail.form.rac_data.pallets)"
                          :key="v"
                        >
                          {{ v }}
                        </option>
                      </select>

                      <select
                        v-else
                        class="select select-bordered w-full select-disabled"
                        disabled
                      >
                        <option disabled selected value="">...</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="checkbox || !detail.form.code">
                <div class="grid grid-cols-2 w-full gap-4">
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Short code</span>
                      </label>
                      <SelectSearch
                        v-if="
                          (modal.detail && detail.controll == 'create') ||
                          checkbox == 'E'
                        "
                        :placeholder="'Short code'"
                        :label="'ItemCode'"
                        :code="'ItemCode'"
                        :minChar="3"
                        :delay="0.5"
                        :limit="10"
                        :customClass="`input input-bordered ${
                          checkbox == 'M' ? 'input-disabled' : ''
                        }`"
                        :disabled="checkbox == 'M' ? true : false"
                        :current="detail.form.item_code"
                        :refresh="refresh"
                        @updateValue="updateValue"
                        @stopRefresh="
                          (obj) => {
                            refresh = obj.value;
                          }
                        "
                        :url="`${this.serviceUrl}controllers/SAP/UBA/oitm`"
                        :param="`&total=1&wh=wh1&rac_list=1`"
                      />

                      <input
                        v-else
                        type="text"
                        placeholder="Item Code"
                        class="input input-bordered input-disabled"
                        required=""
                        v-model="detail.form.item_code"
                        disabled
                      />
                    </div>
                  </div>

                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Lot Number</span>
                      </label>

                      <input
                        type="text"
                        placeholder="Lot Number"
                        class="input input-bordered"
                        required=""
                        v-model="detail.form.batch"
                        :disabled="
                          detail.controll != 'create' && checkbox != 'E'
                        "
                      />
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 w-full gap-4">
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Item Code</span>
                      </label>
                      <SelectSearch
                        v-if="
                          (modal.detail && detail.controll == 'create') ||
                          checkbox == 'E'
                        "
                        :placeholder="'Item Code'"
                        :label="'ItemCode'"
                        :code="'ItemCode'"
                        :minChar="3"
                        :delay="0.5"
                        :limit="10"
                        :customClass="`input input-bordered ${
                          checkbox == 'M' ? 'input-disabled' : ''
                        }`"
                        :disabled="checkbox == 'M' ? true : false"
                        :current="detail.form.item_code"
                        :refresh="refresh"
                        @updateValue="updateValue"
                        @stopRefresh="
                          (obj) => {
                            refresh = obj.value;
                          }
                        "
                        :url="`${this.serviceUrl}controllers/SAP/UBA/oitm`"
                        :param="`&total=1&wh=wh1&rac_list=1`"
                      />

                      <input
                        v-else
                        type="text"
                        placeholder="Item Code"
                        class="input input-bordered input-disabled"
                        required=""
                        v-model="detail.form.item_code"
                        disabled
                      />
                    </div>
                  </div>

                  <!-- <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Lot Number</span>
                      </label>

                      <input
                        type="text"
                        placeholder="Lot Number"
                        class="input input-bordered"
                        required=""
                        v-model="detail.form.batch"
                        :disabled="
                          detail.controll != 'create' && checkbox != 'E'
                        "
                      />
                    </div>
                  </div> -->
                </div>
                <div
                  class="grid grid-cols-2 w-full gap-4"
                  v-if="detail.controll == 'create'"
                >
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Item Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Item Name"
                        class="input input-bordered"
                        required=""
                        v-model="detail.form.item.ItemName"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Shelf life</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Shelf life"
                        class="input input-bordered"
                        required=""
                        v-model="detail.form.item.U_Agin"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="grid grid-cols-2 w-full gap-4"
                  v-if="detail.controll == 'edit'"
                >
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Item Name</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Item Name"
                        class="input input-bordered"
                        required=""
                        v-model="detail.form.item_name"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Shelf life</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Shelf life"
                        class="input input-bordered"
                        required=""
                        v-model="detail.form.shelf_life"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 w-full gap-4">
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Receive Date</span>
                      </label>
                      <input
                        type="date"
                        placeholder="title"
                        class="input input-bordered"
                        required=""
                        v-model="detail.form.receive_date"
                        :disabled="detail.controll == 'edit' && checkbox != 'E'"
                      />
                    </div>
                  </div>
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Manufacture Date</span>
                      </label>
                      <input
                        type="date"
                        placeholder="title"
                        class="input input-bordered"
                        required=""
                        v-model="detail.form.manufacturing_date"
                        :disabled="detail.controll == 'edit' && checkbox != 'E'"
                      />
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-4 w-full gap-4">
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
                        v-model="detail.form.unit"
                      />
                    </div>
                  </div>
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Pack Size</span></label
                      ><input
                        type="number"
                        placeholder="Pack Size"
                        class="input input-bordered"
                        required=""
                        min="1"
                        max="5"
                        v-model="detail.form.pack_size"
                        :disabled="detail.controll == 'edit' && checkbox != 'E'"
                      />
                    </div>
                  </div>
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Quantity</span></label
                      ><input
                        type="number"
                        placeholder="Quantity"
                        class="input input-bordered input-disabled"
                        required=""
                        min="1"
                        max="5"
                        v-model="detail.form.quantitys"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Unit</span></label
                      >
                      <input
                        v-if="detail.form.item"
                        type="text"
                        placeholder="Unit"
                        class="input input-bordered input-disabled w-full"
                        v-model="detail.form.item.UomCode"
                        readonly
                      />
                      <input
                        v-else
                        type="text"
                        placeholder="Unit"
                        class="input input-bordered w-full input-disabled"
                        required=""
                        v-model="detail.form.uom"
                        readonly
                      />
                    </div>
                  </div>
                </div>
                <div
                  class="flex w-full gap-4"
                  v-if="detail.controll != 'create'"
                >
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text"
                          >Previous comments</span
                        ></label
                      >
                      <textarea
                        class="textarea textarea-bordered h-24"
                        v-model="detail.form.oldcomments"
                        placeholder="Comments"
                        disabled
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="flex w-full gap-4">
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Comments</span></label
                      >
                      <textarea
                        class="textarea textarea-bordered h-24"
                        v-model="detail.form.comments"
                        placeholder="Comments"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="form-control mt-6" @click="detail_save()">
                  <button class="btn btn-primary">บันทึก</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #view>
        <div role="tablist" class="tabs tabs-lifted">
          <input
            type="radio"
            role="tab"
            class="tab"
            name="WH"
            aria-label="Factory"
            :checked="wh.tab == 'factory' ? true : false"
            @change="setCheckbox('factory')"
          />
          <div
            role="tabpanel"
            class="tab-content bg-base-100 border-base-300"
            v-if="wh.tab == 'factory'"
          >
            <FGModule />
          </div>
          <input
            type="radio"
            role="tab"
            class="tab"
            name="WH"
            aria-label="External"
            @change="setCheckbox('external')"
            :checked="wh.tab == 'external' ? true : false"
          />
          <div
            role="tabpanel"
            class="tab-content bg-base-100 border-base-300"
            v-if="wh.tab == 'external'"
          >
            <PDModule />
          </div>
          <input
            type="radio"
            role="tab"
            class="tab"
            name="WH"
            aria-label="Stock"
            @change="setCheckbox('stock')"
            :checked="wh.tab == 'stock' ? true : false"
          />
          <div
            role="tabpanel"
            class="tab-content bg-base-100 border-base-300"
            v-if="wh.tab == 'stock'"
          >
            <RMModule />
          </div>
          <input
            type="radio"
            role="tab"
            class="tab"
            name="WH"
            aria-label="Transaction"
            @change="setCheckbox('Transaction')"
            :checked="wh.tab == 'Transaction' ? true : false"
          />
          <div
            role="tabpanel"
            class="tab-content bg-base-100 border-base-300"
            v-if="wh.tab == 'Transaction'"
          >
            <TFGModule />
          </div>
          <!-- </div>

        <div role="tablist" class="tabs tabs-lifted" v-if="wh.select == 'external'"> -->

          <!-- <input
            type="radio"
            role="tab"
            class="tab"
               name="WH"
            aria-label="Stock"
            @change="setCheckbox('external', 'stock')"
            :checked="wh.select=='external' && wh.tab=='stock'?true:false"
          />
          <div role="tabpanel" class="tab-content bg-base-100 border-base-300" v-if="wh.select=='external' && wh.tab=='stock'">
            <StockModule />
          </div> -->
          <!-- <input
            type="radio"
            role="tab"
            class="tab"
               name="WH"
            aria-label="Transaction"
            @change="setCheckbox('external', 'Transaction')"
            :checked="wh.select=='external' && wh.tab=='Transaction'?true:false"
          />
          <div role="tabpanel" class="tab-content bg-base-100 border-base-300" v-if="wh.select=='external' && wh.tab=='Transaction'">
            <TransactionModule />
          </div> -->
        </div>
      </template>
    </AppLayout>
  </div>
</template>

<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";

import SelectSearch from "@/components/App/Module/Global/SelectSearch.vue";

import FGModule from "@/components/App/Module/RD/QCInspace/FG.vue";
import PDModule from "@/components/App/Module/RD/QCInspace/PD.vue";
import RMModule from "@/components/App/Module/RD/QCInspace/RM.vue";
import TFGModule from "@/components/App/Module/RD/QCInspace/TFG.vue";

export default {
  name: "Home",
  components: {
    AppLayout,
    SelectSearch,
    FGModule,
    PDModule,
    RMModule,
    TFGModule,
  },
  props: ["showLogin", "showtokens", "token_gameplay"],
  data() {
    return {
      wh: { tab: "factory" },
      // wh: "factory",
      layout: {
        wh1: false,
        wh2: false,
      },
      checkbox: "",
      refresh: false,
      rac: {
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

      modal: {
        base: false,

        detail: false,
      },
      base: {
        rows: [],
        total: 0,
        page: 1,
        bay: 20,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: null,
      },
      detail: {
        rows: [],
        total: 0,
        page: 1,
        bay: 20,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: null,
        controll: "",
      },
      rac: {
        rows: [],
        total: 0,
        page: 1,
        bay: 20,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: null,
      },
      bay: {
        rows: [],
        total: 0,
        page: 1,
        bay: 20,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: null,
      },
      temp: {},
      // wh: null,
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
    updateValue(obj) {
      this.detail.form.item = obj;
    },
    setCheckbox(tab) {
      this.wh = {
        tab: tab,
      };
    },
    clickRac(obj) {
      this.modal.base = true;
      this.base.form = obj;
      this.detail_search();
    },

    // detail
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
      fetch(
        `${this.serviceUrl}controllers/MYSQL/INTERNAL/WH/shelf?rac_layout=${this.base.form.code}&transref=I&transref_type_null=1`,
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
    detail_create(rac, bay, l, p) {
      this.modal.detail = true;
      this.temp.rac = rac;
      this.temp.bay = bay;
      this.temp.level = l;
      this.temp.pallet = p;
      this.detail.current = 0;
      this.detail.form = {
        receive_date: this.$moment(new Date()).format("YYYY-MM-DD"),
      };
      this.detail.form.item = {};
      this.detail.controll = "create";
    },
    detail_edit(rac, bay, l, p, v) {
      this.refresh = true;
      this.temp.rac = rac;
      this.temp.bay = bay;
      this.temp.level = l;
      this.temp.pallet = p;
      this.modal.detail = true;
      this.detail.form = { ...v };
      this.detail.form.rac_data = "";
      this.detail.form.oldcomments = this.detail.form.comments;
      this.detail.form.comments = "";
      this.detail.form.item = {};
      // this.detail.current = v.code;
      this.detail.controll = "edit";
      this.checkbox = "";

      this.detail.form.backupUnit = this.detail.form.unit;
    },
    detail_save() {
      if (this.checkbox == "M") {
        if (
          !this.detail.form.rac_data ||
          !this.detail.form.level ||
          !this.detail.form.pallet
        ) {
          return alert("เลือกข้อมูลไม่ครบ");
        }
      }
      if (this.detail.controll == "create") {
        this.detail.form.rac_layout = this.base.form.code;
        this.detail.form.level = this.temp.level;
        this.detail.form.pallet = this.temp.pallet;
      } else {
        // this.detail.from.code = this.detail.current
        this.detail.form.rac_layout = this.detail.form.rac_data.code;
      }

      // this.detail.form.doc_num = "A"

      this.detail.form.item
        ? (this.detail.form.item_code = this.detail.form.item.ItemCode)
        : "";
      this.detail.form.item
        ? (this.detail.form.item_name = this.detail.form.item.ItemName)
        : "";
      this.detail.form.item
        ? (this.detail.form.shelf_life = this.detail.form.item.U_Agin)
        : "";
      this.detail.form.item
        ? (this.detail.form.uom = this.detail.form.item.UomCode)
        : "";
      // this.detail.form.comments = "comments";
      this.detail.form.transref = this.checkbox ? this.checkbox : "I";
      // this.detail.form.comments = "comments";
      fetch(`${this.serviceUrl}controllers/MYSQL/INTERNAL/WH/shelf`, {
        method: this.detail.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({ ...this.detail.form }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            this.modal.detail = false;
            this.detail_search();
            // console.log(vm.detail.form);

            // console.log(vm.layout);
            // console.log(this.detail.form);
            this.layout[this.detail.form.wh] = true;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    // getRacList
    rac_search() {
      this.rac.loading = true;
      this.rac_get((res) => {
        this.rac.rows = res.rows;
        this.rac.total = res.total;
        this.rac.next =
          this.rac.page * this.rac.row >= this.rac.total ? false : true;
        this.rac.back = this.rac.page > 1 ? true : false;
        this.rac.loading = false;
      });
    },
    rac_get(callback) {
      fetch(
        `${this.serviceUrl}controllers/MYSQL/INTERNAL/WH/layout?total=1&wh=wh1&rac_list=1`,
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
            // res.rows.forEach((v, i) => {
            //   res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            //   res.rows[i].master = 0;
            // });
          }
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

    // bay
    bay_search() {
      this.bay.loading = true;
      this.bay_get((res) => {
        this.bay.rows = res.rows;
        this.bay.total = res.total;
        this.bay.next =
          this.bay.page * this.bay.row >= this.bay.total ? false : true;
        this.bay.back = this.bay.page > 1 ? true : false;
        this.bay.loading = false;
      });
    },
    bay_get(callback) {
      fetch(
        `${this.serviceUrl}controllers/MYSQL/INTERNAL/WH/layout?total=1&wh=wh1&bay_list=1&rac=${this.detail.form.rac}`,
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
            // res.rows.forEach((v, i) => {
            //   res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            //   res.rows[i].master = 0;
            // });
          }
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
      // !this.user.access["WH"]
      //   ? this.$router.push({ name: `Dashboard` })
      //   : !this.user.access["WH"][this.$route.name]
      //   ? this.$router.push({ name: `Dashboard` })
      //   : "";
      this.base.temp = { ...this.base.form };
    });
  },
  created() {},
  beforeDestroy() {},
  watch: {
    // 'wh.select': function (v) {
    //   localStorage.setItem("WH", JSON.stringify(this.wh));
    // },
    // 'wh.tab': function (v) {
    //   localStorage.setItem("WH", JSON.stringify(this.wh));
    // },
    "detail.form.unit": function (val) {
      if (!this.detail.form.unit || !this.detail.form.pack_size) {
        return;
      }
      this.detail.form.quantitys =
        this.detail.form.unit * this.detail.form.pack_size;
      if (this.checkbox == "M" || this.checkbox == "O") {
        // console.log(this.detail.form.backupUnit)
        // console.log(val)
        this.detail.form.unit =
          this.detail.form.unit > this.detail.form.backupUnit
            ? this.detail.form.backupUnit
            : this.detail.form.unit;
        // this.checkbox = false;
      }
    },
    "detail.form.pack_size": function (val) {
      if (!this.detail.form.unit || !this.detail.form.pack_size) {
        return;
      }
      this.detail.form.quantitys =
        this.detail.form.unit * this.detail.form.pack_size;
    },
    checkbox: function (val) {
      if (val == "M") {
        this.detail.form.rac_data = "";
        this.detail.form.level = "";
        this.detail.form.pallet = "";

        this.rac_search();
      }
      if (this.checkbox == "M" || this.checkbox == "O") {
        // console.log(this.detail.form.backupUnit)
        // console.log(val)
        this.detail.form.unit =
          this.detail.form.unit > this.detail.form.backupUnit
            ? this.detail.form.backupUnit
            : this.detail.form.unit;
        // this.checkbox = false;
      }
    },
    // "detail.form.rac_layout": function (val) {
    //   this.detail.form.bay = "";
    //   val ? this.bay_search() : "";
    // },
    // "detail.form.bay": function (val) {
    //   this.detail.form.level = "";
    // },
    "modal.detail": function (val) {
      if (!val) {
        this.checkbox = false;
      }
    },
    user: function (val) {
      if (!val) {
        return;
      }
      console.log(this.user.access);
      !this.user.access["RD"]
        ? this.$router.push({ name: `404` })
        : !this.user.access["RD"][this.$route.name]
        ? this.$router.push({ name: `404` })
        : "";
    },
  },
};
</script>

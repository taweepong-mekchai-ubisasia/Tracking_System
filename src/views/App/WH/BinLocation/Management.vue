<template>
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
          class="modal-box max-w-[100vw] overflow-hidden relative text-center p-2 lg:p-4 max-h-screen"
        >
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕
          </label>
          <h3 class="text-lg font-bold text-primary">RACK DATA</h3>
          <div class="divider my-1"></div>

          <div
            class="card-body overflow-auto max-h-[70vh] p-1"
            v-if="base.form"
          >
            <div class="flex flex-col-reverse">
              <div
                class="grid items-start w-full p-2 pb-0"
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
                      <div
                        class="stat-title font-bold text-sm relative text-white"
                      >
                        {{ base.form.rac }}-{{ base.form.bay }}-{{ l }}-{{ p }}

                        <div class="float-right">
                          <button
                            class="btn btn-xs bg-accent text-white w-full"
                            @click="
                              detail_create(base.form.rac, base.form.bay, l, p)
                            "
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="stat w-full p-1">
                        <div
                          class="overflow-x-auto"
                          :class="`max-h-[${60 / base.form.levels}vh] min-h-[${
                            60 / base.form.levels
                          }vh]`"
                        >
                          <table
                            class="table table-xs table-pin-rows table-pin-cols table-zebra"
                          >
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
                                    `${v.item_short_code} #${v.batch} = ${
                                      v.unit
                                    }x${v.pack_size}=${
                                      Math.round(
                                        (parseFloat(v.quantitys) +
                                          Number.EPSILON) *
                                          100
                                      ) / 100
                                    } ${v.uom ? v.uom : ""}`
                                  }}
                                </td>

                                <td>
                                  {{ v.shelf_life ? v.shelf_life : "-" }}
                                </td>
                                <td
                                  :class="`${
                                    parseInt(
                                      v.receive_date && v.shelf_life
                                        ? $moment(v.receive_date)
                                            .add(
                                              parseInt(v.shelf_life) + 1,
                                              'days'
                                            )
                                            .diff($moment(new Date()), 'days')
                                        : '0'
                                    ) <= 30
                                      ? 'text-red-500'
                                      : ''
                                  }`"
                                >
                                  <div class="flex items-center space-x-3">
                                    <div>
                                      <div
                                        class="overflow-hidden text-ellipsis whitespace-nowrap"
                                      >
                                        Receive Expire
                                        {{
                                          v.receive_date && v.shelf_life
                                            ? $moment(v.receive_date)
                                                .add(
                                                  parseInt(v.shelf_life),
                                                  "days"
                                                )
                                                .format("YYYY-MM-DD")
                                            : "-"
                                        }}
                                      </div>
                                      <div
                                        class="overflow-hidden text-ellipsis whitespace-nowrap"
                                      >
                                        Life
                                        {{
                                          v.receive_date && v.shelf_life
                                            ? $moment(v.receive_date)
                                                .add(
                                                  parseInt(v.shelf_life),
                                                  "days"
                                                )
                                                .diff(
                                                  $moment(new Date()),
                                                  "days"
                                                )
                                            : "0 days"
                                        }}
                                        days
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td
                                  :class="`${
                                    parseInt(
                                      v.manufacturing_date && v.shelf_life
                                        ? $moment(v.manufacturing_date)
                                            .add(
                                              parseInt(v.shelf_life) + 1,
                                              'days'
                                            )
                                            .diff($moment(new Date()), 'days')
                                        : '0'
                                    ) <= 30
                                      ? 'text-red-500'
                                      : ''
                                  }`"
                                >
                                  <div class="flex items-center space-x-3">
                                    <div>
                                      <div
                                        class="overflow-hidden text-ellipsis whitespace-nowrap"
                                      >
                                        MFG Expire
                                        {{
                                          v.manufacturing_date && v.shelf_life
                                            ? $moment(v.manufacturing_date)
                                                .add(
                                                  parseInt(v.shelf_life),
                                                  "days"
                                                )
                                                .format("YYYY-MM-DD")
                                            : "-"
                                        }}
                                      </div>
                                      <div
                                        class="overflow-hidden text-ellipsis whitespace-nowrap"
                                      >
                                        {{
                                          v.manufacturing_date && v.shelf_life
                                            ? $moment(v.manufacturing_date)
                                                .add(
                                                  parseInt(v.shelf_life) + 1,
                                                  "days"
                                                )
                                                .diff(
                                                  $moment(new Date()),
                                                  "days"
                                                )
                                            : "0"
                                        }}
                                        days
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <th class="text-right">
                                  <button
                                    class="btn btn-xs btn-warning text-white"
                                    @click="detail_edit(v.rac, v.bay, l, p, v)"
                                  >
                                    Edit
                                  </button>
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div
                          class="shadow-lg w-full bg-accent text-white mt-2 text-xs"
                        >
                          <div>
                            <div class="p-2 w-full">
                              Weight Total :
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                }).format(
                                  parseFloat(
                                    total[l]
                                      ? total[l][p]
                                        ? total[l][p]
                                        : 0
                                      : 0
                                  ).toFixed(2)
                                )
                              }}
                              Kg.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="grid flex-grow place-items-center col-span-2">
                  <div class="shadow-lg w-full bg-neutral text-white">
                    <div>
                      <div class="p-1 w-full">
                        Weight Total :
                        {{
                          new Intl.NumberFormat("th-TH", {
                            minimumFractionDigits: 2,
                          }).format(
                            parseFloat(total[l] ? total[l].total : 0).toFixed(2)
                          )
                        }}
                        Kg.
                      </div>
                    </div>
                  </div>
                </div>
                <div class="divider col-span-2 mt-0 mb-1"></div>
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
              <h2 class="card-title text-white">
                Shelf Details :
                {{ `${temp.rac}-${temp.bay}-${temp.level}-${temp.pallet}` }}
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
                      class="select select-bordered border-base-content w-full"
                      v-model="checkbox"
                    >
                      <option disabled selected value="">เลือกรายการ</option>
                      <option value="O">ISSUE ( ตัดสินค้าออกจาก Shelf )</option>
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
                      class="select select-bordered border-base-content w-full"
                      v-model="detail.form.rac_data"
                    >
                      <option disabled selected value="">...</option>
                      <option :value="v" v-for="(v, i) in rac.rows">
                        {{ v.rac }}-{{ v.bay }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="flex-1 w-auto">
                  <div class="form-control">
                    <label class="label"
                      ><span class="label-text">LEVEL</span></label
                    >
                    <select
                      v-if="detail.form.rac_data"
                      class="select select-bordered border-base-content w-full"
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
                      class="select select-bordered border-base-content w-full select-disabled"
                      disabled
                    >
                      <option disabled selected value="">...</option>
                    </select>
                  </div>
                </div>
                <div class="flex-1 w-auto">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">PALLET</span>
                    </label>
                    <select
                      v-if="detail.form.rac_data"
                      class="select select-bordered border-base-content w-full"
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
                      class="select select-bordered border-base-content w-full select-disabled"
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
                    <AppModuleGlobalSelectSearch
                      v-if="
                        (modal.detail && detail.controll == 'create') ||
                        checkbox == 'E'
                      "
                      :placeholder="'Short code'"
                      :label="'short_code'"
                      :code="'short_code'"
                      :minChar="0"
                      :delay="0.5"
                      :limit="10"
                      :customClass="`input input-bordered border-base-content ${
                        checkbox == 'M' ? 'input-disabled' : ''
                      }`"
                      :disabled="checkbox == 'M' ? true : false"
                      :current="detail.form.item_short_code"
                      @updateValue="
                        (obj) => {
                          detail.form.item_short = obj;
                          detail.form.item_short_code = obj.short_code;
                        }
                      "
                      :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort`"
                      :param="`&total=1&wh=${user.branchTitle}&action=groupby-code`"
                    />
                    <input
                      v-else
                      type="text"
                      placeholder="Short code"
                      class="input input-bordered border-base-content input-disabled"
                      required=""
                      v-model="detail.form.item_short_code"
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
                      class="input input-bordered border-base-content"
                      required=""
                      v-model="detail.form.batch"
                      :disabled="detail.controll != 'create' && checkbox != 'E'"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 w-full gap-4">
                <div class="flex-1 w-auto">
                  <div class="form-control">
                    <label class="label"
                      ><span class="label-text">Item Description</span>
                    </label>
                    <select
                      v-if="detail.controll == 'create' || checkbox == 'E'"
                      class="select select-bordered border-base-content w-full"
                      v-model="detail.form.item_code"
                    >
                      <option disabled selected value="">เลือกรายการ</option>
                      <option v-for="(v, i) in item.rows" :value="v.item_code">
                        {{ v.item_name }}
                      </option>
                    </select>
                    <input
                      v-else
                      type="text"
                      placeholder="Item Code"
                      class="input input-bordered border-base-content input-disabled"
                      required=""
                      v-model="detail.form.item_code"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 w-full gap-4">
                <div class="flex-1 w-auto">
                  <div class="form-control">
                    <label class="label"
                      ><span class="label-text">Item Code</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Item Code"
                      class="input input-bordered border-base-content"
                      required=""
                      v-model="detail.form.item_code"
                      disabled
                    />
                  </div>
                </div>
                <div class="flex-1 w-auto">
                  <div class="form-control">
                    <label class="label"
                      ><span class="label-text">Shelf Life</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Shelf life"
                      class="input input-bordered border-base-content"
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
                      class="input input-bordered border-base-content"
                      required=""
                      v-model="detail.form.receive_date"
                      :disabled="detail.controll == 'edit' && checkbox != 'E'"
                      :data-date="
                        $moment(detail.form.receive_date).format('YYYY-MM-DD')
                      "
                    />
                    <!-- <input type="date" :data-date="$moment(detail.form.receive_date).format('DD-MM-YYYY')"  
                     v-model="detail.form.receive_date"
                    class="input input-bordered border-base-content"
                    > -->
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
                      class="input input-bordered border-base-content"
                      required=""
                      v-model="detail.form.manufacturing_date"
                      :disabled="detail.controll == 'edit' && checkbox != 'E'"
                      :data-date="
                        $moment(detail.form.manufacturing_date).format(
                          'YYYY-MM-DD'
                        )
                      "
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
                      class="input input-bordered border-base-content"
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
                      class="input input-bordered border-base-content"
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
                      class="input input-bordered border-base-content input-disabled"
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
                    <label class="label">
                      <span class="label-text">Unit</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Unit"
                      class="input input-bordered border-base-content w-full input-disabled"
                      required=""
                      v-model="detail.form.uom"
                      readonly
                    />
                  </div>
                </div>
              </div>
              <div class="flex w-full gap-4" v-if="detail.controll != 'create'">
                <div class="flex-1 w-auto">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Previous comments</span>
                    </label>
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
                    <label class="label">
                      <span class="label-text">Comments</span>
                    </label>
                    <textarea
                      class="textarea textarea-bordered h-24"
                      v-model="detail.form.comments"
                      placeholder="Comments"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="form-control mt-6" @click="detail_save()">
                <button class="btn btn-primary text-white">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #view v-if="user">
      <div class="grid grid-cols-1 gap-6 w-full overflow-auto">
        <!-- <div class="card col-span-4 bg-transparent"> -->
        <div role="tablist" class="tabs tabs-lifted">
          <input
            type="radio"
            role="tab"
            class="tab"
            name="WH"
            aria-label="Report"
            @change="setCheckbox('reportDashboard')"
            :checked="wh.tab == 'reportDashboard' ? true : false"
            v-if="user.access.WH.WHBinLocationManagement == 'superadmin'"
          />
          <div
            role="tabpanel"
            class="tab-content bg-base-100 border-base-300"
            v-if="wh.tab == 'reportDashboard'"
          >
            <AppModuleWHReportDashboard />
          </div>
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
            <AppModuleWHRacLayout
              :wh="'wh1'"
              @clickRac="clickRac"
              :parentX="0"
              :parentY="0"
              :scale="0.7"
              :refresh="layout.wh1"
              @stopRefresh="
                (obj) => {
                  layout.wh1 = obj.value;
                }
              "
            />
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
            <AppModuleWHRacLayout
              :wh="'wh2'"
              @clickRac="clickRac"
              :parentX="0"
              :parentY="0"
              :scale="0.7"
              :refresh="layout.wh2"
              @stopRefresh="
                (obj) => {
                  layout.wh2 = obj.value;
                }
              "
            />
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
            <AppModuleWHStock />
          </div>
          <input
            type="radio"
            role="tab"
            class="tab"
            name="WH"
            aria-label="Onhand"
            @change="setCheckbox('stockOnHand')"
            :checked="wh.tab == 'stockOnHand' ? true : false"
            v-if="user.access.WH.WHBinLocationManagement == 'superadmin'"
          />
          <div
            role="tabpanel"
            class="tab-content bg-base-100 border-base-300"
            v-if="wh.tab == 'stockOnHand'"
          >
            <AppModuleWHStockOnHand />
          </div>

          <input
            type="radio"
            role="tab"
            class="tab"
            name="WH"
            aria-label="Transaction"
            @change="setCheckbox('Transaction')"
            :checked="wh.tab == 'Transaction' ? true : false"
            v-if="user.access.WH.WHBinLocationManagement == 'superadmin'"
          />
          <div
            role="tabpanel"
            class="tab-content bg-base-100 border-base-300"
            v-if="wh.tab == 'Transaction'"
          >
            <AppModuleWHTransaction />
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleWHRacLayout from "@/components/App/Module/Pages/WH/RacLayout.vue";
import AppModuleWHStock from "@/components/App/Module/Pages/WH/Stock.vue";
import AppModuleWHStockOnHand from "@/components/App/Module/Pages/WH/StockOnHand.vue";
import AppModuleWHTransaction from "@/components/App/Module/Pages/WH/Transaction.vue";
import AppModuleWHReportDashboard from "@/components/App/Module/Pages/WH/ReportDashboard.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "Management",
  components: {
    AppLayout,
    AppModuleWHRacLayout,
    AppModuleGlobalSelectSearch,
    AppModuleWHStock,
    AppModuleWHStockOnHand,
    AppModuleWHTransaction,
    AppModuleWHReportDashboard,
  },
  props: [],
  data() {
    return {
      total: [],
      wh: { tab: "reportDashboard" },
      layout: {
        wh1: false,
        wh2: false,
      },
      checkbox: "",
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
      new Query("detail", "get").get(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelf?rac_layout=${this.base.form.code}&transref=I&transref_type_null=1`,
        (res) => {
          this.total = [];
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            res.rows.forEach((v, i) => {
              this.total[v.level]
                ? this.total[v.level][v.pallet]
                  ? (this.total[v.level][v.pallet] =
                      parseFloat(this.total[v.level][v.pallet]) +
                      parseFloat(v.quantitys))
                  : (this.total[v.level][v.pallet] = parseFloat(v.quantitys))
                : (this.total[v.level] = {
                    [v.pallet]: parseFloat(v.quantitys),
                  });

              this.total[v.level]
                ? this.total[v.level]["total"]
                  ? (this.total[v.level]["total"] =
                      parseFloat(this.total[v.level]["total"]) +
                      parseFloat(v.quantitys))
                  : (this.total[v.level]["total"] = parseFloat(v.quantitys))
                : (this.total[v.level] = {
                    ["total"]: parseFloat(v.quantitys),
                  });
            });
          }
          callback({ ...res });
        }
      );
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
      this.detail.controll = "edit";
      this.checkbox = "";

      this.detail.current = this.base.form.code;

      this.detail.form.backupUnit = this.detail.form.unit;
    },
    detail_save() {
      if (this.checkbox == "M") {
        if (
          !this.detail.form.rac_data ||
          !this.detail.form.level ||
          !this.detail.form.pallet
        ) {
          return alert("The information is incomplete.");
        }
      }
      if (this.detail.controll == "create") {
        this.detail.form.rac_layout = this.base.form.code;
        this.detail.form.level = this.temp.level;
        this.detail.form.pallet = this.temp.pallet;
      } else {
        this.detail.form.rac_layout = this.detail.form.rac_data.code;
      }
      this.detail.form.transref = this.checkbox ? this.checkbox : "I";
      let obj = {
        code: this.detail.current,
        rows: [
          {
            ...Object.assign({ ...this.detail.form }),
          },
        ],
      };

      new Query("base", this.detail.controll == "create" ? "POST" : "PUT").set(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelf`,
        obj,
        (res) => {
          if (!res.success) {
          } else {
            if (!res.success) {
              // localStorage.removeItem("user_token");
              // this.$router.push({ name: `Login` });
            } else {
              this.modal.detail = false;
              this.detail_search();
              this.layout[this.detail.form.wh] = true;
            }
          }
        }
      );
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
      new Query("rac", "get").get(
        this,
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WH/layout?total=1&wh=${
          this.wh.tab == "factory" ? "wh1" : "wh2"
        }&rac_list=1`,
        (res) => {
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
        }
      );
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
      new Query("bay", "get").get(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/layout?total=1&wh=wh1&bay_list=1&rac=${this.detail.form.rac}`,
        (res) => {
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
        }
      );
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
      new Query("item", "get").get(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort?total=1&wh=wh1&item_list=1&rac=${this.detail.form.rac}&wh=${this.user.branchTitle}&short_code=${this.detail.form.item_short_code}`,
        (res) => {
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
        }
      );
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //   // console.log(this.user);
    //   console.log(this.user)
    //   this.base.temp = { ...this.base.form };
    //   this.user.access.WH.WHBinLocationManagement != "superadmin"
    //     ? (this.wh.tab = "External")
    //     : "";
    // });
  },
  updated() {
    this.$nextTick(() => {
      // console.log(this.user);
      console.log(this.user.access.WH.WHBinLocationManagement);
      console.log(this.user);
      this.base.temp = { ...this.base.form };
      this.wh.tab =
        this.user.access.WH.WHBinLocationManagement != "superadmin"
          ? "factory"
          : "reportDashboard";
    });
  },
  created() {},
  beforeDestroy() {},
  watch: {
    "detail.form.unit": function (val) {
      if (!this.detail.form.unit || !this.detail.form.pack_size) {
        return;
      }
      this.detail.form.quantitys =
        this.detail.form.unit * this.detail.form.pack_size;
      if (this.checkbox == "M" || this.checkbox == "O") {
        this.detail.form.unit =
          this.detail.form.unit > this.detail.form.backupUnit
            ? this.detail.form.backupUnit
            : this.detail.form.unit;
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
        this.detail.form.unit =
          this.detail.form.unit > this.detail.form.backupUnit
            ? this.detail.form.backupUnit
            : this.detail.form.unit;
      }
    },
    "detail.form.item_short_code": function (val) {
      if (this.detail.controll == "create" || this.checkbox == "E") {
        this.detail.form.item_code = "";
        this.detail.form.shelf_life = "";
        this.detail.form.item_name = "";
      }

      this.item_search((res) => {
        if (this.item.rows.length == 1) {
          this.detail.form.item_code = this.item.rows[0].item_code;
          this.detail.form.item_wh = this.item.rows[0].wh;
        }
      });
    },
    "detail.form.item_code": function (val) {
      if (val) {
        new Query(null, "get").get(
          this,
          `${this.serviceUrl}api/controllers/SAP/${
            this.detail.form.item_wh ? this.detail.form.item_wh : "UBA"
          }/oitm?item_code=${val}`,
          (res) => {
            if (!res.success) {
              // localStorage.removeItem("user_token");
              // this.$router.push({ name: `Login` });
            } else {
              this.detail.form.item_code = res.rows[0].ItemCode;
              this.detail.form.item_name = res.rows[0].ItemName;
              this.detail.form.shelf_life = res.rows[0].U_Agin;
              this.detail.form.uom = res.rows[0].UomCode;
            }
          }
        );
      }
    },
    "modal.detail": function (val) {
      if (!val) {
        this.checkbox = false;
      }
    },
    user: function (val) {
      if (!val) {
        return;
      }
      !this.user.access["WH"]
        ? this.$router.push({ name: `Dashboard` })
        : !this.user.access["WH"][this.$route.name]
        ? this.$router.push({ name: `Dashboard` })
        : "";
    },
  },
};
</script>
<style scoped>
.tab-content {
  border-radius: 10px 10px 10px 10px;
}

input[type="date"] {
  position: relative;
}

input[type="date"]:before {
  /* position: absolute; */
  /* top: 3px; left: 3px; */
  content: attr(data-date);
  display: inline-block;
  /* color: black; */
}

input[type="date"]::-webkit-datetime-edit {
  display: none;
}

/* input::-webkit-datetime-edit, input::-webkit-inner-spin-button, input::-webkit-clear-button {
    display: none;
} */

input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 13px;
  right: 10px;
  color: black;
  opacity: 1;
}
</style>

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
          <h3 class="text-lg font-bold text-primary">Transportation to Vita</h3>
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
                    <span class="label-text font-semibold">EN </span><span class="text-xs text-error">{{ msg.en }}</span>
                  </label>
                  <input
                    type="text"
                    placeholder="en"
                    class="input input-bordered"
                    v-model="base.form.en"
                    :readonly="locked"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Ref </span><span class="text-xs text-error">{{ msg.ref }}</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ref"
                    class="input input-bordered"
                    v-model="base.form.ref"
                    :readonly="locked"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Packing List </span><span class="text-xs text-error">{{ msg.packing }}</span>
                  </label>
                  <input
                    type="text"
                    placeholder="packing list"
                    class="input input-bordered"
                    v-model="base.form.packing"
                    :readonly="locked"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Shipping Mark </span><span class="text-xs text-error">{{ msg.mark }}</span>
                  </label>
                  <input
                    type="text"
                    placeholder="shipping mark"
                    class="input input-bordered"
                    v-model="base.form.shipping_mark"
                    :readonly="locked"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Shipping Date </span><span class="text-xs text-error">{{ msg.date }}</span>
                  </label>
                  <input
                    type="date"
                    placeholder="shipping date"
                    class="input input-bordered"
                    v-model="base.form.shipping_date"
                    :readonly="locked"
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
                        <td>ลำดับ</td>
                        <td>Product</td>
                        <td>Description</td>
                        <!-- <td>Shelf Life</td> -->
                        <td class="text-right">Quantity</td>
                        <td class="text-right">Pack Size</td>
                        <td>Unit</td>
                        <td class="text-right">Net Weight</td>
                        <th class="text-right" v-if="!locked">
                          <label
                            for="modal-detail"
                            class="btn btn-primary modal-button btn-xs text-white me-1"
                            @click="detail_create();"
                          >
                            + new
                          </label>
                        </th>
                        <th v-else></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="hover"
                        v-for="(row, index) in detail.rows"
                        :key="index"
                      >
                        <td class="font-bold">{{ index + 1 }}</td>
                        <td>{{ row.product }}</td>
                        <td>{{ row.descrip }}</td>
                        <!-- <td>{{ row.shelf_life }}</td> -->
                        <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.total_qty) }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.pack_size) }}</td>
                        <td>{{ row.unit }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.net_weight) }}</td>
                        <th class="text-right" v-if="!locked">
                          <label
                            for="modal-print"
                            class="btn btn-ghost modal-button btn-xs"
                            @click="prod_detail(`${row.code}`)"
                          >
                            <span class="underline underline-offset-2">พิมพ์</span>
                          </label>
                          |
                          <label
                            for="modal-detail"
                            class="btn btn-ghost modal-button btn-xs"
                            @click="scan = true; detail_edit(`${row.code}`, `${index}`)"
                          >
                            แก้ไข
                          </label>
                          |
                          <label
                            for="modal-remove"
                            class="btn btn-ghost modal-button btn-xs"
                            @click="
                              remove_item(
                                `${row.code}`,
                                'detail',
                                'api/controllers/MYSQL/INTERNAL/WMS/prod'
                              )
                            "
                          >
                            ลบ
                          </label>
                        </th>
                        <th class="text-right" v-else>
                          <label
                            for="modal-print"
                            class="btn btn-ghost modal-button btn-xs"
                            @click="prod_detail(`${row.code}`)"
                            v-if="base.form.status == 'shipping'"
                          >
                            <span class="underline underline-offset-2">พิมพ์</span> |
                          </label>
                          <label
                            for="modal-detail"
                            class="btn btn-ghost modal-button btn-xs"
                            @click="detail_edit(`${row.code}`, `${index}`)"
                          >
                            รายละเอียด
                          </label>
                        </th>
                      </tr>
                    </tbody>
                    <tfoot v-if="detail.rows.length && base.controll != 'create'">
                      <tr class="text-right">
                        <td colspan="7"></td>
                        <th>Total Quantity : {{ sum }}</th>
                      </tr>
                      <tr class="text-right">
                        <td colspan="7"></td>
                        <th>Total Net Weight : {{ new Intl.NumberFormat("en-US").format(total_net) }}</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div class="grid gap-3 grid-cols-2">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">ผู้ทำรายการ</span>
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
                      <option value="pending" >เตรียมจัดส่ง</option>
                      <option value="pending" disabled>ร้องขอ</option>
                      <option value="pending" disabled>เตรียมสินค้า</option>
                      <option value="pending" disabled>ตรวจสอบ</option>
                      <option value="pending" disabled>ควบคุมการจัดส่ง</option>
                      <option value="pending" disabled>อนุมัติปล่อยสินค้า</option>
                      <option value="shipping">จัดส่งแล้ว</option>
                      <option value="receiving" disabled>กำลังรับสินค้า</option>
                      <option value="received" disabled>รับสินค้าแล้ว</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
            <hr v-if="!locked" />
          <!-- </div> -->
          <div
            class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            v-if="!locked"
          >
            <div class="flex-1 form-control mt-6">
              <label for="modal-base" class="btn btn-danger">Cancel</label>
            </div>
            <div class="flex-1 form-control mt-6">
              <button class="btn btn-primary text-white" @click="base_save('static')">Confirm</button>
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
            @click="scan = false"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">Product</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 60vh">
            <div class="grid gap-3 grid-cols-2 md:grid-cols-2">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Product</span><span class="text-xs text-error">{{ msg.product }}</span>
                </label>
                <AppModuleGlobalSelectSearch
                  v-if="
                    !edit
                  "
                  :placeholder="'short code'"
                  :label="'short_code'"
                  :code="'short_code'"
                  :minChar="0"
                  :delay="0.5"
                  :limit="10"
                  :customClass="`input input-bordered ${
                    checkbox == 'M' ? 'input-disabled' : ''
                  }`"
                  :disabled="checkbox == 'M' ? true : false"
                  :current="detail.form.product"
                  :refresh="refresh.product"
                  @updateValue="
                    (obj) => {
                      // console.log(obj)
                      detail.form.product = obj.short_code;
                    }
                  "
                  @stopRefresh="
                    (obj) => {
                      // console.log(obj)
                      refresh.product = obj.value;
                    }
                  "
                  :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort`"
                  :param="`&item_name=1&total=1&wh=${user.branchTitle}&action=groupby-code`"
                />
                <input
                  v-else
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
                <select class="select select-bordered w-full" v-model="detail.form.descrip" v-if="!edit">
                  <option value="" disabled selected>เลือก Description</option>
                  <option v-for="v in datalist">{{ v.item_name }}</option>
                </select>
                <input
                  v-else
                  type="text"
                  placeholder="short code"
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
                  <span class="label-text font-semibold">Pack Size</span>
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
                      <td>ลำดับ</td>
                      <td>Lot No.</td>
                      <td class="text-center">MFG</td>
                      <td class="text-center">EXP</td>
                      <td class="text-right">Quantity</td>
                      <th class="text-right" v-if="!locked">
                        <label
                          for="modal-item"
                          class="btn btn-primary modal-button btn-xs text-white me-1"
                          @click="scan = false; item_create()"
                        >
                          + new
                        </label>
                        <!-- <label
                          for="modal-qr"
                          class="btn btn-secondary modal-button btn-xs text-white"
                          @click="select = !select; scan = true"
                        >
                          # scan
                        </label> -->
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="hover"
                      v-for="(row, index) in item.rows"
                      :key="index"
                    >
                      <td class="font-bold">{{ index + 1 }}</td>
                      <td>{{ row.lot }}</td>
                      <td class="text-center">{{ row.mfg }}</td>
                      <td class="text-center">{{ row.exp }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.quantity) }}</td>
                      <th class="text-right" v-if="!locked">
                        <label
                          for="modal-item"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="scan = true; item_edit(`${row.code}`, `${index}`)"
                        >
                          แก้ไข
                        </label>
                        |
                        <label
                          for="modal-remove"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${row.code}`,
                              'item',
                              'api/controllers/MYSQL/INTERNAL/WMS/item'
                            )
                          "
                        >
                          ลบ
                        </label>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <hr v-if="!locked" />
          <div
            class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            v-if="!locked"
          >
            <div class="flex-1 form-control mt-6">
              <label for="modal-detail" class="btn btn-danger" @click="scan = false">Cancel</label>
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
      <!-- modal item -->
      <input
        type="checkbox"
        id="modal-item"
        class="modal-toggle"
        v-model="item.modal"
      />
      <div class="modal" v-if="item.modal">
        <div class="modal-box w-11/12 max-w-xl">
          <label
            for="modal-item"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div class="card-body overflow-auto" style="max-height: 60vh">
            <div class="grid gap-3 grid-cols-2">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Lot Number</span><span class="text-xs text-error">{{ msg.lot }}</span>
                </label>
                <input
                  type="text"
                  placeholder="lot number"
                  class="input input-bordered"
                  v-model="item.form.lot"
                  :disabled="scan ? true : false"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Quantity</span><span class="text-xs text-error">{{ msg.quantity }}</span>
                </label>
                <input
                  type="number"
                  placeholder="quantity"
                  class="input input-bordered"
                  min="1"
                  v-model="item.form.quantity"
                />
              </div>
            </div>
            <div class="grid gap-3 grid-cols-2">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">MFG</span><span class="text-xs text-error">{{ msg.mfg }}</span>
                </label>
                <input
                  type="date"
                  placeholder="mfg"
                  class="input input-bordered"
                  v-model="item.form.mfg"
                  :disabled="scan ? true : false"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">EXP</span><span class="text-xs text-error">{{ msg.exp }}</span>
                </label>
                <input
                  type="date"
                  placeholder="exp"
                  class="input input-bordered"
                  v-model="item.form.exp"
                  disabled
                />
              </div>
            </div>
          </div>
          <hr />
          <div
            class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
          >
            <div class="flex-1 form-control mt-6">
              <button
                class="btn btn-primary text-white"
                @click="item_save('static')"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- modal print -->
      <input
        type="checkbox"
        id="modal-print"
        class="modal-toggle"
        v-model="print.modal"
      />
      <div class="modal" v-if="print.modal">
        <div class="modal-box w-11/12 max-w-xl">
          <label
            for="modal-print"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">Choose Print Format</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 60vh">
            <div class="grid gap-3 md:grid-cols-4 grid-cols-2">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">จำนวนถังต่อชั้น</span>
                </label>
                <input
                  type="number"
                  placeholder="ถังต่อชั้น"
                  min="1"
                  class="input input-bordered"
                  @change="build = false"
                  v-model="floor"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Font Size</span>
                </label>
                <input
                  type="number"
                  placeholder="font size"
                  min="1"
                  class="input input-bordered"
                  v-model="fsize"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">QR Code Size</span>
                </label>
                <input
                  type="number"
                  placeholder="QRcode size"
                  min="1"
                  class="input input-bordered"
                  v-model="qrsize"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Barcode Size</span>
                </label>
                <input
                  type="number"
                  placeholder="Barcode size"
                  min="1"
                  class="input input-bordered"
                  v-model="barsize"
                />
              </div>
            </div>
            <div class="grid gap-3 grid-cols-3">
              <button class="btn btn-primary text-white" @click="floor != 'NaN' ? build = true : build = false;" :disabled="build">Submit</button>
              <button class="btn btn-error text-white" @click="build = false; floor = 'NaN'">Clear</button>
              <button class="btn" @click="printPaper()" :disabled="!build">Print</button>
            </div>
            <div class="mt-4">
              <div class="grid grid-cols-2">
                <p class="text-start font-semibold" :class="text-center">Preview :</p>
                <div class="form-control border-dashed border-2">
                  <label class="label cursor-pointer">
                    <span class="label-text">Drum No.</span> 
                    <input type="checkbox" class="toggle toggle-sm toggle-success" v-model="drumcheck" />
                  </label>
                </div>
              </div>
              <div class="border-dashed border-2 mt-1 pb-2" v-for="row in item.rows">
                <!-- {{ detail.form[0] }} -->
                <h1>{{ base.form.en }} ({{ base.form.ref }})</h1>
                <h1>PALLET NO. n/<span class="text-blue-500">{{ Math.ceil(detail.form[0].total_qty/floor) }}</span></h1>
                <h1>{{ detail.form[0].product }} = <span class="text-blue-500">{{ floor }}</span> x {{ detail.form[0].pack_size }} {{ detail.form[0].unit }}</h1>
                <h1>LOT NO. {{ row.lot }}</h1>
                <h1 v-if="drumcheck">DRUM NO. 1 - <span class="text-blue-500">{{ floor }}</span></h1>
                <div class="grid grid-cols-2 justify-items-center">
                  <VueQRCodeComponent :text="123456789" :size="qrsize" class="mt-2" />
                  <vue-barcode :value="123456789" :options="{ displayValue: false, width: barsize, height: 50*barsize }" tag="img" />
                </div>
              </div>
            </div>
            <div id="printMe" class="landscape:hidden">
              <div style="display: flex; justify-content: center;" v-for="n in Math.ceil(detail.form[0].total_qty/floor)" v-if="build">
                <div style="white-space: nowrap;" align="center">
                  <h1 :style="`font-size: ${fsize}px;`">{{ base.form.en }} ({{ base.form.ref }})</h1>
                  <h1 :style="`font-size: ${fsize}px;`">PALLET NO. {{ n }}/{{ Math.ceil(detail.form[0].total_qty/floor) }}</h1>
                  <h1 :style="`font-size: ${fsize}px;`">
                    {{ detail.form[0].product }} = 
                    <!-- {{ list.filter(x => x.order == n-1) }} -->
                    {{ list.filter(x => x.order == n-1).reduce((a, b) => { return { qty: a.qty + b.qty } }).qty != floor 
                      ? list.filter(x => x.order == n-1).reduce((a, b) => { return { qty: a.qty + b.qty } }).qty 
                      : floor }}
                    x {{ detail.form[0].pack_size }} {{ detail.form[0].unit }}
                  </h1>
                  <div v-for="v in list.filter(x => x.order == n-1)">
                    <h1 :style="`font-size: ${fsize}px;`">LOT NO. {{ v.lot }}<span v-if="v.qty != floor"> = {{ v.qty }}</span></h1>
                    <h1 :style="`font-size: ${fsize}px;`" v-if="drumcheck">DRUM NO. {{ v.drum+1 }}<span v-if="v.qty != 1"> - {{ v.drum+v.qty }}</span></h1>
                  </div>
                  <table style="width: 100%">
                    <tr>
                      <td>
                        <VueQRCodeComponent :text="'http://192.168.11.1/UAT-tin/WMS/Vita/ScanToReceive?'+detail.form[0].code+'&'+n+'&'+floor" :size="3*qrsize" />
                      </td>
                      <td>
                        <vue-barcode :value="detail.form[0].code+'&'+n+'&'+floor" :options="{ displayValue: false, width: 3*barsize, height: 150*barsize }" tag="img"/>
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
            @click="select = !select"
          >
            ✕
          </label>
          <qrcode-stream
            :camera="camera"
            @init="onCameraChange"
            @detect="onDetect"
            @error="onError"
            @camera-on="onReady"
            :track="selected.value"
            class="max-w-lg mt-7"
            v-if="select"
          ></qrcode-stream>
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
      <div class="grid grid-cols-1 gap-6 lg:px-9 lg:py-9">
        <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
          <div class="card-body overflow-auto">
            Coming Soon...
            <!-- <div class="join mt-5 w-full md:justify-center lg:justify-end">
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
                    <td>ลำดับ</td>
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
                  <tr v-for="(row, index) in base.rows" :key="row.code" :class="row.status == 'pending' ? 'hover' : row.status == 'received' ? 'text-primary hover' : 'text-slate-500 hover'">
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
                    <td class="font-bold">{{ row.status }}</td>
                    <th class="text-right" v-if="row.status == 'pending'">
                      <label
                        for="modal-base"
                        class="join-item btn btn-link no-underline text-warning modal-button btn-xs"
                        @click="base_edit(`${row.code}`, `${index}`)"
                      >
                        แก้ไข
                      </label>
                      |
                      <label
                        for="modal-remove"
                        class="join-item btn btn-link no-underline text-error modal-button btn-xs"
                        @click="
                          remove_item(
                            `${row.code}`,
                            'base',
                            'api/controllers/MYSQL/INTERNAL/WMS/trans'
                          )
                        "
                      >
                        ลบ
                      </label>
                    </th>
                    <th class="text-right" v-else>
                      <label
                        for="modal-base"
                        class="btn btn-ghost modal-button btn-xs"
                        @click="base_edit(`${row.code}`, `${index}`)"
                        ><Icon icon="bx:detail" />รายละเอียด
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
            </div> -->
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
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import VueQRCodeComponent from "vue-qrcode-component";
import VueBarcode from '@chenfengyuan/vue-barcode';
import Query from "@/assets/js/fetch.js";

export default {
name: "Transportation",
components: {
  AppLayout,
  QrcodeStream,
  QrcodeDropZone,
  QrcodeCapture,
  AppModuleGlobalUpload,
  AppModuleGlobalPageination,
  AppModuleGlobalSelectSearch,
  AppModuleGlobalSearch,
  VueQRCodeComponent,
  VueBarcode,
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
    fsize: 0,
    qrsize: 0,
    barsize: 0,
    drumcheck: false,
    build: false,
    floor: '',
    output: null,
    sum: 0,
    total_net: 0,
    camera: 'auto',
    selected: selected,
    scan: false,
    locked: false,
    edit: false,
    checkbox: "",
    refresh: false,
    tmpsLink: "",
    list: [],
    datalist: [],
    options: {
      penColor: "#c0f"
    },
    msg: {
      en: '',
      ref: '',
      packing: '',
      customer: '',
      mark: '',
      date: '',
      product: '',
      lot: '',
      quantity: '',
      mfg: '',
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
    },
    remove: {
      current: 0,
      model: false,
      controll: "",
      tb: "",
    },
    print: {
      modal: false,
    },
    qrmodal: {
      modal: false,
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
  transpotationItem() {
    return this.$store.getters.transpotationItem;
  },
  transpotation() {
    return this.$store.getters.transpotation;
  },
},
methods: {
  printPaper () {
    this.$htmlToPaper('printMe', {styles:['/landscape.css']})

    let checklist = {}
    for(let i = 0; i <= this.list.reduce((a,b) => { return a.order > b.order ? a.order : b.order }); i++) {
      this.list.filter(x => x.order == i).forEach((x,index) => {
        if(index) {
          checklist[i][`total`] += x.qty
          checklist[i][`item`] = [
            {
              ...checklist[i].item
            },{
              lot: x.lot,
              qty: x.qty,
              mfg: x.mfg,
              exp: x.exp
            }
          ]
        } else {
          checklist[i] = {
            pallet: i+1,
            checked: false,
            total: x.qty,
            item: {
              lot: x.lot,
              qty: x.qty,
              mfg: x.mfg,
              exp: x.exp
            }
          }
        }
      })
    }
    // console.log(checklist)
    
    let obj = {
      rows: [
        {
          code: this.detail.form.code,
          received: checklist,
        },
      ],
    };

    new Query('base','put').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/prod`, obj, (res) => {
      if (!res.success) {
      } else {
        console.log(res)
      }
    });
  },
  prod_detail(code) {
    this.fsize = 60
    this.qrsize = 38
    this.barsize = 0.75
    this.drumcheck = false
    this.build = false
    this.floor = 'NaN'
    this.detail.form = this.detail.rows.filter(x => x.code == code)
    this.detail.form.code = this.detail.form[0].code
    this.item_search()
  },
  startFrontCamera () {
    this.camera = 'front'
  },
  onCameraChange (promise) {
    promise.catch(error => {
      const cameraMissingError = error.name === 'OverconstrainedError'
      const triedFrontCamera = this.camera === 'front'
      if (triedFrontCamera && cameraMissingError) {
        // no front camera on this device
      }
    })
  },
  onDetect(detectedCodes) {
    let ar = JSON.parse(detectedCodes[0].rawValue);
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
  dateNow() {
    let d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() >= 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
            + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  },
  ymd(start, life) {
    let expire = new Date((new Date(start)).getTime() + life * 86400E3);
    return expire.getFullYear() + '-' + (expire.getMonth() >= 9 ? expire.getMonth() + 1 : '0' + (expire.getMonth() + 1)) + '-' + (expire.getDate() > 9 ? expire.getDate() : '0' + expire.getDate());
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
          12,
          (50 * boundingBox.width) / ctx.canvas.width
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
    new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/trans?total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
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

    this.msg.en = ''
    this.msg.ref = ''
    this.msg.packing = ''
    this.msg.mark = ''
    this.msg.date = ''

    this.base.current = this.makeid(15);
    this.base.form = {
      code: this.base.current,
      en: "",
      ref: "",
      packing: "",
      customer: "Vita",
      shipping_mark: "",
      shipping_date: "",
      status:'pending'
    };

    this.detail.rows = [];
    this.base.controll = "create";
    this.locked = false;
  },
  base_edit(code, index) {
    this.sum = 0
    this.total_net = 0

    this.msg.en = ''
    this.msg.ref = ''
    this.msg.packing = ''
    this.msg.mark = ''
    this.msg.date = ''

    this.base.form = { ...this.base.rows[index] };
    this.base.current = code;
    this.detail.rows = [];
    this.base.controll = "edit";
    this.detail_search();
    this.refresh = true;
    this.locked = this.base.form.status == 'pending' ? false : true;
  },
  base_save(type) {
    if(!this.base.form.en || !this.base.form.packing || !this.base.form.ref || !this.base.form.shipping_mark || !this.base.form.shipping_date) {
      if(!this.base.form.en) this.msg.en = '*กรอกข้อมูล*'
      else this.msg.en = ''
      if(!this.base.form.ref) this.msg.ref = '*กรอกข้อมูล*'
      else this.msg.ref = ''
      if(!this.base.form.packing) this.msg.packing = '*กรอกข้อมูล*'
      else this.msg.packing = ''
      if(!this.base.form.shipping_mark) this.msg.mark = '*กรอกข้อมูล*'
      else this.msg.mark = ''
      if(!this.base.form.shipping_date) this.msg.date = '*กรอกข้อมูล*'
      else this.msg.date = ''
      return;
    }

    let obj = {
      rows: [
        {
          code: this.base.form.code,
          en : this.base.form.en,
          ref : this.base.form.ref,
          packing: this.base.form.packing,
          customer: this.base.form.customer,
          shipping_mark: this.base.form.shipping_mark,
          shipping_date: this.base.form.shipping_date,
          status: this.base.form.status,
        },
      ]
    };

    if(this.base.form.status == 'shipping') {
      obj['rows'][0]["shipped_at"] = this.dateNow()
      obj['rows'][0]["shipped_by"] = this.user.code
    }
    // console.log(obj)

    new Query('base', this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/trans`, obj, (res) => {
      if (!res.success) {
      } else {
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
    });
  },
  detail_get(callback) {
    new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/prod?trans_code=${this.base.form.code}`, (res) => {
      if (res.success) {
        res.rows.filter(x => x.code).forEach(x => {
          this.sum += parseFloat(x.total_qty)
          x['net_weight'] = x.total_qty*x.pack_size
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
    this.msg.product = ''

    this.detail.current = this.makeid(10);
    this.detail.form = {
      code: this.detail.current,
      trans_code: this.base.form.code,
      product: "",
      descrip: "",
      shelf_life: "",
      pack_size: "",
      unit: "",
    };

    this.item.rows = [];
    this.item.new = [];
    this.detail.controll = "create";
    this.edit = false;
  },
  detail_edit(code, index) {
    this.msg.product = ''

    this.detail.form = Object.assign({}, this.detail.rows[index]);
    this.detail.current = code;
    this.item.rows = [];
    this.detail.controll = "edit";
    this.item_search();
    this.refresh = true;
    this.edit = true;
  },
  detail_save(type) {
    if(!this.detail.form.product) {
      this.msg.product = '*กรอกข้อมูล*'
      return;
    } else {
      this.msg.product = ''
    }

    let obj = {
      rows: [
        {
          code: this.detail.form.code,
          trans_code : this.base.current,
          product: this.detail.form.product,
          descrip: this.detail.form.descrip,
          shelf_life: this.detail.form.shelf_life,
          pack_size: this.detail.form.pack_size,
          unit: this.detail.form.unit
        },
      ]
    };

    new Query('base', this.detail.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/prod`, obj, (res) => {
      if (!res.success) {
      } else {
        if (this.item.new.length) {
          let obj = { rows: [] }
          this.item.new.forEach((x, i) => {
            obj['rows'][i] = {
              code: this.detail.current+''+x.lot,
              prod_code: this.detail.current,
              lot: x.lot,
              quantity: x.quantity,
              mfg: x.mfg,
              exp: x.exp
            }
          })

          new Query('base','post').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/item`, obj, (res) => {
            if (!res.success) {
            } else {
              this.detail.modal = false;
              
              if (type == "static") {
                this.detail_search();
              }
            }
          });
        } else {
          this.detail.modal = false;

          if (type == "static") {
            this.detail_search();
          }
        }
      }
    });
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
        res.rows.forEach((v, i) => {
          res.rows[i].image = v.image ? JSON.parse(v.image) : [];
          res.rows[i].master = 0;
        });
      }
      callback({ ...res });
    });
  },
  item_create() {
    this.msg.lot = ''
    this.msg.quantity = ''
    this.msg.mfg = ''

    this.item.current = 0;
    this.item.form = {
      lot: "",
      package: "",
      quantity: "",
      mfg: "",
      exp: "",
    };

    this.item.controll = "create";
  },
  item_edit(code, index) {
    this.msg.lot = ''
    this.msg.quantity = ''
    this.msg.mfg = ''

    this.item.current = code;
    this.item.form = Object.assign({}, this.item.rows[index]);

    this.item.controll = "edit";
  },
  item_save(type) {
    if(!this.item.form.lot || !this.item.form.quantity || !this.item.form.mfg) {
      if(!this.item.form.lot) this.msg.lot = '*กรอกข้อมูล*'
      else this.msg.lot = ''
      if(!this.item.form.quantity) this.msg.quantity = '*กรอกข้อมูล*'
      else this.msg.quantity = ''
      if(!this.item.form.mfg) this.msg.mfg = '*กรอกข้อมูล*'
      else this.msg.mfg = ''
      return;
    }

    if (this.item.controll == "create") {
      if(this.item.rows.find(x => x.lot == this.item.form.lot)) {
        this.item.rows.find(x => x.lot == this.item.form.lot).quantity += this.item.form.quantity
      } else {
        this.item.rows.push({ ...this.item.form });
      }

      if(this.item.new.find(x => x.lot == this.item.form.lot)) {
        this.item.new.find(x => x.lot == this.item.form.lot).quantity += this.item.form.quantity
      } else {
        this.item.new.push({ ...this.item.form });
      }

      this.item.modal = false;
    } else {
      if(this.item.new.find(x => x.lot == this.item.form.lot)) {
        this.item.rows.find(x => x.lot == this.item.form.lot).quantity = this.item.form.quantity

        this.item.modal = false;
      } else {
        let obj = {
          rows: [
            {
              code: this.detail.current+''+this.item.form.lot,
              prod_code: this.detail.current,
              lot: this.item.form.lot,
              package: this.item.form.package,
              quantity: this.item.form.quantity,
              mfg: this.item.form.mfg,
              exp: this.item.form.exp
            },
          ],
        };

        new Query('base','put').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/item`, obj, (res) => {
          if (!res.success) {
          } else {
            this.item.modal = false;

            if (type == "static") {
              this.item_search();
            }
          }
        });
      }
    }
  },
  // REMOVE
  remove_item(code, controll, tb) {
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
  build: function (v) {
    if(v) {
      let i = 0
      let count = 0
      let order = 0
      let remaining = 0
      let array = [ ...this.item.rows]
      // console.log(array)
      while(i < array.length) {
        let qty = parseFloat(array[i].quantity)
        while(qty) {
          if(remaining) {
            if(remaining > qty) {
              this.list[count] = {
                lot: array[i].lot,
                qty: qty,
                mfg: array[i].mfg,
                exp: array[i].exp,
                order: order,
                drum: this.list.filter(k => k.lot == array[i].lot).reduce((sum, v) =>  sum + v.qty, 0)
              }
              count += 1
              remaining -= qty
              qty = 0
            } else {
              this.list[count] = {
                lot: array[i].lot,
                qty: remaining,
                mfg: array[i].mfg,
                exp: array[i].exp,
                order: order,
                drum: this.list.filter(k => k.lot == array[i].lot).reduce((sum, v) => sum + v.qty, 0)
              }
              count += 1
              order += 1
              qty -= remaining
              remaining = 0
            }
          } else if(qty >= this.floor) {
            this.list[count] = {
              lot: array[i].lot,
              qty: this.floor,
              mfg: array[i].mfg,
              exp: array[i].exp,
              order: order,
              drum: this.list.filter(k => k.lot == array[i].lot).reduce((sum, v) => sum + v.qty, 0)
            }
            count += 1
            order += 1
            remaining = 0
            qty -= this.floor
          } else {
            this.list[count] = {
              lot: array[i].lot,
              qty: qty,
              mfg: array[i].mfg,
              exp: array[i].exp,
              order: order,
              drum: this.list.filter(k => k.lot == array[i].lot).reduce((sum, v) => sum + v.qty, 0)
            }
            count += 1
            remaining = this.floor - qty
            qty = 0
          }
        }

        i += 1
      }
      console.log(this.list)
    } else {
      this.list = []
    }
  },
  select: function (v) {
    // console.log(v);
    this.datalist = [];
  },
  detail: function (v) {
    // console.log(v);
  },
  "detail.form.product": function (val) {
    if (val) {
      new Query('datalist','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort?short_code=${val}&total=1`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        this.datalist = [ ...res.rows ]
      });
    }
  },
  "detail.form.descrip": function (val) {
    if (val) {
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/SAP/UBA/oitm?item_name=${val}`, (res) => {
        if (res.success) {
          if (res.rows.length > 0) {
            let used = res.rows[0].ItemName.split(" ")
            if(used[used.length-1] == 'kg' || used[used.length-1] == 'lt') {
              this.detail.form.shelf_life = res.rows[0].U_Agin;

              this.detail.form.pack_size = used[used.length-2];
              this.detail.form.unit = used[used.length-1];
            } else {
              this.detail.form.shelf_life = res.rows[0].U_Agin;

              if(used[used.length-1].indexOf('kg') > -1) {
                this.detail.form.pack_size = used[used.length-1].split('kg')[0];
                this.detail.form.unit = 'kg';
              } else if(used[used.length-1].indexOf('lt') > -1) {
                this.detail.form.pack_size = used[used.length-1].split('lt')[0];
                this.detail.form.unit = 'lt';
              } else {
                this.detail.form.pack_size = 'None';
                this.detail.form.unit = 'None';
              }
            }
          }

          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
      });
    }
  },
  "item.form.mfg": function (val) {
    if (val) {
      this.item.form.exp = this.ymd(val, this.detail.form.shelf_life)
    } else {
      this.item.form.exp = null
    }
  },
}
};
</script>
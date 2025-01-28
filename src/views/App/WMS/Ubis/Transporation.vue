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
          <div class="card-body overflow-auto" style="max-height: 66vh;">
            <div class="grid gap-3 grid-cols-2 md:grid-cols-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">EN </span><span class="text-xs text-error">{{ msg.en }}</span>
                </label>
                <!-- <label 
                  class="input input-sm flex items-center gap-2 border-gray-300" 
                  :class="locked ? 'input-disabled' : base.form.en ? 'bg-green-50 text-black' : 'input-bordered'"
                >
                  EN
                  <input
                    type="text"
                    placeholder="..."
                    class="grow input-xs w-full"
                    :class="!locked ? base.form.en ? 'bg-green-50 text-black' : '' : ''"
                    v-model="base.form.en"
                    :disabled="locked"
                  />
                </label> -->
                <div class="join">
                  <button
                    class="join-item btn btn-sm disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500"
                    disabled
                  >
                    EN
                  </button>
                  <input
                    type="text"
                    placeholder="..."
                    class="join-item input input-sm input-bordered bordor-gray-300 w-full"
                    :class="!locked ? base.form.en ? 'bg-green-50 text-black' : '' : ''"
                    v-model="base.form.en"
                    :disabled="locked"
                  />
                </div>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Ref <span class="text-xs opacity-50">(PO)</span> </span><span class="text-xs text-error">{{ msg.ref }}</span>
                </label>
                <input
                  type="text"
                  placeholder="Purchase Order"
                  class="input input-sm input-bordered border-gray-300"
                  :class="base.form.ref ? 'bg-green-50 text-black' : ''"
                  v-model="base.form.ref"
                  :disabled="locked"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Invoice</span>
                </label>
                <!-- <label 
                  class="input input-sm flex items-center gap-2 border-gray-300"
                  :class="locked ? 'input-disabled' : base.form.inv ? 'bg-green-50 text-black' : 'input-bordered'"
                >
                  AE
                  <input
                    type="text"
                    placeholder="..."
                    class="grow input-xs w-full"
                    :class="!locked ? base.form.inv ? 'bg-green-50 text-black' : '' : ''"
                    v-model="base.form.inv"
                    :disabled="locked"
                  />
                </label> -->
                <div class="join">
                  <button
                    class="join-item btn btn-sm disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-500"
                    disabled
                  >
                    AE
                  </button>
                  <input
                    type="text"
                    placeholder="..."
                    class="join-item input input-sm input-bordered bordor-gray-300 w-full"
                    :class="!locked ? base.form.inv ? 'bg-green-50 text-black' : '' : ''"
                    v-model="base.form.inv"
                    :disabled="locked"
                  />
                </div>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Loading Date </span><span class="text-xs text-error">{{ msg.date }}</span>
                </label>
                <input
                  type="date"
                  placeholder="shipping date"
                  class="input input-sm input-bordered border-gray-300"
                  :class="base.form.load_date ? 'bg-green-50 text-black' : ''"
                  v-model="base.form.load_date"
                  :disabled="locked"
                  :data-date="
                    $moment(base.form.load_date).format(
                      'DD-MM-YYYY'
                    )
                  "
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Customer </span><span class="text-xs text-error">{{ msg.customer }}</span>
                </label>
                <select class="select select-sm select-bordered" v-model="base.form.customer" disabled>
                  <option value="VITA" selected>VITA</option>
                </select>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Shipping Marks </span>
                </label>
                <select class="select select-sm select-bordered" v-model="base.form.customer" disabled>
                  <option value="VITA" selected>VT2024</option>
                </select>
              </div>
              <div class="form-control col-span-2">
                <label class="label">
                  <span class="label-text font-semibold">Remark </span>
                </label>
                <input
                  type="text"
                  placeholder="remark"
                  class="input input-sm input-bordered border-gray-300"
                  :class="base.form.remark ? 'bg-green-50 text-black' : ''"
                  v-model="base.form.remark"
                  :disabled="locked"
                />
              </div>
            </div>
            <div class="form-control mt-5">
              <div class="overflow-x-auto min-h-40 max-h-40 border shadow">
                <table class="table table-xs table-pin-rows table-pin-cols table-zebra table-auto">
                  <thead>
                    <tr>
                      <th class="flex items-center" v-if="base.form.status != 'receiving' && base.form.status != 'received' && base.controll == 'edit' && base.permission == 'superadmin'">
                        <input type="checkbox" class="checkbox checkbox-xs checked:checkbox-success me-1" v-model="printall" />
                        <label
                          class="btn modal-button btn-xs"
                          @click="prod_detail('create', 0);"
                        >
                          พิมพ์
                        </label>
                      </th>
                      <td>ลำดับ</td>
                      <td>Product</td>
                      <td>Description</td>
                      <td class="text-right">Quantity</td>
                      <td class="text-center" colspan="2">Pack Size</td>
                      <td class="text-center" colspan="2">Net Weight</td>
                      <td>อัพเดทล่าสุดเมื่อ</td>
                      <th class="text-right" v-if="!locked && base.permission == 'superadmin'">
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
                    <tr class="text-center" v-if="msg.detail">
                      <td colspan="11">
                        <span class="text-xs text-error">{{ msg.detail }}</span>
                      </td>
                    </tr>
                    <tr
                      v-for="(row, index) in detail.rows"
                      :key="index"
                    >
                      <th class="text-center" v-if="base.form.status != 'receiving' && base.form.status != 'received' && base.controll == 'edit' && base.permission == 'superadmin'">
                        <input type="checkbox" class="checkbox checkbox-xs checked:checkbox-success" v-model="printcheck[index]" />
                      </th>
                      <td>{{ index + 1 }}</td>
                      <td>{{ row.product }}</td>
                      <td>{{ row.descrip }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.total_qty) }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.pack_size) }}</td>
                      <td>{{ row.unit }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.net_weight) }}</td>
                      <td>{{ row.unit }}</td>
                      <td>{{ $moment(row.updated_at ? row.updated_at : row.created_at).format("DD-MM-YYYY HH:mm:ss") }}</td>
                      <th class="text-right" v-if="!locked">
                        <label
                          class="btn btn-ghost modal-button btn-xs"
                          @click="scan = true; detail_edit(`${row.code}`, `${index}`)"
                        >
                          <span class="underline underline-offset-2">แก้ไข</span>
                        </label>
                        <span v-if="base.permission == 'superadmin'">|</span>
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
                          v-if="base.permission == 'superadmin'"
                        >
                          ลบ
                        </label>
                      </th>
                      <th class="text-right" v-else>
                        <label
                          class="btn btn-ghost modal-button btn-xs"
                          @click="detail_edit(`${row.code}`, `${index}`)"
                        >
                          <span class="underline underline-offset-2">รายละเอียด</span>
                        </label>
                      </th>
                    </tr>
                  </tbody>
                  <tfoot v-if="detail.rows.length && base.controll != 'create'">
                    <tr class="text-right">
                      <td :colspan="base.form.status != 'receiving' && base.form.status != 'received' ? '2' : '1'"></td>
                      <th colspan="9">Total Quantity : {{ new Intl.NumberFormat("en-US").format(sum) }}</th>
                    </tr>
                    <tr class="text-right">
                      <td :colspan="base.form.status != 'receiving' && base.form.status != 'received' ? '2' : '1'"></td>
                      <th colspan="9">Total Net Weight : {{ new Intl.NumberFormat("en-US").format(total_net) }}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div class="max-h-40" v-if="print.total">
              <h3 class="font-bold my-1 underline underline-offset-2">Print Format</h3>
              <div class="overflow-x-auto">
                <table class="table table-xs table-pin-rows table-pin-cols">
                  <thead>
                    <tr>
                      <td>ลำดับ</td>
                      <td>code</td>
                      <td>สร้างรายการเมื่อ</td>
                      <th class="text-right">#สั่งพิมพ์ - ลบ#</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(row, index) in print.rows"
                      :key="index"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>{{ row.code }}</td>
                      <td>{{ $moment(row.created_at).format("DD-MM-YYYY HH:mm:ss") }}</td>
                      <th class="text-right">
                        <label
                          class="btn modal-button btn-xs"
                          @click="prod_detail('show', index);"
                        >
                          พิมพ์
                        </label>
                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs ml-1"
                          :class="locked ? 'btn-disabled' : ''"
                          @click="
                            remove_item(
                              `${row.code}`,
                              'detail',
                              'api/controllers/MYSQL/INTERNAL/WMS/print'
                            )
                          "
                          v-if="base.permission == 'superadmin'"
                        >
                          ลบ
                        </label>
                      </th>
                    </tr>
                  </tbody>
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
                  class="input input-sm input-bordered border-gray-300"
                  
                  disabled
                  :value="base.form.creator_name ? base.form.creator_name : user.firstname+' '+user.lastname"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Status</span>
                </label>
                <label class="form-control w-full">
                  <select 
                    class="select select-sm select-bordered border-gray-300" 
                    :class="base.form.status ? 'bg-green-50' : ''"
                    v-model="base.form.status" 
                    :disabled="locked"
                  >
                    <option disabled selected value="">เลือกรายการ</option>
                    <option value="pending">เตรียมจัดส่ง</option>
                    <option value="shipping">จัดส่งแล้ว</option>
                    <option value="receiving" disabled>กำลังรับสินค้า</option>
                    <option value="received" disabled>รับสินค้าแล้ว</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
          <hr v-if="!locked" />
          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex" v-if="!locked">
            <div class="flex-1 form-control mt-6">
              <label for="modal-base" class="btn btn-danger">Cancel</label>
            </div>
            <div class="flex-1 form-control mt-6" v-if="base.permission == 'superadmin'">
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
          <div class="card-body overflow-auto" style="max-height: 60vh;">
            <div class="grid gap-3 grid-cols-2 sm:grid-cols-2">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Product</span><span class="text-xs text-error">{{ msg.product }}</span>
                </label>
                <AppModuleGlobalSelectSearch
                  v-if="!edit"
                  :placeholder="'short code'"
                  :label="'short_code'"
                  :code="'short_code'"
                  :minChar="0"
                  :delay="0.5"
                  :limit="10"
                  :customClass="`input input-sm input-bordered ${
                    checkbox == 'M' ? 'input-disabled' : ''
                  } ${detail.form.product ? 'bg-green-50 text-black' : ''}`"
                  :disabled="checkbox == 'M' ? true : false"
                  :current="detail.form.product"
                  :refresh="refresh.product"
                  @updateValue="
                    (obj) => {
                      detail.form.product = obj.short_code;
                      wh = obj.wh;
                    }
                  "
                  @stopRefresh="
                    (obj) => {
                      refresh.product = obj.value;
                    }
                  "
                  :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort`"
                  :param="`&item_name=1&total=1&wh=${user.companyTitle}&action=groupby-code`"
                />
                <input
                  v-else
                  type="text"
                  placeholder="short code"
                  class="input input-sm input-bordered border-gray-300"
                  v-model="detail.form.product"
                  disabled
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Description</span><span class="text-xs text-error">{{ msg.descrip }}</span>
                </label>
                <select 
                  class="select select-sm select-bordered w-full border-base-content"
                  :class="detail.form.descrip ? 'bg-green-50' : ''"
                  v-model="detail.form.descrip" 
                  :disabled="edit"
                >
                  <option value="" disabled selected>เลือก Description</option>
                  <option v-for="v in datalist">{{ v.item_name }}</option>
                </select>
              </div>
              <!-- <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Remarks</span>
                </label>
                <input
                  type="text"
                  placeholder="Remarks"
                  class="input input-bordered"
                  v-model="detail.form.remarks"
                  :disabled="edit"
                />
              </div> -->
            </div>
            <div class="grid gap-3 grid-cols-3 md:grid-cols-3">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Shelf Life</span>
                </label>
                <input
                  type="text"
                  placeholder="shelf life"
                  class="input input-sm input-bordered"
                  v-model="detail.form.shelf_life"
                  disabled
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Pack Size</span>
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="packing"
                  class="input input-sm input-bordered"
                  :class="detail.form.pack_size ? 'bg-green-50 text-black' : ''"
                  v-model="detail.form.pack_size"
                  :disabled="noPackandUnit ? false : true"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Unit</span>
                </label>
                <input
                  type="text"
                  placeholder="unit"
                  class="input input-sm input-bordered"
                  :class="detail.form.unit ? 'bg-green-50 text-black' : ''"
                  v-model="detail.form.unit"
                  :disabled="noPackandUnit ? false : true"
                />
              </div>
            </div>
            <div class="form-control mt-5">
              <div class="overflow-x-auto min-h-40 max-h-40 border">
                <table class="table table-xs table-pin-rows table-pin-cols table-zebra">
                  <thead>
                    <tr>
                      <th>ลำดับ</th>
                      <td>Lot No.</td>
                      <td class="text-center">MFG</td>
                      <td class="text-center">EXP</td>
                      <td class="text-right">Quantity</td>
                      <th class="text-right" v-if="!locked && base.permission == 'superadmin'">
                        <label
                          for="modal-item"
                          class="btn btn-primary modal-button btn-xs text-white me-1"
                          @click="scan = false; item_create()"
                        >
                          + new
                        </label>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in item.rows" :key="index">
                      <th>{{ index + 1 }}</th>
                      <td>{{ row.lot }}</td>
                      <td class="text-center">{{ $moment(row.mfg).format("DD-MM-YYYY") }}</td>
                      <td class="text-center">{{ $moment(row.exp).format("DD-MM-YYYY") }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.quantity) }}</td>
                      <th class="text-right" v-if="!locked">
                        <label
                          for="modal-item"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="scan = true; item_edit(`${row.code}`, `${index}`)"
                        >
                          แก้ไข
                        </label>
                        <span class="mx-1" v-if="detail.controll != 'create' && base.permission == 'superadmin'">|</span>
                        <label
                          for="modal-remove"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${row.code}`,
                              'item',
                              'api/controllers/MYSQL/INTERNAL/WMS/item',
                              `${row.lot}`
                            )
                          "
                          v-if="base.permission == 'superadmin'"
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
          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex" v-if="!locked">
            <div class="flex-1 form-control mt-6">
              <label for="modal-detail" class="btn btn-danger" @click="scan = false">Cancel</label>
            </div>
            <div class="flex-1 form-control mt-6" v-if="base.permission == 'superadmin'">
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
        <div class="modal-box w-11/12 max-w-xs">
          <label
            for="modal-item"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div class="card-body overflow-auto" style="max-height: 68vh;">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Lot Number</span><span class="text-xs text-error">{{ msg.lot }}</span>
              </label>
              <input
                type="text"
                placeholder="lot number"
                class="input input-sm input-bordered border-gray-300"
                :class="item.form.lot ? 'bg-green-50 text-black' : ''"
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
                class="input input-sm input-bordered border-gray-300"
                :class="item.form.quantity ? 'bg-green-50 text-black' : ''"
                min="1"
                v-model="item.form.quantity"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">MFG</span><span class="text-xs text-error">{{ msg.mfg }}</span>
              </label>
              <input
                type="date"
                placeholder="mfg"
                class="input input-sm input-bordered border-gray-300"
                :class="item.form.mfg ? 'bg-green-50 text-black' : ''"
                v-model="item.form.mfg"
                :disabled="scan ? true : false"
                :data-date="
                  $moment(item.form.mfg).format(
                    'DD-MM-YYYY'
                  )
                "
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">EXP</span><span class="text-xs text-error">{{ msg.exp }}</span>
              </label>
              <input
                type="date"
                placeholder="exp"
                class="input input-sm input-bordered border-gray-300"
                :class="item.form.exp ? 'bg-green-50 text-black' : ''"
                v-model="item.form.exp"
                disabled
                :data-date="
                  $moment(item.form.exp).format(
                    'DD-MM-YYYY'
                  )
                "
              />
            </div>
          </div>
          <hr v-if="base.permission == 'superadmin'" />
          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex" v-if="base.permission == 'superadmin'">
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
        <div class="modal-box w-11/12 max-w-2xl">
          <label
            for="modal-print"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            @click="printcheck = []; printall = false"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">Choose Print Format</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 68vh;">
            <div>
              <div class="border-dashed border-2 border-slate-300 p-2" :class="!build ? 'rounded-lg' : ''">
                <div class="form-control mb-1">
                  <label class="label">
                    <span class="label-text font-semibold">จำนวน Package ของ Pallet ที่ {{ this.list.reduce((a,b) => { return a.order > b.order ? a.order : b.order }, 0) + 1 }}</span>
                  </label>
                  <input
                    type="number"
                    placeholder="จำนวน Package ต่อ Pallet"
                    class="input input-sm input-bordered border-gray-300"
                    :class="floor ? 'bg-green-50 text-black' : ''"
                    min=1
                    v-model="floor"
                  />
                </div>
                <hr class="my-3">
                <div class="grid grid-cols-5 gap-3 my-1">
                  <span class="label-text text-xs font-semibold">lot</span>
                  <span class="label-text text-xs font-semibold">จำนวนทั้งหมด</span>
                  <span class="label-text text-xs font-semibold">จำนวนคงเหลือ</span>
                  <span class="label-text text-xs font-semibold">กรอกจำนวน</span>
                  <span class="label-text text-xs font-semibold">เพิ่ม</span>
                </div>
                <div class="grid grid-cols-5 gap-3 my-1" v-for="(row, index) in item.rows">
                  <input c type="text" :value="row.lot" class="input input-bordered input-xs" readonly />
                  <input type="number" :value="row.quantity" class="input input-bordered input-xs" readonly />
                  <input type="number" :value="list.length ? row.quantity - list.filter(x => x.lot == row.lot).reduce((sum, v) =>  sum + v.qty, 0) : row.quantity" class="input input-bordered input-xs" readonly />
                  <input 
                    type="number" 
                    placeholder="จำนวน" 
                    class="input input-bordered input-xs border-gray-300" 
                    :class="qty[index] ? 'bg-green-50 text-black' : ''"
                    v-model="qty[index]" 
                    @change="change(index, row.quantity - list.filter(x => x.lot == row.lot).reduce((sum, v) =>  sum + v.qty, 0))" 
                    :disabled="list.length ? row.quantity - list.filter(x => x.lot == row.lot).reduce((sum, v) =>  sum + v.qty, 0) > 0 ? 0 : 1 : 0" 
                  />
                  <button 
                    class="btn btn-xs btn-success text-white" @click="qty[index] ? add(index) : ''"
                    :disabled="qty[index] ? list.length ? row.quantity - list.filter(x => x.lot == row.lot).reduce((sum, v) =>  sum + v.qty, 0) > 0 ? 0 : 1 : 0 : ''"
                  >
                    <Icon icon="gridicons:add-outline" width="1.2rem" height="1.2rem" />
                  </button>
                </div>
                <div class="overflow-x-auto w-full mb-3" :class="!build ? 'mt-3': ''">
                  <table class="table table-xs">
                    <thead>
                      <tr>
                        <th class="border border-slate-300" rowspan="2" :colspan="build ? '2' : '1'">pallet</th>
                        <td class="border border-slate-300 text-center" :colspan="build ? '6' : '7'">item</td>
                      </tr>
                      <tr>
                        <th class="border border-slate-300">lot</th>
                        <th class="border border-slate-300">จำนวน</th>
                        <th class="border border-slate-300">mfg</th>
                        <th class="border border-slate-300">drum</th>
                        <th class="border border-slate-300">บรรจุได้</th>
                        <th class="border border-slate-300 text-center">ลบ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if="list.length" v-for="n in list.length > 1 ? list.reduce((a,b) => { return a.order > b.order ? a.order : b.order }) + 1 : 1">
                        <tr>
                          <td class="border border-slate-300" :rowspan="list.filter(x => x.order+1 == n).length + 1">{{ n }}</td>
                          <td class="border border-slate-300" :rowspan="list.filter(x => x.order+1 == n).length + 1" v-if="build">
                            <input type="number" class="input input-xs input-bordered w-12" v-model="fsize[n-1]" />
                          </td>
                        </tr>
                        <tr v-for="(l, index) in list.filter(x => x.order+1 == n)">
                          <td class="border border-slate-300">{{ l.lot || '-' }}</td>
                          <td class="border border-slate-300">{{ l.qty || '-' }}</td>
                          <td class="border border-slate-300">{{ l.mfg || '-' }}</td>
                          <td class="border border-slate-300" v-if="l.drum != '-'">
                            {{ l.drum + (drumcheck ? drum_start[drum_lot.find(x => x.lot == l.lot).order] : 1)  }}
                            <span v-if="l.qty != 1">-{{ l.drum + l.qty + (drumcheck ? drum_start[drum_lot.find(x => x.lot == l.lot).order]-1 : 0) }}</span>
                          </td>
                          <td class="border border-slate-300" v-else>-</td>
                          <td class="border border-slate-300">{{ l.floor || '-' }}</td>
                          <td class="border border-slate-300 text-center" :rowspan="list.filter(x => x.order+1 == n).length + 1" v-if="!index">
                            <button 
                              class="btn btn-xs btn-ghost text-error" 
                              @click="remove_from_list(l.order)"
                              :disabled="!l.lot || base.form.status.indexOf('receiv') > -1"
                            >
                              <Icon icon="material-symbols:cancel-presentation" width="16" height="16" />
                            </button>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                <div class="form-control border-dashed border-neutral border-2">
                  <label class="label cursor-pointer">
                    <span class="label-text font-semibold">Drum No.</span> 
                    <input type="checkbox" class="toggle toggle-sm toggle-success" v-model="drumcheck" />
                  </label>
                  <div class="grid grid-cols-2 gap-1 m-1" v-if="drumcheck">
                    <div class="text-left" v-for="(v, i) in drum_lot">
                      <span class="text-sm me-3">เริ่มนับ <span class="text-blue-500">{{ v.lot }}</span> จาก :</span>
                      <input
                        type="number"
                        placeholder=""
                        min="1"
                        class="input input-xs input-bordered border-gray-300 w-12"
                        :class="drum_start[i] ? 'bg-green-50 text-black' : ''"
                        v-model="drum_start[i]"
                      />
                    </div>
                  </div>
                </div>
                <div class="grid gap-3 grid-cols-2">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text text-xs font-semibold">QR size</span>
                    </label>
                    <input
                      type="number"
                      placeholder="QRcode size"
                      min="1"
                      class="input input-sm input-bordered border-gray-300"
                      :class="qrsize ? 'bg-green-50 text-black' : ''"
                      v-model="qrsize"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text text-xs font-semibold">Barcode size</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Barcode size"
                      min="1"
                      class="input input-sm input-bordered border-gray-300"
                      :class="barsize ? 'bg-green-50 text-black' : ''"
                      v-model="barsize"
                    />
                  </div>
                </div>
                <!-- <draggable class="dragArea list-group w-full" :list="list" >
                  <div
                    class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                    v-for="(v,i) in list"
                    :key="i"
                  >
                    {{ v }}
                  </div>
                </draggable> -->
                <div class="backdrop-blur sticky top-0 items-center gap-2 flex">
                  <div 
                    class="flex-1 form-control mt-2" 
                    :class="base.form.status.indexOf('receiv') > -1 ? 'hidden' : ''"
                    v-if="base.permission == 'superadmin'"  
                  >
                    <button class="btn btn-success text-white" @click="confirm.modal = true">Save</button>
                  </div>
                  <div class="flex-1 form-control mt-2" :class="!build ? 'hidden' : ''">
                    <button class="btn"  @click="printPaper()">Print</button>
                  </div>
                </div>
              </div>
            </div>
            <div id="printMe" class="landscape:hidden" style="display: none;" v-if="build">
              <div style="display: flex; justify-content: center;" v-for="n in this.list.filter(x => x.lot).reduce((a,b) => { return a.order > b.order ? a.order : b.order }, 0) + 1" v-if="build">
                <div style="white-space: nowrap;" align="center">
                  <h3 :style="`font-size: ${fsize[n-1]}px;`">EN{{ base.form.en }} ({{ base.form.ref }})</h3>
                  <h3 :style="`font-size: ${fsize[n-1]}px;`">PALLET NO. {{ n }}</h3>
                  <!-- <h3 :style="`font-size: ${fsize[n-1]}px;`">
                    {{ list.filter(x => x.order == n-1) }}
                    {{ detail.rows.find(x => x.code == list.find(x => x.order == n-1).code).descrip.indexOf('UBIS Compound') > -1
                      ? detail.rows.find(x => x.code == list.find(x => x.order == n-1).code).descrip.split(' Compound ')[1]
                      : detail.rows.find(x => x.code == list.find(x => x.order == n-1).code).descrip.indexOf('UBIS Lacquer') > -1
                        ? detail.rows.find(x => x.code == list.find(x => x.order == n-1).code).descrip.split(' Lacquer ')[1]
                        : ''
                    }} = 
                    {{ list.filter(x => x.order == n-1).reduce((a, b) => { return { qty: a.qty + b.qty } }).qty }} x 
                    {{ detail.rows.find(x => x.code == list.find(x => x.order == n-1).code).pack_size }} {{ detail.rows.find(x => x.code == list.find(x => x.order == n-1).code).unit }}
                  </h3> -->
                  <div v-if="list.filter(x => x.order == n-1).length == 1">
                    <h3 :style="`font-size: ${fsize[n-1]}px;`">
                      {{ detail.rows.find(x => x.code == list.find(x => x.order == n-1).code).descrip.indexOf('UBIS Compound') > -1
                        ? detail.rows.find(x => x.code == list.find(x => x.order == n-1).code).descrip.split(' Compound ')[1]
                        : detail.rows.find(x => x.code == list.find(x => x.order == n-1).code).descrip.indexOf('UBIS Lacquer') > -1
                          ? detail.rows.find(x => x.code == list.find(x => x.order == n-1).code).descrip.split(' Lacquer ')[1]
                          : ''
                      }} = 
                      {{ list.filter(x => x.order == n-1).reduce((a, b) => { return { qty: a.qty + b.qty } }).qty }} x 
                      {{ detail.rows.find(x => x.code == list.find(x => x.order == n-1).code).pack_size }} {{ detail.rows.find(x => x.code == list.find(x => x.order == n-1).code).unit }}
                    </h3>
                    <span v-for="v in list.filter(x => x.order == n-1)">
                      <h3 :style="`font-size: ${fsize[n-1]}px;`">LOT NO. {{ v.lot }}<span v-if="v.qty != list.filter(x => x.order == n-1).reduce((a, b) => { return { qty: a.qty + b.qty } }).qty"> = {{ v.qty }}</span></h3>
                      <h3 :style="`font-size: ${fsize[n-1]}px;`" v-if="drumcheck">DRUM NO. {{ v.drum + drum_start[drum_lot.find(x => x.lot == v.lot).order] }}<span v-if="v.qty != 1"> - {{ v.drum + v.qty + drum_start[drum_lot.find(x => x.lot == v.lot).order]-1 }}</span></h3>
                    </span>
                  </div>
                  <div 
                    v-else 
                    :style="`font-size: ${fsize[n-1]-5}px;`" 
                    v-for="(l, i) in list.filter(x => x.order == n-1)"
                  >
                  <!-- {{!i}} -->
                  <!-- {{ list.filter(x => x.order == n-1 && x.code == l.code).length == 1 }} -->
                    <h3 v-if="!i || list.filter(x => x.order == n-1 && x.code == l.code).length == 1">
                      <!-- {{ l.code }} -->
                      {{ detail.rows.find(x => x.code == l.code).descrip.indexOf('UBIS Compound') > -1
                        ? detail.rows.find(x => x.code == l.code).descrip.split(' Compound ')[1]
                        : detail.rows.find(x => x.code == l.code).descrip.indexOf('UBIS Lacquer') > -1
                          ? detail.rows.find(x => x.code == l.code).descrip.split(' Lacquer ')[1]
                          : ''
                      }} = 
                      {{ list.filter(x => x.order == n-1 && x.code == l.code).reduce((a, b) => { return { qty: a.qty + b.qty } }).qty }} x 
                      {{ detail.rows.find(x => x.code == l.code).pack_size }} {{ detail.rows.find(x => x.code == l.code).unit }}
                      
                      <span v-for="v in list.filter(x => x.order == n-1 && x.code == l.code)">
                        <h3 :style="`font-size: ${fsize[n-1]}px;`">LOT NO. {{ v.lot }}<span v-if="v.qty != list.filter(x => x.order == n-1).reduce((a, b) => { return { qty: a.qty + b.qty } }).qty"> = {{ v.qty }}</span></h3>
                        <h3 :style="`font-size: ${fsize[n-1]}px;`" v-if="drumcheck">DRUM NO. {{ v.drum + drum_start[drum_lot.find(x => x.lot == v.lot).order] }}<span v-if="v.qty != 1"> - {{ v.drum + v.qty + drum_start[drum_lot.find(x => x.lot == v.lot).order]-1 }}</span></h3>
                      </span>
                    </h3>
                  </div>
                  <table style="width: 100%">
                    <tr>
                      <td width="50%">
                        <VueQRCodeComponent :text="'https://tracking.ubisasia.com:8989/WMS/ScanToReceive?'+print.form.code+'&'+n+'&ubis'" :size="3*qrsize" />
                      </td>
                      <td width="50%">
                        <vue-barcode :value="print.form.code+'&'+n+'&ubis'" :options="{ displayValue: false, width: 3*barsize, height: 150*barsize }" tag="img"/>
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
                คุณแน่ใจหรือไม่ว่าจะลบรายการนี้?
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
      <!-- modal confirm -->
      <input
        type="checkbox"
        id="modal-confirm"
        class="modal-toggle"
        v-model="confirm.modal"
      />
      <div class="modal" v-if="confirm.modal">
        <div class="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert">
          <div class="flex p-4">
            <div class="flex-shrink-0">
              <svg class="size-5 text-gray-600 mt-1 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </div>
            <div class="ms-4">
              <h3 class="text-success font-semibold dark:text-white underline underline-offset-2">
                System notification
              </h3>
              <div class="mt-2 text-sm text-slate-500 dark:text-neutral-400">
                ยืนยันที่จะบันทึก format การพิมพ์?
              </div>
              <div class="mt-4">
                <div class="flex space-x-3">
                  <button type="button" class="btn btn-xs btn-active decoration-2 font-medium text-xs text-white dark:text-blue-500" @click="confirm.modal = false">
                    Cancel
                  </button>
                  <button type="button" class="btn btn-xs btn-success decoration-2 font-semibold text-xs text-white dark:text-blue-500 w-1/2" :disabled="confirm.loading" @click="save()">
                    <span v-if="confirm.loading" class="loading loading-spinner loading-xs"></span>
                    <span v-else>Confirm</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #view>
      <div class="gap-3 py-3">
        <div class="card card-compact shadow-lg bg-base-100 border-2">
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
            <div class="flex justify-end mb-2" v-if="base.permission == 'superadmin'">
              <label
                for="modal-base"
                class="btn btn-sm btn-primary modal-button text-white shadow"
                @click="base_create()"
              >
                <Icon icon="uil:create-dashboard" width="18" height="18" />
                สร้างรายการ
              </label>
            </div>
            <div class="border-2 border-dashed rounded-xl p-2">
              <div class="join w-full">
                <button
                  class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                  disabled
                >
                  ประเภทวัน:
                </button>
                <select 
                  class="join-item select select-bordered select-sm w-full border-gray-300 shadow"
                  :class="base.date ? 'bg-yellow-50 text-black' : ''"
                  v-model="base.date"
                >
                  <option value="load_date" selected>loading date</option>
                  <option value="created_at">created date</option>
                  <option value="shipped_at">shipped date</option>
                  <option value="received_at">received date</option>
                </select>
                <button
                  class="md:block hidden join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                  disabled
                >
                  เริ่มจาก:
                </button>
                <input 
                  type="date" 
                  class="join-item input input-bordered input-sm sm:w-full w-24 border-gray-300 shadow"
                  :class="base.from ? 'bg-yellow-50 text-black' : ''"
                  v-model="base.from"
                  :data-date="
                    $moment(base.from).format(
                      'DD-MM-YYYY'
                    )
                  "
                />
                <button
                  class="md:block hidden join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                  disabled
                >
                  -
                </button>
                <input 
                  type="date" 
                  class="join-item input input-bordered input-sm sm:w-full w-24 border-gray-300 shadow"
                  :class="base.to ? 'bg-yellow-50 text-black' : ''"
                  v-model="base.to"
                  :data-date="
                    $moment(base.to).format(
                      'DD-MM-YYYY'
                    )
                  "
                />
                <button class="join-item btn btn-sm btn-active text-white shadow border-gray-300" 
                  @click="searching"
                >
                  <Icon
                    icon="tabler:search"
                    class="text-white"
                    width="18" height="18"
                  />
                    <span class="md:block hidden">ค้นหา</span>
                </button>
              </div>
            </div>
            <div class="p-2">
              <div class="flex justify-end">
                <AppModuleGlobalSearch
                  :class="`join-item input input-sm input-bordered border-gray-300 w-full md:max-w-xs ${base.q ? 'bg-yellow-50 text-black' : ''}`"
                  @search="
                    (q) => {
                      base.q = q;
                      base.page = 1;
                      base_search();
                    }
                  "
                />
              </div>
              <div class="overflow-x-auto w-full max-h-[52vh] my-3">
                <div v-if="!base.loading && base.rows.length == 0">
                  <AppModuleGlobalEmptyData
                    :class="`p-4 py-12 text-3xl text-center`"
                  />
                </div>
                <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                  <thead>
                    <tr class="italic">
                      <th>EN</th>
                      <td>Status</td>
                      <td>Inv.#</td>
                      <td>กำหนดส่ง</td>
                      <td>Transaction Maker</td>
                      <td colspan="2">Transaction</td>
                      <td>Remarks</td>
                      <th class="text-center">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in base.rows" :key="row.code">
                      <th>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div>
                              {{ row.en }}
                            </div>
                            <div class="opacity-50">
                              ( {{ row.ref }} )
                            </div>
                          </div>
                        </div>
                      </th>
                      <td>
                        <span 
                          class="badge badge-sm font-semibold italic px-4 py-2 w-20 text-base-100" 
                          :class="row.status == 'received' ? 'badge-success' : row.status == 'receiving' ? 'badge-warning' : row.status == 'shipping' ? 'badge-info' : 'badge-error'">
                            {{ row.status }}
                        </span>
                      </td>
                      <td>{{ row.inv || '-' }}</td>
                      <td class="italic">{{ row.load_date ? $moment(row.load_date).format("DD-MM-YYYY") : '-' }}</td>
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
                          <div class="text-right">
                            <div>
                              shipped at :
                            </div>
                            <hr>
                            <div>
                              received at :
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div>
                              {{ row.shipped_at ? $moment(row.shipped_at).format("DD-MM-YYYY HH:mm:ss")  : '-' }}
                            </div>
                            <hr v-if="row.shipped_at">
                            <div v-if="row.shipped_at">
                              {{ row.received_at ? $moment(row.received_at).format("DD-MM-YYYY HH:mm:ss")  : '-' }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{{ row.remark || '-' }}</td>
                      <th class="text-center" v-if="row.status == 'pending'">
                        <label
                          class="join-item btn btn-ghost text-warning hover:text-black modal-button btn-xs"
                          @click="base_edit(`${row.code}`, `${index}`)"
                        >
                          <span class="underline underline-offset-2">แก้ไข</span>
                        </label>
                        <span v-if="base.permission == 'superadmin'">|</span>
                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost text-error hover:text-black modal-button btn-xs"
                          @click="
                            remove_item(
                              `${row.code}`,
                              'base',
                              'api/controllers/MYSQL/INTERNAL/WMS/trans'
                            )
                          "
                          v-if="base.permission == 'superadmin'"
                        >
                          ลบ
                        </label>
                      </th>
                      <th class="text-center" v-else>
                        <label
                          class="btn btn-ghost modal-button btn-xs text-slate-500 hover:text-black"
                          @click="base_edit(`${row.code}`, `${index}`)"
                        >
                          <span class="underline underline-offset-2">รายละเอียด</span>
                        </label>
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

<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import VueQRCodeComponent from "vue-qrcode-component";
import VueBarcode from '@chenfengyuan/vue-barcode';
import Query from "@/assets/js/fetch.js";
import { useToast } from "vue-toastification";
import { socket } from "@/socket";

import { VueDraggableNext } from 'vue-draggable-next'
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
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    VueQRCodeComponent,
    VueBarcode,draggable: VueDraggableNext,
  },
  setup() {
    const toast = useToast();
    return { toast }
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
      enabled: true,
      dragging: false,
      noPackandUnit: false,
      wh: '',
      fsize: [],
      qrsize: 0,
      barsize: 0,
      drumcheck: false,
      build: false,
      compile: 1,
      qty: [],
      floor: '',
      mock_rc: false,
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
      list: [],
      drum_start: [],
      datalist: [],
      printcheck: [],
      printall: false,
      options: {
        penColor: "#c0f"
      },
      msg: {
        en: '',
        ref: '',
        customer: '',
        date: '',
        product: '',
        descrip: '',
        lot: '',
        quantity: '',
        mfg: '',
        detail: '',
        item: '',
      },
      base: {
        permission: "",
        rows: [],
        total: 0,
        page: 1,
        row: 15,
        q: "",
        date: "load_date",
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
      print: {
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
      item: {
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
      confirm: {
        modal: false,
        loading: false
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
    }
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
    searching() {
      this.base.page = 1;
      this.base_search();
    },
    // Base
    base_search() {
      this.base.loading = true;
      this.base_get((res) => {
        setTimeout(() => {
          this.base.permission = res.permission;
          this.base.rows = res.rows;
          this.base.total = res.total;
          this.base.next = this.base.page * this.base.row >= this.base.total ? false : true;
          this.base.back = this.base.page > 1 ? true : false;
          this.base.loading = false;
        }, 200);
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/trans?total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${
        this.base.q ? `&q=${this.base.q}` : ""}&date=${this.base.date}${this.base.from ? '&from='+this.base.from : ''}${this.base.to  ? '&to='+this.base.to : ''}`, (res) => {
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
      this.msg.customer = ''
      this.msg.date = ''
      this.msg.detail = ''

      this.base.current = this.makeid(15);
      this.base.form = {
        code: this.base.current,
        en: "",
        ref: "",
        packing: "",
        customer: "VITA",
        shipping_mark: "",
        shipping_date: "",
        status:'pending',
        remark: ''
      };

      this.detail.rows = [];
      this.print.rows = [];
      this.print.total = 0;
      this.base.controll = "create";
      this.locked = false;
    },
    base_edit(code, index) {
      this.printall = false
      this.sum = 0
      this.total_net = 0

      this.msg.en = ''
      this.msg.ref = ''
      this.msg.packing = ''
      this.msg.mark = ''
      this.msg.date = ''
      this.msg.detail = ''

      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.detail.rows = [];
      this.base.controll = "edit";
      this.detail_search();
      this.refresh = true;
      this.locked = this.base.form.status == 'pending' || this.base.form.status == 'shipping' ? false : true;
    },
    base_save(type) {
      if(!this.base.form.en || !this.base.form.ref || !this.base.form.customer || !this.base.form.load_date) {
        if(!this.base.form.en) this.msg.en = '*กรอกข้อมูล*'
        else this.msg.en = ''
        if(!this.base.form.ref) this.msg.ref = '*กรอกข้อมูล*'
        else this.msg.ref = ''
        if(!this.base.form.customer) this.msg.customer = '*กรอกข้อมูล*'
        else this.msg.customer = ''
        if(!this.base.form.load_date) this.msg.date = '*กรอกข้อมูล*'
        else this.msg.date = ''
        return;
      } else {
        this.msg.en = ''
        this.msg.ref = ''
        this.msg.packing = ''
        this.msg.mark = ''
        this.msg.date = ''
      }

      if(this.base.form.status == 'shipping') {
        if(!this.detail.rows.length) {
          this.msg.detail = '*เพิ่ม Product ก่อนส่ง*'
          return;
        }
      }

      let obj = {
        rows: [
          {
            ...this.base.form
          },
        ]
      };

      if(this.base.form.status == 'shipping') {
        obj['rows'][0]["shipped_at"] = this.dateNow()
        obj['rows'][0]["shipped_by"] = this.user.code
      }

      new Query(null, this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/trans`, obj, (res) => {
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
        this.printcheck = []

        this.print.rows = [];
        this.print_get((res) => {
          this.print.rows = res.rows;
          this.print.total = res.total;
          this.print.next =
            this.print.page * this.print.row >= this.print.total
              ? false
              : true;
          this.print.back = this.print.page > 1 ? true : false;
          this.print.loading = false;

          this.base.modal = true
        });
      });
    },
    detail_get(callback) {
      new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/prod?trans_code=${this.base.form.code}&total=1`, (res) => {
        if (res.success) {
          res.rows.filter(x => x.code).forEach(x => {
            this.sum += parseFloat(x.total_qty)
            x['net_weight'] = x.total_qty*x.pack_size
            this.total_net += x.net_weight
          })
        }
        callback({ ...res });
      });
    },
    // Show Print
    print_get(callback) {
      new Query('print','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/print?en=${this.base.form.code}&total=1`, (res) => {
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
      this.msg.product = ''
      this.msg.descrip = ''

      this.wh = ''

      this.detail.current = this.makeid(15);
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
      this.noPackandUnit = false
      this.msg.product = ''
      this.msg.descrip = ''

      this.wh = ''

      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.current = code;
      this.item.rows = [];
      this.item.new = [];
      this.detail.controll = "edit";
      this.item_search();
      this.refresh = true;
      this.edit = true;
    },
    detail_save(type) {
      if(!this.detail.form.product || !this.detail.form.descrip) {
        if(!this.detail.form.product) this.msg.product = '*กรอกข้อมูล*'
        else this.msg.product = ''
        if(!this.detail.form.descrip) this.msg.descrip = '*กรอกข้อมูล*'
        else this.msg.descrip = ''
        return;
      } else {
        this.msg.product = ''
        this.msg.descrip = ''
      }

      let obj = {
        rows: [
          {
            trans_code : this.base.current,
            product: this.detail.form.product,
            descrip: this.detail.form.descrip,
            shelf_life: this.detail.form.shelf_life,
            pack_size: this.detail.form.pack_size,
            unit: this.detail.form.unit,
            remarks: this.detail.form.remarks
          },
        ]
      };

      new Query(null, this.detail.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/prod`, obj, (res) => {
        if (!res.success) {
        } else {
          if (this.item.new.length) {
            let obj = { rows: [] }
            this.item.new.forEach((x, i) => {
              this.remove.code = x.code;
              this.remove.controll = 'item';
              this.remove.tb = 'api/controllers/MYSQL/INTERNAL/WMS/item';
              this.confirm_remove()

              obj['rows'][i] = {
                prod_code: this.detail.controll == 'create' ? res.rows[0].code : this.detail.current,
                trans_code: this.base.current,
                lot: x.lot,
                quantity: x.quantity,
                mfg: x.mfg,
                exp: x.exp
              }
            })

            new Query(null,'post').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/item`, obj, (res) => {
              if (!res.success) {
              } else {
                this.msg.detail = ''
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
    // Print
    prod_detail(controll, index) {
      this.item.rows = []
      this.qrsize = 38
      this.barsize = 0.75
      this.drumcheck = false
      this.list = []
      this.drum_lot = []
      this.drum_start = []

      let last_order = 0

      if (controll == 'show') {
        let checklist = []
        this.print.form = this.print.rows[index]
        checklist = JSON.parse(this.print.form.format)

        for (let i = 0; i < checklist.reduce((a,b) => { return a.pallet > b.pallet ? a.pallet : b.pallet }, 0); i++) {
          this.fsize[i] = 50
        }

        if (checklist) {
          // console.log(checklist)
          this.mock_rc = true
          if(Array.isArray(checklist)) {
            this.floor = checklist[0].total
  
            for (let n in checklist) {
              if (checklist[n].item.length) {
                for (let m in checklist[n].item) {
                  this.list.push({
                    code: checklist[n].item[m].code ? checklist[n].item[m].code : checklist[n].code,
                    lot: checklist[n].item[m].lot,
                    qty: checklist[n].item[m].qty,
                    mfg: checklist[n].item[m].mfg,
                    exp: checklist[n].item[m].exp,
                    order: checklist[n].pallet-1,
                    drum: this.list.filter(k => k.lot == checklist[n].item[m].lot).reduce((sum, v) => sum + v.qty, 0)
                  })

                  last_order = checklist[n].pallet-1
                }
              } else {
                this.list.push({
                  code: checklist[n].item.code ? checklist[n].item.code : checklist[n].code,
                  lot: checklist[n].item.lot,
                  qty: checklist[n].item.qty,
                  mfg: checklist[n].item.mfg,
                  exp: checklist[n].item.exp,
                  order: checklist[n].pallet-1,
                  drum: this.list.filter(k => k.lot == checklist[n].item.lot).reduce((sum, v) => sum + v.qty, 0)
                })

                last_order = checklist[n].pallet-1
              }
            }
          } else {
            this.floor = checklist.total

            this.list.push({
              code: checklist.item.code ? checklist.item.code : checklist.code,
              lot: checklist.item.lot,
              qty: checklist.item.qty,
              mfg: checklist.item.mfg,
              exp: checklist.item.exp,
              order: checklist.pallet-1,
              drum: this.list.filter(k => k.lot == checklist.item.lot).reduce((sum, v) => sum + v.qty, 0)
            })

            last_order = checklist[n].pallet-1
          }

          for (let num = 0; num < this.list.length; num++) {
            if (this.drum_start.length) {
              if (this.drum_lot.find(x => x.lot == this.list[num].lot)) {
              } else {
                this.drum_lot.push({
                  lot: this.list[num].lot,
                  order: this.drum_lot.length
                })
                this.drum_start.push(1)
              }
            } else {
              this.drum_lot.push({
                lot: this.list[num].lot,
                order: 0
              })
              this.drum_start.push(1)
            }
          }

          this.list.push({
            lot: '',
            qty: '',
            mfg: '',
            exp: '',
            order: last_order+1,
            drum: '-'
          })

          this.printcheck = JSON.parse(this.print.form.product)

          this.printcheck.forEach((x, i) => {
            if (x) {
              new Query(null,'get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/item?prod_code=${this.detail.rows[i].code}&total=1`, (res) => {
                res.rows.forEach(x => 
                  this.item.rows[this.item.rows.length] = x
                )
              });
            }
          })

          this.build = true
        }
      } else {
        this.list.push({
          lot: '',
          qty: '',
          mfg: '',
          exp: '',
          order: 0,
          drum: '-'
        })
        this.floor = ''

        this.printcheck.forEach((x, i) => {
          if (x) {
            new Query(null,'get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/item?prod_code=${this.detail.rows[i].code}&total=1`, (res) => {
              res.rows.forEach(x => 
                this.item.rows[this.item.rows.length] = x
              )
            });
          }
        })

        this.build = false
      }
      
      this.print.modal = true
    },
    change(index, limit) {
      if (this.qty[index] < 1) {
        this.qty[index] = 1
      } 
      
      if (this.qty[index] > limit) {
        this.qty[index] = limit
      } else {
        if (this.qty[index] > this.floor) {
          this.qty[index] = this.floor
        }
      }
    },
    add(index) {
      let mockup = []
      mockup = Object.assign({}, this.item.rows[index]);
      let count =  this.list.filter(k => k.lot).length
      let max = this.list.filter(x => x.lot).reduce((a,b) => { return a.order > b.order ? a.order : b.order }, -1)
      let last_order_qty = (max == -1) ? 0 : this.list.filter(k => k.order == this.list.reduce((a,b) => { return a.order > b.order ? a.order : b.order }, 0)).reduce((sum, v) =>  sum + v.qty, 0)
      let need = this.floor - last_order_qty

      let finding = this.list.filter(k => k.order == this.list.reduce((a,b) => { return a.order > b.order ? a.order : b.order }, 0)).find(kk => kk.lot == mockup.lot)
      if (finding) {
        finding = {
          code: mockup.prod_code,
          lot: mockup.lot,
          qty: this.qty[index] > need ? finding.qty + need : finding.qty + this.qty[index],
          mfg: mockup.mfg,
          exp: mockup.exp,
          order: this.list.filter(k => k.order == (isNaN(max) ? max.order : max)).find(kk => kk.lot == mockup.lot).order,
          drum: this.list.filter(k => k.order == (isNaN(max) ? max.order : max)).find(kk => kk.lot == mockup.lot).drum,
          floor: this.floor
        }

        this.list.forEach((x, i) => {
          if (x.lot == finding.lot && x.order == finding.order) {
            this.list[i] = finding
            return
          }
        })
      } else {
        if (max > -1) {
          this.list[count] = {
            code: mockup.prod_code,
            lot: mockup.lot,
            qty: this.qty[index] > need ? need : this.qty[index],
            mfg: mockup.mfg,
            exp: mockup.exp,
            order: this.list.reduce((a,b) => { return a.order > b.order ? a.order : b.order }, 0),
            drum:  this.list.filter(k => k.lot == mockup.lot).reduce((sum, v) =>  sum + v.qty, 0),
            floor: this.floor
          } 
        } else {
          this.list[count] = {
            code: mockup.prod_code,
            lot: mockup.lot,
            qty: this.qty[index] > this.floor ? this.floor : this.qty[index],
            mfg: mockup.mfg,
            exp: mockup.exp,
            order: this.list.reduce((a,b) => { return a.order > b.order ? a.order : b.order }, 0) ,
            drum:  this.list.filter(k => k.lot == mockup.lot).reduce((sum, v) =>  sum + v.qty, 0),
            floor: this.floor
          }
        }
      }

      if (this.qty[index] >= need) {
        this.list.push({
          lot: '',
          qty: '',
          mfg: '',
          exp: '',
          order: this.list.filter(x => x.lot).reduce((a,b) => { return a.order > b.order ? a.order : b.order }, 0) + 1,
          drum: '-',
          floor: '-'
        })
      }

      for (let num = 0; num < this.list.filter(x => x.lot).length; num++) {
        if (this.drum_start.length) {
          if (this.drum_lot.find(x => x.lot == this.list[num].lot)) {
          } else {
            this.drum_lot.push({
              lot: this.list[num].lot,
              order: this.drum_lot.length
            })
            this.drum_start.push(1)
          }
        } else {
          this.drum_lot.push({
            lot: this.list[num].lot,
            order: 0
          })
          this.drum_start.push(1)
        }
      }

      setTimeout(() => {
        this.qty[index] = ''
      }, 100);
    },
    remove_from_list(order) {
      let temp = []
      this.list.filter(x => x.order != order).forEach((y, i) => {
        if (y.order < order) {
          temp[temp.length] = y
          temp[temp.length-1]['drum'] = temp.filter(k => k.lot == y.lot && k.order < y.order).reduce((sum, v) =>  sum + v.qty, 0)
        } else {
          temp[temp.length] = y
          temp[temp.length-1]['order'] = y.order - 1
          temp[temp.length-1]['drum'] = temp.filter(k => k.lot == y.lot && k.order < y.order).reduce((sum, v) =>  sum + v.qty, 0)
        }
      })

      this.list = temp
    },
    save() {
      this.confirm.loading = true
      let checklist = {}
      let max = this.list.filter(x => x.lot).reduce((a,b) => { return a.order > b.order ? a.order : b.order })
      max = isNaN(max) ? max.order : max

      for (let i = 0; i <= max; i++) {
        this.list.filter(x => x.order == i).forEach((x,index) => {
          if(index) {
            checklist[i][`total`] += x.qty
            if(index > 1) {
              checklist[i][`item`] = [
                ...checklist[i].item, {
                  code: x.code,
                  lot: x.lot,
                  qty: x.qty,
                  mfg: x.mfg,
                  exp: x.exp
                }
              ]
            } else {
              checklist[i][`item`] = [
                checklist[i].item, {
                  code: x.code,
                  lot: x.lot,
                  qty: x.qty,
                  mfg: x.mfg,
                  exp: x.exp
                }
              ]
            }
          } else {
            checklist[i] = {
              pallet: i+1,
              code: x.code,
              checked: false,
              total: x.qty,
              item: {
                code: x.code,
                lot: x.lot,
                qty: x.qty,
                mfg: x.mfg,
                exp: x.exp
              },
              floor: x.floor
            }
          }
        })
      }
      
      let obj = {
        rows: [
          {
            en: this.base.form.code,
            format: checklist,
            product: this.printcheck,
          },
        ],
      };

      if (this.build) obj['rows'][0]['code'] = this.print.form.code

      new Query(null,this.build ? 'put' : 'post').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/print`, obj, (res) => {
        if (!res.success) {
        } else {
          this.confirm.loading = false
          this.confirm.modal = false

          this.toast.success("บันทึก format การพิมพ์เรียบร้อยแล้ว.", {
            position: "top-center",
            timeout: 2000,
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

          this.list = this.list.filter(x => x.lot)

          this.build = true
          this.print.form = res.rows[0]

          for (let i = 0; i < JSON.parse(this.print.form.format).reduce((a,b) => { return a.pallet > b.pallet ? a.pallet : b.pallet }, 0); i++) {
            this.fsize[i] = 60
          }

          this.print.form.code = res.rows[0].code
          this.detail_search()
        }
      });
    },
    printPaper () {
      this.$htmlToPaper('printMe', {styles:['/landscape.css']})
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

        this.detail.modal = true
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
        if (this.item.rows && this.item.rows.find(x => x.lot == this.item.form.lot)) {
          this.item.rows.find(x => x.lot == this.item.form.lot).quantity = parseInt(this.item.rows.find(x => x.lot == this.item.form.lot).quantity) + this.item.form.quantity
        } else {
          this.item.rows.push({ ...this.item.form });
        }

        if (this.item.new && this.item.new.find(x => x.lot == this.item.form.lot)) {
          this.item.new.find(x => x.lot == this.item.form.lot).quantity = parseInt(this.item.new.find(x => x.lot == this.item.form.lot).quantity) + this.item.form.quantity
        } else {
          if (this.item.rows && this.item.rows.find(x => x.lot == this.item.form.lot)) {
            this.item.new.push({ ...this.item.rows.find(x => x.lot == this.item.form.lot) });
          } else {
            this.item.new.push({ ...this.item.form });
          }
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
                code: this.item.form.code,
                prod_code: this.detail.current,
                trans_code: this.base.current,
                lot: this.item.form.lot,
                package: this.item.form.package,
                quantity: this.item.form.quantity,
                mfg: this.item.form.mfg,
                exp: this.item.form.exp
              },
            ],
          };

          new Query(null,'put').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/item`, obj, (res) => {
            if (!res.success) {
            } else {
              this.item.modal = false;

              if (type == "static") {
                this.item_search();
                this.detail_search();
              }
            }
          });
        }
      }
    },
    // REMOVE
    remove_item(code, controll, tb, lot = null) {
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
      this.remove.lot = lot;
    },
    confirm_remove() {
      if (this.detail.controll == 'create') {
        this.item.rows = this.item.rows.filter(x => x.lot != this.remove.lot)
        this.remove.modal = false;
      } else {
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
  
            this.toast.success("ลบรายการเรียบร้อยแล้ว", {
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
  
            this.remove.modal = false;
            this[`${this.remove.controll}_search`]();
            if (this.remove.controll == 'item') {
              this.detail_search()
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();

      socket.on("connect", () => {
        console.log("CONNECT")
      });

      socket.on("disconnect", () => {
        console.log("DICONNECT")
        socket.connect()
      });
    });
  },
  watch: {
    base: function (v) {
      // console.log(v);
    },
    detail: function (v) {
      // console.log(v);
    },
    item: function (v) {
      // console.log(v);
    },
    floor: function (v) {
      // console.log(v);
    },
    select: function (v) {
      // console.log(v);
      this.datalist = [];
    },
    "base.form.customer": function (val) {
      // console.log(val);
      if (val) {
        this.base.form.shipping_mark = (val == 'VITA') ? 'VT2024' : '' 
      }
    },
    "detail.form.product": function (val) {
      // console.log(val)
      if (val) {
        new Query(null,'get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort?short_code=${val}&wh=${this.wh}&notrd=1&total=1`, (res) => {
          if (res.success) {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });
          }
          this.datalist = [ ...res.rows ]
          console.log(this.datalist)
        });
      } else {
        this.detail.form.descrip = ""
        this.datalist = []
      }
    },
    "detail.form.descrip": function (val) {
      // console.log(val)
      if (val && this.detail.controll == 'create') {
        // new Query(null,'get').get(this, `${this.serviceUrl}api/controllers/SAP/${this.wh}/oitm?item_code=${this.datalist.find(x => x.item_name == val).item_code}`, (res) => {
        new Query(null,'get').get(this, `${this.serviceUrl}api/controllers/SAP/UBA/oitm?item_code=${this.datalist.find(x => x.item_name == val).item_code}`, (res) => {
          if (res.success) {
            if (res.rows.length > 0) {
              let used = res.rows[0].ItemName.split(" ")
              if(used[used.length-1] == 'kg' || used[used.length-1] == 'lt') {
                this.detail.form.shelf_life = res.rows[0].U_Agin;

                this.detail.form.pack_size = used[used.length-2];
                this.detail.form.unit = used[used.length-1];
                this.noPackandUnit = false;
              } else {
                this.detail.form.shelf_life = res.rows[0].U_Agin;
  
                if(used[used.length-1].indexOf('kg') > -1) {
                  this.detail.form.pack_size = used[used.length-1].split('kg')[0];
                  this.detail.form.unit = 'kg';
                  this.noPackandUnit = false;
                } else if(used[used.length-1].indexOf('lt') > -1) {
                  this.detail.form.pack_size = used[used.length-1].split('lt')[0];
                  this.detail.form.unit = 'lt';
                  this.noPackandUnit = false;
                } else {
                  this.detail.form.pack_size = '';
                  this.detail.form.unit = '';
                  this.noPackandUnit = true;
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
      // console.log(val)
      if (val) {
        this.item.form.exp = this.ymd(val, this.detail.form.shelf_life)
      } else {
        this.item.form.exp = null
      }
    },
    "printall": function (val) {
      // console.log(val)
      if (val) {
        this.printcheck = []
        this.detail.rows.forEach(x => {
          this.printcheck.push(true)
        })
      } else {
        this.printcheck = []
        this.detail.rows.forEach(x => {
          this.printcheck.push(false)
        })
      }
    }
  }
};
</script>

<style scoped>
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
    top: 0.4rem;
    right: 10px;
    color: black;
    opacity: 1;
  }
</style>

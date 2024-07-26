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
        <div class="modal-box w-11/12 max-w-7xl">
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">แบบฟอร์มขอเบิกอุปกรณ์สำนักงาน</h3>
          <hr class="my-5" />
          <div class="overflow-auto">
            <div class="grid grid-cols-1 gap-3" v-if="base.controll == 'edit'">
              <div role="alert" class="alert" :class="base.form.status == 'waiting' ? 'alert-warning' : base.form.status == 'approve' ? 'alert-success' : 'alert-info'">
                <span v-if="base.form.status == 'waiting'">All Progress 20% : เอกสารรอการดำเนินการ</span>
                <span v-if="base.form.status == 'approve'">All Progress 40% : เอกสารถูกอนุมัติโดย {{ base.form.approver_name }}</span>
                <span v-if="base.form.status == 'inprocess'">All Progress 60% : กำลังดำเนินการจัดเตรียมเพื่อส่งมอบ</span>
              </div>
              <ul class="steps">
                <li class="step" :class="base.form.status == 'waiting' ? 'step-warning' : base.form.status == 'approve' ? 'step-success' : 'step-info'">
                  <div class="flex items-center gap-1">
                    <Icon icon="bi:hourglass-split" width="16" height="16" />
                    warning
                  </div>
                </li>
                <li class="step" :class="base.form.status == 'inprocess' ? 'step-info' : base.form.status == 'approve' ? 'step-success' : ''">
                  <div class="flex items-center gap-1">
                    <Icon icon="bi:check2-circle" width="16" height="16" />
                    approve
                  </div>
                </li>
                <li class="step" :class="base.form.status == 'inprocess' ? 'step-info' : ''">
                  <div class="flex items-center gap-1">
                    <Icon icon="bi:gear-wide-connected" width="16" height="16" />
                    inprocess
                  </div>
                </li>
                <li class="step">ready</li>
                <li class="step">done</li>
              </ul>
            </div>
            {{ base.form }}
            <h3 class="text-left font-semibold">*เลือกแบบฟอร์มที่ต้องการเบิก :</h3>
            <div class="grid md:grid-cols-4 grid-cols-2">
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="radio" name="radio-10" value="HR" class="radio radio-sm checked:bg-blue-500" v-model="base.form.wh_owner" :disabled="base.controll == 'edit'" />
                  <span class="label-text">ฝ่ายบุคคล (Factory)</span>
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="radio" name="radio-10" value="HO" class="radio radio-sm checked:bg-blue-500" v-model="base.form.wh_owner" :disabled="base.controll == 'edit'" />
                  <span class="label-text">ฝ่ายบุคคล (Office)</span>
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="radio" name="radio-10" value="SH" class="radio radio-sm checked:bg-blue-500" v-model="base.form.wh_owner" :disabled="base.controll == 'edit'" />
                  <span class="label-text">ฝ่ายความปลอดภัย</span>
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="radio" name="radio-10" value="IT" class="radio radio-sm checked:bg-blue-500" v-model="base.form.wh_owner" :disabled="base.controll == 'edit'" />
                  <span class="label-text">IT</span>
                </label>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">ประเภทเอกสาร :</span><span class="text-xs text-error">{{ msg.type }}</span>
                </label>
                <select 
                  class="select select-sm select-bordered border-gray-300" 
                  v-model="base.form.form_type"
                  :disabled="base.controll == 'edit'"
                >
                  <option disabled selected value="">เลือก</option>
                  <option value="request">ขอเบิก</option>
                  <option value="buy">ขอซื้อ</option>
                </select>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">วันที่ต้องการ :</span><span class="text-xs text-error">{{ msg.due }}</span>
                </label>
                <input
                  type="date"
                  class="input input-sm input-bordered border-gray-300"
                  :class="base.controll == 'edit' ? 'bg-gray-200' : ''"
                  v-model="base.form.request_due_date"
                  :readonly="base.controll == 'edit'"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">สถานะแบบฟอร์ม :</span>
                </label>
                <input
                  type="text"
                  class="input input-sm input-bordered border-gray-300 bg-gray-200"
                  v-model="base.form.status"
                  readonly
                />
              </div>
            </div>
            <div class="text-left">
              <button class="btn btn-sm btn-ghost text-blue-500 w-fit my-3"><Icon icon="bi:ui-checks-grid" width="16" height="16" />List รายการอุปกรณ์</button>
            </div>
            {{ detail.rows }}
            <div class="form-control">
              <div class="overflow-x-auto">
                <table class="table table-sm" cellpadding="0" cellspacing="0" width="100%">
                  <thead>
                    <tr>
                      <td>รหัส</td>
                      <td>ชื่ออุปกรณ์</td>
                      <td>จำนวน</td>
                      <td>หน่วยนับ</td>
                      <td>ชั้นวาง</td>
                      <td>สถานะ</td>
                      <td v-if="base.form.type == 'buy'">ไฟล์แนบ</td>
                      <td>หมายเหตุ</td>
                      <td>บันทึกการแก้ไข/ลบ</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in detail.rows" :key="index" v-if="base.controll == 'edit'">
                      <td width="10%"><input v-model="row.item_id" type="text" class="input input-sm input-bordered w-full border-gray-300 bg-gray-200" readonly /></td>
                      <td width="15%"><input v-model="row.item_name" type="text" placeholder="Typing to find item ..." class="input input-sm input-bordered w-full" /></td>
                      <td width="10%"><input v-model="row.form_item_amount" type="number" class="input input-sm input-bordered w-full" /></td>
                      <td width="10%"><input v-model="row.spc_unit" type="text" class="input input-sm input-bordered w-full border-gray-300 bg-gray-200" readonly /></td>
                      <td width="15%">
                        <select class="select select-bordered select-sm w-full border-gray-300" v-model="row.rack_id" :disabled="base.form.status != 'inprocess'">
                          <option disabled selected value="null">-เลือก-</option>
                          <option v-for="v in item[index]" :value="v.rack_id">{{ v.rack_id }} , {{ v.rack_item_amount }} {{ row.spc_unit }}</option>
                        </select>
                      </td>
                      <td style="display: flex; flex-direction: column;">
                        <button class="btn btn-xs btn-outline btn-success w-full" :class="row.status == 'ready' ? 'btn-active' : ''" @click="detect_rack_field('ready', index)" :disabled="base.form.status != 'inprocess'">Ready</button>
                        <button class="btn btn-xs btn-outline btn-warning w-full mt-1" :class="row.status == 'reject' ? 'btn-active' : ''" @click="detect_rack_field('reject', index)" :disabled="base.form.status != 'inprocess'">Reject</button>
                      </td>
                      <td width="20%" v-if="base.form.type == 'buy'">
                        <input v-if="base.form.type == 'buy'" type="file" class="file-input file-input-bordered file-input-ghost file-input-sm w-full border-gray-300 bg-gray-200" />
                      </td>
                      <td width="20%"><input v-model="row.item_detail" type="text" class="input input-sm input-bordered w-full" /></td>
                      <td width="5%" class="text-center">
                        <button class="btn btn-xs btn-warning text-white"><Icon icon="bi:pencil-square" width="14" height="14" /></button>
                        <button class="btn btn-xs btn-error text-white ml-1"><Icon icon="bi:trash3" width="14" height="14" /></button>
                      </td>
                    </tr>
                    <tr v-for="i in count" :key="i" v-else>
                      <td width="10%"><input v-model="detail.rows[i-1].id" type="text" class="input input-sm input-bordered w-full border-gray-300 bg-gray-200" readonly /></td>
                      <td width="15%"><input v-model="detail.rows[i-1].name" type="text" placeholder="Typing to find item ..." class="input input-sm input-bordered w-full" /></td>
                      <td width="10%"><input v-model="detail.rows[i-1].amount" type="number" class="input input-sm input-bordered w-full" /></td>
                      <td width="10%"><input v-model="detail.rows[i-1].unit" type="text" class="input input-sm input-bordered w-full border-gray-300 bg-gray-200" readonly /></td>
                      <td width="10%"><input type="text" class="input input-sm input-bordered w-full border-gray-300 bg-gray-200" readonly /></td>
                      <td style="display: flex; flex-direction: column;">
                        <button class="btn btn-xs btn-outline btn-success w-full" disabled>Ready</button>
                        <button class="btn btn-xs btn-outline btn-warning w-full mt-1" disabled>Reject</button>
                      </td>
                      <td width="20%">
                        <input v-if="base.form.type == 'buy'" type="file" class="file-input file-input-bordered file-input-ghost file-input-sm w-full border-gray-300 bg-gray-200" />
                        <input v-else type="text" placeholder="" class="input input-sm input-bordered w-full border-gray-300 bg-gray-200" readonly />
                      </td>
                      <td width="20%"><input v-model="detail.rows[i-1].detail" type="text" class="input input-sm input-bordered w-full" /></td>
                      <td width="5%"><button class="btn btn-xs btn-error text-white"><Icon icon="bi:trash3" width="16" height="16" /></button></td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr class="text-center" v-if="base.form.wh_owner && base.form.status != 'inprocess'">
                      <td colspan="9">
                        <label class="btn btn-primary modal-button btn-sm text-white me-1" @click="additem(); count += 1">
                          <Icon icon="bi:plus-circle" width="16" height="16" />เพิ่มรายการ
                        </label>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div class="grid gap-3 md:grid-cols-4 grid-cols-2">
              <div class="grid grid-rows-2">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">ชื่อผู้ขอเบิก :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ผู้ทำรายการ"
                    class="input input-sm input-bordered bg-gray-200 w-full"
                    readonly
                    :value="base.form.requester_name ? base.form.requester_name : user.firstname+' '+user.lastname"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">วันที่ขอเบิก :</span>
                  </label>
                  <input
                    type="datetime"
                    placeholder="ผู้ทำรายการ"
                    class="input input-sm input-bordered bg-gray-200 w-full"
                    :value="base.form.request_date ? base.form.request_date : dateNow()"
                    readonly
                  />
                </div>
              </div>
              <div class="grid grid-rows-2">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">ชื่อผู้อนุมัติ :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ผู้อนุมัติ"
                    class="input input-sm input-bordered bg-gray-200 w-full"
                    readonly
                    :value="base.form.approver_name"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">วันที่อนุมัติ :</span>
                  </label>
                  <input
                    type="datetime"
                    placeholder="วันที่อนุมัติ"
                    class="input input-sm input-bordered bg-gray-200 w-full"
                    readonly
                    :value="base.form.approve_date"
                  />
                </div>
              </div>
              <div class="grid grid-rows-2">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">ชื่อผู้จ่าย :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ผู้จ่าย"
                    class="input input-sm input-bordered bg-gray-200 w-full"
                    readonly
                    :value="base.form.distributor_name"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">วันที่จ่าย :</span>
                  </label>
                  <input
                    type="datetime"
                    placeholder="วันที่จ่าย"
                    class="input input-sm input-bordered bg-gray-200 w-full"
                    readonly
                    :value="base.form.distribute_date"
                  />
                </div>
              </div>
              <div class="grid grid-rows-2">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">ชื่อผู้รับของ :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ผู้รับของ"
                    class="input input-sm input-bordered bg-gray-200 w-full"
                    readonly
                    :value="base.form.receiver_name"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">วันที่รับของ :</span>
                  </label>
                  <input
                    type="datetime"
                    placeholder="วันที่รับของ"
                    class="input input-sm input-bordered bg-gray-200 w-full"
                    readonly
                    :value="base.form.receive_date"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr class="mt-5"/>
          <div
            class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex"
          >
            <div class="flex-1 form-control mt-6">
              <label for="modal-base" class="btn"><Icon icon="bi:x-circle" width="18" height="18" /> ปิด</label>
            </div>
            <div class="flex-1 form-control mt-6" v-if="base.form.status == 'waiting'">
              <button
                class="btn btn-error text-white"
                @click="base_save('cancel')"
              >
                <Icon icon="bi:file-earmark-x" width="18" height="18" /> ไม่อนุมัติ
              </button>
            </div>
            <div class="flex-1 form-control mt-6" v-if="base.form.status == 'approve'">
              <button
                class="btn btn-error text-white"
                @click="base_save('cancel')"
              >
                <Icon icon="bi:file-earmark-x" width="18" height="18" /> ยกเลิกเอกสาร
              </button>
            </div>
            <div class="flex-1 form-control mt-6" v-if="base.form.status == 'waiting'">
              <button
                class="btn btn-success text-white"
                @click="base_save('status')"
              >
                <Icon icon="bi:check2-circle" width="18" height="18" /> อนุมัติ
              </button>
            </div>
            <div class="flex-1 form-control mt-6" v-if="base.form.status == 'approve'">
              <button
                class="btn btn-success text-white"
                @click="base_save('status')"
              >
                <Icon icon="bi:gear-wide-connected" width="18" height="18" /> ดำเนินการ
              </button>
            </div>
            <div class="flex-1 form-control mt-6" v-if="base.form.status == 'inprocess'">
              <button
                class="btn btn-success text-white"
                @click="base_save('status')"
              >
                <Icon icon="bi:check2-square" width="18" height="18" /> จัดเตรียมสำเร็จ
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
    </template>
    <template #view>
      <div class="gap-3 lg:px-3 lg:py-3">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto">
              <div class="flex items-center text-secondary gap-1">
                <Icon icon="bi:clock-history" width="18" height="18" />
                <h3 class="text-lg font-bold">รายการข้อมูลประวัติ นำเข้า-จ่ายออก อุปกรณ์เครื่องใช้สำนักงาน และโรงงาน</h3>
              </div>
            <div class="mt-3 border-2 border-dashed rounded-xl p-2">
              <div
                v-if="base.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :type="'text'"
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <button
                  class="join-item btn btn-sm btn-success w-fit"
                  @click="exportExcel('base')"
                >
                  <Icon
                  icon="mdi:file-excel-outline"
                  width="16" height="16"
                  />
                  Excel
                </button>
                <div class="flex justify-end">
                  <AppModuleGlobalSearch
                    :class="'input input-sm input-bordered border-gray-300 w-full'"
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
              <div class="overflow-x-auto w-full max-h-[60vh] my-2">
                <table class="table table-xs table-pin-rows table-pin-cols">
                  <thead>
                    <tr class="bg-primary text-white">
                      <th class="bg-primary text-white">#</th>
                      <td>Rack</td>
                      <td>Doc Date</td>
                      <td>Type</td>
                      <td>Item ID</td>
                      <td>Item Name</td>
                      <td class="text-right">Quantity</td>
                      <td>Unit</td>
                      <td class="text-right">Price / Unit</td>
                      <td>Creator</td>
                      <td>Form No.</td>
                      <td>Receive Department</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="base.total" v-for="(row, i) in base.rows" class="hover">
                      <th>{{ row.transaction_id }}</th>
                      <td>{{ row.rack_id }}</td>
                      <td>{{ row.request_date ? $moment(row.request_date).format("DD-MM-YYYY HH:MM:SS") : '-' }}</td>
                      <td>{{ row.transaction_status }}</td>
                      <td>{{ row.item_id }}</td>
                      <td>{{ row.item_name || '-' }}</td>
                      <td class="text-right">{{ row.rack_item_amount || '-' }}</td>
                      <td>{{ row.item_unit || '-' }}</td>
                      <td class="text-right">{{ row.cal_price  || '-' }}</td>
                      <td>{{ row.creator_name }}</td>
                      <td>{{ row.form_id || '-' }}</td>
                      <td>{{ row.title }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="grid gap-3 grid-cols-2">
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
import { useToast } from "vue-toastification";
import Query from "@/assets/js/fetch.js";

export default {
  name: "Shelfs",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText
  },
  setup() {
    const toast = useToast();

    return {
      toast
    }
  },
  data() {
    return {
      count: 0,

      choose: false,
      select: false,
      scan: false,
      input: '',
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
      item: []
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
              + ' ' + d.getHours() + ':' + (d.getMinutes() >= 9 ? d.getMinutes() : '0' + d.getMinutes()) + ':' + d.getSeconds();
    },
    ymd(start, life) {
      let expire = new Date((new Date(start)).getTime() + life * 86400E3);
      return expire.getFullYear() + '-' + (expire.getMonth() >= 9 ? expire.getMonth() + 1 : '0' + (expire.getMonth() + 1)) + '-' + (expire.getDate() > 9 ? expire.getDate() : '0' + expire.getDate());
    },
    additem() {
      this.detail.rows.push({
        item_id: '',
        item_name: '',
        form_item_amount: '',
        spc_unit: '',
        rack_id: '',
        status: '',
        item_file: '',
        item_detail: ''
      })
    },
    detect_rack_field(status, i) {
      if (this.detail.rows[i].rack_id) {
        this.detail.rows[i].status = status
      } else {
        this.toast.error(`เลือกชั้นวางก่อนเด้อ`, {
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
    },
    rack_search(id) {
      new Query(null,'get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/sta/transaction?item_id=${id}&total=1`, (res) => {
        if (res.success) {
          this.item.push(res.rows)
        }
      });
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
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/sta/transaction?total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
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
      this.count = 0

      // this.base.current = this.makeid(10);
      this.base.form = {
        // code: this.base.current,
        wh_owner: '',
        form_type: '',
        request_due_date: '',
        status: 'waiting',
      };
  
      this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.detail.rows = [];
      this.detail.new = [];
      this.base.controll = "edit";
      this.detail_search();
      this.refresh = true;
    },
    base_save(type) {
      let obj = {
        rows: [
          {
            form_id: this.base.form.form_id,
          },
        ]
      };
      
      if (type == 'status') {
        switch (this.base.form.status) {
          case 'waiting':
            obj['rows'][0]["status"] = 'approve'
            obj['rows'][0]["approver_id"] = this.user.code
            obj['rows'][0]["approve_date"] = this.dateNow()
          break;
          case 'approve':
            obj['rows'][0]["status"] = 'inprocess'
          break;
          case 'inprocess':
            obj['rows'][0]["status"] = 'ready'
          break;
          case 'ready':
            obj['rows'][0]["status"] = 'done'
        }
      }
        
      new Query(null, this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/sta/forms`, obj, (res) => {
        if (!res.success) {
        } else {
          this.toast.success(`อัพเดทข้อมูลเรียบร้อยละจ้าาา`, {
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

          this.base.modal = false
          this.base_search();
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

        if (this.base.form.status == 'inprocess') {
          (this.detail.rows).forEach((x, i) => {
            this.rack_search(x.item_id)
          })
        }

        this.base.modal = true
      });
    },
    detail_get(callback) {
      new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/sta/forms_items?form_id=${this.base.form.form_id}&total=1`, (res) => {
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
    "base.form.wh": function (v) {
      if (v) {
        this.detail.rows = []
        this.count = 0
      }
    },
    "base.form.type": function (v) {
      if (v) {
        this.detail.rows = []
        this.count = 0

      }
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

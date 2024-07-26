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
                        <button class="btn btn-xs btn-warning text-white"><Icon icon="tabler:edit" width="16" height="16" /></button>
                        <button class="btn btn-xs btn-error text-white ml-1"><Icon icon="bi:trash3" width="16" height="16" /></button>
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
    </template>
    <template #view>
      <div class="gap-3 lg:px-3 lg:py-3">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto">
            <div class="grid grid-cols-2">
              <div class="grid grid-rows-2 text-left">
                <div class="flex items-center text-primary gap-1">
                  <Icon icon="bi:cash-coin" width="20" height="20" />
                  <h3 class="text-xl font-bold">ITEMS PRICE LIST AND DETAILS</h3>
                </div>
                <h3 class="font-bold">รายการราคาและข้อมูล อุปกรณ์เครื่องใช้สำนักงาน</h3>
              </div>
              <div class="text-right">
                <label
                  for="modal-base"
                  class="join-item btn btn-sm btn-warning modal-button"
                  @click="base_create()"
                >
                  <Icon icon="bi:plus-circle-fill" width="16" height="16" />
                  Add New Item
                </label>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div class="grid grid-rows-3">
                <div class="mt-3 border-2 border-dashed rounded-xl p-2">
                  {{ detail.form }}
                </div>
                <div class="mt-3 border-2 border-dashed rounded-xl p-2">

                </div>
                <div class="mt-3 border-2 border-dashed rounded-xl p-2">
                  <div class="flex flex-col space-y-1 w-full h-full">
                    <div class="grid grid-cols-9 gap-1 h-full max-h-16">
                      <div v-for="n in 9" :key="n" >
                        <div 
                          class="border-2 border-black rounded-lg text-xs font-semibold h-full"
                          :class="(detail.form.item_rack).slice(0, 2) == abc[n-1]+'1' ? 'bg-success' : 'bg-warning'"
                          v-if="(n % 3) != 2" 
                        >
                          {{ abc[n-1] }}1
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-9 gap-1 h-full max-h-16">
                      <div v-for="n in 9" :key="n" >
                        <div 
                          class="border-2 border-black rounded-lg text-xs font-semibold h-full"
                          :class="(detail.form.item_rack).slice(0, 2) == abc[n-1]+'2' ? 'bg-success' : 'bg-warning'"
                          v-if="(n % 3) != 2" 
                        >
                          {{ abc[n-1] }}2
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-4 gap-1 h-full max-h-8">
                      <div v-for="n in 4" :key="n" >
                        <div 
                          class="border-2 border-black rounded-lg text-xs font-semibold h-full"
                          :class="(detail.form.item_rack).slice(0, 2) == 'G'+(n-1) ? 'bg-success' : 'bg-warning'"
                          v-if="n-1" 
                        >
                          G{{ n-1 }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-span-2 mt-3 border-2 border-dashed rounded-xl p-2">
                <div
                  v-if="base.loading"
                  class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
                >
                  <AppModuleGlobalLoadingText
                    :type="'text'"
                    :class="`p-4 py-12 text-3xl text-center`"
                  />
                </div>
                <div class="grid grid-cols-2">
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
                      :class="'input input-sm input-bordered border-gray-300 w-full max-w-xs'"
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
                <div class="overflow-x-auto w-full max-h-[44vh] my-2">
                  <table class="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                      <tr class="bg-primary text-white text-sm">
                        <th class="bg-primary text-white">Item ID</th>
                        <td>Item Name</td>
                        <td class="text-right">Amount</td>
                        <td class="text-right">Minimum</td>
                        <td>Unit</td>
                        <td class="text-right">Current Price</td>
                        <td class="text-right">Old Price</td>
                        <th class="bg-primary text-white text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="base.total" v-for="(row, i) in base.rows" style="cursor: pointer;" class="hover" 
                        :class="(parseInt(row.item_min) >= parseInt(row.item_amount) && base.current == row.item_id) ? 'bg-red-200 text-primary font-semibold' : parseInt(row.item_min) >= parseInt(row.item_amount) ? 'bg-red-200' : base.current == row.item_id ? 'text-primary font-semibold' : ''" 
                        @click="detail_search(`${row.item_id}`, `${i}`)"
                      >
                        <th>{{ row.item_id }}</th>
                        <td>{{ row.item_name }}</td>
                        <td class="text-right"><div class="flex justify-end items-center gap-1"> <Icon v-if="parseInt(row.item_min) >= parseInt(row.item_amount)" icon="bi:exclamation-triangle-fill" width="12" height="12" /> {{ row.item_amount }} </div></td>
                        <td class="text-right">{{ row.item_min }}</td>
                        <td>{{ row.item_unit }}</td>
                        <td class="text-right" :class="!row.new_price ? 'italic' : ''">{{ row.new_price ? row.new_price+' ฿' : 'no price' }}</td>
                        <td class="text-right" :class="!row.old_price ? 'italic' : ''">{{ row.old_price ? row.old_price+' ฿' : 'no price' }}</td>
                        <th class="text-center"><button class="btn btn-xs btn-warning w-16"><Icon icon="bi:pencil-square" width="12" height="12" /> Edit</button></th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="grid gap-3 grid-cols-1">
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
  name: "Item",
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
      abc: 'A0BC0DE0F',

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
        loading: false,
        form: {
          item_rack: ""
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
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/sta/items?total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
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
    detail_search(code, index) {
      this.base.current = code
      this.base.form = { ...this.base.rows[index] };

      this.detail.loading = true;
      this.detail_get((res) => {
        this.detail.rows = res.rows;
        this.detail.total = res.total;
        this.detail.loading = false;

        this.detail.form = {
          item_id: this.detail.rows[0].item_id,
          item_name: this.detail.rows[0].item_name,
          item_amount: this.detail.rows[0].item_amount,
          item_min: this.detail.rows[0].item_min,
        };

        this.detail.rows.forEach((x, i) => {
          if (i) {
            if (x.rack_id != this.detail.rows[i-1].rack_id) {
              this.detail.form['item_rack'] += ','+x.rack_id
            }
          } else {
            this.detail.form['item_rack'] = x.rack_id
          }
        })
      });
    },
    detail_get(callback) {
      new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/sta/items?item_id=${this.base.form.item_id}&total=1`, (res) => {
        if (res.success) {
          console.log(res.rows)
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

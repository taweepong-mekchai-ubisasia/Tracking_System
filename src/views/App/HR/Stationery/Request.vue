<template>
  <AppLayout ref="AppLayoutComponent">
    <template #modal>
      <!-- modal base -->
      <input
        type="checkbox"
        id="modal-base"
        class="modal-toggle"
        v-model="base.data.form.modal"
      />
      <div class="modal" v-if="base.data.form.modal">
        <div class="modal-box w-11/12 max-w-7xl">
          <label
            @click="base.data.form.modal = false"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary mb-5">
            แบบฟอร์มขอเบิกอุปกรณ์สำนักงาน
            <span
              v-if="base.data.form.method == 'PUT'"
              class="underline underline-offset-2 decoration-double"
              >{{ base.data.form.object.form_id }}</span
            >
          </h3>
          <hr class="my-5" />
          <!-- <div class=""> -->
            <div class="overflow-x-auto px-2 py-1" style="max-height: 60vh">
              <div
                class="grid grid-cols-1 gap-3 mb-3"
                v-if="base.data.form.method == 'PUT'"
              >
                <div
                  role="alert"
                  class="alert font-bold text-base-100"
                  :class="
                    base.data.form.object.form_status == 'waiting'
                      ? 'alert-warning'
                      : base.data.form.object.form_status == 'approve'
                      ? 'alert-success'
                      : base.data.form.object.form_status == 'cancelled'
                      ? 'alert-error'
                      : base.data.form.object.form_status == 'inprocess'
                      ? 'alert-info'
                      : base.data.form.object.form_status == 'ready'
                      ? 'bg-blue-500'
                      : 'bg-gray-500'
                    "
                  >
                  <span v-if="base.data.form.object.form_status == 'waiting'"
                    >All Progress 20% : เอกสารรอการดำเนินการ</span
                  >
                  <span v-if="base.data.form.object.form_status == 'approve'"
                    >All Progress 40% : เอกสารถูกอนุมัติโดย คุณ
                    {{ base.data.form.object.approver_name }}</span
                  >
                  <span v-if="base.data.form.object.form_status == 'inprocess'"
                    >All Progress 60% : กำลังดำเนินการจัดเตรียมเพื่อส่งมอบ</span
                  >
                  <span v-if="base.data.form.object.form_status == 'ready'"
                    >All Progress 80% : รายการพร้อมส่งมอบแล้ว</span
                  >
                  <span v-if="base.data.form.object.form_status == 'done'"
                    >All Progress 100% : ดำเนินการส่งมอบสำเร็จ</span
                  >
                  <span v-if="base.data.form.object.form_status == 'cancelled'"
                    >รายการถูกยกเลิกโดย คุณ
                    {{ base.data.form.object.canceller_name }}</span
                  >
                </div>
                <ul
                  class="steps font-semibold"
                  v-if="base.data.form.object.form_status != 'cancelled'"
                >
                  <li
                    class="step after:!text-white"
                    :class="
                      base.data.form.object.form_status == 'waiting'
                        ? 'step-warning'
                        : base.data.form.object.form_status == 'approve'
                        ? 'step-success'
                        : base.data.form.object.form_status == 'inprocess'
                        ? 'step-info'
                        : base.data.form.object.form_status == 'ready'
                        ? 'before:!bg-blue-500 after:!bg-blue-500'
                        : base.data.form.object.form_status == 'done'
                        ? 'before:!bg-gray-500 after:!bg-gray-500'
                        : ''
                    "
                  >
                    <div class="flex items-center gap-1">
                      <Icon icon="bi:hourglass-split" width="16" height="16" />
                      waiting
                    </div>
                  </li>
                  <li
                    class="step after:!text-white"
                    :class="
                      base.data.form.object.form_status == 'approve'
                        ? 'step-success'
                        : base.data.form.object.form_status == 'inprocess'
                        ? 'step-info'
                        : base.data.form.object.form_status == 'ready'
                        ? 'before:!bg-blue-500 after:!bg-blue-500'
                        : base.data.form.object.form_status == 'done'
                        ? 'before:!bg-gray-500 after:!bg-gray-500'
                        : ''
                    "
                  >
                    <div class="flex items-center gap-1">
                      <Icon icon="bi:check2-circle" width="16" height="16" />
                      approve
                    </div>
                  </li>
                  <li
                    class="step after:!text-white"
                    :class="
                      base.data.form.object.form_status == 'inprocess'
                        ? 'step-info'
                        : base.data.form.object.form_status == 'ready'
                        ? 'before:!bg-blue-500 after:!bg-blue-500'
                        : base.data.form.object.form_status == 'done'
                        ? 'before:!bg-gray-500 after:!bg-gray-500'
                        : ''
                    "
                  >
                    <div class="flex items-center gap-1">
                      <Icon
                        icon="bi:gear-wide-connected"
                        width="16"
                        height="16"
                      />
                      inprocess
                    </div>
                  </li>
                  <li
                    class="step after:!text-white"
                    :class="
                      base.data.form.object.form_status == 'ready'
                        ? 'before:!bg-blue-500 after:!bg-blue-500'
                        : base.data.form.object.form_status == 'done'
                        ? 'before:!bg-gray-500 after:!bg-gray-500'
                        : ''
                    "
                  >
                    <div class="flex items-center gap-1">
                      <Icon icon="bi:check2-square" width="16" height="16" />
                      ready
                    </div>
                  </li>
                  <li
                    class="step after:!text-white"
                    :class="
                      base.data.form.object.form_status == 'done'
                        ? 'before:!bg-gray-500 after:!bg-gray-500'
                        : ''
                    "
                  >
                    <div class="flex items-center gap-1">
                      <Icon icon="bi:check2-circle" width="16" height="16" />
                      done
                    </div>
                  </li>
                </ul>
              </div>
              <!-- {{ base.data.form.object }} -->
              <h3 class="text-left font-semibold">
              *เลือกแบบฟอร์มที่ต้องการเบิก :
              </h3>
              <div class="grid md:grid-cols-4 grid-cols-2">
              <div class="form-control">
                <label
                  :class="`label ${
                    base.data.form.method == 'POST' ? 'cursor-pointer' : ''
                  } justify-start gap-3`"
                >
                  <input
                    type="radio"
                    name="radio-10"
                    value="HR"
                    class="radio radio-sm checked:bg-blue-500"
                    v-model="base.data.form.object.wh_owner"
                    :disabled="
                      base.data.form.method == 'PUT' || detail.data.rows.length
                    "
                  />
                  <span
                    :class="`label-text ${
                      base.data.form.object.wh_owner == 'HR'
                        ? 'text-blue-500 font-semibold'
                        : ''
                    }`"
                    >ฝ่ายบุคคล (Factory)</span
                  >
                </label>
              </div>
              <div class="form-control">
                <label
                  :class="`label ${
                    base.data.form.method == 'POST' ? 'cursor-pointer' : ''
                  } justify-start gap-3`"
                >
                  <input
                    type="radio"
                    name="radio-10"
                    value="HO"
                    class="radio radio-sm checked:bg-blue-500"
                    v-model="base.data.form.object.wh_owner"
                    :disabled="
                      base.data.form.method == 'PUT' || detail.data.rows.length
                    "
                  />
                  <span
                    :class="`label-text ${
                      base.data.form.object.wh_owner == 'HO'
                        ? 'text-blue-500 font-semibold'
                        : ''
                    }`"
                    >ฝ่ายบุคคล (HQ)</span
                  >
                </label>
              </div>
              <div class="form-control">
                <label
                  :class="`label ${
                    base.data.form.method == 'POST' ? 'cursor-pointer' : ''
                  } justify-start gap-3`"
                >
                  <input
                    type="radio"
                    name="radio-10"
                    value="SH"
                    class="radio radio-sm checked:bg-blue-500"
                    v-model="base.data.form.object.wh_owner"
                    :disabled="
                      base.data.form.method == 'PUT' || detail.data.rows.length
                    "
                  />
                  <span
                    :class="`label-text ${
                      base.data.form.object.wh_owner == 'SH'
                        ? 'text-blue-500 font-semibold'
                        : ''
                    }`"
                    >ฝ่ายความปลอดภัย</span
                  >
                </label>
              </div>
              <div class="form-control">
                <label
                  :class="`label ${
                    base.data.form.method == 'POST' ? 'cursor-pointer' : ''
                  } justify-start gap-3`"
                >
                  <input
                    type="radio"
                    name="radio-10"
                    value="IT"
                    class="radio radio-sm checked:bg-blue-500"
                    v-model="base.data.form.object.wh_owner"
                    :disabled="
                      base.data.form.method == 'PUT' || detail.data.rows.length
                    "
                  />
                  <span
                    :class="`label-text ${
                      base.data.form.object.wh_owner == 'IT'
                        ? 'text-blue-500 font-semibold'
                        : ''
                    }`"
                    >ฝ่ายเทคโนโลยีสารสนเทศ</span
                  >
                </label>
              </div>
              </div>
              <div class="grid grid-cols-3 gap-3">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">ประเภทเอกสาร :</span>
                </label>
                <select
                  class="select select-sm select-bordered disabled:border-gray-400"
                  v-model="base.data.form.object.form_type"
                  :disabled="
                    base.data.form.method == 'PUT' || detail.data.rows.length
                  "
                >
                  <option disabled selected value="">เลือก</option>
                  <option value="request">ขอเบิก</option>
                  <option value="buy">ขอซื้อ</option>
                </select>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">วันที่ต้องการ :</span>
                </label>
                <input
                  type="date"
                  :class="`input input-sm input-bordered ${
                    !canedit ? 'bg-gray-200 text-black' : ''
                  }`"
                  v-model="base.data.form.object.due_date"
                  :readonly="!canedit"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">สถานะแบบฟอร์ม :</span>
                </label>
                <input
                  type="text"
                  class="input input-sm input-bordered bg-gray-200 text-black"
                  v-model="base.data.form.object.form_status"
                  readonly
                />
              </div>
              </div>
              <div class="flex justify-between">
              <button
                class="btn btn-sm btn-ghost text-blue-500 w-fit my-3"
                @click="fnList.search()"
              >
                <Icon icon="bi:ui-checks-grid" width="16" height="16" />
                List รายการอุปกรณ์
              </button>
              <button
                v-if="base.data.form.object.form_status == 'inprocess'"
                class="btn btn-sm bg-blue-500 text-white w-fit my-3"
              >
                <Icon icon="bi:envelope-at" width="16" height="16" />
                Send Email for Ready
              </button>
              </div>
              <!-- {{ detail.data.rows }} -->
              <div class="form-control">
              <div class="">
                <table class="table table-sm" width="100%">
                  <thead>
                    <tr>
                      <td v-if="base.data.form.object.form_type == 'request'">
                        รหัส
                      </td>
                      <td>ชื่ออุปกรณ์</td>
                      <td>จำนวน</td>
                      <td>หน่วยนับ</td>
                      <td v-if="!canedit">ชั้นวาง</td>
                      <td v-if="!canedit">สถานะ</td>
                      <td v-if="base.data.form.object.form_type == 'buy'">
                        ไฟล์แนบ
                      </td>
                      <td>หมายเหตุ</td>
                      <td class="text-center" v-if="canedit">ลบ</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="i in detail.data.rows.length" :key="i">
                      <td v-if="base.data.form.object.form_type == 'request'">
                        <input
                          v-if="
                            base.data.form.object.form_type == 'buy' ||
                            detail.data.rows[i - 1].item.length
                          "
                          :value="
                            detail.data.rows[i - 1].item[0]?.item_id ||
                            detail.data.rows[i - 1].item_id
                          "
                          type="text"
                          class="input input-sm input-bordered w-full bg-gray-200 border-base-content"
                          readonly
                        />
                        <input
                          v-else
                          type="text"
                          class="input input-sm input-bordered w-full bg-gray-200 border-base-content"
                          readonly
                        />
                      </td>
                      <td
                        class="w-72"
                        v-if="base.data.form.object.form_type == 'request'"
                      >
                        <AppModuleGlobalCombobox
                          v-if="canedit"
                          :url="`api/controllers/MYSQL/INTERNAL/HR/whinternal/items`"
                          :label="''"
                          :selectMode="'single'"
                          :image="false"
                          :fieldDisplay="'item_name'"
                          :lastDisplay="detail.data.rows[i - 1].item_name"
                          :imagePath="'Whinternal/item'"
                          :lastFile="''"
                          :objectData="[
                            'code',
                            'item_id',
                            'item_name',
                            'item_unit',
                            'image',
                            'imageLink',
                          ]"
                          :inSearch="true"
                          :param="[
                            {
                              item_stock: true,
                              item_owner: base.data.form.object.wh_owner,
                              not: JSON.stringify(detail.data.rows),
                            },
                          ]"
                          v-model="detail.data.rows[i - 1].item"
                        />
                        <input
                          v-else
                          v-model="detail.data.rows[i - 1].item_name"
                          type="text"
                          placeholder="ชื่อ และคำอธิบาย ..."
                          class="input input-sm input-bordered w-full border-base-content bg-gray-200"
                          readonly
                        />
                      </td>
                      <td v-else>
                        <input
                          v-model="detail.data.rows[i - 1].item_name"
                          type="text"
                          placeholder="ชื่อ และคำอธิบาย ..."
                          :class="`input input-sm input-bordered w-full ${detail.data.rows[i - 1].status ? 'bg-gray-200' : ''} border-base-content`"
                          :readonly="detail.data.rows[i - 1].status"
                        />
                      </td>
                      <td>
                        <input
                          v-if="
                            base.data.form.object.form_type == 'buy' ||
                            detail.data.rows[i - 1].item.length
                          "
                          v-model="detail.data.rows[i - 1].form_item_amount"
                          type="number"
                          min="0"
                          :class="`input input-sm input-bordered w-full border-base-content ${
                            detail.data.rows[i - 1].status ? 'bg-gray-200' : ''
                          }`"
                          :readonly="detail.data.rows[i - 1].status"
                        />
                        <input
                          v-else
                          type="number"
                          min="0"
                          class="input input-sm input-bordered w-full border-base-content"
                        />
                      </td>
                      <td v-if="base.data.form.object.form_type == 'request'">
                        <input
                          v-if="
                            detail.data.rows[i - 1].item.length
                          "
                          :value="
                            detail.data.rows[i - 1].item[0]?.item_unit ||
                            detail.data.rows[i - 1].item_unit
                          "
                          type="text"
                          class="input input-sm input-bordered w-full bg-gray-200 border-base-content"
                          readonly
                        />
                        <input
                          v-else
                          type="text"
                          class="input input-sm input-bordered w-full bg-gray-200 border-base-content"
                          readonly
                        />
                      </td>
                      <td v-else>
                        <input
                          type="text"
                          v-model="detail.data.rows[i - 1].item_unit"
                          :class="`input input-sm input-bordered w-full ${detail.data.rows[i - 1].status ? 'bg-gray-200' : ''} border-base-content`"
                          :readonly="detail.data.rows[i - 1].status"
                        />
                      </td>
                      <td v-if="!canedit">
                        <div
                          :class="base.data.form.object.form_type == 'request' ? 'w-40' : 'w-80'"
                          v-if="!detail.data.rows[i - 1].status"
                        >
                          <AppModuleGlobalCombobox
                            :url="`api/controllers/MYSQL/INTERNAL/HR/whinternal/rack_items`"
                            :label="''"
                            :selectMode="'single'"
                            :image="false"
                            :fieldDisplay="'rack_item_detail'"
                            :lastDisplay="detail.data.rows[i - 1].rack_id"
                            :imagePath="'WHinternal/item'"
                            :lastFile="''"
                            :objectData="['code', 'rack_id', 'item_id', 'rack_item_amount']"
                            :inSearch="true"
                            :param="base.data.form.object.form_type == 'request' ? [
                              {
                                item_id: detail.data.rows[i - 1].item_id,
                              },
                            ] : [
                              {
                                rack_id: 'EXTRA',
                              },
                            ]"
                            v-model="detail.data.rows[i - 1].rack_data"
                          />
                        </div>
                        <input
                          v-else
                          :value="detail.data.rows[i - 1].rack_id"
                          type="text"
                          :class="`input input-sm input-bordered border-base-content bg-gray-200 ${base.data.form.object.form_type == 'request' ? 'w-40' : 'w-80'}`"
                          readonly
                        />
                      </td>
                      <!-- {{ detail.data.rows[i - 1].rack_data }} -->
                      <td
                        v-if="!canedit"
                      >
                        <div style="display: flex; flex-direction: row" v-if="!detail.data.rows[i - 1].status">
                          <button
                            class="flex-1 mr-1 btn btn-xs btn-outline btn-success w-full h-8"
                            :disabled="!detail.data.rows[i - 1].rack_data.length"
                            @click="fnDetail.update('ready', i - 1)"
                            >
                            Ready
                          </button>
                          <button
                            class="flex-1 ml-1 btn btn-xs btn-outline btn-warning w-full h-8"
                            @click="fnDetail.update('reject', i - 1)"
                          >
                          <!-- :disabled="!detail.data.rows[i - 1].rack_data.length" -->
                            Reject
                          </button>
                        </div>
                        <div style="display: flex; flex-direction: row" v-else>
                          <button
                            :class="`flex-1 mr-1 btn btn-xs btn-outline ${
                              detail.data.rows[i - 1].status == 'ready'
                                ? 'disabled:bg-success disabled:text-white'
                                : 'disabled:btn-outline disabled:btn-success'
                            } w-full h-8`"
                            disabled
                          >
                            Ready
                          </button>
                          <button
                            :class="`flex-1 ml-1 btn btn-xs btn-outline ${
                              detail.data.rows[i - 1].status == 'reject'
                                ? 'disabled:bg-warning disabled:text-white'
                                : 'disabled:btn-outline disabled:btn-warning'
                            } w-full h-8`"
                            disabled
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                      <td v-if="base.data.form.object.form_type == 'buy'">
                        <AppModuleGlobalUploadMini
                          :fileLink="`${
                            detail.data.rows[i - 1].imageLink
                          }stationery/${detail.data.rows[i - 1].code}/`"
                          :file="detail.data.rows[i - 1].image"
                          :id="'base'"
                          :edit="canedit ? true : false"
                          @respone="
                            (res) => {
                              detail.data.rows[i - 1].image = detail.data.rows[
                                i - 1
                              ].image.concat(res.file);
                            }
                          "
                          @uploaded="
                            (res) => {
                              let index = detail.data.rows[
                                i - 1
                              ].image.findIndex((v) => v.r == res.r);
                              detail.data.rows[i - 1].image[
                                index
                              ].upload = false;
                              detail.data.rows[i - 1].image[index].file =
                                res.row.file;
                            }
                          "
                          @stream="
                            (res) => {
                              let index = detail.data.rows[
                                i - 1
                              ].image.findIndex((v) => v.r == res.r);
                              detail.data.rows[i - 1].image[index].loading =
                                res.loading;
                            }
                          "
                          @error="
                            (res) => {
                              let index = detail.data.rows[
                                i - 1
                              ].image.findIndex((v) => v.r == res.r);
                              detail.data.rows[i - 1].image[index].error = true;
                            }
                          "
                          @again="
                            (res) => {
                              let index = detail.data.rows[
                                i - 1
                              ].image.findIndex((v) => v.r == res.file.r);
                              detail.data.rows[i - 1].image[index] = res.file;
                            }
                          "
                          @resetdata="
                            (res) => {
                              detail.data.rows[i - 1].image = [...res.file];
                            }
                          "
                        />
                      </td>
                      <td>
                        <input
                          v-if="
                            base.data.form.object.form_type == 'buy' ||
                            detail.data.rows[i - 1].item.length
                          "
                          v-model="detail.data.rows[i - 1].item_detail"
                          type="text"
                          :class="`input input-sm input-bordered w-full border-base-content ${
                            !canedit ? 'bg-gray-200' : ''
                          }`"
                          :readonly="!canedit"
                        />
                        <input
                          v-else
                          type="text"
                          class="input input-sm input-bordered w-full border-base-content bg-gray-200"
                          readonly
                        />
                      </td>
                      <td v-if="canedit" class="text-center" width="5%">
                        <label
                          class="btn btn-xs btn-error text-white"
                          @click="fnDetail.removeRow(i - 1)"
                        >
                          <Icon icon="bi:trash3" width="14" height="14" />
                        </label>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot v-if="canedit">
                    <tr
                      class="text-center"
                      v-if="
                        base.data.form.object.wh_owner &&
                        base.data.form.object.form_type
                      "
                    >
                      <td colspan="6">
                        <button
                          v-if="base.data.form.object.form_type == 'request'"
                          class="btn btn-primary btn-sm text-white"
                          @click="fnDetail.addRequestRow()"
                        >
                          <Icon icon="bi:plus-circle" width="16" height="16" />
                          เพิ่มรายการ
                        </button>
                        <button
                          v-if="base.data.form.object.form_type == 'buy'"
                          class="btn btn-primary btn-sm text-white"
                          @click="fnDetail.addBuyRow()"
                        >
                          <Icon icon="bi:plus-circle" width="16" height="16" />
                          เพิ่มรายการ
                        </button>
                        <button
                          v-if="base.data.form.method == 'PUT'"
                          class="btn btn-warning btn-sm ml-1"
                          @click="fnDetail.save()"
                        >
                          <Icon icon="bi:sd-card" width="16" height="16" />
                          บันทึกการแก้ไขรายการ
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              </div>
              <div class="grid gap-3 grid-cols-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold"
                      >ผู้ขอเบิก :</span
                    >
                  </label>
                  <div class="join">
                    <input
                      type="text"
                      placeholder="ผู้ทำรายการ"
                      class="join-item input input-sm input-bordered bg-gray-200 text-black text-xs w-full"
                      readonly
                      :value="base.data.form.object.creator_name"
                    />
                    <input
                      type="datetime"
                      placeholder="ผู้ทำรายการ"
                      class="join-item input input-sm input-bordered bg-gray-200 text-black text-xs italic w-full"
                      :value="
                        $moment(base.data.form.object.created_at).format(
                          'DD-MM-YYYY HH:mm:ss'
                        )
                      "
                      readonly
                    />
                  </div>
                </div>
                <!-- <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">วันที่ขอเบิก :</span>
                  </label>
                  <input
                    type="datetime"
                    placeholder="ผู้ทำรายการ"
                    class="input input-sm input-bordered bg-gray-200 text-black w-full"
                    :value="
                      $moment(base.data.form.object.created_at).format(
                        'DD-MM-YYYY HH:mm:ss'
                      )
                    "
                    readonly
                  />
                </div> -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold"
                      >ผู้อนุมัติ :</span
                    >
                  </label>
                  <div class="join">
                    <input
                      type="text"
                      placeholder="ผู้อนุมัติ"
                      class="join-item input input-sm input-bordered bg-gray-200 text-black text-xs w-full"
                      readonly
                      :value="base.data.form.object.approver_name"
                    />
                    <input
                      type="datetime"
                      placeholder="วันที่อนุมัติ"
                      class="join-item input input-sm input-bordered bg-gray-200 text-black text-xs italic w-full"
                      readonly
                      :value="
                        base.data.form.object.approve_at
                          ? $moment(base.data.form.object.approve_at).format(
                              'DD-MM-YYYY HH:mm:ss'
                            )
                          : ''
                      "
                    />
                  </div>
                </div>
                <!-- <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold"
                      >วันที่อนุมัติ :</span
                    >
                  </label>
                  <input
                    type="datetime"
                    placeholder="วันที่อนุมัติ"
                    class="input input-sm input-bordered bg-gray-200 text-black w-full"
                    readonly
                    :value="
                      base.data.form.object.approve_at
                        ? $moment(base.data.form.object.approve_at).format(
                            'DD-MM-YYYY HH:mm:ss'
                          )
                        : ''
                    "
                  />
                </div> -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">ผู้จ่าย :</span>
                  </label>
                  <div class="join">
                    <input
                      type="text"
                      placeholder="ผู้จ่าย"
                      class="join-item input input-sm input-bordered bg-gray-200 text-black text-xs w-full"
                      readonly
                      :value="base.data.form.object.distributor_name"
                    />
                    <input
                      type="datetime"
                      placeholder="วันที่จ่าย"
                      class="join-item input input-sm input-bordered bg-gray-200 text-black text-xs italic w-full"
                      readonly
                      :value="
                        base.data.form.object.distribute_at
                          ? $moment(base.data.form.object.distribute_at).format(
                              'DD-MM-YYYY HH:mm:ss'
                            )
                          : ''
                      "
                    />
                  </div>
                </div>
                <!-- <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">วันที่จ่าย :</span>
                  </label>
                  <input
                    type="datetime"
                    placeholder="วันที่จ่าย"
                    class="input input-sm input-bordered bg-gray-200 text-black w-full"
                    readonly
                    :value="
                      base.data.form.object.distribute_at
                        ? $moment(base.data.form.object.distribute_at).format(
                            'DD-MM-YYYY HH:mm:ss'
                          )
                        : ''
                    "
                  />
                </div> -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold"
                      >ผู้รับของ :</span
                    >
                  </label>
                  <div class="join">
                    <input
                      type="text"
                      placeholder="ผู้รับของ"
                      class="join-item input input-sm input-bordered bg-gray-200 text-black w-full"
                      readonly
                      :value="base.data.form.object.receiver_name"
                    />
                    <input
                      type="datetime"
                      placeholder="วันที่รับของ"
                      class="join-item input input-sm input-bordered bg-gray-200 text-black w-full"
                      readonly
                      :value="
                        base.data.form.object.receive_at
                          ? $moment(base.data.form.object.receive_at).format(
                              'DD-MM-YYYY HH:mm:ss'
                            )
                          : ''
                      "
                    />
                  </div>
                </div>
                <!-- <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">วันที่รับของ :</span>
                  </label>
                  <input
                    type="datetime"
                    placeholder="วันที่รับของ"
                    class="input input-sm input-bordered bg-gray-200 text-black w-full"
                    readonly
                    :value="
                      base.data.form.object.receive_at
                        ? $moment(base.data.form.object.receive_at).format(
                            'DD-MM-YYYY HH:mm:ss'
                          )
                        : ''
                    "
                  />
                </div> -->
              </div>
              <div
              class="form-control"
              v-if="base.data.form.object.form_status == 'cancelled'"
            >
              <label class="label">
                <span class="label-text font-semibold text-error"
                  >เหตุผลการยกเลิก :</span
                >
              </label>
              <textarea
                class="textarea textarea-bordered w-full bg-gray-200"
                rows="3"
                v-model="base.data.form.object.cancel_reason"
                readonly
              ></textarea>
              </div>
            </div>
          <!-- </div> -->
          <hr class="mt-5" v-if="!doneprocess" />
          <div
            class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex"
            v-if="!doneprocess"
          >
            <div class="flex-1 form-control mt-6">
              <button @click="base.data.form.modal = false" class="btn">
                <Icon icon="bi:x-circle" width="18" height="18" /> ปิด
              </button>
            </div>
            <div
              class="flex-1 form-control mt-6"
              v-if="base.data.form.method == 'POST'"
            >
              <button
                class="btn bg-blue-500 text-white"
                @click="fnBase.save()"
                :disabled="
                  !(
                    base.data.form.object.wh_owner &&
                    base.data.form.object.form_type &&
                    base.data.form.object.due_date
                  )
                "
              >
                <Icon icon="bi:sd-card" width="18" height="18" /> บันทึก /
                ส่งใบขอเบิก
              </button>
            </div>
            <div
              class="flex-1 form-control mt-6"
              v-if="base.data.form.method == 'PUT' && canedit"
            >
              <button
                class="btn btn-error text-white"
                @click="cancelling = true"
              >
                <span
                  class="flex items-center gap-2"
                  v-if="base.data.form.object.form_status == 'waiting'"
                  ><Icon icon="bi:x-octagon" width="18" height="18" />
                  ไม่อนุมัติ</span
                >
                <span
                  class="flex items-center gap-2"
                  v-if="base.data.form.object.form_status == 'approve'"
                  ><Icon icon="bi:file-earmark-x" width="18" height="18" />
                  ยกเลิกเอกสาร</span
                >
              </button>
            </div>
            <div
              class="flex-1 form-control mt-6"
              v-if="base.data.form.method == 'PUT'"
            >
              <button
                class="btn btn-success text-white"
                @click="fnBase.save()"
                :disabled="
                  base.data.form.object.form_status == 'inprocess' &&
                  detail.data.rows.filter((x) => x.status).length !=
                    detail.data.rows.length
                "
              >
                <span
                  class="flex items-center gap-2"
                  v-if="base.data.form.object.form_status == 'waiting'"
                  ><Icon icon="bi:check2-circle" width="20" height="20" />
                  อนุมัติ</span
                >
                <span
                  class="flex items-center gap-2"
                  v-if="base.data.form.object.form_status == 'approve'"
                  ><Icon icon="bi:gear-wide-connected" width="18" height="18" />
                  ดำเนินการ</span
                >
                <span
                  class="flex items-center gap-2"
                  v-if="base.data.form.object.form_status == 'inprocess'"
                  ><Icon icon="bi:check2-square" width="18" height="18" />
                  จัดเตรียมสำเร็จ</span
                >
                <span
                  class="flex items-center gap-2"
                  v-if="base.data.form.object.form_status == 'ready'"
                  ><Icon icon="bi:check-circle-fill" width="18" height="18" />
                  ส่งมอบเรียบร้อยแล้ว</span
                >
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- modal item -->
      <input
        type="checkbox"
        id="modal-list"
        class="modal-toggle"
        v-model="item.data.form.modal"
      />
      <div class="modal" v-if="item.data.form.modal">
        <div class="modal-box relative w-11/12 max-w-3xl">
          <label
            @click="item.data.form.modal = false"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div class="flex justify-center items-center gap-3">
            <h3 class="text-lg font-bold text-secondary">อุปกรณ์จากรายการเบิกที่ยังค้างจ่าย</h3>
            <div class="flex justify-end">
              <AppModuleGlobalSearch
                :class="'input input-xs input-bordered border-base-content w-40 join-item'"
                @search="
                  (q) => {
                    item.search[0].value = q;
                    fnItem.search();
                  }
                  "
              />
            </div>
          </div>
          <hr class="mt-5" />
          <div
            v-if="item.pagination.loading"
            class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
          >
            <AppModuleGlobalLoadingText
              :type="'text'"
              :class="`p-4 py-12 text-3xl text-center`"
            />
          </div>
          <div class="overflow-x-auto max-h-[60vh] my-3 p-1">
            <table class="table table-xs table-pin-rows table-pin-cols mt-3">
              <thead>
                <tr>
                  <th>Item ID</th>
                  <td>Item Name</td>
                  <td class="text-right">Total Amount</td>
                  <td>Unit</td>
                  <td>Form ID</td>
                  <td>Due Date</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(v, i) in item.data.rows">
                  <th>{{ v.item_id }}</th>
                  <td>{{ v.item_name }}</td>
                  <td class="text-right">{{ v.form_item_amount }}</td>
                  <td>{{ v.item_unit }}</td>
                  <td>{{ v.form_id }}</td>
                  <td :class="$moment().format('YYYY-MM-DD') > v.due_date ? 'text-error' : ''">{{ v.due_date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <AppModuleGlobalPagination
            v-model="item.pagination"
            @update:page="fnItem.get"
          />
        </div>
      </div>
      <!-- modal catalog -->
      <input
        type="checkbox"
        id="modal-catalog"
        class="modal-toggle"
        v-model="list.data.form.modal"
      />
      <div class="modal" v-if="list.data.form.modal">
        <div class="modal-box relative w-11/12 max-w-7xl">
          <label
            @click="list.data.form.modal = false"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div class="flex justify-center items-center gap-3">
            <h3 class="text-md font-bold text-secondary">รายการอุปกรณ์  </h3>
            <div class="flex justify-end">
              <AppModuleGlobalSearch
                :class="'input input-xs input-bordered border-base-content w-40 join-item'"
                @search="
                  (q) => {
                    list.search[0].value = q;
                    fnList.search();
                  }
                  "
              />
            </div>
          </div>
          <hr class="mt-5" />
          <div
            v-if="list.pagination.loading"
            class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
          >
            <AppModuleGlobalLoadingText
              :type="'text'"
              :class="`p-4 py-12 text-3xl text-center`"
            />
          </div>
          <div class="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 mt-5 overflow-x-auto max-h-[70vh] px-2">
            <div 
              class="card bg-base-100 border-2" 
              v-for="(v, i) in list.data.rows"
            >
              <figure>
                <img
                  :src="v.image.length ? `${v.imageLink}WHinternal/item/${v.code}/${v.image[0].file}` : `${v.imageLink}web/emptyImage.jpg`"
                  style="height: 152px; object-fit: contain;"
                />
              </figure>
              <div class="card-body text-left px-3">
                <h2 class="card-title text-md font-extrabold">{{ v.item_id }}</h2>
                <p class="text-sm">{{ v.item_name }}</p>
                <!-- <div class="card-actions justify-end">
                  <label 
                    for="modal-catalog"
                    class="btn btn-xs btn-primary text-base-100"
                    :class="detail.rows.filter(x => x.item_id == v.item_id).length || !base.data.form.object.form_type || !base.data.form.object.wh_owner || !canedit ? 'btn-disabled' : ''"
                    @click="catalog_save(v)"
                  >
                    Select
                  </label>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- modal cancel -->
      <input
        type="checkbox"
        id="modal-cancel"
        class="modal-toggle"
        v-model="cancelling"
      />
      <div class="modal" v-if="cancelling">
        <div class="modal-box relative w-11/12 max-w-xs">
          <label
            @click="cancelling = false"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-md font-bold text-error">เหตุผลการยกเลิก?</h3>
          <!-- <hr class="mt-5"> -->
          <div class="my-5 overflow-auto text-sm">
            <textarea
              class="textarea textarea-bordered w-full"
              rows="3"
              placeholder="ระบุอย่างน้อย 10 ตัวอักษร..."
              v-model="base.data.form.object.cancel_reason"
            ></textarea>
          </div>
          <div class="backdrop-blur sticky top-0 items-center gap-2">
            <div class="form-control">
              <button
                class="btn btn-sm btn-error text-white"
                @click="fnBase.save()"
                :disabled="base.data.form.object.cancel_reason.length < 10"
              >
                ยืนยัน! ไม่อนุมัติ/ยกเลิกเอกสาร
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #view>
      <div class="grid grid-cols-1 gap-6">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-2 lg:p-4">
            <div>
              <div
                v-if="base.pagination.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div :class="`${base.pagination.loading ? 'blur-sm' : ''}`">
                <div ref="titleZone">
                  <div
                    class="gap-2 sm:gap-4 flex-row flex w-full justify-end items-center relative"
                  >
                    <div class="w-full lg:block hidden">
                      <h3
                        class="flex text-md text-gray-500 font-semibold gap-1"
                      >
                        <Icon
                          icon="bi:clipboard-check"
                          width="20"
                          height="20"
                        />&nbsp;รายการข้อมูลการร้องขอ/เบิก/จ่าย&nbsp;อุปกรณ์เครื่องใช้สำนักงาน
                      </h3>
                    </div>
                    <div
                      class="gap-2 sm:gap-4 flex-row flex w-full justify-end relative"
                    >
                      <button
                        class="join-item btn sm:btn-sm btn-xs"
                        @click="exportExcel()"
                      >
                        <Icon icon="file-icons:microsoft-excel" />
                      </button>
                      <label
                        class="btn btn-sm bg-gray-500 hover:bg-gray-600 text-white w-40"
                        @click="fnItem.search()"
                      >
                        <Icon
                          icon="bi:list-task"
                          width="16"
                          height="16"
                        />
                        อุปกรณ์ที่ค้างจ่าย
                      </label>
                      <label
                        class="btn btn-sm btn-primary text-white w-40"
                        @click="fnBase.create()"
                      >
                        <Icon
                          icon="bi:file-earmark-plus"
                          width="16"
                          height="16"
                        />
                        ขอเบิกอุปกรณ์
                      </label>
                      <AppModuleGlobalSearchV2
                        @update:search="fnBase.search"
                        v-model="base.search"
                        :loading="base.pagination.loading"
                      />
                    </div>
                  </div>
                  <div class="divider my-1"></div>
                </div>
                <div
                  class="overflow-x-auto w-full my-2"
                  :style="{
                    maxHeight: contentHeight,
                    minHeight: contentHeight,
                  }"
                >
                  <div
                    v-if="
                      !base.pagination.loading && base.data.rows.length == 0
                    "
                  >
                    <AppModuleGlobalEmptyData
                      :class="`p-4 py-12 text-3xl text-center`"
                    />
                  </div>
                  <table v-else class="table table-pin-rows table-pin-cols">
                    <thead>
                      <tr class="bg-primary text-white">
                        <td>Form ID</td>
                        <td>Form Type</td>
                        <td>Status</td>
                        <td>Date Request</td>
                        <td>Due Date Request</td>
                        <td>Requester Name</td>
                        <td>Department (Req.)</td>
                        <td>Approver</td>
                        <td>Approver Date</td>
                        <td>Receiver</td>
                        <td>Receive Date</td>
                      </tr>
                    </thead>
                    <tbody class="text-xs">
                      <tr
                        v-for="(v, i) in base.data.rows"
                        style="cursor: pointer"
                        :class="
                          v.form_status == 'done'
                            ? 'bg-gray-300 text-black hover:bg-gray-200'
                            : v.form_status == 'cancelled'
                            ? 'bg-red-300 text-black hover:bg-red-200'
                            : 'hover:bg-slate-100'
                        "
                        @dblclick="fnBase.edit(`${v.form_id}`, `${i}`)"
                      >
                        <td class="font-bold">{{ v.form_id }}</td>
                        <td>{{ v.form_type }}</td>
                        <td>
                          <span
                            class="badge font-semibold text-xs"
                            :class=" v.form_status == 'cancelled' ? 'badge-error text-white'
                                : v.form_status == 'waiting' ? 'text-yellow-600'
                                : v.form_status == 'approve' ? 'text-emerald-600'
                                : v.form_status == 'inprocess' ? 'text-sky-500'
                                : v.form_status == 'ready' ? 'text-blue-600' 
                                : ''
                            "
                          >
                            {{ v.form_status }}
                          </span>
                        </td>
                        <td>
                          {{
                            $moment(v.created_at).format("DD-MM-YYYY HH:mm:ss")
                          }}
                        </td>
                        <td>
                          {{
                            $moment(v.due_date).format("DD-MM-YYYY HH:mm:ss")
                          }}
                        </td>
                        <td>{{ v.creator_name }}</td>
                        <td>{{ v.dept_title }}</td>
                        <td>{{ v.approver_name || "-" }}</td>
                        <td>
                          {{
                            v.approve_at
                              ? $moment(v.approve_at).format(
                                  "DD-MM-YYYY HH:mm:ss"
                                )
                              : "-"
                          }}
                        </td>
                        <td>{{ v.receiver_name || "-" }}</td>
                        <td>
                          {{
                            v.receive_at
                              ? $moment(v.receive_at).format(
                                  "DD-MM-YYYY HH:mm:ss"
                                )
                              : "-"
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <AppModuleGlobalPagination
                v-model="base.pagination"
                @update:page="fnBase.get"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import { useContentHeight } from "@/composables/useContentHeight";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref } from "vue";
import moment from "moment";

import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModuleGlobalUploadMini from "@/components/App/Module/Global/UploadMini.vue";
import AppModuleGlobalCombobox from "@/components/App/Module/Global/Combobox.vue";

export default {
  name: "Request",
  components: {
    AppLayout,
    AppModuleGlobalPagination,
    AppModuleGlobalSearch,
    AppModuleGlobalSearchV2,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModuleGlobalUploadMini,
    AppModuleGlobalCombobox,
  },
  created: function () {
    this.moment = moment;
  },
  setup() {
    const store = useStore();
    configureQuery(store);

    const serviceUrl = computed(() => store.getters.serviceUrl);
    const user = computed(() => store.getters.user);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);
    const bottomEl = ref(null);

    const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone);

    const canedit = ref(false);
    const cancelling = ref(false);
    const doneprocess = ref(false);

    const base = ref({
      pagination: {
        page: 1,
        row: 20,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            form_type: "",
            item_id: "",
          },
        },
      },
      search: [
        {
          type: "search",
          id: "q",
          placeholder: "Search",
          label: "Search",
          value: "",
        },
        {
          type: "date",
          id: "dateFrom",
          placeholder: "Search",
          label: "Start Date",
          value: "",
        },
        {
          type: "date",
          id: "dateTo",
          placeholder: "Search",
          label: "End Date",
          value: "",
        },
      ],
    });

    const detail = ref({
      pagination: {
        page: 1,
        row: 10,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        base_rows: [],
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            item_rack: [],
          },
        },
      },
    });

    const item = ref({
      pagination: {
        page: 1,
        row: 20,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            form_type: "",
            item_id: "",
          },
        },
      },
      search: [
        {
          type: "search",
          id: "q",
          placeholder: "Search",
          label: "Search",
          value: "",
        },
      ],
    });

    const list = ref({
      pagination: {
        page: 1,
        row: null,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            form_type: "",
            item_id: "",
          },
        },
      },
      search: [
        {
          type: "search",
          id: "q",
          placeholder: "Search",
          label: "Search",
          value: "",
        },
      ],
    });

    const fnBase = {
      search: async () => {
        try {
          base.value.pagination.page = 1;
          await fnBase.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (base.value.pagination.loading) return;
        base.value.pagination.loading = true;
        try {
          const queryParams = {
            page: base.value.pagination.page,
            row: base.value.pagination.row,
            search: base.value.search,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/HR/whinternal/forms"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            base.value.data.rows = res.rows;
            base.value.pagination.total = res.total;
            base.value.pagination.next =
              base.value.pagination.page * base.value.pagination.row <
              base.value.pagination.total;
            base.value.pagination.back = base.value.pagination.page > 1;
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          base.value.pagination.loading = false;
        }
      },
      create: () => {
        base.value.data.form.current = 0;
        base.value.data.form.object = {
          form_type: "",
          form_status: "waiting",
          creator_name: user.value.firstname + " " + user.value.lastname,
          created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        };

        detail.value.data.rows = [];

        base.value.data.form.method = "POST";

        canedit.value = true;
        cancelling.value = false;
        doneprocess.value = false;
        base.value.data.form.modal = true;
      },
      edit: async (fomrId, index) => {
        base.value.data.form.current = fomrId;
        base.value.data.form.object = base.value.data.rows[index];
        base.value.data.form.object.cancel_reason =
          base.value.data.form.object.cancel_reason || "";
        base.value.data.form.method = "PUT";

        await fnDetail.search();

        canedit.value = base.value.data.form.object.process < 3;
        cancelling.value = false;
        doneprocess.value = base.value.data.form.object.process > 4;
        base.value.data.form.modal = true;
      },
      save: async () => {
        if (base.value.data.form.loading) return;
        base.value.data.form.loading = true;
        try {
          const queryBody = {
            code: base.value.data.form.current,
            rows: [
              {
                ...base.value.data.form.object,
              },
            ],
          };

          console.log("base", queryBody);

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/HR/whinternal/forms"
          );
          const method = base.value.data.form.method || "POST";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
          }

          if (base.value.data.form.current === 0) {
            // base.value.data.form.current = res.rows[0].code;
            base.value.data.form.current = await res.rows[0].form_id;
            fnDetail.save();
          }
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          base.value.data.form.loading = false;

          await fnBase.search();

          cancelling.value = false;
          base.value.data.form.modal = false;
        }
      },
      success() {
        fnBase.get();
      },
    };

    const fnDetail = {
      search: async () => {
        try {
          detail.value.pagination.page = 1;
          await fnDetail.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (detail.value.pagination.loading) return;
        detail.value.pagination.loading = true;
        try {
          const queryParams = {
            page: detail.value.pagination.page,
            row: detail.value.pagination.row,
            search: detail.value.search,
            form_id: base.value.data.form.object.form_id,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/HR/whinternal/form_items"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            res.rows.forEach((v, i) => {
              res.rows[i]["item"] = res.rows[i].item
                ? JSON.parse(res.rows[i].item)
                : [];
              res.rows[i]["rack_data"] = [];
              res.rows[i]["method"] = "PUT";

              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].file = v.file ? JSON.parse(v.file) : [];
              res.rows[i].master = 0;
            });

            detail.value.data.rows = res.rows;
            detail.value.data.base_rows = res.rows;
            detail.value.pagination.total = res.total;
            detail.value.pagination.next =
              detail.value.pagination.page * detail.value.pagination.row <
              detail.value.pagination.total;
            detail.value.pagination.back = detail.value.pagination.page > 1;

            console.log(detail.value.data.rows);
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          detail.value.pagination.loading = false;
        }
      },
      addRequestRow: () => {
        detail.value.data.rows[detail.value.data.rows.length] = {
          item: [{ item_name: "" }],
          form_item_amount: 0,
          item_detail: "",
          method: "POST",
        };
      },
      addBuyRow: () => {
        detail.value.data.rows[detail.value.data.rows.length] = {
          item_name: "",
          form_item_amount: 0,
          item_unit: "",
          item_detail: "",
          image: [],
          imageLink: "http://localhost:8080/services/upload/",
          method: "POST",
        };
      },
      removeRow: (index) => {
        detail.value.data.rows = detail.value.data.rows.filter(
          (x, i) => i != index
        );

        console.log(detail.value.data.rows.filter(x => !detail.value.data.base_rows.some(y => x.item_name === y.item_name)))
        console.log(detail.value.data.rows.filter(x => !detail.value.data.base_rows.some(y => x.item_name === y.item_name)).length)
        console.log(detail.value.data.base_rows.filter(x => !detail.value.data.rows.some(y => x.item_name === y.item_name)))
        console.log(detail.value.data.base_rows.filter(x => !detail.value.data.rows.some(y => x.item_name === y.item_name)).length)
      },
      save: async () => {
        if (detail.value.data.form.loading) return;
        detail.value.data.form.loading = true;
        try {
          if (base.value.data.form.method == 'PUT' && detail.value.data.base_rows.filter(x => !detail.value.data.rows.some(y => x.item_name === y.item_name)).length) {
            const removed = detail.value.data.base_rows.filter(x => !detail.value.data.rows.some(y => x.item_name === y.item_name));
            removed.forEach(x => {
              const body = {
                code: x.current,
                rows: [
                  { code: x.code }
                ],
              };
              const path = buildPath(null, "api/controllers/MYSQL/INTERNAL/HR/whinternal/form_items");
              const res = fetchQuery({}, "DELETE", path, body);
            })
          }

          let rowData = [];
          if (base.value.data.form.object.form_type == "request") {
            detail.value.data.rows.forEach((x, i) => {
              rowData[i] = x;
              rowData[i]["item_code"] = x.item[0]?.code || x.code;
              rowData[i]["item_id"] = x.item[0]?.item_id || x.item_id;
              rowData[i]["item_name"] = x.item[0].item_name;
              rowData[i]["item_unit"] = x.item[0]?.item_unit || x.item_unit;

              rowData[i]["form_id"] = base.value.data.form.current;
            });
          } else {
            detail.value.data.rows.forEach((x, i) => {
              rowData[i] = x;

              let image = rowData[i].image[0]
                ? { ...rowData[i].image[0] }
                : null;
              image ? delete image.temp : "";

              rowData[i]["image"] = image ? [image] : [];

              rowData[i]["form_id"] = base.value.data.form.current;
            });
          }

          const queryBody = {
            code: detail.value.data.form.current,
            rows: rowData,
          };

          console.log("detail", queryBody);

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/HR/whinternal/form_items"
          );
          const method = "POST";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
          }

          if (detail.value.data.form.current === 0) {
            detail.value.data.form.current = res.rows[0].code;
          }
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          detail.value.data.form.loading = false;

          fnDetail.search();
        }
      },
      update: async (status, index) => {
        if (detail.value.data.form.loading) return;
        console.log(detail.value.data.rows[index].rack_data[0].rack_item_amount)
        console.log(detail.value.data.rows[index].form_item_amount)
        if (parseInt(detail.value.data.rows[index].rack_data[0].rack_item_amount) < parseInt(detail.value.data.rows[index].form_item_amount)) return;
        else {
          detail.value.data.form.loading = true;
          try {
            detail.value.data.form.object = detail.value.data.rows[index];
            status == 'ready' ? detail.value.data.form.object.rack_id =
              detail.value.data.form.object.rack_data[0].rack_id : '';
            detail.value.data.form.object.status = status;

            const queryBody = {
              code: detail.value.data.form.current,
              rows: [
                {
                  ...detail.value.data.form.object,
                },
              ],
            };

            const path = buildPath(
              null,
              "api/controllers/MYSQL/INTERNAL/HR/whinternal/form_items"
            );
            const method = "PUT";
            const res = await fetchQuery({}, method, path, queryBody);

            if (!res.success) {
              console.error("Failed to save data");
              return;
            }

            if (detail.value.data.form.current === 0) {
              detail.value.data.form.current = await res.rows[0].code;
            }
          } catch (error) {
            console.error("An error occurred during save operation:", error);
          } finally {
            detail.value.data.form.loading = false;

            fnDetail.search();
          }
        }
      },
      success() {
        fnDetail.get();
      },
    };

    const fnItem = {
      search: async () => {
        try {
          item.value.pagination.page = 1;
          await fnItem.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (item.value.pagination.loading) return;
        item.value.pagination.loading = true;
        try {
          const queryParams = {
            page: item.value.pagination.page,
            row: item.value.pagination.row,
            search: item.value.search,
            noStatus: true,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/HR/whinternal/form_items"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            item.value.data.rows = res.rows;
            item.value.pagination.total = res.total;
            item.value.pagination.next =
              item.value.pagination.page * item.value.pagination.row <
              item.value.pagination.total;
            item.value.pagination.back = item.value.pagination.page > 1;
          } else {
            console.error("Error fetching item:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          item.value.pagination.loading = false;

          item.value.data.form.modal = true;
        }
      },
    }

    const fnList = {
      search: async () => {
        try {
          list.value.pagination.page = 1;
          await fnList.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (list.value.pagination.loading) return;
        list.value.pagination.loading = true;
        try {
          const queryParams = {
            page: list.value.pagination.page,
            row: list.value.pagination.row,
            search: list.value.search,
            item_stock: true,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/HR/whinternal/items"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].file = v.file ? JSON.parse(v.file) : [];
              res.rows[i].master = 0;
            });

            list.value.data.rows = res.rows;
            list.value.pagination.total = res.total;
            list.value.pagination.next =
              list.value.pagination.page * list.value.pagination.row <
              list.value.pagination.total;
            list.value.pagination.back = list.value.pagination.page > 1;
          } else {
            console.error("Error fetching list:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          list.value.pagination.loading = false;

          list.value.data.form.modal = true;
        }
      },
    }

    fnBase.search();

    return {
      canedit,
      cancelling,
      doneprocess,
      base,
      fnBase,
      detail,
      fnDetail,
      item,
      fnItem,
      list,
      fnList,
      AppLayoutComponent,
      titleZone,
      contentHeight,
      serviceUrl,
      user,
    };
  },
};
</script>

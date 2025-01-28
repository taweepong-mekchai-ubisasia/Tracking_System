<script setup>
import { Toaster, toast } from 'vue-sonner'
</script>

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
        <div class="modal-box relative w-11/12 max-w-7xl">
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">
            <span class="text-slate-400">Item Master:</span> {{ base.form.code }}
          </h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 72vh;">
            <div class="grid gap-3 lg:grid-cols-2 grid-cols-1">
              <div class="flex justify-center gap-3 border-2 overflow-hidden">
                <div class="avatar">
                  <div class="mask mask-square w-auto h-full">
                    <label
                      for="modal_showImage"
                      class="btn btn-link p-0 h-full"
                      v-if="base.form.image.length > 0"
                      @click="
                        base.form.image.length > 0
                          ? (imageSrc = `${
                            base.form.image[
                              base.form.master ? base.form.master : 0
                            ].temp
                              ? `${serviceUrl}tmps/image/`
                              : base.form.imageLink
                              ? `${base.form.imageLink}IndirectItem/${base.form.code}/`
                              : `${serviceUrl}tmps/image/`
                          }${
                            base.form.image[
                              base.form.master ? base.form.master : 0
                            ].file
                          }`)
                        : ''
                      "
                    >
                      <img
                        v-if="base.form.image.length > 0"
                        :src="`${
                          base.form.image[
                            base.form.master ? base.form.master : 0
                          ].temp
                            ? `${serviceUrl}tmps/image/`
                            : base.form.imageLink
                            ? `${base.form.imageLink}IndirectItem/${base.form.code}/`
                            : `${serviceUrl}tmps/image/`
                        }${
                          base.form.image[
                            base.form.master ? base.form.master : 0
                          ].file
                        }`"
                        alt="Image"
                        style="object-fit: fill"
                      />
                    </label>
                    <img
                      width="auto"
                      height="auto"
                      :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyImage.jpg&s=10`"
                      alt="Image"
                      style="object-fit: contain"
                      v-else
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-rows-2 gap-3 text-left text-sm">
                <div class="border-2 p-3">
                  <div class="block">
                    <b>ชื่อ:</b> {{ base.form.title }}
                  </div>
                  <hr class="my-1 border-dashed">
                  <div>
                    <b>รายละเอียด:</b> {{ base.form.description || '-' }}
                  </div>
                  <hr class="my-1 border-dashed">
                  <div class="grid gap-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                    <div class="block">
                      <b>จำนวนทั้งหมด (<span class="text-sm">Receive</span>):</b><br>
                      {{ base.form.Import ? new Intl.NumberFormat("en-US").format(base.form.Import) : 0 }} {{ base.form.unit || '-' }}
                    </div>
                    <div class="block">
                      <b>ใช้ไปแล้ว (<span class="text-sm">Issue</span>):</b><br>
                      {{ base.form.Export ? new Intl.NumberFormat("en-US").format(base.form.Export) : 0 }} {{ base.form.unit || '-' }}
                    </div>
                    <div class="block">
                      <b>คงเหลือในคลัง (<span class="text-sm">Amount</span>):</b><br>
                      {{ base.form.amount ? new Intl.NumberFormat("en-US").format(base.form.amount) : 0 }} {{ base.form.unit || '-' }}
                    </div>
                  </div>
                  <hr class="my-1 border-dashed">
                  <div class="grid gap-3 grid-cols-2">
                    <div class="block">
                      <b>Current Price:</b><br>
                      {{ base.form.current_price ? new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(base.form.current_price) : 0 }} ฿
                    </div>
                    <div class="block">
                      <b>Last Buy Price:</b><br>
                      {{ base.form.last_buy_price ? new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(base.form.last_buy_price) : 0 }} ฿
                    </div>
                  </div>
                </div>
                <div class="form-control border-2 overflow-x-auto">
                  <div class="w-full overflow-auto max-h-[31vh]">
                    <table class="table table-xs table-pin-rows table-pin-cols table-zebra h-full">
                      <thead>
                        <tr>
                          <td>Transaction</td>
                          <td>สร้างรายการเมื่อ</td>
                          <td>รายละเอียด</td>
                          <td>หมายเหตุ</td>
                          <th 
                            class="text-right"
                          >
                            <label
                              for="modal-detail"
                              class="btn btn-primary modal-button btn-xs text-white w-16"
                              @click="detail_create()"
                            >
                              <Icon icon="subway:add" width="12" height="12" />
                              Add
                            </label>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          class="hover"
                          v-for="(v, i) in detail.rows"
                          :key="i"
                        >
                          <td>
                            <div class="flex items-center space-x-3">
                              <div>
                                <div>
                                  {{ v.code }}
                                </div>
                                <div class="font-semibold">
                                  ( {{ v.status }} )
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="flex items-center space-x-3">
                              <div>
                                <div class="italic">
                                  {{ $moment(v.created_at).format("DD-MM-YYYY HH:mm:ss") }}
                                </div>
                                <div class="opacity-50">
                                  {{ v.created_fullname }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="flex items-center space-x-3">
                              <div>
                                <div>
                                  จำนวน : {{ new Intl.NumberFormat("en-US").format(v.qty) }}
                                </div>
                                <div>
                                  ราคาต่อหน่วย : {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(v.price) }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{{ v.comments || '-' }}</td>
                          <th v-if="base.form.status == 'export'">
                            {{ v.issue }}
                          </th>
                          <th v-else class="text-right">
                            <label
                              for="modal-remove"
                              class="btn btn-ghost modal-button btn-xs"
                              @click="
                                remove_item(
                                  v,
                                  `${v.code}`,
                                  'detail',
                                  'controllers/MYSQL/INTERNAL/WHI/transaction'
                                )
                              "
                              v-if="user.access.WarehouseIndirect.WHIndirectReceive != 'superuser' ? true : false"
                            >
                              ลบ
                            </label>
                            <h3 class="opacity-50" v-else>superadmin<br>สามารถลบได้</h3>
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
      <!-- modal item -->
      <input
        type="checkbox"
        id="modal-item"
        class="modal-toggle"
        v-model="item.modal"
      />
      <div class="modal" v-if="item.modal">
        <div class="modal-box relative w-11/12 max-w-2xl">
          <label
            for="modal-item"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-secondary">รายการของที่ต้องซื้อคืนคลังอื่น</h3>
          <div class="overflow-auto" style="max-height: 50vh;">
            <div v-if="!item.loading && item.rows.length == 0">
              <AppModuleGlobalEmptyData
                :class="`p-4 py-12 text-3xl text-center`"
              />
            </div>
            <div class="overflow-auto" style="max-height: 60vh;" v-else>
              <table class="table table-xs mt-3">
                <thead>
                  <tr>
                    <th>หัวข้อเอกสาร</th>
                    <th>ชื่อ Item</th>
                    <th>จำนวน</th>
                    <th>หน่วย</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v, i) in item.rows">
                    <td>{{ v.doc_title }}</td>
                    <td>{{ v.title }}</td>
                    <td>{{ v.qty }}</td>
                    <td>{{ v.unit }}</td>
                    <td>
                      <label
                        for="modal-detail"
                        class="join-item btn modal-button btn-xs text-primary hover:text-black"
                        @click="item_edit(v)"
                      >
                        <span class="underline underline-offset-2">คืนรายการนี้</span>
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
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
        <div class="modal-box relative w-11/12 max-w-md">
          <label
            for="modal-detail"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-secondary">เพิ่มจำนวน Item</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 60vh;">
            <div class="grid grid-cols-2 gap-3">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">จำนวน</span><span class="text-xs text-error">{{ msg.qty }}</span>
                </label>
                <input
                  type="number"
                  placeholder="Quantity"
                  class="input input-sm input-bordered border-gray-300 shadow"
                  :min="detail.controll == 'edit' ? item.form.qty : 1"
                  v-model="detail.form.qty"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">ราคา</span>
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  class="input input-sm input-bordered border-gray-300 shadow"
                  min="1"
                  v-model="detail.form.price"
                />
              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">หมายเหตุ</span>
              </label>
              <textarea
                class="textarea textarea-bordered border-gray-300 w-full h-20 shadow"
                placeholder="Remarks"
                v-model="detail.form.comments"
              ></textarea>
            </div>
          </div>
          <hr />
          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
            <div class="flex-1 form-control mt-6">
              <label for="modal-detail" class="btn">
                <Icon icon="hugeicons:cancel-circle-half-dot" width="16" height="16" />
                ปิด
              </label>
            </div>
            <div class="flex-1 form-control mt-6">
              <button
                class="btn btn-primary text-white"
                @click="detail_save('static')"
              >
                <Icon icon="line-md:circle-to-confirm-circle-transition" width="16" height="16" />
                ยืนยันการบันทึก
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- modal config -->
      <input
        type="checkbox"
        id="modal-config"
        class="modal-toggle"
        v-model="config.modal"
      />
      <div class="modal" v-if="config.modal">
        <div class="modal-box relative w-11/12 max-w-2xl">
          <label
            for="modal-config"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-secondary">System Config</h3>
          <div class="overflow-auto" style="max-height: 60vh;">
            <table class="table table-xs mt-3">
              <thead>
                <tr>
                  <th>Warehouse</th>
                  <th>Department Owners</th>
                  <th>Add Department</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(v, i) in base.dept">
                  <td class="font-semibold">{{ v.title }}</td>
                  <td>
                    <div class="flex flex-col gap-1">
                      <span 
                        class="badge badge-sm text-xs font-bold hover:shadow-xl" 
                        :class="bg.filter(x => x.dept == vd.dept).length ? bg.find(x => x.dept == vd.dept).color : 'badge-error'" 
                        v-for="vd in config.rows.filter(x => x.wh == v.owner)"
                      >
                        {{ vd.title }}
                        <label 
                          for="modal-remove"
                          class="ml-1 text-white cursor-pointer" 
                          @click="
                            remove_item(
                              vd,
                              `${vd.code}`,
                              'config',
                              'controllers/MYSQL/INTERNAL/WHI/whi_config'
                            )
                          "
                        >
                          <Icon icon="ic:round-cancel" />
                        </label>
                      </span>
                    </div>
                  </td>
                  <td class="join">
                    <select class="join-item select select-xs select-bordered w-full" v-model="config.select[i-1]">
                      <option v-for="vv in config.dept" :value="vv.code" :disabled="config.rows.filter(x => x.wh == v.owner).find(x => x.dept == vv.code) ? true : false">{{ vv.title }}</option>
                    </select>
                    <button class="join-item btn btn-xs bg-success text-white" @click="config_save(i)" :disabled="!config.select[i-1]">
                      <Icon icon="dashicons:plus-alt" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
        <div class="modal-box relative w-11/12 max-w-sm">
          <label
            for="modal-remove"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-error">REMOVE TRANSACTION</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto max-h-[60vh]">
            คุณแน่ใจหรือไม่ว่าจะลบรายการนี้?
          </div>
          <hr>
          <div class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex">
            <div class="flex-1 form-control mt-6">
              <label for="modal-remove" class="btn btn-danger">
                <Icon icon="hugeicons:cancel-circle-half-dot" width="16" height="16" />
                ปิด
              </label>
            </div>
            <div class="flex-1 form-control mt-6">
              <button
                class="btn btn-error text-white"
                @click="confirm_remove()"
              >
                <Icon icon="line-md:circle-to-confirm-circle-transition" width="16" height="16" />
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </div>
      <AppModuleGlobalShowImage :src="imageSrc" />
    </template>
    <template #view>
      <Toaster 
        :expand="false"
        position="top-center" 
        richColors
        closeButton
      />

      <div class="gap-3 py-3">
        <div class="flex justify-between mb-2">
          <div class="join lg:max-w-lg md:max-w-md sm:max-w-sm max-w-lg w-full">
            <select 
              class="join-item select select-sm select-bordered w-full font-semibold"
              v-model="by.tab"
              @change="setCheckbox()"
              >
              <option v-for="v in base.dept" :value="v.owner">{{ v.title }}</option>
            </select>
            <div class="indicator">
              <span class="indicator-item badge badge-sm badge-error text-xs font-bold border-red-600">{{ base.noti }}</span>
              <label 
                for="modal-item" 
                class="join-item btn btn-sm btn-accent w-36 px-2 text-white"
                @click="item_search()"
              >
                รายการที่ต้องซื้อคืน
              </label>
            </div>
          </div>
          <label 
            v-if="user.access.WarehouseIndirect.WHIndirectReceive == 'superadmin'"
            for="modal-config" 
            class="btn btn-circle btn-sm btn-info w-fit px-2 text-white"
            @click="config_search()"
          >
            <Icon icon="bi:database-fill-gear" width="20" height="20" />
            <span class="md:block hidden">System Config</span>
          </label>
        </div>
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
            <div class="grid grid-cols-2 gap-3">
              <button
                class="join-item btn btn-xs btn-outline btn-primary w-fit"
                v-if="(user.access.WarehouseIndirect.WHIndirectReceive).indexOf('admin') > -1"
                @click="exportExcel()"
              >
                <Icon
                  icon="mdi:file-excel-outline"
                  width="16" height="16"
                />
                Excel
              </button>
              <div v-else></div>
              <div class="flex justify-end">
                <AppModuleGlobalSearch
                  :class="`join-item input input-sm input-bordered border-gray-300 md:max-w-xs w-full ${base.q ? 'bg-yellow-50 text-black' : ''}`"
                  @search="
                    (q) => {
                      base.page = 1;
                      base.q = q;
                      typeof base.q == 'string' ? base_search() : '';
                    }
                  "
                />
              </div>
            </div>
            <div class="overflow-x-auto w-full max-h-[62vh] my-3 shadow rounded-xl">
              <div v-if="!base.loading && base.rows.length == 0">
                <AppModuleGlobalEmptyData
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <table class="table table-zebra table-xs table-pin-rows table-pin-cols" v-else>
                <thead>
                  <tr class="italic">
                    <td>รูปประกอบ</td>
                    <td>Item</td>
                    <td>รายละเอียด</td>
                    <td>Status</td>
                    <td class="text-right">คงเหลือในคลัง</td>
                    <td class="text-right">จำนวนขั้นต่ำ</td>
                    <td>หน่วย</td>
                    <td v-if="(user.access.WarehouseIndirect.WHIndirectReceive).indexOf('admin') > -1" class="text-right">ราคา (฿)</td>
                    <th v-if="user.access.WarehouseIndirect.WHIndirectReceive != 'user' ? user.access.WarehouseIndirect.WHIndirectReceive != 'superadmin' ? base.owner.find(x => x.wh == by.tab) : true : false"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v, i) in base.rows" :key="v.code" class="hover"
                  >
                  <!-- :class="(parseInt(v.min) >= parseInt(v.amount)) ? i % 2 == 0 ? 'bg-red-100 text-black' : 'bg-red-200 text-black' : ''" -->
                    <td>
                        <div class="avatar static shadow">
                          <div class="w-12 h-12 bg-white">
                            <label
                              for="modal_showImage"
                              class="btn btn-link p-0 flex justify-center"
                              v-if="v.image.length > 0"
                              @click="
                                v.image.length > 0
                                  ? (imageSrc = `${
                                      v.image[v.master ? v.master : 0].temp
                                        ? `${serviceUrl}tmps/image/`
                                        : v.imageLink
                                        ? `${v.imageLink}IndirectItem/${v.code}/`
                                        : `${serviceUrl}tmps/image/`
                                    }${
                                      v.image[v.master ? v.master : 0].file
                                    }`)
                                  : ''
                              "
                            >
                              <img
                                :src="`${
                                  v.image[v.master ? v.master : 0].temp
                                    ? `${serviceUrl}tmps/image/`
                                    : v.imageLink
                                    ? `${v.imageLink}IndirectItem/${v.code}/`
                                    : `${serviceUrl}tmps/image/`
                                }${v.image[v.master ? v.master : 0].file}`"
                                alt="Image"
                                style="object-fit: contain"
                              />
                            </label>
                            <img
                              width="auto"
                              height="auto"
                              class="max-h-44 object-cover bg-cover"
                              v-else
                              :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyImage.jpg&s=10`"
                              alt="Image"
                            />
                          </div>
                        </div>
                    </td>
                    <td>
                      <div class="flex items-center gap-3">
                        <div class="font-semibold">
                          <div class="text-sm">
                            {{ v.title }}
                          </div>
                          <div class="opacity-50">
                            ( {{ v.code || '-' }} )
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{{ v.description || '-' }}</td>
                    <td>
                      <div class="flex items-center gap-2" v-if="(parseInt(v.min) < parseInt(v.amount))"><span class="badge badge-success badge-xs"></span><span class="font-bold text-success">มีของเพียงพอแล้ว</span></div>
                      <div class="flex items-center gap-2" v-else><span class="badge badge-error badge-xs"></span><span class="font-bold text-error">ต้องเติมของเพิ่ม</span></div>
                    </td>
                    <td class="text-right">
                      {{ new Intl.NumberFormat().format(v.amount) }}
                    </td>
                    <td class="text-right">
                      {{ new Intl.NumberFormat().format(v.min) }}
                    </td>
                    <td>{{ v.unit || '-' }}</td>
                    <td v-if="(user.access.WarehouseIndirect.WHIndirectReceive).indexOf('admin') > -1" class="text-right">
                      {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(v.current_price) }}
                    </td>
                    <th class="text-right" v-if="user.access.WarehouseIndirect.WHIndirectReceive != 'user' ? user.access.WarehouseIndirect.WHIndirectReceive != 'superadmin' ? base.owner.find(x => x.wh == by.tab) : true : false">
                      <label
                        for="modal-base"
                        class="btn btn-primary modal-button btn-xs text-white"
                        @click="base_edit(`${v.code}`, `${i}`)"
                      >
                        รายละเอียด
                      </label>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="grid gap-3 md:grid-cols-2 grid-cols-1">
              <div class="md:text-left text-center text-sm items-center gap-1">
                Show :
                <select class="select select-bordered select-xs w-fit bg-yellow-50 text-black" 
                  v-model="base.row" 
                  @change="base_search()"
                >
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
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
                      base_search();
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
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "IndirectReceive",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalScannerDetect,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData
  },
  data() {
    return {
      bg: [
        {dept: '170564984084c6f', color: 'bg-orange-500'},
        {dept: '17056498404bf20', color: 'bg-amber-500'},
        {dept: '170564984092be0', color: 'bg-yellow-500'},
        {dept: '1705649840cabf2', color: 'bg-lime-500'},
        {dept: '17056498404fe0b', color: 'bg-green-500'},
        {dept: '17056498405bb45', color: 'bg-emerald-500'},
        {dept: '1705649840b0cd6', color: 'bg-teal-500'},
        {dept: '1721103490tpyEU', color: 'bg-cyan-500'},
        {dept: '1721103499WUnje', color: 'bg-sky-500'},
      ],
      by: { tab: "" },
      first_search: true,
      loadimage: false,
      refresh: false,
      msg: {
        qty: '',
        price: ''
      },
      base: {
        dept: [],
        owner: [],
        rows: [],
        noti: 0,
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
      config: {
        dept: [],
        rows: [],
        select: [],
        current: 0,
        model: false,
        controll: "",
        tb: "",
      },
      imageSrc: null,
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
    exportExcel() {
      return window.open(`${
        this.serviceUrl
      }api/controllers/MYSQL/INTERNAL/WHI/exports?for=manage_item&total=1&owner=${
        this.by.tab}&user_dept=${this.user.department}${this.first_search ? `&first_search=${this.first_search}` : ''}${
      this.base.q ? `&q=${this.base.q}` : ""}`);
    },
    setCheckbox() {
      this.base.q = ''
      this.base.page = 1
      this.base_search()
    },
    error() {
      this.loadimage = false;
    },
    loaded() {
      this.loadimage = true;
    },
    // Base
    base_search(callback = null) {
      this.base.loading = true;
      this.base_get((res) => {
        setTimeout(() => {
          this.base.rows = res.rows;
          this.base.owner = res.owner;
          this.base.dept = res.dept;
          this.base.noti = res.noti;
          this.base.total = res.total;
          this.base.next =
            this.base.page * this.base.row >= this.base.total ? false : true;
          this.base.back = this.base.page > 1 ? true : false;
          this.base.loading = false;

          callback ? callback(res) : "";
        }, 200);
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WHI/item?total=1&owner=${this.by.tab}&user_dept=${this.user.department}${this.first_search ? `&first_search=${this.first_search}` : ''}&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`, (res) => {
        if (!res.success) {
          console.error(res)
        } else {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.base.controll = "edit";
      this.detail.rows = [];
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
      new Query('detail','get').get(this, `${
        this.serviceUrl
      }api/controllers/MYSQL/INTERNAL/WHI/transaction?total=1&status=import&page=${
        this.detail.page
      }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
        this.detail.q ? `&q=${this.detail.q}` : ""
      }${this.base.current ? `&current=${this.base.current}` : ``}`, (res) => {
        if (!res.success) {
          console.error(res)
        } else {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    detail_create() {
      this.msg.qty = ''

      this.detail.current = 0;
      this.detail.form = {
        code: "",
        qty: "",
        price: "",
        comments: "",
      };
      this.detail.controll = "create";
    },
    detail_save(type) {
      if(!this.detail.form.qty) {
        this.msg.qty = '*กรอกข้อมูล*'
        return;
      } else {
        this.msg.qty = ''
      }

      let obj = {
        code: this.detail.current,
        rows: [
          {
            ...Object.assign({ ...this.detail.form }),
            item: this.base.current,
            title: this.base.form.title,
            status: "import",
            repurchase : this.detail.controll == 'edit' ? this.item.current : null
          },
        ],
      };

      new Query(null, "POST").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WHI/transaction`, obj, (res) => {
        if (!res.success) {
          console.error(res)
        } else {
          this.detail.modal = false;
          toast.success('บันทึกการทำรายการเรียบร้อย')

          if (type == "static") {
            this.base_search(() => {
              let index = this.base.rows.findIndex(
                (v) => v.code == this.base.current
              );
              this.base.form = { ...this.base.rows[index] };
              this.detail_search();
            });
          }
        }
      });
    },
    // ITEM
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
      new Query('item','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WHI/request_item?total=1&repurchase=Y&page=${this.item.page}${
        this.user.access.WarehouseIndirect.WHIndirectReceive != 'superadmin' ? `&su=${this.user.code}` : ''}${this.item.row ? `&rows=${this.item.row}` : ""}${
      this.item.q ? `&q=${this.item.q}` : ""}${this.item.current ? `&current=${this.item.current}` : ``}`, (res) => {
        if (!res.success) {
          console.error(res)
        } else {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    item_edit(row) {
      this.base.current = row.item
      this.base.form.title = row.title

      this.detail.controll = 'edit'
      this.detail.form.qty = row.qty
      
      this.item.current = row.code
      this.item.form.qty = row.qty
    },
    // CONFIG
    config_search() {
      this.config.rows = []
      this.config.dept = []
      this.config.select= []
      this.config.loading = true;
      this.config_get((res) => {
        this.config.dept = res.dept;
        this.config.rows = res.rows;
        this.config.loading = false;
      });
    },
    config_get(callback) {
      new Query('config','get').get(this, `${
        this.serviceUrl
      }api/controllers/MYSQL/INTERNAL/WHI/whi_config?total=1`, (res) => {
        if (!res.success) {
          console.error(res)
        } else {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    config_save(index) {
      let obj = {
        rows: [
          {
            wh: this.base.dept[index].owner,
            dept: this.config.select[index-1]
          },
        ],
      };

      new Query(null, "POST").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WHI/whi_config`, obj, (res) => {
        if (!res.success) {
          console.error(res)
        } else {
          this.config_search()
          toast.info('บันทึกข้อมูลเรียบร้อย')
        }
      });
    },
    // REMOVE
    remove_item(v, code, controll, tb) {
      this.remove.form = v;
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    confirm_remove() {
      fetch(`${this.serviceUrl}api/${this.remove.tb}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({ rows: [{ ...this.remove.form }] }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (!res.success) {
            console.error(res)
          } else {
            this.remove.modal = false;

            this.base_search(() => {
              let index = this.base.rows.findIndex(
                (v) => v.code == this.remove.form.item
              );
              this.base.form = { ...this.base.rows[index] };
              this[`${this.remove.controll}_search`]();
              toast.error('ลบรายการดังกล่าวเรียบร้อย')
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.by.tab = this.user.access.WarehouseIndirect.WHIndirectReceive != 'superadmin' ? this.user.department : "170564984084c6f";
      this.base_search(() => {
        this.by.tab = this.base.owner[0].wh
        this.first_search = false
      });
    });
  }
};
</script>

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
        <div class="modal-box relative w-11/12 max-w-xl">
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">Request Document</h3>
          <hr class="mt-5" />
          <div class="overflow-auto" style="max-height: 66vh;">
            <div class="form-control">
              <label class="label">
                <span class="label-text">หัวข้อเอกสารขอเบิก</span><span class="text-xs text-error">{{ msg.title }}</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                class="input input-sm input-bordered border-gray-300 shadow"
                :class="base.form.status != 'request' ? 'bg-gray-200 text-black' : ''"
                v-model="base.form.title"
                :readonly="base.form.status == 'request' ? false : true"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">รายละเอียดการขอเบิก</span><span class="text-xs text-error">{{ msg.descr }}</span>
              </label>
              <textarea
                class="textarea textarea-bordered border-gray-300 shadow"
                :class="base.form.status != 'request' ? 'bg-gray-200 text-black' : ''"
                rows="2"
                placeholder="Description"
                v-model="base.form.description"
                :readonly="base.form.status == 'request' ? false : true"
              ></textarea>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">วันที่ต้องการของ</span>
                </label>
                <input
                  type="date"
                  placeholder="Title"
                  class="input input-sm input-bordered border-gray-300 shadow"
                  :class="base.form.status != 'request' ? 'bg-gray-200 text-black' : ''"
                  v-model="base.form.request_at"
                  :readonly="base.form.status == 'request' ? false : true"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">เบิกจากคลัง</span>
                </label>
                <select
                  class="select select-sm select-bordered border-gray-300 w-full shadow"
                  v-model="base.form.request_wh"
                  :disabled="detail.rows.length ? true : false"
                >
                  <option value="" disabled>-เลือกคลัง-</option>
                  <option v-for="v in base.dept" :value="v.wh">{{ v.wh_title }}</option>
                </select>
              </div>
            </div>
            <div class="form-control pt-4">
              <div class="w-full overflow-auto min-h-[20vh] max-h-[20vh] border-2">
                <table class="table table-xs table-pin-rows table-pin-cols table-zebra">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>สถานะ</th>
                      <th class="text-right">จำนวน</th>
                      <th class="text-right" v-if="base.form.status == 'request'">
                        <label
                          for="modal-detail"
                          class="btn btn-primary modal-button btn-xs text-white"
                          :class="base.form.request_wh == '' ? 'btn-disabled' : ''"
                          @click="detail_create();"
                        >
                          <Icon icon="subway:add" width="12" height="12" />
                          Add
                        </label>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in detail.rows" :key="i">
                      <th>{{ i + 1 }}</th>
                      <td>
                        <div class="flex items-center gap-3">
                          <div class="font-semibold">
                            <div>
                              {{ v.title }}
                            </div>
                            <div class="opacity-50">
                              ( {{ v.item || '-' }} )
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="font-semibold" :class="v.status == 'approve' ? 'text-success' : v.status == 'reject' ? 'text-error' : 'opacity-70'">{{ v.status }}</td>
                      <td class="text-right">
                        <div class="font-bold" v-if="v.status != 'approve'">
                          {{ v.qty }}
                        </div>
                        <div class="font-bold" v-else>
                          {{ v.issue ? v.issue : 0 }} / {{ v.qty }}
                        </div>
                      </td>
                      <th class="text-right"  v-if="(base.form.newStatus == 'request') && v.status == 'waiting'">
                        <label
                          for="modal-detail"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="detail_edit(`${v.code}`)"
                        >
                          <span class="underline underline-offset-2">แก้ไข</span>
                        </label>
                        <label
                          for="modal-remove"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'detail',
                              'controllers/MYSQL/INTERNAL/WHI/request_item'
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
            <div class="grid grid-cols-2 gap-3">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">ผู้ทำรายการ</span>
                </label>
                <input
                  type="text"
                  placeholder="ผู้ทำรายการ"
                  class="input input-sm input-bordered border-gray-300 shadow bg-gray-200 text-black"
                  v-model="base.form.created_by"
                  readonly
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Status</span>
                </label>
                <select
                  class="select select-sm select-bordered border-gray-300 w-full shadow"
                  v-model="base.form.newStatus"
                  :disabled="base.form.status == 'request' ? false : true"
                  >
                  <option value="request">Request</option>
                  <option value="reject" disabled>Reject</option>
                  <option value="approve" disabled>Approve</option>
                  <option value="close" :disabled="base.form.status == 'approve' && base.form.canClose ? false : true">Close</option>
                </select>
              </div>
            </div>
          </div>
          <div
            class="backdrop-blur sticky top-0 items-center gap-3 flex"
            v-if="base.form.status == 'request'"
          >
            <div class="flex-1 form-control mt-6">
              <label for="modal-base" class="btn">
                <Icon icon="hugeicons:cancel-circle-half-dot" width="16" height="16" />
                ปิด
              </label>
            </div>
            <div class="flex-1 form-control mt-6" @click="base_save()">
              <button class="btn btn-primary text-white">
                <Icon icon="line-md:circle-to-confirm-circle-transition" width="16" height="16" />
                บันทึกรายการ
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
        <div class="modal-box relative w-11/12 max-w-xl">
          <label
            for="modal-detail"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-secondary">Request Item</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 60vh;">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Item</span><span class="text-xs text-error">{{ msg.item }}</span>
              </label>
              <div class="join">
                <input
                  type="text"
                  placeholder="Item"
                  class="join-item input input-bordered border-gray-300 bg-gray-200 text-black shadow w-full"
                  :value="detail.form.title || ''"
                  readonly
                />
                <label
                  for="modal-catalog"
                  class="join-item btn btn-info"
                  @click="
                    catalog.q = '';
                    catalog_search();
                  "
                >
                  <Icon icon="carbon:ibm-watson-knowledge-catalog" width="16" height="16" /> items
                </label>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">คงเหลือในคลัง</span>
                </label>
                <input
                  type="text"
                  placeholder="Amount"
                  class="input input-bordered border-gray-300 bg-gray-200 text-black shadow"
                  :value="detail.form.amount || ''"
                  readonly
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">จำนวนเบิก</span><span class="text-xs text-error">{{ msg.qty }}</span>
                </label>
                <input
                  type="number"
                  placeholder="Quantity"
                  class="input input-bordered border-gray-300 shadow"
                  v-model="detail.form.qty"
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex">
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
                ยืนยันข้อมูล
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- modal catalog -->
      <input
        type="checkbox"
        id="modal-catalog"
        class="modal-toggle"
        v-model="catalog.modal"
      />
      <div class="modal" v-if="catalog.modal">
        <div class="modal-box relative w-11/12 max-w-4xl">
          <label
            for="modal-catalog"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div class="flex justify-center items-center gap-3">
            <h3 class="text-lg font-bold text-secondary">Item : </h3>
            <AppModuleGlobalSearch
              :class="'join-item input input-sm input-bordered border-gray-300 w-60'"
              @search="
                (q) => {
                  catalog.q = q;
                  catalog_search();
                }
              "
            />
          </div>
          <hr class="mt-5" />
          <div
            v-if="catalog.loading"
            class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
          >
            <AppModuleGlobalLoadingText
              :type="'text'"
              :class="`p-4 py-12 text-3xl text-center`"
            />
          </div>
          <!-- {{ catalog.rows }} -->
          <div class="overflow-x-auto max-h-[60vh] my-5">
            <table class="table table-xs table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th class="text-center">Select</th>
                  <td>รูปประกอบ</td>
                  <td>Item Master</td>
                  <td colspan="2">จำนวนคงเหลือ</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(v, i) in catalog.rows" :class="v.code == detail.form.item_code ? 'bg-primary text-white' : ''">
                  <th class="text-center" :class="v.code == detail.form.item_code ? 'bg-primary text-white' : ''">
                    <input type="radio" name="radio-1" class="radio radio-sm" :value="v.code" v-model="detail.form.item_code" :disabled="detail.rows.find(x => x.item == v.code) ? true : false" />
                  </th>
                  <td class="flex items-center">
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
                              // v.image[v.master ? v.master : 0]
                                ? `${serviceUrl}tmps/image/`
                                : v.imageLink
                                ? `${v.imageLink}IndirectItem/${v.code}/`
                                : `${serviceUrl}tmps/image/`
                            }${v.image[v.master ? v.master : 0].file}`"
                            alt="Image"
                            style="object-fit: contain;"
                          />
                        </label>
                        <img
                          v-else
                          width="auto"
                          height="auto"
                          class="max-h-44 object-cover bg-cover"
                          :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyImage.jpg&s=10`"
                          alt="Image"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="font-semibold">
                        <div :class="v.code == detail.form.item_code ? 'bg-primary text-white' : 'text-primary'">
                          {{ v.dept_title || '-' }}
                        </div>
                        <div class="text-sm">
                          {{ v.title }}
                        </div>
                        <div class="text-slate-400">
                          {{ v.description || '-' }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="text-right">{{ v.amount }}</td>
                  <td class="text-right">{{ v.unit }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="backdrop-blur sticky top-0 items-center gap-3 flex"> 
            <div class="flex-1 form-control">
              <label 
                for="modal-catalog" class="btn btn-sm btn-primary text-white"
                :class="!detail.form.item_code ? 'btn-disabled' : ''"
                @click="catalog_save(catalog.rows.find(x => x.code == detail.form.item_code))"
              >
                Confirm
              </label>
            </div>
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
          <h3 class="text-lg font-bold text-error">REMOVE DOCUMENT</h3>
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
            <div class="flex justify-end">
              <label
                for="modal-base"
                class="join-item btn-sm btn btn-primary modal-button text-white"
                @click="base_create()"
              >
                <Icon icon="uil:create-dashboard" width="18" height="18" />
                ทำรายการเบิก
              </label>
            </div>
            <div class="border-2 border-dashed rounded-xl p-2 my-1">
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
                  <option value="created_at" selected>วันที่เบิกของจากคลัง</option>
                  <option value="request_at">วันที่ต้องการของ</option>
                  <option value="approve_at">วันที่ทำการ approve</option>
                  <option value="reject_at">วันที่ทำการ reject</option>
                  <option value="close_at">วันที่ทำรายการสำเร็จ</option>
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
                />
                <button class="join-item btn btn-sm btn-active text-white shadow border-gray-300" 
                  @click="
                    this.base.page = 1;
                    this.base_search();
                  "
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
            <div class="px-2">
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
              <div class="overflow-x-auto w-full max-h-[55vh] my-3">
                <div v-if="!base.loading && base.rows.length == 0">
                  <AppModuleGlobalEmptyData
                    :class="`p-4 py-12 text-3xl text-center`"
                  />
                </div>
                <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                  <thead>
                    <tr class="italic">
                      <td>เอกสาร</td>
                      <td>Status</td>
                      <td>เบิกของจากคลัง</td>
                      <td>วันที่ต้องการ</td>
                      <td>ผู้ทำรายการ</td>
                      <td>approve / reject</td>
                      <td>ทำรายการสำเร็จ</td>
                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in base.rows" :key="v.code" class="hover" >
                      <td>
                        <div class="flex items-center gap-3">
                          <div class="font-semibold">
                            <div>
                              {{ v.title }}
                            </div>
                            <div class="opacity-50">
                              {{ v.description || '-' }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span 
                          class="badge badge-sm font-semibold italic px-4 py-2 w-20" 
                          :class="v.status == 'close' ? 'badge-success text-base-100' : v.status == 'approve' ? 'badge-info text-base-100' : v.status == 'reject' ? 'badge-error text-base-100' : v.status == 'request' ? 'badge-warning text-base-100' : ''">
                            {{ v.status }}
                        </span>
                      </td>
                      <td>
                        <div class="flex items-center gap-3">
                          <div>
                            <div class="font-semibold">
                              {{ v.wh_title }}
                            </div>
                            <div class="opacity-70 italic">
                              time:
                              {{
                                v.created_at
                                  ? $moment(v.created_at).format("DD-MM-YYYY HH:mm:ss")
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="italic">
                        {{
                          v.request_at
                            ? $moment(v.request_at).format("DD-MM-YYYY")
                            : "-"
                        }}
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{ v.created_fullname }}
                            </div>
                            <div class="text-xs font-semibold opacity-50">
                              ( <span class="font-bold">{{ v.dept_title }}</span> )
                            </div>
                          </div>
                        </div>
                      </td>
                      <td v-if="v.status == 'reject'">
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs italic">
                              {{
                                v.reject_at
                                  ? $moment(v.reject_at).format("DD-MM-YYYY HH:mm:ss")
                                  : ""
                              }}
                            </div>
                            <div class="text-xs opacity-50" v-if="v.reject_at">
                              ( <span class="font-bold">reject</span> )
                              {{ v.rejecter_fullname }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td v-else>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs italic">
                              {{
                                v.approve_at
                                  ? $moment(v.approve_at).format("DD-MM-YYYY HH:mm:ss")
                                  : ""
                              }}
                            </div>
                            <div class="text-xs opacity-50" v-if="v.approve_at">
                              ( <span class="font-bold">approve</span> )
                              {{ v.approver_fullname }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs italic">
                              {{
                                v.close_at
                                  ? $moment(v.close_at).format("DD-MM-YYYY HH:mm:ss")
                                  : ""
                              }}
                            </div>
                            <div class="text-xs opacity-50" v-if="v.close_at">
                              {{ v.closed_person }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <th class="text-right">
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs hover:text-black"
                          :class="v.status == 'draft' ? 'text-warning' : 'text-primary'"
                          @click="base_edit(`${v.code}`, `${i}`)"
                        >
                          <span class="underline underline-offset-2">
                            {{!v.status || v.status == 'draft' ? 'แก้ไข' : 'รายละเอียด'}}
                          </span>
                        </label>
                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs text-error hover:text-black"
                          v-if="!v.status || v.status == 'request'"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/WHI/request'
                            )
                          "
                        >
                          ยกเลิก
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
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
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
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "IndirectRequest",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData
  },
  data() {
    return {
      loadimage: false,
      refresh: false,
      msg: {
        title: '',
        descr: '',
        item: '',
        qty: ''
      },
      base: {
        date: "created_at",
        from: "",
        to: "",
        rows: [],
        dept: [],
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
      catalog: {
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
    }
  },
  methods: {
    error() {
      this.loadimage = false;
    },
    loaded() {
      this.loadimage = true;
    },
    // Base
    base_search() {
      this.base.loading = true;
      this.base_get((res) => {
        setTimeout(() => {
          this.base.rows = res.rows;
          this.base.dept = res.dept;
          this.base.total = res.total;
          this.base.next =
            this.base.page * this.base.row >= this.base.total ? false : true;
          this.base.back = this.base.page > 1 ? true : false;
          this.base.loading = false;
        }, 200);
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WHI/request?total=1${
        this.user.access.WarehouseIndirect.WHIndirectRequest == 'user' ? `&su=${this.user.code}` 
      : (this.user.access.WarehouseIndirect.WHIndirectRequest == 'superuser' || this.user.access.WarehouseIndirect.WHIndirectRequest == 'admin' ? `&dept=${this.user.department}` : '')}&page=${
        this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}&date=${this.base.date}${this.base.from ? '&from='+this.base.from : ''}${
      this.base.to  ? '&to='+this.base.to : ''}`, (res) => {
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
    base_create() {
      this.msg.title = ''
      this.msg.descr = ''

      this.base.current = 0;
      this.base.form = {
        title: "",
        description: "",
        request_at: this.$moment().format("YYYY-MM-DD"),
        request_wh: this.base.dept ?
          this.base.dept.find(x => x.dept == this.user.department) 
            ? this.base.dept.find(x => x.dept == this.user.department).wh 
            : ''
          : '',
        status: "request",
        newStatus: "request",
        created_by: this.user.firstname+' '+this.user.lastname
      };
      this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.msg.title = ''
      this.msg.descr = ''

      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.base.form.request_at = this.$moment(this.base.form.request_at).format("YYYY-MM-DD");
      this.base.form.created_by = this.base.form.created_fullname;
      this.base.form.newStatus = this.base.form.status;

      this.base.controll = "edit";
      this.detail.rows = [];
      this.detail_search();
      this.refresh = true;
    },
    base_save() {
      if(!this.base.form.title || !this.base.form.description) {
        if(!this.base.form.title) this.msg.title = '*กรอกข้อมูล*'
        else this.msg.title = ''
        if(!this.base.form.description) this.msg.descr = '*กรอกข้อมูล*'
        else this.msg.descr = ''
        return;
      } else {
        this.msg.title = ''
        this.msg.descr = ''
      }

      let vm = this;
      let obj = {
        code: this.base.current,
        rows: [
          {
            ...Object.assign({ ...this.base.form }),
            'status' : this.base.form.newStatus
          },
        ],
      };

      new Query(null, this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WHI/request`, obj, (res) => {
        if (!res.success) {
          console.error(res)
        } else {
          this.base.modal = false;

          const promise_arr = [];
          if (this.base.current == 0) {
            this.base.current = res.rows[0].code;
            let i = this.detail.rows.length;
            this.detail.controll = "create";
            for (i; i > 0; i--) {
              this.detail.form = {...this.detail.rows[i - 1]};
              promise_arr.push(
                new Promise(async function (resolve, reject) {
                  let res = await vm.detail_save("dynamic");
                  await resolve(res);
                  return;
                })
              );
            }
          }

          Promise.all(promise_arr)
            .then((res) => {
              if (this.base.controll == "create") {
                let mail = this.base.dept.find(x => x.wh == this.base.form.request_wh).approver.replaceAll("'", "")
                mail = mail.split(',')
          
                let mail_obj = []
                for (let i = 0; i < mail.length; i++) {
                  mail_obj[i] = {
                    email: mail[i]
                  }
                }

                let data = {
                  mailSubject : 'แบบฟอร์มขออนุมัติเพื่อเบิกอุปกรณ์จากคลัง Indirect',
                  mailFrom : 'it_manage@ubisasia.com',
                  mailDesc : 'Warehouse Indirect System',
                  // mailTo : this.user.emailTitle,
                  mailToList : mail_obj,
                  mailCc : this.user.emailTitle,
                  template : 'email/whindirect/request',
                  row : {
                    title : this.base.form.title,
                    desc : this.base.form.description,
                    wh: this.base.dept.find(x => x.wh == this.base.form.request_wh).wh_title,
                    name: this.base.form.created_by,
                    request : this.base.form.request_at,
                    rows : { ...this.detail.rows }
                  }
                }

                new Query(null, "POST").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/GLOBAL/mail`, data, (res) => {
                  if (!res.status) {
                    console.error(res)
                  } else {
                    toast.success('บันทึกการทำรายการเรียบร้อย')
                  }
                });
              }

              vm.base_search();
            })
            .catch((err) => console.error(err));
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

        let req = 0;
        let issue = 0;
        this.detail.rows.filter(x => x.status != 'reject').forEach((v, i) => {
          issue = issue + (v.issue ? v.issue : 0);
          req = req + (v.qty ? v.qty : 0);
        });
        this.base.form.canClose = req - issue == 0 ? true : false;
      });
    },
    detail_get(callback) {
      new Query('base','get').get(this, `${
        this.serviceUrl
      }api/controllers/MYSQL/INTERNAL/WHI/request_item?total=1&page=${
        this.detail.page
      }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
        this.detail.q ? `&q=${this.detail.q}` : ""
      }${this.base.current ? `&doc=${this.base.current}` : ``}`, (res) => {
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
      this.msg.item = ''
      this.msg.qty = ''
  
      this.detail.current = 0;
      this.detail.form = {
        code: "",
        title: "",
        item: "",
        ref_code: "",
        amount: "",
        qty: "",
        status: 'waiting'
      };
      this.detail.controll = "create";
    },
    detail_edit(code) {
      this.msg.item = ''
      this.msg.qty = ''
  
      this.detail.current = code;
      let index = this.detail.rows.findIndex(
        (v) => v.code == this.detail.current
      );
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.controll = "edit";
    },
    detail_save(type) {
      if(!this.detail.form.title || !this.detail.form.qty) {
        if(!this.detail.form.title) this.msg.item = '*กรอกข้อมูล*'
        else this.msg.item = ''
        if(!this.detail.form.qty) this.msg.qty = '*กรอกข้อมูล*'
        else this.msg.qty = ''
        return;
      } else {
        this.msg.item = ''
        this.msg.qty = ''
      }

      if (!this.base.current) {
        if (this.detail.controll == "create") {
          this.detail.form.code = this.detail.rows.length;
          this.detail.rows = [{ ...this.detail.form }].concat(this.detail.rows);
          this.detail.modal = false;
        } else {
          let index = this.detail.rows.findIndex(
            (v) => v.code == this.detail.current
          );
          this.detail.rows[index] = { ...this.detail.form };
          this.detail.modal = false;
        }
      } else {
        let obj = {
          rows: [
            { ...this.detail.form }
          ]
        };

        obj['rows'][0]["doc"] = this.base.current;
        obj['rows'][0]["status"] = 'waiting';
        if (this.detail.controll == "edit") {
          obj['rows'][0]["code"] = this.detail.form.code;
        }

        new Query(null, this.detail.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WHI/request_item`, obj, (res) => {
          if (!res.success) {
            console.error(res)
          } else {
            this.detail.modal = false;

            if (type == "static") {
              this.detail_search();
            }
          }
        });
      }
    },
    // CATALOG
    catalog_search() {
      this.catalog.rows = []
      this.catalog.loading = true;
      this.catalog_get((res) => {
        setTimeout(() => {
          this.catalog.rows = res.rows;
          this.catalog.total = res.total;
          this.catalog.next =
            this.catalog.page * this.catalog.row >= this.catalog.total
              ? false
              : true;
          this.catalog.back = this.catalog.page > 1 ? true : false;
          this.catalog.loading = false;

          this.detail.form.item_code = this.detail.form.item
        }, 200);
      });
    },
    catalog_get(callback) {
      new Query('catalog','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WHI/item?total=1&owner=${this.base.form.request_wh}${
          this.catalog.q ? `&q=${this.catalog.q}` : ""
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
    catalog_save(row) {
      this.detail.form.item = row.code
      this.detail.form.title = row.title
      this.detail.form.amount = row.amount
    },
    // REMOVE
    remove_item(code, controll, tb) {
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
        body: JSON.stringify({ rows: [{ code: this.remove.code }] }),
      })
      .then((response) => response.json())
      .then((res) => {
        if (!res.success) {
          console.log(res)
        } else {
          this.remove.modal = false;
          this[`${this.remove.controll}_search`]();

          toast.error('ลบรายการดังกล่าวเรียบร้อย')
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();
    });
  },
};
</script>
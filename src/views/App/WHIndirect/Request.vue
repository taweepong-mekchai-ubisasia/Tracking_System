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
          <div class="card-body overflow-auto" style="max-height: 68vh;">
            <div class="form-control">
              <label class="label">
                <span class="label-text">หัวข้อเอกสารขอเบิก</span><span class="text-xs text-error">{{ msg.title }}</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                class="input input-md input-bordered border-gray-300 shadow"
                :class="base.form.status != 'draft' ? 'bg-gray-200 text-black' : ''"
                v-model="base.form.title"
                :readonly="base.form.status == 'draft' ? false : true"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">รายละเอียดการขอเบิก</span><span class="text-xs text-error">{{ msg.descr }}</span>
              </label>
              <textarea
                class="textarea textarea-bordered h-20 border-gray-300 shadow"
                :class="base.form.status != 'draft' ? 'bg-gray-200 text-black' : ''"
                placeholder="Description"
                v-model="base.form.description"
                :readonly="base.form.status == 'draft' ? false : true"
              ></textarea>
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
                      <th class="text-right" v-if="base.form.status == 'draft' || base.form.status == 'pending'">
                        <label
                          for="modal-detail"
                          class="btn btn-primary modal-button btn-xs text-white"
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
                      <th class="text-right"  v-if="(base.form.newStatus == 'draft' || base.form.newStatus == 'pending') && v.status == 'waiting'">
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
            <div class="form-control">
              <label class="label">
                <span class="label-text">Status</span>
              </label>
              <select
                class="select select-bordered border-gray-300 w-full shadow"
                v-model="base.form.newStatus"
                :disabled="base.form.status == 'draft' || (base.form.status == 'approve' && base.form.canClose) ? false : true"
              >
                <!-- <option disabled selected value="">Select Option</option> -->
                <option value="draft" disabled>Draft</option>
                <option value="pending" :disabled="!base.form.status || base.form.status == 'draft' ? false : true">Request</option>
                <option value="reject" disabled>Reject</option>
                <option value="approve" disabled>Approve</option>
                <option value="close" :disabled="base.form.status == 'approve' && base.form.canClose ? false : true">Close</option>
              </select>
            </div>
            <!-- <div class="form-control" v-if="base.form.newStatus == 'reject'">
              <label class="label">
                <span class="label-text">เหตุผลการ reject</span>
              </label>
              <textarea
                class="textarea textarea-bordered h-20 border-gray-300 shadow bg-gray-200 text-black"
                placeholder="Remarks"
                v-model="base.form.reject_reason"
                :readonly="base.form.newStatus == 'reject'"
              ></textarea>
            </div> -->
          </div>
          <hr v-if="base.form.status == 'draft' || (base.form.status == 'approve' && base.form.canClose)" />
          <div
            class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex"
            v-if="base.form.status == 'draft' || (base.form.status == 'approve' && base.form.canClose)"
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
        <div class="modal-box relative w-11/12 max-w-lg">
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
                <AppModuleGlobalSelectSearch
                  :placeholder="'Item'"
                  :label="'title'"
                  :code="'code'"
                  :minChar="3"
                  :delay="0.5"
                  :limit="10"
                  :customClass="`join-item w-full input input-bordered border-gray-300 shadow`"
                  :current="detail.form.item"
                  :refresh="refresh.item"
                  :image="true"
                  @updateValue="
                    (obj) => {
                      detail.form.item = obj ? obj.code : '';
                      detail.form.title = obj ? obj.title : '';
                      detail.form.amount = obj ? obj.amount ? obj.amount : 0 : 0;
                      // detail.form.ref_code = obj ? obj.ref_code : '';
                      // detail.form.current_price = obj ? (obj.current_price ? obj.current_price : 0) : 0;
                      // base.form.item_short.code = obj.code;
                    }
                  "
                  @stopRefresh="
                    (obj) => {
                      refresh.item_short_code = obj.value;
                    }
                  "
                  :url="`${serviceUrl}api/controllers/MYSQL/INTERNAL/WHI/item`"
                  :param="`&total=1`"
                />
                <label
                  for="modal-catalog"
                  class="join-item btn btn-info"
                  @click="catalog_search()"
                >
                  <Icon icon="carbon:ibm-watson-knowledge-catalog" width="16" height="16" /> items
                </label>
              </div>
            </div>
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
        <div class="modal-box relative w-11/12 max-w-6xl">
          <label
            for="modal-catalog"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-secondary">Catalog Items</h3>
          <!-- {{ catalog.rows }} -->
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
          <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 my-3">
            <div class="card bg-base-100 w-full shadow-xl" v-for="v in catalog.rows">
              <figure 
                class="max-h-28 bg-white"
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
                  style="object-fit: contain"
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
                />
              </figure>
              <div class="card-body">
                <h3 class="card-title">{{ v.title }}</h3>
                <p class="text-left text-sm">owner : {{ v.owner }}</p>
                <p class="text-left text-sm">จำนวนคงเหลือ : {{ v.amount }} {{ v.unit }}</p>
              </div>
            </div>
          </div>
          <div class="grid gap-3 lg:grid-cols-2 grid-cols-1">
            <div class="text-left text-sm">
              Show :
              <select class="select select-bordered select-xs w-fit bg-yellow-50" 
                v-model="catalog.row" 
                @change="base_search()"
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
              |
              Showing {{ catalog.page == Math.ceil(catalog.total/catalog.row) ? 1 + (catalog.row*(catalog.page - 1)) : 1 + ((catalog.page - 1)*catalog.row) }} to {{ catalog.page == Math.ceil(catalog.total/catalog.row) ? catalog.total : catalog.row*catalog.page }} of {{ catalog.total }} entries
            </div>
            <div class="join w-full justify-center lg:justify-end">
              <AppModuleGlobalPageination
                :page="catalog.page"
                :total="catalog.total"
                :row="catalog.row"
                :back="catalog.back"
                :next="catalog.next"
                :loading="catalog.loading"
                @search="
                  (res) => {
                    catalog.page = res.page;
                    this.catalog_search();
                  }
                "
              />
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
      <div class="gap-3 py-3">
        <div class="card shadow-lg bg-base-100">
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
            <div class="border-2 border-dashed rounded-xl p-3 mt-2">
              <div class="grid grid-cols-2 gap-3">
                <button
                  class="join-item btn btn-xs btn-outline btn-primary w-fit"
                  @click="exportExcel('base')"
                  disabled
                >
                  <Icon
                    icon="mdi:file-excel-outline"
                    width="16" height="16"
                  />
                  Excel
                </button>
                <div class="flex justify-end">
                  <AppModuleGlobalSearch
                    :class="'join-item input input-sm input-bordered border-gray-300 lg:w-1/2 w-full'"
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
              <div class="overflow-x-auto w-full max-h-[55vh] my-3">
                <div v-if="!base.loading && base.rows.length == 0">
                  <AppModuleGlobalEmptyData
                    :class="`p-4 py-12 text-3xl text-center`"
                  />
                </div>
                <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                  <thead>
                    <tr class="italic">
                      <td>Document</td>
                      <td>Status</td>
                      <td>รายละเอียด</td>
                      <td>เปิด draft</td>
                      <td>ขอเบิก</td>
                      <!-- <td>อนุมัติเมื่อ</td>
                      <td>ถูกปฏิเสธเมื่อ</td>
                      <td>เหตุผลการปฏิเสธ</td> -->
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
                              ( {{ v.code || '-' }} )
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span 
                          class="badge badge-sm font-semibold italic px-4 py-2 w-20" 
                          :class="v.status == 'close' ? 'badge-success text-base-100' : v.status == 'approve' ? 'badge-info text-base-100' : v.status == 'reject' ? 'badge-error text-base-100' : v.status == 'pending' ? 'badge-warning text-base-100' : ''">
                            {{ v.status }}
                        </span>
                      </td>
                      <td>{{ v.description }}</td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs italic">
                              {{
                                v.created_at
                                  ? $moment(v.created_at).format("DD-MM-YYYY HH:mm:ss")
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs opacity-50" v-if="v.created_fullname">
                              {{ v.created_fullname }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs italic">
                              {{
                                v.request_at
                                  ? $moment(v.request_at).format("DD-MM-YYYY HH:mm:ss")
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs opacity-50" v-if="v.request_at">
                              {{ v.requester_fullname }}
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
                                  : "-"
                              }}
                            </div>
                            <!-- <div class="text-xs opacity-50" v-if="v.reject_at">
                              ( <span class="font-bold">reject</span> )
                              {{ v.reject_reason }}
                            </div> -->
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
                                  : "-"
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
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs opacity-50" v-if="v.close_at">
                              {{ v.closed_person }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <th class="text-right" >
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
                          v-if="!v.status || v.status == 'draft' || v.status == 'pending'"
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
              <div class="grid gap-3 lg:grid-cols-2 grid-cols-1">
                <div class="text-left text-sm">
                  Show :
                  <select class="select select-bordered select-xs w-fit bg-yellow-50" 
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
    dateNow() {
      let d = new Date();
      return d.getFullYear() + '-' + (d.getMonth() >= 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
              + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    },
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
          this.base.total = res.total;
          this.base.next =
            this.base.page * this.base.row >= this.base.total ? false : true;
          this.base.back = this.base.page > 1 ? true : false;
          this.base.loading = false;
        }, 250);
      });
    },
    base_get(callback) {
      let dept = ''
      if (this.user.depRef == 224) dept = 'im'
      else if (this.user.depRef == 221 || this.user.depRef == 228) dept = 'pd'
      else if (this.user.depRef > 329 && this.user.depRef < 333) dept = 'rd'
      else if (this.user.depRef == 779) dept = 'qa'
      else if (this.user.depRef == 222 || this.user.depRef == 229) dept = 'qc'
      else dept = 'it'

      new Query('base','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WHI/request?total=1${this.user.access.WHIndirect.WHIndirectRequest == 'superuser' ? `&su=${this.user.code}` : (this.user.access.WHIndirect.WHIndirectRequest == 'admin' ? `&${dept}=1` : '')}&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`, (res) => {
        if (!res.success) {
          console.log(res)
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
        status: "draft",
        newStatus: "draft",
      };
      this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.msg.title = ''
      this.msg.descr = ''

      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
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

      if (this.base.form.newStatus == 'pending') {
        obj['rows'][0]['request_at'] = this.dateNow()
        obj['rows'][0]['request_by'] = this.user.code
      }

      new Query(null, this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WHI/request`, obj, (res) => {
        if (!res.success) {
          console.log(res)
        } else {
          this.base.modal = false;

          const promise_arr = [];
          // console.log(this.base.current);
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
            console.log(res)
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
        }, 250);
      });
    },
    catalog_get(callback) {
      new Query('catalog','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WHI/item?total=1&page=${
          this.catalog.page
        }${this.catalog.row ? `&rows=${this.catalog.row}` : ""}`, (res) => {
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
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();
    });
  },
};
</script>
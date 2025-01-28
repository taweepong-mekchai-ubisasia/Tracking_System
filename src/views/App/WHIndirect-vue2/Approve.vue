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
        <div class="modal-box relative w-11/12 max-w-2xl">
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
                <span class="label-text">หัวข้อเอกสารขอเบิก</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                class="input input-sm input-bordered border-gray-300 shadow bg-gray-200 text-black"
                v-model="base.form.doc_title"
                readonly
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">รายละเอียดการขอเบิก</span>
              </label>
              <textarea
                class="textarea textarea-bordered border-gray-300 shadow bg-gray-200 text-black"
                rows="2"
                placeholder="Description"
                v-model="base.form.description"
                readonly
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
                  class="input input-sm input-bordered border-gray-300 shadow bg-gray-200 text-black"
                  v-model="base.form.request_at"
                  readonly
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">เบิกจากคลัง</span>
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  class="input input-sm input-bordered border-gray-300 shadow bg-gray-200 text-black"
                  v-model="base.form.wh_title"
                  readonly
                />
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
                      <th class="text-center" v-if="base.form.doc_status == 'request'">
                        <div v-if="v.status == 'waiting'">
                          <label
                            for="modal-approve"
                            class="join-item btn btn-success btn-outline modal-button btn-xs w-14"
                            @click="confirm_process('app', v.code, i, 'modal')"
                          >
                            approve
                          </label>
                          <label
                            for="modal-remove"
                            class="join-item btn btn-error btn-outline modal-button btn-xs text-error w-14 ml-1"
                            @click="confirm_process('rej', v.code, i, 'modal')"
                          >
                            reject
                          </label>
                        </div>
                        <div class="opacity-50" v-else>
                          {{ v.status }} แล้ว
                        </div>
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
                  v-model="base.form.created_fullname"
                  readonly
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Status</span>
                </label>
                <select
                  class="select select-sm select-bordered border-gray-300 w-full shadow"
                  v-model="base.form.doc_status"
                  disabled
                >
                  <option value="request">Request</option>
                  <option value="reject" disabled>Reject</option>
                  <option value="approve" disabled>Approve</option>
                  <option value="close" disabled>Close</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- modal approve -->
      <input
        type="checkbox"
        id="modal-approve"
        class="modal-toggle"
        v-model="approve.modal"
      />
      <div class="modal" v-if="approve.modal">
        <div class="modal-box relative w-11/12 max-w-sm">
          <label
            for="modal-approve"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-success">APPROVE REQUEST</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto max-h-[60vh]">
            <h3 class="font-semibold">คุณแน่ใจที่จะ approve รายการนี้?</h3>
            <hr class="border-dashed mt-2" />
            <div class="form-control" v-if="base.dept.length ? base.dept.filter(x => x.dept == base.form.department).length ? false : true : true">
              <label class="label cursor-pointer">
                <span class="label-text">ต้องการให้มีการซื้อคืน</span>
                <input type="radio" name="radio-10" value="Y" class="radio radio-xs checked:bg-success" v-model="base.form.repurchase" />
                <span class="label-text">ใช่</span>
                <input type="radio" name="radio-10" value="N" class="radio radio-xs checked:bg-error" v-model="base.form.repurchase" />
                <span class="label-text">ไม่</span>
              </label>
            </div>
            <div class="text-sm opacity-50" v-else>
              *รายการนี้เป็นการเบิกของจากคลังแผนกตัวเอง*
            </div>
          </div>
          <hr>
          <div class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex">
            <div class="flex-1 form-control mt-6">
              <label for="modal-approve" class="btn btn-danger">
                <Icon icon="hugeicons:cancel-circle-half-dot" width="16" height="16" />
                ปิด
              </label>
            </div>
            <div class="flex-1 form-control mt-6">
              <button
                class="btn btn-success text-white"
                @click="base_save()"
              >
                <Icon icon="line-md:circle-to-confirm-circle-transition" width="16" height="16" />
                ยืนยัน
              </button>
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
          <h3 class="text-lg font-bold text-error">REJECT REQUEST</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto max-h-[60vh]">
            <h3 class="font-semibold">คุณแน่ใจที่จะ reject รายการนี้?</h3>
            <hr class="border-dashed mt-2" />
            <div class="form-control">
              <label class="label">
                <span class="label-text">เหตุผลการ reject request</span>
              </label>
              <textarea
                class="textarea textarea-bordered h-20 border-gray-300 shadow"
                placeholder="Remarks"
                v-model="base.form.reject_reason"
              ></textarea>
            </div>
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
                @click="base_save()"
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
              class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
            >
              <AppModuleGlobalLoadingText
                :type="'text'"
                :class="`p-4 py-12 text-3xl text-center`"
              />
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
              <div class="grid grid-cols-2 gap-3">
                <button
                  class="join-item btn btn-sm btn-outline btn-primary w-fit"
                  @click="exportExcel()"
                >
                  <Icon
                    icon="mdi:file-excel-outline"
                    width="16" height="16"
                  />
                  Excel
                </button>
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
              <div class="overflow-x-auto w-full max-h-[60vh] my-3">
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
                      <td>Item</td>
                      <!-- <td class="text-right">จำนวน</td>
                      <td>หน่วย</td> -->
                      <th class="text-center">Item Status</th>
                      <td class="text-center">View</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in base.rows" :key="v.code" class="hover" >
                      <td>
                        <div class="flex items-center gap-3">
                          <div class="font-semibold">
                            <div>
                              {{ v.doc_title }}
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
                          :class="v.doc_status == 'close' ? 'badge-success text-base-100' : v.doc_status == 'approve' ? 'badge-info text-base-100' : v.doc_status == 'reject' ? 'badge-error text-base-100' : v.doc_status == 'request' ? 'badge-warning text-base-100' : ''"
                          >
                            {{ v.doc_status }}
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
                      <td>
                        <div class="flex items-center gap-3">
                          <div class="font-semibold">
                            <div> 
                              {{ v.title }}
                            </div>
                            <div class="opacity-50">
                              จำนวน: {{ v.qty || '-' }} {{ v.unit || '' }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <!-- <td class="text-right">{{ v.qty }}</td>
                      <td>{{ v.unit }}</td> -->
                      <th class="text-center" v-if="v.status == 'waiting'">
                        <label
                          for="modal-approve"
                          class="join-item btn btn-success btn-outline modal-button btn-xs w-14"
                          @click="confirm_process('app', v.code, i, 'table')"
                        >
                          approve
                        </label>
                        <label
                          for="modal-remove"
                          class="join-item btn btn-error btn-outline modal-button btn-xs text-error w-14 ml-1"
                          @click="confirm_process('rej', v.code, i, 'table')"
                        >
                          reject
                        </label>
                      </th>
                      <th class="text-center" :class="v.status == 'approve' ? 'text-success font-bold' : 'text-error font-bold'" v-else>
                        <div class="flex items-center justify-center gap-3">
                          <div class="font-semibold">
                            <div>
                              {{ v.status }}
                            </div>
                            <div class="opacity-70" v-if="v.status == 'reject'">
                              ( {{ v.reject_reason || '-' }} )
                            </div>
                          </div>
                        </div>
                      </th>
                      <td class="text-center">
                        <label
                          for="modal-base"
                          class="btn btn-primary modal-button btn-xs text-white"
                          @click="base_edit(`${v.code}`, i)"
                        >
                          รายละเอียด
                        </label>
                      </td>
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
  name: "IndirectApprove",
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
      dept: '',
      loadimage: false,
      refresh: false,
      condition: '',
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
      approve: {
        current: 0,
        model: false,
        controll: "",
        tb: "",
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
    exportExcel() {
      return window.open(`${
        this.serviceUrl
      }api/controllers/MYSQL/INTERNAL/WHI/exports?for=request_item&total=1&status=draft${
        this.user.access.WarehouseIndirect.WHIndirectRequest == 'user' ? `&su=${this.user.code}` 
      : (this.user.access.WarehouseIndirect.WHIndirectRequest == 'superuser' || this.user.access.WarehouseIndirect.WHIndirectRequest == 'admin' ? `&dept=${this.user.department}` : '')
        }${this.base.q ? `&q=${this.base.q}` : ""}&date=${this.base.date}${this.base.from ? '&from='+this.base.from : ''}${this.base.to  ? '&to='+this.base.to : ''}`);
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
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WHI/request_item?total=1&status=draft${
        this.user.access.WarehouseIndirect.WHIndirectRequest == 'user' ? `&su=${this.user.code}` 
      : (this.user.access.WarehouseIndirect.WHIndirectRequest == 'superuser' || this.user.access.WarehouseIndirect.WHIndirectRequest == 'admin' ? `&dept=${this.user.department}` : '')
        }&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}&date=${this.base.date}${
      this.base.from ? '&from='+this.base.from : ''}${this.base.to  ? '&to='+this.base.to : ''}`, (res) => {
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
    base_edit(code, index = null) {
      this.base.form = { ...this.base.rows[index] };
      // this.base.current = this.base.rows.find(x => x.code == code);
      this.base.current = this.base.form.code;
      // this.base.index = index;
      this.base.form.request_at = this.$moment(this.base.form.request_at).format("YYYY-MM-DD");
      this.base.controll = "edit";
      this.detail.rows = [];
      this.detail_search();
      this.refresh = true;
    },
    base_save() {
      let vm = this;
      let obj = {
        code: this.base.current,
        rows: [
          {
            ...Object.assign({ ...this.base.form }),
            status: this.condition == 'app' ? 'approve' : 'reject',
          },
        ],
        special: 1
      };

      new Query(null, "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WHI/request_item`, obj, (res) => {
        if (!res.success) {
          console.error(res)
        } else {
          if (res.check) {
            let index = this.detail.rows.findIndex(
              (v) => v.code == res.rows[0].code
            );
            this.detail.rows[index] = res.rows[0]

            let data = {
              mailSubject : this.condition == 'app' ? 'แบบฟอร์มขออนุมัติเพื่อเบิกอุปกรณ์จากคลัง Indirect ได้รับการอนุมัติแล้ว' : 'แบบฟอร์มการขอเบิกอุปกรณ์จากคลัง Indirect ของคุณ ได้ถูกปฏิเสธ',
              mailFrom : 'it_manage@ubisasia.com',
              mailDesc : 'Warehouse Indirect System',
              mailTo : this.base.form.created_mail,
              // mailTo : this.user.emailTitle,
              mailCc : this.user.emailTitle,
              template : this.condition == 'app' ? 'email/whindirect/approve' : 'email/whindirect/reject',
              row : {
                name: this.base.form.created_fullname,
                title : this.base.form.doc_title,
                appr : res.rows[0].operator,
                request : this.base.form.request_at,
                rows : { ...this.detail.rows }
              }
            }
      
            new Query(null, "POST").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/GLOBAL/mail`, data, (res) => {
              if (!res.status) {
                console.error(res)
              } else {
                console.log(res)
              }
            });
          }

          this.approve.modal = false;
          this.remove.modal = false;

          if (this.condition == 'app') {
            toast.success('ท่านได้ทำการ Approve รายการดังกล่าวแล้ว')
          } else {
            toast.error('ท่านได้ทำการ Reject รายการดังกล่าวแล้ว')
          }

          vm.base_search();
          this.base_edit(this.base.current, this.base.index)
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
      new Query('detail','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WHI/request_item?doc=${this.base.form.doc}&total=1&page=${
          this.detail.page}${this.detail.row ? `&rows=${this.detail.row}` : ""}`, (res) => {
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
    confirm_process(cond, code, index, from) {
      if (from == 'table') {
        this.condition = cond;
        this.base_edit(code, index);
      } else {
        this.condition = cond
      }

      if (cond == 'app') {
        this.base.form.repurchase = 'N'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();
    });
  },
};
</script>

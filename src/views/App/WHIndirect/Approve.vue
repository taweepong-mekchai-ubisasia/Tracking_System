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
                <span class="label-text">หัวข้อเอกสารขอเบิก</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                class="input input-md input-bordered border-gray-300 shadow"
                :class="base.form.status != 'pending' ? 'bg-gray-200 text-black' : ''"
                v-model="base.form.doc_title"
                readonly
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">รายละเอียดการขอเบิก</span>
              </label>
              <textarea
                class="textarea textarea-bordered h-20 border-gray-300 shadow"
                :class="base.form.status != 'pending' ? 'bg-gray-200 text-black' : ''"
                placeholder="Description"
                v-model="base.form.description"
                readonly
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
                      <th class="text-right" v-if="base.form.status == 'pending'">
                        <label
                          for="modal-detail"
                          class="btn btn-primary modal-button btn-xs text-white"
                          @click="detail_create()"
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
                v-model="base.form.doc_status"
                :disabled="base.form.status == 'pending' ? false : true"
              >
                <option value="pending" disabled>Request</option>
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
                <option value="close" disabled>Close</option>
              </select>
            </div>
          </div>
          <hr v-if="base.form.status == 'pending'" >
          <div
            class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex"
            v-if="base.form.status == 'pending'"
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
            <div class="form-control" v-if="detail.controll == 'create'">
              <label class="label">
                <span class="label-text">Item</span>
              </label>
              <AppModuleGlobalSelectSearch
                :placeholder="'Item'"
                :label="'title'"
                :code="'code'"
                :minChar="3"
                :delay="0.5"
                :limit="10"
                :customClass="`w-full input input-bordered border-gray-300 shadow`"
                :current="detail.form.item"
                :refresh="refresh.item"
                :image="true"
                @updateValue="
                  (obj) => {
                    detail.form.item = obj ? obj.code : '';
                    detail.form.title = obj ? obj.title : '';
                    detail.form.amount = obj ? obj.amount ? obj.amount : 0 : 0;
                    detail.form.ref_code = obj ? obj.ref_code : '';
                    // detail.form.current_price = obj ? (obj.current_price ? obj.current_price : 0) : 0;
                    // base.form.item_short.code = obj.code;
                  }
                "
                @stopRefresh="
                  (obj) => {
                    refresh.item_short_code = obj.value;
                  }
                "
                :url="`${serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/item`"
                :param="`&total=1`"
              />
            </div>
            <div class="form-control" v-else>
              <label class="label">
                <span class="label-text">Item</span>
              </label>
              <input
                type="text"
                placeholder="Amount"
                class="input input-bordered border-gray-300 bg-gray-200 text-black shadow"
                v-model="detail.form.title"
                readonly
              />
            </div>
            <div class="form-control" v-if="detail.controll == 'create'">
              <label class="label">
                <span class="label-text">คงเหลือในคลัง</span>
              </label>
              <input
                type="text"
                placeholder="Amount"
                class="input input-bordered border-gray-300 bg-gray-200 shadow text-black"
                v-model="detail.form.amount"
                readonly
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">จำนวนเบิก</span>
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
            คุณแน่ใจที่จะ approve รายการนี้?
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
      <div class="gap-3 py-3">
        <div class="card shadow-lg bg-base-100">
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
              <div class="overflow-x-auto w-full max-h-[60vh] my-3">
                <div v-if="!base.loading && base.rows.length == 0">
                  <AppModuleGlobalEmptyData
                    :class="`p-4 py-12 text-3xl text-center`"
                  />
                </div>
                <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                  <thead>
                    <tr class="italic">
                      <td>Document</td>
                      <td>Doc Status</td>
                      <td>รายละเอียด</td>
                      <td>Item</td>
                      <td class="text-right">จำนวน</td>
                      <td>หน่วย</td>
                      <td class="text-center">Item Status</td>
                      <td>เปิด draft</td>
                      <td>ขอเบิก</td>
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
                              ( {{ v.doc || '-' }} )
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span 
                          class="badge badge-sm font-semibold italic px-4 py-2 w-20" 
                          :class="v.doc_status == 'close' ? 'badge-success text-base-100' : v.doc_status == 'approve' ? 'badge-info text-base-100' : v.doc_status == 'reject' ? 'badge-error text-base-100' : v.doc_status == 'pending' ? 'badge-warning text-base-100' : ''"
                          >
                            {{ v.doc_status }}
                        </span>
                      </td>
                      <td>{{ v.description }}</td>
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
                      <td class="text-right">{{ v.qty }}</td>
                      <td>{{ v.unit }}</td>
                      <td class="text-center" v-if="v.status == 'waiting'">
                        <label
                        for="modal-approve"
                          class="join-item btn btn-success btn-outline modal-button btn-xs"
                          @click="confirm_process('app', v.code, i)"
                        >
                          approve
                        </label>
                        |
                        <label
                          for="modal-remove"
                          class="join-item btn btn-error btn-outline modal-button btn-xs text-error"
                          @click="confirm_process('rej', v.code, i)"
                        >
                          reject
                        </label>
                      </td>
                      <td class="text-center" :class="v.status == 'approve' ? 'text-success font-bold' : 'text-error font-bold'" v-else>
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
                      </td>
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
                            <div class="text-xsn italic">
                              {{
                                v.request_at
                                  ? $moment(v.request_at).format("DD-MM-YYYY HH:mm:ss")
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs opacity-50" v-if="v.request_at">
                              {{ v.request_fullname }}
                            </div>
                          </div>
                        </div>
                      </td>
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
      loadimage: false,
      refresh: false,
      condition: '',
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
    change() {
      this.base_search();
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
        }api/controllers/MYSQL/INTERNAL/WHI/request_item?status=draft${dept != 'it' ? `&owner=${dept}` : ''}&total=1&page=${
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
    // base_create() {
    //   this.base.current = 0;
    //   this.base.form = {
    //     title: "",
    //     description: "",
    //   };
    //   this.detail.rows = [];
    //   this.base.controll = "create";
    // },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.base.form.newStatus = this.base.form.status;
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

      // switch(this.base.form.newStatus) {
      //   case 'approve':
      //     obj['rows'][0]['approve_at'] = this.dateNow()
      //     obj['rows'][0]['approve_by'] = this.user.code
      //     break;
      //   case 'reject':
      //     obj['rows'][0]['reject_at'] = this.dateNow()
      //     obj['rows'][0]['reject_by'] = this.user.code
      //     obj['rows'][0]['reject_reason'] = this.base.form.reject_reason
      //     break;
      // }

      new Query(null, "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WHI/request_item`, obj, (res) => {
        if (!res.success) {
          console.log(res)
        } else {
          this.approve.modal = false;
          this.remove.modal = false;
          vm.base_search();
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
      this.detail.current = 0;
      this.detail.form = {
        code: "",
        title: "",
        item: "",
        ref_code: "",
        amount: "",
        qty: "",
      };
      this.detail.controll = "create";
    },
    detail_edit(code) {
      this.detail.current = code;
      let index = this.detail.rows.findIndex(
        (v) => v.code == this.detail.current
      );
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.controll = "edit";
    },
    detail_save(type) {
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
    confirm_process(cond, code, index) {
      this.condition = cond
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();
    });
  },
};
</script>

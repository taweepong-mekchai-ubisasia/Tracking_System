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
          <div class="card-body overflow-auto" style="max-height: 62vh;">
            <div class="form-control">
              <label class="label">
                <span class="label-text">หัวข้อเอกสารขอเบิก</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                class="input input-md input-bordered border-gray-300 shadow bg-gray-200 text-black"
                v-model="base.form.title"
                readonly
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">รายละเอียดการขอเบิก</span>
              </label>
              <textarea
                class="textarea textarea-bordered h-20 border-gray-300 shadow bg-gray-200 text-black"
                placeholder="Description"
                v-model="base.form.description"
                readonly
              ></textarea>
            </div>
            <div class="form-control pt-4">
              <div role="tablist" class="tabs tabs-lifted">
                <input
                  type="radio"
                  role="tab"
                  class="tab"
                  name="Req"
                  aria-label="Item"
                  @change="setCheckbox('ItemList')"
                  :checked="tab == 'ItemList' ? true : false"
                />
                <div
                  role="tabpanel"
                  class="tab-content bg-base-100 border-base-300 overflow-auto"
                  v-if="tab == 'ItemList'"
                >
                  <div class="w-full overflow-auto min-h-[20vh] max-h-[20vh] border-2">
                    <table class="table table-xs table-pin-rows table-pin-cols table-zebra">
                      <thead>
                        <tr>
                          <td>Item Code</td>
                          <td>Item</td>
                          <td class="text-right">Issue</td>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          class="hover"
                          v-for="(v, i) in detail.rows"
                          :key="i"
                        >
                          <td>
                            {{ v.item }}
                          </td>
                          <td>
                            <div class="flex items-center space-x-3">
                              <div>
                                <div class="font-bold">{{ v.title }}</div>
                                <div class="text-sm">
                                  {{ v.ref_code }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="font-bold text-right">
                              {{ v.issue ? v.issue : 0 }} / {{ v.qty }}
                            </div>
                          </td>
                          <th
                            class="text-right"
                            v-if="
                              v.qty != v.issue &&
                              base.form.status == 'approve'
                            "
                          >
                            <label
                              for="modal-detail"
                              class="btn btn-ghost modal-button btn-xs"
                              @click="detail_edit(`${v.code}`)"
                            >
                            <span class="underline underline-offset-2">Issue</span>
                            </label>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <input
                  type="radio"
                  role="tab"
                  class="tab"
                  name="Req"
                  aria-label="Transaction"
                  @change="setCheckbox('Transaction')"
                  :checked="tab == 'Transaction' ? true : false"
                />
                <div
                  role="tabpanel"
                  class="tab-content bg-base-100 border-base-300 overflow-auto"
                  v-if="tab == 'Transaction'"
                >
                  <div
                    class="w-full overflow-auto min-h-[20vh] max-h-[20vh] border-2"
                  >
                    <table
                      class="table table-xs table-pin-rows table-pin-cols table-zebra"
                    >
                      <thead>
                        <tr>
                          <td>Item</td>
                          <td>ทำรายการเมื่อ</td>
                          <td class="text-right">จำนวน</td>
                          <th class="text-right">ลบรายการ</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          class="hover"
                          :class="v.deleted_at ? 'line-through decoration-red-500 opacity-50' : ''"
                          v-for="(v, i) in log.rows"
                          :key="i"
                        >
                          <td class="font-bold">
                            {{ v.title }}
                          </td>
                          <td>
                            <div class="italic">
                              {{
                                  v.created_at
                                  ? $moment(v.created_at).format("DD-MM-YYYY HH:mm:ss")
                                  : "-"
                              }}
                            </div>
                            <div class="opacity-50">
                              {{
                                v.created_fullname
                                  ? v.created_fullname
                                  : "-"
                              }}
                            </div>
                          </td>
                          <td class="text-right font-bold">
                            {{ v.qty }}
                          </td>
                          <td
                            class="text-right"
                            v-if="v.deleted_at"
                          >
                            <div class="italic">
                              {{
                                v.deleted_at
                                  ? $moment(v.deleted_at).format("DD-MM-YYYY HH:mm:ss")
                                  : "-"
                              }}
                            </div>
                            <div class="opacity-50" v-if="v.deleted_at">
                              {{
                                v.deleted_fullname
                                  ? v.deleted_fullname
                                  : "-"
                              }}
                            </div>
                          </td>
                          <td class="text-right" v-else>
                            <label
                              for="modal-remove"
                              class="btn modal-button btn-xs"
                              :class="base.form.status == 'close' ? 'btn-disabled' : (i % 2 == 1 ? 'btn-active' : '')"
                              @click="
                                remove_item(
                                  v,
                                  `${v.code}`,
                                  'log',
                                  'controllers/MYSQL/INTERNAL/QA/Indirect/transaction'
                                )
                              "
                              v-if="user.access.QA.QAWHIndirectIssue == 'superadmin'"
                            >
                              ลบ
                            </label>
                            <h3 class="opacity-50" v-else>superadmin<br>สามารถลบได้</h3>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr v-if="base.form.status == 'approve'" >
          <div
            class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            v-if="base.form.status == 'approve'"
          >
            <div class="flex-1 form-control mt-6">
              <label for="modal-base" class="btn">
                <Icon icon="hugeicons:cancel-circle-half-dot" width="16" height="16" />
                ปิด
              </label>
            </div>
            <div
              class="flex-1 form-control mt-6"
              @click="base_save()"
              v-if="base.form.canClose"
            >
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
          <h3 class="text-lg font-bold text-secondary">Issue Item</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 60vh;">
            <!-- <div class="form-control">
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
                :customClass="`w-full input input-bordered border-base-content `"
                :current="detail.form.item"
                :image="true"
                @updateValue="
                  (obj) => {
                    detail.form.item = obj ? obj.code : '';
                    detail.form.ref_code = obj ? obj.ref_code : '';
                    detail.form.title = obj ? obj.title : '';
                    detail.form.current_price = obj ? obj.current_price : 0;
                    detail.form.current_price_code = obj
                      ? obj.current_price_code
                      : 0;
                    detail.form.amount = obj ? obj.amount : 0;
                    // base.form.item_short.code = obj.code;
                  }
                "
                :url="`${serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/item`"
                :param="`&total=1`"
                :disabled="true"
              />
            </div> -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">Item Master</span>
              </label>
              <input
                type="text"
                placeholder="Item"
                class="input input-bordered border-gray-300 bg-gray-200 text-black"
                v-model="detail.form.title"
                readonly
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">คงเหลือในคลัง</span>
              </label>
              <input
                type="text"
                placeholder="Amount"
                class="input input-bordered border-gray-300 bg-gray-200 text-black"
                v-model="detail.form.amount"
                readonly
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">จำนวนที่ขอเบิก</span>
                </label>
                <input
                  type="number"
                  placeholder="Qty"
                  class="input input-bordered border-gray-300 bg-gray-200 text-black"
                  v-model="detail.form.qty"
                  readonly
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">จ่ายของไปแล้ว</span>
                </label>
                <input
                  type="text"
                  placeholder="Issue"
                  class="input input-bordered border-gray-300 bg-gray-200 text-black"
                  v-model="detail.form.issue"
                  readonly
                />
              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">จ่ายของเป็นจำนวน</span>
              </label>
              <input
                type="number"
                placeholder="Add"
                min="0"
                class="input input-bordered border-gray-300"
                v-model="detail.form.addqty"
              />
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
                :disabled="detail.form.addqty > 0 ? false : true"
                @click="detail_save('static')"
              >
                <Icon icon="line-md:circle-to-confirm-circle-transition" width="16" height="16" />
                ยืนยันข้อมูล
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
          <h3 class="text-lg font-bold text-error">REMOVE ITEM</h3>
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
      <div class="gap-3 lg:px-3 lg:py-3">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto">
            <div
              v-if="base.loading"
              class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
            >
              <AppModuleGlobalLoadingText
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
                <table class="table table-xs table-pin-rows table-pin-cols table-zebra">
                  <thead>
                    <tr class="italic">
                      <td class="text-right">#</td>
                      <td>Status</td>
                      <td>Doc Code</td>
                      <td>หัวข้อเอกสาร</td>
                      <td>รายละเอียด</td>
                      <td>เปิด draft</td>
                      <td>ขอเบิกเมื่อ</td>
                      <td>อนุมัติเมื่อ</td>
                      <td>ทำรายการสำเร็จเมื่อ</td>
                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in base.rows" :key="v.code" class="hover" >
                      <td class="text-right font-bold">{{ v.id }}</td>
                      <th>
                        <span 
                          class="badge badge-sm font-semibold italic px-4 py-2 w-20" 
                          :class="v.status == 'close' ? 'badge-success text-base-100' : v.status == 'approve' ? 'badge-info text-base-100' : v.status == 'reject' ? 'badge-error text-base-100' : v.status == 'request' ? 'badge-warning text-base-100' : 'badge-ghost'">
                            {{ v.status }}
                        </span>
                      </th>
                      <td>{{ v.code }}</td>
                      <td>{{ v.title }}</td>
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
                            <div class="text-xs">
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
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{
                                v.approve_at
                                  ? $moment(v.approve_at).format("DD-MM-YYYY HH:mm:ss")
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs opacity-50" v-if="v.approve_at">
                              {{ v.approver_fullname }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
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
                          class="join-item btn btn-ghost modal-button btn-xs text-primary hover:text-black"
                          @click="base_edit(`${v.code}`, `${i}`)"
                        >
                          <span class="underline underline-offset-2">
                            รายละเอียด
                          </span>
                        </label>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="grid gap-3 grid-cols-2">
                <div class="flex justify-start items-center text-sm">
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
import Query from "@/assets/js/fetch.js";

export default {
  name: "IndirectIssue",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
  },
  data() {
    return {
      tab: "ItemList",
      loadimage: false,
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
      log: {
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
    setCheckbox(tab) {
      this.tab = tab;
    },
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
        this.base.rows = res.rows;
        this.base.total = res.total;
        this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
        this.base.back = this.base.page > 1 ? true : false;
        this.base.loading = false;
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/request?total=1&approve=1&page=${
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
      this.tab = "ItemList"

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
            status: "close",
            close_at: this.dateNow(),
            close_by: this.user.code,
          },
        ],
      };

      new Query(null, "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/request`, obj, (res) => {
        if (!res.success) {
          console.log(res)
        } else {
          this.base.modal = false;
          vm.base_search();

          // const promise_arr = [];
          // console.log(this.base.current);
          // if (this.base.current == 0) {
          //   this.base.current = res.row.code;
          //   let i = this.detail.rows.length;
          //   this.detail.controll = "create";
          //   for (i; i > 0; i--) {
          //     // this.detail.form = {
          //     //   code: this.detail.rows[i - 1]["code"],
          //     //   title: this.detail.rows[i - 1]["title"],
          //     // };
          //     promise_arr.push(
          //       new Promise(async function (resolve, reject) {
          //         let res = await vm.detail_save("dynamic");
          //         await resolve(res);
          //         return;
          //       })
          //     );
          //   }
          // }

          // Promise.all(promise_arr)
          //   .then((res) => {
          //     // console.log(res);
          //     vm.base_search();
          //   })
          //   .catch((err) => console.error(err));
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
        this.detail.rows.forEach((v, i) => {
          issue = issue + (v.issue ? v.issue : 0);
          req = req + (v.qty ? v.qty : 0);
        });
        this.base.form.canClose = req - issue == 0 ? true : false;
      });
    },
    detail_get(callback) {
      new Query('detail','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/request_item?total=1&page=${
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
      this.detail.current = 0;
      this.detail.form = {
        code: "",
        addqty: 0,
      };
      this.detail.controll = "create";
    },
    detail_edit(code) {
      this.detail.current = code;
      let index = this.detail.rows.findIndex(
        (v) => v.code == this.detail.current
      );
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.form.addqty = 0;
      this.detail.controll = "edit";
    },
    detail_save(type) {
      this.detail.controll = "create";
      let obj = {
        code: this.detail.current,
        rows: [
          {
            ...Object.assign({ ...this.detail.form }),
            doc: this.base.current,
            qty: this.detail.form.addqty,
            price: this.detail.form.current_price_code,
            status: "export",
            comments: this.base.form.description,
          },
        ],
      };

      new Query(null, this.detail.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction`, obj, (res) => {
        if (!res.success) {
          console.log(res)
        } else {
          this.detail.modal = false;

          if (type == "static") {
            this.detail_search();
          }
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
    // Log
    log_search() {
      this.log.loading = true;
      this.log_get((res) => {
        this.log.rows = res.rows;
        this.log.total = res.total;
        this.log.next =
          this.log.page * this.log.row >= this.log.total ? false : true;
        this.log.back = this.log.page > 1 ? true : false;
        this.log.loading = false;
      });
    },
    log_get(callback) {
      new Query('log','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction?total=1&action=all&page=${
          this.log.page
        }${this.log.row ? `&rows=${this.log.row}` : ""}${
          this.log.q ? `&q=${this.log.q}` : ""
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
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();
    });
  },
  watch: {
    "detail.form.addqty": function (v) {
      // console.log(this.detail.form)
      let issue = this.detail.form.issue ? this.detail.form.issue : 0;
      let issuemore = this.detail.form.qty - issue;
      if (this.detail.form.addqty > issuemore) {
        return (this.detail.form.addqty = issuemore);
      } else if (this.detail.form.addqty > this.detail.form.amount) {
        return (this.detail.form.addqty = this.detail.form.amount);
      }
    },
    tab: function (v) {
      if (v == "Transaction") {
        this.log_search();
      } else {
        this.detail_search();
      }
    },
  },
};
</script>

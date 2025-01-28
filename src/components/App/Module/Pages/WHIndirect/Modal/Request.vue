<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.form.modal" />
    <div class="modal z-40">
      <div class="modal-box relative max-w-2xl p-2 lg:p-4 max-h-screen">
        <button
          @click="base.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">
          Request Document
        </h3>
        <div class="divider my-1"></div>

        <div class="card-body overflow-auto max-h-[78vh] p-2 lg:p-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text text-xs sm:text-sm md:text-md"
                >หัวข้อเอกสารขอเบิก</span
              ><span class="text-xs text-error">{{ msg.title }}</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              class="input input-xs sm:input-sm input-bordered border-gray-400 shadow"
              :class="
                base.form.object.status != 'request'
                  ? 'bg-gray-200 text-black'
                  : ''
              "
              v-model="base.form.object.title"
              :readonly="base.form.object.status == 'request' ? false : true"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-xs sm:text-sm md:text-md"
                >รายละเอียดการขอเบิก</span
              ><span class="text-xs text-error">{{ msg.descr }}</span>
            </label>
            <textarea
              class="textarea textarea-bordered border-gray-400 shadow"
              :class="
                base.form.object.status != 'request'
                  ? 'bg-gray-200 text-black'
                  : ''
              "
              rows="2"
              placeholder="Description"
              v-model="base.form.object.description"
              :readonly="base.form.object.status == 'request' ? false : true"
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md"
                  >วันที่ต้องการของ</span
                >
              </label>
              <!-- <input
                type="date"
                placeholder="DD-MM-YYYY"
                class="input input-xs sm:input-sm input-bordered border-gray-400 shadow"
                :class="
                  base.form.object.status != 'request'
                    ? 'bg-gray-200 text-black'
                    : ''
                "
                v-model="base.form.object.request_at"
                :readonly="base.form.object.status == 'request' ? false : true"
              /> -->
              <VueDatePicker 
                v-if="base.form.object.status == 'request'"
                v-model="base.form.object.request_at" 
                :format="format" 
                :enable-time-picker="false"
              ></VueDatePicker>
              <input
                v-else
                type="text"
                placeholder="DD-MM-YYYY"
                class="input input-xs sm:input-sm input-bordered border-gray-400 shadow bg-gray-200 text-black"
                :value="$moment(base.form.object.request_at).format('DD-MM-YYYY')"
                readonly
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md"
                  >เบิกจากคลัง</span
                >
              </label>
              <select
                v-if="props.from == 'request'"
                class="select select-sm select-bordered border-gray-400 w-full shadow disabled:bg-gray-200 disabled:text-black disabled:font-semibold disabled:border-gray-400"
                v-model="base.form.object.request_wh"
                :disabled="detail.data.rows.length ? true : false"
              >
                <option value="" disabled>-เลือกคลัง-</option>
                <option v-for="v in base.dept" :value="v.wh">
                  {{ v.wh_title }}
                </option>
              </select>
              <input
                v-else
                type="text"
                placeholder="Title"
                class="input input-xs sm:input-sm input-bordered border-gray-400 shadow"
                :class="'bg-gray-200 text-black'"
                v-model="base.form.object.wh_title"
                readonly
              />
            </div>
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
                :checked="tabs == 'ItemList' ? true : false"
              />
              <div
                role="tabpanel"
                class="tab-content bg-base-100 border-base-300 overflow-auto"
                v-if="tabs == 'ItemList'"
              >
                <div
                  class="w-full overflow-auto min-h-[20vh] max-h-[20vh] border-2"
                >
                  <table
                    class="table table-xs table-pin-rows table-pin-cols table-zebra"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>สถานะ</th>
                        <th class="text-right">จำนวน</th>
                        <th
                          class="text-right"
                          v-if="base.form.object.status == 'request'"
                        >
                          <label
                            for="modal-detail"
                            class="btn btn-xs btn-primary  text-white"
                            :class="
                              base.form.object.request_wh == ''
                                ? 'btn-disabled'
                                : ''
                            "
                            @click="$refs.baseModal.fnBase.create"
                          >
                            <Icon icon="subway:add" width="12" height="12" />
                            Add
                          </label>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(v, i) in detail.data.rows" :key="i">
                        <th>{{ i + 1 }}</th>
                        <td class="font-semibold" v-if="v.title.length > 50">
                          {{ v.title.slice(0, 50) }} <br />
                          {{ v.title.slice(50, v.title.length) }}
                        </td>
                        <td class="font-semibold" v-else>
                          {{ v.title }}
                        </td>
                        <td
                          class="font-semibold"
                          :class="
                            v.status == 'approve'
                              ? 'text-success'
                              : v.status == 'reject'
                              ? 'text-error'
                              : 'opacity-70'
                          "
                        >
                          {{ v.status }}
                        </td>
                        <td class="text-right">
                          <div class="font-bold" v-if="v.status != 'approve'">
                            {{ v.qty }}
                          </div>
                          <div class="font-bold" v-else>
                            {{ v.issue ? v.issue : 0 }} / {{ v.qty }}
                          </div>
                        </td>
                        <th
                          class="text-right"
                          v-if="
                            base.form.object.newStatus == 'request' &&
                            v.status == 'waiting'
                          "
                        >
                          <label
                            class="btn btn-ghost  btn-xs"
                            @click="$refs.baseModal.fnBase.edit(v)"
                          >
                            <span class="underline underline-offset-2">แก้ไข</span>
                          </label>
                          <label
                            class="btn btn-ghost  btn-xs"
                            @click="
                              base.form.method == 'POST'
                              ? detail.data.rows = detail.data.rows.filter(x => x.code != v.code)
                              : fnRemove.item(
                                `${v.code}`,
                                null,
                                'api/controllers/MYSQL/INTERNAL/WHI/request_item'
                              )
                            "
                          >
                            ลบ
                          </label>
                        </th>
                        <th
                          class="text-right"
                          v-if="
                            props.from == 'issue' &&
                            v.qty != v.issue &&
                            v.status == 'approve'
                          "
                        >
                          <label
                            class="btn btn-ghost  btn-xs"
                            @click="$refs.issueModal.fnBase.edit(`${v.doc}`, `${i}`)"
                          >
                          <span class="underline underline-offset-2">Issue</span>
                          </label>
                        </th>
                        <th v-else></th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <input
                v-if="props.from == 'issue'"
                type="radio"
                role="tab"
                class="tab"
                name="Req"
                aria-label="Transaction"
                @change="setCheckbox('Transaction')"
                :checked="tabs == 'Transaction' ? true : false"
              />
              <div
                role="tabpanel"
                class="tab-content bg-base-100 border-base-300 overflow-auto"
                v-if="tabs == 'Transaction'"
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
                        <th class="text-right" v-if="base.form.object.doc_status == 'approve'">ลบรายการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="hover"
                        :class="v.deleted_at ? 'line-through decoration-red-500 opacity-50' : ''"
                        v-for="(v, i) in log.data.rows"
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
                          v-if="base.form.object.doc_status == 'approve'"
                        >
                          <div v-if="v.deleted_at">
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
                          </div>
                          <div v-else>
                            <label
                              class="btn  btn-xs"
                              :class="base.form.object.status == 'close' ? 'btn-disabled' : (i % 2 == 1 ? 'btn-active' : '')"
                              @click="
                                fnRemove.item(
                                  `${v.code}`,
                                  `${v.item}`,
                                  'api/controllers/MYSQL/INTERNAL/WHI/transaction'
                                )
                              "
                              v-if="base.permission == 'superadmin'"
                            >
                              ลบ
                            </label>
                            <h3 class="opacity-50" v-else>superadmin<br>สามารถลบได้</h3>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md"
                  >ผู้ทำรายการ</span
                >
              </label>
              <input
                type="text"
                placeholder="ผู้ทำรายการ"
                class="input input-xs sm:input-sm input-bordered border-gray-400 shadow bg-gray-200 text-black"
                v-model="base.form.object.created_by"
                readonly
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md"
                  >Status</span
                >
              </label>
              <select
                v-if="props.from == 'request'"
                class="select select-xs sm:select-sm select-bordered border-gray-400 w-full shadow disabled:bg-gray-200 disabled:text-black disabled:font-semibold disabled:border-gray-400"
                v-model="base.form.object.newStatus"
                :disabled="base.form.object.status == 'request' ? false : true"
              >
                <option value="request">Request</option>
                <option value="reject" disabled>Reject</option>
                <option value="approve" disabled>Approve</option>
                <option
                  value="close"
                  :disabled="
                    base.form.status == 'approve' && base.form.canClose
                      ? false
                      : true
                  "
                >
                  Close
                </option>
              </select>
              <input
                v-else
                type="text"
                placeholder="Title"
                class="input input-xs sm:input-sm input-bordered border-gray-400 shadow"
                :class="'bg-gray-200 text-black'"
                v-model="base.form.object.doc_status"
                readonly
              />
            </div>
          </div>
        </div>
        <div
          class="backdrop-blur sticky top-0 items-center lg:gap-4 gap-2 px-0 flex"
          v-if="base.form.object.status == 'request'"
        >
          <div class="flex-1 form-control">
            <button
              @click="base.form.modal = false"
              class="btn btn-xs sm:btn-sm md:btn-md"
              :disabled="base.form.loading"
            >
              <Icon
                icon="hugeicons:cancel-circle-half-dot"
                width="16"
                height="16"
              />
              ปิด
            </button>
          </div>
          <div class="flex-1 form-control" @click="fnBase.save()">
            <button
              class="btn btn-primary text-white btn-xs sm:btn-sm md:btn-md"
              :disabled="base.form.loading"
            >
              <Icon
                icon="line-md:circle-to-confirm-circle-transition"
                width="16"
                height="16"
              />
              บันทึกรายการ
            </button>
          </div>
        </div>
      </div>
    </div>

		<AppModuleGlobalRemove
			v-model="remove"
			@update:success="fnRemove.success"
			ref="removeModal"
		/>
    <AppModulePagesWHIndirectModalCatalogItem
      v-model="detail.data"
      @update:success="fnDetail.save"
      ref="baseModal"
    />
    <AppModulePagesWHIndirectModalIssue
      v-model="detail.data"
      @update:success="fnDetail.success"
      ref="issueModal"
    />
  </teleport>
</template>

<style>
.dp__pointer {
  height: 32px !important;
  font-size: 14px !important;
  border-radius: 8px !important;
  /* border-color: gray !important; */
}
</style>

<script>
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModulePagesWHIndirectModalCatalogItem from "@/components/App/Module/Pages/WHIndirect/Modal/CatalogItem";
import AppModulePagesWHIndirectModalIssue from "@/components/App/Module/Pages/WHIndirect/Modal/Issue";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";
import moment from "moment";

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import {
  defineAsyncComponent,
  shallowRef,
  computed,
  defineComponent,
  ref,
  watch,
  getCurrentInstance,
} from "vue";

export default defineComponent({
  inheritAttrs: false,
  name: "Request",
  components: {
    AppModuleGlobalUpload,
    AppModulePagesWHIndirectModalCatalogItem,
    AppModulePagesWHIndirectModalIssue,
		AppModuleGlobalRemove,
    VueDatePicker
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    createValue: {
      type: String,
      required: "",
    },
    from: {
      type: String,
      default: "request"
    }
  },
  emits: ["update:modelValue", "update:success"],
  created: function () {
    this.moment = moment;
  },
  setup(props, { emit }) {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const format = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    }

    const msg = ref({
      title: "",
      descr: "",
      item: "",
      qty: "",
    });

    const detail = ref({
      pagination: {
        page: 1,
        row: 20,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
				wh: "",
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            title: "",
          },
        },
      },
    });

    const log = ref({
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
            title: "",
          },
        },
      },
    });

		const remove = ref({
      current: 0,
      model: false,
      path: "",
      loading: false,
    });

    const fnBase = {
      create: () => {
        msg.value.title = "";
        msg.value.descr = "";

        base.value.form.current = 0;
        base.value.form.object = {
          title: "",
          description: "",
          request_at: moment().format("YYYY-MM-DD"),
          request_wh: base.value.dept
            ? base.value.dept.find((x) => x.dept == user.value.department)
              ? base.value.dept.find((x) => x.dept == user.value.department).wh
              : ""
            : "",
          status: "request",
          newStatus: "request",
          created_by: user.value.firstname + " " + user.value.lastname,
        };
        base.value.form.method = "POST";
        detail.value.data.rows = [];

        base.value.form.modal = true;
      },
      edit: async (code, index) => {
        tabs.value = 'ItemList'

        msg.value.title = "";
        msg.value.descr = "";

        base.value.form.current = code;
        base.value.form.object = { ...base.value.rows[index] };
        base.value.form.object.request_at = moment(
          base.value.form.object.request_at
        ).format("YYYY-MM-DD");

        base.value.form.object.created_by =
          base.value.form.object.created_fullname;
        base.value.form.object.newStatus = base.value.form.object.status;

        base.value.form.method = "PUT";
        detail.value.data.rows = [];

        await fnDetail.search();

				base.value.form.modal = true;
      },
      save: async () => {
        if (base.value.form.loading) return;
        if (
          !base.value.form.object.title ||
          !base.value.form.object.description
        ) {
          if (!base.value.form.object.title) msg.value.title = "*กรอกข้อมูล*";
          else msg.value.title = "";
          if (!base.value.form.object.description)
            msg.value.descr = "*กรอกข้อมูล*";
          else msg.value.descr = "";
          return;
        } else {
          msg.value.title = "";
          msg.value.descr = "";
        }

        base.value.form.loading = true;
        try {
          base.value.form.object.request_at = moment(base.value.form.object.request_at).format('YYYY-MM-DD')

          const queryBody = {
            code: base.value.form.current,
            rows: [
              {
                ...Object.assign({ ...base.value.form.object }),
                status: base.value.form.object.newStatus,
              },
            ],
          };

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/WHI/request"
          );
          const method = base.value.form.method || "POST";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
          }

          const promise_arr = [];
          if (base.value.form.current == 0) {
            base.value.form.current = res.rows[0].code;
            let i = detail.value.data.rows.length;
            detail.value.data.form.method = "POST";
            for (i; i > 0; i--) {
              detail.value.data.form.object = {
                ...detail.value.data.rows[i - 1],
              };
              promise_arr.push(
                new Promise(async function (resolve, reject) {
                  let res = await fnDetail.save();
                  await resolve(res);
                  return;
                })
              );
            }
          }

          Promise.all(promise_arr)
            .then((res) => {
              if (base.value.form.method == "POST") {
                let mail = base.value.dept
                  .find((x) => x.wh == base.value.form.object.request_wh)
                  .approver.replaceAll("'", "");
                mail = mail.split(",");

                let mail_obj = [];
                for (let i = 0; i < mail.length; i++) {
                  mail_obj[i] = {
                    email: mail[i],
                  };
                }

                const queryBody = {
                  mailSubject:
                    "แบบฟอร์มขออนุมัติเพื่อเบิกอุปกรณ์จากคลัง Indirect",
                  mailFrom: "it_manage@ubisasia.com",
                  mailDesc: "Warehouse Indirect System",
                  mailToList: mail_obj,
                  // mailTo : user.value.emailTitle,
                  mailCc: user.value.emailTitle,
                  template: "email/whindirect/request",
                  row: {
                    title: base.value.form.object.title,
                    desc: base.value.form.object.description,
                    wh: base.value.dept.find(
                      (x) => x.wh == base.value.form.object.request_wh
                    ).wh_title,
                    name: base.value.form.object.created_by,
                    request: base.value.form.object.request_at,
                    rows: { ...detail.value.data.rows },
                  },
                };

                const path = buildPath(
                  null,
                  "api/controllers/MYSQL/INTERNAL/GLOBAL/mail"
                );
                const method = base.value.form.method || "POST";
                const res = fetchQuery({}, method, path, queryBody);
              }
            })
            .catch((err) => console.error(err));
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          base.value.form.modal = false;
          base.value.form.loading = false;
          emit("update:success", null);
        }
      },
    };

    const fnDetail = {
      search: async () => {
        try {
          detail.value.data.form.loading = true;
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
            doc: base.value.form.current ? base.value.form.current : null,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/WHI/request_item"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            detail.value.data.rows = res.rows;
            detail.value.pagination.total = res.total;
            detail.value.pagination.next =
              detail.value.pagination.page * detail.value.pagination.row <
              detail.value.pagination.total;
            detail.value.pagination.back = detail.value.pagination.page > 1;
          } else {
            console.error("Error fetching Detail:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          detail.value.pagination.loading = false;
        }
      },
      save: async (row = null) => {
        try {
          if (!base.value.form.current) {
            console.log(base.value.form.current)
						detail.value.data.form.object = row.data.form.object;
						detail.value.data.form.method = row.data.form.method;

            console.log(detail.value.data.form.object)
            console.log(detail.value.data.form.method)
            if (detail.value.data.form.method == "POST") {
              detail.value.data.form.object.code =
                detail.value.data.rows.length;
              detail.value.data.rows = [{ ...detail.value.data.form.object }].concat(
                detail.value.data.rows
              );
            } else {
              let index = detail.value.data.rows.findIndex(
                (v) => v.code == detail.value.data.form.object.code
              );
              detail.value.data.rows[index] = detail.value.data.form.object;
            }
          } else {
            if (row) {
              detail.value.data.form.current = row.data.form.current;
              detail.value.data.form.object = row.data.form.object;
            }

            const queryBody = {
              code: detail.value.data.form.current,
              rows: [{ ...detail.value.data.form.object }],
            };

            queryBody["rows"][0]["doc"] = base.value.form.current;
            queryBody["rows"][0]["status"] = "waiting";

            const path = buildPath(
              null,
              "api/controllers/MYSQL/INTERNAL/WHI/request_item"
            );
            const method = row?.data?.form?.method || "POST";
            const res = await fetchQuery({}, method, path, queryBody);

            if (!res.success) {
              console.error("Failed to save data");
              return;
            }

            fnDetail.search();
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
        }
      },
      success: () => {
        fnDetail.search();
      },
    };

    const fnLog = {
      search: async () => {
        try {
          log.value.data.form.loading = true;
          log.value.pagination.page = 1;
          await fnLog.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (log.value.pagination.loading) return;
        log.value.pagination.loading = true;
        try {
          const queryParams = {
            page: log.value.pagination.page,
            row: log.value.pagination.row,
            doc: base.value.form.object.doc,
            action: 'all',
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/WHI/transaction"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            log.value.data.rows = res.rows;
            log.value.pagination.total = res.total;
            log.value.pagination.next =
              log.value.pagination.page * log.value.pagination.row <
              log.value.pagination.total;
            log.value.pagination.back = log.value.pagination.page > 1;
          } else {
            console.error("Error fetching Detail:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          log.value.pagination.loading = false;
        }
      },
    }

		const fnRemove = {
      item: (code, item, path) => {
        remove.value.modal = true;
        remove.value.code = code;
        remove.value.item = item;
        remove.value.path = path;
      },
      success: () => {
        tabs.value == 'ItemList' ? fnDetail.search() : fnLog.search();
      },
    };

    const tabs = ref("ItemList")
    const setCheckbox = (tab) => {
      tabs.value = tab;
    }

    const baseModal = ref(null);
    const issueModal = ref(null);

    return { 
      base,
      fnBase,
      detail,
      fnDetail,
      remove,
      fnRemove,
      log,
      fnLog,
      baseModal,
      issueModal,
      msg,
      props,
      tabs,
      setCheckbox,
      format
    };
  },
	watch: {
		"base.form.object.request_wh": function (val) {
			if (val) {
				this.detail.data.wh = this.base.form.object.request_wh
			}
		},
    tabs: function (v) {
      if (v == "Transaction") {
        this.log.data.rows = [];
        this.fnLog.search();
      } else {
        this.detail.data.rows = [];
        this.fnDetail.search();
      }
    },
	}
});
</script>

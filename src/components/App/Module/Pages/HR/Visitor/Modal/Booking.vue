<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.form.modal" />
    <div class="modal z-40" v-if="base.form.modal">
      <div class="modal-box relative w-11/12 max-w-4xl p-2 lg:p-4 max-h-screen">
        <button
          @click="base.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">BOOKING</h3>
        <div class="divider my-1"></div>
        <div class="p-2 md:p-3 lg:p-4 overflow-auto w-full max-h-[62vh]">
          <!-- <div class="form-control">
            <label class="label">
              <span class="label-text text-xs sm:text-sm md:text-md"
                >Title</span
              >
            </label>
            <input
              type="text"
              placeholder="Title ( example : Factory Visit Seminar )"
              class="input input-xs sm:input-sm md:input-md input-bordered border-base-content"
              v-model="base.form.object.title"
            />
          </div> -->
          <div class="form-control">
            <AppModuleGlobalCombobox
              :url="`api/controllers/MYSQL/INTERNAL/HR/visitor/visitor_title`"
              :label="'Title'"
              :selectMode="'single'"
              :image="false"
              :fieldDisplay="'name'"
              :imagePath="'Visitor'"
              :lastDisplay="base.form.object.titleName"
              :lastFile="''"
              :component="'App/Module/Pages/HR/Visitor/Modal/Title'"
              :objectData="['code', 'name']"
              v-model="base.form.object.title"
            />
          </div>
          <div class="form-control">
            <AppModuleGlobalCombobox
              :url="`api/controllers/MYSQL/INTERNAL/HR/visitor/visitor_member`"
              :label="'Visitor'"
              :selectMode="'single'"
              :image="false"
              :fieldDisplay="'name'"
              :imagePath="'Visitor'"
              :lastDisplay="base.form.object.visitorTitle"
              :lastFile="''"
              :component="'App/Module/Pages/HR/Visitor/Modal/Visitor'"
              :objectData="['code', 'name']"
              v-model="base.form.object.visitor"
            />
          </div>
          <div class="form-control border-2 border-dashed pb-3 px-2 mt-3 rounded-lg" v-if="base.form.object.visitor.length">
            <div class="w-full overflow-auto">
              <label class="label cursor-pointer">
                <span class="label-text text-xs font-semibold">ข้อมูล Visitor</span>
              </label>
              <table
                class="table table-xs table-pin-rows table-pin-cols"
                :class="!removing ? 'table-zebra' : ''"
              >
                <thead>
                  <tr>
                    <th v-if="removing">
                      <input
                        type="checkbox"
                        class="checkbox checkbox-sm"
                        id="my-checkbox"
                        ref="removeingList"
                        @click="
                          () => {
                            $refs.removeingList.indeterminate = false;
                            if ($refs.removeingList.checked) {
                              detail.data.rows = detail.data.rows.map((v) => {
                                v.remove = true;
                                return v;
                              });
                            } else {
                              detail.data.rows = detail.data.rows.map((v) => {
                                v.remove = false;
                                return v;
                              });
                            }
                          }
                        "
                      />
                    </th>
                    <th>#</th>
                    <td>ชื่อ</td>
                    <th class="text-right">
                      <div v-if="!removing">
                        <button
                          class="btn btn-xs btn-primary text-white mr-1"
                          :class="base.form.method != 'POST' ? 'mr-1' : ''"
                          @click="fnDetail.addRow()"
                        >
                          <Icon icon="el:file-new" />
                        </button>
                        <button
                          v-if="base.form.method != 'POST'"
                          class="btn btn-xs btn-error text-white"
                          @click="removing = true"
                        >
                          <Icon icon="icomoon-free:bin" />
                        </button>
                      </div>
                      <div v-else>
                        <label
                          for="modal-remove"
                          class="btn btn-xs btn-error text-white mr-1"
                          @click="
                            fnRemove.allSelected(
                              'api/controllers/MYSQL/INTERNAL/HR/visitor/visitor_item_unit'
                            )
                          "
                        >
                          <Icon icon="ic:outline-check" />
                        </label>
                        <button
                          class="btn btn-xs btn-warning btn-primary text-white mr-1"
                          @click="
                            () => {
                              removing = false;
                              detail.data.rows.map(
                                (v) => (v['remove'] = false)
                              );
                            }
                          "
                        >
                          <Icon icon="ic:twotone-close" />
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="hover"
                    v-for="(v, i) in detail.data.rows"
                    :key="i"
                    :class="`${v.removed ? 'disabled' : ''}`"
                  >
                    <th v-if="removing">
                      <div class="flex items-center space-x-3">
                        <input
                          v-if="!v.removed"
                          type="checkbox"
                          class="checkbox checkbox-sm"
                          :checked="v.remove"
                          @click="
                            () => {
                              v.remove = !v.remove;
                              let no_removed = detail.data.rows.filter(
                                (v) => !v.removed
                              );
                              let remove = detail.data.rows.filter(
                                (v) => v.remove
                              );
                              if (remove.length == 0) {
                                $refs.removeingList.checked = false;
                                $refs.removeingList.indeterminate = false;
                              } else if (remove.length == no_removed.length) {
                                $refs.removeingList.checked = true;
                                $refs.removeingList.indeterminate = false;
                              } else {
                                $refs.removeingList.checked = false;
                                $refs.removeingList.indeterminate = true;
                              }
                            }
                          "
                        />
                      </div>
                    </th>
                    <th>
                      <div class="text-sm" v-if="!v.new">
                        <span
                          class="badge badge-sm"
                          :class="
                            v.edit
                              ? `badge-warning text-white`
                              : 'badge-outline'
                          "
                          >{{ v.code ? v.code : "-" }}</span
                        >
                      </div>
                      <span
                        v-else
                      >
                        <span class="badge badge-xs badge-primary text-white items-center"
                          >NEW</span
                        >
                      </span>
                    </th>
                    <td>
                      <input
                        class="input input-xs input-bordered border-base-content join-item w-full"
                        placeholder="ระบุชื่อของ Visitor ..."
                        v-model="v.name"
                        @keyup="
                          () => {
                            v.new ? '' : (v.edit = true);
                          }
                        "
                        :disabled="removing"
                      />
                    </td>
                    <th class="text-right">
                      <label
                        v-if="!removing && v.id"
                        for="modal-remove"
                        class="btn btn-link no-underline text-error modal-button btn-xs"
                        @click="
                          fnRemove.item(
                            `${v.code}`,
                            'api/controllers/MYSQL/INTERNAL/HR/visitor/visitor_item_unit'
                          )
                        "
                      >
                        Remove
                      </label>
                      <button
                        v-if="!removing && !v.id"
                        class="btn btn-link no-underline text-error modal-button btn-xs"
                        @click="detail.data.rows.splice(i, 1)"
                      >
                        Drop
                      </button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="form-control">
            <AppModuleGlobalCombobox
              :url="`api/controllers/MYSQL/INTERNAL/HR/email`"
              :label="'Email'"
              :selectMode="'multi'"
              :image="false"
              :fieldDisplay="'email'"
              :imagePath="'Visitor'"
              v-model="base.form.object.email"
              :lastFile="''"
              :component="null"
              :objectData="['code', 'email']"
              :param="[
                {
                  ubis: true,
                }
              ]"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-xs sm:text-sm md:text-md">
                Description
              </span>
              <span class="text-xs text-error">{{ msg.desc }}</span>
            </label>
            <textarea
              class="textarea textarea-xs md:textarea-sm md:textarea-md textarea-bordered border-base-content h-24"
              placeholder="Description"
              v-model="base.form.object.description"
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md">
                  ห้องประชุม
                </span>
              </label>
              <select 
                class="select select-bordered w-full border-base-content"
                v-model="base.form.object.meeting_room"
                >
                <option value="" disabled selected>-เลือก-</option>
                <option value="INNOVATION">INNOVATION</option>
                <option value="PRECISION">PRECISION</option>
                <option value="COOPERATION">COOPERATION</option>
                <option value="ท่าทราย">ท่าทราย</option>
                <option value="บ้านแพ้ว 1">บ้านแพ้ว 1</option>
                <option value="บ้านแพ้ว 2">บ้านแพ้ว 2</option>
                <option value="มหาชัย">มหาชัย</option>
              </select>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">จำนวนรถที่เข้ามา</span>
              </label>
              <input
                type="number"
                placeholder="ระบุจำนวนรถที่เข้ามา ..."
                class="input input-bordered border-base-content input-xs sm:input-sm md:input-md"
                v-model="base.form.object.car"
                min="0"
              />
            </div>
          </div>
          <div class="form-control border-2 border-dashed pb-3 px-2 mt-3 rounded-lg" v-if="base.form.object.car && base.form.object.car_detail.length">
            <div class="w-full overflow-auto">
              <label class="label cursor-pointer">
                <span class="label-text text-xs font-semibold">ข้อมูลรถ</span>
              </label>
              <table
                class="table table-xs table-pin-rows table-pin-cols"
                :class="!removing ? 'table-zebra' : ''"
              >
                <thead>
                  <tr>
                    <td>ยี่ห้อ</td>
                    <td>รุ่น</td>
                    <td>สี</td>
                    <td>ทะเบียนรถ</td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="hover"
                    v-for="i in base.form.object.car"
                    :key="i"
                  >
                    <td>
                      <input
                        type="text"
                        class="input input-xs input-bordered border-base-content join-item w-full"
                        placeholder="ระบุยี่ห้อรถ ..."
                        v-model="base.form.object.car_detail[i-1]['manu']"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="input input-xs input-bordered border-base-content join-item w-full"
                        placeholder="ระบุรุ่นรถ ..."
                        v-model="base.form.object.car_detail[i-1]['model']"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="input input-xs input-bordered border-base-content join-item w-full"
                        placeholder="ระบุสีรถ ..."
                        v-model="base.form.object.car_detail[i-1]['color']"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        class="input input-xs input-bordered border-base-content join-item w-full"
                        placeholder="ระบุป้ายทะเบียนรถ ..."
                        v-model="base.form.object.car_detail[i-1]['regis']"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- {{ base.form.object.item }} -->
          <AppModuleGlobalChecklist
            v-model="base.form.object.item"
            :url="`api/controllers/MYSQL/INTERNAL/HR/visitor/visitor_item_unit`"
            :title="'Item Lists'"
            :component="'App/Module/Pages/HR/Visitor/Modal/Item'"
            :fields="[
              { type: 'label', id: 'name' },
              { type: 'number', id: 'qty', placeholder: 'qty' },
              { type: 'text', id: 'remark', placeholder: 'remark' },
              { type: 'label', id: 'unit_name' },
              { type: 'label', id: 'department' },
              { type: 'label', id: 'groupMail' },
            ]"
          />
          <div class="grid md:grid-cols-3 grid-cols-1 gap-1 sm:gap-2 md:gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Desired date</span>
              </label>
              <input
                type="date"
                placeholder="Desired date"
                class="input input-bordered border-base-content input-xs sm:input-sm md:input-md"
                v-model="base.form.object.desired_date"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Desired time</span>
              </label>
              <input
                type="time"
                placeholder="Desired time"
                class="input input-bordered border-base-content input-xs sm:input-sm md:input-md"
                v-model="base.form.object.desired_time"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Reminder before ( Days )</span>
              </label>
              <input
                type="number"
                placeholder="ต้องการให้แจ้งเตือนก่อนกำหนดกี่วัน"
                class="input input-bordered border-base-content input-xs sm:input-sm md:input-md"
                v-model="base.form.object.reminder_before"
              />
            </div>
          </div>
        </div>
        <div class="backdrop-blur sticky top-0 items-center gap-3 px-0 flex">
          <div class="flex-1 form-control mt-6">
            <label
              @click="base.form.modal = false"
              class="btn btn-xs sm:btn-sm md:btn-md"
              >Cancel</label
            >
          </div>
          <div class="flex-1 form-control mt-6">
            <button
              class="btn btn-primary text-white btn-xs sm:btn-sm md:btn-md"
              :disabled="base.form.loading"
              @click="fnBase.save()"
            >
              Confirm
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
  </teleport>
</template>
<script>
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";

import {
  defineAsyncComponent,
  shallowRef,
  computed,
  defineComponent,
  ref,
  watch,
  getCurrentInstance,
} from "vue";

import AppModuleGlobalCombobox from "@/components/App/Module/Global/Combobox.vue";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";
import AppModuleGlobalChecklist from "@/components/App/Module/Global/Checklist.vue";
export default defineComponent({
  name: "Item",
  components: {
    AppModuleGlobalCombobox,
    AppModuleGlobalRemove,
    AppModuleGlobalChecklist,
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
  },
  emits: ["update:modelValue", "update:success"],
  setup(props, { emit }) {
    const { appContext } = getCurrentInstance();
    const moment = appContext.config.globalProperties.$moment;

    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
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
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            title: "",
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

    const remove = ref({
      current: 0,
      model: false,
      path: "",
      loading: false,
    });

    const removing = ref(false);

    const msg = ref({
      desc: ''
    })

    const fnBase = {
      create: () => {
        removing.value = false;
        msg.value.desc = ''

        base.value.form.current = 0;
        base.value.form.object = {
          code: "",
          name: "",
          visitor: [],
          email: [],
          meeting_room: '',
          car: 0,
          car_detail: []
        };
        base.value.form.method = "POST";
        base.value.form.modal = true;

        detail.value.data.rows = [];
      },
      edit: (code, index) => {
        removing.value = false;
        msg.value.desc = ''
        base.value.form.temp = {};
        base.value.form.temp['visitor'] = base.value.rows[index].visitor
        // console.log(base.value.rows[index])
        base.value.form.current = code;
        base.value.form.object = { ...base.value.rows[index] };
        // console.log(base.value.form.object)
        base.value.form.method = "PUT";
        base.value.form.modal = true;

        detail.value.data.rows = [];

        base.value.form.object.title = JSON.parse(base.value.form.object.title)
        // base.value.form.object.email = JSON.parse(base.value.form.object.email)
        base.value.form.object.item = JSON.parse(base.value.form.object.item)
        base.value.form.object.car_detail = JSON.parse(base.value.form.object.car_detail)
        base.value.form.temp['item'] = base.value.form.object.item
        fnDetail.search();
      },
      save: async () => {
        if (base.value.form.loading) return;
        base.value.form.loading = true;
      
        if(!base.value.form.object.description) {
          msg.value.desc = '*กรอกข้อมูล*';
          base.value.form.loading = false;
          return;
        } else {
          msg.value.desc = ''
        }

        try {
          const queryBody = {
            code: base.value.form.current,
            rows: [
              {
                ...base.value.form.object,
                ...{
                  visitor:
                    base.value.form.object.visitor.length > 0
                      ? base.value.form.object.visitor[0].code
                      : "",
                },
              },
            ],
          };

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/HR/visitor/visitor"
          );

          const method = base.value.form.method || "POST";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
          }

          if (base.value.form.current === 0) {
            base.value.form.current = res.rows[0].code;
          }
          detail.value.data.form.method = "POST";

          await fnDetail.save();

          base.value.modal = false;
          detail.value.pagination.page = 1;

          // เมลล์แจ้งเตือน
          if (base.value.form.object.item && base.value.form.object.email) {
            const queryBody = {
              mailSubject : 'Visitor Management System',
              mailFrom : 'it_manage@ubisasia.com',
              mailDesc : 'Visitor Management System',
              mailToList : base.value.form.object.email,
              // mailCc : 'sirapit.l@ubisasia.com',
              mailList : [{ email: 'team-sheq@ubisasia.com' }, { email: 'team-hr@ubisasia.com' }],
              template : 'email/trr/visitor_book',
              row : {
                visitor : base.value.form.object.visitor.length > 0
                  ? base.value.form.object.visitor[0].name : "",
                topic : base.value.form.object.titleName,
                descrip : base.value.form.object.description,
                dDate : base.value.form.object.desired_date,
                dTime : base.value.form.object.desired_time,
                reBf : base.value.form.object.reminder_before,
                rows : { ...base.value.form.object.item }
              }
            }
            const path = buildPath(
              null,
              "api/controllers/MYSQL/INTERNAL/GLOBAL/mail"
            );
            const method = "POST";
            const res = fetchQuery({}, method, path, queryBody);
            // ส่ง calendar
            const resStatus = () => {
              res.then((v) => {
                if (v.status) {
                  const queryBody = {
                    mailSubject : 'Visitor Management System',
                    mailFrom : 'it_manage@ubisasia.com',
                    mailDesc : 'Visitor Management System',
                    mailToList : base.value.form.object.email,
                    // mailCc : 'sirapit.l@ubisasia.com',
                    organizeBy : user.value.fullname,
                    mailBy : user.value.emailTitle,
                    current: base.value.form.current,
                    visitor : base.value.form.object.visitor.length > 0
                      ? base.value.form.object.visitor[0].name : "",
                    topic : base.value.form.object.titleName,
                    descrip : base.value.form.object.description,
                    dDate : base.value.form.object.desired_date,
                    dTime : base.value.form.object.desired_time,
                    reBf : base.value.form.object.reminder_before,
                  };
                  const path = buildPath(
                    null,
                    "api/controllers/MYSQL/INTERNAL/GLOBAL/calendar"
                  );
                  const method = "POST";
                  const res = fetchQuery({}, method, path, queryBody);
                }
              });
            };
            resStatus();
          }
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
      addRow: () => {
        console.log(base.value.form.object.visitor)
        console.log(base.value.form.temp)

        detail.value.data.form.object = {
          code: moment().format("YYYYMMDD") + detail.value.data.rows.length,
          member: base.value.form.temp.visitor,
          new: true,
        };
        detail.value.data.rows.unshift(detail.value.data.form.object);
      },
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
            getTotal: true,
            current: base.value.form.temp.visitor,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/HR/visitor/visitor_member_name"
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
            console.error("Error fetching detail:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          detail.value.pagination.loading = false;
        }
      },
      create: () => {
        detail.value.data.form.current = 0;
        detail.value.data.form.object = {
          code: "",
        };
        detail.value.data.form.method = "POST";
      },
      edit: (code) => {
        detail.value.data.form.current = code;
        const index = detail.value.data.rows.findIndex(
          (v) => v.code === detail.value.data.form.current
        );
        if (index !== -1) {
          detail.value.data.form.object = { ...detail.value.data.rows[index] };
          detail.value.data.form.method = "PUT";

        } else {
          console.warn(`No detail found with code: ${code}`);
        }
      },
      save: async () => {
        if (detail.value.data.rows.length === 0) return;
        const rows = detail.value.data.rows.map((v) => ({
          ...v,
        }));

        const object = {
          POST: rows.filter((v) => v.new),
          PUT: rows.filter((v) => v.edit),
        };

        console.log(object)

        try {
          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/HR/visitor/visitor_member_name"
          );

          for (const [method, data] of Object.entries(object)) {
            if (data.length === 0) continue;

            const res = await fetchQuery({}, method, path, { rows: data });

            if (!res.success) {
              console.error(`Failed to save data with method: ${method}`, res);
            } else {
              console.log(
                `Successfully saved data with method: ${method}`,
                res
              );
            }
          }
        } catch (error) {
          console.error(
            "An error occurred during detail save operation:",
            error
          );
        }
      },
    };

    const fnRemove = {
      allSelected: (path) => {
        const selectedRows = detail.value.data.rows.filter((row) => row.remove);
        remove.value.modal = true;
        remove.value.rows = selectedRows;
        remove.value.path = path;
      },
      item: (code, path) => {
        remove.value.modal = true;
        remove.value.code = code;
        remove.value.path = path;
        remove.value.rows = null;
      },
      success: (res) => {
        if (remove.value.rows) {
          remove.value.rows.forEach((v) => {
            let index = detail.value.data.rows.findIndex(
              (d) => d.code == v.code
            );
            index >= 0 ? (detail.value.data.rows[index]["remove"] = false) : "";
            index >= 0 ? (detail.value.data.rows[index]["removed"] = true) : "";
          });
          remove.value.rows = [];
        } else {
          let index = detail.value.data.rows.findIndex(
            (v) => v.code == remove.value.code
          );
          index >= 0 ? (detail.value.data.rows[index]["remove"] = false) : "";
          index >= 0 ? (detail.value.data.rows[index]["removed"] = true) : "";
        }

        removing.value = false;
        remove.value.modal = false;
      },
    };

    return {
      base,
      detail,
      remove,
      removing,
      fnBase,
      fnDetail,
      fnRemove,
      msg
    };
  },
  watch: {
    "base.form.object.car": function (v) {
      if (v) {
        let mock = [];
        if (this.base.form.object.car_detail.length) {
          mock = this.base.form.object.car_detail
        }
        this.base.form.object.car_detail = [];
        for (let i = 0; i < v; i++) {
          if (mock.length && mock.length >= i+1) {
            this.base.form.object.car_detail[i] = mock[i]
          } else {
            this.base.form.object.car_detail[i] = {
              manu: "",
              model: "",
              color: "",
              regis: ""
            }
          }
        }
      }
    },
    "base.form.object.visitor": function (v) {
      console.log(v)
      if (v.length && this.base.form.method == 'POST') {
        this.base.form.temp['visitor'] = v[0].code
        this.fnDetail.search();
      }
    }
  }
});
</script>
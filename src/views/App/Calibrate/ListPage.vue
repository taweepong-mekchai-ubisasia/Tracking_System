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
          <div class="modal-box w-11/12 max-w-xl">
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 class="text-lg font-bold text-primary">แผนการสอบเทียบเครื่องมือห้องแลป</h3>
            <hr class="mt-5" />
            <!-- {{ base.form }} -->
            <div class="card-body overflow-auto gap-3" style="max-height: 68vh">
                <!-- <div class="grid gap-3 grid-cols-1"> -->
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text font-semibold">รหัสเครื่องมือ</span>
                    </label>
                      <AppModuleGlobalSelectSearch
                        v-if="method == 'create'"
                        :placeholder="'เลือกรหัสเครื่องมือ'"
                        :label="'secret'"
                        :code="'code'"
                        :minChar="0"
                        :delay="0.5"
                        :limit="10"
                        :customClass="`input input-sm border-b-4 border-gray-500 ${
                          checkbox == 'M' ? 'input-disabled' : ''
                        }`"
                        :disabled="checkbox == 'M' ? true : false"
                        :current="base.form.item_code"
                        :refresh="refresh.code"
                        @updateValue="
                          (obj) => {
                            // console.log(obj)
                            base.form.item_code = obj.code;
                            base.form.dept = obj.dept;
                            base.form.equip = obj.equip;
                            base.form.name = obj.name;
                          }
                        "
                        @stopRefresh="
                          (obj) => {
                            // console.log(obj)
                            refresh.code = obj.value;
                          }
                        "
                        :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Calibrate/item`"
                        :param="`&total=1`"
                      />
                      <input v-else type="text" placeholder="แสดงหลังเลือกรหัส" class="input input-sm border-b-4 border-gray-500 text-xs" readonly v-model="base.form.secret" />
                    </div>
                  <div class="grid gap-3 grid-cols-3">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text text-xs font-semibold">แผนก</span>
                      </label>
                      <input type="text" placeholder="แสดงหลังเลือกรหัส" class="input input-sm border-b-4 border-gray-500 text-xs" readonly v-model="base.form.dept" />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text text-xs font-semibold">ประเภท</span>
                      </label>
                      <input type="text" placeholder="แสดงหลังเลือกรหัส" class="input input-sm border-b-4 border-gray-500 text-xs" readonly v-model="base.form.equip" />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text text-xs font-semibold">ชื่อเครื่องมือ</span>
                      </label>
                      <input type="text" placeholder="แสดงหลังเลือกรหัส" class="input input-sm border-b-4 border-gray-500 text-xs" readonly v-model="base.form.name" />
                    </div>
                  </div>
                  <label class="input input-sm flex items-center gap-2 border-b-4 border-gray-500">
                    <span class="font-bold">วิธีสอบเทียบ</span>
                    <input type="text" class="grow input-xs" placeholder="..." v-model="base.form.method" :disabled="method == 'edit'" />
                  </label>
                  <label class="input flex items-center gap-2 border-b-4 border-gray-500 justify-between" style="height: 100%;">
                    <span class="font-bold">ความถี่</span>
                    <div style="width: 80%;">
                      <div class="label grid grid-cols-5">
                        <input type="checkbox" class="checkbox checkbox-sm" v-model="base.form.month_check" :disabled="method == 'edit'" />
                        <div class="join col-span-4">
                          <input type="number" class="join-item input input-xs input-bordered w-full" v-model="base.form.frequency_m" :disabled="method == 'create' ? !base.form.month_check : true" />
                          <button class="join-item btn btn-xs disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content" disabled>
                            เดือน
                          </button>
                        </div>
                      </div>
                      <div class="label grid grid-cols-5">
                        <input type="checkbox" class="checkbox checkbox-sm" v-model="base.form.year_check" :disabled="method == 'edit'" />
                        <div class="join col-span-4">
                          <input type="number" class="join-item input input-xs input-bordered w-full" v-model="base.form.frequency_y" :disabled="method == 'create' ? !base.form.year_check : true" />
                          <button class="join-item btn btn-xs disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content" disabled>
                            ปี
                          </button>
                        </div>
                      </div>
                    </div>
                  </label>
                  <label class="input input-sm flex items-center gap-2 border-b-4 border-gray-500">
                    <span class="font-bold">กำหนดสอบเทียบ</span>
                    <input type="date" class="grow input-xs" placeholder="..." v-model="base.form.cal_schedule" :disabled="method == 'edit'" />
                  </label>
                  <label class="input input-sm flex items-center gap-2 border-b-4 border-gray-500">
                    <span class="font-bold">วันที่สอบเทียบ</span>
                    <input type="date" class="grow input-xs" placeholder="..." v-model="base.form.cal_date" :disabled="method == 'edit'" />
                  </label>
                  <label class="input input-sm flex items-center gap-2 border-b-4 border-gray-500">
                    <span class="font-bold">วันที่สอบเทียบครั้งถัดไป</span>
                    <input type="date" class="grow input-xs" placeholder="..." v-model="base.form.next_cal_date" disabled/>
                  </label>
                  <div class="form-control">
                    <AppModuleGlobalUpload
                      :fileLink="`${base.form.imageLink}employee/${base.form.code}/`"
                      :file="base.form.file"
                      :id="'base'"
                      :multiple="false"
                      :type="'pdf'"
                      @respone="
                        (res) => {
                          base.form.file = base.form.file.concat(res.file);
                        }
                      "
                      @uploaded="
                        (res) => {
                          let index = base.form.file.findIndex(
                            (v) => v.r == res.r
                          );
                          base.form.file[index] = res.row;
                        }
                      "
                      @stream="
                        (res) => {
                          let index = base.form.file.findIndex(
                            (v) => v.r == res.r
                          );
                          base.form.file[index].loading = res.loading;
                        }
                      "
                      @error="
                        (res) => {
                          let index = base.form.file.findIndex(
                            (v) => v.r == res.r
                          );
                          base.form.file[index].error = true;
                        }
                      "
                      @again="
                        (res) => {
                          let index = base.form.file.findIndex(
                            (v) => v.r == res.image.r
                          );
                          base.form.file[index] = res.file;
                        }
                      "
                      @resetdata="
                        (res) => {
                          base.form.file = [...res.file];
                        }
                      "
                    />
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <select class="select select-sm border-b-4 border-gray-500 font-semibold" v-model="base.form.pass" :disabled="method == 'edit'">
                      <option disabled selected value="">ผลการสอบเทียบ</option>
                      <option value="ผ่าน">ผลการสอบเทียบ : ผ่าน</option>
                      <option value="ไม่ผ่าน">ผลการสอบเทียบ : ไม่ผ่าน</option>
                    </select>
                    <input type="text" placeholder="ชื่อเครื่องมือ" class="input input-sm border-b-4 border-gray-500 text-sm font-semibold" readonly :value="base.controll == 'create' ? 'ผู้บันทึก : '+user.firstname+' '+user.lastname : 'ผู้บันทึก : '+base.form.fullname" />
                  </div>
                <!-- </div> -->
              </div>
              <hr />
            <!-- </div> -->
            <div class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex" v-if="method == 'create'">
              <div class="flex-1 form-control mt-6">
                <label :for="base.controll == 'create' ? 'modal-base' : ''" class="btn btn-sm btn-danger" @click="base.controll == 'edit' ? cancel(condi, base.form.code): ''">Cancel</label>
              </div>
              <div class="flex-1 form-control mt-6">
                <button class="btn btn-sm btn-primary text-white" @click="base_save('static')">Confirm</button>
              </div>
            </div>
            <div class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex" v-else>
              <div class="flex-1 form-control mt-6">
                <label for="modal-base" class="btn btn-sm btn-danger">Close</label>
              </div>
              <div class="flex-1 form-control mt-6">
                <button class="btn btn-sm btn-secondary text-white" @click="method = 'create'">Edit</button>
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
          <div class="modal-box relative">
            <label
              for="modal-remove"
              class="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 class="text-lg font-bold text-error">Remove Item!</h3>
            <hr class="mt-5" />
            <div class="card-body overflow-auto" style="max-height: 60vh">
              Are your sure for remove this item?
            </div>
            <hr class="" />
            <div
              class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-remove" class="btn btn-sm btn-danger">Cancel</label>
              </div>
              <div class="flex-1 form-control mt-6">
                <button
                  class="btn btn-sm btn-error text-white"
                  @click="confirm_remove()"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #view>
        <div class="grid grid-cols-1 gap-6 lg:px-9 lg:py-5">
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body overflow-auto">
              <div class="join mt-5 w-full md:justify-end justify-center">
                <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white"
                  @click="base_create()"
                  >สร้างรายการ</label
                >
              </div>
              <div class="w-full max-h-[60vh] mt-5">
                <div class="grid grid-cols-2">
                  <p class="flex justify-start text-sm font-bold underline underline-offset-2">Standard Equipment</p>
                  <div class="flex justify-end">
                    <AppModuleGlobalSearch
                      :class="'join-item input input-sm input-bordered w-full max-w-xs'"
                      @search="
                        (q) => {
                          base.q = q;
                          base.page = 1;
                          standard_search();
                        }
                      "
                    />
                  </div>
                </div>
                <div class="overflow-x-auto mt-3">
                  <table class="table table-xs table-pin-rows table-pin-cols table-zebra my-3">
                    <thead>
                      <tr>
                        <td>แผนก</td>
                        <td>รหัส</td>
                        <td>ชื่อเครื่องมือ</td>
                        <td>วิธีสอบเทียบ</td>
                        <td>ความถี่</td>
                        <td>กำหนดสอบเทียบ</td>
                        <td>วันที่สอบเทียบ</td>
                        <td>ผลการสอบเทียบ</td>
                        <td>วันที่สอบเทียบครั้งถัดไป</td>
                        <td>ผู้บันทึก</td>
                        <th class="text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in standard.rows" :key="row.code">
                        <td>{{ row.dept }}</td>
                        <td class="font-semibold">{{ row.secret }}</td>
                        <td>{{ row.name }}</td>
                        <td>{{ row.method }}</td>
                        <td class="font-semibold">
                          {{ row.frequency_m ? row.frequency_m+' เดือน' : '' }}
                          {{ row.frequency_m && row.frequency_y ? '/' : '' }}
                          {{ row.frequency_y ? row.frequency_y+' ปี' : '' }}
                        </td>
                        <td>{{ $moment(row.cal_schedule ).add(543, "year").format("DD / MM / YYYY") }}</td>
                        <td>{{ $moment(row.cal_date).add(543, "year").format("DD / MM / YYYY") }}</td>
                        <td class="font-bold underline underline-offset-2" :class="row.pass == 'ผ่าน' ? 'text-primary' : row.pass == 'ไม่ผ่าน' ? 'text-error' : 'text-slate-500'">{{ row.pass }}</td>
                        <td>{{ $moment(row.next_cal_date).add(543, "year").format("DD / MM / YYYY") }}</td>
                        <td>{{ row.firstname }}</td>
                        <th class="text-right">
                          <label
                            class="btn btn-ghost modal-button btn-xs text-secondary hover:text-black"
                          >
                            ตั้งเวลาแจ้งเตือน
                          </label>
                          |
                          <label
                            for="modal-base"
                            class="btn btn-ghost modal-button btn-xs text-slate-500 hover:text-black"
                            @click="standard_edit(`${row.code}`, `${index}`)"
                          >
                            <span class="underline underline-offset-2">รายละเอียด</span>
                          </label>
                          |
                          <label
                            for="modal-remove"
                            class="join-item btn btn-ghost text-error hover:text-black modal-button btn-xs"
                            @click="
                              remove_item(
                                `${row.code}`,
                                'standard',
                                'api/controllers/MYSQL/INTERNAL/Calibrate/plan'
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
                <div class="grid grid-cols-2 mt-5">
                  <p class="flex justify-start text-sm font-bold underline underline-offset-2">Working Equipment</p>
                  <div class="flex justify-end">
                    <AppModuleGlobalSearch
                      :class="'join-item input input-sm input-bordered w-full max-w-xs'"
                      @search="
                        (q) => {
                          base.q = q;
                          base.page = 1;
                          working_search();
                        }
                      "
                    />
                  </div>
                </div>
                <div class="overflow-x-auto mt-1">
                  <table class="table table-xs table-pin-rows table-pin-cols table-zebra my-3">
                    <thead>
                      <tr>
                        <td>แผนก</td>
                        <td>รหัส</td>
                        <td>ชื่อเครื่องมือ</td>
                        <td>วิธีสอบเทียบ</td>
                        <td>ความถี่</td>
                        <td>กำหนดสอบเทียบ</td>
                        <td>วันที่สอบเทียบ</td>
                        <td>ผลการสอบเทียบ</td>
                        <td>วันที่สอบเทียบครั้งถัดไป</td>
                        <td>ผู้บันทึก</td>
                        <th class="text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in working.rows" :key="row.code">
                        <td>{{ row.dept }}</td>
                        <td class="font-semibold">{{ row.secret }}</td>
                        <td>{{ row.name }}</td>
                        <td>{{ row.method }}</td>
                        <td class="font-semibold">
                          {{ row.frequency_m ? row.frequency_m+' เดือน' : '' }}
                          {{ row.frequency_m && row.frequency_y ? '/' : '' }}
                          {{ row.frequency_y ? row.frequency_y+' ปี' : '' }}
                        </td>
                        <td>{{ $moment(row.cal_schedule).add(543, "year").format("DD / MM / YYYY") }}</td>
                        <td>{{ $moment(row.cal_date).add(543, "year").format("DD / MM / YYYY") }}</td>
                        <td class="font-bold underline underline-offset-2" :class="row.pass == 'ผ่าน' ? 'text-primary' : row.pass == 'ไม่ผ่าน' ? 'text-error' : 'text-slate-500'">{{ row.pass }}</td>
                        <td>{{ $moment(row.next_cal_date).add(543, "year").format("DD / MM / YYYY") }}</td>
                        <td>{{ row.firstname }}</td>
                        <th class="text-right">
                          <label
                            class="btn btn-ghost modal-button btn-xs text-secondary hover:text-black"
                          >
                            ตั้งเวลาแจ้งเตือน
                          </label>
                          |
                          <label
                            for="modal-base"
                            class="btn btn-ghost modal-button btn-xs text-slate-500 hover:text-black"
                            @click="working_edit(`${row.code}`, `${index}`)"
                          >
                            <span class="underline underline-offset-2">รายละเอียด</span>
                          </label>
                          |
                          <label
                            for="modal-remove"
                            class="join-item btn btn-ghost text-error hover:text-black modal-button btn-xs"
                            @click="
                              remove_item(
                                `${row.code}`,
                                'working',
                                'api/controllers/MYSQL/INTERNAL/Calibrate/plan'
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
import Query from "@/assets/js/fetch.js";
import moment from "moment";

export default {
  name: "ListPage",
  components: {
    AppLayout,
    AppModuleGlobalPageination,
    AppModuleGlobalUpload,
    AppModuleGlobalSearch,
    AppModuleGlobalSelectSearch,
  },
  data() {
    return {
      refresh: false,
      method: '',
      condi: '',
      base: {
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
      standard: {
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
      working: {
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
    cancel(equip, code) {
      let index = 0
      if (equip == 'Standard Equipment') {
        this.standard.rows.forEach((x, i) => x.code == code ? index = i : '')
        this.standard_edit(code, index)
      } else {
        this.working.rows.forEach((x, i) => x.code == code ? index = i : '')
        this.working_edit(code, index)
      }
    },
    makeid(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      return result;
    },
    // standard
    standard_search() {
      this.standard.loading = true;
      this.standard_get((res) => {
        this.standard.rows = res.rows;
        this.standard.total = res.total;
        this.standard.next = this.standard.page * this.standard.row >= this.standard.total ? false : true;
        this.standard.back = this.standard.page > 1 ? true : false;
        this.standard.loading = false;
      });
    },
    standard_get(callback) {
      new Query('standard','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Calibrate/plan?equip=Standard%&total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    standard_edit(code, index) {
      this.base.form = { ...this.standard.rows[index] };
      this.base.form.month_check = this.base.form.frequency_m ? true : false
      this.base.form.year_check = this.base.form.frequency_y ? true : false
      this.base.current = code;
      this.base.controll = "edit";
      this.method = this.base.controll;
      this.condi = this.base.form.equip
      this.refresh = true;
    },
    // working
    working_search() {
      this.working.loading = true;
      this.working_get((res) => {
        this.working.rows = res.rows;
        this.working.total = res.total;
        this.working.next = this.working.page * this.working.row >= this.working.total ? false : true;
        this.working.back = this.working.page > 1 ? true : false;
        this.working.loading = false;
      });
    },
    working_get(callback) {
      new Query('working','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Calibrate/plan?equip=Working%&total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    working_edit(code, index) {
      this.base.form = { ...this.working.rows[index] };
      this.base.form.month_check = this.base.form.frequency_m ? true : false
      this.base.form.year_check = this.base.form.frequency_y ? true : false
      this.base.current = code;
      this.base.controll = "edit";
      this.method = this.base.controll;
      this.condi = this.base.form.equip
      this.refresh = true;
    },
    // base
    base_create() {
      this.base.current = this.makeid(15);
      this.base.form = {
        code: this.base.current,
        item_code: '',
        method: '',
        month_check: false,
        year_check: false,
        frequency_m: '',
        frequency_y: '',
        cal_schedule: '',
        cal_date: '',
        next_cal_date: '',
        pass: '',
        file: '',
        dept: '',
        equip: '',
        name: '',
        imageLink: '',
      };
      this.base.controll = "create";
      this.method = this.base.controll
    },
    base_save(type) {
      let obj = {
        rows: [
          {
            ...this.base.form
          },
        ]
      };

      new Query(null, this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Calibrate/plan`, obj, (res) => {
        if (!res.success) {
        } else {
          if (this.base.controll == 'create') {
            this.base.modal = false;

            if (type == "static") {
              this.standard_search();
              this.working_search();
            }
          } else {
            this.method = 'edit'
          }
        }
      });
    },
    // REMOVE
    remove_item(code, controll, tb) {
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    confirm_remove() {
      fetch(`${this.serviceUrl}${this.remove.tb}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({
          rows: [{ code: this.remove.code }]
        }),
      })
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          this.remove.modal = false;
          this[`${this.remove.controll}_search`]();
        }
      })
      .catch((error) => {
        callback([]);
        console.error("Error:", error);
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.standard_search();
      this.working_search();
    });
  },
  watch: {
    base: function (v) {
      console.log(v);
    },
    'base.form.month_check': function (v) {
      if (!v) {
        this.base.form.frequency_m = ''
      }
    },
    'base.form.year_check': function (v) {
      if (!v) {
        this.base.form.frequency_y = ''
      }
    },
    'base.form.cal_date': function (v) {
      if (this.method == 'create') {
        const date = new Date(v)
        this.base.form.frequency_m ? date.setMonth(date.getMonth() + this.base.form.frequency_m) : ''
        this.base.form.frequency_y ? date.setFullYear(date.getFullYear() + this.base.form.frequency_y) : ''

        this.base.form.next_cal_date = this.$moment(date).format("YYYY-MM-DD") 
      }
    },
    'base.form.frequency_m': function (v) {
      if (this.method == 'create' && this.base.form.cal_date) {
        const date = new Date(this.base.form.cal_date)
        date.setMonth(date.getMonth() + v)

        this.base.form.next_cal_date = this.$moment(date).format("YYYY-MM-DD") 
      }
    },
    'base.form.frequency_y': function (v) {
      if (this.method == 'create' && this.base.form.cal_date) {
        const date = new Date(this.base.form.cal_date)
        date.setFullYear(date.getFullYear() + v)

        this.base.form.next_cal_date = this.$moment(date).format("YYYY-MM-DD") 
      }
    }
  }
};
</script>

<style scrop>
  tr,
  td {
    white-space: nowrap;
  }
</style>

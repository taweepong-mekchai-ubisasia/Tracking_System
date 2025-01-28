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
            <h3 class="text-lg font-bold text-primary">ข้อมูลสำหรับการสอบเทียบข้อมูล</h3>
            <hr class="mt-5" />
            <!-- {{ base.form }} -->
            <div class="card-body overflow-auto gap-3" style="max-height: 68vh">
                <!-- <div class="grid gap-3 grid-cols-1"> -->
                  <select class="select select-sm border-b-4 border-primary font-bold" v-model="base.form.dept" :disabled="method == 'edit'">
                    <option disabled selected value="">แผนก</option>
                    <option value="QA Compound">แผนก : QA Compound</option>
                    <option value="QA Lacquer">แผนก : QA Lacquer</option>
                    <option value="RD Compound">แผนก : RD Compound</option>
                    <option value="RD Lacquer">แผนก : RD Lacquer</option>
                  </select>
                  <select class="select select-sm border-b-4 border-primary font-bold" v-model="base.form.equip" :disabled="method == 'edit'">
                    <option disabled selected value="">Equipment</option>
                    <option value="Standard Equipment">Equipment : Standard Equipment</option>
                    <option value="Working Equipment">Equipment : Working Equipment</option>
                  </select>
                  <label class="input input-sm flex items-center gap-2 border-b-4 border-primary">
                    <span class="font-bold">รหัส</span>
                    <input type="text" class="grow input-xs" placeholder="..." v-model="base.form.secret" :disabled="method == 'edit'" />
                  </label>
                  <label class="input input-sm flex items-center gap-2 border-b-4 border-primary">
                    <span class="font-bold">ชื่อเครื่องมือ</span>
                    <input type="text" class="grow input-xs" placeholder="..." v-model="base.form.name" :disabled="method == 'edit'" />
                  </label>
                  <label class="input input-sm flex items-center gap-2 border-b-4 border-primary">
                    <span class="font-bold">ผู้ผลิต/รุ่น</span>
                    <input type="text" class="grow input-xs" placeholder="..." v-model="base.form.producer" :disabled="method == 'edit'" />
                  </label>
                  <label class="input input-sm flex items-center gap-2 border-b-4 border-primary">
                    <span class="font-bold">Serial no.</span>
                    <input type="text" class="grow input-xs" placeholder="..." v-model="base.form.sn" :disabled="method == 'edit'" />
                  </label>
                  <label class="input input-sm flex items-center gap-2 border-b-4 border-primary">
                    <span class="font-bold">พิสัย/ความละเอียด</span>
                    <input type="text" class="grow input-xs" placeholder="..." v-model="base.form.resolution" :disabled="method == 'edit'" />
                  </label>
                  <label class="input input-sm flex items-center gap-2 border-b-4 border-primary">
                    <span class="font-bold">ช่วงที่ใช้งาน</span>
                    <input type="text" class="grow input-xs" placeholder="..." v-model="base.form.distance" :disabled="method == 'edit'" />
                  </label>
                  <label class="input input-sm flex items-center gap-2 border-b-4 border-primary">
                    <span class="font-bold">จุดสอบเทียบ (g)</span>
                    <input type="text" class="grow input-xs" placeholder="..." v-model="base.form.cal_point" :disabled="method == 'edit'" />
                  </label>
                  <label class="input input-sm flex items-center gap-2 border-b-4 border-primary">
                    <span class="font-bold">เกณฑ์การยอมรับ</span>
                    <input type="text" class="grow input-xs" placeholder="..." v-model="base.form.criteria" :disabled="method == 'edit'" />
                  </label>
                  <label class="input input-sm flex justify-between items-center gap-2 border-b-4 border-primary">
                    <span class="font-bold">การสอบเทียบ</span>
                    <label class="label">
                      <span class="label-text text-xs mr-2">ภายนอก</span>
                      <input type="checkbox" class="checkbox checkbox-sm" v-model="base.form.cal_external" :disabled="method == 'edit'" />
                    </label>
                    <label class="label">
                      <span class="label-text text-xs mr-2">ภายใน</span>
                      <input type="checkbox" class="checkbox checkbox-sm" v-model="base.form.cal_internal" :disabled="method == 'edit'" />
                    </label>
                  </label>
                  <label class="input input-sm flex items-center gap-2 border-b-4 border-primary">
                    <span class="font-bold">Supplier สอบเทียบก่อนหน้า</span>
                    <input type="text" class="grow input-xs" placeholder="..." v-model="base.form.ex_supplier" :disabled="method == 'edit'" />
                  </label>
                  <label class="input input-sm flex items-center gap-2 border-b-4 border-primary">
                    <span class="font-bold">Remark</span>
                    <input type="text" class="grow input-xs" placeholder="..." v-model="base.form.remark" :disabled="method == 'edit'" />
                  </label>
                <!-- </div> -->
              </div>
              <hr />
            <!-- </div> -->
            <div class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex" v-if="method == 'create'">
              <div class="flex-1 form-control mt-6">
                <label :for="base.controll == 'create' ? 'modal-base' : ''" class="btn btn-sm btn-danger" @click="base.controll == 'edit' ? cancel(condi, base.form.code) : ''">Cancel</label>
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
                        <td>ผู้ผลิต/รุ่น</td>
                        <td>Serial No.</td>
                        <td>พิสัย/ความละเอียด</td>
                        <td>ช่วงที่ใช้งานได้</td>
                        <td>จุดสอบเทียบ (g)</td>
                        <td>เกณฑ์การยอมรับ</td>
                        <td>การสอบเทียบ</td>
                        <td>Supplier สอบเทียบก่อนหน้า</td>
                        <td>Remark</td>
                        <th class="text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in standard.rows" :key="row.code">
                        <td class="font-semibold">{{ row.dept }}</td>
                        <td>{{ row.secret }}</td>
                        <td>{{ row.name }}</td>
                        <td>{{ row.producer }}</td>
                        <td>{{ row.sn }}</td>
                        <td>{{ row.resolution }}</td>
                        <td>{{ row.distance }}</td>
                        <td>{{ row.cal_point }}</td>
                        <td>{{ row.criteria }}</td>
                        <td class="font-semibold">
                          {{ row.cal_external ? 'ภายนอก' : '' }}
                          {{ row.cal_external && row.cal_internal ? '/' : '' }}
                          {{ row.cal_internal ? 'ภายใน' : '' }}
                        </td>
                        <td>{{ row.ex_supplier }}</td>
                        <td>{{ row.remark }}</td>
                        <th class="text-right">
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
                                'api/controllers/MYSQL/INTERNAL/Calibrate/item'
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
                        <td>ผู้ผลิต/รุ่น</td>
                        <td>Serial No.</td>
                        <td>พิสัย/ความละเอียด</td>
                        <td>ช่วงที่ใช้งานได้</td>
                        <td>จุดสอบเทียบ (g)</td>
                        <td>เกณฑ์การยอมรับ</td>
                        <td>การสอบเทียบ</td>
                        <td>Supplier สอบเทียบก่อนหน้า</td>
                        <td>Remark</td>
                        <th class="text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in working.rows" :key="row.code">
                        <td class="font-semibold">{{ row.dept }}</td>
                        <td>{{ row.secret }}</td>
                        <td>{{ row.name }}</td>
                        <td>{{ row.producer }}</td>
                        <td>{{ row.sn }}</td>
                        <td>{{ row.resolution }}</td>
                        <td>{{ row.distance }}</td>
                        <td>{{ row.cal_point }}</td>
                        <td>{{ row.criteria }}</td>
                        <td class="font-semibold">
                          {{ row.cal_external ? 'ภายนอก' : '' }}
                          {{ row.cal_external && row.cal_internal ? '/' : '' }}
                          {{ row.cal_internal ? 'ภายใน' : '' }}
                        </td>
                        <td>{{ row.ex_supplier }}</td>
                        <td>{{ row.remark }}</td>
                        <th class="text-right">
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
                                'api/controllers/MYSQL/INTERNAL/Calibrate/item'
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

export default {
  name: "ItemMaster",
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
      new Query('standard','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Calibrate/item?standard=1&total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
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
      this.base.form.cal_external = this.base.form.cal_external ? true : false
      this.base.form.cal_internal = this.base.form.cal_internal ? true : false
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
      new Query('working','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Calibrate/item?working=1&total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
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
      this.base.form.cal_external = this.base.form.cal_external ? true : false
      this.base.form.cal_internal = this.base.form.cal_internal ? true : false
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
        dept: '',
        equip: '',
        secret: '',
        name: '',
        producer: '',
        sn: '',
        resolution: '',
        distance: '',
        cal_point: '',
        criteria: '',
        cal_internal: false,
        cal_external: false,
        ex_supplier: '',
        remark: '',
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

      new Query(null, this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Calibrate/item`, obj, (res) => {
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
  }
};
</script>

<style scrop>
  tr,
  td {
    white-space: nowrap;
  }
</style>

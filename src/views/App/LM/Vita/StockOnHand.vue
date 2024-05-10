<template>
  <div class="Logistic">
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
          <div
            class="modal-box relative w-11/12 max-w-5xl p-2 lg:p-4 max-h-screen"
          >
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold text-primary">
              Packing List FG To Customer
            </h3>
            <hr class="my-5" />
            <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Quantation :</span>
                </label>
                <input
                  type="text"
                  placeholder="Quantation"
                  class="input input-bordered border-base-content"
                  v-model="base.form.quantation"
                />
              </div>
              <!-- disabled="true"
                          :value="`${base.form.quantation}`" -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Packing List :</span>
                </label>
                <input
                  type="text"
                  placeholder="Packing List"
                  class="input input-bordered border-base-content"
                  v-model="base.form.packing"
                />
              </div>
              <!-- disabled="true"
                          :value="`${base.form.packing}`" -->
            </div>
            <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Shipping Mark :</span>
                </label>
                <input
                  type="text"
                  placeholder="Shipping Mark"
                  class="input input-bordered border-base-content"
                  v-model="base.form.shipping"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Sending Date :</span>
                </label>
                <input
                  type="date"
                  placeholder="Sending Date"
                  class="input input-bordered border-base-content"
                  v-model="base.form.sending"
                />
              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Customer :</span>
              </label>
              <input
                type="text"
                placeholder="Customer"
                class="input input-bordered border-base-content"
                v-model="base.form.customer"
              />
            </div>
            <!-- <div class="form-control">
                          <label class="label">
                              <span class="label-text">Customer :</span>
                          </label>
                          <AppModuleGlobalSelectSearch
                              :placeholder="'Customer'"
                              :label="'title'"
                              :code="'code'"
                              :minChar="3"
                              :delay="0.5"
                              :limit="10"
                              :customClass="`input input-bordered border-base-content ${
                              checkbox == 'M' ? 'input-disabled' : ''
                              }`"
                              :disabled="checkbox == 'M' ? true : false"
                              :current="base.form.department"
                              :refresh="refresh"
                              @updateValue="
                              (obj) => {
                                  base.form.department_data = obj;
                                  base.form.department = obj.code;
                              }
                              "
                              @stopRefresh="
                              (obj) => {
                                  refresh = obj.value;
                              }
                              "
                              :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/department`"
                              :param="`&total=1&wh=wh1&rac_list=1`"
                          />
                      </div> -->
            <div class="form-control pt-4 my-5">
              <div class="overflow-x-auto min-h-40 max-h-40 border-2">
                <table
                  class="table table-xs table-pin-rows table-pin-cols table-zebra"
                >
                  <thead>
                    <tr>
                      <!-- <th>#</th> -->
                      <th>ลำดับที่</th>
                      <th>Product</th>
                      <th>Lot Number</th>
                      <th>Packing (KG/LIT)</th>
                      <th>Quantity</th>
                      <th>MFG</th>
                      <th>EXP</th>
                      <th class="text-right">
                        <label
                          for="modal-detail"
                          class="btn btn-primary modal-button btn-xs text-white"
                          @click="detail_create()"
                          >+ new
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
                      <!-- <th>
                                              <div class="flex items-center space-x-3">
                                                  <input
                                                      type="checkbox"
                                                      :checked="v.code == base.form.email"
                                                      class="checkbox"
                                                      @click="
                                                      () => {
                                                          base.form.email =
                                                          base.form.email == v.code
                                                              ? ''
                                                              : v.code;
                                                      }
                                                      "
                                                  />
                                              </div>
                                          </th> -->
                      <td>
                        <div class="flex items-center space-x-3">
                          <div class="font-bold">{{ i + 1 }}</div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div class="font-bold">{{ v.product }}</div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div class="font-bold">{{ v.lot }}</div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div class="font-bold">{{ v.packing }}</div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div class="font-bold">{{ v.quantity }}</div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div class="font-bold">{{ v.mfg }}</div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div class="font-bold">{{ v.exp }}</div>
                        </div>
                      </td>
                      <th class="text-right">
                        <label
                          for="modal-detail"
                          class="btn btn-link modal-button btn-xs"
                          @click="detail_edit(`${v.code}`, `${i}`)"
                        >
                          แก้ไข
                        </label>
                        |
                        <label
                          for="modal-remove"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'detail',
                              'controllers/MYSQL/INTERNAL/HR/email'
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
            <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">ชื่อผู้ทำรายการ :</span>
                </label>
                <input
                  type="text"
                  placeholder="ชื่อผู้ทำรายการ"
                  class="input input-bordered border-base-content"
                  disabled="true"
                  :value="`${user.firstname} ${user.lastname}`"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Status :</span>
                </label>
                <select
                  class="select select-bordered border-base-content"
                  v-model="base.form.status"
                >
                  <option value="pending">เตรียมจัดส่ง</option>
                  <option value="shipping">จัดส่งแล้ว</option>
                </select>
              </div>
            </div>
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex mt-5"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-base" class="btn btn-danger">Cancle</label>
              </div>
              <div class="flex-1 form-control mt-6" @click="base_save()">
                <button class="btn btn-primary text-white">Confirm</button>
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
        <div class="modal">
          <div class="modal-box relative">
            <label
              for="modal-remove"
              class="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 class="text-lg font-bold">Remove Item!</h3>
            <div class="card-body overflow-auto max-h-[60vh]">
              Are your sure for remove this item?
            </div>

            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-remove" class="btn btn-danger">Cancle</label>
              </div>
              <div class="flex-1 form-control mt-6">
                <button
                  class="btn btn-error text-white"
                  @click="confirm_remove()"
                >
                  Confirm
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
          <div class="modal-box relative">
            <label
              for="modal-detail"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕</label
            >

            <div class="card-body overflow-auto max-h-[60vh]">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Product</span>
                </label>
                <!-- <input
                              type="text"
                              placeholder="Product"
                              class="input input-bordered border-base-content"
                              v-model="detail.form.product"
                              /> -->

                <AppModuleGlobalSelectSearch
                  :placeholder="'Product'"
                  :label="'ItemName'"
                  :code="'ItemCode'"
                  :minChar="3"
                  :delay="0.5"
                  :limit="10"
                  :customClass="`input input-bordered border-base-content ${
                    checkbox == 'M' ? 'input-disabled' : ''
                  }`"
                  :disabled="checkbox == 'M' ? true : false"
                  :current="detail.form.product"
                  :refresh="refresh"
                  @updateValue="
                    (obj) => {
                      detail.form.product = obj.ItemCode;
                    }
                  "
                  @stopRefresh="
                    (obj) => {
                      refresh = obj.value;
                    }
                  "
                  :url="`${this.serviceUrl}api/controllers/SAP/UBP/oitm`"
                  :param="`&page=1&rows=10&total=1`"
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Lot Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Lot Number"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.lot"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Packing</span>
                </label>
                <input
                  type="number"
                  placeholder="Packing"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.packing"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Quantity</span>
                </label>
                <input
                  type="number"
                  placeholder="Quantity"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.quantity"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">MFG</span>
                </label>
                <input
                  type="date"
                  placeholder="MFG"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.mfg"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">EXP</span>
                </label>
                <input
                  type="date"
                  placeholder="EXP"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.exp"
                />
              </div>
            </div>
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-detail" class="btn btn-danger">Cancle</label>
              </div>
              <div class="flex-1 form-control mt-6">
                <button
                  class="btn btn-primary text-white"
                  @click="detail_save()"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Open the modal using ID.showModal() method -->

        <!-- The button to open modal -->

        <!-- Put this part before </body> tag -->

        <!-- <AppModuleGlobalShowImage :row="imagerow" /> -->
      </template>
      <template #view>
        <div class="grid grid-cols-1 gap-6 lg:px-10 lg:py-2">
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body overflow-auto">
              <div class="join mt-5 w-full md:justify-center lg:justify-end">
                <AppModuleGlobalSearch
                  :class="'join-item input input-sm input-bordered border-base-content w-full max-w-xs'"
                  @search="
                          (q) => {
                            base.page = 1;
                            base.q = q;
                            typeof base.q == 'string' ? base_search() : '';
                          }
                        "
                />
                <!-- <input
                              type="text"
                              placeholder="Quantation"
                              class="input input-sm input-bordered border-base-content"
                              v-model="quantation"
                              />
                              <input
                              type="text"
                              placeholder="Packing List"
                              class="input input-sm input-bordered border-base-content"
                              v-model="packing"
                              /> -->
                <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white"
                  @click="base_create()"
                  >Create</label
                >
              </div>
              <div class="overflow-x-auto w-full max-h-[60vh]">
                <table
                  class="table table-xs table-pin-rows table-pin-cols table-zebra"
                >
                  <thead>
                    <tr>
                      <td>ลำดับ</td>
                      <td>Quantation</td>
                      <td>Packing List</td>
                      <td>Shipping Mark</td>
                      <td>Sending Date</td>
                      <td>Customer</td>
                      <td>ชื่อผู้ทำรายการ</td>
                      <td>Status</td>
                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in base.rows">
                      <th>{{ i + 1 }}</th>
                      <th>{{ v.quantation }}</th>
                      <th>{{ v.packing }}</th>
                      <th>{{ v.shipping }}</th>
                      <th>{{ v.sending }}</th>
                      <th>{{ v.customer }}</th>
                      <th>{{ v.created_by }}</th>
                      <th>{{ v.status }}</th>
                      <th class="text-right">
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                          >edit
                        </label>

                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/HR/employee'
                            )
                          "
                          >remove
                        </label>
                      </th>
                      <!-- <td>
                                      <div>
                                      <div class="font-bold">
                                          <span class="pr-2">{{ v.code }}</span>
                                          <span>{{ v.code }}</span>
                                      </div>
          
                                      <div class="text-sm">รหัสพนักงาน : {{ v.code }}</div>
                                      <div class="text-xs">
                                          {{ v.code }}
                                      </div>
                                      </div>
                                  </td> -->
                      <!-- <td>
                                      <div class="flex items-center space-x-3">
                                      <div>
                                          <div class="font-bold">
                                          {{ v.emailTitle ? v.emailTitle : "-" }}
                                          </div>
                                          <div class="text-sm">
                                          tel : {{ v.tel ? v.tel : "-" }}
                                          </div>
                                          <div class="text-sm">
                                          วันเกิด :
                                          {{
                                              v.birthdate &&
                                              $moment(v.birthdate).format("YYYY-MM-DD") >
                                              "2000"
                                              ? $moment(v.birthdate).format("YYYY-MM-DD")
                                              : "-"
                                          }}
                                          </div>
                                      </div>
                                      </div>
                                  </td>
                                  <td>
                                      <div class="flex items-center space-x-3">
                                      <div>
                                          <div class="font-bold">
                                          {{ v.position ? v.position : "-" }}
                                          </div>
                                          <div class="text-sm">
                                          แผนก : {{ v.depTitle ? v.depTitle : "-" }}
                                          </div>
                                          <div class="text-sm">
                                          สาขา :
                                          {{ v.branchTitle ? v.branchTitle : "-" }}
                                          </div>
                                          <div class="text-sm">
                                          {{ v.companyTitle ? v.companyTitle : "-" }}
                                          </div>
                                      </div>
                                      </div>
                                  </td>
                                  <td>
                                      <div class="flex items-center space-x-3">
                                      <div>
                                          <div class="font-bold">
                                          {{ v.accessTitle ? v.accessTitle : "-" }}
                                          </div>
                                      
                                      </div>
                                      </div>
                                  </td>
                                  <td>
                                      <div class="flex items-center space-x-3">
                                      <div>
                                          <div class="text-sm">
                                          เริ่มงาน :
                                          {{
                                              v.started_at &&
                                              $moment(v.started_at).format("YYYY-MM-DD") >
                                              "2000"
                                              ? $moment(v.started_at).format("YYYY-MM-DD")
                                              : "-"
                                          }}
                                          </div>
                                          <div class="text-sm">
                                          สิ้นสุด :
                                          {{
                                              v.leaves_at &&
                                              $moment(v.leaves_at).format("YYYY-MM-DD") >
                                              "2000"
                                              ? $moment(v.leaves_at).format("YYYY-MM-DD")
                                              : "-"
                                          }}
                                          </div>
                                      </div>
                                      </div>
                                  </td>
                                  <td>
                                      <div class="flex items-center space-x-3">
                                      <div>
                                          <div class="text-xs">
                                          {{
                                              v.created_at &&
                                              $moment(v.created_at).format("YYYY-MM-DD") >
                                              "2000"
                                              ? v.created_at
                                              : "-"
                                          }}
                                          </div>
                                          <div class="text-xs opacity-30">
                                          {{
                                              v.created_fullname
                                              ? v.created_fullname
                                              : "-"
                                          }}
                                          </div>
                                      </div>
                                      </div>
                                  </td>
                                  <td>
                                      <div class="flex items-center space-x-3">
                                      <div>
                                          <div class="text-xs">
                                          {{
                                              v.updated_at &&
                                              $moment(v.updated_at).format("YYYY-MM-DD") >
                                              "2000"
                                              ? v.updated_at
                                              : "-"
                                          }}
                                          </div>
                                          <div class="text-xs opacity-30">
                                          {{
                                              v.updated_fullname
                                              ? v.updated_fullname
                                              : "-"
                                          }}
                                          </div>
                                      </div>
                                      </div>
                                  </td>
          
                                  <th class="text-right">
                                      <label
                                      for="modal-base"
                                      class="join-item btn btn-ghost modal-button btn-xs"
                                      @click="base_edit(`${v.code}`, `${i}`)"
                                      >edit
                                      </label>
          
                                      <label
                                      for="modal-remove"
                                      class="join-item btn btn-ghost modal-button btn-xs"
                                      @click="
                                          remove_item(
                                          `${v.code}`,
                                          'base',
                                          'controllers/MYSQL/INTERNAL/HR/employee'
                                          )
                                      "
                                      >remove
                                      </label>
                                  </th> -->
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- <div class="join w-full justify-center lg:justify-end">
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
                  </div> -->
            </div>
          </div>
        </div>
      </template>
    </AppLayout>
  </div>
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

export default {
  name: "Logistic",
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
      quantation: "",
      packing: "",
      checkbox: "",
      refresh: false,

      category: {
        rows: [],
        page: 1,
        row: 9999,
        q: "",
      },
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
      remove: {
        current: 0,
        model: false,
        controll: "",
        tb: "",
      },
      // imagerow: null,
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
    transpotationVita() {
      return this.$store.getters.transpotationVita;
    },
    transpotationVitaItem() {
      return this.$store.getters.transpotationVitaItem;
    },
  },
  methods: {
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
    change() {
      this.base_search();
    },
    // base
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
      console.log(this.transpotationVita);
      let data = this.transpotationVita.filter((x) => x.received_at);
      return callback({
        rows: data,
        total: data.length,
      });

      fetch(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/HR/employee?total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            res.rows.forEach((v, i) => {
              // res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });
          }
          callback(
            res.success
              ? { rows: res.rows, total: res.total }
              : { rows: [], total: 0 }
          );
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },
    base_create() {
      // console.log(this.quantation)
      // console.log(this.packing)
      this.base.current = 0;
      this.base.form = {
        code: this.makeid(5),
        quantation: "",
        packing: "",
        shipping: "",
        sending: "",
        customer: "",
        created_by: `${this.user.firstname} ${this.user.lastname}`,
        status: null,
      };
      this.detail.rows = [];
      this.base.controll = "create";
      this.quantation = "";
      this.packing = "";
    },
    base_edit(code, index) {
      this.base.form = { ...this.transpotationVita[index] };
      this.base.current = code;
      this.detail.rows = [];
      this.base.controll = "edit";
      this.detail_search();
      this.refresh = true;
    },
    base_save() {
      // let index = this.transpotationVita.findIndex(
      //     (v) => v.code == this.base.current
      // );
      // index >= 0
      //     ? (this.transpotationVita[index] = { ...this.base.form })
      //     : this.transpotationVita.push({ ...this.base.form });
      // this.$store.commit("transpotationVita", this.transpotationVita);
      // this.base.modal = false;

      this.base.form.status = this.base.form.status
        ? this.base.form.status
        : "pending";
      this.base.form.created_at = "2020-01-02";
      this.base.form.updated_at = "2020-01-02";
      this.base.form.updated_by = "tets";
      this.base.form.deleted_at = "2020-01-02";
      this.base.form.deleted_by = "tets";

      let index = this.transpotationVita.findIndex(
        (v) => v.code == this.base.current
      );
      index >= 0
        ? (this.transpotationVita[index] = { ...this.base.form })
        : this.transpotationVita.push({ ...this.base.form });
      this.$store.commit("transpotationVita", this.transpotationVita);

      this.base.modal = false;
      const promise_arr = [];

      // console.log(this.transpotation);
      if (this.base.current == 0) {
        let vm = this;
        this.base.current = this.base.form.code;
        let i = this.detail.rows.length;
        this.detail.controll = "create";
        for (i; i > 0; i--) {
          this.detail.form = {
            code: this.detail.rows[i - 1]["code"],
            transpotation_code: this.detail.rows[i - 1]["transpotation_code"],
            product: this.detail.rows[i - 1]["product"],
            lot: this.detail.rows[i - 1]["lot"],
            quantity: this.detail.rows[i - 1]["quantity"],
            mfg: this.detail.rows[i - 1]["mfg"],
            exp: this.detail.rows[i - 1]["exp"],
            created_at: "2020-01-02",
            created_by: "tets",
            updated_at: "2020-01-02",
            updated_by: "tets",
            deleted_at: "2020-01-02",
            deleted_by: "tets",
          };
          promise_arr.push(
            new Promise(async function (resolve, reject) {
              let res = await vm.detail_save("dynamic");
              await resolve(res);
              return;
            })
          );
        }
      }

      Promise.all(promise_arr).then((res) => {
        this.base_search();
      });

      return;

      // let image = { ...this.base.form.image[0] };
      // delete image.temp;
      //
      // if (this.base.controll != "create") {
      // if (
      // !this.base.form.current_password ||
      // !this.base.form.new_password ||
      // !this.base.form.confirm_password
      // ) {
      // }
      // } else {
      // this.base.form.new_password = this.base.form.uid;
      // }
      // fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/employee`, {
      // method: this.base.controll == "create" ? "POST" : "PUT",
      // headers: {
      // "Content-Type": "application/json",
      // Authorization: `Bearer ${this.user_token}`,
      // },
      // body: JSON.stringify({
      // code: this.base.current,
      // uid: this.base.form.uid,
      // firstname: this.base.form.firstname,
      // lastname: this.base.form.lastname,
      // current_password: this.base.form.current_password,
      // password: this.base.form.new_password,
      // confirm_password: this.base.form.confirm_password,
      // email: this.base.form.email,
      // tel: this.base.form.tel,
      // birthdate: this.base.form.birthdate,
      // department: this.base.form.department,
      // branch: this.base.form.branch,
      // company: this.base.form.company,
      // position: this.base.form.position,
      // started_at: this.base.form.started_at,
      // leaves_at: this.base.form.leaves_at,
      // access: this.base.form.access,
      // image: [image],
      // }),
      // })
      // .then((response) => response.json())
      // .then((res) => {
      //          if (!res.success) {
      //   localStorage.removeItem("user_token");
      //   this.$router.push({ name: `Login` });
      // } else {
      // this.base.modal = false;
      // const promise_arr = [];
      // console.log(this.base.current);
      // if (this.base.current == 0) {
      // this.base.current = res.row.code;
      // let i = this.detail.rows.length;
      // this.detail.controll = "create";
      // for (i; i > 0; i--) {
      // this.detail.form = {
      // code: this.detail.rows[i - 1]["code"],
      // title: this.detail.rows[i - 1]["title"],
      // };
      // promise_arr.push(
      // new Promise(async function (resolve, reject) {
      // let res = await vm.detail_save("dynamic");
      // await resolve(res);
      // return;
      // })
      // );
      // }
      // }
      //
      // Promise.all(promise_arr)
      // .then((res) => {
      // vm.base_search();
      // })
      // .catch((err) => console.error(err));
      // }
      // })
      // .catch((error) => {
      // console.error("Error:", error);
      // });
    },
    // DETAIL
    detail_search() {
      this.detail.loading = true;
      this.detail_get((res) => {
        // console.log(res)
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
      let data = this.transpotationVitaItem.filter(
        (v) => v.transpotation_code == this.base.form.code
      );
      return callback({ rows: data, total: data.length });

      fetch(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/HR/email?total=1&page=${
          this.detail.page
        }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
          this.detail.q ? `&q=${this.detail.q}` : ""
        }${this.base.current ? `&current=${this.base.current}` : ``}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
          // body: JSON.stringify({
          //     "uuid": localStorage.getItem('uuid'),
          // }),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          // res.rows.forEach((v, i) => {
          //   // res.rows[i].image = v.image ? JSON.parse(v.image) : [];
          //   // console.log(res.rows[i].image)
          //   // res.rows[i].image.forEach((vv, ii) => {
          //   //   if (ii == 0) {
          //   //     res.rows[i].master = ii;
          //   //   }
          //   //   // console.log(vv);
          //   //   if (vv.master) {
          //   //     res.rows[i].master = ii;
          //   //   }
          //   // });
          // });
          callback(
            res.success
              ? { rows: res.rows, total: res.total }
              : { rows: [], total: 0 }
          );
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },
    detail_create() {
      this.detail.current = 0;
      this.detail.form = {
        code: this.makeid(6),
        transporation_code: this.base.form.code,
        product: "",
        lot: "",
        packing: "",
        quantity: "",
        mfg: "",
        exp: "",
      };
      this.detail.controll = "create";
    },
    detail_edit(code, index) {
      // console.log("detail_edit");
      // this.clearimage();
      // console.log(id,index);
      // setTimeout(() => {
      this.detail.current = code;
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.form.color = this.detail.form.color == "0" ? false : true;

      // console.log(this.detail.form.image);
      // this.detail.form.image.forEach((v, i) => {
      // this.detail.form.image[i] = Object.assign(
      // {},
      // this.detail.form.image[i]
      // );
      // });

      // console.log(this.detail.form);
      // this.detail.form.image = JSON.parse(this.detail.form.image)

      // }, 5000);

      // this.base.form = this.base.rows[index]
      // this.detail.current = id;
      // this.detail_search();

      this.detail.controll = "edit";
    },
    detail_save() {
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
        let detail = {
          code: this.detail.form.code,
          transpotation_code: this.base.current,
          product: this.detail.form.product,
          lot: this.detail.form.lot,
          quantity: this.detail.form.quantity,
          mfg: this.detail.form.mfg,
          exp: this.detail.form.exp,
          created_at: "2020-01-02",
          created_by: "tets",
          updated_at: "2020-01-02",
          updated_by: "tets",
          deleted_at: "2020-01-02",
          deleted_by: "tets",
        };

        let index = this.transpotationVitaItem.findIndex(
          (v) => v.code == detail.code
        );
        index >= 0
          ? (this.transpotationVitaItem[index] = { ...detail })
          : this.transpotationVitaItem.push({ ...detail });
        this.$store.commit("transpotationVitaItem", this.transpotationVitaItem);
        // console.log(index)
        this.detail.modal = false;

        if (type == "static") {
          this.detail_search();
        }

        return;

        // console.table(this.detail.form.image);
        // let array_image = [];
        // this.detail.form.image.forEach((v, i) => {
        //   console.log(v);
        //   if (v.temp) {
        //     let image = { ...v };
        //     delete image.temp;
        //     array_image[i] = image;
        //   } else {
        //     array_image[i] = { ...v };
        //   }
        //   // console.log(this.detail.form.image[i])
        // });
        //  console.table(this.detail.form.image);
        let obj = {
          emp: this.base.current,
          code: this.detail.form.code,
          email: this.detail.form.email,
        };
        console.log(obj);
        if (this.detail.controll == "edit") {
          obj["code"] = this.detail.form.code;
        }
        fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/email`, {
          method: this.detail.controll == "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
          body: JSON.stringify(obj),
        })
          .then((response) => response.json())
          .then((res) => {
            if (!res.success) {
              localStorage.removeItem("user_token");
              this.$router.push({ name: `Login` });
            } else {
              this.detail.modal = false;
              //
              if (type == "static") {
                this.detail_search();
              }
              //
              // this.base_search();
            }
            // callback(res.success ? res.rows : []);
          })
          .catch((error) => {
            callback([]);
            console.error("Error:", error);
          });
      }
    },
    // REMOVE
    remove_item(code, controll, tb) {
      console.log(code);
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
        body: JSON.stringify({
          code: this.remove.code,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            // console.log(res);
            this.remove.modal = false;
            this[`${this.remove.controll}_search`]();
          }
          // callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          // callback([]);
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
<style scrop>
tr,
td {
  white-space: nowrap;
}
</style>

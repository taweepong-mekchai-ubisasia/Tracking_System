<template>
  <div class="Department">
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
          <div class="modal-box relative w-11/12 max-w-5xl p-2 lg:p-4 max-h-screen">
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold">Transportation Vita</h3>
            <div class="card">
              <div class="card-body">
                <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">EN</span>
                    </label>
                    <input
                      type="text"
                      placeholder="EN"
                      class="input input-bordered border-base-content"
                      v-model="base.form.en"
                      disabled
                    />

                    <!-- <label class="form-control w-full max-w-xs">
                      <select class="select select-bordered border-base-content" v-model="selectEN" @change="changeData">
                        <option disabled selected value="">เลือกรายการ</option>
                        <option :value="v.code" v-for="v in base.rows">{{v.en}}</option>
                        <option value="shipping">จัดส่งแล้ว</option>
                        <option value="receive">รับสินค้าแล้ว</option>
                      </select>
                    </label> -->
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Packing List</span>
                    </label>
                    <input
                      type="text"
                      placeholder="packingList"
                      class="input input-bordered border-base-content"
                      v-model="base.form.packingList"
                      disabled
                    />
                  </div>
                </div>

                <div class="grid gap-4 md:grid-cols-1 grid-cols-1">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Shipping Mark</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Shipping Mark"
                      class="input input-bordered border-base-content"
                      v-model="base.form.shippingMark"
                      disabled
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Shipping Date</span>
                    </label>
                    <input
                      type="date"
                      placeholder="Shipping Date"
                      class="input input-bordered border-base-content"
                      v-model="base.form.shippingDate"
                      disabled
                    />
                  </div>
                </div>

                <div class="form-control pt-4">
                  <!-- <div class="w-full overflow-auto"> -->
                    <!-- <label class="label cursor-pointer">
                      <span class="label-text">Email</span>
                    </label> -->
                    <!-- {{ detail.rows }} -->
                    <div class="overflow-x-auto min-h-40 max-h-40 border-2">
                      <table
                        class="table table-xs table-pin-rows table-pin-cols table-zebra"
                      >
                        <thead>
                          <tr>
                            <th>ลำดับ</th>
                            <td>Product</td>
                            <td>Lot Number</td>
                            <td>Quantity</td>
                            <td>MFG</td>
                            <td>EXP</td>
                            <td>Receive</td>
                            <th class="text-right">
                              <!-- <label
                                for="modal-detail"
                                class="btn btn-primary modal-button btn-xs text-white"
                                @click="detail_create()"
                                >+ new
                              </label> -->
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="hover"
                            v-for="(v, i) in detail.rows"
                            :key="i"
                          >
                            <th>
                              {{ i + 1 }}
                            </th>

                            <td>
                              {{ v.product }}
                            </td>

                            <td>
                              {{ v.lotNumber }}
                            </td>

                            <td>
                              {{ v.quantity }}
                            </td>

                            <td>
                              {{ v.mfg }}
                            </td>

                            <td>
                              {{ v.exp }}
                            </td>
                            <td>
                              {{ v.received_at }}<br/>
                              {{ v.received_by }}
                            </td>
                           
                            <!-- <th class="text-right">
                              <label
                                for="modal-detail"
                                class="btn btn-ghost modal-button btn-xs"
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
                            </th> -->
                            <th class="text-right">
                              <label
                                for="modal-detail"
                                class="btn btn-ghost modal-button btn-xs"
                                @click="detail_edit(`${v.code}`, `${i}`)"
                              >
                                Detail
                              </label>
                              <!-- |
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
                              </label> -->
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  <!-- </div> -->
                </div>

                <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">ผู้ทำรายการ</span>
                    </label>
                    <input
                      type="text"
                      placeholder="วันที่เริ่มงาน"
                      class="input input-bordered border-base-content"
                      disabled
                      :value="`${user.firstname} ${user.lastname}`"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">status</span>
                    </label>

                    <label class="form-control w-full max-w-xs">
                      <select class="select select-bordered border-base-content" v-model="base.form.status">
                        <option disabled selected value="">เลือกรายการ</option>
                        <!-- <option value="pending">เตรียมจัดส่ง</option> -->
                        <option value="shipping" disabled>จัดส่งแล้ว</option>
                        <option value="receive">รับสินค้าแล้ว</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
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
            <h3 class="text-lg font-bold">Product</h3>
            <div class="card-body overflow-auto max-h-[60vh] ">
              <!-- <div class="form-control">
                <label class="label"
                  ><span class="label-text">Short code</span>
                </label>

                <AppModuleGlobalSelectSearch
                  :placeholder="'Short code'"
                  :label="'short_code'"
                  :code="'short_code'"
                  :minChar="3"
                  :delay="0.5"
                  :limit="10"
                  :customClass="`input input-bordered border-base-content`"
                  :disabled="checkbox == 'M' ? true : false"
                  :current="base.form.item_short_code"
                  :refresh="refresh.item_short_code"
                  @updateValue="
                    (obj) => {
                      base.form.item_short = obj;
                      base.form.item_short_code = obj.short_code;
                    }
                  "
                  @stopRefresh="
                    (obj) => {
                      refresh.item_short_code = obj.value;
                    }
                  "
                  :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort`"
                  :param="`&total=1&wh=${user.branchTitle}&action=groupby-code`"
                />
              </div> -->

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Product</span>
                </label>

                <!-- <AppModuleGlobalSelectSearch
                  :placeholder="'Product'"
                  :label="'ItemName'"
                  :code="'ItemCode'"
                  :minChar="3"
                  :delay="0.5"
                  :limit="10"
                  :customClass="`input input-bordered border-base-content`"
                  :current="detail.form.product_code"
                  :refresh="refresh"
                  @updateValue="
                    (obj) => {
                      detail.form.product_code = obj.ItemCode;
                      detail.form.product = obj.ItemName;
                    }
                  "
                  @stopRefresh="
                    (obj) => {
                      refresh = obj.value;
                    }
                  "
                  :url="
                    base.form.wh == 'UBA'
                      ? `${serviceUrl}api/controllers/SAP/UBA/oitm`
                      : `${serviceUrl}api/controllers/SAP/UBP/oitm`
                  "
                  :param="`&total=1&wh=wh1&rac_list=1`"
                /> -->
                <!-- :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelf`"
                      :param="`&total=1&action=count&transref=I&transref_type_null=1&wh=UBA&total=1`" -->

                <!-- <AppModuleGlobalSelectSearch
                      :placeholder="'บริษัท'"
                      :label="'title'"
                      :code="'code'"
                      :minChar="3"
                      :delay="0.5"
                      :limit="10"
                      :customClass="`input input-bordered border-base-content ${
                        checkbox == 'M' ? 'input-disabled' : ''
                      }`"
                      :disabled="checkbox == 'M' ? true : false"
                      :current="base.form.company"
                      :refresh="refresh"
                      @updateValue="
                        (obj) => {
                          base.form.company_data = obj;
                          base.form.company = obj.code;
                        }
                      "
                      @stopRefresh="
                        (obj) => {
                          refresh = obj.value;
                        }
                      "
                      :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/company`"
                      :param="`&total=1`"
                    /> -->
                <input
                  type="text"
                  placeholder="Product"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.product"
                  disabled
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
                  v-model="detail.form.lotNumber"
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
                />
              </div>
              <!-- <div class="form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.email"
                />
              </div>

              <th>ลำดับ</th>
                            <td>Product</td>
                            <td>Lot Number</td>
                            <td>Quantity</td>
                            <td>MFG</td>
                            <td>EPX</td> -->
            </div>
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-detail" class="btn btn-danger">Cancle</label>
              </div>
              <!-- <div class="flex-1 form-control mt-6">
                <button
                  class="btn btn-primary text-white"
                  @click="detail_save('static')"
                >
                  Confirm
                </button>
              </div> -->
              <div class="flex-1 form-control mt-6">
                <button
                  class="btn btn-primary text-white"
                  @click="detail_save('static')"
                >
                  Receive
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
        <div class="modal">
          <div class="modal-box relative">
            <label
              for="modal-remove"
              class="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 class="text-lg font-bold">Remove Item!</h3>
            <div class="card-body overflow-auto max-h-[60vh] ">
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

        <!-- <AppModuleGlobalShowImage :src="imageSrc" /> -->
      </template>
      <template #view>
        <!-- <div class="bg-red-500 border-2" v-for="v in transpotation">
          {{ v }}
        </div>
        <div class="bg-green-500 border-2" v-for="v in transpotationItem">
          {{ v }}
        </div> -->

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
                <!-- <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white"
                  @click="base_create()"
                  >Create</label
                > -->
              </div>
              <div class="overflow-x-auto w-full max-h-[60vh]">
                <table
                  class="table table-xs table-pin-rows table-pin-cols table-zebra"
                >
                  <thead>
                    <tr>
                      <th>ลำดับ</th>
                      <td>EN</td>
                      <td>Packing List</td>
                      <td>Shipping Mark</td>
                      <td>Shipping Date</td>
                      <td>Created At</td>
                      <td>Created By</td>
                      
                      <td>Status</td>
                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in base.rows" :key="v.code">
                      <th>{{ i + 1 }}</th>
                      <td>
                        {{ v.en }}
                      </td>

                      <td>
                        {{ v.packingList }}
                      </td>
                      <td>
                        {{ v.shippingMark }}
                      </td>
                      <td>
                        {{ v.shippingDate }}
                      </td>
                      <td>
                        {{ v.created_at }}
                      </td>
                      <td>
                        {{ v.created_by }}
                      </td>
                      <td>
                        {{ v.status }}
                      </td>

                      <th class="text-right">
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                          >receive
                        </label>
<!-- | -->
                        <!-- <label
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
                        </label> -->
                      </th>
                    </tr>
                  </tbody>
                </table>
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
// import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";

export default {
  name: "Department",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    // AppModuleGlobalShowImage,
  },
  data() {
    return {
      selectEN:'',
      loadimage: false,
      options: {
        penColor: "#c0f",
      },
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
      // imageSrc: null,
    };
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      // console.log("token");
      //console.log(this.$store.getters.user_token);
      return this.$store.getters.user_token;
    },
    user() {
      return this.$store.getters.user;
    },
    transpotationItem() {
      return this.$store.getters.transpotationItem;
    },
    transpotation() {
      return this.$store.getters.transpotation;
    },
  },
  methods: {
    changeData(){
      this.base.form = {...this.base.rows.find(v=>v.code==this.selectEN)}
    },
    // error() {
    //   this.loadimage = false;
    // },
    // loaded() {
    //   this.loadimage = true;
    // },

    change() {
      this.base_search();
    },

    // undo() {
    //   this.$refs.signaturePad.undoSignature();
    // },
    // save() {
    //   const { isEmpty, data } = this.$refs.signaturePad.saveSignature();

    //   alert("Open DevTools see the save data.");
    //   console.log(isEmpty);
    //   console.log(data);
    // },
    // change() {
    //   this.options = {
    //     penColor: "#00f",
    //   };
    // },
    // resume() {
    //   this.options = {
    //     penColor: "#c0f",
    //   };
    // },
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
      let data = this.transpotation.filter((v,i)=>v.status=='shipping')
      return callback({
        rows: data,
        total: data.length,
      });
      fetch(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/HR/employee?total=1&page=${this.base.page}${
          this.base.row ? `&rows=${this.base.row}` : ""
        }${this.base.q ? `&q=${this.base.q}` : ""}`,
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
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
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
          // callback([]);
          // localStorage.removeItem("user_token");
          // this.$router.push({ name: "AppLogin" });
          console.error("Error:", error);
        });
    },
    base_create() {
      this.base.current = 0;
      this.base.form = {
        code: this.makeid(5),
        status:''
      };
      console.log(this.base.form);
      this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.detail.rows = [];
      this.base.controll = "edit";
      this.detail_search();
      this.refresh = true;
    },
    base_save() {
      // this.base.form.created_at

      // this.base.form.code = "111111",
      // this.base.form.en= "product_1234",
      // this.base.form.packingList= "lotNumber_1234",
      // this.base.form.shippingMark= "111",
      // this.base.form.shippingDate= "2020-01-02",
      this.base.form.created_at= "2020-01-02"
      this.base.form.created_by= "tets"
      this.base.form.updated_at= "2020-01-02"
      this.base.form.updated_by= "tets"
      this.base.form.deleted_at= "2020-01-02"
      this.base.form.deleted_by= "tets"
      // this.base.form.status= "pending",


      let index = this.transpotation.findIndex(
        (v) => v.code == this.base.current
      );
      index >= 0
        ? (this.transpotation[index] = { ...this.base.form })
        : this.transpotation.push({ ...this.base.form });
      this.$store.commit("transpotation", this.transpotation);
      // console.log(index)
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
            // code: this.detail.rows[i - 1]["code"],
            // title: this.detail.rows[i - 1]["title"],


            
          code:this.detail.rows[i - 1]["code"],
          transpotation_code : this.detail.rows[i - 1]["transpotation_code"],
          product: this.detail.rows[i - 1]["product"],
          lotNumber: this.detail.rows[i - 1]["lotNumber"],
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

      let vm = this;
      fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/employee`, {
        method: this.base.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({
          code: this.base.current,
          uid: this.base.form.uid,
          firstname: this.base.form.firstname,
          lastname: this.base.form.lastname,
          current_password: this.base.form.current_password,
          password: this.base.form.new_password,
          confirm_password: this.base.form.confirm_password,
          email: this.base.form.email,
          tel: this.base.form.tel,
          birthdate: this.base.form.birthdate,
          department: this.base.form.department,
          branch: this.base.form.branch,
          company: this.base.form.company,
          position: this.base.form.position,
          started_at: this.base.form.started_at,
          leaves_at: this.base.form.leaves_at,
          access_code: this.base.form.access_code,
          // image: image ? [image] : "",
        }),
      })
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            this.base.modal = false;
            const promise_arr = [];
            console.log(this.base.current);
            if (this.base.current == 0) {
              this.base.current = res.row.code;
              let i = this.detail.rows.length;
              this.detail.controll = "create";
              for (i; i > 0; i--) {
                this.detail.form = {
                  code: this.detail.rows[i - 1]["code"],
                  title: this.detail.rows[i - 1]["title"],
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

            Promise.all(promise_arr)
              .then((res) => {
                // console.log(res);
                vm.base_search();
              })
              .catch((err) => console.error(err));
          }
        })
        .catch((error) => {
          console.error("Error:", error);
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
      let data = this.transpotationItem.filter(
        (v) => v.transpotation_code == this.base.form.code
      );
      return callback({ rows: data, total: data.length });
      fetch(
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/email?total=1&page=${
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
        }
      )
        .then((response) => response.json())
        .then((res) => {
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
        code: this.makeid(5),

        product: "",
        lotNumber: "",
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
      //   // console.log(v);
      //   this.detail.form.image[i] = Object.assign(
      //     {},
      //     this.detail.form.image[i]
      //   );
      // });

      // console.log(this.detail.form);
      // this.detail.form.image = JSON.parse(this.detail.form.image)

      // }, 5000);

      // this.base.form = this.base.rows[index]
      // this.detail.current = id;
      // this.detail_search();

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







        let detail =  {
          code: this.detail.form.code,
          transpotation_code : this.base.current,
          product: this.detail.form.product,
          lotNumber: this.detail.form.lotNumber,
          quantity: this.detail.form.quantity,
          mfg: this.detail.form.mfg,
          exp: this.detail.form.exp,
          created_at: "2020-01-02",
          created_by: "tets",
          updated_at: "2020-01-02",
          updated_by: "tets",
          deleted_at: "2020-01-02",
          deleted_by: "tets",

          received_at: "2020-01-02",
          received_by: "tets",
        }



        let index = this.transpotationItem.findIndex(
        (v) => v.code == detail.code
      );
      index >= 0
        ? (this.transpotationItem[index] = { ...detail })
        : this.transpotationItem.push({ ...detail });
      this.$store.commit("transpotationItem", this.transpotationItem);
      // console.log(index)
      this.detail.modal = false;
      
if (type == "static") {
  this.detail_search();
}
      return;







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

              if (type == "static") {
                this.detail_search();
              }

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
      //console.log(this.user_token);
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
/* 
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #000000, #000000);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.container {
  width: "100%";
  padding: 8px 16px;
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}
</style>

<template>
  <div class="Department">
    <AppLayout>
      <template #modal>
        <div class="drawer drawer-end z-50">
          <input id="drawer-search" type="checkbox" class="drawer-toggle" />
          <div class="drawer-side overflow-hidden">
            <label
              for="drawer-search"
              aria-label="close sidebar"
              class="drawer-overlay"
            ></label>
            <div class="p-4 w-80 min-h-full bg-base-200 text-base-content">
              <div class="grid gap-2 md:grid-cols-1 grid-cols-1 mb-4">
                <div class="form-control">
                  <button
                    class="btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    Receipt <span>No.</span>
                  </button>
                </div>
                <div class="grid gap-1">
                  <div class="form-control">
                    <input
                      type="text"
                      placeholder="Form No."
                      class="input input-sm input-bordered border-base-content"
                      v-model="search.receiptNo.from"
                    />
                  </div>
                  <div class="form-control">
                    <input
                      type="text"
                      placeholder="To No."
                      class="input input-sm input-bordered border-base-content"
                      v-model="search.receiptNo.to"
                    />
                  </div>
                </div>
              </div>

              <div class="grid gap-2 md:grid-cols-1 grid-cols-1 mb-4">
                <div class="form-control">
                  <button
                    class="btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    <span>Receipt</span> Date
                  </button>
                </div>
                <div class="grid gap-1">
                  <div class="form-control">
                    <input
                      type="date"
                      placeholder="title"
                      class="input input-sm input-bordered border-base-content"
                      v-model="search.receiptDate.from"
                    />
                  </div>
                  <div class="form-control">
                    <input
                      type="date"
                      placeholder="title"
                      class="input input-sm input-bordered border-base-content"
                      v-model="search.receiptDate.to"
                    />
                  </div>
                </div>
              </div>

              <div class="grid gap-2 md:grid-cols-1 grid-cols-1 mb-4">
                <div class="form-control">
                  <button
                    class="btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    Item Code
                  </button>
                </div>
                <div class="grid gap-1">
                  <div class="form-control">
                    <input
                      type="text"
                      placeholder="From Code"
                      class="input input-sm input-bordered border-base-content"
                      v-model="search.receiptDate.from"
                    />
                  </div>
                  <div class="form-control">
                    <input
                      type="text"
                      placeholder="To Code"
                      class="input input-sm input-bordered border-base-content"
                      v-model="search.receiptDate.to"
                    />
                  </div>
                </div>
              </div>

              <div class="grid gap-2 md:grid-cols-1 grid-cols-1 mb-4">
                <div class="form-control">
                  <button
                    class="btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    Item Code
                  </button>
                </div>
                <div class="grid gap-1">
                  <div class="form-control">
                    <input
                      type="search"
                      placeholder="Search"
                      class="input input-sm input-bordered border-base-content"
                      v-model="base.q"
                    />
                  </div>
                </div>
              </div>
              <div class="grid gap-2 md:grid-cols-1 grid-cols-1 mb-4">
                <div class="form-control">
                  <label
                    for="drawer-search"
                    class="lg:hidden join-item btn btn-sm btn-accent"
                    @click="searching"
                  >
                    <Icon icon="tabler:search" class="h-5 w-5 text-white"
                  /></label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- modal base -->
        <input
          type="checkbox"
          id="modal-base"
          class="modal-toggle"
          v-model="base.modal"
        />
        <div class="modal" v-if="base.modal">
          <div class="modal-box relative w-6/12 max-w-6xl">
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold">Results</h3>
            <div class="overflow-x-auto">
              <table class="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <th></th>
                    <td>Parameter</td>
                    <td>Specification</td>
                    <td>COA</td>
                    <td>Samping</td>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{{ base.form.U_Parameter }}</th>
                    <td>{{ base.form.U_Specification }}</td>
                    <td>{{ base.form.U_COA }}</td>
                    <td>
                      {{ base.form.U_ReAppearance || base.U_XBar || "-" }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-base" class="btn btn-danger">Cancel</label>
              </div>
              <div class="flex-1 form-control mt-6" @click="base_save()">
                <button class="btn btn-primary text-white">Confirm</button>
              </div>
            </div> -->
          </div>
        </div>
      </template>
      <template #view>
        <div class="grid grid-cols-1 gap-6 lg:px-10 lg:py-2">
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body overflow-auto">
              <div
                class="hidden md:grid lg:inline-flex lg:join w-full md:justify-center lg:justify-end"
              >
                <div class="join join-item md:justify-end mb-4 lg:mb-0">
                  <button
                    class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    Receipt No.
                  </button>
                  <input
                    type="text"
                    placeholder="From No."
                    class="join-item input input-sm input-bordered border-base-content"
                    v-model="search.receiptNo.from"
                  />

                  <input
                    type="text"
                    placeholder="To No."
                    class="join-item input input-sm input-bordered border-base-content"
                    v-model="search.receiptNo.to"
                  />
                </div>
                <div class="join join-item md:justify-end mb-4 lg:mb-0">
                  <button
                    class="lg:hidden join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    Receipt Date
                  </button>
                  <input
                    type="date"
                    placeholder="title"
                    class="join-item input input-sm input-bordered border-base-content"
                    v-model="search.receiptDate.from"
                  />
                  <button
                    class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    -
                  </button>
                  <input
                    type="date"
                    placeholder="title"
                    class="join-item input input-sm input-bordered border-base-content"
                    v-model="search.receiptDate.to"
                  />
                </div>
              </div>
              <div
                class="hidden md:grid lg:inline-flex xl:join w-full md:justify-center lg:justify-end"
              >
                <div class="join join-item md:justify-end mb-4 lg:mb-0">
                  <button
                    class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    Item Code
                  </button>
                  <AppModuleGlobalSelectSearch
                    :placeholder="'From Code'"
                    :label="'title'"
                    :code="'code'"
                    :minChar="3"
                    :delay="0.5"
                    :limit="10"
                    :customClass="`input input-bordered border-base-content input-sm join-item ${
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
                  />
                  <AppModuleGlobalSelectSearch
                    :placeholder="'To Code'"
                    :label="'title'"
                    :code="'code'"
                    :minChar="3"
                    :delay="0.5"
                    :limit="10"
                    :customClass="`input input-bordered border-base-content input-sm join-item ${
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
                  />
                  <!-- <input
                    type="text"
                    placeholder="From Code"
                    class="join-item input input-sm input-bordered border-base-content"
                    v-model="search.itemcode.from"
                  />
                  <input
                    type="text"
                    placeholder="To Code"
                    class="join-item input input-sm input-bordered border-base-content"
                    v-model="search.itemcode.to"
                  /> -->
                </div>
              </div>

              <div
                class="join w-full justify-center md:justify-center lg:justify-end"
              >
                <button
                  class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                  disabled
                >
                  สาขา
                </button>
                <select
                  class="join-item select select-sm select-bordered border-base-content w-auto max-w-xs"
                  v-model="wh"
                >
                  <!-- <option selected value="">ALL</option> -->
                  <option value="UBA">UBA</option>
                  <option value="UBP">UBP</option>
                </select>
                <AppModuleGlobalSearch
                  :class="'hidden md:block join-item input input-sm input-bordered border-base-content w-full max-w-xs'"
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

                <label
                  for="drawer-search"
                  class="md:hidden join-item btn btn-sm btn-accent"
                >
                  <Icon icon="tabler:search" class="h-5 w-5 text-white"
                /></label>
                <button class="hidden md:block join-item btn btn-sm btn-accent">
                  <Icon
                    icon="tabler:search"
                    class="h-5 w-5 text-white"
                    @click="searching"
                  />
                </button>
                <button
                  class="join-item btn btn-sm btn-primary"
                  @click="exportExcel()"
                >
                  <Icon
                    icon="mdi:file-excel-outline"
                    class="h-5 w-5 text-white"
                  />
                </button>
              </div>
              <div class="overflow-x-auto w-full max-h-[60vh]">
                <table
                  class="table table-xs table-pin-rows table-pin-cols table-zebra"
                >
                  <thead>
                    <tr>
                      <th>Receipt No.</th>
                      <td>Receipt Date</td>
                      <td>Lot No.</td>
                      <td>RM Code</td>
                      <td>RM Name</td>
                      <td>Expire Date</td>
                      <td>Supplier Name</td>
                      <td>Supplier Lot No.</td>
                      <td class="text-right">Quantity</td>
                      <td>Checker</td>
                      <td>Approver</td>
                      <td>Results</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in base.rows" :key="v.DocEntry">
                      <td>{{ v.U_ReceiptNO }}</td>
                      <td>
                        {{
                          v.U_DateRe
                            ? $moment(v.U_DateRe.date).format("YYYY-MM-DD")
                            : "-"
                        }}
                      </td>
                      <td>{{ v.U_LotNo }}</td>
                      <td>{{ v.U_ItemNo }}</td>
                      <td>{{ v.ItemName }}</td>
                      <td>
                        {{
                          v.U_ExpireDate
                            ? $moment(v.U_ExpireDate.date).format(
                                "YYYY-MM-DD"
                              )
                            : "-"
                        }}
                      </td>
                      <td>{{ v.U_SupName }}</td>
                      <td>{{ v.U_SupLot }}</td>
                      <td class="text-right">
                        {{
                          new Intl.NumberFormat("th-TH", {
                            minimumFractionDigits: 2,
                          }).format(v.U_ReAmount)
                        }}
                      </td>
                      <td>{{ v.U_Inspected }}</td>
                      <td>
                        {{ v.U_Approve == null ? "-" : v.U_Approve }}
                      </td>
                      <th>
                        <label
                          for="modal-base"
                          class="btn btn-link modal-button btn-xs"
                          @click="base_edit(`${v.DocEntry}`, `${i}`)"
                        >
                          Results
                        </label>
                      </th>
                      <!-- <td>'+rowResult(x.item) }} <button class="btn btn-sm btn-success btnExportRow" docentry="{{ v.DocEntry }}"><i class="bi bi-file-earmark-spreadsheet"></i> Excel</button></td> -->
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
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "Department",
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
      search: {
        receiptNo: {
          from: "",
          to: "",
        },
        receiptDate: {
          from: "",
          to: "",
        },
        itemcode: {
          from: "",
          to: "",
        },
      },
      wh: "UBA",
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
      imagerow: null,
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
  },
  methods: {
    searching() {
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
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/SAP/UBP/QC/rm_inspec?total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
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
      this.base.current = 0;
      this.base.form = {
        uid: "",
        firstname: "",
        lastname: "",
        current_password: "",
        new_password: "",
        confirm_password: "",
        email: "",
        tel: "",
        birthdate: "",
        department: "",
        branch: "",
        company: "",
        position: "",
        started_at: "",
        leaves_at: "",
        title: "",
        link: "",
        type: "",
        // imageLink_empty: "",
        // image_empty: [],
        // imageLink_active: "",
        // image_active: [],
        imageLink: "",
        image: [],
      };
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
      let vm = this;

      let image = { ...this.base.form.image[0] };
      delete image.temp;

      if (this.base.controll != "create") {
        if (
          !this.base.form.current_password ||
          !this.base.form.new_password ||
          !this.base.form.confirm_password
        ) {
          // console.log("ASD")
        }
      } else {
        this.base.form.new_password = this.base.form.uid;
      }

      let obj = {
        rows: [
          {
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
            access: this.base.form.access,
            image: [image],
          },
        ]
      };

      new Query('base', this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/SAP/UBP/QC/rm_inspec`, obj, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
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
      });
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

        console.log(this.detail.rows);
      });
    },
    detail_get(callback) {
      new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/email?total=1&page=${
          this.detail.page
        }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
          this.detail.q ? `&q=${this.detail.q}` : ""
        }${this.base.current ? `&current=${this.base.current}` : ``}`, (res) => {
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
      // console.log("detail_create");
      // this.clearimage();
      this.detail.current = 0;
      // console.log("callback");
      // this.detail.rows = [];
      this.detail.form = {
        code: "",
        title: "",
        price: "",
        image: [],
        imageLink: "",
        color: "",
        color_code: "",
        link: "",
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
      this.detail.form.image.forEach((v, i) => {
        // console.log(v);
        this.detail.form.image[i] = Object.assign(
          {},
          this.detail.form.image[i]
        );
      });

      // console.log(this.detail.form);
      // this.detail.form.image = JSON.parse(this.detail.form.image)

      // }, 5000);

      // this.base.form = this.base.rows[index]
      this.detail.current = id;
      // this.detail_search();

      this.detail.controll = "edit";
    },
    detail_save(type) {
      if (!this.base.current) {
        if (this.detail.controll == "create") {
          this.detail.form.code = this.detail.rows.length;
          this.detail.rows = [{ ...this.detail.form }].concat(this.detail.rows);
          // this.detail.rows.push({ ...this.detail.form });
          this.detail.modal = false;
        } else {
          //  this.detail.form.id = this.detail.rows.length
          let index = this.detail.rows.findIndex(
            (v) => v.code == this.detail.current
          );
          this.detail.rows[index] = { ...this.detail.form };

          // this.detail.rows.push({ ...this.detail.form });
          this.detail.modal = false;
        }
      } else {
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

        new Query('base', this.detail.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/email`, obj, (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            this.detail.modal = false;

            if (type == "static") {
              this.detail_search();
            }
            // this.base_search();
          }
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
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
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
      this.wh = this.user.branchTitle;
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

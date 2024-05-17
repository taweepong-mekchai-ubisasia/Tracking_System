<template>
  <div class="QAIndirectItem">
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
            class="modal-box relative w-10/12 lg:w-10/12 xl:w-6/12 max-w-5xl"
          >
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold">
              Item Master : {{ base.form.code }}
            </h3>
            <div
              class="bg-base-100 border-base-300 rounded-box p-6 overflow-auto w-full max-h-[60vh]"
            >
              <div class="grid gap-4 lg:grid-cols-2 grid-cols-1">
                <div
                  class="grid gap-4 md:grid-cols-1 grid-cols-1 justify-items-center border-2 overflow-hidden"
                >
                  <div class="avatar">
                    <div
                      class="mask mask-square w-auto max-h-[30vh] lg:max-h-full"
                    >
                      <label
                        for="modal_showImage"
                        class="btn btn-link p-0 h-full"
                        @click="
                          base.form.image.length > 0
                            ? (imageSrc = `${
                                base.form.image[
                                  base.form.master ? base.form.master : 0
                                ].temp
                                  ? `${serviceUrl}tmps/image/`
                                  : base.form.imageLink
                                  ? `${base.form.imageLink}QAIndirectItem/${base.form.code}/`
                                  : `${serviceUrl}tmps/image/`
                              }${
                                base.form.image[
                                  base.form.master ? base.form.master : 0
                                ].file
                              }`)
                            : ''
                        "
                      >
                        <img
                          v-if="base.form.image.length > 0"
                          :src="`${
                            base.form.image[
                              base.form.master ? base.form.master : 0
                            ].temp
                              ? `${serviceUrl}tmps/image/`
                              : base.form.imageLink
                              ? `${base.form.imageLink}QAIndirectItem/${base.form.code}/`
                              : `${serviceUrl}tmps/image/`
                          }${
                            base.form.image[
                              base.form.master ? base.form.master : 0
                            ].file
                          }`"
                          alt="Image"
                          style="object-fit: contain"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="grid gap-4 md:grid-cols-1 grid-cols-1 text-left">
                  <div class="form-control block">
                    <b>Ref Code : </b>{{ base.form.ref_code }}
                  </div>
                  <div class="form-control block">
                    <b>Title : </b>{{ base.form.title }}
                  </div>

                  <div class="grid gap-4 grid-cols-3">
                    <div class="form-control block">
                      <b>Issue : </b
                      >{{ base.form.Export ? base.form.Export : 0 }}
                    </div>

                    <div class="form-control block">
                      <b>Receive : </b
                      >{{ base.form.Import ? base.form.Import : 0 }}
                    </div>
                    <div class="form-control block">
                      <b>Amount : </b
                      >{{ base.form.amount ? base.form.amount : 0 }}
                    </div>
                  </div>
                  <div class="form-control block">
                    <b>Current Price : </b
                    >{{ base.form.current_price ? base.form.current_price : 0 }}
                  </div>
                  <div class="form-control block">
                    <b>Description : </b>{{ base.form.description }}
                  </div>

                  <div class="form-control border-2">
                    <div class="w-full overflow-auto max-h-[20vh]">
                      <!-- <label class="label cursor-pointer">
                          <span class="label-text">Item List</span>
                        </label> -->
                      <!-- {{ detail.rows }} -->
                      <table
                        class="table table-xs table-pin-rows table-pin-cols table-zebra"
                      >
                        <thead>
                          <tr>
                            <!-- <th>Active</th> -->

                            <th>Creation</th>
                            <!-- <th>imageLink</th> -->
                            <!-- <td>Title</td> -->
                            <td>Result</td>
                            <!-- <td>Price</td> -->
                            <!-- <td>
                                {{
                                  base.form.status == "export" ? "Issue" : ""
                                }}
                              </td> -->

                            <!-- <th>Color</th>

                        <th>Price</th>8850029031828

                        <th>Link</th> -->
                            <th class="text-right">
                              <label
                                for="modal-detail"
                                class="btn btn-primary modal-button btn-xs text-white"
                                @click="detail_create()"
                                >Add
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
                            <th>
                              <div class="flex items-center space-x-3">
                                <div>
                                  <div class="font-bold">
                                    {{ v.code }}
                                  </div>
                                  <div>
                                    {{ v.created_at }}
                                  </div>
                                  <div>
                                    {{ v.created_fullname }}
                                  </div>
                                </div>
                              </div>
                            </th>
                            <td>
                              <div class="flex items-center space-x-3">
                                <div>
                                  <div class="font-bold">Qty : {{ v.qty }}</div>
                                  <div class="text-sm">
                                    Price Per Unit : {{ v.price }}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <!-- <td>{{ v.qty }}<br/>{{ v.price }}</td> -->
                            <td v-if="base.form.status == 'export'">
                              {{ v.issue }}
                            </td>
                            <!-- <td>
                            <a :href="v.link" target="_blank">
                              <font-awesome-icon
                                v-if="v.link"
                                icon="fa-solid fa-globe"
                                size="1x"
                                class="btn btn-ghost modal-button btn-xs"
                            /></a>
                          </td> -->
                            <th v-else class="text-right">
                              <!-- <label
                                  for="modal-detail"
                                  class="btn btn-link modal-button btn-xs"
                                  @click="detail_edit(`${v.code}`)"
                                >
                                  แก้ไข
                                </label>
                                | -->
                              <label
                                for="modal-remove"
                                class="btn btn-ghost modal-button btn-xs"
                                @click="
                                  remove_item(
                                    v,
                                    `${v.code}`,
                                    'detail',
                                    'controllers/MYSQL/INTERNAL/QA/Indirect/transaction'
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
                </div>
              </div>
            </div>
            <!-- </div> -->

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
                <label for="modal-remove" class="btn btn-danger">Cancel</label>
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
        <!-- Open the modal using ID.showModal() method -->

        <!-- The button to open modal -->

        <!-- Put this part before </body> tag -->
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
            <h3 class="text-lg font-bold">Qty</h3>
            <div class="card-body overflow-auto max-h-[60vh]">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Qty</span>
                </label>
                <input
                  type="number"
                  placeholder="Qty"
                  class="input input-bordered border-base-content"
                  value="0"
                  min="0"
                  v-model="detail.form.qty"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Price Per Unit</span>
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  class="input input-bordered border-base-content"
                  value="0"
                  min="0"
                  v-model="detail.form.price"
                />
              </div>
            </div>
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-detail" class="btn btn-danger">Cancel</label>
              </div>
              <div class="flex-1 form-control mt-6">
                <button
                  class="btn btn-primary text-white"
                  @click="detail_save('static')"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        <AppModuleGlobalShowImage :src="imageSrc" />
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
                      <th>id</th>
                      <!-- <td>รูป</td> -->
                      <td>ข้อมูลผู้พนักงาน</td>
                      <td>ติดต่อ</td>
                      <td>ตำแหน่ง</td>
                      <td>สิทธิ์การใช้งาน</td>
                      <td>วันที่</td>
                      <td>บันทึก</td>
                      <td>แก้ไข</td>
                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in base.rows" :key="v.code">
                      <th>{{ v.id }}</th>
                      <td class="text-center">
                        <div class="flex items-center gap-3">
                          <div class="avatar">
                            <div class="mask mask-square w-12 h-12">
                              <label
                                for="modal_showImage"
                                class="btn btn-link p-0"
                                @click="
                                  v.image.length > 0
                                    ? (imageSrc = `${
                                        v.image[v.master ? v.master : 0].temp
                                          ? `${serviceUrl}tmps/image/`
                                          : v.imageLink
                                          ? `${v.imageLink}QAIndirectItem/${v.code}/`
                                          : `${serviceUrl}tmps/image/`
                                      }${
                                        v.image[v.master ? v.master : 0].file
                                      }`)
                                    : ''
                                "
                              >
                                <img
                                  v-if="v.image.length > 0"
                                  :src="`${
                                    v.image[v.master ? v.master : 0].temp
                                      ? `${serviceUrl}tmps/image/`
                                      : v.imageLink
                                      ? `${v.imageLink}QAIndirectItem/${v.code}/`
                                      : `${serviceUrl}tmps/image/`
                                  }${v.image[v.master ? v.master : 0].file}`"
                                  alt="Image"
                                  style="object-fit: contain"
                                />
                                <img
                                  width="auto"
                                  height="auto"
                                  class="max-h-44 object-cover bg-cover"
                                  v-else
                                  :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyImage.jpg&s=10`"
                                  alt="Image"
                                />
                              </label>
                            </div>
                          </div>
                          <div class="text-left">
                            <div class="font-bold">
                              <span class="pr-2">{{ v.firstname }}</span>
                              <span>{{ v.lastname }}</span>
                            </div>

                            <div class="text-sm">รหัสพนักงาน : {{ v.uid }}</div>
                            <div class="text-xs">
                              {{ v.code }}
                            </div>
                          </div>
                        </div>

                        <!-- <div class="avatar w-auto">
                          <label
                            for="modal_showImage"
                            class="btn btn-link p-0"
                            @click="imageSrc = row"
                          >
                            <img
                              v-if="v.image.length > 0"
                              :src="`${
                                v.image[v.master ? v.master : 0].temp
                                  ? `${serviceUrl}tmps/image/`
                                  : v.imageLink
                                  ? v.imageLink
                                  : `${serviceUrl}tmps/image/`
                              }${v.image[v.master ? v.master : 0].file}`"
                              alt="Image"
                            />
                          </label>
                        </div> -->
                      </td>
                      <!-- <td>
                        <div>
                          <div class="font-bold">
                            <span class="pr-2">{{ v.firstname }}</span>
                            <span>{{ v.lastname }}</span>
                          </div>

                          <div class="text-sm">รหัสพนักงาน : {{ v.uid }}</div>
                          <div class="text-xs">
                            {{ v.code }}
                          </div>
                        </div>
                      </td> -->
                      <td>
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
                                v.created_fullname ? v.created_fullname : "-"
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
                                v.updated_fullname ? v.updated_fullname : "-"
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
                          >Detail
                        </label>

                        <!-- <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/QA/Indirect/item'
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
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalScannerDetect from "@/components/App/Module/Global/ScannerDetect.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "QAIndirectItem",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalScannerDetect,
  },
  data() {
    return {
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
  },
  methods: {
    error() {
      this.loadimage = false;
    },
    loaded() {
      this.loadimage = true;
    },

    change() {
      this.base_search();
    },

    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();

      alert("Open DevTools see the save data.");
      console.log(isEmpty);
      console.log(data);
    },
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

    // base
    base_search(callback = null) {
      this.base.loading = true;
      this.base_get((res) => {
        this.base.rows = res.rows;
        this.base.total = res.total;
        this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
        this.base.back = this.base.page > 1 ? true : false;
        this.base.loading = false;
        callback ? callback(res) : "";
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/item?total=1&page=${
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
        ref_code: "",
        title: "",
        description: "",
        imageLink: "",
        image: [],
      };
      this.detail.rows = [];
      this.scan = false;
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.detail.rows = [];
      this.base.controll = "edit";
      this.detail_search();
      this.refresh = true;
      this.scan = false;
    },
    base_save() {
      let obj = {
        code: this.base.current,
        rows: [
          {
            ...Object.assign({ ...this.base.form }),
          },
        ],
      };

      new Query('base', this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/company`, obj, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
        } else {
          base.page = 1;
          this.base.modal = false;
          this.base_search();
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
      new Query('detail','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction?total=1&status=import&page=${
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
      this.detail.current = 0;
      this.detail.form = {
        code: "",
      };
      this.detail.controll = "create";
    },
    detail_edit(code, index) {
      this.detail.current = code;
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.controll = "edit";
    },
    detail_save(type) {
      let obj = {
        code: this.detail.current,
        rows: [
          {
            ...Object.assign({ ...this.detail.form }),
            item: this.base.current,
            status: "import",
          },
        ],
      };

      new Query('detail', this.detail.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction`, obj, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
        } else {
          this.detail.modal = false;
          if (type == "static") {
            this.detail_search();
          }
          this.base_search(() => {
            let index = this.base.rows.findIndex(
              (v) => v.code == this.base.current
            );
            this.base.form = { ...this.base.rows[index] };
          });
          // let amount =
          //   parseInt(
          //     res.price[0].rows[0]["qty_old"] ? res.price[0].rows[0]["qty_old"] : 0
          //   ) +
          //   parseInt(res.price[0].rows[0]["qty_new"] ? res.price[0].rows[0]["qty_new"] : 0);

          // let Import =
          //   parseInt(this.base.form.Import ? this.base.form.Import : 0) +
          //   parseInt(res.price[0].rows[0]["qty_new"] ? res.price[0].rows[0]["qty_new"] : 0);
          // this.base.form.amount = amount;
          // this.base.form.Import = Import;
          // this.base.form.amount = amount;
          // this.base.form.current_price = res.price[0].rows[0]["current_price"];

          // this.base.rows.map((v) => {
          //   if (v.code == this.base.current) {
          //     v.amount = amount;
          //     v.current_price = res.price[0].rows[0]["current_price"];
          //     v.Import = Import
          //     return v
          //   }

          // });
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
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            this.remove.modal = false;
            this[`${this.remove.controll}_search`]();
            this.base_search(() => {
              let index = this.base.rows.findIndex(
                (v) => v.code == this.base.current
              );
              this.base.form = { ...this.base.rows[index] };
            });
          }
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

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
          <div class="modal-box relative w-10/12 lg:w-6/12 max-w-5xl">
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold">Item Master</h3>

            <!-- <div role="tablist" class="tabs tabs-lifted">
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                class="tab"
                aria-label="Information"
                checked
              /> -->
            <div
              class="bg-base-100 border-base-300 rounded-box p-6 overflow-auto w-full"
              style="max-height: 60vh"
            >
              <div class="grid gap-4 md:grid-cols-1 grid-cols-1">
                <AppModuleGlobalUpload
                  :imageLink="`${base.form.imageLink}QAIndirectItem/${base.form.code}/`"
                  :image="base.form.image"
                  :id="'base'"
                  :multiple="false"
                  @respone="
                    (res) => {
                      let length = base.form.image.length
                        ? base.form.image.length
                        : 0;
                      base.form.image = base.form.image.concat(res.image);
                    }
                  "
                  @resetdata="
                    (res) => {
                      base.form.image = [...res.image];
                    }
                  "
                />
              </div>
              <div class="form-control pt-4" v-if="fnScan">
                <!-- <label class="label"
                    ><span class="label-text">Item Description</span>
                  </label> -->
                <!-- {{ scan }} -->
                <AppModuleGlobalScannerDetect
                  @response="
                    (res) => {
                      base.form.ref_code = res;
                    }
                  "
                />
              </div>
              <!-- <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">รหัสรายการ</span>
                    </label>
                    <input
                      type="text"
                      placeholder="ชื่อ"
                      class="input input-bordered"
                      v-model="base.form.firstname"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">ชื่อรายการ</span>
                    </label>
                    <input
                      type="text"
                      placeholder="นามสกุล"
                      class="input input-bordered"
                      v-model="base.form.lastname"
                    />
                  </div>
                </div> -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Code</span>
                </label>
                <!-- <div class="join w-full"> -->
                <!-- <div> -->
                <!-- <div> -->
                <input
                  class="input input-bordered join-item w-full"
                  placeholder="Code"
                  v-model="base.form.ref_code"
                />
                <!-- </div> -->
                <!-- </div> -->
                <!-- <select class="select select-bordered join-item">
    <option disabled selected>Filter</option>
    <option>Sci-fi</option>
    <option>Drama</option>
    <option>Action</option>
  </select> -->
                <!-- <div class="indicator"> -->
                <!-- <span class="indicator-item badge badge-secondary">new</span>  -->
                <!-- <button class="btn join-item btn-primary" @click="scan=true" v-if="!scan">
                    <Icon icon="tdesign:scan" class="w-5 h-6 text-white" />
                  </button>
                  <button class="btn join-item btn-error" @click="scan=false" v-if="scan">
                    <Icon icon="fluent-mdl2:cancel" class="w-5 h-6 text-white" />
                    
                  </button> -->
                <!-- </div> -->
                <!-- </div> -->
                <!-- <input
                  type="text"
                  placeholder="Code"
                  class="input input-bordered"
                  v-model="base.form.ref_code"
                /> -->
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  class="input input-bordered"
                  v-model="base.form.title"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Description</span>
                </label>

                <textarea
                  class="textarea textarea-bordered h-24"
                  placeholder="Description"
                  v-model="base.form.description"
                ></textarea>
              </div>
            </div>
            <!-- </div> -->

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
            <div class="card-body overflow-auto" style="max-height: 60vh">
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
        <!-- Open the modal using ID.showModal() method -->

        <!-- The button to open modal -->

        <!-- Put this part before </body> tag -->

        <AppModuleGlobalShowImage :src="imageSrc" />
      </template>
      <template #view>
        <div class="grid grid-cols-1 gap-6 lg:px-10 lg:py-2">
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body overflow-auto">
              <div class="join mt-5 w-full md:justify-center lg:justify-end">
                <AppModuleGlobalSearch
                  :class="'join-item input input-sm input-bordered w-full max-w-xs'"
                  @search="
                    (q) => {
                      base.q = q;
                      base.page = 1;
                      base_search();
                    }
                  "
                />
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
                    <tr v-for="(row, index) in base.rows" :key="row.code">
                      <th>{{ row.id }}</th>
                      <td class="text-center">
                        <div class="flex items-center gap-3">
                          <div class="avatar">
                            <div class="mask mask-square w-12 h-12">
                              <label
                                for="modal_showImage"
                                class="btn btn-link p-0"
                                @click="
                                  row.image.length > 0
                                    ? (imageSrc = `${
                                        row.image[row.master ? row.master : 0]
                                          .temp
                                          ? tmpsLink
                                          : row.imageLink
                                          ? `${row.imageLink}QAIndirectItem/${row.code}/`
                                          : tmpsLink
                                      }${
                                        row.image[row.master ? row.master : 0]
                                          .file
                                      }`)
                                    : ''
                                "
                              >
                                <img
                                  v-if="row.image.length > 0"
                                  :src="`${
                                    row.image[row.master ? row.master : 0].temp
                                      ? tmpsLink
                                      : row.imageLink
                                      ? `${row.imageLink}QAIndirectItem/${row.code}/`
                                      : tmpsLink
                                  }${
                                    row.image[row.master ? row.master : 0].file
                                  }`"
                                  alt="Image"
                                  style="object-fit: contain"
                                />
                              </label>
                            </div>
                          </div>
                          <div class="text-left">
                            <div class="font-bold">
                              <span class="pr-2">{{ row.firstname }}</span>
                              <span>{{ row.lastname }}</span>
                            </div>

                            <div class="text-sm">
                              รหัสพนักงาน : {{ row.uid }}
                            </div>
                            <div class="text-xs">
                              {{ row.code }}
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
                              v-if="row.image.length > 0"
                              :src="`${
                                row.image[row.master ? row.master : 0].temp
                                  ? tmpsLink
                                  : row.imageLink
                                  ? row.imageLink
                                  : tmpsLink
                              }${row.image[row.master ? row.master : 0].file}`"
                              alt="Image"
                            />
                          </label>
                        </div> -->
                      </td>
                      <!-- <td>
                        <div>
                          <div class="font-bold">
                            <span class="pr-2">{{ row.firstname }}</span>
                            <span>{{ row.lastname }}</span>
                          </div>

                          <div class="text-sm">รหัสพนักงาน : {{ row.uid }}</div>
                          <div class="text-xs">
                            {{ row.code }}
                          </div>
                        </div>
                      </td> -->
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">
                              {{ row.emailTitle ? row.emailTitle : "-" }}
                            </div>
                            <div class="text-sm">
                              tel : {{ row.tel ? row.tel : "-" }}
                            </div>
                            <div class="text-sm">
                              วันเกิด :
                              {{
                                row.birthdate &&
                                $moment(row.birthdate).format("YYYY-MM-DD") >
                                  "2000"
                                  ? $moment(row.birthdate).format("YYYY-MM-DD")
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
                              {{ row.position ? row.position : "-" }}
                            </div>
                            <div class="text-sm">
                              แผนก : {{ row.depTitle ? row.depTitle : "-" }}
                            </div>
                            <div class="text-sm">
                              สาขา :
                              {{ row.branchTitle ? row.branchTitle : "-" }}
                            </div>
                            <div class="text-sm">
                              {{ row.companyTitle ? row.companyTitle : "-" }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">
                              {{ row.accessTitle ? row.accessTitle : "-" }}
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
                                row.started_at &&
                                $moment(row.started_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? $moment(row.started_at).format("YYYY-MM-DD")
                                  : "-"
                              }}
                            </div>
                            <div class="text-sm">
                              สิ้นสุด :
                              {{
                                row.leaves_at &&
                                $moment(row.leaves_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? $moment(row.leaves_at).format("YYYY-MM-DD")
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
                                row.created_at &&
                                $moment(row.created_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? row.created_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs opacity-30">
                              {{
                                row.created_fullname
                                  ? row.created_fullname
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
                                row.updated_at &&
                                $moment(row.updated_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? row.updated_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs opacity-30">
                              {{
                                row.updated_fullname
                                  ? row.updated_fullname
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
                          @click="base_edit(`${row.code}`, `${index}`)"
                          >edit
                        </label>

                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${row.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/QA/Indirect/item'
                            )
                          "
                          >remove
                        </label>
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
      tmpsLink: "",
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
    fnScan() {
      return this.$store.getters.fnScan;
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
      fetch(
        `${
          this.serviceUrl
        }controllers/MYSQL/INTERNAL/QA/Indirect/item?total=1&page=${
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
          if (res.rows.length > 0) {
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
      let vm = this;

      let image = this.base.form.image[0]
        ? { ...this.base.form.image[0] }
        : null;
      image ? delete image.temp : "";
      // console.log(this.base.form)
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
      fetch(`${this.serviceUrl}controllers/MYSQL/INTERNAL/QA/Indirect/item`, {
        method: this.base.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({
          code: this.base.current,
          ref_code: this.base.form.ref_code,
          title: this.base.form.title,
          description: this.base.form.description,
          image: image ? [image] : "",
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
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
      fetch(
        `${
          this.serviceUrl
        }controllers/MYSQL/INTERNAL/QA/Indirect/item?total=1&page=${
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
        fetch(`${this.serviceUrl}controllers/MYSQL/INTERNAL/QA/Indirect/item`, {
          method: this.detail.controll == "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
          body: JSON.stringify(obj),
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.success) {
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
      fetch(`${this.serviceUrl}${this.remove.tb}`, {
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
          if (res.success) {
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
      console.log(this.user_token);
      this.base_search();
      this.tmpsLink = `${
        window.location.origin == "http://localhost:8081"
          ? `http://localhost:8080/kay/rewrite_demo/services/`
          : `${window.location.origin}/services/`
      }tmps/`;
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

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
          <div class="modal-box relative w-10/12 lg:w-6/12 max-w-full">
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold">Request Doc</h3>

            <div
              class="bg-base-100 border-base-300 rounded-box p-6 overflow-auto w-full"
              style="max-height: 60vh"
            >
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
              <div class="form-control pt-4">
                <div class="w-full overflow-auto">
                  <label class="label cursor-pointer">
                    <span class="label-text">Email</span>
                  </label>
                  <table
                    class="table table-xs table-pin-rows table-pin-cols table-zebra"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>ItemCode</th>
                        <th>Item</th>
                        <th>Qty</th>
                        <!-- <th>Email</th> -->
                        <!-- <th>Color</th>

                        <th>Price</th>
                        <th>Link</th> -->
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
                        v-for="(row, index) in detail.rows"
                        :key="index"
                      >
                      <th>
                        <!-- {{row}} -->
                          {{index+1}}
                        </th>
                        <td>
                          <!-- <div class="flex items-center space-x-3">
                            <div>
                              <div class="font-bold">{{ row.ref_code }}</div>
                              <div class="text-sm"> -->
                                {{ row.item }}
                              <!-- </div>
                            </div>
                          </div> -->
                        </td>
                      <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="font-bold">{{ row.title }}</div>
                              <div class="text-sm">
                                {{ row.ref_code }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <!-- <div class="flex items-center space-x-3"> -->
                            <!-- <div> -->
                              <div class="font-bold">{{ row.qty }}</div>
                              <!-- <div class="text-sm">
                                {{ row.ref_code }}
                              </div> -->
                            <!-- </div>
                          </div> -->
                        </td>
                      

                        <!-- <td>{{ row.price }}</td> -->
                        <!-- <td>
                            <a :href="row.link" target="_blank">
                              <font-awesome-icon
                                v-if="row.link"
                                icon="fa-solid fa-globe"
                                size="1x"
                                class="btn btn-ghost modal-button btn-xs"
                            /></a>
                          </td> -->
                        <th class="text-right">
                          <label
                            for="modal-detail"
                            class="btn btn-link modal-button btn-xs"
                            @click="detail_edit(`${row.code}`)"
                          >
                            แก้ไข
                          </label>
                          |
                          <label
                            for="modal-remove"
                            class="btn btn-ghost modal-button btn-xs"
                            @click="
                              remove_item(
                                `${row.code}`,
                                'detail',
                                'controllers/MYSQL/INTERNAL/QA/Indirect/request_item'
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

        <!-- modal detail -->
        <input
          type="checkbox"
          id="modal-detail"
          class="modal-toggle"
          v-model="detail.modal"
        />
        <div class="modal" v-if="detail.modal">
          <div class="modal-box relative w-10/12 lg:w-6/12 xl:w-4/12 max-w-full">
            <label
              for="modal-detail"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕</label
            >
            <h3 class="text-lg font-bold">Request Item</h3>
            <div class="card-body overflow-auto" style="max-height: 60vh">
              <div class="form-control">
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
                      :customClass="`input input-bordered ${
                        checkbox == 'M' ? 'input-disabled' : ''
                      }`"
                      :disabled="checkbox == 'M' ? true : false"
                      :current="detail.form.access_code"
                      :refresh="refresh"
                      @updateValue="
                        (obj) => {
                          // detail.form.access_data = obj;
                          // detail.form.access_code = obj ? obj.code : '';
                          detail.form.item = obj ? obj.code : '';
                          detail.form.ref_code = obj ? obj.ref_code : '';
                          detail.form.title = obj ? obj.title : '';
                        }
                      "
                      :url="`${this.serviceUrl}controllers/MYSQL/INTERNAL/QA/Indirect/item`"
                      :param="`&total=1`" :image="false"
                    />
                <!-- <input
                  type="email"
                  placeholder="Email"
                  class="input input-bordered"
                  v-model="detail.form.email"
                /> -->
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Item Ref Code</span>
                </label>
                <input
                  type="text"
                  placeholder="Ref Code"
                  class="input input-bordered"
                  v-model="detail.form.ref_code"
                  :disabled="true"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Item Code</span>
                </label>
                <input
                  type="text"
                  placeholder="Item Code"
                  class="input input-bordered"
                  v-model="detail.form.item"
                  :disabled="true"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Qty</span>
                </label>
                <input
                  type="number"
                  placeholder="Qty"
                  class="input input-bordered"
                  v-model="detail.form.qty"
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
                  @click="detail_save('static')"
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
                      
                      <th>#</th>
                      <!-- <td>รูป</td> -->
                      <td>รหัส</td>
                      <td>รายการ</td>
                      <td>รายละเอียด</td>
                      <!-- <td>สิทธิ์การใช้งาน</td> -->
                      <!-- <td>วันที่</td> -->
                      <td>บันทึก</td>
                      <td>แก้ไข</td>
                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in base.rows" :key="row.code">
                      <th>{{ row.id }}</th>
                      <td>{{ row.code }}</td>
                      <td>{{ row.title }}</td>
                      <td>{{ row.description }}</td>
                   
                 
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
                              'controllers/MYSQL/INTERNAL/QA/Indirect/request'
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
      console.log("TOKEN");
      console.log(this.$store.getters.user_token);
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
        }controllers/MYSQL/INTERNAL/QA/Indirect/request?total=1&page=${this.base.page}${
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
          // this.$router.push({name:"AppLogin"})
          console.error("Error:", error);
        });
    },
    base_create() {
      this.base.current = 0;
      this.base.form = {
        title: "",
        description: "",
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

      // let image = this.base.form.image[0]
      //   ? { ...this.base.form.image[0] }
      //   : null;
      // image ? delete image.temp : "";
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
      fetch(`${this.serviceUrl}controllers/MYSQL/INTERNAL/QA/Indirect/request`, {
        method: this.base.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({
          code: this.base.current,
          title: this.base.form.title,
          description: this.base.form.description,
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
                // this.detail.form = {
                //   code: this.detail.rows[i - 1]["code"],
                //   title: this.detail.rows[i - 1]["title"],
                // };
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
        `${this.serviceUrl}controllers/MYSQL/INTERNAL/QA/Indirect/request_item?total=1&page=${
          this.detail.page
        }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
          this.detail.q ? `&q=${this.detail.q}` : ""
        }${this.base.current ? `&doc=${this.base.current}` : ``}`,
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
        // title: "",
        // price: "",
        // image: [],
        // imageLink: "",
        // color: "",
        // color_code: "",
        // link: "",
      };
      this.detail.controll = "create";
    },
    detail_edit(code) {
      // console.log("detail_edit");
      // this.clearimage();
      // console.log(id,index);
      // setTimeout(() => {
      this.detail.current = code;
      let index = this.detail.rows.findIndex(
        (v) => v.code == this.detail.current
      );
      // this.detail.rows[index] = { ...this.detail.form };
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      // this.detail.form.color = this.detail.form.color == "0" ? false : true;

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
      // this.detail.current = index;
      // this.detail_search();

      this.detail.controll = "edit";
    },
    detail_save(type) {
      // console.log(this.base.current);
      // console.log(this.detail.controll);
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
        ...this.detail.form
        };
        obj['doc'] =  this.base.current
        console.log(obj);
        if (this.detail.controll == "edit") {
          obj["code"] = this.detail.form.code;
        }
        fetch(`${this.serviceUrl}controllers/MYSQL/INTERNAL/QA/Indirect/request_item`, {
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

<template>
  <div class="PO">
    <AppLayout>
      <template #modal>
        <!-- modal base -->
        <input
          type="checkbox"
          id="modal-base"
          class="modal-toggle"
          v-model="base.modal"
        />
        <div class="modal">
          <div
          class="modal-box relative w-11/12 max-w-5xl p-2 lg:p-4 max-h-screen"
        >
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold">Add new PO!</h3>
            <div class="card-body overflow-auto max-h-[60vh] ">
              <!-- <div class="form-control">
                <AppModuleGlobalUpload
                  v-if="base.modal"
                  :imageLink="base.form.imageLink"
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
                <label class="label">
                  <span class="label-text text-red-500"></span>
                  <span class="label-text-alt text-red-500 font-bold"
                    >* note</span
                  >
                </label>
              </div> -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">รายการใบสั่งผลิต</span>
                </label>
                {{ base.form.po }}das
                <AppModuleGlobalSelectSearch
                  :placeholder="'test'"
                  :label="'ItemCode'"
                  :maxChar="1"
                  :delay="100"
                  :limit="10"
                  :customClass="'input input-bordered border-base-content  p-0'"
                  @updateValue="
                    (obj) => {
                      base.form.po = obj.value;
                    }
                  "
                  :url="`https://publicly-quality-javelin.ngrok-free.app/dev/rewrite_demo/services/api/controllers/SAP/UBA/oitm`"
                />
              </div>
              <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">col</span>
                  </label>
                  <input
                    type="text"
                    placeholder="number"
                    class="input input-bordered border-base-content"
                    v-model="base.form.col1"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">col</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    class="input input-bordered border-base-content"
                    v-model="base.form.col2"
                  />
                </div>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">textarray</span>
                </label>

                <textarea
                  class="textarea textarea-bordered"
                  placeholder="Description"
                  v-model="base.form.textarea"
                  cols="5"
                  rows="1"
                ></textarea>
              </div>
              <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">select1</span>
                  </label>
                  <!-- <select
                    class="select select-bordered border-base-content"
                    v-model="base.form.category_code"
                  >
                    <option disabled="disabled" selected="selected" value="0">
                      Choose category
                    </option>
                    <option
                      v-for="(v, i) in category.rows"
                      :key="i"
                      :value="v.id"
                    >
                      {{ v.title }}
                    </option>
                  </select> -->
                  <AppModuleGlobalSelectSearch
                    :placeholder="'test'"
                    :label="'ItemCode'"
                    :maxChar="1"
                    :delay="100"
                    :limit="10"
                    :customClass="'input input-bordered border-base-content  p-0'"
                    @updateValue="
                      (obj) => {
                        base.form.col1 = obj.value;
                      }
                    "
                    :url="`https://publicly-quality-javelin.ngrok-free.app/dev/rewrite_demo/services/api/controllers/SAP/UBA/oitm`"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">select2</span>
                  </label>
                  <select
                    class="select select-bordered border-base-content"
                    v-model="base.form.category_code"
                  >
                    <option disabled="disabled" selected="selected" value="0">
                      Choose store
                    </option>
                    <option
                      v-for="(v, i) in category.rows"
                      :key="i"
                      :value="v.code"
                    >
                      {{ v.title }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">checkbox</span>
                  <input
                    type="checkbox"
                    class="toggle"
                    checked
                    v-model="base.form.recommend"
                  />
                </label>
              </div>
              <div class="form-control pt-4">
                <div class="w-full overflow-auto">
                  <table class="table table-compact w-full">
                    <thead>
                      <tr>
                        <th>text1</th>
                        <th>text1</th>
                        <!-- <th>Color</th>

                        <th>Price</th>
                        <th>Link</th> -->
                        <th class="text-right">
                          <label
                            for="modal-detail"
                            class="btn btn-primary modal-button btn-xs"
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
                        <th>
                          <div class="flex items-center space-x-3">
                            <div class="avatar">
                              <div class="mask mask-squircle w-12 h-12">
                                <img
                                  v-if="v.image.length > 0"
                                  :src="`${
                                    v.image[v.master ? v.master : 0].temp
                                      ? `${serviceUrl}tmps/`
                                      : v.imageLink
                                      ? v.imageLink
                                      : `${serviceUrl}tmps/`
                                  }${
                                    v.image[v.master ? v.master : 0].file
                                  }`"
                                  alt="Image"
                                />
                              </div>
                            </div>
                          </div>
                        </th>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="font-bold">{{ v.title }}</div>
                              <div class="text-sm opacity-50">
                                {{ v.code }}
                              </div>
                            </div>
                          </div>
                        </td>
                       
                        <td>{{ v.price }}</td>
                        <td>
                          <a :href="v.link" target="_blank">
                            <font-awesome-icon
                              v-if="v.link"
                              icon="fa-solid fa-globe"
                              size="1x"
                              class="btn btn-ghost modal-button btn-xs"
                          /></a>
                        </td>
                        <th class="text-right">
                          <label
                            for="modal-detail"
                            class="btn btn-ghost modal-button btn-xs"
                            @click="detail_edit(`${v.code}`, `${i}`)"
                            >edit
                          </label>
                          |
                          <label
                            for="modal-remove"
                            class="btn btn-ghost modal-button btn-xs"
                            @click="remove_item(`${v.code}`, 'detail','po_detail')"
                            >remove
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
                <button class="btn btn-primary">Confirm</button>
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
                <button class="btn btn-primary" @click="confirm_remove()">
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
            <h3 class="text-lg font-bold">Add Quantity!</h3>
            <div class="card-body overflow-auto max-h-[60vh] ">
              <!-- <div class="form-control">
                <AppModuleGlobalUpload
                  v-if="detail.modal"
                  :imageLink="detail.form.imageLink"
                  :image="detail.form.image"
                  :multiple="true"
                  :id="'detail'"
                  @respone="
                    (res) => {
                      let length = detail.form.image.length
                        ? detail.form.image.length
                        : 0;
                      detail.form.image = detail.form.image.concat(res.image);
                    }
                  "
                  @resetdata="
                    (res) => {
                      detail.form.image = [...res.image];
                    }
                  "
                />
                <label class="label">
                  <span class="label-text text-red-500"></span>
                  <span class="label-text-alt text-red-500 font-bold"
                    >* รูปนี้จะแสดงผลในช่องรายละเอียดสินค้า</span
                  >
                </label>
              </div> -->

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Title or name"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.title"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Code</span>
                </label>

                <input
                  type="text"
                  placeholder="Code"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.code"
                />
              </div>
              <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Price</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Price"
                    class="input input-bordered border-base-content"
                    v-model="detail.form.price"
                  />
                </div>
                
              </div>
            </div>

            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-detail" class="btn btn-danger">Cancle</label>
              </div>
              <div class="flex-1 form-control mt-6">
                <button class="btn btn-primary" @click="detail_save('static')">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #view>
        <div
          class="grid grid-cols-4 gap-6 lg:px-10 lg:pt-5 lg:pb-0 xl:grid-cols-4"
        >
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body py-0">
              <h2 class="my-4 text-4xl font-bold card-title">
                <div class="flex-0"></div>
                <div class="flex-0">
                  <input
                    type="text"
                    placeholder="Search"
                    class="input input-ghost w-full max-w-xs"
                    @input="base_search"
                    v-model="base.q"
                  />
                </div>
                <div
                  class="flex-1 justify-end space-x-2 card-actions float-right"
                >
                  <label
                    for="modal-base"
                    class="btn btn-primary modal-button"
                    @click="base_create()"
                    >Create</label
                  >
                </div>
              </h2>
            </div>
          </div>
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body overflow-auto max-h-[60vh]">
              <div class="overflow-x-auto w-full">
                <table class="table table-normal w-full">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>code</th>
                      <th>ref</th>
                      <th>title</th>
                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="hover"
                      v-for="(v, i) in base.rows"
                      :key="v.code"
                    >
                      <!-- <th>
                        <div class="flex items-center space-x-3">
                          <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                              <img
                                v-if="v.image.length > 0"
                                :src="`${v.imageLink}${
                                  v.image[v.master ? v.master : 0].file
                                }`"
                                alt="Image"
                              />
                            </div>
                          </div>
                        </div>
                      </th> -->
                      <!-- <th>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">{{ v.name }}</div>
                            <div class="text-sm opacity-50">
                              code : {{ v.code }}
                            </div>
                            <div class="text-sm opacity-50">
                              ref : {{ v.ref }}
                            </div>
                          </div>
                        </div>
                      </th>
                      <td class="crop">
                       {{ v.code }}
                        <br />
                        <span class="badge badge-ghost badge-sm"
                          >code : {{ v.code }}</span
                        >
                      </td> -->
                      <th>{{ v.id }}</th>
                      <td>{{ v.code }}</td>
                      <td>{{ v.ref }}</td>
                      <td>{{ v.title }}</td>
                      <th class="text-right">
                        <label
                          for="modal-base"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                          >edit
                        </label>
                        |
                        <label
                          for="modal-remove"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="remove_item(`${v.code}`, 'base','po')"
                          >remove
                        </label>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
export default {
  name: "PO",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
  },
  data() {
    return {
      
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
          col1: "",
          col2: "",
          textarea: "",

          imageLink: "",
          image: [],
          po: "s",
        },
      },
      detail: {
        controll: "",
        rows: [],
        page: 1,
        row: 99999,
        modal: false,
        form: {
          code: "",
          title: "",
          price: "",

          imageLink: "",
          image: [],
        },
      },
      remove: {
        current: 0,
        model: false,
        controll: "",
        tb:'',
      },
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
  },
  methods: {
    // CATEGORY
    category_search() {
      this.category_get((res) => {
        this.category.rows = res;
      });
    },
    category_get(callback) {
      // console.log(this.base.q)
      fetch(
        `${this.$store.state.serviceUrl}category?page=${this.category.page}${
          this.category.row ? `&rows=${this.category.row}` : ""
        }${this.category.q ? `&q=${this.category.q}` : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //     "uuid": localStorage.getItem('uuid'),
          // }),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },
    // base
    base_search() {
      this.base.loading = true;
      this.base_get((res) => {
        this.base.rows = res.rows;
        this.base.total = res.total;
        // console.log(this.base.page*this.base.row)

        // console.log(this.base.total)
        this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
        this.base.back = this.base.page > 1 ? true : false;

        this.base.loading = false;
      });
    },
    base_get(callback) {
      // console.log(this.base.q)
      fetch(
        `${this.$store.state.serviceUrl}po?page=${this.base.page}${
          this.base.row ? `&rows=${this.base.row}` : ""
        }${this.base.q ? `&q=${this.base.q}` : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //     "uuid": localStorage.getItem('uuid'),
          // }),
        }
      )
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            // res.rows[0].image = res.rows[0].image
            //   ? JSON.parse(res.rows[0].image)
            //   : [];
            // res.rows[0].master = 0;
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              // console.log(res.rows[i].image)
              // res.rows[i].image.forEach((vv, ii) => {
              // if (ii == 0) {
              res.rows[i].master = 0;
              // }
              // console.log(vv);
              // if (vv.master) {
              //   res.rows[i].master = ii;
              // }
              // });
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
      // console.log("CREATE");
      this.base.current = 0;
      this.detail.rows = [];
      this.category_search();
      this.base.form = {
        name: "",
        size: "",
        number: "",
        description: "",
        category_code: "0",
        recommend: "",
        room: "",
        imageLink: "",
        image: [],
      };
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.category_search();
      // console.log(id,index);
      this.base.form = { ...this.base.rows[index] };
      this.base.form.category_code = this.base.form.category_code
        ? this.base.form.category_code
        : "0";
      this.base.form.recommend = this.base.form.recommend == "1" ? true : false;
      this.base.current = code;
      this.detail_search();
      this.base.controll = "edit";
    },
    base_save() {
      let image = { ...this.base.form.image[0] };
      delete image.temp;

      console.log(image);
      let vm = this;
      fetch(`${this.$store.state.serviceUrl}po`, {
        method: this.base.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.base.current,
          name: this.base.form.name,
          size: this.base.form.size,
          number: this.base.form.number,
          description: this.base.form.description,
          category_code: this.base.form.category_code,
          recommend: this.base.form.recommend,
          room: this.base.form.room,
          image: [image],
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
              // console.log(i)
              this.detail.controll = "create";
              for (i; i > 0; i--) {
                // this.detail.rows.forEach((v, i) => {
                // console.log(v, i);

                this.detail.form = {
                  code: this.detail.rows[i - 1]["code"],
                  title: this.detail.rows[i - 1]["title"],
                  price: this.detail.rows[i - 1]["price"],
                  image: this.detail.rows[i - 1]["image"],
                  // imageLink: this.detail.rows[i - 1]["imageLink"],
                  color: this.detail.rows[i - 1]["color"],
                  color_code: this.detail.rows[i - 1]["color_code"],
                  link: this.detail.rows[i - 1]["link"],
                };

                promise_arr.push(
                  new Promise(async function (resolve, reject) {
                    let res = await vm.detail_save("dynamic");
                    await resolve(res);
                    return;
                    // setTimeout(function(){ resolve("☕") },700);
                  })
                );

                // });
              }
            }

            Promise.all(promise_arr)
              .then((res) => {
                // console.log(res);
                vm.base_search();
              })
              .catch((err) => console.error(err));
          }
          // callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          // callback([]);
          console.error("Error:", error);
        });
    },
    // DETAIL
    detail_search() {
      this.detail_get((res) => {
        this.detail.rows = res;
      });
    },
    detail_get(callback) {
      fetch(
        `${this.$store.state.serviceUrl}po_detail?po=${
          this.base.current
        }&page=${this.detail.page}${
          this.detail.row ? `&rows=${this.detail.row}` : ""
        }${this.detail.q ? `&q=${this.detail.q}` : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //     "uuid": localStorage.getItem('uuid'),
          // }),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            // console.log(res.rows[i].image)
            res.rows[i].image.forEach((vv, ii) => {
              if (ii == 0) {
                res.rows[i].master = ii;
              }
              // console.log(vv);
              if (vv.master) {
                res.rows[i].master = ii;
              }
            });
          });
          callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },
    detail_create() {
      console.log("detail_create");
      // this.clearimage();
      this.detail.current = 0;
      console.log("callback");
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
        console.table(this.detail.form.image);
        let array_image = [];
        this.detail.form.image.forEach((v, i) => {
          console.log(v);
          if (v.temp) {
            let image = { ...v };
            delete image.temp;
            array_image[i] = image;
          } else {
            array_image[i] = { ...v };
          }
          // console.log(this.detail.form.image[i])
        });
        //  console.table(this.detail.form.image);
        let obj = {
          po: this.base.current,
          code: this.detail.form.code,
          title: this.detail.form.title,
          price: this.detail.form.price,
          image: array_image,
          color: this.detail.form.color,
          color_code: this.detail.form.color_code,
          link: this.detail.form.link,
        };
        console.log(obj);
        if (this.detail.controll == "edit") {
          obj["code"] = this.detail.form.code;
        }
        fetch(`${this.$store.state.serviceUrl}po_detail`, {
          method: this.detail.controll == "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
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
    remove_item(code, controll,tb) {
      console.log(code);
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    confirm_remove() {
      if (this.remove.controll != "base" && this.base.current == 0) {
        // console.log(this.remove.code);
        let index = this.detail.rows.findIndex((v) => v.code == this.remove.code);
        // console.log(index);
        // console.log(this.detail.rows);
        this.detail.rows.splice(index, 1);
        this.remove.modal = false;
      } else {
        fetch(`${this.$store.state.serviceUrl}${this.remove.tb}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
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
      }
    },
  },
  mounted() {
    this.base_search();
    //  mounted() {
    
    // },
  },
};
</script>

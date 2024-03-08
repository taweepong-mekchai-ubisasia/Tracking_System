<template>
  <div class="Admin">
    <AdminLayout>
      <template #modal>
        <input
          type="checkbox"
          id="modal-admin"
          class="modal-toggle"
          v-model="admin.modal"
        />
        <div class="modal">
          <div class="modal-box relative w-6/12 max-w-5xl">
            <label
              for="modal-admin"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold">
              {{ admin.form.code ? `Edit admin` : `Add new admin` }}
            </h3>
            <div class="card-body overflow-auto" style="max-height: 60vh">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  class="input input-bordered"
                  v-model="admin.form.email"
                  :class="errorMsgemail ? 'input-error' : ''"
                />
                <label class="label" :class="errorMsgemail ? '' : 'hidden'">
                  <span class="label-text-alt text-error">{{
                    errorMsgemail
                  }}</span>
                </label>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <div class="relative">
                  <input
                    :type="showpassword ? 'password' : 'text'"
                    placeholder="Password"
                    class="input input-bordered w-full"
                    v-model="admin.form.password"
                    :class="
                      admin.form.password &&
                      (admin.form.password.length < 8 ||
                        (admin.form.confirm_password &&
                          admin.form.password != admin.form.confirm_password))
                        ? 'input-error'
                        : ''
                    "
                  />
                  <div
                    class="
                      absolute
                      inset-y-0
                      right-0
                      pr-3
                      flex
                      items-center
                      text-sm
                      leading-5
                    "
                  >
                    <font-awesome-icon
                      icon="fa-regular  fa-eye"
                      @click="showpassword = !showpassword"
                      :class="{ hidden: !showpassword, block: showpassword }"
                    />
                    <font-awesome-icon
                      icon="fa-regular  fa-eye-slash"
                      @click="showpassword = !showpassword"
                      :class="{ block: !showpassword, hidden: showpassword }"
                    />
                  </div>
                </div>
                <label
                  v-if="admin.form.password"
                  class="label"
                  :class="
                    admin.form.password &&
                    (admin.form.password.length < 8 ||
                      (admin.form.confirm_password &&
                        admin.form.password != admin.form.confirm_password))
                      ? ''
                      : 'hidden'
                  "
                >
                  <span class="label-text-alt text-error">{{
                    admin.form.password.length < 8
                      ? "Password require min 8 characters."
                      : admin.form.password != admin.form.confirm_password
                      ? "Password not match."
                      : ""
                  }}</span>
                </label>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <div class="relative">
                  <input
                    :type="showconfirm_password ? 'password' : 'text'"
                    placeholder="Password"
                    class="input input-bordered w-full"
                    v-model="admin.form.confirm_password"
                    :class="
                      admin.form.password &&
                      (admin.form.password.length < 8 ||
                        (admin.form.confirm_password &&
                          admin.form.password != admin.form.confirm_password))
                        ? 'input-error'
                        : ''
                    "
                  />
                  <div
                    class="
                      absolute
                      inset-y-0
                      right-0
                      pr-3
                      flex
                      items-center
                      text-sm
                      leading-5
                    "
                  >
                    <font-awesome-icon
                      icon="fa-regular  fa-eye"
                      @click="showconfirm_password = !showconfirm_password"
                      :class="{
                        hidden: !showconfirm_password,
                        block: showconfirm_password,
                      }"
                    />
                    <font-awesome-icon
                      icon="fa-regular  fa-eye-slash"
                      @click="showconfirm_password = !showconfirm_password"
                      :class="{
                        block: !showconfirm_password,
                        hidden: showconfirm_password,
                      }"
                    />
                  </div>
                </div>
                <label
                  v-if="admin.form.confirm_password"
                  class="label"
                  :class="
                    admin.form.password &&
                    admin.form.confirm_password &&
                    (admin.form.password.length < 8 ||
                      (admin.form.confirm_password &&
                        admin.form.password != admin.form.confirm_password))
                      ? ''
                      : 'hidden'
                  "
                >
                  <span class="label-text-alt text-error">{{
                    admin.form.password.length < 8
                      ? "Password require min 8 characters."
                      : admin.form.password != admin.form.confirm_password
                      ? "Password not match."
                      : ""
                  }}</span>
                </label>
              </div>
              <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Fristname</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Firstname"
                    class="input input-bordered"
                    v-model="admin.form.firstname"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Lastname</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Lastname"
                    class="input input-bordered"
                    v-model="admin.form.lastname"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Nickname</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nickname"
                    class="input input-bordered"
                    v-model="admin.form.nickname"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Mobile</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nickname"
                    class="input input-bordered"
                    v-model="admin.form.mobile"
                    @input="acceptNumber"
                  />
                  <label
                    class="label"
                    :class="
                      admin.form.mobile && admin.form.mobile.length < 10
                        ? ''
                        : 'hidden'
                    "
                  >
                    <span class="label-text-alt text-error">{{
                      admin.form.mobile.length < 10
                        ? "Mobile require min 10 characters."
                        : ""
                    }}</span>
                    <!-- <span class="label-text-alt">Alt label</span> -->
                  </label>
                </div>
              </div>
            </div>
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-admin" class="btn btn-danger">Cancle</label>
              </div>
              <div
                class="flex-1 form-control mt-6"
                @click="
                  errorMsgemail ||
                  !admin.form.email ||
                  !admin.form.password ||
                  admin.form.password.length < 8 ||
                  !admin.form.confirm_password ||
                  admin.form.confirm_password.length < 8 ||
                  !admin.form.mobile ||
                  admin.form.mobile.length < 10 ||
                  !admin.form.firstname ||
                  !admin.form.lastname ||
                  admin.form.password != admin.form.confirm_password ||
                  loading
                    ? ''
                    : admin_save()
                "
                :disabled="
                  // admin.form.password && admin.form.confirm_password && ( admin.form.password.length < 8 || (admin.form.password != admin.form.confirm_password) )
                  errorMsgemail ||
                  !admin.form.email ||
                  !admin.form.password ||
                  admin.form.password.length < 8 ||
                  !admin.form.confirm_password ||
                  admin.form.confirm_password.length < 8 ||
                  !admin.form.mobile ||
                  admin.form.mobile.length < 10 ||
                  !admin.form.firstname ||
                  !admin.form.lastname ||
                  admin.form.password != admin.form.confirm_password ||
                  loading
                "
              >
                <button class="btn btn-primary">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #view>
        <div
          class="grid grid-cols-1 gap-6 lg:px-10 lg:pt-5 lg:pb-0 xl:grid-cols-1"
        >
          <div
            class="card col-span-4 row-span-4 shadow-lg bg-base-200 m-4 lg:m-0"
          >
            <div class="card-body py-0">
              <h2 class="my-4 text-4xl font-bold card-title">
                <div class="w-full mr-4">
                  <input
                    type="text"
                    placeholder="Search"
                    class="input input-ghost w-full"
                    @input="admin_search"
                    v-model="admin.q"
                  />
                </div>
                <div
                  class="flex-1 justify-end space-x-2 card-actions float-right"
                >
                  <label
                    for="modal-admin"
                    class="btn btn-primary modal-button"
                    @click="admin_create()"
                    >Create</label
                  >
                </div>
              </h2>
            </div>
            <div
              class="card-body overflow-auto bg-base-100"
              style="max-height: 70vh"
              v-if="admin_profile"
            >
              <div class="overflow-x-auto w-full">
                <table class="table table-compact w-full mb-4">
                  <thead>
                    <tr>
                      <th>รหัส / ผู้ใช้งาน</th>
                      <th>email</th>
                      <!-- <th>วันที่สมัคร</th> -->
                      <th>เบอร์โทร</th>
                      <!-- <th>สถานะ</th> -->
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in admin.rows" :key="i">
                      <th>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-sm font-bold">
                              {{ v.code }}
                            </div>
                            <div class="text-sm opacity-50">
                              {{ v.firstname }} {{ v.lastname }} (
                              {{ v.nickname }} )
                            </div>
                          </div>
                        </div>
                      </th>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">
                              <!-- <div class="text-sm opacity-50"> -->
                              {{ v.email }}
                              <!-- </div> -->
                              <div class="text-sm opacity-50">
                                วันที่สมัคร : {{ v.created_at }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{{ v.mobile?v.mobile:'ไม่ระบุ' }}</td>
                      <!-- <td>{{ v.veridated_at }}</td> -->
                      <!-- <td>
                        {{ v.baned_at ? `ถูกระงับ` : `ปกติ` }}
                      </td> -->
                      <td class="text-right">
                        <div v-if="admin_profile.row.code != v.code">
                          <div v-if="!v.baned_at">
                            <button
                              class="btn btn-link text-red-400 btn-ghost mr-2"
                              @click="ban(v.code)"
                            >
                              ระงับ
                            </button>
                          </div>
                          <div v-else>
                            <button
                              class="btn btn-link btn-ghost"
                              @click="active(v.code)"
                            >
                              ใช้งาน
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <PageinationModule
            :page="admin.page"
            :total="admin.total"
            :row="admin.row"
            :back="admin.back"
            :next="admin.next"
            :loading="admin.loading"
            @search="
              (res) => {
                admin.page = res.page;
                this.admin_search();
              }
            "
          />
        </div>
      </template>
    </AdminLayout>
  </div>
</template>
<script>
import AdminLayout from "@/components/Admin/layout.vue";
import PageinationModule from "@/components/App/Module/Global/Pageination.vue";

export default {
  name: "Admin",
  components: {
    AdminLayout,
    PageinationModule,
  },
  data() {
    return {
      loading: false,
      showpassword: true,
      showconfirm_password: true,
      errorMsg: "",
      errorMsgemail: "",
      admin: {
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
          email: "",
          password: "",
          confirm_password: "",
          firstname: "",
          lastname: "",
          nickname: "",
          mobile: "",
        },
      },
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    admin_profile() {
      return this.$store.getters.admin;
    },
  },
  methods: {
    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.errorMsgemail = "";
      } else {
        this.errorMsgemail = value ? "Invalid Email Address" : "";
      }
    },
    acceptNumber() {
      var x = this.admin.form.mobile
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.admin.form.mobile = !x[2] ? x[1] : x[1] + x[2] + x[3];
    },
    ban(code) {
      let vm = this;
      this.update(
        {
          ban: true,
          code: code,
        },
        vm
      );
    },
    active(code) {
      let vm = this;
      this.update(
        {
          ban: false,
          code: code,
        },
        vm
      );
    },
    update: (obj, vm) => {
      fetch(`${vm.ServiceUrl}controllers/admin/admin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("_jwt")}`,
        },
        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            vm.admin_search();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    admin_search() {
      this.admin.loading = true;
      this.admin_get((res) => {
        this.admin.rows = res.rows;
        this.admin.total = res.total;
        this.admin.next =
          this.admin.page * this.admin.row >= this.admin.total ? false : true;
        this.admin.back = this.admin.page > 1 ? true : false;
        this.admin.loading = false;
      });
    },
    admin_get(callback) {
      fetch(
        `${this.ServiceUrl}controllers/admin/admin?page=${this.admin.page}${
          this.admin.row ? `&rows=${this.admin.row}` : ""
        }${this.admin.q ? `&q=${this.admin.q}` : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("_jwt")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.rows.length > 0) {
            res.rows.forEach((v, i) => {
              res.rows[i].paymentImage = v.paymentImage
                ? JSON.parse(v.paymentImage)
                : [];
              // console.log(res.rows[i].image)
              // res.rows[i].image.forEach((vv, ii) => {
              // if (ii == 0) {
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
    admin_create() {
      // console.log("CREATE");
      this.admin.current = 0;
      // this.admin.rows = [];
      // this.category_search();

      // this.store_search();
      this.admin.form = {
        email: "",
        password: "",
        confirm_password: "",
        firstname: "",
        lastname: "",
        nickname: "",
        mobile: "",
      };
      this.admin.controll = "create";
    },
    admin_edit(code, index) {
      // this.category_search();
      // this.store_search();
      // console.log(id,index);
      this.admin.form = { ...this.admin.rows[index] };
      // this.admin.form.category_id = this.admin.form.category_id
      //   ? this.admin.form.category_id
      //   : "0";
      // this.admin.form.store_id = this.admin.form.store_id
      //   ? this.admin.form.store_id
      //   : "0";
      // this.admin.form.recommend =
      //   this.admin.form.recommend == "1" ? true : false;
      //  this.admin.form.store_id = this.admin.form.store_id == "0" ? false : true;

      //  this.admin.rows[index]["category_id"] = ? this.admin.rows[index]["category_id"]
      //     : "0",
      // store_id: this.admin.rows[index]["store_id"]
      //   ? this.admin.rows[index]["store_id"]
      //   : "0",
      // recommend: this.admin.rows[index]["recommend"] == "1" ? true : false,
      // this.admin.form = this.admin.rows[index]
      this.admin.current = code;
      this.admin_search();
      this.admin.controll = "edit";
    },
    admin_save() {
      // let image = { ...this.admin.form.image[0] };
      // delete image.temp;

      // console.log(image);
      let vm = this;
      fetch(`${this.ServiceUrl}controllers/admin/admin`, {
        method: this.admin.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("_jwt")}`,
        },

        body: JSON.stringify({
          code: this.admin.current,
          email: this.admin.form.email,
          password: this.admin.form.password,
          firstname: this.admin.form.firstname,
          lastname: this.admin.form.lastname,
          nickname: this.admin.form.nickname,
          mobile: this.admin.form.mobile,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            this.admin.modal = false;
            const promise_arr = [];
            console.log(this.admin.current);
            if (this.admin.current == 0) {
              this.admin.current = res.row.code;
              let i = this.admin.rows.length;
              // console.log(i)
              this.admin.controll = "create";
              // for (i; i > 0; i--) {
              //   // this.admin.rows.forEach((v, i) => {
              //   // console.log(v, i);

              //   this.admin.form = {
              //     code: this.admin.rows[i - 1]["code"],
              //     title: this.admin.rows[i - 1]["title"],
              //     price: this.admin.rows[i - 1]["price"],
              //     image: this.admin.rows[i - 1]["image"],
              //     // imageLink: this.admin.rows[i - 1]["imageLink"],
              //     color: this.admin.rows[i - 1]["color"],
              //     color_code: this.admin.rows[i - 1]["color_code"],
              //     link: this.admin.rows[i - 1]["link"],
              //   };

              //   promise_arr.push(
              //     new Promise(async function (resolve, reject) {
              //       let res = await vm.admin_save("dynamic");
              //       await resolve(res);
              //       return;
              //       // setTimeout(function(){ resolve("☕") },700);
              //     })
              //   );

              //   // });
              // }
            }

            Promise.all(promise_arr)
              .then((res) => {
                // console.log(res);
                vm.admin_search();
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
    // // admin
    // admin_search() {
    //   this.admin_get((res) => {
    //     this.admin.rows = res;
    //   });
    // },
    // admin_get(callback) {
    //   fetch(
    //     `${this.ServiceUrl}controllers/admin?admin_code=${
    //       this.admin.current
    //     }&page=${this.admin.page}${
    //       this.admin.row ? `&rows=${this.admin.row}` : ""
    //     }${this.admin.q ? `&q=${this.admin.q}` : ""}`,
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       // body: JSON.stringify({
    //       //     "uuid": localStorage.getItem('uuid'),
    //       // }),
    //     }
    //   )
    //     .then((response) => response.json())
    //     .then((res) => {
    //       res.rows.forEach((v, i) => {
    //         res.rows[i].image = v.image ? JSON.parse(v.image) : [];
    //         // console.log(res.rows[i].image)
    //         res.rows[i].image.forEach((vv, ii) => {
    //           if (ii == 0) {
    //             res.rows[i].master = ii;
    //           }
    //           // console.log(vv);
    //           if (vv.master) {
    //             res.rows[i].master = ii;
    //           }
    //         });
    //       });
    //       callback(res.success ? res.rows : []);
    //     })
    //     .catch((error) => {
    //       callback([]);
    //       console.error("Error:", error);
    //     });
    // },
    // admin_create() {
    //   console.log("admin_create");
    //   // this.clearimage();
    //   this.admin.current = 0;
    //   console.log("callback");
    //   // this.admin.rows = [];
    //   this.admin.form = {
    //     smoking: "",
    //     facilities: "",
    //     view: "",
    //     musthaves: "",
    //     size: "",
    //     description: "",
    //     title: "",
    //     code: "",
    //     // code: "",
    //     // title: "",
    //     price: "",
    //     // admin.form.facilities
    //     imageLink: "",
    //     image: [],
    //     // color: "",
    //     // color_code: "",
    //     // link: "",
    //   };
    //   this.admin.controll = "create";
    // },
    // admin_edit(code, index) {
    //   // console.log("admin_edit");
    //   // this.clearimage();
    //   // console.log(id,index);
    //   // setTimeout(() => {
    //   this.admin.current = code;
    //   this.admin.form = Object.assign({}, this.admin.rows[index]);
    //   this.admin.form.color = this.admin.form.color == "0" ? false : true;

    //   // console.log(this.admin.form.image);
    //   this.admin.form.image.forEach((v, i) => {
    //     // console.log(v);
    //     this.admin.form.image[i] = Object.assign(
    //       {},
    //       this.admin.form.image[i]
    //     );
    //   });

    //   // console.log(this.admin.form);
    //   // this.admin.form.image = JSON.parse(this.admin.form.image)

    //   // }, 5000);

    //   // this.admin.form = this.admin.rows[index]
    //   this.admin.current = code;
    //   // this.admin_search();

    //   this.admin.controll = "edit";
    // },
    // admin_save(type) {
    //   if (!this.admin.current) {
    //     if (this.admin.controll == "create") {
    //       this.admin.form.code = this.admin.rows.length;
    //       this.admin.rows = [{ ...this.admin.form }].concat(this.admin.rows);
    //       // this.admin.rows.push({ ...this.admin.form });
    //       this.admin.modal = false;
    //     } else {
    //       //  this.admin.form.code = this.admin.rows.length
    //       let index = this.admin.rows.findIndex(
    //         (v) => v.code == this.admin.current
    //       );
    //       this.admin.rows[index] = { ...this.admin.form };

    //       // this.admin.rows.push({ ...this.admin.form });
    //       this.admin.modal = false;
    //     }
    //   } else {
    //     console.table(this.admin.form.image);
    //     let array_image = [];
    //     this.admin.form.image.forEach((v, i) => {
    //       console.log(v);
    //       if (v.temp) {
    //         let image = { ...v };
    //         delete image.temp;
    //         array_image[i] = image;
    //       } else {
    //         array_image[i] = { ...v };
    //       }
    //       // console.log(this.admin.form.image[i])
    //     });
    //     //  console.table(this.admin.form.image);

    //     // admin.form.facilities
    //     // smoking facilities view musthaves size title code
    //     let obj = {
    //       admin: this.admin.current,

    //       smoking: this.admin.form.smoking,
    //       facilities: this.admin.form.facilities,
    //       view: this.admin.form.view,
    //       musthaves: this.admin.form.musthaves,
    //       size: this.admin.form.size,
    //       title: this.admin.form.title,
    //       description: this.admin.form.description,

    //       price: this.admin.form.price,

    //       // code: this.admin.form.code,
    //       // title: this.admin.form.title,
    //       // price: this.admin.form.price,
    //       image: array_image,
    //       // color: this.admin.form.color,
    //       // color_code: this.admin.form.color_code,
    //       // link: this.admin.form.link,
    //     };
    //     console.log(obj);
    //     if (this.admin.controll == "edit") {
    //       obj["code"] = this.admin.form.code;
    //     }
    //     fetch(`${this.ServiceUrl}controllers/admin`, {
    //       method: this.admin.controll == "create" ? "POST" : "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(obj),
    //     })
    //       .then((response) => response.json())
    //       .then((res) => {
    //         if (res.success) {
    //           this.admin.modal = false;

    //           if (type == "static") {
    //             this.admin_search();
    //           }

    //           // this.admin_search();
    //         }
    //         // callback(res.success ? res.rows : []);
    //       })
    //       .catch((error) => {
    //         callback([]);
    //         console.error("Error:", error);
    //       });
    //   }
    // },
    // REMOVE
    // remove_item(code, controll) {
    //   console.log(code);
    //   this.remove.code = code;
    //   this.remove.controll = controll;
    // },
    // confirm_remove() {
    //   if (this.remove.controll != "admin" && this.admin.current == 0) {
    //     console.log(this.remove.code);
    //     let index = this.admin.rows.findIndex(
    //       (v) => v.code == this.remove.code
    //     );
    //     console.log(index);
    //     console.log(this.admin.rows);
    //     this.admin.rows.splice(index, 1);
    //     this.remove.modal = false;
    //   } else {
    //     fetch(`${this.ServiceUrl}controllers/${this.remove.controll}`, {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         code: this.remove.code,
    //       }),
    //     })
    //       .then((response) => response.json())
    //       .then((res) => {
    //         if (res.success) {
    //           // console.log(res);
    //           this.remove.modal = false;
    //           this[`${this.remove.controll}_search`]();
    //         }
    //         // callback(res.success ? res.rows : []);
    //       })
    //       .catch((error) => {
    //         // callback([]);
    //         console.error("Error:", error);
    //       });
    //   }
    // },
  },
  mounted() {
    this.admin_search();
    //  mounted() {
    // this.tmpsLink = this.tmpsLink = `${this.ServiceUrl}tmps/`;
    // },
  },
  watch: {
    "admin.form.email"(value) {
      // binding this to the data value in the email input
      this.admin.form.email = value;
      this.validateEmail(value);
    },
  },
};
</script>

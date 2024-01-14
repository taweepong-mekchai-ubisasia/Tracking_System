<template>
  <div class="Game">
    <AdminLayout>
      <template #modal>
        <input
          type="checkbox"
          id="modal-game"
          class="modal-toggle"
          v-model="game.modal"
        />
        <div class="modal">
          <div class="modal-box relative w-6/12 max-w-5xl">
            <label
              for="modal-game"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold">
              {{ game.form.code ? `Edit game` : `Add new game` }}
            </h3>
            <div class="card-body overflow-auto" style="max-height: 60vh">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Game Logo</span>
                </label>
                <!-- <input
                  type="text"
                  placeholder="Game title"
                  class="input input-bordered"
                  v-model="game.form.title"
                /> -->
                <UploadModule
                  v-if="game.modal"
                  :imageLink="game.form.imageLink"
                  :image="game.form.image"
                  :id="'game'"
                  :multiple="false"
                  @respone="
                    (res) => {
                      let length = game.form.image.length
                        ? game.form.image.length
                        : 0;
                      game.form.image = game.form.image.concat(res.image);
                    }
                  "
                  @resetdata="
                    (res) => {
                      game.form.image = [...res.image];
                    }
                  "
                />
                <!-- <label class="label" :class="errorMsgemail ? '' : 'hidden'">
                  <span class="label-text-alt text-error">{{
                    errorMsgemail
                  }}</span>
                </label> -->
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Game title</span>
                </label>
                <input
                  type="text"
                  placeholder="Game title"
                  class="input input-bordered"
                  v-model="game.form.title"
                />
                <!-- <label class="label" :class="errorMsgemail ? '' : 'hidden'">
                  <span class="label-text-alt text-error">{{
                    errorMsgemail
                  }}</span>
                </label> -->
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Game Type</span>
                </label>
                <input
                  type="text"
                  placeholder="Game type"
                  class="input input-bordered"
                  v-model="game.form.type"
                />
                <!-- <label class="label" :class="errorMsgemail ? '' : 'hidden'">
                  <span class="label-text-alt text-error">{{
                    errorMsgemail
                  }}</span>
                </label> -->
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Link</span>
                </label>
                <input
                  type="text"
                  placeholder="Link"
                  class="input input-bordered"
                  v-model="game.form.link"
                />
                <!-- <label class="label" :class="errorMsgemail ? '' : 'hidden'">
                  <span class="label-text-alt text-error">{{
                    errorMsgemail
                  }}</span>
                </label> -->
              </div>
              <!-- <div class="form-control">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <div class="relative">
                  <input
                    :type="showpassword ? 'password' : 'text'"
                    placeholder="Password"
                    class="input input-bordered w-full"
                    v-model="game.form.password"
                    :class="
                      game.form.password &&
                      (game.form.password.length < 8 ||
                        (game.form.confirm_password &&
                          game.form.password != game.form.confirm_password))
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
                      icon="fa-solid fa-eye"
                      @click="showpassword = !showpassword"
                      :class="{ hidden: !showpassword, block: showpassword }"
                    />
                    <font-awesome-icon
                      icon="fa-sharp fa-solid fa-eye-slash"
                      @click="showpassword = !showpassword"
                      :class="{ block: !showpassword, hidden: showpassword }"
                    />
                  </div>
                </div>
                <label
                  v-if="game.form.password"
                  class="label"
                  :class="
                    game.form.password &&
                    (game.form.password.length < 8 ||
                      (game.form.confirm_password &&
                        game.form.password != game.form.confirm_password))
                      ? ''
                      : 'hidden'
                  "
                >
                  <span class="label-text-alt text-error">{{
                    game.form.password.length < 8
                      ? "Password require min 8 characters."
                      : game.form.password != game.form.confirm_password
                      ? "Password not match."
                      : ""
                  }}</span>
                </label>
              </div> -->
              <!-- <div class="form-control">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <div class="relative">
                  <input
                    :type="showconfirm_password ? 'password' : 'text'"
                    placeholder="Password"
                    class="input input-bordered w-full"
                    v-model="game.form.confirm_password"
                    :class="
                      game.form.password &&
                      (game.form.password.length < 8 ||
                        (game.form.confirm_password &&
                          game.form.password != game.form.confirm_password))
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
                      icon="fa-solid fa-eye"
                      @click="showconfirm_password = !showconfirm_password"
                      :class="{
                        hidden: !showconfirm_password,
                        block: showconfirm_password,
                      }"
                    />
                    <font-awesome-icon
                      icon="fa-sharp fa-solid fa-eye-slash"
                      @click="showconfirm_password = !showconfirm_password"
                      :class="{
                        block: !showconfirm_password,
                        hidden: showconfirm_password,
                      }"
                    />
                  </div>
                </div>
                <label
                  v-if="game.form.confirm_password"
                  class="label"
                  :class="
                    game.form.password &&
                    game.form.confirm_password &&
                    (game.form.password.length < 8 ||
                      (game.form.confirm_password &&
                        game.form.password != game.form.confirm_password))
                      ? ''
                      : 'hidden'
                  "
                >
                  <span class="label-text-alt text-error">{{
                    game.form.password.length < 8
                      ? "Password require min 8 characters."
                      : game.form.password != game.form.confirm_password
                      ? "Password not match."
                      : ""
                  }}</span>
                </label>
              </div> -->

             
            </div>
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-game" class="btn btn-danger">Cancle</label>
              </div>
              <div class="flex-1 form-control mt-6" @click="game_save()">
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
            <div class="card-body overflow-auto" style="max-height: 60vh">
              Are your sure for remove this item?
            </div>

            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <!-- <button class="btn btn-danger"> -->
                <label for="modal-remove" class="btn btn-danger">Cancle</label>
                <!-- </button> -->
              </div>
              <div class="flex-1 form-control mt-6">
                <button class="btn btn-primary" @click="confirm_remove()">
                  Confirm
                </button>
              </div>
              <!-- <a
                href="/"
                aria-current="page"
                aria-label="Homepage"
                class="flex-0 btn btn-ghost px-2"
                >
                <div
                  class="
                    font-title
                    text-primary
                    inline-flex
                    text-lg
                    transition-all
                    duration-200
                    md:text-3xl
                  "
                >
                  <span class="lowercase">admin</span
                  ><span class="text-base-content uppercase">UI</span>
                </div>
              </a> -->
              <!-- <a
                href="/#"
                class="
                  flex-1
                  link link-hover
                  font-mono
                  text-xs text-opacity-50 text-right
                "
                ><div data-tip="Changelog" class="tooltip tooltip-bottom">
                  Anyi@0.00.1
                </div>
                </a
              > -->
            </div>

            <!-- </div> -->
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
                    @input="game_search"
                    v-model="game.q"
                  />
                </div>
                <div
                  class="flex-1 justify-end space-x-2 card-actions float-right"
                >
                  <label
                    for="modal-game"
                    class="btn btn-primary modal-button"
                    @click="game_create()"
                    >Create</label
                  >
                </div>
              </h2>
            </div>
            <!-- {{game.rows}} -->
            <div
              class="card-body overflow-auto bg-base-100"
              style="max-height: 70vh"
            >
              <div class="overflow-x-auto w-full">
                <table class="table table-compact w-full mb-4">
                  <thead>
                    <tr>
                      <th>โลโก้</th>
                      <th>รหัส / วันที่สร้าง</th>
                      <th>เกมส์</th>
                      <!-- <th class="text-center">บล๊อค</th>
                      <th class="text-center">โทเคน</th> -->
                      <!-- <th>ลิงค์</th> -->
                      <!-- <th>เบอร์โทร</th> -->
                      <!-- <th>สถานะ</th> -->
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in game.rows" :key="i">
                      <th class="text-center">
                        <div class="avatar w-8">
                          <!-- <div class="w-10 mr-2"> -->
                          <!-- {{v.image}} -->
                          <img
                            v-if="v.image.length > 0"
                            :src="`${
                              v.image[v.master ? v.master : 0].temp
                                ? tmpsLink
                                : v.imageLink
                                ? v.imageLink
                                : tmpsLink
                            }${v.image[v.master ? v.master : 0].file}`"
                            alt="Image"
                          />
                          <!-- <img src="https://placeimg.com/192/192/people" /> -->
                          <!-- </div> -->
                        </div>
                      </th>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-sm font-bold">
                              {{ v.code }}
                            </div>
                            <div class="text-sm opacity-50">
                              {{ v.created_at }}
                            </div>
                          </div>
                        </div>
                      </td>

                      <!-- code: "123456789"
                      created_at: "2022-10-27 13:43:33"
                      
                      image: ""
                      updated_at: null -->

                      <!-- <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">
                              {{ v.email }}
                              <div class="text-sm opacity-50">
                                วันที่สมัคร : {{ v.created_at }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td> -->
                      <!-- <td>{{ v. }}</td> -->
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">
                              ชื่อ : {{ v.title }}
                              <div class="text-sm opacity-50">
                                ประเภท : {{ v.type }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    
                      <td class="text-right">
                        <a :href="`${v.link}`" target="_blank">
                          <label class="btn btn-ghost modal-button btn-xs">
                            <font-awesome-icon icon="fa-solid fa-link" />
                          </label>
                        </a>
                        |
                        <label
                          for="modal-game"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="game_edit(`${v.code}`, `${i}`)"
                          ><font-awesome-icon
                            icon="fa-solid fa-pen-to-square"
                            class="text-warning"
                          />
                        </label>
                        |
                        <label
                          for="modal-remove"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="remove_item(`${v.code}`, 'game')"
                        >
                          <font-awesome-icon
                            icon="fa-solid fa-trash-can"
                            class="text-error"
                          />
                        </label>
                        <!-- </td>

                          
                      <td> -->
                      </td>
                      <!-- <td>
                        {{ v.baned_at ? `ถูกระงับ` : `ปกติ` }}
                      </td> -->
                      <!-- <td class="text-right">
                        <div v-if="game_profile.row.code != v.code">
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
                      </td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <PageinationModule
            :page="game.page"
            :total="game.total"
            :row="game.row"
            :back="game.back"
            :next="game.next"
            :loading="game.loading"
            @search="
              (res) => {
                game.page = res.page;
                this.game_search();
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
import PageinationModule from "@/components/Admin/module/web/Pageination.vue";
import UploadModule from "@/components/Admin/module/web/Upload.vue";

export default {
  name: "Game",
  components: {
    AdminLayout,
    PageinationModule,
    UploadModule,
  },
  data() {
    return {
      loading: false,
      showpassword: true,
      showconfirm_password: true,
      errorMsg: "",
      errorMsgemail: "",
      game: {
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
          link: "",
          type: "",
          imageLink_empty: "",
          image_empty: [],
          imageLink_active: "",
          image_active: [],
          imageLink: "",
          image: [],
        },
      },
      remove: {
        current: 0,
        model: false,
        controll: "",
      },
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    // game_profile() {
    //   return this.$store.getters.game;
    // },
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
      var x = this.game.form.mobile
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.game.form.mobile = !x[2] ? x[1] : x[1] + x[2] + x[3];
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
      fetch(`${vm.ServiceUrl}controllers/admin/game`, {
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
            vm.game_search();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    game_search() {
      this.game.loading = true;
      // let vm = this;
      this.game_get((res) => {
        // console.log("game_searchgame_searchgame_searchgame_searchgame_searchgame_searchgame_searchgame_searchgame_searchgame_searchgame_searchgame_searchgame_searchgame_searchgame_searchgame_searchgame_searchgame_searchgame_search")
        // console.log(res)
        this.game.rows = res.rows;
        // console.log(this.game.rows)
        this.game.total = res.total;
        this.game.next =
          this.game.page * this.game.row >= this.game.total ? false : true;
        this.game.back = this.game.page > 1 ? true : false;
        this.game.loading = false;
      });
    },
    game_get(callback) {
      fetch(
        `${this.ServiceUrl}controllers/admin/game?page=${this.game.page}${
          this.game.row ? `&rows=${this.game.row}` : ""
        }${this.game.q ? `&q=${this.game.q}` : ""}`,
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
              // console.log(v.image_empty ? true : false);
              // res.rows[i].image_empty = v.image_empty
              //   ? JSON.parse(v.image_empty)
              //   : [];
              // console.log(res.rows[i].image)
              // res.rows[i].image.forEach((vv, ii) => {
              // if (ii == 0) {
              // res.rows[i].master = 0;
              // });
              // res.rows.forEach((v, i) => {
              // res.rows[i].image_active = v.image_active
              //   ? JSON.parse(v.image_active)
              //   : [];
              // console.log(res.rows[i].image)
              // res.rows[i].image.forEach((vv, ii) => {
              // if (ii == 0) {
              // res.rows[i].master = 0;

              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
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
    game_create() {
      // console.log("CREATE");
      this.game.current = 0;
      // this.game.rows = [];
      // this.category_search();

      // this.store_search();
      this.game.form = {
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
      this.game.controll = "create";
    },
    game_edit(code, index) {
      // this.category_search();
      // this.store_search();
      // console.log(id,index);
      this.game.form = { ...this.game.rows[index] };
      console.log(this.game.form);
      // this.game.form.category_id = this.game.form.category_id
      //   ? this.game.form.category_id
      //   : "0";
      // this.game.form.store_id = this.game.form.store_id
      //   ? this.game.form.store_id
      //   : "0";
      // this.game.form.recommend =
      //   this.game.form.recommend == "1" ? true : false;
      //  this.game.form.store_id = this.game.form.store_id == "0" ? false : true;

      //  this.game.rows[index]["category_id"] = ? this.game.rows[index]["category_id"]
      //     : "0",
      // store_id: this.game.rows[index]["store_id"]
      //   ? this.game.rows[index]["store_id"]
      //   : "0",
      // recommend: this.game.rows[index]["recommend"] == "1" ? true : false,
      // this.game.form = this.game.rows[index]
      this.game.current = code;
      // this.game_search();
      this.game.controll = "edit";
    },
    game_save() {
      let image = { ...this.game.form.image[0] };
      delete image.temp;
      // let image_empty = { ...this.game.form.image_empty[0] };
      // delete image_empty.temp;
      // let image_active = { ...this.game.form.image_active[0] };
      // delete image_active.temp;
      // console.log(image);
      let vm = this;
      fetch(`${this.ServiceUrl}controllers/admin/game`, {
        method: this.game.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("_jwt")}`,
        },

        body: JSON.stringify({
          code: this.game.current,
          title: this.game.form.title,
          link: this.game.form.link,
          type: this.game.form.type,
          // image_empty: [image_empty],
          // image_active: [image_active],
          // imageLink: "",
          image: [image],
          // image: [],
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            this.game.modal = false;
            // const promise_arr = [];
            console.log(this.game.current);
            if (this.game.current == 0) {
              this.game.current = res.row.code;
              let i = this.game.rows.length;
              // console.log(i)
              this.game.controll = "create";
              // for (i; i > 0; i--) {
              //   // this.game.rows.forEach((v, i) => {
              //   // console.log(v, i);

              //   this.game.form = {
              //     code: this.game.rows[i - 1]["code"],
              //     title: this.game.rows[i - 1]["title"],
              //     price: this.game.rows[i - 1]["price"],
              //     image: this.game.rows[i - 1]["image"],
              //     // imageLink: this.game.rows[i - 1]["imageLink"],
              //     color: this.game.rows[i - 1]["color"],
              //     color_code: this.game.rows[i - 1]["color_code"],
              //     link: this.game.rows[i - 1]["link"],
              //   };

              //   promise_arr.push(
              //     new Promise(async function (resolve, reject) {
              //       let res = await vm.game_save("dynamic");
              //       await resolve(res);
              //       return;
              //       // setTimeout(function(){ resolve("☕") },700);
              //     })
              //   );

              //   // });
              // }
            }

            // Promise.all(promise_arr)
            //   .then((res) => {
            //     // console.log(res);
            vm.game_search();
            //   })
            //   .catch((err) => console.error(err));
          }
          // callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          // callback([]);
          console.error("Error:", error);
        });
    },
    // // game
    // game_search() {
    //   this.game_get((res) => {
    //     this.game.rows = res;
    //   });
    // },
    // game_get(callback) {
    //   fetch(
    //     `${this.ServiceUrl}controllers/game?game_code=${
    //       this.game.current
    //     }&page=${this.game.page}${
    //       this.game.row ? `&rows=${this.game.row}` : ""
    //     }${this.game.q ? `&q=${this.game.q}` : ""}`,
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
    // game_create() {
    //   console.log("game_create");
    //   // this.clearimage();
    //   this.game.current = 0;
    //   console.log("callback");
    //   // this.game.rows = [];
    //   this.game.form = {
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
    //     // game.form.facilities
    //     imageLink: "",
    //     image: [],
    //     // color: "",
    //     // color_code: "",
    //     // link: "",
    //   };
    //   this.game.controll = "create";
    // },
    // game_edit(code, index) {
    //   // console.log("game_edit");
    //   // this.clearimage();
    //   // console.log(id,index);
    //   // setTimeout(() => {
    //   this.game.current = code;
    //   this.game.form = Object.assign({}, this.game.rows[index]);
    //   this.game.form.color = this.game.form.color == "0" ? false : true;

    //   // console.log(this.game.form.image);
    //   this.game.form.image.forEach((v, i) => {
    //     // console.log(v);
    //     this.game.form.image[i] = Object.assign(
    //       {},
    //       this.game.form.image[i]
    //     );
    //   });

    //   // console.log(this.game.form);
    //   // this.game.form.image = JSON.parse(this.game.form.image)

    //   // }, 5000);

    //   // this.game.form = this.game.rows[index]
    //   this.game.current = code;
    //   // this.game_search();

    //   this.game.controll = "edit";
    // },
    // game_save(type) {
    //   if (!this.game.current) {
    //     if (this.game.controll == "create") {
    //       this.game.form.code = this.game.rows.length;
    //       this.game.rows = [{ ...this.game.form }].concat(this.game.rows);
    //       // this.game.rows.push({ ...this.game.form });
    //       this.game.modal = false;
    //     } else {
    //       //  this.game.form.code = this.game.rows.length
    //       let index = this.game.rows.findIndex(
    //         (v) => v.code == this.game.current
    //       );
    //       this.game.rows[index] = { ...this.game.form };

    //       // this.game.rows.push({ ...this.game.form });
    //       this.game.modal = false;
    //     }
    //   } else {
    //     console.table(this.game.form.image);
    //     let array_image = [];
    //     this.game.form.image.forEach((v, i) => {
    //       console.log(v);
    //       if (v.temp) {
    //         let image = { ...v };
    //         delete image.temp;
    //         array_image[i] = image;
    //       } else {
    //         array_image[i] = { ...v };
    //       }
    //       // console.log(this.game.form.image[i])
    //     });
    //     //  console.table(this.game.form.image);

    //     // game.form.facilities
    //     // smoking facilities view musthaves size title code
    //     let obj = {
    //       game: this.game.current,

    //       smoking: this.game.form.smoking,
    //       facilities: this.game.form.facilities,
    //       view: this.game.form.view,
    //       musthaves: this.game.form.musthaves,
    //       size: this.game.form.size,
    //       title: this.game.form.title,
    //       description: this.game.form.description,

    //       price: this.game.form.price,

    //       // code: this.game.form.code,
    //       // title: this.game.form.title,
    //       // price: this.game.form.price,
    //       image: array_image,
    //       // color: this.game.form.color,
    //       // color_code: this.game.form.color_code,
    //       // link: this.game.form.link,
    //     };
    //     console.log(obj);
    //     if (this.game.controll == "edit") {
    //       obj["code"] = this.game.form.code;
    //     }
    //     fetch(`${this.ServiceUrl}controllers/game`, {
    //       method: this.game.controll == "create" ? "POST" : "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(obj),
    //     })
    //       .then((response) => response.json())
    //       .then((res) => {
    //         if (res.success) {
    //           this.game.modal = false;

    //           if (type == "static") {
    //             this.game_search();
    //           }

    //           // this.game_search();
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
    //   if (this.remove.controll != "game" && this.game.current == 0) {
    //     console.log(this.remove.code);
    //     let index = this.game.rows.findIndex(
    //       (v) => v.code == this.remove.code
    //     );
    //     console.log(index);
    //     console.log(this.game.rows);
    //     this.game.rows.splice(index, 1);
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
    // REMOVE
    remove_item(code, controll) {
      console.log(code);
      this.remove.code = code;
      this.remove.controll = controll;
    },
    confirm_remove() {
      if (this.game.current == 0) {
        console.log(this.remove.code);
        let index = this.detail.rows.findIndex(
          (v) => v.code == this.remove.code
        );
        console.log(index);
        console.log(this.detail.rows);
        this.detail.rows.splice(index, 1);
        this.remove.modal = false;
      } else {
        fetch(`${this.ServiceUrl}controllers/admin/game`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("_jwt")}`,
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
      }
    },
  },
  mounted() {
    this.game_search();
    //  mounted() {
    this.tmpsLink = this.tmpsLink = `${this.ServiceUrl}tmps/`;
    // },
  },
  watch: {
    "game.form.email"(value) {
      // binding this to the data value in the email input
      this.game.form.email = value;
      this.validateEmail(value);
    },
  },
};
</script>

<template>
  <div class="Member">
    <AdminLayout>
      <!-- <template #modal> </template> -->
      <template #view>
        <div
          class="grid grid-cols-1 gap-6 lg:px-10 lg:pt-5 lg:pb-0 xl:grid-cols-1"
        >
          <div
            class="card col-span-4 row-span-4 shadow-lg bg-base-200 m-4 lg:m-0"
          >
            <!-- <div class="card col-span-4 row-span-4 shadow-lg bg-base-100"> -->
            <div class="card-body py-0">
              <h2 class="my-4 text-4xl font-bold card-title">
                <!-- <div class="flex-0"></div> -->
                <div class="w-full">
                  <input
                    type="text"
                    placeholder="Search"
                    class="input input-ghost w-full"
                    @input="user_search"
                    v-model="user.q"
                  />
                </div>
                <!-- <div
                  class="flex-1 justify-end space-x-2 card-actions float-right"
                >
               
                  <label
                    for="modal-user"
                    class="btn btn-primary modal-button"
                    @click="user_create()"
                    >Create</label
                  >
                </div> -->
              </h2>
            </div>
            <!-- </div> -->
            <div
              class="card-body overflow-auto bg-base-100"
              style="max-height: 70vh"
            >
              <div class="overflow-x-auto w-full">
                <table class="table table-compact w-full mb-4">
                  <!-- head -->
                  <thead>
                    <tr>
                      <th>รหัส / ผู้ใช้งาน</th>
                      <th>ประเภท</th>
                      <!-- <th>ห้อง</th> -->
                      <th>วันที่สมัคร</th>
              
                      <th>เบอร์โทร</th>
                              <th>คะแนน</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- row 1 -->
                    <tr v-for="(v, i) in user.rows" :key="i">
                      <th>
                        <div class="flex items-center space-x-3">
                          <div>
                            <!-- <div class="font-bold">{{ v.code }}</div> -->
                            <div class="text-sm font-bold">
                              {{ v.code }}
                            </div>
                            <div class="text-sm opacity-50">
                              {{ v.firstname }} {{ v.lastname }}
                            </div>
                          </div>
                        </div>

                        <!-- {{ v.userTitle }} -->
                      </th>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">{{ v.type }}</div>
                            <div
                              class="text-sm opacity-50"
                              v-if="v.type == 'facebook'"
                            >
                              {{ v.facebook }}
                            </div>
                            <div class="text-sm opacity-50" v-else>
                              {{ v.email }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <!-- <th>{{ v.userTitle }}</th> -->
                      <td>
                        <div class="text-sm opacity-50">
                          วันที่สมัคร : {{ v.created_at }}
                        </div>
                        <div class="text-sm opacity-50">
                          วันที่ยืนยัน :
                          {{
                            v.veridated_at ? v.veridated_at : "ยังไม่ได้ยืนยัน"
                          }}
                        </div>
                      </td>
                      <!-- <td>{{ v.veridated_at }}</td> -->
                      <td>
                        {{ v.mobile?v.mobile:'ไม่ระบุ' }}
                      </td>
                      <td>
                        {{ v.coin?v.coin:'0' }}
                      </td>
                      <td class="text-right">
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
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- <table class="table table-normal w-full">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="hover"
                      v-for="(row, index) in user.rows"
                      :key="row.code"
                    >
                      <th>
                        <div class="flex items-center space-x-3">
                     
                          <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                              <img
                                v-if="row.image.length > 0"
                                :src="`${row.imageLink}${
                                  row.image[row.master ? row.master : 0].file
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
                            <div class="font-bold">{{ row.title }}</div>
                           
                            <div class="text-sm opacity-50">
                              code : {{ row.code }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="crop">
                        {{ row.description }}
                        <br />
                      </td>
                      
                      <th class="text-right">
                        <label
                          for="modal-user"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="user_edit(`${row.code}`, `${index}`)"
                          >edit
                        </label>
                        |
                        <label
                          for="modal-remove"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="remove_item(`${row.code}`, 'user')"
                          >remove
                        </label>
                      </th>
                    </tr>
                  </tbody>
                </table> -->
              </div>
            </div>
          </div>
          <PageinationModule
            :page="user.page"
            :total="user.total"
            :row="user.row"
            :back="user.back"
            :next="user.next"
            :loading="user.loading"
            @search="
              (res) => {
                user.page = res.page;
                this.user_search();
              }
            "
          />
        </div>
      </template>
    </AdminLayout>
  </div>
</template>
<script>
// @ is an alias to /src
import AdminLayout from "@/components/Admin/layout.vue";
// import UploadModule from "@/components/Admin/module/web/Upload.vue";
import PageinationModule from "@/components/Admin/module/web/Pageination.vue";

export default {
  name: "Member",
  components: {
    AdminLayout,
    PageinationModule,
  },
  data() {
    return {
      user: {
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
          name: "",
          number: "",
          size: "",
          description: "",
          category_id: "0",
          store_id: "0",
          recommend: "",
          room: "",
          imageLink: "",
          image: [],
        },
      },
      // user: {
      //   controll: "",
      //   rows: [],
      //   page: 1,
      //   row: 99999,
      //   modal: false,
      //   form: {
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
      //     // user.form.facilities
      //     imageLink: "",
      //     image: [],
      //     // color: "",
      //     // color_code: "",
      //     link: "",
      //   },
      // },
      // remove: {
      //   current: 0,
      //   model: false,
      //   controll: "",
      // },
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    // _jwt() {
    //   return this.$store.getters._jwt;
    // },
  },
  methods: {
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
      fetch(`${vm.ServiceUrl}controllers/admin/user`, {
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
            vm.user_search();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // update_reward(v) {
    //   // console.log(v)
    //   fetch(`${this.ServiceUrl}controllers/reward`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       user: v.user,
    //       user:v.user
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((res) => {
    //       if (res.success) {
    //         this.user_search();
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // },
    // close(v) {
    //   fetch(`${this.ServiceUrl}controllers/user`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       code: v.code,
    //       status: "ปิด",
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((res) => {
    //       if (res.success) {
    //         this.update_reward(v)
    //         this.user_search();
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // },
    // approve(code) {
    //   fetch(`${this.ServiceUrl}controllers/user`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       code: code,
    //       status: "ชำระเงินแล้ว",
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((res) => {
    //       if (res.success) {
    //         this.user_search();
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // },
    // reject(code) {
    //   fetch(`${this.ServiceUrl}controllers/payment`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       code: code,
    //       status: "ชำระเงินแล้ว",
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((res) => {
    //       if (res.success) {
    //         this.user_search();
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // },
    // setTemp(temp) {
    //   console.log(temp);
    //   this.temp = temp;
    // },
    // // CATEGORY
    // category_search() {
    //   this.category_get((res) => {
    //     this.category.rows = res;
    //   });
    // },
    // category_get(callback) {
    //   // console.log(this.user.q)
    //   fetch(
    //     `${this.ServiceUrl}controllers/category?page=${this.category.page}${
    //       this.category.row ? `&rows=${this.category.row}` : ""
    //     }${this.category.q ? `&q=${this.category.q}` : ""}`,
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
    //       callback(res.success ? res.rows : []);
    //     })
    //     .catch((error) => {
    //       callback([]);
    //       console.error("Error:", error);
    //     });
    // },
    // // STORE
    // store_search() {
    //   this.store_get((res) => {
    //     this.store.rows = res;
    //   });
    // },
    // store_get(callback) {
    //   // console.log(this.user.q)
    //   fetch(
    //     `${this.ServiceUrl}controllers/store?page=${this.store.page}${
    //       this.store.row ? `&rows=${this.store.row}` : ""
    //     }${this.store.q ? `&q=${this.store.q}` : ""}`,
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
    //       callback(res.success ? res.rows : []);
    //     })
    //     .catch((error) => {
    //       callback([]);
    //       console.error("Error:", error);
    //     });
    // },
    // PRODUCT
    user_search() {
      this.user.loading = true;
      this.user_get((res) => {
        this.user.rows = res.rows;
        this.user.total = res.total;
        // console.log(this.user.page*this.user.row)

        // console.log(this.user.total)
        this.user.next =
          this.user.page * this.user.row >= this.user.total ? false : true;
        this.user.back = this.user.page > 1 ? true : false;

        this.user.loading = false;
      });
    },
    user_get(callback) {
      // console.log(this.user.q)
      fetch(
        `${this.ServiceUrl}controllers/admin/user?page=${this.user.page}${
          this.user.row ? `&rows=${this.user.row}` : ""
        }${this.user.q ? `&q=${this.user.q}` : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${localStorage.getItem("_jwt")}`,
          },
          // body: JSON.stringify({
          //     "uuid": localStorage.getItem('uuid'),
          // }),
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
    user_create() {
      // console.log("CREATE");
      this.user.current = 0;
      this.user.rows = [];
      // this.category_search();

      // this.store_search();
      this.user.form = {
        code: "",
        name: "",
        size: "",
        number: "",
        description: "",
        store_id: "0",
        category_id: "0",
        recommend: "",
        room: "",
        imageLink: "",
        image: [],
      };
      this.user.controll = "create";
    },
    user_edit(code, index) {
      // this.category_search();
      // this.store_search();
      // console.log(id,index);
      this.user.form = { ...this.user.rows[index] };
      // this.user.form.category_id = this.user.form.category_id
      //   ? this.user.form.category_id
      //   : "0";
      // this.user.form.store_id = this.user.form.store_id
      //   ? this.user.form.store_id
      //   : "0";
      this.user.form.recommend = this.user.form.recommend == "1" ? true : false;
      //  this.user.form.store_id = this.user.form.store_id == "0" ? false : true;

      //  this.user.rows[index]["category_id"] = ? this.user.rows[index]["category_id"]
      //     : "0",
      // store_id: this.user.rows[index]["store_id"]
      //   ? this.user.rows[index]["store_id"]
      //   : "0",
      // recommend: this.user.rows[index]["recommend"] == "1" ? true : false,
      // this.user.form = this.user.rows[index]
      this.user.current = code;
      this.user_search();
      this.user.controll = "edit";
    },
    user_save() {
      let image = { ...this.user.form.image[0] };
      delete image.temp;

      console.log(image);
      let vm = this;
      fetch(`${this.ServiceUrl}controllers/user`, {
        method: this.user.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: this.user.current,
          title: this.user.form.title,
          size: this.user.form.size,
          number: this.user.form.number,
          description: this.user.form.description,
          category_id: this.user.form.category_id,
          store_id: this.user.form.store_id,
          recommend: this.user.form.recommend,
          room: this.user.form.room,
          image: [image],
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            this.user.modal = false;
            const promise_arr = [];
            console.log(this.user.current);
            if (this.user.current == 0) {
              this.user.current = res.row.code;
              let i = this.user.rows.length;
              // console.log(i)
              this.user.controll = "create";
              for (i; i > 0; i--) {
                // this.user.rows.forEach((v, i) => {
                // console.log(v, i);

                this.user.form = {
                  code: this.user.rows[i - 1]["code"],
                  title: this.user.rows[i - 1]["title"],
                  price: this.user.rows[i - 1]["price"],
                  image: this.user.rows[i - 1]["image"],
                  // imageLink: this.user.rows[i - 1]["imageLink"],
                  color: this.user.rows[i - 1]["color"],
                  color_code: this.user.rows[i - 1]["color_code"],
                  link: this.user.rows[i - 1]["link"],
                };

                promise_arr.push(
                  new Promise(async function (resolve, reject) {
                    let res = await vm.user_save("dynamic");
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
                vm.user_search();
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
    // // user
    // user_search() {
    //   this.user_get((res) => {
    //     this.user.rows = res;
    //   });
    // },
    // user_get(callback) {
    //   fetch(
    //     `${this.ServiceUrl}controllers/user?user_code=${
    //       this.user.current
    //     }&page=${this.user.page}${
    //       this.user.row ? `&rows=${this.user.row}` : ""
    //     }${this.user.q ? `&q=${this.user.q}` : ""}`,
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
    // user_create() {
    //   console.log("user_create");
    //   // this.clearimage();
    //   this.user.current = 0;
    //   console.log("callback");
    //   // this.user.rows = [];
    //   this.user.form = {
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
    //     // user.form.facilities
    //     imageLink: "",
    //     image: [],
    //     // color: "",
    //     // color_code: "",
    //     // link: "",
    //   };
    //   this.user.controll = "create";
    // },
    // user_edit(code, index) {
    //   // console.log("user_edit");
    //   // this.clearimage();
    //   // console.log(id,index);
    //   // setTimeout(() => {
    //   this.user.current = code;
    //   this.user.form = Object.assign({}, this.user.rows[index]);
    //   this.user.form.color = this.user.form.color == "0" ? false : true;

    //   // console.log(this.user.form.image);
    //   this.user.form.image.forEach((v, i) => {
    //     // console.log(v);
    //     this.user.form.image[i] = Object.assign(
    //       {},
    //       this.user.form.image[i]
    //     );
    //   });

    //   // console.log(this.user.form);
    //   // this.user.form.image = JSON.parse(this.user.form.image)

    //   // }, 5000);

    //   // this.user.form = this.user.rows[index]
    //   this.user.current = code;
    //   // this.user_search();

    //   this.user.controll = "edit";
    // },
    // user_save(type) {
    //   if (!this.user.current) {
    //     if (this.user.controll == "create") {
    //       this.user.form.code = this.user.rows.length;
    //       this.user.rows = [{ ...this.user.form }].concat(this.user.rows);
    //       // this.user.rows.push({ ...this.user.form });
    //       this.user.modal = false;
    //     } else {
    //       //  this.user.form.code = this.user.rows.length
    //       let index = this.user.rows.findIndex(
    //         (v) => v.code == this.user.current
    //       );
    //       this.user.rows[index] = { ...this.user.form };

    //       // this.user.rows.push({ ...this.user.form });
    //       this.user.modal = false;
    //     }
    //   } else {
    //     console.table(this.user.form.image);
    //     let array_image = [];
    //     this.user.form.image.forEach((v, i) => {
    //       console.log(v);
    //       if (v.temp) {
    //         let image = { ...v };
    //         delete image.temp;
    //         array_image[i] = image;
    //       } else {
    //         array_image[i] = { ...v };
    //       }
    //       // console.log(this.user.form.image[i])
    //     });
    //     //  console.table(this.user.form.image);

    //     // user.form.facilities
    //     // smoking facilities view musthaves size title code
    //     let obj = {
    //       user: this.user.current,

    //       smoking: this.user.form.smoking,
    //       facilities: this.user.form.facilities,
    //       view: this.user.form.view,
    //       musthaves: this.user.form.musthaves,
    //       size: this.user.form.size,
    //       title: this.user.form.title,
    //       description: this.user.form.description,

    //       price: this.user.form.price,

    //       // code: this.user.form.code,
    //       // title: this.user.form.title,
    //       // price: this.user.form.price,
    //       image: array_image,
    //       // color: this.user.form.color,
    //       // color_code: this.user.form.color_code,
    //       // link: this.user.form.link,
    //     };
    //     console.log(obj);
    //     if (this.user.controll == "edit") {
    //       obj["code"] = this.user.form.code;
    //     }
    //     fetch(`${this.ServiceUrl}controllers/user`, {
    //       method: this.user.controll == "create" ? "POST" : "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(obj),
    //     })
    //       .then((response) => response.json())
    //       .then((res) => {
    //         if (res.success) {
    //           this.user.modal = false;

    //           if (type == "static") {
    //             this.user_search();
    //           }

    //           // this.user_search();
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
    //   if (this.remove.controll != "user" && this.user.current == 0) {
    //     console.log(this.remove.code);
    //     let index = this.user.rows.findIndex(
    //       (v) => v.code == this.remove.code
    //     );
    //     console.log(index);
    //     console.log(this.user.rows);
    //     this.user.rows.splice(index, 1);
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
    this.user_search();
    //  mounted() {
    this.tmpsLink = this.tmpsLink = `${this.ServiceUrl}tmps/`;
    // },
  },
};
</script>

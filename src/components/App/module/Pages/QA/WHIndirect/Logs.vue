<template>
  <div class="Logs">

  
        <!-- <div class="grid grid-cols-1 gap-6 lg:px-10 lg:py-2"> -->
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100 border-2 mt-4">
            <div class="card-body overflow-auto">
              <div
                class="contents lg:inline-flex lg:join my-5 w-full md:justify-center lg:justify-end"
              >
                <div class="contents sm:join md:join lg:join xl:join">
                  <div class="join join-item">
                    <button
                      class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      วันที่
                    </button>
                    <input
                      type="date"
                      placeholder="title"
                      class="join-item input input-sm input-bordered border-base-content"
                      v-model="date.from"
                      @change="change"
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
                      v-model="date.to"
                      @change="change"
                    />
                  </div>
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
                </div>
                <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white "
                  @click="exportExcel()"
                >
                  <Icon
                    icon="mdi:file-excel-outline"
                    class="h-5 w-5 text-white"
                /></label>

                <!-- <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white"
                  @click="base_create()"
                  >Create</label
                > -->
              </div>
              <div class="overflow-x-auto w-full max-h-[60vh] lg:max-h-[65vh]">
                <table
                  class="table table-xs table-pin-rows table-pin-cols table-zebra"
                >
                  <thead>
                    <tr>
                      <th>Code</th>
                      <td>Status</td>
                      <td>Item Code</td>
                      <td>Item Title</td>
                      <td>qty</td>
                      <td>price</td>
                      <td>Doc ref</td>
                      <td>Creation</td>
                      <td>Updation</td>
                      
                      <td>Deletion</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(v, i) in base.rows"
                      :key="v.code"



                      :class="
                        v.deleted_at?` text-gray-500 line-through decoration-red-500`:``
                      "
                    >
                      <th>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{ v.code }}
                            </div>
                            <div class="text-xs">( {{ v.id }} )</div>
                          </div>
                        </div>
                      </th>
                      <td>
                        <span class="pr-2">{{ v.status }}</span>
                      </td>
           
                      <td>{{ v.doc }}</td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{ v.title }}
                            </div>
                            <div class="text-xs">{{ v.item }}</div>
                          </div>
                        </div>
                      </td>
                      <td>{{ v.qty }}</td>
                      <td>{{ v.price }}</td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{ v.requestTitle ? v.requestTitle : "-" }}
                            </div>
                            <div class="text-xs">
                              {{ v.doc ? v.doc : "-" }}
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
                            <div class="text-xs">
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
                            <div class="text-xs">
                              {{
                                v.updated_fullname
                                  ? v.updated_fullname
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
                                v.deleted_at &&
                                $moment(v.deleted_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.deleted_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                v.deleted_fullname
                                  ? v.deleted_fullname
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="w-full">
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
        <!-- </div> -->
  

  </div>
</template>
<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalScannerDetect from "@/components/App/Module/Global/ScannerDetect.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "Logs",
  components: {
    AppLayout,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalScannerDetect,
  },
  data() {
    return {
      vers: 2,
      vers2Active: false,
      scan: false,
      date: {
        from: "",
        to: "",
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
        },
      },
      remove: {
        current: 0,
        model: false,
        controll: "",
        tb: "",
      },
      imagerow: null,
      item: {
        rows: [],
        total: 0,
        page: 1,
        row: null,
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
    responseScan(res) {
      // console.error("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
      // console.log(res);
      // this.base.form.scan_code = res;

      if (this.detail.modal && this.detail.form.ref_code == res) {
        return this.detail.form.qty++;
      }

      new Query('detail','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/item?total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }&scan_code=${res}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });

          if (res.total > 0) {
            let row = res.rows[0];

            let index = -1;
            if (row.code == this.detail.form.item) {
              index = this.detail.rows.findIndex(
                (v) => v.item == this.detail.form.item
              );
            }

            if (index >= 0) {
              this.detail_edit(this.detail.rows[index].code);
              this.detail.form.qty++;
            } else {
              // res.total ? (this.base.form.scan = res.rows[0]) : "";

              this.detail.form.title = row.title;
              this.detail.form.item = row.code;
              this.detail.form.ref_code = row.ref_code;
              this.detail.form.amount = row.amount;
              
              this.detail.form.qty = 1;
              this.detail.controll = "create";
              // this.detail.form.ref_code
            }

            this.detail.modal = true;
            // console.log(index);
          }
        }
        callback({ ...res });
      });
    },
    exportExcel() {
      return window.open(`${
        this.serviceUrl
      }api/controllers/MYSQL/INTERNAL/WH/exports?db=shelf&total=1&page=${
        this.base.page
      }${this.base.row ? `&rows=${this.base.row}` : ""}${
        this.base.q ? `&q=${this.base.q}` : ""
      }${this.wh ? `&wh=${this.wh}` : ""}${
        this.date.from ? `&createFrom=${this.date.from}` : ""
      }${
        this.date.to ? `&createTo=${this.date.to}` : ""
      }&transref=I&transref_type_null=1

        `);
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
      new Query('base','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction?total=1&action=all&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`, (res) => {
        if (res.success) {
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
        code: "",
        item_code: "",
        item_name: "",
        item_short_code: "",
        pack_size: "",
        unit: "",
        uom: "",
        status: "",
        newStatus: "",
      };
      this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.form.newStatus = this.base.form.status;
      this.base.current = code;
      this.detail.rows = [];
      this.base.controll = "edit";
      // this.detail_search();
      this.refresh = true;
    },
    base_save() {
      let vm = this;

      // let image = { ...this.base.form.image[0] };
      // delete image.temp;

      if (this.vers == 2) {
        // console.log(this.detail.rows);
        this.base.current = "1";
        let i = this.detail.rows.length;
        this.detail.controll = "create";
        let promise_arr = [];

        for (i; i > 0; i--) {
          this.detail.form = { ...this.detail.rows[i - 1] };
          this.detail.form.status = this.base.form.status;
          promise_arr.push(
            new Promise(async function (resolve, reject) {
              let res = await vm.detail_save("dynamic");
              await resolve(res);
              return;
            })
          );
        }
        return Promise.all(promise_arr)
          .then((res) => {
            // console.log(res);
            vm.base_search();
            this.base.modal = false;
          })
          .catch((err) => console.error(err));
      }
      this.base.form.status = this.base.form.newStatus;
      // console.log(this.base.form.status);
      new Query('base', this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction`, { rows: [{ ...this.base.form }] }, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
        } else {
          this.base.modal = false;
          // const promise_arr = [];
          // console.log(this.base.current);
          // if (this.base.current == 0) {
          //   this.base.current = res.row.code;
          //   let i = this.detail.rows.length;
          //   this.detail.controll = "create";
          //   for (i; i > 0; i--) {
          //     this.detail.form = {
          //       code: this.detail.rows[i - 1]["code"],
          //       title: this.detail.rows[i - 1]["title"],
          //     };
          //     promise_arr.push(
          //       new Promise(async function (resolve, reject) {
          //         let res = await vm.detail_save("dynamic");
          //         await resolve(res);
          //         return;
          //       })
          //     );
          //   }
          // }

          // Promise.all(promise_arr)
          //   .then((res) => {
          //     // console.log(res);
          //     vm.base_search();
          //   })
          //   .catch((err) => console.error(err));
        }
      });
    },

    status_item(status, code, controll, tb) {
      let obj = {
        rows: [
          {
            code: code,
            status: status,
          },
        ]
      };

      new Query(controll, 'put').set(this, `${this.serviceUrl}api/${tb}`, obj, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
        } else {
          // console.log(res);
          // this.remove.modal = false;
          this[`${controll}_search`]();
        }
      });
    },
    // REMOVE
    remove_item(code, controll, tb) {
      // console.log(code);
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
            this.base.modal = false;
            this[`${this.remove.controll}_search`]();
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

        // console.log(this.detail.rows);
      });
    },
    detail_get(callback) {
      new Query('detail','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction?total=1&page=${
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
        qty: "",
        price: "",
        image: [],
        imageLink: "",
        color: "",
        color_code: "",
        link: "",
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
      // console.log(this.base.current)
      // console.log(this.detail.controll)
      if (!this.base.current) {
        if (this.detail.controll == "create") {
          // console.log("AAAAAAAAAAAAAAAAA")

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
        // let obj = {
        //   emp: this.base.current,
        //   code: this.detail.form.code,
        //   email: this.detail.form.email,
        // };
        // console.log(obj);
        // if (this.detail.controll == "edit") {
        //   obj["code"] =
        // this.detail.form.code;
        // }
        console.error(this.base.form.doc);
        this.detail.form.doc = this.base.form.doc;

        new Query('detail', this.detail.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction`, obj, (res) => {
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
    // Item
    item_search(callback) {
      this.item.loading = true;
      this.item_get((res) => {
        this.item.rows = res.rows;
        this.item.total = res.total;
        this.item.next =
          this.item.page * this.item.row >= this.item.total ? false : true;
        this.item.back = this.item.page > 1 ? true : false;
        this.item.loading = false;
        callback(res);
      });
    },
    item_get(callback) {
      new Query('item','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort?total=1&wh=wh1&item_list=1&wh=${this.user.branchTitle}&short_code=${this.base.form.item_short_code}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },

    // RequestItem
    req_item_search(callback) {
      this.item.loading = true;
      this.req_item_get((res) => {
        this.item.rows = res.rows;
        this.item.total = res.total;
        this.item.next =
          this.item.page * this.item.row >= this.item.total ? false : true;
        this.item.back = this.item.page > 1 ? true : false;
        this.item.loading = false;
        callback(res);
      });
    },
    req_item_get(callback) {
      new Query('item','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/request_item?total=1&doc=${this.base.form.doc}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();
      
    });
  },
  watch: {
    "base.modal": function (v) {
      if (!v) {
        this.vers = 2;
        this.vers2Active = false;
        this.base.form.status = "";
      }
    },
    "base.form.item_short_code": function (val) {
      if (this.base.controll == "create") {
        this.base.form.item_code = "";
        this.base.form.item_name = "";
      }

      if (val) {
        this.item_search((res) => {
          if (this.item.rows.length == 1) {
            this.base.form.item_code = this.item.rows[0].item_code;
            this.base.form.item_wh = this.item.rows[0].wh;
          }
        });
      }
    },
    "base.form.item_code": function (val) {
      if (val) {
        new Query('base','get').get(this, `${this.serviceUrl}api/controllers/SAP/${
            this.base.form.item_wh ? this.base.form.item_wh : "UBA"
          }/oitm?item_code=${val}`, (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });

            this.base.form.item_code = res.rows[0].ItemCode;
            this.base.form.item_name = res.rows[0].ItemName;
            this.base.form.uom = res.rows[0].UomCode;
          }
          callback({ ...res });
        });
      }
    },
    "detail.form.qty": function (val) {
      // console.log(this.detail.form.qty)
      // console.log(this.detail.form.amount)
      // console.log(val)
      if(this.base.form.status == 'export'){
        if(parseInt(val) > parseInt(this.detail.form.amount) ){
        this.detail.form.qty = this.detail.form.amount>0?this.detail.form.amount:0
      }
      }
    
    }
  },
};
</script>
<style scrop>
tr,
td {
  white-space: nowrap;
}
</style>

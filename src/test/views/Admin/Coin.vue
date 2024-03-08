<template>
  <div class="Coin">
    <AdminLayout>
      <template #modal> </template>
      <template #view>
        <div
          class="grid grid-cols-1 gap-6 lg:px-10 lg:pt-5 lg:pb-0 xl:grid-cols-1"
        >
          <div
            class="card col-span-4 row-span-4 shadow-lg bg-base-200 m-4 lg:m-0"
          >
            <div class="card-body py-0">
              <h2 class="my-4 text-4xl font-bold card-title">
                <div class="w-full">
                  <input
                    type="text"
                    placeholder="Search"
                    class="input input-ghost w-full"
                    @input="coin_search"
                    v-model="coin.q"
                  />
                </div>
              </h2>
            </div>
            <div
              class="card-body overflow-auto bg-base-100"
              style="max-height: 70vh"
            >
              <div class="overflow-x-auto w-full">
                <table class="table table-compact w-full mb-4">
                  <thead>
                    <tr>
                      <th>รหัส / รหัสผู้ใช้</th>
                      <th>ประเภท</th>
                      <th>จำนวน</th>
                      <th>เจ้าของ</th>
                      <th>วันที่บันทึก</th>
                      <!-- <th></th> -->
                   
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in coin.rows" :key="i">
                      <th>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-sm font-bold">
                              {{ v.code }}
                            </div>
                            <div class="text-sm opacity-50">
                              {{ v.user }}
                            </div>
                          
                          </div>
                        </div>
                      </th>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-sm font-bold">
                              {{ v.type }}
                            </div>
                            <!-- <div class="text-sm opacity-50">
                              {{ v.coin }}
                            </div> -->
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <!-- <div class="text-sm font-bold">
                              {{ v.type }}
                            </div> -->
                            <div class="text-sm font-bold">
                              {{ v.coin }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">{{ v.userType }}</div>
                            <div
                              class="text-sm opacity-50"
                              v-if="v.userType == 'facebook'"
                            >
                              {{ v.facebook }}
                            </div>
                            <div class="text-sm opacity-50" v-else>
                              {{ v.email }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <!-- <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-sm font-bold">
                              {{ v.firstname }} {{ v.lastname }}
                            </div>
                          </div>
                        </div>
                      </td> -->
                      <td>
                        <!-- <div class="text-sm font-bold">
                          {{ v.firstname }} {{ v.lastname }}
                         
                        </div> -->
                        <div class="text-sm opacity-50">
                          {{ v.created_at }}
                        </div>
                      </td>
                     
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <PageinationModule
            :page="coin.page"
            :total="coin.total"
            :row="coin.row"
            :back="coin.back"
            :next="coin.next"
            :loading="coin.loading"
            @search="
              (res) => {
                coin.page = res.page;
                this.coin_search();
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
  name: "Coin",
  components: {
    AdminLayout,
    PageinationModule,
  },
  data() {
    return {
      coin: {
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
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
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
      fetch(`${vm.ServiceUrl}controllers/admin/coin`, {
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
            vm.coin_search();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    coin_search() {
      this.coin.loading = true;
      this.coin_get((res) => {
        this.coin.rows = res.rows;
        this.coin.total = res.total;
        this.coin.next =
          this.coin.page * this.coin.row >= this.coin.total
            ? false
            : true;
        this.coin.back = this.coin.page > 1 ? true : false;

        this.coin.loading = false;
      });
    },
    coin_get(callback) {
      fetch(
        `${this.ServiceUrl}controllers/admin/coin?page=${
          this.coin.page
        }${this.coin.row ? `&rows=${this.coin.row}` : ""}${
          this.coin.q ? `&q=${this.coin.q}` : ""
        }`,
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
    coin_create() {
      this.coin.current = 0;
      this.coin.rows = [];
      this.coin.form = {
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
      this.coin.controll = "create";
    },
    coin_edit(code, index) {
      this.coin.form = { ...this.coin.rows[index] };
      this.coin.current = code;
      this.coin_search();
      this.coin.controll = "edit";
    },
    coin_save() {
      let image = { ...this.coin.form.image[0] };
      delete image.temp;

      console.log(image);
      let vm = this;
      fetch(`${this.ServiceUrl}controllers/coin`, {
        method: this.coin.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: this.coin.current,
          title: this.coin.form.title,
          size: this.coin.form.size,
          number: this.coin.form.number,
          description: this.coin.form.description,
          category_id: this.coin.form.category_id,
          store_id: this.coin.form.store_id,
          recommend: this.coin.form.recommend,
          room: this.coin.form.room,
          image: [image],
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            this.coin.modal = false;
            console.log(this.coin.current);
            if (this.coin.current == 0) {
              this.coin.current = res.row.code;
              let i = this.coin.rows.length;
              this.coin.controll = "create";
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  mounted() {
    this.coin_search();
  },
};
</script>

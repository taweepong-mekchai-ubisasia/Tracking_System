<template>
  <div class="Gameplay">
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
                    @input="gameplay_search"
                    v-model="gameplay.q"
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
                      <th>รหัส / ผู้ใช้งาน</th>
                      <th>เกมส์</th>
                      <th>วันที่เล่น</th>
                      <th>ผู้เล่น</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in gameplay.rows" :key="i">
                      <th>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-sm font-bold">
                              {{ v.code }}
                            </div>
                            <div class="text-sm opacity-50">
                              {{ v.firstname }} {{ v.lastname }}
                            </div>
                          </div>
                        </div>
                      </th>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-sm font-bold">
                              {{ v.game_type }}
                            </div>
                            <div class="text-sm opacity-50">
                              uuid : {{ v.game_uid }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-sm opacity-50">
                          วันที่สร้าง : {{ v.created_at }}
                        </div>
                        <div class="text-sm opacity-50">
                          วันที่ยืนยัน :
                          {{ v.updated_at ? v.updated_at : "ยังไม่ได้ยืนยัน" }}
                        </div>
                      </td>
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
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <PageinationModule
            :page="gameplay.page"
            :total="gameplay.total"
            :row="gameplay.row"
            :back="gameplay.back"
            :next="gameplay.next"
            :loading="gameplay.loading"
            @search="
              (res) => {
                gameplay.page = res.page;
                this.gameplay_search();
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
  name: "Gameplay",
  components: {
    AdminLayout,
    PageinationModule,
  },
  data() {
    return {
      gameplay: {
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
      fetch(`${vm.ServiceUrl}controllers/admin/gameplay`, {
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
            vm.gameplay_search();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    gameplay_search() {
      this.gameplay.loading = true;
      this.gameplay_get((res) => {
        this.gameplay.rows = res.rows;
        this.gameplay.total = res.total;
        this.gameplay.next =
          this.gameplay.page * this.gameplay.row >= this.gameplay.total
            ? false
            : true;
        this.gameplay.back = this.gameplay.page > 1 ? true : false;

        this.gameplay.loading = false;
      });
    },
    gameplay_get(callback) {
      fetch(
        `${this.ServiceUrl}controllers/admin/gameplay?page=${
          this.gameplay.page
        }${this.gameplay.row ? `&rows=${this.gameplay.row}` : ""}${
          this.gameplay.q ? `&q=${this.gameplay.q}` : ""
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
    gameplay_create() {
      this.gameplay.current = 0;
      this.gameplay.rows = [];
      this.gameplay.form = {
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
      this.gameplay.controll = "create";
    },
    gameplay_edit(code, index) {
      this.gameplay.form = { ...this.gameplay.rows[index] };
      this.gameplay.current = code;
      this.gameplay_search();
      this.gameplay.controll = "edit";
    },
    gameplay_save() {
      let image = { ...this.gameplay.form.image[0] };
      delete image.temp;

      console.log(image);
      let vm = this;
      fetch(`${this.ServiceUrl}controllers/gameplay`, {
        method: this.gameplay.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: this.gameplay.current,
          title: this.gameplay.form.title,
          size: this.gameplay.form.size,
          number: this.gameplay.form.number,
          description: this.gameplay.form.description,
          category_id: this.gameplay.form.category_id,
          store_id: this.gameplay.form.store_id,
          recommend: this.gameplay.form.recommend,
          room: this.gameplay.form.room,
          image: [image],
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            this.gameplay.modal = false;
            console.log(this.gameplay.current);
            if (this.gameplay.current == 0) {
              this.gameplay.current = res.row.code;
              let i = this.gameplay.rows.length;
              this.gameplay.controll = "create";
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  mounted() {
    this.gameplay_search();
  },
};
</script>

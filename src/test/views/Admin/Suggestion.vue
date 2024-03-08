<template>
  <div class="Suggestion">
    <AdminLayout>
      <template #modal> </template>
      <template #view>
        <div class="grid grid-cols-1">
          <div class="card col-span-4 row-span-4 m-4 lg:m-0">
            <div class="card-body py-0">
              <h2 class="lg:my-4 text-4xl font-bold card-title">
                <div class="w-full">
                  <input
                    type="text"
                    placeholder="Search"
                    class="input input-ghost w-full"
                    @input="suggestion_search"
                    v-model="suggestion.q"
                  />
                </div>
              </h2>
            </div>
            <div
              class="card-body overflow-auto p-2 py-0"
              style="max-height: calc(100vh - 250px)"
            >
              <div class="overflow-x-auto w-full">
                <table class="table table-compact w-full">
                  <thead>
                    <tr>
                      <th style="z-index: 200">รหัส / index</th>
                      <th>ข้อความ</th>
                      <th>ตำแหน่ง</th>
                      <th>วันที่</th>
                      <th>สถานะ</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in suggestion.rows" :key="i">
                      <th>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-sm font-bold">
                              {{ v.keyin }}
                            </div>
                            <div class="text-sm opacity-50">
                              {{ v.key }}
                            </div>
                          </div>
                        </div>
                      </th>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-sm font-bold">
                              {{ v.text }}
                            </div>
                            <!-- <div class="text-sm opacity-50">
                              lat : {{ v.lat }}
                            </div>
                            <div class="text-sm opacity-50">
                              lng : {{ v.lng }}
                            </div> -->
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <!-- <div class="text-sm font-bold">
                             
                            </div> -->
                            <div class="text-sm opacity-50">
                              lat : {{ v.lat }}
                            </div>
                            <div class="text-sm opacity-50">
                              lng : {{ v.lng }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-sm font-bold">
                          {{ v.timestamp }}
                        </div>
                        <!-- <div class="text-sm opacity-50">
                          วันที่สร้าง :  {{ v.timestamp }}
                        </div> -->
                        <!-- <div class="text-sm opacity-50">
                          วันที่ยืนยัน :
                          {{ v.updated_at ? v.updated_at : "ยังไม่ได้ยืนยัน" }}
                        </div> -->
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">
                              {{ v.approve ? "อนุมัติแล้ว" : "รอตรวจสอบ" }}
                            </div>
                            <!-- <div
                              class="text-sm opacity-50"
                              v-if="v.type == 'facebook'"
                            >
                              {{ v.approve }}
                            </div> -->
                            <!-- <div class="text-sm opacity-50" v-else>
                              {{ v.email }}
                            </div> -->
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">
                              <a href="#" @click="approve(v)" v-if="!v.approve"
                                >อนุมัติ</a
                              >
                              <span v-if="!v.approve" class="mx-2">|</span>
                              <a href="#" @click="remove(v)">ลบ</a>
                              <!-- {{ v.approve?'อนุมัติ':'ลบ' }} -->
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
            class="px-8 lg:pt-4"
            :page="suggestion.page"
            :total="suggestion.total"
            :row="suggestion.row"
            :back="suggestion.back"
            :next="suggestion.next"
            :loading="suggestion.loading"
            @search="
              (res) => {
                suggestion.page = res.page;
                this.suggestion_search();
              }
            "
          />
        </div>
      </template>
    </AdminLayout>
  </div>
</template>
<script>
import AdminLayout from "@/components/App/layout.vue";
import PageinationModule from "@/components/App/Module/web/Pageination.vue";
const firebase = require("../../firebaseConfig.js");
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  update,
  remove,
  query,
  orderByChild,
  limitToLast,
  equalTo,
  onDisconnect,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";
export default {
  name: "Suggestion",
  components: {
    AdminLayout,
    PageinationModule,
  },
  data() {
    return {
      suggestion: {
        rows: [],
        total: 0,
        page: 1,
        row: 1,
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
    approve(v) {
      const updates = {};
      v.approve = !v.approve;
      updates[`suggestion/${v.key}/${v.keyin}`] = v;
      return update(ref(firebase.db), updates);
    },
    remove(v) {
      return remove(ref(firebase.db, `suggestion/${v.key}/${v.keyin}`));
    },
    update: (obj, vm) => {
      fetch(`${vm.ServiceUrl}controllers/app/suggestion`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            vm.suggestion_search();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    suggestion_search() {
      this.suggestion.loading = true;
      this.suggestion_get((res) => {
        console.log(res);
        this.suggestion.rows = res.rows;
        this.suggestion.total = res.total;
        this.suggestion.next =
          this.suggestion.page * this.suggestion.row >= this.suggestion.total
            ? false
            : true;
        this.suggestion.back = this.suggestion.page > 1 ? true : false;

        this.suggestion.loading = false;
      });
    },
    suggestion_get(callback) {
      // console.log(firebase)
      // this.ref = ref(firebase, `suggestion`);
      const _query = query(
        ref(firebase.db, `suggestion/`)
        // orderByChild("approve"),
        // equalTo(true),
        // limitToLast(1)
      );
      // console.log(mostViewedPosts)
      onValue(_query, (snapshot) => {
        // console.log(snapshot.ref.key)
        // console.log(this.index)
        // if (parseInt(snapshot.ref.key) !== this.index) {
        //   return;
        // }
        const data = snapshot.val();
        console.log(data);
        let rows = [];
        let total = 0;
        for (let key in data) {
          for (let keyin in data[key]) {
            let row = Object({ ...data[key][keyin] });
            row.key = key;
            row.keyin = keyin;
            rows.push(row);
            total++;
          }
        }
        console.log(rows);
        callback({ rows: rows, total: total });
        // callback(data);
        // this.clear();
        // this.render(data);
        // updateStarCount(postElement, data);
      });
      // fetch(
      //   `${this.ServiceUrl}controllers/app/suggestion?page=${
      //     this.suggestion.page
      //   }${this.suggestion.row ? `&rows=${this.suggestion.row}` : ""}${
      //     this.suggestion.q ? `&q=${this.suggestion.q}` : ""
      //   }`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",

      //       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      //     },
      //   }
      // )
      //   .then((response) => response.json())
      //   .then((res) => {
      //     callback(
      //       res.success
      //         ? { rows: res.rows, total: res.total }
      //         : { rows: [], total: 0 }
      //     );
      //   })
      //   .catch((error) => {
      //     callback([]);
      //     console.error("Error:", error);
      //   });
    },
    suggestion_create() {
      this.suggestion.current = 0;
      this.suggestion.rows = [];
      this.suggestion.form = {
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
      this.suggestion.controll = "create";
    },
    suggestion_edit(code, index) {
      this.suggestion.form = { ...this.suggestion.rows[index] };
      this.suggestion.current = code;
      this.suggestion_search();
      this.suggestion.controll = "edit";
    },
    suggestion_save() {
      let image = { ...this.suggestion.form.image[0] };
      delete image.temp;

      console.log(image);
      let vm = this;
      fetch(`${this.ServiceUrl}controllers/app/suggestion`, {
        method: this.suggestion.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: this.suggestion.current,
          title: this.suggestion.form.title,
          size: this.suggestion.form.size,
          number: this.suggestion.form.number,
          description: this.suggestion.form.description,
          category_id: this.suggestion.form.category_id,
          store_id: this.suggestion.form.store_id,
          recommend: this.suggestion.form.recommend,
          room: this.suggestion.form.room,
          image: [image],
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            this.suggestion.modal = false;
            console.log(this.suggestion.current);
            if (this.suggestion.current == 0) {
              this.suggestion.current = res.row.code;
              let i = this.suggestion.rows.length;
              this.suggestion.controll = "create";
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  mounted() {
    this.suggestion_search();
  },
};
</script>
<style scoped>
.input::placeholder {
  color: #e3b5d5;
}
table {
  margin: 1em 0;
  border-collapse: collapse;
  border: 0.1em solid #d6d6d6;
}

th,
td {
  padding: 0.25em 0.5em 0.25em 1em;
  vertical-align: text-top;
  text-align: left;
  text-indent: -0.5em;
}

th {
  vertical-align: bottom;
  color: #fff;
}

/* Fixed Headers */
th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
}

th[scope="row"] {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 1;
}

th[scope="row"] {
  vertical-align: top;
  color: inherit;
  background-color: inherit;
  background: #e3b5d5;
  border-color: white;
}

th:not([scope="row"]):first-child {
  left: 0;
  z-index: 3;
  background: #e3b5d5;
  border-color: white;
}
td {
  border-color: white;
}
</style>
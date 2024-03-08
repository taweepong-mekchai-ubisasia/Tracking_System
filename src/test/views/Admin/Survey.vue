<template>
  <div class="Member">
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
                    @input="user_search"
                    v-model="user.q"
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
                      <th>ประเภทผู้ใช้</th>
                      <th>ความพึงพอใจ</th>
                      <th>ประสบการณ์</th>
                      <th>ข้อเสนอแนะ</th>
                      <th>วันที่บันทึก</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in user.rows" :key="i">
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
                      <td>
                        {{ v.experience  }}
                      </td>
                      <td>
                        {{ v.experience  }}
                      </td>
                      <td>
                        <span v-html="withBrTags(v.feedback)"></span>
                    
                      </td>
                      <td>
                        {{ v.created_at }}
                      </td>
                    </tr>
                  </tbody>
                </table>
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
// import UploadModule from "@/components/App/Module/Global/Upload.vue";
import PageinationModule from "@/components/App/Module/Global/Pageination.vue";

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
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
  },
  methods: {
    withBrTags(val) {
    // const doc = this.item.licensedocument.legal.documentText
    let text = JSON.stringify(val)
    // console.log(text)
    text = text.replace(/(\\r)*\\n/g, '<br>')
    // console.log(text)
    return JSON.parse(text)
  },
    user_search() {
      this.user.loading = true;
      this.user_get((res) => {
        this.user.rows = res.rows;
        this.user.total = res.total;
        this.user.next =
          this.user.page * this.user.row >= this.user.total ? false : true;
        this.user.back = this.user.page > 1 ? true : false;

        this.user.loading = false;
      });
    },
    user_get(callback) {
      fetch(
        `${this.ServiceUrl}controllers/admin/survey?page=${
          this.user.page
        }${this.user.row ? `&rows=${this.user.row}` : ""}${
          this.user.q ? `&q=${this.user.q}` : ""
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
          if (res.rows.length > 0) {
            res.rows.forEach((v, i) => {
              res.rows[i].paymentImage = v.paymentImage
                ? JSON.parse(v.paymentImage)
                : [];
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
  },
  mounted() {
    this.user_search();
  },
};
</script>

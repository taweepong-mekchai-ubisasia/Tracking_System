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
        <div class="modal">
          <div class="modal-box relative w-6/12 max-w-5xl">
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold">Access</h3>

            <div role="tablist" class="tabs tabs-lifted">
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                class="tab"
                aria-label="Information"
                checked
              />
              <div
                role="tabpanel"
                class="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-auto w-full"
                style="max-height: 60vh"
              >
                <div class="card-body mt-0 pt-0">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">ชื่อ Access</span>
                    </label>
                    <input
                      type="text"
                      placeholder="ชื่อแผนก"
                      class="input input-bordered"
                      v-model="base.form.title"
                    />
                  </div>
                  <div class="form-control">
                    <div
                      class="collapse collapse-arrow bg-primary text-white min-h-[auto]"
                    >
                      <input type="checkbox" class="min-h-[auto]" />
                      <div
                        class="collapse-title text-sm font-medium min-h-[auto] p-4"
                      >
                        Guide
                      </div>
                      <div class="collapse-content bg-base-100 text-black">
                        <div class="overflow-x-auto">
                          <table
                            class="table table-xs table-pin-rows table-pin-cols"
                          >
                            <tbody>
                              <tr>
                                <th>None</th>
                                <td>
                                  <div class="badge">No permission</div>
                                </td>
                              </tr>
                              <tr>
                                <th>User</th>
                                <td>
                                  <div class="badge">Read</div>
                                </td>
                              </tr>
                              <tr>
                                <th>Super User</th>
                                <td>
                                  <div class="badge">Read</div>
                                  <div class="badge">Request</div>
                                </td>
                              </tr>
                              <tr>
                                <th>Admin</th>
                                <td>
                                  <div class="badge">Read</div>
                                  <div class="badge">Request</div>
                                  <div class="badge">Approve</div>
                                </td>
                              </tr>
                              <tr>
                                <th>Super Admin</th>
                                <td>
                                  <div class="badge">Read</div>
                                  <div class="badge">Request</div>
                                  <div class="badge">Approve</div>
                                  <div class="badge">Spacial</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="divider">รายการเมนู</div>
                <ul class="menu px-4 py-0">
                  <AppModuleMenu_
                    v-if="base.modal"
                    :menutype="'access'"
                    :access="base.form.access"
                    @object_access="
                      (obj) => {
                        base.form.access = obj;
                      }
                    "
                  />
                </ul>
              </div>
            </div>

            <!-- </div> -->

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
                      base_search();
                    }
                  "
                />
                <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary text-white modal-button"
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
                      <th>ID</th>
                      <th>Title</th>
                      <th>Creation</th>
                      <th>Updation</th>
                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="hover"
                      v-for="(row, index) in base.rows"
                      :key="row.code"
                    >
                      <th>{{ row.id }}</th>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-sm">{{ row.title }}</div>
                            <div class="text-sm">{{ row.code }}</div>
                          </div>
                        </div>
                      </td>
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
                            <div class="text-xs">
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
                            <div class="text-xs">
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
                          class="btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${row.code}`, `${index}`)"
                          >edit
                        </label>
                        |
                        <label
                          for="modal-remove"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${row.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/System/access'
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
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleMenu_ from "@/components/App/Module/Menu/_.vue";

export default {
  name: "Department",
  components: {
    AppLayout,
    AppModuleGlobalPageination,
    AppModuleGlobalSearch,
    AppModuleMenu_,
  },
  data() {
    return {
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
          // ref: "",
        },
      },
      remove: {
        current: 0,
        model: false,
        controll: "",
        tb: "",
      },
    };
  },
  computed: {
    ServiceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      return this.$store.getters.user_token;
    },
  },
  methods: {
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
      fetch(
        `${
          this.$store.state.serviceUrl
        }controllers/MYSQL/INTERNAL/System/access?total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`,
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
          callback([]);
          console.error("Error:", error);
        });
    },
    base_create() {
      this.base.current = 0;
      this.base.form = {
        title: "",
        access: {},
      };
      this.base.controll = "create";
    },
    base_edit(code, index) {
      // this.base.form = { ...this.base.rows[index] };
      // this.base.form.category_code = this.base.form.category_code
      //   ? this.base.form.category_code
      //   : "0";
      // this.base.form.recommend = this.base.form.recommend == "1" ? true : false;
      // this.base.current = code;
      // this.base.controll = "edit";

      this.base.form = { ...this.base.rows[index] };
      this.base.form.access = JSON.parse(this.base.form.access);
      // console.log(this.base.form.access)
      // this.base.form.category_code = this.base.form.category_code
      //   ? this.base.form.category_code
      //   : "0";
      // this.base.form.recommend = this.base.form.recommend == "1" ? true : false;
      this.base.current = code;
      // this.detail_search();
      this.base.controll = "edit";
      // this.detail_search();
      // this.refresh = true;
    },
    base_save() {
      let vm = this;
      fetch(
        `${this.$store.state.serviceUrl}controllers/MYSQL/INTERNAL/System/access`,
        {
          method: this.base.controll == "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
          body: JSON.stringify({
            code: this.base.current,
            title: this.base.form.title,
            access: this.base.form.access,
          }),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            this.base.modal = false;
            vm.base_search();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // REMOVE
    remove_item(code, controll, tb) {
      console.log(code);
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    confirm_remove() {
      fetch(`${this.$store.state.serviceUrl}${this.remove.tb}`, {
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
    this.$nextTick(() => this.base_search());
  },
};
</script>
<style scoped>
.collapse-arrow > .collapse-title:after {
  top: 1.7rem;
}
</style>

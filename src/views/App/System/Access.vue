<template>
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
          class="modal-box relative w-11/12 lg:w-6/12 xl:w-4/12 max-w-5xl p-2 lg:p-4 max-h-screen"
        >
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕
          </label>
          <h3 class="text-lg font-bold text-primary">ACCESS</h3>
          <div class="divider my-1"></div>

          <div
            class="bg-base-100 border-base-300 rounded-box p-0 lg:p-6 overflow-auto w-full max-h-[60vh]"
          >
            <div class="card-body mt-0 pt-0">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Access Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Access Title"
                  class="input input-bordered border-base-content"
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
                    style="width: inherit"
                  >
                    Guide
                  </div>
                  <div
                    class="collapse-content bg-base-100 text-black w-full overflow-auto"
                  >
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
            <div class="divider">Menu List</div>
            <ul class="menu px-4 py-0">
              <AppModuleMenu_
                v-if="base.modal"
                :menutype="'Access'"
                :access="base.form.access"
                @object_access="
                  (obj) => {
                    base.form.access = obj;
                  }
                "
                :color="[`text-blue-600`, `text-blue-600`]"
                :icon="`icon-park-outline:list-one`"
              />
            </ul>
          </div>
          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
            <div class="flex-1 form-control mt-6">
              <label for="modal-base" class="btn btn-danger">Cancel</label>
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
          <h3 class="text-lg font-bold text-error">REMOVE ITEM</h3>
          <div class="divider mt-1"></div>
          <div class="card-body overflow-auto max-h-[60vh]">
            Are your sure for remove this item?
          </div>

          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
            <div class="flex-1 form-control mt-6">
              <label for="modal-remove" class="btn btn-danger">Cancel</label>
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
      <div class="grid grid-cols-1 gap-6">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-2 lg:p-4">
            <div>
              <div
                v-if="base.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div :class="`${base.loading ? 'blur-sm' : ''}`">
                <div class="join w-full justify-center md:justify-end">
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
                  <label
                    for="modal-base"
                    class="join-item btn-sm btn btn-primary text-white modal-button"
                    @click="base_create()"
                    >Create</label
                  >
                </div>
                <div
                    class="overflow-x-auto w-full max-h-[60vh] min-h-[60vh] my-4"
                  >
                    <div v-if="!base.loading && base.rows.length == 0">
                      <AppModuleGlobalEmptyData
                        :class="`p-4 py-12 text-3xl text-center`"
                      />
                    </div>
                    <table
                      v-else
                    class="table table-xs table-pin-rows table-pin-cols table-zebra"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <td>Code</td>
                        <td>Title</td>
                        <td>Creation</td>
                        <td>Updation</td>
                        <th class="text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="hover"
                        v-for="(v, i) in base.rows"
                        :key="v.code"
                      >
                      <th>
                          {{ v.id }}
                        </th>
                        <td>
                          {{ v.code }}
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="text-sm">{{ v.title }}</div>
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
                        <th class="text-right">
                          <label
                            for="modal-base"
                            class="btn btn-link text-warning no-underline modal-button btn-xs"
                            @click="base_edit(`${v.code}`, `${i}`)"
                            >Edit
                          </label>
                          
                          <label
                            for="modal-remove"
                            class="btn btn-link text-error no-underline modal-button btn-xs"
                            @click="
                              remove_item(
                                `${v.code}`,
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
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>
<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleMenu_ from "@/components/App/Module/Menu/_.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "Department",
  components: {
    AppLayout,
    AppModuleGlobalPageination,
    AppModuleGlobalSearch,
    AppModuleMenu_,
    AppModuleGlobalLoadingText,AppModuleGlobalEmptyData
  },
  data() {
    return {
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
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      return this.$store.getters.user_token;
    },
  },
  methods: {
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
        }api/controllers/MYSQL/INTERNAL/System/access?total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`, (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
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
        title: "",
        access: {},
      };
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.form.access = JSON.parse(this.base.form.access);
      this.base.current = code;
      this.base.controll = "edit";
    },
    base_save() {
      let obj = {
        code: this.base.current,
        rows: [
          {
            ...Object.assign({ ...this.base.form }),
          },
        ],
      };

      new Query('base', this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/access`, obj, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
        } else {
          this.base.modal = false;
          this.base.page = 1;
          this.base_search();
        }
      });
    },
    // REMOVE
    remove_item(code, controll, tb) {
      console.log(code);
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    // REMOVE
    remove_item(code, controll, tb) {
      console.log(code);
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
        body: JSON.stringify({ rows: [{ code: this.remove.code }] }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            this.remove.modal = false;
            this[`${this.remove.controll}_search`]();
          }
        })
        .catch((error) => {
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
/* Guide */
.collapse-arrow > .collapse-title:after {
  top: 1.7rem;
}
</style>

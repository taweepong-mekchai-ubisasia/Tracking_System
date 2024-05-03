<template>
  <div class="Visitor">
    <AppLayout>
      <template #modal>
        <!-- modal base -->
        <input
          type="checkbox"
          id="modal-base"
          class="modal-toggle"
          v-model="base.modal"
        />
        <div class="modal" v-if="base.modal">
          <div
            class="modal-box relative w-11/12 max-w-5xl p-2 lg:p-4 max-h-screen"
          >
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold">Visitor</h3>

            <div
              class="bg-base-100 border-base-300 rounded-box p-6 overflow-auto w-full max-h-[60vh]"
            >
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  class="input input-bordered border-base-content"
                  v-model="base.form.title"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Description</span>
                </label>
                <textarea
                  class="textarea textarea-bordered h-24"
                  placeholder="Description"
                  v-model="base.form.description"
                ></textarea>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">What do you need?</span>
                </label>
                <VueMultiselect
                  v-model="base.form.need_item"
                  :options="options_select"
                  tag-placeholder="What do you need?"
                  placeholder="Search or add a needed"
                  label="name"
                  track-by="code"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag_need"
                >
                </VueMultiselect>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Which email notification?</span>
                </label>
                <VueMultiselect
                  v-model="base.form.email"
                  :options="options_select_email"
                  tag-placeholder="Which email notification?"
                  placeholder="Search or add a tag email notification"
                  label="name"
                  track-by="code"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag_email"
                >
                </VueMultiselect>
              </div>

              <div class="grid gap-4 md:grid-cols-2 grid-cols-2">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Desired date</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Desired date"
                    class="input input-bordered border-base-content"
                    v-model="base.form.desired_date"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Desired date</span>
                  </label>
                  <input
                    type="time"
                    placeholder="Desired date"
                    class="input input-bordered border-base-content"
                    v-model="base.form.desired_time"
                  />
                </div>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Early notification</span>
                </label>
                <input
                  type="date"
                  placeholder="Desired date"
                  class="input input-bordered border-base-content"
                  v-model="base.form.early_notification"
                />
              </div>
            </div>
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
            <div class="card-body overflow-auto max-h-[60vh]">
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

        <!-- modal detail -->
        <input
          type="checkbox"
          id="modal-detail"
          class="modal-toggle"
          v-model="detail.modal"
        />
        <div class="modal" v-if="detail.modal">
          <div class="modal-box relative">
            <label
              for="modal-detail"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕</label
            >
            <h3 class="text-lg font-bold">Email</h3>
            <div class="card-body overflow-auto max-h-[60vh]">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.email"
                />
              </div>
            </div>
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-detail" class="btn btn-danger">Cancle</label>
              </div>
              <div class="flex-1 form-control mt-6">
                <button
                  class="btn btn-primary text-white"
                  @click="detail_save('static')"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        <AppModuleGlobalShowImage :src="imageSrc" />
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
                          base.q = q;
                          base.page = 1;
                          base_search();
                        }
                      "
                    />
                    <label
                      for="modal-base"
                      class="join-item btn-sm btn btn-primary modal-button text-white"
                      @click="base_create()"
                      >Create</label
                    >
                  </div>
                  <div
                    class="overflow-x-auto w-full max-h-[60vh] min-h-[60vh] my-4"
                  >
                    <table
                      class="table table-xs table-pin-rows table-pin-cols table-zebra"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <td>Code</td>
                          <td>Title</td>
                          <td>Description</td>
                          <td>Need item</td>
                          <td>Early notification</td>
                          <td>Desired Date</td>
                          <td>Desired Time</td>
                          <td>Creation</td>
                          <td>Updation</td>
                          <th class="text-right"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(v, i) in base.rows" :key="v.code">
                          <th>{{ v.id }}</th>
                          <td>{{ v.code }}</td>
                          <td>
                            <div class="font-bold">
                              {{ v.title ? v.title : "-" }}
                            </div>
                          </td>
                          <td>
                            <div class="font-bold">
                              {{ v.description ? v.description : "-" }}
                            </div>
                          </td>
                          <td>
                            <div
                              tabindex="0"
                              class="collapse collapse-plus border border-base-300 bg-white"
                              v-if="v.need_item.length > 0"
                            >
                              <div class="text-xs font-medium text-center">
                                Detail
                              </div>
                              <div class="collapse-content p-0 ">
                                <div class="overflow-x-auto max-h-24">
                                  <table
                                    class="table table-xs table-pin-rows table-pin-cols"
                                  >
                                    <tbody>
                                      <tr v-for="(v, i) in v.need_item">
                                        <th>{{ i + 1 }}</th>
                                        <th>{{ v.name }}</th>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                
                              </div>
                            </div>
                          </td>
                          <td>
                 
                            <div
                              tabindex="0"
                              class="collapse collapse-plus border border-base-300 bg-white"
                              v-if="v.email.length > 0"
                            >
                              <div class="text-xs font-medium text-center">
                                Detail
                              </div>
                              <div class="collapse-content p-0">
                                <div class="overflow-x-auto max-h-24">
                                  <table
                                    class="table table-xs table-pin-rows table-pin-cols"
                                  >
                                    <tbody>
                                      <tr   v-for="(v, i) in v.email">
                                        <th>{{ i + 1 }}</th>
                                        <th>{{ v.name }}</th>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                               
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="font-bold">
                              {{
                                v.early_notification
                                  ? v.early_notification
                                  : "-"
                              }}
                            </div>
                          </td>
                          <td>
                            <div class="font-bold">
                              {{ v.desired_date ? v.desired_date : "-" }}
                            </div>
                          </td>
                          <td>
                            <div class="font-bold">
                              {{ v.desired_time ? v.desired_time : "-" }}
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
                                <div class="text-xs opacity-30">
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
                                <div class="text-xs opacity-30">
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
                              class="join-item btn btn-link text-warning no-underline modal-button btn-xs"
                              @click="base_edit(`${v.code}`, `${i}`)"
                              >Edit
                            </label>

                            <label
                              for="modal-remove"
                              class="join-item btn btn-link text-error no-underline modal-button btn-xs"
                              @click="
                                remove_item(
                                  `${v.code}`,
                                  'base',
                                  'controllers/MYSQL/INTERNAL/TRR/visitor'
                                )
                              "
                              >Remove
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
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import VueMultiselect from "vue-multiselect";

export default {
  name: "Visitor",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    VueMultiselect,
    AppModuleGlobalLoadingText,
  },
  data() {
    return {
      value_select: [],
      options_select: [],

      value_select_email: [],
      options_select_email: [],

      loadimage: false,
      options: {
        penColor: "#c0f",
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
          ref: "",
        },
      },
      remove: {
        current: 0,
        model: false,
        controll: "",
        tb: "",
      },
      imageSrc: null,
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
    addTag_need(newTag) {
      // console.log(this.options_select)
      // console.log(this.base.form.need_item)
      console.log(newTag);
      const tag = {
        code: newTag,
        name: newTag,
      };
      this.options_select.push(tag);
      this.base.form.need_item.push(tag);
      // console.log(this.options_select)
      // console.log(this.base.form.need_item)
    },
    addTag_email(newTag) {
      console.log(newTag);
      const tag = {
        name: newTag,
      };
      this.options_select_email.push(tag);
      this.base.form.email.push(tag);
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
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/TRR/visitor?total=1&page=${
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
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            res.rows.forEach((v, i) => {
              res.rows[i].need_item = v.need_item
                ? JSON.parse(v.need_item)
                : [];
              res.rows[i].email = v.email ? JSON.parse(v.email) : [];
            });
          }
          callback(
            res.success
              ? { rows: res.rows, total: res.total }
              : { rows: [], total: 0 }
          );
        })
        .catch((error) => {
          // callback([]);
          // localStorage.removeItem("user_token");
          // this.$router.push({name:"AppLogin"})
          console.error("Error:", error);
        });
    },
    base_create() {
      this.base.current = 0;
      this.base.form = {
        code: "",
        need_item: [],
        email: [],
      };
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };

      this.options_select = [...this.base.rows[index]["need_item"]];
      this.options_select_email = [...this.base.rows[index]["email"]];

      this.base.current = code;
      this.base.controll = "edit";
    },
    base_save() {
      let obj = {
        code: this.base.current,
        rows: [
          {
            ...Object.assign(
              { ...this.base.form },
              {
                need_item: JSON.stringify(this.base.form["need_item"]),
                email: JSON.stringify(this.base.form["email"]),
              }
            ),
          },
        ],
      };

      fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/TRR/visitor`, {
        method: this.base.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            this.base.modal = false;
            this.base.page = 1;
            this.base_search();
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
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
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
    this.$nextTick(() => {
      this.base_search();
    });
  },
  watch: {
    "base.form.desired_date": function (v) {
      if (!this.base.form.early_notification) {
        this.base.form.early_notification = v;
      }
    },
  },
};
</script>
<style scrop>
tr,
td {
  white-space: nowrap;
}
/* 
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  } */

#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #000000, #000000);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.container {
  width: "100%";
  padding: 8px 16px;
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}
</style>

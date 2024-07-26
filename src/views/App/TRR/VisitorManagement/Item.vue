<template>
  <AppLayout>
    <template #modal>
      <!-- modal base -->
      <!-- <input
        type="checkbox"
        id="modal-base"
        class="modal-toggle"
        v-model="base.modal"
      />
      <div class="modal" v-if="base.modal">
        <div
          class="modal-box relative w-11/12 max-w-xl p-2 lg:p-4 max-h-screen"
        >
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕
          </label>
          <h3 class="text-lg font-bold text-primary">Item</h3>
          <div class="divider my-1"></div>
          <div class="p-6 overflow-auto w-full max-h-[60vh]">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                class="input input-bordered border-base-content"
                v-model="base.form.name"
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
            <div class="form-control pt-4">
              <div class="w-full overflow-auto">
                <label class="label cursor-pointer">
                  <span class="label-text">Unit</span>
                </label>
                <table
                  class="table table-xs table-pin-rows table-pin-cols table-zebra"
                >
                  <thead>
                    <tr>
                      <th v-if="removing">
                        <input
                          type="checkbox"
                          class="checkbox checkbox-sm"
                          id="my-checkbox"
                          ref="removeingList"
                          @click="
                            () => {
                              $refs.removeingList.indeterminate = false;
                              if ($refs.removeingList.checked) {
                                detail.rows = detail.rows.map((v) => {
                                  v.remove = true;
                                  return v;
                                });
                              } else {
                                detail.rows = detail.rows.map((v) => {
                                  v.remove = false;
                                  return v;
                                });
                              }
                            }
                          "
                        />
                      </th>
                      <th>#</th>
                      <td>Unit</td>
                      <td>Description</td>
                      <th class="text-right">
                        <div v-if="!removing">
                          <button
                            class="btn btn-xs btn-primary text-white mr-1"
                            :class="base.controll != 'create' ? 'mr-1' : ''"
                            @click="detail_add_row()"
                          >
                            <Icon icon="el:file-new" />
                          </button>
                          <button
                            v-if="base.controll != 'create'"
                            class="btn btn-xs btn-error text-white"
                            @click="removing = true"
                          >
                            <Icon icon="icomoon-free:bin" />
                          </button>
                        </div>
                        <div v-else>
                          <label
                            for="modal-remove"
                            class="btn btn-xs btn-error text-white mr-1"
                            @click="
                              removeAllSelect(
                                'detail',
                                'controllers/MYSQL/INTERNAL/TRR/visitor_item_unit'
                              )
                            "
                          >
                            <Icon icon="ic:outline-check" />
                          </label>
                          <button
                            class="btn btn-xs btn-warning btn-primary text-white mr-1"
                            @click="
                              () => {
                                removing = false;
                                this.detail.rows.map(
                                  (v) => (v['remove'] = false)
                                );
                              }
                            "
                          >
                            <Icon icon="ic:twotone-close" />
                          </button>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="hover"
                      v-for="(v, i) in detail.rows"
                      :key="i"
                      :class="`${v.removed || v.remove ? 'disabled' : ''}`"
                    >
                      <th v-if="removing">
                        <div class="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            class="checkbox checkbox-sm"
                            :checked="v.remove"
                            @click="
                              () => {
                                v.remove = !v.remove;
                                let remove = detail.rows.filter(
                                  (v) => v.remove
                                );
                                if (remove.length == 0) {
                                  $refs.removeingList.checked = false;
                                  $refs.removeingList.indeterminate = false;
                                } else if (
                                  remove.length == detail.rows.length
                                ) {
                                  $refs.removeingList.checked = true;
                                  $refs.removeingList.indeterminate = false;
                                } else {
                                  $refs.removeingList.checked = false;
                                  $refs.removeingList.indeterminate = true;
                                }
                              }
                            "
                          />
                        </div>
                      </th>
                      <th>
                      
                        <div class="text-sm" v-if="!v.new">
                          <span
                            v-if="v.edit"
                            class="badge badge-sm badge-warning text-white"
                          >
                            Edit
                          </span>
                          <span>{{ v.code ? v.code : "-" }}</span>
                        </div>
                        <span
                          v-else
                          class="badge badge-sm badge-primary text-white"
                        >
                          N<span class="hidden md:block">ew</span>
                        </span>
                      </th>
                      <td>
                        <input
                          class="input input-xs input-bordered border-base-content join-item w-full"
                          placeholder="Unit"
                          v-model="v.unit_name"
                          @keyup="
                            () => {
                              v.new ? '' : (v.edit = true);
                            }
                          "
                          :disabled="removing"
                        />
                      </td>
                      <td>
                        <textarea
                          class="textarea textarea-bordered textarea-xs"
                          placeholder="Description"
                          v-model="base.form.description"
                        ></textarea>
                      </td>
                      <th class="text-right">
                        <label
                          v-if="!removing && v.id"
                          for="modal-remove"
                          class="btn btn-link no-underline text-error modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'detail',
                              'controllers/MYSQL/INTERNAL/TRR/visitor_item_unit'
                            )
                          "
                        >
                          Remove
                        </label>
                        <button
                          v-if="!removing && !v.id"
                          class="btn btn-link no-underline text-error modal-button btn-xs"
                          @click="detail.rows.splice(index, 1)"
                        >
                          Drop
                        </button>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
      </div> -->

      <AppModulePagesTRRVisitorModalItem :base="base" component_name="" @success="()=>{
            this.base.page = 1;
              this.base_search();
      }"/>
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
                    class="join-item btn-sm btn btn-primary modal-button text-white"
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
                        <td>Name</td>
                        <td>Creation</td>
                        <td>Updation</td>
                        <th class="text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(v, i) in base.rows" :key="v.code">
                        <th>
                          {{ v.id }}
                        </th>

                        <td>
                          {{ v.code }}
                        </td>
                        <td>
                          {{ v.name }}
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
                                  v.created_fullname ? v.created_fullname : "-"
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
                                  v.updated_fullname ? v.updated_fullname : "-"
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
                                'controllers/MYSQL/INTERNAL/HR/employee'
                              )
                            "
                            >Remove
                            <!-- {{ v.code }} -->
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
                    base_search();
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
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModulePagesTRRVisitorModalItem from "@/components/App/Module/Pages/TRR/Visitor/Modal/Item.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "Employee",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModulePagesTRRVisitorModalItem
  },
  data() {
    return {
      temp: [],
      removing: false,
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
      new Query("base", "get").get(
        this,
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/TRR/visitor_item?total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`,
        (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
          }
          callback({ ...res });
        }
      );
    },
    base_create() {
      this.removing = false;
      this.base.current = 0;
      this.base.form = {
        code: "",
        name: "",
      };
      this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.removing = false;
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.detail.rows = [];
      this.base.controll = "edit";
      this.detail_search();
    },
    base_save() {
      let vm = this;
      if (this.base.controll == "create") {
        this.base.form.new_password = this.base.form.uid;
      }
      let obj = {
        code: this.base.current,
        rows: [
          {
            ...Object.assign({ ...this.base.form }),
          },
        ],
      };

      new Query("base", this.base.controll == "create" ? "POST" : "PUT").set(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/TRR/visitor_item`,
        obj,
        (res) => {
          if (!res.success) {
          } else {
            this.base.current == 0
              ? (this.base.current = res.rows[0].code)
              : "";
            this.detail.controll = "create";
            const detail = new Promise(
              async (resolve, reject) => await resolve(vm.detail_save())
            );

            detail.then((res) => {
              this.base.modal = false;
              this.base.page = 1;
              this.detail.page = 1;
              this.base_search();
            });
          }
        }
      );
    },
    // DETAIL
    detail_search() {
      this.detail.loading = true;
      this.detail_get((res) => {
        this.detail.rows = res.rows;
        this.detail.total = res.total;
        this.detail.next =
          this.detail.page * this.detail.row >= this.detail.total
            ? false
            : true;
        this.detail.back = this.detail.page > 1 ? true : false;
        this.detail.loading = false;
      });
    },
    detail_get(callback) {
      new Query("detail", "get").get(
        this,
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/TRR/visitor_item_unit?total=1&page=${
          this.detail.page
        }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
          this.detail.q ? `&q=${this.detail.q}` : ""
        }${this.base.current ? `&current=${this.base.current}` : ``}`,
        (res) => {
          if (res.success) {
          }
          callback({ ...res });
        }
      );
    },
    detail_add_row() {
      this.detail.form = {
        code: this.$moment().format("YYYYMMDD") + this.detail.rows.length,
        new: true,
      };
      this.detail.rows.unshift(this.detail.form);
    },
    detail_create() {
      this.detail.current = 0;
      this.detail.form = {
        code: "",
      };
      this.detail.controll = "create";
    },
    detail_edit(code) {
      this.detail.current = code;
      let index = this.detail.rows.findIndex(
        (v) => v.code == this.detail.current
      );
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.controll = "edit";
    },
    detail_save() {
      let rows = this.detail.rows.map((v) =>
        Object.assign({}, v, { item: this.base.current })
      );
      if (rows.length == 0) {
        return;
      }

      let object = {
        POST: rows.filter((v) => v.new),
        PUT: rows.filter((v) => v.edit),
      };

      console.log(object);
      for (let key in object) {
        if (object[key].length == 0) {
          continue;
        }

        new Query("detail", key).set(
          this,
          `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/TRR/visitor_item_unit`,
          { rows: object[key] },
          (res) => {
            if (!res.success) {
            } else {
              console.log(res);
            }
          }
        );
      }
    },
    // REMOVE
    removeAllSelect(controll, tb) {
      // this.removing = false;
      let rows = this.detail.rows.filter((v) => v["remove"]);

      // console.log(code);
      this.remove.rows = rows;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    remove_item(code, controll, tb) {
      // console.log(code);
      this.remove.rows = null;
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
          rows: this.remove.rows
            ? this.remove.rows
            : [{ code: this.remove.code }],
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (!res.success) {
          } else {
            let index = this.detail.rows.findIndex(
              (v) => v.code == this.remove.code
            );
            console.log(this.remove.rows ? "a" : "b");
            this.remove.rows
              ? (this.remove.rows = [])
              : index >= 0
              ? (this.detail.rows[index]["removed"] = true)
              : "";
            this.remove.modal = false;
            this.removing = false;
            this.remove.controll == "detail"
              ? ""
              : this[`${this.remove.controll}_search`]();
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
};
</script>

<style>
tr.disabled {
  pointer-events: none;
  opacity: 0.3;
  text-decoration: line-through;
  text-decoration-color: red;
}
</style>

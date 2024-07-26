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
          class="modal-box relative w-12/12 lg:w-10/12 xl:w-10/12 max-w-4xl p-2 lg:p-4 max-h-screen"
        >
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕
          </label>
          <h3 class="text-lg font-bold text-primary">ACCESS</h3>
          <div class="divider my-1"></div>

          <div
            class="bg-base-100 border-base-300 rounded-box p-0 lg:p-6 overflow-auto w-full max-h-[80vh]"
          >
            <div class="grid gap-4 md:grid-cols-1 grid-cols-1">
              <!-- <AppModuleGlobalUpload
                  :fileLink="`${base.form.imageLink}employee/${base.form.code}/`"
                  :file="base.form.image"
                  :id="'base'"
                  :multiple="false"
                  @respone="
                    (res) => {
                      base.form.image = base.form.image.concat(res.file);
                    }
                  "
                  @uploaded="
                    (res) => {
                      let index = this.base.form.image.findIndex(
                        (v) => v.r == res.r
                      );
                      this.base.form.image[index].upload = false;
                      this.base.form.image[index].file = res.row.file;
                    }
                  "
                  @stream="
                    (res) => {
                      let index = base.form.image.findIndex((v) => v.r == res.r);
                      base.form.image[index].loading = res.loading;
                    }
                  "
                  @error="
                    (res) => {
                      let index = base.form.image.findIndex((v) => v.r == res.r);
                      base.form.image[index].error = true;
                    }
                  "
                  @again="
                    (res) => {
                      let index = base.form.image.findIndex(
                        (v) => v.r == res.file.r
                      );
                      base.form.image[index] = res.file;
                    }
                  "
                  @resetdata="
                    (res) => {
                      base.form.image = [...res.file];
                    }
                  "
                /> -->
              <!-- <div class="form-control">
                  <label class="label">
                    <span class="label-text">Company</span>
                  </label>
                  <AppModuleGlobalSelectSearch
                    :placeholder="'Company'"
                    :label="'title'"
                    :code="'code'"
                    :customClass="`input input-bordered border-base-content`"
                    :current="base.form.company"
                    @updateValue="
                      (obj) => {
                        base.form.company_data = obj;
                        base.form.company = obj.code;
                      }
                    "
                    :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/company`"
                    :param="`&total=1`"
                  />
                </div> -->
            </div>
            <!-- <div class="grid gap-4 md:grid-cols-1 grid-cols-1"> -->
            <!-- <div class="form-control">
                  <label class="label">
                    <span class="label-text">Branch</span>
                  </label>
                  <AppModuleGlobalSelectSearch
                    :placeholder="'Branch'"
                    :label="'title'"
                    :code="'code'"
                    :minChar="3"
                    :delay="0.5"
                    :limit="10"
                    :customClass="`input input-bordered border-base-content`"
                    :current="base.form.branch"
                    @updateValue="
                      (obj) => {
                        base.form.branch_data = obj;
                        base.form.branch = obj.code;
                      }
                    "
                    :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/branch`"
                    :param="`&total=1`"
                    :image="false"
                  />
                </div> -->
            <div class="grid gap-4 md:grid-cols-7 grid-cols-1">
              <div class="col-span-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Sticker File:</span>
                  </label>
                  <input
                    type="file"
                    placeholder="Sticker Code"
                    class="file-input w-full input-bordered border-base-content"
                    @change="testsetsetset"
                  />

                  <!-- <input
                    type="text"
                    placeholder="Sticker Code"
                    class="input input-bordered border-base-content"
                    v-model="base.form.Files"
                  /> -->
                </div>
                <div class="form-control mt-4 border border-primary shadow-xl">
                  <img
                    v-if="base.form.tempFiles"
                    :src="base.form.tempFiles"
                  />
                  <img
                    v-else-if="base.form.Files"
                    :src="`http://192.168.10.17/label-printing-api/sticker/files/${base.form.Files}`"
                  />
                </div>
              </div>
              <div class="col-span-3">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Sticker Code:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Sticker Code"
                    class="input input-bordered border-base-content"
                    v-model="base.form.Code_sticker"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Sticker Name:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Sticker Name"
                    class="input input-bordered border-base-content"
                    v-model="base.form.Name"
                  />
                </div>
                <!-- </div> -->
                <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Sticker Color: </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Sticker Color"
                      class="input input-bordered border-base-content"
                      v-model="base.form.Color"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Label per Page:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Label per Page"
                      class="input input-bordered border-base-content"
                      v-model="base.form.LabelPerPage"
                    />
                  </div>
                </div>

                <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Width (mm.):</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Width (mm.)"
                      class="input input-bordered border-base-content"
                      v-model="base.form.PaperW"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Height (mm.):</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Height (mm.)"
                      class="input input-bordered border-base-content"
                      v-model="base.form.PaperH"
                    />
                  </div>
                </div>

                <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Creator: </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Creator"
                      class="input input-bordered border-base-content"
                      v-model="base.form.Creator"
                      disabled
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Date Create:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Date Create"
                      class="input input-bordered border-base-content"
                      v-model="base.form.DateCreate"
                      disabled
                    />
                  </div>
                </div>

                <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Updator:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Updator"
                      class="input input-bordered border-base-content"
                      v-model="base.form.Updator"
                      disabled
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Date Update:</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Date Update"
                      class="input input-bordered border-base-content"
                      v-model="base.form.DateUpdate"
                      disabled
                    />
                  </div>
                  <!-- {{base.form}} -->
                </div>
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
                        <th>Sticker ID.</th>
                        <td>Sticker Code</td>
                        <td>Sticker Name</td>
                        <td>Color</td>
                        <td>Label per Page</td>
                        <td>Sticker Dimension</td>
                        <td>Creator</td>
                        <td>Date Create</td>
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
                          {{ v.DocNum }}
                        </th>
                        <td>
                          {{ v.Code_sticker }}
                        </td>
                        <td>
                          {{ v.Name }}
                        </td>
                        <td>
                          {{ v.Color }}
                        </td>
                        <td>
                          {{ v.LabelPerPage }}
                        </td>
                        <td>{{ v.PaperW }} x {{ v.PaperH }}mm.</td>
                        <td>
                          {{ v.Creator }}
                        </td>
                        <td>
                          {{ v.DateCreate }}
                        </td>

                        <th class="text-right">
                          <label
                            for="modal-base"
                            class="btn btn-link text-primary no-underline modal-button btn-xs"
                            @click="base_edit(`${v.code}`, `${i}`)"
                            >Details
                          </label>
                          <!-- <label
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
                                'controllers/MYSQL/INTERNAL/LabelPrint/sticker'
                              )
                            "
                            >remove
                          </label> -->
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

import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";

import Query from "@/assets/js/fetch.js";

export default {
  name: "Department",
  components: {
    AppLayout,
    AppModuleGlobalPageination,
    AppModuleGlobalSearch,
    AppModuleMenu_,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModuleGlobalUpload,
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
    testsetsetset(evt) {
      let vm = this;
      console.log(evt.target.files[0]);

      console.log(this.base.form);
      // var loadFile = function(event) {
      var reader = new FileReader();
      reader.onload = function () {
        // var output = document.getElementById('output');
        // output.src = reader.result;
        vm.base.form.tempFiles = reader.result;
      };
      // this.base.form.tempFiles = URL.createObjectURL(evt.target.files[0])
      reader.readAsDataURL(evt.target.files[0]);
      // };
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
      new Query("base", "get").get(
        this,
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/LabelPrint/sticker?total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`,
        (res) => {
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
        }
      );
    },
    base_create() {
      this.base.current = 0;
      this.base.form = {
        title: "",
        // access: {},
      };
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      // this.base.form.access = JSON.parse(this.base.form.access);
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

      new Query("base", this.base.controll == "create" ? "POST" : "PUT").set(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/LabelPrint/sticker`,
        obj,
        (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            this.base.modal = false;
            this.base.page = 1;
            this.base_search();
          }
        }
      );
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

<template>
  <div class="QAIndirectItem">
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
            <h3 class="text-lg font-bold">Item Master</h3>

            <!-- <div role="tablist" class="tabs tabs-lifted">
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                class="tab"
                aria-label="Information"
                checked
              /> -->
            <div
              class="bg-base-100 border-base-300 rounded-box p-6 overflow-auto w-full max-h-[60vh]"
            >
              <div class="grid gap-4 md:grid-cols-1 grid-cols-1">
                <AppModuleGlobalUpload
                  :imageLink="`${base.form.imageLink}QAIndirectItem/${base.form.code}/`"
                  :image="base.form.image"
                  :id="'base'"
                  :multiple="false"
                  @respone="
                    (res) => {
                      let length = base.form.image.length
                        ? base.form.image.length
                        : 0;
                      base.form.image = base.form.image.concat(res.image);
                    }
                  "
                  @resetdata="
                    (res) => {
                      base.form.image = [...res.image];
                    }
                  "
                />
              </div>
              <div class="form-control pt-4">
                <!-- <label class="label"
                    ><span class="label-text">Item Description</span>
                  </label> -->

                <AppModuleGlobalScannerDetect
                  @response="
                    (res) => {
                      base.form.ref_code = res;
                    }
                  "
                />
              </div>
              <!-- <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">รหัสรายการ</span>
                    </label>
                    <input
                      type="text"
                      placeholder="ชื่อ"
                      class="input input-bordered border-base-content"
                      v-model="base.form.firstname"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">ชื่อรายการ</span>
                    </label>
                    <input
                      type="text"
                      placeholder="นามสกุล"
                      class="input input-bordered border-base-content"
                      v-model="base.form.lastname"
                    />
                  </div>
                </div> -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Code</span>
                </label>
                <input
                  class="input input-bordered border-base-content join-item w-full"
                  placeholder="Code"
                  v-model="base.form.ref_code"
                />
              </div>
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
            </div>
            <!-- </div> -->

            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
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

            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
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
                          <td></td>
                          <td>ข้อมูลผู้พนักงาน</td>
                          <td>ติดต่อ</td>
                          <td>ตำแหน่ง</td>
                          <td>สิทธิ์การใช้งาน</td>
                          <td>วันที่</td>
                          <td>บันทึก</td>
                          <td>แก้ไข</td>
                          <th class="text-right"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(v, i) in base.rows" :key="v.code">
                          <th>{{ v.id }}</th>
                          <td>
                            <div class="avatar static">
                              <div class="w-12 h-12">
                                <label
                                  for="modal_showImage"
                                  class="btn btn-link p-0"
                                  v-if="v.image.length > 0"
                                  @click="
                                    v.image.length > 0
                                      ? (imageSrc = `${
                                          v.image[v.master ? v.master : 0].temp
                                            ? `${serviceUrl}tmps/image/`
                                            : v.imageLink
                                            ? `${v.imageLink}QAIndirectItem/${v.code}/`
                                            : `${serviceUrl}tmps/image/`
                                        }${
                                          v.image[v.master ? v.master : 0].file
                                        }`)
                                      : ''
                                  "
                                >
                                  <img
                                    :src="`${
                                      v.image[v.master ? v.master : 0].temp
                                        ? `${serviceUrl}tmps/image/`
                                        : v.imageLink
                                        ? `${v.imageLink}QAIndirectItem/${v.code}/`
                                        : `${serviceUrl}tmps/image/`
                                    }${v.image[v.master ? v.master : 0].file}`"
                                    alt="Image"
                                    style="object-fit: contain"
                                  />
                                </label>
                                <img
                                  width="auto"
                                  height="auto"
                                  class="max-h-44 object-cover bg-cover"
                                  v-else
                                  :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyImage.jpg&s=10`"
                                  alt="Image"
                                />
                              </div>
                            </div>
                          </td>
                          <td class="text-center">
                            <div class="flex items-center gap-3">
                              <!-- <div class="avatar">
                            <div class="mask mask-square w-12 h-12">
                              <label
                                for="modal_showImage"
                                class="btn btn-link p-0"
                                @click="
                                  v.image.length > 0
                                    ? (imageSrc = `${
                                        v.image[v.master ? v.master : 0]
                                          .temp
                                          ? `${serviceUrl}tmps/image/`
                                          : v.imageLink
                                          ? `${v.imageLink}QAIndirectItem/${v.code}/`
                                          : `${serviceUrl}tmps/image/`
                                      }${
                                        v.image[v.master ? v.master : 0]
                                          .file
                                      }`)
                                    : ''
                                "
                              >
                                <img
                                  v-if="v.image.length > 0"
                                  :src="`${
                                    v.image[v.master ? v.master : 0].temp
                                      ? `${serviceUrl}tmps/image/`
                                      : v.imageLink
                                      ? `${v.imageLink}QAIndirectItem/${v.code}/`
                                      : `${serviceUrl}tmps/image/`
                                  }${
                                    v.image[v.master ? v.master : 0].file
                                  }`"
                                  alt="Image"
                                  style="object-fit: contain"
                                />
                              </label>
                            </div>
                          </div> -->
                              <div class="text-left">
                                <div class="font-bold">
                                  <span class="pr-2">{{ v.firstname }}</span>
                                  <span>{{ v.lastname }}</span>
                                </div>

                                <div class="text-sm">
                                  รหัสพนักงาน : {{ v.uid }}
                                </div>
                                <div class="text-xs">
                                  {{ v.code }}
                                </div>
                              </div>
                            </div>

                            <!-- <div class="avatar w-auto">
                          <label
                            for="modal_showImage"
                            class="btn btn-link p-0"
                            @click="imageSrc = row"
                          >
                            <img
                              v-if="v.image.length > 0"
                              :src="`${
                                v.image[v.master ? v.master : 0].temp
                                  ? `${serviceUrl}tmps/image/`
                                  : v.imageLink
                                  ? v.imageLink
                                  : `${serviceUrl}tmps/image/`
                              }${v.image[v.master ? v.master : 0].file}`"
                              alt="Image"
                            />
                          </label>
                        </div> -->
                          </td>
                          <!-- <td>
                        <div>
                          <div class="font-bold">
                            <span class="pr-2">{{ v.firstname }}</span>
                            <span>{{ v.lastname }}</span>
                          </div>

                          <div class="text-sm">รหัสพนักงาน : {{ v.uid }}</div>
                          <div class="text-xs">
                            {{ v.code }}
                          </div>
                        </div>
                      </td> -->
                          <td>
                            <div class="flex items-center space-x-3">
                              <div>
                                <div class="font-bold">
                                  {{ v.emailTitle ? v.emailTitle : "-" }}
                                </div>
                                <div class="text-sm">
                                  tel : {{ v.tel ? v.tel : "-" }}
                                </div>
                                <div class="text-sm">
                                  วันเกิด :
                                  {{
                                    v.birthdate &&
                                    $moment(v.birthdate).format("YYYY-MM-DD") >
                                      "2000"
                                      ? $moment(v.birthdate).format(
                                          "YYYY-MM-DD"
                                        )
                                      : "-"
                                  }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="flex items-center space-x-3">
                              <div>
                                <div class="font-bold">
                                  {{ v.position ? v.position : "-" }}
                                </div>
                                <div class="text-sm">
                                  แผนก : {{ v.depTitle ? v.depTitle : "-" }}
                                </div>
                                <div class="text-sm">
                                  สาขา :
                                  {{ v.branchTitle ? v.branchTitle : "-" }}
                                </div>
                                <div class="text-sm">
                                  {{ v.companyTitle ? v.companyTitle : "-" }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="flex items-center space-x-3">
                              <div>
                                <div class="font-bold">
                                  {{ v.accessTitle ? v.accessTitle : "-" }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="flex items-center space-x-3">
                              <div>
                                <div class="text-sm">
                                  เริ่มงาน :
                                  {{
                                    v.started_at &&
                                    $moment(v.started_at).format("YYYY-MM-DD") >
                                      "2000"
                                      ? $moment(v.started_at).format(
                                          "YYYY-MM-DD"
                                        )
                                      : "-"
                                  }}
                                </div>
                                <div class="text-sm">
                                  สิ้นสุด :
                                  {{
                                    v.leaves_at &&
                                    $moment(v.leaves_at).format("YYYY-MM-DD") >
                                      "2000"
                                      ? $moment(v.leaves_at).format(
                                          "YYYY-MM-DD"
                                        )
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
                              >edit
                            </label>

                            <label
                              for="modal-remove"
                              class="btn btn-link no-underline text-error modal-button btn-xs"
                              @click="
                                remove_item(
                                  `${v.code}`,
                                  'base',
                                  'controllers/MYSQL/INTERNAL/QA/Indirect/item'
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
                <!-- <div class="join w-full justify-center lg:justify-end"> -->
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
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
// import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalScannerDetect from "@/components/App/Module/Global/ScannerDetect.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "QAIndirectItem",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalScannerDetect,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
  },
  data() {
    return {
      loadimage: false,
      options: {
        penColor: "#c0f",
      },
      checkbox: "",

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
    error() {
      this.loadimage = false;
    },
    loaded() {
      this.loadimage = true;
    },

    change() {
      this.base_search();
    },

    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();

      alert("Open DevTools see the save data.");
      console.log(isEmpty);
      console.log(data);
    },
    // change() {
    //   this.options = {
    //     penColor: "#00f",
    //   };
    // },
    // resume() {
    //   this.options = {
    //     penColor: "#c0f",
    //   };
    // },

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
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/item?total=1&page=${
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
        ref_code: "",
        title: "",
        description: "",
        imageLink: "",
        image: [],
      };
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.base.controll = "edit";
    },
    base_save() {
      let vm = this;
      let image = this.base.form.image[0]
        ? { ...this.base.form.image[0] }
        : null;
      image ? delete image.temp : "";
      if (this.base.controll == "create") {
        this.base.form.new_password = this.base.form.uid;
      }
      let obj = {
        code: this.base.current,
        rows: [
          {
            ...Object.assign(
              { ...this.base.form },
              {
                image: image ? [image] : [],
              }
            ),
          },
        ],
      };

      new Query('base', this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/item`, obj, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
        } else {
          this.base.current == 0
            ? (this.base.current = res.rows[0].code)
            : "";
          // this.detail.controll = "create";
          // const detail = new Promise(
          //   async (resolve, reject) => await resolve(vm.detail_save())
          // );

          // detail.then((res) => {
          this.base.modal = false;
          this.base.page = 1;
          // this.detail.page = 1;
          this.base_search();
          // });
        }
      });
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
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            let index = this.detail.rows.findIndex(
              (v) => v.code == this.remove.code
            );
            this.remove.rows
              ? (this.remove.rows = [])
              : (this.detail.rows[index]["removed"] = true);
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
      //console.log(this.user_token);
      this.base_search();
    });
  },
};
</script>

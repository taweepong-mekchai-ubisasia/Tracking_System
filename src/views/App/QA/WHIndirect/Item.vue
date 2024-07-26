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
      <div class="modal" v-if="base.modal">
        <div class="modal-box relative w-11/12 max-w-xl">
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">Item Master</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 68vh;">
            <AppModuleGlobalUpload
              :fileLink="`${base.form.imageLink}QAIndirectItem/${base.form.code}/`"
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
            />
            <div class="grid gap-3 grid-cols-3 border-2 border-dashed rounded-lg p-1">
              <div class="form-control">
                <AppModuleGlobalScannerDetect
                  @response="
                    (res) => {
                      base.form.ref_code = res;
                    }
                  "
                />
              </div>
              <div class="form-control col-span-2">
                <label class="label">
                  <span class="label-text">Barcode</span>
                </label>
                <input
                  class="input input-bordered border-gray-300 w-full bg-gray-200 text-black"
                  placeholder="Barcode"
                  v-model="base.form.ref_code"
                  readonly
                />
              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">ชื่อ</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                class="input input-md input-bordered border-gray-300 w-full shadow"
                v-model="base.form.title"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">รายละเอียด</span>
              </label>
              <textarea
                class="textarea textarea-bordered border-gray-300 w-full h-20 shadow"
                placeholder="Description"
                v-model="base.form.description"
              ></textarea>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">จำนวนขั้นต่ำ</span>
                </label>
                <input
                  type="number"
                  placeholder="Min"
                  class="input input-sm input-bordered border-gray-300 w-full shadow"
                  v-model="base.form.min"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">หน่วย</span>
                </label>
                <input
                  type="text"
                  placeholder="Unit"
                  class="input input-sm input-bordered border-gray-300 w-full shadow"
                  v-model="base.form.unit"
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex">
            <div class="flex-1 form-control mt-6">
              <label for="modal-base" class="btn">
                <Icon icon="hugeicons:cancel-circle-half-dot" width="16" height="16" />
                ปิด
              </label>
            </div>
            <div class="flex-1 form-control mt-6" @click="base_save()">
              <button class="btn btn-primary text-white">
                <Icon icon="line-md:circle-to-confirm-circle-transition" width="16" height="16" />
                บันทึกรายการ
              </button>
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
      <div class="modal" v-if="remove.modal">
        <div class="modal-box relative w-11/12 max-w-sm">
          <label
            for="modal-remove"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-error">REMOVE ITEM MASTER</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto max-h-[60vh]">
            คุณแน่ใจหรือไม่ว่าจะลบรายการนี้?
          </div>
          <hr>
          <div class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex">
            <div class="flex-1 form-control mt-6">
              <label for="modal-remove" class="btn btn-danger">
                <Icon icon="hugeicons:cancel-circle-half-dot" width="16" height="16" />
                ปิด
              </label>
            </div>
            <div class="flex-1 form-control mt-6">
              <button
                class="btn btn-error text-white"
                @click="confirm_remove()"
              >
                <Icon icon="line-md:circle-to-confirm-circle-transition" width="16" height="16" />
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </div>
      <AppModuleGlobalShowImage :src="imageSrc" />
    </template>
    <template #view>
      <div class="gap-3 lg:px-3 lg:py-3">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto">
            <div
              v-if="base.loading"
              class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
            >
              <AppModuleGlobalLoadingText
                :class="`p-4 py-12 text-3xl text-center`"
              />
            </div>
            <!-- <div :class="`${base.loading ? 'blur-sm' : ''}`"> -->
              <div class="flex justify-end">
                <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white"
                  @click="base_create()"
                >
                  <Icon icon="uil:create-dashboard" width="18" height="18" />
                  สร้างรายการ
                </label>
              </div>
              <div class="border-2 border-dashed rounded-xl p-3 mt-2">
                <div class="grid grid-cols-2 gap-3">
                  <button
                    class="join-item btn btn-xs btn-outline btn-primary w-fit"
                    @click="exportExcel('base')"
                    disabled
                  >
                    <Icon
                      icon="mdi:file-excel-outline"
                      width="16" height="16"
                    />
                    Excel
                  </button>
                  <div class="flex justify-end">
                    <AppModuleGlobalSearch
                      :class="'join-item input input-sm input-bordered border-gray-300 lg:w-1/2 w-full'"
                      @search="
                        (q) => {
                          base.page = 1;
                          base.q = q;
                          typeof base.q == 'string' ? base_search() : '';
                        }
                      "
                    />
                  </div>
                </div>
                <div class="overflow-x-auto w-full max-h-[60vh] my-3">
                  <div v-if="!base.loading && base.rows.length == 0">
                    <AppModuleGlobalEmptyData
                      :class="`p-4 py-12 text-3xl text-center`"
                    />
                  </div>
                  <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                    <thead>
                      <tr class="italic">
                        <th class="text-right">#</th>
                        <td>Item Code</td>
                        <!-- <td>รูปปลากรอบ</td> -->
                        <td>รูปประกอบ</td>
                        <td>ชื่อ</td>
                        <td>รายละเอียด</td>
                        <td>บันทึกรายการเมื่อ</td>
                        <td>แก้ไขรายการล่าสุด</td>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(v, i) in base.rows" :key="v.code" class="hover">
                        <th class="text-right">{{ v.id }}</th>
                        <td>{{ v.code }}</td>
                        <td>
                          <div class="avatar static shadow">
                            <div class="w-12 h-12 bg-white">
                              <label
                                for="modal_showImage"
                                class="btn btn-link p-0"
                                v-if="v.image.length > 0"
                                @click="
                                  v.image.length > 0
                                    ? (imageSrc = `${
                                      v.image[v.master ? v.master : 0]
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
                                    v.image[v.master ? v.master : 0]
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
                        <td>
                          <div class="flex items-center gap-3">
                            <div>
                              <div class="text-sm font-bold">
                                {{ v.title }}
                              </div>
                              <div>
                                ( Barcode: {{ v.ref_code || '-' }} )
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {{ v.description }}
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="italic">
                                {{ $moment(v.created_at).format("DD-MM-YYYY HH:mm:ss") }}
                              </div>
                              <div class="opacity-50">
                                {{ v.created_fullname }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="italic">
                                {{ v.updated_at ? $moment(v.updated_at).format("DD-MM-YYYY HH:mm:ss") : '-' }}
                              </div>
                              <div class="opacity-50" v-if="v.updated_at">
                                {{ v.updated_fullname }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <th class="text-right">
                          <label
                            for="modal-base"
                            class="join-item btn btn-ghost text-warning modal-button btn-xs hover:text-black"
                            @click="base_edit(`${v.code}`, `${i}`)"
                          >
                            <span class="underline underline-offset-2">แก้ไข</span>
                          </label>
                          <label
                            for="modal-remove"
                            class="btn btn-ghost no-underline text-error modal-button btn-xs hover:text-black"
                            @click="
                              remove_item(
                                `${v.code}`,
                                'base',
                                'controllers/MYSQL/INTERNAL/QA/Indirect/item'
                              )
                            "
                            v-if="user.access.QA.QAWHIndirectItem == 'superadmin'"
                          >
                            ลบ
                          </label>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="grid gap-3 grid-cols-2">
                  <div class="flex justify-start items-center text-sm">
                    Showing {{ base.page == Math.ceil(base.total/base.row) ? 1 + (base.row*(base.page - 1)) : 1 + ((base.page - 1)*base.row) }} to {{ base.page == Math.ceil(base.total/base.row) ? base.total : base.row*base.page }} of {{ base.total }} entries
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
            <!-- </div> -->
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
// import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalScannerDetect from "@/components/App/Module/Global/ScannerDetect.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "IndirectItem",
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
      base: {
        rows: [],
        total: 0,
        page: 1,
        row: 10,
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
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    error() {
      this.loadimage = false;
    },
    loaded() {
      this.loadimage = true;
    },
    // Base
    base_search() {
      this.base.loading = true;
      this.base_get((res) => {
        // setTimeout(() => {
          this.base.rows = res.rows;
          this.base.total = res.total;
          this.base.next =
            this.base.page * this.base.row >= this.base.total ? false : true;
          this.base.back = this.base.page > 1 ? true : false;
          this.base.loading = false;
        // }, 250);
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
          console.log(res)
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
        code: "",
        ref_code: "",
        title: "",
        description: "",
        min: "",
        unit: "",
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
      let image = this.base.form.image[0] ? { ...this.base.form.image[0] }  : null;
      image ? delete image.temp : "";

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

      // console.log(obj)
      // return

      new Query(null, this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/item`, obj, (res) => {
        if (!res.success) {
          console.log(res)
        } else {
          this.base.modal = false;
          this.base.page = 1;
          this.base_search();
        }
      });
    },
    // REMOVE
    // removeAllSelect(controll, tb) {
    //   let rows = this.detail.rows.filter((v) => v["remove"]);
  
    //   this.remove.rows = rows;
    //   this.remove.controll = controll;
    //   this.remove.tb = tb;
    // },
    remove_item(code, controll, tb) {
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
          // rows: this.remove.rows
          //   ? this.remove.rows
          //   : [{ code: this.remove.code }],
          rows: [{ code: this.remove.code }]
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (!res.success) {
            console.log(res)
          } else {
            // let index = this.detail.rows.findIndex(
            //   (v) => v.code == this.remove.code
            // );
            // this.remove.rows
            //   ? (this.remove.rows = [])
            //   : (this.detail.rows[index]["removed"] = true);
            // this.remove.modal = false;
            // this.removing = false;
            // this.remove.controll == "detail"
            //   ? ""
            //   : this[`${this.remove.controll}_search`]();

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
};
</script>

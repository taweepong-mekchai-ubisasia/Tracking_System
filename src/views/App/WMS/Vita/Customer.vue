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
        <div class="modal-box w-11/12 max-w-sm">
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">Customer Form</h3>
          <hr class="mt-5" />
          <div class="overflow-auto" style="max-height: 60vh">
            <div class="grid gap-3 grid-cols-1 mt-3">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold underline underline-offset-1">SAP Customer Code</span>
                </label>
                <input
                  type="text"
                  placeholder="sap customer code"
                  class="input input-sm input-bordered border-gray-300"
                  v-model="base.form.sap_code"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold underline underline-offset-1">SAP Customer Name (English)</span>
                </label>
                <input
                  type="text"
                  placeholder="sap customer name"
                  class="input input-sm input-bordered border-gray-300"
                  v-model="base.form.eng_name"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold underline underline-offset-1">SUDA Customer Code</span>
                </label>
                <input
                  type="text"
                  placeholder="suda customer code"
                  class="input input-sm input-bordered border-gray-300"
                  v-model="base.form.suda_code"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold underline underline-offset-1">SUDA Chinese Name</span>
                </label>
                <input
                  type="text"
                  placeholder="suda chinese name"
                  class="input input-sm input-bordered border-gray-300"
                  v-model="base.form.suda_ch_name"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold underline underline-offset-1">SUDA English Name</span>
                </label>
                <input
                  type="text"
                  placeholder="suda english name"
                  class="input input-sm input-bordered border-gray-300"
                  v-model="base.form.suda_eng_name"
                />
              </div>
            </div>

          </div>
          <hr class="mt-5" />
          <div
            class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex"
          >
            <div class="flex-1 form-control mt-6">
              <label for="modal-base" class="btn">Cancel</label>
            </div>
            <div class="flex-1 form-control mt-6">
              <button
                class="btn btn-primary text-white"
                @click="base_save('static')"
              >
                Confirm
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
        <div class="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert">
          <div class="flex p-4">
            <div class="flex-shrink-0">
              <svg class="size-5 text-gray-600 mt-1 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </div>
            <div class="ms-4">
              <h3 class="text-error font-semibold dark:text-white underline underline-offset-2">
                System notification
              </h3>
              <div class="mt-2 text-sm text-slate-500 dark:text-neutral-400">
                Are your sure for remove this item?
              </div>
              <div class="mt-4">
                <div class="flex space-x-3">
                  <label for="modal-remove" type="label" class="btn btn-xs btn-active decoration-2 font-medium text-xs text-white dark:text-blue-500">
                    Cancel
                  </label>
                  <label class="btn btn-xs btn-error decoration-2 font-semibold text-xs text-white dark:text-blue-500" @click="confirm_remove()">
                    Confirm
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #view>
      <div class="gap-3 py-3">
        <div class="card card-compact shadow-lg bg-base-100">
          <div class="card-body overflow-auto">
            <!-- <div class="border-2 border-dashed rounded-xl p-2"> -->
              <div
                v-if="base.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :type="'text'"
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div class="flex justify-end">
                <label
                  for="modal-base"
                  class="join-item btn btn-sm btn-primary modal-button text-white"
                  @click="base_create()"
                >
                  <Icon icon="uil:create-dashboard" width="18" height="18" />
                  Create Customer
                </label>
              </div>
              <div class="border-2 border-dashed rounded-xl p-3">
                <!-- <div class="grid grid-cols-2 gap-3">
                  <button
                    class="join-item btn btn-sm btn-outline btn-primary w-fit"
                    @click="exportExcel('base')"
                    disabled
                  >
                    <Icon
                      icon="mdi:file-excel-outline"
                      width="16" height="16"
                    />
                      Excel
                  </button> -->
                  <!-- </div> -->
                  <div class="flex justify-end">
                    <AppModuleGlobalSearch
                      :class="'join-item input input-sm input-bordered border-gray-300 w-full md:max-w-xs'"
                      @search="
                        (q) => {
                          base.q = q;
                          base.page = 1;
                          base_search();
                        }
                      "
                    />
                  </div>
                <!-- </div> -->
                <!-- {{ base.rows }} -->
                <div class="overflow-x-auto w-full max-h-[60vh] my-2">
                  <div v-if="!base.loading && base.rows.length == 0">
                    <AppModuleGlobalEmptyData
                      :class="`p-4 py-12 text-3xl text-center`"
                    />
                  </div>
                  <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                    <thead>
                      <tr class="italic">
                        <th>#</th>
                        <td>SAP Code</td>
                        <td>Name (English)</td>
                        <td>SUDA Code</td>
                        <td>SUDA Name</td>
                        <td>SUDA Name</td>
                        <th class="text-center">Options</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, i) in base.rows">
                        <th>{{ row.id }}</th>
                        <td>{{ row.sap_code }}</td>
                        <td>{{ row.eng_name }}</td>
                        <td>{{ row.suda_code }}</td>
                        <td>{{ row.suda_ch_name }}</td>
                        <td>{{ row.suda_eng_name || '-' }}</td>
                        <th class="text-center">
                          <label
                            for="modal-base"
                            class="join-item btn btn-ghost text-warning hover:text-black modal-button btn-xs"
                            @click="base_edit(`${row.code}`, `${i}`)"
                          >
                            <span class="underline underline-offset-2">edit</span>
                          </label>
                          |
                          <label
                            for="modal-remove"
                            class="join-item btn btn-ghost text-error hover:text-black modal-button btn-xs"
                            @click="
                              remove_item(
                                `${row.code}`,
                                'base',
                                'api/controllers/MYSQL/INTERNAL/WMS/customer'
                              )
                            "
                          >
                            remove
                          </label>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="grid gap-3 md:grid-cols-2 grid-cols-1">
                  <div class="md:text-left text-center text-sm">
                    Show :
                    <select class="select select-bordered select-xs w-fit bg-yellow-50" 
                      v-model="base.row" 
                      @change="base_search()"
                    >
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                    |
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
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import Query from "@/assets/js/fetch.js";
import { useToast } from "vue-toastification";

export default {
  name: "Customer",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData
  },
  setup() {
    const toast = useToast();

    return { toast }
  },
  data() {
    return {
      status: '',
      sum: 0,
      total_net: 0,
      locked: false,
      edit: false,
      checkbox: "",
      refresh: false,
      datalist: [],
      deletes: [],
      base: {
        rows: [],
        total: 0,
        page: 1,
        row: 15,
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
      }
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
    dateNow() {
      let d = new Date();
      return d.getFullYear() + '-' + (d.getMonth() >= 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
              + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    },
    ymd(start, life) {
      let expire = new Date((new Date(start)).getTime() + life * 86400E3);
      return expire.getFullYear() + '-' + (expire.getMonth() >= 9 ? expire.getMonth() + 1 : '0' + (expire.getMonth() + 1)) + '-' + (expire.getDate() > 9 ? expire.getDate() : '0' + expire.getDate());
    },
    makeid(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      return result;
    },
    // base
    base_search() {
      this.base.loading = true;
      this.base_get((res) => {
        setTimeout(() => {
          this.base.rows = res.rows;
          this.base.total = res.total;
          this.base.next =
            this.base.page * this.base.row >= this.base.total ? false : true;
          this.base.back = this.base.page > 1 ? true : false;
          this.base.loading = false;
        }, 200);
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/customer?total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    base_create() {
      this.base.current = this.makeid(10);
      this.base.form = {
        code: this.base.current,
        sap_code: '',
        eng_name: '',
        suda_code: '',
        suda_ch_name: '',
        suda_eng_name: '',
      };

      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.base.controll = "edit";
      this.refresh = true;
    },
    base_save(type) {
      let obj = {
        rows: [
          {
            code: this.base.form.code,
            sap_code: this.base.form.sap_code,
            eng_name: this.base.form.eng_name,
            suda_code: this.base.form.suda_code,
            suda_ch_name: this.base.form.suda_ch_name,
            suda_eng_name: this.base.form.suda_eng_name,
          },
        ]
      };

      new Query(null, this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/customer`, obj, (res) => {
        if (!res.success) {
        } else {
          this.base.modal = false;

          if (type == "static") {
            this.base_search();
          }
        }
      });
    },
    // REMOVE
    remove_item(code, controll, tb) {
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    confirm_remove() {
      fetch(`${this.serviceUrl}${this.remove.tb}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({
          rows: [{ code: this.remove.code }]
        }),
      })
      .then((response) => response.json())
      .then((res) => {
        console.log(res)
        if (res.success) {
          this.toast.success("Item has been successfully deleted.", {
            position: "top-center",
            timeout: 4000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: false,
            draggable: true,
            draggablePercent: 0.5,
            showCloseButtonOnHover: true,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          });

          this.remove.modal = false;
          this[`${this.remove.controll}_search`]();
        }
      })
      .catch((error) => {
        callback([]);
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
    base: function (v) {
      // console.log(v);
    },
  }
};
</script>

<style scrop>
  tr,
  td {
    white-space: nowrap;
  }
</style>

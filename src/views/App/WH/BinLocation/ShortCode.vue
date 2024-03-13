<template>
  <div class="ShortCode">
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
            <h3 class="text-lg font-bold">Short Code</h3>
            <!-- {{ base.form }} -->
            <div class="card-body overflow-auto" style="max-height: 60vh">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Branch</span>
                </label>
                <!-- <input
                  type="text"
                  placeholder="wh"
                  class="input input-bordered"
                  v-model="base.form.wh"
                /> -->
                <select
                  class="join-item select select-bordered w-auto"
                  v-model="base.form.wh"
                >
                  <!-- <option selected value="">ALL</option> -->
                  <option value="UBA">UBA</option>
                  <option value="UBP">UBP</option>
                </select>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Short Code</span>
                </label>
                <input
                  type="text"
                  placeholder="Short Code"
                  class="input input-bordered"
                  v-model="base.form.short_code"
                />
              </div>
              <div class="form-control">
                <!-- {{ base.form }} -->
                <label class="label">
                  <span class="label-text">Item Name</span>
                </label>
                <!-- {{ base.form.wh }} -->
                <AppModuleGlobalSelectSearch
                  v-if="base.form.wh && base.modal"
                  :placeholder="'Short code'"
                  :label="'ItemName'"
                  :code="'ItemCode'"
                  :minChar="3"
                  :delay="0.5"
                  :limit="10"
                  :customClass="`input input-bordered `"
                  :current="base.form.item_code"
                  :refresh="refresh"
                  @updateValue="
                    (obj) => {
                      base.form.item_code = obj.ItemCode;
                      base.form.item_name = obj.ItemName;
                    }
                  "
                  @stopRefresh="
                    (obj) => {
                      refresh = obj.value;
                    }
                  "
                  :url="
                    base.form.wh == 'UBA'
                      ? `${this.serviceUrl}controllers/SAP/UBA/oitm`
                      : `${this.serviceUrl}controllers/SAP/UBP/oitm`
                  "
                  :param="`&total=1&wh=wh1&rac_list=1`"
                />
                <!-- <input
                  v-else
                  type="text"
                  placeholder="item_name"
                  class="input input-bordered"
                  v-model="base.form.item_name"
                /> -->
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Item Code</span>
                </label>
                <input
                  type="text"
                  placeholder="item_code"
                  class="input input-bordered input-disabled"
                  v-model="base.form.item_code"
                  readonly
                />
              </div>

              <!-- <div class="form-control">
                <label class="label">
                  <span class="label-text">รหัสอ้างอิง</span>
                </label>
                <input
                  type="text"
                  placeholder="รหัสอ้างอิง"
                  class="input input-bordered"
                  v-model="base.form.ref"
                />
              </div> -->
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
                <button class="btn btn-error text-white" @click="confirm_remove()">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #view v-if="user">
        <div class="grid grid-cols-1 gap-6 lg:px-10 lg:py-2">
          <div class="card shadow-lg bg-base-100">
            <div class="card-body overflow-auto grid grid-cols-1 gap-6">
              <div class="join w-full justify-center lg:justify-end">
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
                      <th>Code</th>
                      <td>Short Code</td>
                      <td>Item</td>
                      <td>WH</td>
                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="hover"
                      v-for="(row, index) in base.rows"
                      :key="row.code"
                    >
                      <th>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div
                              class="overflow-hidden text-ellipsis whitespace-nowrap"
                            >
                              {{ row.code }}
                            </div>
                            <div
                              class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                            >
                              {{ row.id }}
                            </div>
                          </div>
                        </div>
                      </th>
                      <td>{{ row.short_code }}</td>
                      <td>
                        <div>
                          {{ row.item_code }}
                        </div>
                        <div>
                          {{ row.item_name }}
                        </div>
                      </td>
                      <td>{{ row.wh }}</td>
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
                              'controllers/MYSQL/INTERNAL/WH/shelfshort'
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
import AdminmodulewebUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
export default {
  name: "ShortCode",
  components: {
    AppLayout,
    AdminmodulewebUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
  },
  data() {
    return {
      refresh: false,
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
          this.serviceUrl
        }controllers/MYSQL/INTERNAL/WH/shelfshort?total=1&page=${
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
            // res.rows.forEach((v, i) => {
            //   res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            //   res.rows[i].master = 0;
            // });
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
        // ref: "",
        wh: "UBA",
      };
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.form.category_code = this.base.form.category_code
        ? this.base.form.category_code
        : "0";
      this.base.form.recommend = this.base.form.recommend == "1" ? true : false;
      this.base.current = code;
      this.base.controll = "edit";
    },
    base_save() {
      let vm = this;
      fetch(`${this.serviceUrl}controllers/MYSQL/INTERNAL/WH/shelfshort`, {
        method: this.base.controll == "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({
          code: this.base.current,

          short_code: this.base.form.short_code,
          item_name: this.base.form.item_name,
          item_code: this.base.form.item_code,
          wh: this.base.form.wh,

          // ref: this.base.form.ref,
        }),
      })
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
          code: this.remove.code,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
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
    user: function (val) {
      if (!val) {
        return;
      }
      !this.user.access["WH"]
        ? this.$router.push({ name: `404` })
        : !this.user.access["WH"][this.$route.name]
        ? this.$router.push({ name: `404` })
        : "";
    },
  },
};
</script>

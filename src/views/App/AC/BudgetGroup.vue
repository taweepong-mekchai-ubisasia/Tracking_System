<template>
  <div class="PO">
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
            <h3 class="text-lg font-bold">Add new!</h3>
            <div class="card-body overflow-auto" style="max-height: 60vh">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">แผนก</span>
                </label>
<!-- {{ base.form.department }} -->
<SelectSearch
                    :placeholder="'Department'"
                    :label="'title'"
                    :code="'code'"
                    :minChar="3"
                    :delay="0.5"
                    :limit="10"
                    :customClass="`input input-bordered ${
                      checkbox == 'M' ? 'input-disabled' : ''
                    }`"
                    :disabled="checkbox == 'M' ? true : false"
                    :current="base.form.department"
                    :refresh="refresh"
                    @updateValue="
                      (obj) => {
                        base.form.department_data = obj;
                        base.form.department = obj.code;
                      }
                    "
                    @stopRefresh="
                      (obj) => {
                        refresh = obj.value;
                      }
                    "
                    :url="`${this.serviceUrl}controllers/MYSQL/INTERNAL/HR/department`"
                    :param="`&total=1&wh=wh1&rac_list=1`"
                  />
                <!-- {{ base.form.department }} -->
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">ชื่องบประมาณ</span>
                </label>
                <input
                  type="text"
                  placeholder="ชื่องบประมาณ"
                  class="input input-bordered"
                  v-model="base.form.project"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">จำนวนทุน</span>
                </label>
                <input
                  type="number"
                  placeholder="จำนวนทุน"
                  class="input input-bordered"
                  v-model="base.form.cost"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">รายละเอียดงบประมาณ</span>
                </label>
                <textarea
                  class="textarea textarea-bordered"
                  placeholder="Description"
                  v-model="base.form.detail"
                  cols="5"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-base" class="btn btn-danger">Cancle</label>
              </div>
              <div class="flex-1 form-control mt-6" @click="base_save()">
                <button class="btn btn-primary">Confirm</button>
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
                <button class="btn btn-primary" @click="confirm_remove()">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #view>
        <div
          class="grid grid-cols-4 gap-6 lg:px-10 lg:pt-5 lg:pb-0 xl:grid-cols-4"
        >
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body py-0">
              <h2 class="my-4 text-4xl font-bold card-title">
                <div class="flex-0"></div>
                <div class="flex-0">
                  <input
                    type="text"
                    placeholder="Search"
                    class="input input-ghost w-full max-w-xs"
                    @input="base_search"
                    v-model="base.q"
                  />
                </div>
                <div
                  class="flex-1 justify-end space-x-2 card-actions float-right"
                >
                  <label
                    for="modal-base"
                    class="btn btn-primary modal-button"
                    @click="base_create()"
                    >Create</label
                  >
                </div>
              </h2>
            </div>
          </div>
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body overflow-auto" style="max-height: 70vh">
              <div class="overflow-x-auto w-full">
                <table class="table table-normal w-full">
                  <thead>
                    <tr>
                      <th>id</th>
                      <!-- <th>code</th> -->
                   
                      <th>project</th>
                      <th>แผนก</th>
                      <th>detail</th>
                      <th>cost</th>

                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="hover"
                      v-for="(row, index) in base.rows"
                      :key="row.code"
                    >
                      <!-- <th>
                        <div class="flex items-center space-x-3">
                          <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                              <img
                                v-if="row.image.length > 0"
                                :src="`${row.imageLink}${
                                  row.image[row.master ? row.master : 0].file
                                }`"
                                alt="Image"
                              />
                            </div>
                          </div>
                        </div>
                      </th> -->
                      <!-- <th>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">{{ row.name }}</div>
                            <div class="text-sm opacity-50">
                              code : {{ row.code }}
                            </div>
                            <div class="text-sm opacity-50">
                              ref : {{ row.ref }}
                            </div>
                          </div>
                        </div>
                      </th>
                      <td class="crop">
                       {{ row.code }}
                        <br />
                        <span class="badge badge-ghost badge-sm"
                          >code : {{ row.code }}</span
                        >
                      </td> -->
                      <!-- { -->
                      <!-- "id": "13",
    "code": "17062630925RlTg",
    "department": "", -->
                      <!-- "project": "111", -->
                      <!-- "cost": "222", -->
                      <!-- "detail": "333", -->
                      <!-- "approved_at": null,
    "approved_by": null,
    "rejected_at": null,
    "rejected_by": null,
    "created_at": "2024-01-26 16:58:12",
    "created_by": null,
    "updated_at": null,
    "updated_by": null,
    "deleted_at": null,
    "deleted_by": null,
    "depTitle": null -->
                      <!-- } -->

                      <th>{{ row.id }}</th>
                      <th>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">{{ row.project }}</div>
                            <div class="text-sm opacity-50">
                              {{ row.code }}
                            </div>
                            <!-- <div class="text-sm opacity-50">
                              ref : {{ row.ref }}
                            </div> -->
                          </div>
                        </div>
                      </th>
                      <td>{{ row.depTitle }}</td>
                      <td>{{ row.detail }}</td>
                      <td>{{ row.cost }}</td>

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
                          @click="remove_item(`${row.code}`, 'base', 'po')"
                          >remove
                        </label>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <PageinationModule
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
// import MemberLayout from "@/components/Admin/layouts/Member.vue";
// import UploadModule from "@/components/Admin/module/Upload.vue";
// import PageinationModule from "@/components/Admin/module/Pageination.vue";
import AppLayout from "@/components/App/layout.vue";
import PageinationModule from "@/components/App/Module/Global/Pageination.vue";
import UploadModule from "@/components/App/Module/Global/Upload.vue";
import SelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
export default {
  name: "PO",
  components: {
    AppLayout,
    UploadModule,
    PageinationModule,
    SelectSearch,
  },
  data() {
    return {
      refresh: false,
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
          department: "",
          detail: "",
          project: "",
          cost: "",
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
      fetch(
        `${
          this.$store.state.serviceUrl
        }controllers/MYSQL/INTERNAL/AC/BUDGET/group?page=${this.base.page}${
          this.base.row ? `&rows=${this.base.row}` : ""
        }${this.base.q ? `&q=${this.base.q}` : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
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
        department: "",
        detail: "",
        project: "",
        cost: "",
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
      this.refresh = true;
    },
    base_save() {
      fetch(
        `${this.$store.state.serviceUrl}controllers/MYSQL/INTERNAL/AC/BUDGET/group`,
        {
          method: this.base.controll == "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: this.base.current,
            department: this.base.form.department,
            detail: this.base.form.detail,
            project: this.base.form.project,
            cost: this.base.form.cost,
          }),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            this.base.modal = false;
            this.base_search();
          }
          // callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          // callback([]);
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
    this.base_search();
    //  mounted() {
    this.tmpsLink = `${
      window.location.origin == "http://localhost:8080"
        ? `http://localhost/sub/`
        : `https://url/`
    }tmps/`;
    // },
  },
};
</script>

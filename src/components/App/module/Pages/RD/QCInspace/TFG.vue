<template>
  <div class="Stock">
    <div class="grid grid-cols-4 gap-6 lg:px-10 lg:pt-5 lg:pb-0 xl:grid-cols-4">
      <div class="card col-span-4 row-span-4 bg-transparent">
        <div class="join mt-5 w-full md:justify-center lg:justify-end">
          <button
            class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
            disabled
          >
            วันที่
          </button>
          <input
            type="date"
            placeholder="title"
            class="join-item input input-sm input-bordered"
            v-model="date.from"
            @change="change"
          />
          <button
            class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
            disabled
          >
            -
          </button>
          <input
            type="date"
            placeholder="title"
            class="join-item input input-sm input-bordered"
            v-model="date.to"
            @change="change"
          />
        </div>
        <div class="join mt-5 w-full md:justify-center lg:justify-end">
          <button
            class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
            disabled
          >
            สาขา
          </button>
          <select
            class="join-item select select-sm select-bordered w-auto max-w-xs"
            v-model="wh"
          >
            <option selected value="">ALL</option>
            <option value="wh1">Factory</option>
            <option value="wh2">External</option>
          </select>
          <Search
            :class="'join-item input input-sm input-bordered w-full max-w-xs'"
            @search="
              (q) => {
                base.q = q;
                base_search();
              }
            "
          />
        </div>
      </div>

      <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
        <div class="card-body overflow-auto pt-0 max-h-[60vh]">
          <div v-if="load" class="overflow-x-auto mt-10 text-center">
            <span class="loading loading-spinner loading-lg"></span>
          </div>
          <div class="overflow-x-auto w-full" v-else>
            <table
              class="table table-xs table-pin-rows table-pin-cols table-zebra"
            >
              <thead>
                <tr>
                  <th>Rack</th>
                  <td>Create</td>
                  <!-- <td>Transaction</td> -->
                  <td>Item Code</td>
                  <td>Lot No.</td>
                  <td>Qty</td>
                  <td>Pack Size</td>
                  <td>Total Quantity</td>
                  <td>Unit</td>
                  <td>Shelf Life</td>

                  <td>Receive</td>
                  <td>Manufacturing</td>

                  <td>Update</td>
                  <!-- <td>Manufacturing</td> -->
                  <!-- <td>Comments</td> -->
                  <!-- <th class="text-right">action</th> -->
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
                          {{ row.rac }}-{{ row.bay }}-{{ row.level }}-{{
                            row.pallet
                          }}
                        </div>
                        <div
                          class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{ row.id }}
                        </div>
                      </div>
                    </div>
                  </th>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div>
                        <div
                          class="overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{ row.created_at?row.created_at:'-' }}
                        </div>
                        <div
                          class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{ row.created_fullname?row.created_fullname:'-' }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- $moment(row.leaves_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? $moment(row.leaves_at).format("YYYY-MM-DD")
                                  : "-" -->

                  <!-- <td>
                    {{
                      row.transref == "I"
                        ? "In"
                        : row.transref == "O"
                        ? "Issue"
                        : "Move"
                    }}
                  </td> -->
                  <td>{{ row.item_code }}</td>
                  <td>{{ row.batch }}</td>
                  <td class="text-center">{{ row.unit }}</td>
                  <td class="text-center">{{ row.pack_size }}</td>
                  <td class="text-right">
                    {{ parseFloat(row.quantitys).toFixed(2) }}
                  </td>

                  <td>{{ row.uom }}</td>

                  <!-- <td>
                    <div class="flex items-center space-x-3">
                      <div>
                        <div
                          class="overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{ row.receive_date?row.receive_date:'-'	 }}
                        </div>
                        <div
                          class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{ row.manufacturing_date?row.manufacturing_date:'-' }}
                        </div>

                      </div>
                    </div>
                  </td> -->
                  <!-- <td>
                    <div class="flex items-center space-x-3">
                      <div>
                        <div
                          class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{ row.receive_date ? row.receive_date : "-" }}
                        </div>
                      </div>
                    </div>
                  </td> -->
                  <td>{{ row.shelf_life ? row.shelf_life : "-" }}</td>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div>
                      
                        <div
                          class="overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                         Expire {{
                            row.receive_date
                              ? $moment(row.receive_date)
                                  .add(parseInt(row.shelf_life), "days")
                                  .format("YYYY-MM-DD")
                              : "-"
                          }}
                        </div>
                        <div
                          class="overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                         Life {{
                            $moment(row.receive_date)
                              .add(parseInt(row.shelf_life), "days")
                              .diff($moment(row.receive_date), "days")
                          }}
                          days
                        </div>
                        <div
                          class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{
                            $moment
                              .duration(
                                $moment(row.receive_date)
                                  .add(parseInt(row.shelf_life), "days")
                                  .diff($moment(row.receive_date), "days"),
                                "days"
                              )
                              .years()
                          }}Y
                          {{
                            $moment
                              .duration(
                                $moment(row.receive_date)
                                  .add(parseInt(row.shelf_life), "days")
                                  .diff($moment(row.receive_date), "days"),
                                "days"
                              )
                              .months()
                          }}M
                          {{
                            $moment
                              .duration(
                                $moment(row.receive_date)
                                  .add(parseInt(row.shelf_life), "days")
                                  .diff($moment(row.receive_date), "days"),
                                "days"
                              )
                              .days()
                          }}D
                        </div>
                        <div
                          class="opacity-50  overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{
                            row.receive_date
                              ? $moment(row.receive_date).format("YYYY-MM-DD")
                                  : "-"
                          }}
                        </div>
                       
                     
                      </div>
                    </div>
                  </td>


                  <td>
                    <div class="flex items-center space-x-3">
                      <div>
                  
                        <div
                          class=" overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                        Expire {{
                            row.manufacturing_date
                              ? $moment(row.manufacturing_date)
                                  .add(parseInt(row.shelf_life), "days")
                                  .format("YYYY-MM-DD")
                              : "-"
                          }}
                        </div>
                        <div
                          class="overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{
                            row.manufacturing_date?$moment(row.manufacturing_date)
                              .add(parseInt(row.shelf_life), "days")
                              .diff($moment(row.manufacturing_date), "days"):'0'
                          }}
                          days
                        </div>
                        <div
                          class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{
                            row.manufacturing_date?$moment
                              .duration(
                                $moment(new Date())
                                  .add(parseInt(row.shelf_life), "days")
                                  .diff($moment(row.manufacturing_date), "days"),
                                "days"
                              )
                              .years():'0'
                          }}Y
                          {{
                            row.manufacturing_date?$moment
                              .duration(
                                $moment(new Date())
                                  .add(parseInt(row.shelf_life), "days")
                                  .diff($moment(row.manufacturing_date), "days"),
                                "days"
                              )
                              .months():'0'
                          }}M
                          {{
                            row.manufacturing_date?$moment
                              .duration(
                                $moment(row.manufacturing_date)
                                  .add(parseInt(row.shelf_life), "days")
                                  .diff($moment(row.manufacturing_date), "days"),
                                "days"
                              )
                              .days():'0'
                          }}D
                        </div>
                        <div
                          class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{
                            row.manufacturing_date
                              ? $moment(row.manufacturing_date).format("YYYY-MM-DD")
                                  : "-"
                          }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <!--                   
                  var a = moment.duration(3, 'd');
var b = moment.duration(2, 'd');
a.subtract(b).days(); -->
                  <!-- <td>
                    <div class="flex items-center space-x-3">
                      <div>
                        <div
                          class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{
                            row.manufacturing_date
                              ? row.manufacturing_date
                              : "-"
                          }}
                        </div>
                      </div>
                    </div>
                  </td> -->
                  <td>
                    <div class="flex items-center space-x-3">
                      <div>
                        <div
                          class="overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{ row.updated_at?row.updated_at:'-' }}
                        </div>
                        <div
                          class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{ row.updated_fullname?row.updated_fullname:'-' }}
                        </div>

                        <!-- <div class="opacity-50 ">
                              {{ row.created_by }}
                            </div> -->
                      </div>
                    </div>
                  </td>

                  
                  <!-- <td>
                    <div class="flex items-center space-x-3">
                      <div>
                        <div
                          class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{ row.created_by }}
                        </div>
                      </div>
                    </div>
                  </td> -->
                  <!-- <td>
                    <div class="flex items-center space-x-3">
                      <div>
                        <div
                          class="opacity-50 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {{ row.comments }}
                        </div>
                      </div>
                    </div>
                  </td> -->
                  <!-- <th class="text-right">
                    <div class="inline-flex">
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
                    </div>
                  </th> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PageinationModule
        v-if="!load"
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
import PageinationModule from "@/components/App/Module/Global/Pageination.vue";
import SelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import Search from "@/components/App/Module/Global/Search.vue";
export default {
  name: "BinLocationReport",
  components: {
    PageinationModule,
    SelectSearch,
    Search,
  },
  data() {
    return {
      date: {
        from: "",
        to: "",
      },
      wh: "",
      load: false,
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
        }controllers/MYSQL/INTERNAL/WH/shelf?total=1&page=${this.base.page}${
          this.base.row ? `&rows=${this.base.row}` : ""
        }${this.base.q ? `&q=${this.base.q}` : ""}${
          this.wh ? `&wh=${this.wh}` : ""
        }${this.date.from ? `&createFrom=${this.date.from}` : ""}${
          this.date.to ? `&createTo=${this.date.to}` : ""
        }&transref=I&transref_type_null=1

        `,
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
        ref: "",
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
      fetch(
        `${this.$store.state.serviceUrl}controllers/MYSQL/INTERNAL/WH/shelf?wh=${this.wh}`,
        {
          method: this.base.controll == "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
          body: JSON.stringify({
            code: this.base.current,
            title: this.base.form.title,
            ref: this.base.form.ref,
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
    handleSearch() {
      const message = this.$refs.inputField.value;
      this.load = true;
      setTimeout(() => {
        this.load = false;
        this.base.q = `${message}`;
      }, 1500);
    },
  },
  mounted() {
    //     var a = this.$moment('2020-01-01');
    // var b = ;
    // 1

    this.$nextTick(() => this.base_search());
  },
  watch: {
    wh: function (v) {
      this.base_search();
    },
    // 'date.from':function(v) {
    //   this.base_search();
    // },
    // 'date.to':function(v) {
    //   this.base_search();
    // }
  },
};
</script>
<style>
tr,
td {
  white-space: nowrap;
}
</style>

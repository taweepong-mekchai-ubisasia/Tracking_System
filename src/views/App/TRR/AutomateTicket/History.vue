<template>
  <div class="AutomateTicket">
    <AppLayout>
      <template #modal> </template>
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
                    <button
                      class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      วันที่
                    </button>
                    <input
                      type="date"
                      placeholder="title"
                      class="join-item input input-sm input-bordered border-base-content"
                      v-model="date.from"
                      @change="change"
                    />
                    <button
                      class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      -
                    </button>
                    <input
                      type="date"
                      placeholder="title"
                      class="join-item input input-sm input-bordered border-base-content"
                      v-model="date.to"
                      @change="change"
                    />
                    <button
                      class="join-item btn btn-sm btn-accent"
                      @click="exportExcel()"
                    >
                      <Icon
                        icon="mdi:file-excel-outline"
                        class="h-5 w-5 text-white"
                      />
                    </button>
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
                          <th>Code</th>
                          <td>Timestamp</td>
                          <td>Ticket Code</td>
                          <td>Creation</td>
                          <!-- <th class="text-right"></th> -->
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(v, i) in base.rows" :key="v.code">
                          <th>{{ v.code }}</th>

                          <td>
                            {{ v.timestamp ? v.timestamp : "-" }}
                          </td>

                          <td>
                            {{ v.ticket ? v.ticket : "-" }}
                          </td>

                          <td>
                            <div class="flex items-center space-x-3">
                              <div>
                                <div class="text-xs">
                                  {{
                                    v.created_at &&
                                    $moment(v.created_at).format(
                                      "YYYY-MM-DD"
                                    ) > "2000"
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

                          <!-- <th class="text-right">
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                          >edit
                        </label>

                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/TRR/timestamp'
                            )
                          "
                          >remove
                        </label>
                      </th> -->
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
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";

export default {
  name: "History",
  components: {
    AppLayout,
    AppModuleGlobalPageination,
    AppModuleGlobalSearch,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
  },
  data() {
    return {
      date: {
        from: "",
        to: "",
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
    exportExcel() {
      return window.open(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WH/exports?type=stockOnHand&total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }${this.wh ? `&wh=${this.wh}` : ""}${
          this.date.from ? `&createFrom=${this.date.from}` : ""
        }${
          this.date.to ? `&createTo=${this.date.to}` : ""
        }&transref=I&transref_type_null=1&sumQuantitys=1`
      );
    },
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
        }api/controllers/MYSQL/INTERNAL/TRR/timestamp?total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }${this.date.from ? `&timestampFrom=${this.date.from}` : ""}${
          this.date.to ? `&timestampTo=${this.date.to}` : ""
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
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();
    });
  },
  watch: {},
};
</script>

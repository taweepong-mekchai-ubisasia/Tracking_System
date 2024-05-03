<template>
  <AppLayout ref="AppLayout">
    <template #modal></template>
    <template #view v-if="user">
      <div class="grid grid-cols-1 gap-6">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-2 lg:p-4">
            <div class="join join-vertical w-full">
              <div
                class="collapse collapse-arrow join-item border border-base-300"
              >
                <input
                  type="radio"
                  name="my-accordion-4"
                  checked="checked"
                  ref="scaning"
                  @change="
                    (e) => {
                      this.scaning = e.target.checked ? true : false;
                      this.itemList = e.target.checked ? false : true;
                    }
                  "
                />
                <div
                  class="collapse-title text-xl font-medium"
                  :class="`${scaning ? 'text-primary' : ''}`"
                >
                  {{ scaning || base.loading? base.loading?"Scanned":"Scaning..." : "Scan" }}
                </div>
                <div class="collapse-content">
                  <div class="grid grid-cols-1 gap-6 lg:px-10 lg:py-2">
                    <div class="card shadow-lg bg-base-100">
                      <div
                        class="w-full justify-center grid content-center items-center"
                      >
                        <div
                          class="max-h-[40vh] h-[40vh] self-center"
                          v-if="scaning"
                        >
                          <qrcode-stream
                            :torch="true"
                            @detect="onDetect"
                            onDetect
                            @error="onError"
                            @camera-on="onReady"
                            :track="selected.value"
                            class="max-w-lg"
                          ></qrcode-stream>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="collapse collapse-arrow join-item border border-base-300"
              >
                <input
                  type="radio"
                  name="my-accordion-4"
                  ref="itemList"
                  @change="
                    (e) => {
                      this.scaning = e.target.checked ? false : true;
                      this.itemList = e.target.checked ? true : false;
                    }
                  "
                />
                <div class="collapse-title text-xl font-medium">Item List</div>
                <div class="collapse-content">
                  <div
                    class="overflow-x-auto w-full max-h-[60vh] min-h-[60vh] my-4"
                  >
                    <div
                      v-if="base.loading"
                      class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
                    >
                      <AppModuleGlobalLoadingText
                        :class="`p-4 py-12 text-3xl text-center`"
                      />
                    </div>
                    <div :class="`${base.loading ? 'blur-sm' : ''}`">
                      <table
                        class="table table-xs table-pin-rows table-pin-cols"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <td>Rac</td>
                            <td>Stort</td>
                            <td>Qty</td>
                            <td>Pack Size</td>
                            <td>Unit</td>
                            <td>Total</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(v, i) in base.rows">
                            <th>
                              {{ i + 1 }}
                            </th>
                            <td>
                              {{ v.rac }}-{{ v.bay }}-{{ v.level }}-{{
                                v.pallet
                              }}
                            </td>
                            <td>{{ v.item_short_code }}</td>
                            <td>{{ v.unit }}</td>
                            <td>{{ v.pack_size }}</td>
                            <td>{{ v.uom }}</td>
                            <td>
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                }).format(parseFloat(v.quantitys).toFixed(2))
                              }}
                              {{ v.uom }}
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colspan="7" class="text-right">
                              <div
                                class="grid flex-grow place-items-center col-span-2"
                              >
                                <div
                                  class="shadow-lg w-full bg-neutral text-white"
                                >
                                  <div>
                                    <div class="p-1 w-full">
                                      Weight Total :
                                      {{
                                        new Intl.NumberFormat("th-TH", {
                                          minimumFractionDigits: 2,
                                        }).format(
                                          parseFloat(
                                            base.quantitys_total
                                          ).toFixed(2)
                                        )
                                      }}
                                      Kg.
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/App/layout.vue";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
export default {
  name: "CheckRac",
  components: {
    AppLayout,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
    AppModuleGlobalLoadingText,
  },
  props: [],
  data() {
    const options = [
      { text: "nothing (default)", value: undefined },
      { text: "outline", value: this.paintOutline },
      { text: "centered text", value: this.paintCenterText },
      { text: "bounding box", value: this.paintBoundingBox },
    ];

    const selected = options[0];
    return {
      scaning: true,
      itemList: false,
      selected: selected,
      total: [],
      base: {
        rows: [],
        total: 0,
        page: 1,
        bay: 20,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: null,
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
    onDetect(detectedCodes) {
      this.$refs.scaning.checked = false;
      this.$refs.itemList.checked = true;
      this.base.current = detectedCodes[0].rawValue;
      this.base_search();
      this.scaning = false;
    },
    onReady(capabilities) {
      const TORCH_IS_SUPPORTED = !!capabilities.torch;
      // console.log(capabilities);
    },
    onError(error) {
      if (error.name === "NotAllowedError") {
        console.log("user denied camera access permission");
      } else if (error.name === "NotFoundError") {
        console.log("no suitable camera device installed");
      } else if (error.name === "NotSupportedError") {
        console.log("page is not served over HTTPS (or localhost)");
      } else if (error.name === "NotReadableError") {
        console.log("maybe camera is already in use");
      } else if (error.name === "OverconstrainedError") {
        console.log("did you request the front camera although there is none?");
      } else if (error.name === "StreamApiNotSupportedError") {
        console.log("browser seems to be lacking features");
      }
    },
    // detail
    base_search() {
      this.base.loading = true;
      this.base_get((res) => {
        this.base.rows = res.rows;
        this.base.total = res.total;
        this.base.quantitys_total = res.quantitys_total;
        this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
        this.base.back = this.base.page > 1 ? true : false;
        this.base.loading = false;
      });
    },
    base_get(callback) {
      fetch(
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelf?rac_layout=${this.base.current}&transref=I&transref_type_null=1&sumQuantitys=1`,
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
          this.total = [];
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            res.rows.forEach((v, i) => {
              this.total[v.level]
                ? this.total[v.level][v.pallet]
                  ? (this.total[v.level][v.pallet] =
                      parseFloat(this.total[v.level][v.pallet]) +
                      parseFloat(v.quantitys))
                  : (this.total[v.level][v.pallet] = parseFloat(v.quantitys))
                : (this.total[v.level] = {
                    [v.pallet]: parseFloat(v.quantitys),
                  });

              this.total[v.level]
                ? this.total[v.level]["total"]
                  ? (this.total[v.level]["total"] =
                      parseFloat(this.total[v.level]["total"]) +
                      parseFloat(v.quantitys))
                  : (this.total[v.level]["total"] = parseFloat(v.quantitys))
                : (this.total[v.level] = {
                    ["total"]: parseFloat(v.quantitys),
                  });
            });
          }

          callback(res.success ? { ...res } : { rows: [], total: 0 });
        })
        .catch((error) => {
          callback({ rows: [], total: 0 });
          console.error("Error:", error);
        });
    },
  },
  mounted() {},
  updated() {
    this.$nextTick(() => {});
  },
  created() {},
  beforeDestroy() {},
  watch: {},
};
</script>

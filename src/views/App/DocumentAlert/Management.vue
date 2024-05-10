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
        <div
          class="modal-box relative w-11/12 max-w-5xl p-2 lg:p-4 max-h-screen"
        >
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕
          </label>
          <h3 class="text-lg font-bold text-primary">DOCUMENT ALERT SYSTEM</h3>
          <div class="divider my-1"></div>

          <div class="grid gap-4 md:grid-cols-5 grid-cols-1 mb-5">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Doc date</span>
              </label>
              <input
                type="date"
                placeholder="Doc date"
                class="input input-bordered border-base-content"
                v-model="base.form.uid"
              />
            </div>
            <div
              class="form-control col-span-3 flex flex-row flex-nowrap justify-between"
            >
              <div>
                <label class="label">
                  <span class="label-text">Life</span>
                </label>
                <input
                  type="number"
                  placeholder="Life"
                  class="input input-bordered border-base-content w-20"
                  v-model="base.form.uid"
                />
              </div>
              <div>
                <label class="label">
                  <span class="label-text">Notification before</span>
                </label>
                <div class="join">
                  <input
                    type="number"
                    placeholder="Number of days "
                    class="join-item input input-bordered border-base-content w-20"
                    v-model="base.form.uid"
                  />
                  <button
                    class="join-item btn disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    Days
                  </button>
                </div>
              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Expiration date</span>
              </label>
              <input
                type="date"
                placeholder="Expiration date"
                class="input input-bordered border-base-content"
                v-model="base.form.uid"
                :disabled="true"
              />
            </div>
            <!-- <div class="form-control">
              <label class="label">
                <span class="label-text">Notification before expiration</span>
              </label>
              <div class="join">
                <input
                  type="number"
                  placeholder="Number of days "
                  class="join-item input input-bordered border-base-content w-full"
                  v-model="base.form.uid"
                />
                <button
                  class="join-item btn disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                  disabled
                >
                  Days
                </button>
              </div>
            </div> -->
          </div>
          <div class="form-control">
            <AppModuleGlobalUpload
              :imageLink="`${base.form.imageLink}employee/${base.form.code}/`"
              :image="base.form.image"
              :id="'base'"
              :multiple="true"
              :type="'pdf'"
              @respone="
                (res) => {
                  base.form.image = base.form.image.concat(res.image);
                }
              "
              @uploaded="
                (res) => {
                  let index = this.base.form.image.findIndex(
                    (v) => v.r == res.r
                  );
                  this.base.form.image[index].upload = false;
                }
              "
              @stream="
                (res) => {
                  let index = this.base.form.image.findIndex(
                    (v) => v.r == res.r
                  );
                  this.base.form.image[index].loading = res.loading;
                }
              "
              @error="
                (res) => {
                  let index = this.base.form.image.findIndex(
                    (v) => v.r == res.r
                  );
                  this.base.form.image[index].error = true;
                }
              "
              @again="
                (res) => {
                  let index = this.base.form.image.findIndex(
                    (v) => v.r == res.image.r
                  );
                  this.base.form.image[index] = res.image;
                }
              "
              @resetdata="
                (res) => {
                  base.form.image = [...res.image];
                }
              "
            />
          </div>
          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
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
          <h3 class="text-lg font-bold text-error">REMOVE ITEM</h3>
          <div class="divider mt-1"></div>
          <div class="card-body overflow-auto max-h-[60vh]">
            Are your sure for remove this item?
          </div>

          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
            <div class="flex-1 form-control mt-6">
              <label for="modal-remove" class="btn btn-danger">Cancle</label>
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
      <!-- <AppModuleGlobalShowImage :src="imageSrc" /> -->
    </template>
    <template #view>
      <div class="grid grid-cols-1 gap-6">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-2 lg:p-4">
            <div>
              <Calendar
                ref="calendar"
                class="custom-calendar max-w-full rounded-xl"
                :masks="masks"
                :attributes="attributes"
                disable-page-swipe
                is-expanded
                expanded
                title-position="left"
                @focus="focus"
              >
                <!-- <template v-slot:header-title="{ day, attributes }">
                  header-title<button @click="alert('das')">dddddd</button>
                </template> -->
                <!-- <template #header-title-wrapper>header-title-wrapper</template> -->
                <template
                  v-slot:day-content="{ day, attributes }"
                  :class="`btnddddddddddddddd`"
                >
                  <div
                    class="flex flex-col h-full z-10 overflow-hidden"
                    :class="`${day.isToday ? 'bg-primary' : ''}`"
                    @click="onDayClickHandler(day)"
                  >
                    <!-- {{ isToday }} -->
                    <!-- {{ $moment().format("YYYY-M-D") }}<br /> -->
                    <!-- {{ `${day.year}-${day.month}-${day.day}` }} -->
                    <span class="day-label text-sm text-gray-900 pl-2 pt-1">{{
                      day.day
                    }}</span>

                    <div class="flex-grow overflow-y-auto overflow-x-auto">

                      <!-- <ul class="menu menu-xs bg-transparent w-auto">
                        <li
                          v-for="attr in attributes"
                          :key="attr.key"
                          :class="attr.customData.class"
                        >
                          <a href="#" @click="sdas">
                            {{ attr.customData.title }}</a
                          >
                        </li>
                      </ul> -->

                      <p
                        v-for="attr in attributes"
                        :key="attr.key"
                        class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
                        :class="attr.customData.class"
                      >
                        {{ attr.customData.title }}
                      </p>
                    </div>
                  </div>
                </template>
                <template #footer>
                  <div class="w-full">
                    <button
                      class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full px-3 py-1 rounded-b-xl"
                      @click="moveToday"
                    >
                      Today
                    </button>
                    <!-- <button
                      class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full px-3 py-1 rounded-md"
                      @click="moveToday"
                    >
                      Create
                    </button> -->
                  </div>
                </template>
              </Calendar>
              <Calendar :attributes="attrs" expanded title-position="left" @dayclick="dayclick">
                <!-- <template #header-title-wrapper>header-title-wrapper</template>
                <template #header-prev-button>header-prev-button</template>
                <template #header-next-button>header-next-button</template>
                <template #nav-prev-button>nav-prev-button</template>
                <template #nav-next-button>nav-next-button</template>
                <template #day-content> {{ day }}22 </template>
                <template #day-popover>day-popover</template>

                <template #footer>
                  <div class="w-full px-4 pb-3">
                    <button
                      class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-full px-3 py-1 rounded-md"
                      @click="moveToday"
                    >
                      Today
                    </button>
                  </div>
                </template> -->
              </Calendar>
            </div>

            <div
              class="absolute z-50 left-0 w-full flex flex-row flex-nowrap justify-evenly items-center content-start"
            >
              <div
                role="alert"
                class="alert alert-error shadow-lg text-white absolute z-10 w-[calc(100% - 100px)]"
                v-if="base.errorMsg"
                style="box-shadow: 0px 5px 10px 1px #000000"
              >
                <Icon icon="mingcute:warning-line" class="shrink-0 w-6 h-6" />
                <div>
                  <h3 class="font-bold">{{ base.errorMsg }}</h3>
                </div>
                <button
                  class="btn btn-link no-underline text-white modal-button btn-xs"
                  @click="base.errorMsg = ''"
                >
                  <Icon icon="zondicons:close-outline" class="w-5 h-5" />
                </button>
              </div>
            </div>
            <div>
              <div class="tabs tabs-lifted">
                <input
                  type="radio"
                  class="tab"
                  name="WH"
                  aria-label="Report"
                  @change="tab = 'reportDashboard'"
                  :checked="tab == 'reportDashboard' ? true : false"
                />
                <div
                  class="tab-content bg-base-100 border-base-300"
                  v-if="tab == 'reportDashboard'"
                >
                  <!-- <progress
                    class="progress progress-success w-56"
                    :value="base.loading_percent"
                    max="100"
                  ></progress> -->
                  <div
                    v-if="base.loading"
                    class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
                  >
                    <AppModuleGlobalLoadingText
                      :type="'percent'"
                      :percent="base.loading_percent"
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
                            <th>#</th>
                            <td>Code</td>
                            <td>Title</td>
                            <td>Creation</td>
                            <td>Updation</td>
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
                              {{ v.id }}
                            </th>
                            <td>
                              {{ v.code }}
                            </td>
                            <td>
                              <!-- <div class="flex items-center space-x-3"> -->
                              <div class="text-sm">{{ v.title }}</div>
                              <!-- </div> -->
                            </td>
                            <td>
                              <!-- <div class="flex items-center space-x-3"> -->
                              <!-- <div class="text-xs"> -->
                              {{
                                v.created_at &&
                                $moment(v.created_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.created_at
                                  : "-"
                              }}
                              <!-- </div> -->
                              <div class="text-xs">
                                {{
                                  v.created_fullname ? v.created_fullname : "-"
                                }}
                              </div>
                              <!-- </div> -->
                            </td>
                            <td>
                              <!-- <div class="flex items-center space-x-3"> -->
                              <!-- <div class="text-xs"> -->
                              {{
                                v.updated_at &&
                                $moment(v.updated_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.updated_at
                                  : "-"
                              }}
                              <!-- </div> -->
                              <div class="text-xs">
                                {{
                                  v.updated_fullname ? v.updated_fullname : "-"
                                }}
                              </div>
                              <!-- </div> -->
                            </td>
                            <th class="text-right">
                              <label
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
                                    'controllers/MYSQL/INTERNAL/System/access'
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
                <input
                  type="radio"
                  class="tab"
                  name="WH"
                  aria-label="Preview"
                  @change="tab = 'Preview'"
                  :checked="tab == 'Preview' ? true : false"
                />
                <div
                  class="tab-content bg-base-100 border-base-300"
                  v-if="tab == 'Preview'"
                >
                  <PDFViewer
                    :source="'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'"
                    class="h-[75vh] w-full"
                    @download="handleDownload"
                  />
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
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleMenu_ from "@/components/App/Module/Menu/_.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";

import PDFViewer from "pdf-viewer-vue";

// import AppLayout from "@/components/App/layout.vue";
// import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
// import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
// import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";

// import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";

// const { pdf } = usePDF('sample.pdf')

// วันที่จะคุยรวมกับเขา
// เก็บแผนกไหนบ้าง

// Document คุยวันไหน
// คุยกับใคร

import call from "@/assets/js/fetch.js";
// import { setupCalendar } from 'v-calendar';
import { Calendar } from "v-calendar";
import "v-calendar/style.css";
export default {
  name: "Department",
  components: {
    AppLayout,
    AppModuleGlobalPageination,
    AppModuleGlobalSearch,
    AppModuleMenu_,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    PDFViewer,
    AppModuleGlobalUpload,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalShowImage,
    // VCalendar
    Calendar,
    // DatePicker,
  },
  data() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
      masks: {
        weekdays: "WWW",
      },
      attributes: [
        {
          key: 1,
          customData: {
            title: "TEST DOCkUMENT",
            class: "bg-red-600 text-white",
          },
          dates: new Date(year, month, 3),
        },

        // {
        //   key: 2,
        //   customData: {
        //     title: "Take Noah to basketball practice",
        //     class: "bg-blue-500 text-white",
        //   },
        //   dates: new Date(year, month, 2),
        // },
        {
          key: 3,
          customData: {
            title: "Noah's basketball game.",
            class: "bg-blue-500 text-white",
          },
          dates: new Date(year, month, 5),
        },
        {
          key: 4,
          customData: {
            title: "Take car to the shop",
            class: "bg-indigo-500 text-white",
          },
          dates: new Date(year, month, 5),
        },
        {
          key: 4,
          customData: {
            title: "Meeting with new client.",
            class: "bg-teal-500 text-white",
          },
          dates: new Date(year, month, 7),
        },
        // {
        //   key: 5,
        //   customData: {
        //     title: "Mia's gymnastics practice.",
        //     class: "bg-pink-500 text-white",
        //   },
        //   dates: new Date(year, month, 11),
        // },
        // {
        //   key: 6,
        //   customData: {
        //     title: "Cookout with friends.",
        //     class: "bg-orange-500 text-white",
        //   },
        //   dates: { months: 5, ordinalWeekdays: { 2: 1 } },
        // },
        // {
        //   key: 7,
        //   customData: {
        //     title: "Mia's gymnastics recital.",
        //     class: "bg-pink-500 text-white",
        //   },
        //   dates: new Date(year, month, 22),
        // },
        // {
        //   key: 8,
        //   customData: {
        //     title: "Visit great grandma.",
        //     class: "bg-red-600 text-white",
        //   },
        //   dates: new Date(year, month, 25),
        // },
      ],
      attrs: [
        {
          highlight: true,
          dates: new Date(),
        },
      ],
      tab: "reportDashboard",
      base: {
        rows: [],
        total: 0,
        page: 1,
        row: 20,
        q: "",
        next: false,
        back: false,
        loading: false,
        loading_percent: 0,
        errorMsg: "",
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
    sdas(e) {
      e.preventDefault();
      console.log("DASDAS");
    },
    dayclick(v) {
      console.log(v);
    },
    onDayClickHandler(v) {
      console.log(v);
      this.base.modal = true;
      this.base_create();
    },
    focus(v) {
      console.log(v);
    },
    moveToday() {
      console.log(this.$refs.calendar.move);
      console.log(new Date());
      this.$refs.calendar.move(new Date());
    },
    // base
    base_search() {
      this.base.loading = true;
      this.base.loading_percent = 0;

      this.base_get((res) => {
        this.base.rows = res.rows ? res.rows : [];
        this.base.total = res.total ? res.total : 0;
        this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
        this.base.back = this.base.page > 1 ? true : false;
        this.base.loading = false;
        this.base.errorMsg = res.errorMsg;
      });
    },
    base_get(callback) {
      let url = `${
        this.serviceUrl
      }api/controllers/MYSQL/INTERNAL/System/access?total=1&page=${
        this.base.page
      }${this.base.row ? `&rows=${this.base.row}` : ""}${
        this.base.q ? `&q=${this.base.q}` : ""
      }`;

      call("GET", this, url, null, (res) => {
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
      this.removing = false;
      this.base.current = 0;
      this.base.form = {
        code: "",
        imageLink: "",
        image: [],
      };
      // this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.form.access = JSON.parse(this.base.form.access);
      this.base.current = code;
      this.base.controll = "edit";
    },
    base_save() {
      let url = `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/access`;
      let obj = {
        code: this.base.current,
        rows: [
          {
            ...Object.assign({ ...this.base.form }),
          },
        ],
      };
      call("SET", this, url, obj, (res) => {
        if (!res.success) {
        } else {
          this.base.modal = false;
          this.base.page = 1;
          this.base_search();
        }
      });

      // fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/access`, {
      //   method: this.base.controll == "create" ? "POST" : "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${this.user_token}`,
      //   },
      //   body: JSON.stringify(obj),
      // })
      //   .then((response) => response.json())
      //   .then((res) => {
      //     if (!res.success) {
      //       localStorage.removeItem("user_token");
      //       this.$router.push({ name: `Login` });
      //     } else {
      //       this.base.modal = false;
      //       this.base.page = 1;
      //       this.base_search();
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });
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
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
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

<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  display: none;
}

/deep/ .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  /* --day-width: 90px; */
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;

  /* border-radius: 0; */
  width: 100%;
  /* border-radius: 10px; */
  & .vc-header {
    margin-top: 0px;
    /* background-color: #f1f5f8;
     padding: 10px 0; */
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    /* padding: 0 5px 3px 5px; */
    padding: 0px;
    text-align: left;
    height: var(--day-height);
    /* min-width: var(--day-width); */
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day:hover {
    background-color: var(--fallback-b1, oklch(var(--b1) / 0.1));
  }
  & .flex {
    cursor: pointer;
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>

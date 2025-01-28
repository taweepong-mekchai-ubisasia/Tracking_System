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
        <div class="card modal-box relative w-11/12 max-w-7xl">
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <!-- <h3 class="text-xl font-bold text-primary mb-5">Work</h3> -->
          <div class="join join-vertical w-full p-3">
            <div class="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" checked="checked" />
              <div class="collapse-title text-xl font-medium">
                <p class="font-bold text-primary"> Work </p>
              </div>
              <div class="collapse-content">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Topic</span>
                  </label>
                  <input
                    type="text"
                    placeholder="หัวข้อ"
                    class="input input-sm input-bordered border-gray-300"
                    :class="base.form.topic ? 'bg-green-50 text-black' : ''"
                    v-model="base.form.topic"
                  />
                </div>
                <div class="grid gap-3 grid-cols-3">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Type</span>
                    </label>
                    <select 
                      class="select select-sm select-bordered w-full" 
                      :class="base.form.type ? 'bg-green-50 text-black' : ''"
                      v-model="base.form.type"
                    >
                      <option value="" disabled selected>ประเภท</option>
                      <option value="rouetine">Rouetine</option>
                      <option value="support">Support</option>
                      <option value="report">Report</option>
                      <option value="project">Project</option>
                    </select>
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Priority</span>
                    </label>
                    <select 
                      class="select select-sm select-bordered w-full"
                      :class="base.form.priority ? 'bg-green-50 text-black' : ''"
                      v-model="base.form.priority"
                    >
                      <option value="" disabled selected>ความสำคัญ</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Status</span>
                    </label>
                    <select 
                      v-if="base.form.type == 'project' || base.form.type == 'report'"
                      class="select select-sm select-bordered w-full" 
                      :class="base.form.status ? 'bg-green-50 text-black' : ''"
                      v-model="base.form.status"
                    >
                      <option value="" disabled selected>สถานะ</option>
                      <option value="newtopic">New Topic</option>
                      <option value="getrequirement">Get Requirement</option>
                      <option value="implement">Implement</option>
                      <option value="followup">Follow Up</option>
                      <option value="production">Production</option>
                    </select>
                    <select 
                      v-else
                      class="select select-sm select-bordered w-full" 
                      :class="base.form.status ? 'bg-green-50 text-black' : ''"
                      v-model="base.form.status"
                    >
                      <option value="" disabled selected>สถานะ</option>
                      <option value="newtopic">New Topic</option>
                      <option value="inprogress">In Progress</option>
                      <option value="complete">Complete</option>
                    </select>
                  </div>
                </div>
                <div class="grid gap-3 grid-cols-2">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Responsible Person</span>
                    </label>
                    <AppModuleGlobalSelectSearch
                      :placeholder="'ผู้รับผิดชอบ'"
                      :label="'firstname'"
                      :code="'firstname'"
                      :minChar="0"
                      :delay="0.5"
                      :limit="10"
                      :customClass="`input input-sm input-bordered ${base.form.responsible_person ? 'bg-green-50 text-black' : ''}`"
                      :disabled="checkbox == 'M' ? true : false"
                      :current="base.form.responsible_person"
                      :refresh="refresh.code"
                      @updateValue="
                        (obj) => {
                          base.form.responsible = obj.code;
                          base.form.responsible_person = obj.firstname;
                        }
                      "
                      @stopRefresh="
                        (obj) => {
                          refresh.code = obj.value;
                        }
                      "
                      :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/Employee`"
                      :param="`&department=170564984072e3e&total=1`"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Assigned Person</span>
                    </label>
                    <AppModuleGlobalSelectSearch
                      :placeholder="'ผู้ได้รับมอบหมาย'"
                      :label="'firstname'"
                      :code="'firstname'"
                      :minChar="0"
                      :delay="0.5"
                      :limit="10"
                      :customClass="`input input-sm input-bordered ${base.form.assigned_person ? 'bg-green-50 text-black' : ''}`"
                      :disabled="checkbox == 'M' ? true : false"
                      :current="base.form.assigned_person"
                      :refresh="refresh.code"
                      @updateValue="
                        (obj) => {
                          base.form.assigned = obj.code;
                          base.form.assigned_person = obj.firstname;
                        }
                      "
                      @stopRefresh="
                        (obj) => {
                          refresh.code = obj.value;
                        }
                      "
                      :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/Employee`"
                      :param="`&department=170564984072e3e&total=1`"
                    />
                  </div>
                </div>
                <div class="grid gap-3 grid-cols-2">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Start</span>
                    </label>
                    <input
                      type="datetime-local"
                      placeholder="เริ่ม"
                      class="input input-sm input-bordered border-gray-300"
                      :class="base.form.start_at ? 'bg-green-50 text-black' : ''"
                      v-model="base.form.start_at"
                      :data-date="
                        $moment(base.form.start_at).format(
                          'DD-MM-YYYY HH:mm:ss'
                        )
                      "
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">End</span>
                    </label>
                    <input
                      type="datetime-local"
                      placeholder="จบ"
                      class="input input-sm input-bordered border-gray-300"
                      :class="base.form.end_at ? 'bg-green-50 text-black' : ''"
                      v-model="base.form.end_at"
                      :data-date="
                        $moment(base.form.end_at).format(
                          'DD-MM-YYYY HH:mm:ss'
                        )
                      "
                    />
                  </div>
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Remarks</span>
                  </label>
                  <textarea 
                    class="textarea textarea-bordered" 
                    :class="base.form.remarks ? 'bg-green-50 text-black' : ''"
                    placeholder="รายละเอียดเพิ่มเติม"
                    v-model="base.form.remarks"
                  ></textarea>
                </div>
                <div class="backdrop-blur sticky top-0 items-center gap-2 flex justify-end">
                  <div class="form-control mt-6 w-24">
                    <label for="modal-base" class="btn btn-sm btn-ghost">Cancel</label>
                  </div>
                  <div class="form-control mt-6 w-24" @click="base_save()">
                    <button class="btn btn-sm btn-primary text-white">Save</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="collapse collapse-arrow join-item border-base-300 border" v-if="base.controll == 'edit'">
              <input type="radio" name="my-accordion-4" />
              <div class="collapse-title text-xl font-medium">
                <p class="font-bold text-secondary"> Timeline </p>
              </div>
              <div class="collapse-content">
                <div class="flex gap-1">
                  <button
                    class="btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    วันที่:
                  </button>
                  <input
                    type="date"
                    placeholder="วันที่"
                    class="input input-sm input-bordered border-gray-300 sm:w-fit w-full"
                    :class="detail.form.new_date ? 'bg-blue-50 text-black' : ''"
                    v-model="detail.form.new_date"
                  />
                  <input
                    type="text"
                    placeholder="เนื้อหา"
                    class="input input-sm input-bordered border-gray-300 w-full"
                    :class="detail.form.new_detail ? 'bg-blue-50 text-black' : ''"
                    v-model="detail.form.new_detail"
                  />
                  <button class="btn btn-sm btn-secondary text-white sm:w-20 w-full" @click="detail_save()">Add</button>
                </div>
                <div class="max-h-[58vh] overflow-x-auto px-2 mt-1">
                  <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical mt-3 w-full">
                    <li v-for="(v, i) in detail.rows" :key="v.code">
                      <div class="timeline-middle">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="h-5 w-5">
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div :class="`${i % 2 == 0 ? 'timeline-start md:text-end text-start' : 'timeline-end text-start'} mb-10 w-full`">
                        <time class="text-lg font-mono italic">{{ $moment(v.date).format("DD-MM-YYYY") }}</time>
                        <div class="">
                          <textarea 
                            class="textarea textarea-bordered w-full" 
                            placeholder="รายละเอียดเพิ่มเติม"
                            v-model="v.detail"
                            rows="3"
                            :disabled="!v.edit"
                          ></textarea>
                        </div>
                        <div class="text-sm font-black opacity-50">( {{ v.firstname }} )</div>
                        <label
                          v-if="!v.edit"
                          class="btn btn-warning modal-button btn-xs"
                          @click="v.edit = !v.edit"
                        >
                          แก้ไข
                        </label>
                        <label
                          v-else
                          class="btn btn-success modal-button btn-xs"
                          @click="detail_save(i+1)"
                        >
                          บันทึก
                        </label>
                        <label
                          for="modal-remove"
                          class="btn btn-ghost modal-button btn-xs ms-1"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'detail',
                              'api/controllers/MYSQL/INTERNAL/IT/timeline'
                            )
                          "
                        >
                          ลบ
                        </label>
                      </div>
                      <hr />
                    </li>
                  </ul>
                </div>
              </div>
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
        <div class="modal-box relative w-11/12 max-w-xs max-h-[60h]">
          <label
            for="modal-remove"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-error">REMOVE ITEM</h3>
          <div class="divider mt-1"></div>
          <div class="h-[5vh]">
            แน่ใจนะ?
          </div>
          <div class="divider mt-1"></div>
          <div class="backdrop-blur sticky top-0 items-center gap-2 flex justify-end">
            <div class="form-control">
              <label for="modal-remove" class="btn btn-sm btn-ghost">Cancel</label>
            </div>
            <div class="form-control">
              <button
                class="btn btn-sm btn-error text-white"
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
      <div class="fixed bottom-4 right-4">
        <label
          for="modal-base"
          class="join-item btn btn-lg btn-primary modal-button text-white rounded-full w-[64px]"
          @click="base_create()"
        >
          <Icon icon="line-md:file-document-plus" width="100%" height="100%" />
        </label>
      </div>
      <div class="mt-2 h-16 grid grid-cols-2 gap-2 p-2">
        <div 
          class="bg-base-100 flex justify-between items-center px-5 rounded shadow-lg hover:shadow-md cursor-pointer"
          @click="
            sorts.status == 'ASC' ? sorts.status = 'DESC' : sorts.status = 'ASC';
            sorts.start = '';
            base_search();
          "
        >
          <div class="text-3xl font-extrabold">
            STATUS
          </div>
          <div v-if="sorts.status == 'ASC'">
            <Icon icon="bx:up-arrow" />
            <Icon icon="bxs:down-arrow" />
          </div>
          <div v-else-if="sorts.status == 'DESC'">
            <Icon icon="bxs:up-arrow" />
            <Icon icon="bx:down-arrow" />
          </div>
          <div v-else>
            <Icon icon="bx:up-arrow" />
            <Icon icon="bx:down-arrow" />
          </div>
        </div>
        <div 
          class="bg-base-100 flex justify-between items-center px-5 rounded shadow-lg hover:shadow-md cursor-pointer"
          @click="
            sorts.start == 'ASC' ? sorts.start = 'DESC' : sorts.start = 'ASC';
            sorts.status = '';
            base_search();
          "
        >
          <div class="text-3xl font-extrabold">
            START DATE
          </div>
          <div v-if="sorts.start == 'ASC'">
            <Icon icon="bx:up-arrow" />
            <Icon icon="bxs:down-arrow" />
          </div>
          <div v-else-if="sorts.start == 'DESC'">
            <Icon icon="bxs:up-arrow" />
            <Icon icon="bx:down-arrow" />
          </div>
          <div v-else>
            <Icon icon="bx:up-arrow" />
            <Icon icon="bx:down-arrow" />
          </div>
        </div>
      </div>
      <div class="mt-6 mx-10">
        <div class="grid grid-rows-100 gap-3">
          <div class="indicator cursor-pointer w-full" v-for="(v, i) in base.rows" :key="v.code" @dblclick="base_edit(`${v.code}`, `${i}`)">
            <span 
              class="indicator-item indicator-start badge font-semibold w-24"
              :class="v.status == 'production' || v.status == 'complete' ? 'badge-success' 
                : v.status == 'followup' ? 'badge-warning' 
                : v.status == 'implement' ? 'badge-error' 
                : v.status == 'getrequirement' || v.status == 'inprogress' ? 'badge-info'
                : ''"
            >
              {{ v.status }}
            </span>
            <div class="bg-base-100 rounded shadow-lg hover:shadow-sm grid w-full place-items-center py-1">
              <span class="flex items-center gap-3">
                <kbd class="kbd kbd-xs">{{ v.type }}</kbd>
                <span class="font-semibold italic"> {{ v.topic }} </span>
              </span>
              <p class="opacity-50 font-semibold italic text-sm" v-if="v.remarks"> {{ (v.remarks).slice(0, 100) }}...</p>
            </div>
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

export default {
  name: "Employee",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
  },
  data() {
    return {
      sorts: {
        status: '',
        start: ''
      },
      w: window.innerWidth,
      temp: [],
      removing: false,
      refresh: false,
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
      detail: {
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
    // base
    base_search() {
      this.base.loading = true;
      this.base_get((res) => {
        setTimeout(() => {
          this.base.rows = res.rows;
          this.base.total = res.total;
          this.base.next = this.base.page * this.base.row >= this.base.total ? false : true;
          this.base.back = this.base.page > 1 ? true : false;
          this.base.loading = false;
        }, 250);
      });
    },
    base_get(callback) {
      console.log(this.sorts)
      new Query("base", "get").get(
        this,`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/IT/task?total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row
          }` : ""}${this.base.q ? `&q=${this.base.q}` : ""}${this.sorts.status ? `&status=${this.sorts.status}` : ''}${this.sorts.start ? `&start=${this.sorts.start}` : ''}`,
        (res) => {
          if (!res.success) {
          } else {
            console.log(res.rows)
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });
            console.log(this.sorts)
          }
          callback({ ...res });
        }
      );
    },
    base_create() {
      this.base.current = 0;
      this.base.form = {
        code: "",
        type: "",
        priority: "",
        status: ""
      };
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.modal = true

      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.base.controll = "edit";
      this.detail.controll = "create";
      this.detail.rows = [];
      this.detail_search();
    },
    base_save() {
      let obj = {
        rows: [
          this.base.form
        ],
      };

      new Query("base", this.base.controll == "create" ? "post" : "put").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/IT/task`, obj, (res) => {
          if (!res.success) {
          } else {
            this.base.modal = false
            this.base_search();
          }
        }
      );
    },
    // DETAIL
    detail_search() {
      this.detail.loading = true;
      this.detail_get((res) => {
        this.detail.rows = res.rows;
        this.detail.total = res.total;
        this.detail.next = this.detail.page * this.detail.row >= this.detail.total ? false : true;
        this.detail.back = this.detail.page > 1 ? true : false;
        this.detail.loading = false;
      });
    },
    detail_get(callback) {
      new Query("detail", "get").get(this,`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/IT/timeline?task=${this.base.form.code}&total=1&page=${this.detail.page}${this.detail.row
        ? `&rows=${this.detail.row}` : ""}${this.detail.q ? `&q=${this.detail.q}` : ""}${this.base.current ? `&current=${this.base.current}` : ``}`,
      (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
            res.rows[i].edit = false;
          });
        }
        callback({ ...res });
      });
    },
    detail_create() {
      this.detail.current = 0;
      this.detail.form = {
        code: "",
      };
      this.detail.controll = "create";
    },
    detail_edit(code) {
      this.detail.current = code;
      let index = this.detail.rows.findIndex(
        (v) => v.code == this.detail.current
      );
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.controll = "edit";
    },
    detail_save(index = null) {
      if (index) {
        this.detail.form = this.detail.rows[index-1]
        this.detail.controll = 'edit'
      }
      this.detail.form['date'] = this.detail.form.new_date
      this.detail.form['detail'] = this.detail.form.new_detail

      let obj = {
        rows: [
          this.detail.form
        ],
      };

      obj['rows'][0]['task'] = this.base.form.code

      new Query("detail", this.detail.controll == "create" ? "post" : "put").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/IT/timeline`, obj, (res) => {
          if (!res.success) {
          } else {
            this.detail.form = {}
            this.detail_search();
          }
        }
      );
    },
    remove_item(code, controll, tb) {
      // console.log(code);
      this.remove.rows = null
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
          rows: [{ code: this.remove.code }],
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (!res.success) {
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
    this.$nextTick(() => {
      this.sorts.status = 'ASC';
      this.sorts.start = '';
      // console.log(this.sorts)
      this.base_search();
    });
  },
};
</script>

<style scoped>
  input[type="datetime-local"] {
    position: relative;
  }
  
  input[type="datetime-local"]:before {
    /* position: absolute; */
    /* top: 3px; left: 3px; */
    content: attr(data-date);
    display: inline-block;
    /* color: black; */
  }
  
  input[type="datetime-local"]::-webkit-datetime-edit {
    display: none;
  }
  
  /* input::-webkit-datetime-edit, input::-webkit-inner-spin-button, input::-webkit-clear-button {
      display: none;
  } */
  
  input[type="datetime-local"]::-webkit-calendar-picker-indicator {
    position: absolute;
    top: 0.4rem;
    right: 10px;
    color: black;
    opacity: 1;
  }
</style>
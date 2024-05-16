<template>
  <div class="RacLayoutModule">
    <div class="card">
      <div class="card-body" v-if="edit">
        <details class="collapse bg-base-300 mb-4">
          <summary class="collapse-title text-xl font-medium">Details</summary>
          <div class="collapse-content">
            <div class="card shrink-0 w-full shadow-2xl bg-base-100">
              <div class="card-body">
                <div class="flex w-full gap-4">
                  <div class="flex-0 w-auto">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Rotate</span>
                      </label>
                      <input
                        type="checkbox"
                        class="toggle"
                        checked
                        v-model="layout.form.rotate"
                      />
                    </div>
                  </div>
                  <div class="flex-1 w-full">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Rac</span>
                      </label>
                      <input
                        type="text"
                        placeholder="rac"
                        class="input input-bordered "
                        required
                        v-model="layout.form.rac"
                      />
                    </div>
                  </div>
                  <div class="flex-0 w-auto">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Bay</span>
                      </label>
                      <input
                        type="number"
                        placeholder="bay"
                        class="input input-bordered "
                        required
                        v-model="layout.form.bay"
                        min="2"
                        max="20"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex w-full gap-4">
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Levels</span>
                      </label>
                      <input
                        type="number"
                        placeholder="levels"
                        class="input input-bordered "
                        required
                        v-model="layout.form.levels"
                        min="1"
                        max="5"
                      />
                    </div>
                  </div>
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Pallets</span>
                      </label>
                      <input
                        type="number"
                        placeholder="pallets"
                        class="input input-bordered "
                        required
                        v-model="layout.form.pallets"
                        min="1"
                        max="5"
                      />
                    </div>
                  </div>
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">X</span>
                      </label>
                      <input
                        type="number"
                        placeholder="x"
                        class="input input-bordered "
                        required
                        v-model="layout.form.x"
                        min="1"
                        max="5"
                      />
                    </div>
                  </div>
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Y</span>
                      </label>
                      <input
                        type="number"
                        placeholder="y"
                        class="input input-bordered "
                        required
                        v-model="layout.form.y"
                        min="1"
                        max="5"
                      />
                    </div>
                  </div>
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Width</span>
                      </label>
                      <input
                        type="number"
                        placeholder="width"
                        class="input input-bordered "
                        required
                        v-model="layout.form.width"
                        min="1"
                        max="5"
                      />
                    </div>
                  </div>
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Height</span>
                      </label>
                      <input
                        type="number"
                        placeholder="height"
                        class="input input-bordered "
                        required
                        v-model="layout.form.height"
                        min="1"
                        max="5"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-control mt-2">
                  <button
                    class="btn btn-sm md:btn-md lg:btn-lg btn-primary w-full"
                    v-if="!layout.editing"
                    @click="addLayout()"
                  >
                    Add New Layout
                  </button>
                  <div v-else>
                    <div class="join w-full">
                      <button
                        class="btn btn-sm md:btn-md lg:btn-lg btn-error w-[50%] mt- join-item"
                        @click="deleteLayout()"
                      >
                        Delete
                      </button>
                      <button
                        class="btn btn-sm md:btn-md lg:btn-lg btn-neutral w-[50%] join-item"
                        @click="copyLayout()"
                      >
                        Copy
                      </button>
                    </div>
                    <button
                      class="btn btn-sm md:btn-md lg:btn-lg btn-outline btn-accent w-full mt-2"
                      @click="closeLayout()"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>

    <div class="flex relative flex-row flex-wrap justify-center content-center">
      <div class="w-full h-[80vh] relative overflow-auto">
        <draggable-resizable-vue
          :show-grid="false"
          :resizable="false"
          grid-color="rgba(1, 1, 1, 1)"
          v-model:h="aa.height"
          v-model:w="aa.width"
          v-model:active="aa.isActive"
          :draggable="drag.main"
          :style="{
            left: `-${this.aa.padding.x / 2}px`,
            top: `-${this.aa.padding.y / 2}px`,
            border: 'unset',
            padding: `${this.aa.padding.y * this.scale}px ${
              this.aa.padding.x * this.scale
            }px`,
          }"
        >
          <div
            :style="{
              scale: scale,
              width: 'max-content',
              height: 'max-content',
            }"
          >
            <draggable-resizable-vue
              v-for="(v, i) in base.rows"
              :key="i"
              :show-grid="true"
              grid-color="rgba(1, 1, 1, 1)"
              v-model:x="v.x"
              v-model:y="v.y"
              v-model:h="v.height"
              v-model:w="v.width"
              v-model:active="v.isActive"
              :draggable="drag.layout"
              :style="{
                'background-color': v.inActive != v.active ? 'linen' : 'orange',
              }"
              @activated="onActivated(v, i)"
              @deactivated="onDeactivated(v, i)"
              @resizing="onResizing(v, i)"
              @dragging="onDragging(v, i)"
              :class="`${v.remove ? 'hidden' : ''}`"
            >
              <div
                class="flex w-full flex-row flex-nowrap justify-center items-start justify-items-center p-1 gap-1 h-full"
              >
                <div class="w-[20%] text-left flex flex-col-reverse">
                  <div
                    class="leading-[0.7rem] text-[xx-small]"
                    v-for="index in parseInt(v.levels)"
                    :key="index"
                  >
                    <div
                      v-if="
                        !layouts.data[`${v.code}-${index}`] ||
                        layouts.data[`${v.code}-${index}`] < v.pallets
                      "
                      class="flex  text-black"
                    >
                      L{{ index }}

                      <span v-for="ip in parseInt(v.pallets)" class="flex">
                        <span
                          class="flex"
                          v-if="!layouts.data[`${v.code}-${index}-${ip}`]"
                          >(<span>{{ ip }}</span
                          >)</span
                        >
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="w-[80%] text-right grid items-center h-full"
                  :style="
                    v.rotate
                      ? {
                          position: 'relative',
                          transform: 'scale(-1)',
                          'writing-mode': 'vertical-lr',
                        }
                      : {}
                  "
                >
                  <span
                    class="text-xs overflow-hidden w-full text-black"
                    :class="`${v.rotate ? 'text-center' : ''}`"
                    style="word-wrap: break-word"
                  >
                    {{ v.rac }}{{ v.bay }}
                  </span>
                </div>
              </div>
            </draggable-resizable-vue>
          </div>
        </draggable-resizable-vue>
      </div>
      <div class="join join-vertical absolute top-4 right-4">
        <button
          class="btn btn-square join-item"
          @click="scale < 2 ? (scale = scale + 0.1).toFixed(1) : ''"
        >
          <Icon icon="mingcute:plus-line" class="h-5 w-5 text-primary" />
        </button>
        <div
          class="btn btn-square text-opacity-50 max-w-xs join-item text-center text-xs p-0 text-primary font-black"
        >
          {{ scale.toFixed(1) }}
        </div>
        <button
          class="btn btn-square join-item"
          @click="scale > 0.1 ? (scale = scale - 0.1).toFixed(1) : ''"
        >
          <Icon icon="typcn:minus-outline" class="h-5 w-5 text-primary" />
        </button>

        <button
          class="btn btn-square btn-primary join-item"
          @click="editLayout()"
          v-if="!edit && user.access.WH.WHBinLocationManagement == 'superadmin'"
        >
          <Icon icon="lucide:square-pen" class="h-5 w-5 text-white" />
        </button>

        <button
          class="btn btn-square btn-success join-item"
          @click="saveLayout()"
          v-if="edit"
        >
          <Icon icon="mdi:check-outline" class="h-5 w-5 text-white" />
        </button>

        <button
          class="btn btn-square btn-error join-item"
          @click="cancelLayout()"
          v-if="edit"
        >
          <Icon icon="mdi:close-outline" class="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DraggableResizableVue from "draggable-resizable-vue3";
export default {
  name: "RacLayoutModule",
  components: {
    DraggableResizableVue,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  props: ["data", "wh", "parentX", "parentY", "scale", "refresh"],
  data() {
    return {
      current: 0,
      layouts: {
        data: [],
        rac: [],
        temp: [],
      },

      edit: false,

      aa: {
        rac: "Floor",
        bay: 1,
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        isActive: false,
        color: "orange",
        rotate: true,
        levels: 1,
        pallets: 1,
        padding: {
          x: 600,
          y: 100,
        },
      },
      detail: false,
      color: "#ff0000",
      drag: {
        main: true,
        layout: false,
      },

      layout: {
        scale: 0.75,
        editing: false,
        form: {
          rac: "Title",
          bay: 1,
          x: 20,
          y: 20,
          width: 50,
          height: 50,
          isActive: false,
          color: "orange",
          rotate: false,
          levels: 1,
          pallets: 1,
        },
        temp: {},
      },
      base: {
        rows: [],
        total: 0,
        page: 1,
        row: null,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
          name: "",
          number: "",
          size: "",
          description: "",
          category_id: "0",
          store_id: "0",
          recommend: "",
          room: "",
          imageLink: "",
          image: [],
        },
      },
      rac: {
        rows: [],
        total: 0,
        page: 1,
        row: null,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
          name: "",
          number: "",
          size: "",
          description: "",
          category_id: "0",
          store_id: "0",
          recommend: "",
          room: "",
          imageLink: "",
          image: [],
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
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    onResizing(v, i) {
      this.base.rows[i].edit = true;
    },
    onDragging(v, i) {
      this.base.rows[i].edit = true;
    },
    editLayout() {
      this.layouts.temp = JSON.stringify([...this.base.rows]);
      this.edit = true;
    },
    saveLayout() {
      this.edit = false;
      this.base_save();
    },
    cancelLayout() {
      this.base.rows = JSON.parse(this.layouts.temp);
      this.layouts.temp = [];
      this.edit = false;
    },

    addLayout() {
      this.layout.form["code"] = "";
      this.layout.form["new"] = true;
      this.layout.form["active"] = "9999";
      this.layout.form["wh"] = this.wh;
      this.base.rows.push({ ...this.layout.form });
    },
    copyLayout() {
      this.layout.form = { ...this.layout.form };
      this.layout.form["id"] = "";
      this.layout.form["code"] = "";
      this.layout.form["new"] = true;
      this.layout.form["active"] = "9999";
      this.layout.form["wh"] = this.wh;
      this.layout.editing = false;
    },
    deleteLayout() {
      this.layout.editing = false;
      this.base.rows[this.current].remove = true;
    },
    closeLayout() {
      this.current = null;
      this.layout.form = { ...this.layout.temp };
      this.layout.editing = false;
    },
    onActivated(v, i) {
      this.current = i;
      this.layout.form = v;
      this.layout.editing = true;
      this.drag.main = !this.drag.main;
      this.drag.layout = !this.drag.layout;
      if (this.edit) {
        return;
      }
      this.$emit("clickRac", v);
      this.detail = true;
    },
    onDeactivated(v, i) {
      this.drag.main = !this.drag.main;
      this.drag.layout = !this.drag.layout;
    },

    // base
    base_search(callback) {
      this.base.loading = true;
      this.base_get((res) => {
        this.base.rows = res.rows;
        this.base.total = res.total;
        this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
        this.base.back = this.base.page > 1 ? true : false;
        this.base.loading = false;
        callback(res);
      });
    },
    base_get(callback) {
      fetch(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WH/layout?wh=${this.wh}&transref=I&page=${
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
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            res.rows.map((v) => {
              v.isActive = false;
              v.x = parseInt(v.x);
              v.y = parseInt(v.y);
              v.width = parseInt(v.width);
              v.height = parseInt(v.height);
              return v;
            });
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
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/layout`,
        {
          method: this.base.controll == "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
          body: JSON.stringify({
            ...Object.assign({}, this.base.rows, { wh: this.wh }),
          }),
        }
      )
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            this.base.modal = false;
            this.base.rows = [];
            setTimeout(() => {
              vm.base_search((res) => {});
            }, 1000);
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
      fetch(`${this.serviceUrl}api/${this.remove.tb}`, {
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
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            this.remove.modal = false;
            this.base.rows = [];
            setTimeout(() => {
              this[`${this.remove.controll}_search`]((res) => {});
            }, 1000);
            
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    // GET FREE RAC
    rac_search(callback) {
      this.rac.loading = true;
      this.rac_get((res) => {
        this.rac.rows = res.rows;
        this.rac.total = res.total;
        this.rac.next =
          this.rac.page * this.rac.row >= this.rac.total ? false : true;
        this.rac.back = this.rac.page > 1 ? true : false;
        this.rac.loading = false;
        callback(res);
      });
    },
    rac_get(callback) {
      fetch(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WH/shelf?action=count&transref=I&transref_type_null=1&wh=${
          this.wh
        }&total=1&page=${this.rac.page}${
          this.rac.row ? `&rows=${this.rac.row}` : ""
        }${this.rac.q ? `&q=${this.rac.q}` : ""}`,
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
    configData() {
      this.layouts = {
        data: [],
        temp: [],
      };

      this.rac.rows.forEach((v, i) => {
        this.layouts.data[`${v.rac_layout}-${v.level}`]
          ? (this.layouts.data[`${v.rac_layout}-${v.level}`] += 1)
          : (this.layouts.data[`${v.rac_layout}-${v.level}`] = 1);

        this.layouts.data[`${v.rac_layout}-${v.level}-${v.pallet}`] = 1;
      });
    },
  },
  mounted() {
    this.$nextTick(() =>
      this.rac_search((res) => this.base_search(() => this.configData()))
    );
  },
  created() {},
  beforeDestroy() {},
  watch: {
    scale: function (v) {
      this.aa.height = window.screen.height * this.scale;
      this.aa.width = window.screen.width * this.scale;
    },
    refresh: function (v) {
      if (v) {
        this.rac_search(() =>
          this.base_search(() => {
            this.configData();
            this.$emit("stopRefresh", { value: false });
          })
        );
      }
    },
    "layout.form.rotate": function (v) {
      this.layout.form.edit = true;
    },
    "layout.form.height": function (v) {
      this.layout.form.edit = true;
    },
    "layout.form.width": function (v) {
      this.layout.form.edit = true;
    },
    "layout.form.y": function (v) {
      this.layout.form.edit = true;
    },
    "layout.form.x": function (v) {
      this.layout.form.edit = true;
    },
    "layout.form.pallets": function (v) {
      this.layout.form.edit = true;
    },
    "layout.form.levels": function (v) {
      this.layout.form.edit = true;
    },
    "layout.form.bay": function (v) {
      this.layout.form.edit = true;
    },
    "layout.form.rac": function (v) {
      this.layout.form.edit = true;
    },
  },
};
</script>

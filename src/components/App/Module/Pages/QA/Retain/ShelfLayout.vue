<template>
  <div class="grid grid-cols-1">
    <div class="card shadow-lg bg-base-100">
      <div class="card-body p-2 lg:p-4">
        <div
          v-if="base.pagination.loading"
          class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
        >
          <AppModuleGlobalLoadingText
            :class="`p-4 py-12 text-3xl text-center`"
          />
        </div>
        <div :class="`${base.pagination.loading ? 'blur-sm' : ''}`">
          <div v-if="edit">
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
                            <span class="label-text">Rack</span>
                          </label>
                          <input
                            type="text"
                            placeholder="rack"
                            class="input input-sm input-bordered "
                            required
                            v-model="layout.form.rack"
                          />
                        </div>
                      </div>
                      <div class="flex-1 w-auto">
                        <div class="form-control">
                          <label class="label">
                            <span class="label-text">Bay</span>
                          </label>
                          <input
                            type="number"
                            placeholder="bay"
                            class="input input-sm input-bordered "
                            required
                            v-model="layout.form.bay"
                            min="1"
                            max="9"
                          />
                        </div>
                      </div>
                      <div class="flex-1 w-auto">
                        <div class="form-control">
                          <label class="label">
                            <span class="label-text">Levels</span>
                          </label>
                          <input
                            type="number"
                            placeholder="levels"
                            class="input input-sm input-bordered "
                            required
                            v-model="layout.form.levels"
                            min="1"
                            max="8"
                          />
                        </div>
                      </div>
                      <div class="flex-1 w-auto">
                        <div class="form-control">
                          <label class="label">
                            <span class="label-text">Type</span>
                          </label>
                          <select class="select select-bordered select-sm" v-model="layout.form.type" :disabled="layout.form.inActive > 0 ? true : false">
                            <option selected value="G" v-if="props.wh == 'ubp'">Can</option>
                            <option selected value="C" v-if="props.wh == 'uba'">Can</option>
                            <option selected value="P" v-if="props.wh == 'uba'">Glass Bottle</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="flex w-full gap-4">
                      <div class="flex-1 w-auto">
                        <div class="form-control">
                          <label class="label">
                            <span class="label-text">X</span>
                          </label>
                          <input
                            type="number"
                            placeholder="x"
                            class="input input-sm input-bordered "
                            required
                            v-model="layout.form.x"
                            min="0"
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
                            class="input input-sm input-bordered "
                            required
                            v-model="layout.form.y"
                            min="0"
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
                            class="input input-sm input-bordered "
                            required
                            v-model="layout.form.width"
                            min="0"
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
                            class="input input-sm input-bordered "
                            required
                            v-model="layout.form.height"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-control mt-2">
                      <button
                        class="btn btn-sm md:btn-md lg:btn-lg btn-primary w-full"
                        v-if="!layout.editing"
                        @click="fnLayout.addLayout()"
                      >
                        Add New Layout
                      </button>
                      <div v-else>
                        <div class="join w-full">
                          <button
                            class="btn btn-sm md:btn-md lg:btn-lg btn-error w-[50%] mt- join-item"
                            @click="fnLayout.deleteLayout()"
                          >
                            Delete
                          </button>
                          <button
                            class="btn btn-sm md:btn-md lg:btn-lg btn-neutral w-[50%] join-item"
                            @click="fnLayout.copyLayout()"
                          >
                            Copy
                          </button>
                        </div>
                        <button
                          class="btn btn-sm md:btn-md lg:btn-lg btn-outline w-full mt-2"
                          @click="fnLayout.closeLayout()"
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
          <div
            class="overflow-x-auto w-full my-2"
            :style="{
              maxHeight: contentHeight,
              minHeight: contentHeight,
            }"
          >
            <div 
              class="flex relative flex-row flex-wrap justify-center content-center"
            >
              <draggable-resizable-vue
                :show-grid="false"
                :resizable="false"
                grid-color="rgba(1, 1, 1, 1)"
                v-model:h="aa.height"
                v-model:w="aa.width"
                v-model:active="aa.isActive"
                :draggable="drag.main"
                :style="{
                  left: `-${aa.padding.x / 2}px`,
                  top: `-${aa.padding.y / 2}px`,
                  border: 'unset',
                  padding: `${aa.padding.y * props.scale}px ${
                    aa.padding.x * props.scale
                  }px`,
                }"
              >
                <div
                  :style="{
                    scale: props.scale,
                    width: 'max-content',
                    height: 'max-content',
                  }"
                >
                  <draggable-resizable-vue
                    v-for="(v, i) in base.data.rows"
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
                      'background-color': v.obj ? v.color : v.inActive != v.active ? 'linen' : 'orange',
                    }"
                    @activated="fnLayout.onActivated(v, i)"
                    @deactivated="fnLayout.onDeactivated(v, i)"
                    @resizing="fnLayout.onResizing(v, i)"
                    @dragging="fnLayout.onDragging(v, i)"
                    :class="`${!v.obj ? 'cursor-pointer' : ''} ${v.remove ? 'hidden' : ''}`"
                  >
                    <div
                      class="flex w-full flex-row flex-nowrap justify-center items-start justify-items-center h-full"
                      v-if="!v.obj"
                    >
                      <div class="w-[20%] text-left flex flex-col-reverse absolute left-1 top-1">
                        <div
                          class="leading-[0.7rem] text-sm font-semibold"
                        >
                        {{ v.type == 'P' ? 'Bottle' : 'Can'}}
                        </div>
                      </div>
                      <div
                        class="text-right grid items-center h-full"
                        :class="v.bay > 9 ? 'w-[30%]' : 'w-[22%]'"
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
                          class="text-lg overflow-hidden w-full text-black font-bold"
                          :class="`${v.rotate ? 'text-center' : ''}`"
                          style="word-wrap: break-word"
                        >
                          {{ v.rack }}{{ v.bay }}
                        </span>
                      </div>
                    </div>
                  </draggable-resizable-vue>
                </div>
              </draggable-resizable-vue>
            </div>
            <div class="join absolute bottom-12 left-4">
              <button
                class="btn btn-square join-item"
                @click="props.scale < 2 ? (props.scale = props.scale + 0.1).toFixed(1) : ''"
              >
                <Icon icon="mingcute:plus-line" class="h-5 w-5 text-orange-500" />
              </button>
              <div
                class="btn btn-square text-opacity-50 max-w-xs join-item text-center text-xs p-0 text-orange-500 font-black"
              >
                {{ props.scale.toFixed(1) }}
              </div>
              <button
                class="btn btn-square join-item"
                @click="props.scale > 0.1 ? (props.scale = props.scale - 0.1).toFixed(1) : ''"
              >
                <Icon icon="typcn:minus-outline" class="h-5 w-5 text-orange-500" />
              </button>
              <div class="tooltip tooltip-left" data-tip="edit layout">
                <button
                  class="btn btn-square btn-primary join-item"
                  @click="fnLayout.editLayout()"
                >
                  <Icon icon="lucide:square-pen" class="h-5 w-5 text-white" />
                </button>
              </div>
              <button
                class="btn btn-square btn-success join-item"
                @click="fnLayout.saveLayout()"
                v-if="edit"
              >
                <Icon icon="mdi:check-outline" class="h-5 w-5 text-white" />
              </button>
              <button
                class="btn btn-square btn-error join-item"
                @click="fnLayout.cancelLayout()"
                v-if="edit"
              >
                <Icon icon="mdi:close-outline" class="h-5 w-5 text-white" />
              </button>
              <div class="tooltip tooltip-left" data-tip="clear item">
                <button
                  class="btn btn-square btn-error join-item"
                  @click="fnLayout.clearItem(base.data.rows)"
                  v-if="!edit"
                >
                  <Icon icon="ant-design:clear-outlined" class="h-6 w-6 text-white" />
                </button>
              </div>
              <!-- <div class="tooltip tooltip-left" data-tip="add item">
                <button
                  class="btn btn-square btn-success join-item"
                  @click="fnLayout.addItem(base.data.rows)"
                  v-if="!edit"
                >
                  <Icon icon="ant-design:appstore-add-outlined" class="h-6 w-6 text-white" />
                </button>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useContentHeight } from "@/composables/useContentHeightDynamic";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref } from "vue";
import { usePinia } from "@/store/pinia";

import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import DraggableResizableVue from "draggable-resizable-vue3";

export default {
  name: "ShelfLayoutModule",
  components: {
    DraggableResizableVue,
    AppModuleGlobalLoadingText
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
    wh: {
      type: String,
      default: "ubp",
    },
    parentX: {
      type: Number,
      default: 0,
    },
    parentY: {
      type: Number,
      default: 0,
    },
    scale: {
      type: Number,
      default: 0.7,
    },
    refresh: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["clickRack", "addItem", "clearItem"],
  setup(props, { emit }) {
    const authStore = usePinia()
    const store = useStore();
    configureQuery(store);

    const serviceUrl = computed(() => store.getters.serviceUrl);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone, 8);

    const shelf = ref({
      pagination: {
        page: 1,
        row: null,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
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
      },
      search: [
        {
          type: "search",
          id: "q",
          placeholder: "Search",
          label: "Search",
          value: "",
        },
      ]
    });

    const base = ref({
      pagination: {
        page: 1,
        row: null,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
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
      },
      search: [
        {
          type: "search",
          id: "q",
          placeholder: "Search",
          label: "Search",
          value: "",
        },
      ]
    });

    const remove = ref({
      current: 0,
      model: false,
      path: "",
      loading: false,
    });

    const layout = ref({
      scale: 0.75,
      editing: false,
      form: {
        rack: "Title",
        bay: 1,
        x: 20,
        y: 20,
        width: 50,
        height: 50,
        isActive: false,
        color: "orange",
        rotate: false,
        levels: 1,
        type: "can",
      },
      temp: {},
    })

    const layouts = ref({
      data: [],
      rack: [],
      temp: [],
    });

    const drag = ref({
      main: true,
      layout: false,
    });

    const current = ref(0);
    const detail = ref(false);
    const edit = ref(false);

    const fnShelf = {
      search: async () => {
        try {
          shelf.value.pagination.page = 1;
          await fnShelf.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (shelf.value.pagination.loading) return;
        shelf.value.pagination.loading = true;
        try {
          const queryParams = {
            page: shelf.value.pagination.page,
            row: shelf.value.pagination.row,
            search: shelf.value.search,
            action: 'count',
            transref: 'I',
            transref_type_null: true,
            wh: props.wh,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/QA/Retain/shelf_layout"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            shelf.value.data.rows = res.shlf;

            res.lay = res.lay.forEach(x => {
              x.level_detail = JSON.parse(x.level_detail);
              x.level_mY = JSON.parse(x.level_mY);
            });

            base.value.data.rows = res.lay;

            fnBase.search()
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          shelf.value.pagination.loading = false;
        }
      },
      success: () => {
        shelf.value.pagination.page = 1;
        fnShelf.search();
      },
    };

    const fnBase = {
      search: async () => {
        try {
          authStore.numberTen();
          base.value.pagination.page = 1;
          await fnBase.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (base.value.pagination.loading) return;
        base.value.pagination.loading = true;
        try {
          const queryParams = {
            page: base.value.pagination.page,
            row: base.value.pagination.row,
            search: base.value.search,
            wh: props.wh,
            transref: 'I',
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/QA/Retain/layout"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            res.rows.map((v) => {
              v.isActive = false;
              v.x = parseInt(v.x);
              v.y = parseInt(v.y);
              v.width = parseInt(v.width);
              v.height = parseInt(v.height);
              v.level_detail = JSON.parse(v.level_detail);
              v.level_mY = JSON.parse(v.level_mY);
              return v;
            });

            base.value.data.rows = res.rows;
            base.value.pagination.total = res.total;
            base.value.pagination.next =
              base.value.pagination.page * base.value.pagination.row <
              base.value.pagination.total;
            base.value.pagination.back = base.value.pagination.page > 1;

            fnLayout.configData()
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          base.value.pagination.loading = false;
        }
      },
      create: () => {
        base.value.data.form.current = 0;
        base.value.data.form.object = {
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
        };
        base.value.data.form.method = "POST";
        base.value.data.form.modal = true;
      },
      edit: (code, index) => {
        base.value.data.form.current = code;
        base.value.data.form.object = { ...base.value.rows[index] };

        base.value.data.form.object.category_code = base.value.data.form.object.category_code
          ? base.value.data.form.object.category_code
          : "0";
        base.value.data.form.object.recommend = base.value.data.form.object.recommend == "1" 
          ? true 
          : false;

        base.value.data.form.method = "PUT";
        base.value.data.form.modal = true;
      },
      save: async () => {
        if (base.value.data.form.loading) return;
        base.value.data.form.loading = true;
        try {
          const queryBody = {
            code: base.value.data.form.current,
            rows: [
              ...Object.assign(base.value.data.rows)
            ],
          };

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/QA/Retain/layout"
          );
          const method = base.value.data.form.method || "POST";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
          }

          if (base.value.data.form.current === 0) {
            base.value.data.form.current = res.rows[0].code;
          }
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          base.value.data.form.modal = false;
          base.value.data.form.loading = false;
          emit("update:success", null);
        }
      },
      success: () => {
        base.value.pagination.page = 1;
        fnBase.search();
      },
    };

    const fnLayout = {
      onResizing: (v, i) => {
        base.value.data.rows[i].edit = true;
      },
      onDragging: (v, i) => {
        base.value.data.rows[i].edit = true;
      },
      editLayout: () => {
        base.value.data.form.method = "PUT";
        layouts.value.temp = JSON.stringify([...base.value.data.rows]);
        edit.value = true;
      },
      saveLayout: () => {
        edit.value = false;
        fnBase.save();
      },
      cancelLayout: () => {
        base.value.data.rows = JSON.parse(layouts.value.temp);
        layouts.value.temp = [];
        edit.value = false;
      },
      addLayout: () => {
        layout.value.form["code"] = "";
        layout.value.form["new"] = true;
        layout.value.form["active"] = "9999";
        layout.value.form["wh"] = props.wh;
        base.value.data.rows.push({ ...layout.value.form });
      },
      copyLayout: () => {
        layout.value.form = { ...layout.value.form };
        layout.value.form["id"] = "";
        layout.value.form["code"] = "";
        layout.value.form["new"] = true;
        layout.value.form["active"] = "9999";
        layout.value.form["wh"] = props.wh;
        layout.value.editing = false;
      },
      deleteLayout: () => {
        layout.value.editing = false;
        base.value.data.rows[current.value].remove = true;
      },
      closeLayout: () => {
        current.value = null;
        layout.value.form = { ...layout.value.temp };
        layout.value.editing = false;
      },
      onActivated: (v, i) => {
        if (!v.obj) {
          current.value = i;
          layout.value.form = v;
          layout.value.editing = true;
          drag.value.main = !drag.value.main;
          drag.value.layout = !drag.value.layout;
          if (edit.value) {
            return;
          }
          emit("clickRack", v)
          detail.value = true;
        }
      },
      onDeactivated: (v, i) => {
        drag.value.main = drag.value.main;
        drag.value.layout = drag.value.layout;
      },
      configData: () => {
        layouts.value = {
          data: [],
          temp: [],
        };

        shelf.value.data.rows.forEach((v, i) => {
          layouts.value.data[`${v.rack_layout}-${v.level}`]
            ? (layouts.value.data[`${v.rack_layout}-${v.level}`] += 1)
            : (layouts.value.data[`${v.rack_layout}-${v.level}`] = 1);
          layouts.value.data[`${v.rack_layout}-${v.level}-${v.pallet}`] = 1;
        });
      },
      addItem: (v) => {
        emit("addItem", v.filter(x => x.level != x.max && x.bay));
      },
      clearItem: (v) => {
        emit("clearItem", null);
      }
    }

    const fnRemove = {
      item: (code, path) => {
        remove.value.modal = true;
        remove.value.code = code;
        remove.value.path = path;
      },
      success: () => {
        base.value.pagination.page = 1;
        fnBase.search();
      },
    };

    const aa = ref({
      rack: "Floor",
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
        x: 350,
        y: 840,
      },
    });

    fnBase.search();

    return {
      shelf,
      base,
      remove,
      fnShelf,
      fnBase,
      fnRemove,
      fnLayout,
      layout,
      layouts,
      aa,
      drag,
      edit,
      titleZone,
      contentHeight,
      serviceUrl,
      AppLayoutComponent,
      props,
    };
  },
  watch: {
    "props.scale": function (v) {
      this.aa.height = window.screen.height * v;
      this.aa.width = window.screen.width * v;
    },
    // refresh: function (v) {
    //   if (v) {
    //     this.rac_search(() => {
    //       this.configData();
    //       this.$emit("stopRefresh", { value: false });
    //     });
    //   }
    // },
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
    "layout.form.rack": function (v) {
      this.layout.form.edit = true;
    },
  },
};
</script>

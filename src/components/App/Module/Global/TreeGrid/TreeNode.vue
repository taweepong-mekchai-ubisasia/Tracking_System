<template>
  <slot name="title"></slot>
  <tr :class="level ? `bg-gray-${level}00` : ''">
    <th
      :class="`bg-gray-${level}00`"
      class="px-4 py-2 text-left text-lg w-1"
      v-if="currentTree && currentTree.length > 0"
    >
      <button
        @click="toggle(base['deleted_at'])"
        :class="base['deleted_at'] ? 'text-error' : isOpen ? 'text-warning' : 'text-primary'"
        class="btn btn-md btn-link no-underline hover:no-underline p-0 font-extrabold"
      >
        <span v-if="base['deleted_at']"><Icon icon="cuida:x-outline" /></span>
        <span v-else-if="isOpen"><Icon icon="cuida:minus-outline" /></span>
        <span v-else><Icon icon="cuida:plus-outline" /></span>
      </button>
    </th>
    <template v-for="(v, i) in visibleColumns">
      <template v-if="v.status === true">
        <template v-if="isColumnLocked(v)">
          <th
            v-if="
              (v.column.field === 'image' || v.column.field === 'file') &&
              tree[0].showImageColumn === true
            "
            class="w-1"
          >
            <img
              v-if="base.image"
              :src="imagePreview.imageUrl(base)"
              @click="imagePreview.openModal"
              class="w-16 h-16 object-cover cursor-pointer"
            />
          </th>
          <th v-else>{{ base[v.column.field] }}</th> 
        </template>
        <template v-else>
          <td
            v-if="
              (v.column.field == 'image' || v.column.field == 'file') &&
              tree[0].showImageColumn === true
            "
            :class="`bg-gray-${level}00`"
            class="w-fit"
          >
            <img
              v-if="base.image"
              :src="imagePreview.imageUrl(base)"
              @click="imagePreview.openModal"
              class="w-16 h-16 object-cover cursor-pointer"
            />
          </td>
          <td :class="v.column.field == 'process' || v.column.field == 'phase' ? 'text-right' : ''" v-else>
            <span v-if="v.column.field == 'process'">
              <span v-if="!base[v.column.field]" class="text-warning"></span>
              <span
                v-else-if="base[v.column.field] == 'acknowledge'"
                class="text-success"
                >อนุมัติแล้ว</span
              >
              <span
                v-else-if="base[v.column.field] == 'reject'"
                class="text-error"
                >ไม่อนุมัติ</span
              >
              <span
                v-else-if="base[v.column.field] == 'cancel'"
                class="text-gray-500"
                >ยกเลิกแล้ว</span
              >
              <span
                v-else-if="base[v.column.field] == 'pending'"
                class="text-warning"
                >รอดำเนินการ</span
              >
            </span>
            <!-- <span v-else-if="v.column.field == 'description'">
              <div class="tooltip tooltip-bottom" :data-tip="base[v.column.field]">
                {{ base[v.column.field].match(/^.{0,50}/)[0] }}...
              </div>
            </span> -->
            <span v-else-if="v.column.field == 'desired_date' || v.column.field == 'noti_date'">
              <div>
                {{ $moment(base[v.column.field]).format("DD-MM-YYYY") }} 
              </div>
              <div v-if="v.column.field == 'desired_date'">
                time: {{ base['desired_time']  }}
              </div>
            </span>
            <span :class="base['deleted_at'] 
              ? 'opacity-50 line-through decoration-rose-500 italic' 
              : base[v.column.field] == 'Pending'
                ? 'text-warning font-bold italic'
                : base[v.column.field] == 'Ready'
                  ? 'text-blue-500 font-bold italic'
                  : base[v.column.field] == 'Completed'
                    ? 'text-success font-bold italic'
                    : ''
              " v-else>
              {{ base[v.column.field] }} 
            </span>
          </td>
        </template>
      </template>
    </template>

    <th
      class="text-right"
      v-if="tree && tree.length > 0 && tree[0].showActionsColumn === true"
      :class="`bg-gray-${level}00`"
    >
      <!-- {{ tree }} -->

      <span v-if="base['created_by'] == user.code && !base['deleted_at'] && base['phase'] != 'Completed'">
        <label
          class="btn btn-link text-warning no-underline modal-button btn-xs"
          @click="fnBase.edit(`${base['code']}`, `${index}`)"
        >
          <Icon icon="icon-park-solid:edit" class="w-4 h-4 block lg:hidden" />
          <span class="hidden lg:block">Edit</span>
        </label>
        <label
          class="btn btn-link text-error no-underline modal-button btn-xs"
          @click="
            fnBase.remove(
              `${base['code']}`,
              'api/controllers/MYSQL/INTERNAL/TRR/visitor'
            )
          "
        >
          <Icon
            icon="material-symbols:delete"
            class="w-4 h-4 block lg:hidden"
          />
          <span class="hidden lg:block">Cancel</span>
        </label>
      </span>
      <!-- <span class="text-error" v-else-if="base['deleted_at']">
        Cancelled
      </span>
      <span class="text-success" v-else-if="base['phase'] == 'Completed'">
        Completed
      </span> -->
    </th>
  </tr>

  <template v-if="isOpen && base.children.data.rows.length">
    <tr>
      <td :colspan="visibleColumns.length">
        <table class="table-sm w-full" :class="`bg-gray-${level + 1}00 `">
          <tr>
            <th :class="`bg-gray-${level + 1}00 font-extrabold text-primary text-sm`">
              {{ currentTree[0].title }}
            </th>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
        <div class="relative overflow-x-auto w-full max-h-[20vh]">
          <table class="table-sm w-full" :class="`bg-gray-${level + 1}00 `">
            <TreeNode
              v-for="(v, i) in base.children.data.rows"
              :key="i"
              :index="i"
              v-model="base.children.data.rows[i]"
              :tree="currentTree"
              :currentTree="nextTree"
              @fetch-children="fnBase.search"
              @open-modal="imagePreview.openModal"
              :visibleColumns="visibleChildsColumns"
              :columnLock="Object.values(columnLock)"
              :level="level + 1"
            >
              <template #title v-if="i === 0">
                <tr>
                  <th
                    v-if="nextTree && nextTree.length > 0"
                    :class="`bg-gray-${level + 1}00  `"
                  ></th>
                  <template v-for="(v, i) in visibleChildsColumns" :key="i">
                    <template v-if="v.status === true">
                      <td class="font-black" :class="v.column.title == 'สถานะ' ? 'text-right' : ''">
                        {{ v.column.title }}
                      </td>
                    </template>
                  </template>
                  <th
                    v-if="
                      currentTree &&
                      currentTree.length > 0 &&
                      currentTree.showActionsColumn === true
                    "
                  ></th>
                </tr>
              </template>
            </TreeNode>
          </table>
          <teleport to="#app">
            <Suspense>
              <template #default>
                <component
                  :is="tree[0].asyncComponent"
                  v-if="tree[0].asyncComponent"
                  v-model="compo.data"
                  :create-value="compo.search[0].value"
                  @update:success="fnBase.success"
                  ref="baseModal"
                />
              </template>
              <template #fallback>
                <p>Loading component...</p>
              </template>
            </Suspense>
          </teleport>
        </div>
        <table
          class="table-sm w-full"
          :class="`bg-gray-${level + 1}00 `"
          v-if="base.children.pagination.total > 0"
        >
          <tr>
            <th
              :class="`bg-gray-${level + 1}00 `"
              :colspan="visibleChildsColumns.length"
            >
              <AppModuleGlobalPagination
                v-model="base.children.pagination"
                @update:page="fnBase.get"
              />
            </th>
          </tr>
        </table>
      </td>
    </tr>
  </template>
  <slot name="pagination"></slot>
  <tr
    v-if="isOpen && base.children.data.rows.length === 0 && active === true"
    :class="`bg-gray-${level}00 `"
  >
    <td colspan="1000">EMPTYDATA</td>
  </tr>
</template>

<script>
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import {
  defineAsyncComponent,
  shallowRef,
  computed,
  defineComponent,
  ref,
  watch,
  getCurrentInstance,
  onMounted,
  reactive,
} from "vue";

export default defineComponent({
  components: {
    AppModuleGlobalPagination,
  },
  props: {
    tree: {
      type: Array,
      required: true,
    },
    currentTree: {
      type: Array,
      required: true,
    },
    visibleColumns: {
      type: Array,
      default: [],
    },
    columnLock: {
      type: Object,
      default: {},
    },
    modelValue: {
      type: Object,
      required: true,
    },
    level: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  emits: [
    "fetch-children",
    "open-modal",
    "update:modelValue",
    "update:success",
    "base-edit",
    "base-remove",
  ],
  setup(props, { emit }) {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);
    const serviceUrl = computed(() => store.getters.serviceUrl);

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const columnChildsVisibility = reactive(
      Object.fromEntries(
        base.value.children.data.columns.map((col) => [col, true])
      ) || {}
    );

    const visibleChildsColumns = computed(() => {
      return base.value.children.data.columns.filter(
        (column) => columnChildsVisibility[column] !== false
      );
    });

    const fnBase = {
      search: async () => {
        try {
          base.value.children.pagination.page = 1;
          await fnBase.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (base.value.children.pagination.loading) return;
        base.value.children.pagination.loading = true;
        try {
          const queryParams = {
            page: base.value.children.pagination.page,
            row: base.value.children.pagination.row,
            current: base.value.code,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            props.currentTree ? props.currentTree[0].path : ""
          );

          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            base.value.children.data.rows = res.rows;
            base.value.children.pagination.total = res.total;
            base.value.children.pagination.next =
              base.value.children.pagination.page *
                base.value.children.pagination.row <
              base.value.children.pagination.total;
            base.value.children.pagination.back =
              base.value.children.pagination.page > 1;
            fnBase.formatData(base.value.children.data, props.currentTree[0]);
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          active.value = true;
          // console.log(base.value.children)
          base.value.children.pagination.loading = false;
        }
      },
      edit: (code, index) => emit("base-edit", { code: code, index: index }),
      remove: (code, path) => emit("base-remove", { code: code, path: path }),
      formatData(data, tree) {
        try {
          data.rows = data.rows.map((item) => {
            try {
              item.image = JSON.parse(item.image || "[]");
            } catch (e) {
              console.error("Error parsing image field:", e);
              item.image = [];
            }
            return {
              ...item,
              children: {
                pagination: {
                  page: 1,
                  row: 20,
                  next: false,
                  back: false,
                  loading: false,
                  total: 0,
                },
                data: {
                  rows: [],
                  columns: [],
                },
              },
            };
          });

          data.columns = Object.keys(data.rows[0] || []);

          let remove = [
            "id",
            "image",
            "file",
            "imageLink",
            "access",
            "children",
          ];

          let haveImage = data.columns.includes("image");

          data.columns = [
            ...tree.columns,
            ...data.columns.filter(
              (v) => !tree.columns.includes(v) && !remove.includes(v)
            ),
          ].map(
            (v) =>
              (v = {
                column: {
                  field: v.field,
                  title: v.title || v,
                },
                status: tree.columns.includes(v),
                lock: tree.lock.includes(v),
              })
          );

          tree.showImageColumn === true && haveImage
            ? (data.columns = [
                {
                  column: {
                    field: "image",
                    title: "รูปภาพ",
                  },
                  status: true,
                  lock: false,
                },
                ...data.columns,
              ])
            : "";
        } catch (e) {
          console.log("error format data : " + e);
        }
      },
    };

    const isOpen = ref(null);

    const toggle = (cancelled) => {
      if (!cancelled) {
        isOpen.value = !isOpen.value;
        // console.log("fasfsafas");
        if (
          isOpen.value &&
          base.value.children.data.rows.length === 0 &&
          props.currentTree.length > 0
        ) {
          // console.log(props.currentTree[0].objectKey);
          // console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
          if (props.currentTree[0].objectKey) {
            let data = JSON.parse(base.value.item);
            base.value.children.data.rows = data;
            // props.currentTree[0].columns = Object.keys(data[0] || []);
            // props.currentTree[0].lock = []
            fnBase.formatData(base.value.children.data, props.currentTree[0]);
            // data.length
            // console.log(base.value.children.data);
            active.value = true;
          } else {
            fnBase.search();
          }
        }
      }
    };

    const imagePreview = {
      openModal: () => {
        emit("open-modal", base.value);
      },
      imageUrl: (node) => {
        if (node.image && node.image.length > 0) {
          return `${node.imageLink}/employee/${node.code}/${node.image[0].file}`;
        }

        return `${serviceUrl.value}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyImageWhite.jpg&s=20`;
      },
    };

    const isColumnLocked = (obj) => {
      return obj.lock !== false;
    };

    const active = ref(false);
    const nextTree = ref(null);
    onMounted(() => {
      let tree = [...props.currentTree];
      tree.shift();
      nextTree.value = tree;
    });
    if (props.tree[0].component) {
      props.tree[0].asyncComponent = defineAsyncComponent(() =>
        import(`@/components/${props.tree[0].component}.vue`)
      );
    }

    const compo = ref({
      pagination: {
        page: 1,
        row: 20,
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
          object: {},
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
      ],
    });

    return {
      base,
      fnBase,
      isColumnLocked,
      isOpen,
      toggle,
      nextTree,
      active,
      imagePreview,
      visibleChildsColumns,
      compo,
      user,
    };
  },
});
</script>

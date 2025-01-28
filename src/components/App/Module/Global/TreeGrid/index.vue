<template>
  <div class="relative">
    <div class="relative overflow-x-auto w-full max-h-[60vh] min-h-[60vh] my-4">
      <!-- <div
        class="overflow-x-auto w-full my-2"
        :style="{
          maxHeight: contentHeight,
          minHeight: contentHeight,
        }"
      > -->
      <div>
        <table
          class="w-full min-w-max table table-xs table-pin-rows table-pin-cols transition-all"
        >
          <thead class="sticky top-0 bg-gray-100 z-10">
            <tr>
              <th
                v-if="nextTree && nextTree.length > 0"
                class="bg-base-100"
              ></th>
              <template v-for="(v, i) in visibleColumns" :key="i">
                <template v-if="v.status === true">
                  <template v-if="v.lock">
                    <th>
                      {{ v.column.title }}
                    </th>
                  </template>
                  <template v-else>
                      <!-- :class="{
                        'sticky left-10 bg-gray-100 border-b text-left z-20':
                          refFieldsetOption.isColumnLocked(v) && i === 0,
                        'sticky right-0 bg-gray-100 border-b text-left z-20':
                          refFieldsetOption.isColumnLocked(v) &&
                          i === visibleColumns.length - 1,
                      }" -->
                    <td
                      class="border-b py-2 font-black"
                      :class="v.column.title == 'สถานะ' ? 'text-right' : 'text-left'"
                    >
                      {{ v.column.title }}
                    </td>
                  </template>
                </template>
              </template>
              <th v-if="tree[0].showActionsColumn === true" class="text-right">
                <!-- <fieldsetOption v-model="base" ref="fieldsetOption" /> -->
              </th>
            </tr>
          </thead>
          <tbody>
            <TreeNode
              v-for="(v, i) in base.data.rows"
              v-model="base.data.rows[i]"
              :index="i"
              :key="v.id"
              :tree="tree"
              :currentTree="nextTree"
              @fetch-children="null"
              @open-modal="$refs.ShowImageV2.openModal"
              :visibleColumns="visibleColumns"
              :columnLock="columnLock"
              @base-edit="(obj) => $emit('base-edit', obj)"
              @base-remove="(obj) => $emit('base-remove', obj)"
              ref="refTreeNode"
            />
          </tbody>
        </table>
      </div>

      <teleport to="#app">
        <ShowImageV2 ref="ShowImageV2" />
      </teleport>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
// import { useContentHeight } from "@/composables/useContentHeight";
// import draggable from "vuedraggable";
import {
  ref,
  reactive,
  computed,
  onMounted,
  defineComponent,
  watch,
  nextTick,
} from "vue";
import TreeNode from "./TreeNode.vue";
// import fieldsetOption from "./fieldsetOption.vue";
import ShowImageV2 from "../ShowImageV2.vue";

export default defineComponent({
  components: {
    TreeNode,
    // draggable,
    // fieldsetOption,
    ShowImageV2,
  },
  props: {
    refFieldsetOption: {
      type: null,
      required: true,
    },

    tree: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 1,
    },
    rows: {
      type: Number,
      default: 20,
    },
    current: {
      type: String,
      default: "",
    },

    modelValue: {
      type: Object,
      required: true,
    },
  },
  emits: [
    "update:modelValue",
    "update:success",
    "ready",
    "base-edit",
    "base-remove",
  ],
  setup(props, { emit }) {
    const store = useStore();
    configureQuery(store);

    // const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone);

    const user = computed(() => store.getters.user);

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    base.value.data.columns = [];

    const columnVisibility = reactive(
      Object.fromEntries(base.value.data.columns.map((col) => [col, true])) ||
        {}
    );
    const columnLock = reactive(
      Object.fromEntries(base.value.data.columns.map((col) => [col, false])) ||
        {}
    );

    const visibleColumns = computed(() => {
      // console.log(base.value.data.columns);
      return base.value.data.columns.filter(
        (column) => columnVisibility[column] !== false
      );
    });

    const fnBase = {
      search: async () => {
        try {
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
            getTotal: true,
          };
          const path = buildPath(queryParams, props.tree[0].path);
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            base.value.data.rows = res.rows;
            base.value.pagination.total = res.total;
            base.value.pagination.next =
              base.value.pagination.page * base.value.pagination.row <
              base.value.pagination.total;
            base.value.pagination.back = base.value.pagination.page > 1;
            fnBase.formatData(base.value.data, props.tree[0]);
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          let tree = [...props.tree];
          tree.shift();
          if (refTreeNode.value) {
            console.error(
              "EEEEORROSFKM:SDGJMDFMOHGFNOFSEDPL:MFVI REDFGVMLXCN OER<G  OXDFGJ OPSDFIG"
            );
            // console.log(refTreeNode.value);
            refTreeNode.value.forEach(v => (v.isOpen = false));
          }

          nextTree.value = tree;
          base.value.pagination.loading = false;
        }
      },
      // success() {
      //   console.log("SADASDSA");
      //   base.value.pagination.page = 1;
      //   base.value.search[0].value = "";
      //   compo.value.data.form.object = {};
      //   fnBase.search();
      // },
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
          // data.columns = [
          //   ...tree.columns,
          //   ...data.columns.filter(
          //     (v) => !tree.columns.includes(v) && !remove.includes(v)
          //   ),
          // ]
          let uniqueFeilds = new Set();

          tree.columns = tree.columns.filter((item) => {
            if (!uniqueFeilds.has(item.field)) {
              uniqueFeilds.add(item.field);
              return true;
            }
            return false;
          });

          // console.log(filteredArray);

          data.columns = [
            ...tree.columns,
            ...data.columns.filter(
              (v) =>
                !tree.columns.some((c) => c.field === v) &&
                !remove.includes(v.field)
            ),
          ].map(
            (v) =>
              (v = {
                column: {
                  field: v.field || v,
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
          // console.log(base.value.data.columns);
        } catch (e) {
          console.log("error format data : " + e);
        }
      },
    };

    const nextTree = ref(null);
    const refTreeNode = ref(null);

    onMounted(() => {
      nextTick(() => {
        emit("ready", null);
      });
    });

    return {
      base,
      nextTree,
      fnBase,
      columnVisibility,
      columnLock,
      visibleColumns,
      refTreeNode,
      // contentHeight
    };
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: 90%;
  max-height: 90%;
}
</style>

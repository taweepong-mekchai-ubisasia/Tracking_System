<template>
  <teleport to="#app" v-if="hasPermission">
    <Suspense>
      <template #default>
        <component
          :is="asyncComponent"
          v-if="asyncComponent"
          v-model="compo.data"
          @update:success="fnBase.success"
          ref="baseModal"
        />
      </template>
      <template #fallback>
        <p>Loading component...</p>
      </template>
    </Suspense>
  </teleport>

  <div class="form-control mt-4">
    <ul>
      <li>
        <button
          class="flex justify-between items-center w-full input input-xs sm:input-sm md:input-md input-bordered border-base-content transition-all duration-600"
          aria-expanded="expanded.toString()"
          @click="toggleFAQ"
          :class="expanded ? 'rounded-b-none ' : ''"
        >
          <span class="text-left flex-1 text-sm sm:text-md">{{ title }}</span>
          <Icon
            :icon="expanded ? 'twemoji:minus' : 'twemoji:plus'"
            class="h-3 w-3"
          />
        </button>
        <div
          class="transition-max-height duration-500 ease-in-out overflow-hidden"
          :style="{ maxHeight: expanded ? '300px' : '0' }"
        >
          <div class="border border-gray-300">
            <div class="overflow-y-auto max-h-48 w-full overflow-x-hidden">
              <table class="table table-xs">
                <tbody>
                  <!-- {{ base }}
                  {{sortedRows}} -->
                  <tr v-for="(v, i) in sortedRows" class="relative">
                    <!-- <div class="flex-1 py-2 px-3 flex flex-row flex-nowrap justify-between items-center content-center w-full h-full absolute"> -->
                    <div
                      class="cursor-pointer absolute w-full h-full left-0 top-0 transition-all flex content-center items-center z-20 bg-base-300 bg-opacity-70"
                      :style="{
                        transitionDuration: '0.5s',
                        transitionDelay: '0.05s',
                        transform: base.data.rows[i].status
                          ? 'translateX(100% )'
                          : 'translateX(0%)',

                        '-webkit-user-select': 'none',
                        '-ms-user-select': 'none',
                        'user-select': 'none',
                      }"
                      @dblclick="base.data.rows[i].status = true"
                    >
                      <span
                        class="p-2 pl-3 w-[5%] font-extrabold"
                        @click="toggleStatus(v)"
                        >|||</span
                      >
                    </div>
                    <!-- </div> -->
                    <th class="w-0">
                      <span
                        v-if="!base.data.rows[i].process || base.data.rows[i].process == 'pending'"
                        class="btn btn-xs btn-link text-error no-underline hover:no-underline p-0 pl-1"
                        :class="
                          base.data.rows[i].status ? 'opacity-100' : 'opacity-0'
                        "
                        @click="toggleStatus(v)"
                        >✕</span
                      >
                    </th>
                    <td>
                      <!-- <input v-model="base.data.rows[i].status" type="checkbox" />{{base.data.rows[i].status}} -->
                      <span
                        class="label-text text-sm font-medium transition-all p-2"
                        :class="
                          base.data.rows[i].status
                            ? 'text-gray-700'
                            : 'text-gray-500 pl-[5%]'
                        "
                        >{{ v.name }}</span
                      >
                    </td>
                    <td class="text-center">
                      <span
                        v-if="
                          base.data.rows[i].process != 'pending' &&
                          base.data.rows[i].process
                        "
                      >
                        {{ base.data.rows[i].qty }}
                      </span>
                      <input
                        v-else
                        type="number"
                        placeholder="qty"
                        class="input input-bordered border-base-content input-xs"
                        v-model="base.data.rows[i].qty"
                        :disabled="!base.data.rows[i].status"
                        min="0"
                        @input="updateObject"
                      />
                    </td>
                    <td class="text-center">
                      <span
                        v-if="
                          base.data.rows[i].process != 'pending' &&
                          base.data.rows[i].process
                        "
                      >
                        {{ base.data.rows[i].remark }}
                      </span>
                      <input
                        v-else
                        type="text"
                        placeholder="remark"
                        class="input input-bordered border-base-content input-xs"
                        v-model="base.data.rows[i].remark"
                        :disabled="!base.data.rows[i].status"
                        @input="updateObject"
                      />
                    </td>
                    <td class="text-right">
                      {{ v.unit_name }}
                    </td>
                    <td class="text-right">
                      <!-- {{ base.data.rows[i].process }}dasd -->
                      <span v-if="!v.process" class="text-warning"></span>
                      <span
                        v-else-if="v.process == 'acknowledge'"
                        class="text-success"
                        >อนุมัติแล้ว</span
                      >
                      <span v-else-if="v.process == 'reject'" class="text-error"
                        >ไม่อนุมัติ</span
                      >
                      <span v-else-if="v.process == 'cancel'" class="text-gray-500"
                        >ยกเลิกแล้ว</span
                      >
                      <span
                        v-else-if="v.process == 'pending'"
                        class="text-warning"
                        >รอดำเนินการ</span
                      >
                      <!-- <span v-if="base.data.rows[i].process  == 'approve'" class=""> </span>
                      <span v-if="base.data.rows[i].process  == 'approve'" class=""> </span>
                      <span v-if="base.data.rows[i].process  == 'approve'" class=""> </span>
                      <span v-if="base.data.rows[i].process  == 'approve'" class=""> </span> -->
                      <!-- {{
                        base.data.rows[i].process
                          ? base.data.rows[i].process == "approve"
                            ? "อนุมัติ"
                            : base.data.rows[i].process == "reject"
                            ? "ไม่อนุมัติ"
                            : base.data.rows[i].process == "cancel"
                            ? "ยกเลิก"
                            : "กำลังตรวจสอบ"
                          : "กำลังตรวจสอบ"
                      }} -->
                    </td>
                    <!-- <th v-if="base.data.rows[i].status"></th> -->
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- {{ asyncComponent }} -->
            <!-- {{ 'ss' }} -->
            <div v-if="asyncComponent">
              <span
                class="cursor-pointer btn btn-xs sm:btn-sm btn-primary font-bold text-sm w-full rounded-none text-white"
                @click="fnBase.create"
              >
                + Add Item
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  ref,
  computed,
  shallowRef,
  defineAsyncComponent,
  onMounted,
} from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { fetchQuery, buildPath } from "@/composables/useQuery";

export default {
  props: {
    modelValue: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: "Checklist",
    },
    component: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      required: true,
      default: null,
    },
    fields: {
      type: Array,
      required: true,
      default: [],
    },
    // base: {
    //   type: Object,
    //   default: () => ({
    //     data: { rows: [] },
    //     pagination: { page: 1, row: 20, total: 0, loading: false },
    //   }),
    // },
  },
  emits: ["update:modelValue", "update:success"],
  setup(props, { emit }) {
    const store = useStore();
    const expanded = ref(false);
    const startTouchPos = ref({ x: 0 });
    const draggingIndex = ref(null);
    const draggingOffset = ref(0);
    const rowRefs = ref({});

    const arrayBase = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const user = computed(() => store.getters.user);

    const route = useRoute();
    const router = useRouter();

    const hasPermission = computed(() => {
      return (
        user.value &&
        user.value.access 
        // && user.value.access.HR[route.name] === "superadmin"
      );
    });

    const base = ref({
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
          object: {
            title: "",
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
      ],
    });

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
          object: {
            title: "",
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
      ],
    });

    // const sortedRows = computed(() => {
    //   return base.value.data.rows.sort(
    //     (a, b) => (b.status ? 1 : 0) - (a.status ? 1 : 0)
    //   );
    // });
    const sortedRows = computed(() => {
      return (
        base.value?.data?.rows?.sort(
          (a, b) => (b.status ? 1 : 0) - (a.status ? 1 : 0)
        ) || []
      );
    });

    const toggleFAQ = () => {
      // console.log("FAfasasfasffasasffasSFSA");
      expanded.value = !expanded.value;
      if (expanded.value) fnBase.search();
    };

    const updateObject = () => {
      let strue = base.value.data.rows.filter(
        (v) => v.status === true && v.qty > 0
      );

      // สร้าง list ของ field id ที่ต้องการ
      const fieldIds = props.fields.map((field) => field.id);

      // กรอง item ให้เหลือเฉพาะ fields ตามที่กำหนด
      const filteredItems = strue.map((item) => {
        let filteredItem = {};
        fieldIds.forEach((id) => {
          if (item[id] !== undefined) {
            filteredItem[id] = item[id];
          }
          filteredItem["code"] = item["code"];
          filteredItem["status"] = item["status"];
          filteredItem["process"] = item["process"]
            ? item["process"] == "cancel"
              ? "pending"
              : item["process"]
            : "pending";
        });
        // console.log(filteredItem);
        return filteredItem;
      });
      // strue.forEach((v) => {
      //   res.rows.forEach((vv) => {
      //     if (vv.code === v.code) {
      //       vv.qty = v.qty;
      //       vv.status = v.status;
      //     }
      //   });
      // });

      arrayBase.value = filteredItems;
    };
    const toggleStatus = (obj) => {
      // console.log("FASFSA");
      obj.status = !obj.status;

      updateObject();
    };

    const rowBackground = (status) => {
      return status
        ? "bg-green-100 border-l-4 border-green-500"
        : "bg-gray-100";
    };

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
            search: base.value.search,
            getTotal: true,
          };
          const path = buildPath(queryParams, props.url);
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            // arrayBase.value = JSON.parse(JSON.parse(arrayBase.value))
            // console.log(arrayBase.value);
            // console.log( typeof arrayBase.value )
            if (arrayBase.value) {
              arrayBase.value.forEach((v) => {
                res.rows.forEach((vv) => {
                  if (vv.code === v.code) {
                    vv.qty = v.qty;
                    vv.remark = v.remark;
                    vv.status = v.status;
                    vv.process = v.process ? v.process : "pending";
                  }
                });
              });
            }
            // console.log(res.rows);
            base.value.data.rows;
            base.value.data.rows = res.rows;
            base.value.pagination.total = res.total;
            base.value.pagination.next =
              base.value.pagination.page * base.value.pagination.row <
              base.value.pagination.total;
            base.value.pagination.back = base.value.pagination.page > 1;

            // arrayBase.value

            // let strue = base.value.data.rows.filter((v) => v.status === true);
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
        compo.value.data.form.modal = true;
        compo.value.data.form.controll = "create";
        compo.value.data.form.object.name = base.value.q;
      },
      closeItem: (index) => {
        base.value.data.rows.splice(index, 1);
      },
    };

    const asyncComponent = shallowRef(null);
    if (hasPermission.value && props.component) {
      asyncComponent.value = defineAsyncComponent(() =>
        import(`@/components/${props.component}.vue`)
      );
    }

    // const startTouch = (event, index) => {
    //   startTouchPos.value = { x: event.touches[0].clientX };
    //   draggingIndex.value = index;
    // };

    // const moveTouch = (event) => {
    //   const dx = event.touches[0].clientX - startTouchPos.value.x;
    //   draggingOffset.value = dx;
    // };

    // const endTouch = () => {
    //   if (draggingIndex.value !== null) {
    //     const itemRef = rowRefs.value[`row-${draggingIndex.value}`];
    //     if (itemRef) {
    //       itemRef.style.transition = "transform 0.3s ease-out";
    //       if (draggingOffset.value > 50) {
    //         itemRef.style.transform = "translateX(100%)"; // Slide out to the right
    //         setTimeout(() => {
    //           fnBase.closeItem(draggingIndex.value); // Remove item after animation
    //         }, 300);
    //       } else {
    //         itemRef.style.transform = "translateX(0)"; // Reset position
    //       }
    //       draggingOffset.value = 0;
    //     }
    //     draggingIndex.value = null;
    //   }
    // };

    return {
      base,
      expanded,
      asyncComponent,
      hasPermission,
      sortedRows,
      toggleFAQ,
      toggleStatus,
      rowBackground,
      fnBase,
      compo,

      draggingIndex,
      draggingOffset,
      rowRefs,
      updateObject,
    };
  },
};
</script>

<style scoped>
/* Minimalistic styles for responsiveness */
.table-auto th,
.table-auto td {
  padding: 0.5rem;
}

@media (max-width: 640px) {
  .table-auto th,
  .table-auto td {
    padding: 0.25rem;
  }
}

/* Styles for draggable item */
.relative {
  position: relative;
}

.cursor-pointer {
  touch-action: pan-x;
}

.dragging {
  background-color: rgba(224, 224, 224, 0.8); /* Gray background during drag */
}

/* Styles for the status overlay */
.status-overlay {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  transition: all 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  user-select: none;
}
</style>

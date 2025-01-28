<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="detail.data.form.modal" />
    <div class="modal" v-if="detail.data.form.modal">
      <div class="modal-box relative w-11/12 max-w-3xl p-2 lg:p-4 max-h-screen">
        <button
          @click="modal_close()"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.data.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">Rack Data</h3>
        <span class="text-xs text-error">( 1 level = {{base.data.form.object.level_capa}} {{base.data.form.object.type == 'P' ? 'Glass Bottle' : 'Can'}} )</span>
        <div class="divider my-1"></div>
        <div class="pb-2">
        <!-- <div class="pb-2 grid grid-cols-3 gap-3"> -->
          <!-- <button
            class="btn btn-xs bg-info text-white w-full col-span-2"
            :disabled="detail.data.rows.length && detail.data.rows[0].rack_sum == detail.data.rows[0].rack_capacity"
            @click="$refs.baseModal.fnBase.create"
          >
            {{ detail.data.rows.length && detail.data.rows[0].rack_sum == detail.data.rows[0].rack_capacity ? 'Full' : "Add" }}
          </button> -->
          <button
            class="btn btn-xs bg-error text-white w-full"
            @click="$refs.detailModal.fnBase.edit(detail.data.rows)"
          >
            Clear Rack
          </button>
        </div>
        <div class="card-body overflow-auto max-h-[80vh] p-2">
          <div class="flex flex-col-reverse">
            <div
              class="grid items-start w-full p-2 pb-0"
              :class="`grid-cols-1`"
              v-for="l in parseInt(base.data.form.object.levels)"
              :key="l"
            >
              <div class="stats stats-vertical shadow-lg border w-full">
                <div 
                  class="stat p-3 pb-1"
                  :class="detail.data.rows.find(x => x.level == l) ? detail.data.rows.find(x => x.level == l).level_sum == detail.data.rows.find(x => x.level == l).capacity ? 'bg-gray-500' : 'bg-primary' : 'bg-primary'"
                >
                  <div class="stat-title font-bold text-sm relative text-white">
                    <!-- <span class="badge badge-sm badge-error text-white mr-1" v-if="(detail.data.rows.find(x => x.level == l)?.level_sum || 0) == (detail.data.rows.find(x => x.level == l)?.capacity || 1)">เต็ม</span> -->
                    {{ base.data.form.object.rack }}-{{ base.data.form.object.bay }}-{{ l }}-{{ base.data.form.object.type }} 
                    <span class="text-xs">{{ l == 8 ? '( Top Shelf )' : '' }}</span>
                    <!-- :class="base.data.form.object.level_detail[l-1] == base.data.form.object.level_capa ? 'bg-error disabled:bg-error disabled:text-white disabled:border-white' : 'bg-info'" -->
                    <button
                      class="btn btn-xs bg-info text-white w-fit absolute right-0 bottom-0"
                      @click="$refs.baseModal.fnBase.create(l)"
                      v-if="detail.data.rows.find(x => x.level == l) ? detail.data.rows.find(x => x.level == l).level_sum == detail.data.rows.find(x => x.level == l).capacity ? false : true : true"
                    >
                      <!-- {{ base.data.form.object.level_detail[l-1] == base.data.form.object.level_capa ? 'เต็ม' : "Add" }} -->
                      Add
                    </button>
                  </div>
                </div>
                <div>
                  <div class="stat w-full p-1">
                    <div
                      class="overflow-x-auto"
                      :class="`max-h-[${
                        60 / base.data.form.object.levels
                      }vh] min-h-[${60 / base.data.form.object.levels}vh]`"
                    >
                      <table
                        class="table table-xs table-pin-rows table-pin-cols table-zebra"
                      >
                        <tbody>
                          <tr
                            v-for="(v, i) in detail.data.rows.filter(
                              (v2) =>
                                v2.rack_layout == base.data.form.object.code && v2.level == l
                            )"
                            :key="i"
                          >
                            <td>
                              <span class="font-bold">{{ v.item_short_code }}</span>
                              {{
                                ` #${v.batch} = ${v.qty}x${
                                  v.pack_size
                                } = ${
                                  new Intl.NumberFormat("th-TH").format(v.summary)
                                } ${v.uom ? v.uom : ""}`
                              }}
                            </td>
                            <td class="font-semibold">
                              {{ v.shelf_life_sample ? v.shelf_life_sample : "-" }}
                            </td>
                            <td
                              :class="`${
                                parseInt(
                                  v.receive_date && v.shelf_life
                                    ? $moment(v.receive_date)
                                        .add(parseInt(v.shelf_life) + 1, 'days')
                                        .diff($moment(new Date()), 'days')
                                    : '0'
                                ) <= 30
                                  ? 'text-red-500'
                                  : ''
                              }`"
                            >
                              <div class="flex items-center space-x-3">
                                <div>
                                  <div
                                    class="overflow-hidden text-ellipsis whitespace-nowrap"
                                  >
                                    Receive Expire
                                    {{
                                      v.receive_date && v.shelf_life
                                        ? $moment(v.receive_date)
                                            .add(parseInt(v.shelf_life), "days")
                                            .format("DD-MM-YYYY")
                                        : "-"
                                    }}
                                  </div>
                                  <div
                                    class="overflow-hidden text-ellipsis whitespace-nowrap"
                                  >
                                    Life
                                    {{
                                      v.receive_date && v.shelf_life
                                        ? $moment(v.receive_date)
                                            .add(parseInt(v.shelf_life), "days")
                                            .diff($moment(new Date()), "days")
                                        : "0 days"
                                    }}
                                    days
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td
                              :class="`${
                                parseInt(
                                  v.manufacturing_date && v.shelf_life
                                    ? $moment(v.manufacturing_date)
                                        .add(parseInt(v.shelf_life) + 1, 'days')
                                        .diff($moment(new Date()), 'days')
                                    : '0'
                                ) <= 30
                                  ? 'text-red-500'
                                  : ''
                              }`"
                            >
                              <div class="flex items-center space-x-3">
                                <div>
                                  <div
                                    class="overflow-hidden text-ellipsis whitespace-nowrap"
                                  >
                                    MFG Expire
                                    {{
                                      v.manufacturing_date && v.shelf_life
                                        ? $moment(v.manufacturing_date)
                                            .add(parseInt(v.shelf_life), "days")
                                            .format("DD-MM-YYYY")
                                        : "-"
                                    }}
                                  </div>
                                  <div
                                    class="overflow-hidden text-ellipsis whitespace-nowrap"
                                  >
                                    Life
                                    {{
                                      v.manufacturing_date && v.shelf_life
                                        ? $moment(v.manufacturing_date)
                                            .add(
                                              parseInt(v.shelf_life) + 1,
                                              "days"
                                            )
                                            .diff($moment(new Date()), "days")
                                        : "0"
                                    }}
                                    days
                                  </div>
                                </div>
                              </div>
                            </td>
                            <th class="text-right">
                              <button
                                class="btn btn-xs btn-warning text-white"
                                @click="$refs.baseModal.fnBase.edit(v)"
                              >
                                Edit
                              </button>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      class="rounded-xl shadow-lg w-full text-white mt-2 text-sm font-semibold"
                      :class="base.data.form.object.level_detail[l-1] == base.data.form.object.level_capa ? 'bg-gray-300' : 'bg-accent'"
                    >
                      <div>
                        <div class="p-2 w-full">
                          Weight Total :
                          {{
                            new Intl.NumberFormat("th-TH", {
                              minimumFractionDigits: 2,
                            }).format(
                              parseFloat(
                                total[l] ? (total[l] ? total[l] : 0) : 0
                              ).toFixed(2)
                            )
                          }}
                          gram
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <AppModulePagesQARetainModalRackAction
      :wh="props.wh"
      v-model="base.data"
      @update:success="fnDetail.success"
      ref="baseModal"
    />
    <AppModulePagesQARetainModalClearRack
      :wh="props.wh"
      v-model="base.data"
      @update:success="fnDetail.success"
      ref="detailModal"
    />
  </teleport>
</template>

<script>
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import AppModuleGlobalCombobox from "@/components/App/Module/Global/Combobox.vue";

import AppModulePagesQARetainModalRackAction from "@/components/App/Module/Pages/QA/Retain/Modal/RackAction.vue";
import AppModulePagesQARetainModalClearRack from "@/components/App/Module/Pages/QA/Retain/Modal/ClearRack.vue";

import {
  defineAsyncComponent,
  shallowRef,
  computed,
  defineComponent,
  ref,
  watch,
  getCurrentInstance,
} from "vue";

export default defineComponent({
  inheritAttrs: false,
  name: "Rack",
  components: {
    AppModuleGlobalCombobox,
    AppModulePagesQARetainModalRackAction,
    AppModulePagesQARetainModalClearRack
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    createValue: {
      type: String,
      required: "",
    },
    wh: {
      type: String,
      default: "ubp",
    },
  },
  emits: ["update:modelValue", "update:create",  "update:edit", "update:success"],
  setup(props, { emit }) {
    const store = useStore();
    configureQuery(store);

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const detail = ref({
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
            title: "",
          },
          temp: {
            title: "",
          },
          remain: 0
        },
      },
    });

    const rack = ref({
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
            title: "",
          },
          temp: {
            title: "",
          },
        },
      },
    });

    const fnBase = {
      edit: (obj) => {
        haveSaved.value = false;
        base.value.data.form.current = base.value.data.form.object.code;
        base.value.data.form.object = obj;
        detail.value.data.form.modal = true;
        fnDetail.search();
      },
    };

    const total = ref([]);
    const haveSaved = ref(false);

    const fnDetail = {
      search: async () => {
        try {
          detail.value.pagination.page = 1;
          total.value = [];
          await fnDetail.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (detail.value.pagination.loading) return;
        detail.value.pagination.loading = true;
        try {
          const queryParams = {
            page: detail.value.pagination.page,
            row: detail.value.pagination.row,
            rack_layout: base.value.data.form.object.code,
            transref: "I",
            transref_type_null: true,
            getTotal: true,
            debug: true
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/QA/Retain/shelf"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            // base.value.data.form.remain = base.value.data.form.object.max
            res.rows.forEach((v, i) => {
              // base.value.data.form.remain -= v.qty;
              total.value[v.level] 
                ? total.value[v.level] = parseFloat(total.value[v.level]) + parseFloat(v.summary)
                : total.value[v.level] = parseFloat(v.summary)
            });

            detail.value.data.rows = res.rows;
            detail.value.pagination.total = res.total;
            detail.value.pagination.next =
              detail.value.pagination.page * detail.value.pagination.row <
              detail.value.pagination.total;
            detail.value.pagination.back = detail.value.pagination.page > 1;
          } else {
            console.error("Error fetching detail:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          detail.value.pagination.loading = false;
          detail.value.data.form.modal = true;
        }
      },
      success: () => {
        haveSaved.value = true
        detail.value.pagination.page = 1;
        fnDetail.search();
        // emit("update:success", null);
      },
    };

    const modal_close = () => {
      detail.value.data.form.modal = false;
      if (haveSaved.value) emit("update:success", null);
    }

    const baseModal = ref(null)

    return { base, fnBase, detail, fnDetail, rack, baseModal, total, props, modal_close };
  },
});
</script>

<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="detail.data.form.modal" />
    <div class="modal" v-if="detail.data.form.modal">
      <div class="modal-box relative w-11/12 p-2 lg:p-4 max-w-4xl max-h-screen">
        <button
          @click="detail.data.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="detail.data.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-error">Rack Clear {{ detail.data.form.where == 'shelf' ? `${base.form.temp.rack}-${base.form.temp.bay}` : '' }}</h3>
        <div class="divider my-1"></div>
        <div class="card-body pt-0 overflow-auto max-h-[60vh] p-2">
          <div class="flex flex-col-reverse">
            <div class="stats stats-vertical shadow-lg border w-full">
              <div>
                <div class="stat w-full p-1">
                  <table
                    class="table table-xs table-pin-rows table-pin-cols table-zebra"
                    v-if="detail.data.rows.length"
                  >
                    <thead>
                      <th>Select</th>
                      <th>Shelf</th>
                      <th>Detail</th>
                      <th>Shelf Life</th>
                      <th>Receive Expire</th>
                      <th>MFG Expire</th>
                    </thead>
                    <tbody>
                      <tr v-for="(v, i) in detail.data.rows" :key="i">
                        <th>
                          <input
                            type="checkbox"
                            checked="checked"
                            class="checkbox checkbox-xs"
														:value="v"
														v-model="detail.data.form.object.select"
                          />
                        </th>
                        <td class="font-bold">
                          {{ v.rack }}-{{ v.bay }}-{{ v.level }}-{{ v.type }}
                        </td>
                        <td>
                          <span class="font-bold">{{ v.item_short_code }}</span>
                          {{
                            ` #${v.batch} = ${v.qty}x${
                              v.pack_size
                            } = ${new Intl.NumberFormat("th-TH").format(
                              v.summary
                            )} ${v.uom ? v.uom : ""}`
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
                                        .add(parseInt(v.shelf_life) + 1, "days")
                                        .diff($moment(new Date()), "days")
                                    : "0"
                                }}
                                days
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div v-else>
                    <span class="font-semibold text-sm"
                      >ยังไม่มีของหมดอายุ</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button v-if="detail.data.rows.length" :disabled="!detail.data.form.object.select.length" class="btn btn-ghost btn-xs w-full" @click="fnBase.save()">
          Press this button to clear these items.
        </button>
      </div>
    </div>
  </teleport>
</template>

<script>
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import AppModuleGlobalCombobox from "@/components/App/Module/Global/Combobox.vue";
import moment from 'moment'

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
  name: "ClearRack",
  components: {
    AppModuleGlobalCombobox,
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
  emits: [
    "update:modelValue",
    "update:success",
  ],
  created: function () {
    this.moment = moment;
  },
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
            select: [],
          },
        },
      },
    });

    const fnBase = {
      edit: (obj) => {
        if (obj) {
          base.value.form.temp.rack = base.value.form.object.rack;
          base.value.form.temp.bay = base.value.form.object.bay;
      
          obj = obj.filter(x => {
            return parseInt(moment(x.manufacturing_date).add(parseInt(x.shelf_life) + 1,"days").diff(moment(new Date()), "days")) < 0;
          })
          detail.value.data.form.current = 0;
          detail.value.data.rows = obj;
          detail.value.data.form.method = "PUT";
          detail.value.data.form.where = "shelf";
        } else {
          fnBase.search();
        }

        detail.value.data.rows =
          detail.value.data.form.where == "shelf"
            ? detail.value.data.rows.filter(
                (x) =>
                  x.rack == base.value.form.temp.rack &&
                  x.bay == base.value.form.temp.bay
              )
            : detail.value.data.rows;

        detail.value.data.form.modal = true;
      },
      search: async () => {
        try {
          await fnBase.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        try {
          const queryParams = {
            wh: props.wh,
            transref: "I",
            transref_type_null: true,
            getOrder: true,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/QA/Retain/shelf"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            detail.value.data.form.current = 0;
            res.rows = res.rows.filter(x => {
              return parseInt(moment(x.manufacturing_date).add(parseInt(x.shelf_life) + 1,"days").diff(moment(new Date()), "days")) < 0;
            })
            detail.value.data.rows = res.rows;
            detail.value.data.form.method = "PUT";
            detail.value.data.form.where = "layout";
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }

          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally { }
      },
      save: async () => {
        if (detail.value.data.form.loading) return;
        detail.value.data.form.loading = true;
        try {
					detail.value.data.form.object.select.forEach(x => {
						x.transref = "O"
					});
					
          const queryBody = {
            code: detail.value.data.form.current,
            rows: detail.value.data.form.object.select
          };

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/QA/Retain/shelf"
          );
          const method = "PUT";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
          }

          if (detail.value.data.form.current === 0) {
            detail.value.data.form.current = res.rows[0].code;
          }
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          detail.value.data.form.modal = false;
          detail.value.data.form.loading = false;
          emit("update:success", null);
        }
      },
    };

    return { base, detail, fnBase };
  },
});
</script>

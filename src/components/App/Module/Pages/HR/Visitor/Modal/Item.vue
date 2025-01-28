<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.form.modal" />
    <div class="modal z-40" v-if="base.form.modal">
      <div class="modal-box relative w-11/12 max-w-xl p-2 lg:p-4 max-h-screen">
        <button
          @click="base.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">NEW ITEM</h3>
        <div class="divider my-1"></div>
        <div class="p-2 md:p-3 lg:p-4 overflow-auto w-full max-h-[60vh]">
          <div class="form-control" v-if="$route.name != 'HRVisitorManagementItem'">
            <label class="label cursor-pointer">
              <span class="label-text text-xs font-semibold">Item ใหม่</span>
              <input type="checkbox" class="toggle toggle-sm" v-model="toggle" />
              <span class="label-text text-xs font-semibold">Item เดิม เพิ่ม Unit ใหม่</span>
            </label>
          </div>
          <AppModuleGlobalCombobox
            :url="`api/controllers/MYSQL/INTERNAL/HR/visitor/visitor_item`"
            :label="'Item'"
            :selectMode="'single'"
            :image="false"
            v-model="item.data.form.object"
            :imagePath="'Item'"
            :fieldDisplay="'name'"
            :lastDisplay="''"
            :lastFile="''"
            :component="null"
            :objectData="'fully'"
            v-if="$route.name != 'HRVisitorManagementItem' && toggle"
          />
          <div class="form-control">
            <label class="label">
              <span class="label-text text-xs sm:text-sm md:text-md">Name</span>
            </label>
            <input
              type="text"
              placeholder="ระบุชื่อของ Item ..."
              class="input input-xs sm:input-sm md:input-md input-bordered border-base-content"
              v-model="base.form.object.name"
              :disabled="item.data.form.object[0]"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-xs sm:text-sm md:text-md"
                >Description</span
              >
            </label>
            <textarea
              class="textarea textarea-xs md:textarea-sm md:textarea-md textarea-bordered border-base-content h-24"
              placeholder="ระบุรายละเอียดของ Item ..."
              v-model="base.form.object.description"
              :disabled="item.data.form.object[0]"
            ></textarea>
          </div>
          <AppModuleGlobalCombobox
            :url="`api/controllers/MYSQL/INTERNAL/System/Department`"
            :label="'Department'"
            :selectMode="'single'"
            :image="false"
            v-model="base.form.object.department"
            :imagePath="'Department'"
            :fieldDisplay="'title'"
            :lastDisplay="base.form.object.departmentTitle"
            :lastFile="''"
            :component="null"
            :objectData="['code', 'title']"
            :disabled="item.data.form.object[0] ? true : false"
          />
          <AppModuleGlobalCombobox
            :url="`api/controllers/MYSQL/INTERNAL/System/company`"
            :label="'Company'"
            :selectMode="'single'"
            :image="false"
            v-model="base.form.object.company"
            :imagePath="'Company'"
            :fieldDisplay="'title'"
            :lastDisplay="base.form.object.companyTitle"
            :lastFile="''"
            :component="'App/Module/Pages/System/Company/Modal/Company'"
            :objectData="['code', 'title']"
            :disabled="item.data.form.object[0] ? true : false"
          />
          <div class="form-control pt-4">
            <div class="w-full overflow-auto">
              <label class="label cursor-pointer">
                <span class="label-text">Unit</span>
              </label>
              <table
                class="table table-xs table-pin-rows table-pin-cols"
                :class="!removing ? 'table-zebra' : ''"
              >
                <thead>
                  <tr>
                    <th v-if="removing">
                      <input
                        type="checkbox"
                        class="checkbox checkbox-sm"
                        id="my-checkbox"
                        ref="removeingList"
                        @click="
                          () => {
                            $refs.removeingList.indeterminate = false;
                            if ($refs.removeingList.checked) {
                              detail.data.rows = detail.data.rows.map((v) => {
                                v.remove = true;
                                return v;
                              });
                            } else {
                              detail.data.rows = detail.data.rows.map((v) => {
                                v.remove = false;
                                return v;
                              });
                            }
                          }
                        "
                      />
                    </th>
                    <th>#</th>
                    <td>Unit</td>
                    <th class="text-right">
                      <div v-if="!removing">
                        <button
                          class="btn btn-xs btn-primary text-white mr-1"
                          :class="base.form.method != 'POST' ? 'mr-1' : ''"
                          @click="fnDetail.addRow()"
                        >
                          <Icon icon="el:file-new" />
                        </button>
                        <button
                          v-if="base.form.method != 'POST'"
                          class="btn btn-xs btn-error text-white"
                          @click="removing = true"
                        >
                          <Icon icon="icomoon-free:bin" />
                        </button>
                      </div>
                      <div v-else>
                        <label
                          for="modal-remove"
                          class="btn btn-xs btn-error text-white mr-1"
                          @click="
                            fnRemove.allSelected(
                              'api/controllers/MYSQL/INTERNAL/HR/visitor/visitor_item_unit'
                            )
                          "
                        >
                          <Icon icon="ic:outline-check" />
                        </label>
                        <button
                          class="btn btn-xs btn-warning btn-primary text-white mr-1"
                          @click="
                            () => {
                              removing = false;
                              detail.data.rows.map(
                                (v) => (v['remove'] = false)
                              );
                            }
                          "
                        >
                          <Icon icon="ic:twotone-close" />
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="hover"
                    v-for="(v, i) in detail.data.rows"
                    :key="i"
                    :class="`${v.removed ? 'disabled' : ''}`"
                  >
                    <th v-if="removing">
                      <div class="flex items-center space-x-3">
                        <input
                          v-if="!v.removed"
                          type="checkbox"
                          class="checkbox checkbox-sm"
                          :checked="v.remove"
                          @click="
                            () => {
                              v.remove = !v.remove;
                              let no_removed = detail.data.rows.filter(
                                (v) => !v.removed
                              );
                              let remove = detail.data.rows.filter(
                                (v) => v.remove
                              );
                              if (remove.length == 0) {
                                $refs.removeingList.checked = false;
                                $refs.removeingList.indeterminate = false;
                              } else if (remove.length == no_removed.length) {
                                $refs.removeingList.checked = true;
                                $refs.removeingList.indeterminate = false;
                              } else {
                                $refs.removeingList.checked = false;
                                $refs.removeingList.indeterminate = true;
                              }
                            }
                          "
                        />
                      </div>
                    </th>
                    <th>
                      <div class="text-sm" v-if="!v.new">
                        <span
                          class="badge badge-sm"
                          :class="
                            v.edit
                              ? `badge-warning text-white`
                              : 'badge-outline'
                          "
                          >{{ v.code ? v.code : "-" }}</span
                        >
                      </div>
                      <span
                        v-else
                        class="badge badge-xs sm:badge-sm badge-primary text-white"
                      >
                        <span class="badge badge-xs sm:badge-sm badge-primary text-white"
                          >NEW</span
                        >
                      </span>
                    </th>
                    <td>
                      <input
                        class="input input-xs input-bordered border-base-content join-item w-full"
                        placeholder="ระบุหน่วยของ Item ..."
                        v-model="v.unit_name"
                        @keyup="
                          () => {
                            v.new ? '' : (v.edit = true);
                          }
                        "
                        :disabled="removing"
                      />
                    </td>
                    <th class="text-right">
                      <label
                        v-if="!removing && v.id"
                        for="modal-remove"
                        class="btn btn-link no-underline text-error modal-button btn-xs"
                        @click="
                          fnRemove.item(
                            `${v.code}`,
                            'api/controllers/MYSQL/INTERNAL/HR/visitor/visitor_item_unit'
                          )
                        "
                      >
                        Remove
                      </label>
                      <button
                        v-if="!removing && !v.id"
                        class="btn btn-link no-underline text-error modal-button btn-xs"
                        @click="detail.data.rows.splice(i, 1)"
                      >
                        Drop
                      </button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="backdrop-blur sticky top-0 items-center gap-3 px-0 flex">
          <div class="flex-1 form-control mt-4">
            <label
              @click="base.form.modal = false"
              class="btn btn-xs sm:btn-sm md:btn-md"
              >Cancel</label
            >
          </div>
          <div class="flex-1 form-control mt-4" @click="fnBase.save()">
            <button
              class="btn btn-primary text-white btn-xs sm:btn-sm md:btn-md"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <AppModuleGlobalRemove
      v-model="remove"
      @update:success="fnRemove.success"
      ref="removeModal"
    />
  </teleport>
</template>
<script>
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { useRoute, useRouter } from "vue-router";
import {
  defineAsyncComponent,
  shallowRef,
  computed,
  defineComponent,
  ref,
  watch,
  getCurrentInstance,
  onMounted,
  watchHandler,
} from "vue";

import AppModuleGlobalCombobox from "@/components/App/Module/Global/Combobox.vue";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";

export default defineComponent({
  name: "Item",
  components: {
    AppModuleGlobalCombobox,
    AppModuleGlobalRemove,
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
  },
  emits: ["update:modelValue", "update:success"],
  setup(props, { emit }) {
    const { appContext } = getCurrentInstance();
    const moment = appContext.config.globalProperties.$moment;

    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);

    // เข้าถึงข้อมูลของเส้นทางปัจจุบัน
    const route = useRoute();
    const router = useRouter();

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const item = ref({
      data: {
        form: {
          object: [],
        },
      },
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

    const remove = ref({
      current: 0,
      model: false,
      path: "",
      loading: false,
    });

    const removing = ref(false);
    const toggle = ref(false);

    const fnBase = {
      create: () => {
        removing.value = false;
        base.value.form.current = 0;
        base.value.form.object = {
          code: "",
          name: "",
        };
        base.value.form.method = "POST";
        base.value.form.modal = true;

        detail.value.data.rows = [];
      },
      edit: (code, index) => {
        removing.value = false;
        base.value.form.object = { ...base.value.rows[index] };
        base.value.form.current = code;
        base.value.form.method = "PUT";
        base.value.form.modal = true;
        detail.value.data.rows = [];
        fnDetail.search();
      },

      save: async () => {
        if (base.value.form.loading) return;
        base.value.form.loading = true;

        toggle.value ? base.value.form.method = "PUT" : "POST"

        try {
          const queryBody = {
            code: base.value.form.current,
            rows: [
              {
                ...base.value.form.object,
                ...{
                  company:
                    base.value.form.object.company.length > 0
                      ? base.value.form.object.company[0].code
                      : "",
                },
                ...{
                  department:
                    base.value.form.object.department.length > 0
                      ? base.value.form.object.department[0].code
                      : "",
                },
              },
            ],
          };

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/HR/visitor/visitor_item"
          );

          const method = base.value.form.method || "POST";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
          }

          if (base.value.form.current === 0) {
            base.value.form.current = res.rows[0].code;
          }
          detail.value.data.form.method = "POST";

          await fnDetail.save();

          base.value.modal = false;
          detail.value.pagination.page = 1;
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          base.value.form.modal = false;
          base.value.form.loading = false;
          emit("update:success", null);
        }
      },
    };

    const fnDetail = {
      addRow: () => {
        detail.value.data.form.object = {
          code: moment().format("YYYYMMDD") + detail.value.data.rows.length,
          new: true,
        };
        detail.value.data.rows.unshift(detail.value.data.form.object);
      },
      search: async () => {
        try {
          detail.value.pagination.page = 1;
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
            getTotal: true,
            current: base.value.form.current,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/HR/visitor/visitor_item_unit"
          );

          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
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
        }
      },
      create: () => {
        detail.value.data.form.current = 0;
        detail.value.data.form.object = {
          code: "",
        };
        detail.value.data.form.method = "POST";
      },
      edit: (code) => {
        detail.value.data.form.current = code;
        const index = detail.value.data.rows.findIndex(
          (v) => v.code === detail.value.data.form.current
        );
        if (index !== -1) {
          detail.value.data.form.object = { ...detail.value.data.rows[index] };
          detail.value.data.form.method = "PUT";
        } else {
          console.warn(`No detail found with code: ${code}`);
        }
      },
      save: async () => {
        if (detail.value.data.rows.length === 0) return;
        const rows = detail.value.data.rows.map((v) => ({
          ...v,
          item: base.value.form.current,
        }));
        const object = {
          POST: rows.filter((v) => v.new),
          PUT: rows.filter((v) => v.edit),
        };

        try {
          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/HR/visitor/visitor_item_unit"
          );

          for (const [method, data] of Object.entries(object)) {
            if (data.length === 0) continue;

            const res = await fetchQuery({}, method, path, { rows: data });

            if (!res.success) {
              console.error(`Failed to save data with method: ${method}`, res);
            } else {
              console.log(
                `Successfully saved data with method: ${method}`,
                res
              );
            }
          }
        } catch (error) {
          console.error(
            "An error occurred during detail save operation:",
            error
          );
        }
      },
    };

    const fnRemove = {
      allSelected: (path) => {
        const selectedRows = detail.value.data.rows.filter((row) => row.remove);
        remove.value.modal = true;
        remove.value.rows = selectedRows;
        remove.value.path = path;
      },
      item: (code, path) => {
        remove.value.modal = true;
        remove.value.code = code;
        remove.value.path = path;
        remove.value.rows = null;
      },
      success: (res) => {
        if (remove.value.rows) {
          remove.value.rows.forEach((v) => {
            let index = detail.value.data.rows.findIndex(
              (d) => d.code == v.code
            );
            index >= 0 ? (detail.value.data.rows[index]["remove"] = false) : "";
            index >= 0 ? (detail.value.data.rows[index]["removed"] = true) : "";
          });
          remove.value.rows = [];
        } else {
          let index = detail.value.data.rows.findIndex(
            (v) => v.code == remove.value.code
          );
          index >= 0 ? (detail.value.data.rows[index]["remove"] = false) : "";
          index >= 0 ? (detail.value.data.rows[index]["removed"] = true) : "";
        }

        removing.value = false;
        remove.value.modal = false;
      },
    };

    const createWatch = () => {
      watch(
        () => item.value.data.form.object,
        (v) => {
          detail.value.data.rows = [];
          if (v.length > 0 && v[0]) {
            let _data = { ...v[0] };
            if (_data.company) {
              let obj = {
                code: _data.company,
                title: _data.companyTitle,
              };
              _data.company = [obj];
            }
            if (_data.department) {
              let obj = {
                code: _data.department,
                title: _data.departmentTitle,
              };
              _data.department = [obj];
            }
            base.value.form.object = _data;
            base.value.form.current = _data.code;
            fnDetail.search();
          } else {
            base.value.form.object = {};
            base.value.form.current = 0;
          }
        },
        () => props.createValue,
        (newVal) => {
          if (newVal) {
            base.value.form.object.name = newVal;
          }
        }
      );
    };

    onMounted(() => {
      if (props.createValue) {
        base.value.form.object.name = props.createValue;
      }
      createWatch();
    });

    return {
      base,
      detail,
      remove,
      removing,
      fnBase,
      fnDetail,
      fnRemove,
      item,
      toggle
    };
  },
});
</script>

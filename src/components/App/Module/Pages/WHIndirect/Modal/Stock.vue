<template>
  <teleport to="#app">
    <input
      type="checkbox"
      class="modal-toggle"
      v-model="detail.data.form.modal"
    />
    <div class="modal z-40" v-if="detail.data.form.modal">
      <div class="modal-box relative max-w-7xl p-2 lg:p-4 max-h-screen">
        <button
          @click="detail.data.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.form.loading"
        >
          ✕
        </button>
        <h3 class="text-lg font-bold text-primary">
          <span class="text-slate-400">Item Master:</span>
          {{ base.form.object.title }}
        </h3>
        <hr class="mt-5" />
        <div class="card-body overflow-auto" style="max-height: 72vh">
          <div class="grid gap-3 lg:grid-cols-2 grid-cols-1">
            <div class="flex justify-center gap-3 border-2 overflow-hidden">
              <div class="avatar">
                <div class="mask mask-square w-auto h-full">
                  <label
                    for="modal_showImage"
                    class="btn btn-link p-0 h-full"
                    v-if="base.form.object.image.length > 0"
                    @click="
                      base.form.object.image.length > 0
                        ? (imageSrc = `${
                            base.form.object.image[
                              base.form.object.master
                                ? base.form.object.master
                                : 0
                            ].temp
                              ? `${serviceUrl}tmps/image/`
                              : base.form.object.imageLink
                              ? `${base.form.object.imageLink}IndirectItem/${base.form.object.code}/`
                              : `${serviceUrl}tmps/image/`
                          }${
                            base.form.object.image[
                              base.form.object.master
                                ? base.form.object.master
                                : 0
                            ].file
                          }`)
                        : ''
                    "
                  >
                    <img
                      v-if="base.form.object.image.length > 0"
                      :src="`${
                        base.form.object.image[
                          base.form.object.master ? base.form.object.master : 0
                        ].temp
                          ? `${serviceUrl}tmps/image/`
                          : base.form.object.imageLink
                          ? `${base.form.object.imageLink}IndirectItem/${base.form.object.code}/`
                          : `${serviceUrl}tmps/image/`
                      }${
                        base.form.object.image[
                          base.form.object.master ? base.form.object.master : 0
                        ].file
                      }`"
                      alt="Image"
                      style="object-fit: fill"
                    />
                  </label>
                  <img
                    width="auto"
                    height="auto"
                    :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyImage.jpg&s=10`"
                    alt="Image"
                    style="object-fit: contain"
                    v-else
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-rows-2 gap-3 text-left text-sm">
              <div class="border-2 p-3">
                <div class="block">
                  <b>ชื่อ:</b> {{ base.form.object.title }}
                </div>
                <hr class="my-1 border-dashed" />
                <div>
                  <b>รายละเอียด:</b> {{ base.form.object.description || "-" }}
                </div>
                <hr class="my-1 border-dashed" />
                <div
                  class="grid gap-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1"
                >
                  <div class="block">
                    <b>จำนวนทั้งหมด (<span class="text-sm">Receive</span>):</b
                    ><br />
                    {{
                      base.form.object.Import
                        ? new Intl.NumberFormat("en-US").format(
                            base.form.object.Import
                          )
                        : 0
                    }}
                    {{ base.form.object.unit || "-" }}
                  </div>
                  <div class="block">
                    <b>ใช้ไปแล้ว (<span class="text-sm">Issue</span>):</b><br />
                    {{
                      base.form.object.Export
                        ? new Intl.NumberFormat("en-US").format(
                            base.form.object.Export
                          )
                        : 0
                    }}
                    {{ base.form.object.unit || "-" }}
                  </div>
                  <div class="block">
                    <b>คงเหลือในคลัง (<span class="text-sm">Amount</span>):</b
                    ><br />
                    {{
                      base.form.object.amount
                        ? new Intl.NumberFormat("en-US").format(
                            base.form.object.amount
                          )
                        : 0
                    }}
                    {{ base.form.object.unit || "-" }}
                  </div>
                </div>
                <hr class="my-1 border-dashed" />
                <div class="grid gap-3 grid-cols-2">
                  <div class="block">
                    <b>Current Price:</b><br />
                    {{
                      base.form.object.current_price
                        ? new Intl.NumberFormat("th-TH", {
                            minimumFractionDigits: 2,
                          }).format(base.form.object.current_price)
                        : 0
                    }}
                    ฿
                  </div>
                  <div class="block">
                    <b>Last Buy Price:</b><br />
                    {{
                      base.form.object.last_buy_price
                        ? new Intl.NumberFormat("th-TH", {
                            minimumFractionDigits: 2,
                          }).format(base.form.object.last_buy_price)
                        : 0
                    }}
                    ฿
                  </div>
                </div>
              </div>
              <div class="form-control border-2 overflow-x-auto">
                <div class="w-full overflow-auto max-h-[31vh]">
                  <table
                    class="table table-xs table-pin-rows table-pin-cols table-zebra h-full"
                  >
                    <thead>
                      <tr>
                        <th>Transaction</th>
                        <td>สร้างรายการเมื่อ</td>
                        <td>รายละเอียด</td>
                        <td>หมายเหตุ</td>
                        <th class="text-right">
                          <label
                            class="btn btn-primary btn-xs text-white w-16"
                            @click="$refs.baseModal.fnDetail.create"
                          >
                            <Icon icon="subway:add" width="12" height="12" />
                            Add
                          </label>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="hover"
                        v-for="(v, i) in detail.data.rows"
                        :key="i"
                      >
                        <th>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div>
                                {{ detail.data.rows.length - i }}
                              </div>
                              <div class="font-semibold">
                                ( {{ v.status }} )
                              </div>
                            </div>
                          </div>
                        </th>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="italic">
                                {{
                                  $moment(v.created_at).format(
                                    "DD-MM-YYYY HH:mm:ss"
                                  )
                                }}
                              </div>
                              <div class="text-gray-400">
                                {{ v.created_fullname }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div>
                                จำนวน :
                                {{
                                  new Intl.NumberFormat("en-US").format(v.qty)
                                }}
                              </div>
                              <div>
                                ราคาต่อหน่วย :
                                {{
                                  new Intl.NumberFormat("th-TH", {
                                    minimumFractionDigits: 2,
                                  }).format(v.price)
                                }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{{ v.comments || "-" }}</td>
                        <th v-if="base.form.object.status == 'export'">
                          {{ v.issue }}
                        </th>
                        <th v-else class="text-right">
                          <label
                            class="btn btn-ghost btn-xs"
                            @click="
                              fnRemove.item(
                                v,
                                `${v.code}`,
                                'api/controllers/MYSQL/INTERNAL/WHI/transaction'
                              )
                            "
                            v-if="base.permission != 'superuser' ? true : false"
                          >
                            ลบ
                          </label>
                          <h3 class="opacity-50" v-else>
                            superadmin<br />สามารถลบได้
                          </h3>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppModulePagesWHIndirectModalAddStock
      v-model="base"
      @update:success="fnDetail.success"
      ref="baseModal"
    />
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
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModulePagesWHIndirectModalAddStock from "@/components/App/Module/Pages/WHIndirect/Modal/AddStock";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";

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
  name: "ItemMaster",
  components: {
    AppModuleGlobalUpload,
    AppModulePagesWHIndirectModalAddStock,
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
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);

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
        },
      },
    });

    const remove = ref({
      current: 0,
      model: false,
      path: "",
      loading: false,
    });

    const fnBase = {
      create: (code, index) => {
        base.value.form.current = code;
        base.value.form.object = { ...base.value.rows[index] };
        base.value.form.method = "POST";

        detail.value.data.rows = [];
        fnDetail.search();
      },
    };

    const fnDetail = {
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
            status: "import",
            current: base.value.form.current ? base.value.form.current : null,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/WHI/transaction"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });
            detail.value.data.rows = res.rows;
            detail.value.pagination.total = res.total;
            detail.value.pagination.next =
              detail.value.pagination.page * detail.value.pagination.row <
              detail.value.pagination.total;
            detail.value.pagination.back = detail.value.pagination.page > 1;
          } else {
            console.error("Error fetching base:", res.errorMsg);
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
      success() {
        detail.value.pagination.page = 1;
        fnDetail.search();
      },
    };

    const fnRemove = {
      item: (rows, code, path) => {
        remove.value.modal = true;
        remove.value.rows = rows;
        remove.value.code = code;
        remove.value.path = path;
      },
      success: () => {
        fnDetail.search();
      },
    };

    const baseModal = ref(null);

    return { base, fnBase, detail, fnDetail, remove, fnRemove, baseModal };
  },
});
</script>

<template>
  <teleport to="#app">
    <input
      type="checkbox"
      class="modal-toggle"
      v-model="detail.data.form.modal"
    />
    <div class="modal" v-if="detail.data.form.modal">
      <div class="modal-box relative max-w-5xl p-2 lg:p-4 max-h-screen">
        <button
          @click="detail.data.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="detail.pagination.loading"
        >
          ✕
        </button>
        <div class="flex justify-center items-center gap-3">
          <h3 class="text-lg font-bold text-secondary">Item :</h3>
          <AppModuleGlobalSearch
            :class="'join-item input input-sm input-bordered border-gray-300 w-60'"
            @search="
              (q) => {
                detail.search[0].value = q;
                fnDetail.search();
              }
            "
          />
        </div>
        <div class="divider my-1"></div>
        <div
          v-if="detail.pagination.loading"
          class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
        >
          <AppModuleGlobalLoadingText
            :type="'text'"
            :class="`p-4 py-12 text-3xl text-center`"
          />
        </div>
        <div class="overflow-x-auto max-h-[61vh] my-5">
          <table class="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th class="text-center">Select</th>
                <td>รูปประกอบ</td>
                <td>Item Master</td>
                <td class="text-right">จำนวนคงเหลือ</td>
                <td class="text-right">หน่วย</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(v, i) in detail.data.rows"
                :class="
                  v.code == detail.data.form.object.item_code
                    ? 'bg-primary text-white'
                    : ''
                "
              >
                <th
                  class="text-center"
                  :class="
                    v.code == detail.data.form.object.item_code
                      ? 'bg-primary text-white'
                      : ''
                  "
                >
                  <input
                    type="radio"
                    name="radio-1"
                    class="radio radio-sm"
                    :value="v.code"
                    v-model="detail.data.form.object.item_code"
                    :disabled="
                      base.rows.find((x) => x.item == v.code)
                        ? true
                        : false
                    "
                  />
                </th>
                <td class="flex items-center">
                  <div class="avatar static shadow">
                    <div class="w-12 h-12 bg-white">
                      <label
                        for="modal_showImage"
                        class="btn btn-link p-0 flex justify-center"
                        v-if="v.image.length > 0"
                        @click="
                          v.image.length > 0
                            ? (imageSrc = `${
                                v.image[v.master ? v.master : 0].temp
                                  ? `${serviceUrl}tmps/image/`
                                  : v.imageLink
                                  ? `${v.imageLink}IndirectItem/${v.code}/`
                                  : `${serviceUrl}tmps/image/`
                              }${v.image[v.master ? v.master : 0].file}`)
                            : ''
                        "
                      >
                        <img
                          :src="`${
                            v.image[v.master ? v.master : 0].temp
                              ? `${serviceUrl}tmps/image/`
                              : v.imageLink
                              ? `${v.imageLink}IndirectItem/${v.code}/`
                              : `${serviceUrl}tmps/image/`
                          }${v.image[v.master ? v.master : 0].file}`"
                          alt="Image"
                          style="object-fit: contain"
                        />
                      </label>
                      <img
                        v-else
                        width="auto"
                        height="auto"
                        class="max-h-44 object-cover bg-cover"
                        :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyImage.jpg&s=10`"
                        alt="Image"
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="font-semibold">
                      <div
                        :class="
                          v.code == detail.data.form.object.item_code
                            ? 'bg-primary text-white'
                            : 'text-primary'
                        "
                      >
                        {{ v.dept_title || "-" }}
                      </div>
                      <div class="text-sm">
                        {{ v.title }}
                      </div>
                      <div class="text-slate-400">
                        {{ v.description || "-" }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="text-right">{{ v.amount }}</td>
                <td class="text-right">{{ v.unit }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="backdrop-blur sticky top-0 items-center gap-3">
					<div class="join w-full">
						<button
							class="join-item w-1/2 btn btn-sm disabled:border-gray-300 disabled:text-base-content shadow"
							disabled
						>
							จำนวนที่ต้องการเบิก:
						</button>
						<input
							type="number"
							placeholder="ระบุจำนวนก่อนกด Confirm"
							class="join-item w-1/2 text-center font-semibold input input-sm input-bordered border-gray-300 shadow"
							v-model="detail.data.form.object.qty"
							min="0"
							:disabled="!detail.data.form.object.item_code"
						/>
					</div>
					<div class="form-control mt-2">
						<label
							class="btn btn-sm btn-primary text-white"
							:class="
								!detail.data.form.object.item_code ||
								!detail.data.form.object.qty
									? 'btn-disabled'
									: ''
							"
							@click="
								fnBase.save(
									detail.data.rows.find(
										(x) => x.code == detail.data.form.object.item_code
									)
								)
							"
						>
							Confirm
						</label>
					</div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";

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
  name: "CatalogModal",
  components: {
    AppModuleGlobalUpload,
    AppModuleGlobalSearch,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
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
          code: 0,
          loading: false,
          modal: false,
          object: {
            item_code: "",
            qty: "",
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

    const fnBase = {
      create: async () => {
        await fnDetail.search();

        detail.value.data.form.code = 0;
        detail.value.data.form.current = 0;
        detail.value.data.form.object = {
          code: "",
          title: "",
          item: "",
          ref_code: "",
          amount: "",
          qty: "",
          status: "waiting",
          item_code: "",
        };

        detail.value.data.form.method = "POST";
        detail.value.data.form.modal = true;
      },
      edit: async (row) => {
        await fnDetail.search();

        detail.value.data.form.code = row.code;
        detail.value.data.form.current = row.item;
        let index = detail.value.data.rows.findIndex(
          (v) => v.code == detail.value.data.form.current
        );
        detail.value.data.form.object = Object.assign(
          {},
          detail.value.data.rows[index]
        );
        detail.value.data.form.object.item_code =
          detail.value.data.form.current;
        detail.value.data.form.object.qty = row.qty;

        detail.value.data.form.method = "PUT";
        detail.value.data.form.modal = true;
      },
      save: (row) => {
        detail.value.data.form.object = {
          code: detail.value.data.form.code,
          title: row.title,
          item: row.code,
          qty: detail.value.data.form.object.qty,
          status: 'waiting',
        };

        detail.value.data.form.modal = false;

        emit("update:success", detail.value);
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
            search: detail.value.search,
            owner: base.value.wh,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/WHI/item"
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
            console.error("Error fetching Detail:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          detail.value.pagination.loading = false;
        }
      },
      success() {
        detail.value.pagination.page = 1;
        fnDetail.search();
      },
    };

    return { base, fnBase, detail, fnDetail };
  },
  watch: {
    "detail.data.form.object.qty": function (val) {
      if (val) {
        if (
          val >
          parseInt(
            this.detail.data.rows.find(
              (x) => x.code == this.detail.data.form.object.item_code
            ).amount
          )
        ) {
          this.detail.data.form.object.qty = this.detail.data.rows.find(
            (x) => x.code == this.detail.data.form.object.item_code
          ).amount;
        }

        if (val < 0) {
          this.detail.data.form.object.qty = 1;
        }
      }
    },
  },
});
</script>

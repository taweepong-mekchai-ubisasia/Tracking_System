<template>
  <teleport to="#app">
    <input
      type="checkbox"
      class="modal-toggle"
      v-model="detail.data.form.modal"
    />
    <div class="modal z-40">
      <div class="modal-box relative max-w-2xl p-2 lg:p-4 max-h-screen">
        <button
          @click="detail.data.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="detail.data.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">รายการของที่ต้องซื้อคืนคลังอื่น</h3>
        <div class="divider my-1"></div>

        <div class="overflow-auto max-h-[80vh] p-1">
					<div v-if="!detail.data.form.loading && detail.data.rows.length == 0">
						<AppModuleGlobalEmptyData
							:class="`p-4 py-12 text-3xl text-center`"
						/>
					</div>
					<table class="table table-xs" v-else>
						<thead>
							<tr>
								<th>หัวข้อเอกสาร</th>
								<th>ชื่อ Item</th>
								<th>จำนวน</th>
								<th>หน่วย</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(v, i) in detail.data.rows">
								<td>{{ v.doc_title }}</td>
								<td>{{ v.title }}</td>
								<td>{{ v.qty }}</td>
								<td>{{ v.unit }}</td>
								<td>
									<label
										class="join-item btn btn-xs text-primary hover:text-black"
										@click="$refs.baseModal.fnDetail.edit(v)"
									>
										<span class="underline underline-offset-2">คืนรายการนี้</span>
									</label>
								</td>
							</tr>
						</tbody>
					</table>
        </div>
      </div>
    </div>

    <AppModulePagesWHIndirectModalAddStock
      v-model="base"
      @update:success="fnDetail.success"
      ref="baseModal"
    />
  </teleport>
</template>

<script>
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModulePagesWHIndirectModalAddStock from "@/components/App/Module/Pages/WHIndirect/Modal/AddStock";
import moment from "moment";

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
  name: "Repurchase",
  components: {
    AppModuleGlobalUpload,
		AppModuleGlobalEmptyData,
		AppModulePagesWHIndirectModalAddStock,
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
    from: {
      type: String,
      default: "request",
    },
  },
  emits: ["update:modelValue", "update:success"],
  created: function () {
    this.moment = moment;
  },
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
        row: 20,
        next: false,
        back: false,
        loading: false,
        total: 0,
      },
      data: {
        dept: [],
        rows: [],
        select: [],
        form: {
          loading: false,
          modal: false,
          object: {
            title: "",
          },
        },
      },
    });

    const fnDetail = {
      search: async () => {
        try {
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
						su: base.value.permission != 'superadmin' ? user.value.code : null,
						repurchase: "Y",
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/WHI/request_item"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
						base.value.noti = res.rows.length;
            detail.value.data.dept = res.dept;
            detail.value.data.rows = res.rows;
            detail.value.data.permission = res.permission;
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
			success: () => {
        fnDetail.search();
			}
    };

    return {
      base,
      detail,
      fnDetail,
    };
  },
});
</script>

<template>
  <teleport to="#app">
    <input
      type="checkbox"
      class="modal-toggle"
      v-model="detail.data.form.modal"
    />
    <div class="modal z-50">
      <div class="modal-box relative max-w-md p-2 lg:p-4 max-h-screen">
        <button
          @click="detail.data.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="detail.data.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">
          เพิ่มจำนวน Item
        </h3>
        <div class="divider my-1"></div>

        <div class="card-body overflow-auto max-h-[80vh] p-2 lg:p-4">
          <div class="grid grid-cols-2 gap-3">
            <div class="form-control">
              <label class="label">
                <span class="label-text">จำนวน</span
                ><span class="text-xs text-error">{{ msg.qty }}</span>
              </label>
              <input
                type="number"
                placeholder="Quantity"
                class="input input-xs sm:input-sm input-bordered border-gray-300 shadow"
                :min="
                  detail.data.form.method == 'PUT' ? base.form.object.qty : 1
                "
                v-model="detail.data.form.object.qty"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">ราคา</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                class="input input-xs sm:input-sm input-bordered border-gray-300 shadow"
                min="1"
                v-model="detail.data.form.object.price"
              />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">หมายเหตุ</span>
            </label>
            <textarea
              class="textarea textarea-bordered border-gray-300 w-full h-20 shadow"
              placeholder="Remarks"
              v-model="detail.data.form.object.comments"
            ></textarea>
          </div>
        </div>
        <div
          class="backdrop-blur sticky top-0 items-center lg:gap-4 gap-2 px-0 flex"
        >
          <div class="flex-1 form-control mt-3">
            <button
              @click="detail.data.form.modal = false"
              class="btn btn-xs sm:btn-sm md:btn-md"
              :disabled="detail.data.form.loading"
            >
              <Icon
                icon="hugeicons:cancel-circle-half-dot"
                width="16"
                height="16"
              />
              ปิด
            </button>
          </div>
          <div class="flex-1 form-control mt-3" @click="fnDetail.save()">
            <button
              class="btn btn-primary text-white btn-xs sm:btn-sm md:btn-md"
              :disabled="detail.data.form.loading"
            >
              <Icon
                icon="line-md:circle-to-confirm-circle-transition"
                width="16"
                height="16"
              />
              ยืนยันการบันทึก
            </button>
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
import AppModulePagesWHIndirectModalCatalogItem from "@/components/App/Module/Pages/WHIndirect/Modal/CatalogItem";
import AppModulePagesWHIndirectModalIssue from "@/components/App/Module/Pages/WHIndirect/Modal/Issue";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";
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
  name: "Request",
  components: {
    AppModuleGlobalUpload,
    AppModulePagesWHIndirectModalCatalogItem,
    AppModulePagesWHIndirectModalIssue,
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

    const msg = ref({
      qty: "",
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
    });

    const fnDetail = {
      create: () => {
        msg.value.qty = "";

        detail.value.data.form.current = 0;
        detail.value.data.form.object = {
          code: "",
          qty: "",
          price: "",
          comments: "",
        };
        detail.value.data.form.method = "POST";
        detail.value.data.form.modal = true;
      },
      edit: (row) => {
        detail.value.data.form.current = row.item;
        detail.value.data.form.object.qty = row.qty;

        base.value.form.current = row.code;
        base.value.form.object.title = row.title;

        detail.value.data.form.method = "PUT";
        detail.value.data.form.modal = true;
      },
      save: async () => {
        if (detail.value.data.form.loading) return;

        if (!detail.value.data.form.object.qty) {
          msg.value.qty = "*กรอกข้อมูล*";
          return;
        } else {
          msg.value.qty = "";
        }

        detail.value.data.form.loading = true;
        try {
          const queryBody = {
            code: detail.value.data.form.current,
            rows: [
              {
                ...Object.assign({ ...detail.value.data.form.object }),
                item: base.value.form.current,
                title: base.value.form.object.title,
                status: "import",
                repurchase:
                  detail.value.data.form.method == "PUT"
                    ? detail.value.data.form.current
                    : null,
              },
            ],
          };

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/WHI/transaction"
          );
          const method = "POST";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
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

    return {
      base,
      detail,
      fnDetail,
      msg,
    };
  },
});
</script>

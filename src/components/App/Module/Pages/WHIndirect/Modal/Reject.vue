<template>
  <teleport to="#app">
    <input
      type="checkbox"
      class="modal-toggle"
      v-model="base.form.reject_modal"
    />
    <div class="modal">
      <div class="modal-box relative w-11/12 max-w-sm">
        <button
          @click="base.form.reject_modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 class="text-lg font-bold text-error">REJECT REQUEST</h3>
        <hr class="mt-5" />
        <div class="card-body overflow-auto max-h-[60vh]">
          <h3 class="font-semibold">คุณแน่ใจที่จะ reject รายการนี้?</h3>
          <hr class="border-dashed mt-2" />
          <div class="form-control">
            <label class="label">
              <span class="label-text">เหตุผลการ reject request</span>
            </label>
            <textarea
              class="textarea textarea-bordered h-20 border-gray-300 shadow"
              placeholder="Remarks"
              v-model="base.form.object.reject_reason"
            ></textarea>
          </div>
        </div>
        <hr />
        <div class="backdrop-blur sticky top-0 items-center gap-6 flex">
          <div class="flex-1 form-control mt-6">
            <label
              class="btn btn-danger"
              @click="base.form.reject_modal = false"
            >
              <Icon
                icon="hugeicons:cancel-circle-half-dot"
                width="16"
                height="16"
              />
              ปิด
            </label>
          </div>
          <div class="flex-1 form-control mt-6">
            <button class="btn btn-error text-white" @click="fnBase.save()">
              <Icon
                icon="line-md:circle-to-confirm-circle-transition"
                width="16"
                height="16"
              />
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";

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
  name: "Reject",
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:modelValue", "update:success"],
  setup(props, { emit }) {
    const { appContext } = getCurrentInstance();
    const moment = appContext.config.globalProperties.$moment;

    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const fnBase = {
      edit: (code, index) => {
        base.value.form.current = code;
        base.value.form.object = { ...base.value.rows[index] };
        base.value.form.object.repurchase = "N";
        base.value.form.method = "PUT";
        base.value.form.reject_modal = true;
      },
      save: async () => {
        const queryBody = {
          code: base.value.form.current,
          rows: [
            {
              ...Object.assign({ ...base.value.form.object }),
              status: "reject",
            },
          ],
          special: 1,
        };

        const path = buildPath(
          null,
          "api/controllers/MYSQL/INTERNAL/WHI/request_item"
        );
        const method = base.value.form.method || "POST";
        const res = await fetchQuery({}, method, path, queryBody);

        let result = res.rows[0];
        if (!res.success) {
          console.error(res);
        } else {
          if (res.check) {
            let index = base.value.rows.findIndex(
              (v) => v.code == result.code
            );
            base.value.rows[index] = result;

            const queryBody = {
              mailSubject: "แบบฟอร์มการขอเบิกอุปกรณ์จากคลัง Indirect ของคุณ ได้ถูกปฏิเสธ",
              mailFrom: "it_manage@ubisasia.com",
              mailDesc: "Warehouse Indirect System",
              // mailTo: base.value.form.object.created_mail,
              mailTo : user.value.emailTitle,
              mailCc: user.value.emailTitle,
              template: "email/whindirect/reject",
              row: {
                name: base.value.form.object.created_fullname,
                title: base.value.form.object.doc_title,
                appr: result.operator,
                request: base.value.form.object.request_at,
                rows: [
                  {
                    ...Object.assign({ ...base.value.form.object })
                  }
                ],
              },
            };

            const path = buildPath(
              null,
              "api/controllers/MYSQL/INTERNAL/GLOBAL/mail"
            );
            const method = "POST";
            const res = fetchQuery({}, method, path, queryBody);
          }

          base.value.form.reject_modal = false;
          emit("update:success", null);
        }
      },
    };

    return {
      base,
      fnBase,
    };
  },
});
</script>

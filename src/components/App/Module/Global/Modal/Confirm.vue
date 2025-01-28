<template>
  <Toaster 
    :expand="false"
    position="top-center" 
    richColors
    closeButton
  />
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.form.confirm" />
    <div class="modal">
      <div class="modal-box relative p-0">
        <!-- <button
          @click="base.form.confirm = false"
          class="btn btn-xs sm:btn-sm btn-link absolute right-2 top-2 no-underline hover:no-underline text-base-content"
          :disabled="base.loading"
        >
          ✕
        </button> -->
        <!-- <h3 class="text-lg font-bold text-success">Approve Item</h3> -->
        <!-- <div class="divider mt-1"></div> -->
        <div
          class="card-body overflow-auto max-h-[60vh] grid content-center items-center justify-center mt-0"
        >
          <div class="avatar placeholder place-content-center mb-4">
            <!-- <div class="w-20 rounded-full border-4 border-success"> -->
              <span class="text-9xl text-success">
                <Icon icon="fluent-emoji-high-contrast:thinking-face" />
              </span>
            <!-- </div> -->
          </div>
          <!-- {{ base.form.object }} -->
          <!-- {{ user.fullname }} -->
          <h3 class="text-lg font-bold text-success">
            Are your sure for <span class="underline underline-offset-2 decoration-double">{{ (base.form.object.currentStatus == base.form.object.status) ? 'edit' : base.form.object.status == 'opening' ? 'request' : base.form.object.status }}</span> this item?
          </h3>

          <textarea 
            v-if="base.form.object.status == 'reject' || base.form.object.status == 'cancel'"
            class="textarea textarea-bordered border-base-content" 
            placeholder="ระบุเหตุผลประกอบ..."
            v-model="base.form.object.reason"
          >
          </textarea>
        </div>

        <div class="backdrop-blur sticky top-0 items-center gap-2 p-4 flex">
          <div class="flex-1 form-control">
            <button
              @click="base.form.confirm = false"
              class="btn btn-xs sm:btn-sm md:btn-md"
              :disabled="base.form.loading"
            >
              Cancel
            </button>
          </div>
          <div class="flex-1 form-control">
            <button
              class="btn btn-xs sm:btn-sm md:btn-md btn-success text-white"
              @click="confirm()"
              :disabled="base.form.loading"
            >
              Confirm
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

import { Toaster, toast } from 'vue-sonner'

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
  name: "Confirm",
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

    const confirm = async () => {
			if (base.value.form.loading) return;
			base.value.form.loading = true;
			try {
				const queryBody = {
					code: base.value.form.current,
					rows: [
            {
              ...base.value.form.object,
              // ...{
              //   customer: base.value.form.object.customer.length > 0
              //     ? base.value.form.object.customer[0].code
              //     : "",
              // }
            }
					],
				};

				const path = buildPath(
					null,
					"api/controllers/MYSQL/INTERNAL/QA/Retain/request"
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

        if (base.value.form.object.status == 'opening' && (base.value.form.object.currentStatus != base.value.form.object.status)) {
          const queryBody = {
            mailSubject : 'แบบฟอร์มขออนุมัติเพื่อเบิกของจากคลัง Retain Sample',
            mailFrom : 'it_manage@ubisasia.com',
            mailDesc : 'Warehouse Retain Sample System',
            // mailTo : user.value.emailTitle,
            mailToList : base.value.approver,
            mailCc : user.value.emailTitle,
            template : 'email/whretain/request',
            row : {
              // customer : base.value.form.object.customer[0].title,
              shortcode : base.value.form.object.shortcode,
              lot : base.value.form.object.lotTitle,
              transref : base.value.form.object.transref == 'T' ? 'ทดสอบ (Test)' : 'ต่ออายุ (Extend Shelf Life)',
              detail: base.value.form.object.transref_detail,
              qty: base.value.form.object.qty,
              // packsize: base.value.form.object.packsize,
              fullname : base.value.form.object.created_fullname,
            }
				  };

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/GLOBAL/mail"
          );
          const method = base.value.form.method || "POST";
          const res = await fetchQuery({}, method, path, queryBody);
          
          if (!res.status) {
            console.error(res)
          } else {
            toast.success('บันทึกการทำรายการเรียบร้อย')
          }
        }

        // if (base.value.form.object.status == 'approve' && (base.value.form.object.currentStatus != base.value.form.object.status)) {
        //   const queryBody = {
        //     mailSubject : 'แบบฟอร์มแจ้งเตือนการขอเบิกของจากคลัง Retain Sample',
        //     mailFrom : 'it_manage@ubisasia.com',
        //     mailDesc : 'Warehouse Retain Sample System',
        //     mailTo : base.value.form.object.email,
        //     // mailToList : mail_obj,
        //     mailCc : user.value.emailTitle,
        //     template : 'email/whretain/approve',
        //     row : {
        //       creator : base.value.form.object.created_fullname,
        //       createdAt : base.value.form.object.created_at,
        //       // shortcode : base.value.form.object.shortcode_obj[0].item_short_code,
        //       shortcode : base.value.form.object.shortcode,
        //       lot : base.value.form.object.lotTitle,
        //       qty: base.value.form.object.qty,
        //       status : base.value.form.object.status,
        //       approver : user.value.fullname,
        //     }
				//   };

        //   const path = buildPath(
        //     null,
        //     "api/controllers/MYSQL/INTERNAL/GLOBAL/mail"
        //   );
        //   const method = "POST";
        //   const res = await fetchQuery({}, method, path, queryBody);
          
        //   if (!res.status) {
        //     console.error(res)
        //   } else {
        //     toast.success('บันทึกการทำรายการเรียบร้อย')
        //   }
        // }
			} catch (error) {
				console.error("An error occurred during save operation:", error);
			} finally {
				base.value.form.confirm = false;
				base.value.form.loading = false;
				emit("update:success", null);
			}
    };

    return {
      base,
      confirm,
      user
    };
  },
});
</script>

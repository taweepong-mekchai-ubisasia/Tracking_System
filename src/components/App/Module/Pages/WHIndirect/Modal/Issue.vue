<template>
  <teleport to="#app">
    <input
      type="checkbox"
      class="modal-toggle"
      v-model="detail.data.form.modal"
    />
    <div class="modal">
      <div class="modal-box relative w-11/12 max-w-lg">
        <button
          @click="detail.data.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 class="text-lg font-bold text-secondary">Issue Item</h3>
        <hr class="mt-5" />
        <div class="card-body overflow-auto" style="max-height: 60vh">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Item Master</span>
            </label>
            <input
              type="text"
              placeholder="Item"
              class="input input-bordered border-gray-300 bg-gray-200 text-black shadow"
              v-model="detail.data.form.object.title"
              readonly
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">คงเหลือในคลัง</span>
            </label>
            <input
              type="text"
              placeholder="Amount"
              class="input input-bordered border-gray-300 bg-gray-200 text-black shadow"
              v-model="detail.data.form.object.amount"
              readonly
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">จำนวนที่ขอเบิก</span>
              </label>
              <input
                type="number"
                placeholder="Qty"
                class="input input-bordered border-gray-300 bg-gray-200 text-black shadow"
                v-model="detail.data.form.object.qty"
                readonly
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">จ่ายของไปแล้ว</span>
              </label>
              <input
                type="text"
                placeholder="Issue"
                class="input input-bordered border-gray-300 bg-gray-200 text-black shadow"
                :value="detail.data.form.object.issue || 0"
                readonly
              />
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">จ่ายของเป็นจำนวน</span>
            </label>
            <input
              type="number"
              placeholder="ระบุจำนวนที่ต้องการจ่าย"
              min="0"
              class="input input-bordered border-gray-300 shadow"
              v-model="detail.data.form.object.addqty"
            />
          </div>
        </div>
        <hr />
        <div class="backdrop-blur sticky top-0 items-center gap-6 flex">
          <div class="flex-1 form-control mt-6">
            <label @click="detail.data.form.modal = false" class="btn">
              <Icon
                icon="hugeicons:cancel-circle-half-dot"
                width="16"
                height="16"
              />
              ปิด
            </label>
          </div>
          <div class="flex-1 form-control mt-6">
            <button
              class="btn btn-primary text-white"
              :disabled="detail.data.form.object.addqty > 0 ? false : true"
              @click="fnBase.save()"
            >
              <Icon
                icon="line-md:circle-to-confirm-circle-transition"
                width="16"
                height="16"
              />
              ยืนยันข้อมูล
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
  name: "Issue",
  components: {
    AppModuleGlobalUpload,
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
      title: "",
      descr: "",
      item: "",
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

    const fnBase = {
      edit: async (code, index) => {
				base.value.form.object = base.value.rows[index]
        detail.value.data.rows = base.value.rows.filter((x) => (x.code = code));
        detail.value.data.form.current = code;
        detail.value.data.form.object = Object.assign(
          {},
          detail.value.data.rows[index]
        );

        detail.value.data.form.object.addqty = 0;
        detail.value.data.form.method = "PUT";

        detail.value.data.form.modal = true;
      },
      save: async () => {
        try {
          const queryBody = {
            code: detail.value.data.form.current,
            rows: [
              {
                ...Object.assign({ ...detail.value.data.form.object }),
                doc: base.value.form.object.doc,
                qty: detail.value.data.form.object.addqty,
                price: detail.value.data.form.object.current_price_code,
                status: "export",
                comments: base.value.form.object.description,
                repurchase: null,
              },
            ],
          };

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/WHI/transaction"
          );
          const method = base.value.form.method || "POST";
          const res = await fetchQuery({}, method, path, queryBody);

          let result = res.rows[0];
          if (!res.success) {
            console.error(res);
          } else {
            if (
              parseInt(result.amount) <= parseInt(result.min)
            ) {
              const queryBody = {
                mailSubject:
                  "[Alert] Item ในคลัง Indirect มีจำนวนคงเหลือที่ น้อยกว่า/เท่ากับ จำนวนขั้นต่ำที่ตั้งเอาไว้แล้ว",
                mailFrom: "it_manage@ubisasia.com",
                // mailDesc : `ขณะนี้ item: ${this.detail.form.title} code: ${this.detail.form.item} มีจำนวนคงเหลือน้อยกว่า/เท่ากับ จำนวนขั้นต่ำที่กำหนดไว้แล้ว จึงเรียนมาเพื่อพิจารณา`,
                mailDesc: "Warehouse Indirect System",
                mailTo: user.value.groupmailTitle,
                // mailTo: user.value.emailTitle,
                mailCc: user.value.emailTitle,
                template: "email/whindirect/issue",
                row: {
                  name: detail.value.data.form.object.title,
                  code: detail.value.data.form.object.item,
                  amount: detail.value.data.form.object.amount,
                  issue: detail.value.data.form.object.addqty,
                  min: detail.value.data.form.object.min,
                  unit: detail.value.data.form.object.unit,
                },
              };

              const path = buildPath(
                null,
                "api/controllers/MYSQL/INTERNAL/GLOBAL/mail"
              );
              const method = "POST";
              const res = fetchQuery({}, method, path, queryBody);
            }
          }
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
					detail.value.data.form.modal = false;
          emit("update:success", null);
        }
      },
    };

    const baseModal = ref(null);

    return {
      base,
      fnBase,
      detail,
      baseModal,
      msg,
    };
  },
  watch: {
    "detail.data.form.object.addqty": function (v) {
      let issue = this.detail.data.form.object.issue
        ? this.detail.data.form.object.issue
        : 0;
      let issuemore = this.detail.data.form.object.qty - issue;
      if (this.detail.data.form.object.addqty > issuemore) {
        return (this.detail.data.form.object.addqty = issuemore);
      } else if (
        this.detail.data.form.object.addqty >
        this.detail.data.form.object.amount
      ) {
        return (this.detail.data.form.object.addqty =
          this.detail.data.form.object.amount);
      }
    },
  },
});
</script>

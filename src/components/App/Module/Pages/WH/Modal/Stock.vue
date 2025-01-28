<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.form.modal_stock" />
    <div class="modal" v-if="base.form.modal_stock">
      <div
        class="modal-box relative p-4 max-h-screen max-w-md"
      >
        <!-- <button
          class="join-item btn btn-xs w-fit absolute left-4 top-4"
          @click="exportExcel()"
        >
          <Icon icon="file-icons:microsoft-excel" />
          Export
        </button>  -->
        <button
          @click="base.form.modal_stock = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">{{ base.form.object.ItemCode }}</h3>
        <div class="divider my-1"></div>

        <div class="card-body overflow-auto max-h-[70vh] p-3">
          <div class="form-control">
            <div class="overflow-x-auto max-h-[60vh]">
              <table class="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <td>IN STOCK</td>
                    <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(base.form.object.InStock) }} kg.</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{{ base.company == 'UBP' ? 'P' : 'A' }}CU - Customer</th>
                    <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(base.form.object.CUOnHand) }} kg.</td>
                  </tr>
                  <tr>
                    <th>{{ base.company == 'UBP' ? 'P' : 'A' }}FC - FAC</th>
                    <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(base.form.object.FCOnHand) }} kg.</td>
                  </tr>
                  <tr>
                    <th>{{ base.company == 'UBP' ? 'P' : 'A' }}FC2 - FAC2</th>
                    <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(base.form.object.FC2OnHand) }} kg.</td>
                  </tr>
                  <tr>
                    <th>{{ base.company == 'UBP' ? 'P' : 'A' }}HS - Hold Store</th>
                    <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(base.form.object.HSOnHand) }} kg.</td>
                  </tr>
                  <tr>
                    <th>{{ base.company == 'UBP' ? 'P' : 'A' }}LB - Lab</th>
                    <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(base.form.object.LBOnHand) }} kg.</td>
                  </tr>
                  <tr>
                    <th>{{ base.company == 'UBP' ? 'P' : 'A' }}PD – Production</th>
                    <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(base.form.object.PDOnHand) }} kg.</td>
                  </tr>
                  <tr>
                    <th>{{ base.company == 'UBP' ? 'P' : 'A' }}QC - QC</th>
                    <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(base.form.object.QCOnHand) }} kg.</td>
                  </tr>
                  <tr>
                    <th>{{ base.company == 'UBP' ? 'P' : 'A' }}RE - Retain</th>
                    <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(base.form.object.REOnHand) }} kg.</td>
                  </tr>
                  <tr>
                    <th>{{ base.company == 'UBP' ? 'P' : 'A' }}RT - R&T</th>
                    <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(base.form.object.RTOnHand) }} kg.</td>
                  </tr>
                  <tr>
                    <th>{{ base.company == 'UBP' ? 'P' : 'A' }}WS - Waste</th>
                    <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(base.form.object.WSOnHand) }} kg.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
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
  inheritAttrs: false,
  name: "Stock",
  components: {},
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
    const serviceUrl = computed(() => store.getters.serviceUrl);

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const fnBase = {
      edit: (code, index) => {
        base.value.form.object = { ...base.value.rows[index] };
        base.value.form.current = code;
        base.value.form.method = "PUT";

        base.value.form.modal_stock = true;
      },
    };

    // const exportExcel = () => {
    //   return window.open(`${serviceUrl.value}api/controllers/SAP/Excel/${base.value.company}/wh?for=inven_status_detail&total=1&instock=${base.value.form.object.InStock}&code=${
    //     base.value.form.current}${detail.value.search[0].value ? `&dateFrom=${detail.value.search[0].value}` : ''}${detail.value.search[1].value ? `&dateTo=${
    //   detail.value.search[1].value}` : ''}`);
    // }

    return { base, fnBase };
  },
});
</script>

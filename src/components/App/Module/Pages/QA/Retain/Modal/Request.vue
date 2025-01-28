<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.form.modal" />
    <div class="modal" v-if="base.form.modal">
      <div
        class="modal-box relative w-11/12 max-w-4xl p-2 lg:p-4 max-h-screen"
      >
        <button
          @click="base.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">Request Detail</h3>
        <div class="divider my-1"></div>
        <div class="card-body overflow-auto max-h-[82vh] p-2 lg:p-4">
          <!-- {{ base.form.object }} -->
          <div class="grid grid-cols-3 gap-4">
            <!-- <div class="form-control">
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md">
                  Customer
                </span>
              </label>
              <input
                type="text"
                placeholder="Customer"
                class="input input-xs sm:input-sm md:input-md input-bordered border-base-content disabled:border-base-content"
                v-model="base.form.object.customer"
                :disabled="base.form.method == 'PUT'"
                list="browsers" name="myBrowser"
              />
              <datalist id="browsers">
              </datalist>
            </div> -->
            <!-- <div 
              class="form-control"
              v-if="base.form.method == 'POST'"
            >
              <AppModuleGlobalCombobox
                :url="`api/controllers/MYSQL/INTERNAL/QA/Retain/customer`"
                :label="'Customer'"
                :selectMode="'single'"
                :image="false"
                :fieldDisplay="'title'"
                :lastDisplay="base.form.object.customerTitle"
                :lastFile="''"
                :objectData="['code','title']"
                :component="'App/Module/Pages/QA/Retain/Modal/Customer'"
                v-model="base.form.object.customer"
              />
            </div>
            <div class="form-control" v-else>
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md">Customer</span>
              </label>
              <input
                type="text"
                placeholder="Customer"
                class="input input-bordered border-base-content input-disabled disabled:border-base-content"
                required=""
                v-model="base.form.object.customerTitle"
                disabled
              />
            </div> -->
            <div 
              class="form-control"
              v-if="base.form.method == 'POST'"
            >
              <AppModuleGlobalCombobox
                :url="`api/controllers/MYSQL/INTERNAL/QA/Retain/shelf`"
                :label="'Lot No.'"
                :selectMode="'single'"
                :image="false"
                :fieldDisplay="'batch'"
                :lastDisplay="base.form.object.lotTitle"
                :lastFile="''"
                :objectData="['code','batch','item_short_code','item_code']"
                :component="null"
                :param="[
                  {
                    wh: base.wh,
                    groupBy: 'batch',
                    transref: I,
                    transref_type_null: true
                  }
                ]"
                v-model="base.form.object.lot"
              />
            </div>
            <div class="form-control" v-else>
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md">Lot No.</span>
              </label>
              <input
                type="text"
                placeholder="Lot No."
                class="input input-bordered border-base-content input-disabled disabled:border-base-content"
                required=""
                v-model="base.form.object.lotTitle"
                disabled
              />
            </div>
            <!-- <div class="form-control" v-if="base.form.method == 'POST' && base.form.object.customer.length">
              <AppModuleGlobalCombobox
                :url="`api/controllers/MYSQL/INTERNAL/QA/Retain/shelf`"
                :label="'Short Code'"
                :selectMode="'single'"
                :image="false"
                :fieldDisplay="'item_short_code'"
                :lastDisplay="base.form.object.shortcode"
                :lastFile="''"
                :objectData="['code','item_short_code', 'item_code', 'pack_size', 'qty']"
                :param="[
                  {
                    wh: base.wh,
                    customer: base.form.object.customer[0].code,
                    groupBy: 'item_short_code',
                    transref: I,
                    transref_type_null: true
                  }
                ]"
                :component="null"
                v-model="base.form.object.shortcode_obj"
              />
            </div> -->
            <!-- <div class="form-control" v-else> -->
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md">
                  Short Code
                </span>
              </label>
              <input
                type="text"
                placeholder="- เลือก Lot No. ก่อน-"
                class="input input-xs sm:input-sm md:input-md input-bordered border-base-content disabled:border-base-content"
                v-model="base.form.object.shortcode"
                :readonly="base.form.method == 'POST'"
                :disabled="base.form.method == 'PUT'"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md">
                  Item Code
                </span>
              </label>
              <input
                type="text"
                placeholder="- เลือก Lot No. ก่อน -"
                class="input input-xs sm:input-sm md:input-md input-bordered border-base-content disabled:border-base-content"
                v-model="base.form.object.itemcode"
                :readonly="base.form.method == 'POST'"
                :disabled="base.form.method == 'PUT'"
              />
            </div>
            <!-- <div class="form-control" v-if="base.form.method == 'POST'">
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md">
                  Lot Number
                </span>
              </label>
              <select class="select select-bordered border-base-content" v-model="base.form.object.lot">
                <option value="" selected disabled>เลือก Short Code ก่อน</option>
                <option v-for="(v, i) in batchList" :value="v.batch">{{ v.batch }}</option>
              </select>
            </div>
            <div class="form-control" v-else>
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md">
                  Lot Number
                </span>
              </label>
              <input
                type="text"
                placeholder="Lot"
                class="input input-xs sm:input-sm md:input-md input-bordered disabled:border-base-content"
                v-model="base.form.object.lot"
                disabled
              />
            </div> -->
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-xs sm:text-sm md:text-md">
                Quantitys
              </span>
            </label>
            <div class="join">
              <input
                type="number"
                :placeholder="base.form.object.packsize 
                  ? `ระบุจำนวนเบิก ${base.form.object.max_qty 
                    ? `( maximum: ${base.form.object.max_qty} )` 
                    : ''}`
                  : '- เลือก Pack Size ก่อน -' "
                class="join-item input input-xs sm:input-sm w-full input-bordered border-base-content disabled:border-base-content"
                min=1
                :max="base.form.object.max_qty"
                v-model="base.form.object.qty"
                :readonly="base.form.object.currentStatus == 'approve' || base.form.object.done || !base.form.object.packsize"
              />
              <button class="join-item btn btn-xs sm:btn-sm  disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                x
              </button>
              <select 
                class="join-item select select-xs sm:select-sm w-full select-bordered border-base-content disabled:border-base-content"
                v-model="base.form.object.packsize"
                :readonly="!base.form.object.done"
                :disabled="base.form.object.done"
                v-if="base.form.method == 'POST'"
              >
                <option value="" selected disabled>- เลือก Lot No. ก่อน -</option>
                <option v-for="(v, i) in packsizeList" :value="v.pack_size">{{ v.pack_size }}</option>
              </select>
              <input
                type="text"
                placeholder="Pack Size"
                class="join-item input input-xs sm:input-sm w-full input-bordered border-base-content disabled:border-base-content"
                v-model="base.form.object.packsize"
                readonly
                v-else
              />
              <button class="join-item btn btn-xs sm:btn-sm disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                =
              </button>
              <input
                type="text"
                placeholder="Summary"
                class="join-item input input-xs sm:input-sm w-full input-bordered border-base-content disabled:border-base-content"
                v-model="base.form.object.summary"
                readonly
              />
              <button class="join-item btn btn-xs sm:btn-sm disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                {{ base.form.object.unit || '...' }}
              </button>
            </div>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-xs sm:text-sm md:text-md">
                วัตถุประสงค์ในการเบิก
              </span>
            </label>
            <div class="join join-vertical">
              <select 
                class="join-item select select-sm select-bordered border-base-content disabled:border-base-content text-xs" 
                v-model="base.form.object.transref"
                :disabled="base.form.method == 'PUT'"
              >
                <option disabled selected value="">-เลือก ?-</option>
                <option value="T">ทดสอบ - Test</option>
                <option value="Ex">ต่ออายุ - Extend Shelf Life</option>
              </select>
              <textarea 
                class="join-item textarea textarea-bordered border-base-content disabled:border-base-content" 
                rows="3"
                placeholder="วัตถุประสงค์ในการเบิก"
                v-model="base.form.object.transref_detail"
                :readonly="base.form.object.currentStatus == 'approve' || base.form.object.done"
                :disabled="(base.form.object.transref ? false : true)"
              ></textarea>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md">
                  ผู้ทำรายการ
                </span>
              </label>
              <input
                type="text"
                placeholder="ผู้ทำรายการ"
                class="input input-xs sm:input-sm md:input-md input-bordered disabled:border-base-content text-black"
                v-model="base.form.object.created_fullname"
                disabled
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md">
                  แผนก
                </span>
              </label>
              <input
                type="text"
                placeholder="แผนก"
                class="input input-xs sm:input-sm md:input-md input-bordered disabled:border-base-content text-black"
                v-model="base.form.object.dept"
                disabled
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md">
                  สถานะ
                </span>
              </label>
              <select 
                class="select select-xs sm:select-sm md:select-md select-bordered border-base-content w-full disabled:border-base-content" 
                v-model="base.form.object.status"
                :disabled="base.form.object.done"
              >
                <option v-if="base.form.object.currentStatus != 'approve'" value="opening" disabled selected>Opening</option>
                <option v-if="base.form.method == 'PUT' && base.form.object.currentStatus != 'opening'" value="approve">Approve</option>
                <option v-if="base.form.method == 'PUT' && base.form.object.currentStatus != 'opening' && base.form.object.currentStatus != 'approve'" value="reject">Reject</option>
                <option v-if="base.form.method == 'PUT' && base.form.object.currentStatus != 'approve'" value="cancel">Cancel</option>
                <option v-if="base.form.method == 'PUT' && (base.form.object.currentStatus == 'approve' || base.form.object.currentStatus == 'close')" value="close">Close</option>
              </select>
            </div>
          </div>
          <div v-if="(base.form.object.currentStatus == 'approve' && base.form.object.status == 'close') || (base.form.object.currentStatus == 'reject' || base.form.object.currentStatus == 'cancel')">
            <div class="form-control" v-if="base.form.object.status == 'close'">
              <label class="label">
                <span class="label-text text-xs sm:text-sm md:text-md">
                  เหลือ <span class="font-bold text-primary">{{ base.form.object.shortcode }}</span> คืนเข้า Rack
                </span>
              </label>
              <div class="join">
                <input
                  type="number"
                  :placeholder="`ระบุจำนวน ${base.form.object.max_qty ? `( maximum: ${base.form.object.max_qty} )` : '' }`"
                  class="join-item input input-xs sm:input-sm  w-full input-bordered border-base-content disabled:border-base-content"
                  min=0
                  :max="base.form.object.qty"
                  v-model="base.form.object.add_qty"
                />
                <button class="join-item btn btn-xs sm:btn-sm  disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                  x
                </button>
                <input
                  type="number"
                  :placeholder="`ระบุปริมาณ ${base.form.object.max_packsize ? `( maximum: ${base.form.object.max_packsize} )` : '' }`"
                  class="join-item input input-xs sm:input-sm  w-full input-bordered border-base-content disabled:border-base-content"
                  v-model="base.form.object.add_packsize"
                  min=0
                  :max="base.form.object.packsize"
                />
                <button class="join-item btn btn-xs sm:btn-sm  disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                  =
                </button>
                <input
                  type="text"
                  placeholder="Summary"
                  class="join-item input input-xs sm:input-sm  w-full input-bordered border-base-content disabled:border-base-content"
                  v-model="base.form.object.add_summary"
                  readonly
                />
                <button class="join-item btn btn-xs sm:btn-sm  disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                  {{ base.form.object.unit || '...' }}
                </button>
              </div>
            </div>
            <div class="text-left" v-if="base.form.object.currentStatus == 'reject' || base.form.object.currentStatus == 'cancel'">
              เหตุผลในการ <span class="font-bold" :class="base.form.object.currentStatus == 'reject' ? 'text-error' : 'text-gray-500'">{{ base.form.object.currentStatus.toUpperCase() }}</span><span> : {{ base.form.object.reason }}</span>
            </div>
          </div>
        </div>
        <div v-if="!base.form.object.done" class="divider my-1"></div>
        <div v-if="!base.form.object.done" class="backdrop-blur sticky top-0 items-center gap-4 xs:px-0 sm:px-0 px-4 flex">
          <div class="flex-1 form-control mt-1">
            <button
              @click="base.form.modal = false"
              class="btn btn-xs sm:btn-sm md:btn-md"
              :disabled="base.form.loading"
            >
            <Icon icon="line-md:close-circle" width=20 height=20 /> ปิด
            </button>
          </div>
          <div class="flex-1 form-control mt-1">
            <button
              class="btn btn-primary text-white btn-xs sm:btn-sm md:btn-md"
              :disabled="base.form.loading"
              @click="fnBase.confirm()"
            >
            <Icon icon="line-md:confirm-circle" width=20 height=20 />ยืนยัน
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
import AppModuleGlobalCombobox from "@/components/App/Module/Global/Combobox.vue";

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
    AppModuleGlobalCombobox
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
  emits: ["update:modelValue", "update:success", "update:confirm"],
  setup(props, { emit }) {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    // const batchList = ref([]);
    const packsizeList = ref([]);

    const fnBase = {
      get: async () => {
        try {
          const queryParams = {
            batch: base.value.form.object.lotTitle,
            wh: base.value.wh,
            groupBy: 'pack_size',
            transref: 'I',
            transref_type_null: true,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/QA/Retain/shelf"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally { }
      },
      create: () => {
        base.value.form.current = 0;
        base.value.form.object = {
          lot: [],
          // title: "",
          shortcode: "",
          itemcode: "",
          packsize: "",
          transref: "",
          currentStatus: "",
          status: "opening",
          // customer: [],
          created_by: user.value.code,
          created_fullname: user.value.fullname,
          dept: user.value.depTitle,
          // shortcode_obj: [],
          wh: base.value.wh,
          done: false
        };
        base.value.form.method = "POST";
        base.value.form.modal = true;
        // batchList.value = []
      },
      edit: (code, index) => {
        base.value.form.object = { ...base.value.rows[index] };
        base.value.form.current = code;
        base.value.form.method = "PUT";
        // base.value.form.object.shortcode_obj = Array.isArray(base.value.form.object.shortcode_obj) ? base.value.form.object.shortcode_obj : JSON.parse(base.value.form.object.shortcode_obj);
        base.value.form.object.lot = JSON.parse(base.value.form.object.lot);
        base.value.form.object.currentStatus = base.value.form.object.status;
        if (base.value.form.object.currentStatus == 'approve') {
          base.value.form.object.add_qty = '';
          base.value.form.object.add_packsize = '';
          base.value.form.object.add_summary = '';

          base.value.form.object.max_qty = base.value.form.object.qty;
          base.value.form.object.max_packsize = base.value.form.object.packsize;
        }
        base.value.form.object.done = base.value.form.object.done > 0 ? true : false;

        base.value.form.modal = true;
      },
      confirm() {
        emit("update:confirm", null);
      }
    };

    return { base, fnBase, packsizeList };
  },
  watch: {
    // "base.form.object.shortcode_obj": async function (val) {
    //   if (this.base.form.method == 'POST') {
    //     if (val && val.length) {
    //       this.base.form.object.itemcode = val[0].item_code;
    //       let res = await this.fnBase.get();
          
    //       res.rows.forEach(x => {
    //         this.batchList.push(x);
    //       })
    //     } else {
    //       this.base.form.object.itemcode = '';
    //       this.batchList = [];
    //       this.base.form.object.lot = '';
    //       this.base.form.object.packsize = '';
    //       this.base.form.object.unit = '';
    //     }
    //   }
    // },
    "base.form.object.lot": async function (val) {
      if (this.base.form.method == 'POST') {
        console.log(val)
        if (val && val.length) {
          this.base.form.object.lotTitle = val[0].batch;
          this.base.form.object.shortcode = val[0].item_short_code;
          this.base.form.object.itemcode = val[0].item_code;
          this.base.form.object.unit = 'gram';
  
          let res = await this.fnBase.get();
  
          res.rows.forEach(x => {
            this.packsizeList.push(x);
          })
        } else {
          this.packsizeList = [];
          this.base.form.object.lotTitle = '';
          this.base.form.object.shortcode = '';
          this.base.form.object.itemcode = '';
          this.base.form.object.unit = '';
        }

        // let index = this.batchList.findIndex(
        //   (v) => v.batch == val
        // );

        // if (val) {
        //   this.base.form.object.packsize = this.batchList[index].pack_size;
        //   this.base.form.object.max_qty = this.batchList[index].sum_qty;
        //   this.base.form.object.unit = 'gram';
        // } else {
        //   this.base.form.object.packsize = '';
        //   this.base.form.object.max_qty = '';
        //   this.base.form.object.unit = '';
        // }
      }
    },
    "base.form.object.packsize": async function (val) {
      if (this.base.form.method == 'POST') {
        if (val) {
          let index = this.packsizeList.findIndex(
            (v) => v.pack_size == val
          );
          this.base.form.object.max_qty = this.packsizeList[index].sum_qty;
        }
      }
    },
    "base.form.object.qty": async function (val) {
      if (val > this.base.form.object.max_qty) this.base.form.object.qty = this.base.form.object.max_qty;
      this.base.form.object.summary = val*this.base.form.object.packsize;
    },
    "base.form.object.add_qty": async function (val) {
      if (val > this.base.form.object.qty) this.base.form.object.add_qty = this.base.form.object.qty;
      this.base.form.object.add_summary = val*this.base.form.object.add_packsize;
    },
    "base.form.object.add_packsize": async function (val) {
      if (val > this.base.form.object.packsize) this.base.form.object.add_packsize = this.base.form.object.packsize;
      this.base.form.object.add_summary = this.base.form.object.add_qty*val;
    }
  }
});
</script>

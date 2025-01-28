<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.data.form.modal" />
    <div class="modal" v-if="base.data.form.modal">
      <div class="modal-box relative w-11/12 max-w-2xl p-3 max-h-screen">
        <div class="navbar relative top-0 left-0 bg-transparent z-10">
          <div class="flex-1 px-4">
            <h2 class="card-title font-bold">ACTION ON SHELF</h2>
          </div>
          <button
            @click="base.data.form.modal = false"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            :disabled="layout.form.loading"
          >
            ✕
          </button>
        </div>
        <div class="divider my-1"></div>
        <div
          class="card-body py-0 max-h-[70vh] overflow-auto"
          v-if="!tab"
        >
          <!-- <div class="card-body bg-primary" v-if="!layout.form.temp.shelfs.length"> -->
          <div class="card-body bg-primary">
            <h2 class="card-title text-white">
              Shelf Details :
              {{ `${layout.form.temp.rack}-${layout.form.temp.bay}-${layout.form.temp.level}-${layout.form.temp.type}` }}
            </h2>
          </div>
          <div class="card-body bg-base-200" v-if="base.data.form.current">
            <div class="flex w-full gap-4">
              <div class="flex-1 w-auto">
                <div class="form-control">
                  <label class="label cursor-pointer">
                    <h2 class="card-title">เลือกการจัดการ</h2>
                  </label>
                  <select
                    class="select select-xs sm:select-sm md:select-md select-bordered border-base-content w-full"
                    v-model="checkbox"
                  >
                    <option disabled selected value="false">เลือกรายการ</option>
                    <option value="O">DISPOSE ( ทำลาย/ทิ้งสินค้าหมดอายุใน Shelf )</option>
                    <option value="M">MOVE ( ย้ายสินค้าจาก Shelf นี้ไปยัง Shelf อื่นๆ )</option>
                    <option value="E" v-if="!base.data.form.object.ref">EDIT ( แก้ไขรายการ Shelf )</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="flex w-full gap-4" v-if="checkbox == 'M'">
              <div class="flex-1 w-auto">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">RACK - BAY</span>
                  </label>
                  <select
                    class="select select-bordered border-base-content w-full"
                    v-model="base.data.form.object.rack_data"
                  >
                    <option disabled selected value="">...</option>
                    <option :value="v" v-for="(v, i) in rack.data.rows.filter(x => x.level != x.max)">
                      {{ v.rack }}-{{ v.bay }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="flex-1 w-auto">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">LEVEL</span>
                  </label>
                  <select
                    v-if="base.data.form.object.rack_data"
                    class="select select-xs sm:select-sm md:select-md select-bordered border-base-content w-full"
                    v-model="base.data.form.object.level"
                  >
                    <option disabled selected value="">...</option>
                    <option
                      :value="v"
                      v-for="v in parseInt(base.data.form.object.rack_data.levels)"
                      :key="v"
                      :disabled="base.data.form.object.rack_data.level_detail[v-1] == base.data.form.object.rack_data.level_capa"
                    >
                      {{ v }}
                    </option>
                  </select>
                  <select
                    v-else
                    class="select select-bordered border-base-content w-full select-disabled"
                    disabled
                  >
                    <option disabled selected value="">...</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <!-- {{ base.data.form.object }} -->
          <!-- {{ base.data.form.remain }} -->
          <div v-if="checkbox || !base.data.form.current">
            <!-- <div class="grid grid-cols-2 w-full gap-4"> -->
              <div class="flex-1 w-auto">
                <div 
                  class="form-control"
                >
                <!-- v-if="base.data.form.method == 'POST'" -->
                  <AppModuleGlobalCombobox
                    :url="`api/controllers/MYSQL/INTERNAL/QA/Retain/customer`"
                    :label="'Customer'"
                    :selectMode="'multi'"
                    :image="false"
                    :fieldDisplay="'title'"
                    :imagePath="'Customer'"
                    :lastFile="''"
                    :component="'App/Module/Pages/QA/Retain/Modal/Customer'"
                    :objectData="['code','title']"
                    v-model="base.data.form.object.customer"
                  />
                </div>
                <!-- <div class="form-control" v-else>
                  <label class="label">
                    <span class="label-text text-xs sm:text-sm md:text-md">Customer</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Customer"
                    class="input input-bordered border-base-content input-disabled text-black"
                    required=""
                    v-model="base.data.form.object.customerTitle"
                    readonly
                  />
                </div> -->
              </div>
              <div class="flex-1 w-auto">
                <div 
                  class="form-control"
                  v-if="base.data.form.method == 'POST'"
                >
                  <AppModuleGlobalCombobox
                    :url="`api/controllers/MYSQL/INTERNAL/WH/shelfshort`"
                    :label="'Short Code'"
                    :selectMode="'single'"
                    :image="false"
                    :fieldDisplay="'short_code'"
                    :lastDisplay="base.data.form.object.item_short_code"
                    :lastFile="''"
                    :objectData="['code','short_code']"
                    :param="[
                      {
                        wh: base.data.form.object.wh,
                        action: 'groupby-code',
                        forRetain: true,
                      }
                    ]"
                    v-model="base.data.form.object.item_short_code_obj"
                  />
                  <!-- :component="'App/Module/Pages/WH/Modal/Shortcode'" -->
                </div>
                <div class="form-control" v-else>
                  <label class="label">
                    <span class="label-text text-xs sm:text-sm md:text-md">Short Code</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Short code"
                    class="input input-bordered border-base-content input-disabled text-black"
                    required=""
                    v-model="base.data.form.object.item_short_code"
                    readonly
                  />
                </div>
              </div>
            <!-- </div> -->
            <div class="grid grid-cols-2 w-full gap-4">
              <div class="flex-1 w-auto">
                <div class="form-control">
                  <label class="label"
                    ><span class="label-text text-xs sm:text-sm md:text-md">Item Description</span>
                  </label>
                  <select
                    v-if="base.data.form.method == 'POST'"
                    class="select select-xs sm:select-sm md:select-md select-bordered border-base-content w-full"
                    v-model="base.data.form.object.item_code"
                  >
                    <option disabled selected value="">เลือกรายการ</option>
                    <option v-for="(v, i) in item.data.rows" :value="v.item_code">
                      {{ v.item_name }}
                    </option>
                  </select>
                  <input
                    v-else
                    type="text"
                    placeholder="Item Code"
                    class="input input-xs sm:input-sm md:input-md input-bordered border-base-content input-disabled text-black"
                    required=""
                    v-model="base.data.form.object.item_code"
                    readonly
                  />
                </div>
              </div>
              <div class="flex-1 w-auto">
                <div class="form-control">
                  <label class="label"
                    ><span class="label-text text-xs sm:text-sm md:text-md">Item Code</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Item Code"
                    class="input input-xs sm:input-sm md:input-md input-bordered border-base-content input-disabled text-black"
                    required=""
                    v-model="base.data.form.object.item_code"
                    readonly
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 w-full gap-4">
              <div class="flex-1 w-auto">
                <div class="form-control">
                  <label class="label"
                    ><span class="label-text text-xs sm:text-sm md:text-md">Lot Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Lot Number"
                    class="input input-xs sm:input-sm md:input-md border-base-content"
                    :class="base.data.form.method != 'POST' && checkbox != 'E' ? 'input-disabled text-black' : ''"
                    required=""
                    v-model="base.data.form.object.batch"
                    :readonly="base.data.form.method != 'POST' && checkbox != 'E'"
                  />
                </div>
              </div>
              <div class="flex-1 w-auto">
                <div class="form-control">
                  <label class="label"
                    ><span class="label-text text-xs sm:text-sm md:text-md">Shelf Life</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Shelf life"
                    class="input input-xs sm:input-sm md:input-md input-bordered border-base-content input-disabled text-black"
                    required=""
                    v-model="base.data.form.object.shelf_life"
                    readonly
                  />
                </div>
              </div>
              <div class="flex-1 w-auto">
                <div class="form-control">
                  <label class="label"
                    ><span class="label-text text-xs sm:text-sm md:text-md">Shelf Life + 90 วัน</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Shelf life"
                    class="input input-xs sm:input-sm md:input-md input-bordered border-base-content input-disabled text-black"
                    required=""
                    v-model="base.data.form.object.shelf_life_sample"
                    readonly
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 w-full gap-4">
              <div class="flex-1 w-auto">
                <div class="form-control">
                  <label class="label"
                    ><span class="label-text text-xs sm:text-sm md:text-md">Receive Date</span>
                  </label>
                  <input
                    type="date"
                    placeholder="title"
                    class="input input-xs md:input-md input-bordered border-base-content"
                    :class="base.data.form.method == 'PUT' && checkbox != 'E' ? 'input-disabled text-black' : ''"
                    required=""
                    v-model="base.data.form.object.receive_date"
                    :readonly="base.data.form.method == 'PUT' && checkbox != 'E'"
                    :data-date="
                      $moment(base.data.form.object.receive_date).format('DD-MM-YYYY')
                    "
                  />
                </div>
              </div>
              <div class="flex-1 w-auto">
                <div class="form-control">
                  <label class="label"
                    ><span class="label-text text-xs sm:text-sm md:text-md">Manufacture Date</span>
                  </label>
                  <input
                    type="date"
                    placeholder="title"
                    class="input input-xs md:input-md input-bordered border-base-content"
                    :class="base.data.form.method == 'PUT' && checkbox != 'E' ? 'input-disabled text-black' : ''"
                    required=""
                    v-model="base.data.form.object.manufacturing_date"
                    :readonly="base.data.form.method  == 'PUT' && checkbox != 'E'"
                    :data-date="
                      $moment(base.data.form.object.manufacturing_date).format('DD-MM-YYYY')
                    "
                  />
                </div>
              </div>
            </div>
            <!-- {{base.data.form.remain}} -->
            <!-- <div class="flex-1 w-auto" v-if="base.data.form.object.wh == 'uba' && layout.form.temp.layoutAdd.length"> -->
            <!-- <div class="flex-1 w-auto" v-if="base.data.form.object.wh == 'uba'">
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-xs sm:text-sm md:text-md">Quantity <span class="text-xs text-error font-semibold">( type of packaging: Can )</span></span>
                </label>
                <div class="join">
                  <input
                    type="number"
                    placeholder="Qty"
                    class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content w-full"
                    :class="base.data.form.method == 'PUT' && !checkbox ? 'input-disabled text-black' : ''"
                    required=""
                    min="1"
                    :max="base.data.form.remain"
                    v-model="base.data.form.object.qty.can"
                    :readonly="base.data.form.method == 'PUT' && !checkbox"
                  />
                  <button class="join-item btn btn-xs sm:btn-sm md:btn-md disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                    x
                  </button>
                  <input
                    type="number"
                    placeholder="Pack Size"
                    class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content w-full" 
                    :class="base.data.form.method  == 'PUT' && checkbox != 'E' ? 'input-disabled text-black' : ''"
                    required=""
                    min="1"
                    v-model="base.data.form.object.pack_size.can"
                    :readonly="base.data.form.method  == 'PUT' && checkbox != 'E'"
                  />
                  <button class="join-item btn btn-xs sm:btn-sm md:btn-md disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                    =
                  </button>
                  <input
                    type="number"
                    placeholder="Summary"
                    class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content input-disabled text-black w-full"
                    required=""
                    min="1"
                    :value="base.data.form.object.qty.can*base.data.form.object.pack_size.can"
                    readonly
                  />
                  <button class="join-item btn btn-xs sm:btn-sm md:btn-md disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                    {{ base.data.form.object.uom || '...' }}
                  </button>
                </div>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-xs sm:text-sm md:text-md">Quantity <span class="text-xs text-error font-semibold">( type of packaging: Glass Bottle )</span></span>
                </label>
                <div class="join">
                  <input
                    type="number"
                    placeholder="Qty"
                    class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content w-full"
                    :class="base.data.form.method == 'PUT' && !checkbox ? 'input-disabled text-black' : ''"
                    required=""
                    min="1"
                    :max="base.data.form.remain"
                    v-model="base.data.form.object.qty.bottle"
                    :readonly="base.data.form.method == 'PUT' && !checkbox"
                  />
                  <button class="join-item btn btn-xs sm:btn-sm md:btn-md disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                    x
                  </button>
                  <input
                    type="number"
                    placeholder="Pack Size"
                    class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content w-full" 
                    :class="base.data.form.method  == 'PUT' && checkbox != 'E' ? 'input-disabled text-black' : ''"
                    required=""
                    min="1"
                    v-model="base.data.form.object.pack_size.bottle"
                    :readonly="base.data.form.method  == 'PUT' && checkbox != 'E'"
                  />
                  <button class="join-item btn btn-xs sm:btn-sm md:btn-md disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                    =
                  </button>
                  <input
                    type="number"
                    placeholder="Summary"
                    class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content input-disabled text-black w-full"
                    required=""
                    min="1"
                    :value="base.data.form.object.qty.bottle*base.data.form.object.pack_size.bottle"
                    readonly
                  />
                  <button class="join-item btn btn-xs sm:btn-sm md:btn-md disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                    {{ base.data.form.object.uom || '...' }}
                  </button>
                </div>
              </div>
            </div> -->
            <!-- <div class="flex-1 w-auto" v-else> -->
            <div class="flex-1 w-auto">
              <div class="form-control" v-if="base.data.form.object.type == 'G' || base.data.form.object.type == 'C'">
                <label class="label">
                  <span class="label-text text-xs sm:text-sm md:text-md">Quantity <span class="text-xs text-error font-semibold">( type of packaging: Can )</span></span>
                </label>
                <div class="join">
                  <input
                    type="number"
                    placeholder="Qty"
                    class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content w-full"
                    :class="base.data.form.method == 'PUT' && !checkbox ? 'input-disabled text-black' : ''"
                    required=""
                    min="1"
                    :max="base.data.form.remain"
                    v-model="base.data.form.object.qty"
                    :readonly="base.data.form.method == 'PUT' && !checkbox"
                  />
                  <button class="join-item btn btn-xs sm:btn-sm md:btn-md disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                    x
                  </button>
                  <input
                    type="number"
                    placeholder="Pack Size"
                    class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content w-full" 
                    :class="base.data.form.method  == 'PUT' && checkbox != 'E' ? 'input-disabled text-black' : ''"
                    required=""
                    min="1"
                    v-model="base.data.form.object.pack_size"
                    :readonly="base.data.form.method  == 'PUT' && checkbox != 'E'"
                  />
                  <button class="join-item btn btn-xs sm:btn-sm md:btn-md disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                    =
                  </button>
                  <input
                    type="number"
                    placeholder="Summary"
                    class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content input-disabled text-black w-full"
                    required=""
                    min="1"
                    v-model="base.data.form.object.summary"
                    readonly
                  />
                  <button class="join-item btn btn-xs sm:btn-sm md:btn-md disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                    {{ base.data.form.object.uom || '...' }}
                  </button>
                </div>
              </div>
              <div class="form-control" v-if="base.data.form.object.type == 'P'">
                <label class="label">
                  <span class="label-text text-xs sm:text-sm md:text-md">Quantity <span class="text-xs text-error font-semibold">( type of packaging: Glass Bottle )</span></span>
                </label>
                <div class="join">
                  <input
                    type="number"
                    placeholder="Qty"
                    class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content w-full"
                    :class="base.data.form.method == 'PUT' && !checkbox ? 'input-disabled text-black' : ''"
                    required=""
                    min="1"
                    :max="base.data.form.remain"
                    v-model="base.data.form.object.qty"
                    :readonly="base.data.form.method == 'PUT' && !checkbox"
                  />
                  <button class="join-item btn btn-xs sm:btn-sm md:btn-md disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                    x
                  </button>
                  <input
                    type="number"
                    placeholder="Pack Size"
                    class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content w-full" 
                    :class="base.data.form.method  == 'PUT' && checkbox != 'E' ? 'input-disabled text-black' : ''"
                    required=""
                    min="1"
                    v-model="base.data.form.object.pack_size"
                    :readonly="base.data.form.method  == 'PUT' && checkbox != 'E'"
                  />
                  <button class="join-item btn btn-xs sm:btn-sm md:btn-md disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                    =
                  </button>
                  <input
                    type="number"
                    placeholder="Summary"
                    class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content input-disabled text-black w-full"
                    required=""
                    min="1"
                    v-model="base.data.form.object.summary"
                    readonly
                  />
                  <button class="join-item btn btn-xs sm:btn-sm md:btn-md disabled:border-base-content disabled:bg-base-200 font-extrabold" disabled>
                    {{ base.data.form.object.uom || '...' }}
                  </button>
                </div>
              </div>
            </div>
            <div class="flex w-full gap-4" v-if="base.data.form.method  != 'POST'">
              <div class="flex-1 w-auto">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-xs sm:text-sm md:text-md">Previous comments</span>
                  </label>
                  <textarea
                    class="textarea textarea-xs sm:textarea-sm md:textarea-md textarea-bordered h-24 border-base-content textarea-disabled text-black"
                    v-model="base.data.form.object.oldcomments"
                    placeholder="Comments"
                    readonly
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="flex w-full gap-4" v-if="checkbox || base.data.form.method == 'POST'">
              <div class="flex-1 w-auto">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-xs sm:text-sm md:text-md">Comments</span>
                  </label>
                  <textarea
                    class="textarea textarea-xs sm:textarea-sm md:textarea-md textarea-bordered h-24 border-base-content"
                    v-model="base.data.form.object.comments"
                    placeholder="Comments"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div
          class="card-body p-0 max-h-[70vh] overflow-auto"
          v-else
        >
          <div class="stats stats-vertical shadow-lg border w-full">
            <div>
              <div class="stat w-full p-1">
                <table class="table table-xs">
                  <thead>
                    <tr>
                      <th>Rack</th>
                      <th>Bay</th>
                      <th>Levels</th>
                      <th>เก็บของเดือน</th>
                      <th>เก็บของปี</th>
                      <th>เก็บได้อีก</th>
                      <th>บรรจุใน Rack นี้</th>
                      <th>ยืนยัน</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="v in layout.form.temp.layoutAdd" :class="!v.selected ? 'line-through decoration-rose-500' : ''">
                      <td>{{ v.rack }}</td>
                      <td>{{ v.bay }}</td>
                      <td>{{ v.addOnLevel }}</td>
                      <td>{{ v.month || '-' }}</td>
                      <td>{{ v.year || '-' }}</td>
                      <td>{{ v.max-v.level || v.max }}</td>
                      <td>{{ v.use }}</td>
                      <td>
                        <input type="checkbox" class="toggle toggle-xs" v-model="v.selected" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> -->
        <div class="divider my-1"></div>
        <!-- <div class="form-control" v-if="!layout.form.temp.shelfs.length"> -->
        <div class="form-control">
          <button class="btn btn-xs sm:btn-sm md:btn-md btn-primary text-white" :disabled="!checkbox && base.data.form.method == 'PUT'"  @click="fnBase.save()">Save</button>
        </div>
        <!-- <div class="form-control" v-if="layout.form.temp.shelfs.length && !tab">
          <button 
            class="btn btn-xs sm:btn-sm md:btn-md" 
            @click="confirmMethod()"
          >
            Next >>
          </button>
        </div>
        <div class="flex gap-3" v-if="tab">
          <div class="form-control w-full">
            <button class="btn btn-xs sm:btn-sm md:btn-md" @click="tab = 0"><< Back</button>
          </div>
          <div class="form-control w-full">
            <button class="btn btn-xs sm:btn-sm md:btn-md btn-primary text-white" @click="fnBase.save('fromLayout')">Save</button>
          </div>
        </div> -->
      </div>
    </div>
  </teleport>
</template>

<script>
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
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
import moment from "moment";
import { formItemProps } from "ant-design-vue/es/form";

export default defineComponent({
  inheritAttrs: false,
  name: "Rack",
  components: {
    AppModuleGlobalSelectSearch,
    AppModuleGlobalCombobox,
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
    wh: {
      type: String,
      default: "ubp",
    },
  },
  emits: ["update:modelValue", "update:success"],
  setup(props, { emit }) {
    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);
    const serviceUrl = computed(() => store.getters.serviceUrl);

    const layout = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const base = ref({
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
          method: "",
          object: {
            title: "",
          },
          temp: {
            title: "",
          },
        },
      },
    });

    const rack = ref({
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
            name: "",
            number: "",
            size: "",
            description: "",
            category_id: "0",
            store_id: "0",
            recommend: "",
            room: "",
            imageLink: "",
            image: [],
          }
        },
      }
    });

    const item = ref({
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
            name: "",
            number: "",
            size: "",
            description: "",
            category_id: "0",
            store_id: "0",
            recommend: "",
            room: "",
            imageLink: "",
            image: [],
          }
        },
      }
    })

    const checkbox = ref(false);
    const tab = ref(0);

    const fnBase = {
      create: (index) => {
        layout.value.form.temp.rack = layout.value.form.object.rack;
        layout.value.form.temp.bay = layout.value.form.object.bay;
        layout.value.form.temp.level = index;
        layout.value.form.temp.type = layout.value.form.object.type;
        // layout.value.form.temp.shelfs = obj.length > 1 ? obj : [];
        // layout.value.form.temp.layoutAdd = obj.length > 1 ? obj : [];

        base.value.data.form.object = {};

        // if (obj.length) {
        //   base.value.data.form.object = {
        //     customer: [],
        //     customerTitle: '',
        //     transref: 'I',
        //     type: props.wh == 'ubp' ? 'C' : '',
        //     item_code: '',
        //     receive_date: moment(new Date()).format("YYYY-MM-DD"),
        //     manufacturing_date: moment(new Date()).format("YYYY-MM-DD"),
        //     qty: props.wh == 'uba' ? {
        //       can: 0,
        //       bottle: 0
        //     } : 0,
        //     pack_size: props.wh == 'uba' ? {
        //       can: 0,
        //       bottle: 0
        //     } : 0,
        //     wh: props.wh
        //   };
        // } else {
          base.value.data.form.object = {
            rack_layout: layout.value.form.object.code,
            level:  index,
            type:  layout.value.form.object.type,
            customer: [],
            // customerTitle: '',
            transref: 'I',
            item_code: '',
            receive_date: moment(new Date()).format("YYYY-MM-DD"),
            manufacturing_date: moment(new Date()).format("YYYY-MM-DD"),
            max: layout.value.form.object.level_capa,
            qty: props.wh == 'uba' ? {
              can: 0,
              bottle: 0
            } : 0,
            pack_size: props.wh == 'uba' ? {
              can: 0,
              bottle: 0
            } : 0,
            wh: props.wh
          };
        // }

        base.value.data.form.current = 0;
        base.value.data.form.remain = layout.value.form.object.level_capa - layout.value.form.object.level_detail[index-1];
        base.value.data.form.method = "POST";
        base.value.data.form.item = {};

        tab.value = 0;
        checkbox.value = false;
        base.value.data.form.modal = true;
      },
      edit: (obj) => {
        console.log(obj)
        layout.value.form.temp.rack = obj.rack || obj.rac;
        layout.value.form.temp.bay = obj.bay;
        layout.value.form.temp.level = obj.level;
        layout.value.form.temp.type = obj.type;
        // layout.value.form.temp.shelfs = [];
        // layout.value.form.temp.layoutAdd = [];
        
        base.value.data.form.current = obj.code;
        base.value.data.form.object = { ...obj };
        base.value.data.form.object.item_short_code_obj = JSON.parse(base.value.data.form.object.item_short_code_obj);
        base.value.data.form.object.rack_data = "";
        base.value.data.form.object.oldcomments =  base.value.data.form.object.comments;
        base.value.data.form.object.comments = "";

        base.value.data.form.remain = layout.value.form.object.level_capa - ((layout.value.form.object.level_detail[obj.level-1] || 0) - base.value.data.form.object.qty);
        base.value.data.form.method = "PUT";
        base.value.data.form.item = {};

        base.value.data.form.object.backup_qty = base.value.data.form.object.qty;

        tab.value = 0;
        checkbox.value = checkbox.value != false ? false : checkbox.value;
        base.value.data.form.modal = true;
      },
      save: async (controll = null) => {
        if (layout.value.form.loading) return;
        layout.value.form.loading = true;

        if (checkbox.value == "M") {
          if (
            !base.value.data.form.object.rack ||
            !base.value.data.form.object.level
          ) {
            return alert("The information is incomplete.");
          }
        }

        try {
          base.value.data.form.object.transref = checkbox.value ? checkbox.value : "I";

          const queryBody = 
          // controll ? {
          //     code: base.value.data.form.current,
          //     rows: [
          //       {
          //         ...base.value.data.form.object, 
          //         ...{ 
          //           fromLayout: layout.value.form.temp.layoutAdd.filter(x => x.selected) 
          //         },
          //         ...{
          //           customer: Array.isArray(base.value.data.form.object.customer)
          //             ? base.value.data.form.object.customer[0].code
          //             : base.value.data.form.object.customer
          //         }
          //       }
          //     ],
          //   }
          // : 
          {
            code: base.value.data.form.current,
            rows: [
              {
                ...base.value.data.form.object,
                // ...{
                //   customer: Array.isArray(base.value.data.form.object.customer)
                //     ? base.value.data.form.object.customer[0].code
                //     : base.value.data.form.object.customer
                // }
              }
            ],
          };

          // if (base.value.data.form.object.wh == 'uba' && controll) {
          //   if (base.value.data.form.object.qty.can) {
          //     queryBody.rows[0].qty = base.value.data.form.object.qty.can
          //     queryBody.rows[0].pack_size = base.value.data.form.object.pack_size.can
          //     queryBody.rows[0].fromLayout = layout.value.form.temp.layoutAdd.filter(x => x.selected && x.type == 'C')

          //     const path = buildPath(
          //       null,
          //       "api/controllers/MYSQL/INTERNAL/QA/Retain/shelf"
          //     );
          //     const method = base.value.data.form.method || "POST";
          //     const res = await fetchQuery({}, method, path, queryBody);

          //     if (!res.success) {
          //       console.error("Failed to save data");
          //       return;
          //     }
          //   }

          //   if (base.value.data.form.object.qty.bottle) {
          //     queryBody.rows[0].qty = base.value.data.form.object.qty.bottle
          //     queryBody.rows[0].pack_size = base.value.data.form.object.pack_size.bottle
          //     queryBody.rows[0].fromLayout = layout.value.form.temp.layoutAdd.filter(x => x.selected && x.type == 'P')

          //     const path = buildPath(
          //       null,
          //       "api/controllers/MYSQL/INTERNAL/QA/Retain/shelf"
          //     );
          //     const method = base.value.data.form.method || "POST";
          //     const res = await fetchQuery({}, method, path, queryBody);

          //     if (!res.success) {
          //       console.error("Failed to save data");
          //       return;
          //     }
          //   }
          // } else {
            const path = buildPath(
              null,
              "api/controllers/MYSQL/INTERNAL/QA/Retain/shelf"
            );
            const method = base.value.data.form.method || "POST";
            const res = await fetchQuery({}, method, path, queryBody);
  
            if (!res.success) {
              console.error("Failed to save data");
              return;
            }
  
            if (base.value.data.form.current === 0) {
              base.value.data.form.current = res.rows[0].code;
            }
          // }
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          base.value.data.form.modal = false;
          layout.value.form.loading = false;
          emit("update:success", null);
        }
      },
    };

    const total = ref([]);

    const fnRack = {
      search: async () => {
        try {
          rack.value.pagination.page = 1;
          await fnRack.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (rack.value.pagination.loading) return;
        rack.value.pagination.loading = true;
        try {
          const queryParams = {
            page: rack.value.pagination.page,
            row: rack.value.pagination.row,
            wh: base.value.data.form.object.wh,
            type: base.value.data.form.object.type,
            transref: 'I',
            rac_list: true,
            getTotal: true,
            debug: true
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/QA/Retain/layout"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            rack.value.data.rows = res.rows;
            rack.value.pagination.total = res.total;
            rack.value.pagination.next =
              rack.value.pagination.page * rack.value.pagination.row < rack.value.pagination.total;
            rack.value.pagination.back = rack.value.pagination.page > 1;
          } else {
            console.error("Error fetching rack:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          rack.value.pagination.loading = false;
        }
      },
    }

    const fnItem = {
      search: async () => {
        try {
          item.value.pagination.page = 1;
          await fnItem.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (item.value.pagination.loading) return;
        item.value.pagination.loading = true;
        try {
          const queryParams = {
            page: item.value.pagination.page,
            row: item.value.pagination.row,
            wh: base.value.data.form.object.wh,
            rack: base.value.data.form.object.rack,
            short_code: base.value.data.form.object.item_short_code || base.value.data.form.object.item_short_code_obj[0].short_code,
            item_list: true,
            forRetain: true,
            getTotal: true,
            debug: true
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/WH/shelfshort"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            item.value.data.rows = res.rows;
            item.value.pagination.total = res.total;
            item.value.pagination.next =
              item.value.pagination.page * item.value.pagination.row <
              item.value.pagination.total;
            item.value.pagination.back = item.value.pagination.page > 1;
          } else {
            console.error("Error fetching item:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          item.value.pagination.loading = false;
        }
      },
    }

    // const confirmMethod = () => {
    //   if (base.value.data.form.object.wh == 'ubp') {
    //     let qty = base.value.data.form.object.qty;
    //     let obj = layout.value.form.temp.shelfs;
  
    //     obj.map((x) => x.selected = false);
  
    //     obj.forEach((v) => {
    //       v.addOnLevel = []
    //       v.use = 0;
    //       v.level_mY.forEach((w, i) => {
    //         if ((v.level_detail[i] < v.level_capa) && (!w || w == moment(base.value.data.form.object.manufacturing_date).format('MMYYYY'))) {
    //           if (qty > 0) {
    //             let need = v.level_capa - v.level_detail[i]
    //             v.addOnLevel.push(i+1)
    //             v.selected = true
    //             v.use += qty < need ? qty : need
    //             qty -= qty < need ? qty : need
    //           }
    //         }
    //       })
    //     })

    //     layout.value.form.temp.layoutAdd = []
    //     layout.value.form.temp.layoutAdd = obj.filter(x => x.selected)
    //     tab.value = 1
    //   } else {
    //     let obj = layout.value.form.temp.shelfs;
    //     obj.map((x) => x.selected = false);
    //     obj.map((x) => x.addOnLevel = []);
    //     obj.map((x) => x.use = 0);

    //     if (base.value.data.form.object.qty.can) {
    //       let qty = base.value.data.form.object.qty.can;
  
    //       obj.forEach((v) => {
    //         v.level_mY.forEach((w, i) => {
    //           if ((v.level_detail[i] < v.level_capa) && (!w || w == moment(base.value.data.form.object.manufacturing_date).format('MMYYYY')) && (v.type == 'C') && (qty > 0)) {
    //             let need = v.level_capa - (v.level_detail[i] || 0);
    //             v.addOnLevel.push(i+1);
    //             v.selected = true;
    //             v.use += qty < need ? qty : need;
    //             qty -= qty < need ? qty : need;
    //           }
    //         })
    //       })
    //     }

    //     if (base.value.data.form.object.qty.bottle) {
    //       let qty = base.value.data.form.object.qty.bottle;
  
    //       obj.forEach((v) => {
    //         v.level_mY.forEach((w, i) => {
    //           if ((v.level_detail[i] < v.level_capa) && (!w || w == moment(base.value.data.form.object.manufacturing_date).format('MMYYYY')) && (v.type == 'P') && (qty > 0)) {
    //             let need = v.level_capa - (v.level_detail[i] || 0);
    //             v.addOnLevel.push(i+1);
    //             v.selected = true;
    //             v.use += qty < need ? qty : need;
    //             qty -= qty < need ? qty : need;
    //           }
    //         })
    //       })
    //     }

    //     layout.value.form.temp.layoutAdd = []
    //     layout.value.form.temp.layoutAdd = obj.filter(x => x.selected)
    //     tab.value = 1
    //   }
    // }

    return { layout, base, fnBase, rack, fnRack, item, fnItem, total, checkbox
      // , confirmMethod
    , tab, user, serviceUrl };
  },
  watch: {
    checkbox: function (val) {
      if (val == "M") {
        this.base.data.form.object.rack_data = "";
        this.base.data.form.object.level = "";

        this.fnRack.search();
      }
      if (this.checkbox == "M" || this.checkbox == "O") {
        this.base.data.form.object.qty =
          this.base.data.form.object.qty > this.base.data.form.object.backup_qty
            ? this.base.data.form.object.backup_qty
            : this.base.data.form.object.qty;
      }
    },
    "base.data.form.object.qty": function (val) {
      // if (!this.base.data.form.object.qty || !this.base.data.form.object.pack_size) {
      //   this.base.data.form.object.summary = '';
      //   return;
      // }

      if (val > this.base.data.form.remain) this.base.data.form.object.qty = this.base.data.form.remain;
      this.base.data.form.object.summary = this.base.data.form.object.qty * this.base.data.form.object.pack_size;

      if (this.checkbox == "M" || this.checkbox == "O") {
        this.base.data.form.object.qty =
          this.base.data.form.object.qty > this.base.data.form.object.backup_qty
            ? this.base.data.form.object.backup_qty
            : this.base.data.form.object.qty;
      }
    },
    "base.data.form.object.pack_size": function (val) {
      if (!this.base.data.form.object.qty || !this.base.data.form.object.pack_size) {
        this.base.data.form.object.summary = '';
        return;
      }
      this.base.data.form.object.summary = this.base.data.form.object.qty * this.base.data.form.object.pack_size;
    },
    "base.data.form.object.item_short_code_obj": function (val) {
      if (val) {
        if (val.length) {
          this.base.data.form.object.item_short_code = val[0]['short_code']
          this.fnItem.search(() => {
            if (this.item.data.rows.length == 1) {
              this.base.data.form.object.item_code = this.item.data.rows[0].item_code;
            }
          })
        } else {
          this.base.data.form.object.item_short_code = '';
          this.base.data.form.object.item_code = '';
          this.item.data.rows = [];
        }
      }
    },
    "base.data.form.object.item_code": async function (val) {
      if (val) {
        const queryParams = {
          item_code: val,
        };

        const path = buildPath(
          queryParams,
          `api/controllers/SAP/${this.base.data.form.object.wh}/oitm`
        );

        const res = await fetchQuery({}, "GET", path);

        if (res.success && res.rows.length) {
          this.base.data.form.object.item_code = res.rows[0].ItemCode;
          this.base.data.form.object.item_name = res.rows[0].ItemName;
          this.base.data.form.object.shelf_life = res.rows[0]?.U_Agin || '';
          this.base.data.form.object.shelf_life_sample = res.rows[0]?.U_Agin+90 || '';
          this.base.data.form.object.uom = 'gram';
        } else {
          this.base.data.form.object.item_name = '';
          this.base.data.form.object.shelf_life = '';
          this.base.data.form.object.shelf_life_sample = '';
          this.base.data.form.object.uom = '';
        }
      } else {
        this.base.data.form.object.item_code = '';
        this.base.data.form.object.item_name = '';
        this.base.data.form.object.shelf_life = '';
        this.base.data.form.object.shelf_life_sample = '';
        this.base.data.form.object.uom = '';
      }
    },
  }
});
</script>

<style scoped>
.tab-content {
  border-radius: 10px 10px 10px 10px;
}

input[type="date"] {
  position: relative;
}

input[type="date"]:before {
  /* position: absolute; */
  /* top: 3px; left: 3px; */
  content: attr(data-date);
  display: inline-block;
  /* color: black; */
}

input[type="date"]::-webkit-datetime-edit {
  display: none;
}

/* input::-webkit-datetime-edit, input::-webkit-inner-spin-button, input::-webkit-clear-button {
    display: none;
} */

input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  transform: translate(-60%,-65%);
  right: 1px;
  color: black;
  opacity: 1;
}
</style>
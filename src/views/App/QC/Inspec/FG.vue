<template>
  <AppLayout>
      <template #modal>
        <!-- modal base -->
        <input
          type="checkbox"
          id="modal-base"
          class="modal-toggle"
          v-model="base.modal"
        />
        <div class="modal" v-if="base.modal">
          <div class="modal-box relative w-11/12 max-w-7xl">
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold text-secondary underline underline-offset-2">Results</h3>
            <button
              class="join-item btn btn-xs btn-outline btn-primary text-xs" style="display: flex;"
              @click="exportExcel('detail')"
            >
              <Icon
                icon="mdi:file-excel-outline"
                class="h-4 w-4"
              />
              Excel
            </button>
            <div class="overflow-auto mt-3" style="max-height: 60vh" v-if="!load">
              <table class="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr class="bg-accent text-white" v-if="wh == 'UBA'">
                    <td>Sampling.</td>
                    <td>Date</td>
                    <td>Step</td>
                    <td>T.S. Spec (%)</td>
                    <td>Result T.S</td>
                    <td>Viscosity Spec (sec)</td>
                    <td>Condition Viscosity</td>
                    <td>Result Viscosity</td>
                    <td>Appearance</td>
                    <td>Dried Film Properties</td>
                    <td>WET Appearance</td>
                    <td>Result Appearance</td>
                    <td>Hegm</td>
                    <td>Result Hegman</td>
                    <td>Specific Gravity</td>
                    <td>Result Specific Gravity</td>
                    <td>Dried Film Weight (g/m2)</td>
                    <td>Result Dried Film Weight (g/m2)</td>
                    <td>SCOTCH TAPE TEST (ADHESION)</td>
                    <td>Result SCOTCH TAPE (ADHESION)</td>
                    <td>MEK TEST (1 KG.)</td>
                    <td>Result MEK TEST (1 KG.)</td>
                    <td>SCRATCH TEST (SHEEN)</td>
                    <td>Result SCRATCH TEST (SHEEN)</td>
                    <td>COPPER SULPHATE -WEDGE BEND</td>
                    <td>Result WEDGE BEND</td>
                    <td>COPPER SULPHATE -307 END</td>
                    <td>Result 307 END</td>
                    <td>COPPER SULPHATE -4-EDGE CUP</td>
                    <td>COPPER SULPHATE -BEADING</td>
                    <td>SLIP TEST</td>
                    <td>Result SLIP TEST</td>
                    <td>∆ E</td>
                    <td>Result ∆ E</td>
                    <td>Gloss</td>
                    <td>Result Gloss</td>
                    <td>ABRASION TEST(1kg)</td>
                    <td>RETORT AT 121 C/90 MIN.</td>
                    <td>Result RETORT</td>
                    <td>ENAMEL TEST</td>
                    <td>T.S.BAKE</td>
                    <td>Result ABRASION TEST</td>
                    <td>Confirm</td>
                    <td>ผู้ตรวจสอบ</td>
                  </tr>

                  <tr class="bg-accent text-white" v-else>
                    <td>Sampling</td>
                    <td>Date</td>
                    <td>Step</td>
                    <td>Appearance</td>
                    <td>Result Appearance</td>
                    <td>TS(%) Spec</td>
                    <td>ConditionTS</td>
                    <td>Result TS</td>
                    <td>pH spec</td>
                    <td>Result PH</td>
                    <td>Viscosity, Brookfield LV</td>
                    <td>Specification LV (cps.)</td>
                    <td>Result LV(cps.)</td>
                    <td>Viscosity, Brookfield RV</td>
                    <td>Specification RV (cps.)</td>
                    <td>ConditionPH</td>
                    <td>Result RV(cps.)</td>
                    <td>VisCosity</td>
                    <td>Specification Viscosity(sec)</td>
                    <td>Result Viscosity</td>
                    <td>ผลกรองผ่านถุงกรองขนาด 150 ไมครอน</td>
                    <td>Color</td>
                    <td>LN(sec)</td>
                    <td>SG_WET</td>
                    <td>SG_Dried</td>
                    <td>คำสั่ง Lab</td>
                    <td>Confirm</td>
                    <td>ผู้ตรวจสอบ</td>
                    <td>Boiling Water Test</td>
                    <td>Condition การอบชิ้นงาน</td>
                    <td>Result การอบชิ้นงาน</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="key in detail.rows" v-if="wh == 'UBA'">
                    <td>{{ key.U_Sampling || '-' }}</td>
                    <td>{{ key.U_Date ? $moment(key.U_Date.date).format("DD-MM-YYYY") : '-' }}</td>
                    <td>{{ key.U_Step || '-' }}</td>
                    <td>{{ key.U_Tspec || '-' }}</td>
                    <td>{{ key.U_Result1 || '-' }}</td>
                    <td>{{ key.U_VisSpec || '-' }}</td>
                    <td>{{ key.U_ConVis || '-' }}</td>
                    <td>{{ key.U_Result2 || '-' }}</td>
                    <td>{{ key.U_Appearance || '-' }}</td>
                    <td>{{ key.U_DriFP || '-' }}</td>
                    <td>{{ key.U_WETAp || '-' }}</td>
                    <td>{{ key.U_Result3 || '-' }}</td>
                    <td>{{ key.U_Hegm || '-' }}</td>
                    <td>{{ key.U_Result4 || '-' }}</td>
                    <td>{{ key.U_SpeciG || '-' }}</td>
                    <td>{{ key.U_Result5 || '-' }}</td>
                    <td>{{ key.U_DriFW || '-' }}</td>
                    <td>{{ key.U_Result6 || '-' }}</td>
                    <td>{{ key.U_SCOTAPE || '-' }}</td>
                    <td>{{ key.U_Result7 || '-' }}</td>
                    <td>{{ key.U_MEKT || '-' }}</td>
                    <td>{{ key.U_Result8 || '-' }}</td>
                    <td>{{ key.U_ScraTSH || '-' }}</td>
                    <td>{{ key.U_Result9 || '-' }}</td>
                    <td>{{ key.U_CoSuWe || '-' }}</td>
                    <td>{{ key.U_Result10 || '-' }}</td>
                    <td>{{ key.U_CoSu30 || '-' }}</td>
                    <td>{{ key.U_Result11 || '-' }}</td>
                    <td>{{ key.U_COPPERedge || '-' }}</td>
                    <td>{{ key.U_COPPERbead || '-' }}</td>
                    <td>{{ key.U_SLIPT || '-' }}</td>
                    <td>{{ key.U_Result12 || '-' }}</td>
                    <td>{{ key.U_DelE || '-' }}</td>
                    <td>{{ key.U_Result13 || '-' }}</td>
                    <td>{{ key.U_Gloss || '-' }}</td>
                    <td>{{ key.U_Result14 || '-' }}</td>
                    <td>{{ key.U_Abtest || '-' }}</td>
                    <td>{{ key.U_REAT || '-' }}</td>
                    <td>{{ key.U_Result15 || '-' }}</td>
                    <td>{{ key.U_EnamelTest || '-' }}</td>
                    <td>{{ key.U_TsBake || '-' }}</td>
                    <td>{{ key.U_Result16 || '-' }}</td>
                    <td>{{ key.U_Confirm || '-' }}</td>
                    <td>{{ key.U_EM_name || '-' }}</td>
                  </tr>

                  <tr v-for="key in detail.rows" v-else>
                    <td>{{ key.U_Sampling || '-' }}</td>
                    <td>{{ key.U_Date ? $moment(key.U_Date.date).format("DD-MM-YYYY") : '-' }}</td>
                    <td>{{ key.U_step || '-' }}</td>
                    <td>{{ key.U_Appearance || '-' }}</td>
                    <td>{{ key.U_Result || '-' }}</td>
                    <td>{{ key.U_TSSpec || '-' }}</td>
                    <td>{{ key.U_Condition || '-' }}</td>
                    <td>{{ key.U_Result2 || '-' }}</td>
                    <td>{{ key.U_pHspec || '-' }}</td>
                    <td>{{ key.U_Result3 || '-' }}</td>
                    <td>{{ key.U_Vis_Brook || '-' }}</td>
                    <td>{{ key.U_Specification || '-' }}</td>
                    <td>{{ key.U_Result4 || '-' }}</td>
                    <td>{{ key.U_Vis_BrookRV || '-' }}</td>
                    <td>{{ key.U_Specification2 || '-' }}</td>
                    <td>{{ key.U_Condition2 || '-' }}</td>
                    <td>{{ key.U_Result5 || '-' }}</td>
                    <td>{{ key.U_VisCosity || '-' }}</td>
                    <td>{{ key.U_Specification3 || '-' }}</td>
                    <td>{{ key.U_Result6 || '-' }}</td>
                    <td>{{ key.U_Result7 || '-' }}</td>
                    <td>{{ key.U_Color || '-' }}</td>
                    <td>{{ key.U_LN || '-' }}</td>
                    <td>{{ key.U_SG_WET || '-' }}</td>
                    <td>{{ key.U_SG_Dried || '-' }}</td>
                    <td>{{ key.U_Lab || '-' }}</td>
                    <td>{{ key.U_Confirm || '-' }}</td>
                    <td>{{ key.U_EM_Name || '-' }}</td>
                    <td>{{ key.U_BoilingWater || '-' }}</td>
                    <td>{{ key.U_ConditionBaking || '-' }}</td>
                    <td>{{ key.U_Result8 || '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else>
              <span class="loading loading-spinner text-primary"></span>
            </div>
          </div>
        </div>
        <!-- modal catalog -->
        <input
          type="checkbox"
          id="modal-catalog"
          class="modal-toggle"
          v-model="catalog.modal"
        />
        <div class="modal" v-if="catalog.modal">
          <div class="modal-box relative w-11/12 max-w-md">
            <label
              for="modal-catalog"
              class="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <div class="flex justify-center items-center gap-3">
              <h3 class="text-lg font-bold text-primary">Item Code : </h3>
              <AppModuleGlobalSearch
                :class="'join-item input input-sm input-bordered border-gray-300 w-60'"
                @search="
                  (q) => {
                    catalog.q = q;
                    catalog_search();
                  }
                "
              />
            </div>
            <hr class="mt-5" />
            <div
              v-if="catalog.loading"
              class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
            >
              <AppModuleGlobalLoadingText
                :type="'text'"
                :class="`p-4 py-12 text-3xl text-center`"
              />
            </div>
            <div class="overflow-x-auto max-h-[60vh] my-5">
              <table class="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <th class="text-center">Select</th>
                    <td>Product</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v, i) in catalog.rows" :class="v.U_Product == base.form.item_code ? 'bg-primary text-white' : ''">
                    <th class="text-center" :class="v.U_Product == base.form.item_code ? 'bg-primary text-white' : ''">
                      <input type="radio" name="radio-1" class="radio radio-xs radio-primary" :value="v.U_Product" v-model="base.form.item_code" :disabled="catalog.rows.find(x => search.itemCode.from == v.U_Product || search.itemCode.to == v.U_Product) ? true : false" />
                    </th>
                    <td>{{ v.U_Product }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="backdrop-blur sticky top-0 items-center gap-3 flex"> 
              <div class="flex-1 form-control">
                <label 
                  for="modal-catalog" class="btn btn-sm btn-primary text-white"
                  :class="!base.form.item_code ? 'btn-disabled' : ''"
                  @click="catalog_save(catalog.rows.find(x => x.U_Product == base.form.item_code))"
                >
                  Confirm
                </label>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #view>
        <div class="gap-3 py-3">
          <div class="card shadow-lg bg-base-100">
            <div class="card-body overflow-auto">
              <div class="border-dashed border-2 rounded-lg p-2">
                <h1 class="text-center text-lg font-black text-primary underline underline-offset-2">รายงานผลการทดสอบ FG</h1>
                <!-- <div class="border-dashed border-2 rounded-lg p-2"> -->
                  <!-- <div class="grid gap-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-3"> -->
                  <div class="grid gap-3 sm:grid-cols-2 grid-cols-1 mt-3">
                    <div class="join">
                      <button
                        class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        Customer
                      </button>
                      <select
                        class="join-item select select-sm select-bordered w-fit border-gray-300"
                        v-model="search.wh"
                      >
                        <option value="UBP" selected>UBP</option>
                        <option value="UBA">UBA</option>
                      </select>
                      <!-- <button
                        class="xl:block lg:hidden md:block sm:hidden block join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        Customer
                      </button> -->
                      <AppModuleGlobalSelectSearch
                        :placeholder="'search customer ...'"
                        :label="'U_Customer'"
                        :code="'U_Customer'"
                        :minChar="0"
                        :delay="0.5"
                        :limit="10"
                        :customClass="`input input-bordered border-base-content input-sm join-item ${
                          checkbox == 'M' ? 'input-disabled' : ''
                        } ${search.customer ? 'bg-yellow-50 text-black' : ''}`"
                        :disabled="checkbox == 'M' ? true : false"
                        :current="search.customer"
                        :refresh="refresh.search"
                        @updateValue="
                          (obj) => {
                            search.customer = obj.U_Customer;
                          }
                        "
                        @stopRefresh="
                          (obj) => {
                            refresh.search = obj.value;
                          }
                        "
                        :url="`${this.serviceUrl}api/controllers/SAP/${search.wh}/QC/fg_inspec`"
                        :param="`&group_customer=1&total=1`"
                      />
                    </div>
                    <div class="join">
                      <button
                        class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        Production No .
                      </button>
                      <input
                        type="text"
                        placeholder="pd no ..."
                        class="join-item input input-sm input-bordered w-full border-gray-300"
                        :class="search.pdNo.from ? 'bg-yellow-50 text-black' : ''"
                        v-model="search.pdNo.from"
                      />
                      <input
                        type="text"
                        placeholder="to pd no"
                        class="join-item input input-sm input-bordered w-full border-gray-300"
                        :class="search.pdNo.to ? 'bg-yellow-50 text-black' : ''"
                        v-model="search.pdNo.to"
                      />
                    </div>
                    <div class="join">
                      <button
                        class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        Item Code
                      </button>
                      <input
                        type="text"
                        placeholder="code ..."
                        class="join-item input input-sm input-bordered w-full border-gray-300"
                        :class="search.itemCode.from ? 'bg-yellow-50 text-black' : ''"
                        v-model="search.itemCode.from"
                      />
                      <button class="join-item btn btn-sm border-gray-300" @click="selectitem('from')"><Icon icon="material-symbols:manage-search" width="16" height="16" /></button>
                      <input
                        type="text"
                        placeholder="to code"
                        class="join-item input input-sm input-bordered w-full border-gray-300"
                        :class="search.itemCode.to ? 'bg-yellow-50 text-black' : ''"
                        v-model="search.itemCode.to"
                      />
                      <button class="join-item btn btn-sm border-gray-300" @click="selectitem('to')"><Icon icon="material-symbols:manage-search" width="16" height="16" /></button>
                    </div>
                    <div class="join">
                      <button
                        class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        Lot No.
                      </button>
                      <input
                        type="text"
                        placeholder="lot no ..."
                        class="join-item input input-sm input-bordered w-full border-gray-300"
                        :class="search.lot.from ? 'bg-yellow-50 text-black' : ''"
                        v-model="search.lot.from"
                      />
                      <input
                        type="text"
                        placeholder="to lot no"
                        class="join-item input input-sm input-bordered w-full border-gray-300"
                        :class="search.lot.to ? 'bg-yellow-50 text-black' : ''"
                        v-model="search.lot.to"
                      />
                    </div>
                    <div class="join">
                      <button
                        class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        MFG Date
                      </button>
                      <input
                        type="date"
                        placeholder="first date"
                        class="join-item input input-sm input-bordered w-full border-gray-300"
                        :class="search.mfg.from ? 'bg-yellow-50 text-black' : ''"
                        v-model="search.mfg.from"
                      />
                      <button
                        class="md:block sm:hidden block join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                        disabled
                      >
                        -
                      </button>
                      <input
                        type="date"
                        placeholder="second date"
                        class="join-item input input-sm input-bordered w-full border-gray-300"
                        :class="search.mfg.to ? 'bg-yellow-50 text-black' : ''"
                        v-model="search.mfg.to"
                      />
                    </div>
                    <div class="join">
                      <button class="hidden md:block join-item btn btn-sm btn-active btn-ghost" style="display: inline-flex; width: 50%;" @click="clearing">
                        <Icon
                          icon="icon-park-outline:clear-format"
                          class="h-5 w-5"
                        />
                        ล้าง
                      </button>
                      <button class="hidden md:block join-item btn btn-sm btn-primary text-white" style="display: inline-flex; width: 50%;" @click="searching">
                        <Icon
                          icon="tabler:search"
                          class="h-5 w-5 text-white"
                        />
                        ค้นหา
                      </button>
                    </div>
                  </div>
                  <!-- <div class="grid gap-3 grid-cols-1 mt-3"> -->
                    <!-- <div class="join">
                      <button class="hidden md:block join-item btn btn-sm btn-active btn-ghost" style="display: inline-flex; width: 50%;" @click="clearing">
                        <Icon
                          icon="icon-park-outline:clear-format"
                          class="h-5 w-5"
                        />
                        ล้าง
                      </button>
                      <button class="hidden md:block join-item btn btn-sm btn-primary text-white" style="display: inline-flex; width: 50%;" @click="searching">
                        <Icon
                          icon="tabler:search"
                          class="h-5 w-5 text-white"
                        />
                        ค้นหา
                      </button>
                    </div> -->
                  <!-- </div> -->
                <!-- </div> -->
              </div>
              <div
                v-if="base.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :type="'text'"
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div class="mt-1" v-if="check">
                <div class="flex justify-between">
                  <div class="flex gap-1">
                    <button
                      class="join-item btn btn-xs btn-outline btn-success" style="display: flex;"
                      @click="exportExcel('final')"
                    >
                      <Icon
                        icon="mdi:file-excel-outline"
                        class="h-5 w-5"
                      />
                      Final Result
                    </button>
                    <button
                      class="join-item btn btn-xs btn-outline" style="display: flex;"
                      @click="exportExcel('sampling')"
                  >
                      <Icon
                        icon="mdi:file-excel-outline"
                        class="h-5 w-5"
                      />
                      Sampling Result
                    </button>
                  </div>
                  <div class="join w-full justify-end">
                    <AppModuleGlobalSearch
                      :class="'join-item input input-sm input-bordered w-full max-w-xs'"
                      @search="
                        (q) => {
                          base.q = q;
                          base.page = 1;
                          base_search();
                        }
                      "
                    />
                  </div>
                </div>
                <div class="overflow-x-auto w-full max-h-[41vh] my-2">
                  <div v-if="!base.loading && base.rows.length == 0">
                    <AppModuleGlobalEmptyData
                      :class="`p-4 py-12 text-3xl text-center`"
                    />
                  </div>
                  <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                    <thead>
                      <tr>
                        <td>DocNum</td>
                        <td>Customer</td>
                        <td>Production Order No.</td>
                        <td>Production Date</td>
                        <td>Product</td>
                        <td>Lot No.</td>
                        <td>MFG. Date</td>
                        <td>Topic</td>
                        <td>Remark</td>
                        <td>Approver</td>
                        <th class="text-center">Results</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(v, i) in base.rows" :key="v.DocEntry" class="hover">
                        <td>{{ v.DocNum }}</td>
                        <td>{{ v.U_Customer || '-' }}</td>
                        <td>{{ wh == 'UBA' ? v.U_Pronum : v.U_ProNumber }}</td>
                        <td>
                          {{
                            wh == 'UBA'
                              ? (v.U_Date ? $moment(v.U_Date.date).format("DD-MM-YYYY") : "-" )
                              : (v.U_Prodate ? $moment(v.U_Prodate.date).format("DD-MM-YYYY") : "-" )
                          }}
                        </td>
                        <td>{{ v.U_Product }}</td>
                        <td>{{ v.U_LotNo }}</td>
                        <td>{{ v.U_MfgDate ? $moment(v.U_MfgDate.date).format("DD-MM-YYYY") : "-" }}</td>
                        <td>{{ v.Object }}</td>
                        <td>{{ v.U_Remark || '-' }}</td>
                        <td>{{ v.U_ApproveBY || '-' }}</td>
                        <th class="text-center">
                          <label
                            for="modal-base"
                            class="btn btn-primary modal-button btn-xs text-white"
                            @click="base_edit(`${v.DocEntry}`, `${i}`)"
                          >
                            Results
                          </label>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="grid gap-3 lg:grid-cols-2 grid-cols-1">
                  <div class="text-left text-sm">
                    Show :
                    <select class="select select-bordered select-xs w-fit bg-yellow-50 text-black" 
                      v-model="base.row" 
                      @change="base_search()"
                    >
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
                    |
                    Showing {{ base.page == Math.ceil(base.total/base.row) ? 1 + (base.row*(base.page - 1)) : 1 + ((base.page - 1)*base.row) }} to {{ base.page == Math.ceil(base.total/base.row) ? base.total : base.row*base.page }} of {{ base.total }} entries
                  </div>
                  <div class="join w-full justify-center lg:justify-end">
                    <AppModuleGlobalPageination
                      :page="base.page"
                      :total="base.total"
                      :row="base.row"
                      :back="base.back"
                      :next="base.next"
                      :loading="base.loading"
                      @search="
                        (res) => {
                          base.page = res.page;
                          this.base_search();
                        }
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="overflow-x-auto w-full h-32 mt-9" v-else>
                <span class="font-bold italic text-gray-500">{{ text }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
  </AppLayout>
</template>

<style>
  .crop {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 1px;
  }
</style>

<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "FG",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData
  },
  data() {
    return {
      load: false,
      text: 'Specify Information Before Searching.',
      allow: false,
      check: 0,
      search: {
        customer: "",
        pdNo: {
          from: "",
          to: "",
        },
        itemCode: {
          from: "",
          to: "",
        },
        lot: {
          from: "",
          to: ""
        },
        mfg: {
          from: "",
          to: "",
        },
        wh: "UBP"
      },
      wh: "",
      checkbox: "",
      refresh: false,
      base: {
        rows: [],
        total: 0,
        page: 1,
        row: 15,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
          title: "",
          ref: "",
        },
      },
      detail: {
        rows: [],
        total: 0,
        page: 1,
        row: 20,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
          title: "",
          ref: "",
        },
      },
      catalog: {
        rows: [],
        total: 0,
        page: 1,
        row: 10,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
          title: "",
          ref: "",
        },
      },
    };
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      return this.$store.getters.user_token;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    exportExcel(controll) {
      if (controll == 'final') {
        return window.open(`${this.serviceUrl}api/controllers/SAP/Excel/${this.wh}/qc?for=fgreport&total=1&result=1${
          this.search.customer ? `&customer=${this.search.customer}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}
          ${this.search.pdNo.from ? `&pdNo_from=${this.search.pdNo.from}` : ''}${this.search.pdNo.to ? `&pdNo_to=${this.search.pdNo.to}` : ''}
          ${this.search.itemCode.from ? `&code_from=${this.search.itemCode.from}` : ''}${this.search.itemCode.to ? `&code_to=${this.search.itemCode.to}` : ''}
          ${this.search.lot.from ? `&lot_from=${this.search.lot.from}` : ""}${this.search.lot.to ? `&lot_to=${this.search.lot.to}` : ""}
          ${this.search.mfg.from ? `&start_date=${this.search.mfg.from}` : ''}${this.search.mfg.to ? `&end_date=${this.search.mfg.to}` : ''}`);
      } else if (controll == 'sampling') {
        return window.open(`${this.serviceUrl}api/controllers/SAP/Excel/${this.wh}/qc?for=sampling_fgreport&total=1&result=1${
          this.search.customer ? `&customer=${this.search.customer}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}
          ${this.search.pdNo.from ? `&pdNo_from=${this.search.pdNo.from}` : ''}${this.search.pdNo.to ? `&pdNo_to=${this.search.pdNo.to}` : ''}
          ${this.search.itemCode.from ? `&code_from=${this.search.itemCode.from}` : ''}${this.search.itemCode.to ? `&code_to=${this.search.itemCode.to}` : ''}
          ${this.search.lot.from ? `&lot_from=${this.search.lot.from}` : ""}${this.search.lot.to ? `&lot_to=${this.search.lot.to}` : ""}
          ${this.search.mfg.from ? `&start_date=${this.search.mfg.from}` : ''}${this.search.mfg.to ? `&end_date=${this.search.mfg.to}` : ''}`);
      } else {
        return window.open(`${this.serviceUrl}api/controllers/SAP/Excel/${this.wh}/qc?for=fgresult&total=1&doc=${this.base.form.DocEntry}`);
      }
    },
    selectitem(cond) {
      this.side = cond
      this.catalog.modal = true
      this.catalog_search()
    },
    searching() {
      this.wh = this.search.wh
      this.base.page = 1
      this.allow = true
      this.base_search();
    },
    clearing() {
      this.search.customer = ''
      this.search.pdNo.from = ''
      this.search.pdNo.to = ''
      this.search.itemCode.from = ''
      this.search.itemCode.to = ''
      this.search.lot.from = ''
      this.search.lot.to = ''
      this.search.mfg.from = ''
      this.search.mfg.to = ''

      this.base.q = ''
    },
    // base
    base_search() {
      this.base.loading = true;
      setTimeout(() => {
        this.base_get((res) => {
          this.base.rows = res.rows;
          this.base.total = res.total;
          this.base.next =
            this.base.page * this.base.row >= this.base.total ? false : true;
          this.base.back = this.base.page > 1 ? true : false;
          this.base.loading = false;

          this.allow = false
        });
      }, 250);
    },
    base_get(callback) {
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/SAP/${this.search.wh}/QC/fg_inspec?total=1&page=${
        this.base.page}${this.search.customer ? `&customer=${this.search.customer}` : ""}${
        this.search.pdNo.from ? `&pdNo_from=${this.search.pdNo.from}` : ''}${this.search.pdNo.to ? `&pdNo_to=${this.search.pdNo.to}` : ''}${
        this.search.itemCode.from ? `&code_from=${this.search.itemCode.from}` : ''}${this.search.itemCode.to ? `&code_to=${this.search.itemCode.to}` : ''}${
        this.search.lot.from ? `&lot_from=${this.search.lot.from}` : ""}${this.search.lot.to ? `&lot_to=${this.search.lot.to}` : ""}${
        this.search.mfg.from ? `&start_date=${this.search.mfg.from}` : ''}${this.search.mfg.to ? `&end_date=${this.search.mfg.to}` : ''}${
        this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
        if (!res.success) {
        } else {
          this.text = !res.rows.length ? `No Information found. Can It Be ${ this.search.wh == 'UBP' ? '"UBA"' : '"UBP"' } Base?` : 'Specify Information Before Searching.'
          this.check = this.allow ? res.rows.length : this.check

          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.detail.rows = [];
      this.detail_search();
      this.refresh = true;
    },
    // DETAIL
    detail_search() {
      this.load = true

      this.detail.loading = true;
      this.detail_get((res) => {
        this.detail.rows = res.rows;
        this.detail.total = res.total;
        this.detail.next =
          this.detail.page * this.detail.row >= this.detail.total
            ? false
            : true;
        this.detail.back = this.detail.page > 1 ? true : false;
        this.detail.loading = false;

        setTimeout(() => {
          this.load = false
        }, 100);
      });
    },
    detail_get(callback) {
      new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/SAP/${this.wh}/QC/fg_inspec_result?total=1&doc=${this.base.form.DocEntry}&debug=1`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    // CATALOG
    catalog_search() {
      this.catalog.rows = []
      this.catalog.loading = true;
      this.catalog_get((res) => {
        setTimeout(() => {
          this.catalog.rows = res.rows;
          this.catalog.total = res.total;
          this.catalog.next =
            this.catalog.page * this.catalog.row >= this.catalog.total
              ? false
              : true;
          this.catalog.back = this.catalog.page > 1 ? true : false;
          this.catalog.loading = false;

          if (this.side == 'from') {
            this.base.form.item_code = this.search.itemCode.from
          } else {
            this.base.form.item_code = this.search.itemCode.to
          }
        }, 200);
      });
    },
    catalog_get(callback) {
      new Query('catalog','get').get(this, `${
          this.serviceUrl
        }api/controllers/SAP/${this.search.wh}/QC/fg_inspec?group_fg=1&total=1${this.catalog.q ? `&q=${this.catalog.q}` : ""}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    catalog_save(row) {
      if (this.side == 'from') this.search.itemCode.from = row.U_Product
      this.search.itemCode.to = row.U_Product
    },
  },
  mounted() {},
  watch: {}
};
</script>

<style scrop>
tr,
td {
  white-space: nowrap;
}
</style>

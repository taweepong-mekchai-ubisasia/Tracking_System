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
            <h3 class="text-lg font-bold text-primary underline underline-offset-2">รายละเอียด Issue for Production</h3>
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
              <table class="table tables-sm table-zebra table-pin-cols">
                <thead>
                  <tr class="bg-primary text-sm text-white">
                    <td colspan="2">สินค้าที่ผลิต: {{ base.form.ItemCode }}</td>
                    <td colspan="1">Batch Number: {{ base.form.DistNumber }}</td>
                    <td colspan="1">วันที่ผลิตเสร็จ: {{ base.form.DocDate ? $moment(base.form.DocDate.date).format("DD-MM-YYYY") : "-" }}</td>
                    <td colspan="3">จำนวนทั้งหมด: {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(base.form.Quantity) }}</td>
                    <td colspan="2">เลขที่ใบสั่งผลิต: {{ base.form.BaseRef }}</td>
                  </tr>
                  <tr class="bg-accent text-white">
                    <td>บรรทัดวัตถุดิบ</td>
                    <td>เลขที่ใบสั่งผลิต</td>
                    <td>Item Code</td>
                    <td>Description</td>
                    <td class="text-right">Planed Qty</td>
                    <td class="text-right">Issued Qty</td>
                    <td>Unit</td>
                    <td>Batch</td>
                    <td>Warehouse</td>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="key in detail.rows">
                    <tr class="text-xs font-semibold">
                      <td class="font-bold">{{ key.issue.VisOrder }}</td>
                      <td>{{ key.issue.BaseRef }}</td>
                      <td>{{ key.issue.ItemCode }}</td>
                      <td>{{ key.issue.Dscription }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(key.issue.PlanedQty) }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(key.issue.Quantity) }}</td>
                      <td>{{ key.issue.UomCode }}</td>
                      <td>{{ key.issue.DistNumber }}</td>
                      <td>{{ key.issue.WhsCode }}</td>
                    </tr>
                    <tr class="text-xs italic" v-if="key.grpo">
                      <td></td>
                      <td class="underline underline-offset-2">Good Receipt PO Doc No.</td>
                      <td>{{ key.grpo ? key.grpo.DocNum : '-' }}</td>
                      <td class="underline underline-offset-2">วันที่รับสินค้าเข้ามา</td>
                      <td>{{ key.grpo ? $moment(key.grpo.DocDate).format("DD-MM-YYYY") : '-' }}</td>
                      <td class="underline underline-offset-2">Supplier</td>
                      <td colspan="3">{{ key.grpo ? key.grpo.CardName : '-' }}</td>
                    </tr>
                    <tr class="text-xs text-center italic" v-else-if="key.issue.ItemCode.slice(0, 1) == 'R'">
                      <td colspan="9">No Sub Product & Good Receipt PO</td>
                    </tr>
                    <tr class="text-xs" v-else>
                      <td class="text-center" colspan="9"><div :class="key.contentVisible ? 'badge badge-sm badge-error text-white font-bold text-xs' : 'badge badge-sm badge-info text-white font-bold text-xs'" style="cursor: pointer;" @click="forsemi(key.issue.ItemCode, key.issue.DistNumber); key.contentVisible = !key.contentVisible;">{{ key.contentVisible ? 'close' : 'more' }}</div></td>
                    </tr>
                    <tr v-if="!key.grpo && key.contentVisible">
                      <td colspan="9">
                        <div class="accordian-body overflow-x-auto border-solid border-2 rounded-lg shadow" v-if="!loadsupp">
                          <table class="table table-xs" v-if="datalist.length">
                            <thead>
                              <tr class="bg-accent text-white">
                                <td>บรรทัดวัตถุดิบ</td>
                                <td>เลขที่ใบสั่งผลิต</td>
                                <td>Item Code</td>
                                <td>Description</td>
                                <td class="text-right">Planed Qty</td>
                                <td class="text-right">Issued Qty</td>
                                <td>Unit</td>
                                <td>Batch</td>
                                <td>Warehouse</td>
                              </tr>
                            </thead> 
                            <tbody>
                              <template v-for="(key, index) in datalist">
                                <tr class="text-xs">
                                  <td class="font-bold">{{ key.issue.VisOrder }}</td>
                                  <td>{{ key.issue.BaseRef }}</td>
                                  <td>{{ key.issue.ItemCode }}</td>
                                  <td>{{ key.issue.Dscription }}</td>
                                  <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(key.issue.PlanedQty) }}</td>
                                  <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(key.issue.Quantity) }}</td>
                                  <td>{{ key.issue.UomCode }}</td>
                                  <td>{{ key.issue.DistNumber }}</td>
                                  <td>{{ key.issue.WhsCode }}</td>
                                </tr>
                                <tr class="text-xs italic" v-if="key.grpo">
                                  <td></td>
                                  <td class="underline underline-offset-2">Good Receipt PO Doc No.</td>
                                  <td>{{ key.grpo ? key.grpo.DocNum : '-' }}</td>
                                  <td class="underline underline-offset-2">วันที่รับสินค้าเข้ามา</td>
                                  <td>{{ key.grpo ? $moment(key.grpo.DocDate).format("DD-MM-YYYY") : '-' }}</td>
                                  <td class="underline underline-offset-2">Supplier</td>
                                  <td colspan="3">{{ key.grpo ? key.grpo.CardName : '-' }}</td>
                                </tr>
                                <tr class="text-xs italic text-center" v-else-if="key.issue.ItemCode.slice(0, 1) == 'R'">
                                  <td colspan="9">No Sub Product & Good Receipt PO</td>
                                </tr>
                                <tr class="text-xs italic text-center" v-else>
                                  <td colspan="9">No Good Receipt PO</td>
                                </tr>
                              </template>
                            </tbody> 
                          </table>
                          <div class="text-xs italic flex justify-center" v-else>
                            <td colspan="9">No Sub Product & Good Receipt PO</td>
                          </div>
                        </div>
                        <div class="accordian-body overflow-x-auto" align="center" v-else>
                          <td colspan="9"><span class="loading loading-spinner text-primary"></span></td>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <div v-else>
              <span class="loading loading-spinner text-primary"></span>
            </div>
          </div>
        </div>
        <!-- modal item -->
        <input
          type="checkbox"
          id="modal-item"
          class="modal-toggle"
          v-model="item.modal"
        />
        <div class="modal" v-if="item.modal">
          <div class="modal-box relative w-11/12 max-w-7xl">
            <label
              for="modal-item"
              class="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 class="text-lg font-bold underline underline-offset-2">QC Inspec on Process of Production Number : <span class="text-secondary">{{ base.form.BaseRef }} ({{ base.form.ItemCode }})</span></h3>
            <button
              class="join-item btn btn-xs btn-outline btn-primary text-xs" style="display: flex;"
              :disabled="item.rows ? false : true"
              @click="exportExcel('result')"
            >
              <Icon
                icon="mdi:file-excel-outline"
                class="h-4 w-4"
              />
              Excel
            </button>
            <div class="overflow-auto mt-3" style="max-height: 60vh" v-if="!load">
              <table class="table table-xs table-pin-rows table-pin-cols" v-if="item.rows">
                <thead>
                  <tr class="bg-secondary text-white" v-if="wh == 'UBA'">
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
                    <td>Dried Film Weight(g/m2)</td>
                    <td>Result Dried Film Weight(g/m2)</td>
                    <td>SCOTCH TAPE TEST(ADHESION)</td>
                    <td>Result SCOTCH TAPE(ADHESION)</td>
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

                  <tr class="bg-secondary text-white" v-else>
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
                  <tr v-for="key in item.rows" v-if="wh == 'UBA'">
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

                  <tr v-for="key in item.rows" v-else>
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
              <div v-else>
                <h3 class="text-sm font-semibold italic">No Information Found</h3>
              </div>
            </div>
            <div v-else>
              <span class="loading loading-spinner text-primary"></span>
            </div>
          </div>
        </div>
      </template>
      <template #view>
        <div class="gap-3 py-3">
          <div class="card shadow-lg bg-base-100">
            <div class="card-body overflow-auto">
              <div class="border-dashed border-2 rounded-lg p-2">
                <h1 class="text-center text-lg font-black text-primary underline underline-offset-2">การตรวจสอบย้อนกลับของผลิตภัณฑ์</h1>
              <!-- <div class="border-dashed border-2 rounded-lg p-2"> -->
                <div class="grid gap-3 md:grid-cols-2 grid-cols-1 mt-3">
                  <!-- <div class="join">
                    <button
                      class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      Short Code
                    </button>
                    <AppModuleGlobalSelectSearch
                      :placeholder="'short code ...'"
                      :label="'short_code'"
                      :code="'short_code'"
                      :minChar="0"
                      :delay="0.5"
                      :limit="10"
                      :customClass="`input input-bordered border-base-content input-sm join-item ${
                        checkbox == 'M' ? 'input-disabled' : ''
                      }`"
                      :disabled="checkbox == 'M' ? true : false"
                      :current="search.itemCode"
                      :refresh="refresh.search"
                      @updateValue="
                        (obj) => {
                          search.itemCode = obj.item_code;
                        }
                      "
                      @stopRefresh="
                        (obj) => {
                          refresh.search = obj.value;
                        }
                      "
                      :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort`"
                      :param="`&item_name=1&total=1&wh=${wh}&action=groupby-code`"
                    />
                  </div> -->
                  <div class="join">
                    <button
                      class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      สาขา
                    </button>
                    <select
                      class="join-item select select-sm select-bordered w-fit border-gray-300"
                      v-model="search.wh"
                    >
                      <option value="UBP" selected>UBP</option>
                      <option value="UBA">UBA</option>
                    </select>
                    <button
                      class="lg:block md:hidden block join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      Item Code
                    </button>
                    <AppModuleGlobalSelectSearch
                      :placeholder="'search item code ...'"
                      :label="'ItemCode'"
                      :code="'ItemCode'"
                      :minChar="0"
                      :delay="0.5"
                      :limit="10"
                      :customClass="`input input-bordered border-base-content input-sm join-item ${
                        checkbox == 'M' ? 'input-disabled' : ''
                      }`"
                      :current="search.itemCode"
                      :refresh="refresh.search"
                      @updateValue="
                        (obj) => {
                          search.itemCode = obj.ItemCode;
                        }
                      "
                      @stopRefresh="
                        (obj) => {
                          refresh.search = obj.value;
                        }
                      "
                      :url="`${this.serviceUrl}api/controllers/SAP/${search.wh}/oitm`"
                      :param="`&fg=1&total=1`"
                    />
                  </div>
                  <div class="join">
                    <button
                      class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      Production No.
                    </button>
                    <input
                      type="text"
                      placeholder="receipt no ..."
                      class="join-item input input-sm input-bordered w-full border-gray-300"
                      v-model="search.pdNo"
                    />
                  </div>
                  <div class="join">
                    <button
                      class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      Document Date
                    </button>
                    <input
                      type="date"
                      placeholder="form date"
                      class="join-item input input-sm input-bordered w-full border-gray-300"
                      v-model="search.docDate.from"
                    />
                    <button
                      class="lg:block md:hidden block join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      -
                    </button>
                    <input
                      type="date"
                      placeholder="to date"
                      class="join-item input input-sm input-bordered w-full border-gray-300"
                      v-model="search.docDate.to"
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
                <div class="grid gap-3 grid-cols-1">
                  <!-- <button
                    class="join-item btn btn-sm btn-outline btn-primary w-24" style="display: flex;"
                    @click="exportExcel('base')"
                  >
                    <Icon
                      icon="mdi:file-excel-outline"
                      class="h-5 w-5"
                    />
                    Excel
                  </button> -->
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
                <div class="overflow-x-auto w-full max-h-[47vh] my-2">
                  <div v-if="!base.loading && base.rows.length == 0">
                    <AppModuleGlobalEmptyData
                      :class="`p-4 py-12 text-3xl text-center`"
                    />
                  </div>
                  <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                    <thead>
                      <tr>
                        <td>Doc No.</td>
                        <td>Production No.</td>
                        <td>Batch No.</td>
                        <td>Item Code</td>
                        <td>Description</td>
                        <td>Doc Date</td>
                        <td class="text-right">Quantity</td>
                        <td>Unit</td>
                        <td>Whs Code</td>
                        <th class="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(v, i) in base.rows" :key="v.DocEntry" class="hover">
                        <td>{{ v.DocNum }}</td>
                        <td>{{ v.BaseRef }}</td>
                        <td>{{ v.DistNumber }}</td>
                        <td>{{ v.ItemCode }}</td>
                        <td>{{ v.Dscription }}</td>
                        <td>{{ v.DocDate ? $moment(v.DocDate.date).format("DD-MM-YYYY") : "-" }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(v.Quantity) }}</td>
                        <td>{{ v.UomCode }}</td>
                        <td>{{ v.WhsCode }}</td>
                        <th class="text-center">
                          <label
                            for="modal-base"
                            class="btn btn-primary modal-button btn-xs text-white"
                            @click="base_edit(`${v.DocEntry}`, `${i}`, 'issue')"
                          >
                            PD-Detail
                          </label>
                          :
                          <label
                            for="modal-item"
                            class="btn btn-secondary modal-button btn-xs text-white"
                            @click="base_edit(`${v.DocEntry}`, `${i}`, 'report')"
                          >
                            QC-Result
                          </label>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="grid gap-3 md:grid-cols-2 grid-cols-1">
                  <div class="text-left text-sm">
                    Show :
                    <select class="select select-bordered select-xs w-fit bg-yellow-50" 
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
  name: "TAFG",
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
      loadsupp : false,
      load: false,
      text: 'Specify Information Before Searching.',
      allow: false,
      check: 0,
      search: {
        pdNo: "",
        itemCode: "",
        docDate: {
          from: "",
          to: "",
        },
        lot: "",
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
      item: {
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
      datalist: []
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
      if (controll == 'base') {
        // return window.open(`${this.serviceUrl}api/controllers/SAP/Excel/${this.wh}/qc?for=pdreport&total=1
        //   ${this.search.pdNo ? `&pd_no=${this.search.pdNo}` : ''}${this.base.q ? `&q=${this.base.q}` : ""}
        //   ${this.search.itemCode ? `&item_code=${this.search.itemCode}` : ''}${this.search.lot ? `&lot_no=${this.search.lot}` : ""}
        //   ${this.search.docDate.from ? `&start_date=${this.search.docDate.from}` : ''}${this.search.docDate.to ? `&end_date=${this.search.docDate.to}` : ''}`);
      } else if (controll == 'detail') {
        return window.open(`${this.serviceUrl}api/controllers/SAP/Excel/${this.wh}/qc?for=detailIssue&getFor=getDetailOfIssue
          &itemCode=${this.base.form.ItemCode}&distNumber=${this.base.form.DistNumber}&docDate=${this.base.form.DocDate.date}
          &quantity=${this.base.form.Quantity}&baseRef=${this.base.form.BaseRef}&total=1`);
      } else {
        return window.open(`${this.serviceUrl}api/controllers/SAP/Excel/${this.wh}/qc?for=detailQC&getFor=getDetailOfQC&baseRef=${this.base.form.BaseRef}&total=1`);
      }
    },
    forsemi(code, batch) {
      if (!this.detail.rows.find(x => x.issue.ItemCode == code && x.issue.DistNumber == batch).contentVisible) {
        this.detail.rows.map(x => x.issue.ItemCode == code && x.issue.DistNumber == batch ? '' : x.contentVisible = false)
        this.loadsupp = true

        new Query(null,'get').get(this, `${this.serviceUrl}api/controllers/SAP/${this.search.wh}/QC/receipt?forsemi=1&total=1&item_code=${code}&lot_no=${batch}`, (res) => {
          if (!res.success) {
          } else {
            if (res.rows.length) {
              this.datalist = res.rows
              this.loadsupp = false
            } else {
              this.datalist = []
              this.loadsupp = false
            }
          }
        });
      } else {
        this.datalist = []
      }
    },
    searching() {
      this.wh = this.search.wh
      this.base.page = 1
      this.allow = true
      this.base_search();
    },
    clearing() {
      this.search.pdNo = ''
      this.search.itemCode = ''
      this.search.lot = ''
      this.search.docDate.from = ''
      this.search.docDate.to = ''

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
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/SAP/${this.search.wh}/QC/receipt?trackFG=1&total=1&page=${this.base.page}
        ${this.search.pdNo ? `&pd_no=${this.search.pdNo}` : ''}
        ${this.search.itemCode ? `&item_code=${this.search.itemCode}` : ''}
        ${this.search.lot ? `&lot_no=${this.search.lot}` : ""}
        ${this.search.docDate.from ? `&start_date=${this.search.docDate.from}` : ''}${this.search.docDate.to ? `&end_date=${this.search.docDate.to}` : ''}
        ${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
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
    base_edit(code, index, type) {
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;

      if (type == 'issue') {
        this.detail.rows = [];
        this.detail_search();
      } else {
        this.item.rows = [];
        this.item_search();
      }
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
      new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/SAP/${this.wh}/QC/old_api/grpo_report?sourceDatabase=${this.wh}&getFor=getDetailOfIssue&baseRef=${this.base.form.BaseRef}`, (res) => {
        if (res.success) {
          res.rows.forEach((x, i) => {
              !x.grpo ? x['contentVisible'] = false : ''
          })
        }
        callback({ ...res });
      });
    },
    // ITEM
    item_search() {
      this.load = true

      this.item.loading = true;
      this.item_get((res) => {
        this.item.rows = res.rows;
        this.item.total = res.total;
        this.item.next =
          this.item.page * this.item.row >= this.item.total
            ? false
            : true;
        this.item.back = this.item.page > 1 ? true : false;
        this.item.loading = false;

        setTimeout(() => {
          this.load = false
        }, 100);
      });
    },
    item_get(callback) {
      new Query('item','get').get(this, `${this.serviceUrl}api/controllers/SAP/${this.wh}/QC/old_api/grpo_report?sourceDatabase=${this.wh}&getFor=getDetailOfQC&baseRef=${this.base.form.BaseRef}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          }); 
        }
        callback({ ...res });
      });
    }
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

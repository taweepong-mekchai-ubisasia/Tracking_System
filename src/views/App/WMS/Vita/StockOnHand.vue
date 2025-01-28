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
        <div class="modal-box w-11/12 max-w-7xl">
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">Logs of {{ by.sub == 'pro' ? `Product : ${base.form.product}` : `Lot : ${base.form.lot}` }}</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 75vh;">
            <div
              v-if="detail.loading"
              class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
            >
              <AppModuleGlobalLoadingText
                :type="'text'"
                :class="`p-4 py-12 text-3xl text-center`"
              />
            </div>
            <div class="grid gap-3" :class="by.sub == 'pro' ? 'md:grid-cols-2 grid-cols-1' : 'lg:grid-cols-4 grid-cols-2'">
              <div class="join" :class="by.sub == 'pro' ? 'col-span-1' : 'col-span-2'">
                <button class="join-item btn disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content" disabled>
                  Product :
                </button>
                <input
                  type="text"
                  placeholder="description"
                  class="input input-bordered join-item w-[100%] border-gray-300"
                  :value="base.form.descrip || base.form.stock_desc"
                  readonly
                />
              </div>
              <div class="join col-span-1" v-if="by.sub != 'pro'">
                <button class="join-item btn disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content" disabled>
                  Lot :
                </button>
                <input
                  type="text"
                  placeholder="product"
                  class="input input-bordered join-item w-[100%] border-gray-300"
                  :value="base.form.lot"
                  readonly
                />
              </div>
              <div class="join col-span-1">
                <button class="join-item btn disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content" disabled>
                  Remaining :
                </button>
                <input
                  type="text"
                  placeholder="qty"
                  class="input input-bordered join-item w-[100%] border-gray-300"
                  :value="base.form.total_qty"
                  readonly
                />
              </div>
            </div>
            <div class="p-3 border-dashed border-4 border-slate-300 rounded-2xl mt-3">
              <div class="grid gap-3 grid-cols-2">
                <div class="flex justify-start">
                  <button
                    class="join-item btn btn-xs btn-outline btn-primary"
                    @click="exportExcel('detail')"
                  >
                    <Icon
                      icon="mdi:file-excel-outline"
                      class="h-4 w-4"
                    />
                    Excel
                  </button>
                </div>
                <div class="flex justify-end">
                  <AppModuleGlobalSearch
                    :class="`join-item input input-xs input-bordered border-gray-300 w-full md:max-w-xs ${detail.q ? 'bg-yellow-50 text-black' : ''}`"
                    @search="
                      (q) => {
                        detail.q = q;
                        detail.page = 1;
                        detail_search();
                      }
                    "
                  />
                </div>
              </div>
              <div class="overflow-x-auto my-3 rounded-xl max-h-[44vh]">
                <div v-if="!detail.loading && detail.rows.length == 0">
                  <AppModuleGlobalEmptyData
                    :class="`p-4 py-12 text-3xl text-center`"
                  />
                </div>
                <table class="table table-zebra table-pin-rows table-pin-cols" v-else>
                  <thead>
                    <tr class="bg-neutral text-white">
                      <td v-if="by.sub == 'pro'">Lot No.</td>
                      <td>Transaction Date</td>
                      <td>Transaction Type</td>
                      <td>Shelf Life</td>
                      <td>Manufacturing Date</td>
                      <td>Expire Date</td>
                      <td>YMD Remaining</td>
                      <td class="text-right">Quantity</td>
                      <td>Create Transaction</td>
                    </tr>
                  </thead>
                  <tbody class="text-xs">
                    <tr :class="row.type == 'add' || row.type == 'return' ? 'text-slate-500 hover' : 'text-error hover'" v-for="row in detail.rows">
                      <th v-if="by.sub == 'pro'">{{ row.lot }}</th>
                      <td>{{ $moment(row.created_at).format("DD-MM-YYYY HH:mm:ss") }}</td>
                      <td>{{ row.type }}</td>
                      <td>{{ base.form.shelf_life }}</td>
                      <td>{{ row.mfg ? $moment(row.mfg).format("DD-MM-YYYY") : '-' }}</td>
                      <td>{{ $moment(row.exp).format("DD-MM-YYYY") }}</td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="overflow-hidden text-ellipsis whitespace-nowrap">
                              {{
                                row.mfg && base.form.shelf_life
                                ? $moment
                                  .duration(
                                    $moment(row.mfg)
                                    .add(parseInt(base.form.shelf_life) + 1, "days")
                                    .diff($moment(new Date()), "days"),
                                    "days"
                                  )
                                  .years()
                                : "0"
                              }} Y
                              {{
                                row.mfg && base.form.shelf_life
                                ? $moment
                                  .duration(
                                    $moment(row.mfg)
                                    .add(parseInt(base.form.shelf_life) + 1, "days")
                                    .diff($moment(new Date()), "days"),
                                    "days"
                                  )
                                  .months()
                                : "0"
                              }} M
                              {{
                                row.mfg && base.form.shelf_life
                                ? $moment
                                  .duration(
                                    $moment(row.mfg)
                                    .add(parseInt(base.form.shelf_life) + 1, "days")
                                    .diff($moment(new Date()), "days"),
                                    "days"
                                  )
                                  .days()
                                : "0"
                              }} D
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="text-right">{{ row.quantity }}</td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div>
                              {{ $moment(row.created_at).format("DD-MM-YYYY HH:mm:ss") }}
                            </div>
                            <div class="opacity-70">
                              ( {{ row.creator_name }} )
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="grid gap-3 md:grid-cols-2 grid-cols-1">
                <div class="md:text-left text-center text-sm">
                  Show :
                  <select class="select select-bordered select-xs w-fit bg-yellow-50 text-black" 
                    v-model="detail.row" 
                    @change="detail_search()"
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </select>
                  |
                  Showing {{ detail.page == Math.ceil(detail.total/detail.row) ? 1 + (detail.row*(detail.page - 1)) : 1 + ((detail.page - 1)*detail.row) }} to {{ detail.page == Math.ceil(detail.total/detail.row) ? detail.total : detail.row*detail.page }} of {{ detail.total }} entries
                </div>
                <div class="join w-full justify-center lg:justify-end">
                  <AppModuleGlobalPageination
                    :page="detail.page"
                    :total="detail.total"
                    :row="detail.row"
                    :back="detail.back"
                    :next="detail.next"
                    :loading="detail.loading"
                    @search="
                      (res) => {
                        detail.page = res.page;
                        this.detail_search();
                      }
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #view>
      <div class="gap-3 py-3">
        <div class="card card-compact">
          <div role="tablist" class="tabs tabs-lifted">
            <input
              type="radio"
              role="tab"
              class="tab"
              name="WH"
              aria-label="WHVIT"
              @change="setCheckbox('receive', 'pro')"
              :checked="by.tab == 'receive' ? true : false"
            />
            <div
              role="tabpanel"
              class="tab-content border-base-300 card-body overflow-auto bg-base-100"
              v-if="by.tab == 'receive'"
            >
              <div role="tablist" class="tabs tabs-lifted">
                <input
                  type="radio"
                  role="tab"
                  class="tab"
                  name="FG"
                  aria-label="Product"
                  @change="setCheckbox('receive', 'pro')"
                  :checked="by.sub == 'pro' ? true : false"
                />
                <div
                  role="tabpanel"
                  class="tab-content bg-base-100 rounded-box p-4 overflow-x-auto border-gray-300"
                  v-if="by.sub == 'pro'"
                >
                  <div
                    v-if="base.loading"
                    class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
                  >
                    <AppModuleGlobalLoadingText
                      :type="'text'"
                      :class="`p-4 py-12 text-3xl text-center`"
                    />
                  </div>
                  <div class="grid gap-3 grid-cols-2 border-2 border-dashed rounded-xl p-2">
                    <div class="flex justify-start">
                      <button
                        class="join-item btn btn-sm btn-outline btn-primary"
                        @click="exportExcel('base', 'receive', 'pro')"
                      >
                        <Icon
                        icon="mdi:file-excel-outline"
                        class="h-5 w-5"
                        />
                        Excel
                      </button>
                    </div>
                    <div class="flex justify-end">
                      <AppModuleGlobalSearch
                        :class="`join-item input input-sm input-bordered border-gray-300 w-full md:max-w-xs ${base.q ? 'bg-yellow-50 text-black' : ''}`"
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
                  <div class="p-2">
                    <div class="overflow-x-auto w-full max-h-[52vh] my-2">
                      <div v-if="!base.loading && base.rows.length == 0">
                        <AppModuleGlobalEmptyData
                          :class="`p-4 py-12 text-3xl text-center`"
                        />
                      </div>
                      <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                        <thead>
                          <tr class="italic" style="z-index: 2;">
                            <td rowspan="2">Product</td>
                            <td rowspan="2" class="text-right">Shelf Life</td>
                            <td rowspan="2" colspan="2" class="text-center">Pack Size</td>
                            <td class="text-center" colspan="5">Quantities</td>
                            <td rowspan="2" colspan="2" class="text-center">Total<br>Summary</td>
                            <th rowspan="2" class="text-center">Logs</th>
                          </tr>
                          <tr class="italic" style="z-index: 1;">
                            <td class="text-right" width="6%">Received</td>
                            <td class="text-right" width="6%">Picking</td>
                            <td class="text-right" width="6%">Delivery</td>
                            <td class="text-right" width="6%">Delivered</td>
                            <td class="text-right" width="6%">Remaining</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(row, index) in base.rows" :key="row.code" 
                            :class="row.total_qty > '0' ? '' : 'text-slate-500'"
                          >
                            <td class="font-bold">{{ row.descrip }}</td>
                            <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.shelf_life) }}</td>
                            <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.pack_size) }}</td>
                            <td>{{ row.unit || '-' }}</td>
                            <td class="text-right font-medium w-24" :class="index & 1 ? 'bg-blue-300' : 'bg-blue-200'"><h3 class="text-primary-content"> {{ new Intl.NumberFormat("en-US").format(parseFloat(Math.abs(row.pick_qty)) + parseFloat(Math.abs(row.carry_qty)) + parseFloat(Math.abs(row.issue_qty)) + parseFloat(row.total_qty || 0)) }} </h3></td>
                            <td class="text-right font-medium w-24" :class="index & 1 ? 'bg-yellow-300' : 'bg-yellow-200'"><h3 class="text-primary-content"> {{ new Intl.NumberFormat("en-US").format(Math.abs(row.pick_qty)) }} </h3></td>
                            <td class="text-right font-medium w-24" :class="index & 1 ? 'bg-orange-300' : 'bg-orange-200'"><h3 class="text-primary-content"> {{ new Intl.NumberFormat("en-US").format(Math.abs(row.carry_qty)) }} </h3></td>
                            <td class="text-right font-medium w-24" :class="index & 1 ? 'bg-red-300' : 'bg-red-200'"><h3 class="text-primary-content">{{ new Intl.NumberFormat("en-US").format(Math.abs(row.issue_qty)) }} </h3></td>
                            <td class="text-right font-medium w-24" :class="index & 1 ? 'bg-emerald-300' : 'bg-emerald-200'"><h3 class="text-primary-content">{{ new Intl.NumberFormat("en-US").format(row.total_qty || 0) }} </h3></td>
                            <td class="text-right">{{ new Intl.NumberFormat("en-US").format((row.total_qty || 0)*row.pack_size) }}</td>
                            <td>{{ row.unit || '-' }}</td>
                            <th class="text-center">
                              <label
                                for="modal-base"
                                class="btn btn-ghost modal-button btn-xs text-slate-500 hover:text-black"
                                @click="base_edit(`${row.code}`, `${index}`)"
                              >
                                <span class="underline underline-offset-2">Log</span>
                              </label>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="grid gap-3 md:grid-cols-2 grid-cols-1">
                      <div class="md:text-left text-center text-sm">
                        Show :
                        <select class="select select-bordered select-xs w-fit bg-yellow-50 text-black" 
                          v-model="base.row" 
                          @change="base_search()"
                        >
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
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
                </div>
                <input
                  type="radio"
                  role="tab"
                  class="tab"
                  name="FG"
                  aria-label="Lot"
                  @change="setCheckbox('receive', 'lot')"
                  :checked="by.sub == 'lot' ? true : false"
                />
                <div
                  role="tabpanel"
                  class="tab-content bg-base-100 rounded-box p-4 overflow-x-auto border-gray-300"
                  v-if="by.sub == 'lot'"
                >
                  <div
                    v-if="base.loading"
                    class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
                  >
                    <AppModuleGlobalLoadingText
                      :type="'text'"
                      :class="`p-4 py-12 text-3xl text-center`"
                    />
                  </div>
                  <div class="grid gap-3 grid-cols-2 border-2 border-dashed rounded-xl p-2">
                    <div class="flex justify-start">
                      <button
                        class="join-item btn btn-sm btn-outline btn-primary"
                        @click="exportExcel('base', 'receive', 'lot')"
                      >
                        <Icon
                          icon="mdi:file-excel-outline"
                          class="h-5 w-5"
                        />
                        Excel
                      </button>
                    </div>
                    <div class="join w-full justify-end">
                      <AppModuleGlobalSearch
                        :class="`join-item input input-sm input-bordered border-gray-300 w-full md:max-w-xs ${base.q ? 'bg-yellow-50 text-black' : ''}`"
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
                  <div class="p-2">
                    <div class="overflow-x-auto w-full max-h-[52vh] my-2">
                      <div v-if="!base.loading && base.rows.length == 0">
                        <AppModuleGlobalEmptyData
                          :class="`p-4 py-12 text-3xl text-center`"
                        />
                      </div>
                      <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                        <thead>
                          <tr class="italic" style="z-index: 2;">
                            <td rowspan="2">Lot</td>
                            <td rowspan="2">Product</td>
                            <td rowspan="2" class="text-right">Shelf Life</td>
                            <td rowspan="2" class="text-center">MFG Date</td>
                            <td rowspan="2" class="text-center">EXP Date</td>
                            <td rowspan="2">YMD Remaining</td>
                            <td rowspan="2" colspan="2" class="text-center">Pack Size</td>
                            <td rowspan="1" colspan="5" class="text-center">Quantities</td>
                            <td rowspan="2" colspan="2" class="text-center">Total<br>Summary</td>
                            <th rowspan="2" class="text-center">Logs</th>
                          </tr>
                          <tr class="italic" style="z-index: 1;">
                            <td class="text-right">Received</td>
                            <td class="text-right">Picking</td>
                            <td class="text-right">Delivery</td>
                            <td class="text-right">Delivered</td>
                            <td class="text-right">Remaining</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(row, index) in base.rows" :key="row.code" :class="row.total_qty > '0' ? '' : 'text-slate-500'" style="word-wrap: break-word;">
                            <td class="font-bold">{{ row.lot }}</td>
                            <td>{{ row.stock_desc }}</td>
                            <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.shelf_life) }}</td>
                            <td class="text-center">{{ $moment(row.mfg).format("DD-MM-YYYY") }}</td>
                            <td class="text-center">{{ $moment(row.exp).format("DD-MM-YYYY") }}</td>
                            <td>
                              <div class="flex items-center space-x-3">
                                <div>
                                  <div class="overflow-hidden text-ellipsis whitespace-nowrap">
                                    {{
                                      row.mfg && row.shelf_life
                                      ? $moment
                                        .duration(
                                          $moment(row.mfg)
                                          .add(parseInt(row.shelf_life) + 1, "days")
                                          .diff($moment(new Date()), "days"),
                                          "days"
                                        )
                                        .years()
                                      : "0"
                                    }} Y
                                    {{
                                      row.mfg && row.shelf_life
                                      ? $moment
                                        .duration(
                                          $moment(row.mfg)
                                          .add(parseInt(row.shelf_life) + 1, "days")
                                          .diff($moment(new Date()), "days"),
                                          "days"
                                        )
                                        .months()
                                      : "0"
                                    }} M
                                    {{
                                      row.mfg && row.shelf_life
                                      ? $moment
                                        .duration(
                                          $moment(row.mfg)
                                          .add(parseInt(row.shelf_life) + 1, "days")
                                          .diff($moment(new Date()), "days"),
                                          "days"
                                        )
                                        .days()
                                      : "0"
                                    }} D
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.pack_size) }}</td>
                            <td>{{ row.unit || '-' }}</td>
                            <td class="text-right font-medium w-24" :class="index & 1 ? 'bg-blue-300' : 'bg-blue-200'"><h3 class="text-primary-content"> {{ new Intl.NumberFormat("en-US").format(parseFloat(Math.abs(row.pick_qty)) + parseFloat(Math.abs(row.carry_qty)) + parseFloat(Math.abs(row.issue_qty)) + parseFloat(row.total_qty || 0)) }} </h3></td>
                            <td class="text-right font-medium w-24" :class="index & 1 ? 'bg-yellow-300' : 'bg-yellow-200'"><h3 class="text-primary-content"> {{ new Intl.NumberFormat("en-US").format(Math.abs(row.pick_qty)) }} </h3></td>
                            <td class="text-right font-medium w-24" :class="index & 1 ? 'bg-orange-300' : 'bg-orange-200'"><h3 class="text-primary-content"> {{ new Intl.NumberFormat("en-US").format(Math.abs(row.carry_qty)) }} </h3></td>
                            <td class="text-right font-medium w-24" :class="index & 1 ? 'bg-red-300' : 'bg-red-200'"><h3 class="text-primary-content"> {{ new Intl.NumberFormat("en-US").format(Math.abs(row.issue_qty)) }} </h3></td>
                            <td class="text-right font-medium w-24" :class="index & 1 ? 'bg-emerald-300' : 'bg-emerald-200'"><h3 class="text-primary-content"> {{ new Intl.NumberFormat("en-US").format(row.total_qty || 0) }} </h3></td>
                            <td class="text-right">{{ new Intl.NumberFormat("en-US").format((row.total_qty || 0)*row.pack_size) }}</td>
                            <td>{{ row.unit || '-' }}</td>
                            <th class="text-right">
                              <label
                                for="modal-base"
                                class="btn btn-ghost modal-button btn-xs text-slate-500 hover:text-black"
                                @click="base_edit(`${row.code}`, `${index}`)"
                              >
                                <span class="underline underline-offset-2">Log</span>
                              </label>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="grid gap-3 md:grid-cols-2 grid-cols-1">
                      <div class="md:text-left text-center text-sm">
                        Show :
                        <select class="select select-bordered select-xs w-fit bg-yellow-50 text-black" 
                          v-model="base.row" 
                          @change="base_search()"
                        >
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
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
                </div>
              </div>
            </div>
            <input
              type="radio"
              role="tab"
              class="tab"
              name="WH"
              aria-label="WHVITReturn"
              @change="setCheckbox('return', null)"
              :checked="by.tab == 'return' ? true : false"
            />
            <div
              role="tabpanel"
              class="tab-content bg-base-100 border-base-300 card-body overflow-auto"
              v-if="by.tab == 'return'"
            >
              <div
                v-if="base.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :type="'text'"
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div class="grid gap-3 grid-cols-2 border-2 border-dashed rounded-xl p-2">
                <div class="flex justify-start">
                  <button
                    class="join-item btn btn-sm btn-outline btn-primary"
                    @click="exportExcel('base', 'return')"
                  >
                    <Icon
                      icon="mdi:file-excel-outline"
                      class="h-5 w-5"
                    />
                    Excel
                  </button>
                </div>
                <div class="join w-full justify-end">
                  <AppModuleGlobalSearch
                    :class="`join-item input input-sm input-bordered border-gray-300 w-full md:max-w-xs ${base.q ? 'bg-yellow-50 text-black' : ''}`"
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
              <div class="p-2">
                <div class="overflow-x-auto w-full max-h-[60vh] my-2">
                  <div v-if="!base.loading && base.rows.length == 0">
                    <AppModuleGlobalEmptyData
                      :class="`p-4 py-12 text-3xl text-center`"
                    />
                  </div>
                  <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                    <thead>
                      <tr class="italic" style="z-index: 2;">
                        <td rowspan="2">Product</td>
                        <td rowspan="2">Lot</td>
                        <td rowspan="2" class="text-right">Shelf Life</td>
                        <td rowspan="2" class="text-center">MFG Date</td>
                        <td rowspan="2" class="text-center">EXP Date</td>
                        <td rowspan="2">YMD Remaining</td>
                        <td rowspan="2" colspan="2" class="text-center">Pack Size</td>
                        <td rowspan="1" colspan="3" class="text-center">Quantities</td>
                        <td rowspan="2" colspan="2" class="text-center">Total Summary</td>
                        <th rowspan="2" class="text-center">Logs</th>
                      </tr>
                      <tr class="italic" style="z-index: 1;">
                        <td class="text-right">Total Return</td>
                        <td class="text-right">Issued</td>
                        <td class="text-right">Remaining</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in base.rows" :key="row.code" :class="row.total_qty > '0' ? '' : 'text-slate-500'" style="word-wrap: break-word;">
                        <td class="font-bold">{{ row.stock_desc }}</td>
                        <td>{{ row.lot }}</td>
                        <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.shelf_life) }}</td>
                        <td class="text-center">{{ $moment(row.mfg).format("DD-MM-YYYY") }}</td>
                        <td class="text-center">{{ $moment(row.exp).format("DD-MM-YYYY") }}</td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="overflow-hidden text-ellipsis whitespace-nowrap">
                                {{
                                  row.mfg && row.shelf_life
                                  ? $moment
                                    .duration(
                                      $moment(row.mfg)
                                      .add(parseInt(row.shelf_life) + 1, "days")
                                      .diff($moment(new Date()), "days"),
                                      "days"
                                    )
                                    .years()
                                  : "0"
                                }} Y
                                {{
                                  row.mfg && row.shelf_life
                                  ? $moment
                                    .duration(
                                      $moment(row.mfg)
                                      .add(parseInt(row.shelf_life) + 1, "days")
                                      .diff($moment(new Date()), "days"),
                                      "days"
                                    )
                                    .months()
                                  : "0"
                                }} M
                                {{
                                  row.mfg && row.shelf_life
                                  ? $moment
                                    .duration(
                                      $moment(row.mfg)
                                      .add(parseInt(row.shelf_life) + 1, "days")
                                      .diff($moment(new Date()), "days"),
                                      "days"
                                    )
                                    .days()
                                  : "0"
                                }} D
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.pack_size) }}</td>
                        <td>{{ row.unit || '-' }}</td>
                        <td class="text-right font-medium w-24" :class="index & 1 ? 'bg-blue-300' : 'bg-blue-200'"><h3 class="text-primary-content"> {{ new Intl.NumberFormat("en-US").format(parseFloat(Math.abs(row.total_qty))) }} </h3></td>
                        <td class="text-right font-medium w-24" :class="index & 1 ? 'bg-orange-300' : 'bg-orange-200'"><h3 class="text-primary-content"> {{ new Intl.NumberFormat("en-US").format(Math.abs(row.already_qty)) }} </h3></td>
                        <td class="text-right font-medium w-24" :class="index & 1 ? 'bg-emerald-300' : 'bg-emerald-200'"><h3 class="text-primary-content"> {{ new Intl.NumberFormat("en-US").format(row.total_qty - row.already_qty) }} </h3></td>
                        <td class="text-right">{{ new Intl.NumberFormat("en-US").format((row.total_qty - row.already_qty)*row.pack_size) }}</td>
                        <td>{{ row.unit || '-' }}</td>
                        <th class="text-center">
                          <label
                            for="modal-base"
                            class="btn btn-ghost modal-button btn-xs text-slate-500 hover:text-black"
                            @click="base_edit(`${row.code}`, `${index}`)"
                          >
                            <span class="underline underline-offset-2">Log</span>
                          </label>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="grid gap-3 md:grid-cols-2 grid-cols-1">
                  <div class="md:text-left text-center text-sm">
                    Show :
                    <select class="select select-bordered select-xs w-fit bg-yellow-50 text-black" 
                      v-model="base.row" 
                      @change="base_search()"
                    >
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
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
            </div>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

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
  name: "StockOnHand",
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
  props: [],
  data() {
    return {
      by: { tab: "receive", sub: "pro" },
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
      }
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
    setCheckbox(tab, sub) {
      this.by = {
        tab: tab,
        sub: sub
      };

      this.base_search()
    },
    exportExcel(controll, tab = null, sub = null) {
      if (controll == 'base') {
        if (sub == 'pro') {
          return window.open(`${
            this.serviceUrl
          }api/controllers/MYSQL/INTERNAL/WMS/exports?for=byproduct&vita=1&received=1&groupby=1&total=1${
            this.base.q ? `&q=${this.base.q}` : ""
          }`);
        } else if (sub == 'lot') {
          return window.open(`${
            this.serviceUrl
          }api/controllers/MYSQL/INTERNAL/WMS/exports?for=bylot&wh=VIT&forselect=1&total=1${
            this.base.q ? `&q=${this.base.q}` : ""
          }`);
        } else {
          return window.open(`${
            this.serviceUrl
          }api/controllers/MYSQL/INTERNAL/WMS/exports?for=byreturn&wh=VITReturn&forselect=1&total=1${
            this.base.q ? `&q=${this.base.q}` : ""
          }`);
        }
      } else {
        return window.open(`${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WMS/exports?for=forlog&${this.by.sub == 'pro' ? `parent=${this.base.form.product}&descrip=${this.base.form.descrip}` 
          : `lot=${(this.base.form.lot).replace('+','plus')}`}${this.by.tab == 'receive' ? `&wh=VIT` : `&wh=VITReturn`}&total=1${
          this.detail.q ? `&q=${this.detail.q}` : ""
        }`);
      }
    },
    dateNow() {
      let d = new Date();
      return d.getFullYear() + '-' + (d.getMonth() >= 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
    },
    ymd(start, life) {
      let expire = new Date((new Date(start)).getTime() + life * 86400E3);
      return expire.getFullYear() + '-' + (expire.getMonth() >= 9 ? expire.getMonth() + 1 : '0' + (expire.getMonth() + 1)) + '-' + (expire.getDate() > 9 ? expire.getDate() : '0' + expire.getDate());
    },
    // Base
    base_search() {
      this.base.loading = true;
      this.base_get((res) => {
        setTimeout(() => {
          this.base.rows = res.rows;
          this.base.total = res.total;
          this.base.next = this.base.page * this.base.row >= this.base.total ? false : true;
          this.base.back = this.base.page > 1 ? true : false;
          this.base.loading = false;
        }, 200);
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/${this.by.sub == 'pro' ? `prod?vita=1&received=1&groupby=1` : this.by.tab == 'receive' ? `logs?wh=VIT&forselect=1` : `logs?wh=VITReturn&forselect=1`}&total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
        if (res.success) {
          res.rows.forEach((x, i) => {
            if (this.by.tab == 'return') {
              res.rows[i]['already_qty'] = parseFloat((x.pick_qty || 0)) + parseFloat((x.carry_qty || 0)) + parseFloat((x.issue_qty || 0))
              res.rows[i]['total_qty'] = Math.abs(x.total_qty) - Math.abs(x.already_qty)
            }
          })
        }
        callback({ ...res });
      });
    },
    base_edit(code, index) {
      this.detail.page = 1
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.detail.rows = [];
      this.base.controll = "edit";
      this.detail_search();
      this.refresh = true;
    },
    // DETAIL
    detail_search() {
      this.detail.loading = true;
      this.detail_get((res) => {
        setTimeout(() => {
          this.detail.rows = res.rows;
          this.detail.total = res.total;
          this.detail.next =
            this.detail.page * this.detail.row >= this.detail.total
            ? false
            : true;
          this.detail.back = this.detail.page > 1 ? true : false;
          this.detail.loading = false;
        }, 200);
      });
    },
    detail_get(callback) {
      new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs?${this.by.sub == 'pro' ? `parent=${this.base.form.product}&descrip=${this.base.form.descrip}` : `lot=${(this.base.form.lot).replace('+','plus')}`}${
        this.by.tab == 'receive' ? `&wh=VIT` : `&wh=VITReturn`}&total=1&page=${this.detail.page}${this.detail.row ? `&rows=${this.detail.row}` : ""}${this.detail.q ? `&q=${this.detail.q}` : ""}`, (res) => {
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
  mounted() {
    this.$nextTick(() => {
      this.base_search();
    });
  },
  watch: {
    base: function (v) {
      // console.log(v);
    },
    detail: function (v) {
      // console.log(v);
    }
  }
};
</script>

<style scrop>
  .tab-content {
    border-radius: 10px 10px 10px 10px;
  }

  tr,
  td {
    white-space: nowrap;
  }
</style>

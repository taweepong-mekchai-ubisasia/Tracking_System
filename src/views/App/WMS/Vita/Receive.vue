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
        <div class="modal-box w-11/12 max-w-4xl">
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">Vita Receive</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 68vh;">
            <div class="grid gap-3 grid-cols-2 md:grid-cols-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">EN </span>
                </label>
                <input
                  type="text"
                  placeholder="ref"
                  class="input input-bordered border-gray-300"
                  :value="'EN'+base.form.en"
                  disabled
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Ref </span>
                </label>
                <input
                  type="text"
                  placeholder="ref"
                  class="input input-bordered border-gray-300"
                  v-model="base.form.ref"
                  disabled
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Invoice</span>
                </label>
                <input
                  type="text"
                  placeholder="invoice"
                  class="input input-bordered border-gray-300"
                  :value="'AE'+base.form.inv"
                  disabled
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Loading Date </span>
                </label>
                <input
                  type="date"
                  placeholder="shipping date"
                  class="input input-bordered border-gray-300 w-full"
                  v-model="base.form.load_date"
                  disabled
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Customer </span>
                </label>
                <select class="select select-bordered" v-model="base.form.customer" disabled>
                  <option value="VITA" selected>VITA</option>
                </select>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Shipping Marks </span>
                </label>
                <select class="select select-bordered" v-model="base.form.customer" disabled>
                  <option value="VITA" selected>VT2024</option>
                </select>
              </div>
              <div class="form-control col-span-2">
                <label class="label">
                  <span class="label-text font-semibold">Remark </span>
                </label>
                <input
                  type="text"
                  placeholder="remark"
                  class="input input-bordered border-gray-300"
                  v-model="base.form.remark"
                  disabled
                />
              </div>
            </div>
            <div class="mt-5">
              <div class="overflow-x-auto min-h-40 max-h-40 border">
                <table class="table table-xs table-pin-rows table-pin-cols table-zebra table-auto">
                  <thead>
                    <tr>
                      <th>Order<br>(Total {{ detail.total }})</th>
                      <td>Product</td>
                      <td class="text-right">Quantity</td>
                      <td class="text-center" colspan="2">Pack Size</td>
                      <td class="text-center" colspan="2">Net Weight</td>
                      <td>Latest Receive</td>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(row, index) in detail.rows"
                      :key="index"
                      :class="row.already_have == row.total_qty ? 'text-secondary hover:text-primary' : ''"
                    >
                      <th class="font-bold">
                        {{ index + 1 }}
                      </th>
                      <td>{{ row.descrip }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("en-US").format(Math.abs(row.already_have)) }} / {{ new Intl.NumberFormat("en-US").format(Math.abs(row.total_qty)) }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("en-US").format(Math.abs(row.pack_size)) }}</td>
                      <td>{{ row.unit }}</td>
                      <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.net_weight) }}</td>
                      <td>{{ row.unit }}</td>
                      <td v-if="base.form.status == 'receiving' || base.form.status == 'received'">
                        <div class="flex items-center space-x-3">
                          <div class="italic">
                            <div>
                              date : {{ row.last_rc_at ? $moment(row.last_rc_at.split(' ')[0]).format("DD-MM-YYYY") : '-' }}
                            </div>
                            <div>
                              time : {{ row.last_rc_at ? row.last_rc_at.split(' ')[1] : '-' }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td v-else>-</td>
                      <th class="text-right" v-if="row.already_have == row.total_qty">
                        <label
                          for="modal-detail"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="detail_edit(`${row.code}`, `${index}`)"
                        >
                          <span class="underline underline-offset-2 text-secondary hover:text-primary">Received</span>
                        </label>
                      </th>
                      <th class="text-right" v-else>
                        <label
                          for="modal-detail"
                          class="btn btn-ghost modal-button btn-xs"
                          @click="detail_edit(`${row.code}`, `${index}`)"
                        >
                          Detail
                        </label>
                      </th>
                    </tr>
                  </tbody>
                  <tfoot v-if="detail.rows.length && base.controll != 'create'">
                    <tr class="text-right">
                      <td colspan="7"></td>
                      <th colspan="2">Total Quantity : {{ sum }}</th>
                    </tr>
                    <tr class="text-right">
                      <td colspan="7"></td>
                      <th colspan="2">Total Net Weight : {{ new Intl.NumberFormat("en-US").format(total_net) }}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div class="grid gap-3 grid-cols-2">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Transaction Maker</span>
                </label>
                <input
                  type="text"
                  placeholder="ผู้ทำรายการ"
                  class="input input-bordered"
                  disabled
                  :value="base.form.creator_name ? base.form.creator_name : user.firstname+' '+user.lastname"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Status</span>
                </label>
                <label class="form-control w-full">
                  <select class="select select-bordered" v-model="base.form.status" disabled>
                    <option disabled selected value="">เลือกรายการ</option>
                    <option value="shipping">Shipping</option>
                    <option value="receiving">Receiving</option>
                    <option value="received">Received</option>
                  </select>
                </label>
              </div>
            </div>
            <div id="printMe" class="landscape:hidden">
              <div style="display: flex; justify-content: center;" v-for="row in datalist" v-if="build">
                <div style="white-space: nowrap;" align="center">
                  <h1 :style="`font-size: 60px;`">{{ base.form.en }} ({{ base.form.ref }})</h1>
                  <h1 :style="`font-size: 60px;`">PALLET NO. {{ row.pallet }}/{{ datalist.length }}</h1>
                  <h1 :style="`font-size: 60px;`">
                    {{ detail.rows.find(x => x.code == detailcode).product }} 
                    = {{ row.total }} x {{ detail.rows.find(x => x.code == detailcode).pack_size }} {{ detail.rows.find(x => x.code == detailcode).unit }}
                  </h1>
                  <div v-for="v in row.item" v-if="row.item.length">
                    <h1 :style="`font-size: 60px;`">LOT NO. {{ v.lot }} = {{ v.qty }}</h1>
                  </div>
                  <div v-else>
                    <h1 :style="`font-size: 60px;`">LOT NO. {{ row.item.lot }} = {{ row.item.qty }}</h1>
                  </div>
                  <table style="width: 100%">
                    <tr>
                      <td>
                        <VueQRCodeComponent :text="'https://tracking.ubisasia.com:8989/WMS/Vita/ScanToReceive?'+detailcode+'&'+row.pallet+'&'+row.total+'&ubis'" :size="114" />
                      </td>
                      <td>
                        <vue-barcode :value="detailcode+'&'+row.pallet+'&'+row.total+'&ubis'" :options="{ displayValue: false, width: 2.25, height: 112.5 }" tag="img"/>
                      </td>
                    </tr>
                  </table>
                </div>
                <div style="break-after:page"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- modal detail -->
      <input
        type="checkbox"
        id="modal-detail"
        class="modal-toggle"
        v-model="detail.modal"
      />
      <div class="modal" v-if="detail.modal">
        <div class="modal-box w-12/12 max-w-2xl">
          <label
            for="modal-detail"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">Product</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 60vh;">
            <div class="grid gap-3 grid-cols-1">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Product</span>
                </label>
                <input
                  type="text"
                  placeholder="description"
                  class="input input-bordered"
                  v-model="detail.form.descrip"
                  disabled
                />
              </div>
            </div>
            <div class="grid gap-3 grid-cols-3 md:grid-cols-3">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Shelf Life</span>
                </label>
                <input
                  type="text"
                  placeholder="shelf life"
                  class="input input-bordered"
                  v-model="detail.form.shelf_life"
                  disabled
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Packing</span>
                </label>
                <input
                  type="text"
                  placeholder="packing"
                  class="input input-bordered"
                  v-model="detail.form.pack_size"
                  :disabled="detail.form.pack_size == 'None' ? false : true"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Unit</span>
                </label>
                <input
                  type="text"
                  placeholder="unit"
                  class="input input-bordered"
                  v-model="detail.form.unit"
                  :disabled="detail.form.unit == 'None' ? false : true"
                />
              </div>
            </div>
            <div class="form-control mt-5">
              <div class="overflow-x-auto min-h-40 max-h-40 border">
                <table class="table table-xs table-pin-rows table-pin-cols table-zebra table-auto">
                  <thead>
                    <tr>
                      <td>Order</td>
                      <td>Lot No.</td>
                      <td>MFG</td>
                      <td>EXP</td>
                      <td>Latest Receive</td>
                      <th class="text-right">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      :class="row.already_have == row.quantity ? 'text-slate-500' : ''"
                      v-for="(row, index) in item.form"
                      :key="index"
                    >
                      <td class="font-bold">{{ index + 1 }}</td>
                      <td>{{ row.lot }}</td>
                      <td>{{ $moment(row.mfg).format("DD-MM-YYYY") }}</td>
                      <td>{{ $moment(row.exp).format("DD-MM-YYYY") }}</td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div class="italic">
                            <div>
                              date : {{ row.received_at ? $moment(row.received_at.split(' ')[0]).format("DD-MM-YYYY") : '-' }}
                            </div>
                            <div>
                              time : {{ row.received_at ? row.received_at.split(' ')[1] : '-' }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <th class="text-right">{{ new Intl.NumberFormat("en-US").format(Math.abs(row.already_have || 0)) }} / {{ new Intl.NumberFormat("en-US").format(Math.abs(row.quantity)) }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- modal remove -->
      <input
        type="checkbox"
        id="modal-remove"
        class="modal-toggle"
        v-model="remove.modal"
      />
      <div class="modal" v-if="remove.modal">
        <div class="max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert">
          <div class="flex p-4">
            <div class="flex-shrink-0">
              <svg class="size-5 text-gray-600 mt-1 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </div>
            <div class="ms-4">
              <h3 class="text-success font-semibold dark:text-white underline underline-offset-2">
                System notification
              </h3>
              <div class="mt-2 text-sm text-slate-500 dark:text-neutral-400">
                Are you sure you want to approve this item?
              </div>
              <div class="mt-4">
                <div class="flex space-x-3">
                  <label for="modal-remove" type="label" class="btn btn-xs btn-active decoration-2 font-medium text-xs text-white dark:text-blue-500">
                    Cancel
                  </label>
                  <label class="btn btn-xs btn-success decoration-2 font-semibold text-xs text-white dark:text-blue-500" @click="confirm_remove()">
                    Confirm
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- modal confirm -->
      <input
        type="checkbox"
        id="modal-confirm"
        class="modal-toggle"
        v-model="confirm.modal"
      />
      <div class="modal" v-if="confirm.modal">
        <div class="max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert">
          <div class="flex p-4">
            <div class="flex-shrink-0">
              <svg class="size-5 text-gray-600 mt-1 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </div>
            <div class="ms-4">
              <h3 class="text-error font-semibold dark:text-white underline underline-offset-2">
                System notification
              </h3>
              <div class="mt-2 text-sm text-slate-500 dark:text-neutral-400">
                Are you sure you want to reject this item?
              </div>
              <div class="mt-4">
                <div class="flex space-x-3">
                  <button type="button" class="btn btn-xs btn-active decoration-2 font-medium text-xs text-white dark:text-blue-500" @click="confirm.modal = false">
                    Cancel
                  </button>
                  <button type="button" class="btn btn-xs btn-error decoration-2 font-semibold text-xs text-white dark:text-blue-500" @click="confirm_reject()">
                    Confirm
                  </button>
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
              name="WMS"
              aria-label="Receive"
              @change="setCheckbox('receive')"
              :checked="by.tab == 'receive' ? true : false"
            />
            <div
              role="tabpanel"
              class="tab-content bg-base-100 border-base-300 card-body overflow-auto"
              v-if="by.tab == 'receive'"
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
              <div class="border-2 border-dashed rounded-xl p-2 mb-2">
                <div class="join w-full">
                  <button
                    class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    Date Type:
                  </button>
                  <select 
                    class="join-item select select-bordered select-sm border-gray-300 w-full shadow"
                    :class="base.date ? 'bg-yellow-50 text-black' : ''"
                    v-model="base.date"
                  >
                    <option value="load_date" selected>loading date</option>
                    <option value="created_at">created date</option>
                    <option value="shipped_at">shipped date</option>
                    <option value="received_at">received date</option>
                  </select>
                  <button
                    class="md:block hidden join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    Start from:
                  </button>
                  <input 
                    type="date" 
                    class="join-item input input-bordered input-sm border-gray-300 w-full shadow"
                    :class="base.from ? 'bg-yellow-50 text-black' : ''"
                    v-model="base.from"
                  />
                  <button
                    class="md:block hidden join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    -
                  </button>
                  <input 
                    type="date" 
                    class="join-item input input-bordered input-sm border-gray-300 w-full shadow"
                    :class="base.to ? 'bg-yellow-50 text-black' : ''"
                    v-model="base.to"
                  />
                  <button class="join-item btn btn-sm btn-active text-white shadow border-gray-300" 
                    @click="searching"
                  >
                    <Icon
                      icon="tabler:search"
                      class="text-white"
                      width="18" height="18"
                    />
                    <span class="md:block hidden">Search</span>
                  </button>
                </div>
              </div>
              <div class="p-2">
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
                <div class="overflow-x-auto w-full max-h-[55vh] my-2">
                  <div v-if="!base.loading && base.rows.length == 0">
                    <AppModuleGlobalEmptyData
                      :class="`p-4 py-12 text-3xl text-center`"
                    />
                  </div>
                  <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                    <thead>
                      <tr class="italic">
                        <th>EN</th>
                        <td>Status</td>
                        <td>Inv.#</td>
                        <td>Loading</td>
                        <td>Transaction Maker</td>
                        <td colspan="2">Transaction</td>
                        <td>Remarks</td>
                        <th class="text-center">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, index) in base.rows" :key="row.code">
                        <th>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div>
                                {{ row.en }}
                              </div>
                              <div class="opacity-50">
                                ( {{ row.ref }} )
                              </div>
                            </div>
                          </div>
                        </th>
                        <td>
                          <span 
                            class="badge badge-sm font-semibold italic px-4 py-2 w-20 text-base-100" 
                            :class="row.status == 'received' ? 'badge-success' : row.status == 'receiving' ? 'badge-warning' : row.status == 'shipping' ? 'badge-info' : 'badge-error'">
                              {{ row.status }}
                          </span>
                        </td>
                        <td>{{ row.inv || '-' }}</td>
                        <td class="italic">{{ row.load_date ? $moment(row.load_date).format("DD-MM-YYYY") : '-' }}</td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div>
                                {{ $moment(row.created_at).format("DD-MM-YYYY HH:mm:ss") }}
                              </div>
                              <div class="text-slate-500">
                                {{ row.creator_name }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div class="text-right">
                              <div>
                                shipped at :
                              </div>
                              <hr>
                              <div>
                                received at :
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div>
                                {{ row.shipped_at ? $moment(row.shipped_at).format("DD-MM-YYYY HH:mm:ss")  : '-' }}
                              </div>
                              <hr>
                              <div>
                                {{ row.received_at ? $moment(row.received_at).format("DD-MM-YYYY HH:mm:ss")  : '-' }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{{ row.remark || '-' }}</td>
                        <th class="text-center">
                          <label
                            class="join-item btn btn-ghost modal-button btn-xs text-slate-500 hover:text-black"
                            @click="base_edit(`${row.code}`, `${index}`)"
                            >
                            <span class="underline underline-offset-2">detail</span>
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
              name="WMS"
              aria-label="Request"
              :checked="by.tab == 'request' ? true : false"
              @change="setCheckbox('request')"
            />
            <div
              role="tabpanel"
              class="tab-content bg-base-100 border-base-300 card-body overflow-auto"
              v-if="by.tab == 'request'"
            >
              <div
                v-if="request.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :type="'text'"
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div class="flex justify-end">
                <AppModuleGlobalSearch
                      :class="`join-item input input-sm input-bordered border-gray-300 w-full md:max-w-xs ${request.q ? 'bg-yellow-50 text-black' : ''}`"
                  @search="
                    (q) => {
                      request.q = q;
                      request.page = 1;
                      request_search();
                    }
                  "
                />
              </div>
              <div class="overflow-x-auto w-full max-h-[60vh] my-2">
                <div v-if="!request.loading && request.rows.length == 0">
                  <AppModuleGlobalEmptyData
                    :class="`p-4 py-12 text-3xl text-center`"
                  />
                </div>
                <table class="table table-xs table-pin-rows table-pin-cols table-zebra" v-else>
                  <thead>
                    <tr class="italic">
                      <td>Product</td>
                      <td>Pallet</td>
                      <td>Lot No.</td>
                      <td>MFG Date</td>
                      <td>EXP Date</td>
                      <td>Request By</td>
                      <th class="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in request.rows" :key="row.code" :class="row.status == 'received' ? 'text-emerald-700' : row.status == 'receiving' ? 'text-amber-700' : ''">
                      <td class="font-bold">{{ row.stock_desc }}</td>
                      <td>{{ row.pallet }}</td>
                      <td>{{ row.lot }}</td>
                      <td class="italic">{{ $moment(row.mfg).format("DD-MM-YYYY") }}</td>
                      <td class="italic">{{ $moment(row.exp).format("DD-MM-YYYY") }}</td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div>
                              {{ $moment(row.updated_at).format("DD-MM-YYYY HH:mm:ss") }}
                            </div>
                            <div class="opacity-50">
                              {{ row.updater_name }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <th class="text-center" v-if="!row.deleted_at">
                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs text-success hover:text-black"
                          @click="
                            remove_item(
                              `${row.code}`,
                              'request',
                              'api/controllers/MYSQL/INTERNAL/WMS/logs',
                              index
                            )
                          "
                        >
                          <span class="underline underline-offset-2">approve</span>
                        </label>
                        |
                        <label
                          class="join-item btn btn-ghost modal-button btn-xs text-error hover:text-black"
                          @click="reject_request(`${index}`)"
                        >
                          reject
                        </label>
                      </th>
                      <th class="text-center" v-else>
                        <div class="badge badge-sm font-semibold italic px-4 py-2 w-20 text-base-100 badge-success">
                          approved
                        </div>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="grid gap-3 md:grid-cols-2 grid-cols-1">
                <div class="md:text-left text-center text-sm">
                  Show :
                  <select class="select select-bordered select-xs w-fit bg-yellow-50 text-black" 
                    v-model="request.row" 
                    @change="request_search()"
                  >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                  |
                  Showing {{ request.page == Math.ceil(request.total/request.row) ? 1 + (request.row*(request.page - 1)) : 1 + ((request.page - 1)*request.row) }} to {{ request.page == Math.ceil(request.total/request.row) ? request.total : request.row*request.page }} of {{ request.total }} entries
                </div>
                <div class="join w-full justify-center lg:justify-end">
                  <AppModuleGlobalPageination
                    :page="request.page"
                    :total="request.total"
                    :row="request.row"
                    :back="request.back"
                    :next="request.next"
                    :loading="request.loading"
                    @search="
                      (res) => {
                        request.page = res.page;
                        this.request_search();
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
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import VueQRCodeComponent from "vue-qrcode-component";
import VueBarcode from '@chenfengyuan/vue-barcode';
import { useToast } from "vue-toastification";
import Query from "@/assets/js/fetch.js";
import { socket } from "@/socket";

export default {
  name: "Receive",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    VueQRCodeComponent,
    VueBarcode,
  },
  setup() {
    const toast = useToast();

    return { toast }
  },
  data() {
    return {
      by: { tab: "receive" },
      print_row: '',
      detailcode: '',
      build: false,
      sum: 0,
      total_net: 0,
      refresh: false,
      datalist: [],
      base: {
        rows: [],
        total: 0,
        page: 1,
        row: 15,
        q: "",
        date: "load_date",
        from: "",
        to: "",
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
      },
      item: {
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
      request: {
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
      remove: {
        current: 0,
        model: false,
        controll: "",
        tb: "",
        index: 0
      },
      confirm: {
        modal: false,
        index: 0
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
    }
  },
  methods: {
    setCheckbox(tab) {
      this.by = {
          tab: tab,
      };
  
      this.by.tab == 'receive' ? this.base_search() : this.request_search()
    },
    dateNow() {
      let d = new Date();
      return d.getFullYear() + '-' + (d.getMonth() >= 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
    },
    ymd(start, life) {
      let expire = new Date((new Date(start)).getTime() + life * 86400E3);
      return expire.getFullYear() + '-' + (expire.getMonth() >= 9 ? expire.getMonth() + 1 : '0' + (expire.getMonth() + 1)) + '-' + (expire.getDate() > 9 ? expire.getDate() : '0' + expire.getDate());
    },
    makeid(length) {
      let result = "";
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
      }
      return result;
    },
    searching() {
      this.base.page = 1;
      this.base_search();
    },
    // Base
    base_search() {
      this.base.loading = true;
      this.base_get((res) => {
        setTimeout(() => {
          this.base.rows = res.rows;
          this.base.total = res.total;
          this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
          this.base.back = this.base.page > 1 ? true : false;
          this.base.loading = false;
        }, 200);
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/trans?status=pending&total=1&page=${this.base.page}
        ${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}
        &date=${this.base.date}&from=${this.base.from ? this.base.from : ''}&to=${this.base.to  ? this.base.to : ''}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    base_edit(code, index) {
      this.build = false
      this.sum = 0
      this.total_net = 0
  
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
        this.detail.rows = res.rows;
        this.detail.total = res.total;
        this.detail.next =
        this.detail.page * this.detail.row >= this.detail.total
          ? false
          : true;
        this.detail.back = this.detail.page > 1 ? true : false;
        this.detail.loading = false;

        this.item.rows = [];
        this.item_search();
      });
    },
    detail_get(callback) {
      new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/prod?trans_code=${this.base.form.code}&total=1`, (res) => {
        if (res.success) {
          // console.log(res.rows)
        }
        callback({ ...res });
      });
    },
    detail_edit(code, index) {
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.current = code;
      this.detail.controll = "edit";
      this.item.form = this.item.rows.filter(x => x.prod_code == this.detail.form.code);
      this.refresh = true;
    },
    // Print
    // printPaper (data) {
    //   this.detailcode = data
    //   this.datalist = JSON.parse(this.detail.rows.find(x => x.code == data).received)
    //   setTimeout(() => {
    //     this.$htmlToPaper('printMe', {styles:['/landscape.css']})
    //   }, 1000);
    // },
    // Item
    item_search() {
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

        this.base.modal = true
      });
    },
    item_get(callback) {
      new Query('item','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/item?trans_code=${this.base.form.code}&total=1`, (res) => {
        if (res.success) {
          if (this.detail.rows[0].format) {
            let receive = JSON.parse(this.detail.rows[0].format)
            let checklist = []
            res.rows.forEach((x, i) => {
              if (Array.isArray(receive)) {
                checklist[i] = 0
                receive.filter(y => y.checked).forEach(a => a.item.length ? (a.item.find(c => c.lot == x.lot) ? checklist[i] += a.item.find(c => c.lot == x.lot).qty : '') : a.item.lot == x.lot ? checklist[i] += a.item.qty : '')
                x['already_have'] = checklist[i]
              } else {
                checklist[i] = receive.checked ? receive.item.qty : 0
                x['already_have'] = checklist[i]
              }
            });

            this.detail.rows.forEach((x, i) => {
              this.sum += parseFloat(x.total_qty)
              x['net_weight'] = x.total_qty*x.pack_size
              this.total_net += x.net_weight

              checklist[i] = 0
              res.rows.filter(y => y.prod_code == x.code).forEach(v => { checklist[i] += v.already_have; })
              x['already_have'] = checklist[i]
            }) 
          }
        }
        callback({ ...res });
      });
    },
    // Request
    request_search() {
      this.request.loading = true;
      this.request_get((res) => {
        setTimeout(() => {
          this.request.rows = res.rows;
          this.request.total = res.total;
          this.request.next =
          this.request.page * this.request.row >= this.request.total ? false : true;
          this.request.back = this.request.page > 1 ? true : false;
          this.request.loading = false;
        }, 200);
      });
    },
    request_get(callback) {
      new Query('request','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs?request=1&total=1&page=${this.request.page}
        ${this.request.row ? `&rows=${this.request.row}` : ""}${this.request.q ? `&q=${this.request.q}` : ""}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    // Reject
    reject_request(index) {
      this.confirm.index = index
      this.confirm.modal = true
    },
    confirm_reject() {
      this.request.form = Object.assign({}, this.request.rows[this.confirm.index]);

      let obj = {
        rows: [
          {
            code: this.request.form.code,
            request: 0
          }
        ],
        socket: socket.id
      }

      socket.emit('delete', obj)
    },
    // REMOVE
    remove_item(code, controll, tb, index) {
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
      this.remove.index = index;
    },
    confirm_remove() {
      this.request.form = Object.assign({}, this.request.rows[this.remove.index]);
      new Query(null,'get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/prod?code=${this.request.form.ref_code}`, (res) => {
        if (res.success) {

          let temp = JSON.parse(res.rows[0].format)
          temp.forEach(x => { return x.pallet == this.request.form.pallet ? x.checked = false : '' })

          let obj = {
            rows: [
              {
                code: res.rows[0].print_code,
                format: temp
              },
            ],
            socket: socket.id,
            log: this.request.form.code
          };

          socket.emit("approve", obj);
        }
      })
    },
    approve(res) {
      if (res.socket != socket.id) {
        return
      }

      if (!res.success) {
      } else {
        this.toast.success("The item has been successfully removed.", {
          position: "top-center",
          timeout: 4000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: false,
          draggable: true,
          draggablePercent: 0.5,
          showCloseButtonOnHover: true,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false
        });
  
        this.remove.modal = false;
        this.request_search();

        let obj = { 
          rows: [
            {
              code: this.print_row.trans_code,
              status: 'receiving',
              received_by: null,
              received_at: null
            }
          ], socket: socket.id 
        }

        socket.emit("recheck", obj);
      }
    },
    reject(res) {
      if (res.socket != socket.id) {
        return
      }

      this.toast.success("Successfully rejected.", {
        position: "top-center",
        timeout: 4000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 0.5,
        showCloseButtonOnHover: true,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
      });

      this.confirm.modal = false
      this.request_search()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search()

      socket.on("connect", () => {
        console.log("CONNECT")
      });

      socket.on("disconnect", () => {
        console.log("DICONNECT")
        socket.connect()
      });
      
      socket.on("approve", this.approve);
      socket.on("delete", this.reject);
    })
  },
  unmounted() {
    socket.off("approve", this.scan);
    socket.off("delete", this.reject);
  },
  watch: {
    base: function (v) {
        // console.log(v);
    },
    detail: function (v) {
        // console.log(v);
    },
    item: function (v) {
        // console.log(v);
    }
  }
};
</script>

<style scrop>
  tr,
  td {
    white-space: nowrap;
  }
</style>

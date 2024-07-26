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
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">
            <span class="text-slate-400">Item Master:</span> {{ base.form.code }}
          </h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 76vh;">
            <div class="grid gap-3 lg:grid-cols-2 grid-cols-1">
              <div class="gap-3 justify-items-center border-2 overflow-hidden">
                <div class="avatar">
                  <div class="mask mask-square w-auto h-full">
                    <label
                      for="modal_showImage"
                      class="btn btn-link p-0 h-full"
                      @click="
                        base.form.image.length > 0
                          ? (imageSrc = `${
                            base.form.image[
                              base.form.master ? base.form.master : 0
                            ]
                              ? `${serviceUrl}tmps/image/`
                              : base.form.imageLink
                              ? `${base.form.imageLink}QAIndirectItem/${base.form.code}/`
                              : `${serviceUrl}tmps/image/`
                          }${
                            base.form.image[
                              base.form.master ? base.form.master : 0
                            ].file
                          }`)
                        : ''
                      "
                    >
                      <img
                        v-if="base.form.image.length > 0"
                        :src="`${
                          base.form.image[
                            base.form.master ? base.form.master : 0
                          ]
                            ? `${serviceUrl}tmps/image/`
                            : base.form.imageLink
                            ? `${base.form.imageLink}QAIndirectItem/${base.form.code}/`
                            : `${serviceUrl}tmps/image/`
                        }${
                          base.form.image[
                            base.form.master ? base.form.master : 0
                          ].file
                        }`"
                        alt="Image"
                        style="object-fit: contain"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div class="grid grid-rows-2 gap-3 text-left text-sm max-w-full">
                <div class="border-2 p-3 w-full">
                  <div class="block">
                    <b>ชื่อ:</b> {{ base.form.title }} ( <b>Barcode:</b> {{ base.form.ref_code || '-' }} )
                  </div>
                  <hr class="my-1 border-dashed">
                  <div>
                    <b>รายละเอียด:</b><br>{{ base.form.description }}
                  </div>
                  <hr class="my-1 border-dashed">
                  <div class="grid gap-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                    <div class="block">
                      <b>จำนวนทั้งหมด (<span class="text-sm">Receive</span>):</b><br>
                      {{ base.form.Import ? new Intl.NumberFormat("en-US").format(base.form.Import) : 0 }} {{ base.form.unit || '-' }}
                    </div>
                    <div class="block">
                      <b>ใช้ไปแล้ว (<span class="text-sm">Issue</span>):</b><br>
                      {{ base.form.Export ? new Intl.NumberFormat("en-US").format(base.form.Export) : 0 }} {{ base.form.unit || '-' }}
                    </div>
                    <div class="block">
                      <b>คงเหลือในคลัง (<span class="text-sm">Amount</span>):</b><br>
                      {{ base.form.amount ? new Intl.NumberFormat("en-US").format(base.form.amount) : 0 }} {{ base.form.unit || '-' }}
                    </div>
                  </div>
                  <hr class="my-1 border-dashed">
                  <div class="grid gap-3 grid-cols-2">
                    <div class="block">
                      <b>Current Price (avg):</b><br>
                      {{ base.form.current_price ? new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(base.form.current_price) : 0 }} ฿
                    </div>
                    <div class="block">
                      <b>Last Buy Price:</b><br>
                      {{ base.form.last_buy_price ? new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(base.form.last_buy_price) : 0 }} ฿
                    </div>
                  </div>
                </div>
                <div class="form-control border-2">
                  <div class="w-full overflow-auto max-h-[20vh]">
                    <table class="table table-xs table-pin-rows table-pin-cols table-zebra">
                      <thead>
                        <tr>
                          <td>Transaction</td>
                          <td>สร้างรายการเมื่อ</td>
                          <td>รายละเอียด</td>
                          <td>หมายเหตุ</td>
                          <th class="text-right">
                            <label
                              for="modal-detail"
                              class="btn btn-primary modal-button btn-xs text-white w-16"
                              @click="detail_create()"
                            >
                              <Icon icon="subway:add" width="12" height="12" />
                              Add
                            </label>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          class="hover"
                          v-for="(v, i) in detail.rows"
                          :key="i"
                        >
                          <td>
                            <div class="flex items-center space-x-3">
                              <div>
                                <div>
                                  {{ v.code }}
                                </div>
                                <div class="font-semibold">
                                  ( {{ v.status }} )
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="flex items-center space-x-3">
                              <div>
                                <div class="italic">
                                  {{ $moment(v.created_at).format("DD-MM-YYYY HH:mm:ss") }}
                                </div>
                                <div class="opacity-50">
                                  {{ v.created_fullname }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div class="flex items-center space-x-3">
                              <div>
                                <div>
                                  จำนวน : {{ new Intl.NumberFormat("en-US").format(v.qty) }}
                                </div>
                                <div>
                                  ราคาต่อหน่วย : {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(v.price) }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{{ v.comments || '-' }}</td>
                          <th v-if="base.form.status == 'export'">
                            {{ v.issue }}
                          </th>
                          <th v-else class="text-right">
                            <label
                              for="modal-remove"
                              class="btn btn-ghost modal-button btn-xs"
                              @click="
                                remove_item(
                                  v,
                                  `${v.code}`,
                                  'detail',
                                  'controllers/MYSQL/INTERNAL/QA/Indirect/transaction'
                                )
                              "
                              v-if="user.access.QA.QAWHIndirectReceive == 'superadmin'"
                            >
                              ลบ
                            </label>
                            <h3 class="opacity-50" v-else>superadmin<br>สามารถลบได้</h3>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
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
        <div class="modal-box relative w-11/12 max-w-md">
          <label
            for="modal-detail"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-secondary">เพิ่มจำนวน Item</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto" style="max-height: 60vh;">
            <div class="grid grid-cols-2 gap-3">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">จำนวน</span>
                </label>
                <input
                  type="number"
                  placeholder="Quantity"
                  class="input input-sm input-bordered border-gray-300 shadow"
                  min="1"
                  v-model="detail.form.qty"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">ราคา</span>
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  class="input input-sm input-bordered border-gray-300 shadow"
                  min="1"
                  v-model="detail.form.price"
                />
              </div>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">หมายเหตุ</span>
              </label>
              <textarea
                class="textarea textarea-bordered border-gray-300 w-full h-20 shadow"
                placeholder="Remarks"
                v-model="detail.form.comments"
              ></textarea>
            </div>
          </div>
          <hr />
          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
            <div class="flex-1 form-control mt-6">
              <label for="modal-detail" class="btn">
                <Icon icon="hugeicons:cancel-circle-half-dot" width="16" height="16" />
                ปิด
              </label>
            </div>
            <div class="flex-1 form-control mt-6">
              <button
                class="btn btn-primary text-white"
                @click="detail_save('static')"
              >
                <Icon icon="line-md:circle-to-confirm-circle-transition" width="16" height="16" />
                ยืนยันการบันทึก
              </button>
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
        <div class="modal-box relative w-11/12 max-w-sm">
          <label
            for="modal-remove"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-error">REMOVE TRANSACTION</h3>
          <hr class="mt-5" />
          <div class="card-body overflow-auto max-h-[60vh]">
            คุณแน่ใจหรือไม่ว่าจะลบรายการนี้?
          </div>
          <hr>
          <div class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex">
            <div class="flex-1 form-control mt-6">
              <label for="modal-remove" class="btn btn-danger">
                <Icon icon="hugeicons:cancel-circle-half-dot" width="16" height="16" />
                ปิด
              </label>
            </div>
            <div class="flex-1 form-control mt-6">
              <button
                class="btn btn-error text-white"
                @click="confirm_remove()"
              >
                <Icon icon="line-md:circle-to-confirm-circle-transition" width="16" height="16" />
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </div>
      <AppModuleGlobalShowImage :src="imageSrc" />
    </template>
    <template #view>
      <div class="gap-3 lg:px-3 lg:py-3">
        <!-- <div class="card shadow-lg bg-base-100"> -->
        <div class="card">
          <div role="tablist" class="tabs tabs-lifted">
            <input
              type="radio"
              role="tab"
              class="tab"
              name="WHI"
              aria-label="All"
              @change="setCheckbox('all')"
              :checked="by.tab == 'all' ? true : false"
              :class="'font-semibold'"
            />
            <div
              role="tabpanel"
              class="tab-content bg-base-100 border-base-300 card-body overflow-auto"
              v-if="by.tab == 'all'"
            >
            <!-- <div class="card-body overflow-auto"> -->
              <div
                v-if="base.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div class="border-2 border-dashed rounded-xl p-3">
                <div class="grid grid-cols-2 gap-3">
                  <button
                    class="join-item btn btn-xs btn-outline btn-primary w-fit"
                    @click="exportExcel('base')"
                    disabled
                  >
                    <Icon
                      icon="mdi:file-excel-outline"
                      width="16" height="16"
                    />
                    Excel
                  </button>
                  <div class="flex justify-end">
                    <AppModuleGlobalSearch
                      :class="'join-item input input-sm input-bordered border-gray-300 lg:w-1/2 w-full'"
                      @search="
                        (q) => {
                          base.page = 1;
                          base.q = q;
                          typeof base.q == 'string' ? base_search() : '';
                        }
                      "
                    />
                  </div>
                </div>
                <div class="overflow-x-auto w-full max-h-[60vh] my-3">
                  <table class="table table-xs table-pin-rows table-pin-cols table-zebra">
                    <thead>
                      <tr class="italic">
                        <th class="text-right">#</th>
                        <td>Item Code</td>
                        <!-- <td>รูปปลากรอบ</td> -->
                        <td>รูปประกอบ</td>
                        <td>ชื่อ</td>
                        <td>รายละเอียด</td>
                        <td>Status</td>
                        <!-- <td class="text-right">จำนวนทั้งหมด<br>(Receive)</td>
                        <td class="text-right">ใช้ไปแล้ว<br>(Issue)</td> -->
                        <!-- <td class="text-right">คงเหลือในคลัง<br>(Amount)</td> -->
                        <td class="text-right">คงเหลือในคลัง</td>
                        <td class="text-right">จำนวนขั้นต่ำ</td>
                        <td>หน่วย</td>
                        <td class="text-right">ราคาล่าสุด</td>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(v, i) in base.rows" :key="v.code" class="hover"
                      >
                      <!-- :class="(parseInt(v.min) >= parseInt(v.amount)) ? 'bg-red-200' : ''" -->
                        <th class="text-right font-bold">{{ v.id }}</th>
                        <td>{{ v.code }}</td>
                        <td>
                          <div class="avatar static shadow">
                            <div class="w-12 h-12 bg-white">
                              <label
                                for="modal_showImage"
                                class="btn btn-link p-0"
                                v-if="v.image.length > 0"
                                @click="
                                  v.image.length > 0
                                    ? (imageSrc = `${
                                        v.image[v.master ? v.master : 0]
                                          ? `${serviceUrl}tmps/image/`
                                          : v.imageLink
                                          ? `${v.imageLink}QAIndirectItem/${v.code}/`
                                          : `${serviceUrl}tmps/image/`
                                      }${
                                        v.image[v.master ? v.master : 0].file
                                      }`)
                                    : ''
                                "
                              >
                                <img
                                  :src="`${
                                    v.image[v.master ? v.master : 0]
                                      ? `${serviceUrl}tmps/image/`
                                      : v.imageLink
                                      ? `${v.imageLink}QAIndirectItem/${v.code}/`
                                      : `${serviceUrl}tmps/image/`
                                  }${v.image[v.master ? v.master : 0].file}`"
                                  alt="Image"
                                  style="object-fit: contain"
                                />
                              </label>
                              <img
                                width="auto"
                                height="auto"
                                class="max-h-44 object-cover bg-cover"
                                v-else
                                :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyImage.jpg&s=10`"
                                alt="Image"
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="flex items-center gap-3">
                            <div>
                              <div class="text-sm font-bold">
                                {{ v.title }}
                              </div>
                              <div>
                                ( Barcode: {{ v.ref_code || '-' }} )
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{{ v.description }}</td>
                        <td>
                          <div class="flex items-center gap-2" v-if="(parseInt(v.min) < parseInt(v.amount))"><span class="badge badge-success badge-xs"></span><span class="opacity-50">มีของเพียงพอแล้ว</span></div>
                          <div class="flex items-center gap-2" v-else><span class="badge badge-error badge-xs"></span><span class="opacity-50">ต้องเติมของเพิ่ม</span></div>
                        </td>
                        <!-- <td class="text-right">
                          {{ new Intl.NumberFormat("en-US").format(v.Import) }}
                        </td>
                        <td class="text-right">
                          {{ new Intl.NumberFormat("en-US").format(v.Export) }}
                        </td> -->
                        <td class="text-right">
                          {{ new Intl.NumberFormat("en-US").format(v.amount) }}
                        </td>
                        <td class="text-right">
                          {{ new Intl.NumberFormat("en-US").format(v.min) }}
                        </td>
                        <td>{{ v.unit || '-' }}</td>
                        <td class="text-right">
                          {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(v.current_price) }}
                        </td>
                        <th class="text-right">
                          <label
                            for="modal-base"
                            class="join-item btn btn-ghost modal-button btn-xs text-primary hover:text-black"
                            @click="base_edit(`${v.code}`, `${i}`)"
                          >
                            <span class="underline underline-offset-2">รายละเอียด</span>
                          </label>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="grid gap-3 grid-cols-2">
                  <div class="flex justify-start items-center text-sm">
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
              <!-- <h3 class="text-left font-semibold my-3">Status :</h3>
              <div class="grid md:grid-cols-2 grid-cols-1 gap-2">
                <div class="border-2 border-dashed rounded-xl p-1 flex items-center justify-center gap-3">
                  <div class="badge badge-success badge-sm"></div>
                  <h3 class="font-semibold text-sm">รายการที่มีจำนวนคงเหลือสูงกว่า minimum</h3>
                </div>
                <div class="border-2 border-dashed rounded-xl p-1 flex items-center justify-center gap-3">
                  <div class="badge badge-error badge-sm"></div>
                  <h3 class="font-semibold text-sm">รายการที่มีจำนวนคงเหลือต่ำกว่า minimum</h3>
                </div>
              </div> -->
            </div>

            <input
              type="radio"
              role="tab"
              class="tab"
              name="WHI"
              aria-label="Minimum"
              @change="setCheckbox('min')"
              :checked="by.tab == 'min' ? true : false"
              :class="'font-semibold'"
            />
            <div
              role="tabpanel"
              class="tab-content bg-base-100 border-base-300 card-body overflow-auto"
              v-if="by.tab == 'min'"
            >
            <!-- <div class="card-body overflow-auto"> -->
              <div
                v-if="base.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div class="border-2 border-dashed rounded-xl p-3">
                <div class="grid grid-cols-2 gap-3">
                  <button
                    class="join-item btn btn-xs btn-outline btn-primary w-fit"
                    @click="exportExcel('base')"
                    disabled
                  >
                    <Icon
                      icon="mdi:file-excel-outline"
                      width="16" height="16"
                    />
                    Excel
                  </button>
                  <div class="flex justify-end">
                    <AppModuleGlobalSearch
                      :class="'join-item input input-sm input-bordered border-gray-300 lg:w-1/2 w-full'"
                      @search="
                        (q) => {
                          base.page = 1;
                          base.q = q;
                          typeof base.q == 'string' ? base_search() : '';
                        }
                      "
                    />
                  </div>
                </div>
                <div class="overflow-x-auto w-full max-h-[60vh] my-3">
                  <table class="table table-xs table-pin-rows table-pin-cols table-zebra">
                    <thead>
                      <tr class="italic">
                        <th class="text-right">#</th>
                        <td>Item Code</td>
                        <td>รูปประกอบ</td>
                        <td>ชื่อ</td>
                        <td>รายละเอียด</td>
                        <td>Status</td>
                        <!-- <td class="text-right">จำนวนทั้งหมด<br>(Receive)</td>
                        <td class="text-right">ใช้ไปแล้ว<br>(Issue)</td> -->
                        <!-- <td class="text-right">คงเหลือในคลัง<br>(Amount)</td> -->
                        <td class="text-right">คงเหลือในคลัง</td>
                        <td class="text-right">จำนวนขั้นต่ำ</td>
                        <td>หน่วย</td>
                        <td class="text-right">ราคาล่าสุด</td>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(v, i) in base.rows" :key="v.code" class="hover"
                      >
                      <!-- :class="(parseInt(v.min) >= parseInt(v.amount)) ? 'bg-red-200' : ''" -->
                        <th class="text-right font-bold">{{ v.id }}</th>
                        <td>{{ v.code }}</td>
                        <td>
                          <div class="avatar static shadow">
                            <div class="w-12 h-12">
                              <label
                                for="modal_showImage"
                                class="btn btn-link p-0"
                                v-if="v.image.length > 0"
                                @click="
                                  v.image.length > 0
                                    ? (imageSrc = `${
                                        v.image[v.master ? v.master : 0]
                                          ? `${serviceUrl}tmps/image/`
                                          : v.imageLink
                                          ? `${v.imageLink}QAIndirectItem/${v.code}/`
                                          : `${serviceUrl}tmps/image/`
                                      }${
                                        v.image[v.master ? v.master : 0].file
                                      }`)
                                    : ''
                                "
                              >
                                <img
                                  :src="`${
                                    v.image[v.master ? v.master : 0]
                                      ? `${serviceUrl}tmps/image/`
                                      : v.imageLink
                                      ? `${v.imageLink}QAIndirectItem/${v.code}/`
                                      : `${serviceUrl}tmps/image/`
                                  }${v.image[v.master ? v.master : 0].file}`"
                                  alt="Image"
                                  style="object-fit: contain"
                                />
                              </label>
                              <img
                                width="auto"
                                height="auto"
                                class="max-h-44 object-cover bg-cover"
                                v-else
                                :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyImage.jpg&s=10`"
                                alt="Image"
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="flex items-center gap-3">
                            <div>
                              <div class="text-sm font-bold">
                                {{ v.title }}
                              </div>
                              <div>
                                ( Barcode: {{ v.ref_code || '-' }} )
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{{ v.description }}</td>
                        <td>
                          <div class="flex items-center gap-2" v-if="(parseInt(v.min) < parseInt(v.amount))"><span class="badge badge-success badge-xs"></span><span class="opacity-50">มีของเพียงพอแล้ว</span></div>
                          <div class="flex items-center gap-2" v-else><span class="badge badge-error badge-xs"></span><span class="opacity-50">ต้องเติมของเพิ่ม</span></div>
                        </td>
                        <!-- <td class="text-right">
                          {{ new Intl.NumberFormat("en-US").format(v.Import) }}
                        </td>
                        <td class="text-right">
                          {{ new Intl.NumberFormat("en-US").format(v.Export) }}
                        </td> -->
                        <td class="text-right">
                          {{ new Intl.NumberFormat("en-US").format(v.amount) }}
                        </td>
                        <td class="text-right">
                          {{ new Intl.NumberFormat("en-US").format(v.min) }}
                        </td>
                        <td>{{ v.unit || '-' }}</td>
                        <td class="text-right">
                          {{ new Intl.NumberFormat("th-TH", {minimumFractionDigits: 2,}).format(v.current_price) }}
                        </td>
                        <th class="text-right">
                          <label
                            for="modal-base"
                            class="join-item btn btn-ghost modal-button btn-xs text-primary hover:text-black"
                            @click="base_edit(`${v.code}`, `${i}`)"
                          >
                            <span class="underline underline-offset-2">รายละเอียด</span>
                          </label>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="grid gap-3 grid-cols-2">
                  <div class="flex justify-start items-center text-sm">
                    Showing {{ base.page == Math.ceil(base.rows.length/base.row) ? 1 + (base.row*(base.page - 1)) : 1 + ((base.page - 1)*base.row) }} to {{ base.page == Math.ceil(base.rows.length/base.row) ? base.rows.length : base.row*base.page }} of {{ base.rows.length }} entries
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
import AppModuleGlobalScannerDetect from "@/components/App/Module/Global/ScannerDetect.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "IndirectReceive",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalScannerDetect,
    AppModuleGlobalLoadingText
  },
  data() {
    return {
      by: { tab: "all" },
      loadimage: false,
      refresh: false,
      base: {
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
      remove: {
        current: 0,
        model: false,
        controll: "",
        tb: "",
      },
      imageSrc: null,
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
    setCheckbox(tab) {
      this.by = {
        tab: tab,
      };

      this.base_search()
    },
    error() {
      this.loadimage = false;
    },
    loaded() {
      this.loadimage = true;
    },
    // Base
    base_search(callback = null) {
      this.base.loading = true;
      this.base_get((res) => {
        // setTimeout(() => {
          this.base.rows = res.rows;
          this.base.total = res.total;
          this.base.next =
            this.base.page * this.base.row >= this.base.total ? false : true;
          this.base.back = this.base.page > 1 ? true : false;
          this.base.loading = false;

          callback ? callback(res) : "";
        // }, 250);
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/item?total=1${this.by.tab == 'min' ? '&having=1' : ''}&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`, (res) => {
        if (!res.success) {
          console.log(res)
        } else {
          console.log(res)
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    // base_create() {
    //   this.base.current = 0;
    //   this.base.form = {
    //     ref_code: "",
    //     title: "",
    //     description: "",
    //     imageLink: "",
    //     image: [],
    //   };
    //   this.detail.rows = [];
    //   this.scan = false;
    //   this.base.controll = "create";
    // },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.base.controll = "edit";
      this.detail.rows = [];
      this.detail_search();
      this.refresh = true;
    },
    // base_save() {
    //   let obj = {
    //     code: this.base.current,
    //     rows: [
    //       {
    //         ...Object.assign({ ...this.base.form }),
    //       },
    //     ],
    //   };

    //   new Query('base', this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/company`, obj, (res) => {
    //     if (!res.success) {
    //     // localStorage.removeItem("user_token");
    //     // this.$router.push({ name: `Login` });
    //     } else {
    //       base.page = 1;
    //       this.base.modal = false;
    //       this.base_search();
    //     }
    //   });
    // },

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
      });
    },
    detail_get(callback) {
      new Query('detail','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction?total=1&status=import&page=${
          this.detail.page
        }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
          this.detail.q ? `&q=${this.detail.q}` : ""
        }${this.base.current ? `&current=${this.base.current}` : ``}`, (res) => {
        if (res.success) {
          console.log(res.rows)
          // let count = 0
          // let sum = 0
          // res.rows.forEach((v) => {
          //   sum = sum + (parseInt(v.qty)*parseFloat(v.price))
          //   count = count + parseInt(v.qty)
          // });

          // this.base.form['avg_price'] = sum/count
        }
        callback({ ...res });
      });
    },
    detail_create() {
      this.detail.current = 0;
      this.detail.form = {
        code: "",
        qty: "",
        price: "",
        comments: "",
      };
      this.detail.controll = "create";
    },
    // detail_edit(code, index) {
    //   this.detail.current = code;
    //   this.detail.form = Object.assign({}, this.detail.rows[index]);
    //   this.detail.controll = "edit";
    // },
    detail_save(type) {
      let obj = {
        code: this.detail.current,
        rows: [
          {
            ...Object.assign({ ...this.detail.form }),
            item: this.base.current,
            title: this.base.form.title,
            status: "import",
          },
        ],
      };

      // console.log(obj)
      // return

      new Query(null, "POST").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction`, obj, (res) => {
        if (!res.success) {
          console.log(res)
        } else {
          this.detail.modal = false;
          if (type == "static") {
            this.base_search(() => {
              let index = this.base.rows.findIndex(
                (v) => v.code == this.base.current
              );
              this.base.form = { ...this.base.rows[index] };
              this.detail_search();
            });
          }
        }
      });
    },
    // REMOVE
    remove_item(v, code, controll, tb) {
      this.remove.form = v;
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    confirm_remove() {
      fetch(`${this.serviceUrl}api/${this.remove.tb}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({ rows: [{ ...this.remove.form }] }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (!res.success) {
            console.log(res)
          } else {
            this.remove.modal = false;

            this.base_search(() => {
              let index = this.base.rows.findIndex(
                (v) => v.code == this.remove.form.item
              );
              this.base.form = { ...this.base.rows[index] };
              this[`${this.remove.controll}_search`]();
            });

            // this.base_search(() => {
            //   let index = this.base.rows.findIndex(
            //     (v) => v.code == this.base.current
            //   );
            //   this.base.form = { ...this.base.rows[index] };
            // });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();
    });
  },
};
</script>

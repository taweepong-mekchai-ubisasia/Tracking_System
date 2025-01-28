<template>
  <AppLayout ref="AppLayoutComponent">
    <template #modal>
      <input
        type="checkbox"
        id="modal-base"
        class="modal-toggle"
        v-model="detail.data.form.modals.create"
      />
      <div class="modal z-60" v-if="detail.data.form.modals.create">
        <div class="modal-box w-11/12 max-w-7xl">
          <label
            @click="detail.data.form.modals.create = false"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">เพิ่มรายการอุปกรณ์เครื่องใช้สำนักงานเข้าชั้นจัดเก็บ <span class="opacity-50">( {{ detail.data.form.current }} )</span></h3>
          <hr class="my-5" />
          <div class="overflow-x-auto min-h-[48vh] max-h-[48vh]">
            <table class="table table-sm" width="100%">
              <thead>
                <tr>
                  <th>รหัส</th>
                  <th>ชื่ออุปกรณ์</th>
                  <th>หน่วยนับ</th>
                  <th>จำนวน</th>
                  <th>ราคา / หน่วย</th>
                  <th class="text-center">ลบ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in detail.data.rows.length" :key="i">
                  <td width="10%">
                    <input :value="detail?.data?.rows[i-1]?.item[0]?.item_id" type="text" class="input input-sm input-bordered w-full bg-gray-200" readonly />
                  </td>
                  <td>
                    <AppModuleGlobalCombobox
                      :url="`api/controllers/MYSQL/INTERNAL/HR/whinternal/items`"
                      :label="''"
                      :selectMode="'single'"
                      :image="false"
                      :fieldDisplay="'item_name'"
                      :imagePath="'WHinternal/item'"
                      :lastFile="''"
                      :objectData="['code', 'item_id', 'item_name', 'item_unit', 'image', 'imageLink']"
                      :inSearch="true"
                      :param="[
                        {
                          not: JSON.stringify(detail.data.rows),
                        }
                      ]"
                      v-model="detail.data.rows[i-1].item"
                    />
                  </td>
                  <td width="10%">
                    <input :value="detail?.data?.rows[i-1]?.item[0]?.item_unit" type="text" class="input input-sm input-bordered w-full bg-gray-200" readonly />
                  </td>
                  <td width="10%" v-if="detail?.data?.rows[i-1]?.item.length">
                    <input v-model="detail.data.rows[i-1].item[0].rack_item_amount" type="number" min=0 class="input input-sm input-bordered w-full" />
                  </td>
                  <td width="10%" v-else>
                    <input type="number" class="input input-sm input-bordered w-full" disabled />
                  </td>
                  <td width="10%" v-if="detail?.data?.rows[i-1]?.item.length">
                    <input v-model="detail.data.rows[i-1].item[0].item_price" type="number" min=0 step="0.01" class="input input-sm input-bordered w-full " />
                  </td>
                  <td width="10%" v-else>
                    <input type="number" class="input input-sm input-bordered w-full" disabled />
                  </td>
                  <td class="text-center" width="5%">
                    <label class="btn btn-xs modal-button btn-error text-white">
                      <Icon 
                        icon="bi:trash3" 
                        width="14" 
                        height="14" 
                        @click="fnDetail.removeRow(i-1)"
                      />
                    </label>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="text-center">
                  <td colspan="7">
                    <label 
                      class="btn btn-primary btn-sm text-white" 
                      @click="fnDetail.addRow();"
                    >
                      <Icon icon="bi:plus-circle" width="16" height="16" />เพิ่มรายการ
                    </label>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <hr class="mt-5"/>
          <div
            class="backdrop-blur sticky top-0 items-center justify-end gap-3 flex"
          >
            <div class="form-control mt-6">
              <button
                @click="detail.data.form.modals.create = false"
                class="btn btn-sm w-28"
              >
                ปิด
              </button>
            </div>
            <div class="form-control mt-6">
              <button
                class="btn btn-sm btn-info text-white w-28"
                @click="fnDetail.save()"
                :disabled="!detail?.data?.rows[0]?.item[0]?.item_name"
              >
                <Icon icon="bi:sd-card" width="18" height="18" /> บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>

      <input
        type="checkbox"
        id="modal-detail"
        class="modal-toggle"
        v-model="detail.data.form.modals.edit"
      />
      <div class="modal" v-if="detail.data.form.modals.edit">
        <div class="modal-box w-11/12 max-w-7xl">
          <label
            for="modal-detail"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">จัดการอุปกรณ์เครื่องใช้สำนักงานบนชั้นจัดเก็บ</h3>
          <hr class="my-5" />
          <div class="overflow-auto">
            <div class="grid grid-cols-4 gap-3">
              <div class="lg:col-span-1 col-span-3  h-full text-left font-bold">
                <div class="text-5xl">RACK ID:<br><span class="text-blue-500">{{ detail.data.form.object.rack_id }}</span></div>
                <hr class="my-2">
                <div>ITEM ID: <span class="text-success">{{ detail.data.form.object.item_id }}</span></div>
                <div>ITEM NAME: <span class="text-success">{{ detail.data.form.object.item_name }}</span></div>
                <div>ITEM AMOUNT: <span class="text-success">{{ detail.data.form.object.rack_item_amount }} {{ detail.data.form.object.item_unit }}</span></div>
              </div>
              <div class="lg:col-span-1 sm:col-span-1 col-span-4 h-full">
                <div class="avatar static border-2">
                  <div class="h-48 w-48 bg-white">
                    <img
                      v-if="detail.data.form.object.image.length > 0"
                      :src="`${
                        detail.data.form.object.image[detail.data.form.object.master ? detail.data.form.object.master : 0].temp
                          ? `${serviceUrl}tmps/image/`
                          : detail.data.form.object.imageLink
                          ? `${detail.data.form.object.imageLink}stationery/${detail.data.form.object.code}/`
                          : `${serviceUrl}tmps/image/`
                      }${detail.data.form.object.image[detail.data.form.object.master ? detail.data.form.object.master : 0].file}`"
                      alt="Image"
                      style="object-fit: contain;"
                    />
                    <img
                      v-else
                      width="auto"
                      height="auto"
                      class="max-h-44 object-cover bg-cover"
                      :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyImage.jpg&s=10`"
                      alt="Image"
                    />
                  </div>
                </div>
              </div>
              <div class="lg:col-span-2 col-span-4 h-[196px] bg-base-200 border-2 border-base-300 rounded-lg p-2 text-left">
                <div class="form-control">
                  <label class="label cursor-pointer flex justify-start">
                    <input type="radio" name="radio-10" class="radio radio-sm" value="MOVE" v-model="detail.data.form.object.transaction_status" />
                    <span class="ml-2 label-text">
                      <span class="font-bold"> MOVE </span>
                      หมายถึง "การย้ายสินค้าจาก Shelf ไปยังอีก Shelf"
                    </span>
                  </label>
                </div>
                <div class="form-control">
                  <label class="label cursor-pointer flex justify-start">
                    <input type="radio" name="radio-10" class="radio radio-sm" value="ISSUE" v-model="detail.data.form.object.transaction_status" />
                    <span class="ml-2 label-text">
                      <span class="font-bold"> ISSUE </span>
                      หมายถึง "การตัดสินค้าออกจาก Shelf"
                    </span>
                  </label>
                </div>
                <div class="form-control">
                  <label class="label cursor-pointer flex justify-start">
                    <input type="radio" name="radio-10" class="radio radio-sm" value="RETURN" v-model="detail.data.form.object.transaction_status" />
                    <span class="ml-2 label-text">
                      <span class="font-bold"> RETURN </span>
                      หมายถึง "การคืนสินค้าที่ถูกเบิกไปจาก User"
                    </span>
                  </label>
                </div>
                <div v-if="detail.data.form.object.transaction_status == 'MOVE'" class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Move to Rack :</span>
                  </label>
                  <select 
                    class="select select-sm select-bordered w-full" v-model="detail.data.form.object.move_to_rack"
                  >
                    <option value="" disabled selected>- เลือก rack -</option>
                    <option v-for="v in move_rack" :value="v.value" :disabled="v.text == detail.data.form.object.rack_id">{{ v.text }}</option>
                  </select>
                </div>
                <div v-if="detail.data.form.object.transaction_status == 'RETURN'" class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Form ID :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ระบุ form id"
                    class="input input-sm input-bordered w-full"
                    v-model="detail.data.form.object.form_id"
                  />
                </div>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Amount :</span>
                </label>
                <input
                  type="number"
                  placeholder="0"
                  class="input input-lg input-bordered w-full h-[74px] disabled:border-gray-400"
                  min=0
                  :max="detail.data.form.object.transaction_status != 'RETURN' ? detail.data.form.object.rack_item_amount : ''"
                  :disabled="!detail.data.form.object.transaction_status"
                  v-model="detail.data.form.object.transaction_amount"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Unit :</span>
                </label>
                <input
                  type="text"
                  placeholder="ผู้อนุมัติ"
                  class="input input-lg input-bordered bg-gray-200 text-black font-bold w-full h-[74px]"
                  readonly
                  :value="detail.data.form.object.item_unit"
                />
              </div>
              <div class="col-span-2 form-control">
                <label class="label">
                  <span class="label-text font-semibold">Comment :</span>
                </label>
                <textarea 
                  class="textarea textarea-bordered" 
                  placeholder="คำอธิบายเพิ่มเติม" 
                  rows="2"
                  v-model="detail.data.form.object.comment"
                ></textarea>
              </div>
            </div>
          </div>
          <hr class="mt-5"/>
          <div
            class="backdrop-blur sticky top-0 items-center gap-3 px-4 flex"
          >
            <div class="flex-1 form-control mt-6">
              <label for="modal-detail" class="btn"><Icon icon="bi:x-circle" width="18" height="18" /> ปิด</label>
            </div>
            <div class="flex-1 form-control mt-6">
              <button
                class="btn btn-info text-white"
                :disabled="!detail.data.form.object.transaction_status"
                @click="fnDetail.save()"
              >
                <Icon icon="bi:sd-card" width="18" height="18" /> บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>

      <input
        type="checkbox"
        id="modal-list"
        class="modal-toggle"
        v-model="detail.data.form.modal"
      />
      <div class="modal" v-if="detail.data.form.modal">
        <div class="modal-box relative w-11/12 max-w-2xl">
          <label
            @click="detail.data.form.modal = false"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div class="flex justify-center items-center gap-3">
            <h3 class="text-lg font-bold text-secondary">View Stock On Hand</h3>
          </div>
          <hr class="mt-5" />
          <div
            v-if="detail.pagination.loading"
            class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-white bg-opacity-50 top-0 left-0"
          >
            <AppModuleGlobalLoadingText
              :type="'text'"
              :class="`p-4 py-12 text-3xl text-center`"
            />
          </div>
          <div class="text-left my-1" v-else>
            <button
              class="join-item btn btn-xs btn-success w-fit"
              @click="exportExcel('base')"
            >
              <Icon
              icon="mdi:file-excel-outline"
              width="16" height="16"
              />
              Excel
            </button>
          </div>
          <div class="overflow-x-auto max-h-[60vh] my-2">
            <table class="table table-xs table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th>Rack ID</th>
                  <th>Item ID</th>
                  <td>Item Name</td>
                  <td class="text-right">Amount</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(v, i) in detail.data.rows">
                  <th>{{ v.rack_id }}</th>
                  <td>{{ v.item_id }}</td>
                  <td>{{ v.item_name }}</td>
                  <td class="text-right">{{ v.rack_item_amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <AppModuleGlobalPagination
          v-model="detail.pagination"
          @update:page="fnDetail.get"
          />
        </div>
      </div>
    </template>
    <template #view>
      <div class="drawer drawer-end absolute z-50">
        <input id="drawer-search" type="checkbox" class="drawer-toggle" v-model="drawer.data.form.modal" />
        <div class="drawer-side" v-if="drawer.data.form.modal">
          <label
            for="drawer-search"
            aria-label="close sidebar"
            class="drawer-overlay"
          ></label>
          <div 
            class="p-1 w-96 h-full bg-white text-base-content grid gap-1"
            :class="base.data.form.current != 'HO' && base.data.form.current != 'EXTRA' ? 'grid-rows-5' : 'grid-rows-1'"
          >
            <div 
              v-if="base.data.form.current != 'HO' && base.data.form.current != 'EXTRA'"
              class="border-2 overflow-x-auto" 
              v-for="i in 5"
            >
              <div class="flex justify-between p-1">
                <p class="font-bold"> {{ base.data.form.current }}{{ 6-i }} </p>
                <label
                  class="join-item btn btn-xs btn-info modal-button"
                  @click="fnDetail.create(`${base.data.form.current}${6-i}`)"
                >
                  + Add
                </label>
              </div>
              <div style="display: flex; flex-wrap: wrap;">
                <label 
                  v-for="v in drawer.data.rows.filter(x => x.rack_id == `${base.data.form.current}${6-i}`)"
                  @click="fnDetail.edit(v.rack_id, v.item_id)"
                  :class="`badge ${ findRack.find((x) => x.item_id == v.item_id) ? 'badge-error' : 'badge-primary' } hover:badge-warning m-1 text-xs text-base-100 hover:text-blck font-bold w-fit cursor-pointer`" 
                >
                  {{ v.item_name }} : {{ v.rack_item_amount }} {{ v.item_unit }}
                </label>
              </div>
            </div>
            <div 
              v-else
              class="border-2 overflow-x-auto"
            >
              <div class="flex justify-between p-1">
                <p class="font-bold"> {{ base.data.form.current }} </p>
                <label
                  class="join-item btn btn-xs btn-info modal-button"
                  @click="fnDetail.create(base.data.form.current)"
                >
                  + Add
                </label>
              </div>
              <div style="display: flex; flex-wrap: wrap;">
                <label 
                  v-for="v in drawer.data.rows.filter(x => x.rack_id == `${base.data.form.current}`)"
                  @click="fnDetail.edit(v.rack_id, v.item_id)"
                  :class="`badge ${ findRack.find((x) => x.item_id == v.item_id) ? 'badge-error' : 'badge-primary' } hover:badge-warning m-1 text-xs text-base-100 hover:text-blck font-bold w-fit cursor-pointer`" 
                >
                  {{ v.item_name }} : {{ v.rack_item_amount }} {{ v.item_unit }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-2 lg:p-4">
            <div role="tablist" class="tabs tabs-lifted">
              <input
                type="radio"
                name="warehouse_shelf"
                role="tab"
                class="tab"
                style="width: 140px"
                aria-label="แผนผังห้องจัดเก็บ"
                @change="setTab('shelf')"
                :checked="by.tab == 'shelf' ? true : false"
              />
              <div
                role="tabpanel"
                class="tab-content bg-base-100 border-base-300 rounded-box p-4"
                v-if="by.tab == 'shelf'"
              >
                <div
                  v-if="base.pagination.loading"
                  class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
                >
                  <AppModuleGlobalLoadingText
                    :class="`p-4 py-12 text-3xl text-center`"
                  />
                </div>
                <div :class="`${base.pagination.loading ? 'blur-sm' : ''}`">
                  <div ref="titleZone">
                    <div
                      class="gap-2 sm:gap-4 flex-row flex w-full justify-end items-center relative"
                    >
                      <div class="w-full lg:block hidden">
                        <h3
                          class="flex text-md text-gray-500 font-semibold gap-1"
                        >
                          <Icon
                            icon="bi:bookshelf"
                            width="20"
                            height="20"
                          />&nbsp;แผนผังห้องจัดเก็บ&nbsp;อุปกรณ์เครื่องใช้สำนักงาน
                        </h3>
                      </div>
                      <div
                        class="gap-2 flex-row flex flex-none justify-end relative"
                      >
                        <div class="join">
                          <label
                            class="btn btn-sm btn-info modal-button w-fit join-item border-base-content"
                            @click="fnDetail.search()"
                          >
                            <Icon icon="bi:table" width="16" height="16" />
                            Stock On Hand
                          </label>
                          <AppModuleGlobalSearch
                            :class="'input input-sm input-bordered border-base-content w-full max-w-sm join-item'"
                            @search="
                              (q) => {
                                base.search[0].value = q;
                                fnBase.find();
                              }
                              "
                          />
                        </div>
                      </div>
                    </div>
                    <div class="divider my-1"></div>
                  </div>
                  <!-- {{findRack}} -->
                  <div class="overflow-x-auto w-full">
                    <div class="border-2 border-dashed rounded-xl">
                      <ul class="grid gap-2 p-3 sm:grid-cols-9 grid-cols-1">
                        <li v-for="n in 18">
                          <label
                            :class="`inline-flex justify-between w-full text-gray-500 border-gray-200 rounded-lg cursor-pointer hover:opacity-90 hover:shadow-inner ${
                              n % 3 != 2
                                ? 'border-2 border-gray-500 cursor-pointer text-left p-2'
                                : ''
                            } ${
                              base.data.form.current == `${rack[n - 1]}${n < 10 ? '1' : '2'}` &&
                              drawer.data.form.modal
                                ? 'bg-success text-white'
                                : 'bg-warning'
                            }`"
                            v-if="n % 3 != 2"
                            @click="
                              fnBase.edit(`${rack[n - 1]}${n < 10 ? '1' : '2'}`)
                            "
                          >
                            <div class="w-full">
                              <div class="font-bold">
                                {{ rack[n - 1] }}{{ n < 10 ? "1" : "2" }}
                              </div>
                              <div class="w-full overflow-x-auto mt-2">
                                <table
                                  class="table table-xs rounded-lg bg-base-100 font-semibold text-gray-500"
                                >
                                  <tbody>
                                    <tr
                                      v-for="i in 5"
                                      :class="`${
                                        base.data.rows.find(
                                          (x) =>
                                            x.rack_id ==
                                            `${rack[n - 1]}${
                                              n < 10 ? '1' : '2'
                                            }${6 - i}`
                                        )
                                          ? 'bg-green-100'
                                          : ''
                                      } ${
                                        findRack.find(
                                          (x) =>
                                            x.rack_id ==
                                            `${rack[n - 1]}${
                                              n < 10 ? '1' : '2'
                                            }${6 - i}`
                                        )
                                          ? 'bg-red-200'
                                          : ''
                                      }`"
                                    >
                                      <td>
                                        {{ rack[n - 1] }}{{ n < 10 ? "1" : "2"
                                        }}{{ 6 - i }}
                                      </td>
                                      <td
                                        class="text-right"
                                        v-if="
                                          base.data.rows.find(
                                            (x) =>
                                              x.rack_id ==
                                              `${rack[n - 1]}${
                                                n < 10 ? '1' : '2'
                                              }${6 - i}`
                                          )
                                        "
                                      >
                                        <div
                                          class="badge badge-sm badge-success text-xs"
                                        >
                                          {{
                                            base.data.rows.find(
                                              (x) =>
                                                x.rack_id ==
                                                `${rack[n - 1]}${
                                                  n < 10 ? "1" : "2"
                                                }${6 - i}`
                                            )
                                              ? base.data.rows.filter(
                                                  (x) =>
                                                    x.rack_id ==
                                                    `${rack[n - 1]}${
                                                      n < 10 ? "1" : "2"
                                                    }${6 - i}`
                                                ).reduce((sum, x) => sum + parseFloat(x.rack_item_amount), 0)
                                              : ""
                                          }}
                                        </div>
                                      </td>
                                      <td
                                        class="text-right"
                                        v-else
                                      >
                                        <div
                                          class="badge badge-sm text-xs"
                                        >
                                        0
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </label>
                        </li>
                      </ul>
                      <ul class="grid gap-2 p-3 sm:grid-cols-6 grid-cols-1">
                        <li>
                          <input
                            type="radio"
                            :id="`hosting${n + 18}`"
                            name="hosting"
                            :value="`hosting${n + 18}`"
                            class="hidden peer"
                          />
                          <label
                            :class="`inline-flex justify-between w-full text-gray-500 hover:opacity-90 hover:shadow-inner`"
                          >
                            <div
                              style="
                                display: flex;
                                justify-content: center;
                                align-items: end;
                              "
                              class="border-b-8 border-b-gray-500 bg-base-100 w-full h-[176px]"
                            >
                              <div
                                class="inline-flex text-md font-semibold gap-1 text-gray-500"
                              >
                                <Icon
                                  icon="bi:door-closed"
                                  width="16"
                                  height="16"
                                />
                                เข้า-ออก
                              </div>
                            </div>
                          </label>
                        </li>
                        <li v-for="n in 5">
                          <label
                            :class="`inline-flex justify-between w-full text-gray-500 rounded-lg hover:opacity-90 hover:shadow-inner
                                border-2 border-gray-500 cursor-pointer text-left p-2 ${
                                  base.data.form.current ==
                                    (n < 4
                                      ? `${rack[n + 18 - 1]}${n}`
                                      : n == 4
                                      ? 'HO'
                                      : 'EXTRA') && drawer.data.form.modal
                                    ? 'bg-success text-white'
                                    : 'bg-warning'
                                }`"
                            @click="
                              fnBase.edit(
                                n < 4
                                  ? `${rack[n + 18 - 1]}${n}`
                                  : n == 4
                                  ? 'HO'
                                  : 'EXTRA'
                              )
                            "
                          >
                            <div class="w-full" v-if="n < 4">
                              <div class="font-bold">
                                {{ rack[n + 18 - 1] }}{{ n }}
                              </div>
                              <div class="w-full overflow-x-auto mt-2">
                                <table
                                  class="table table-xs rounded-lg bg-base-100 font-semibold text-gray-500"
                                >
                                  <tbody>
                                    <tr
                                      v-for="i in 5"
                                      :class="`$${
                                        base.data.rows.find(
                                          (x) =>
                                            x.rack_id ==
                                            `${rack[n + 18 - 1]}${n}${6 - i}`
                                        )
                                          ? 'bg-green-100'
                                          : ''
                                      } ${
                                        findRack.find(
                                          (x) =>
                                            x.rack_id ==
                                            `${rack[n + 18 - 1]}${n}${6 - i}`
                                        )
                                          ? 'bg-red-200'
                                          : ''
                                      }`"
                                    >
                                      <td>
                                        {{ rack[n + 18 - 1] }}{{ n }}{{ 6 - i }}
                                      </td>
                                      <td
                                        class="text-right"
                                        v-if="
                                          base.data.rows.find(
                                            (x) =>
                                              x.rack_id ==
                                              `${rack[n + 18 - 1]}${n}${6 - i}`
                                          )
                                        "
                                      >
                                        <div
                                          class="badge badge-sm badge-success text-xs"
                                        >
                                          {{
                                            base.data.rows.find(
                                              (x) =>
                                                x.rack_id ==
                                                `${rack[n + 18 - 1]}${n}${
                                                  6 - i
                                                }`
                                            )
                                              ? base.data.rows.filter(
                                                  (x) =>
                                                    x.rack_id ==
                                                    `${rack[n + 18 - 1]}${n}${
                                                      6 - i
                                                    }`
                                                ).reduce((sum, x) => sum + parseFloat(x.rack_item_amount), 0)
                                              : ""
                                          }}
                                        </div>
                                      </td>
                                      <td
                                        class="text-right"
                                        v-else
                                      >
                                        <div
                                          class="badge badge-sm text-xs"
                                        >
                                          0
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div class="w-full h-[156px]" v-else>
                              <div class="font-bold">
                                {{ n == 4 ? "HO" : "EXTRA" }}
                                <div class="badge badge-outline">{{ n == 4 ? "TRR" : "Black Rack" }}</div>
                              </div>
                              <div class="w-full overflow-x-auto mt-2">
                                <table
                                  class="table table-xs rounded-lg bg-base-100 font-semibold text-gray-500"
                                >
                                  <tbody>
                                    <tr
                                      :class="`${
                                        base.data.rows.find((x) =>
                                          x.rack_id.startsWith(`${n == 4 ? 'HO' : 'EXTRA'}`)
                                        )
                                          ? 'bg-green-100'
                                          : ''
                                      } ${
                                        findRack.find((x) => 
                                          x.rack_id.startsWith(`${n == 4 ? 'HO' : 'EXTRA'}`)
                                        )
                                          ? 'bg-red-200'
                                          : ''
                                      }`"
                                    >
                                      <td>
                                        {{ n == 4 ? "HO" : "EXTRA" }}
                                      </td>
                                      <td
                                        class="text-right"
                                        v-if="
                                          base.data.rows.find((x) =>
                                            x.rack_id.startsWith(
                                              `${n == 4 ? 'HO' : 'EXTRA'}`
                                            )
                                          )
                                        "
                                      >
                                        <div
                                          class="badge badge-sm badge-success text-xs"
                                        >
                                          {{
                                            base.data.rows.find((x) =>
                                              x.rack_id.startsWith(
                                                `${n == 4 ? "HO" : "EXTRA"}`
                                              )
                                            )
                                              ? base.data.rows.filter((x) =>
                                                  x.rack_id.startsWith(
                                                    `${n == 4 ? "HO" : "EXTRA"}`
                                                  )
                                                ).reduce((sum, x) => sum + parseFloat(x.rack_item_amount), 0)
                                              : ""
                                          }}
                                        </div>
                                      </td>
                                      <td
                                        class="text-right"
                                        v-else
                                      >
                                        <div
                                          class="badge badge-sm text-xs"
                                        >
                                          0
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <input
                type="radio"
                name="warehouse_shelf"
                role="tab"
                class="tab"
                style="width: 230px"
                aria-label="รายการประวัติการนำเข้า-จ่ายออก"
                :checked="by.tab == 'transaction' ? true : false"
                @change="setTab('transaction')"
              />
              <div
                role="tabpanel"
                class="tab-content bg-base-100 border-base-300 rounded-box p-4 overflow-x-auto"
                v-if="by.tab == 'transaction'"
              >
                <div
                  v-if="transaction.pagination.loading"
                  class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
                >
                  <AppModuleGlobalLoadingText
                    :class="`p-4 py-12 text-3xl text-center`"
                  />
                </div>
                <div
                  :class="`${transaction.pagination.loading ? 'blur-sm' : ''}`"
                >
                  <div ref="titleZone">
                    <div
                      class="gap-2 sm:gap-4 flex-row flex w-full justify-end items-center relative"
                    >
                      <div class="w-full md:block hidden">
                        <h3
                          class="flex text-md text-gray-500 font-semibold gap-1"
                        >
                          <Icon
                            icon="bi:clock-history"
                            width="20"
                            height="20"
                          />&nbsp;รายการข้อมูลประวัติ&nbsp;นำเข้า-จ่ายออก&nbsp;อุปกรณ์เครื่องใช้สำนักงาน&nbsp;และโรงงาน
                        </h3>
                      </div>
                      <div
                        class="gap-2 flex-row flex flex-none justify-end relative"
                      >
                        <AppModuleGlobalSearchV2
                          @update:search="fnTransaction.search"
                          v-model="transaction.search"
                          :loading="transaction.pagination.loading"
                        />
                      </div>
                    </div>
                    <div class="divider my-1"></div>
                  </div>
                  <div
                    class="overflow-x-auto w-full mb-2"
                    :style="{
                      maxHeight: contentHeight,
                      minHeight: contentHeight,
                    }"
                  >
                    <div
                      v-if="
                        !transaction.pagination.loading &&
                        transaction.data.rows.length == 0
                      "
                    >
                      <AppModuleGlobalEmptyData
                        :class="`p-4 py-12 text-3xl text-center`"
                      />
                    </div>
                    <table
                      class="table table-xs table-pin-rows table-pin-cols"
                      v-else
                    > 
                      <thead>
                        <tr class="bg-primary text-white">
                          <th class="bg-primary text-white">#</th>
                          <td>Rack</td>
                          <td>Creation</td>
                          <td>Type</td>
                          <td>Item ID</td>
                          <td>Item Name</td>
                          <td class="text-right">Quantity</td>
                          <td>Unit</td>
                          <td class="text-right">Price/Unit</td>
                          <td class="text-right">Cal Price</td>
                          <td>Form No.</td>
                          <td>Receivor</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(v, i) in transaction.data.rows"
                          class="hover"
                        >
                          <th>{{ v.id }}</th>
                          <td>{{ v.rack_id }}</td>
                          <td>
                            <div class="flex items-center gap-3">
                              <div>
                                <div>
                                  {{ v.creator_name }}
                                </div>
                                <div class="opacity-70 italic">
                                  {{
                                    $moment(v.created_at).format(
                                      "DD-MM-YYYY HH:mm:ss"
                                    )
                                  }}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{{ v.transaction_status }}</td>
                          <td>{{ v.item_id }}</td>
                          <td>{{ v.item_name || '' }}</td>
                          <td class="text-right">
                            {{ v.rack_item_amount || '' }}
                          </td>
                          <td>{{ v.item_unit || '' }}</td>
                          <td class="text-right">{{ v.cal_price ? v.cal_price/v.rack_item_amount + ' ฿' : '' }}</td>
                          <td class="text-right">{{ v.cal_price ? v.cal_price + ' ฿' : '' }}</td>
                          <td>{{ v.form_id || '' }}</td>
                          <td>
                            <div class="flex items-center gap-3">
                              <div>
                                <div>
                                  {{ v.receivor_name || '' }}
                                </div>
                                <div class="opacity-70 italic">
                                  {{ v.receive_dept || '' }}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <AppModuleGlobalPagination
                  v-model="transaction.pagination"
                  @update:page="fnTransaction.get"
                />
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
import { useStore } from "vuex";
import { useContentHeight } from "@/composables/useContentHeightDynamic";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref } from "vue";

import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalCombobox from "@/components/App/Module/Global/Combobox.vue";

export default {
  name: "Shelfs",
  components: {
    AppLayout,
    AppModuleGlobalPagination,
    AppModuleGlobalSearch,
    AppModuleGlobalSearchV2,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModuleGlobalRemove,
    AppModuleGlobalUpload,
    AppModuleGlobalCombobox
  },
  setup() {
    const store = useStore();
    configureQuery(store);

    const serviceUrl = computed(() => store.getters.serviceUrl);
    const user = computed(() => store.getters.user);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    const { contentHeight } = useContentHeight(
      AppLayoutComponent,
      titleZone,
      5.5
    );

    const move_rack = ref([
      {
        text: 'A11', value: 'A11' 
      },
      {
        text: 'A12', value: 'A12' 
      },
      {
        text: 'A13', value: 'A13' 
      },
      {
        text: 'A14', value: 'A14' 
      },
      {
        text: 'A15', value: 'A15' 
      },
      {
        text: 'A21', value: 'A21' 
      },
      {
        text: 'A22', value: 'A22' 
      },
      {
        text: 'A23', value: 'A23' 
      },
      {
        text: 'A24', value: 'A24' 
      },
      {
        text: 'A25', value: 'A25' 
      },
      {
        text: 'B11', value: 'B11' 
      },
      {
        text: 'B12', value: 'B12' 
      },
      {
        text: 'B13', value: 'B13' 
      },
      {
        text: 'B14', value: 'B14' 
      },
      {
        text: 'B15', value: 'B15' 
      },
      {
        text: 'B21', value: 'B21' 
      },
      {
        text: 'B22', value: 'B22' 
      },
      {
        text: 'B23', value: 'B23' 
      },
      {
        text: 'B24', value: 'B24' 
      },
      {
        text: 'B25', value: 'B25' 
      },
      {
        text: 'C11', value: 'C11' 
      },
      {
        text: 'C12', value: 'C12' 
      },
      {
        text: 'C13', value: 'C13' 
      },
      {
        text: 'C14', value: 'C14' 
      },
      {
        text: 'C15', value: 'C15' 
      },
      {
        text: 'C21', value: 'C21' 
      },
      {
        text: 'C22', value: 'C22' 
      },
      {
        text: 'C23', value: 'C23' 
      },
      {
        text: 'C24', value: 'C24' 
      },
      {
        text: 'C25', value: 'C25' 
      },
      {
        text: 'D11', value: 'D11' 
      },
      {
        text: 'D12', value: 'D12' 
      },
      {
        text: 'D13', value: 'D13' 
      },
      {
        text: 'D14', value: 'D14' 
      },
      {
        text: 'D15', value: 'D15' 
      },
      {
        text: 'D21', value: 'D21' 
      },
      {
        text: 'D22', value: 'D22' 
      },
      {
        text: 'D23', value: 'D23' 
      },
      {
        text: 'D24', value: 'D24' 
      },
      {
        text: 'D25', value: 'D25' 
      },
      {
        text: 'E11', value: 'E11' 
      },
      {
        text: 'E12', value: 'E12' 
      },
      {
        text: 'E13', value: 'E13' 
      },
      {
        text: 'E14', value: 'E14' 
      },
      {
        text: 'E15', value: 'E15' 
      },
      {
        text: 'E21', value: 'E21' 
      },
      {
        text: 'E22', value: 'E22' 
      },
      {
        text: 'E23', value: 'E23' 
      },
      {
        text: 'E24', value: 'E24' 
      },
      {
        text: 'E25', value: 'E25' 
      },
      {
        text: 'F11', value: 'F11' 
      },
      {
        text: 'F12', value: 'F12' 
      },
      {
        text: 'F13', value: 'F13' 
      },
      {
        text: 'F14', value: 'F14' 
      },
      {
        text: 'F15', value: 'F15' 
      },
      {
        text: 'F21', value: 'F21' 
      },
      {
        text: 'F22', value: 'F22' 
      },
      {
        text: 'F23', value: 'F23' 
      },
      {
        text: 'F24', value: 'F24' 
      },
      {
        text: 'F25', value: 'F25' 
      },
      {
        text: 'G11', value: 'G11' 
      },
      {
        text: 'G12', value: 'G12' 
      },
      {
        text: 'G13', value: 'G13' 
      },
      {
        text: 'G14', value: 'G14' 
      },
      {
        text: 'G15', value: 'G15' 
      },
      {
        text: 'G21', value: 'G21' 
      },
      {
        text: 'G22', value: 'G22' 
      },
      {
        text: 'G33', value: 'G33' 
      },
      {
        text: 'G33', value: 'G33' 
      },
      {
        text: 'G33', value: 'G33' 
      },
      {
        text: 'G33', value: 'G33' 
      },
      {
        text: 'G33', value: 'G33' 
      },
      {
        text: 'G33', value: 'G33' 
      },
      {
        text: 'G34', value: 'G34' 
      },
      {
        text: 'G35', value: 'G35' 
      },
      {
        text: 'HO', value: 'HO' 
      },
      {
        text: 'EXTRA', value: 'EXTRA' 
      }
    ]);

    const rack = ref("A0BC0DE0FA0BC0DE0FGGG");
    const by = ref({ tab: "shelf" });
    const rackId = ref("");
    const findRack = ref([]);
    const drawer = ref({
      data: {
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            item_rack: [],
          },
        },
      },
    });

    const transaction = ref({
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
            item_asset: "",
            item_id: "",
            item_name: "",
            item_unit: "",
            item_min: 0,
            image: [],
          },
        },
      },
      search: [
        {
          type: "search",
          id: "q",
          placeholder: "Search",
          label: "Search",
          value: "",
        },
        {
          type: "date",
          id: "dateFrom",
          placeholder: "Search",
          label: "Start Date",
          value: "",
        },
        {
          type: "date",
          id: "dateTo",
          placeholder: "Search",
          label: "End Date",
          value: "",
        },
      ],
    });

    const base = ref({
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
            item_asset: "",
            item_id: "",
            item_name: "",
            item_unit: "",
            item_min: 0,
            image: [],
          },
        },
      },
      search: [
        {
          type: "search",
          id: "q",
          placeholder: "Search",
          label: "Search",
          value: "",
        },
      ],
    });

    const detail = ref({
      pagination: {
        page: 1,
        row: 10,
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
          modals: {
            craete: false,
            edit: false
          },
          object: {
            item_rack: [],
          },
        },
      },
    });

    const remove = ref({
      current: 0,
      model: false,
      path: "",
      loading: false,
    });

    const setTab = (tab) => {
      by.value.tab = tab;

      by.value.tab == "shelf" ? fnBase.search() : fnTransaction.search();
    };

    const fnTransaction = {
      search: async () => {
        try {
          transaction.value.pagination.page = 1;
          await fnTransaction.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (transaction.value.pagination.loading) return;
        transaction.value.pagination.loading = true;
        try {
          const queryParams = {
            page: transaction.value.pagination.page,
            row: transaction.value.pagination.row,
            search: transaction.value.search,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/HR/whinternal/transactions"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            transaction.value.data.rows = res.rows;
            transaction.value.pagination.total = res.total;
            transaction.value.pagination.next =
              transaction.value.pagination.page *
                transaction.value.pagination.row <
              transaction.value.pagination.total;
            transaction.value.pagination.back =
              transaction.value.pagination.page > 1;
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          transaction.value.pagination.loading = false;
        }
      },
    };

    const fnBase = {
      search: async () => {
        try {
          base.value.pagination.page = 1;
          await fnBase.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (base.value.pagination.loading) return;
        base.value.pagination.loading = true;
        try {
          const queryParams = {
            page: base.value.pagination.page,
            row: base.value.pagination.row,
            // search: base.value.search,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/HR/whinternal/rack_items"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].file = v.file ? JSON.parse(v.file) : [];
              res.rows[i].master = 0;
            });

            base.value.data.rows = res.rows;
            base.value.pagination.total = res.total;
            base.value.pagination.next =
              base.value.pagination.page * base.value.pagination.row <
              base.value.pagination.total;
            base.value.pagination.back = base.value.pagination.page > 1;
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          base.value.pagination.loading = false;
        }
      },
      edit: async (rack) => {
        base.value.data.form.current = rack;
        drawer.value.data.rows = base.value.data.rows.filter(x => x.rack_id.startsWith(rack));
        drawer.value.data.form.modal = true;
      },
      find: () => {
        if (base.value.search[0].value) {
          findRack.value = base.value.data.rows.filter(
            (x) => (x.item_id).indexOf(base.value.search[0].value.toUpperCase()) > -1
          );
        } else {
          findRack.value = [];
        }
      },
      success() {
        fnBase.get();
      },
    };

    const fnDetail = {
      search: async () => {
        try {
          detail.value.pagination.page = 1;
          await fnDetail.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
        if (detail.value.pagination.loading) return;
        detail.value.pagination.loading = true;
        try {
          const queryParams = {
            page: detail.value.pagination.page,
            row: detail.value.pagination.row,
            search: detail.value.search,
            // item_id: detail.value.data.form.current,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/HR/whinternal/rack_items"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            detail.value.data.rows = res.rows;
            detail.value.pagination.total = res.total;
            detail.value.pagination.next =
              detail.value.pagination.page * detail.value.pagination.row <
              detail.value.pagination.total;
            detail.value.pagination.back = detail.value.pagination.page > 1;
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          detail.value.pagination.loading = false;

          detail.value.data.form.modal = true;
        }
      },
      create: (rack) => {
        detail.value.data.form.current = rack;
        detail.value.data.rows = [{
          'item': [{
            item_id: '',
            item_name: '',
            item_unit: '',
            rack_item_amount: '',
            item_price: '',
          }],
        }]

        detail.value.data.form.method = "POST";
        detail.value.data.form.modals.create = true;
      },
      edit: (rack, item) => {
        detail.value.data.form.current = rack;
        detail.value.data.form.object = drawer.value.data.rows.find(x => x.rack_id == rack && x.item_id == item)
        detail.value.data.form.object['move_to_rack'] = ''

        // console.log(detail.value.data.form.object)
        // detail.value.data.form.method = "PUT";
        detail.value.data.form.method = "POST";
        detail.value.data.form.modals.edit = true;
      },
      addRow: () => {
        detail.value.data.rows[detail.value.data.rows.length] = {
          'item': [{
            item_id: '',
            item_name: '',
            item_unit: '',
            rack_item_amount: '',
            item_price: '',
          }] 
        }
      },
      removeRow: (index) => {
        detail.value.data.rows = detail.value.data.rows.filter((x, i) => i != index)
      },
      save: async () => {
        if (detail.value.data.form.loading) return;
        detail.value.data.form.loading = true;
        try {
          if (detail.value.data.form.modals.create) 
          {
            let rowData = [];
            detail.value.data.rows.forEach((x, i) => {
              rowData[i] = x.item[0];
              rowData[i]['rack_id'] = detail.value.data.form.current;
              rowData[i]['transaction_status'] = 'ADD';
              rowData[i]['cal_price'] = x.item[0].rack_item_amount * x.item[0].item_price;
            })
  
            const queryBody = {
              code: detail.value.data.form.current,
              rows: rowData
            };
            const path = buildPath(
              null,
              "api/controllers/MYSQL/INTERNAL/HR/whinternal/transactions"
            );
            const method = detail.value.data.form.method || "POST";
            const res = await fetchQuery({}, method, path, queryBody);
  
            if (!res.success) {
              console.error("Failed to save data");
              return;
            }
  
            if (detail.value.data.form.current === 0) {
              detail.value.data.form.current = res.rows[0].code;
            }

            detail.value.data.form.modals.create = false;
          }
          else 
          {
            const queryBody = {
              code: detail.value.data.form.current,
              rows: [
                {
                  ...detail.value.data.form.object,
                }
              ],
            };
            const path = buildPath(
              null,
              "api/controllers/MYSQL/INTERNAL/HR/whinternal/transactions"
            );
            const method = detail.value.data.form.method || "POST";
            const res = await fetchQuery({}, method, path, queryBody);
  
            if (!res.success) {
              console.error("Failed to save data");
              return;
            }
  
            if (detail.value.data.form.current === 0) {
              detail.value.data.form.current = res.rows[0].code;
            }

            detail.value.data.form.modals.edit = false;
          }
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          detail.value.data.form.loading = false;

          await fnBase.search();
          fnBase.edit(base.value.data.form.current);
        }
      },
      success() {
        // base.value.pagination.page = 1;
        fnDetail.get();
      },
    };

    const fnRemove = {
      item: (code, path) => {
        remove.value.modal = true;
        remove.value.code = code;
        remove.value.path = path;
      },
      all_item: (rows, path) => {
        remove.value.modal = true;
        remove.value.rows = rows;
        remove.value.path = path;
      },
      success: () => {
        remove.value.modal = false;
        base.value.pagination.page = 1;
        fnBase.search();
      },
    };

    setTab("shelf");
    // setTab("transaction");

    return {
      setTab,
      by,
      move_rack,
      base,
      fnBase,
      transaction,
      fnTransaction,
      detail,
      fnDetail,
      remove,
      fnRemove,
      AppLayoutComponent,
      titleZone,
      contentHeight,
      serviceUrl,
      user,
      drawer,
      rack,
      rackId,
      findRack,
    };
  },
  watch: {
    'detail.data.form.object.transaction_status': function (v) {
      if (v) {
        v != 'RETURN' ? this.detail.data.form.object.transaction_amount = this.detail.data.form.object.rack_item_amount : '';
      }
    }
  }
};
</script>

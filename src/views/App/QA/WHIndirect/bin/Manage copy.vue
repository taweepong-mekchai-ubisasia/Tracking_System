<template>
  <div class="Department">
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
          <div class="modal-box relative w-10/12 md:w-6/12 max-w-6xl">
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold">
              Request {{ base.form.status ? base.form.status : "Item" }}
            </h3>
            <div v-if="vers == 1">
              <div class="card">
                <div class="card-body">
                  <!-- <div class="form-control" v-if="scan">
                    <AppModuleGlobalScannerDetect @response="responseScan" />
                  </div> -->
                  <!-- {{ this.base.form.scan }} -->
                  <div class="form-control">
                    <label class="label"
                      ><span class="label-text">Short code</span>
                    </label>
                    <div class="join w-full">
                      <!-- <div> -->
                      <!-- <div> -->
                      <AppModuleGlobalSelectSearch
                        v-if="base.modal && base.controll == 'create'"
                        :placeholder="'Short code'"
                        :label="'title'"
                        :code="'code'"
                        :minChar="3"
                        :delay="0.5"
                        :limit="10"
                        :customClass="`join-item join w-full input input-bordered border-base-content ${
                          checkbox == 'M' ? 'input-disabled' : ''
                        }`"
                        :disabled="checkbox == 'M' ? true : false"
                        :current="base.form.item_short_code"
                        :refresh="refresh.item_short_code"
                        :image="true"
                        @updateValue="
                          (obj) => {
                            base.form.item_short = obj;
                            base.form.item_short_code = obj.short_code;
                            // base.form.item_short.code = obj.code;
                          }
                        "
                        @stopRefresh="
                          (obj) => {
                            refresh.item_short_code = obj.value;
                          }
                        "
                        :url="`${serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/item`"
                        :param="`&total=1&wh=${user.branchTitle}&action=groupby-code`"
                      />
                      <input
                        v-else
                        type="text"
                        placeholder="Short code"
                        class="input input-bordered border-base-content input-disabled"
                        required=""
                        v-model="base.form.item_short_code"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="form-control">
                    <label class="label"
                      ><span class="label-text">Item Description</span>
                    </label>

                    <select
                      v-if="base.controll == 'create'"
                      class="select select-bordered border-base-content w-full"
                      v-model="base.form.item_code"
                    >
                      <option disabled selected value="">Select Option</option>
                      <option v-for="(v, i) in item.rows" :value="v.item_code">
                        {{ v.item_name }}
                      </option>
                    </select>

                    <input
                      v-else
                      type="text"
                      placeholder="Short code"
                      class="input input-bordered border-base-content input-disabled"
                      required=""
                      v-model="base.form.item_short_code"
                      disabled
                    />
                  </div>
                  <div class="form-control">
                    <label class="label"
                      ><span class="label-text">Item Code</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Item Code"
                      class="input input-bordered border-base-content"
                      required=""
                      v-model="base.form.item_code"
                      disabled
                    />
                  </div>
                  <div class="grid grid-cols-2 w-full gap-4">
                    <div class="flex-1 w-auto">
                      <div class="form-control">
                        <label class="label">
                          <span class="label-text">Qty</span>
                        </label>
                        <input
                          type="number"
                          placeholder="Qty"
                          class="input input-bordered border-base-content"
                          required=""
                          min="1"
                          max="5"
                          v-model="base.form.unit"
                          :disabled="base.form.status ? true : false"
                        />
                      </div>
                    </div>
                    <div class="flex-1 w-auto">
                      <div class="form-control">
                        <label class="label"
                          ><span class="label-text">Unit</span></label
                        >
                        <input
                          type="text"
                          placeholder="Unit"
                          class="input input-bordered border-base-content w-full input-disabled"
                          required=""
                          v-model="base.form.uom"
                          readonly
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-control">
                    <label class="label"
                      ><span class="label-text">Status</span>
                    </label>
                    <label class="form-control w-full">
                      <select
                        class="select select-bordered border-base-content"
                        v-model="base.form.newStatus"
                        :disabled="
                          base.form.status == 'cancel' ||
                          base.form.status == 'reject'
                        "
                      >
                        <option
                          selected
                          value=""
                          :disabled="base.controll != 'create'"
                        >
                          Select Option
                        </option>
                        <option
                          value="pending"
                          :disabled="
                            base.form.status == 'approve' ||
                            base.form.status == 'reject'
                          "
                        >
                          Request
                        </option>
                        <option value="approve" disabled>Approve</option>
                        <option value="reject" disabled>Reject</option>
                        <option
                          value="cancel"
                          :disabled="base.controll == 'create'"
                        >
                          Cancel
                        </option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="vers == 2">
              <div class="card">
                <div class="card-body">
                  <div
                    class="form-control"
                    v-if="!vers2Active && !base.form.status"
                  >
                    <div
                      class="flex flex-col w-full border-opacity-50 lg:flex-row justify-center items-center content-center"
                    >
                      <div
                        class="grid h-40 card rounded-box place-items-center"
                      >
                        <button
                          class="btn join-item btn-primary w-40 h-40"
                          @click="vers = 1"
                        >
                          <Icon
                            icon="lucide:text-cursor-input"
                            class="w-40 h-40 text-white"
                          />
                        </button>
                      </div>
                      <div class="lg:hidden divider">OR</div>
                      <div
                        class="lg:pl-4 grid h-40 card rounded-box place-items-center"
                      >
                        <button
                          class="btn join-item btn-info w-40 h-40"
                          @click="vers2Active = true"
                        >
                          <Icon
                            icon="tdesign:scan"
                            class="w-40 h-40 text-white"
                          />
                          <!-- <iconify-icon icon="lucide:text-cursor-input"></iconify-icon> -->
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="form-control"
                    v-if="vers2Active && !base.form.status"
                  >
                    <div
                      class="flex flex-col w-full border-opacity-50 lg:flex-row justify-center items-center content-center lg:pr-4"
                    >
                      <div
                        class="grid h-40 card rounded-box place-items-center"
                      >
                        <button
                          class="btn join-item btn-primary w-40 h-40"
                          @click="base.form.status = 'import'"
                        >
                          <Icon
                            icon="pajamas:import"
                            class="w-40 h-40 text-white"
                          />
                        </button>
                      </div>
                      <div class="lg:hidden divider">OR</div>
                      <div
                        class="lg:pl-4 grid h-40 card rounded-box place-items-center"
                      >
                        <button
                          class="btn join-item btn-info w-40 h-40"
                          @click="base.form.status = 'export'"
                        >
                          <Icon
                            icon="pajamas:export"
                            class="w-40 h-40 text-white"
                          />
                          <!-- <iconify-icon icon="lucide:text-cursor-input"></iconify-icon> -->
                        </button>
                      </div>
                    </div>
                  </div>

                  <template v-if="vers2Active && base.form.status">
                    <!-- {{ this.base.form.scan }} -->
                    <!-- base.form.status -->
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text"
                          >Document Request Reference</span
                        >
                      </label>
                      <input
                        type="text"
                        placeholder="Item Code"
                        class="input input-bordered border-base-content"
                        required=""
                        v-model="base.form.doc"
                        v-if="base.form.status != 'export'"
                      />

                      <AppModuleGlobalSelectSearch
                        v-else-if="base.modal && base.controll == 'create'"
                        :placeholder="'Document Request Reference'"
                        :label="'title'"
                        :code="'code'"
                        :minChar="3"
                        :delay="0.5"
                        :limit="10"
                        :customClass="`join-item join w-full input input-bordered border-base-content ${
                          checkbox == 'M' ? 'input-disabled' : ''
                        }`"
                        :disabled="checkbox == 'M' ? true : false"
                        :current="base.form.doc"
                        :refresh="refresh.item_short_code"
                        :image="true"
                        @updateValue="
                          (obj) => {
                            // base.form.item_short = obj;
                            base.form.doc = obj.code;
                            req_item_search((res) => {
                              this.detail.rows = res.rows;
                              this.detail.total = res.total;

                              // this.detail.rows = res.rows
                            });
                            // base.form.item_short.code = obj.code;
                          }
                        "
                        @stopRefresh="
                          (obj) => {
                            refresh.item_short_code = obj.value;
                          }
                        "
                        :url="`${serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/request`"
                        :param="`&total=1`"
                      />
                    </div>
                    
                    <div
                      class="form-control"
                      v-if="
                        (base.form.doc && base.form.status == 'export') ||
                        (!base.form.doc && base.form.status != 'export')
                      "
                    >
                      <AppModuleGlobalScannerDetect @response="responseScan" />
                    </div>

                    <!-- <div class="grid grid-cols-2 w-full gap-4">
                      <div class="flex-1 w-auto">
                        <div class="form-control">
                          <label class="label">
                            <span class="label-text">Qty</span>
                          </label>
                          <input
                            type="number"
                            placeholder="Qty"
                            class="input input-bordered border-base-content"
                            required=""
                            min="1"
                            max="5"
                            v-model="base.form.unit"
                            :disabled="base.form.status ? true : false"
                          />
                        </div>
                      </div>
                      <div class="flex-1 w-auto">
                        <div class="form-control">
                          <label class="label"
                            ><span class="label-text">Unit</span></label
                          >
                          <input
                            type="text"
                            placeholder="Unit"
                            class="input input-bordered border-base-content w-full input-disabled"
                            required=""
                            v-model="base.form.uom"
                            readonly
                          />
                        </div>
                      </div>
                    </div> -->

                    <!-- <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Status</span>
                      </label>
                      <label class="form-control w-full">
                        <select
                          class="select select-bordered border-base-content"
                          v-model="base.form.newStatus"
                          :disabled="
                            base.form.status == 'cancel' ||
                            base.form.status == 'reject'
                          "
                        >
                          <option
                            selected
                            value=""
                            :disabled="base.controll != 'create'"
                          >
                            Select Option
                          </option>
                          <option
                            value="pending"
                            :disabled="
                              base.form.status == 'approve' ||
                              base.form.status == 'reject'
                            "
                          >
                            Recive
                          </option>
                          <option value="approve" disabled>Approve</option>
                          <option value="reject" disabled>Reject</option>
                          <option
                            value="cancel"
                            :disabled="base.controll == 'create'"
                          >
                            Cancel
                          </option>
                        </select>
                      </label>
                    </div> -->

                    <div class="form-control pt-4">
                      <div class="w-full overflow-auto">
                        <label class="label cursor-pointer">
                          <span class="label-text">Item List</span>
                        </label>
                        <!-- {{ detail.rows }} -->
                        <table
                          class="table table-xs table-pin-rows table-pin-cols table-zebra"
                        >
                          <thead>
                            <tr>
                              <!-- <th>Active</th> -->

                              <th>code</th>
                              <!-- <th>imageLink</th> -->
                              <td>title</td>
                              <td>Qty</td>
                              <td>
                                {{
                                  base.form.status == "export" ? "Issue" : ""
                                }}
                              </td>
                              <!-- <th>Color</th>

                        <th>Price</th>8850029031828

                        <th>Link</th> -->
                              <!-- <th class="text-right">
                                <label
                                  for="modal-detail"
                                  class="btn btn-primary modal-button btn-xs text-white"
                                  @click="detail_create()"
                                  >+ new
                                </label>
                              </th> -->
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              class="hover"
                              v-for="(v, i) in detail.rows"
                              :key="i"
                            >
                              <th>
                                {{ v.code }}
                                <!-- <div class="flex items-center space-x-3">
                                  <input
                                    type="checkbox"
                                    :checked="v.code == base.form.email"
                                    class="checkbox"
                                    @click="
                                      () => {
                                        base.form.email =
                                          base.form.email == v.code
                                            ? ''
                                            : v.code;
                                      }
                                    "
                                  />
                                </div> -->
                              </th>
                              <td>
                                <div class="flex items-center space-x-3">
                                  <div>
                                    <div class="font-bold">
                                      {{ v.title }}
                                    </div>
                                    <div class="text-sm">
                                      {{ v.item }}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td>{{ v.qty }}</td>
                              <th v-if="base.form.status == 'export'">
                                {{ v.issue }}
                              </th>
                              <!-- <td>
                            <a :href="v.link" target="_blank">
                              <font-awesome-icon
                                v-if="v.link"
                                icon="fa-solid fa-globe"
                                size="1x"
                                class="btn btn-ghost modal-button btn-xs"
                            /></a>
                          </td> -->
                              <th v-else class="text-right">
                                <label
                                  for="modal-detail"
                                  class="btn btn-link modal-button btn-xs"
                                  @click="detail_edit(`${v.code}`)"
                                >
                                  แก้ไข
                                </label>
                                |
                                <label
                                  for="modal-remove"
                                  class="btn btn-ghost modal-button btn-xs"
                                  @click="
                                    remove_item(
                                      `${v.code}`,
                                      'detail',
                                      'controllers/MYSQL/INTERNAL/QA/Indirect/transaction'
                                    )
                                  "
                                >
                                  ลบ
                                </label>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>

            <!-- {{ base.form.status }} -->
            <div
              v-if="vers != 2 || (vers2Active && base.form.status)"
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex my-4"
            >
              <div class="flex-1 form-control">
                <label for="modal-base" class="btn btn-danger">Cancle</label>
              </div>
              <div
                class="flex-1 form-control"
                v-if="
                  base.form.status != 'cancel' &&
                  (base.form.newStatus != base.form.status ||
                    base.controll == 'create' ||
                    base.form.status == '')
                "
              >
                <button class="btn btn-primary text-white" @click="base_save()">
                  Confirm
                </button>
              </div>

              <div
                class="flex-1 form-control"
                v-if="
                  base.form.status == 'cancel' || base.form.status == 'reject'
                "
              >
                <!-- <button
                  class="btn  btn-error text-white"
                  @click="
                    remove_item(
                      `${base.form.code}`,
                      'base',
                      'controllers/MYSQL/INTERNAL/QA/Indirect/transaction'
                    )
                  "
                >
                  Delete
                </button> -->

                <label
                  for="modal-remove"
                  class="btn btn-error text-white"
                  @click="
                    remove_item(
                      `${base.form.code}`,
                      'base',
                      'controllers/MYSQL/INTERNAL/QA/Indirect/transaction'
                    )
                  "
                >
                  Delete
                </label>

                <!-- <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/QA/Indirect/transaction'
                            )
                          "
                          >Remove
                        </label> -->
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
        <div class="modal">
          <div class="modal-box relative">
            <label
              for="modal-remove"
              class="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 class="text-lg font-bold">Remove Item!</h3>
            <div class="card-body overflow-auto max-h-[60vh] ">
              Are your sure for remove this item?
            </div>

            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-remove" class="btn btn-danger">Cancle</label>
              </div>
              <div class="flex-1 form-control mt-6">
                <button
                  class="btn btn-error text-white"
                  @click="confirm_remove()"
                >
                  Confirm
                </button>
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
          <div class="modal-box relative">
            <label
              for="modal-detail"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕</label
            >
            <h3 class="text-lg font-bold">Qty</h3>
            <div class="card-body overflow-auto max-h-[60vh]">
              <!-- {{ detail }} -->
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Item Code</span>
                </label>
                <input
                  type="text"
                  placeholder="Item Code"
                  class="input input-bordered border-base-content"
                  value="0"
                  min="0"
                  v-model="detail.form.item"
                  :disabled="true"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Item Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Item Title"
                  class="input input-bordered border-base-content"
                  value="0"
                  min="0"
                  v-model="detail.form.title"
                  :disabled="true"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Ref Code</span>
                </label>
                <input
                  type="text"
                  placeholder="Ref Code"
                  class="input input-bordered border-base-content"
                  value="0"
                  min="0"
                  v-model="detail.form.ref_code"
                  :disabled="true"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">จำนวนคงเหลือ</span>
                </label>
                <input
                  type="number"
                  placeholder="จำนวนคงเหลือ"
                  class="input input-bordered border-base-content"
                  value="0"
                  min="0"
                  v-model="detail.form.amount"
                  disabled
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Qty</span>
                </label>
                <input
                  type="number"
                  placeholder="Qty"
                  class="input input-bordered border-base-content"
                  value="0"
                  min="0"
                  v-model="detail.form.qty"
                />
              </div>
            </div>
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-detail" class="btn btn-danger">Cancle</label>
              </div>
              <div class="flex-1 form-control mt-6">
                <button
                  class="btn btn-primary text-white"
                  @click="detail_save('static')"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #view>
        <div class="grid grid-cols-1 gap-6 lg:px-10 lg:py-2">
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body overflow-auto">
              <div
                class="contents lg:inline-flex lg:join my-5 w-full md:justify-center lg:justify-end"
              >
                <div class="contents sm:join md:join lg:join xl:join">
                  <div class="join join-item">
                    <button
                      class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      วันที่
                    </button>
                    <input
                      type="date"
                      placeholder="title"
                      class="join-item input input-sm input-bordered border-base-content"
                      v-model="date.from"
                      @change="change"
                    />
                    <button
                      class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      -
                    </button>

                    <input
                      type="date"
                      placeholder="title"
                      class="join-item input input-sm input-bordered border-base-content"
                      v-model="date.to"
                      @change="change"
                    />
                  </div>

                  <!-- <button
                  class="join-item btn btn-sm btn-primary  border-r-white"
                  @click="exportExcel()"
                >
                  <Icon
                    icon="mdi:file-excel-outline"
                    class="h-5 w-5 text-white"
                  />
                </button> -->
                  <AppModuleGlobalSearch
                    :class="'join-item input input-sm input-bordered border-base-content w-full max-w-xs'"
                    @search="
                          (q) => {
                            base.page = 1;
                            base.q = q;
                            typeof base.q == 'string' ? base_search() : '';
                          }
                        "
                  />
                </div>
                <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white mr-1"
                  @click="exportExcel()"
                >
                  <Icon
                    icon="mdi:file-excel-outline"
                    class="h-5 w-5 text-white"
                /></label>

                <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white"
                  @click="base_create()"
                  >Create</label
                >
              </div>

              <!-- <div class="join mt-5 w-full md:justify-center lg:justify-end">
                <AppModuleGlobalSearch
                  :class="'join-item input input-sm input-bordered border-base-content w-full max-w-xs'"
                  @search="
                          (q) => {
                            base.page = 1;
                            base.q = q;
                            typeof base.q == 'string' ? base_search() : '';
                          }
                        "
                />
                <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white"
                  @click="base_create()"
                  >Create</label
                >
              </div> -->
              <div class="overflow-x-auto w-full max-h-[60vh] lg:max-h-[65vh]">
                <table
                  class="table table-xs table-pin-rows table-pin-cols table-zebra"
                >
                  <thead>
                    <tr>
                      <th>Code</th>
                      <td>Status</td>
                      <td>Item Code</td>
                      <td>Item Title</td>
                      <td>qty</td>
                      <td>price</td>
                      <!-- <td>Unit</td> -->
                      <!-- <td>Requestion</td>
                      <td>Approval</td>
                      <td>Rejection</td>
                      <td>Cancellation</td> -->
                      <td>Creation</td>
                      <td>Updation</td>
                      <td>Doc ref</td>

                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(v, i) in base.rows"
                      :key="v.code"
                      :class="
                        v.status == 'pending'
                          ? 'text-blue-700'
                          : v.status == 'reject'
                          ? 'text-error'
                          : v.status == 'approve'
                          ? 'text-green-700'
                          : v.status == 'cancel'
                          ? 'text-gray-400 !bg-gray-100'
                          : ''
                      "
                    >
                      <th>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{ v.code }}
                            </div>
                            <div class="text-xs">( {{ v.id }} )</div>
                          </div>
                        </div>
                      </th>
                      <td>
                        <span class="pr-2">{{ v.status }}</span>
                      </td>
                      <!-- <td>
                        <span class="pr-2">{{ v. }}</span>
                      </td> -->
                      <td>{{ v.doc }}</td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{ v.title }}
                            </div>
                            <div class="text-xs">{{ v.item }}</div>
                          </div>
                        </div>
                      </td>
                      <td>{{ v.qty }}</td>
                      <td>{{ v.price }}</td>

                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{
                                v.created_at &&
                                $moment(v.created_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.created_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                v.created_fullname
                                  ? v.created_fullname
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{
                                v.updated_at &&
                                $moment(v.updated_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.updated_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                v.updated_fullname
                                  ? v.updated_fullname
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{ v.requestTitle ? v.requestTitle : "-" }}
                            </div>
                            <div class="text-xs">
                              {{ v.doc ? v.doc : "-" }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <!-- <th class="text-right" v-if="!v.status">
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                          >รายละเอียด
                        </label>
                        <label
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            status_item(
                              `pending`,
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/QA/Indirect/transaction'
                            )
                          "
                          >Request
                        </label>
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                          >Edit
                        </label>
                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/QA/Indirect/transaction'
                            )
                          "
                          >Remove
                        </label>
                      </th>
                      <th class="text-right" v-if="v.status == 'reject'">
                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/QA/Indirect/transaction'
                            )
                          "
                          >Cancel
                        </label>
                      </th>
                      <th
                        class="text-right"
                        v-else-if="v.status == 'pending'"
                      >
                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            status_item(
                              `cancel`,
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/QA/Indirect/transaction'
                            )
                          "
                          >Cancel
                        </label>
                      </th> -->
                      <!-- <th class="text-right" v-else></th> -->
                      <th class="text-right">
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                          >Detail
                        </label>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="w-full">
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
      </template>
    </AppLayout>
  </div>
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
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalScannerDetect from "@/components/App/Module/Global/ScannerDetect.vue";

export default {
  name: "Department",
  components: {
    AppLayout,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalScannerDetect,
  },
  data() {
    return {
      vers: 2,
      vers2Active: false,
      scan: false,
      date: {
        from: "",
        to: "",
      },
      checkbox: "",
      refresh: false,
      
      category: {
        rows: [],
        page: 1,
        row: 9999,
        q: "",
      },
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
        },
      },
      remove: {
        current: 0,
        model: false,
        controll: "",
        tb: "",
      },
      imagerow: null,
      item: {
        rows: [],
        total: 0,
        page: 1,
        row: null,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
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
    responseScan(res) {
      // console.error("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
      // console.log(res);
      // this.base.form.scan_code = res;

      if (this.detail.modal && this.detail.form.ref_code == res) {
        return this.detail.form.qty++;
      }
      fetch(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/item?total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }&scan_code=${res}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          // console.log(res)
          if (res.total > 0) {
            let row = res.rows[0];

            let index = -1;
            if (row.code == this.detail.form.item) {
              index = this.detail.rows.findIndex(
                (v) => v.item == this.detail.form.item
              );
            }

            if (index >= 0) {
              this.detail_edit(this.detail.rows[index].code);
              this.detail.form.qty++;
            } else {
              // res.total ? (this.base.form.scan = res.rows[0]) : "";

              this.detail.form.title = row.title;
              this.detail.form.item = row.code;
              this.detail.form.ref_code = row.ref_code;
              this.detail.form.amount = row.amount;
              
              this.detail.form.qty = 1;
              this.detail.controll = "create";
              // this.detail.form.ref_code
            }

            this.detail.modal = true;
            console.log(index);
          }

          // callback(
          //   res.success8850029031828

          //     ? { rows: res.rows, total: res.total }
          //     : { rows: [], total: 0 }
          // );
        })
        .catch((error) => {
          // callback([]);
          console.error("Error:", error);
        });
    },
    exportExcel() {
      return window.open(`${
        this.$store.state.serviceUrl
      }api/controllers/MYSQL/INTERNAL/WH/exports?db=shelf&total=1&page=${
        this.base.page
      }${this.base.row ? `&rows=${this.base.row}` : ""}${
        this.base.q ? `&q=${this.base.q}` : ""
      }${this.wh ? `&wh=${this.wh}` : ""}${
        this.date.from ? `&createFrom=${this.date.from}` : ""
      }${
        this.date.to ? `&createTo=${this.date.to}` : ""
      }&transref=I&transref_type_null=1

        `);
    },
    change() {
      this.base_search();
    },
    // base
    base_search() {
      this.base.loading = true;
      this.base_get((res) => {
        this.base.rows = res.rows;
        this.base.total = res.total;
        this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
        this.base.back = this.base.page > 1 ? true : false;
        this.base.loading = false;
      });
    },
    base_get(callback) {
      fetch(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction?total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          callback(
            res.success
              ? { rows: res.rows, total: res.total }
              : { rows: [], total: 0 }
          );
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },
    base_create() {
      this.base.current = 0;
      this.base.form = {
        code: "",
        item_code: "",
        item_name: "",
        item_short_code: "",
        pack_size: "",
        unit: "",
        uom: "",
        status: "",
        newStatus: "",
      };
      this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.form.newStatus = this.base.form.status;
      this.base.current = code;
      this.detail.rows = [];
      this.base.controll = "edit";
      // this.detail_search();
      this.refresh = true;
    },
    base_save() {
      let vm = this;

      // let image = { ...this.base.form.image[0] };
      // delete image.temp;

      if (this.vers == 2) {
        console.log(this.detail.rows);
        this.base.current = "1";
        let i = this.detail.rows.length;
        this.detail.controll = "create";
        let promise_arr = [];

        for (i; i > 0; i--) {
          this.detail.form = { ...this.detail.rows[i - 1] };
          this.detail.form.status = this.base.form.status;
          promise_arr.push(
            new Promise(async function (resolve, reject) {
              let res = await vm.detail_save("dynamic");
              await resolve(res);
              return;
            })
          );
        }
        return Promise.all(promise_arr)
          .then((res) => {
            // console.log(res);
            vm.base_search();
            this.base.modal = false;
          })
          .catch((err) => console.error(err));
      }
      this.base.form.status = this.base.form.newStatus;
      console.log(this.base.form.status);
      fetch(
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction`,
        {
          method: this.base.controll == "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
          body: JSON.stringify({ ...this.base.form }),
        }
      )
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            this.base.modal = false;
            // const promise_arr = [];
            // console.log(this.base.current);
            // if (this.base.current == 0) {
            //   this.base.current = res.row.code;
            //   let i = this.detail.rows.length;
            //   this.detail.controll = "create";
            //   for (i; i > 0; i--) {
            //     this.detail.form = {
            //       code: this.detail.rows[i - 1]["code"],
            //       title: this.detail.rows[i - 1]["title"],
            //     };
            //     promise_arr.push(
            //       new Promise(async function (resolve, reject) {
            //         let res = await vm.detail_save("dynamic");
            //         await resolve(res);
            //         return;
            //       })
            //     );
            //   }
            // }

            // Promise.all(promise_arr)
            //   .then((res) => {
            //     // console.log(res);
            //     vm.base_search();
            //   })
            //   .catch((err) => console.error(err));
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    status_item(status, code, controll, tb) {
      fetch(`${this.serviceUrl}api/${tb}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({
          code: code,
          status: status,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            // console.log(res);
            // this.remove.modal = false;
            this[`${controll}_search`]();
          }
          // callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          // callback([]);
          console.error("Error:", error);
        });
    },
    // REMOVE
    remove_item(code, controll, tb) {
      console.log(code);
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
        body: JSON.stringify({
          code: this.remove.code,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
                   if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
            // console.log(res);
            this.remove.modal = false;
            this.base.modal = false;
            this[`${this.remove.controll}_search`]();
          }
          // callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          // callback([]);
          console.error("Error:", error);
        });
    },
    // DETAIL
    detail_search() {
      this.detail.loading = true;
      this.detail_get((res) => {
        // console.log(res)
        this.detail.rows = res.rows;
        this.detail.total = res.total;
        this.detail.next =
          this.detail.page * this.detail.row >= this.detail.total
            ? false
            : true;
        this.detail.back = this.detail.page > 1 ? true : false;
        this.detail.loading = false;

        console.log(this.detail.rows);
      });
    },
    detail_get(callback) {
      fetch(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction?total=1&page=${
          this.detail.page
        }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
          this.detail.q ? `&q=${this.detail.q}` : ""
        }${this.base.current ? `&current=${this.base.current}` : ``}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
          // body: JSON.stringify({
          //     "uuid": localStorage.getItem('uuid'),
          // }),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          // res.rows.forEach((v, i) => {
          //   // res.rows[i].image = v.image ? JSON.parse(v.image) : [];
          //   // console.log(res.rows[i].image)
          //   // res.rows[i].image.forEach((vv, ii) => {
          //   //   if (ii == 0) {
          //   //     res.rows[i].master = ii;
          //   //   }
          //   //   // console.log(vv);
          //   //   if (vv.master) {
          //   //     res.rows[i].master = ii;
          //   //   }
          //   // });
          // });
          callback(
            res.success
              ? { rows: res.rows, total: res.total }
              : { rows: [], total: 0 }
          );
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },
    detail_create() {
      // console.log("detail_create");
      // this.clearimage();
      this.detail.current = 0;
      // console.log("callback");
      // this.detail.rows = [];
      this.detail.form = {
        code: "",
        qty: "",
        price: "",
        image: [],
        imageLink: "",
        color: "",
        color_code: "",
        link: "",
      };
      this.detail.controll = "create";
    },
    detail_edit(code) {
      // console.log("detail_edit");
      // this.clearimage();
      // console.log(id,index);
      // setTimeout(() => {
      this.detail.current = code;
      let index = this.detail.rows.findIndex(
        (v) => v.code == this.detail.current
      );
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      // this.detail.form.color = this.detail.form.color == "0" ? false : true;

      // console.log(this.detail.form.image);
      // this.detail.form.image.forEach((v, i) => {
      //   // console.log(v);
      //   this.detail.form.image[i] = Object.assign(
      //     {},
      //     this.detail.form.image[i]
      //   );
      // });

      // console.log(this.detail.form);
      // this.detail.form.image = JSON.parse(this.detail.form.image)

      // }, 5000);

      // this.base.form = this.base.rows[index]
      // this.detail.current = index;
      // this.detail_search();

      this.detail.controll = "edit";
    },
    detail_save(type) {
      // console.log(this.base.current)
      // console.log(this.detail.controll)
      if (!this.base.current) {
        if (this.detail.controll == "create") {
          // console.log("AAAAAAAAAAAAAAAAA")

          this.detail.form.code = this.detail.rows.length;
          this.detail.rows = [{ ...this.detail.form }].concat(this.detail.rows);
          // this.detail.rows.push({ ...this.detail.form });
          this.detail.modal = false;
        } else {
          //  this.detail.form.id = this.detail.rows.length
          let index = this.detail.rows.findIndex(
            (v) => v.code == this.detail.current
          );

          this.detail.rows[index] = { ...this.detail.form };

          // this.detail.rows.push({ ...this.detail.form });
          this.detail.modal = false;
        }
      } else {
        // console.table(this.detail.form.image);
        // let array_image = [];
        // this.detail.form.image.forEach((v, i) => {
        //   console.log(v);
        //   if (v.temp) {
        //     let image = { ...v };
        //     delete image.temp;
        //     array_image[i] = image;
        //   } else {
        //     array_image[i] = { ...v };
        //   }
        //   // console.log(this.detail.form.image[i])
        // });
        //  console.table(this.detail.form.image);
        // let obj = {
        //   emp: this.base.current,
        //   code: this.detail.form.code,
        //   email: this.detail.form.email,
        // };
        // console.log(obj);
        // if (this.detail.controll == "edit") {
        //   obj["code"] =
        // this.detail.form.code;
        // }
        console.error(this.base.form.doc);
        this.detail.form.doc = this.base.form.doc;
        fetch(
          `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/transaction`,
          {
            method: this.detail.controll == "create" ? "POST" : "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.user_token}`,
            },
            body: JSON.stringify({ ...this.detail.form }),
          }
        )
          .then((response) => response.json())
          .then((res) => {
                     if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
              this.detail.modal = false;

              if (type == "static") {
                this.detail_search();
              }

              // this.base_search();
            }
            // callback(res.success ? res.rows : []);
          })
          .catch((error) => {
            callback([]);
            console.error("Error:", error);
          });
      }
    },
    // Item
    item_search(callback) {
      this.item.loading = true;
      this.item_get((res) => {
        this.item.rows = res.rows;
        this.item.total = res.total;
        this.item.next =
          this.item.page * this.item.row >= this.item.total ? false : true;
        this.item.back = this.item.page > 1 ? true : false;
        this.item.loading = false;
        callback(res);
      });
    },
    item_get(callback) {
      fetch(
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort?total=1&wh=wh1&item_list=1&wh=${this.user.branchTitle}&short_code=${this.base.form.item_short_code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          callback(
            res.success
              ? { rows: res.rows, total: res.total }
              : { rows: [], total: 0 }
          );
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },

    // RequestItem
    req_item_search(callback) {
      this.item.loading = true;
      this.req_item_get((res) => {
        this.item.rows = res.rows;
        this.item.total = res.total;
        this.item.next =
          this.item.page * this.item.row >= this.item.total ? false : true;
        this.item.back = this.item.page > 1 ? true : false;
        this.item.loading = false;
        callback(res);
      });
    },
    req_item_get(callback) {
      fetch(
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/request_item?total=1&doc=${this.base.form.doc}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          callback(
            res.success
              ? { rows: res.rows, total: res.total }
              : { rows: [], total: 0 }
          );
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();
      
    });
  },
  watch: {
    "base.modal": function (v) {
      if (!v) {
        this.vers = 2;
        this.vers2Active = false;
        this.base.form.status = "";
      }
    },
    "base.form.item_short_code": function (val) {
      if (this.base.controll == "create") {
        this.base.form.item_code = "";
        this.base.form.item_name = "";
      }

      if (val) {
        this.item_search((res) => {
          if (this.item.rows.length == 1) {
            this.base.form.item_code = this.item.rows[0].item_code;
            this.base.form.item_wh = this.item.rows[0].wh;
          }
        });
      }
    },
    "base.form.item_code": function (val) {
      if (val) {
        fetch(
          `${this.serviceUrl}api/controllers/SAP/${
            this.base.form.item_wh ? this.base.form.item_wh : "UBA"
          }/oitm?item_code=${val}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.user_token}`,
            },
          }
        )
          .then((response) => response.json())
          .then((res) => {
                     if (!res.success) {
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
          } else {
              this.base.form.item_code = res.rows[0].ItemCode;
              this.base.form.item_name = res.rows[0].ItemName;
              this.base.form.uom = res.rows[0].UomCode;
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    "detail.form.qty": function (val) {
      console.log(this.detail.form.qty)
      console.log(this.detail.form.amount)
      console.log(val)
      if(this.base.form.status == 'export'){
        if(parseInt(val) > parseInt(this.detail.form.amount) ){
        this.detail.form.qty = this.detail.form.amount>0?this.detail.form.amount:0
      }
      }
    
    }
  },
};
</script>
<style scrop>
tr,
td {
  white-space: nowrap;
}
</style>

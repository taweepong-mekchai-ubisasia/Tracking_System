<template>
  <AppLayout>
    <template #modal>
      <!-- modal category -->
      <input
        type="checkbox"
        id="modal-category"
        class="modal-toggle"
        v-model="category.modal"
      />
      <div class="modal">
        <div class="modal-box relative w-11/12 max-w-md">
          <label
            for="modal-category"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div class="grid grid-cols-2 gap-3 mt-6">
            <label for="modal-category">
              <kbd 
                class="kbd text-sm font-semibold hover:shadow" 
                style="cursor: pointer;"
                @click="base_create('expense')"
              >
                <Icon icon="icon-park:expenses" width="100" height="100" />
                รายจ่าย (Expense)
              </kbd>
            </label>
            <label for="modal-category">
              <kbd 
                class="kbd text-sm font-semibold hover:shadow" 
                style="cursor: pointer;"
                @click="base_create('revenue')"
              >
                <Icon icon="icon-park:income-one" width="100" height="100" />
                รายรับ (Revenue)
              </kbd>
            </label>
          </div>
        </div>
      </div>

      <!-- modal base -->
      <input
        type="checkbox"
        id="modal-base"
        class="modal-toggle"
        v-model="base.modal"
      />
      <div class="modal" v-if="base.modal">
        <div class="modal-box relative w-11/12 max-w-5xl p-4 max-h-screen">
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">DOCUMENT ALERT SYSTEM</h3>
          <div class="divider my-1"></div>
          <!-- {{ base.form.category }} -->
          <ul class="grid w-full gap-3 grid-cols-2 mb-3">
            <li>
              <input type="radio" id="expense" name="hosting" value="expense" class="hidden peer" v-model="base.form.category" :disabled="base.controll == 'edit'" />
              <label 
                for="expense" 
                class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-red-600 peer-checked:bg-red-50 peer-checked:text-red-600 hover:text-gray-600 hover:bg-gray-100"
              >                           
                <div class="block">
                  <div class="w-full text-sm">หมวดหมู่เอกสาร</div>
                  <div class="w-full text-lg font-bold">รายจ่าย (Expense)</div>
                </div>
                <Icon icon="icon-park-outline:expenses" width="50" height="50" />
              </label>
            </li>
            <li>
              <input type="radio" id="revenue" name="hosting" value="revenue" class="hidden peer" v-model="base.form.category" :disabled="base.controll == 'edit'">
              <label for="revenue" class="inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                <div class="block">
                  <div class="w-full text-sm">หมวดหมู่เอกสาร</div>
                  <div class="w-full text-lg font-bold">รายรับ (Revenue)</div>
                </div>
                <Icon icon="icon-park-outline:income-one" width="50" height="50" />
              </label>
            </li>
          </ul>
          <div class="bg-base-100 border-base-300 rounded-box p-0 lg:p-0 overflow-auto w-full max-h-[60vh]">
            <div class="form-control border-2 border-dashed rounded-lg px-4 pb-4 mb-4">
              <div class="form-control">
                <label class="label grid grid-cols-2">
                  <span class="label-text text-left">ชื่อสัญญา</span>
                  <div class="form-control">
                    <label class="label cursor-pointer justify-end">
                      <span
                        v-if="base.controll == 'create'"
                        class="flex items-center"
                      >
                        <span class="label-text mr-4">มีการต่ออายุสัญญา</span>
                        <input
                          type="checkbox"
                          class="toggle toggle-success"
                          checked="checked"
                          v-model="base.form.renewed"
                        />
                      </span>
                      <span
                        v-else
                        class="font-extrabold"
                        :class="
                          base.form.renewed == 1 ? 'text-success' : 'text-error'
                        "
                      >
                        {{
                          base.form.ended == 0
                            ? base.form.renewed == 1
                              ? "มีการต่ออายุสัญญา"
                              : "ไม่ต่อสัญญา"
                            : ""
                        }}
                      </span>
                    </label>
                  </div>
                </label>
                <input
                  type="text"
                  placeholder="ชื่อสัญญา"
                  class="input input-bordered border-base-content"
                  v-model="base.form.contract_title"
                  :disabled="base.controll != 'create'"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">คู่สัญญา</span>
                </label>
                <input
                  type="text"
                  placeholder="คู่สัญญา"
                  class="input input-sm input-bordered border-base-content"
                  v-model="base.form.partners"
                  :disabled="base.controll != 'create'"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">รายละเอียด</span>
                </label>
                <textarea
                  class="textarea textarea-sm textarea-bordered border-base-content"
                  rows="3"
                  placeholder="รายละเอียด"
                  v-model="base.form.description"
                  :disabled="base.controll != 'create'"
                ></textarea>
              </div>
              <div class="grid md:grid-cols-3 grid-cols-2 gap-x-3">
                <div class="form-control md:col-span-1 col-span-2">
                  <label class="label">
                    <span class="label-text">แผนก</span>
                  </label>
                  <AppModuleGlobalSelectSearch
                    v-if="base.controll == 'create' && (this.user.access.DocumentAlert.DocumentAlertManagement == 'superadmin' || this.user.access.DocumentAlert.DocumentAlertManagement == 'admin')"
                    :placeholder="'แผนก'"
                    :label="'title'"
                    :code="'code'"
                    :minChar="3"
                    :delay="0.5"
                    :limit="10"
                    :customClass="`input input-sm input-bordered border-base-content`"
                    :customClass2="`btn-sm`"
                    :current="base.form.department"
                    @updateValue="
                      (obj) => {
                        base.form.department_data = obj;
                        base.form.department = obj.code;
                      }
                    "
                    :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/department`"
                    :param="`&total=1`"
                    :image="false"
                  />
                  <input
                    v-else
                    type="text"
                    placeholder="Type"
                    class="input input-sm input-bordered border-base-content"
                    v-model="base.form.departmentTitle"
                    disabled
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">บริษัท</span>
                  </label>
                  <AppModuleGlobalSelectSearch
                    v-if="base.controll == 'create'"
                    :placeholder="'บริษัท'"
                    :label="'title'"
                    :code="'code'"
                    :minChar="3"
                    :delay="0.5"
                    :limit="10"
                    :customClass="`input input-sm input-bordered border-base-content`"
                    :customClass2="`btn-sm`"
                    :current="base.form.company"
                    @updateValue="
                      (obj) => {
                        base.form.company_data = obj;
                        base.form.company = obj.code;
                      }
                    "
                    :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/company`"
                    :param="`&total=1&wh=wh1&rac_list=1`"
                    :image="false"
                  />
                  <input
                    v-else
                    type="text"
                    placeholder="Type"
                    class="input input-sm input-bordered border-base-content"
                    v-model="base.form.companyTitle"
                    :disabled="base.controll != 'create'"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">ประเภท</span>
                  </label>
                  <select class="select select-sm select-bordered w-full border-base-content" v-model="base.form.type" :disabled="base.controll != 'create'">
                    <option value="" disabled selected>เลือก</option>
                    <option value="สัญญาจ้างทำเอง">สัญญาจ้างทำของ</option>
                    <option value="สัญญาเช่า">สัญญาเช่า</option>
                    <option value="สัญญาก่อสร้าง">สัญญาก่อสร้าง</option>
                    <option value="สัญญาซื้อขาย">สัญญาซื้อขาย</option>
                    <option value="สัญญาตัวแทนจำหน่าย">สัญญาตัวแทนจำหน่าย</option>
                    <option value="สัญญาอื่นๆ">สัญญาอื่นๆ</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-x-3">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">เลขที่สัญญา</span>
                  </label>
                  <input
                    type="text"
                    placeholder="เลขที่สัญญา"
                    class="input input-sm input-bordered border-base-content"
                    v-model="base.form.contract_no"
                    :disabled="base.controll != 'create'"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">วันที่ทำสัญญา</span>
                  </label>
                  <input
                    v-if="base.controll == 'create'"
                    type="date"
                    placeholder="Doc date"
                    class="join-item input input-sm border-base-content bg-transparent text-base-content w-[100%]"
                    v-model="base.form.contract_date"
                    :data-date="
                      $moment(base.form.contract_date).format('DD-MM-YYYY')
                    "
                  />
                  <input
                    v-else
                    type="text"
                    placeholder="Type"
                    class="input input-sm input-bordered border-base-content"
                    :value="$moment(base.form.contract_date).format('DD-MM-YYYY')"
                    :disabled="base.controll != 'create'"
                  />
                </div>
              </div>
              <div class="grid grid-cols-12 gap-x-3">
                <!-- <div class="flex w-full flex-row flex-wrap content-center justify-around items-center mb-5"> -->
                <div
                  class="form-control col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-4"
                >
                  <label class="label">
                    <span class="label-text"
                      >วันที่เริ่มมีผล - วันที่สิ้นสุดสัญญา</span
                    >
                  </label>
                  <div class="join join-horizontal">
                    <input
                      v-if="base.controll == 'create'"
                      type="date"
                      placeholder="Doc date"
                      class="join-item input input-sm border-base-content bg-transparent text-base-content w-[45%]"
                      v-model="base.form.contract_start_date"
                      :data-date="
                        $moment(base.form.contract_start_date).format(
                          'DD-MM-YYYY'
                        )
                      "
                    />
                    <button
                      v-else
                      class="join-item btn btn-sm w-[45%]"
                      :class="
                        base.controll == 'create'
                          ? ''
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                      disabled
                    >
                      {{
                        $moment(base.form.contract_start_date).format(
                          "DD-MM-YYYY"
                        )
                      }}
                    </button>
                    <button
                      class="join-item btn btn-sm w-[10%]"
                      disabled
                      :class="
                        base.controll == 'create'
                          ? 'disabled:border-base-content disabled:bg-transparent disabled:text-base-content'
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                    >
                      -
                    </button>
                    <button
                      class="join-item btn btn-sm w-[45%]"
                      disabled
                      :class="
                        base.controll == 'create'
                          ? ''
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                    >
                      {{
                        $moment(base.form.contract_end_date).format(
                          "DD-MM-YYYY"
                        )
                      }}
                    </button>
                  </div>
                </div>
                <div
                  class="form-control col-span-12 sm:col-span-12 md:col-span-8 lg:col-span-5"
                >
                  <label class="label">
                    <span class="label-text">ระยะเวลาของสัญญา</span>
                    <div
                      class="flex items-center space-x-3 text-xs text-error font-semibold"
                      v-if="base.controll == 'edit' && base.form.ended == 0"
                    >
                      <div>
                        <div
                          class="overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          ( ระยะสัญญาที่เหลือ :
                          {{
                            $moment
                              .duration(
                                $moment(base.form.contract_end_date)
                                  .add(1, "days")
                                  .diff($moment(new Date()), "days"),
                                "days"
                              )
                              .years()
                          }}
                          ปี
                          {{
                            $moment
                              .duration(
                                $moment(base.form.contract_end_date)
                                  .add(1, "days")
                                  .diff($moment(new Date()), "days"),
                                "days"
                              )
                              .months()
                          }}
                          เดือน
                          {{
                            $moment
                              .duration(
                                $moment(base.form.contract_end_date)
                                  .add(1, "days")
                                  .diff($moment(new Date()), "days"),
                                "days"
                              )
                              .days()
                          }}
                          วัน )
                        </div>
                      </div>
                    </div>
                  </label>
                  <div class="join join-horizontal">
                    <input
                      type="number"
                      placeholder="Number of days"
                      class="join-item input-sm input input-bordered border-base-content w-full"
                      v-model="base.form.contract_duration_year"
                      min="0"
                      :disabled="base.controll != 'create'"
                      :class="
                        base.controll == 'create'
                          ? ''
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                    />
                    <button
                      class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                      disabled
                      :class="
                        base.controll == 'create'
                          ? 'disabled:border-base-content disabled:bg-transparent disabled:text-base-content'
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                    >
                      ปี
                    </button>
                    <input
                      type="number"
                      placeholder="Number of days "
                      class="join-item input-sm input input-bordered border-base-content w-full"
                      v-model="base.form.contract_duration_month"
                      min="0"
                      :disabled="base.controll != 'create'"
                      :class="
                        base.controll == 'create'
                          ? ''
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                    />
                    <button
                      class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                      disabled
                      :class="
                        base.controll == 'create'
                          ? 'disabled:border-base-content disabled:bg-transparent disabled:text-base-content'
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                    >
                      เดือน
                    </button>
                    <input
                      type="number"
                      placeholder="Number of days "
                      class="join-item input-sm input input-bordered border-base-content w-full"
                      v-model="base.form.contract_duration_day"
                      min="0"
                      :disabled="base.controll != 'create'"
                      :class="
                        base.controll == 'create'
                          ? ''
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                    />
                    <button
                      class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                      disabled
                      :class="
                        base.controll == 'create'
                          ? 'disabled:border-base-content disabled:bg-transparent disabled:text-base-content'
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                    >
                      วัน
                    </button>
                  </div>
                </div>
                <div
                  class="form-control col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-3"
                >
                  <label class="label">
                    <span class="label-text text-orange-500 font-semibold">*แจ้งเตือนก่อนครบกำหนด*</span>
                  </label>
                  <div class="join join-horizontal">
                    <input
                      type="number"
                      placeholder="Number of days "
                      class="join-item input input-sm input-bordered border-base-content w-full text-black bg-orange-100"
                      v-model="base.form.before_notification"
                      :class="
                        base.controll == 'create'
                          ? ''
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                      min="0"
                      :disabled="base.form.ended > 0"
                    />
                    <button
                      class="join-item btn btn-sm"
                      :class="
                        base.controll == 'create'
                          ? 'disabled:border-base-content disabled:bg-transparent disabled:text-base-content'
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                      disabled
                    >
                      วัน
                    </button>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-12 gap-x-3">
                <div
                  class="form-control col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-3"
                >
                  <label class="label">
                    <span class="label-text">รูปแบบการชำระเงิน</span>
                  </label>
                  <input
                    type="text"
                    placeholder="รูปแบบการชำระเงิน"
                    class="input input-sm input-bordered border-base-content"
                    v-model="base.form.payment_format"
                    :disabled="base.controll != 'create'"
                  />
                </div>
                <div
                  class="form-control col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-2"
                >
                  <label class="label">
                    <span class="label-text">มูลค่า</span>
                  </label>
                  <input
                    type="number"
                    placeholder="มูลค่า"
                    class="input input-sm input-bordered border-base-content"
                    v-model="base.form.cost"
                    :disabled="base.controll != 'create' || base.form.category == 'revenue'"
                  />
                </div>
                <div
                  class="form-control col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2"
                >
                  <label class="label">
                    <span class="label-text">ภาษีมูลค่าเพิ่ม</span>
                  </label>
                  <div class="join">
                    <input
                      type="number"
                      placeholder="..."
                      class="join-item input input-sm input-bordered border-base-content w-full"
                      step="0.01"
                      min="0"
                      max="100"
                      v-model="base.form.vat"
                      :disabled="base.controll != 'create' || base.form.category == 'revenue'"
                    />
                    <button
                      class="join-item btn btn-sm"
                      :class="
                        base.controll == 'create'
                          ? 'disabled:border-base-content disabled:bg-transparent disabled:text-base-content'
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                      disabled
                    >
                      %
                    </button>
                  </div>
                </div>
                <div
                  class="form-control col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2"
                >
                  <label class="label">
                    <span class="label-text">ภาษีหัก ณ ที่จ่าย</span>
                  </label>
                  <div class="join">
                    <input
                      type="number"
                      placeholder="..."
                      class="join-item input input-sm input-bordered border-base-content w-full"
                      step="0.01"
                      min="0"
                      max="100"
                      v-model="base.form.tax"
                      :disabled="base.controll != 'create' || base.form.category == 'revenue'"
                    />
                    <button
                      class="join-item btn btn-sm"
                      :class="
                        base.controll == 'create'
                          ? 'disabled:border-base-content disabled:bg-transparent disabled:text-base-content'
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                      disabled
                    >
                      %
                    </button>
                  </div>
                </div>
                <div
                  class="form-control col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-3"
                >
                  <label class="label">
                    <span class="label-text">ภาษีอื่นๆ (ถ้ามี)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ภาษีอื่นๆ (ถ้ามี)"
                    class="join-item input input-sm input-bordered border-base-content w-full"
                    v-model="base.form.other_tax"
                    :disabled="base.controll != 'create' || base.form.category == 'revenue'"
                  />
                </div>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">หมายเหตุ</span>
                </label>
                <textarea
                  class="textarea textarea-sm textarea-bordered border-base-content"
                  rows="3"
                  placeholder="หมายเหตุ"
                  v-model="base.form.remarks"
                  :disabled="base.controll != 'create'"
                ></textarea>
              </div>
              <div class="form-control hidden">
                <label class="label">
                  <span class="label-text">Purchase Order</span>
                </label>
                <input
                  type="text"
                  placeholder="เลขที่ PO"
                  class="input input-sm input-bordered border-base-content"
                  v-model="base.form.po"
                  :disabled="base.controll != 'create'"
                />
              </div>
              <div class="flex items-center gap-1 my-2" v-if="base.form.mail_to.length">
                <h3 class="text-sm font-bold">ปัจจุบันมีการแจ้งเตือนถึง: </h3>
                <div class="badge badge-primary font-semibold text-xs text-base-100" v-for="vv in base.form.mail_to">{{ vv.email }}</div>
              </div>
              <!-- :lists="base.form.alert_mail" -->
              <AppModuleGlobalOptionSelection
                v-if="this.user.access.DocumentAlert.DocumentAlertManagement != 'user' && base.form.ended == 0"
                :create="[true, true, true]"
                :component="'App/Module/Pages/System/Email/Modal/Email'"
                @lists="(v) => base.form.alert_mail = v"
                :label="'ต้องการให้มีการแจ้งเตือนถึง'"
                :url="`${serviceUrl}api/controllers/MYSQL/INTERNAL/HR/email`"
                :options="{
                  id: 'ajax1',
                  label: 'email',
                  'track-by': 'code',
                  placeholder: 'Type to search',
                  'open-direction': 'bottom',
                  multiple: true,
                  searchable: true,
                  'internal-search': false,
                  'clear-on-select': false,
                  'close-on-select': false,
                  'options-limit': 800,
                  limit: 999,
                  'max-height': 200,
                  'show-no-results': true,
                  'hide-selected': false,
                  taggable: true,
                }"
              />
            </div>
            <div class="form-control" v-if="base.form.ended == 0 && this.user.access.DocumentAlert.DocumentAlertManagement != 'user'">
              <AppModuleGlobalUpload
                :fileLink="`${base.form.fileLink}doc/${base.form.parent}`"
                :file="base.form.file"
                :id="'base'"
                :multiple="true"
                :type="'pdf'"
                @respone="
                  (res) => {
                    base.form.file = base.form.file.concat(res.file);
                  }
                "
                @uploaded="
                  (res) => {
                    let index = this.base.form.file.findIndex(
                      (v) => v.r == res.r
                    );
                    this.base.form.file[index].upload = false;
                    this.base.form.file[index].file = res.row.file;
                  }
                "
                @stream="
                  (res) => {
                    let index = base.form.file.findIndex((v) => v.r == res.r);
                    base.form.file[index].loading = res.loading;
                  }
                "
                @error="
                  (res) => {
                    let index = base.form.file.findIndex((v) => v.r == res.r);
                    base.form.file[index].error = true;
                  }
                "
                @again="
                  (res) => {
                    let index = base.form.file.findIndex(
                      (v) => v.r == res.file.r
                    );
                    base.form.file[index] = res.file;
                  }
                "
                @resetdata="
                  (res) => {
                    base.form.file = [...res.file];
                  }
                "
              />
            </div>
            <div class="form-control" v-else>
              <table class="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <th>เอกสาร</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v, i) in base.form.file" :key="i">
                    <td>{{ v.file }}</td>
                    <td class="text-right">
                      <a
                        class="btn btn-xs w-24 mr-2"
                        :href="`${base.form.fileLink}doc/${base.form.parent}/${v.file}`"
                        target="_blank"
                      >
                        Preview
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="base.controll == 'edit'">
              <div class="divider">
                <span class="h-4 font-bold text-primary my-2">Description Logs</span>
              </div>
              <div
                v-if="detail.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :type="'percent'"
                  :percent="detail.loading_percent"
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div :class="`${detail.loading ? 'blur-sm' : ''}`">
                <div class="overflow-x-auto w-full max-h-[20vh] min-h-[20vh] my-4">
                  <div v-if="!detail.loading && detail.rows.length == 0">
                    <AppModuleGlobalEmptyData
                      :class="`p-4 py-12 text-3xl text-center`"
                    />
                  </div>
                  <table
                    v-else
                    class="table table-xs table-pin-rows table-pin-cols table-zebra"
                  >
                    <thead>
                      <tr>
                        <th>วันที่กรอกข้อมูล</th>
                        <td>ประเภท</td>
                        <td>ชื่อสัญญา</td>
                        <td>คู่สัญญา</td>
                        <td>รายละเอียด</td>
                        <td>เลขที่สัญญา</td>
                        <td>วันที่สัญญา</td>
                        <td>วันที่เริ่มมีผล</td>
                        <td>วันที่สิ้นสุด</td>
                        <td>ระยะสัญญา</td>
                        <td>ต้องมีการต่อสัญญา</td>
                        <td>รูปแบบการชำระเงิน</td>
                        <td>มูลค่า</td>
                        <td>ภาษีมูลค่าเพิ่ม</td>
                        <td>ภาษีหัก ณ ที่จ่าย</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="hover"
                        v-for="(v, i) in detail.rows"
                        :key="v.code"
                      >
                        <th>
                          {{
                            v.created_at &&
                            $moment(v.created_at).format("YYYY-MM-DD") > "2000"
                              ? $moment(v.created_at).format(
                                  "DD-MM-YYYY HH:mm:ss"
                                )
                              : "-"
                          }}
                          <div class="text-xs">
                            {{ v.created_fullname ? v.created_fullname : "-" }}
                          </div>
                        </th>
                        <td>
                          {{ v.type }}
                        </td>
                        <td>
                          {{ v.contract_title }}
                        </td>
                        <td>
                          {{ v.partners }}
                        </td>
                        <td>
                          {{ v.description }}
                        </td>
                        <td>
                          {{ v.contract_no }}
                        </td>
                        <td>
                          {{ $moment(v.contract_date).format("DD-MM-YYYY") }}
                        </td>
                        <td>
                          {{
                            $moment(v.contract_start_date).format("DD-MM-YYYY")
                          }}
                        </td>
                        <td>
                          {{
                            $moment(v.contract_end_date).format("DD-MM-YYYY")
                          }}
                        </td>
                        <td>
                          {{ v.contract_duration_year }} ปี
                          {{ v.contract_duration_month }} เดือน
                          {{ v.contract_duration_day }} วัน
                        </td>
                        <td class="font-semibold">
                          {{ v.renewed ? "ใช่" : "ไม่ใช่" }}
                        </td>
                        <td>
                          {{ v.payment_format }}
                        </td>
                        <td class="text-right">
                          {{
                            v.cost
                              ? new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                }).format(v.cost)
                              : "-"
                          }}
                        </td>
                        <td class="text-right">
                          {{
                            v.vat
                              ? new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                }).format(v.vat) + "%"
                              : "-"
                          }}
                        </td>
                        <td class="text-right">
                          {{
                            v.tax
                              ? new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                }).format(v.tax) + "%"
                              : "-"
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
            <div class="flex-1 form-control mt-6 w-16">
              <label
                for="modal-base"
                class="btn btn-xs sm:btn-sm md:btn-md btn-danger"
              >
                Cancel
              </label>
            </div>
            <div
              v-if="base.controll == 'edit' && base.form.ended == 0 && this.user.access.DocumentAlert.DocumentAlertManagement != 'user'"
              class="flex-1 form-control mt-6 w-16"
              @click="base_renew()"
            >
              <button class="btn btn-xs sm:btn-sm md:btn-md btn-warning text-white">
                Renew
              </button>
            </div>
            <div
              v-if="base.controll == 'edit' && base.form.ended == 0 && this.user.access.DocumentAlert.DocumentAlertManagement != 'user'"
              class="flex-1 form-control mt-6 w-16"
              @click="base_ended()"
            >
              <button class="btn btn-xs sm:btn-sm md:btn-md btn-error text-white">
                Ended
              </button>
            </div>
            <div
              class="flex-1 form-control mt-6 w-16"
              @click="base_save()"
              v-if="base.form.ended == 0 && this.user.access.DocumentAlert.DocumentAlertManagement != 'user'"
            >
              <button class="btn btn-xs sm:btn-sm md:btn-md btn-primary text-white">
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
        <div class="modal-box relative w-11/12 lg:w-11/12 xl:w-12/12 max-w-4xl p-4 max-h-screen">
          <label
            for="modal-detail"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">RENEW</h3>
          <div class="divider my-1"></div>
          <div class="bg-base-100 border-base-300 rounded-box p-0 lg:p-0 overflow-auto w-full max-h-[60vh]">
            <div class="form-control border-2 border-dashed rounded-lg px-4 pb-4">
              <div class="form-control">
                <label class="label grid grid-cols-2">
                  <span class="label-text text-left">ชื่อสัญญา</span>
                  <div class="form-control">
                    <label class="label cursor-pointer justify-end">
                      <span
                        v-if="detail.controll == 'create'"
                        class="flex items-center"
                      >
                        <span class="label-text mr-4">มีการต่ออายุสัญญา</span>
                        <input
                          type="checkbox"
                          class="toggle toggle-success"
                          checked="checked"
                          v-model="detail.form.renewed"
                      /></span>
                      <span
                        v-else
                        class="font-extrabold"
                        :class="
                          detail.form.renewed ? 'text-success' : 'text-error'
                        "
                      >
                        {{
                          detail.form.renewed ? "มีการต่ออายุสัญญา" : "ไม่ต่อสัญญา"
                        }}
                      </span>
                    </label>
                  </div>
                </label>
                <input
                  type="text"
                  placeholder="ชื่อสัญญา"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.contract_title"
                  :disabled="detail.controll != 'create'"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">คู่สัญญา</span>
                </label>
                <input
                  type="text"
                  placeholder="คู่สัญญา"
                  class="input input-sm input-bordered border-base-content"
                  v-model="detail.form.partners"
                  :disabled="detail.controll != 'create'"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">รายละเอียด</span>
                </label>
                <textarea
                  class="textarea textarea-sm textarea-bordered border-base-content"
                  rows="3"
                  placeholder="รายละเอียด"
                  v-model="detail.form.description"
                  :disabled="detail.controll != 'create'"
                ></textarea>
              </div>
              <div class="grid grid-cols-3 gap-x-3">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">ประเภท</span>
                  </label>
                  <select class="select select-sm select-bordered w-full border-base-content" v-model="detail.form.type" :disabled="detail.controll != 'create'">
                    <option value="" disabled selected>เลือก</option>
                    <option value="สัญญาจ้างทำเอง">สัญญาจ้างทำของ</option>
                    <option value="สัญญาเช่า">สัญญาเช่า</option>
                    <option value="สัญญาก่อสร้าง">สัญญาก่อสร้าง</option>
                    <option value="สัญญาซื้อขาย">สัญญาซื้อขาย</option>
                    <option value="สัญญาตัวแทนจำหน่าย">สัญญาตัวแทนจำหน่าย</option>
                    <option value="สัญญาอื่นๆ">สัญญาอื่นๆ</option>
                  </select>
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">เลขที่สัญญา</span>
                  </label>
                  <input
                    type="text"
                    placeholder="เลขที่สัญญา"
                    class="input input-sm input-bordered border-base-content"
                    v-model="detail.form.contract_no"
                    :disabled="detail.controll != 'create'"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">วันที่ทำสัญญา</span>
                  </label>
                  <input
                    v-if="detail.controll == 'create'"
                    type="date"
                    placeholder="วันที่ทำสัญญา"
                    class="join-item input input-sm border-base-content bg-transparent text-base-content w-[100%]"
                    v-model="detail.form.contract_date"
                    :data-date="
                      $moment(detail.form.contract_date).format('DD-MM-YYYY')
                    "
                  />
                  <input
                    v-else
                    type="text"
                    placeholder="วันที่ทำสัญญา"
                    class="input input-sm input-bordered border-base-content"
                    v-model="detail.form.contract_date"
                    :disabled="detail.controll != 'create'"
                    :data-date="
                      $moment(detail.form.contract_date).format('DD-MM-YYYY')
                    "
                  />
                </div>
              </div>
              <div class="grid grid-cols-12 gap-x-3">
                <div class="form-control md:col-span-5 col-span-12">
                  <label class="label">
                    <span class="label-text">
                      วันที่เริ่มมีผล - วันที่สิ้นสุดสัญญา
                    </span>
                  </label>
                  <div class="join join-horizontal">
                    <input
                      v-if="detail.controll == 'create'"
                      type="date"
                      placeholder="Doc date"
                      class="join-item input input-sm border-base-content bg-transparent text-base-content w-[45%]"
                      v-model="detail.form.contract_start_date"
                      :data-date="
                        $moment(detail.form.contract_start_date).format(
                          'DD-MM-YYYY'
                        )
                      "
                    />
                    <button
                      v-else
                      class="join-item btn btn-sm w-[45%]"
                      :class="
                        detail.controll == 'create'
                          ? ''
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                      disabled
                    >
                      {{ detail.form.contract_start_date }}
                    </button>
                    <button
                      class="join-item btn btn-sm w-[10%]"
                      disabled
                      :class="
                        detail.controll == 'create'
                          ? 'disabled:border-base-content disabled:bg-transparent disabled:text-base-content'
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                    >
                      -
                    </button>
                    <button
                      class="join-item btn btn-sm disabled:opacity-50 disabled:border-base-content disabled:bg-transparent disabled:text-base-content justify-start w-[45%]"
                      disabled
                    >
                      {{
                        $moment(detail.form.contract_end_date).format(
                          "DD-MM-YYYY"
                        )
                      }}
                    </button>
                  </div>
                </div>
                <div class="form-control md:col-span-7 col-span-12">
                  <label class="label">
                    <span class="label-text">ระยะเวลาของสัญญา</span>
                  </label>
                  <div class="join join-horizontal">
                    <input
                      type="number"
                      placeholder="Number of days "
                      class="join-item input-sm input input-bordered border-base-content w-full"
                      v-model="detail.form.contract_duration_year"
                      min="0"
                    />
                    <button
                      class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      ปี
                    </button>
                    <input
                      type="number"
                      placeholder="Number of days "
                      class="join-item input-sm input input-bordered border-base-content w-full"
                      v-model="detail.form.contract_duration_month"
                      min="0"
                    />
                    <button
                      class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      เดือน
                    </button>
                    <input
                      type="number"
                      placeholder="Number of days "
                      class="join-item input-sm input input-bordered border-base-content w-full"
                      v-model="detail.form.contract_duration_day"
                      min="0"
                    />
                    <button
                      class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      วัน
                    </button>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-12 gap-x-3">
                <div
                  class="form-control col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-3"
                >
                  <label class="label">
                    <span class="label-text">รูปแบบการชำระเงิน</span>
                  </label>
                  <input
                    type="text"
                    placeholder="รูปแบบการชำระเงิน"
                    class="input input-sm input-bordered border-base-content"
                    v-model="detail.form.payment_format"
                    :disabled="detail.controll != 'create'"
                  />
                </div>
                <div
                  class="form-control col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-3"
                >
                  <label class="label">
                    <span class="label-text">มูลค่า</span>
                  </label>
                  <input
                    type="number"
                    placeholder="มูลค่า"
                    class="input input-sm input-bordered border-base-content"
                    v-model="detail.form.cost"
                    :disabled="detail.controll != 'create'"
                  />
                </div>
                <div
                  class="form-control col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2"
                >
                  <label class="label">
                    <span class="label-text">ภาษีมูลค่าเพิ่ม</span>
                  </label>
                  <div class="join">
                    <input
                      type="number"
                      placeholder="ภาษีมูลค่าเพิ่ม"
                      class="join-item input input-sm input-bordered border-base-content w-full"
                      step="0.01"
                      min="0"
                      max="100"
                      v-model="detail.form.vat"
                      :disabled="detail.controll != 'create'"
                    />
                    <button
                      class="join-item btn btn-sm"
                      :class="
                        detail.controll == 'create'
                          ? 'disabled:border-base-content disabled:bg-transparent disabled:text-base-content'
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                      disabled
                    >
                      %
                    </button>
                  </div>
                </div>
                <div
                  class="form-control col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2"
                >
                  <label class="label">
                    <span class="label-text">ภาษีหัก ณ ที่จ่าย</span>
                  </label>
                  <div class="join">
                    <input
                      type="number"
                      placeholder="ภาษีหัก ณ ที่จ่าย"
                      class="join-item input input-sm input-bordered border-base-content w-full"
                      step="0.01"
                      min="0"
                      max="100"
                      v-model="detail.form.tax"
                      :disabled="detail.controll != 'create'"
                    />
                    <button
                      class="join-item btn btn-sm"
                      :class="
                        detail.controll == 'create'
                          ? 'disabled:border-base-content disabled:bg-transparent disabled:text-base-content'
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                      disabled
                    >
                      %
                    </button>
                  </div>
                </div>
                <div
                  class="form-control col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2"
                >
                  <label class="label">
                    <span class="label-text">ภาษีอื่นๆ (ถ้ามี)</span>
                  </label>
                  <div class="join">
                    <input
                      type="number"
                      placeholder="ภาษีอื่นๆ (ถ้ามี)"
                      class="join-item input input-sm input-bordered border-base-content w-full"
                      step="0.01"
                      min="0"
                      max="100"
                      v-model="detail.form.other_tax"
                      :disabled="detail.controll != 'create'"
                    />
                    <button
                      class="join-item btn btn-sm"
                      :class="
                        detail.controll == 'create'
                          ? 'disabled:border-base-content disabled:bg-transparent disabled:text-base-content'
                          : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                      "
                      disabled
                    >
                      %
                    </button>
                  </div>
                </div>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">หมายเหตุ</span>
                </label>
                <textarea
                  class="textarea textarea-sm textarea-bordered border-base-content"
                  rows="3"
                  placeholder="หมายเหตุ"
                  v-model="detail.form.remarks"
                  :disabled="detail.controll != 'create'"
                ></textarea>
              </div>
              <div class="form-control hidden">
                <label class="label">
                  <span class="label-text">Purchase Order</span>
                </label>
                <input
                  type="text"
                  placeholder="เลขที่ PO"
                  class="input input-sm input-bordered border-base-content"
                  v-model="detail.form.po"
                  :disabled="detail.controll != 'create'"
                />
              </div>
            </div>
            <div class="mt-2">
              <AppModuleGlobalUpload
                :fileLink="`${detail.form.fileLink}doc/${detail.form.parent}`"
                :file="detail.form.file"
                :id="'detail'"
                :multiple="true"
                :type="'pdf'"
                @respone="
                  (res) => {
                    detail.form.file = detail.form.file.concat(res.file);
                  }
                "
                @uploaded="
                  (res) => {
                    let index = this.detail.form.file.findIndex(
                      (v) => v.r == res.r
                    );
                    this.detail.form.file[index].upload = false;
                    this.detail.form.file[index].file = res.row.file;
                  }
                "
                @stream="
                  (res) => {
                    let index = detail.form.file.findIndex((v) => v.r == res.r);
                    detail.form.file[index].loading = res.loading;
                  }
                "
                @error="
                  (res) => {
                    let index = detail.form.file.findIndex((v) => v.r == res.r);
                    detail.form.file[index].error = true;
                  }
                "
                @again="
                  (res) => {
                    let index = detail.form.file.findIndex(
                      (v) => v.r == res.file.r
                    );
                    detail.form.file[index] = res.file;
                  }
                "
                @resetdata="
                  (res) => {
                    detail.form.file = [...res.file];
                  }
                "
              />
            </div>
          </div>
          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
            <div class="flex-1 form-control mt-6">
              <label for="modal-detail" class="btn btn-xs sm:btn-sm md:btn-md btn-danger">Cancel</label>
            </div>
            <div class="flex-1 form-control mt-6" @click="detail_save()">
              <button class="btn btn-xs sm:btn-sm md:btn-md btn-primary text-white">Confirm</button>
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
          <h3 class="text-lg font-bold text-error">REMOVE ITEM</h3>
          <div class="divider mt-1"></div>
          <div class="card-body overflow-auto max-h-[60vh]">
            Are your sure for remove this item?
          </div>

          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
            <div class="flex-1 form-control mt-6">
              <label for="modal-remove" class="btn btn-danger">Cancel</label>
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
      <!-- <AppModuleGlobalShowImage :src="fileSrc" /> -->

      <!-- modal preview -->
      <input
        type="checkbox"
        id="modal-preview"
        class="modal-toggle"
        v-model="preview.modal"
      />
      <div class="modal" v-if="preview.modal">
        <div
          class="modal-box relative w-11/12 lg:w-11/12 xl:w-12/12 max-w-5xl lg:max-w-screen-2xl p-2 lg:p-4 max-h-screen"
        >
          <label
            for="modal-preview"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕
          </label>
          <h3 class="text-lg font-bold text-primary">DOCUMENT ALERT SYSTEM</h3>
          <div class="divider my-1"></div>

          <div
            class="tab-content bg-base-100 border-base-300 w-full overflow-auto"
          >
            <PDFViewer
              :source="preview.pdf"
              class="h-[75vh] w-full"
              @download="handleDownload"
            />
          </div>
        </div>
      </div>
    </template>
    <template #view>
      <div class="drawer drawer-end absolute z-50">
        <input id="drawer-search" type="checkbox" class="drawer-toggle" v-model="drawer.modal" />
        <div class="drawer-side" v-if="drawer.modal">
          <label
            for="drawer-search"
            aria-label="close sidebar"
            class="drawer-overlay"
          ></label>
          <div class="p-4 w-80 min-h-full bg-white text-base-content grid grid-rows-4 gap-1">
            <label
              for="drawer-search"
              class="btn btn-sm btn-circle absolute left-2 top-2 "
            >
              ✕
            </label>
            <div class="join join-vertical mt-8">
              <button
                v-if="this.user.access.DocumentAlert.DocumentAlertManagement == 'superadmin' || this.user.access.DocumentAlert.DocumentAlertManagement == 'admin'"
                class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-gray-200 disabled:text-base-content"
                disabled
              >
                แผนก
              </button>
              <AppModuleGlobalSelectSearch
                v-if="this.user.access.DocumentAlert.DocumentAlertManagement == 'superadmin' || this.user.access.DocumentAlert.DocumentAlertManagement == 'admin'"
                :placeholder="'...'"
                :label="'title'"
                :code="'title'"
                :minChar="0"
                :delay="0.5"
                :limit="10"
                :customClass="`join-item input-sm ${
                  checkbox == 'M' ? 'input-disabled' : ''
                }`"
                :disabled="checkbox == 'M' ? true : false"
                :current="search.dept"
                :refresh="refresh.dept"
                @updateValue="
                  (obj) => {
                    search.dept_code = obj.code;
                    search.dept = obj.title;
                  }
                "
                @stopRefresh="
                  (obj) => {
                    refresh.dept = obj.value;
                  }
                "
                :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/department`"
                :param="`&group=1&total=1`"
              />
              <button
                class="lg:block hidden join-item btn btn-sm disabled:border-gray-300 disabled:bg-gray-200 disabled:text-base-content"
                disabled
              >
                มีการต่ออายุสัญญา
              </button>
              <select class="join-item select select-sm select-bordered w-full" v-model="search.renew" @change="change">
                <option selected value="">ทั้งหมด</option>
                <option value="yes">ใช่</option>
                <option value="no">ไม่ใช่</option>
              </select>
            </div>

            <div class="join join-vertical mt-8">
              <button
                class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-gray-200 disabled:text-base-content"
                disabled
              >
                <span>วันที่ทำสัญญา</span>
              </button>
              <input
                type="date"
                placeholder="date"
                class="join-item input input-sm input-bordered w-full border-gray-300"
                v-model="search.contract_date.start"
                @change="change"
                :data-date="
                  $moment(search.contract_date.start).format(
                    'DD-MM-YYYY'
                  )
                "
              />
              <button
                class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-gray-200 disabled:text-base-content"
                disabled
              >
                ถึง
              </button>
              <input
                type="date"
                placeholder="date"
                class="join-item input input-sm input-bordered w-full border-gray-300"
                v-model="search.contract_date.end"
                @change="change"
                :data-date="
                  $moment(search.contract_date.end).format(
                    'DD-MM-YYYY'
                  )
                "
              />
            </div>

            <div class="join join-vertical mt-8">
              <button
                class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-gray-200 disabled:text-base-content"
                disabled
              >
                <span>วันที่เริ่มมีผล</span>
              </button>
              <input
                type="date"
                placeholder="date"
                class="join-item input input-sm input-bordered w-full border-gray-300"
                v-model="search.contract_start_date.start"
                @change="change"
                :data-date="
                  $moment(search.contract_start_date.start).format(
                    'DD-MM-YYYY'
                  )
                "
              />
              <button
                class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-gray-200 disabled:text-base-content"
                disabled
              >
                ถึง
              </button>
              <input
                type="date"
                placeholder="date"
                class="join-item input input-sm input-bordered w-full border-gray-300"
                v-model="search.contract_end_date.end"
                @change="change"
                :data-date="
                  $moment(search.contract_end_date.end).format(
                    'DD-MM-YYYY'
                  )
                "
              />
            </div>

            <div class="join join-vertical mt-8">
              <button
                class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-gray-200 disabled:text-base-content"
                disabled
              >
                <span>วันที่สิ้นสุดสัญญา</span>
              </button>
              <input
                type="date"
                placeholder="date"
                class="join-item input input-sm input-bordered w-full border-gray-300"
                v-model="search.start"
                @change="change"
                :data-date="
                  $moment(search.start).format(
                    'DD-MM-YYYY'
                  )
                "
              />
              <button
                class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-gray-200 disabled:text-base-content"
                disabled
              >
                ถึง
              </button>
              <input
                type="date"
                placeholder="date"
                class="join-item input input-sm input-bordered w-full border-gray-300"
                v-model="search.end"
                @change="change"
                :data-date="
                  $moment(search.end).format(
                    'DD-MM-YYYY'
                  )
                "
              />
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-6 mt-3">
        <div class="card shadow-lg bg-base-100">
          <div class="relative shadow-xl">
            <div class="card p-0">
              <div class="card-body overflow-auto p-2 lg:p-4 gap-0">
                <Calendar
                  v-if="tabindex == 1"
                  ref="calendar"
                  class="custom-calendar max-w-full rounded-xl"
                  :masks="masks"
                  :attributes="attributes"
                  disable-page-swipe
                  is-expanded
                  expanded
                  title-position="left"
                  @update:pages="pageUpdate"
                >
                  <template v-slot:header-title="{ title }">
                    {{ title }}
                    <div
                      class="pl-4 pointer-events-none absolute left-[100%] top-0 sm:block hidden"
                    >
                      <div
                        class="badge badge-md bg-yellow-400 text-white text-xs"
                      >
                        วันเริ่มต้นสัญญา
                      </div>
                      <div
                        class="badge badge-md bg-orange-600 text-white text-xs"
                      >
                        วันแจ้งเตือน
                      </div>
                      <div class="badge badge-md bg-error text-white text-xs">
                        วันที่สิ้นสุด
                      </div>
                      <div
                        class="badge badge-md bg-gray-500 text-white text-xs"
                      >
                        สิ้นสุด
                      </div>
                    </div>
                  </template>
                  <template v-slot:day-content="{ day, attributes }">
                    <div
                      class="flex flex-col h-full z-10 overflow-hidden"
                      :class="`${day.isToday ? 'active' : ''} ${
                        day.day ? 'flex-day' : ''
                      }`"
                    >
                      <span class="day-label text-sm text-gray-900 pl-2 pt-1">
                        {{ day.day }}
                      </span>
                      <div
                        class="flex-grow overflow-y-auto overflow-x-auto"
                        v-if="attributes.length > 0"
                      >
                        <ul class="menu bg-base-100  p-0">
                          <li v-for="attr in attributes" :key="attr.key">
                            <a
                              class="text-xs rounded-none"
                              @click="
                                base_edit(
                                  `calendar`,
                                  `${attr.customData.parent}`,
                                  `${attr.customData.index}`
                                )
                              "
                              :class="`${attr.customData.class} p-1`"
                            >
                              {{ attr.customData.title }}</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                  </template>
                  <template #footer>
                    <div class="w-full">
                      <div class="flex items-center justify-around h-[32px]">
                        <div class="form-control">
                          <label class="label cursor-pointer gap-3">
                            <span class="label-text text-sm font-semibold">รายรับ (Expense)</span>
                            <input type="checkbox" class="checkbox checkbox-xs" v-model="base.check.exp" @change="calendar_search()" />
                          </label>
                        </div>
                        <div class="form-control">
                          <label class="label cursor-pointer gap-3">
                            <span class="label-text text-sm font-semibold">รายจ่าย (Revenue)</span>
                            <input type="checkbox" class="checkbox checkbox-xs" v-model="base.check.rev" @change="calendar_search()" />
                          </label>
                        </div>
                      </div>
                      <button
                        v-if="!currentMonth || !currentYear"
                        class="w-full btn btn-sm btn-warning text-white rounded-none px-3"
                        @click="() => $refs.calendar.move(new Date())"
                      >
                        Today
                      </button>
                      <label
                        v-if="this.user.access.DocumentAlert.DocumentAlertManagement != 'user'"
                        for="modal-category"
                        class="w-full btn btn-sm btn-primary text-white rounded-none px-3 py-1 rounded-b-xl"
                      >
                        <Icon icon="gridicons:create" width="16" height="16" />
                        สร้าง
                      </label>
                    </div>
                  </template>
                </Calendar>
                <div v-if="tabindex == 2">
                  <div
                    v-if="base.loading"
                    class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
                  >
                    <AppModuleGlobalLoadingText
                      :class="`p-4 py-12 text-3xl text-center`"
                    />
                  </div>
                  <div :class="`${base.loading ? 'blur-sm' : ''}`">
                    <div
                      class="join join-horizontal w-full justify-center md:justify-end p-2 border-2 border-dashed"
                    >
                      <button
                        class="join-item btn btn-sm"
                        @click="exportExcel()"
                      >
                        <Icon
                          icon="mdi:file-excel-outline"
                          width="16" height="16"
                        />
                      </button>
                      <AppModuleGlobalSearch
                        :class="'join-item input input-sm input-bordered border-gray-300 w-full xl:max-w-lg lg:max-w-md md:max-w-sm sm:max-w-xs'"
                        @search="
                          (q) => {
                            base.page = 1;
                            base.q = q;
                            typeof base.q == 'string' ? base_search() : '';
                          }
                        "
                      />
                      <label
                        for="drawer-search"
                        class="join-item btn btn-sm btn-accent modal-button"
                      >
                        <Icon icon="material-symbols-light:manage-search-rounded" width="16" height="16" />
                        ตัวเลือกการค้นหา
                      </label>
                      <button
                        v-if="this.user.access.DocumentAlert.DocumentAlertManagement != 'user'"
                        class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-gray-200 disabled:text-base-content"
                        disabled
                      >
                      </button>
                      <label
                        v-if="this.user.access.DocumentAlert.DocumentAlertManagement != 'user'"
                        for="modal-category"
                        class="join-item btn-sm btn btn-primary modal-button text-white"
                      >
                        <Icon icon="gridicons:create" width="16" height="16" />
                        สร้าง
                      </label>
                    </div>
                    <div
                      class="overflow-x-auto w-full max-h-[60vh] min-h-[60vh] my-2"
                    >
                      <div v-if="!base.loading && base.rows.length == 0">
                        <AppModuleGlobalEmptyData
                          :class="`p-4 py-12 text-3xl text-center`"
                        />
                      </div>
                      <table
                        v-else
                        class="table table-xs table-pin-rows table-pin-cols table-zebra"
                      >
                        <thead>
                          <tr>
                            <!-- <th>#</th> -->
                            <th>วันที่กรอกข้อมูล</th>
                            <td>บริษัท</td>
                            <td>แผนก</td>
                            <td>ประเภท</td>
                            <td>ชื่อสัญญา</td>
                            <td>คู่สัญญา</td>
                            <td>รายละเอียด</td>
                            <td>เลขที่สัญญา</td>
                            <td>วันที่ทำสัญญา</td>
                            <td>วันที่เริ่มมีผล</td>
                            <td>วันที่สิ้นสุดสัญญา</td>
                            <td>ระยะเวลาของสัญญา</td>
                            <td>ต้องมีการต่อสัญญา</td>
                            <td>รูปแบบการชำระเงิน</td>
                            <td class="text-right">มูลค่า</td>
                            <td class="text-right">ภาษีมูลค่าเพิ่ม</td>
                            <td class="text-right">ภาษีหัก ณ วันที่จ่าย</td>
                            <td class="text-right">ภาษีอื่นๆ (ถ้ามี)</td>
                            <td>หมายเหตุ</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="hover"
                            style="cursor: pointer"
                            v-for="(v, i) in base.rows"
                            :key="v.code"
                            @dblclick="
                              base_edit(`table`, `${v.parent}`, `${i}`)
                            "
                          >
                            <!-- <th>{{ v.id }}</th> -->
                            <th>
                              {{
                                v.created_at &&
                                $moment(v.created_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? $moment(v.created_at).format("DD-MM-YYYY HH:mm:ss")
                                  : ""
                              }}
                              <div>
                                {{
                                  v.created_fullname ? v.created_fullname : ""
                                }}
                              </div>
                            </th>
                            <td>
                              {{ v.companyTitle }}
                            </td>
                            <td>
                              {{ v.departmentTitle }}
                            </td>
                            <td>
                              {{ v.type }}
                            </td>
                            <td>
                              {{ v.contract_title }}
                            </td>
                            <td>
                              {{ v.partners }}
                            </td>
                            <td>
                              {{ v.description }}
                            </td>
                            <td>
                              {{ v.contract_no }}
                            </td>
                            <td>
                              {{
                                $moment(v.contract_date).format("DD-MM-YYYY")
                              }}
                            </td>
                            <td>
                              {{
                                $moment(v.contract_start_date).format("DD-MM-YYYY")
                              }}
                            </td>
                            <td>
                              {{
                                $moment(v.contract_end_date).format("DD-MM-YYYY")
                              }}
                            </td>
                            <td>
                              {{ v.contract_duration_year }} ปี
                              {{ v.contract_duration_month }} เดือน
                              {{ v.contract_duration_day }} วัน
                            </td>
                            <td class="font-semibold">
                              {{ v.renewed > 0 ? "ใช่" : "ไม่ใช่" }}
                            </td>
                            <td>
                              {{ v.payment_format }}
                            </td>
                            <td class="text-right">
                              {{
                                v.cost
                                  ? new Intl.NumberFormat("th-TH", {
                                      minimumFractionDigits: 2,
                                    }).format(v.cost)
                                  : ""
                              }}
                            </td>
                            <td class="text-right">
                              {{
                                v.vat
                                  ? new Intl.NumberFormat("th-TH", {
                                      minimumFractionDigits: 2,
                                    }).format(v.vat) + "%"
                                  : ""
                              }}
                            </td>
                            <td class="text-right">
                              {{
                                v.tax
                                  ? new Intl.NumberFormat("th-TH", {
                                      minimumFractionDigits: 2,
                                    }).format(v.tax) + "%"
                                  : ""
                              }}
                            </td>
                            <td class="text-right">
                              {{
                                v.tax
                                  ? new Intl.NumberFormat("th-TH", {
                                      minimumFractionDigits: 2,
                                    }).format(v.other_tax) + "%"
                                  : ""
                              }}
                            </td>
                            <td>
                              {{ v.remarks }}
                            </td>
                            <!-- <th class="text-right">
                              <label
                                class="btn btn-ghost text-warning underline modal-button btn-xs hover:text-black"
                                @click="
                                  base_edit(`table`, `${v.parent}`, `${i}`)
                                "
                              >
                                Edit
                              </label>
                              <label
                                for="modal-remove"
                                class="btn btn-link text-error no-underline modal-button btn-xs"
                                @click="
                                  remove_item(
                                    `${v.code}`,
                                    'base',
                                    'controllers/MYSQL/INTERNAL/Document/description'
                                  )
                                "
                              >
                                Remove
                              </label>
                            </th> -->
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="grid gap-3 md:grid-cols-2 grid-cols-1">
                    <div class="md:text-left text-center text-sm">
                      Show :
                      <select
                        class="select select-bordered select-xs w-fit bg-yellow-50 text-black"
                        v-model="base.row"
                        @change="base_search()"
                      >
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                      </select>
                      | Showing
                      {{
                        base.page == Math.ceil(base.total / base.row)
                          ? 1 + base.row * (base.page - 1)
                          : 1 + (base.page - 1) * base.row
                      }}
                      to
                      {{
                        base.page == Math.ceil(base.total / base.row)
                          ? base.total
                          : base.row * base.page
                      }}
                      of {{ base.total }} entries
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
            <div class="rounded-t-none shadow-none bg-base-100">
              <div class="grid grid-cols-2">
                <button
                  class="btn btn-sm rounded-none btn-primary"
                  :class="
                    tabindex == 1
                      ? 'border-none text-white pointer-events-none'
                      : 'bg-white text-primary border border-b-0 border-x-0 hover:text-white active:text-white focus:text-white'
                  "
                  @click="tabindex = 1"
                >
                  Calendar
                </button>
                <button
                  class="btn btn-sm rounded-none btn-primary"
                  :class="
                    tabindex == 2
                      ? 'border-none text-white pointer-events-none'
                      : 'bg-white text-primary border border-b-0 border-x-0 hover:text-white active:text-white focus:text-white'
                  "
                  @click="tabindex = 2"
                >
                  Table Lists
                </button>
              </div>
            </div>
            <!-- <div class="form-control">
              <PDFViewer
              :source="'https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf'"
              :class="`h-[70vh] w-full`"
              @download="handleDownload"
            /> </div> -->
          </div>
          <!-- </div> -->

          <div
            class="absolute z-50 left-0 w-full flex flex-row flex-nowrap justify-evenly items-center content-start"
          >
            <div
              role="alert"
              class="alert alert-error shadow-lg text-white absolute z-10 w-[calc(100% - 100px)]"
              v-if="base.errorMsg"
              style="box-shadow: 0px 5px 10px 1px #000000"
            >
              <Icon icon="mingcute:warning-line" class="shrink-0 w-6 h-6" />
              <div>
                <h3 class="font-bold">{{ base.errorMsg }}</h3>
              </div>
              <button
                class="btn btn-link no-underline text-white modal-button btn-xs"
                @click="base.errorMsg = ''"
              >
                <Icon icon="zondicons:close-outline" class="w-5 h-5" />
              </button>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </template>
  </AppLayout>
</template>
<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleMenu_ from "@/components/App/Module/Menu/_.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModuleGlobalOptionSelection from "@/components/App/Module/Global/OptionSelection.vue";
import PDFViewer from "pdf-viewer-vue";

// import AppLayout from "@/components/App/layout.vue";
// import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
// import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
// import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";

// import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";

// const { pdf } = usePDF('sample.pdf')

// วันที่จะคุยรวมกับเขา
// เก็บแผนกไหนบ้าง

// Document คุยวันไหน
// คุยกับใคร

import Query from "@/assets/js/fetch.js";
// import { setupCalendar } from 'v-calendar';
import { Calendar } from "v-calendar";
import "v-calendar/style.css";
export default {
  name: "Department",
  components: {
    AppLayout,
    AppModuleGlobalPageination,
    AppModuleGlobalSearch,
    AppModuleMenu_,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    PDFViewer,
    AppModuleGlobalUpload,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalOptionSelection,
    // VCalendar
    Calendar,
    // DatePicker,
  },
  data() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
      tabindex: 0,
      refresh: false,
      search: {
        contract_date: {
          start: '',
          end: ''
        },
        contract_start_date: {
          start: '',
          end: ''
        },
        contract_end_date: {
          start: '',
          end: ''
        },
        renew: '',
        dept_code: '',
        dept: ''
      },
      currentMonth: true,
      currentYear: true,
      pdf: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      masks: {
        weekdays: "WWW",
      },
      attributes: null,
      // attributes: [
      //   {
      //     key: 1,
      //     customData: {
      //       title: "TEST DOCkUMENT",
      //       class: "bg-red-600 text-white",
      //     },
      //     dates: [[new Date(year, month, 3),new Date(year, month, 5)]],
      //   },
      //   // {
      //   //   key: 2,
      //   //   customData: {
      //   //     title: "Take Noah to basketball practice",
      //   //     class: "bg-blue-500 text-white",
      //   //   },
      //   //   dates: new Date(year, month, 2),
      //   // },
      //   {
      //     key: 3,
      //     customData: {
      //       title: "Noah's basketball game.",
      //       class: "bg-blue-500 text-white",
      //     },
      //     dates: new Date(year, month, 5),
      //   },
      //   {
      //     key: 4,
      //     customData: {
      //       title: "Take car to the shop",
      //       class: "bg-indigo-500 text-white",
      //     },
      //     dates: new Date(year, month, 5),
      //   },
      //   {
      //     key: 4,
      //     customData: {
      //       title: "Meeting with new client.",
      //       class: "bg-teal-500 text-white",
      //     },
      //     dates: new Date(year, month, 7),
      //   },
      //   // {
      //   //   key: 5,
      //   //   customData: {
      //   //     title: "Mia's gymnastics practice.",
      //   //     class: "bg-pink-500 text-white",
      //   //   },
      //   //   dates: new Date(year, month, 11),
      //   // },
      //   // {
      //   //   key: 6,
      //   //   customData: {
      //   //     title: "Cookout with friends.",
      //   //     class: "bg-orange-500 text-white",
      //   //   },
      //   //   dates: { months: 5, ordinalWeekdays: { 2: 1 } },
      //   // },
      //   // {
      //   //   key: 7,
      //   //   customData: {
      //   //     title: "Mia's gymnastics recital.",
      //   //     class: "bg-pink-500 text-white",
      //   //   },
      //   //   dates: new Date(year, month, 22),
      //   // },
      //   // {
      //   //   key: 8,
      //   //   customData: {
      //   //     title: "Visit great grandma.",
      //   //     class: "bg-red-600 text-white",
      //   //   },
      //   //   dates: new Date(year, month, 25),
      //   // },
      // ],
      attrs: [
        {
          highlight: true,
          dates: new Date(),
        },
      ],
      tab: "Create",
      calendar: {
        // dayClick: null,
        rows: [],
        total: 0,
        page: 1,
        row: 20,
        q: "",
        next: false,
        back: false,
        loading: false,
        loading_percent: 0,
        errorMsg: "",
        modal: false,
        form: {
          title: "",
        },
      },
      category: {
        current: 0,
        modal: false,
        controll: "",
        tb: "",
      },
      base: {
        // dayClick: null,
        check: {
          exp: true,
          rev: true
        },
        rows: [],
        total: 0,
        page: 1,
        row: 15,
        q: "",
        next: false,
        back: false,
        loading: false,
        loading_percent: 0,
        errorMsg: "",
        modal: false,
        form: {
          title: "",
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
      create: {
        rows: [],
        total: 0,
        page: 1,
        row: 20,
        q: "",
        next: false,
        back: false,
        loading: false,
        loading_percent: 0,
        errorMsg: "",
        modal: false,
        form: {
          title: "",
        },
      },
      preview: {
        modal: false,
        pdf: null,
      },
      remove: {
        current: 0,
        modal: false,
        controll: "",
        tb: "",
      },
      drawer: {
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
      dateData: null,
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
    exportExcel() {
      return window.open(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Document/exports?for=tablelists&Isparent=1&group=1&total=1&page=${
      this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}${
        this.search.contract_date.start ? `&contract_date_start=${this.search.contract_date.start}` : ''}${
      this.search.contract_date.end ? `&contract_date_end=${this.search.contract_date.end}` : ''}${
        this.search.contract_start_date.start ? `&contract_start_date_start=${this.search.contract_start_date.start}` : ''}${
      this.search.contract_start_date.end ? `&contract_start_date_end=${this.search.contract_start_date.end}` : ''}${
        this.search.contract_end_date.start ? `&contract_end_date_start=${this.search.contract_end_date.start}` : ''}${
      this.search.contract_end_date.end ? `&contract_end_date_end=${this.search.contract_end_date.end}` : ''}${
        this.search.renew ? `&renew=${this.search.renew}` : ''}${this.search.dept_code ? `&department=${this.search.dept_code}` : ''}
      ${this.user.access.DocumentAlert.DocumentAlertManagement == 'superuser' || this.user.access.DocumentAlert.DocumentAlertManagement == 'user' ? `&department=${this.user.department}` : ''}`);
    },
    change() {
      this.base_search();
    },
    pageUpdate(v) {
      console.warn(v[0].id);
      this.dateData = v[0].id + "-" + this.$moment().format("DD");
      this.currentMonth =
        this.$moment().format("M") == this.$moment(v[0].id + "-01").format("M");
      this.currentYear =
        this.$moment().format("Y") == this.$moment(v[0].id + "-01").format("Y");
    },

    moveToday() {
      this.$refs.calendar.move(new Date());
    },
    // calendar
    calendar_search() {
      this.calendar.loading = true;
      this.calendar.loading_percent = 0;

      this.base_get("calendar", (res) => {
        this.calendar.rows = res.rows ? res.rows : [];
        this.calendar.total = res.total ? res.total : 0;
        this.calendar.next =
          this.calendar.page * this.calendar.row >= this.calendar.total
            ? false
            : true;
        this.calendar.back = this.calendar.page > 1 ? true : false;

        this.calendar.loading = false;

        this.calendar.errorMsg = res.errorMsg;
        let attributes = [];

        res.rows.forEach((v, i) => {
          if (v.ended > 0) {
            attributes.push({
              key: `${i}${v.code}1`,
              customData: {
                index: i,
                code: v.code,
                parent: v.parent,
                title: v.contract_title,
                class:
                  "bg-gray-500 text-white   font-bold  hover:no-underline border",
              },
              dates: new Date(
                this.$moment(v.expire_date).format("YYYY"),
                parseInt(this.$moment(v.expire_date).format("M")) - 1,
                this.$moment(v.expire_date).format("D")
              ),
            });
          } else {
            if (v.renewed > 0) {
              attributes.push({
                key: `${i}${v.code}3`,
                customData: {
                  index: i,
                  code: v.code,
                  parent: v.parent,
                  title: v.contract_title,
                  class:
                    " bg-orange-600 text-white font-bold  hover:no-underline border",
                },
                dates: new Date(
                  this.$moment(v.noti_date).format("YYYY"),
                  parseInt(this.$moment(v.noti_date).format("M")) - 1,
                  this.$moment(v.noti_date).format("D")
                ),
              });
            }
            attributes.push({
              key: `${i}${v.code}2`,
              customData: {
                index: i,
                code: v.code,
                parent: v.parent,
                title: v.contract_title,
                class:
                  " bg-error text-white font-bold hover:no-underline border",
              },
              dates: new Date(
                this.$moment(v.expire_date).format("YYYY"),
                parseInt(this.$moment(v.expire_date).format("M")) - 1,
                this.$moment(v.expire_date).format("D")
              ),
            });
          }

          attributes.push({
            key: `${i}${v.code}4`,
            customData: {
              index: i,
              code: v.code,
              parent: v.parent,
              title: v.contract_title,
              class:
                "bg-yellow-400 text-white  font-bold hover:no-underline border",
            },
            dates: new Date(
              this.$moment(v.contract_start_date).format("YYYY"),
              parseInt(this.$moment(v.contract_start_date).format("M")) - 1,
              this.$moment(v.contract_start_date).format("D")
            ),
          });
        });

        this.attributes = [...attributes];
        // setInterval(()=>{
        this.tabindex = 1;
        //   setTimeout(()=>{
        //   this.tabindex = 1},200)
        // },1000)
      });
    },
    // base
    base_search() {
      this.base.loading = true;
      this.base.loading_percent = 0;

      this.base_get("base", (res) => {
        this.base.rows = res.rows ? res.rows : [];
        this.base.total = res.total ? res.total : 0;
        this.base.next =
          this.base.page * this.base.row >= this.base.total ? false : true;
        this.base.back = this.base.page > 1 ? true : false;
        this.base.loading = false;
        this.base.errorMsg = res.errorMsg;
      });
    },
    base_get(type, callback) {
      let date = this.dateData;
      let url =
        type == "calendar"
          ? `${
              this.serviceUrl
            }api/controllers/MYSQL/INTERNAL/Document/description?Isparent=1&group=1&expireInMonth=${this.$moment(date).format("M")}&expireInYear=${this.$moment(date).format("YYYY")}${
              this.base.check.exp ? ( !this.base.check.rev ? `&category=expense` : `` ) : ( this.base.check.rev ? `&category=revenue` : `&category=none` )}
            ${this.user.access.DocumentAlert.DocumentAlertManagement == 'superuser' || this.user.access.DocumentAlert.DocumentAlertManagement == 'user' ? `&department=${this.user.department}` : ''}`
          : `${
              this.serviceUrl
            }api/controllers/MYSQL/INTERNAL/Document/description?Isparent=1&group=1&total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}${
              this.search.contract_date.start ? `&contract_date_start=${this.search.contract_date.start}` : ''}${
            this.search.contract_date.end ? `&contract_date_end=${this.search.contract_date.end}` : ''}${
              this.search.contract_start_date.start ? `&contract_start_date_start=${this.search.contract_start_date.start}` : ''}${
            this.search.contract_start_date.end ? `&contract_start_date_end=${this.search.contract_start_date.end}` : ''}${
              this.search.contract_end_date.start ? `&contract_end_date_start=${this.search.contract_end_date.start}` : ''}${
            this.search.contract_end_date.end ? `&contract_end_date_end=${this.search.contract_end_date.end}` : ''}${
              this.search.renew ? `&renew=${this.search.renew}` : ''}${this.search.dept_code ? `&department=${this.search.dept_code}` : ''}
            ${this.user.access.DocumentAlert.DocumentAlertManagement == 'superuser' || this.user.access.DocumentAlert.DocumentAlertManagement == 'user' ? `&department=${this.user.department}` : ''}`;

      new Query("base", "get").get(this, url, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].file = v.file ? JSON.parse(v.file) : [];
            res.rows[i].master = 0;
          });
        }

        callback({ ...res });
      });
    },
    base_create(cat) {
      this.base.modal = true;

      this.removing = false;
      this.base.current = 0;
      this.base.form = {
        code: "",
        category: cat,
        before_notification: 0,
        fileLink: "",
        file: [],
        type: "",
        contract_date: this.$moment().format("YYYY-MM-DD"),
        contract_start_date: this.$moment().format("YYYY-MM-DD"),
        contract_duration_year: 0,
        contract_duration_month: 0,
        contract_duration_day: 0,
        renewed: true,
        ended: 0,
        departmentTitle: this.user.depTitle,
        mail_to: []
      };

      this.base.controll = "create";
    },
    base_edit(type, code, index) {
      this.base.form =
        type == "calendar"
          ? { ...this.calendar.rows[index] }
          : { ...this.base.rows[index] };

      this.base.form.alert_mail = this.base.form.alert_mail ? JSON.parse(this.base.form.alert_mail) : []
      this.base.form['mail_to'] = this.base.form.alert_mail

      !this.base.modal ? (this.base.modal = true) : "";

      this.base.current = code;
      this.base.controll = "edit";

      this.detail_search();
    },
    base_save() {
      let url = `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Document/alert`;

      let f = this.base.form.file.filter((v) => v.error == false);
      f.map((v) => (v.temp = false));
      this.base.form.file = f;
      let obj = {
        code: this.base.current,
        rows: [
          {
            ...Object.assign({ ...this.base.form }),
            code: this.base.current,
          },
        ],
      };

      new Query("base", this.base.controll == "create" ? "POST" : "PUT").set(
        this,
        url,
        obj,
        (res) => {
          if (!res.success) {
          } else {
            let data = {
              mailSubject: "มีการเพิ่มเอกสารใหม่เข้าสู่ระบบ",
              mailFrom: "it_manage@ubisasia.com",
              mailDesc: "UBIS Document Alert System",
              mailTo: this.user.emailTitle,
              mailCc: this.user.emailTitle,
              mailList: this.base.form.alert_mail,
              template: "email/document",
              row: {
                title: "มีการเพิ่มเอกสารใหม่เข้าสู่ระบบ Document Alert",
                contract_no: this.base.form.contract_no,
                contract_title: this.base.form.contract_title,
                partners: this.base.form.partners,
                contract_date: this.base.form.contract_date,
                description: this.base.form.description,
                fullname: this.user.firstname.concat(" ", this.user.lastname),
                department: this.user.depTitle,
                contract_start_date: this.base.form.contract_start_date,
                contract_end_date: this.base.form.contract_end_date,
              },
            };

            new Query(null, "POST").set(
              this,
              `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/GLOBAL/mail`,
              data,
              (res) => {
                if (!res.success) {
                } else {
                  // console.log(res);
                }
              }
            );

            this.base.modal = false;
            this.base.page = 1;
            this.base_search();
            this.calendar_search();
          }
        }
      );

      // call.set(
      //   this,
      //   url,
      //   this.base.controll == "create" ? "POST" : "PUT",
      //   obj,
      //   (res) => {
      //     if (!res.success) {
      //     } else {
      //       this.base.modal = false;
      //       this.base.page = 1;
      //       this.base_search();
      //     }
      //   }
      // );

      // fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Document/description`, {
      //   method: this.base.controll == "create" ? "POST" : "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${this.user_token}`,
      //   },
      //   body: JSON.stringify(obj),
      // })
      //   .then((response) => response.json())
      //   .then((res) => {
      //     if (!res.success) {
      //       localStorage.removeItem("user_token");
      //       this.$router.push({ name: `Login` });
      //     } else {
      //       this.base.modal = false;
      //       this.base.page = 1;
      //       this.base_search();
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });
    },
    base_ended() {
      this.base.form.ended = 1;
      this.base_save();
    },
    base_renew() {
      this.detail_create();
    },
    // detail
    detail_search() {
      this.detail.loading = true;
      this.detail.loading_percent = 0;

      this.detail_get((res) => {
        this.detail.rows = res.rows ? res.rows : [];
        this.detail.total = res.total ? res.total : 0;
        this.detail.next =
          this.detail.page * this.detail.row >= this.detail.total
            ? false
            : true;
        this.detail.back = this.detail.page > 1 ? true : false;
        this.detail.loading = false;
        this.detail.errorMsg = res.errorMsg;
      });
    },
    detail_get(callback) {
      let url = `${
        this.serviceUrl
      }api/controllers/MYSQL/INTERNAL/Document/description?total=1&page=${
        this.detail.page
      }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
        this.detail.q ? `&q=${this.detail.q}` : ""
      }&parent=${this.base.current}`;

      new Query("detail", "get").get(this, url, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].file = v.file ? JSON.parse(v.file) : [];
            res.rows[i].master = 0;
          });
        }

        callback({ ...res });
      });

      // call('detail').method('get').query(this, url, (res) => {
      //   if (res.success) {
      //     res.rows.forEach((v, i) => {
      //       res.rows[i].file = v.file ? JSON.parse(v.file) : [];
      //       res.rows[i].master = 0;
      //     });
      //   }
      //   callback({ ...res });
      // });
    },
    detail_create() {
      this.detail.modal = true;
      this.removing = false;

      this.detail.current = 0;
      this.detail.form = { ...this.base.form };
      this.detail.form.file = [];
      this.tabindex == 1
        ? (this.detail.form.contract_start_date =
            this.$moment().format("YYYY-MM-DD"))
        : "";

      this.detail.form.contract_end_date = this.$moment().format("YYYY-MM-DD");
      this.detail.form.contract_date = this.$moment().format("YYYY-MM-DD");
      this.detail.form.contract_duration_year = 0;
      this.detail.form.contract_duration_month = 0;
      this.detail.form.contract_duration_day = 0;

      this.detail.form.renewed = this.base.form.renewed > 0 ? true : false;

      this.detail.form.contract_start_date =
        this.$moment().format("YYYY-MM-DD");

      this.detail.controll = "create";
    },
    detail_edit(type, code, index) {
      this.detail.form =
        type == "calendar"
          ? { ...this.calendar.rows[index] }
          : { ...this.detail.rows[index] };

      !this.detail.modal ? (this.detail.modal = true) : "";

      this.detail.current = code;
      this.detail.controll = "edit";
    },
    detail_save() {
      let url = `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Document/description`;
      // this.detail.form.file.map((v) => (v.temp = false));
      let f = this.detail.form.file.filter((v) => v.error == false);
      f.map((v) => (v.temp = false));
      this.detail.form.file = f;
      let obj = {
        code: this.detail.current,
        rows: [
          {
            ...Object.assign({ ...this.detail.form }),
          },
        ],
      };
      new Query(
        "detail",
        this.detail.controll == "create" ? "POST" : "PUT"
      ).set(this, url, obj, (res) => {
        if (!res.success) {
        } else {
          this.base.form = this.detail.form;

          this.detail.modal = false;
          this.detail.page = 1;
          this.detail_search();
          this.calendar_search();
        }
      });
    },
    // REMOVE
    remove_item(code, controll, tb) {
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    // REMOVE
    remove_item(code, controll, tb) {
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    confirm_remove() {
      new Query(this.remove.controll, "delete").set(
        this,
        `${this.serviceUrl}api/${this.remove.tb}`,
        { rows: [{ code: this.remove.code }] },
        (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            this.remove.modal = false;
            this[`${this.remove.controll}_search`]();
          }
        }
      );

      // fetch(`${this.serviceUrl}api/${this.remove.tb}`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${this.user_token}`,
      //   },
      //   body: JSON.stringify({ rows: [{ code: this.remove.code }] }),
      // })
      //   .then((response) => response.json())
      //   .then((res) => {
      //     if (!res.success) {
      //       localStorage.removeItem("user_token");
      //       this.$router.push({ name: `Login` });
      //     } else {
      //       this.remove.modal = false;
      //       this[`${this.remove.controll}_search`]();
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });
    },
  },
  mounted() {
    this.$nextTick(() => {
      // this.base_search()
      this.dateData = this.$moment().format("YYYY-MM-DD");
    });
  },
  watch: {
    tabindex: function (v) {
      v == 1 ? this.calendar_search() : this.base_search();
    },
    "base.form.contract_start_date": function (v) {
      // console.log(v)
      this.base.form.contract_end_date = this.$moment(
        this.$moment(this.base.form.contract_start_date, "YYYY-MM-DD")
          .add(this.base.form.contract_duration_year, "years")
          .add(this.base.form.contract_duration_month, "months")
          .add(this.base.form.contract_duration_day, "day")
      ).format("YYYY-MM-DD");
    },
    "base.form.contract_duration_year": function (v) {
      // console.log(v)
      this.base.form.contract_end_date = this.$moment(
        this.$moment(this.base.form.contract_start_date, "YYYY-MM-DD")
          .add(
            this.base.form.contract_duration_year
              ? this.base.form.contract_duration_year
              : 0,
            "years"
          )
          .add(
            this.base.form.contract_duration_month
              ? this.base.form.contract_duration_month
              : 0,
            "months"
          )
          .add(
            this.base.form.contract_duration_day
              ? this.base.form.contract_duration_day
              : 0,
            "day"
          )
      ).format("YYYY-MM-DD");
    },
    "base.form.contract_duration_month": function (v) {
      // if (!this.base.form.contract_duration_month) {
      //   return;
      // }
      this.base.form.contract_end_date = this.$moment(
        this.$moment(this.base.form.contract_start_date, "YYYY-MM-DD")
          .add(
            this.base.form.contract_duration_year
              ? this.base.form.contract_duration_year
              : 0,
            "years"
          )
          .add(
            this.base.form.contract_duration_month
              ? this.base.form.contract_duration_month
              : 0,
            "months"
          )
          .add(
            this.base.form.contract_duration_day
              ? this.base.form.contract_duration_day
              : 0,
            "day"
          )
      ).format("YYYY-MM-DD");
    },
    "base.form.contract_duration_day": function (v) {
      // if (!this.base.form.contract_duration_day) {
      //   return;
      // }
      this.base.form.contract_end_date = this.$moment(
        this.$moment(this.base.form.contract_start_date, "YYYY-MM-DD")
          .add(
            this.base.form.contract_duration_year
              ? this.base.form.contract_duration_year
              : 0,
            "years"
          )
          .add(
            this.base.form.contract_duration_month
              ? this.base.form.contract_duration_month
              : 0,
            "months"
          )
          .add(
            this.base.form.contract_duration_day
              ? this.base.form.contract_duration_day
              : 0,
            "day"
          )
      ).format("YYYY-MM-DD");
    },
    "detail.form.contract_start_date": function (v) {
      // console.log(v)
      this.detail.form.contract_end_date = this.$moment(
        this.$moment(this.detail.form.contract_start_date, "YYYY-MM-DD")
          .add(this.detail.form.contract_duration_year, "years")
          .add(this.detail.form.contract_duration_month, "months")
          .add(this.detail.form.contract_duration_day, "day")
      ).format("YYYY-MM-DD");
    },
    "detail.form.contract_duration_year": function (v) {
      // console.log(v)
      this.detail.form.contract_end_date = this.$moment(
        this.$moment(this.detail.form.contract_start_date, "YYYY-MM-DD")
          .add(
            this.detail.form.contract_duration_year
              ? this.detail.form.contract_duration_year
              : 0,
            "years"
          )
          .add(
            this.detail.form.contract_duration_month
              ? this.detail.form.contract_duration_month
              : 0,
            "months"
          )
          .add(
            this.detail.form.contract_duration_day
              ? this.detail.form.contract_duration_day
              : 0,
            "day"
          )
      ).format("YYYY-MM-DD");
    },
    "detail.form.contract_duration_month": function (v) {
      // if (!this.base.form.contract_duration_month) {
      //   return;
      // }
      this.detail.form.contract_end_date = this.$moment(
        this.$moment(this.detail.form.contract_start_date, "YYYY-MM-DD")
          .add(
            this.detail.form.contract_duration_year
              ? this.detail.form.contract_duration_year
              : 0,
            "years"
          )
          .add(
            this.detail.form.contract_duration_month
              ? this.detail.form.contract_duration_month
              : 0,
            "months"
          )
          .add(
            this.detail.form.contract_duration_day
              ? this.detail.form.contract_duration_day
              : 0,
            "day"
          )
      ).format("YYYY-MM-DD");
    },
    "detail.form.contract_duration_day": function (v) {
      // if (!this.base.form.doc_date) {
      //   return;
      // }
      this.detail.form.contract_end_date = this.$moment(
        this.$moment(this.detail.form.contract_start_date, "YYYY-MM-DD")
          .add(
            this.detail.form.contract_duration_year
              ? this.detail.form.contract_duration_year
              : 0,
            "years"
          )
          .add(
            this.detail.form.contract_duration_month
              ? this.detail.form.contract_duration_month
              : 0,
            "months"
          )
          .add(
            this.detail.form.contract_duration_day
              ? this.detail.form.contract_duration_day
              : 0,
            "day"
          )
      ).format("YYYY-MM-DD");
    },
    "search.dept_code": function (v) {
      this.base_search();
    },
    dateData: function (v) {
      // console.error(v);
      this.calendar_search();
      // console.log(v);
    },
  },
};
</script>

<style scoped>
.collapse-title,
:where(.collapse > input[type="checkbox"]),
:where(.collapse > input[type="radio"]) {
  min-height: 2rem !important ;
  max-height: 2rem !important;
}
.collapse-arrow > .collapse-title:after {
  top: 1rem;
}
</style>
<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  display: none;
}

:deep() .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  /* --day-width: 90px; */
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;

  /* border-radius: 0; */
  width: 100%;
  /* border-radius: 10px; */
  & .vc-header {
    margin-top: 0px;
    /* background-color: #f1f5f8;
     padding: 10px 0; */
  }
  & .vc-title-wrapper {
    position: relative;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    /* padding: 0 5px 3px 5px; */
    padding: 0px;
    text-align: left;
    height: var(--day-height);
    /* min-width: var(--day-width); */
    background-color: white;
    height: 100%;
    overflow: auto;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &.on-bottom {
      border-bottom: var(--day-border);
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  /* & .vc-day:hover {
    background-color: var(--fallback-b1, oklch(var(--b1) / 0.1));
  } */

  & .active {
    --tw-bg-opacity: 1;
    background-color: var(--fallback-p, oklch(var(--p) / 0.25));
  }

  & .flex-day:hover {
    background-color: var(--fallback-b3, oklch(var(--b3) / 0.65));
  }

  & .active:hover {
    background-color: var(--fallback-b3, oklch(var(--b3) / 0.65));
  }
  & .flex-day {
    cursor: pointer;
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>

<style scoped>
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
  top: 0.35rem;
  right: 10px;
  color: black;
  opacity: 1;
}
</style>

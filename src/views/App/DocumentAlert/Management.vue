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
        <div
          class="modal-box relative w-11/12 lg:w-11/12 xl:w-12/12 max-w-5xl p-2 lg:p-4 max-h-screen"
        >
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕
          </label>
          <h3 class="text-lg font-bold text-primary">DOCUMENT ALERT SYSTEM</h3>
          <div class="divider my-1"></div>
          <div
            class="bg-base-100 border-base-300 rounded-box p-0 lg:p-0 overflow-auto w-full max-h-[60vh]"
          >
            <div
              class="flex w-full flex-row flex-wrap content-center justify-around items-center mb-5"
            >
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Contract duration</span>
                </label>
                <div class="join join-horizontal mr-2">
                  <input
                    type="number"
                    placeholder="Number of days "
                    class="join-item input-sm input input-bordered border-base-content w-16"
                    v-model="base.form.contract_duration_year"
                    min="1"
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
                    Years
                  </button>
                  <input
                    type="number"
                    placeholder="Number of days "
                    class="join-item input-sm input input-bordered border-base-content w-16"
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
                    Months
                  </button>

                  <input
                    type="number"
                    placeholder="Number of days "
                    class="join-item input-sm input input-bordered border-base-content w-16"
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
                    Days
                  </button>
                </div>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Notification before</span>
                </label>
                <div class="join join-horizontal">
                  <input
                    type="number"
                    placeholder="Number of days "
                    class="join-item input input-sm input-bordered border-base-content w-16"
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
                    Days
                  </button>
                </div>
              </div>
              <!-- </div> -->

              <div class="form-control w-72">
                <label class="label">
                  <span class="label-text">Duration</span>
                </label>

                <!-- <input
                  type="date"
                  placeholder="Doc date"
                  :disabled="true"
                  class="input input-sm input-bordered border-base-content"
                  v-model="base.form.contract_start_date"
                  :data-date="$moment(base.form.contract_start_date).format('YYYY-MM-DD')"
                /> -->

                <div class="join join-horizontal">
                  <input
                    v-if="base.controll == 'create'"
                    type="date"
                    placeholder="Doc date"
                    class="join-item input input-sm border-base-content bg-transparent text-base-content w-[45%]"
                    v-model="base.form.contract_start_date"
                    :data-date="
                      $moment(base.form.contract_start_date).format(
                        'YYYY-MM-DD'
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
                    {{ base.form.contract_end_date }}
                    <!-- {{ 
                             $moment(base.form.contract_end_date)
                                  .add(parseInt(v.shelf_life), "days")
                                  .diff($moment(new Date()), "days")
                              
                    
                    
                    // $moment.duration($moment(base.form.contract_end_date).diff(base.form.contract_start_date)).days() 
                  }} -->
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
                    {{ base.form.contract_end_date }}
                  </button>
                </div>
              </div>
            </div>
            <div class="form-control border border-dashed p-4 m-4">
              <div class="form-control">
                <label class="label cursor-pointer justify-end">
                  <span v-if="base.controll == 'create'">
                    <span class="label-text mr-4">Renew</span>
                    <input
                      type="checkbox"
                      class="toggle toggle-success"
                      checked="checked"
                      v-model="base.form.renewed"
                  /></span>

                  <span
                    v-else
                    class="font-extrabold"
                    :class="
                      base.form.renewed > 0 ? 'text-success' : 'text-error'
                    "
                    >{{ base.form.renewed > 0 ? "RENEW" : "UNRENEW" }}</span
                  >
                  <!-- {{base.form.renewed}} -->
                </label>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Contract Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Contract Title"
                  class="input input-bordered border-base-content"
                  v-model="base.form.contract_title"
                  :disabled="base.controll != 'create'"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Partners</span>
                </label>
                <input
                  type="text"
                  placeholder="Partners"
                  class="input input-sm input-bordered border-base-content"
                  v-model="base.form.partners"
                  :disabled="base.controll != 'create'"
                />
              </div>

              <div class="form-control">
                <label class="label">
                  <span class="label-text">Description</span>
                </label>
                <textarea
                  class="textarea textarea-sm textarea-bordered h-24"
                  placeholder="Description"
                  v-model="base.form.description"
                  :disabled="base.controll != 'create'"
                ></textarea>
              </div>
              <div class="grid grid-cols-3 gap-x-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Department</span>
                  </label>
                  <AppModuleGlobalSelectSearch
                    v-if="base.controll == 'create'"
                    :placeholder="'Department'"
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
                    :param="`&total=1&wh=wh1&rac_list=1`"
                    :image="false"
                  />

                  <input
                    v-else
                    type="text"
                    placeholder="Type"
                    class="input input-sm input-bordered border-base-content"
                    v-model="base.form.departmentTitle"
                    :disabled="base.controll != 'create'"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Branch</span>
                  </label>
                  <AppModuleGlobalSelectSearch
                    v-if="base.controll == 'create'"
                    :placeholder="'Branch'"
                    :label="'title'"
                    :code="'code'"
                    :minChar="3"
                    :delay="0.5"
                    :limit="10"
                    :customClass="`input input-sm input-bordered border-base-content`"
                    :customClass2="`btn-sm`"
                    :current="base.form.branch"
                    @updateValue="
                      (obj) => {
                        base.form.branch_data = obj;
                        base.form.branch = obj.code;
                      }
                    "
                    :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/branch`"
                    :param="`&total=1&wh=wh1&rac_list=1`"
                    :image="false"
                  />

                  <input
                    v-else
                    type="text"
                    placeholder="Type"
                    class="input input-sm input-bordered border-base-content"
                    v-model="base.form.branchTitle"
                    :disabled="base.controll != 'create'"
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Type</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type"
                    class="input input-sm input-bordered border-base-content"
                    v-model="base.form.type"
                    :disabled="base.controll != 'create'"
                  />
                </div>
              </div>
              <div class="grid grid-cols-6 gap-x-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Contract No.</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contract No."
                    class="input input-sm input-bordered border-base-content"
                    v-model="base.form.contract_no"
                    :disabled="base.controll != 'create'"
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Contract Date</span>
                  </label>
                  <!-- <input
                    type="date"
                    placeholder="Contract Date"
                    class="input input-sm input-bordered border-base-content"
                    v-model="base.form.contract_date"
                  /> -->
                  <input
                    v-if="base.controll == 'create'"
                    type="date"
                    placeholder="Doc date"
                    class="join-item input input-sm border-base-content bg-transparent text-base-content w-[100%]"
                    v-model="base.form.contract_date"
                    :data-date="
                      $moment(detail.form.contract_start_date).format(
                        'YYYY-MM-DD'
                      )
                    "
                  />
                  <input
                    v-else
                    type="text"
                    placeholder="Type"
                    class="input input-sm input-bordered border-base-content"
                    v-model="base.form.contract_date"
                    :disabled="base.controll != 'create'"
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Payment Format</span>
                  </label>
                  <input
                    type="text"
                    placeholder="payment_format"
                    class="input input-sm input-bordered border-base-content"
                    v-model="base.form.payment_format"
                    :disabled="base.controll != 'create'"
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Cost</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Cost"
                    class="input input-sm input-bordered border-base-content"
                    v-model="base.form.cost"
                    :disabled="base.controll != 'create'"
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Vat</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Vat"
                    class="input input-sm input-bordered border-base-content"
                    v-model="base.form.vat"
                    :disabled="base.controll != 'create'"
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Tax</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Tax"
                    class="input input-sm input-bordered border-base-content"
                    v-model="base.form.tax"
                    :disabled="base.controll != 'create'"
                  />
                </div>
                <!-- <div class="form-control">
                  <label class="label">
                    <span class="label-text">Renew</span>
                  </label>
              
                  <select
                    class="select select-sm select-bordered w-full max-w-xs"
                    v-model="base.form.renew"
                  >
                    <option disabled selected value="">Select Option</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div> -->
              </div>
            </div>
            <div class="form-control" v-if="base.form.ended == 0">
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
              <!-- {{base.form.file}} -->
              <table class="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <th>#</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v, i) in base.form.file" :key="i">
                    <td>{{ v.file }}</td>
                    <!-- <td></td> -->
                    <td class="text-right">
                      <a
                        class="btn btn-xs w-24 mr-2"
                        :href="`${base.form.fileLink}doc/${base.form.parent}/${v.file}`"
                        target="_blank"
                        >Preview</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="base.controll == 'edit'">
              <div class="divider">
                <span class="h-4 font-bold text-primary">Description Logs</span>
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
                <div
                  class="overflow-x-auto w-full max-h-[15vh] min-h-[15vh] my-4"
                >
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
                        <th>#</th>

                        <!-- <td>รหัส</td> -->
                        <td>วันที่กรอกข้อมูล</td>

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
                        <!-- <td>การแก้ไข</td> -->
                        <!-- <th class="text-right"></th> -->
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="hover"
                        v-for="(v, i) in detail.rows"
                        :key="v.code"
                      >
                        <th>{{ v.code }}</th>
                        <td>
                          {{
                            v.created_at &&
                            $moment(v.created_at).format("YYYY-MM-DD") > "2000"
                              ? v.created_at
                              : "-"
                          }}
                          <div class="text-xs">
                            {{ v.created_fullname ? v.created_fullname : "-" }}
                          </div>
                        </td>
                        <td>{{ v.type }}</td>
                        <td>
                          {{ v.contract_title }}
                        </td>

                        <td>{{ v.partners }}</td>
                        <td>{{ v.description }}</td>
                        <td>{{ v.contract_no }}</td>
                        <td>{{ v.contract_date }}</td>

                        <td>{{ v.contract_start_date }}</td>

                        <td>{{ v.contract_end_date }}</td>
                        <td>
                          {{ v.contract_duration_year }} ปี
                          {{ v.contract_duration_month }} เดือน
                          {{ v.contract_duration_day }} วัน
                        </td>

                        <!-- <td>{{ v.contract_duration_month }}</td>
                        
                        <td>{{ v.contract_duration_day }}</td> -->
                        <td>{{ v.renewed ? "ต่ออายุ" : "ไม่ต่ออายุ" }}</td>
                        <td>{{ v.payment_format }}</td>
                        <td>{{ v.cost }}</td>
                        <td>{{ v.vat }}</td>
                        <td>{{ v.tax }}</td>

                        <!-- <td>
                          {{
                            v.updated_at &&
                            $moment(v.updated_at).format("YYYY-MM-DD") > "2000"
                              ? v.updated_at
                              : "-"
                          }}
                          <div class="text-xs">
                            {{ v.updated_fullname ? v.updated_fullname : "-" }}
                          </div>
                        </td> -->
                        <!-- <th class="text-right">
                          <label
                            class="btn btn-link text-warning no-underline modal-button btn-xs"
                            @click="detail_edit(`${v.code}`, `${i}`)"
                            >Edit
                          </label>

                          <label
                            for="modal-remove"
                            class="btn btn-link text-error no-underline modal-button btn-xs"
                            @click="
                              remove_item(
                                `${v.code}`,
                                'detail',
                                'controllers/MYSQL/INTERNAL/Document/description'
                              )
                            "
                            >remove
                          </label>
                        </th> -->
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
            <div class="flex-1 form-control mt-6">
              <label for="modal-base" class="btn btn-danger">Cancel</label>
            </div>
            <!-- <div
              v-if="base.controll == 'edit' && $moment(base.form.noti_date) <= $moment(new Date())"
              class="flex-1 form-control mt-6"
              @click="base_renew()"
            >
              <button class="btn btn-warning text-white">Renew</button>
            </div> -->
            <div
              v-if="base.controll == 'edit' && base.form.ended == 0"
              class="flex-1 form-control mt-6"
              @click="base_renew()"
            >
              <button class="btn btn-warning text-white">Renew</button>
            </div>
            <div
              v-if="base.controll == 'edit' && base.form.ended == 0"
              class="flex-1 form-control mt-6"
              @click="base_ended()"
            >
              <button class="btn btn-error text-white">Ended</button>
            </div>
            <div
              class="flex-1 form-control mt-6"
              @click="base_save()"
              v-if="base.controll == 'create' || base.form.ended == 0"
            >
              <button class="btn btn-primary text-white">Confirm</button>
            </div>
          </div>
          <!-- </div> -->
          <!-- <div
              class="collapse collapse-arrow join-item border border-base-300"
            >
              <input type="radio" name="my-accordion-2" ref="formData" />
              <div class="collapse-title text-lg text-primary font-medium">
                Form Data
              </div>
              <div class="collapse-content">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    class="input input-bordered border-base-content"
                    v-model="base.form.title"
                  />
                </div>
                <div class="grid gap-4 md:grid-cols-5 grid-cols-1 mb-5">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Doc date</span>
                    </label>
                    <input
                      type="date"
                      placeholder="Doc date"
                      class="input input-bordered border-base-content"
                      v-model="base.form.doc_date"
                           :data-date="$moment(base.form.doc_date).format('YYYY-MM-DD')"
                    />
                  </div>
                  <div
                    class="form-control col-span-3 flex flex-row flex-nowrap justify-between"
                  >
                    <div>
                      <label class="label">
                        <span class="label-text">Life</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Life"
                        class="input input-bordered border-base-content w-20"
                        v-model="base.form.life"
                        min="1"
                      />
                    </div>
                    <div>
                      <label class="label">
                        <span class="label-text">Notification before</span>
                      </label>
                      <div class="join join-horizontal">
                        <input
                          type="number"
                          placeholder="Number of days "
                          class="join-item input input-bordered border-base-content w-20"
                          v-model="base.form.before_notification"
                          min="1"
                        />
                        <button
                          class="join-item btn disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                          disabled
                        >
                          Days
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Expiration date</span>
                    </label>
                    <input
                      type="date"
                      placeholder="Expiration date"
                      class="input input-bordered border-base-content"
                      v-model="base.form.expire_date"
                      :disabled="true"
                           :data-date="$moment(base.form.expire_date).format('YYYY-MM-DD')"
                    />
                  </div>
                </div>
                <div class="form-control">
                  {{ base.form.file }}
                  <AppModuleGlobalUpload
                    :fileLink="`${base.form.fileLink}employee/${base.form.code}/`"
                    :file="base.form.file"
                    :id="'base'"
                    :multiple="true"
                    :type="'pdf'"
                    @respone="
                      (res) => {
                        base.form.file = base.form.file.concat(res.file);
                      }
                    "
                    @uploaded="dasdasdasdasdasdas"
                    @stream="
                      (res) => {
                        let index = base.form.file.findIndex(
                          (v) => v.r == res.r
                        );
                        base.form.file[index].loading = res.loading;
                      }
                    "
                    @error="
                      (res) => {
                        let index = base.form.file.findIndex(
                          (v) => v.r == res.r
                        );
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
                    @preview="view_pdf"
                  />
                </div>
                <div
                  class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
                >
                  <div class="flex-1 form-control mt-6">
                    <label for="modal-base" class="btn btn-danger"
                      >Cancel</label
                    >
                  </div>
                  <div class="flex-1 form-control mt-6" @click="base_save()">
                    <button class="btn btn-primary text-white">Confirm</button>
                  </div>
                </div>
              </div>
            </div> -->
          <!-- </div> -->
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

      <!-- modal detail -->
      <input
        type="checkbox"
        id="modal-detail"
        class="modal-toggle"
        v-model="detail.modal"
      />
      <div class="modal" v-if="detail.modal">
        <div
          class="modal-box relative w-11/12 lg:w-11/12 xl:w-12/12 max-w-4xl p-2 lg:p-4 max-h-screen"
        >
          <label
            for="modal-detail"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕
          </label>
          <h3 class="text-lg font-bold text-primary">RENEW</h3>
          <div class="divider my-1"></div>
          <div
            class="bg-base-100 border-base-300 rounded-box p-0 lg:p-0 overflow-auto w-full max-h-[60vh]"
          >
            <div
              class="flex w-full flex-row flex-wrap content-center justify-around items-center mb-5"
            >
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Contract duration</span>
                </label>
                <div class="join join-horizontal mr-2">
                  <input
                    type="number"
                    placeholder="Number of days "
                    class="join-item input-sm input input-bordered border-base-content w-16"
                    v-model="detail.form.contract_duration_year"
                    min="1"
                  />
                  <button
                    class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    Years
                  </button>
                  <input
                    type="number"
                    placeholder="Number of days "
                    class="join-item input-sm input input-bordered border-base-content w-16"
                    v-model="detail.form.contract_duration_month"
                    min="1"
                  />
                  <button
                    class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    Months
                  </button>

                  <input
                    type="number"
                    placeholder="Number of days "
                    class="join-item input-sm input input-bordered border-base-content w-16"
                    v-model="detail.form.contract_duration_day"
                    min="1"
                  />
                  <button
                    class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    Days
                  </button>
                </div>
              </div>
              <!-- <div class="form-control">
                <label class="label">
                  <span class="label-text">Notification before</span>
                </label>
                <div class="join join-horizontal">
                  <input
                    type="number"
                    placeholder="Number of days "
                    class="join-item input input-sm input-bordered border-base-content w-16"
                    v-model="detail.form.before_notification"
                    min="1"
                  />
                  <button
                    class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    Days
                  </button>
                </div>
              </div> -->
              <!-- </div> -->

              <div class="form-control w-72">
                <label class="label">
                  <span class="label-text">Duration</span>
                </label>

                <!-- <input
                  type="date"
                  placeholder="Doc date"
                  :disabled="true"
                  class="input input-sm input-bordered border-base-content"
                  v-model="detail.form.contract_start_date"
                  :data-date="$moment(detail.form.contract_start_date).format('YYYY-MM-DD')"
                /> -->

                <div class="join join-horizontal">
                  <input
                    v-if="detail.controll == 'create'"
                    type="date"
                    placeholder="Doc date"
                    class="join-item input input-sm border-base-content bg-transparent text-base-content w-[45%]"
                    v-model="detail.form.contract_start_date"
                    :data-date="
                      $moment(detail.form.contract_start_date).format(
                        'YYYY-MM-DD'
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
                    {{ detail.form.contract_end_date }}
                    <!-- {{ 
                             $moment(detail.form.contract_end_date)
                                  .add(parseInt(v.shelf_life), "days")
                                  .diff($moment(new Date()), "days")
                              
                    
                    
                    // $moment.duration($moment(detail.form.contract_end_date).diff(detail.form.contract_start_date)).days() 
                  }} -->
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
                  <!-- <button
                    class="join-item btn btn-sm w-[45%]"
                    disabled
                    :class="
                      detail.controll == 'create'
                        ? ''
                        : 'disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-400'
                    "
                  >
                    {{ detail.form.contract_end_date }}
                  </button> -->
                  <button
                    class="join-item btn btn-sm disabled:opacity-50 disabled:border-base-content disabled:bg-transparent disabled:text-base-content w-[45%]"
                    disabled
                  >
                    {{ detail.form.contract_end_date }}
                  </button>
                </div>
              </div>
            </div>

            <div class="form-control border border-dashed p-4 m-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Contract Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Contract Title"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.contract_title"
                  :disabled="detail.controll != 'create'"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Partners</span>
                </label>
                <input
                  type="text"
                  placeholder="Partners"
                  class="input input-sm input-bordered border-base-content"
                  v-model="detail.form.partners"
                  :disabled="detail.controll != 'create'"
                />
              </div>
              <div class="form-control">
                <label class="label cursor-pointer justify-end">
                  <span v-if="detail.controll == 'create'">
                    <span class="label-text mr-4">Renew</span>
                    <input
                      type="checkbox"
                      class="toggle toggle-success"
                      checked="checked"
                      v-model="detail.form.renewed"
                  /></span>
                  <span
                    v-else
                    class="font-extrabold"
                    :class="detail.form.renewed ? 'text-success' : 'text-error'"
                    >{{ detail.form.renewed ? "RENEW" : "UNRENEW" }}</span
                  >
                </label>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Description</span>
                </label>
                <textarea
                  class="textarea textarea-sm textarea-bordered h-24"
                  placeholder="Description"
                  v-model="detail.form.description"
                  :disabled="detail.controll != 'create'"
                ></textarea>
              </div>
              <div class="grid grid-cols-3 gap-x-4">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Type</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type"
                    class="input input-sm input-bordered border-base-content"
                    v-model="detail.form.type"
                    :disabled="detail.controll != 'create'"
                  />
                </div>
                <!-- </div>
            <div class="grid grid-cols-6 gap-x-4"> -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Contract No.</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contract No."
                    class="input input-sm input-bordered border-base-content"
                    v-model="detail.form.contract_no"
                    :disabled="detail.controll != 'create'"
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Contract Date</span>
                  </label>
                  <!-- <input
                    type="date"
                    placeholder="Contract Date"
                    class="input input-sm input-bordered border-base-content"
                    v-model="detail.form.contract_date"
                  /> -->
                  <input
                    v-if="detail.controll == 'create'"
                    type="date"
                    placeholder="Doc date"
                    class="join-item input input-sm border-base-content bg-transparent text-base-content w-[100%]"
                    v-model="detail.form.contract_date"
                    :data-date="
                      $moment(detail.form.contract_start_date).format(
                        'YYYY-MM-DD'
                      )
                    "
                  />
                  <input
                    v-else
                    type="text"
                    placeholder="Type"
                    class="input input-sm input-bordered border-base-content"
                    v-model="detail.form.contract_date"
                    :disabled="detail.controll != 'create'"
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Payment Format</span>
                  </label>
                  <input
                    type="text"
                    placeholder="payment_format"
                    class="input input-sm input-bordered border-base-content"
                    v-model="detail.form.payment_format"
                    :disabled="detail.controll != 'create'"
                  />
                </div>
                <div class="grid grid-cols-3 col-span-2 gap-x-4">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Cost</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Cost"
                      class="input input-sm input-bordered border-base-content"
                      v-model="detail.form.cost"
                      :disabled="detail.controll != 'create'"
                    />
                  </div>

                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Vat</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Vat"
                      class="input input-sm input-bordered border-base-content"
                      v-model="detail.form.vat"
                      :disabled="detail.controll != 'create'"
                    />
                  </div>

                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Tax</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Tax"
                      class="input input-sm input-bordered border-base-content"
                      v-model="detail.form.tax"
                      :disabled="detail.controll != 'create'"
                    />
                  </div>
                </div>
                <!-- <div class="form-control">
                  <label class="label">
                    <span class="label-text">Renew</span>
                  </label>
              
                  <select
                    class="select select-sm select-bordered w-full max-w-xs"
                    v-model="detail.form.renew"
                  >
                    <option disabled selected value="">Select Option</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div> -->
              </div>
            </div>
          </div>
          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
            <div class="flex-1 form-control mt-6">
              <label for="modal-detail" class="btn btn-danger">Cancel</label>
            </div>

            <div class="flex-1 form-control mt-6" @click="detail_save()">
              <button class="btn btn-primary text-white">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #view>
      <div class="grid grid-cols-1 gap-6">
        <div class="card shadow-lg bg-base-100">
          <!-- <div class="card-body overflow-auto p-2 lg:p-4"> -->
          <!-- <div class="join join-vertical w-full"> -->
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
                  <template v-slot:day-content="{ day, attributes }">
                    <div
                      class="flex flex-col h-full z-10 overflow-hidden"
                      :class="`${day.isToday ? 'active' : ''} ${
                        day.day ? 'flex-day' : ''
                      }`"
                    >
                      <!-- @click="base_create(day.id)" -->
                      <span class="day-label text-sm text-gray-900 pl-2 pt-1">{{
                        day.day
                      }}</span>

                      <div
                        class="flex-grow overflow-y-auto overflow-x-auto"
                        v-if="attributes.length > 0"
                      >
                        <ul class="menu bg-base-100 border border-dashed p-0">
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
                        <!-- <button
                          v-for="attr in attributes"
                          :key="attr.key"
                          class="rounded-sm p-1 mt-0 mb-1 btn btn-xs w-full btn-error"
                          :class="attr.customData.class"
                          @click="
                            base_edit(
                              `calendar`,
                              `${attr.customData.code}`,
                              `${attr.customData.index}`
                            )
                          "
                        >
                          {{ attr.customData.title }}
                        </button> -->
                      </div>
                    </div>
                  </template>
                  <template #footer>
                    <!-- <div class="join">
  <button class="btn join-item">Button</button>
  <button class="btn join-item">Button</button>
  <button class="btn join-item">Button</button>
</div> -->
                    <div class="w-full">
                      <!-- </div>
                      <div class="w-full"> -->
                      <button
                        v-if="!currentMonth"
                        class="w-full btn btn-sm btn-warning text-white rounded-none px-3"
                        @click="() => $refs.calendar.move(new Date())"
                      >
                        Today
                      </button>
                      <button
                        class="w-full btn btn-sm btn-primary text-white rounded-none px-3 py-1 rounded-b-xl"
                        @click="base_create()"
                      >
                        Create
                      </button>
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
                      class="join join-horizontal w-full justify-center md:justify-end pt-4"
                    >
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
                        class="join-item btn-sm btn btn-primary modal-button text-white"
                        @click="base_create()"
                        >Create</label
                      >
                    </div>
                    <div
                      class="overflow-x-auto w-full max-h-[60vh] min-h-[60vh] my-4"
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
                            <th>#</th>
                            <td>Code</td>
                            <td>Title</td>
                            <td>Creation</td>
                            <td>Updation</td>
                            <th class="text-right"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            class="hover"
                            v-for="(v, i) in base.rows"
                            :key="v.code"
                          >
                            <th>
                              {{ v.id }}
                            </th>
                            <td>
                              {{ v.code }}
                            </td>
                            <td>
                              <div class="text-sm">{{ v.title }}</div>
                            </td>
                            <td>
                              {{
                                v.created_at &&
                                $moment(v.created_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.created_at
                                  : "-"
                              }}
                              <div class="text-xs">
                                {{
                                  v.created_fullname ? v.created_fullname : "-"
                                }}
                              </div>
                            </td>
                            <td>
                              {{
                                v.updated_at &&
                                $moment(v.updated_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.updated_at
                                  : "-"
                              }}
                              <div class="text-xs">
                                {{
                                  v.updated_fullname ? v.updated_fullname : "-"
                                }}
                              </div>
                            </td>
                            <th class="text-right">
                              <label
                                class="btn btn-link text-warning no-underline modal-button btn-xs"
                                @click="
                                  base_edit(`table`, `${v.parent}`, `${i}`)
                                "
                                >Edit
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
                                >Remove
                              </label>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
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
                        base_search();
                      }
                    "
                  />
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
    // VCalendar
    Calendar,
    // DatePicker,
  },
  data() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
      tabindex: 0,
      currentMonth: true,
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
      base: {
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
        model: false,
        pdf: null,
      },
      remove: {
        current: 0,
        model: false,
        controll: "",
        tb: "",
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
  },
  methods: {
    pageUpdate(v) {
      console.warn(v[0].id);
      this.dateData = v[0].id + "-" + this.$moment().format("DD");
      this.currentMonth =
        this.$moment().format("M") == this.$moment(v[0].id + "-01").format("M");
      // this.base_search()
      // console.log(v[0].id)
    },

    moveToday() {
      console.log(this.$refs.calendar.move);
      console.log(new Date());
      this.$refs.calendar.move(new Date());
    },
    // calendar
    calendar_search() {
      this.calendar.loading = true;
      this.calendar.loading_percent = 0;

      this.base_get("calendar", (res) => {
        // this.tabindex = 0
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
        // console.log(res);
        res.rows.forEach((v, i) => {
          // console.log(v, i);

          if (v.ended > 0) {
            attributes.push({
              key: `${i}${v.code}1`,
              customData: {
                index: i,
                code: v.code,
                parent: v.parent,
                title: v.contract_title,
                class: "text-gray-500  font-bold  hover:no-underline",
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
                  class: "text-orange-400 font-bold  hover:no-underline",
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
                class: "text-error  font-bold hover:no-underline",
              },
              dates: new Date(
                this.$moment(v.expire_date).format("YYYY"),
                parseInt(this.$moment(v.expire_date).format("M")) - 1,
                this.$moment(v.expire_date).format("D")
              ),
            });
          }
        });

        this.attributes = [...attributes];

        console.log(this.attributes);
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
      console.log(type);
      let date = this.dateData;
      let url =
        type == "calendar"
          ? `${
              this.serviceUrl
            }api/controllers/MYSQL/INTERNAL/Document/description?Isparent=1&group=1&expireInMonth=${this.$moment(
              date
            ).format("M")}&expireInYear=${this.$moment(date).format("YYYY")}`
          : `${
              this.serviceUrl
            }api/controllers/MYSQL/INTERNAL/Document/description?Isparent=1&group=1&total=1&page=${
              this.base.page
            }${this.base.row ? `&rows=${this.base.row}` : ""}${
              this.base.q ? `&q=${this.base.q}` : ""
            }`;

      // console.log(new Query('detail','get').para())
      new Query("base", "get").get(this, url, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].file = v.file ? JSON.parse(v.file) : [];
            res.rows[i].master = 0;
          });
        }
        // console.log(this.attributes);

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
    base_create() {
      // console.log("DASDASDSA");
      // this.base.modal = true;
      // this.base.dayClick = day;
      // this.base_create();
      // console.log(this.base.modal);
      this.base.modal = true;
      // console.log(this.base.modal);
      this.removing = false;
      this.base.current = 0;
      this.base.form = {
        code: "",
        // doc_date: this.$moment().format("YYYY-MM-DD"),
        // life: 0,
        before_notification: 0,
        // expire_date:this.$moment(new Date(),'YYYY-MM-DD'),
        fileLink: "",
        file: [],
        contract_start_date: this.$moment().format("YYYY-MM-DD"),
        contract_duration_year: 0,
        contract_duration_month: 0,
        contract_duration_day: 0,
      };

      // this.base.form.contract_end_date = this.$moment(
      //   this.$moment(this.base.form.contract_start_date, "YYYY-MM-DD").add(
      //     this.base.form.contract_duration_year,
      //     "years"
      //   ).add(
      //     this.base.form.contract_duration_month,
      //     "months"
      //   ).add(
      //     this.base.form.contract_duration_day,
      //     "day"
      //   )
      // ).format("YYYY-MM-DD");

      // this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(type, code, index) {
      // console.log(this.base.rows)
      console.log(code, index);
      this.base.form =
        type == "calendar"
          ? { ...this.calendar.rows[index] }
          : { ...this.base.rows[index] };

      // console.log(this.base.form);
      !this.base.modal ? (this.base.modal = true) : "";
      // this.base.form.file = JSON.parse(this.base.form.file);
      this.base.current = code;
      console.log(this.base.current);
      this.base.controll = "edit";
      // this.$refs.formData.checked = true;
      this.detail_search();
    },
    base_save() {
      let url = `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Document/alert`;
      // let file = [...this.base.form.file]
      // this.base.form.file = []
      // file.forEach((v,i)=>{
      //   this.base.form.file.push(v.file)
      // })
      // console.log(this.base.form.file)
      this.base.form.file.map((v) => (v.temp = false));
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
      // console.log(type);
      // let date = { ...this.dateData };
      let url = `${
        this.serviceUrl
      }api/controllers/MYSQL/INTERNAL/Document/description?total=1&page=${
        this.detail.page
      }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
        this.detail.q ? `&q=${this.detail.q}` : ""
      }&parent=${this.base.current}`;

      // console.log(new Query('detail','get').para())
      new Query("detail", "get").get(this, url, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].file = v.file ? JSON.parse(v.file) : [];
            res.rows[i].master = 0;
          });
        }
        // console.log(this.attributes);

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
      // console.log("DASDASDSA");
      // this.detail.modal = true;
      // this.detail.dayClick = day;
      // this.detail_create();
      // console.log(this.detail.modal);
      this.detail.modal = true;
      // console.log(this.detail.modal);
      this.removing = false;
      this.detail.current = 0;

      // this.detail.form = {
      //   code: "",
      //   doc_date: day
      //     ? this.$moment(day).format("YYYY-MM-DD")
      //     : this.$moment().format("YYYY-MM-DD"),
      //   life: 0,
      //   before_notification: 0,
      //   // expire_date:this.$moment(new Date(),'YYYY-MM-DD'),
      //   fileLink: "",
      //   file: [],
      // };
      // this.detail.rows = [];
      // console.log(this.base)
      this.detail.form = { ...this.base.form };
      this.detail.form.renewed = this.base.form.renewed > 0 ? true : false;
      // this.detail.form.before_notification = this.base.form.before_notification;
      // this.detail.form.title = this.base.form.title;
      // this.detail.form.contract_duration_year =
      //   this.base.form.contract_duration_year;
      // this.detail.form.contract_duration_day =
      //   this.base.form.contract_duration_day;
      // this.detail.form.contract_duration_month =
      //   this.base.form.contract_duration_month;

      this.detail.form.contract_start_date =
        this.$moment().format("YYYY-MM-DD");
      // base.form.contract_end_date

      this.detail.controll = "create";
    },
    detail_edit(type, code, index) {
      // console.log(this.detail.rows)
      // console.log(code, index);
      this.detail.form =
        type == "calendar"
          ? { ...this.calendar.rows[index] }
          : { ...this.detail.rows[index] };

      // console.log(this.detail.form);
      !this.detail.modal ? (this.detail.modal = true) : "";
      // this.detail.form.file = JSON.parse(this.detail.form.file);
      this.detail.current = code;
      this.detail.controll = "edit";
      // this.$refs.formData.checked = true;
    },
    detail_save() {
      let url = `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Document/description`;
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
          this.detail.modal = false;
          this.detail.page = 1;
          this.detail_search();
          this.calendar_search();
        }
      });
    },
    // REMOVE
    remove_item(code, controll, tb) {
      // console.log(code);
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    // REMOVE
    remove_item(code, controll, tb) {
      // console.log(code);
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
    // "base.form.doc_date": function (v) {
    //   // console.log(v)
    //   if (!this.base.form.doc_date) {
    //     return;
    //   }
    //   this.base.form.expire_date = this.$moment(
    //     this.$moment(this.base.form.doc_date, "YYYY-MM-DD").add(
    //       this.base.form.life,
    //       "days"
    //     )
    //   ).format("YYYY-MM-DD");
    // },
    // "base.form.life": function (v) {
    //   if (!this.base.form.doc_date) {
    //     return;
    //   }
    //   // console.log(v)
    //   this.base.form.expire_date = this.$moment(
    //     this.$moment(this.base.form.doc_date, "YYYY-MM-DD").add(
    //       this.base.form.life,
    //       "days"
    //     )
    //   ).format("YYYY-MM-DD");
    // },
    "base.form.contract_start_date": function (v) {
      // if (!this.base.form.contract_start_date) {
      //   return;
      // }
      // console.log(v)
      this.base.form.contract_end_date = this.$moment(
        this.$moment(this.base.form.contract_start_date, "YYYY-MM-DD")
          .add(this.base.form.contract_duration_year, "years")
          .add(this.base.form.contract_duration_month, "months")
          .add(this.base.form.contract_duration_day, "day")
      ).format("YYYY-MM-DD");
    },
    "base.form.contract_duration_year": function (v) {
      // if (!this.base.form.contract_duration_year) {
      //   return;
      // }
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
      // if (!this.base.form.contract_start_date) {
      //   return;
      // }
      // console.log(v)
      this.detail.form.contract_end_date = this.$moment(
        this.$moment(this.detail.form.contract_start_date, "YYYY-MM-DD")
          .add(this.detail.form.contract_duration_year, "years")
          .add(this.detail.form.contract_duration_month, "months")
          .add(this.detail.form.contract_duration_day, "day")
      ).format("YYYY-MM-DD");
    },
    "detail.form.contract_duration_year": function (v) {
      // if (!this.base.form.contract_duration_year) {
      //   return;
      // }
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
    // this.detail.form.contract_start_date =
    //     this.$moment().format("YYYY-MM-DD");
    // 'base.form.expire_date':function(v){
    //   // console.log(v)
    // },
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
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
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
  top: 0.45rem;
  right: 10px;
  color: black;
  opacity: 1;
}
</style>

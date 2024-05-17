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
          <div
          class="modal-box relative w-11/12 max-w-5xl p-2 lg:p-4 max-h-screen"
        >
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold">Employee</h3>
            <div role="tablist" class="tabs tabs-lifted">
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                class="tab"
                aria-label="Information"
                checked
              />
              <div
                role="tabpanel"
                class="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-auto w-full max-h-[60vh]"
              >
                <div class="grid gap-4 md:grid-cols-1 grid-cols-1">
                  <AppModuleGlobalUpload
                    :imageLink="base.form.imageLink"
                    :image="base.form.image"
                    :id="'base'"
                    :multiple="false"
                    @respone="
                      (res) => {
                        let length = base.form.image.length
                          ? base.form.image.length
                          : 0;
                        base.form.image = base.form.image.concat(res.image);
                      }
                    "
                    @resetdata="
                      (res) => {
                        base.form.image = [...res.image];
                      }
                    "
                  />

                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">บริษัท</span>
                    </label>

                    <AppModuleGlobalSelectSearch
                      :placeholder="'บริษัท'"
                      :label="'title'"
                      :code="'code'"
                      :minChar="3"
                      :delay="0.5"
                      :limit="10"
                      :customClass="`input input-bordered border-base-content ${
                        checkbox == 'M' ? 'input-disabled' : ''
                      }`"
                      :disabled="checkbox == 'M' ? true : false"
                      :current="base.form.company"
                      :refresh="refresh"
                      @updateValue="
                        (obj) => {
                          base.form.company_data = obj;
                          base.form.company = obj.code;
                        }
                      "
                      @stopRefresh="
                        (obj) => {
                          refresh = obj.value;
                        }
                      "
                      :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/company`"
                      :param="`&total=1`"
                    />
                  </div>
                </div>

                <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">สาขา</span>
                    </label>
                    <!-- <select
                      class="select select-bordered border-base-content w-full max-w-xs"
                      v-if="base.form.company_data"
                    >
                      <option disabled selected>Who shot first?</option>
                      <option>Han Solo</option>
                      <option>Greedo</option>
                    </select> -->
                    <AppModuleGlobalSelectSearch
                      :placeholder="'สาขา'"
                      :label="'title'"
                      :code="'code'"
                      :minChar="3"
                      :delay="0.5"
                      :limit="10"
                      :customClass="`input input-bordered border-base-content ${
                        checkbox == 'M' ? 'input-disabled' : ''
                      }`"
                      :disabled="checkbox == 'M' ? true : false"
                      :current="base.form.branch"
                      :refresh="refresh"
                      @updateValue="
                        (obj) => {
                          base.form.branch_data = obj;
                          base.form.branch = obj.code;
                        }
                      "
                      @stopRefresh="
                        (obj) => {
                          refresh = obj.value;
                        }
                      "
                      :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/branch`"
                      :param="`&total=1`"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">รหัสพนักงาน</span>
                    </label>
                    <input
                      type="text"
                      placeholder="รหัสพนักงาน"
                      class="input input-bordered border-base-content"
                      v-model="base.form.uid"
                    />
                  </div>
                </div>

                <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">ชื่อ</span>
                    </label>
                    <input
                      type="text"
                      placeholder="ชื่อ"
                      class="input input-bordered border-base-content"
                      v-model="base.form.firstname"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">นามสกุล</span>
                    </label>
                    <input
                      type="text"
                      placeholder="นามสกุล"
                      class="input input-bordered border-base-content"
                      v-model="base.form.lastname"
                    />
                  </div>
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">แผนก</span>
                  </label>
                  <AppModuleGlobalSelectSearch
                    :placeholder="'แผนก'"
                    :label="'title'"
                    :code="'code'"
                    :minChar="3"
                    :delay="0.5"
                    :limit="10"
                    :customClass="`input input-bordered border-base-content ${
                      checkbox == 'M' ? 'input-disabled' : ''
                    }`"
                    :disabled="checkbox == 'M' ? true : false"
                    :current="base.form.department"
                    :refresh="refresh"
                    @updateValue="
                      (obj) => {
                        base.form.department_data = obj;
                        base.form.department = obj.code;
                      }
                    "
                    @stopRefresh="
                      (obj) => {
                        refresh = obj.value;
                      }
                    "
                    :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/department`"
                    :param="`&total=1&wh=wh1&rac_list=1`"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">ตำแหน่ง</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ตำแหน่ง"
                    class="input input-bordered border-base-content"
                    v-model="base.form.position"
                  />
                </div>
                <div class="grid gap-4 md:grid-cols-1 grid-cols-1">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">สิทธิ์การใช้งาน</span>
                    </label>
                    <AppModuleGlobalSelectSearch
                      :placeholder="'สิทธิ์การใช้งาน'"
                      :label="'title'"
                      :code="'code'"
                      :minChar="3"
                      :delay="0.5"
                      :limit="10"
                      :customClass="`input input-bordered border-base-content ${
                        checkbox == 'M' ? 'input-disabled' : ''
                      }`"
                      :disabled="checkbox == 'M' ? true : false"
                      :current="base.form.access_code"
                      :refresh="refresh"
                      @updateValue="
                        (obj) => {
                          base.form.access_data = obj;
                          base.form.access_code = obj ? obj.code : '';
                        }
                      "
                      :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/access`"
                      :param="`&total=1`"
                    />
                  </div>
                </div>
                <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">เบอร์โทรศัพท์</span>
                    </label>
                    <input
                      type="text"
                      placeholder="เบอร์โทรศัพท์"
                      class="input input-bordered border-base-content"
                      v-model="base.form.tel"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">วันเกิด</span>
                    </label>
                    <input
                      type="date"
                      placeholder="วันเกิด"
                      class="input input-bordered border-base-content"
                      v-model="base.form.birthdate"
                    />
                  </div>
                </div>
                <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">วันที่เริ่มงาน</span>
                    </label>
                    <input
                      type="date"
                      placeholder="วันที่เริ่มงาน"
                      class="input input-bordered border-base-content"
                      v-model="base.form.started_at"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">วันที่สิ้นสุดการทำงาน</span>
                    </label>
                    <input
                      type="date"
                      placeholder="วันที่สิ้นสุดการทำงาน"
                      class="input input-bordered border-base-content"
                      v-model="base.form.leaves_at"
                    />
                  </div>
                </div>
                <!-- <div class="form-control">
                  <label class="label">
                    <span class="label-text">textarray</span>
                  </label>

                  <textarea
                    class="textarea textarea-bordered"
                    placeholder="Description"
                    v-model="base.form.textarea"
                    cols="5"
                    rows="1"
                  ></textarea>
                </div> -->
                <!-- <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">select1</span>
                    </label>
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">select2</span>
                    </label>
                    <select
                      class="select select-bordered border-base-content"
                      v-model="base.form.category_code"
                    >
                      <option disabled="disabled" selected="selected" value="0">
                        Choose store
                      </option>
                      <option
                        v-for="(v, i) in category.rows"
                        :key="i"
                        :value="v.code"
                      >
                        {{ v.title }}
                      </option>
                    </select>
                  </div>
                </div> -->

                <!-- <div class="form-control">
                  <label class="label cursor-pointer">
                    <span class="label-text">checkbox</span>
                    <input
                      type="checkbox"
                      class="toggle"
                      checked
                      v-model="base.form.recommend"
                    />
                  </label>
                </div> -->
                <div class="form-control pt-4">
                  <div class="w-full overflow-auto">
                    <label class="label cursor-pointer">
                      <span class="label-text">Email</span>
                    </label>
                    <table
                      class="table table-xs table-pin-rows table-pin-cols table-zebra"
                    >
                      <thead>
                        <tr>
                          <th>Active</th>
                          <th>Email</th>
                          <!-- <th>Color</th>

                        <th>Price</th>
                        <th>Link</th> -->
                          <th class="text-right">
                            <label
                              for="modal-detail"
                              class="btn btn-primary modal-button btn-xs text-white"
                              @click="detail_create()"
                              >+ new
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
                          <th>
                            <!-- {{ base.form.email }} -->
                            <div class="flex items-center space-x-3">
                              <!-- <label class="label cursor-pointer">
                    <span class="label-text"></span> -->
                              <!-- <input
                      type="checkbox"
                      class="toggle"
                      checked
                      
                    /> -->
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
                              <!-- </label> -->
                            </div>
                          </th>
                          <td>
                            <div class="flex items-center space-x-3">
                              <div>
                                <div class="font-bold">{{ v.email }}</div>
                                <div class="text-sm">
                                  {{ v.code }}
                                </div>
                              </div>
                            </div>
                          </td>

                          <!-- <td>{{ v.price }}</td> -->
                          <!-- <td>
                            <a :href="v.link" target="_blank">
                              <font-awesome-icon
                                v-if="v.link"
                                icon="fa-solid fa-globe"
                                size="1x"
                                class="btn btn-ghost modal-button btn-xs"
                            /></a>
                          </td> -->
                          <th class="text-right">
                            <label
                              for="modal-detail"
                              class="btn btn-link modal-button btn-xs"
                              @click="detail_edit(`${v.code}`, `${i}`)"
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
                                  'controllers/MYSQL/INTERNAL/HR/email'
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
                <!-- </div> -->
              </div>
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                class="tab"
                aria-label="Password"
                v-if="base.controll != 'create'"
              />
              <div
                role="tabpanel"
                class="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-auto w-full max-h-[60vh]"
              >
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Current Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Current Password"
                    class="input input-bordered border-base-content"
                    v-model="base.form.current_password"
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Password"
                    class="input input-bordered border-base-content"
                    v-model="base.form.new_password"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Confirm Password"
                    class="input input-bordered border-base-content"
                    v-model="base.form.confirm_password"
                  />
                </div>
              </div>
              <!-- <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                class="tab"
                aria-label="Access"
              /> -->
              <!-- <div
                role="tabpanel"
                class="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-auto w-full max-h-[60vh]"
              >
                <ul class="menu px-4 py-0">
                  <MenuComponent
                    v-if="base.modal"
                    :menutype="'access'"
                    :access="base.form.access"
                    @object_access="
                      (obj) => {
                        base.form.access = obj;
                      }
                    "
                  />
                </ul>
              </div> -->
            </div>

            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-base" class="btn btn-danger">Cancel</label>
              </div>
              <div class="flex-1 form-control mt-6" @click="base_save()">
                <button class="btn btn-primary text-white">Confirm</button>
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
            <h3 class="text-lg font-bold">Email</h3>
            <div class="card-body overflow-auto max-h-[60vh] ">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  class="input input-bordered border-base-content"
                  v-model="detail.form.email"
                />
              </div>
            </div>
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-detail" class="btn btn-danger">Cancel</label>
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

        <!-- Open the modal using ID.showModal() method -->

        <!-- The button to open modal -->

        <!-- Put this part before </body> tag -->

        <AppModuleGlobalShowImage :row="imagerow" />
      </template>
      <template #view>
        <div class="grid grid-cols-1 gap-6 lg:px-10 lg:py-2">
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body overflow-auto">
              <div class="join mt-5 w-full md:justify-center lg:justify-end">
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
              </div>
              <div class="overflow-x-auto w-full max-h-[60vh]">
                <table
                  class="table table-xs table-pin-rows table-pin-cols table-zebra"
                >
                  <thead>
                    <tr>
                      <th>id</th>
                      <!-- <td>รูป</td> -->
                      <td>ข้อมูลผู้พนักงาน</td>
                      <td>ติดต่อ</td>
                      <td>ตำแหน่ง</td>
                      <td>สิทธิ์การใช้งาน</td>
                      <td>วันที่</td>
                      <td>บันทึก</td>
                      <td>แก้ไข</td>
                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(v, i) in base.rows" :key="v.code">
                      <th>{{ v.id }}</th>
                      <td class="text-center">
                        <div
                          class="flex items-center gap-3"
                          v-if="v.image.length > 0"
                        >
                          <div class="avatar">
                            <div class="mask mask-square w-12 h-12">
                              <label
                                for="modal_showImage"
                                class="btn btn-link p-0"
                                @click="imagerow = row"
                              >
                                <img
                                  :src="`${
                                    v.image[v.master ? v.master : 0].temp
                                      ? `${serviceUrl}tmps/image/`
                                      : v.imageLink
                                      ? v.imageLink
                                      : `${serviceUrl}tmps/image/`
                                  }${
                                    v.image[v.master ? v.master : 0].file
                                  }`"
                                  alt="Image"
                                />
                              </label>
                            </div>
                          </div>
                          <div  class=" text-left">
                            <div class="font-bold">
                              <span class="pr-2">{{ v.firstname }}</span>
                              <span>{{ v.lastname }}</span>
                            </div>

                            <div class="text-sm">
                              รหัสพนักงาน : {{ v.uid }}
                            </div>
                            <div class="text-xs">
                              {{ v.code }}
                            </div>
                          </div>
                        </div>

                        <!-- <div class="avatar w-auto">
                          <label
                            for="modal_showImage"
                            class="btn btn-link p-0"
                            @click="imagerow = row"
                          >
                            <img
                              v-if="v.image.length > 0"
                              :src="`${
                                v.image[v.master ? v.master : 0].temp
                                  ? `${serviceUrl}tmps/image/`
                                  : v.imageLink
                                  ? v.imageLink
                                  : `${serviceUrl}tmps/image/`
                              }${v.image[v.master ? v.master : 0].file}`"
                              alt="Image"
                            />
                          </label>
                        </div> -->
                      </td>
                      <!-- <td>
                        <div>
                          <div class="font-bold">
                            <span class="pr-2">{{ v.firstname }}</span>
                            <span>{{ v.lastname }}</span>
                          </div>

                          <div class="text-sm">รหัสพนักงาน : {{ v.uid }}</div>
                          <div class="text-xs">
                            {{ v.code }}
                          </div>
                        </div>
                      </td> -->
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">
                              {{ v.emailTitle ? v.emailTitle : "-" }}
                            </div>
                            <div class="text-sm">
                              tel : {{ v.tel ? v.tel : "-" }}
                            </div>
                            <div class="text-sm">
                              วันเกิด :
                              {{
                                v.birthdate &&
                                $moment(v.birthdate).format("YYYY-MM-DD") >
                                  "2000"
                                  ? $moment(v.birthdate).format("YYYY-MM-DD")
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">
                              {{ v.position ? v.position : "-" }}
                            </div>
                            <div class="text-sm">
                              แผนก : {{ v.depTitle ? v.depTitle : "-" }}
                            </div>
                            <div class="text-sm">
                              สาขา :
                              {{ v.branchTitle ? v.branchTitle : "-" }}
                            </div>
                            <div class="text-sm">
                              {{ v.companyTitle ? v.companyTitle : "-" }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">
                              {{ v.accessTitle ? v.accessTitle : "-" }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-sm">
                              เริ่มงาน :
                              {{
                                v.started_at &&
                                $moment(v.started_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? $moment(v.started_at).format("YYYY-MM-DD")
                                  : "-"
                              }}
                            </div>
                            <div class="text-sm">
                              สิ้นสุด :
                              {{
                                v.leaves_at &&
                                $moment(v.leaves_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? $moment(v.leaves_at).format("YYYY-MM-DD")
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
                                v.created_at &&
                                $moment(v.created_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.created_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs opacity-30">
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
                            <div class="text-xs opacity-30">
                              {{
                                v.updated_fullname
                                  ? v.updated_fullname
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </td>

                      <th class="text-right">
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                          >edit
                        </label>

                        <label
                          for="modal-remove"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="
                            remove_item(
                              `${v.code}`,
                              'base',
                              'controllers/MYSQL/INTERNAL/HR/employee'
                            )
                          "
                          >remove
                        </label>
                      </th>
                    </tr>
                  </tbody>
                </table>
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
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import Query from "@/assets/js/fetch.js";

export default {
  name: "Department",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
  },
  data() {
    return {
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
          ref: "",
        },
      },
      remove: {
        current: 0,
        model: false,
        controll: "",
        tb: "",
      },
      imagerow: null,
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
      new Query('base','get').get(this, `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/HR/employee?total=1&page=${this.base.page}${
          this.base.row ? `&rows=${this.base.row}` : ""
        }${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
        } else  {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    base_create() {
      this.base.current = 0;
      this.base.form = {
        uid: "",
        firstname: "",
        lastname: "",
        current_password: "",
        new_password: "",
        confirm_password: "",
        email: "",
        tel: "",
        birthdate: "",
        department: "",
        branch: "",
        company: "",
        position: "",
        started_at: "",
        leaves_at: "",
        title: "",
        link: "",
        type: "",
        // imageLink_empty: "",
        // image_empty: [],
        // imageLink_active: "",
        // image_active: [],
        imageLink: "",
        image: [],
      };
      this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.detail.rows = [];
      this.base.controll = "edit";
      this.detail_search();
      this.refresh = true;
    },
    base_save() {
      let vm = this;

      let image = { ...this.base.form.image[0] };
      delete image.temp;

      if (this.base.controll != "create") {
        if (
          !this.base.form.current_password ||
          !this.base.form.new_password ||
          !this.base.form.confirm_password
        ) {
          // console.log("ASD")
        }
      } else {
        this.base.form.new_password = this.base.form.uid;
      }
      
      let obj = {
        rows: [
          {
            code: this.base.current,
            uid: this.base.form.uid,
            firstname: this.base.form.firstname,
            lastname: this.base.form.lastname,
            current_password: this.base.form.current_password,
            password: this.base.form.new_password,
            confirm_password: this.base.form.confirm_password,
            email: this.base.form.email,
            tel: this.base.form.tel,
            birthdate: this.base.form.birthdate,
            department: this.base.form.department,
            branch: this.base.form.branch,
            company: this.base.form.company,
            position: this.base.form.position,
            started_at: this.base.form.started_at,
            leaves_at: this.base.form.leaves_at,
            access: this.base.form.access,
            image: [image],
          },
        ]
      };

      new Query('base', this.base.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/employee`, obj, (res) => {
        if (!res.success) {
        // localStorage.removeItem("user_token");
        // this.$router.push({ name: `Login` });
        } else {
          this.base.modal = false;
          const promise_arr = [];
          console.log(this.base.current);
          if (this.base.current == 0) {
            this.base.current = res.row.code;
            let i = this.detail.rows.length;
            this.detail.controll = "create";
            for (i; i > 0; i--) {
              this.detail.form = {
                code: this.detail.rows[i - 1]["code"],
                title: this.detail.rows[i - 1]["title"],
              };
              promise_arr.push(
                new Promise(async function (resolve, reject) {
                  let res = await vm.detail_save("dynamic");
                  await resolve(res);
                  return;
                })
              );
            }
          }

          Promise.all(promise_arr)
            .then((res) => {
              // console.log(res);
              vm.base_search();
            })
            .catch((err) => console.error(err));
        }
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
      new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/email?total=1&page=${
          this.detail.page
        }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
          this.detail.q ? `&q=${this.detail.q}` : ""
        }${this.base.current ? `&current=${this.base.current}` : ``}`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
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
        title: "",
        price: "",
        image: [],
        imageLink: "",
        color: "",
        color_code: "",
        link: "",
      };
      this.detail.controll = "create";
    },
    detail_edit(code, index) {
      // console.log("detail_edit");
      // this.clearimage();
      // console.log(id,index);
      // setTimeout(() => {
      this.detail.current = code;
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.form.color = this.detail.form.color == "0" ? false : true;

      // console.log(this.detail.form.image);
      this.detail.form.image.forEach((v, i) => {
        // console.log(v);
        this.detail.form.image[i] = Object.assign(
          {},
          this.detail.form.image[i]
        );
      });

      // console.log(this.detail.form);
      // this.detail.form.image = JSON.parse(this.detail.form.image)

      // }, 5000);

      // this.base.form = this.base.rows[index]
      this.detail.current = id;
      // this.detail_search();

      this.detail.controll = "edit";
    },
    detail_save(type) {
      if (!this.base.current) {
        if (this.detail.controll == "create") {
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
        let obj = {
          emp: this.base.current,
          code: this.detail.form.code,
          email: this.detail.form.email,
        };
        console.log(obj);
        if (this.detail.controll == "edit") {
          obj["code"] = this.detail.form.code;
        }

        new Query('base', this.detail.controll == "create" ? "POST" : "PUT").set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/email`, obj, (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            this.detail.modal = false;

            if (type == "static") {
              this.detail_search();
            }
            // this.base_search();
          }
        });
      }
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
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            // console.log(res);
            this.remove.modal = false;
            this[`${this.remove.controll}_search`]();
          }
          // callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          // callback([]);
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
<style scrop>
tr,
td {
  white-space: nowrap;
}
</style>

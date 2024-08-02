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
          class="modal-box relative w-11/12 max-w-5xl p-2 lg:p-4 max-h-screen"
        >
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕
          </label>
          <h3 class="text-lg font-bold text-primary">EMPLOYEE</h3>
          <div class="divider my-1"></div>
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
                  :fileLink="`${base.form.imageLink}employee/${base.form.code}/`"
                  :file="base.form.image"
                  :id="'base'"
                  :multiple="false"
                  @respone="
                    (res) => {
                      base.form.image = base.form.image.concat(res.file);
                    }
                  "
                  @uploaded="
                    (res) => {
                      let index = this.base.form.image.findIndex(
                        (v) => v.r == res.r
                      );
                      this.base.form.image[index].upload = false;
                      this.base.form.image[index].file = res.row.file;
                    }
                  "
                  @stream="
                    (res) => {
                      let index = base.form.image.findIndex((v) => v.r == res.r);
                      base.form.image[index].loading = res.loading;
                    }
                  "
                  @error="
                    (res) => {
                      let index = base.form.image.findIndex((v) => v.r == res.r);
                      base.form.image[index].error = true;
                    }
                  "
                  @again="
                    (res) => {
                      let index = base.form.image.findIndex(
                        (v) => v.r == res.file.r
                      );
                      base.form.image[index] = res.file;
                    }
                  "
                  @resetdata="
                    (res) => {
                      base.form.image = [...res.file];
                    }
                  "
                />
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Company</span>
                  </label>
                  <AppModuleGlobalSelectSearch
                    :placeholder="'Company'"
                    :label="'title'"
                    :code="'code'"
                    :customClass="`input input-bordered border-base-content`"
                    :current="base.form.company"
                    @updateValue="
                      (obj) => {
                        base.form.company_data = obj;
                        base.form.company = obj.code;
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
                    <span class="label-text">Branch</span>
                  </label>
                  <AppModuleGlobalSelectSearch
                    :placeholder="'Branch'"
                    :label="'title'"
                    :code="'code'"
                    :minChar="3"
                    :delay="0.5"
                    :limit="10"
                    :customClass="`input input-bordered border-base-content`"
                    :current="base.form.branch"
                    @updateValue="
                      (obj) => {
                        base.form.branch_data = obj;
                        base.form.branch = obj.code;
                      }
                    "
                    :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/branch`"
                    :param="`&total=1`"
                    :image="false"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Emp Code</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Emp Code"
                    class="input input-bordered border-base-content"
                    v-model="base.form.uid"
                  />
                </div>
              </div>
              <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Firstname</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Firstname"
                    class="input input-bordered border-base-content"
                    v-model="base.form.firstname"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Lastname</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Lastname"
                    class="input input-bordered border-base-content"
                    v-model="base.form.lastname"
                  />
                </div>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Department</span>
                </label>
                <AppModuleGlobalSelectSearch
                  :placeholder="'Department'"
                  :label="'title'"
                  :code="'code'"
                  :minChar="3"
                  :delay="0.5"
                  :limit="10"
                  :customClass="`input input-bordered border-base-content`"
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
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Position</span>
                </label>
                <input
                  type="text"
                  placeholder="Position"
                  class="input input-bordered border-base-content"
                  v-model="base.form.position"
                />
              </div>
              <div class="grid gap-4 md:grid-cols-1 grid-cols-1">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Access</span>
                  </label>
                  <AppModuleGlobalSelectSearch
                    :placeholder="'Access'"
                    :label="'title'"
                    :code="'code'"
                    :minChar="3"
                    :delay="0.5"
                    :limit="10"
                    :customClass="`input input-bordered border-base-content`"
                    :current="base.form.access_code"
                    @updateValue="
                      (obj) => {
                        base.form.access_data = obj;
                        base.form.access_code = obj ? obj.code : '';
                      }
                    "
                    :url="`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/access`"
                    :param="`&total=1`"
                    :image="false"
                  />
                </div>
              </div>
              <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Tel</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Tel"
                    class="input input-bordered border-base-content"
                    v-model="base.form.tel"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Birthday</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Birthday"
                    class="input input-bordered border-base-content"
                    v-model="base.form.birthdate"
                  />
                </div>
              </div>
              <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Work Start Date</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Work Start Date"
                    class="input input-bordered border-base-content"
                    v-model="base.form.started_at"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">End Of Work Date</span>
                  </label>
                  <input
                    type="date"
                    placeholder="End Of Work Date"
                    class="input input-bordered border-base-content"
                    v-model="base.form.leaves_at"
                  />
                </div>
              </div>
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
                        <th v-if="removing">
                          <input
                            type="checkbox"
                            class="checkbox checkbox-sm"
                            id="my-checkbox"
                            ref="removeingList"
                            @click="
                              () => {
                                $refs.removeingList.indeterminate = false;
                                if ($refs.removeingList.checked) {
                                  detail.rows = detail.rows.map((v) => {
                                    v.remove = true;
                                    return v;
                                  });
                                } else {
                                  detail.rows = detail.rows.map((v) => {
                                    v.remove = false;
                                    return v;
                                  });
                                }
                              }
                            "
                          />
                        </th>
                        <th>#</th>
                        <td>Code</td>
                        <td>Email</td>
                        <th class="text-right">
                          <div v-if="!removing">
                            <button
                              class="btn btn-xs btn-primary text-white mr-1"
                              :class="base.controll != 'create' ? 'mr-1' : ''"
                              @click="detail_add_row()"
                            >
                              <Icon icon="el:file-new" />
                            </button>
                            <button
                              v-if="base.controll != 'create'"
                              class="btn btn-xs btn-error text-white"
                              @click="removing = true"
                            >
                              <Icon icon="icomoon-free:bin" />
                            </button>
                          </div>
                          <div v-else>
                            <label
                              for="modal-remove"
                              class="btn btn-xs btn-error text-white mr-1"
                              @click="
                                removeAllSelect(
                                  'detail',
                                  'controllers/MYSQL/INTERNAL/HR/email'
                                )
                              "
                            >
                              <Icon icon="ic:outline-check" />
                            </label>
                            <button
                              class="btn btn-xs btn-warning btn-primary text-white mr-1"
                              @click="
                                () => {
                                  removing = false;
                                  this.detail.rows.map(
                                    (v) => (v['remove'] = false)
                                  );
                                }
                              "
                            >
                              <Icon icon="ic:twotone-close" />
                            </button>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="hover"
                        v-for="(v, i) in detail.rows"
                        :key="i"
                        :class="`${v.removed || v.remove ? 'disabled' : ''}`"
                      >
                        <th v-if="removing">
                          <div class="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              class="checkbox checkbox-sm"
                              :checked="v.remove"
                              @click="
                                () => {
                                  v.remove = !v.remove;
                                  let remove = detail.rows.filter(
                                    (v) => v.remove
                                  );
                                  if (remove.length == 0) {
                                    $refs.removeingList.checked = false;
                                    $refs.removeingList.indeterminate = false;
                                  } else if (
                                    remove.length == detail.rows.length
                                  ) {
                                    $refs.removeingList.checked = true;
                                    $refs.removeingList.indeterminate = false;
                                  } else {
                                    $refs.removeingList.checked = false;
                                    $refs.removeingList.indeterminate = true;
                                  }
                                }
                              "
                            />
                          </div>
                        </th>
                        <th>
                          <div class="flex items-center space-x-3">
                            <input
                              :disabled="!v.id || removing"
                              type="checkbox"
                              :checked="v.code == base.form.email"
                              class="checkbox checkbox-sm"
                              @click="
                                () => {
                                  base.form.email =
                                    base.form.email == v.code ? '' : v.code;
                                }
                              "
                            />
                          </div>
                        </th>
                        <td>
                          <div class="text-sm" v-if="!v.new">
                            <span
                              v-if="v.edit"
                              class="badge badge-sm badge-warning text-white"
                            >
                              Edit
                            </span>
                            <span>{{ v.code ? v.code : "-" }}</span>
                          </div>
                          <span
                            v-else
                            class="badge badge-sm badge-primary text-white"
                          >
                            N<span class="hidden md:block">ew</span>
                          </span>
                        </td>
                        <td>
                          <!-- <div class="flex items-center space-x-3"> -->
                          <!-- <div> -->
                          <!-- <div class="font-bold"> -->
                          <input
                            class="input input-xs input-bordered border-base-content join-item w-full"
                            placeholder="Email"
                            v-model="v.email"
                            @keyup="
                              () => {
                                v.new ? '' : (v.edit = true);
                              }
                            "
                            :disabled="removing"
                          />
                          <!-- </div> -->
                          <!-- </div> -->
                          <!-- </div> -->
                        </td>
                        <th class="text-right">
                          <label
                            v-if="!removing && v.id"
                            for="modal-remove"
                            class="btn btn-link no-underline text-error modal-button btn-xs"
                            @click="
                              remove_item(
                                `${v.code}`,
                                'detail',
                                'controllers/MYSQL/INTERNAL/HR/email'
                              )
                            "
                          >
                            Remove
                          </label>
                          <button
                            v-if="!removing && !v.id"
                            class="btn btn-link no-underline text-error modal-button btn-xs"
                            @click="detail.rows.splice(index, 1)"
                          >
                            Drop
                          </button>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              class="tab"
              aria-label="Update Password"
              v-if="base.controll != 'create'"
            />
            <div
              role="tabpanel"
              class="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-auto w-full max-h-[60vh]"
            >
              <div class="form-control">
                <label class="label">
                  <span class="label-text">New Password</span>
                </label>
                <input
                  type="text"
                  placeholder="Password"
                  class="input input-bordered border-base-content"
                  v-model="base.form.new_password"
                />
              </div>
            </div>
          </div>
          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
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
      <AppModuleGlobalShowImage :src="imageSrc" />
    </template>
    <template #view>
      <div class="gap-3 py-3">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-2 lg:p-4">
            <div>
              <div
                v-if="base.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :type="'text'"
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div :class="`${base.loading ? 'blur-sm' : ''}`">
                <div class="join w-full justify-center md:justify-end">
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
                  <!-- <label
                 
                    class="join-item btn-sm btn btn-primary modal-button text-white"
                    @click="exportExcel()"  
                    >Export</label
                  > -->
                  <button
            class="join-item btn btn-sm btn-primary"
            @click="exportExcel()"
          >
            <Icon icon="mdi:file-excel-outline" class="h-5 w-5 text-white" />
          </button>
                </div>
                <div
                  class="overflow-x-auto w-full max-h-[69vh] my-2"
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
                        <td></td>
                        <td>Code</td>
                        <td>Information</td>
                        <td>Contact</td>
                        <td>Position</td>
                        <td>Access</td>
                        <td>Date</td>
                        <td>Creation</td>
                        <td>Updation</td>
                        <th class="text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(v, i) in base.rows" :key="v.code">
                        <th>
                          {{ v.id }}
                        </th>
                        <td>
                          <div class="avatar static">
                            <div class="w-12 h-12">
                              <label
                                for="modal_showImage"
                                class="btn btn-link p-0"
                                v-if="v.image.length > 0"
                                @click="
                                  v.image.length > 0
                                    ? (imageSrc = `${
                                        v.image[v.master ? v.master : 0].temp
                                          ? `${serviceUrl}tmps/image/`
                                          : v.imageLink
                                          ? `${v.imageLink}employee/${v.code}/`
                                          : `${serviceUrl}tmps/image/`
                                      }${
                                        v.image[v.master ? v.master : 0].file
                                      }`)
                                    : ''
                                "
                              >
                                <!-- {{v.image}} -->
                                <img
                                  :src="`${
                                    v.image[v.master ? v.master : 0].temp
                                      ? `${serviceUrl}tmps/image/`
                                      : v.imageLink
                                      ? `${v.imageLink}employee/${v.code}/`
                                      : `${serviceUrl}tmps/image/`
                                  }${v.image[v.master ? v.master : 0].file}`"
                                  alt="Image"
                                  style="object-fit: contain"
                                  @error="
                                    (e) => {
                                      e.target.src = `${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyProfile.png&s=10`;
                                    }
                                  "
                                />
                              </label>
                              <img
                                width="auto"
                                height="auto"
                                class="max-h-44 object-cover bg-cover"
                                v-else
                                :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=web/emptyProfile.png&s=10`"
                                alt="Image"
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          {{ v.code }}
                        </td>
                        <td class="text-center">
                          <div class="flex items-center gap-3">
                            <div class="text-left">
                              <div
                                class="font-bold"
                                v-if="v.lastname || v.lastname"
                              >
                                <span class="pr-2" v-if="v.firstname">{{
                                  v.firstname
                                }}</span>
                                <span v-if="v.lastname">{{ v.lastname }}</span>
                              </div>

                              <div class="font-bold" v-else>-</div>

                              <div class="text-sm">
                                UID : {{ v.uid ? v.uid : "-" }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="font-bold">
                                {{ v.emailTitle ? v.emailTitle : "-" }}
                              </div>
                              <div class="text-sm">
                                Tel : {{ v.tel ? v.tel : "-" }}
                              </div>
                              <div class="text-sm">
                                Birthday :
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
                                Department : {{ v.depTitle ? v.depTitle : "-" }}
                              </div>
                              <div class="text-sm">
                                Branch :
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
                                Start :
                                {{
                                  v.started_at &&
                                  $moment(v.started_at).format("YYYY-MM-DD") >
                                    "2000"
                                    ? $moment(v.started_at).format("YYYY-MM-DD")
                                    : "-"
                                }}
                              </div>
                              <div class="text-sm">
                                End :
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
                              <div class="text-xs">
                                {{
                                  v.created_fullname ? v.created_fullname : "-"
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
                                  v.updated_fullname ? v.updated_fullname : "-"
                                }}
                              </div>
                            </div>
                          </div>
                        </td>

                        <th class="text-right">
                          <label
                            for="modal-base"
                            class="join-item btn btn-link text-warning no-underline modal-button btn-xs"
                            @click="base_edit(`${v.code}`, `${i}`)"
                            >Edit
                          </label>

                          <label
                            for="modal-remove"
                            class="join-item btn btn-link text-error no-underline modal-button btn-xs"
                            @click="
                              remove_item(
                                `${v.code}`,
                                'base',
                                'controllers/MYSQL/INTERNAL/HR/employee'
                              )
                            "
                            >Remove 
                            <!-- {{ v.code }} -->
                          </label>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="grid gap-3 lg:grid-cols-2 grid-cols-1">
                <div class="text-left text-sm">
                  Show :
                  <select class="select select-bordered select-xs w-fit bg-yellow-50" 
                    v-model="base.row" 
                    @change="base_search()"
                  >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                  |
                  Showing {{ base.page == Math.ceil(base.total/base.row) ? 1 + (base.row*(base.page - 1)) : 1 + ((base.page - 1)*base.row) }} to {{ base.page == Math.ceil(base.total/base.row) ? base.total : base.row*base.page }} of {{ base.total }} entries
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
  name: "Employee",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
  },
  data() {
    return {
      temp: [],
      removing: false,
      base: {
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
  },
  methods: {
    // exportExcel() {
    //   return window.open(`${
    //     this.serviceUrl
    //   }api/controllers/MYSQL/INTERNAL/WH/exports?db=shelf&total=1&page=${
    //     this.base.page
    //   }${this.base.row ? `&rows=${this.base.row}` : ""}${
    //     this.base.q ? `&q=${this.base.q}` : ""
    //   }${this.wh ? `&wh=${this.wh}` : ""}${
    //     this.date.from ? `&createFrom=${this.date.from}` : ""
    //   }${
    //     this.date.to ? `&createTo=${this.date.to}` : ""
    //   }&transref=I&transref_type_null=1&sumQuantitys=1

    //     `);
    // },
    // exportExcel() {
    //   return window.open(`${
    //     this.serviceUrl
    //   }api/controllers/MYSQL/INTERNAL/GLOBAL/exports?type=stock&total=1&page=${
    //     this.base.page
    //   }${this.base.row ? `&rows=${this.base.row}` : ""}${
    //     this.base.q ? `&q=${this.base.q}` : ""
    //   }${this.wh ? `&wh=${this.wh}` : ""}${
    //     this.date.from ? `&createFrom=${this.date.from}` : ""
    //   }${
    //     this.date.to ? `&createTo=${this.date.to}` : ""
    //   }&transref=I&transref_type_null=1`);
    // },
    exportExcel() {
      // console.log("DASDSAASD")
      return window.open(`${
        this.serviceUrl
      }api/controllers/MYSQL/INTERNAL/GLOBAL/exports?type=emp&total=1&page=${
        this.base.page
      }${this.base.row ? `&rows=${this.base.row}` : ""}${
        this.base.q ? `&q=${this.base.q}` : ""
      }

        `);
    },
    // base
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
        }, 250);
      });
    },
    base_get(callback) {
      new Query("base", "get").get(
        this,
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/HR/employee?total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }`,
        (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });
          }
          callback({ ...res });
        }
      );
    },
    base_create() {
      this.removing = false;
      this.base.current = 0;
      this.base.form = {
        code: "",
        imageLink: "",
        image: [],
      };
      this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.removing = false;
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.detail.rows = [];
      this.base.controll = "edit";
      this.detail_search();
    },
    base_save() {
      let vm = this;
      let image = this.base.form.image[0]
        ? { ...this.base.form.image[0] }
        : null;
      image ? delete image.temp : "";
      if (this.base.controll == "create") {
        this.base.form.new_password = this.base.form.uid;
      }
      let obj = {
        code: this.base.current,
        rows: [
          {
            ...Object.assign(
              { ...this.base.form },
              {
                image: image ? [image] : [],
              }
            ),
          },
        ],
      };

      new Query("base", this.base.controll == "create" ? "POST" : "PUT").set(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/employee`,
        obj,
        (res) => {
          if (!res.success) {
          } else {
            this.base.current == 0
              ? (this.base.current = res.rows[0].code)
              : "";
            this.detail.controll = "create";
            const detail = new Promise(
              async (resolve, reject) => await resolve(vm.detail_save())
            );

            detail.then((res) => {
              this.base.modal = false;
              this.base.page = 1;
              this.detail.page = 1;
              this.base_search();
            });
          }
        }
      );
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
      });
    },
    detail_get(callback) {
      new Query("detail", "get").get(
        this,
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/HR/email?total=1&page=${
          this.detail.page
        }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
          this.detail.q ? `&q=${this.detail.q}` : ""
        }${this.base.current ? `&current=${this.base.current}` : ``}`,
        (res) => {
          if (res.success) {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });
          }
          callback({ ...res });
        }
      );
    },
    detail_add_row() {
      this.detail.form = {
        code: this.$moment().format("YYYYMMDD") + this.detail.rows.length,
        new: true,
      };
      this.detail.rows.unshift(this.detail.form);
    },
    detail_create() {
      this.detail.current = 0;
      this.detail.form = {
        code: "",
      };
      this.detail.controll = "create";
    },
    detail_edit(code) {
      this.detail.current = code;
      let index = this.detail.rows.findIndex(
        (v) => v.code == this.detail.current
      );
      this.detail.form = Object.assign({}, this.detail.rows[index]);
      this.detail.controll = "edit";
    },
    detail_save() {
      let rows = this.detail.rows.map((v) =>
        Object.assign({}, v, { emp: this.base.current })
      );
      if (rows.length == 0) {
        return;
      }

      let object = {
        POST: rows.filter((v) => v.new),
        PUT: rows.filter((v) => v.edit),
      };

      console.log(object);
      for (let key in object) {
        if (object[key].length == 0) {
          continue;
        }

        new Query("detail", key).set(
          this,
          `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/email`,
          { rows: object[key] },
          (res) => {
            if (!res.success) {
            } else {
              console.log(res);
            }
          }
        );
      }
    },
    // REMOVE
    removeAllSelect(controll, tb) {
      // this.removing = false;
      let rows = this.detail.rows.filter((v) => v["remove"]);

      // console.log(code);
      this.remove.rows = rows;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    remove_item(code, controll, tb) {
      // console.log(code);
      this.remove.rows = null
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
          rows: this.remove.rows
            ? this.remove.rows
            : [{ code: this.remove.code }],
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (!res.success) {
          } else {
            let index = this.detail.rows.findIndex(
              (v) => v.code == this.remove.code
            );
            console.log(this.remove.rows ? "a" : "b");
            this.remove.rows
              ? (this.remove.rows = [])
              : index >= 0
              ? (this.detail.rows[index]["removed"] = true)
              : "";
            this.remove.modal = false;
            this.removing = false;
            this.remove.controll == "detail"
              ? ""
              : this[`${this.remove.controll}_search`]();
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

<style>
tr.disabled {
  pointer-events: none;
  opacity: 0.3;
  text-decoration: line-through;
  text-decoration-color: red;
}
</style>

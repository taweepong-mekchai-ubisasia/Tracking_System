<template>
  <teleport to="#app">
    <input type="checkbox" class="modal-toggle" v-model="base.form.modal" />
    <div class="modal z-40" v-if="base.form.modal">
      <div
        class="modal-box relative w-11/12 max-w-5xl p-2 lg:p-4 max-h-screen"
      >
        <button
          @click="base.form.modal = false"
          class="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2"
          :disabled="base.form.loading"
        >
          ✕
        </button>
        <h3 class="text-md md:text-lg font-bold text-primary">EMPLOYEE</h3>
        <div class="divider my-1"></div>
					<div role="tablist" class="tabs tabs-lifted">
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              class="tab"
              style="width: 140px;"
              aria-label="Information"
              checked
            />
            <div
              role="tabpanel"
              class="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-auto w-full max-h-[75vh]"
            >
              <div class="grid md:grid-cols-2 grid-cols-1 gap-3">
                <div class="grid gap-3 grid-cols-1">
                  <AppModuleGlobalUpload
                    :fileLink="`${base.form.object.imageLink}employee/${base.form.object.code}/`"
                    :file="base.form.object.image"
                    :id="'base'"
                    :multiple="false"
                    @respone="
                      (res) => {
                        base.form.object.image = base.form.object.image.concat(res.file);
                      }
                    "
                    @uploaded="
                      (res) => {
                        let index = base.form.object.image.findIndex(
                          (v) => v.r == res.r
                        );
                        base.form.object.image[index].upload = false;
                        base.form.object.image[index].file = res.row.file;
                      }
                    "
                    @stream="
                      (res) => {
                        let index = base.form.object.image.findIndex((v) => v.r == res.r);
                        base.form.object.image[index].loading = res.loading;
                      }
                    "
                    @error="
                      (res) => {
                        let index = base.form.object.image.findIndex((v) => v.r == res.r);
                        base.form.object.image[index].error = true;
                      }
                    "
                    @again="
                      (res) => {
                        let index = base.form.object.image.findIndex(
                          (v) => v.r == res.file.r
                        );
                        base.form.object.image[index] = res.file;
                      }
                    "
                    @resetdata="
                      (res) => {
                        base.form.object.image = [...res.file];
                      }
                    "
                  />
                </div>
                <div>
                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text text-xs sm:text-sm font-semibold text-blue-500 underline underline-offset-2">มีการใช้งานคอมพิวเตอร์ของบริษัท</span>
                      <input 
                        type="checkbox" 
                        class="toggle toggle-sm" 
                        v-model="haveComputer" 
                        @change="haveComputer ? fnComputer.search : ''"
                      />
                    </label>
                  </div>
                  <div class="grid gap-3 grid-cols-2">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text text-xs sm:text-sm">Company</span>
                      </label>
                      <AppModuleGlobalSelectSearch
                        :placeholder="'Company'"
                        :label="'title'"
                        :code="'code'"
                        :customClass="`input input-xs sm:input-sm md:input-md input-bordered border-base-content`"
                        :current="base.form.object.company"
                        @updateValue="
                          (obj) => {
                            base.form.object.company_data = obj;
                            base.form.object.company = obj.code;
                          }
                        "
                        :url="`${serviceUrl}api/controllers/MYSQL/INTERNAL/System/company`"
                        :param="`&total=1`"
                      />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text text-xs sm:text-sm">Branch</span>
                      </label>
                      <AppModuleGlobalSelectSearch
                        :placeholder="'Branch'"
                        :label="'title'"
                        :code="'code'"
                        :minChar="3"
                        :delay="0.5"
                        :limit="10"
                        :customClass="`input input-xs sm:input-sm md:input-md input-bordered border-base-content`"
                        :current="base.form.object.branch"
                        @updateValue="
                          (obj) => {
                            base.form.object.branch_data = obj;
                            base.form.object.branch = obj.code;
                          }
                        "
                        :url="`${serviceUrl}api/controllers/MYSQL/INTERNAL/System/branch`"
                        :param="`&total=1`"
                        :image="false"
                      />
                    </div>
                  </div>
                  <div class="grid gap-3 sm:grid-cols-3 grid-cols-2">
                    <div class="form-control sm:col-span-1 col-span-2">
                      <label class="label">
                        <span class="label-text text-xs sm:text-sm">Emp Code</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Emp Code"
                        class="input input-xs sm:input-sm md:input-md input-bordered border-base-content"
                        v-model="base.form.object.uid"
                      />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text text-xs sm:text-sm">Firstname</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Firstname"
                        class="input input-xs sm:input-sm md:input-md input-bordered border-base-content"
                        v-model="base.form.object.firstname"
                      />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text text-xs sm:text-sm">Lastname</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Lastname"
                        class="input input-xs sm:input-sm md:input-md input-bordered border-base-content"
                        v-model="base.form.object.lastname"
                      />
                    </div>
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text text-xs sm:text-sm">Department</span>
                    </label>
                    <AppModuleGlobalSelectSearch
                      :placeholder="'Department'"
                      :label="'title'"
                      :code="'code'"
                      :minChar="3"
                      :delay="0.5"
                      :limit="10"
                      :customClass="`input input-xs sm:input-sm md:input-md input-bordered border-base-content`"
                      :current="base.form.object.department"
                      @updateValue="
                        (obj) => {
                          base.form.object.department_data = obj;
                          base.form.object.department = obj.code;
                        }
                      "
                      :url="`${serviceUrl}api/controllers/MYSQL/INTERNAL/System/department`"
                      :param="`&total=1&wh=wh1&rac_list=1`"
                      :image="false"
                    />
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text text-xs sm:text-sm">Position</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Position"
                      class="input input-xs sm:input-sm md:input-md input-bordered border-base-content"
                      v-model="base.form.object.position"
                    />
                  </div>
                  <div class="grid gap-3 grid-cols-1">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text text-xs sm:text-sm">Access</span>
                      </label>
                      <AppModuleGlobalSelectSearch
                        :placeholder="'Access'"
                        :label="'title'"
                        :code="'code'"
                        :minChar="3"
                        :delay="0.5"
                        :limit="10"
                        :customClass="`input input-xs sm:input-sm md:input-md input-bordered border-base-content`"
                        :current="base.form.object.access_code"
                        @updateValue="
                          (obj) => {
                            base.form.object.access_data = obj;
                            base.form.object.access_code = obj ? obj.code : '';
                          }
                        "
                        :url="`${serviceUrl}api/controllers/MYSQL/INTERNAL/System/access`"
                        :param="`&total=1`"
                        :image="false"
                      />
                    </div>
                  </div>
                  <div class="grid gap-3 grid-cols-1">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text text-xs sm:text-sm">Tel</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Tel"
                        class="input input-xs sm:input-sm md:input-md input-bordered border-base-content"
                        v-model="base.form.object.tel"
                      />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text text-xs sm:text-sm">Birthday</span>
                      </label>
                      <input
                        type="date"
                        placeholder="Birthday"
                        class="input input-xs sm:input-sm md:input-md input-bordered border-base-content"
                        v-model="base.form.object.birthdate"
                      />
                    </div>
                  </div>
                  <div class="grid gap-3 grid-cols-2">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text text-xs sm:text-sm">Work Start Date</span>
                      </label>
                      <input
                        type="date"
                        placeholder="Work Start Date"
                        class="input input-xs sm:input-sm md:input-md input-bordered border-base-content"
                        v-model="base.form.object.started_at"
                      />
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text text-xs sm:text-sm">End Of Work Date</span>
                      </label>
                      <input
                        type="date"
                        placeholder="End Of Work Date"
                        class="input input-xs sm:input-sm md:input-md input-bordered border-base-content"
                        v-model="base.form.object.leaves_at"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-control pt-1">
                <div class="w-full overflow-auto">
                  <label class="label cursor-pointer">
                    <span class="label-text text-xs sm:text-sm">Email</span>
                  </label>
                  <table
                    class="table table-xs table-pin-rows table-pin-cols table-zebra"
                  >
                    <thead>
                      <tr>
                        <th v-if="base.removing">
                          <input
                            type="checkbox"
                            class="checkbox checkbox-sm"
                            id="my-checkbox"
                            ref="removeingList"
                            @click="
                              () => {
                                $refs.removeingList.indeterminate = false;
                                if ($refs.removeingList.checked) {
                                  detail.data.rows = detail.data.rows.map((v) => {
                                    v.remove = true;
                                    return v;
                                  });
                                } else {
                                  detail.data.rows = detail.data.rows.map((v) => {
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
                          <div v-if="!base.removing">
                            <button
                              class="btn btn-xs btn-primary text-white mr-1"
                              :class="base.controll != 'create' ? 'mr-1' : ''"
                              @click="fnDetail.add_row()"
                            >
                              <Icon icon="el:file-new" />
                            </button>
                            <button
                              v-if="base.controll != 'create'"
                              class="btn btn-xs btn-error text-white"
                              @click="base.removing = true"
                            >
                              <Icon icon="icomoon-free:bin" />
                            </button>
                          </div>
                          <div v-else>
                            <label
                              for="modal-remove"
                              class="btn btn-xs btn-error text-white mr-1"
                              @click="
                                fnDetail.remove_all_item(
                                  'api/controllers/MYSQL/INTERNAL/HR/email'
                                )
                              "
                            >
                              <Icon icon="ic:outline-check" />
                            </label>
                            <button
                              class="btn btn-xs btn-warning btn-primary text-white mr-1"
                              @click="
                                () => {
                                  base.removing = false;
                                  detail.data.rows.map(
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
                        v-for="(v, i) in detail.data.rows"
                        :key="i"
                        :class="`${v.removed || v.remove ? 'disabled' : ''}`"
                      >
                        <th v-if="base.removing">
                          <div class="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              class="checkbox checkbox-sm"
                              :checked="v.remove"
                              @click="
                                () => {
                                  v.remove = !v.remove;
                                  let remove = detail.data.rows.filter(
                                    (v) => v.remove
                                  );
                                  if (remove.length == 0) {
                                    $refs.removeingList.checked = false;
                                    $refs.removeingList.indeterminate = false;
                                  } else if (
                                    remove.length == detail.data.rows.length
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
                              :disabled="!v.id || base.removing"
                              type="checkbox"
                              :checked="v.code == base.form.object.email"
                              class="checkbox checkbox-sm"
                              @click="
                                () => {
                                  base.form.object.email =
                                    base.form.object.email == v.code ? '' : v.code;
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
                          <input
                            class="input input-xs input-bordered border-base-content join-item w-full"
                            placeholder="Email"
                            v-model="v.email"
                            @keyup="
                              () => {
                                v.new ? '' : (v.edit = true);
                              }
                            "
                            :disabled="base.removing"
                          />
                        </td>
                        <th class="text-right">
                          <label
                            v-if="!base.removing && v.id"
                            for="modal-remove"
                            class="btn btn-link no-underline text-error modal-button btn-xs"
                            @click="
                              fnDetail.remove_item(
                                v.code,
                                'api/controllers/MYSQL/INTERNAL/HR/email'
                              )
                            "
                          >
                            Remove
                          </label>
                          <button
                            v-if="!base.removing && !v.id"
                            class="btn btn-link no-underline text-error modal-button btn-xs"
                            @click="detail.data.rows.splice(index, 1)"
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
              style="width: 140px;"
              aria-label="Update Password"
              v-if="base.form.method != 'POST'"
            />
            <div
              role="tabpanel"
              class="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-auto w-full max-h-[75vh]"
            >
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-xs sm:text-sm">New Password</span>
                </label>
                <input
                  type="text"
                  placeholder="Password"
                  class="input input-xs sm:input-sm md:input-md input-bordered border-base-content"
                  v-model="base.form.object.new_password"
                />
              </div>
            </div>
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              class="tab"
              style="width: 140px;"
              aria-label="Computer"
              v-if="haveComputer"
            />
            <div
              role="tabpanel"
              class="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-auto w-full max-h-[75vh]"
            >
              <div class="grid gap-4 grid-cols-1">
                <AppModuleGlobalUpload
                  :fileLink="`${computer.data.form.object.imageLink}computer/${computer.data.form.object.code}/`"
                  :file="computer.data.form.object.file"
                  :id="'computer'"
                  :multiple="true"
                  :type="'pdf'"
                  @respone="
                    (res) => {
                      computer.data.form.object.file = computer.data.form.object.file.concat(res.file);
                    }
                  "
                  @uploaded="
                    (res) => {
                      let index = computer.data.form.object.file.findIndex(
                        (v) => v.r == res.r
                      );
                      computer.data.form.object.file[index].upload = false;
                      computer.data.form.object.file[index].file = res.row.file;
                    }
                  "
                  @stream="
                    (res) => {
                      let index = computer.data.form.object.file.findIndex((v) => v.r == res.r);
                      computer.data.form.object.file[index].loading = res.loading;
                    }
                  "
                  @error="
                    (res) => {
                      let index = computer.data.form.object.file.findIndex((v) => v.r == res.r);
                      computer.data.form.object.file[index].error = true;
                    }
                  "
                  @again="
                    (res) => {
                      let index = computer.data.form.object.file.findIndex(
                        (v) => v.r == res.file.r
                      );
                      computer.data.form.object.file[index] = res.file;
                    }
                  "
                  @resetdata="
                    (res) => {
                      computer.data.form.object.file = [...res.file];
                    }
                  "
                />
              </div>
              <div class="grid gap-3 grid-cols-2">
                <div class="form-control">
                  <AppModuleGlobalCombobox
                    :url="`api/controllers/MYSQL/INTERNAL/IT/computer`"
                    :label="'รุ่น'"
                    :selectMode="'single'"
                    :image="false"
                    :fieldDisplay="'model_w_uuid'"
                    :lastDisplay="computer.data.form.object.model_title"
                    :lastFile="''"
                    :objectData="['code','model_w_uuid','model_title','uuid_start','uuid_end']"
                    :component="'App/Module/Pages/Computer/Modal/Computer'"
                    :param="[
                      {
                        debug: true,
                      }
                    ]"
                    v-model="computer.data.form.temp.model"
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-xs sm:text-sm">Serial No.</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type Serial No."
                    class="input input-xs sm:input-sm md:input-md input-bordered border-base-content text-xs sm:text-sm md:text-md"
                    v-model="computer.data.form.temp.serial"
                  />
                </div>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-xs sm:text-sm">UUID</span>
                </label>
                <div class="join">
                  <input
                    type="date"
                    placeholder="Type UUID"
                    class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content text-sm w-full"
                    readonly
                    :value="computer.data.form.temp.model.length ? computer.data.form.temp.model[0].uuid_start || computer.data.form.temp.model_start : ''"
                  />
                  <button class="join-item btn btn-xs sm:btn-sm md:btn-md disabled:border-base-content disabled:text-black disabled:bg-white" disabled>-</button>
                  <input
                    type="date"
                    placeholder="Type UUID"
                    class="join-item input input-xs sm:input-sm md:input-md input-bordered border-base-content text-sm w-full"
                    readonly
                    :value="computer.data.form.temp.model.length ? computer.data.form.temp.model[0].uuid_end || computer.data.form.temp.model_end  : ''"
                  />
                </div>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-xs sm:text-sm">หมายเหตุ</span>
                </label>
                <textarea 
                  class="textarea textarea-xs sm:textarea-sm md:textarea-md textarea-bordered border-base-content"
                  rows=3
                  placeholder="Type หมายเหตุ"
                  v-model="computer.data.form.temp.remarks"
                ></textarea>
              </div>
            </div>
          </div>
        <div
          class="backdrop-blur sticky top-0 items-center gap-2 xs:px-0 sm:px-0 px-4 flex"
        >
          <div class="flex-1 form-control mt-2">
            <button
              @click="base.form.modal = false"
              class="btn btn-xs sm:btn-sm md:btn-md"
              :disabled="base.form.loading"
            >
              Cancel
            </button>
          </div>
          <div class="flex-1 form-control mt-2" @click="haveComputer ? fnComputer.save() : fnBase.save()">
            <button
              class="btn btn-primary text-white btn-xs sm:btn-sm md:btn-md"
              :disabled="base.form.loading"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { useStore } from "vuex";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";

import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalCombobox from "@/components/App/Module/Global/Combobox.vue";

import {
  defineAsyncComponent,
  shallowRef,
  computed,
  defineComponent,
  ref,
  watch,
  getCurrentInstance,
} from "vue";
import Base from "ant-design-vue/es/typography/Base";

export default defineComponent({
  inheritAttrs: false,
  name: "Employee",
  components: {
		AppModuleGlobalUpload,
		AppModuleGlobalSelectSearch,
    AppModuleGlobalCombobox
	},
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    createValue: {
      type: String,
      required: "",
    },
  },
  emits: ["update:modelValue", "update:success", "update:removeItem"],
  setup(props, { emit }) {
    const store = useStore();
    configureQuery(store);

    const serviceUrl = computed(() => store.getters.serviceUrl);

    const haveComputer = ref(false);

    const base = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

		const detail = ref({
      data: {
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            title: "",
          },
        },
      },
    });

    const computer = ref({
      data: {
        rows: [],
        form: {
          loading: false,
          modal: false,
          object: {
            title: "",
            image: [],
            file: []
          },
          temp: {
            title: "",
            model: [],
            file: [],
          }
        },
      },
    });
    
    const fnBase = {
      create: () => {
        haveComputer.value = false

				base.value.removing = false;
        base.value.form.current = 0;
        base.value.form.object = {
					code: "",
					imageLink: "",
					image: [],
        };
        base.value.form.method = "POST";
        base.value.form.modal = true;

				detail.value.data.rows = [];
      },
      edit: (code, index) => {
				base.value.removing = false;
        base.value.form.object = { ...base.value.rows[index] };
        base.value.form.current = code;
        base.value.form.method = "PUT";

				detail.value.data.rows = [];

				fnDetail.search();
      },
      save: async () => {
        if (base.value.form.loading) return;
        base.value.form.loading = true;
        try {
					let image = base.value.form.object.image[0]
						? { ...base.value.form.object.image[0] }
						: null;
					image ? delete image.temp : "";

					if (base.value.form.method == "POST") {
						base.value.form.object.new_password = base.value.form.object.uid;
					}

          if (!haveComputer.value) {
            base.value.form.object.computer = null
          }

          const queryBody = {
            code: base.value.form.current,
            rows: [
							{
            		...Object.assign(
									{ ...base.value.form.object },
									{ image: image ? [image] : [] },
								),
							},
            ],
          };
          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/HR/employee"
          );
          const method = base.value.form.method || "POST";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
          }

          if (base.value.form.current === 0) {
            base.value.form.current = res.rows[0].code;
          }

					detail.value.data.form.method = "POST";
					const detail_save = new Promise(
						async (resolve, reject) => await resolve(fnDetail.save())
					);
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          base.value.form.modal = false;
          base.value.form.loading = false;
          emit("update:success", null);
        }
      },
    };

		const fnDetail = {
			search: async () => {
        try {
          await fnDetail.get();
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
				// base.value.pagination.loading = true;
        try {
          const queryParams = {
						current: base.value.form.current,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/HR/email"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            detail.value.data.rows = res.rows;

            console.log(base.value.form.object.computer)
            if (base.value.form.object.computer) {
              fnComputer.search();
            } else {
              fnComputer.create();
            }
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          // base.value.pagination.loading = false;
        }
      },
			add_row: () => {
				detail.value.data.form.object = {
					// code: $moment().format("YYYYMMDD") + detail.value.data.rows.length,
					new: true,
				};
				detail.value.data.rows.unshift(detail.value.data.form.object);
			},
      create: () => {
        detail.value.data.form.current = 0;
        detail.value.data.form.object = {
					code: "",
        };
        detail.value.data.form.method = "POST";
      },
      edit: (code) => {
				detail.value.data.form.current = code;
				let index = detail.value.data.rows.findIndex(
					(v) => v.code == detail.value.data.form.current
      	);
				detail.value.data.form.object = Object.assign({}, detail.value.data.rows[index]);
				detail.value.data.form.method = "PUT";
      },
      save: async () => {
        // if (detail.value.form.loading) return;
        // detail.value.form.loading = true;
        try {
					let rows = detail.value.data.rows.map((v) =>
						Object.assign({}, v, { emp: base.value.form.current })
					);
					if (rows.length == 0) {
						return;
					}

					let object = {
						POST: rows.filter((v) => v.new),
						PUT: rows.filter((v) => v.edit),
					};

					for (let key in object) {
						if (object[key].length == 0) {
							continue;
						}

						const queryBody = {
							rows: object[key]
						};
	
						const path = buildPath(
							null,
							"api/controllers/MYSQL/INTERNAL/HR/email"
						);
						const method = key;
						const res = await fetchQuery({}, method, path, queryBody);

						if (!res.success) {
							console.error("Failed to save data");
							return;
						}
					}
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          // detail.value.form.loading = false;
          emit("update:success", null);
        }
      },
			remove_item: (code, path) => {
				emit("update:removeItem", code, path)
      },
			remove_all_item: (path) => {
        let rows = detail.value.data.rows.filter((v) => v["remove"]);
				emit("update:removeAllItem", rows, path)
      },
    };

    const fnComputer = {
      create: () => {
        computer.value.data.form.current = 0;
        computer.value.data.form.object = {
          model: [],
          serial: '',
          remarks: '',
          file: []
        };
        computer.value.data.form.temp = {
          model: [],
          serial: '',
          remarks: '',
        }

        computer.value.data.form.method = "POST";

        haveComputer.value = false;
        base.value.form.modal = true;
      },
      // edit: async (code) => {
      //   try {
      //     await fnComputer.search();
      //   } catch (error) {
      //     console.error("Error during search:", error);
      //   }
      // },
			search: async () => {
        try {
          // console.log(haveComputer.value)
          // if (base.value.form.object.computer) {
          //   if (haveComputer.value) {
              await fnComputer.get();
            // }
          // }
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async () => {
				// base.value.pagination.loading = true;
        try {
          const queryParams = {
						current: base.value.form.current,
						emp: base.value.form.current,
            getTotal: true,
          };

          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/HR/EmpComputer"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            res.rows.forEach((v, i) => {
              res.rows[i].file = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });

            if (res.rows.length) {
              computer.value.data.form.current = res.rows[0].code;
              computer.value.data.form.object = { ...res.rows[0] };

              computer.value.data.form.temp = computer.value.data.form.object;
              computer.value.data.form.temp.model 
                = Array.isArray(JSON.parse(computer.value.data.form.temp.model)) 
                  ? JSON.parse(computer.value.data.form.temp.model)
                  : []

              computer.value.data.form.method = "PUT";
            } else {
              computer.value.data.form.current = 0;
              computer.value.data.form.method = "POST";

              computer.value.data.form.object = {
                code: "",
                imageLink: "",
                file: [],
              };
            }
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          haveComputer.value = true;
          base.value.form.modal = true;
          // base.value.pagination.loading = false;
        }
      },
      save: async () => {
        try {
					let file = computer.value.data.form.object.file[0]
						? { ...computer.value.data.form.object.file[0] }
						: null;
          file ? delete file.temp : "";

          const queryBody = {
            code: computer.value.data.form.current,
            rows: [
							{
            		...Object.assign(
									{ emp: base.value.form.current },
									{ ...computer.value.data.form.temp },
									{ image: file ? [file] : [] },
								),
							},
            ],
          };

          // return

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/HR/EmpComputer"
          );
          const method = computer.value.data.form.method || "POST";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
          }

          if (computer.value.data.form.current === 0) {
            computer.value.data.form.current = res.rows[0].code;
            base.value.form.object.computer = computer.value.data.form.current;
          }

					const base_save = new Promise(
						async (resolve, reject) => await resolve(fnBase.save())
					);
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          // detail.value.form.loading = false;
          // emit("update:success", null);
        }
      },
    };

    return { haveComputer, base, fnBase, detail, fnDetail, computer, fnComputer, serviceUrl };
  },
});
</script>

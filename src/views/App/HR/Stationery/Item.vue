<template>
  <AppLayout ref="AppLayoutComponent">
    <template #modal>
      <!-- modal base -->
      <input
        type="checkbox"
        class="modal-toggle"
        v-model="base.data.form.modal"
      />
      <div class="modal" v-if="base.data.form.modal">
        <div class="modal-box w-11/12 max-w-lg">
          <label
            @click="base.data.form.modal = false"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold text-primary">{{ base.data.form.method == 'POST' ? 'Add New Item' : 'View or Edit Item' }}</h3>
          <hr class="my-5" />
          <div class="overflow-auto max-h-[64vh]">
            <div class="grid grid-cols-2 gap-3 px-1">
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">* Item Owner: {{ base.data.form.object.item_owner }}</span>
                </label>
                <select 
                  class="select select-sm select-bordered w-full border-base-content disabled:border-base-content"
                  v-model="base.data.form.object.item_owner"
                  :disabled="base.data.form.method == 'PUT'"
                >
                  <option value="" disabled selected>- Select -</option>
                  <option v-for="v in asset" :value="v.value">{{ v.text }}</option>
                </select>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">Item ID:</span>
                </label>
                <input
                  type="text"
                  placeholder="Auto Generating..."
                  class="input input-sm input-bordered disabled:border-base-content disabled:text-gray-600"
                  v-model="base.data.form.object.item_id"
                  disabled
                />
              </div>
              <div class="form-control col-span-2">
                <label class="label">
                  <span class="label-text font-semibold">* Item Name:</span>
                </label>
                <input
                  type="text"
                  placeholder="ระบุชื่อ Item"
                  class="input input-sm input-bordered border-base-content"
                  v-model="base.data.form.object.item_name"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">* Unit:</span>
                </label>
                <select 
                  class="select select-sm select-bordered w-full border-base-content disabled:border-base-content"
                  v-model="base.data.form.object.item_unit"
                >
                  <option value="" disabled selected>Select...</option>
                  <option v-for="v in unit" :value="v.value">{{ v.text }}</option>
                </select>
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text font-semibold">* Item Minimum:</span>
                </label>
                <input
                  type="number"
                  min="0"
                  class="input input-sm input-bordered border-base-content"
                  v-model="base.data.form.object.item_min"
                />
              </div>
              <div class="col-span-2 px-3 py-1">
                <AppModuleGlobalUpload
                  :fileLink="`${base.data.form.object.imageLink}WHinternal/item/${base.data.form.object.code}/`"
                  :file="base.data.form.object.image"
                  :id="'base'"
                  :multiple="false"
                  @respone="
                    (res) => {
                      base.data.form.object.image = base.data.form.object.image.concat(res.file);
                    }
                  "
                  @uploaded="
                    (res) => {
                      let index = base.data.form.object.image.findIndex(
                        (v) => v.r == res.r
                      );
                      base.data.form.object.image[index].upload = false;
                      base.data.form.object.image[index].file = res.row.file;
                    }
                  "
                  @stream="
                    (res) => {
                      let index = base.data.form.object.image.findIndex((v) => v.r == res.r);
                      base.data.form.object.image[index].loading = res.loading;
                    }
                  "
                  @error="
                    (res) => {
                      let index = base.data.form.object.image.findIndex((v) => v.r == res.r);
                      base.data.form.object.image[index].error = true;
                    }
                  "
                  @again="
                    (res) => {
                      let index = base.data.form.object.image.findIndex(
                        (v) => v.r == res.file.r
                      );
                      base.data.form.object.image[index] = res.file;
                    }
                  "
                  @resetdata="
                    (res) => {
                      base.data.form.object.image = [...res.file];
                    }
                  "
                />
              </div>
            </div>
          </div>
          <hr class="mt-3"/>
          <div
            class="backdrop-blur sticky top-0 items-center justify-end gap-3 flex"
          >
            <div class="form-control mt-6">
              <button
                @click="base.data.form.modal = false"
                class="btn btn-sm w-28"
                :disabled="base.data.form.loading"
            >
                Close
              </button>
            </div>
            <div class="form-control mt-6">
              <button
                @click="fnBase.save()"
                :class="`btn btn-sm ${base.data.form.method == 'POST' ? 'btn-success text-white' : 'btn-warning text-black'} w-28`"
                :disabled="base.data.form.loading"
              >
                <span class="flex gap-1 items-center" v-if="base.data.form.method == 'POST'"><Icon icon="bi:sd-card" width="16" height="16" /> Add New</span>
                <span class="flex gap-1 items-center" v-else><Icon icon="bi:pencil-square" width="16" height="16" /> Save Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- modal remove -->
      <AppModuleGlobalRemove
        v-model="remove"
        @update:success="fnRemove.success"
        ref="removeModal"
      />
    </template>
    <template #view>
      <div class="grid grid-cols-1 gap-6">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-2 lg:p-4">
            <div>
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
                    <div class="w-full">
                      <h3 class="flex text-md text-gray-500 font-semibold gap-1">
                        <Icon icon="bi:cash-coin" width="24" height="24" />&nbsp;รายการราคาและข้อมูล&nbsp;อุปกรณ์เครื่องใช้สำนักงาน
                      </h3>
                    </div>
                    <div
                      class="gap-2 flex-row flex w-full justify-end relative"
                    >
                      <label
                        class="join-item btn btn-sm btn-warning"
                        @click="fnBase.create()"
                      >
                        <Icon icon="bi:plus-circle-fill" width="16" height="16" />
                        Add New Item
                      </label>
                      <AppModuleGlobalSearchV2
                        @update:search="fnBase.search"
                        v-model="base.search"
                        :loading="base.pagination.loading"
                      />
                    </div>
                  </div>
                  <div class="divider my-1"></div>
                </div>
                <div
                  :style="{
                    maxHeight: '90%',
                    minHeight: '90%',
                  }"
                >
                  <div class="grid grid-cols-3 gap-3">
                    <div class="flex flex-col">
                      <div class="mt-3 border-2 shadow-lg rounded-xl p-2 flex-1 max-h-100">
                        <div class="grid grid-cols-2 gap-3" v-if="detail.data.form.object.item_id">
                          <div class="text-left text-sm">
                            <h3><span class="font-bold">ID:</span> {{ detail.data.form.object.item_id }}</h3>
                            <h3><span class="font-bold">Name:</span> {{ detail.data.form.object.item_name }}</h3>
                            <h3><span class="font-bold">Amount:</span> {{ detail.data.form.object.item_amount }}</h3>
                            <h3><span class="font-bold">Minimum:</span> {{ detail.data.form.object.item_min }}</h3>
                            <h3><span class="font-bold">In Rack:</span> {{ detail.data.form.object.item_rack_show }}</h3>
                          </div>
                          <img
                            v-if="detail.data.form.object.image.length > 0"
                            :src="`${
                              detail.data.form.object.image[detail.data.form.object.master ? detail.data.form.object.master : 0].temp
                                ? `${serviceUrl}tmps/image/`
                                : detail.data.form.object.imageLink
                                ? `${detail.data.form.object.imageLink}WHinternal/item/${detail.data.form.object.code}/`
                                : `${serviceUrl}tmps/image/`
                            }${detail.data.form.object.image[detail.data.form.object.master ? detail.data.form.object.master : 0].file}`"
                            alt="Image"
                            style="object-fit: contain; height: 100%; max-height: 190px;"
                          />
                        </div>
                      </div>
                      <div class="mt-3 border-2 shadow-lg rounded-xl p-2 flex-1">
                        <!-- {{ options }} -->
                        <div class="chart-wrap" v-if="detail.data.form.object.item_id">
                          <div id="chart">
                            <apexchart
                              v-if="options.colors?.length > 0"
                              type="line"
                              height="100%"
                              width="100%"
                              :options="options"
                              :series="series"
                            ></apexchart>
                            <div class="font-semibold italic" v-else>EMPTY PRICE DATA</div>
                          </div>
                        </div>
                      </div>
                      <div class="mt-3 border-2 shadow-lg rounded-xl p-2 flex-1">
                        <div class="flex flex-col space-y-1 w-full h-full">
                          <div class="grid grid-cols-9 gap-1 h-full max-h-16">
                            <div v-for="n in 9" :key="n" >
                              <div 
                                class="border-2 border-black rounded-lg text-black text-xs font-semibold h-full"
                                :class="detail.data.form.object.item_rack.find(x => x.slice(0, 2) == rack[n-1]+'1') ? 'bg-success' : 'bg-warning'"
                                v-if="(n % 3) != 2" 
                                >
                                {{ rack[n-1] }}1
                              </div>
                            </div>
                          </div>
                          <div class="grid grid-cols-9 gap-1 h-full max-h-16">
                            <div v-for="n in 9" :key="n" >
                              <div 
                                class="border-2 border-black rounded-lg text-black text-xs font-semibold h-full"
                                :class="detail.data.form.object.item_rack.find(x => x.slice(0, 2) == rack[n-1]+'2') ? 'bg-success' : 'bg-warning'"
                                v-if="(n % 3) != 2" 
                              >
                                {{ rack[n-1] }}2
                              </div>
                            </div>
                          </div>
                          <div class="grid grid-cols-4 gap-1 h-full max-h-8">
                            <div v-for="n in 4" :key="n" >
                              <div 
                                class="border-2 border-black rounded-lg text-black text-xs font-semibold h-full"
                                :class="detail.data.form.object.item_rack.find(x => x.slice(0, 2) == 'G'+(n-1)) ? 'bg-success' : 'bg-warning'"
                                v-if="n-1" 
                              >
                                G{{ n-1 }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="overflow-x-auto w-full my-2 col-span-2"
                      :style="{
                        maxHeight: contentHeight,
                        minHeight: contentHeight,
                      }"
                    >
                      <div
                        v-if="
                          !base.pagination.loading && base.data.rows.length == 0
                        "
                      >
                        <AppModuleGlobalEmptyData
                          :class="`p-4 py-12 text-3xl text-center`"
                        />
                      </div>
                      <table
                        v-else
                        class="table table-xs table-pin-rows table-pin-cols"
                      >
                        <thead>
                          <tr class="bg-primary text-white text-sm shadow">
                            <td class="text-center">Stock</td>
                            <th class="bg-primary text-white">Item ID</th>
                            <td>Item Name</td>
                            <td class="text-right">Amount</td>
                            <td class="text-right">Minimum</td>
                            <td>Unit</td>
                            <td class="text-right">Current Price</td>
                            <td class="text-right">Old Price</td>
                            <th class="bg-primary text-white text-center" colspan="2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(v, i) in base.data.rows" style="cursor: pointer;" class="hover" 
                            :class="(parseInt(v.item_min) >= parseInt(v.amount) && detail.data.form.current == v.item_id) ? 'bg-red-200 text-blue-500 font-semibold' : parseInt(v.item_min) >= parseInt(v.amount) ? 'bg-red-200' : detail.data.form.current == v.item_id ? 'text-blue-500 font-semibold' : ''" 
                          >
                            <td class="text-center"><input type="checkbox" class="toggle toggle-xs" :class="v.item_stock ? 'bg-blue-500 border-blue-500' : ''" v-model="v.item_stock" @change="fnBase.active(v.code, i)" /></td>
                            <th @click="fnDetail.search(`${v.item_id}`, `${i}`)">{{ v.item_id }}</th>
                            <td @click="fnDetail.search(`${v.item_id}`, `${i}`)">{{ v.item_name }}</td>
                            <td @click="fnDetail.search(`${v.item_id}`, `${i}`)" class="text-right"><div class="flex justify-end items-center gap-1"> <Icon v-if="parseInt(v.item_min) >= parseInt(v.amount)" icon="bi:exclamation-triangle-fill" width="12" height="12" /> {{ v.amount }} ({{ v.item_amount }}) </div></td>
                            <td @click="fnDetail.search(`${v.item_id}`, `${i}`)" class="text-right">{{ v.item_min }}</td>
                            <td @click="fnDetail.search(`${v.item_id}`, `${i}`)">{{ v.item_unit }}</td>
                            <td @click="fnDetail.search(`${v.item_id}`, `${i}`)" class="text-right" :class="!v.new_price ? 'italic' : ''">{{ v.new_price ? new Intl.NumberFormat("th-TH").format(v.new_price)+' ฿' : 'no price' }}</td>
                            <td @click="fnDetail.search(`${v.item_id}`, `${i}`)" class="text-right" :class="!v.old_price ? 'italic' : ''">{{ v.old_price ? new Intl.NumberFormat("th-TH").format(v.old_price)+' ฿' : 'no price' }}</td>
                            <th class="text-center">
                              <button 
                                class="btn btn-xs btn-warning w-16"
                                @click="fnBase.edit(v.code, i)"
                              >
                                <Icon icon="bi:pencil-square" width="12" height="12" /> Edit
                              </button>
                              <button 
                                class="btn btn-xs btn-error text-white ml-1"
                                @click="fnRemove.item(
                                  `${v.code}`,
                                  'api/controllers/MYSQL/INTERNAL/HR/whinternal/items'
                                )"
                              >
                                <Icon
                                  icon="material-symbols:delete"
                                  width="12" height="12"
                                />
                              </button>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <AppModuleGlobalPagination
                    v-model="base.pagination"
                    @update:page="fnBase.get"
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

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import { useContentHeight } from "@/composables/useContentHeight";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref } from "vue";

import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";

export default {
  name: "Item",
  components: {
    AppLayout,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModuleGlobalRemove,
    AppModuleGlobalUpload
  },
  setup() {
    const store = useStore();
    configureQuery(store);

    const serviceUrl = computed(() => store.getters.serviceUrl);
    const user = computed(() => store.getters.user);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    const { contentHeight } = useContentHeight(AppLayoutComponent, titleZone);

    const rack = ref("A0BC0DE0F");

    const asset = ref([
      {
        text: 'HR - ฝ่ายบุคคล (Factory)', value: 'HR'
      },
      {
        text: 'HO - ฝ่ายบุคคล (Office)', value: 'HO'
      },
      {
        text: 'SH - ฝ่ายความปลอดภัย', value: 'SH'
      },
      {
        text: 'IT - ฝ่ายเทคโนโลยีสารสนเทศ', value: 'IT'
      }
    ]);

    const unit = ref([
      {
        text: 'อัน', value: 'อัน'
      },
      {
        text: 'ด้าม', value: 'ด้าม'
      },
      {
        text: 'กล่อง', value: 'กล่อง'
      },
      {
        text: 'ก้อน', value: 'ก้อน'
      },
      {
        text: 'แท่ง', value: 'แท่ง'
      },
      {
        text: 'แพ็ค', value: 'แพ็ค'
      },
      {
        text: 'ชิ้น', value: 'ชิ้น'
      },
      {
        text: 'ขวด', value: 'ขวด'
      },
      {
        text: 'ม้วน', value: 'ม้วน'
      },
      {
        text: 'แผ่น', value: 'แผ่น'
      },
      {
        text: 'เล่ม', value: 'เล่ม'
      },
      {
        text: 'เครื่อง', value: 'เครื่อง'
      },
      {
        text: 'ตัว', value: 'ตัว'
      },
      {
        text: 'รีม', value: 'รีม'
      },
      {
        text: 'แกลลอน', value: 'แกลลอน'
      },
      {
        text: 'ชุด', value: 'ชุด'
      },
      {
        text: 'คู่', value: 'คู่'
      },
      {
        text: 'ใบ', value: 'ใบ'
      },
    ]);

    const options = ref({});

    const series = ref({});

    const base = ref({
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
            item_owner: '',
            item_id: '',
            item_name: '',
            item_unit: '',
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

    const colors = ref([
      "#454D66",
    ]);

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
            search: base.value.search,
            getTotal: true,
            debug: true
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/HR/whinternal/items"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].file = v.file ? JSON.parse(v.file) : [];
              res.rows[i].master = 0;

              res.rows[i].item_stock = res.rows[i].item_stock ? true : false;
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
      create: () => {
        base.value.data.form.current = 0;
        base.value.data.form.object = {
          item_stock: true,
          item_owner: '',
          item_id: '',
          item_name: '',
          item_unit: '',
          item_min: 0,
          image: [],
        };

        base.value.data.form.method = "POST";
        base.value.data.form.modal = true
      },
      edit: (code, index) => {
        base.value.data.form.current = code;
        base.value.data.form.object = { ...base.value.data.rows[index] };

        base.value.data.form.method = "PUT";
        base.value.data.form.modal = true
      },
      save: async () => {
        if (base.value.data.form.loading) return;
        base.value.data.form.loading = true;
        try {
					let image = base.value.data.form.object.image[0]
						? { ...base.value.data.form.object.image[0] }
						: null;
					image ? delete image.temp : "";

          const queryBody = {
            code: base.value.data.form.current,
            rows: [
							{
            		...Object.assign(
									{ ...base.value.data.form.object },
									{ image: image ? [image] : [] },
								),
							},
            ],
          };
          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/HR/whinternal/items"
          );
          const method = base.value.data.form.method || "POST";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
          }

          if (base.value.data.form.current === 0) {
            base.value.data.form.current = res.rows[0].code;
          }
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          base.value.data.form.modal = false;
          base.value.data.form.loading = false;

          fnBase.success();
          // fnBase.edit(base.value.data.form.current, base.value.data.rows.findIndex(x => x.code == base.value.data.form.current));
        }
      },
      active: async (code, index) => {
        if (base.value.data.form.loading) return;
        base.value.data.form.loading = true;
        try {
          const queryBody = await {
            code: code,
            rows: [
							{
                code: code,
                item_stock: base.value.data.rows[index].item_stock,
							},
            ],
          };

          const path = buildPath(
            null,
            "api/controllers/MYSQL/INTERNAL/HR/whinternal/items"
          );
          const method = "PUT";
          const res = await fetchQuery({}, method, path, queryBody);

          if (!res.success) {
            console.error("Failed to save data");
            return;
          }
        } catch (error) {
          console.error("An error occurred during save operation:", error);
        } finally {
          base.value.data.form.loading = false;

          fnBase.success();
        }
      },
      success() {
        fnBase.get();
      },
    };

    const fnDetail = {
      search: async (code, index) => {
        try {
          detail.value.data.form.current = code
          base.value.data.form.object = { ...base.value.data.rows[index] };

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
            item_id: detail.value.data.form.current,
            getTotal: true,
          };
          const path = buildPath(
            queryParams,
            "api/controllers/MYSQL/INTERNAL/HR/whinternal/items"
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {    
            detail.value.data.rows = res.rows;
            detail.value.pagination.total = res.total;

            detail.value.data.form.object = {
              code: base.value.data.form.object.code,
              item_id: detail.value.data.rows[0].item_id,
              item_name: detail.value.data.rows[0].item_name,
              item_amount: detail.value.data.rows[0].amount,
              item_min: detail.value.data.rows[0].item_min,
              image: base.value.data.form.object.image,
              imageLink: base.value.data.form.object.imageLink,
              master: base.value.data.form.object.master,
            };

            detail.value.data.form.object['item_rack'] = []
            detail.value.data.form.object['item_rack_show'] = ""
            detail.value.data.rows.forEach((x, i) => {
              if (i) {
                if (x.rack_id && x.rack_id != detail.value.data.rows[i-1].rack_id) {
                  detail.value.data.form.object.item_rack.push(x.rack_id)
                  detail.value.data.form.object.item_rack_show += ', ' + x.rack_id
                }
              } else {
                if (x.rack_id) {
                  detail.value.data.form.object.item_rack.push(x.rack_id)
                  detail.value.data.form.object.item_rack_show += x.rack_id
                }
              }
            })

            function genChart(name, data, label) {
              series.value = [{ name: name, data: data }];

              options.value = {
                chart: {
                  type: "line",
                },
                colors: colors.value,
                stroke: {
                  curve: "smooth", // ให้เส้นโค้ง (smooth line)
                  width: 2, // ความหนาของเส้น
                },
                dataLabels: {
                  enabled: true,
                  formatter: function (value) {
                    // เพิ่ม comma ให้กับ value
                    return value.toLocaleString();
                  },
                },
                legend: {
                  show: true,
                },
                xaxis: {
                  categories: label,
                },
                yaxis: {
                  labels: {
                    formatter: function (value) {
                      return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
                    },
                  },
                },
                tooltip: {
                  y: {
                    formatter: function (value) {
                      // เพิ่ม comma ให้ tooltip เช่นกัน
                      return value.toLocaleString();
                    },
                  },
                },
                markers: {
                  size: 5, // เพิ่มจุด (marker) บนเส้น
                },
              };
            }

            if (!Array.isArray(res.prices)) {
              let ddates = res.prices.dates.slice(0, res.prices.dates.length).split(", ");
              ddates = ddates.reverse();
              let pprices = res.prices.prices.slice(0, res.prices.prices.length).split(", ");
              pprices = pprices.reverse();
  
              let data = [];
              let label = [];
  
              pprices.forEach((value, index) => {
                label.push(ddates[index]);
                data.push(value);
              })
              genChart(res.prices.item_id, data, label);
            }
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          detail.value.pagination.loading = false;
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

    fnBase.search();

    return {
      base,
      fnBase,
      detail,
      fnDetail,
      remove,
      fnRemove,
      AppLayoutComponent,
      titleZone,
      contentHeight,
      serviceUrl,
      user,
      rack,
      options,
      series,
      asset,
      unit
    };
  },
  // watch: {
    
  // }
};
</script>

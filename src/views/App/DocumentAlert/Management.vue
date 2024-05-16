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
          <div class="join join-vertical w-full">
            <!-- <div
              class="collapse collapse-arrow join-item border border-base-300"
            > -->
            <!-- <input type="radio" name="my-accordion-2" checked="checked" /> -->
            <!-- <div class="collapse-title text-lg text-primary font-medium">
                Data List
              </div> -->
            <!-- <div class="collapse-content"> -->
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
                />
              </div>
            </div>
            <div class="form-control">
              <!-- {{ base.form.file }} -->
              <AppModuleGlobalUpload
                :fileLink="`${base.form.fileLink}doc/${base.form.code}`"
                :file="base.form.file"
                :id="'base'"
                :multiple="true"
                :type="'pdf'"
                @respone="
                  (res) => {
                    base.form.file = base.form.file.concat(res.file);
                  }
                "
                @uploaded="uploaded"
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
            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-base" class="btn btn-danger">Cancle</label>
              </div>
              <div
                v-if="base.controll == 'edit'"
                class="flex-1 form-control mt-6"
                @click="base_create(this.base.dayClick)"
              >
                <button class="btn btn-warning text-white">Reset</button>
              </div>
              <div class="flex-1 form-control mt-6" @click="base_save()">
                <button class="btn btn-primary text-white">Confirm</button>
              </div>
            </div>
            <div v-if="this.base.dayClick">
              <div class="divider">
                <span class="h-4 font-bold text-primary"
                  >Expiration Date List</span
                >
              </div>
              <div
                v-if="base.loading"
                class="absolute z-10 w-full h-full flex flex-row flex-nowrap content-center justify-center items-center bg-base-100 bg-opacity-50 top-0 left-0"
              >
                <AppModuleGlobalLoadingText
                  :type="'percent'"
                  :percent="base.loading_percent"
                  :class="`p-4 py-12 text-3xl text-center`"
                />
              </div>
              <div :class="`${base.loading ? 'blur-sm' : ''}`">
                <div
                  class="overflow-x-auto w-full max-h-[15vh] min-h-[15vh] my-4"
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
                        v-for="(v, i) in base.rows.filter(
                          (v) => v.expire_date == base.dayClick
                        )"
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
                            $moment(v.created_at).format("YYYY-MM-DD") > "2000"
                              ? v.created_at
                              : "-"
                          }}
                          <div class="text-xs">
                            {{ v.created_fullname ? v.created_fullname : "-" }}
                          </div>
                        </td>
                        <td>
                          {{
                            v.updated_at &&
                            $moment(v.updated_at).format("YYYY-MM-DD") > "2000"
                              ? v.updated_at
                              : "-"
                          }}
                          <div class="text-xs">
                            {{ v.updated_fullname ? v.updated_fullname : "-" }}
                          </div>
                        </td>
                        <th class="text-right">
                          <label
                            class="btn btn-link text-warning no-underline modal-button btn-xs"
                            @click="base_edit(`${v.code}`, `${i}`)"
                            >Edit
                          </label>

                          <label
                            for="modal-remove"
                            class="btn btn-link text-error no-underline modal-button btn-xs"
                            @click="
                              remove_item(
                                `${v.code}`,
                                'base',
                                'controllers/MYSQL/INTERNAL/Document/alert'
                              )
                            "
                            >remove
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
                    this.base_search();
                  }
                "
              />
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
                      >Cancle</label
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

      <!-- modal base -->
      <input
        type="checkbox"
        id="modal-base"
        class="modal-toggle"
        v-model="create.modal"
      />
      <div class="modal" v-if="create.modal">
        <div
          class="modal-box relative w-11/12 lg:w-11/12 xl:w-12/12 max-w-5xl lg:max-w-screen-2xl p-2 lg:p-4 max-h-screen"
        >
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕
          </label>
          <h3 class="text-lg font-bold text-primary">DOCUMENT ALERT SYSTEM</h3>
          <div class="divider my-1"></div>

          <div
            class="tab-content bg-base-100 border-base-300 w-full overflow-auto"
          >
            <PDFViewer
              :source="'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'"
              class="h-[75vh] w-full"
              @download="handleDownload"
            />
          </div>
        </div>
      </div>
    </template>
    <template #view>
      <div class="grid grid-cols-1 gap-6">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-2 lg:p-4">
            <div class="join join-vertical w-full">
              <div
                class="collapse collapse-arrow join-item border border-base-300"
              >
                <input type="radio" name="my-accordion-4" checked="checked" />
                <div class="collapse-title p-0 min-h-0 font-medium flex justify-center items-center text-primary">
                  Calendar
                </div>
                <div class="collapse-content">
                  <Calendar
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
                    <template
                      v-slot:day-content="{ day, attributes }"
                      :class="`btnddddddddddddddd`"
                    >
                      <div
                        class="flex flex-col h-full z-10 overflow-hidden"
                        :class="`${day.isToday ? 'active' : ''} ${
                          day.day ? 'flex-day' : ''
                        }`"
                        @click="base_create(day.id)"
                      >
                        <span
                          class="day-label text-sm text-gray-900 pl-2 pt-1"
                          >{{ day.day }}</span
                        >

                        <div class="flex-grow overflow-y-auto overflow-x-auto">
                          <p
                            v-for="attr in attributes"
                            :key="attr.key"
                            class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
                            :class="attr.customData.class"
                          >
                            {{ attr.customData.title }}
                          </p>
                        </div>
                      </div>
                    </template>
                    <template #footer>
                      <div class="w-full" v-if="!currentMonth">
                        <button
                          class="bg-primary text-white font-bold w-full px-3 py-1 rounded-b-xl"
                          @click="()=>$refs.calendar.move(new Date())"
                        >
                          Today
                        </button>
                      </div>
                    </template>
                  </Calendar>
                </div>
              </div>
              <div
                class="collapse collapse-arrow join-item border border-base-300"
              >
                <input type="radio" name="my-accordion-4" />
                <div class="collapse-title p-0 min-h-0 font-medium flex justify-center items-center  text-primary">
                  Data List
                </div>
                <div class="collapse-content border-t-2 ">
                  <div>
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
                          @click="base_create(null)"
                          >Create</label
                        >
                      </div>
                      <div
                        class=" overflow-x-auto w-full max-h-[60vh] min-h-[60vh] my-4"
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
                                    v.created_fullname
                                      ? v.created_fullname
                                      : "-"
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
                                    v.updated_fullname
                                      ? v.updated_fullname
                                      : "-"
                                  }}
                                </div>
                              </td>
                              <th class="text-right">
                                <label
                                  class="btn btn-link text-warning no-underline modal-button btn-xs"
                                  @click="base_edit(`${v.code}`, `${i}`)"
                                  >Edit
                                </label>

                                <label
                                  for="modal-remove"
                                  class="btn btn-link text-error no-underline modal-button btn-xs"
                                  @click="
                                    remove_item(
                                      `${v.code}`,
                                      'base',
                                      'controllers/MYSQL/INTERNAL/Document/alert'
                                    )
                                  "
                                  >remove
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
            </div>

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
          </div>
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

// indirect อิงตาม WH

// doc alert
// TRR

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
      currentMonth: true,
      pdf: "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      masks: {
        weekdays: "WWW",
      },
      attributes: [
        // {
        //   key: 1,
        //   customData: {
        //     title: "TEST DOCkUMENT",
        //     class: "bg-red-600 text-white",
        //   },
        //   dates: [[new Date(year, month, 3),new Date(year, month, 5)]],
        // },
        // // {
        // //   key: 2,
        // //   customData: {
        // //     title: "Take Noah to basketball practice",
        // //     class: "bg-blue-500 text-white",
        // //   },
        // //   dates: new Date(year, month, 2),
        // // },
        // {
        //   key: 3,
        //   customData: {
        //     title: "Noah's basketball game.",
        //     class: "bg-blue-500 text-white",
        //   },
        //   dates: new Date(year, month, 5),
        // },
        // {
        //   key: 4,
        //   customData: {
        //     title: "Take car to the shop",
        //     class: "bg-indigo-500 text-white",
        //   },
        //   dates: new Date(year, month, 5),
        // },
        // {
        //   key: 4,
        //   customData: {
        //     title: "Meeting with new client.",
        //     class: "bg-teal-500 text-white",
        //   },
        //   dates: new Date(year, month, 7),
        // },
        // // {
        // //   key: 5,
        // //   customData: {
        // //     title: "Mia's gymnastics practice.",
        // //     class: "bg-pink-500 text-white",
        // //   },
        // //   dates: new Date(year, month, 11),
        // // },
        // // {
        // //   key: 6,
        // //   customData: {
        // //     title: "Cookout with friends.",
        // //     class: "bg-orange-500 text-white",
        // //   },
        // //   dates: { months: 5, ordinalWeekdays: { 2: 1 } },
        // // },
        // // {
        // //   key: 7,
        // //   customData: {
        // //     title: "Mia's gymnastics recital.",
        // //     class: "bg-pink-500 text-white",
        // //   },
        // //   dates: new Date(year, month, 22),
        // // },
        // // {
        // //   key: 8,
        // //   customData: {
        // //     title: "Visit great grandma.",
        // //     class: "bg-red-600 text-white",
        // //   },
        // //   dates: new Date(year, month, 25),
        // // },
      ],
      attrs: [
        {
          highlight: true,
          dates: new Date(),
        },
      ],
      tab: "Create",
      calendar: {
        dayClick: null,
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
        dayClick: null,
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
      this.dateData = v[0].id + "-01";
      this.currentMonth =
        this.$moment().format("M") == this.$moment(v[0].id + "-01").format("M");
      // this.base_search()
      // console.log(v[0].id)
    },

    uploaded(res) {
      console.log(res);
      let index = this.base.form.file.findIndex((v) => v.r == res.r);
      this.base.form.file[index].upload = false;
      this.base.form.file[index].file = res.row.file;
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
        this.calendar.rows = res.rows ? res.rows : [];
        this.calendar.total = res.total ? res.total : 0;
        this.calendar.next =
          this.calendar.page * this.calendar.row >= this.calendar.total
            ? false
            : true;
        this.calendar.back = this.calendar.page > 1 ? true : false;
        this.calendar.loading = false;
        this.calendar.errorMsg = res.errorMsg;
        this.attributes = [];
        res.rows.forEach((v, i) => {
          this.attributes.push({
            key: i,
            customData: {
              title: v.title,
              class: "bg-error text-white",
            },
            dates: new Date(
              this.$moment(v.expire_date).format("YYYY"),
              parseInt(this.$moment(v.expire_date).format("M")) - 1,
              this.$moment(v.expire_date).format("D")
            ),
          });
        });
        // console.log(this.attributes);
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
      let date = { ...this.dateData };
      let url =
        type == "calendar"
          ? `${
              this.serviceUrl
            }api/controllers/MYSQL/INTERNAL/Document/alert?expireInMonth=${this.$moment(
              date
            ).format("M")}&expireInYear=${this.$moment(date).format("YYYY")}`
          : `${
              this.serviceUrl
            }api/controllers/MYSQL/INTERNAL/Document/alert?total=1&page=${
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
    base_create(day) {
      console.log("DASDASDSA");
      // this.base.modal = true;
      this.base.dayClick = day;
      // this.base_create();
      console.log(this.base.modal);
      this.base.modal = true;
      console.log(this.base.modal);
      this.removing = false;
      this.base.current = 0;
      this.base.form = {
        code: "",
        doc_date: day
          ? this.$moment(day).format("YYYY-MM-DD")
          : this.$moment().format("YYYY-MM-DD"),
        life: 0,
        before_notification: 0,
        // expire_date:this.$moment(new Date(),'YYYY-MM-DD'),
        fileLink: "",
        file: [],
      };
      // this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      !this.base.modal?this.base.modal = true:'';
      // this.base.form.file = JSON.parse(this.base.form.file);
      this.base.current = code;
      this.base.controll = "edit";
      // this.$refs.formData.checked = true;
    },
    base_save() {
      let url = `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Document/alert`;
      let obj = {
        code: this.base.current,
        rows: [
          {
            ...Object.assign({ ...this.base.form }),
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

      // fetch(`${this.serviceUrl}api/controllers/MYSQL/INTERNAL/Document/alert`, {
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
    // REMOVE
    remove_item(code, controll, tb) {
      console.log(code);
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
    },
    // REMOVE
    remove_item(code, controll, tb) {
      console.log(code);
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
            localStorage.removeItem("user_token");
            this.$router.push({ name: `Login` });
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
    // this.dateData = this.$moment();
    this.$nextTick(() => this.base_search());
  },
  watch: {
    "base.form.doc_date": function (v) {
      // console.log(v)
      if (!this.base.form.doc_date) {
        return;
      }
      this.base.form.expire_date = this.$moment(
        this.$moment(this.base.form.doc_date, "YYYY-MM-DD").add(
          this.base.form.life,
          "days"
        )
      ).format("YYYY-MM-DD");
    },
    "base.form.life": function (v) {
      if (!this.base.form.doc_date) {
        return;
      }
      // console.log(v)
      this.base.form.expire_date = this.$moment(
        this.$moment(this.base.form.doc_date, "YYYY-MM-DD").add(
          this.base.form.life,
          "days"
        )
      ).format("YYYY-MM-DD");
    },
    // 'base.form.expire_date':function(v){
    //   // console.log(v)
    // },
    dateData: function (v) {
      this.calendar_search();
      console.log(v);
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
.collapse-arrow > .collapse-title:after{
  top:1rem
}
</style>
<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  display: none;
}

/deep/ .custom-calendar.vc-container {
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

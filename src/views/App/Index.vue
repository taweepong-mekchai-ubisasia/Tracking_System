<template>
  <div class="Timestamp">
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
            <!-- <h3 class="text-lg font-bold">Timestamp</h3> -->

            <div
              class="bg-base-100 border-base-300 rounded-box lg:p-6 overflow-auto w-full max-h-[60vh]"
            >
              <div
                class="flex flex-col w-full border-opacity-50 lg:flex-row justify-center items-center content-center"
              >
                <div class="grid h-40 card rounded-box place-items-center">
                  <button
                    class="btn join-item btn-primary w-40 h-40"
                    @click="base_save()"
                  >
                    <Icon
                      icon="mdi:clipboard-text-time-outline"
                      class="w-40 h-40 text-white"
                    />
                  </button>
                </div>
              </div>
              <div class="divider"></div>
              <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Frist Timestamp</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Frist Timestamp"
                    class="input input-bordered border-base-content"
                    v-model="base.form.frist_timestamp"
                    disabled
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Last Timestamp</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Timestamp"
                    class="input input-bordered border-base-content"
                    v-model="base.form.last_timestamp"
                    disabled
                  />
                </div>
              </div>
            </div>
            <!-- <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex"
            >
              <div class="flex-1 form-control mt-6">
                <label for="modal-base" class="btn btn-danger">Cancel</label>
              </div>
              <div class="flex-1 form-control mt-6" @click="base_save()">
                <button class="btn btn-primary text-white">Confirm</button>
              </div>
            </div> -->
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
            <div class="card-body overflow-auto max-h-[60vh]">
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
            <div class="card-body overflow-auto max-h-[60vh]">
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
            <h3 class="text-lg font-bold">Ticket No.</h3>
            <div class="card-body overflow-auto max-h-[60vh]">
              <div class="form-control">
                <label class="label">
                  <span class="label-text">No.</span>
                </label>
                <input
                  type="text"
                  placeholder="No."
                  class="input input-bordered border-base-content"
                  v-model="detail.form.ticket_no"
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
      </template>
      <template #view>
        <div class="grid grid-cols-1">
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body overflow-auto p-4">
              <div style="width: 100%; position: relative">
                <div
                  class="bg-primary h-auto text-white rounded-xl"
                >
                  <div
                    class="w-full flex flex-col flex-nowrap content-center justify-center p-4"
                  >
                    <div
                      class="text-md opacity-80 py-4 flex flex-row flex-nowrap content-center items-start justify-center text-3xl lg:text-4xl font-bold"
                    >
                      <!-- <Icon
                        icon="lets-icons:clock"
                        class="w-auto h-full p-2 text-white"
                      />08:30 - 17:30 -->
                      Software & Application Development By Internal IT UBIS (2024)
                    </div>
                    <!-- <button
                      class="btn  text-white border-rad rounded-xl shadow-inner"
                      :class="!this.location.id?'btn-warning':'btn-accent'"
                      @click="TS"
                    >
                      <Icon v-if="this.location.id"
                        icon="lets-icons:clock"
                        class="w-auto h-full p-2 text-white"
                      />
                      {{this.location.id?'Check In - Out':'Access permission'}}
                    </button> -->
                  </div>
                </div>
                <div class="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-3">
                  <div class="bg-base-100 border-2 hover:bg-green-50 h-60 relative">
                    <div class="border-b-2">
                      
                      <img
                      alt="Helpdesk Maintenance System"
                      :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=menu/helpdesk_maintenance.png&s=20`"
                      class="w-full h-40"
                      />
                    </div>
                    <!-- <iframe src="http://192.168.10.17/maintenance-helpdesk/" title="W3Schools Free Online Web Tutorials"></iframe> -->
                    <div class="flex flex-col text-center mt-1">
                      <a
                        href="http://192.168.10.17/maintenance-helpdesk/" 
                        target="_blank" 
                        class="font-bold text-primary text-md"
                      >
                        Helpdesk Maintenance System
                      </a>
                    </div>
                    <h3 class="text-xs opacity-70 absolute right-1 bottom-1">
                      <span class="font-semibold">Status:</span><span class="text-success font-bold"> Launch </span>(<span class="italic"> 18-03-2024 </span>)
                    </h3>
                  </div>
                  <div class="bg-base-100 border-2 hover:bg-green-50 h-60 relative">
                    <img
                      alt="Warehouse Management System"
                      :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=menu/wh_management.png&s=20`"
                      class="w-full h-40"
                    />
                    <div class="flex flex-col text-center mt-1">
                      <h3 
                        class="font-bold text-primary text-md"
                      >
                        Warehouse Management System
                      </h3>
                    </div>
                    <h3 class="text-xs opacity-70 absolute right-1 bottom-1">
                      <span class="font-semibold">Status:</span><span class="text-success font-bold"> Launch </span>(<span class="italic"> 01-04-2024 </span>)
                    </h3>
                  </div>
                  <div class="bg-base-100 border-2 hover:bg-green-50 h-60 relative">
                    <img
                      alt="Automate Pre-Weight System"
                      :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=menu/pre_weight.png&s=20`"
                      class="w-full h-40"
                    />
                    <div class="flex flex-col text-center mt-1">
                      <a 
                        href="http://192.168.20.20:8080/" 
                        target="_blank" 
                        class="h3 font-bold text-primary text-md"
                      >
                        Automate Pre-Weight System
                      </a>
                    </div>
                    <h3 class="text-xs opacity-70 absolute right-1 bottom-1">
                      <span class="font-semibold">Status:</span><span class="text-success font-bold"> Launch </span>(<span class="italic"> 01-05-2024 </span>)
                    </h3>
                  </div>
                  <div class="bg-base-100 border-2 hover:bg-green-50 h-60 relative">
                    <img
                      alt="QC Inspections Report"
                      :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=menu/qc_inspec.png&s=20`"
                      class="w-full h-40"
                    />
                    <div class="flex flex-col text-center mt-1">
                      <h3 
                        class="font-bold text-primary text-md"
                      >
                        QC Inspections Report
                      </h3>
                    </div>
                    <h3 class="text-xs opacity-70 absolute right-1 bottom-1">
                      <span class="font-semibold">Status:</span><span class="text-success font-bold"> Launch </span>(<span class="italic"> 15-07-2024 </span>)
                    </h3>
                  </div>
                  <div class="bg-base-100 border-2 hover:bg-green-50 h-60 relative">
                    <img
                      alt="Document Alert System"
                      :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=menu/doc_alert.png&s=20`"
                      class="w-full h-40"
                    />
                    <div class="flex flex-col text-center mt-1">
                      <h3 
                        class="font-bold text-primary text-md"
                      >
                        Document Alert System
                      </h3>
                    </div>
                    <h3 class="text-xs opacity-70 absolute right-1 bottom-1">
                      <span class="font-semibold">Status:</span><span class="text-success font-bold"> Launch </span>(<span class="italic"> 05-09-2024 </span>)
                    </h3>
                  </div>
                  <div class="bg-base-100 border-2 hover:bg-green-50 h-60 relative">
                    <img
                      alt="Inventory Movement & RM FG Inspection System"
                      :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=menu/inven_movement.png&s=20`"
                      class="w-full h-40"
                    />
                    <div class="flex flex-col text-center mt-1">
                      <h3 
                        class="font-bold text-primary text-sm"
                      >
                        Inventory Movement & RM FG Inspection System
                      </h3>
                    </div>
                    <h3 class="text-xs opacity-70 absolute right-1 bottom-1">
                      <span class="font-semibold">Status:</span><span class="text-success font-bold"> Launch </span>(<span class="italic"> 13-09-2024 </span>)
                    </h3>
                  </div>
                  <div class="bg-base-100 border-2 hover:bg-green-50 h-60 relative">
                    <img
                      alt="Warehouse Indirect System"
                      :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=menu/wh_indirect.png&s=20`"
                      class="w-full h-40"
                    />
                    <div class="flex flex-col text-center mt-1">
                      <h3 
                        class="font-bold text-primary text-md"
                      >
                        Warehouse Indirect System
                      </h3>
                    </div>
                    <h3 class="text-xs opacity-70 absolute right-1 bottom-1">
                      <span class="font-semibold">Status:</span><span class="text-success font-bold"> Launch </span>(<span class="italic"> 15-10-2024 </span>)
                    </h3>
                  </div>
                  <div class="bg-base-100 border-2 hover:bg-green-50 h-60 relative">
                    <img
                      alt="Automate Ticket TRR (Ticket Car Park)"
                      :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=menu/ticket_trr.png&s=20`"
                      class="w-full h-40"
                    />
                    <div class="flex flex-col text-center mt-1">
                      <h3 
                        class="font-bold text-primary text-md"
                      >
                        Automate Ticket TRR <span class="text-sm text-secondary">( Car Park )</span>
                      </h3>
                    </div>
                    <h3 class="text-xs opacity-70 absolute right-1 bottom-1">
                      <span class="font-semibold">Status:</span><span class="text-success font-bold"> Launch </span>(<span class="italic"> 01-11-2024 </span>)
                    </h3>
                  </div>
                  <div class="bg-base-100 border-2 hover:bg-green-50 h-60 relative">
                    <img
                      alt="Warehouse QA Retain Sample"
                      :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=menu/retain.png&s=20`"
                      class="w-full h-40"
                    />
                    <div class="flex flex-col text-center mt-1">
                      <h3 
                        class="font-bold text-primary text-md"
                      >
                        Warehouse QA Retain Sample
                      </h3>
                    </div>
                    <h3 class="text-xs opacity-70 absolute right-1 bottom-1">
                      <span class="font-semibold">Status:</span><span class="text-success font-bold"> Launch </span>(<span class="italic"> 29-11-2024 </span>)
                    </h3>
                  </div>
                  <div class="bg-base-100 border-2 hover:bg-green-50 h-60 relative">
                    <img
                      alt="Tracking System FG To Vita"
                      :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=menu/tracking.png&s=20`"
                      class="w-full h-40"
                    />
                    <div class="flex flex-col text-center mt-1">
                      <h3 
                        class="font-bold text-primary text-md"
                      >
                        Tracking System FG To Vita
                      </h3>
                    </div>
                    <h3 class="text-xs opacity-70 absolute right-1 bottom-1">
                      <span class="font-semibold">Status:</span><span class="text-success font-bold"> Launch </span>(<span class="italic"> 01-12-2024 </span>)
                    </h3>
                  </div>
                  <div class="bg-base-100 border-2 hover:bg-green-50 h-60 relative">
                    <img
                      alt="Visitor Management System"
                      :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=menu/visitor.png&s=20`"
                      class="w-full h-40"
                    />
                    <div class="flex flex-col text-center mt-1">
                      <h3 
                        class="font-bold text-primary text-md"
                      >
                        Visitor Management System
                      </h3>
                    </div>
                    <h3 class="text-xs opacity-70 absolute right-1 bottom-1">
                      <!-- <span class="font-semibold">Status:</span><span class="text-blue-500 font-bold"> On Process <span class="loading loading-infinity loading-xs"></span></span> -->
                      <span class="font-semibold">Status:</span><span class="text-success font-bold"> Launch </span>(<span class="italic"> 13-01-2025 </span>)
                    </h3>
                  </div>
                  <div class="bg-base-100 border-2 hover:bg-green-50 h-60 relative">
                    <img
                      alt="Purchase Approver Report"
                      :src="`${serviceUrl}api/controllers/MYSQL/INTERNAL/Global/image?path=menu/purchase_app.png&s=20`"
                      class="w-full h-40"
                    />
                    <div class="flex flex-col text-center mt-1">
                      <h3 
                        class="font-bold text-primary text-md"
                      >
                        Indirect Purchase System
                      </h3>
                    </div>
                    <h3 class="text-xs opacity-70 absolute right-1 bottom-1">
                      <span class="font-semibold">Status:</span><span class="text-blue-500 font-bold"> On Process <span class="loading loading-infinity loading-xs"></span></span>
                    </h3>
                  </div>
                </div>
                <hr class="my-4">
                <!-- <div
                  class="bg-primary h-auto text-white rounded-xl mt-4"
                >
                  <div
                    class="w-full flex flex-col flex-nowrap content-center justify-center p-4"
                  >
                    <div
                      class="text-md opacity-80 py-4 flex flex-row flex-nowrap content-center items-start justify-center text-3xl lg:text-4xl font-bold"
                    >
                      <Icon
                        icon="lets-icons:clock"
                        class="w-auto h-full p-2 text-white"
                      />08:30 - 17:30
                    </div>
                    <button
                      class="btn  text-white border-rad rounded-xl shadow-inner"
                      :class="!this.location.id?'btn-warning':'btn-accent'"
                      @click="TS"
                    >
                      <Icon v-if="this.location.id"
                        icon="lets-icons:clock"
                        class="w-auto h-full p-2 text-white"
                      />
                      {{this.location.id?'Check In - Out':'Access permission'}}
                    </button>
                  </div>
                </div> -->

                <!-- <div class="absolute w-full h-[50px] bg-primary">
                  <div
                    class="relative w-full grid content-center justify-center"
                  ></div>
                </div> -->
              </div>
              <div
                class="bg-base-100 border-base-300 rounded-box lg:p-6 overflow-auto w-full relative"
                style="box-shadow: inset 0px 10px 10px -10px rgba(0, 0, 0, 0.3)"
              >
                <div style="height: 600px; width: 100%">
                  <!-- {{location.pos}} -->
                  <l-map
                    ref="map"
                    v-model:zoom="zoom"
                    :center="[13.554447637062722, 100.22580910997632]"
                    >
                    <!-- :center="[location.pos.lat, location.pos.lng]" -->
                    <l-tile-layer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      layer-type="base"
                      name="OpenStreetMap"
                    ></l-tile-layer>

                    <l-marker
                      :lat-lng="[13.554447637062722, 100.22580910997632]"
                      ></l-marker>
                      <!-- :lat-lng="[location.pos.lat, location.pos.lng]" -->

                    <l-circle
                      v-for="(v, i) in base.rows"
                      :key="v.code"
                      :lat-lng="[v.lat, v.lng]"
                      :color="'red'"
                      :fillColor="'#f03'"
                      :fillOpacity="0.5"
                      :radius=" parseInt(v.distance)>1000?1000:parseInt(v.distance) "
                      >dasdasdsa</l-circle
                    >
                  </l-map>
                </div>
              </div>

              <!-- <div class="bg-base-100 border-base-300">
                <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div class="bg-base-100 border-base-300">
                    <h3 class="text-xl font-bold text-primary">
                      Current Timestamp
                    </h3>
                    <div class="overflow-x-auto w-full max-h-[25vh]">
                      <table
                        class="table table-xs table-pin-rows table-pin-cols table-zebra"
                      >
                        <thead>
                          <tr>
                            <th>Code</th>
                            <td>Timestamp</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(v, i) in base.rows" :key="v.code">
                            <th>{{ v.code }}</th>
                            <td>
                              <div class="flex items-center space-x-3">
                                <div>
                                  <div class="text-xs">
                                    {{
                                      v.created_at
                                        ? v.created_at &&
                                          $moment(v.created_at).format(
                                            "YYYY-MM-DD"
                                          ) > "2000"
                                          ? v.created_at
                                          : "-"
                                        : "-"
                                    }}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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
              </div> -->
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
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<script>
// @ is an alias to /src
import AppLayout from "@/components/App/layout.vue";
import AppModuleGlobalPageination from "@/components/App/Module/Global/Pageination.vue";
import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import Query from "@/assets/js/fetch.js";

import VueMultiselect from "vue-multiselect";
let colors = [
  "#E74645",
  "#FB7756",
  "#FACD60",
  "#FDFA66",
  "#1AC0C6",
  "#454D66",
  "#309975",
  "#58B368",
  "#DAD873",
  "#EFEEB4",
  "#F9B4AB",
  "#FDEBD3",
  "#264E70",
  "#679186",
  "#BBD4CE",
  "#52489C",
  "#4062BB",
  "#59C3C3",
  "#EBEBEB",
  "#F45B69",
];

var week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LCircle } from "@vue-leaflet/vue-leaflet";

export default {
  name: "Timestamp",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
    AppModuleGlobalShowImage,
    VueMultiselect,
    LMap,
    LTileLayer,
    LMarker,
    LCircle,
  },
  data() {
    return {
      timerID: null,
      zoom: 12,
      time2: "",
      date2: "",
      date: {
        from: this.$moment(new Date()).format("YYYY-MM-DD"),
        to: this.$moment(new Date()).format("YYYY-MM-DD"),
      },
      series2: [44, 55, 13, 43, 22],
      chartOptions2: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },

      series: [
        {
          data: [21, 22, 10, 28, 16, 21, 13, 30],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            ["John", "Doe"],
            ["Joe", "Smith"],
            ["Jake", "Williams"],
            "Amber",
            ["Peter", "Brown"],
            ["Mary", "Evans"],
            ["David", "Wilson"],
            ["Lily", "Roberts"],
          ],
          labels: {
            style: {
              colors: colors,
              fontSize: "12px",
            },
          },
        },
      },

      tab: "Report",
      value_select: [],
      options_select: [
        // { name: "โต๊ะ", code: "โต๊ะ" },
        // { name: "เก้าอี้", code: "เก้าอี้" },
      ],
      loadimage: false,
      options: {
        penColor: "#c0f",
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
        row: 1000,
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
      ts: {
        rows: [],
        total: 0,
        page: 1,
        row: 1000,
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
      remove: {
        current: 0,
        model: false,
        controll: "",
        tb: "",
      },
      imageSrc: null,
      ticket: {
        hours: 0,
        minutes: 0,
        get: 0,
      },
      location: {
        id: null,
        pos: {
          lat: 0,
          lng: 0,
        },
      },
    };
  },
  computed: {
    serviceUrl() {
      return this.$store.getters.serviceUrl;
    },
    user_token() {
      // // console.log("token");
      // //console.log(this.$store.getters.user_token);
      return this.$store.getters.user_token;
    },
  },
  methods: {
    TS() {
      if(!this.location.id){
        return this.getGPS()
      }
      console.log(":DAS");
      this.ts.controll = "create";
      this.ts_save();
      // this.base_save();
    },
    // change() {
    //   this.base_search();
    // },
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
      new Query("base", "get").get(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/lbs/location?lat=${this.location.pos.lat}&lng=${this.location.pos.lng}`,
        (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });

            this.ticket.hours = this.$moment
              .duration(
                this.$moment(res.rows[0].created_at).diff(
                  this.$moment(res.rows[res.rows.length - 1].created_at),
                  "minutes"
                ),
                "minutes"
              )
              .hours();

            this.ticket.minutes = this.$moment
              .duration(
                this.$moment(res.rows[0].created_at).diff(
                  this.$moment(res.rows[res.rows.length - 1].created_at),
                  "minutes"
                ),
                "minutes"
              )
              .minutes();

            this.ticket.get =
              this.ticket.hours + (this.ticket.minutes > 0 ? 1 : 0);
            // console.error(this.ticket.hours);
          }
          callback({ ...res });
        }
      );
    },
    base_create() {
      this.base.current = 0;
      this.base.form = {
        code: "",
      };

      this.base.controll = "create";

      if (this.base.rows.length > 0) {
        this.base.form.frist_timestamp =
          this.base.rows[this.base.rows.length - 1].created_at;
        this.base.form.last_timestamp = this.base.rows[0].created_at;
      } else {
        this.base.form.frist_timestamp = "-";
        this.base.form.last_timestamp = "-";
      }
    },
    base_save() {
      let vm = this;
      let obj = { rows: [{ ...this.base.form }] };

      new Query("base", this.base.controll == "create" ? "POST" : "PUT").set(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/TRR/timestamp`,
        obj,
        (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            this.base.modal = false;
            this.base_search();
            // this.detail_search();
          }
        }
      );
    },

    // ts
    ts_search() {
      this.ts.loading = true;
      this.ts_get((res) => {
        this.ts.rows = res.rows;
        this.ts.total = res.total;
        this.ts.next =
          this.ts.page * this.ts.row >= this.ts.total ? false : true;
        this.ts.back = this.ts.page > 1 ? true : false;
        this.ts.loading = false;
      });
    },
    ts_get(callback) {
      new Query("ts", "get").get(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/lbs/ts?lat=${this.location.pos.lat}&lng=${this.location.pos.lng}`,
        (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            res.rows.forEach((v, i) => {
              res.rows[i].image = v.image ? JSON.parse(v.image) : [];
              res.rows[i].master = 0;
            });

            this.ticket.hours = this.$moment
              .duration(
                this.$moment(res.rows[0].created_at).diff(
                  this.$moment(res.rows[res.rows.length - 1].created_at),
                  "minutes"
                ),
                "minutes"
              )
              .hours();

            this.ticket.minutes = this.$moment
              .duration(
                this.$moment(res.rows[0].created_at).diff(
                  this.$moment(res.rows[res.rows.length - 1].created_at),
                  "minutes"
                ),
                "minutes"
              )
              .minutes();

            this.ticket.get =
              this.ticket.hours + (this.ticket.minutes > 0 ? 1 : 0);
            // console.error(this.ticket.hours);
          }
          callback({ ...res });
        }
      );
    },
    ts_create() {
      this.ts.current = 0;
      this.ts.form = {
        code: "",
      };

      this.ts.controll = "create";

      if (this.ts.rows.length > 0) {
        this.ts.form.frist_timestamp =
          this.ts.rows[this.ts.rows.length - 1].created_at;
        this.ts.form.last_timestamp = this.ts.rows[0].created_at;
      } else {
        this.ts.form.frist_timestamp = "-";
        this.ts.form.last_timestamp = "-";
      }
    },
    ts_save() {
      let vm = this;
      let obj = {
        rows: [
          {
            ...this.ts.form,
            lat: this.location.pos.lat,
            lng: this.location.pos.lng,
          },
        ],
      };

      new Query("ts", this.ts.controll == "create" ? "POST" : "PUT").set(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/HR/lbs/ts`,
        obj,
        (res) => {
          if (!res.success) {
            alert(res.errorMsg);

            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            alert("SUCCESS");
            this.ts.modal = false;
            // this.ts_search();
            // this.detail_search();
          }
        }
      );
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

        // console.log(this.detail.rows);
      });
    },
    detail_get(callback) {
      new Query("detail", "get").get(
        this,
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/TRR/ticket?total=1&onlyme=1&today=1&page=${
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
    detail_save(type) {
      this.detail.controll = "create";
      let obj = { rows: [{ ...this.detail.form }] };
      obj["rows"]["ticket"] = this.ticket.get;
      // console.log(obj);
      if (this.detail.controll == "edit") {
        obj["rows"]["code"] = this.detail.form.code;
      }

      new Query(
        "detail",
        this.detail.controll == "create" ? "POST" : "PUT"
      ).set(
        this,
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/TRR/ticket`,
        obj,
        (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            this.detail.modal = false;
            if (type == "static") {
              this.base_search();
              this.detail.page = 1;
              this.detail_search();
            }
          }
        }
      );
    },
    // REMOVE
    remove_item(code, controll, tb) {
      // console.log(code);
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
    updateTime() {
      let cd = new Date();
      this.time2 =
        this.zeroPadding(cd.getHours(), 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2);
      this.date2 =
        this.zeroPadding(cd.getFullYear(), 4) +
        "-" +
        this.zeroPadding(cd.getMonth() + 1, 2) +
        "-" +
        this.zeroPadding(cd.getDate(), 2) +
        " " +
        week[cd.getDay()];
    },
    zeroPadding(num, digit) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    success(pos) {
      const crd = pos.coords;
      console.log(crd.latitude, crd.longitude);

      if (
        this.location.pos.latitude === crd.latitude &&
        this.location.pos.longitude === crd.longitude
      ) {
        console.log("Congratulations, you reached the target");
        navigator.geolocation.clearWatch(this.location.id);
      } else {
        this.location.pos = {
          lat: crd.latitude,
          lng: crd.longitude,
        };
        // this.ts_search();
      }
    },
    error(err) {
      console.error(`ERROR(${err.code}): ${err}`);
    },
    getGPS(){
 
      this.location.id = navigator.geolocation.watchPosition(
        this.success,
        this.error,
        {
          enableHighAccuracy: true,
          // timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  },
  unmounted() {
    clearInterval(this.timerID);
    navigator.geolocation.clearWatch(this.location.id);
  },
  mounted() {
   
    this.$nextTick(async () => {
    

        
      this.base_search();
      // this.detail_search();
      // this.timerID = setInterval(this.updateTime, 1000);
      // this.updateTime();
    });
  },
  watch: {
    "base.form.desired_date": function (v) {
      if (!this.base.form.early_notification) {
        this.base.form.early_notification = v;
      }
    },
  },
};
</script>
<style scrop>
.leaflet-pane {
  z-index: 5;
}
.leaflet-top,
.leaflet-bottom {
  /* position: absolute; */
  z-index: 5;
  /* pointer-events: none; */
}
tr,
td {
  white-space: nowrap;
}
/* 
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  } */

#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #000000, #000000);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.container {
  width: "100%";
  padding: 8px 16px;
}

.buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
}
</style>

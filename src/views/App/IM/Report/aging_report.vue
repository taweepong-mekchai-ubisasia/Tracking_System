<template>
  <AppLayout ref="AppLayoutComponent">
    <template #modal>
      <AppModulePagesWHModalAging
        v-model="base.data"
        @update:success="fnBase.success"
        ref="baseModal"
      />
    </template>
    <template #view>
      <div class="grid grid-cols-1 gap-3">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-5">
            <div>
              <div :class="`${base.data.form.loading ? 'blur-sm' : ''}`">
                <div ref="titleZone">
                  <div
                    class="gap-2 sm:gap-4 flex-row flex w-full justify-end items-center relative"
                  >
                    <h3 class="text-lg font-bold text-primary sm:block hidden">
                      AGING&nbsp;SUMMARY&nbsp;DASHBOARD<br /><span
                        class="text-xs text-secondary"
                        >Current Date: {{ base.search[0].value ? $moment(base.search[0].value).format('DD-MM-YYYY') : '-' }}</span
                      >
                    </h3>
                    <div
                      class="gap-2 sm:gap-4 flex-row flex w-full justify-end relative"
                    >
                      <button
                        class="join-item btn sm:btn-sm btn-xs"
                        @click="exportExcel()"
                      >
                        <Icon icon="file-icons:microsoft-excel" />
                      </button>
                      <AppModuleGlobalSearchV2
                        @update:search="fnBase.success"
                        v-model="base.search"
                        :loading="base.data.form.loading"
                      />
                    </div>
                  </div>
                  <div class="divider my-1"></div>
                </div>
                <div
                  class="overflow-x-auto w-full p-1"
                  :style="{
                    maxHeight: contentHeight,
                    minHeight: contentHeight,
                  }"
                >
                  <div
                    v-if="uba.data.form.loading && uba.data.rows"
                    class="flex flex-col h-full justify-around border-2 rounded-lg p-2 bg-base-200 my-2 shadow"
                  >
                    <!-- :style="{
                      maxHeight: contentHeight,
                      minHeight: contentHeight,
                    }" -->
                    <div class="grid md:grid-cols-2 grid-cols-1 gap-2 h-full">
                      <div>
                        <div class="bg-primary font-bold p-1 rounded-md text-white">FG</div>
                        <div class="chart-wrap">
                          <div id="chart">
                            <apexchart
                              v-if="options[`fgUBA`]?.colors?.length > 0"
                              type="bar"
                              height="180"
                              width="100%"
                              :options="options[`fgUBA`]"
                              :series="series[`fgUBA`]"
                              @click="clickHandler"
                            ></apexchart>
                            <div v-else>EMPTY DATA</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="bg-primary font-bold p-1 rounded-md text-white">RM+Semi</div>
                        <div class="chart-wrap">
                          <div id="chart">
                            <apexchart
                              v-if="options[`rmUBA`].colors?.length > 0"
                              type="bar"
                              height="180"
                              width="100%"
                              :options="options[`rmUBA`]"
                              :series="series[`rmUBA`]"
                              @click="clickHandler"
                            ></apexchart>
                            <div v-else>EMPTY DATA</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-full h-full border-2 p-1 rounded-lg bg-base-100 overflow-auto">
                      <table class="table table-xs overflow-x-auto">
                        <thead>
                          <tr>
                            <th class="text-sm" colspan="5">UBA ( Exclude Hold store )</th>
                          </tr>
                          <tr>
                            <th>#</th>
                            <td class="text-right">ตั้งแต่ 180 วันลงไป</td>
                            <td class="text-right">เกิน 180 วัน - 365 วัน</td>
                            <td class="text-right">เกิน 365 วัน - 1,000 วัน</td>
                            <td class="text-right">มากกว่า 1,000 วัน</td>
                            <td class="text-right">Total</td>
                            <td class="text-right">Stock Balance</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>FG Quantity (KG.)</th>
                            <td
                              class="text-right"
                              v-for="(v, i) in uba.data.rows.fgUBA"
                            >
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(v.summ)
                              }}
                            </td>
                            <td
                              v-if="uba.data.rows.fgUBA?.length != 4"
                              :colspan="4 - uba.data.rows.fgUBA?.length"
                            ></td>
                            <td class="text-right">
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(
                                  uba.data.rows.fgUBA?.reduce((a, b) => {
                                    return {
                                      summ:
                                        parseFloat(a.summ) + parseFloat(b.summ),
                                    };
                                  }).summ
                                )
                              }}
                            </td>
                            <td class="text-right">
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(uba.data.summary.fgUBA)
                              }}
                            </td>
                          </tr>
                          <tr>
                            <th>FG ( จำนวน Lot )</th>
                            <td
                              class="text-right"
                              v-for="(v, i) in uba.data.rows.fgUBA"
                            >
                              {{ v.countt }}
                            </td>
                            <td
                              v-if="uba.data.rows.fgUBA?.length != 4"
                              :colspan="4 - uba.data.rows.fgUBA?.length"
                            ></td>
                            <td class="text-right">
                              {{
                                uba.data.rows.fgUBA?.reduce((a, b) => {
                                  return {
                                    countt:
                                      parseFloat(a.countt) +
                                      parseFloat(b.countt),
                                  };
                                }).countt
                              }}
                            </td>
                            <td></td>
                          </tr>
                          <tr class="bg-yellow-100 text-gray-600">
                            <th>%</th>
                            <td
                              class="text-right"
                              v-for="(v, i) in uba.data.rows.fgUBA"
                            >
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 4,
                                  maximumFractionDigits: 4
                                }).format(
                                  (v.summ / uba.data.summary.fgUBA) * 100
                                )
                              }}
                            </td>
                            <td
                              v-if="uba.data.rows.fgUBA?.length != 4"
                              :colspan="4 - uba.data.rows.fgUBA?.length"
                            ></td>
                            <td class="text-right">
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 4,
                                  maximumFractionDigits: 4
                                }).format(
                                  (uba.data.rows.fgUBA?.reduce((a, b) => {
                                    return {
                                      summ:
                                        parseFloat(a.summ) + parseFloat(b.summ),
                                    };
                                  }).summ /
                                    uba.data.summary.fgUBA) *
                                    100
                                )
                              }}
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <th>RM+Semi Quantity (KG.)</th>
                            <td
                              class="text-right"
                              v-for="(v, i) in uba.data.rows.rmUBA"
                            >
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(v.summ)
                              }}
                            </td>
                            <td class="text-right">
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(
                                  uba.data.rows.rmUBA?.reduce((a, b) => {
                                    return {
                                      summ:
                                        parseFloat(a.summ) + parseFloat(b.summ),
                                    };
                                  }).summ
                                )
                              }}
                            </td>
                            <td class="text-right">
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(uba.data.summary.rmUBA)
                              }}
                            </td>
                          </tr>
                          <tr>
                            <th>RM+Semi ( จำนวน Lot )</th>
                            <td
                              class="text-right"
                              v-for="(v, i) in uba.data.rows.rmUBA"
                            >
                              {{ v.countt }}
                            </td>
                            <td class="text-right">
                              {{
                                uba.data.rows.rmUBA?.reduce((a, b) => {
                                  return {
                                    countt:
                                      parseFloat(a.countt) +
                                      parseFloat(b.countt),
                                  };
                                }).countt
                              }}
                            </td>
                            <td></td>
                          </tr>
                          <tr class="bg-yellow-100 text-gray-600">
                            <th>%</th>
                            <td
                              class="text-right"
                              v-for="(v, i) in uba.data.rows.rmUBA"
                            >
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 4,
                                  maximumFractionDigits: 4
                                }).format(
                                  (v.summ / uba.data.summary.rmUBA) * 100
                                )
                              }}
                            </td>
                            <td class="text-right">
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 4,
                                  maximumFractionDigits: 4
                                }).format(
                                  (uba.data.rows.rmUBA?.reduce((a, b) => {
                                    return {
                                      summ:
                                        parseFloat(a.summ) + parseFloat(b.summ),
                                    };
                                  }).summ /
                                    uba.data.summary.rmUBA) *
                                    100
                                )
                              }}
                            </td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    v-if="ubp.data.form.loading && ubp.data.rows"
                    class="flex flex-col h-full justify-around border-2 rounded-lg p-2 bg-base-200 my-2 shadow"
                  >
                    <!-- :style="{
                      maxHeight: contentHeight,
                      minHeight: contentHeight,
                    }" -->
                    <div class="grid md:grid-cols-2 grid-cols-1 gap-2 h-full">
                      <div>
                        <div class="bg-primary font-bold p-1 rounded-md text-white">FG</div>
                        <div class="chart-wrap">
                          <div id="chart">
                            <apexchart
                              v-if="options[`fgUBP`]?.colors?.length > 0"
                              type="bar"
                              height="180"
                              width="100%"
                              :options="options[`fgUBP`]"
                              :series="series[`fgUBP`]"
                              @click="clickHandler"
                            ></apexchart>
                            <div v-else>EMPTY DATA</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="bg-primary font-bold p-1 rounded-md text-white">RM+Semi</div>
                        <div class="chart-wrap">
                          <div id="chart">
                            <apexchart
                              v-if="options[`rmUBP`]?.colors?.length > 0"
                              type="bar"
                              height="180"
                              width="100%"
                              :options="options[`rmUBP`]"
                              :series="series[`rmUBP`]"
                              @click="clickHandler"
                            ></apexchart>
                            <div v-else>EMPTY DATA</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-full border-2 p-1 rounded-lg bg-base-100 overflow-auto">
                      <table class="table table-xs">
                        <thead>
                          <tr>
                            <th class="text-sm" colspan="5">UBP ( Exclude Hold store )</th>
                          </tr>
                          <tr>
                            <th>#</th>
                            <td class="text-right">ตั้งแต่ 180 วันลงไป</td>
                            <td class="text-right">เกิน 180 วัน - 365 วัน</td>
                            <td class="text-right">เกิน 365 วัน - 1,000 วัน</td>
                            <td class="text-right">มากกว่า 1,000 วัน</td>
                            <td class="text-right">Total</td>
                            <td class="text-right">Stock Balance</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>FG Quantity (KG.)</th>
                            <td
                              class="text-right"
                              v-for="(v, i) in ubp.data.rows.fgUBP"
                            >
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(v.summ)
                              }}
                            </td>
                            <td
                              v-if="ubp.data.rows.fgUBP?.length != 4"
                              :colspan="4 - ubp.data.rows.fgUBP?.length"
                            ></td>
                            <td class="text-right">
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  maximumFractionDigits: 2,
                                  minimumFractionDigits: 2,
                                }).format(
                                  ubp.data.rows.fgUBP?.reduce((a, b) => {
                                    return {
                                      summ:
                                        parseFloat(a.summ) + parseFloat(b.summ),
                                    };
                                  }).summ
                                )
                              }}
                            </td>
                            <td class="text-right">
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(ubp.data.summary.fgUBP)
                              }}
                            </td>
                          </tr>
                          <tr>
                            <th>FG ( จำนวน Lot )</th>
                            <td
                              class="text-right"
                              v-for="(v, i) in ubp.data.rows.fgUBP"
                            >
                              {{ v.countt }}
                            </td>
                            <td
                              v-if="ubp.data.rows.fgUBP?.length != 4"
                              :colspan="4 - ubp.data.rows.fgUBP?.length"
                            ></td>
                            <td class="text-right">
                              {{
                                ubp.data.rows.fgUBP?.reduce((a, b) => {
                                  return {
                                    countt:
                                      parseFloat(a.countt) +
                                      parseFloat(b.countt),
                                  };
                                }).countt
                              }}
                            </td>
                            <td></td>
                          </tr>
                          <tr class="bg-yellow-100 text-gray-600">
                            <th>%</th>
                            <td
                              class="text-right"
                              v-for="(v, i) in ubp.data.rows.fgUBP"
                            >
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 4,
                                  maximumFractionDigits: 4
                                }).format(
                                  (v.summ / ubp.data.summary.fgUBP) * 100
                                )
                              }}
                            </td>
                            <td
                              v-if="ubp.data.rows.fgUBP?.length != 4"
                              :colspan="4 - ubp.data.rows.fgUBP?.length"
                            ></td>
                            <td class="text-right">
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 4,
                                  maximumFractionDigits: 4
                                }).format(
                                  (ubp.data.rows.fgUBP?.reduce((a, b) => {
                                    return {
                                      summ:
                                        parseFloat(a.summ) + parseFloat(b.summ),
                                    };
                                  }).summ /
                                    ubp.data.summary.fgUBP) *
                                    100
                                )
                              }}
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <th>RM+Semi Quantity (KG.)</th>
                            <td
                              class="text-right"
                              v-for="(v, i) in ubp.data.rows.rmUBP"
                            >
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(v.summ)
                              }}
                            </td>
                            <td class="text-right">
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(
                                  ubp.data.rows.rmUBP?.reduce((a, b) => {
                                    return {
                                      summ:
                                        parseFloat(a.summ) + parseFloat(b.summ),
                                    };
                                  }).summ
                                )
                              }}
                            </td>
                            <td class="text-right">
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(ubp.data.summary.rmUBP)
                              }}
                            </td>
                          </tr>
                          <tr>
                            <th>RM+Semi ( จำนวน Lot )</th>
                            <td
                              class="text-right"
                              v-for="(v, i) in ubp.data.rows.rmUBP"
                            >
                              {{ v.countt }}
                            </td>
                            <td class="text-right">
                              {{
                                ubp.data.rows.rmUBP?.reduce((a, b) => {
                                  return {
                                    countt:
                                      parseFloat(a.countt) +
                                      parseFloat(b.countt),
                                  };
                                }).countt
                              }}
                            </td>
                            <td></td>
                          </tr>
                          <tr class="bg-yellow-100 text-gray-600">
                            <th>%</th>
                            <td
                              class="text-right"
                              v-for="(v, i) in ubp.data.rows.rmUBP"
                            >
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 4,
                                  maximumFractionDigits: 4
                                }).format(
                                  (v.summ / ubp.data.summary.rmUBP) * 100
                                )
                              }}
                            </td>
                            <td class="text-right">
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 4,
                                  maximumFractionDigits: 4
                                }).format(
                                  (ubp.data.rows.rmUBP?.reduce((a, b) => {
                                    return {
                                      summ:
                                        parseFloat(a.summ) + parseFloat(b.summ),
                                    };
                                  }).summ /
                                    ubp.data.summary.rmUBP) *
                                    100
                                )
                              }}
                            </td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div 
                    v-if="uba.data.form.loading && ubp.data.form.loading" 
                    class="grid sm:grid-cols-2 grid-cols-1 gap-2 h-full my-2"
                  >
                    <div class="flex flex-col h-full justify-around border-2 rounded-lg p-2 bg-base-200 shadow">
                    <!-- :style="{
                      maxHeight: contentHeight,
                      minHeight: contentHeight,
                    }" -->
                      <div class="bg-primary font-bold p-1 rounded-md text-white">UBA</div>
                        <div class="chart-wrap">
                          <div id="chart">
                            <apexchart
                              v-if="options[`holdUBA`].colors?.length > 0"
                              type="donut"
                              height="220"
                              width="100%"
                              :options="options[`holdUBA`]"
                              :series="series[`holdUBA`]"
                            ></apexchart>
                            <!-- @click="clickHandler" -->
                            <div v-else>EMPTY DATA</div>
                          </div>
                        </div>
                        <div class="w-full border-2 p-1 rounded-lg bg-base-100 overflow-auto">
                          <table class="table table-xs">
                            <thead>
                              <tr>
                                <th class="text-sm" colspan="5">UBA - Hold store</th>
                              </tr>
                              <tr>
                                <th>#</th>
                                <td class="text-right">รอดำเนินการ</td>
                                <td class="text-right">รอขายเกรด B</td>
                                <td class="text-right">รอทำลาย</td>
                                <td class="text-right">Total</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>Quantity (KG.)</th>
                                <td class="text-right">
                                  {{
                                    new Intl.NumberFormat("th-TH", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(uba.data.rows.holdUBA?.pending)
                                  }}
                                </td>
                                <td class="text-right">
                                  {{
                                    new Intl.NumberFormat("th-TH", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(uba.data.rows.holdUBA?.gradeB)
                                  }}
                                </td>
                                <td class="text-right">
                                  {{
                                    new Intl.NumberFormat("th-TH", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(uba.data.rows.holdUBA?.dispose)
                                  }}
                                </td>
                                <td class="text-right">
                                  {{
                                    new Intl.NumberFormat("th-TH", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }).format(uba.data.rows.holdUBA?.total)
                                  }}
                                </td>
                              </tr>
                              <tr class="bg-yellow-100 text-gray-600">
                                <th>%</th>
                                <td class="text-right">
                                  {{
                                    new Intl.NumberFormat("th-TH", {
                                      minimumFractionDigits: 4,
                                      maximumFractionDigits: 4
                                    }).format(
                                      (uba.data.rows.holdUBA?.pending /
                                        uba.data.rows.holdUBA?.total) *
                                        100
                                    )
                                  }}
                                </td>
                                <td class="text-right">
                                  {{
                                    new Intl.NumberFormat("th-TH", {
                                      minimumFractionDigits: 4,
                                      maximumFractionDigits: 4
                                    }).format(
                                      (uba.data.rows.holdUBA?.gradeB /
                                        uba.data.rows.holdUBA?.total) *
                                        100
                                    )
                                  }}
                                </td>
                                <td class="text-right">
                                  {{
                                    new Intl.NumberFormat("th-TH", {
                                      minimumFractionDigits: 4,
                                      maximumFractionDigits: 4
                                    }).format(
                                      (uba.data.rows.holdUBA?.dispose /
                                        uba.data.rows.holdUBA?.total) *
                                        100
                                    )
                                  }}
                                </td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    <div class="flex flex-col h-full justify-around border-2 rounded-lg p-2 bg-base-200 shadow">
                      <div class="bg-primary font-bold p-1 rounded-md text-white">UBP</div>
                      <div class="chart-wrap">
                        <div id="chart">
                          <apexchart
                            v-if="options[`holdUBP`].colors?.length > 0"
                            type="donut"
                            height="220"
                            width="100%"
                            :options="options[`holdUBP`]"
                            :series="series[`holdUBP`]"
                          ></apexchart>
                          <!-- @click="clickHandler" -->
                          <div v-else>EMPTY DATA</div>
                        </div>
                      </div>
                      <div class="w-full border-2 p-1 rounded-lg bg-base-100 overflow-auto">
                        <table class="table table-xs">
                          <thead>
                            <tr>
                              <th class="text-sm" colspan="5">UBP - Hold store</th>
                            </tr>
                            <tr>
                              <th>#</th>
                              <td class="text-right">รอดำเนินการ</td>
                              <td class="text-right">รอทำลาย</td>
                              <td class="text-right">Total</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>Quantity (KG.)</th>
                              <td class="text-right">
                                {{
                                  new Intl.NumberFormat("th-TH", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(ubp.data.rows.holdUBP?.pending)
                                }}
                              </td>
                              <td class="text-right">
                                {{
                                  new Intl.NumberFormat("th-TH", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(ubp.data.rows.holdUBP?.dispose)
                                }}
                              </td>
                              <td class="text-right">
                                {{
                                  new Intl.NumberFormat("th-TH", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }).format(ubp.data.rows.holdUBP?.total)
                                }}
                              </td>
                            </tr>
                            <tr class="bg-yellow-100 text-gray-600">
                              <th>%</th>
                              <td class="text-right">
                                {{
                                  new Intl.NumberFormat("th-TH", {
                                    minimumFractionDigits: 4,
                                    maximumFractionDigits: 4
                                  }).format(
                                    (ubp.data.rows.holdUBP?.pending /
                                      ubp.data.rows.holdUBP?.total) *
                                      100
                                  )
                                }}
                              </td>
                              <td class="text-right">
                                {{
                                  new Intl.NumberFormat("th-TH", {
                                    minimumFractionDigits: 4,
                                    maximumFractionDigits: 4
                                  }).format(
                                    (ubp.data.rows.holdUBP?.dispose /
                                      ubp.data.rows.holdUBP?.total) *
                                      100
                                  )
                                }}
                              </td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
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
import { useContentHeight } from "@/composables/useContentHeightDynamic";
import { fetchQuery, buildPath, configureQuery } from "@/composables/useQuery";
import { computed, ref, getCurrentInstance } from "vue";

import AppLayout from "@/components/App/layout.vue";

import AppModuleGlobalPagination from "@/components/App/Module/Global/Pagination.vue";
import AppModuleGlobalSearchV2 from "@/components/App/Module/Global/SearchV2.vue";
import AppModuleGlobalRemove from "@/components/App/Module/Global/Remove.vue";

import AppModuleGlobalUpload from "@/components/App/Module/Global/Upload.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalShowImage from "@/components/App/Module/Global/ShowImage.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import AppModuleGlobalOptionSelection from "@/components/App/Module/Global/OptionSelection.vue";
import AppModuleGlobalCombobox from "@/components/App/Module/Global/Combobox.vue";
import AppModulePagesWHModalAging from "@/components/App/Module/Pages/WH/Modal/Aging.vue";
// import Query from "@/assets/js/fetch.js";

export default {
  name: "AgingDashboard",
  components: {
    AppLayout,
    AppModuleGlobalUpload,
    AppModuleGlobalPagination,
    AppModuleGlobalSearchV2,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalShowImage,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    AppModuleGlobalOptionSelection,
    AppModuleGlobalRemove,
    AppModuleGlobalCombobox,
    AppModulePagesWHModalAging,
  },
  setup() {
    const { appContext } = getCurrentInstance();
    const moment = appContext.config.globalProperties.$moment;

    const store = useStore();
    configureQuery(store);

    const user = computed(() => store.getters.user);
    const serviceUrl = computed(() => store.getters.serviceUrl);

    const AppLayoutComponent = ref(null);
    const titleZone = ref(null);

    const { contentHeight } = useContentHeight(
      AppLayoutComponent,
      titleZone,
      0.1
    );

    const options = ref({
      fgUBA: {},
      rmUBA: {},
      holdUBA: {},
      fgUBP: {},
      rmUBP: {},
      holdUBP: {},
    });

    const series = ref({
      fgUBA: {},
      rmUBA: {},
      holdUBA: {},
      fgUBP: {},
      rmUBP: {},
      holdUBP: {},
    });

    const base = ref({
      data: {
        summary: [],
        rows: [],
        form: {
          condition: "",
          loading: false,
          object: {},
        },
      },
      search: [
        {
          type: "date",
          id: "dateCurrent",
          placeholder: "Search",
          label: "Date",
          value: "",
        },
      ],
    });

    const uba = ref({
      data: {
        summary: [],
        rows: [],
        form: {
          loading: false,
          object: {},
        },
      },
    });

    const ubp = ref({
      data: {
        summary: [],
        rows: [],
        form: {
          loading: false,
          object: {},
        },
      },
    });

    const colors = ref([
      // "#E74645",
      // "#FB7756",
      // "#FACD60",
      // "#1AC0C6",
      "#454D66",
      "#309975",
      "#58B368",
      "#DAD873",
      "#F9B4AB",
      "#264E70",
      "#679186",
      "#BBD4CE",
      "#52489C",
      "#4062BB",
      "#59C3C3",
      "#EBEBEB",
      "#F45B69",
      "#FDFA66",
      "#EFEEB4",
      "#FDEBD3",
    ]);

    const clickHandler = (event, chartContext, config) => {
      console.log(event, chartContext, config);

      if (chartContext.opts.chart.type == 'donut') {
        // Donut
        let condition = "";
        for (const [key, value] of Object.entries(series.value)) {
          if (JSON.stringify(value) === JSON.stringify(config.globals.series)) {
            condition = key
          }
        }
        base.value.data.form.current = config.config.labels[event.target.getAttribute('j')];
        base.value.data.form.condition = condition;
      }

      if (chartContext.opts.chart.type == 'bar') {
        // Bar
        base.value.data.form.current = config.config.xaxis.categories[config.dataPointIndex];
        base.value.data.form.condition = config.config.series[0].name;
      }

      baseModal.value.fnBase.search();
    };

    const fnBase = {
      search: async (db) => {
        try {
          base.value.data.form.loading = true;
          uba.value.data.form.loading = false;
          ubp.value.data.form.loading = false;
          await fnBase.get(db);
        } catch (error) {
          console.error("Error during search:", error);
        }
      },
      get: async (db) => {
        try {
          const queryParams = {
            page: 1,
            row: null,
            aging: true,
            search: base.value.search,
            getTotal: true,
          };

          const path = buildPath(
            queryParams,
            `api/controllers/SAP/${db}/Inventory/RBTN`
          );
          const res = await fetchQuery({}, "GET", path);
          if (res.success) {
            // let cl = [];
            // for (let i = 0; i < 4; i++) {
            //   cl.push(
            //     colors.value[Math.floor(Math.random() * colors.value.length)]
            //   );
            // }

            function genChart(name, data, label) {
              data = data.map(Number);
              // series.value[name] = [{ name: name, data: data }];
              series.value[name] = data;

              options.value[name] = {
                chart: {
                  type: "donut",
                },
                labels: label,
                colors: name == 'holdUBA' 
                  ? ["#1AC0C6", "#FACD60", "#E74645"] 
                  : ["#1AC0C6", "#E74645"],
                tooltip: {
                  y: {
                    formatter: function (value) {
                      // เพิ่ม comma คั่นหลักพัน
                      return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
                    },
                  },
                },
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
              };
            }

            function genBar(name, data, label) {
              series.value[name] = [{ name: name, data: data }];

              options.value[name] = {
                chart: {
                  type: "bar",
                },
                colors: colors.value,
                plotOptions: {
                  bar: {
                    distributed: true,
                    borderRadius: 4,
                    borderRadiusApplication: "end",
                  },
                },
                dataLabels: {
                  enabled: true,
                  formatter: function (value) {
                    // เพิ่ม comma ให้กับ value
                    return value.toLocaleString();
                  },
                },
                legend: {
                  show: false,
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
              };
            }

            for (const [key, value] of Object.entries(res.data)) {
              let data = [];
              let label = [];

              if (key.indexOf("hold") == -1) {
                value
                  ? value.forEach((v, i) => {
                      label.push(v.range ? v.range.substr(3) : "-");
                      data.push(parseFloat(v.summ).toFixed(2));
                    })
                  : "";

                genBar(key, data, label);
              }
            }

            if (db == "UBA") {
              uba.value.data.rows = res.data;

              let data = [];
              let label = [];
              for (const [key, value] of Object.entries(
                uba.value.data.rows.holdUBA
              )) {
                label.push(
                  key == "pending"
                    ? "รอดำเนินการ"
                    : key == "gradeB"
                    ? "รอขายเกรด B"
                    : "รอทำลาย"
                );
                data.push(parseFloat(value).toFixed(2));
              }
              genChart("holdUBA", data, label);

              uba.value.data.rows.holdUBA["total"] =
                parseFloat(uba.value.data.rows.holdUBA.pending) +
                parseFloat(uba.value.data.rows.holdUBA.gradeB) +
                parseFloat(uba.value.data.rows.holdUBA.dispose);
              uba.value.data.summary = res.summary;
            } else {
              ubp.value.data.rows = res.data;

              let data = [];
              let label = [];
              for (const [key, value] of Object.entries(
                ubp.value.data.rows.holdUBP
              )) {
                label.push(key == "pending" ? "รอดำเนินการ" : "รอทำลาย");
                data.push(parseFloat(value).toFixed(2));
              }
              genChart("holdUBP", data, label);

              ubp.value.data.rows.holdUBP["total"] =
                parseFloat(ubp.value.data.rows.holdUBP.pending) +
                parseFloat(ubp.value.data.rows.holdUBP.dispose);
              ubp.value.data.summary = res.summary;
            }
          } else {
            console.error("Error fetching base:", res.errorMsg);
          }
          return res;
        } catch (error) {
          console.error("Error fetching data:", error);
          return { success: false, errorMsg: error.message };
        } finally {
          base.value.data.form.loading = false;
          uba.value.data.form.loading = true;
          ubp.value.data.form.loading = true;
        }
      },
      success: async () => {
        await fnBase.search("UBA");
        fnBase.search("UBP");
      },
    };

    base.value.search[0].value = moment().format("YYYY-MM-DD");
    fnBase.search("UBA");
    fnBase.search("UBP");

    const exportExcel = () => {
      return window.open(
        `${serviceUrl.value}api/controllers/SAP/Excel/UBA/wh?for=aging_dashboard&total=true&uba=${
          JSON.stringify(uba.value.data.rows)}&ubp=${JSON.stringify(ubp.value.data.rows)}&sumUBA=${
        JSON.stringify(uba.value.data.summary)}&sumUBP=${JSON.stringify(ubp.value.data.summary)}${
          base.value.search[0].value ? `&dateTo=${base.value.search[0].value}` : ""}`
      );
    };

    const baseModal = ref(null);

    return {
      base,
      uba,
      ubp,
      fnBase,
      exportExcel,
      titleZone,
      contentHeight,
      AppLayoutComponent,
      series,
      options,
      clickHandler,
      baseModal,
    };
  },
  watch: {},
};
</script>

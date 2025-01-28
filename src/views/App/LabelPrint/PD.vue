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
      <div class="modal">
        <div
          class="modal-box relative w-full max-w-5xl p-2 lg:p-4 max-h-screen"
        >
          <label
            for="modal-base"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕
          </label>
          <h3 class="text-lg font-bold text-primary">
            เลขที่เอกสาร PD. (SAP) {{ base.form.DocNum }}
          </h3>
          <div class="divider my-1"></div>

          <!-- <div
            class="bg-base-100 border-base-300 rounded-box p-0 lg:p-6 overflow-auto w-full max-h-[60vh]"
          > -->
          <div class="card-body overflow-auto max-h-[80vh] p-2 lg:p-4">
            <!-- <div class="form-control">
              <label class="label">
                <span class="label-text">Access Title</span>
              </label>
              <input
                type="text"
                placeholder="Access Title"
                class="input input-bordered border-base-content"
                v-model="base.form.title"
              />
            </div> -->
            <div class="form-control">
              <div
                class="collapse collapse-plus join-item border border-base-300"
              >
                <input type="checkbox" checked />
                <div
                  class="collapse-title text-xl font-bold text-primary text-left"
                >
                  Production Details:
                </div>
                <div class="collapse-content">
                  <div class="flex flex-col w-full border-opacity-50">
                    <div class="grid place-items-center">
                      <div
                        class="flex flex-nowrap flex-row items-center justify-between w-full"
                      >
                        <div
                          class="flex justify-center flex-col flex-nowrap items-start content-center"
                        >
                          <div>
                            <div class="font-bold text-left">Item Code:</div>
                            <div>
                              {{ base.form.ItemCode }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              Item Description:
                            </div>
                            <div>
                              {{ base.form.ProdName }}
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex justify-center flex-col flex-nowrap items-start content-center"
                        >
                          <div>
                            <div class="font-bold text-left">Lot No.:</div>
                            <div>
                              {{
                                base.form.U_LOT_NO ? base.form.U_LOT_NO : "-"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              Quantity:
                            </div>
                            <div>
                              {{
                                new Intl.NumberFormat("th-TH", {
                                  minimumFractionDigits: 2,
                                }).format(
                                  parseFloat(base.form.PlannedQty).toFixed(2)
                                )
                              }}
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex justify-center flex-col flex-nowrap items-start content-center"
                        >
                          <div>
                            <div class="font-bold text-left">Shelf Lift:</div>
                            <div>
                              {{
                                base.form.U_BOM_SHELFLIFE
                                  ? base.form.U_BOM_SHELFLIFE
                                  : "-"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              Pack Size:
                            </div>
                            <div>-</div>
                          </div>
                        </div>
                        <div
                          class="flex justify-center flex-col flex-nowrap items-start content-center"
                        >
                          <div>
                            <div class="font-bold text-left">MFG. Date:</div>
                            <div>
                              {{
                                base.form.U_PD_START_DATE
                                  ? $moment(
                                      new Date(
                                        base.form.U_PD_START_DATE.date
                                      ).toLocaleString({
                                        timeZone:
                                          base.form.U_PD_START_DATE.timezone,
                                      })
                                    ).format("DD-MM-YYYY")
                                  : "-"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              Expire Date:
                            </div>
                            <div>
                              {{
                                base.form.U_PD_START_DATE
                                  ? $moment(
                                      new Date(
                                        base.form.U_PD_START_DATE.date
                                      ).toLocaleString({
                                        timeZone:
                                          base.form.U_PD_START_DATE.timezone,
                                      })
                                    )
                                      .add(
                                        parseInt(base.form.U_BOM_SHELFLIFE),
                                        "days"
                                      )
                                      .format("DD-MM-YYYY")
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex justify-center flex-col flex-nowrap items-start content-center"
                        >
                          <div>
                            <div class="font-bold text-left">Printed:</div>
                            <div>
                              {{
                                base.form.U_PRINT_STATUS == null
                                  ? "ยังไม่พิมพ์"
                                  : "พิมพ์แล้ว"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              Print Date:
                            </div>
                            <div>
                              {{
                                base.form.U_PRINT_DATE
                                  ? $moment(
                                      new Date(
                                        base.form.U_PRINT_DATE.date
                                      ).toLocaleString({
                                        timeZone:
                                          base.form.U_PRINT_DATE.timezone,
                                      })
                                    ).format("DD-MM-YYYY")
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="divider">
                      <h2 class="card-title text-primary font-bold">
                        Sticker Details:
                      </h2>
                    </div>
                    <div class="grid place-items-center" v-if="detail.form">
                      <div
                        class="flex flex-nowrap flex-row items-center justify-between w-full"
                      >
                        <div
                          class="flex justify-center flex-col flex-nowrap items-start content-center"
                        >
                          <div>
                            <div class="font-bold text-left">Creator:</div>
                            <div class="text-left">
                              {{
                                detail.form.Creator ? detail.form.Creator : "-"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              Item Code:
                            </div>
                            <div class="text-left">
                              {{
                                detail.form.ItemCode
                                  ? detail.form.ItemCode
                                  : "-"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              Item Description:
                            </div>
                            <div class="text-left">
                              {{
                                detail.form.ItemName
                                  ? detail.form.ItemName
                                  : "-"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              Product Name:
                            </div>
                            <div class="text-left text-primary">
                              {{
                                detail.form.ProductName
                                  ? detail.form.ProductName
                                  : "-"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">Updator:</div>
                            <div class="text-left">
                              {{
                                detail.form.Updator ? detail.form.Updator : "-"
                              }}
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex justify-center flex-col flex-nowrap items-start content-center"
                        >
                          <div>
                            <div class="font-bold text-left">
                              Template Name:
                            </div>
                            <div class="text-left">
                              {{
                                detail.form.TemplateName
                                  ? detail.form.TemplateName
                                  : "-"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              Sticker Type:
                            </div>
                            <div class="text-left">
                              {{
                                detail.form.StickerType
                                  ? detail.form.StickerType
                                  : "-"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              Sticker Color:
                            </div>
                            <div class="text-left">
                              {{ detail.form.Color ? detail.form.Color : "-" }}
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex justify-center flex-col flex-nowrap items-start content-center"
                        >
                          <div>
                            <div class="font-bold text-left">Date Create:</div>
                            <div class="text-left">
                              {{
                                detail.form.DateCreate
                                  ? $moment
                                      .tz(
                                        detail.form.DateCreate.date,
                                        detail.form.DateCreate.timezone
                                      )
                                      .format("DD-MM-YYYY")
                                  : "-"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              Paper Size:
                            </div>
                            <div class="text-left">
                              {{
                                `${
                                  detail.form.PaperH && detail.form.PaperW
                                    ? `${detail.form.PaperH}x${detail.form.PaperW} `
                                    : "-"
                                }`
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              Shelf Lift:
                            </div>
                            <div class="text-left">
                              {{
                                detail.form.ShelfLift
                                  ? detail.form.ShelfLift
                                  : "-"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              Drum Format:
                            </div>
                            <div class="text-left">
                              {{
                                detail.form.DrumFormat
                                  ? detail.form.DrumFormat
                                  : "-"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              Date Update:
                            </div>
                            <div class="text-left">
                              {{
                                detail.form.DateUpdate
                                  ? $moment
                                      .tz(
                                        detail.form.DateUpdate.date,
                                        detail.form.DateUpdate.timezone
                                      )
                                      .format("DD-MM-YYYY")
                                  : ""
                              }}
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex justify-center flex-col flex-nowrap items-start content-center"
                        >
                          <div>
                            <div class="font-bold text-left">Pack Size:</div>
                            <div class="text-left">
                              {{
                                detail.form.PackSize
                                  ? detail.form.PackSize
                                  : "-"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              FG Title:
                            </div>
                            <div class="text-left">
                              {{ detail.form.FG ? detail.form.FG : "-" }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              PK Title:
                            </div>
                            <div class="text-left">
                              {{ detail.form.PK ? detail.form.PK : "-" }}
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex justify-center flex-col flex-nowrap items-start content-center"
                        >
                          <div>
                            <div class="font-bold text-left">
                              Package Weight:
                            </div>
                            <div class="text-left">
                              {{
                                detail.form.PackWeight
                                  ? detail.form.PackWeight
                                  : "-"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              FG Format:
                            </div>
                            <div class="text-left">
                              {{
                                detail.form.FGFormat
                                  ? detail.form.FGFormat
                                  : "-"
                              }}
                            </div>
                          </div>
                          <div>
                            <div class="font-bold text-left mt-4">
                              FG Format:
                            </div>
                            <div class="text-left">
                              {{
                                detail.form.PKFormat
                                  ? detail.form.PKFormat
                                  : "-"
                              }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-control">
              <div
                class="collapse collapse-plus join-item border border-base-300"
              >
                <input type="checkbox" checked />
                <div
                  class="collapse-title text-xl font-bold text-primary text-left"
                >
                  Select Label Data:
                </div>
                <div class="collapse-content overflow-auto">
                  <!-- <div class="overflow-auto w-full"> -->
                  <table class="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                      <tr>
                        <th>Label Data</th>
                        <td>Sticker Template</td>
                        <td>Item Code</td>
                        <td>Description</td>
                        <td>Product Name</td>
                        <td>Pack Size</td>
                        <td>Pack Weight</td>
                        <td>Gross Weight</td>
                        <!-- <th class="text-right">
                     
                        </th> -->
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(v, i) in detail.rows"
                        :key="i"
                        :class="`${
                          detail.current
                            ? detail.current == v.DataDocNum
                              ? 'bg-primary bg-opacity-50 '
                              : ''
                            : ''
                        }`"
                        class="hover cursor-pointer"
                        @click="detail_edit(`${v.DataDocNum}`)"
                      >
                        <th
                          :class="` ${
                            detail.current
                              ? detail.current == v.DataDocNum
                                ? 'bg-primary bg-opacity-50 text-white'
                                : ''
                              : ''
                          }`"
                        >
                          {{ v.DataDocNum ? v.DataDocNum : "-" }}
                        </th>
                        <td>{{ v.Template ? v.Template : "-" }}</td>
                        <td>{{ v.ItemCode ? v.ItemCode : "-" }}</td>
                        <td>{{ v.ItemName ? v.ItemName : "-" }}</td>
                        <td>{{ v.ProductName ? v.ProductName : "-" }}</td>
                        <td>{{ v.PackSize ? v.PackSize : 0 }}</td>
                        <td>{{ v.PackWeight ? v.PackWeight : 0 }}</td>
                        <td>{{ v.GrossWeight ? v.GrossWeight : 0 }}</td>
                        <!-- <th>  <label
                            class="btn btn-link text-primary no-underline modal-button btn-xs"
                            @click="base_edit(`${v.code}`, `${i}`)"
                            >Details
                          </label></th> -->
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- </div> -->
              </div>
            </div>

            <div class="form-control">
              <div
                class="collapse collapse-plus join-item border border-base-300"
              >
                <input type="checkbox" checked />
                <div
                  class="collapse-title text-xl font-bold text-primary text-left"
                >
                  Printing:
                </div>
                <div class="collapse-content" v-if="detail.form">
                  <div class="flex w-full">
                    <div class="grid flex-grow place-content-start">
                      <div class="text-md font-bold text-left">Preview:</div>
                      <!-- <PDFViewer
              :source="'https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf'"
              :class="`h-auto w-full`"
              :controls="[

'print',
'zoom',
]"
           
            />  -->
                      <!-- <PDFViewer
              :source="'https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf'"
              :class="`h-[70vh] w-full`"
           
            />  -->
                      <!-- <span v-for="(v, i) in detail.form">{{ i }}</span> -->
                      <div
                        class="relative border-[1px] shadow"
                        id="stickerPreview"
                        style="
                          background-repeat: no-repeat;
                          background-size: 100% 100%;
                          width: 400.05px;
                          height: 566.338px;
                        "
                        :style="`background-image: url('http://192.168.10.17/label-printing-api/sticker/files/${detail.form.Files}')`"
                      >
                        <!-- {{ detail.form.items['rows'][i].PositionX }} -->
                        <!-- <div v-for="(v, i) in detail.form"> -->

                        <div
                          v-if="detail.form.items"
                          v-for="(v2, i2, DrumCount = 0, FGCount = 0) in detail
                            .form.items['rows']"
                          class="absolute"
                          :style="{
                            left: `${v2.PositionX / 2}mm`,
                            top: `${v2.PositionY / 2}mm`,
                            fontSize: `${v2.FontSize / 2}px`,
                            fontStyle: `${v2.FontStyle}`,
                            fontWeight: `${v2.FontWeight / 2}`,
                          }"
                        >
                          <span v-if="v2.FieldName == 'DrumFormat'">{{
                            detail.form[v2.FieldName] == "x"
                              ? DrumCount++
                              : detail.form[v2.FieldName] == "x/y"
                              ? `${DrumCount + 1}/${Unit}`
                              : detail.form[v2.FieldName] == "xx/yy"
                              ? `${
                                  DrumCount + 1 >= 10
                                    ? DrumCount + 1
                                    : "0" + DrumCount + 1
                                }/${Unit.length >= 2 ? Unit : "0" + Unit}`
                              : "-"
                          }}</span>

                          <span v-else-if="v2.FieldName == 'PackSize'">{{
                            detail.form[v2.FieldName]
                          }}</span>

                          <span v-else-if="v2.FieldName == 'GrossWeight'">{{
                            detail.form[v2.FieldName]
                          }}</span>

                          
<span v-else-if="v2.FieldName == 'U_LOT_NO'">{{
                            base.form[v2.FieldName]
                          }}</span>

                          <span v-else-if="v2.FieldName == 'BarCode'">
                            <vue-barcode
                              :value="detail.form[v2.FieldName]"
                              :options="{
                                displayValue: false,
                                width: 50,
                                height: 50,
                              }"
                              tag="img"
                            />
                            <!-- {{


                            detail.form[v2.FieldName]
                          }} -->
                          </span>

                          <span v-else-if="v2.FieldName == 'QrCode'">
                            <VueQRCodeComponent
                              :text="getQRData"
                              :size="50"
                              class="mt-2"
                            />

                            <!-- {{
                            detail.form[v2.FieldName]
                          }} -->
                          </span>

                          <span
                            v-else-if="
                              v2.FieldName != 'DrumFormat' &&
                              v2.FieldName != 'PackSize' &&
                              v2.FieldName != 'GrossWeight'
                            "
                          >
                            {{
                              v2.FieldName == "FG" || v2.FieldName == "PK"
                                ? detail.form[`${v2.FieldName}Format`] == "x"
                                  ? DrumCount++
                                  : detail.form[`${v2.FieldName}Format`] ==
                                    "x/y"
                                  ? `${DrumCount + 1}/${Unit}`
                                  : detail.form[`${v2.FieldName}Format`] ==
                                    "xx/yy"
                                  ? `${
                                      DrumCount + 1 >= 10
                                        ? DrumCount + 1
                                        : "0" + DrumCount + 1
                                    }/${Unit.length >= 2 ? Unit : "0" + Unit}`
                                  : "-"
                                : detail.form[v2.FieldName]
                            }}</span
                          >

                          <span
                            v-else
                          >
                           dasdas {{
                            detail.form[v2.FieldName]
                            }}</span
                          >

                          <!-- <div
                          v-if="base.form"
                          v-for="(v, i, index = 0) in base.form"
                          class="absolute"
                          :style="{
                            left: `${v2.PositionX / 2}mm`,
                            top: `${v2.PositionY / 2}mm`,
                            fontSize: `${v2.FontSize / 2}px`,
                            fontStyle: `${v2.FontStyle}`,
                            fontWeight: `${v2.FontWeight / 2}`,
                          }"
                        > -->
                          <!-- {{ v2.FieldName }} -->
                          <span
                            v-if="
                              v2.FieldName == 'U_PD_START_DATE' ||
                              v2.FieldName == 'ExpireDate'
                            "
                          >
                            {{
                              v2.FieldName == "U_PD_START_DATE"
                                ? base.form[v2.FieldName]
                                  ? $moment
                                      .tz(
                                        base.form[v2.FieldName].date,
                                        base.form[v2.FieldName].timezone
                                      )
                                      .format("DD-MM-YYYY")
                                  : "-"
                                : base.form["U_PD_START_DATE"]
                                ? $moment
                                    .tz(
                                      base.form["U_PD_START_DATE"].date,
                                      base.form["U_PD_START_DATE"].timezone
                                    )
                                    .add(
                                      parseInt(base.form.U_BOM_SHELFLIFE),
                                      "days"
                                    )
                                    .format("DD-MM-YYYY")
                                : "-"
                            }}
                            <!-- {{
                              v2.FieldName == "U_PD_START_DATE"
                                ? base.form[v2.FieldName]
                                  ? $moment(
                                      new Date(
                                        base.form[v2.FieldName].date
                                      ).toLocaleString({
                                        timeZone:
                                          base.form[v2.FieldName].timezone,
                                      })
                                    ).format("DD-MM-YYYY")
                                  : "-"
                                : base.form["U_PD_START_DATE"]
                                ? $moment(
                                    new Date(
                                      base.form["U_PD_START_DATE"].date
                                    ).toLocaleString({
                                      timeZone:
                                        base.form["U_PD_START_DATE"].timezone,
                                    })
                                  )
                                    .add(
                                      parseInt(base.form.U_BOM_SHELFLIFE),
                                      "days"
                                    )
                                    .format("DD-MM-YYYY")
                                : "-"
                            }} -->
                          </span>
                          <!-- </div> -->
                        </div>

                        <!-- <div
                        v-if="detail.form.items[detail.form.items.findIndex(vv=>vv.FieldName == 'MFG.DATE')]"
                          class="absolute"
                          :style="{
                            left: `${detail.form.items[detail.form.items.findIndex(vv=>vv.FieldName == 'MFG.DATE')].PositionX / 2}mm`,
                            top: `${detail.form.items[detail.form.items.findIndex(vv=>vv.FieldName == 'MFG.DATE')].PositionY / 2}mm`,
                            fontSize: `${detail.form.items[detail.form.items.findIndex(vv=>vv.FieldName == 'MFG.DATE')].FontSize / 2}px`,
                            fontStyle: `${detail.form.items[detail.form.items.findIndex(vv=>vv.FieldName == 'MFG.DATE')].FontStyle}`,
                            fontWeight: `${detail.form.items[detail.form.items.findIndex(vv=>vv.FieldName == 'MFG.DATE')].FontWeight / 2}`,
                          }"
                        >
                          {{ detail.form.items[detail.form.items.findIndex(vv=>vv.FieldName == 'MFG.DATE')].FieldName }}
              
                        </div>
                        <div
                        v-if="detail.form.items[detail.form.items.findIndex(vv=>vv.FieldName == 'EXP.DATE')]"
                          class="absolute"
                          :style="{
                            left: `${detail.form.items[detail.form.items.findIndex(vv=>vv.FieldName == 'EXP.DATE')].PositionX / 2}mm`,
                            top: `${detail.form.items[detail.form.items.findIndex(vv=>vv.FieldName == 'EXP.DATE')].PositionY / 2}mm`,
                            fontSize: `${detail.form.items[detail.form.items.findIndex(vv=>vv.FieldName == 'EXP.DATE')].FontSize / 2}px`,
                            fontStyle: `${detail.form.items[detail.form.items.findIndex(vv=>vv.FieldName == 'EXP.DATE')].FontStyle}`,
                            fontWeight: `${detail.form.items[detail.form.items.findIndex(vv=>vv.FieldName == 'EXP.DATE')].FontWeight / 2}`,
                          }"
                        >
                          {{ detail.form.items[detail.form.items.findIndex(vv=>vv.FieldName == 'EXP.DATE')].FieldName }}
              
                        </div> -->
                        <!-- <div
                          class="absolute"
                          style="
                            left: 15mm;
                            top: 32.5mm;
                            font-size: 20px;
                            font-style: NaN;
                            font-weight: 325;
                          "
                        >
                          {{ detail.form.label3 }}
                        </div>
                        <div
                          class="absolute"
                          style="
                            left: 26mm;
                            top: 39.5mm;
                            font-size: 20px;
                            font-style: NaN;
                            font-weight: 350;
                          "
                        >
                          {{ detail.form.label4 }}
                        </div>
                        <div
                          class="absolute"
                          style="
                            left: 23mm;
                            top: 50mm;
                            font-size: 15px;
                            font-style: NaN;
                            font-weight: 325;
                          "
                        >
                          {{ detail.form.ProductName }}
                        </div>
                        <div
                          class="absolute"
                          style="
                            left: 55mm;
                            top: 50.5mm;
                            font-size: 13.5px;
                            font-style: NaN;
                            font-weight: 325;
                          "
                        >
                          {{ detail.form.PackSize }}
                        </div>
                        <div
                          class="absolute"
                          style="
                            left: 77mm;
                            top: 60mm;
                            font-size: 12.5px;
                            font-style: NaN;
                            font-weight: 325;
                          "
                        >
                          {{
                            base.form.U_PD_START_DATE
                              ? $moment(
                                  new Date(
                                    base.form.U_PD_START_DATE.date
                                  ).toLocaleString({
                                    timeZone:
                                      base.form.U_PD_START_DATE.timezone,
                                  })
                                ).format("DD-MM-YYYY")
                              : "-"
                          }}
                        </div>
                        <div
                          class="absolute"
                          style="
                            left: 77.5mm;
                            top: 66.5mm;
                            font-size: 12.5px;
                            font-style: NaN;
                            font-weight: 325;
                          "
                        >
                          {{
                            base.form.U_PD_START_DATE
                              ? $moment(
                                  new Date(
                                    base.form.U_PD_START_DATE.date
                                  ).toLocaleString({
                                    timeZone:
                                      base.form.U_PD_START_DATE.timezone,
                                  })
                                )
                                  .add(
                                    parseInt(base.form.U_BOM_SHELFLIFE),
                                    "days"
                                  )
                                  .format("DD-MM-YYYY")
                              : "-"
                          }}
                        </div>
                        <div
                          class="absolute"
                          style="
                            left: 25mm;
                            top: 87.5mm;
                            font-size: 32.5px;
                            font-style: NaN;
                            font-weight: 375;
                          "
                        >
                          {{ detail.form.ProductName }}
                        </div>
                        <div
                          class="absolute"
                          style="
                            left: 15mm;
                            top: 99.5mm;
                            font-size: 20px;
                            font-style: NaN;
                            font-weight: 325;
                          "
                        >
                          {{ detail.form.label3 }}
                        </div>
                        <div
                          class="absolute"
                          style="
                            left: 26mm;
                            top: 106mm;
                            font-size: 20px;
                            font-style: NaN;
                            font-weight: 350;
                          "
                        >
                          {{ detail.form.label4 }}
                        </div>
                        <div
                          class="absolute"
                          style="
                            left: 22.5mm;
                            top: 117mm;
                            font-size: 15px;
                            font-style: NaN;
                            font-weight: 325;
                          "
                        >
                          {{ detail.form.ProductName }}
                        </div>
                        <div
                          class="absolute"
                          style="
                            left: 55mm;
                            top: 118mm;
                            font-size: 13.5px;
                            font-style: NaN;
                            font-weight: 325;
                          "
                        >
                          {{ detail.form.PackSize }}
                        </div>
                        <div
                          class="absolute"
                          style="
                            left: 77.5mm;
                            top: 127mm;
                            font-size: 12.5px;
                            font-style: NaN;
                            font-weight: 325;
                          "
                        >
                          {{
                            base.form.U_PD_START_DATE
                              ? $moment(
                                  new Date(
                                    base.form.U_PD_START_DATE.date
                                  ).toLocaleString({
                                    timeZone:
                                      base.form.U_PD_START_DATE.timezone,
                                  })
                                ).format("DD-MM-YYYY")
                              : "-"
                          }}
                        </div>
                        <div
                          class="absolute"
                          style="
                            left: 77.5mm;
                            top: 135mm;
                            font-size: 12.5px;
                            font-style: NaN;
                            font-weight: 325;
                          "
                        >
                          {{
                            base.form.U_PD_START_DATE
                              ? $moment(
                                  new Date(
                                    base.form.U_PD_START_DATE.date
                                  ).toLocaleString({
                                    timeZone:
                                      base.form.U_PD_START_DATE.timezone,
                                  })
                                )
                                  .add(
                                    parseInt(base.form.U_BOM_SHELFLIFE),
                                    "days"
                                  )
                                  .format("DD-MM-YYYY")
                              : "-"
                          }}
                        </div> -->
                      </div>
                    </div>

                    <div
                      class="grid flex-grow place-content-end place-items-center items-start content-between"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="form-control">
                <div
                  class="collapse collapse-arrow bg-primary text-white min-h-[auto]"
                >
                  <input type="checkbox" class="min-h-[auto]" />
                  <div
                    class="collapse-title text-sm font-medium min-h-[auto] p-4"
                    style="width: inherit"
                  >
                    Guide
                  </div>
                  <div
                    class="collapse-content bg-base-100 text-black w-full overflow-auto"
                  >
                    <div class="overflow-x-auto">
                      <table
                        class="table table-xs table-pin-rows table-pin-cols"
                      >
                        <tbody>
                          <tr>
                            <th>None</th>
                            <td>
                              <div class="badge">No permission</div>
                            </td>
                          </tr>
                          <tr>
                            <th>User</th>
                            <td>
                              <div class="badge">Read</div>
                            </td>
                          </tr>
                          <tr>
                            <th>Super User</th>
                            <td>
                              <div class="badge">Read</div>
                              <div class="badge">Request</div>
                            </td>
                          </tr>
                          <tr>
                            <th>Admin</th>
                            <td>
                              <div class="badge">Read</div>
                              <div class="badge">Request</div>
                              <div class="badge">Approve</div>
                            </td>
                          </tr>
                          <tr>
                            <th>Super Admin</th>
                            <td>
                              <div class="badge">Read</div>
                              <div class="badge">Request</div>
                              <div class="badge">Approve</div>
                              <div class="badge">Spacial</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div> -->
          </div>
          <!-- <div class="divider">Menu List</div>
            <ul class="menu px-4 py-0">
              <AppModuleMenu_
                v-if="base.modal"
                :menutype="'Access'"
                :access="base.form.access"
                @object_access="
                  (obj) => {
                    base.form.access = obj;
                  }
                "
                :color="[`text-blue-600`, `text-blue-600`]"
                :icon="`icon-park-outline:list-one`"
              />
            </ul> -->
          <div class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex">
            <div class="flex-1 form-control mt-6">
              <label for="modal-base" class="btn btn-danger">Cancel</label>
            </div>
            <div class="flex-1 form-control mt-6" @click="base_save()">
              <button class="btn btn-primary text-white">Confirm</button>
            </div>
            <!-- </div> -->
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
          <h3 class="text-lg font-bold text-left mt-4 text-error">
            REMOVE ITEM
          </h3>
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
    </template>
    <template #view>
      <div class="grid grid-cols-1 gap-6">
        <div class="card shadow-lg bg-base-100">
          <div class="card-body overflow-auto p-2 lg:p-4">
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
                <div class="join w-full justify-center md:justify-end">
                  <button
                    class="join-item btn btn-sm disabled:border-base-content disabled:bg-transparent disabled:text-base-content"
                    disabled
                  >
                    สาขา
                  </button>
                  <select
                    class="join-item select select-sm select-bordered border-base-content w-auto max-w-xs"
                    v-model="wh"
                  >
                    <!-- <option selected value="">ALL</option> -->
                    <option value="UBA">UBA</option>
                    <option value="UBP">UBP</option>
                  </select>
                  <select
                    class="join-item select select-sm select-bordered border-base-content w-auto max-w-xs"
                    v-model="printActive"
                  >
                    <!-- <option selected value="">ALL</option> -->
                    <option value="">ทั้งหมด</option>
                    <option value="Y">พิมพ์แล้ว</option>
                    <option value="N">ยังไม่พิมพ์</option>
                  </select>

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
                    class="join-item btn-sm btn btn-primary text-white modal-button"
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
                        <th>Doc Entry</th>
                        <td class="text-center">Doc Number</td>
                        <td class="text-center">Print Status</td>
                        <td class="text-center">Print Date</td>
                        <td>Item Code</td>
                        <td>Item Description</td>
                        <td>Name to Customer</td>
                        <td>Lot Number</td>
                        <td class="text-end">Net (KG.)</td>
                        <td>Shelf Life</td>
                        <td>MFG. Date</td>
                        <td>Exp. Date</td>
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
                          {{ v.DocEntry }}
                        </th>
                        <td>
                          {{ v.DocNum }}
                        </td>
                        <td class="text-center">
                          {{
                            v.U_PRINT_STATUS == null
                              ? "ยังไม่พิมพ์"
                              : "พิมพ์แล้ว"
                          }}
                        </td>
                        <td class="text-center">
                          <!-- {{ v.U_PRINT_DATE }} -->
                          <!-- {{v.U_PRINT_DATE.timezone}} -->
                          {{
                            v.U_PRINT_DATE
                              ? $moment
                                  .tz(
                                    v.U_PRINT_DATE.date,
                                    v.U_PRINT_DATE.timezone
                                  )
                                  .format("DD-MM-YYYY")
                              : ""
                          }}
                          <!-- <br/> -->
                          <!-- {{ v.U_PRINT_DATE
                              ?$moment.tz(v.U_PRINT_DATE.date,v.U_PRINT_DATE.timezone).format(" HH:mm:ss") : "" }} -->
                          <!-- {{
                            v.U_PRINT_DATE
                              ? $moment(
                                  new Date(v.U_PRINT_DATE.date).toLocaleString({
                                    timeZone: v.U_PRINT_DATE.timezone,
                                  })
                                ).format("DD-MM-YYYY")
                              : ""
                          }} -->
                        </td>
                        <td>
                          {{ v.ItemCode }}
                        </td>
                        <td>
                          {{ v.ProdName }}
                        </td>
                        <td>-</td>
                        <td>
                          {{ v.U_LOT_NO == null ? "-" : v.U_LOT_NO }}
                        </td>
                        <td class="text-right">
                          {{
                            new Intl.NumberFormat("th-TH", {
                              minimumFractionDigits: 2,
                            }).format(parseFloat(v.PlannedQty).toFixed(2))
                          }}
                        </td>
                        <td>
                          {{
                            v.U_BOM_SHELFLIFE == null ? "" : v.U_BOM_SHELFLIFE
                          }}
                        </td>
                        <td>
                          {{
                            v.U_PD_START_DATE
                              ? $moment
                                  .tz(
                                    v.U_PD_START_DATE.date,
                                    v.U_PD_START_DATE.timezone
                                  )

                                  .format("DD-MM-YYYY")
                              : "dd"
                          }}
                        </td>

                        <td>
                          {{
                            v.U_PD_START_DATE
                              ? $moment
                                  .tz(
                                    v.U_PD_START_DATE.date,
                                    v.U_PD_START_DATE.timezone
                                  )
                                  .add(parseInt(v.U_BOM_SHELFLIFE), "days")
                                  .format("DD-MM-YYYY")
                              : ""
                          }}
                        </td>
                        <!--     
      tr +=
        "  <td>" +
        (data[i].U_PD_START_DATE == null
          ? ""
          : $.dmy(
              $.passDate(data[i].U_PD_START_DATE, data[i].U_BOM_SHELFLIFE)
            )) +
        "</td>"; -->

                        <!-- <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="text-sm">{{ v.title }}</div>
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
                        </td> -->
                        <th class="text-right">
                          <label
                            for="modal-base"
                            class="btn btn-link text-primary no-underline modal-button btn-xs"
                            @click="base_edit(`${v.code}`, `${i}`)"
                            >Details
                          </label>
                          <!-- <label
                            for="modal-base"
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
                                'controllers/MYSQL/INTERNAL/System/access'
                              )
                            "
                            >remove
                          </label> -->
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
// import AppModuleMenu_ from "@/components/App/Module/Menu/_.vue";
import AppModuleGlobalLoadingText from "@/components/App/Module/Global/LoadingText.vue";
import AppModuleGlobalEmptyData from "@/components/App/Module/Global/EmptyData.vue";
import Query from "@/assets/js/fetch.js";
import PDFViewer from "pdf-viewer-vue";
import VueQRCodeComponent from "vue-qrcode-component";
import VueBarcode from "@chenfengyuan/vue-barcode";
export default {
  name: "Department",
  components: {
    AppLayout,
    AppModuleGlobalPageination,
    AppModuleGlobalSearch,
    // AppModuleMenu_,
    AppModuleGlobalLoadingText,
    AppModuleGlobalEmptyData,
    PDFViewer,
    VueQRCodeComponent,
    VueBarcode,
  },
  data() {
    return {
      wh: "",
      printActive: "",
      product_order: {
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
    getQRData() {
      let data = this.detail.form;
      let QrCodeData = [];
      QrCodeData.push(`${data.ProductName}`);
      const qrKey = data.QrCode.split(",");
      qrKey.forEach((v, i) => {
        let d = "";
        console.error(this.base.form[v]);
        switch (v) {
          case "U_LOT_NO":
            d = `${this.base.form[v] ? this.base.form[v] : "-"}`;
            break;
          case "U_PD_START_DATE":
            d = `${
              this.base.form[v]
                ? this.$moment
                    .tz(this.base.form[v].date, this.base.form[v].timezone)
                    .format("DD-MM-YYYY")
                : "-"
            }`;
            break;
          case "ExpireDate":
            d = `${
              this.base.form[v]
                ? this.$moment
                    .tz(this.base.form[v].date, this.base.form[v].timezone)
                    .add(parseInt(this.base.form.U_BOM_SHELFLIFE), "days")
                    .format("DD-MM-YYYY")
                : "-"
            }`;
            break;
        }
        QrCodeData.push(`${d}`);
      });
      console.error(QrCodeData);
      return QrCodeData.join(",");
    },
  },
  methods: {
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
        `${this.serviceUrl}api/controllers/SAP/${
          this.wh
        }/LabelPrint/pd?total=1&page=${this.base.page}${
          this.base.row ? `&rows=${this.base.row}` : ""
        }${this.base.q ? `&q=${this.base.q}` : ""}${
          this.printActive ? `&printActive=${this.printActive}` : ""
        }`,
        (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            // res.rows.forEach((v, i) => {
            //   res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            //   res.rows[i].master = 0;
            // });
          }
          callback({ ...res });
        }
      );
    },
    base_create() {
      this.base.current = 0;
      this.base.form = {
        title: "",
        description: "",
      };
      this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.detail.form = null;
      this.detail.current = 0;
      this.base.form = { ...this.base.rows[index] };
      this.base.current = code;
      this.base.form.newStatus = this.base.form.status;
      this.detail.rows = [];
      this.base.controll = "edit";
      this.detail_search();
      this.refresh = true;
    },
    base_save() {
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
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/System/access`,
        obj,
        (res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            this.base.modal = false;
            this.base.page = 1;
            this.base_search();
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

        console.log(this.detail.rows);
      });
    },
    detail_get(callback) {
      new Query("base", "get").get(
        this,
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/LabelPrint/label?total=1&page=${
          this.detail.page
        }${this.detail.row ? `&rows=${this.detail.row}` : ""}${
          this.detail.q ? `&q=${this.detail.q}` : ""
        }&allLabelData=1&ItemCode=${this.base.form.ItemCode}`,
        (res) => {
          // if (res.success) {
          //   res.rows.forEach((v, i) => {
          //     res.rows[i].image = v.image ? JSON.parse(v.image) : [];
          //     res.rows[i].master = 0;
          //   });
          // }
          callback({ ...res });
        }
      );
    },
    detail_create() {
      // console.log("detail_create");
      // this.clearimage();
      this.detail.current = 0;
      // console.log("callback");
      // this.detail.rows = [];
      this.detail.form = {
        code: "",
        // title: "",
        // price: "",
        // image: [],
        // imageLink: "",
        // color: "",
        // color_code: "",
        // link: "",
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
        (v) => v.DataDocNum == this.detail.current
      );
      // this.detail.rows[index] = { ...this.detail.form };
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
      // console.log(this.base.current);
      // console.log(this.detail.controll);
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
          ...this.detail.form,
        };
        obj["doc"] = this.base.current;
        console.log(obj);
        if (this.detail.controll == "edit") {
          obj["code"] = this.detail.form.code;
        }

        new Query(
          "detail",
          this.detail.controll == "create" ? "POST" : "PUT"
        ).set(
          this,
          `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/QA/Indirect/request_item`,
          obj,
          (res) => {
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
          }
        );
      }
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
      fetch(`${this.serviceUrl}api/${this.remove.tb}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({ rows: [{ code: this.remove.code }] }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            this.remove.modal = false;
            this[`${this.remove.controll}_search`]();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.user) {
        this.wh = this.user.branchTitle;
        this.base_search();
      }
    });
  },
  watch: {
    user: function (v) {
      this.$nextTick(() => {
        if (v && !this.wh) {
          console.log(v);
          this.wh = this.user.branchTitle;
          v ? this.base_search() : "";
        }
      });
    },
    wh: function (v) {
      this.base.page = 1;
      this.base_search();
    },
    printActive: function (v) {
      this.base.page = 1;
      this.base_search();
    },
  },
};
</script>
<style scoped>
/* Guide */
.collapse-arrow > .collapse-title:after {
  top: 1.7rem;
}
.pdf-viewer__body {
  display: none;
}
</style>

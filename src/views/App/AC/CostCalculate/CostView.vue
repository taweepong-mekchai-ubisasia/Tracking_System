
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
          <div class="modal-box relative w-6/12 max-w-xl">
            <label
              for="modal-base"
              class="btn btn-sm btn-circle absolute right-2 top-2"
              >✕
            </label>
            <h3 class="text-lg font-bold">Request Item</h3>
            <div class="card">
              <div class="card-body">
                <div class="form-control">
                  <label class="label"
                    ><span class="label-text">Short code</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Short code"
                    class="input input-bordered border-base-content input-disabled"
                    required=""
                    v-model="base.form.item_short_code"
                    disabled
                  />
                </div>
                <div class="form-control">
                  <label class="label"
                    ><span class="label-text">Item Description</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Short code"
                    class="input input-bordered border-base-content input-disabled"
                    required=""
                    v-model="base.form.item_short_code"
                    disabled
                  />
                </div>
                <div class="form-control">
                  <label class="label"
                    ><span class="label-text">Item Code</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Item Code"
                    class="input input-bordered border-base-content"
                    required=""
                    v-model="base.form.item_code"
                    disabled
                  />
                </div>
                <div class="grid grid-cols-2 w-full gap-4">
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Qty</span>
                      </label>
                      <input
                        type="number"
                        placeholder="Qty"
                        class="input input-bordered border-base-content"
                        required=""
                        min="1"
                        max="5"
                        v-model="base.form.unit"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="flex-1 w-auto">
                    <div class="form-control">
                      <label class="label"
                        ><span class="label-text">Unit</span></label
                      >
                      <input
                        type="text"
                        placeholder="Unit"
                        class="input input-bordered border-base-content w-full input-disabled"
                        required=""
                        v-model="base.form.uom"
                        readonly
                      />
                    </div>
                  </div>
                </div>
                <div class="form-control">
                  <label class="label"
                    ><span class="label-text">Status</span>
                  </label>
                  <label class="form-control w-full">
                    <select
                      class="select select-bordered border-base-content"
                      v-model="base.form.newStatus"
                    >
                      <option selected disabled value="">Select Option</option>
                      <option value="pending" disabled>Request</option>
                      <option
                        value="approve"
                        :disabled="base.form.status == 'pending' ? false : true"
                      >
                        Approve
                      </option>
                      <option
                        value="reject"
                        :disabled="base.form.status == 'pending' ? false : true"
                      >
                        Reject
                      </option>
                      <option
                        value="cancel"
                        :disabled="
                          base.form.status == 'approve' ||
                          base.form.status == 'reject'
                            ? false
                            : true
                        "
                      >
                        Cancel
                      </option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <div
              class="backdrop-blur sticky top-0 items-center gap-2 px-4 flex my-4"
            >
              <div class="flex-1 form-control">
                <label for="modal-base" class="btn btn-danger">Cancel</label>
              </div>
              <div
                class="flex-1 form-control"
                :class="base.form.newStatus != base.form.status ? '' : 'hidden'"
              >
                <button class="btn btn-primary text-white" @click="base_save()">
                  Confirm
                </button>
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
      </template>
      <template #view>
        <div class="grid grid-cols-1 gap-6 lg:px-10 lg:py-2">
          <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
            <div class="card-body overflow-auto">
              <div
                class="contents lg:inline-flex lg:join my-5 w-full md:justify-center lg:justify-end"
              >
                <div class="contents sm:join md:join lg:join xl:join">
                  <div class="join join-item">
                    <button
                      class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      วันที่
                    </button>
                    <input
                      type="date"
                      placeholder="title"
                      class="join-item input input-sm input-bordered border-base-content"
                      v-model="date.from"
                      @change="change"
                    />
                    <button
                      class="join-item btn btn-sm disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content"
                      disabled
                    >
                      -
                    </button>

                    <input
                      type="date"
                      placeholder="title"
                      class="join-item input input-sm input-bordered border-base-content"
                      v-model="date.to"
                      @change="change"
                    />
                  </div>

                  <!-- <button
                  class="join-item btn btn-sm btn-primary  border-r-white"
                  @click="exportExcel()"
                >
                  <Icon
                    icon="mdi:file-excel-outline"
                    class="h-5 w-5 text-white"
                  />
                </button> -->
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
                </div>
                <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white mr-1"
                  @click="exportExcel()"
                >
                  <Icon
                    icon="mdi:file-excel-outline"
                    class="h-5 w-5 text-white"
                /></label>

                <label
                  for="modal-base"
                  class="join-item btn-sm btn btn-primary modal-button text-white"
                  @click="base_create()"
                  >Create</label
                >
              </div>
              <div class="overflow-x-auto w-full max-h-[67.5vh]">
                <div class="overflow-x-auto">
                  <table class="table table-xs">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>company</th>
                        <th>location</th>
                        <th>Last Login</th>
                        <th>Favorite Color</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Littel, Schaden and Vandervort</td>
                        <td>Canada</td>
                        <td>12/16/2020</td>
                        <td><a href="#" @click="check = !check">Blue</a></td>
                      </tr>
                      <tr v-if="check">
                        <td colspan="7">
                          <div
                            class="p-3 border rounded bg-input"
                            style="width: 100%; overflow: auto"
                          >
                            <div class="row">
                              <div class="col-6 h5">
                                <span class="fw-bold">ITEM CODE:</span>
                                <span class="text-primary">FGBSCCC-B-170</span>
                              </div>
                              <div class="col-3">
                                <span>Export File: </span
                                ><span
                                  class="btnExportExcel text-success pointer"
                                  ><i
                                    class="bi bi-file-earmark-spreadsheet"
                                    style="font-size: 20px"
                                  ></i
                                ></span>
                              </div>
                              <div class="col-3 text-end">
                                <span
                                  class="btnRemoveCalArea text-danger pointer"
                                  ><i
                                    class="bi bi-x-circle"
                                    style="font-size: 20px"
                                  ></i
                                ></span>
                              </div>
                              <i class="text-secondary"
                                >หากในรายการ Item มี FG หรือ SEMI ระบบจะไม่นำเอา
                                Packaging ใน FG หรือ SEMI นั้น มาคำนวณรวมด้วย</i
                              >
                              <div class="col-12 pt-3" id="calingArea">
                                <!-- <div class="table-responsive"> -->
                                <!-- <div class="overflow-x-auto"> -->
                                <table class="table table-xs">
                                  <thead class="bg-primary text-light">
                                    <tr>
                                      <th>No.</th>
                                      <th>Item Code</th>
                                      <th>Decription</th>
                                      <th class="text-end">Quantity</th>
                                      <th>Unit</th>
                                      <th class="text-end">Price/Unit (บาท)</th>
                                      <th class="text-end">AVG.(บาท)</th>
                                      <th class="text-end">Diff.(บาท)</th>
                                      <th class="text-end">Amount(บาท)</th>
                                      <th class="text-center">
                                        Date of Purchase
                                      </th>
                                      <th>Supplier Name</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr class="align-middle" id="0">
                                      <td>
                                        <i
                                          class="bi bi-x-circle text-danger pointer btnDelRow"
                                        ></i>
                                        1
                                      </td>
                                      <td>RSVBUCE</td>
                                      <td>BUCE</td>
                                      <td class="text-end">
                                        <span style="display: none">67.75</span
                                        ><input
                                          type="number"
                                          class="form-control form-control-sm cal"
                                          name="qty"
                                          value="67.75"
                                          style="width: 100px"
                                        />
                                      </td>
                                      <td>Kg.</td>
                                      <td class="text-end">
                                        <span style="display: none">51.50</span
                                        ><input
                                          type="number"
                                          class="form-control form-control-sm cal"
                                          name="price"
                                          value="51.50"
                                          style="width: 100px"
                                        />
                                      </td>
                                      <td class="text-end">48.73</td>
                                      <td class="text-end">2.77</td>
                                      <td class="text-end">3,489.13</td>
                                      <td class="text-center">29-02-2024</td>
                                      <td>บริษัท เอซ โกลบอล เคม จำกัด</td>
                                    </tr>
                                    <tr class="align-middle" id="1">
                                      <td>
                                        <i
                                          class="bi bi-x-circle text-danger pointer btnDelRow"
                                        ></i>
                                        2
                                      </td>
                                      <td>RSVDIXYL</td>
                                      <td>DIXYL</td>
                                      <td class="text-end">
                                        <span style="display: none">32.25</span
                                        ><input
                                          type="number"
                                          class="form-control form-control-sm cal"
                                          name="qty"
                                          value="32.25"
                                          style="width: 100px"
                                        />
                                      </td>
                                      <td>Kg.</td>
                                      <td class="text-end">
                                        <span style="display: none">35.50</span
                                        ><input
                                          type="number"
                                          class="form-control form-control-sm cal"
                                          name="price"
                                          value="35.50"
                                          style="width: 100px"
                                        />
                                      </td>
                                      <td class="text-end">35.56</td>
                                      <td class="text-end">-0.06</td>
                                      <td class="text-end">1,144.88</td>
                                      <td class="text-center">06-03-2024</td>
                                      <td>
                                        บริษัท เอเซีย แปซิฟิค ปิโตรเคมิคอล จำกัด
                                      </td>
                                    </tr>
                                    <tr class="align-middle" id="2">
                                      <td>
                                        <i
                                          class="bi bi-x-circle text-danger pointer btnDelRow"
                                        ></i>
                                        3
                                      </td>
                                      <td>OHB-001</td>
                                      <td>ค่าใช้จ่ายในการผลิต - บางปู</td>
                                      <td class="text-end">
                                        <span style="display: none">98.00</span
                                        ><input
                                          type="number"
                                          class="form-control form-control-sm cal"
                                          name="qty"
                                          value="98.00"
                                          style="width: 100px"
                                        />
                                      </td>
                                      <td>-</td>
                                      <td class="text-end">
                                        <span style="display: none">4.95</span
                                        ><input
                                          type="number"
                                          class="form-control form-control-sm cal"
                                          name="price"
                                          value="4.95"
                                          style="width: 100px"
                                        />
                                      </td>
                                      <td class="text-end">4.95</td>
                                      <td class="text-end">0.00</td>
                                      <td class="text-end">485.10</td>
                                      <td class="text-center">-</td>
                                      <td>-</td>
                                    </tr>
                                    <tr class="align-middle" id="3">
                                      <td>
                                        <i
                                          class="bi bi-x-circle text-danger pointer btnDelRow"
                                        ></i>
                                        4
                                      </td>
                                      <td>DLB-001</td>
                                      <td>ค่าแรงทางตรง-บางปู</td>
                                      <td class="text-end">
                                        <span style="display: none">98.00</span
                                        ><input
                                          type="number"
                                          class="form-control form-control-sm cal"
                                          name="qty"
                                          value="98.00"
                                          style="width: 100px"
                                        />
                                      </td>
                                      <td>-</td>
                                      <td class="text-end">
                                        <span style="display: none">1.72</span
                                        ><input
                                          type="number"
                                          class="form-control form-control-sm cal"
                                          name="price"
                                          value="1.72"
                                          style="width: 100px"
                                        />
                                      </td>
                                      <td class="text-end">1.72</td>
                                      <td class="text-end">0.00</td>
                                      <td class="text-end">168.56</td>
                                      <td class="text-center">-</td>
                                      <td>-</td>
                                    </tr>
                                    <tr class="align-middle">
                                      <td colspan="11">
                                        <span
                                          class="fw-bold text-success pointer btnAddRow"
                                          ><i class="bi bi-plus-circle"></i> Add
                                          Row</span
                                        >
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tfoot class="fw-bold">
                                    <tr>
                                      <td></td>
                                      <td></td>
                                      <td>Batch Size (BOM)</td>
                                      <td
                                        class="text-end text-primary"
                                        id="batchSize"
                                      >
                                        100.00
                                      </td>
                                      <td>Kg.</td>
                                      <td class="text-end text-primary"></td>
                                      <td></td>
                                      <td></td>
                                      <td
                                        class="text-end text-primary"
                                        id="amount"
                                      >
                                        0.00
                                      </td>
                                      <td>บาท</td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td></td>
                                      <td></td>
                                      <td>Quantity of RM</td>
                                      <td
                                        class="text-end text-primary"
                                        id="quantityOfRm"
                                      >
                                        100.00
                                      </td>
                                      <td>Kg.</td>
                                      <td>AVG</td>
                                      <td
                                        class="text-end text-primary"
                                        id="average"
                                      >
                                        59.33
                                      </td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td></td>
                                      <td></td>
                                      <td>Loss 2%</td>
                                      <td
                                        class="text-end text-primary"
                                        id="loss"
                                      >
                                        2.00
                                      </td>
                                      <td>Kg.</td>
                                      <td>Current Cost</td>
                                      <td
                                        class="text-end text-primary"
                                        id="currentCost"
                                      >
                                        0.00
                                      </td>
                                      <td>ราคาต่อ 1 กิโลกรัม</td>
                                      <td>
                                        Margin 30% (<span class="text-primary"
                                          >0.00</span
                                        >)
                                        <i
                                          class="bi bi-info-circle"
                                          data-bs-toggle="tooltip"
                                          data-bs-html="true"
                                          title=""
                                          data-bs-original-title="Margin: <i>Current Cost / 0.70</i>"
                                          aria-label="Margin: <i>Current Cost / 0.70</i>"
                                        ></i>
                                      </td>
                                      <td>
                                        Margin 35% (<span class="text-primary"
                                          >0.00</span
                                        >)
                                        <i
                                          class="bi bi-info-circle"
                                          data-bs-toggle="tooltip"
                                          data-bs-html="true"
                                          title=""
                                          data-bs-original-title="Margin: <i>Current Cost / 0.65</i>"
                                          aria-label="Margin: <i>Current Cost / 0.65</i>"
                                        ></i>
                                      </td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td></td>
                                      <td></td>
                                      <td>Net Quantity of Output</td>
                                      <td
                                        class="text-end text-primary"
                                        id="netQuantityOfOutput"
                                      >
                                        98.00
                                      </td>
                                      <td>Kg.</td>
                                      <td>Diff</td>
                                      <td
                                        class="text-end text-primary"
                                        id="diff"
                                      >
                                        59.33
                                      </td>
                                      <td>
                                        <i
                                          class="bi bi-info-circle"
                                          data-bs-toggle="tooltip"
                                          data-bs-html="true"
                                          title=""
                                          data-bs-original-title="Diff: <i>AVG - Current Cost</i>"
                                          aria-label="Diff: <i>AVG - Current Cost</i>"
                                        ></i>
                                      </td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td colspan="11">
                                        <div class="p-3 text-success">
                                          <h6>เลือกข้อมูลที่นำมาคำนวณต้นทุน</h6>
                                          <div
                                            class="form-check form-switch form-check-inline"
                                          >
                                            <input
                                              class="form-check-input pointer filter"
                                              type="checkbox"
                                              id="calRM"
                                              name="calRM"
                                            />
                                            <label
                                              class="form-check-label pointer filter"
                                              for="calRM"
                                              >Raw Materials</label
                                            >
                                          </div>
                                          <div
                                            class="form-check form-switch form-check-inline"
                                          >
                                            <input
                                              class="form-check-input pointer filter"
                                              type="checkbox"
                                              id="calDLOH"
                                              name="calDLOH"
                                            />
                                            <label
                                              class="form-check-label pointer filter"
                                              for="calDLOH"
                                              >DL&amp;OH</label
                                            >
                                          </div>
                                          <div
                                            class="form-check form-switch form-check-inline"
                                          >
                                            <input
                                              class="form-check-input pointer filter"
                                              type="checkbox"
                                              id="calPK"
                                              name="calPK"
                                            />
                                            <label
                                              class="form-check-label pointer filter"
                                              for="calPK"
                                              >Packaging</label
                                            >
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tfoot>
                                </table>
                                <!-- </div> -->
                                <!-- </div> -->
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Zemlak, Daniel and Leannon</td>
                        <td>United States</td>
                        <td>12/5/2020</td>
                        <td>Purple</td>
                      </tr>
                      <tr>
                        <th>3</th>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Carroll Group</td>
                        <td>China</td>
                        <td>8/15/2020</td>
                        <td>Red</td>
                      </tr>
                      <tr>
                        <th>4</th>
                        <td>Marjy Ferencz</td>
                        <td>Office Assistant I</td>
                        <td>Rowe-Schoen</td>
                        <td>Russia</td>
                        <td>3/25/2021</td>
                        <td>Crimson</td>
                      </tr>
                      <tr>
                        <th>5</th>
                        <td>Yancy Tear</td>
                        <td>Community Outreach Specialist</td>
                        <td>Wyman-Ledner</td>
                        <td>Brazil</td>
                        <td>5/22/2020</td>
                        <td>Indigo</td>
                      </tr>
                      <tr>
                        <th>6</th>
                        <td>Irma Vasilik</td>
                        <td>Editor</td>
                        <td>Wiza, Bins and Emard</td>
                        <td>Venezuela</td>
                        <td>12/8/2020</td>
                        <td>Purple</td>
                      </tr>
                      <tr>
                        <th>7</th>
                        <td>Meghann Durtnal</td>
                        <td>Staff Accountant IV</td>
                        <td>Schuster-Schimmel</td>
                        <td>Philippines</td>
                        <td>2/17/2021</td>
                        <td>Yellow</td>
                      </tr>
                      <tr>
                        <th>8</th>
                        <td>Sammy Seston</td>
                        <td>Accountant I</td>
                        <td>O'Hara, Welch and Keebler</td>
                        <td>Indonesia</td>
                        <td>5/23/2020</td>
                        <td>Crimson</td>
                      </tr>
                      <tr>
                        <th>9</th>
                        <td>Lesya Tinham</td>
                        <td>Safety Technician IV</td>
                        <td>Turner-Kuhlman</td>
                        <td>Philippines</td>
                        <td>2/21/2021</td>
                        <td>Maroon</td>
                      </tr>
                      <tr>
                        <th>10</th>
                        <td>Zaneta Tewkesbury</td>
                        <td>VP Marketing</td>
                        <td>Sauer LLC</td>
                        <td>Chad</td>
                        <td>6/23/2020</td>
                        <td>Green</td>
                      </tr>
                      <tr>
                        <th>11</th>
                        <td>Andy Tipple</td>
                        <td>Librarian</td>
                        <td>Hilpert Group</td>
                        <td>Poland</td>
                        <td>7/9/2020</td>
                        <td>Indigo</td>
                      </tr>
                      <tr>
                        <th>12</th>
                        <td>Sophi Biles</td>
                        <td>Recruiting Manager</td>
                        <td>Gutmann Inc</td>
                        <td>Indonesia</td>
                        <td>2/12/2021</td>
                        <td>Maroon</td>
                      </tr>
                      <tr>
                        <th>13</th>
                        <td>Florida Garces</td>
                        <td>Web Developer IV</td>
                        <td>Gaylord, Pacocha and Baumbach</td>
                        <td>Poland</td>
                        <td>5/31/2020</td>
                        <td>Purple</td>
                      </tr>
                      <tr>
                        <th>14</th>
                        <td>Maribeth Popping</td>
                        <td>Analyst Programmer</td>
                        <td>Deckow-Pouros</td>
                        <td>Portugal</td>
                        <td>4/27/2021</td>
                        <td>Aquamarine</td>
                      </tr>
                      <tr>
                        <th>15</th>
                        <td>Moritz Dryburgh</td>
                        <td>Dental Hygienist</td>
                        <td>Schiller, Cole and Hackett</td>
                        <td>Sri Lanka</td>
                        <td>8/8/2020</td>
                        <td>Crimson</td>
                      </tr>
                      <tr>
                        <th>16</th>
                        <td>Reid Semiras</td>
                        <td>Teacher</td>
                        <td>Sporer, Sipes and Rogahn</td>
                        <td>Poland</td>
                        <td>7/30/2020</td>
                        <td>Green</td>
                      </tr>
                      <tr>
                        <th>17</th>
                        <td>Alec Lethby</td>
                        <td>Teacher</td>
                        <td>Reichel, Glover and Hamill</td>
                        <td>China</td>
                        <td>2/28/2021</td>
                        <td>Khaki</td>
                      </tr>
                      <tr>
                        <th>18</th>
                        <td>Aland Wilber</td>
                        <td>Quality Control Specialist</td>
                        <td>Kshlerin, Rogahn and Swaniawski</td>
                        <td>Czech Republic</td>
                        <td>9/29/2020</td>
                        <td>Purple</td>
                      </tr>
                      <tr>
                        <th>19</th>
                        <td>Teddie Duerden</td>
                        <td>Staff Accountant III</td>
                        <td>Pouros, Ullrich and Windler</td>
                        <td>France</td>
                        <td>10/27/2020</td>
                        <td>Aquamarine</td>
                      </tr>
                      <tr>
                        <th>20</th>
                        <td>Lorelei Blackstone</td>
                        <td>Data Coordiator</td>
                        <td>Witting, Kutch and Greenfelder</td>
                        <td>Kazakhstan</td>
                        <td>6/3/2020</td>
                        <td>Red</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>company</th>
                        <th>location</th>
                        <th>Last Login</th>
                        <th>Favorite Color</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <!-- <table
                  class="table table-xs table-pin-rows table-pin-cols table-zebra"
                >
                  <thead>
                    <tr>
                      <th>Code</th>
                      <td>Status</td>
                      <td>Short Code</td>
                      <td>Item Description</td>
                      <td>Qty</td>
                      <td>Unit</td>

                      <td>Requestion</td>
                      <td>Approval</td>
                      <td>Rejection</td>
                      <td>Cancellation</td>

                      <td>Creation</td>
                      <td>Updation</td>

                      <th class="text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(v, i) in base.rows"
                      :key="v.code"
                      :class="
                        v.status == 'pending'
                          ? 'text-blue-700'
                          : v.status == 'reject'
                          ? 'text-error'
                          : v.status == 'approve'
                          ? 'text-green-700'
                          : v.status == 'cancel'
                          ? 'text-gray-400 !bg-gray-100'
                          : ''
                      "
                    >
                      <th>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{ v.code }}
                            </div>
                            <div class="text-xs">( {{ v.id }} )</div>
                          </div>
                        </div>
                      </th>
                      <td>
                        <span class="pr-2">{{
                          v.status
                            ? v.status == "pending"
                              ? "Pending"
                              : v.status == "approve"
                              ? "Approve"
                              : v.status == "reject"
                              ? "Reject"
                              : v.status == "cancel"
                              ? "Cancel"
                              : "-"
                            : "-"
                        }}</span>
                      </td>
                      <td>
                        <span class="pr-2">{{ v.item_short_code }}</span>
                      </td>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{ v.item_name }}
                            </div>
                            <div class="text-xs">( {{ v.item_code }} )</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="pr-2">{{ v.unit }}</span>
                      </td>
                      <td>
                        <span class="pr-2">{{ v.uom }}</span>
                      </td>

                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="text-xs">
                              {{
                                v.requested_at &&
                                $moment(v.requested_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.requested_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                v.requested_fullname
                                  ? v.requested_fullname
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
                                v.approved_at &&
                                $moment(v.approved_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.approved_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                v.approved_fullname
                                  ? v.approved_fullname
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
                                v.rejected_at &&
                                $moment(v.rejected_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.rejected_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                v.rejected_fullname
                                  ? v.rejected_fullname
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
                                v.canceled_at &&
                                $moment(v.canceled_at).format("YYYY-MM-DD") >
                                  "2000"
                                  ? v.canceled_at
                                  : "-"
                              }}
                            </div>
                            <div class="text-xs">
                              {{
                                v.canceled_fullname
                                  ? v.canceled_fullname
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
                      </td>
                   
                      <th class="text-right">
                        <label
                          for="modal-base"
                          class="join-item btn btn-ghost modal-button btn-xs"
                          @click="base_edit(`${v.code}`, `${i}`)"
                          >Detail
                        </label>
                      </th>
                    </tr>
                  </tbody>
                </table> -->
              </div>
              <div class="w-full">
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
import AppModuleGlobalSearch from "@/components/App/Module/Global/Search.vue";
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";

export default {
  name: "Department",
  components: {
    AppLayout,
    AppModuleGlobalPageination,
    AppModuleGlobalSelectSearch,
    AppModuleGlobalSearch,
  },
  data() {
    return {
      check: false,
      date: {
        from: "",
        to: "",
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
      item: {
        rows: [],
        total: 0,
        page: 1,
        row: null,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: {
          name: "",
          number: "",
          size: "",
          description: "",
          category_id: "0",
          store_id: "0",
          recommend: "",
          room: "",
          imageLink: "",
          image: [],
        },
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
      fetch(
        `${
          this.serviceUrl
        }api/controllers/MYSQL/INTERNAL/WH/shelf_request?total=1&page=${
          this.base.page
        }${this.base.row ? `&rows=${this.base.row}` : ""}${
          this.base.q ? `&q=${this.base.q}` : ""
        }${this.date.from ? `&createFrom=${this.date.from}` : ""}${
          this.date.to ? `&createTo=${this.date.to}` : ""
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
          }
          //   res.rows.forEach((v, i) => {
          //     res.rows[i].image = v.image ? JSON.parse(v.image) : [];
          //     res.rows[i].master = 0;
          //   });
          // }
          callback(
            res.success
              ? { rows: res.rows, total: res.total }
              : { rows: [], total: 0 }
          );
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },
    base_create() {
      this.base.current = 0;
      this.base.form = {
        code: "",
        item_code: "",
        item_name: "",
        item_short_code: "",
        pack_size: "",
        unit: "",
        uom: "",
        status: "",
        newStatus: "",
      };

      this.detail.rows = [];
      this.base.controll = "create";
    },
    base_edit(code, index) {
      this.base.form = { ...this.base.rows[index] };
      this.base.form.newStatus = this.base.form.status;
      this.base.current = code;
      this.detail.rows = [];
      this.base.controll = "edit";
      // this.detail_search();
      this.refresh = true;
    },
    base_save() {
      let vm = this;

      // let image = { ...this.base.form.image[0] };
      // delete image.temp;

      this.base.form.status = this.base.form.newStatus;
      fetch(
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelf_request`,
        {
          method: this.base.controll == "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
          body: JSON.stringify({ ...this.base.form }),
        }
      )
        .then((response) => response.json())
        .then((res) => {
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
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    status_item(status, code, controll, tb) {
      fetch(`${this.serviceUrl}api/${tb}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user_token}`,
        },
        body: JSON.stringify({
          code: code,
          status: status,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (!res.success) {
            // localStorage.removeItem("user_token");
            // this.$router.push({ name: `Login` });
          } else {
            // console.log(res);
            // this.remove.modal = false;
            this[`${controll}_search`]();
          }
          // callback(res.success ? res.rows : []);
        })
        .catch((error) => {
          // callback([]);
          console.error("Error:", error);
        });
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

    // Item
    item_search(callback) {
      this.item.loading = true;
      this.item_get((res) => {
        this.item.rows = res.rows;
        this.item.total = res.total;
        this.item.next =
          this.item.page * this.item.row >= this.item.total ? false : true;
        this.item.back = this.item.page > 1 ? true : false;
        this.item.loading = false;
        callback(res);
      });
    },
    item_get(callback) {
      fetch(
        `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WH/shelfshort?total=1&wh=wh1&item_list=1&wh=${this.user.branchTitle}&short_code=${this.base.form.item_short_code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.user_token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          callback(
            res.success
              ? { rows: res.rows, total: res.total }
              : { rows: [], total: 0 }
          );
        })
        .catch((error) => {
          callback([]);
          console.error("Error:", error);
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.base_search();
    });
  },
  watch: {
    "base.form.item_short_code": function (val) {
      if (this.base.controll == "create") {
        this.base.form.item_code = "";
        this.base.form.item_name = "";
      }

      if (val) {
        this.item_search((res) => {
          if (this.item.rows.length == 1) {
            this.base.form.item_code = this.item.rows[0].item_code;
            this.base.form.item_wh = this.item.rows[0].wh;
          }
        });
      }
    },
    "base.form.item_code": function (val) {
      if (val) {
        fetch(
          `${this.serviceUrl}api/controllers/SAP/${
            this.base.form.item_wh ? this.base.form.item_wh : "UBA"
          }/oitm?item_code=${val}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.user_token}`,
            },
          }
        )
          .then((response) => response.json())
          .then((res) => {
            if (!res.success) {
              localStorage.removeItem("user_token");
              this.$router.push({ name: `Login` });
            } else {
              this.base.form.item_code = res.rows[0].ItemCode;
              this.base.form.item_name = res.rows[0].ItemName;
              this.base.form.uom = res.rows[0].UomCode;
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
  },
};
</script>
<style scrop>
tr,
td {
  white-space: nowrap;
}
</style>

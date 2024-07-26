<template>
  <AppLayout>
    <template #modal>
      <!-- modal alert -->
      <!-- <input
        type="checkbox"
        id="modal-alert"
        class="modal-toggle"
        v-model="alert.modal"
      />
      <div class="modal" v-if="alert.modal">
        <div class="modal-box w-11/12 max-w-md">
          <div class="card-body overflow-auto" style="display: flex; align-items: center; max-height: 60vh;">
            <Icon icon="mdi:cancel-circle-outline" width="96" height="96"  style="color: #f85b63" />
            <h1 class="text-lg text-error font-semibold">This item has already been received.</h1>
          </div>
          <hr class="mb-5" />
          <button class="btn w-full" disabled>
            Closing in {{ countDown }} ...
          </button>
        </div>
      </div> -->
      <!-- modal success -->
      <!-- <input
        type="checkbox"
        id="modal-success"
        class="modal-toggle"
        v-model="success.modal"
      />
      <div class="modal" v-if="success.modal">
        <div class="modal-box w-11/12 max-w-md">
          <label
            for="modal-success"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            @click="select = true; success.modal = false; clearTimeout()"
          >
            ✕
          </label>
          <div class="card-body overflow-auto " style="display: flex; align-items: center; max-height: 60vh;">
            <Icon icon="mdi:success-circle-outline" width="96" height="96"  style="color: #0f9c68" />
            <h1 class="text-lg text-success font-semibold">Success!</h1>
            <h3 class="text-sm text-slate-500 font-semibold">If you do not want to receive the product<br>Close the pop-up at the top right.</h3>
          </div>
          <hr class="mb-5" />
          <button class="btn w-full" disabled>
            Closing in {{ countDown }} ...
          </button>
        </div>
      </div> -->
      <!-- modal remove -->
      <input
        type="checkbox"
        id="modal-remove"
        class="modal-toggle"
        v-model="remove.modal"
      />
      <div class="modal" v-if="remove.modal">
        <div class="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert">
          <div class="flex p-4">
            <div class="flex-shrink-0">
              <svg class="size-5 text-gray-600 mt-1 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </div>
            <div class="ms-4">
              <h3 class="text-error font-semibold dark:text-white underline underline-offset-2">
                System notification
              </h3>
              <div class="mt-2 text-sm text-slate-500 dark:text-neutral-400">
                Are your sure for remove this item?
              </div>
              <div class="mt-4">
                <div class="flex space-x-3">
                  <label for="modal-remove" type="label" class="btn btn-xs btn-active decoration-2 font-medium text-xs text-white dark:text-blue-500">
                    Cancel
                  </label>
                  <label class="btn btn-xs btn-error decoration-2 font-semibold text-xs text-white dark:text-blue-500" @click="confirm_remove()">
                    Confirm
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #view>
      <div class="flex" style="justify-content: center; flex-wrap: wrap;">
        <div :class="base.form ? 'grid grid-cols-1 md:grid-cols-2 w-full h-full bg-white rounded-lg shadow-xl' : 'w-[calc(100vh-385px)] h-full bg-white rounded-lg shadow-xl'">
          <div :class="base.form ? 'base-300 flex items-center justify-center' : 'flex items-center justify-center'">
            <div class="join join-vertical w-full">
              <div class="collapse collapse-arrow join-item border border-base-300">
                <input type="radio" name="my-accordion-4" :checked="choose" @click="choose = !choose" /> 
                <div :class="choose ? 'collapse-title text-lg font-bold text-white bg-primary border-b-1' : 'collapse-title text-lg font-bold text-primary'">
                  Scan QR Code
                </div>
                <div :class="choose ? 'collapse-content h-[calc(100vh-261px)]' : 'collapse-content h-full'" style="display: flex; flex-direction: column; align-items: center;"> 
                  <div class="form-control my-3">
                    <label class="label cursor-pointer">
                      <span class="label-text me-3">Camera: </span> 
                      <input type="checkbox" class="toggle toggle-sm" v-model="select" />
                    </label>
                  </div>
                  <qrcode-stream
                    @detect="onDetect"
                    @error="onError"
                    @camera-on="onReady"
                    :track="selected.value"
                    :formats="['code_128', 'qr_code', 'ean_13', 'ean_8']"
                    class="max-h-lg max-w-lg border-dashed border-2 p-2"
                    v-if="select"
                  ></qrcode-stream>
                </div>
              </div>
              <div class="collapse collapse-arrow join-item border border-base-300">
                  <input type="radio" name="my-accordion-4" :checked="!choose" @click="choose = !choose" /> 
                  <div :class="choose ? 'collapse-title text-lg font-bold text-primary' : 'collapse-title text-lg font-bold text-white bg-primary border-b-1'">
                    Scan Barcode
                  </div>
                  <div :class="!choose ? 'collapse-content h-[calc(100vh-261px)]' : 'collapse-content h-full'" style="display: flex; flex-direction: column; align-items: center;">                                             
                    <div class="max-h-lg max-w-lg mt-7 rounded border-dashed border-2 p-2" style="display:flex; flex-direction: column; align-items: center; justify-content: space-evenly; width: 100%; height: 90%;">
                      <AppModuleGlobalScannerDetect
                          @response="
                            (res) => {
                              input = res
                            }
                          "
                      />
                      <vue-barcode :value="output" :options="{ displayValue: true }" tag="img" v-if="output" />
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div class="grid grid-rows-2 gap-1 bg-gray rounded-r-lg shadow-xl p-3" v-if="base.form">
            <div class="rounded-lg border-dotted border-2 border-primary p-2 w-full" :class="h > 800 ? 'h-96' : 'h-72'">
              <div class="h-12 rounded-lg bg-slate-200 text-primary font-bold" style="display: flex; align-items: center; justify-content: center;">Product Detail</div>
              <div class="grid grid-cols-2 gap-3 mt-3">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-xs font-semibold">EN :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="en"
                    class="input input-bordered"
                    :class="h < 800 ? 'input-xs' : ''"
                    :value="base.form.en_name"
                    readonly
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-xs font-semibold">Ref :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ref"
                    class="input input-bordered"
                    :class="h < 800 ? 'input-xs' : ''"
                    :value="base.form.ref"
                    readonly
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-xs font-semibold">Loading Date :</span>
                  </label>
                  <input
                    type="date"
                    placeholder="product"
                    class="input input-bordered"
                    :class="h < 800 ? 'input-xs' : ''"
                    :value="base.form.load_date"
                    readonly
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-xs font-semibold">Status :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="status"
                    class="input input-bordered"
                    :class="h < 800 ? 'input-xs' : ''"
                    :value="base.form.status"
                    readonly
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-xs font-semibold">Already Received :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="already have"
                    class="input input-bordered"
                    :class="h < 800 ? 'input-xs' : ''"
                    :value="base.form.already_have"
                    readonly
                  />
                </div>
                <div class="form-control">
                  <label class="label">
                    <span class="label-text text-xs font-semibold">Total Quantity :</span>
                  </label>
                  <input
                    type="text"
                    placeholder="quantity"
                    class="input input-bordered"
                    :class="h < 800 ? 'input-xs' : ''"
                    :value="base.form.total_qty"
                    readonly
                  />
                </div>
              </div>
            </div>
            <div class="rounded-lg border-dotted border-2 border-primary p-2 w-full" :class="h > 800 ? 'h-96' : 'h-72'" v-if="log.form">
              <div class="h-12 rounded-lg bg-slate-200 text-primary font-bold" style="display: flex; align-items: center; justify-content: center;">Logs Detail</div>
              <div class="mt-3 w-full h-3/4 overflow-x-auto">
                <table style="width: 100%;" class="table table-xs table-pin-rows table-pin-cols">
                  <thead>
                    <tr>
                      <td class="border border-slate-300">Receive Date</td>
                      <td class="border border-slate-300">Pallet</td>
                      <td class="border border-slate-300">Lot</td>
                      <td class="border border-slate-300">Qty</td>
                      <th class="border border-slate-300 text-center">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in log.form">
                      <td class="border border-slate-300">{{ $moment(row.created_at).format("DD-MM-YYYY HH:mm:ss") }}</td>
                      <td class="border border-slate-300">{{ row.pallet }}</td>
                      <td class="border border-slate-300">{{ row.lot }}</td>
                      <td class="border border-slate-300">{{ row.quantity }}</td>
                      <th class="border border-slate-300 text-center">
                        <label
                          v-if="row.request == 0"
                          for="modal-remove"
                          class="btn btn-xs btn-ghost text-error" 
                          @click="
                            remove_item(
                              `${row.code}`,
                              'log',
                              'api/controllers/MYSQL/INTERNAL/WMS/logs',
                              `${row.pallet}`
                            )
                          "
                        >
                          <Icon icon="basil:cancel-outline" width="20" height="20" />
                        </label>
                        <div v-else class="badge badge-error gap-1 text-xs text-white">
                          waiting for approval.
                        </div>
                      </th>
                    </tr>
                  </tbody>
                </table>
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
import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import AppModuleGlobalScannerDetect from "@/components/App/Module/Global/ScannerDetect.vue";
import SelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import VueQRCodeComponent from "vue-qrcode-component";
import VueBarcode from '@chenfengyuan/vue-barcode';
import { ref } from 'vue'
import { useFocus } from '@vueuse/core'
import { useToast } from "vue-toastification";
import Query from "@/assets/js/fetch.js";
import { socket } from "@/socket";

export default {
  name: "ScanToReceive",
  components: {
    AppLayout,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
    SelectSearch,
    VueQRCodeComponent,
    AppModuleGlobalSelectSearch,
    VueBarcode,
    AppModuleGlobalScannerDetect
  },
  setup() {
    const bar = ref()
    const { focused } = useFocus(bar)
    const toast = useToast();

    return {
      bar,
      focused,
      toast
    }
  },
  data() {
    const options = [
        { text: "nothing (default)", value: undefined },
        { text: "outline", value: this.paintOutline },
        { text: "centered text", value: this.paintCenterText },
        { text: "bounding box", value: this.paintBoundingBox },
    ];

    const selected = options[1];
    return {
      // countDown: 5,
      h: window.innerHeight,
      input: '',
      output: 0,
      choose: true,
      code: '',
      sheet: '',
      floor: '',
      select: true,
      selected: selected,
      options: options,
      detect: 0,
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
        form: null,
      },
      log: {
        rows: [],
        total: 0,
        page: 1,
        row: 20,
        q: "",
        next: false,
        back: false,
        loading: false,
        modal: false,
        form: null,
      },
      remove: {
        current: 0,
        model: false,
        controll: "",
        tb: "",
        sheet: ""
      },
      // alert: {
      //     current: 0,
      //     model: false,
      //     controll: "",
      //     tb: "",
      // },
      // success: {
      //     current: 0,
      //     model: false,
      //     controll: "",
      //     tb: "",
      // },
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
    dateNow() {
      let d = new Date();
      return d.getFullYear() + '-' + (d.getMonth() >= 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
              + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    },
    ymd(start, life) {
      let expire = new Date((new Date(start)).getTime() + life * 86400E3);
      return expire.getFullYear() + '-' + (expire.getMonth() >= 9 ? expire.getMonth() + 1 : '0' + (expire.getMonth() + 1)) + '-' + (expire.getDay() > 9 ? expire.getDay() : '0' + expire.getDay());
    },
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
    paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height },
        } = detectedCode;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#007bff";
        ctx.strokeRect(x, y, width, height);
      }
    },
    paintCenterText(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const { boundingBox, rawValue } = detectedCode;

        const centerX = boundingBox.x + boundingBox.width / 2;
        const centerY = boundingBox.y + boundingBox.height / 2;

        const fontSize = Math.max(
          12, (50 * boundingBox.width) / ctx.canvas.width
        );
        // console.log(boundingBox.width, ctx.canvas.width);

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = "center";

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#35495e";
        ctx.strokeText(detectedCode.rawValue, centerX, centerY);

        ctx.fillStyle = "#5cb984";
        ctx.fillText(rawValue, centerX, centerY);
      }
    },
    onDetect(detectedCodes) {
      let ar = JSON.stringify(detectedCodes[0].rawValue);
      // console.log(ar)

      this.base_search(ar, 'qr')
      // ไม่ใช้ละจ้า
      // this.countDown = 5
    },
    onReady(capabilities) {
      // console.log(capabilities);
    },
    onError(error) {
      if (error.name === "NotAllowedError") {
        console.log("user denied camera access permission");
      } else if (error.name === "NotFoundError") {
        console.log("no suitable camera device installed");
      } else if (error.name === "NotSupportedError") {
        console.log("page is not served over HTTPS (or localhost)");
      } else if (error.name === "NotReadableError") {
        console.log("maybe camera is already in use");
      } else if (error.name === "OverconstrainedError") {
        console.log("did you request the front camera although there is none?");
      } else if (error.name === "StreamApiNotSupportedError") {
        console.log("browser seems to be lacking features");
      }
    },
    // Base
    base_search(data , session) {
      if (data.indexOf('ubis') == -1) {
        this.toast.error(`It's not UBIS ${session}code.`, {
          position: "top-center",
          timeout: 4000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: false,
          draggable: true,
          draggablePercent: 0.5,
          showCloseButtonOnHover: true,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false
        });

        return;
      }

      let used
      // เช็ค QR หรือ Barcode
      if (session == 'qr') {
        used = data.split('"')[1].split('?')[1].split('&')
      } else {
        used = data.split('&')
      }
      this.code = used[0]
      this.sheet = used[1]

      this.base.loading = true;
      this.base_get((res) => {
        this.base.rows = res.rows;
        this.base.total = res.total;
        this.base.next =
        this.base.page * this.base.row >= this.base.total
          ? false
          : true;
        this.base.back = this.base.page > 1 ? true : false;
        this.base.loading = false;

        if(this.base.rows == undefined) return;

        this.base.form = this.base.rows[0]

        let checklist = JSON.parse(this.base.form.format)
        let currentpallet = checklist.find(x => x.pallet == this.sheet)
        
        if(currentpallet.status == 'received' || currentpallet.checked) {
          this.select = false
      
          this.toast.warning("This item has already been received.", {
            position: "top-center",
            timeout: 4000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: false,
            draggable: true,
            draggablePercent: 0.5,
            showCloseButtonOnHover: true,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
          });
      
          this.log_search()
      
          // ไม่ใช้แล้วจ้า
          // this.alert.modal = true
          // this.countDownTimer('alert', [])
        } else {
          this.select = false
      
          checklist.forEach(x => { return x.pallet == this.sheet ? x.checked = true : '' })
          
          let obj = {
            rows: [
              {
                code: this.base.form.code,
                format: checklist,
                used: 'Y'
              },
            ],
            socket: socket.id
          };

          socket.emit("scan", obj);
      
          // ไม่ใช้แล้วจ้า
          // this.success.modal = true
          // this.countDownTimer('success', checklist)
        }
      });
    },
    base_get(callback) {
      new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/print?code=${this.code}`, (res) => {
        if (res.success) {
          let checklist = []
          res.rows.filter(x => x.code).forEach((x, i) => {
            checklist[i] = JSON.parse(x.format) ? JSON.parse(x.format).filter(y => y.checked == true).reduce((a, b) => { return { total: a.total + b.total } }, { total: 0 }) : { total: 0 }
          })

          res.rows.forEach((x, i) => {
            x['already_have'] = checklist[i].total
          })

          res.rows[0]['total_qty'] = 0
          JSON.parse(res.rows[0].format).forEach((x) => {
            res.rows[0]['total_qty'] = res.rows[0]['total_qty'] + parseInt(x.total)
          })
        }
        callback({ ...res });
      });
    },
    base_save(data) {
      let obj = { rows: [], socket: socket.id }
      // ไม่ใช้ละจ้า
      // let obj_item = { rows: [] }
      if (data.item.length) {
        (data.item).forEach((x, i) => {
          obj['rows'][i] = {
            ref_code : data.code,
            pallet : this.sheet,
            lot : x.lot,
            quantity : x.qty,
            mfg : x.mfg,
            exp : x.exp,
            type: 'add',
            request: 0
          }

          // ไม่ใช้ละจ้า
          // obj_item['rows'][i] = {
          //     lot : x.lot,
          //     received_at : this.dateNow(),
          // }
        })
      } else {
        obj.rows.push({
          ref_code : data.code,
          pallet : this.sheet,
          lot : data.item.lot,
          quantity : data.item.qty,
          mfg : data.item.mfg,
          exp : data.item.exp,
          type: 'add',
          request: 0
        })

        // ไม่ใช้ละจ้า
        // obj_item.rows.push({
        //     lot : data.item.lot,
        //     received_at : this.dateNow(),
        // })
      }

      socket.emit("logs", obj);
    },
    // Logs
    log_search() {
      this.log.loading = true;
      this.log_get((res) => {
        this.log.rows = res.rows;
        this.log.total = res.total;
        this.log.next =
        this.log.page * this.log.row >= this.log.total
          ? false
          : true;
        this.log.back = this.log.page > 1 ? true : false;
        this.log.loading = false;

        this.log.form = [...this.log.rows]

        this.choose ? this.select = true : this.select = false

        this.recheck_trans()
      });
    },
    log_get(callback) {
      new Query('log','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs?ref_code=${JSON.parse(this.base.form.format).find(x => x.pallet == this.sheet).code}&type=add`, (res) => {
        if (res.success) {
          res.rows.forEach((v, i) => {
            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
            res.rows[i].master = 0;
          });
        }
        callback({ ...res });
      });
    },
    recheck_trans() {
      new Query(null,'get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/print?code=${this.base.form.code}`, (res) => {
        if (res.success) {
          let recheck = true
          res.rows[0]['total_qty'] = 0
          JSON.parse(res.rows[0].format).forEach((x) => {
            res.rows[0]['total_qty'] = res.rows[0]['total_qty'] + parseInt(x.total)
          })

          res.rows.forEach((x, i) => {
            if (recheck) {
              let receive_logs = JSON.parse(x.format)

              if (Array.isArray(receive_logs)) {
                if (x.total_qty == (receive_logs ? receive_logs.filter(y => y.checked == true).reduce((a, b) => { return { total: a.total + b.total } }, { total: 0 }).total : 0)) {
                  recheck = true;
                } else {
                  recheck = false;
                }
              } else {
                if (x.total_qty == (receive_logs ? receive_logs.total : 0)) {
                  recheck = true;
                } else {
                  recheck = false;
                }
              }
            }
          })

          let obj = { rows: [], socket: socket.id }

          if(recheck) {
            obj['rows'][0] = {
              code: this.base.form.en,
              status : 'received',
              received_by : this.user.code,
              received_at : this.dateNow()
            }

          } else {
            obj['rows'][0] = {
              code: this.base.form.en,
              status: 'receiving',
            }
          }

          socket.emit("recheck", obj);
        }
      });
    },
    // REMOVE
    remove_item(code, controll, tb, sheet) {
      this.remove.code = code;
      this.remove.controll = controll;
      this.remove.tb = tb;
      this.remove.sheet = sheet;
    },
    confirm_remove() {
      this.log.form.filter(x => x.pallet == this.remove.sheet).forEach((x, i) => {
        let obj = {
          rows: [
            {
              code: x.code,
              request: 1
            }
          ],
          socket: socket.id
        }

        socket.emit("delete", obj);
      })
    },
    // countDownTimer (cont, data) {
    //     if (this.countDown > 0) {
    //         setTimeout(() => {
    //             this.countDown -= 1
    //             this.countDownTimer(cont, data)
    //         }, 1000)
    //     } else {
    //         if (cont == 'success') {
    //             if (this.success.modal == true) {
    //                 data.forEach(x => { return x.pallet == this.sheet ? x.checked = true : '' })
    //                 let obj = {
    //                     rows: [
    //                         {
    //                             code: this.base.form.code,
    //                             received: data,
    //                         },
    //                     ],
    //                 };
    //                 new Query(null,'put').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/prod`, obj, (res) => {
    //                     if (!res.success) {
    //                     } else {
    //                         let already_have = JSON.parse(res.rows[0].received) ? JSON.parse(res.rows[0].received).filter(y => y.checked == true).reduce((a, b) => { return { total: a.total + b.total } }, { total: 0 }) : { total: 0 }
    //                         this.base.form.already_have = already_have.total
    //                         this.base_save(data.find(x => x.pallet == this.sheet))
    //                         this.trans_save()
    //                     }
    //                 });
    //             }
    //         } else {
    //             this.choose ? this.select = true : this.select = false
    //             this.alert.modal = false
    //             this.countDown = 5
    //         }
    //     }
    // },
    scan(res) {
      if (res.socket != socket.id) {
        return;
      }

      if (!res.success) {
      } else {
        let already_have = JSON.parse(res.rows[0].format) ? JSON.parse(res.rows[0].format).filter(y => y.checked == true).reduce((a, b) => { return { total: a.total + b.total } }, { total: 0 }) : { total: 0 }
        this.base.form.already_have = already_have.total
        this.base_save(JSON.parse(res.rows[0].format).find(x => x.pallet == this.sheet))
      }
    },
    logs(res) {
      if (res.socket != socket.id) {
        return;
      }

      if (!res.success) {
      } else {
        this.toast.success("The product has been successfully received.", {
          position: "top-center",
          timeout: 4000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: false,
          draggable: true,
          draggablePercent: 0.5,
          showCloseButtonOnHover: true,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false
        });

        this.log_search()
      }
    },
    delete(res) {
      if (res.socket != socket.id) {
        return;
      }

      if (!res.success) {
      } else {
        this.toast.info("Approval has been submitted.", {
          position: "top-center",
          timeout: 4000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: false,
          draggable: true,
          draggablePercent: 0.5,
          showCloseButtonOnHover: true,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false
        });

        this.remove.modal = false;
        this.log_search();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      socket.on("connect", () => {
        console.log("CONNECT")
      });

      socket.on("disconnect", () => {
        console.log("DICONNECT")
        socket.connect()
      });

      socket.on("scan", this.scan);

      socket.on("logs", this.logs);

      socket.on("delete", this.delete);
    });
  },
  unmounted() {
    socket.off("scan", this.scan);
    socket.off("logs", this.logs);
    socket.off("delete", this.delete);
  },
  watch: {
    base: function (v) {
      // console.log(v);
    },
    log: function (v) {
      // console.log(v);
    },
    input: function(v) {
      // console.log(v);
      if (v) {
        if (!this.select) {
          this.output = v
          this.base_search(v, 'bar')
          setTimeout(() => {
            this.input = ''
          }, 500);
        }
      }
    },
    choose: function (v) {
      // console.log(v)
      if (v) {
        this.select = true
        this.focused = false
      } else {
        this.select = false
        this.focused = true
        this.input = ''
        this.output = 0
      }
    }
  },
};
</script>
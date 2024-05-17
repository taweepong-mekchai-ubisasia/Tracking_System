<template>
    <AppLayout>
            <template #modal>
                <!-- modal alert -->
                <input
                    type="checkbox"
                    id="modal-alert"
                    class="modal-toggle"
                    v-model="alert.modal"
                />
                <div class="modal" v-if="alert.modal">
                    <div class="modal-box w-11/12 max-w-md">
                        <div class="card-body overflow-auto" style="max-height: 60vh">
                            <h1 class="text-xl text-info font-semibold">This item has already been received.</h1>
                        </div>
                        <hr class="mb-5" />
                        <button class="btn w-full" disabled>
                            Closing in {{ countDown }} ...
                        </button>
                    </div>
                </div>
                <!-- modal success -->
                <input
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
                            <h1 class="text-success font-semibold">Success!</h1>
                            <h3 class="text-slate-500 font-semibold">If you do not want to receive the product, Close the pop-up at the top right.</h3>
                        </div>
                        <hr class="mb-5" />
                        <button class="btn w-full" disabled>
                            Closing in {{ countDown }} ...
                        </button>
                    </div>
                </div>
            </template>
            <template #view>
                <div class="flex" style="justify-content: center; flex-wrap: wrap;">
                    <div :class="base.form ? 'grid grid-cols-1 md:grid-cols-2 w-[calc(100vh-100px)] h-[calc(100vh-140px)] bg-white rounded-lg shadow-xl' : 'w-[calc(100vh-400px)] h-[calc(100vh-140px)] bg-white rounded-lg shadow-xl'">
                        <div class="bg-gray rounded-l-lg shadow-xl p-3" style="display:flex; flex-direction: column; justify-content: space-evenly;" v-if="base.form">
                            <div class="h-[calc(100vh-550px)]">
                                <h1 class="mt-3 font-bold">Product Detail</h1>
                                <div class="mt-8 grid grid-cols-3 gap-3">
                                    <div class="form-control">
                                        <label class="label">
                                        <span class="label-text font-medium">Product </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="product"
                                            class="input input-sm input-bordered"
                                            :value="base.form.product"
                                            disabled
                                        />
                                    </div>
                                    <div class="form-control col-span-2">
                                        <label class="label">
                                        <span class="label-text font-medium">Description </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="description"
                                            class="input input-sm input-bordered w-full"
                                            :value="base.form.descrip"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div class="mt-8 grid grid-cols-3 gap-3">
                                    <div class="form-control">
                                        <label class="label">
                                        <span class="label-text font-medium">Shelf Life </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="shelf life"
                                            class="input input-sm input-bordered"
                                            :value="base.form.shelf_life"
                                            disabled
                                        />
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                        <span class="label-text font-medium">Pack Size </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="pack_size"
                                            class="input input-sm input-bordered"
                                            :value="base.form.pack_size"
                                            disabled
                                        />
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                        <span class="label-text font-medium">Unit </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="unit"
                                            class="input input-sm input-bordered"
                                            :value="base.form.unit"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div class="mt-8 grid grid-cols-2 gap-3">
                                    <div class="form-control">
                                        <label class="label">
                                        <span class="label-text font-medium">Already Received </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="already have"
                                            class="input input-sm input-bordered"
                                            :value="base.form.already_have"
                                            disabled
                                        />
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                        <span class="label-text font-medium">Total Quantity </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="quantity"
                                            class="input input-sm input-bordered"
                                            :value="base.form.total_qty"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <!-- <hr class="mt-3" /> -->
                            <div class="h-[calc(100vh-550px)]" v-if="log.form">
                                <h1 class="font-bold">Logs</h1>
                                <div class="mt-3 overflow-x-auto w-full h-[37.34vh]">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Receive Date</th>
                                                <th>Pallet</th>
                                                <th>Lot No.</th>
                                                <th>Qty</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="row in log.form">
                                                <th>{{ row.created_at }}</th>
                                                <td>{{ row.pallet }}</td>
                                                <td>{{ row.lot }}</td>
                                                <td>{{ row.quantity }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div :class="base.form ? 'base-300 flex items-center justify-center' : 'flex items-center justify-center'">
                            <div class="join join-vertical w-full h-full">
                                <div class="collapse collapse-arrow join-item border border-base-300">
                                    <input type="radio" name="my-accordion-4" :checked="choose" @click="choose = !choose" /> 
                                    <div :class="choose ? 'collapse-title text-lg font-bold text-white bg-primary border-b-1' : 'collapse-title text-lg font-bold text-primary'">
                                        Scan QR Code
                                    </div>
                                    <div :class="choose ? 'collapse-content h-[calc(100vh-261px)]' : 'collapse-content h-full'" style="display: flex; flex-direction: column; align-items: center;"> 
                                        <qrcode-stream
                                            @detect="onDetect"
                                            @error="onError"
                                            @camera-on="onReady"
                                            :track="selected.value"
                                            class="max-h-lg max-w-lg mt-7 border-dashed border-2 p-2"
                                            v-if="select"
                                        ></qrcode-stream>
                                        <div class="form-control my-3">
                                            <label class="label cursor-pointer">
                                                <span class="label-text me-3">Camera: </span> 
                                                <input type="checkbox" class="toggle toggle-sm" v-model="select" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="collapse collapse-arrow join-item border border-base-300">
                                    <input type="radio" name="my-accordion-4" :checked="!choose" @click="choose = !choose" /> 
                                    <div :class="choose ? 'collapse-title text-lg font-bold text-primary' : 'collapse-title text-lg font-bold text-white bg-primary border-b-1'">
                                        Scan Barcode
                                    </div>
                                    <div :class="!choose ? 'collapse-content h-[calc(100vh-261px)]' : 'collapse-content h-full'" style="display: flex; flex-direction: column; align-items: center;">                                             
                                        <div class="max-h-lg max-w-lg mt-7 rounded border-dashed border-2 p-2" style="display:flex; flex-direction: column; align-items: center; justify-content: space-evenly; width: 100%; height: 90%;">
                                            <label class="input input-bordered flex items-center gap-2" style="width: 90%;">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
                                                <input type="password" class="grow" ref="bar" v-model="input" @change="base_search(input, 'bar')" />
                                            </label>
                                            <vue-barcode :value="output" :options="{ displayValue: true }" tag="img" v-if="output" />
                                            <div v-else>
                                                <p class="text-xl font-bold italic">Scaning </p>
                                                <p class="loading loading-dots loading-lg"></p>
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
    import AppLayout from "@/components/App/layout.vue";
    import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
    import SelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
    import VueQRCodeComponent from "vue-qrcode-component";
    import AppModuleGlobalSelectSearch from "@/components/App/Module/Global/SelectSearch.vue";
    import VueBarcode from '@chenfengyuan/vue-barcode';
    import { ref } from 'vue'
    import { useFocus } from '@vueuse/core'
    import Query from "@/assets/js/fetch.js";
    
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
            VueBarcode
        },
        props: ["showLogin", "showtokens", "token_gameplay"],
        setup() {
            const bar = ref()
            const { focused } = useFocus(bar)

            return {
                bar,
                focused
            }
        },
        data() {
            // const active = false;
            const options = [
                { text: "nothing (default)", value: undefined },
                { text: "outline", value: this.paintOutline },
                { text: "centered text", value: this.paintCenterText },
                { text: "bounding box", value: this.paintBoundingBox },
            ];
    
            const selected = options[1];
            return {
                countDown: 5,
                input: '',
                outpput: 0,
                choose: true,
                done: false,
                sum: 0,
                code: '',
                sheet: '',
                floor: '',
                select: true,
                message: "",
                selected: selected,
                options: options,
                dataset: {
                    doc: {
                        code: "https://irrelevant-jellyfish.jurassic.ninja/2023/05/22/new/",
                    },
                        items: { code: "https://qrstud.io/qrmnky" },
                    },
                ready: false,
                list: [],
                temp: null,
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
                alert: {
                    current: 0,
                    model: false,
                    controll: "",
                    tb: "",
                },
                success: {
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
        },
        methods: {
            dateNow() {
                let d = new Date();
                return d.getFullYear() + '-' + (d.getMonth() >= 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
                        + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            },
            ymd(start, life) {
                let expire = new Date((new Date(start)).getTime() + life * 86400E3);
                // console.log(expire.getMonth()+1)
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
                        12,
                        (50 * boundingBox.width) / ctx.canvas.width
                    );
                    console.log(boundingBox.width, ctx.canvas.width);

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

                this.base_search(ar, 'qr')
                this.countDown = 5
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
            countDownTimer (cont, data) {
                if (this.countDown > 0) {
                    setTimeout(() => {
                        this.countDown -= 1
                        this.countDownTimer(cont, data)
                    }, 1000)
                } else {
                    if (cont == 'success') {
                        if (this.success.modal == true) {
                            data.forEach(x => { return x.pallet == this.sheet ? x.checked = true : '' })
                        
                            let obj = {
                                rows: [
                                    {
                                        code: this.base.form.code,
                                        received: data,
                                    },
                                ],
                            };

                            new Query(null,'put').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/prod`, obj, (res) => {
                                if (!res.success) {
                                } else {
                                    let already_have = JSON.parse(res.rows[0].received) ? JSON.parse(res.rows[0].received).filter(y => y.checked == true).reduce((a, b) => { return { total: a.total + b.total } }, { total: 0 }) : { total: 0 }
                                    this.base.form.already_have = already_have.total

                                    this.base_save(data.find(x => x.pallet == this.sheet))
                                    this.trans_save()
                                }
                            });
                        }
                    } else {
                        // console.log(this.choose)
                        this.choose ? this.select = true : this.select = false
                        this.alert.modal = false
                    }
                }
            },
            base_search(data , session) {
                let used
                if(session == 'qr') {
                    used = data.split('"')[1].split('?')[1].split('&')
                } else {
                    used = data.split('&')
                }
                this.code = used[0]
                this.sheet = used[1]
                this.floor = used[2]

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

                    let checklist = JSON.parse(this.base.form.received)
                    let currentpallet = JSON.parse(this.base.form.received).find(x => x.pallet == this.sheet)

                    if(currentpallet.checked) {
                        this.log_search()

                        this.select = false
                        this.alert.modal = true

                        this.countDownTimer('alert', [])
                    } else {
                        this.log_search()
                        
                        this.select = false
                        this.success.modal = true
                        
                        this.countDownTimer('success', checklist)
                    }
                });
            },
            base_get(callback) {
                new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/prod?code=${this.code}`, (res) => {
                    if (res.success) {
                        let checklist = []
                        res.rows.filter(x => x.code).forEach((x, i) => {
                            checklist[i] = JSON.parse(x.received) ? JSON.parse(x.received).filter(y => y.checked == true).reduce((a, b) => { return { total: a.total + b.total } }, { total: 0 }) : { total: 0 }
                        })

                        res.rows.forEach((x, i) => {
                            x['already_have'] = checklist[i].total
                        })

                        res.rows.forEach((v, i) => {
                            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
                            res.rows[i].master = 0;
                        });
                    }
                    callback({ ...res });
                });
            },
            base_save(data) {
                // console.log(data)
                let obj = { rows: [] }
                let obj_item = { rows: [] }
                if(data.item.length) {
                    (data.item).forEach((x, i) => {
                        obj['rows'][i] = {
                            ref_code : this.base.form.code,
                            parent : this.base.form.product,
                            descrip : this.base.form.descrip,
                            pallet : this.sheet,
                            lot : x.lot,
                            quantity : x.qty,
                            mfg : x.mfg,
                            exp : x.exp,
                            type: 'add'
                        }

                        obj_item['rows'][i] = {
                            // prod_code : this.base.form.code,
                            lot : x.lot,
                            received_at : this.dateNow(),
                        }
                    })
                } else {
                    obj.rows.push({
                        ref_code : this.base.form.code,
                        parent : this.base.form.product,
                        descrip : this.base.form.descrip,
                        pallet : this.sheet,
                        lot : data.item.lot,
                        quantity : data.item.qty,
                        mfg : data.item.mfg,
                        exp : data.item.exp,
                        type: 'add'
                    })

                    obj_item.rows.push({
                        // prod_code : this.base.form.code,
                        lot : data.item.lot,
                        received_at : this.dateNow(),
                    })
                }

                new Query(null,'post').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs`, obj, (res) => {
                    if (!res.success) {
                    } else {
                        // console.log(this.choose)
                        new Query(null,'put').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/item`, obj_item, (res) => {
                            if (!res.success) {
                            } else {
                                // console.log(this.choose)
                                this.choose ? this.select = true : this.select = false
                                this.success.modal = false
        
                                this.log_search()
                                this.recheck_trans()
                            }
                        });
                    }
                });
            },
            trans_save() {
                let obj = {
                    rows: [
                        {
                            code: this.base.form.trans_code,
                            status: 'receiving',
                        },
                    ]
                };

                new Query(null,'put').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/trans`, obj, (res) => {
                    if (!res.success) {
                    } else {
                        console.log(res)
                    }
                });
            },
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
                });
            },
            log_get(callback) {
                new Query('log','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs?ref_code=${this.base.form.code}&type=add`, (res) => {
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
                new Query(null,'get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/prod?trans_code=${this.base.form.trans_code}`, (res) => {
                    if (res.success) {
                        let recheck = true
                        res.rows.forEach((x, i) => {
                            if (recheck) {
                                let receive_logs = JSON.parse(x.received) 
                                if(x.total_qty == (receive_logs ? receive_logs.filter(y => y.checked == true).reduce((a, b) => { return { total: a.total + b.total } }, { total: 0 }).total : 0)) {
                                    recheck = true;
                                } else {
                                    recheck = false;
                                }
                            }
                        })
    
                        if(recheck) {
                            let obj = {
                                rows: [
                                    {
                                        code: this.base.form.trans_code,
                                        status : 'received',
                                        received_by : this.user.code,
                                        received_at : this.dateNow()
                                    },
                                ],
                            };

                            new Query(null, 'put').set(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/trans`, obj, (res) => {
                                if (!res.success) {
                                } else {
                                    console.log(res)
                                }
                            });
                        }

                        res.rows.forEach((v, i) => {
                            res.rows[i].image = v.image ? JSON.parse(v.image) : [];
                            res.rows[i].master = 0;
                        });
                    }
                });
            }
        },
        beforeDestroy() {},
        watch: {
            input: function(v) {
                if (v) {
                    this.output = this.input
                    setTimeout(() => {
                        this.input = ''
                    }, 250);
                    // this.input = ''
                }
            },
            choose: function (v) {
                console.log(v)
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
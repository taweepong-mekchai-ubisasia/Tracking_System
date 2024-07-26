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
                <div class="modal-box w-11/12 max-w-7xl">
                    <label
                        for="modal-base"
                        class="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 class="text-lg font-bold text-primary">Logs of Lot : {{ base.form.lot }}</h3>
                    <hr class="mt-5" />
                    <div class="card-body overflow-auto" style="max-height: 76vh;">
                        <div class="grid gap-3 grid-cols-1 md:grid-cols-5">
                            <div class="join col-span-1">
                                <button class="join-item btn disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content" disabled>
                                    Lot :
                                </button>
                                <input
                                    type="text"
                                    placeholder="product"
                                    class="input input-bordered join-item w-[100%]"
                                    :value="base.form.lot"
                                    disabled
                                />
                            </div>

                            <div class="join col-span-1">
                                <button class="join-item btn disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content" disabled>
                                    Product :
                                </button>
                                <input
                                    type="text"
                                    placeholder="product"
                                    class="input input-bordered join-item w-[100%]"
                                    :value="base.form.parent"
                                    disabled
                                />
                            </div>

                            <div class="join col-span-1 md:col-span-2">
                                <button class="join-item btn disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content" disabled>
                                    Description :
                                </button>
                                <input
                                    type="text"
                                    placeholder="description"
                                    class="input input-bordered join-item w-[100%]"
                                    :value="base.form.descrip"
                                    disabled
                                />
                            </div>

                            <div class="join col-span-1 md:col-span-1">
                                <button class="join-item btn disabled:border-gray-300 disabled:bg-transparent disabled:text-base-content" disabled>
                                    Remaining :
                                </button>
                                <input
                                    type="text"
                                    placeholder="qty"
                                    class="input input-bordered join-item w-[100%]"
                                    :value="base.form.total_qty"
                                    disabled
                                />
                            </div>
                        </div>
                        <div class="p-3 border-dashed border-4 border-slate-300 rounded-2xl mt-3">
                            <div class="grid gap-3 grid-cols-2">
                                <div class="flex justify-start">
                                    <button
                                        class="join-item btn btn-xs btn-outline btn-primary"
                                        @click="exportExcel('detail')"
                                    >
                                        <Icon
                                        icon="mdi:file-excel-outline"
                                        class="h-5 w-5"
                                        />
                                        Excel
                                    </button>
                                </div>
                                <div class="flex justify-end">
                                    <AppModuleGlobalSearch
                                        :class="'join-item input input-xs input-bordered w-full max-w-xs'"
                                        @search="
                                        (q) => {
                                            detail.q = q;
                                            detail.page = 1;
                                            detail_search();
                                        }
                                        "
                                    />
                                </div>
                            </div>
                            <div class="overflow-x-auto mt-3 bg-slate-50 rounded-xl">
                                <table class="table table-zebra ">
                                    <!-- head -->
                                    <thead>
                                        <tr>
                                            <!-- <th>Code</th> -->
                                            <th>Ref</th>
                                            <th>Transaction Date</th>
                                            <th>Transaction Type</th>
                                            <th>Shelf Life</th>
                                            <th>Manufacturing Date</th>
                                            <th>Expire Date</th>
                                            <th>YMD Remaining</th>
                                            <th class="text-right">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-xs">
                                    <!-- row 1 -->
                                        <tr v-if="detail.total" :class="row.type == 'add' ? 'text-slate-500 hover' : 'text-error hover'" v-for="row in detail.rows">
                                            <!-- <td>
                                                <div class="flex items-center space-x-3">
                                                    <div>
                                                        <div class="font-bold">{{ row.code || '-' }}</div>
                                                        <div>({{ row.id }})</div>
                                                    </div>
                                                </div>
                                            </td> -->
                                            <td>{{ row.ref_code || '-' }}</td>
                                            <td>{{ $moment(row.created_at).format("DD-MM-YYYY HH:mm:ss") }}</td>
                                            <td>{{ row.type }}</td>
                                            <td>{{ base.form.shelf_life }}</td>
                                            <td>{{ row.mfg ? $moment(row.mfg).format("DD-MM-YYYY") : '-' }}</td>
                                            <td>{{ $moment(row.exp).format("DD-MM-YYYY") }}</td>
                                            <td>
                                                <div class="flex items-center space-x-3">
                                                    <div>
                                                        <div class="overflow-hidden text-ellipsis whitespace-nowrap">
                                                            {{
                                                                row.mfg && base.form.shelf_life
                                                                ? $moment
                                                                    .duration(
                                                                        $moment(row.mfg)
                                                                        .add(parseInt(base.form.shelf_life) + 1, "days")
                                                                        .diff($moment(new Date()), "days"),
                                                                        "days"
                                                                    )
                                                                    .years()
                                                                : "0"
                                                            }} Y
                                                            {{
                                                                row.mfg && base.form.shelf_life
                                                                ? $moment
                                                                    .duration(
                                                                        $moment(row.mfg)
                                                                        .add(parseInt(base.form.shelf_life) + 1, "days")
                                                                        .diff($moment(new Date()), "days"),
                                                                        "days"
                                                                    )
                                                                    .months()
                                                                : "0"
                                                            }} M
                                                            {{
                                                                row.mfg && base.form.shelf_life
                                                                ? $moment
                                                                    .duration(
                                                                        $moment(row.mfg)
                                                                        .add(parseInt(base.form.shelf_life) + 1, "days")
                                                                        .diff($moment(new Date()), "days"),
                                                                        "days"
                                                                    )
            
                                                                    .days()
                                                                : "0"
                                                            }} D
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="text-right">{{ row.quantity }}</td>
                                        </tr>
                                        <tr v-else>
                                            <td class="text-center" colspan="8">No data found.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="grid gap-3 grid-cols-2 mt-3">
                                <div class="text-left text-xs">
                                    Showing {{ detail.page == Math.ceil(detail.total/detail.row) ? 1 + (detail.row*(detail.page - 1)) : 1 + ((detail.page - 1)*detail.row) }} to {{ detail.page == Math.ceil(detail.total/detail.row) ? detail.total : detail.row*detail.page }} of {{ detail.total }} entries
                                </div>
                                <div class="join w-full justify-center lg:justify-end">
                                    <AppModuleGlobalPageination
                                        :page="detail.page"
                                        :total="detail.total"
                                        :row="detail.row"
                                        :back="detail.back"
                                        :next="detail.next"
                                        :loading="detail.loading"
                                        @search="
                                        (res) => {
                                            detail.page = res.page;
                                            this.detail_search();
                                        }
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #view>
            <div class="grid grid-cols-1 gap-6 lg:px-9 lg:py-3">
                <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
                    <div class="card-body overflow-auto">
                        <div class="grid gap-3 grid-cols-2">
                            <div class="flex justify-start">
                                <button
                                    class="join-item btn btn-sm btn-outline btn-primary"
                                    @click="exportExcel('base')"
                                >
                                    <Icon
                                    icon="mdi:file-excel-outline"
                                    class="h-5 w-5"
                                    />
                                    Excel
                                </button>
                            </div>
                            <div class="join w-full justify-end">
                                <AppModuleGlobalSearch
                                :class="'join-item input input-sm input-bordered w-full max-w-xs'"
                                @search="
                                    (q) => {
                                    base.q = q;
                                    base.page = 1;
                                    base_search();
                                    }
                                "
                                />
                            </div>
                        </div>
                        <div class="overflow-x-auto w-full max-h-[60vh] mt-1 border">
                            <!-- {{ base.rows }} -->
                            <table class="table table-xs table-pin-rows table-pin-cols table-zebra">
                                <thead>
                                    <tr class="bg-slate-100" style="z-index: 2;">
                                        <th rowspan="2">Lot</th>
                                        <td rowspan="2">Product</td>
                                        <td rowspan="2">Description</td>
                                        <td rowspan="2" class="text-right">Shelf Life</td>
                                        <td rowspan="2" class="text-center">MFG Date</td>
                                        <td rowspan="2" class="text-center">EXP Date</td>
                                        <td rowspan="2">YMD Remaining</td>
                                        <td rowspan="2" colspan="2" class="text-center">Pack Size</td>
                                        <td rowspan="1" colspan="5" class="text-center">Quantities</td>
                                        <td rowspan="2" colspan="2" class="text-center">Total<br>Summary</td>
                                        <td rowspan="2" class="text-center">Option</td>
                                    </tr>
                                    <tr class="bg-slate-100" style="z-index: 1;">
                                        <td class="text-right">Received</td>
                                        <td class="text-right">Picking</td>
                                        <td class="text-right">Delivering</td>
                                        <td class="text-right">Delivered</td>
                                        <td class="text-right">Remaining</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="base.total" v-for="(row, index) in base.rows" :key="row.code" :class="row.total_qty > '0' ? '' : 'text-slate-500'" style="word-wrap: break-word;">
                                        <th class="font-bold">{{ row.lot }}</th>
                                        <td>{{ row.parent }}</td>
                                        <td>{{ row.descrip }}</td>
                                        <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.shelf_life) }}</td>
                                        <td class="text-center">{{ $moment(row.mfg).format("DD-MM-YYYY") }}</td>
                                        <td class="text-center">{{ $moment(row.exp).format("DD-MM-YYYY") }}</td>
                                        <td>
                                            <div class="flex items-center space-x-3">
                                                <div>
                                                    <div class="overflow-hidden text-ellipsis whitespace-nowrap">
                                                        {{
                                                            row.mfg && row.shelf_life
                                                            ? $moment
                                                                .duration(
                                                                    $moment(row.mfg)
                                                                    .add(parseInt(row.shelf_life) + 1, "days")
                                                                    .diff($moment(new Date()), "days"),
                                                                    "days"
                                                                )
                                                                .years()
                                                            : "0"
                                                        }} Y
                                                        {{
                                                            row.mfg && row.shelf_life
                                                            ? $moment
                                                                .duration(
                                                                    $moment(row.mfg)
                                                                    .add(parseInt(row.shelf_life) + 1, "days")
                                                                    .diff($moment(new Date()), "days"),
                                                                    "days"
                                                                )
                                                                .months()
                                                            : "0"
                                                        }} M
                                                        {{
                                                            row.mfg && row.shelf_life
                                                            ? $moment
                                                                .duration(
                                                                    $moment(row.mfg)
                                                                    .add(parseInt(row.shelf_life) + 1, "days")
                                                                    .diff($moment(new Date()), "days"),
                                                                    "days"
                                                                )
        
                                                                .days()
                                                            : "0"
                                                        }} D
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-right">{{ new Intl.NumberFormat("en-US").format(row.pack_size) }}</td>
                                        <td>{{ row.unit || '-' }}</td>
                                        <td class="text-right font-medium" :class="index & 1 ? 'bg-blue-300' : 'bg-blue-200'">{{ new Intl.NumberFormat("en-US").format(parseFloat(Math.abs(row.pick_qty)) + parseFloat(Math.abs(row.carry_qty)) + parseFloat(Math.abs(row.issue_qty)) + parseFloat(row.total_qty || 0)) }}</td>
                                        <td class="text-right font-medium" :class="index & 1 ? 'bg-yellow-300' : 'bg-yellow-200'">{{ new Intl.NumberFormat("en-US").format(Math.abs(row.pick_qty)) }}</td>
                                        <td class="text-right font-medium" :class="index & 1 ? 'bg-orange-300' : 'bg-orange-200'">{{ new Intl.NumberFormat("en-US").format(Math.abs(row.carry_qty)) }}</td>
                                        <td class="text-right font-medium" :class="index & 1 ? 'bg-red-300' : 'bg-red-200'">{{ new Intl.NumberFormat("en-US").format(Math.abs(row.issue_qty)) }}</td>
                                        <td class="text-right font-medium" :class="index & 1 ? 'bg-emerald-300' : 'bg-emerald-200'">{{ new Intl.NumberFormat("en-US").format(row.total_qty || 0) }}</td>
                                        <td class="text-right">{{ new Intl.NumberFormat("en-US").format((row.total_qty || 0)*row.pack_size) }}</td>
                                        <td>{{ row.unit || '-' }}</td>
                                        <td class="text-right">
                                            <label
                                                for="modal-base"
                                                class="btn btn-ghost modal-button btn-xs text-slate-500 hover:text-black"
                                                @click="base_edit(`${row.code}`, `${index}`)"
                                            >
                                                <span class="underline underline-offset-2">Log</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr v-else>
                                        <td class="text-center" colspan="17">No data found.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="grid gap-3 grid-cols-2 mt-1">
                            <div class="text-left text-sm">
                                Showing {{ base.page == Math.ceil(base.total/base.row) ? 1 + (base.row*(base.page - 1)) : 1 + ((base.page - 1)*base.row) }} to {{ base.page == Math.ceil(base.total/base.row) ? base.total : base.row*base.page }} of {{ base.total }} entries
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
import Query from "@/assets/js/fetch.js";

export default {
    name: "StockOnHandByLot",
    components: {
        AppLayout,
        AppModuleGlobalUpload,
        AppModuleGlobalPageination,
        AppModuleGlobalSelectSearch,
        AppModuleGlobalSearch,
        AppModuleGlobalShowImage
    },
    data() {
        return {
            refresh: false,
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
            }
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
        exportExcel(controll) {
            // console.log(this.base.form)

            if (controll == 'base') {
                return window.open(`${
                    this.serviceUrl
                }api/controllers/MYSQL/INTERNAL/WMS/exports?for=bylot&forselect=1&total=1${
                    this.base.q ? `&q=${this.base.q}` : ""
                }`);
            } else {
                return window.open(`${
                    this.serviceUrl
                }api/controllers/MYSQL/INTERNAL/WMS/exports?for=forlog&parent=${this.base.form.parent}&descrip=${this.base.form.descrip}&total=1${
                    this.detail.q ? `&q=${this.detail.q}` : ""
                }`);
            }
        },
        dateNow() {
            let d = new Date();
            return d.getFullYear() + '-' + (d.getMonth() >= 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
        },
        ymd(start, life) {
            let expire = new Date((new Date(start)).getTime() + life * 86400E3);
            return expire.getFullYear() + '-' + (expire.getMonth() >= 9 ? expire.getMonth() + 1 : '0' + (expire.getMonth() + 1)) + '-' + (expire.getDate() > 9 ? expire.getDate() : '0' + expire.getDate());
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
            new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs?forselect=1&total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}${this.base.q ? `&q=${this.base.q}` : ""}`, (res) => {
                if (res.success) {
                    // console.log(res)

                    res.rows.forEach((v, i) => {
                        res.rows[i].image = v.image ? JSON.parse(v.image) : [];
                        res.rows[i].master = 0;
                    });
                }
                callback({ ...res });
            });
        },
        base_edit(code, index) {
            this.detail.page = 1
            this.base.form = { ...this.base.rows[index] };
            this.base.current = code;
            this.detail.rows = [];
            this.base.controll = "edit";
            this.detail_search();
            this.refresh = true;
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
            new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs?lot=${this.base.form.lot}&total=1&page=${this.detail.page}${this.detail.row ? `&rows=${this.detail.row}` : ""}${this.detail.q ? `&q=${this.detail.q}` : ""}`, (res) => {
                if (res.success) {
                res.rows.forEach((v, i) => {
                    res.rows[i].image = v.image ? JSON.parse(v.image) : [];
                    res.rows[i].master = 0;
                });
                }
                callback({ ...res });
            });
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.base_search();
        });
    },
    watch: {
        base: function (v) {
            // console.log(v);
        },
        detail: function (v) {
            // console.log(v);
        }
    }
};
</script>

<style scrop>
    tr,
    td {
        white-space: nowrap;
    }
</style>
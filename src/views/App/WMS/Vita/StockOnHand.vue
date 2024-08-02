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
                    <h3 class="text-lg font-bold text-primary">Logs of Product</h3>
                    <hr class="mt-5" />
                    <div class="card-body overflow-auto">
                        <div class="grid gap-3 grid-cols-1 md:grid-cols-6">
                            <div class="join col-span-1 md:col-span-2">
                                <span class="btn join-item">Product :</span>
                                <input
                                    type="text"
                                    placeholder="product"
                                    class="input input-bordered join-item w-[100%]"
                                    :value="base.form.product"
                                    readonly
                                />
                            </div>

                            <div class="join col-span-1 md:col-span-3">
                                <span class="btn join-item">Description :</span>
                                <input
                                    type="text"
                                    placeholder="description"
                                    class="input input-bordered join-item w-[100%]"
                                    :value="base.form.descrip"
                                    readonly
                                />
                            </div>

                            <div class="join col-span-1 md:col-span-1">
                                <span class="btn join-item">Remaining :</span>
                                <input
                                    type="text"
                                    placeholder="qty"
                                    class="input input-bordered join-item w-[100%]"
                                    :value="base.form.total_qty"
                                    readonly
                                />
                            </div>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="table table-zebra">
                                <!-- head -->
                                <thead>
                                    <tr>
                                        <th>Lot No.</th>
                                        <th>Transaction Date</th>
                                        <th>Transaction Type</th>
                                        <th>Shelf Life</th>
                                        <th>Manufacturing Date</th>
                                        <th>Expire Date</th>
                                        <th>YMD Remaining</th>
                                        <th>Quantitys</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <!-- row 1 -->
                                    <tr :class="row.type == 'add' ? 'text-slate-500 hover' : 'text-error hover'" v-for="row in detail.rows">
                                        <th>{{ row.lot }}</th>
                                        <td>{{ row.created_at }}</td>
                                        <td>{{ row.type }}</td>
                                        <td>{{ base.form.shelf_life }}</td>
                                        <td>{{ row.mfg || '-' }}</td>
                                        <td>{{ row.exp }}</td>
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
                                        <td>{{ row.quantity }}</td>
                                    </tr>
                                </tbody>
                            </table>
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
        </template>
        <template #view>
            <div class="grid grid-cols-1 gap-6 lg:px-9 lg:py-5">
                <div class="card col-span-4 row-span-4 shadow-lg bg-base-100">
                    <div class="card-body overflow-auto">
                        <div class="join mt-5 w-full md:justify-center lg:justify-end">
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
                        <div class="overflow-x-auto w-full max-h-[60vh] mt-9">
                            <!-- {{ base.rows }} -->
                            <table
                                class="table table-xs table-pin-rows table-pin-cols table-zebra"
                            >
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <td>Product</td>
                                        <td>Description</td>
                                        <td>Shelf Life</td>
                                        <td>Total Qtys</td>
                                        <td>Picking</td>
                                        <td>Delivered</td>
                                        <td>Remaining</td>
                                        <td>Pack Size</td>
                                        <td>Unit</td>
                                        <th class="text-right"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, index) in base.rows" :key="row.code" :class="row.total_qty ? 'hover' : 'text-slate-500 hover'">
                                        <th>{{ index + 1 }}</th>
                                        <td>{{ row.product }}</td>
                                        <td>{{ row.descrip }}</td>
                                        <td>{{ new Intl.NumberFormat("en-US").format(row.shelf_life) }}</td>
                                        <td class="w-24 font-medium bg-blue-200">{{ new Intl.NumberFormat("en-US").format(parseFloat(Math.abs(row.pick_qty)) + parseFloat(Math.abs(row.out_qty)) + parseFloat(row.total_qty || 0)) }}</td>
                                        <td class="w-24 font-medium bg-yellow-200">{{ new Intl.NumberFormat("en-US").format(Math.abs(row.pick_qty)) }}</td>
                                        <td class="w-24 font-medium bg-rose-200">{{ new Intl.NumberFormat("en-US").format(Math.abs(row.out_qty)) }}</td>
                                        <td class="w-24 font-medium bg-emerald-200">{{ new Intl.NumberFormat("en-US").format(row.total_qty || 0) }}</td>
                                        <td>{{ new Intl.NumberFormat("en-US").format(row.pack_size) }}</td>
                                        <td>{{ row.unit }}</td>
                                        <th class="text-right">
                                            <label
                                                for="modal-base"
                                                class="btn btn-link modal-button btn-xs"
                                                @click="base_edit(`${row.code}`, `${index}`)"
                                            >
                                                Logs
                                            </label>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- <div class="join w-full justify-center lg:justify-end">
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
    name: "Stock",
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
            sum: 0,
            edit: false,
            loadimage: false,
            options: {
                penColor: "#c0f"
            },
            checkbox: "",
            refresh: false,
            tmpsLink: "",
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
                row: 5,
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
            new Query('base','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/prod?vita=true&received=1&groupby=true&total=1&page=${this.base.page}${this.base.row ? `&rows=${this.base.row}` : ""}`, (res) => {
                if (res.success) {
                    console.log(res)

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
            new Query('detail','get').get(this, `${this.serviceUrl}api/controllers/MYSQL/INTERNAL/WMS/logs?parent=${this.base.form.product}&descrip=${this.base.form.descrip}&total=1&page=${this.detail.page}${this.detail.row ? `&rows=${this.detail.row}` : ""}`, (res) => {
                if (res.success) {
                res.rows.forEach((v, i) => {
                    res.rows[i].image = v.image ? JSON.parse(v.image) : [];
                    res.rows[i].master = 0;
                });
                }
                callback({ ...res });
            });
        },
        detail_edit(code, index) {
            this.msg.product = ''

            this.detail.form = Object.assign({}, this.detail.rows[index]);
            this.detail.current = code;
            this.item.rows = [];
            this.detail.controll = "edit";
            this.item_search();
            this.refresh = true;
            this.edit = true;
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.base_search();
            this.tmpsLink = `${
            window.location.origin == "http://localhost:80811"
                ? `http://localhost:8080/kay/rewrite_demo/services/`
                : `${window.location.origin}/services/`
            }tmps/`;
        });
    },
    watch: {}
};
</script>
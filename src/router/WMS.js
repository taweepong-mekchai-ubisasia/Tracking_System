import WMSUbisReport from "../views/App/WMS/Ubis/Report.vue";
import WMSUbisTransporation from "../views/App/WMS/Ubis/Transporation.vue";
import WMSUbisDefault1 from "../views/App/WMS/Ubis/Default1.vue";
import WMSUbisDefault2 from "../views/App/WMS/Ubis/Default2.vue";
import WMSUbisDefault3 from "../views/App/WMS/Ubis/Default3.vue";
import WMSUbisDefault4 from "../views/App/WMS/Ubis/Default4.vue";

import WMSVitaScanToReceive from "../views/App/WMS/Vita/ScanToReceive.vue";
import WMSVitaReceive from "../views/App/WMS/Vita/Receive.vue";
import WMSVitaPickPack from "../views/App/WMS/Vita/PickAndPack.vue";
import WMSVitaDeliver from "../views/App/WMS/Vita/Deliver.vue";
import WMSVitaCustomer from "../views/App/WMS/Vita/Customer.vue";
import WMSVitaStockOnHand from "../views/App/WMS/Vita/StockOnHand.vue";
// import WMSVitaStockOnHandByLot from "../views/App/WMS/Vita/StockOnHand_ByLot.vue";
const WMSRoutes = [
    {
    path: "/WMS/Ubis/Report",
    name: "WMSUbisReport",
    component: WMSUbisReport,
    props: { default: true, menu: true, type: "member" },
    },
    {
    path: "/WMS/Ubis/Transporation",
    name: "WMSUbisTransporation",
    component: WMSUbisTransporation,
    props: { default: true, menu: true, type: "member" },
    },
    {
    path: "/WMS/Ubis/Default1",
    name: "WMSUbisDefault1",
    component: WMSUbisDefault1,
    props: { default: true, menu: true, type: "member" },
    },
    {
    path: "/WMS/Ubis/Default2",
    name: "WMSUbisDefault2",
    component: WMSUbisDefault2,
    props: { default: true, menu: true, type: "member" },
    },
    {
    path: "/WMS/Ubis/Default3",
    name: "WMSUbisDefault3",
    component: WMSUbisDefault3,
    props: { default: true, menu: true, type: "member" },
    },
    {
    path: "/WMS/Ubis/Default4",
    name: "WMSUbisDefault4",
    component: WMSUbisDefault4,
    props: { default: true, menu: true, type: "member" },
    },
    {
    path: "/WMS/Vita/ScanToReceive",
    name: "WMSVitaScanToReceive",
    component: WMSVitaScanToReceive,
    props: { default: true, menu: true, type: "member" },
    },
    {
    path: "/WMS/Vita/Management",
    name: "WMSVitaReceive",
    component: WMSVitaReceive,
    props: { default: true, menu: true, type: "member" },
    },
    {
    path: "/WMS/Vita/PickAndPack",
    name: "WMSVitaPickPack",
    component: WMSVitaPickPack,
    props: { default: true, menu: true, type: "member" },
    },
    {
    path: "/WMS/Vita/Deliver",
    name: "WMSVitaDeliver",
    component: WMSVitaDeliver,
    props: { default: true, menu: true, type: "member" },
    },
    {
    path: "/WMS/Vita/Customer",
    name: "WMSVitaCustomer",
    component: WMSVitaCustomer,
    props: { default: true, menu: true, type: "member" },
    },
    {
    path: "/WMS/Vita/StockOnHand",
    name: "WMSVitaStockOnHand",
    component: WMSVitaStockOnHand,
    props: { default: true, menu: true, type: "member" },
    },
    // {
    // path: "/WMS/Vita/StockOnHandByProduct",
    // name: "WMSVitaStockOnHand",
    // component: WMSVitaStockOnHand,
    // props: { default: true, menu: true, type: "member" },
    // },
    // {
    // path: "/WMS/Vita/StockOnHandByLot",
    // name: "WMSVitaStockOnHandByLot",
    // component: WMSVitaStockOnHandByLot,
    // props: { default: true, menu: true, type: "member" },
    // },
];
export default WMSRoutes;

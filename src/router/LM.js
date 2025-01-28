import LMTransportationReport from "../views/App/LM/Transportation/Report.vue";
import LMTransportationVita from "../views/App/LM/Transportation/Vita.vue";
// import LMTransportationStockOnHand from "../views/App/LM/Transportation/StockOnHand.vue";
//---------------------------------
import LMVitaReceive from "../views/App/LM/Vita/Receive.vue";
import LMVitaPacking from "../views/App/LM/Vita/Packing.vue";
import LMVitaReport from "../views/App/LM/Vita/Report.vue";
import LMVitaStockOnHand from "../views/App/LM/Vita/StockOnHand.vue";

import LMMapsExample from "../views/App/LM/Maps/Example.vue";
const LMRoutes = [
  {
    path: "/LM/Transportation/Report",
    name: "LMTransportationReport",
    component: LMTransportationReport,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/LM/Transportation/Vita",
    name: "LMTransportationVita",
    component: LMTransportationVita,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/LM/Vita/Receive",
    name: "LMVitaReceive",
    component: LMVitaReceive,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/LM/Vita/Packing",
    name: "LMVitaPacking",
    component: LMVitaPacking,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/LM/Vita/Report",
    name: "LMVitaReport",
    component: LMVitaReport,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/LM/Vita/StockOnHand",
    name: "LMVitaStockOnHand",
    component: LMVitaStockOnHand,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/LM/Maps/Example",
    name: "LMMapsExample",
    component: LMMapsExample,
    props: { default: true, menu: true, type: "member" },
  },
];
export default LMRoutes;

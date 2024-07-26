import LabelPrintPD from "../views/App/LabelPrint/PD.vue";
import LabelPrintHistory from "../views/App/LabelPrint/History.vue";
import LabelPrintLabel from "../views/App/LabelPrint/Label.vue";
import LabelPrintTemplate from "../views/App/LabelPrint/Template.vue";
import LabelPrintSticker from "../views/App/LabelPrint/Sticker.vue";



const LabelPrintRoutes = [
  {
    path: "/LabelPrint/PD",
    name: "LabelPrintPD",
    component: LabelPrintPD,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/LabelPrint/History",
    name: "LabelPrintHistory",
    component: LabelPrintHistory,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/LabelPrint/Label",
    name: "LabelPrintLabel",
    component: LabelPrintLabel,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/LabelPrint/Template",
    name: "LabelPrintTemplate",
    component: LabelPrintTemplate,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/LabelPrint/Sticker",
    name: "LabelPrintSticker",
    component: LabelPrintSticker,
    props: { default: true, menu: true, type: "member" },
  },
  
];
export default LabelPrintRoutes;

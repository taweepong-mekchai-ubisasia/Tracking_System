import QCInspecReport from "../views/App/QC/Inspec/Report.vue";
import QCInspecRM from "../views/App/QC/Inspec/RM.vue";
import QCInspecFG from "../views/App/QC/Inspec/FG.vue";
import QCInspecPD from "../views/App/QC/Inspec/PD.vue";
import QCInspecTrackeability from "../views/App/QC/Inspec/Trackeability.vue";

import QCPickupRequest from "../views/App/QC/Pickup/Request.vue";
import QCPickupApprove from "../views/App/QC/Pickup/Approve.vue";
import QCWHRetainManagement from "../views/App/QC/WHRetain/Management.vue";
import QCWHRetainShortCode from "../views/App/QC/WHRetain/ShortCode.vue";
const QCRouter = [
  {
    path: "/QC/Pickup/Request",
    name: "QCPickupRequest",
    component: QCPickupRequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QC/Pickup/Approve",
    name: "QCPickupApprove",
    component: QCPickupApprove,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/QC/WH/Management",
    name: "QCWHRetainManagement",
    component: QCWHRetainManagement,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QC/WH/ShortCode",
    name: "QCWHRetainShortCode",
    component: QCWHRetainShortCode,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/QC/Inspec/Report",
    name: "QCInspecReport",
    component: QCInspecReport,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/QC/Inspec/RM",
    name: "QCInspecRM",
    component: QCInspecRM,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/QC/InspecFG",
    name: "QCInspecFG",
    component: QCInspecFG,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/QC/InspecPD",
    name: "QCInspecPD",
    component: QCInspecPD,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/QC/Inspec/Trackeability",
    name: "QCInspecTrackeability",
    component: QCInspecTrackeability,
    props: { default: true, menu: true, type: "member" },
  },
];
export default QCRouter;

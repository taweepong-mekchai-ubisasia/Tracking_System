import WHBinLocationCheckRac from "../views/App/IM/BinLocation/CheckRac.vue";
import WHBinLocationManagement from "../views/App/IM/BinLocation/Management.vue";
import WHBinLocationShortCode from "../views/App/IM/BinLocation/ShortCode.vue";
//---------------------------------
import WHItemRequest from "../views/App/IM/Item/Request.vue";
import WHItemApprove from "../views/App/IM/Item/Approve.vue";
//---------------------------------
import WHTracking from "../views/App/IM/Tracking.vue";
//---------------------------------
import WHReportInvenStatus from "../views/App/IM/Report/inven_status.vue";
import IMReportExpiryInspec from "../views/App/IM/Report/expiry_report.vue";
import IMReportAgingSummary from "../views/App/IM/Report/aging_report.vue";
const WHRoutes = [
  {
    path: "/IM/BinLocation/CheckRac",
    name: "WHBinLocationCheckRac",
    component: WHBinLocationCheckRac,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IM/BinLocation/Management",
    name: "WHBinLocationManagement",
    component: WHBinLocationManagement,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IM/BinLocation/ShortCode",
    name: "WHBinLocationShortCode",
    component: WHBinLocationShortCode,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IM/Item/Request",
    name: "WHItemRequest",
    component: WHItemRequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IM/Item/Approve",
    name: "WHItemApprove",
    component: WHItemApprove,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IM/Tracking",
    name: "WHTracking",
    component: WHTracking,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IM/Report/InventoryStatusMovement",
    name: "WHReportInvenStatus",
    component: WHReportInvenStatus,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IM/Report/ExpiryDateInspec",
    name: "IMReportExpiryInspec",
    component: IMReportExpiryInspec,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IM/Report/AgingSummary",
    name: "IMReportAgingSummary",
    component: IMReportAgingSummary,
    props: { default: true, menu: true, type: "member" },
  },
];
export default WHRoutes;

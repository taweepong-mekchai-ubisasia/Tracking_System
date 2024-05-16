import WHBinLocationCheckRac from "../views/App/WH/BinLocation/CheckRac.vue";
import WHBinLocationManagement from "../views/App/WH/BinLocation/Management.vue";
import WHBinLocationShortCode from "../views/App/WH/BinLocation/ShortCode.vue";
//---------------------------------
import WHItemRequest from "../views/App/WH/Item/Request.vue";
import WHItemApprove from "../views/App/WH/Item/Approve.vue";
//---------------------------------
import WHTracking from "../views/App/WH/Tracking.vue";
const WHRoutes = [
  {
    path: "/WH/BinLocation/CheckRac",
    name: "WHBinLocationCheckRac",
    component: WHBinLocationCheckRac,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/WH/BinLocation/Management",
    name: "WHBinLocationManagement",
    component: WHBinLocationManagement,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/WH/BinLocation/ShortCode",
    name: "WHBinLocationShortCode",
    component: WHBinLocationShortCode,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/WH/Item/Request",
    name: "WHItemRequest",
    component: WHItemRequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/WH/Item/Approve",
    name: "WHItemApprove",
    component: WHItemApprove,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/WH/Tracking",
    name: "WHTracking",
    component: WHTracking,
    props: { default: true, menu: true, type: "member" },
  },
];
export default WHRoutes;

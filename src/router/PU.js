import PUPORequest_old from "../views/App/PU/Purchase/request.vue";
import PUPOApprove_old from "../views/App/PU/Purchase/approve.vue";
import PUPORecruitment_old from "../views/App/PU/Purchase/recruitment.vue";
import PUPOOrder_old from "../views/App/PU/Purchase/order.vue";
import PUPOFollow_old from "../views/App/PU/Purchase/follow.vue";
import PUPOSupplier_old from "../views/App/PU/Purchase/supplier.vue";
import PUPOReceive_old from "../views/App/PU/Purchase/receive.vue";
//---------------------------------
import PUPRRequest from "../views/App/PU/PR/Request.vue";
import PUPRApprove from "../views/App/PU/PR/Approve.vue";
import PUPORequest from "../views/App/PU/PO/Request.vue";
import PUPOApprove from "../views/App/PU/PO/Approve.vue";
//---------------------------------
import PUPOData from "../views/App/PU/Report/allpo.vue";
import PULatest from "../views/App/PU/Report/indirectpo.vue";
import PUReport from "../views/App/PU/Report/report.vue";
const PURouter = [
  {
    path: "/PU/Request",
    name: "PUPORequestOld",
    component: PUPORequest_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PU/Approve",
    name: "PUPOApproveOld",
    component: PUPOApprove_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PU/Recruitment",
    name: "PUPORecruitmentOld",
    component: PUPORecruitment_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PU/Order",
    name: "PUPOOrderOld",
    component: PUPOOrder_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PU/Follow",
    name: "PUPOFollowOld",
    component: PUPOFollow_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PU/Supplier",
    name: "PUPOSupplierOld",
    component: PUPOSupplier_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PU/Receive",
    name: "PUPOReceiveOld",
    component: PUPOReceive_old,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/PU/PR/Request",
    name: "PUPRRequest",
    component: PUPRRequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PU/PR/Approve",
    name: "PUPRApprove",
    component: PUPRApprove,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/PU/PO/Request",
    name: "PUPORequest",
    component: PUPORequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PU/PO/Approve",
    name: "PUPOApprove",
    component: PUPOApprove,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/PU/Report/PurchaseApprover",
    name: "PUPOData",
    component: PUPOData,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PU/Report/LatestIndirectPurchase",
    name: "PULatest",
    component: PULatest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PU/Report/PRtoPO",
    name: "PUReport",
    component: PUReport,
    props: { default: true, menu: true, type: "member" },
  },
];
export default PURouter;

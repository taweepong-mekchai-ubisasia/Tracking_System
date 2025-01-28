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
import PUReport from "../views/App/PU/Report/daycountpo.vue";
const PURouter = [
  {
    path: "/IndirectManagement/Request",
    name: "PUPORequestOld",
    component: PUPORequest_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IndirectManagement/Approve",
    name: "PUPOApproveOld",
    component: PUPOApprove_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IndirectManagement/Recruitment",
    name: "PUPORecruitmentOld",
    component: PUPORecruitment_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IndirectManagement/Order",
    name: "PUPOOrderOld",
    component: PUPOOrder_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IndirectManagement/Follow",
    name: "PUPOFollowOld",
    component: PUPOFollow_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IndirectManagement/Supplier",
    name: "PUPOSupplierOld",
    component: PUPOSupplier_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IndirectManagement/Receive",
    name: "PUPOReceiveOld",
    component: PUPOReceive_old,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/IndirectManagement/PR/Request",
    name: "PUPRRequest",
    component: PUPRRequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IndirectManagement/PR/Approve",
    name: "PUPRApprove",
    component: PUPRApprove,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/IndirectManagement/PO/Request",
    name: "PUPORequest",
    component: PUPORequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IndirectManagement/PO/Approve",
    name: "PUPOApprove",
    component: PUPOApprove,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/IndirectManagement/Report/PurchaseApprover",
    name: "PUPOData",
    component: PUPOData,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IndirectManagement/Report/LatestIndirectPurchase",
    name: "PULatest",
    component: PULatest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IndirectManagement/Report/PRtoPO",
    name: "PUReport",
    component: PUReport,
    props: { default: true, menu: true, type: "member" },
  },
];
export default PURouter;

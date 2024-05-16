import PURPORequest_old from "../views/App/PUR/request.vue";
import PURPOApprove_old from "../views/App/PUR/approve.vue";
import PURPORecruitment_old from "../views/App/PUR/recruitment.vue";
import PURPOOrder_old from "../views/App/PUR/order.vue";
import PURPOFollow_old from "../views/App/PUR/follow.vue";
import PURPOSupplier_old from "../views/App/PUR/supplier.vue";
import PURPOReceive_old from "../views/App/PUR/receive.vue";
//---------------------------------
import PURPRRequest from "../views/App/PUR/PR/Request.vue";
import PURPRApprove from "../views/App/PUR/PR/Approve.vue";
import PURPORequest from "../views/App/PUR/PO/Request.vue";
import PURPOApprove from "../views/App/PUR/PO/Approve.vue";
const PURRouter = [
  {
    path: "/PUR/Request",
    name: "PURPORequestOld",
    component: PURPORequest_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PUR/Approve",
    name: "PURPOApproveOld",
    component: PURPOApprove_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PUR/Recruitment",
    name: "PURPORecruitmentOld",
    component: PURPORecruitment_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PUR/Order",
    name: "PURPOOrderOld",
    component: PURPOOrder_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PUR/Follow",
    name: "PURPOFollowOld",
    component: PURPOFollow_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PUR/Supplier",
    name: "PURPOSupplierOld",
    component: PURPOSupplier_old,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PUR/Receive",
    name: "PURPOReceiveOld",
    component: PURPOReceive_old,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/PUR/PR/Request",
    name: "PURPRRequest",
    component: PURPRRequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PUR/PR/Approve",
    name: "PURPRApprove",
    component: PURPRApprove,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/PUR/PO/Request",
    name: "PURPORequest",
    component: PURPORequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PUR/PO/Approve",
    name: "PURPOApprove",
    component: PURPOApprove,
    props: { default: true, menu: true, type: "member" },
  },
];
export default PURRouter;

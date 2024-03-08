import { createRouter, createWebHistory } from "vue-router";

import Index from "../views/App/Index.vue";
import Login from "../views/App/Login.vue";
import PageNotFound from "../views/PageNotFound.vue";

import WHBinLocation from "../views/App/WH/BinLocation.vue";
import WHShortCode from "../views/App/WH/ShortCode.vue";
import WHTracking from "../views/App/WH/Tracking.vue";

import HREmployee from "../views/App/HR/Employee.vue";

import SystemAccess from "../views/App/System/Access.vue";
import SystemDepartment from "../views/App/System/Department.vue";
import SystemBranch from "../views/App/System/Branch.vue";
import SystemCompany from "../views/App/System/Company.vue";

import ACBudgetGroup from "../views/App/AC/BudgetGroup.vue";
import ACBudgetRequest from "../views/App/AC/BudgetRequest.vue";
import ACBudgetRequestOverApprove from "../views/App/AC/BudgetRequestOverApprove.vue";
import ACBudgetRequestReport from "../views/App/AC/BudgetRequestReport.vue";

import PDPORequest from "../views/App/PD/request.vue";
import PDPOApprove from "../views/App/PD/approve.vue";
import PDPOComplete from "../views/App/PD/complete.vue";
import PUPORequest from "../views/App/PU/request.vue";
import PUPOApprove from "../views/App/PU/approve.vue";
import PUPORecruitment from "../views/App/PU/recruitment.vue";
import PUPOOrder from "../views/App/PU/order.vue";
import PUPOFollow from "../views/App/PU/follow.vue";
import PUPOSupplier from "../views/App/PU/supplier.vue";
import PUPOReceive from "../views/App/PU/receive.vue";

import RDQCInspec from "../views/App/RD/QCInspec.vue";
const routes = [
  {
    path: "/App/404",
    name: "404",
    component: PageNotFound,
  },
  {
    path: "/:pathMatch(.*)*",
    beforeEnter(to) {
      window.location = `/App/Login`;
    },
  },
  {
    path: "/App/",
    name: "Dashboard",
    component: Index,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/App/Login",
    name: "AppLogin",
    component: Login,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/App/WH/Tracking",
    name: "WHTracking",
    component: WHTracking,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/App/WH/BinLocation",
    name: "WHBinLocation",
    component: WHBinLocation,
    props: { default: true, menu: true, type: "member" },
    params: { title: "test title" },
  },
  {
    path: "/App/WH/ShortCode",
    name: "WHShortCode",
    component: WHShortCode,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/HR/Employee",
    name: "HREmployee",
    component: HREmployee,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/System/Access",
    name: "SystemAccess",
    component: SystemAccess,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/System/Department",
    name: "SystemDepartment",
    component: SystemDepartment,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/System/Branch",
    name: "SystemBranch",
    component: SystemBranch,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/System/Company",
    name: "SystemCompany",
    component: SystemCompany,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/AC/BudgetGroup",
    name: "ACBudgetGroup",
    component: ACBudgetGroup,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/AC/BudgetRequest",
    name: "ACBudgetRequest",
    component: ACBudgetRequest,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/AC/BudgetRequestOverApprove",
    name: "ACBudgetRequestOverApprove",
    component: ACBudgetRequestOverApprove,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/AC/BudgetRequestReport",
    name: "ACBudgetRequestReport",
    component: ACBudgetRequestReport,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/RD/Request",
    name: "RDQCInspec",
    component: RDQCInspec,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PD/Request",
    name: "PDPORequest",
    component: PDPORequest,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PD/Approve",
    name: "PDPOApprove",
    component: PDPOApprove,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PD/Complete",
    name: "PDPOComplete",
    component: PDPOComplete,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/PU/Request",
    name: "PUPORequest",
    component: PUPORequest,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PU/Approve",
    name: "PUPOApprove",
    component: PUPOApprove,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PU/Recruitment",
    name: "PUPORecruitment",
    component: PUPORecruitment,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/PU/Order",
    name: "PUPOOrder",
    component: PUPOOrder,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/PU/Follow",
    name: "PUPOFollow",
    component: PUPOFollow,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/PU/Supplier",
    name: "PUPOSupplier",
    component: PUPOSupplier,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PU/Receive",
    name: "PUPOReceive",
    component: PUPOReceive,
    props: { default: true, menu: true, type: "default" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

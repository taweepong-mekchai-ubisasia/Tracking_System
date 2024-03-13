import { createRouter, createWebHistory } from "vue-router";

import Index from "../views/App/Index.vue";
import Login from "../views/App/Login.vue";
import PageNotFound from "../views/PageNotFound.vue";

import WHBinLocationManagement from "../views/App/WH/BinLocation/Management.vue";
import WHBinLocationShortCode from "../views/App/WH/BinLocation/ShortCode.vue";

import WHItemRequest from "../views/App/WH/Item/Request.vue";
import WHItemApprove from "../views/App/WH/Item/Approve.vue";

import WHTracking from "../views/App/WH/Tracking.vue";

import HREmployee from "../views/App/HR/Employee.vue";

import SystemAccess from "../views/App/System/Access.vue";
import SystemDepartment from "../views/App/System/Department.vue";
import SystemBranch from "../views/App/System/Branch.vue";
import SystemCompany from "../views/App/System/Company.vue";

import SuperDataMaterialRawMaterial from "../views/App/SuperData/Material/RawMaterial.vue";
import SuperDataMaterialMasterFormula from "../views/App/SuperData/Material/MasterFormula.vue";
import SuperDataMaterialProductCost from "../views/App/SuperData/Material/ProductCost.vue";

import ACBudgetGroup from "../views/App/AC/BudgetGroup.vue";
import ACBudgetRequest from "../views/App/AC/BudgetRequest.vue";
import ACBudgetRequestOverApprove from "../views/App/AC/BudgetRequestOverApprove.vue";
import ACBudgetRequestReport from "../views/App/AC/BudgetRequestReport.vue";

import ACCostCalculateDashboard from "../views/App/AC/CostCalculate/Dashboard.vue";
import ACCostCalculateCostView from "../views/App/AC/CostCalculate/CostView.vue";
import ACCostCalculateCostAdjust from "../views/App/AC/CostCalculate/CostAdjust.vue";
import ACCostCalculateCostCustom from "../views/App/AC/CostCalculate/CostCustom.vue";
import ACCostCalculateReport from "../views/App/AC/CostCalculate/Report.vue";

    

import PDPORequest from "../views/App/PD/request.vue";
import PDPOApprove from "../views/App/PD/approve.vue";
import PDPOComplete from "../views/App/PD/complete.vue";

import PURPORequest_old from "../views/App/PUR/request.vue";
import PURPOApprove_old from "../views/App/PUR/approve.vue";
import PURPORecruitment_old from "../views/App/PUR/recruitment.vue";
import PURPOOrder_old from "../views/App/PUR/order.vue";
import PURPOFollow_old from "../views/App/PUR/follow.vue";
import PURPOSupplier_old from "../views/App/PUR/supplier.vue";
import PURPOReceive_old from "../views/App/PUR/receive.vue";

import PURPRRequest from "../views/App/PUR/PR/Request.vue";
import PURPRApprove from "../views/App/PUR/PR/Approve.vue";
import PURPORequest from "../views/App/PUR/PO/Request.vue";
import PURPOApprove from "../views/App/PUR/PO/Approve.vue";

    

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
    path: "/App/WH/BinLocation/Management",
    name: "WHBinLocationManagement",
    component: WHBinLocationManagement,
    props: { default: true, menu: true, type: "member" },
    params: { title: "test title" },
  },
  {
    path: "/App/WH/BinLocation/ShortCode",
    name: "WHBinLocationShortCode",
    component: WHBinLocationShortCode,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/App/WH/Item/Request",
    name: "WHItemRequest",
    component: WHItemRequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/App/WH/Item/Approve",
    name: "WHItemApprove",
    component: WHItemApprove,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/App/WH/Tracking",
    name: "WHTracking",
    component: WHTracking,
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
    path: "/SuperData/Material/RawMaterial",
    name: "SuperDataMaterialRawMaterial",
    component: SuperDataMaterialRawMaterial,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/SuperData/Material/MasterFormula",
    name: "SuperDataMaterialMasterFormula",
    component: SuperDataMaterialMasterFormula,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/SuperData/Material/ProductCost",
    name: "SuperDataMaterialProductCost",
    component: SuperDataMaterialProductCost,
    props: { default: true, menu: true, type: "default" },
  },
  
  

  {
    path: "/AC/CostCalculate/Dashboard",
    name: "ACCostCalculateDashboard",
    component: ACCostCalculateDashboard,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/AC/CostCalculate/CostView",
    name: "ACCostCalculateCostView",
    component: ACCostCalculateCostView,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/AC/CostCalculate/CostAdjust",
    name: "ACCostCalculateCostAdjust",
    component: ACCostCalculateCostAdjust,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/AC/CostCalculate/Custom",
    name: "ACCostCalculateCostCustom",
    component: ACCostCalculateCostCustom,
    props: { default: true, menu: true, type: "default" }, 
  },
  {
    path: "/AC/CostCalculate/Report",
    name: "ACCostCalculateReport",
    component: ACCostCalculateReport,
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
    path: "/PUR/Request",
    name: "PURPORequestOld",
    component: PURPORequest_old,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PUR/Approve",
    name: "PURPOApproveOld",
    component: PURPOApprove_old,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PUR/Recruitment",
    name: "PURPORecruitmentOld",
    component: PURPORecruitment_old,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PUR/Order",
    name: "PURPOOrderOld",
    component: PURPOOrder_old,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PUR/Follow",
    name: "PURPOFollowOld",
    component: PURPOFollow_old,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PUR/Supplier",
    name: "PURPOSupplierOld",
    component: PURPOSupplier_old,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PUR/Receive",
    name: "PURPOReceiveOld",
    component: PURPOReceive_old,
    props: { default: true, menu: true, type: "default" },
  },


  
  {
    path: "/PUR/PR/Request",
    name: "PURPRRequest",
    component: PURPRRequest,
    props: { default: true, menu: true, type: "default" }, 
  },
  {
    path: "/PUR/PR/Approve",
    name: "PURPRApprove",
    component: PURPRApprove,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/PUR/PO/Request",
    name: "PURPORequest",
    component: PURPORequest,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PUR/PO/Approve",
    name: "PURPOApprove",
    component: PURPOApprove,
    props: { default: true, menu: true, type: "default" },
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

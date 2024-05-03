import { createRouter, createWebHistory } from "vue-router";
import DocRouter from "./_Doc";
import Index from "../views/App/Index.vue";
import Login from "../views/App/Login.vue";
import PageNotFound from "../views/PageNotFound.vue";
/*-------------------------------------------------------------*/
import ACBudgetGroup from "../views/App/AC/BudgetGroup.vue";
import ACBudgetRequest from "../views/App/AC/BudgetRequest.vue";
import ACBudgetRequestOverApprove from "../views/App/AC/BudgetRequestOverApprove.vue";
import ACBudgetRequestReport from "../views/App/AC/BudgetRequestReport.vue";

import ACCostCalculateDashboard from "../views/App/AC/CostCalculate/Dashboard.vue";
import ACCostCalculateCostView from "../views/App/AC/CostCalculate/CostView.vue";
import ACCostCalculateCostAdjust from "../views/App/AC/CostCalculate/CostAdjust.vue";
import ACCostCalculateCostCustom from "../views/App/AC/CostCalculate/CostCustom.vue";
import ACCostCalculateReport from "../views/App/AC/CostCalculate/Report.vue";
/*-------------------------------------------------------------*/
import HREmployee from "../views/App/HR/Employee.vue";
/*-------------------------------------------------------------*/
import LMTransportationReport from "../views/App/LM/Transportation/Report.vue";
import LMTransportationVita from "../views/App/LM/Transportation/Vita.vue";
// import LMTransportationStockOnHand from "../views/App/LM/Transportation/StockOnHand.vue";

import LMVitaReceive from "../views/App/LM/Vita/Receive.vue";
import LMVitaPacking from "../views/App/LM/Vita/Packing.vue";
import LMVitaReport from "../views/App/LM/Vita/Report.vue";
import LMVitaStockOnHand from "../views/App/LM/Vita/StockOnHand.vue";

import LMMapsExample from "../views/App/LM/Maps/Example.vue";
/*-------------------------------------------------------------*/
import PDPORequest from "../views/App/PD/request.vue";
import PDPOApprove from "../views/App/PD/approve.vue";
import PDPOComplete from "../views/App/PD/complete.vue";
/*-------------------------------------------------------------*/
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
/*-------------------------------------------------------------*/
import QAWHIndirectReport from "../views/App/QA/WHIndirect/Report.vue";
import QAWHIndirectItem from "../views/App/QA/WHIndirect/Item.vue";
import QAWHIndirectReceive from "../views/App/QA/WHIndirect/Receive.vue";
import QAWHIndirectManage from "../views/App/QA/WHIndirect/Manage.vue";
import QAWHIndirectRequest from "../views/App/QA/WHIndirect/Request.vue";
import QAWHIndirectApprove from "../views/App/QA/WHIndirect/Approve.vue";
import QAWHIndirectIssue from "../views/App/QA/WHIndirect/Issue.vue";
/*-------------------------------------------------------------*/
import QCInspecReport from "../views/App/QC/Inspec/Report.vue";
import QCInspecRM from "../views/App/QC/Inspec/RM.vue";
import QCInspecFG from "../views/App/QC/Inspec/FG.vue";
import QCInspecPD from "../views/App/QC/Inspec/PD.vue";
import QCInspecTrackeability from "../views/App/QC/Inspec/Trackeability.vue";

import QCPickupRequest from "../views/App/QC/Pickup/Request.vue";
import QCPickupApprove from "../views/App/QC/Pickup/Approve.vue";
import QCWHRetainManagement from "../views/App/QC/WHRetain/Management.vue";
import QCWHRetainShortCode from "../views/App/QC/WHRetain/ShortCode.vue";
/*-------------------------------------------------------------*/
import RDQCInspec from "../views/App/RD/QCInspec.vue";
/*-------------------------------------------------------------*/
import SuperDataMaterialRawMaterial from "../views/App/SuperData/Material/RawMaterial.vue";
import SuperDataMaterialMasterFormula from "../views/App/SuperData/Material/MasterFormula.vue";
import SuperDataMaterialProductCost from "../views/App/SuperData/Material/ProductCost.vue";
/*-------------------------------------------------------------*/
import WHBinLocationCheckRac from "../views/App/WH/BinLocation/CheckRac.vue";
import WHBinLocationManagement from "../views/App/WH/BinLocation/Management.vue";
import WHBinLocationShortCode from "../views/App/WH/BinLocation/ShortCode.vue";

import WHItemRequest from "../views/App/WH/Item/Request.vue";
import WHItemApprove from "../views/App/WH/Item/Approve.vue";

import WHTracking from "../views/App/WH/Tracking.vue";
/*-------------------------------------------------------------*/
import TRRVisitor from "../views/App/TRR/Visitor.vue";
import TRRAutomateTicketReport from "../views/App/TRR/AutomateTicket/Report.vue";
import TRRAutomateTicketTimestamp from "../views/App/TRR/AutomateTicket/Timestamp.vue";
import TRRAutomateTicketHistory from "../views/App/TRR/AutomateTicket/History.vue";
/*-------------------------------------------------------------*/
import EventCoupon from "../views/App/Event/Coupon.vue";
/*-------------------------------------------------------------*/
import SystemAccess from "../views/App/System/Access.vue";
import SystemDepartment from "../views/App/System/Department.vue";
import SystemBranch from "../views/App/System/Branch.vue";
import SystemCompany from "../views/App/System/Company.vue";
/*-------------------------------------------------------------*/
const routes = [
  ...DocRouter,
  {
    path: "/404",
    name: "404",
    component: PageNotFound,
  },
  {
    path: "/:pathMatch(.*)*",
    beforeEnter(to) {
      window.location = `/Login`;
    },
  },
  {
    path: "/",
    name: "Dashboard",
    component: Index,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    props: { default: true, menu: true, type: "default" },
  },
  /*-------------------------------------------------------------*/
  {
    path: "/AC/CostCalculate/Dashboard",
    name: "ACCostCalculateDashboard",
    component: ACCostCalculateDashboard,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/AC/CostCalculate/CostView",
    name: "ACCostCalculateCostView",
    component: ACCostCalculateCostView,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/AC/CostCalculate/CostAdjust",
    name: "ACCostCalculateCostAdjust",
    component: ACCostCalculateCostAdjust,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/AC/CostCalculate/Custom",
    name: "ACCostCalculateCostCustom",
    component: ACCostCalculateCostCustom,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/AC/CostCalculate/Report",
    name: "ACCostCalculateReport",
    component: ACCostCalculateReport,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/AC/BudgetGroup",
    name: "ACBudgetGroup",
    component: ACBudgetGroup,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/AC/BudgetRequest",
    name: "ACBudgetRequest",
    component: ACBudgetRequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/AC/BudgetRequestOverApprove",
    name: "ACBudgetRequestOverApprove",
    component: ACBudgetRequestOverApprove,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/AC/BudgetRequestReport",
    name: "ACBudgetRequestReport",
    component: ACBudgetRequestReport,
    props: { default: true, menu: true, type: "member" },
  },
  /*-------------------------------------------------------------*/
  {
    path: "/HR/Employee",
    name: "HREmployee",
    component: HREmployee,
    props: { default: true, menu: true, type: "member" },
  },
  /*-------------------------------------------------------------*/
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

  /*-------------------------------------------------------------*/
  {
    path: "/PD/Request",
    name: "PDPORequest",
    component: PDPORequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PD/Approve",
    name: "PDPOApprove",
    component: PDPOApprove,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/PD/Complete",
    name: "PDPOComplete",
    component: PDPOComplete,
    props: { default: true, menu: true, type: "member" },
  },
  /*-------------------------------------------------------------*/
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
  /*-------------------------------------------------------------*/
  {
    path: "/QA/WHIndirect/Report",
    name: "QAWHIndirectReport",
    component: QAWHIndirectReport,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QA/WHIndirect/Item",
    name: "QAWHIndirectItem",
    component: QAWHIndirectItem,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QA/WHIndirect/Recive",
    name: "QAWHIndirectReceive",
    component: QAWHIndirectReceive,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QA/WHIndirect/Manage",
    name: "QAWHIndirectManage",
    component: QAWHIndirectManage,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QA/WHIndirect/Request",
    name: "QAWHIndirectRequest",
    component: QAWHIndirectRequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QA/WHIndirect/Approve",
    name: "QAWHIndirectApprove",
    component: QAWHIndirectApprove,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QA/WHIndirect/Issue",
    name: "QAWHIndirectIssue",
    component: QAWHIndirectIssue,
    props: { default: true, menu: true, type: "member" },
  },
  /*-------------------------------------------------------------*/
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
  /*-------------------------------------------------------------*/
  {
    path: "/RD/Request",
    name: "RDQCInspec",
    component: RDQCInspec,
    props: { default: true, menu: true, type: "member" },
  },
  /*-------------------------------------------------------------*/
  {
    path: "/SuperData/Material/RawMaterial",
    name: "SuperDataMaterialRawMaterial",
    component: SuperDataMaterialRawMaterial,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/SuperData/Material/MasterFormula",
    name: "SuperDataMaterialMasterFormula",
    component: SuperDataMaterialMasterFormula,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/SuperData/Material/ProductCost",
    name: "SuperDataMaterialProductCost",
    component: SuperDataMaterialProductCost,
    props: { default: true, menu: true, type: "member" },
  },
  /*-------------------------------------------------------------*/
  {
    path: "/TRR/Visitor",
    name: "TRRVisitor",
    component: TRRVisitor,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/TRR/AutomateTicket/Report",
    name: "TRRAutomateTicketReport",
    component: TRRAutomateTicketReport,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/TRR/AutomateTicket/Timestamp",
    name: "TRRAutomateTicketTimestamp",
    component: TRRAutomateTicketTimestamp,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/TRR/AutomateTicket/History",
    name: "TRRAutomateTicketHistory",
    component: TRRAutomateTicketHistory,
    props: { default: true, menu: true, type: "member" },
  },

  /*-------------------------------------------------------------*/
  {
    path: "/Event/Coupon",
    name: "EventCoupon",
    component: EventCoupon,
    props: { default: true, menu: true, type: "member" },
  },

  /*-------------------------------------------------------------*/

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
  /*-------------------------------------------------------------*/
  {
    path: "/System/Access",
    name: "SystemAccess",
    component: SystemAccess,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/System/Department",
    name: "SystemDepartment",
    component: SystemDepartment,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/System/Branch",
    name: "SystemBranch",
    component: SystemBranch,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/System/company",
    name: "SystemCompany",
    component: SystemCompany,
    props: { default: true, menu: true, type: "member" },
  },
];
import store from "../store";
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// let user = null;
// console.log(user)
router.afterEach(async (to, from) => {
  // console.log("AAAAAAAAAAAAAAAAA");
  store.commit("user_token", localStorage.getItem("user_token"));
  store.commit(
    "language",
    localStorage.getItem("language") ? localStorage.getItem("language") : "th"
  );

  if (to.name == "Login" && store.getters.user_token) {
    return { name: "Dashboard" };
  }

  if (store.getters.user_token) {
    if (store.getters.user) {
      let checkaccess = await canUserAccess(to);
      if (checkaccess) {
        if (to.name == "Dashboard") {
          // console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
          return true;
        }
        // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
        return true;
      } else {
        // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
        // console.log(to.name)

        return router.push({ name: "Dashboard" });
      }
    }

    await authentication();
    let checkuser = await haveUser();
    // console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD")
    if (checkuser) {
      if (to.name == "Dashboard") {
        return true;
      }
      let checkaccess = await canUserAccess(to);
      if (checkaccess) {
        if (to.name == "Dashboard") {
          return true;
        }
        // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
        return true;
      } else {
        // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
        // console.log(to.name)

        return router.push({ name: "Dashboard" });
      }
    } else {
      // console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
      return router.push({ name: "Login" });
    }
  } else {
    // console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
    // console.log(to.name);
    if (to.name == "Login") {
      return true;
    }
    return router.push({ name: "Login" });
  }
});

// router.afterEach(async (to, from) => {
//   if (user) {
//     store.commit("user", user);
//   }
// });
function haveUser() {
  if (store.getters.user) {
    // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    return true;
  } else {
    // console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBB")
    return false;
  }
}
function canUserAccess(to) {
  // console.log("CHECK ACCESS");
  // console.log(store.getters.user.access);
  if (!store.getters.user.access) {
    // console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")
    return false;
  }
  //   console.log(to.name)
  //   console.log(user.access)
  //   console.log(to.href.split("/")[1])
  // console.log(to)
  // console.log(store.getters.user.access[to.href.split("/")[1]]);
  if (!store.getters.user.access[to.href.split("/")[1]]) {
    return true;
  }
  if (
    store.getters.user.access[to.href.split("/")[1]][to.name] &&
    store.getters.user.access[to.href.split("/")[1]][to.name] != "none"
  ) {
    // console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
    return true;
  } else {
    // console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")
    return false;
  }
}
async function authentication() {
  // store.commit("user", null);
  return await fetch(
    `${store.getters.serviceUrl}api/controllers/MYSQL/INTERNAL/GLOBAL/auth`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getters.user_token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((res) => {
      if (!res.success) {
        localStorage.removeItem("user_token");
        this.$router.push({ name: `Login` });
      } else {
        res.row.image ? JSON.parse(res.row.image) : [];
        res.row.access = JSON.parse(res.row.access);
        // user = res.row;
        store.commit("user", res.row);
        store.commit("user_token", store.getters.user_token);
        // console.error("USER TOKEN")
      }
    })
    .catch((error) => {
      localStorage.removeItem("user_token");
      console.error(error);
    });
}
export default router;

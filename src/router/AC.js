import ACBudgetGroup from "../views/App/AC/BudgetGroup.vue";
import ACBudgetRequest from "../views/App/AC/BudgetRequest.vue";
import ACBudgetRequestOverApprove from "../views/App/AC/BudgetRequestOverApprove.vue";
import ACBudgetRequestReport from "../views/App/AC/BudgetRequestReport.vue";

import ACCostCalculateDashboard from "../views/App/AC/CostCalculate/Dashboard.vue";
import ACCostCalculateCostView from "../views/App/AC/CostCalculate/CostView.vue";
import ACCostCalculateCostAdjust from "../views/App/AC/CostCalculate/CostAdjust.vue";
import ACCostCalculateCostCustom from "../views/App/AC/CostCalculate/CostCustom.vue";
import ACCostCalculateReport from "../views/App/AC/CostCalculate/Report.vue";
const ACRoutes = [
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
];
export default ACRoutes;

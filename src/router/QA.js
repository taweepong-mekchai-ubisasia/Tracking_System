import QAWHRetainManagementUBP from "../views/App/QA/UBP/Retain/Management.vue";
import QAWHRetainRequestUBP from "../views/App/QA/UBP/Request/Request.vue";
import QAWHRetainApproveUBP from "../views/App/QA/UBP/Request/Approve.vue";
// ------------------------------------------------------------------- //
import QAWHRetainManagementUBA from "../views/App/QA/UBA/Retain/Management.vue";
import QAWHRetainRequestUBA from "../views/App/QA/UBA/Request/Request.vue";
import QAWHRetainApproveUBA from "../views/App/QA/UBA/Request/Approve.vue";
const QARoutes = [
  {
    path: "/QA/Retain/Compound/Management",
    name: "QAWHRetainManagementUBP",
    component: QAWHRetainManagementUBP,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QA/Retain/Compound/Request",
    name: "QAWHRetainRequestUBP",
    component: QAWHRetainRequestUBP,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QA/Retain/Compound/Approve",
    name: "QAWHRetainApproveUBP",
    component: QAWHRetainApproveUBP,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/QA/Retain/Lacquer/Management",
    name: "QAWHRetainManagementUBA",
    component: QAWHRetainManagementUBA,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QA/Retain/Lacquer/Request",
    name: "QAWHRetainRequestUBA",
    component: QAWHRetainRequestUBA,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QA/Retain/Lacquer/Approve",
    name: "QAWHRetainApproveUBA",
    component: QAWHRetainApproveUBA,
    props: { default: true, menu: true, type: "member" },
  },
];
export default QARoutes;

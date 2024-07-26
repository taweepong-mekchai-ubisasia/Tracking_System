import QAWHIndirectReport from "../views/App/QA/WHIndirect/Report.vue";
import QAWHIndirectItem from "../views/App/QA/WHIndirect/Item.vue";
import QAWHIndirectReceive from "../views/App/QA/WHIndirect/Receive.vue";
// import QAWHIndirectManage from "../views/App/QA/WHIndirect/Manage.vue";
import QAWHIndirectRequest from "../views/App/QA/WHIndirect/Request.vue";
import QAWHIndirectApprove from "../views/App/QA/WHIndirect/Approve.vue";
import QAWHIndirectIssue from "../views/App/QA/WHIndirect/Issue.vue";
const QARoutes = [
  {
    path: "/QA/WHindirect/Report",
    name: "QAWHIndirectReport",
    component: QAWHIndirectReport,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QA/WHindirect/ItemMaster",
    name: "QAWHIndirectItem",
    component: QAWHIndirectItem,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QA/WHindirect/ManageItem",
    name: "QAWHIndirectReceive",
    component: QAWHIndirectReceive,
    props: { default: true, menu: true, type: "member" },
  },
  // {
  //   path: "/QA/WHIndirect/Manage",
  //   name: "QAWHIndirectManage",
  //   component: QAWHIndirectManage,
  //   props: { default: true, menu: true, type: "member" },
  // },
  {
    path: "/QA/WHindirect/Request",
    name: "QAWHIndirectRequest",
    component: QAWHIndirectRequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QA/WHindirect/Approve",
    name: "QAWHIndirectApprove",
    component: QAWHIndirectApprove,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/QA/WHindirect/Issue",
    name: "QAWHIndirectIssue",
    component: QAWHIndirectIssue,
    props: { default: true, menu: true, type: "member" },
  },
];
export default QARoutes;

import WHIndirectReport from "../views/App/WHIndirect/Report.vue";
import WHIndirectItem from "../views/App/WHIndirect/Item.vue";
import WHIndirectReceive from "../views/App/WHIndirect/Receive.vue";
import WHIndirectRequest from "../views/App/WHIndirect/Request.vue";
import WHIndirectApprove from "../views/App/WHIndirect/Approve.vue";
import WHIndirectIssue from "../views/App/WHIndirect/Issue.vue";
const InditectRoutes = [
  {
    path: "/WHindirect/Report",
    name: "WHIndirectReport",
    component: WHIndirectReport,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/WHindirect/ItemMaster",
    name: "WHIndirectItem",
    component: WHIndirectItem,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/WHindirect/ManageItem",
    name: "WHIndirectReceive",
    component: WHIndirectReceive,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/WHindirect/Request",
    name: "WHIndirectRequest",
    component: WHIndirectRequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/WHindirect/Approve",
    name: "WHIndirectApprove",
    component: WHIndirectApprove,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/WHindirect/Issue",
    name: "WHIndirectIssue",
    component: WHIndirectIssue,
    props: { default: true, menu: true, type: "member" },
  },
];
export default InditectRoutes;

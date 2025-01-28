import PDPORequest from "../views/App/PD/request.vue";
import PDPOApprove from "../views/App/PD/approve.vue";
import PDPOComplete from "../views/App/PD/complete.vue";
const PDRoutes = [
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
];
export default PDRoutes;

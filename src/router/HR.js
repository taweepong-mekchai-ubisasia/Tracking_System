import HREmployee from "../views/App/HR/Employee.vue";
import HRDashboard from "../views/App/HR/Stationery/Dashboard.vue";
import HRRequest from "../views/App/HR/Stationery/Request.vue";
import HRShelfs from "../views/App/HR/Stationery/Shelfs.vue";
import HRItem from "../views/App/HR/Stationery/Item.vue";
// import HREvaluation from "../views/App/HR/Evaluation/FormBuilder/index.vue";

import HRVisitorManagementBooking from "../views/App/HR/VisitorManagement/Booking.vue";
import HRVisitorManagementVisitor from "../views/App/HR/VisitorManagement/Visitor.vue";
import HRVisitorManagementItem from "../views/App/HR/VisitorManagement/Item.vue";
import HRVisitorManagementRequestList from "../views/App/HR/VisitorManagement/RequestList.vue";
const HRRoutes = [
  {
    path: "/HR/Employee",
    name: "HREmployee",
    component: HREmployee,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/HR/VisitorManagement/RequestLists",
    name: "HRVisitorManagementRequestList",
    component: HRVisitorManagementRequestList,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/HR/VisitorManagement/Booking",
    name: "HRVisitorManagementBooking",
    component: HRVisitorManagementBooking,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/HR/VisitorManagement/Visitor",
    name: "HRVisitorManagementVisitor",
    component: HRVisitorManagementVisitor,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/HR/VisitorManagement/Item",
    name: "HRVisitorManagementItem",
    component: HRVisitorManagementItem,
    props: { default: true, menu: true, type: "member" },
  },

  // {
  //   path: "/HR/Stationery/Dashboard",
  //   name: "HRDashboard",
  //   component: HRDashboard,
  //   props: { default: true, menu: true, type: "member" },
  // },
  {
    path: "/HR/Stationery/RequestLists",
    name: "HRRequest",
    component: HRRequest,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/HR/Stationery/WarehouseShelfs",
    name: "HRShelfs",
    component: HRShelfs,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/HR/Stationery/ItemPriceLists",
    name: "HRItem",
    component: HRItem,
    props: { default: true, menu: true, type: "member" },
  },
];
export default HRRoutes;

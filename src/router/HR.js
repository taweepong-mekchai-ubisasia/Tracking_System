import HREmployee from "../views/App/HR/Employee.vue";
const HRRoutes = [
  {
    path: "/HR/Registering",
    name: "HRRegistering",
    component: HRRegistering,
    props: { default: true, menu: true, type: "member" },
    
  },
  {
    path: "/HR/Employee",
    name: "HREmployee",
    component: HREmployee,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/HR/Stationery/Dashboard",
    name: "HRDashboard",
    component: HRDashboard,
    props: { default: true, menu: true, type: "member" },
  },
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

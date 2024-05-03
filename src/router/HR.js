import HREmployee from "../views/App/HR/Employee.vue";
const HRRoutes = [
  {
    path: "/HR/Employee",
    name: "HREmployee",
    component: HREmployee,
    props: { default: true, menu: true, type: "member" },
    
  },
];
export default HRRoutes;

import HREmployee from "../views/App/HR/Employee.vue";
import HRRegistering from "../views/App/HR/Registering.vue";
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
];
export default HRRoutes;

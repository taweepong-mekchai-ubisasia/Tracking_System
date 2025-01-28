import ITTask from "../views/App/IT/Task.vue";
import ITMonitor from "../views/App/IT/Monitor.vue";
import ITComputerReport from "../views/App/IT/Asset/Report.vue";
import ITComputer from "../views/App/IT/Asset/Computer.vue";
const ITRoutes = [
  {
    path: "/IT/Task",
    name: "ITTask",
    component: ITTask,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IT/Monitor",
    name: "ITMonitor",
    component: ITMonitor,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IT/Asset/Report",
    name: "ITComputerReport",
    component: ITComputerReport,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/IT/Asset/Computer",
    name: "ITComputer",
    component: ITComputer,
    props: { default: true, menu: true, type: "member" },
  }
];
export default ITRoutes;

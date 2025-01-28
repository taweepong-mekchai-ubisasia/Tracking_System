import PlanningInvenStatus from "../views/App/Planning/Report/inven_status_planning.vue"
const PlanningRoutes = [
  {
    path: "/Planning/Report/InventoryStatus",
    name: "PlanningInvenStatus",
    component: PlanningInvenStatus,
    props: { default: true, menu: true, type: "member" },
  },
];
export default PlanningRoutes;

import RDQCInspec from "../views/App/RD/QCInspec.vue";
const RDRoutes = [
  {
    path: "/RD/Request",
    name: "RDQCInspec",
    component: RDQCInspec,
    props: { default: true, menu: true, type: "member" },
  },
];
export default RDRoutes;

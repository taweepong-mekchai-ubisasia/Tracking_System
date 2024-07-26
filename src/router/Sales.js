import SalesInvoice from "../views/App/Sale/ARinvoice.vue";
const SalesRoutes = [
  {
    path: "/Sales/AR-invoice",
    name: "SalesInvoice",
    component: SalesInvoice,
    props: { default: true, menu: true, type: "member" },
  }
];
export default SalesRoutes;

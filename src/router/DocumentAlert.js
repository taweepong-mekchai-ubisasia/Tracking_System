import DocumentAlertManagement from "../views/App/DocumentAlert/Management.vue";
const DocumentAlertRoutes = [
  {
    path: "/DocumentAlert/Management",
    name: "DocumentAlertManagement",
    component: DocumentAlertManagement,
    props: { default: true, menu: true, type: "member" },
  },
];
export default DocumentAlertRoutes;

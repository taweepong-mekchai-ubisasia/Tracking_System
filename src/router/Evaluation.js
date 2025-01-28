// import EvaluationDashboard from "../views/App/Evaluation/Evaluation/Dashboard.vue";
import EvaluationForm from "../views/App/Evaluation/Evaluation/FormBuilder/index.vue";
const EvaluationRoutes = [
  {
    path: "/Evaluation/Form",
    name: "EvaluationForm",
    component: EvaluationForm,
    props: { default: true, menu: true, type: "member" },
  },
];
export default EvaluationRoutes;

import SuperDataMaterialRawMaterial from "../views/App/SuperData/Material/RawMaterial.vue";
import SuperDataMaterialMasterFormula from "../views/App/SuperData/Material/MasterFormula.vue";
import SuperDataMaterialProductCost from "../views/App/SuperData/Material/ProductCost.vue";
const SuperDataRoutes = [
  {
    path: "/SuperData/Material/RawMaterial",
    name: "SuperDataMaterialRawMaterial",
    component: SuperDataMaterialRawMaterial,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/SuperData/Material/MasterFormula",
    name: "SuperDataMaterialMasterFormula",
    component: SuperDataMaterialMasterFormula,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/SuperData/Material/ProductCost",
    name: "SuperDataMaterialProductCost",
    component: SuperDataMaterialProductCost,
    props: { default: true, menu: true, type: "member" },
  },
];
export default SuperDataRoutes;

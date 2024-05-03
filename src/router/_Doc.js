import _DocBinLocation from "../views/App/_Doc/BinLocation.vue";
import _DocItem from "../views/App/_Doc/Item.vue";

const _DocRoutes = [
  {
    path: "/Doc/Item",
    name: "DocItem",
    component: _DocItem,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"WH"},
  },
  {
    path: "/Doc/BinLocation",
    name: "DocBin Location",
    component: _DocBinLocation,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"WH"},
  },
];
export default _DocRoutes;

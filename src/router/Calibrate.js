import CALitemmaster from "../views/App/Calibrate/ItemMaster.vue";
import CALcalibration from "../views/App/Calibrate/Calibration.vue";
import CALlistpage from "../views/App/Calibrate/ListPage.vue";
const CALRoutes = [
    {
    path: "/Calibrate/ItemMaster",
    name: "CALitemmaster",
    component: CALitemmaster,
    props: { default: true, menu: true, type: "member" },
    },
    {
    path: "/Calibrate/Calibration",
    name: "CALcalibration",
    component: CALcalibration,
    props: { default: true, menu: true, type: "member" },
    },
    {
    path: "/Calibrate/ListPage",
    name: "CALlistpage",
    component: CALlistpage,
    props: { default: true, menu: true, type: "member" },
    }
];
export default CALRoutes;

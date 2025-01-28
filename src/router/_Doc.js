import _DocDocumentAlert from "../views/App/_Doc/DocumentAlert/index.vue";
import _DocTrackingFGUbis from "../views/App/_Doc/TrackingFG/Ubis.vue";
import _DocTrackingFGVita from "../views/App/_Doc/TrackingFG/Vita.vue";
import _DocVisitorManage from "../views/App/_Doc/VisitorManage/index.vue";
import _DocTicketTRR from "../views/App/_Doc/TicketTRR/index.vue";
import _DocWHIndirect from "../views/App/_Doc/WHIndirect/index.vue";
import _DocWHIndirectNoMaster from "../views/App/_Doc/WHIndirect/noMaster.vue";
import _DocWHRetain from "../views/App/_Doc/WHRetain/index.vue";
import _DocWHBinLocation from "../views/App/_Doc/WHBinLocation/index.vue";
import _DocIMReport from "../views/App/_Doc/IMReport/index.vue";

const _DocRoutes = [
  {
    path: "/Doc/DocumentAlert",
    name: "Docเอกสารสัญญา",
    component: _DocDocumentAlert,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"DocumentAlert"},
  },
  {
    path: "/Doc/TrackingFG/Ubis",
    name: "DocUbis",
    component: _DocTrackingFGUbis,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"TrackingFG"},
  },
  {
    path: "/Doc/TrackingFG/Vita",
    name: "DocVita",
    component: _DocTrackingFGVita,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"TrackingFG"},
  },
  {
    path: "/Doc/HR/VisitorManagement",
    name: "DocVisitor Management",
    component: _DocVisitorManage,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"HR"},
  },
  {
    path: "/Doc/TRR/AutomateTicket",
    name: "DocAutomate Ticket",
    component: _DocTicketTRR,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"TRR"},
  },
  {
    path: "/Doc/WarehouseIndirect/WHIndirectStock",
    name: "DocWH Indirect Stock",
    component: _DocWHIndirect,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"WarehouseIndirect"},
  },
  {
    path: "/Doc/WarehouseIndirect/ItemMaster",
    name: "DocItem Master",
    component: _DocWHIndirect,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"WarehouseIndirect"},
  },
  {
    path: "/Doc/WarehouseIndirect/Request",
    name: "DocRequest",
    component: _DocWHIndirectNoMaster,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"WarehouseIndirect"},
  },
  {
    path: "/Doc/WarehouseIndirect/Approve",
    name: "DocApprove",
    component: _DocWHIndirectNoMaster,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"WarehouseIndirect"},
  },
  {
    path: "/Doc/WarehouseIndirect/Issue",
    name: "DocIssue",
    component: _DocWHIndirectNoMaster,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"WarehouseIndirect"},
  },
  {
    path: "/Doc/QA/WHRetainCompound",
    name: "DocWH Retain Compound",
    component: _DocWHRetain,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"QA"},
  },
  {
    path: "/Doc/QA/WHRetainLacquer",
    name: "DocWH Retain Lacquer",
    component: _DocWHRetain,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"QA"},
  },
  {
    path: "/Doc/IM/BinLocation",
    name: "DocBin Location",
    component: _DocWHBinLocation,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"IM"},
  },
  {
    path: "/Doc/IM/Report",
    name: "DocReport",
    component: _DocIMReport,
    props: { default: true, menu: true, type: "default" },
    meta:{"parent":"Doc","sub":"IM"},
  },
];
export default _DocRoutes;

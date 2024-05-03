import TRRVisitor from "../views/App/TRR/Visitor.vue";
import TRRAutomateTicketReport from "../views/App/TRR/AutomateTicket/Report.vue";
import TRRAutomateTicketTimestamp from "../views/App/TRR/AutomateTicket/Timestamp.vue";
import TRRAutomateTicketHistory from "../views/App/TRR/AutomateTicket/History.vue";
const TRRRoutes = [
  {
    path: "/TRR/Visitor",
    name: "TRRVisitor",
    component: TRRVisitor,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/TRR/AutomateTicket/Report",
    name: "TRRAutomateTicketReport",
    component: TRRAutomateTicketReport,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/TRR/AutomateTicket/Timestamp",
    name: "TRRAutomateTicketTimestamp",
    component: TRRAutomateTicketTimestamp,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/TRR/AutomateTicket/History",
    name: "TRRAutomateTicketHistory",
    component: TRRAutomateTicketHistory,
    props: { default: true, menu: true, type: "member" },
  },
];
export default TRRRoutes;

import TRRVisitorManagementBooking from "../views/App/TRR/VisitorManagement/Booking.vue";
import TRRVisitorManagementVisitor from "../views/App/TRR/VisitorManagement/Visitor.vue";
import TRRVisitorManagementItem from "../views/App/TRR/VisitorManagement/Item.vue";
// import TRRVisitor from "../views/App/TRR/Visitor.vue";
import TRRAutomateTicketReport from "../views/App/TRR/AutomateTicket/Report.vue";
import TRRAutomateTicketTimestamp from "../views/App/TRR/AutomateTicket/Timestamp.vue";
import TRRAutomateTicketHistory from "../views/App/TRR/AutomateTicket/History.vue";
const TRRRoutes = [
  {
    path: "/TRR/VisitorManagement/Booking",
    name: "TRRVisitorManagementBooking",
    component: TRRVisitorManagementBooking,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/TRR/VisitorManagement/Visitor",
    name: "TRRVisitorManagementVisitor",
    component: TRRVisitorManagementVisitor,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/TRR/VisitorManagement/Item",
    name: "TRRVisitorManagementItem",
    component: TRRVisitorManagementItem,
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

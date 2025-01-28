import EventCoupon from "../views/App/Event/Coupon.vue";
const EventRoutes = [
  {
    path: "/Event/Coupon",
    name: "EventCoupon",
    component: EventCoupon,
    props: { default: true, menu: true, type: "member" },
  },
];
export default EventRoutes;

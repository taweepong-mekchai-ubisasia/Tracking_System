import SystemAccess from "../views/App/System/Access.vue";
import SystemDepartment from "../views/App/System/Department.vue";
import SystemBranch from "../views/App/System/Branch.vue";
import SystemCompany from "../views/App/System/Company.vue";
import SystemNews from "../views/App/System/News.vue";
import SystemShort from "../views/App/System/Short.vue";

const SystemRoutes = [
  {
    path: "/System/Access",
    name: "SystemAccess",
    component: SystemAccess,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/System/Department",
    name: "SystemDepartment",
    component: SystemDepartment,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/System/Branch",
    name: "SystemBranch",
    component: SystemBranch,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/System/company",
    name: "SystemCompany",
    component: SystemCompany,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/System/News",
    name: "SystemNews",
    component: SystemNews,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/System/Short",
    name: "SystemShort",
    component: SystemShort,
    props: { default: true, menu: true, type: "member" },
  },
];
export default SystemRoutes;

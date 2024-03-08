import { createRouter, createWebHistory } from "vue-router";

import Index from "../views/App/Index.vue";
import Login from "../views/App/Login.vue";
import PageNotFound from "../views/PageNotFound.vue";

import About from "../views/App/About.vue";
// import Create from '../views/App/Create.vue'

// WH
import WHBinLocation from "../views/App/WH/BinLocation.vue";
import WHShortCode from "../views/App/WH/ShortCode.vue";
import WHTracking from "../views/App/WH/Tracking.vue";

// Customer
// import CustomerOrderTracking from "../views/Customer/Order/Tracking.vue";

// Member
import Survey from "../views/App/Member/Survey.vue";
import Advertising from "../views/App/Member/Advertising.vue";
import Profile from "../views/App/Member/Profile.vue";

import PosterDashboard from "../views/App/Poster/Dashboard.vue";
import PosterSurvey from "../views/App/Poster/Survey.vue";
import PosterAdvertising from "../views/App/Poster/Advertising.vue";

// import Signin from '../views/App/Signin.vue'
// import Signup from '../views/App/Signup.vue'
import Verify from "../views/App/Verify.vue";

// import CreateSurvey from '../views/App/CreateSurvey.vue'
// import CreateAdvertising from '../views/App/CreateAdvertising.vue'

// import Login from '../views/Login.vue'
// import PrivacyPolicy from '../views/App/PrivacyPolicy.vue'
// import TermsConditions from '../views/App/TermsConditions.vue'

// import CookiePolicy from '../views/App/CookiePolicy.vue'
// import PrivacyNotice from '../views/App/PrivacyNotice.vue'

// ===============================================
// ==================== ADMIN ====================
// ===============================================
import Admin_Login from "../views/Admin/Login.vue";
import Admin_Dashboard from "../views/Admin/Dashboard.vue";
import Admin_Game from "../views/Admin/Game.vue";
import Admin_Member from "../views/Admin/Member.vue";
import Admin_Admin from "../views/Admin/Admin.vue";
import Admin_Gameplay from "../views/Admin/Gameplay.vue";
import Admin_Reward from "../views/Admin/Reward.vue";
import Admin_Coin from "../views/Admin/Coin.vue";
import Admin_Rating from "../views/Admin/Rating.vue";
import Admin_Survey from "../views/Admin/Survey.vue";

import PDPORequest from "../views/App/PD/request.vue";
import PDPOApprove from "../views/App/PD/approve.vue";
import PDPOComplete from "../views/App/PD/complete.vue";

import PUPORequest from "../views/App/PU/request.vue";
import PUPOApprove from "../views/App/PU/approve.vue";
import PUPORecruitment from "../views/App/PU/recruitment.vue";
import PUPOOrder from "../views/App/PU/order.vue";
import PUPOFollow from "../views/App/PU/follow.vue";
import PUPOSupplier from "../views/App/PU/supplier.vue";
import PUPOReceive from "../views/App/PU/receive.vue";

import ACBudgetGroup from "../views/App/AC/BudgetGroup.vue";
import ACBudgetRequest from "../views/App/AC/BudgetRequest.vue";
import ACBudgetRequestOverApprove from "../views/App/AC/BudgetRequestOverApprove.vue";
import ACBudgetRequestReport from "../views/App/AC/BudgetRequestReport.vue";
// import Department from '../views/App/HR/Department.vue'
// import Branch from '../views/App/HR/Branch.vue'
// import Company from '../views/App/HR/Company.vue'
import HREmployee from "../views/App/HR/Employee.vue";
// import SelectSearch from '../views/Admin/SelectSearch.vue'

import SystemDepartment from "../views/App/System/Department.vue";
import SystemBranch from "../views/App/System/Branch.vue";
import SystemCompany from "../views/App/System/Company.vue";

import SystemAccess from "../views/App/System/Access.vue";

import RDQCInspec from "../views/App/RD/QCInspec.vue";

// import RacFactory from '../components/App/WH/BinLocation/Factory/Index'
const routes = [
  {
    path: "/App/404",
    name: "404",
    component: PageNotFound,
  },
  {
    path: "/:pathMatch(.*)*",
    // name: 'AppLogin',
    // component: PageNotFound,
    beforeEnter(to) {
      window.location = `/App/Login`;
    },
  },
  {
    path: "/App/Login",
    name: "AppLogin",
    component: Login,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/App/",
    name: "Dashboard",
    component: Index,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/System/Department",
    name: "SystemDepartment",
    component: SystemDepartment,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/System/Branch",
    name: "SystemBranch",
    component: SystemBranch,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/System/Company",
    name: "SystemCompany",
    component: SystemCompany,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/System/Access",
    name: "SystemAccess",
    component: SystemAccess,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/RD/Request",
    name: "RDQCInspec",
    component: RDQCInspec,
    props: { default: true, menu: true, type: "default" },
  },
  // {
  //   path: '/RacFactory',
  //   name: 'RacFactory',
  //   component: RacFactory,
  //   props: { default: true, menu: true, type: "default" }
  // },

  {
    path: "/PD/Request",
    name: "PDPORequest",
    component: PDPORequest,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PD/Approve",
    name: "PDPOApprove",
    component: PDPOApprove,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PD/Complete",
    name: "PDPOComplete",
    component: PDPOComplete,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/PU/Request",
    name: "PUPORequest",
    component: PUPORequest,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PU/Approve",
    name: "PUPOApprove",
    component: PUPOApprove,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PU/Recruitment",
    name: "PUPORecruitment",
    component: PUPORecruitment,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/PU/Order",
    name: "PUPOOrder",
    component: PUPOOrder,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/PU/Follow",
    name: "PUPOFollow",
    component: PUPOFollow,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/PU/Supplier",
    name: "PUPOSupplier",
    component: PUPOSupplier,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/PU/Receive",
    name: "PUPOReceive",
    component: PUPOReceive,
    props: { default: true, menu: true, type: "default" },
  },

  {
    path: "/AC/BudgetGroup",
    name: "ACBudgetGroup",
    component: ACBudgetGroup,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/AC/BudgetRequest",
    name: "ACBudgetRequest",
    component: ACBudgetRequest,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/AC/BudgetRequestOverApprove",
    name: "ACBudgetRequestOverApprove",
    component: ACBudgetRequestOverApprove,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/AC/BudgetRequestReport",
    name: "ACBudgetRequestReport",
    component: ACBudgetRequestReport,
    props: { default: true, menu: true, type: "default" },
  },
  // {
  //   path: '/HR/Company',
  //   name: 'Company',
  //   component: Company,
  //   props: { default: true, menu: true, type: "default" }
  // },
  // {
  //   path: '/HR/Branch',
  //   name: 'Branch',
  //   component: Branch,
  //   props: { default: true, menu: true, type: "default" }
  // },
  {
    path: "/HR/Employee",
    name: "HREmployee",
    component: HREmployee,
    props: { default: true, menu: true, type: "default" },
  },
  // {
  //   path: '/HR/Department',
  //   name: 'Department',
  //   component: Department,
  //   props: { default: true, menu: true, type: "default" }
  // },
  // {
  //   path: '/HR/Department',
  //   name: 'Department',
  //   component: Department,
  //   props: { default: true, menu: true, type: "default" }
  // },

  {
    path: "/App/WH/Tracking",
    name: "WHTracking",
    component: WHTracking,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/App/WH/BinLocation",
    name: "WHBinLocation",
    component: WHBinLocation,
    props: { default: true, menu: true, type: "member" },
    params: { title: "test title" },
  },
  {
    path: "/App/WH/ShortCode",
    name: "WHShortCode",
    component: WHShortCode,
    props: { default: true, menu: true, type: "member" },
  },

  {
    path: "/App/WH/BinLocation",
    name: "WHBinLocation1",
    component: WHBinLocation,
    props: { default: true, menu: true, type: "member" },
    params: { title: "test title" },
  },
  {
    path: "/App/WH/ShortCode",
    name: "WHShortCode1",
    component: WHShortCode,
    props: { default: true, menu: true, type: "member" },
  },
  {
    path: "/App/WH/BinLocation",
    name: "WHBinLocation2",
    component: WHBinLocation,
    props: { default: true, menu: true, type: "member" },
    params: { title: "test title" },
  },
  {
    path: "/App/WH/ShortCode",
    name: "WHShortCode2",
    component: WHShortCode,
    props: { default: true, menu: true, type: "member" },
  },
  // {
  //   path: '/App/WH/BinLocationReport',
  //   name: 'BinLocationReport',
  //   component: BinLocationReport,
  //   props: { default: true, menu: true, type: "member" }
  // },
  // {
  //   path: '/App/WH/BinLocationStock',
  //   name: 'BinLocationStock',
  //   component: BinLocationStock,
  //   props: { default: true, menu: true, type: "member" }
  // },
  // {
  //   path: '/App/WH/BinLocationTransection',
  //   name: 'BinLocationTransection',
  //   component: BinLocationTransection,
  //   props: { default: true, menu: true, type: "member" }
  // },

  // {
  //   path: "/Customer/Order/Tracking",
  //   name: "CustomerOrderTracking",
  //   component: CustomerOrderTracking,
  //   props: { default: true, menu: true, type: "member" },
  // },

  // {
  //   path: '/about',
  //   name: 'About',
  //   component: About,
  //   props: { default: true, menu: true, type: "default" }
  // },
  // {
  //   path: '/create',
  //   name: 'Create',
  //   component: Create,
  //   props: { default: true, menu: true, type: "default" }
  // },
  // {
  //   path: '/advertising',
  //   name: 'Advertising',
  //   component: Advertising,
  //   props: { default: true, menu: true, type: "member" }
  // },
  // {
  //   path: '/survey',
  //   name: 'Survey',
  //   component: Survey,
  //   props: { default: true, menu: true, type: "member" }
  // },
  // {
  //   path: '/setting',
  //   name: 'Setting',
  //   component: Setting,
  //   props: { default: true, menu: true, type: "member" }
  // },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   component: Profile,
  //   props: { default: true, menu: true, type: "member" }
  // },
  // {
  //   path: '/poster/dashboard',
  //   name: 'PosterDashboard',
  //   component: PosterDashboard,
  //   props: { default: true, menu: true, type: "poster" }
  // },
  // {
  //   path: '/poster/survey',
  //   name: 'PosterSurvey',
  //   component: PosterSurvey,
  //   props: { default: true, menu: true, type: "poster" }
  // },
  // {
  //   path: '/poster/advertising',
  //   name: 'PosterAdvertising',
  //   component: PosterAdvertising,
  //   props: { default: true, menu: true, type: "poster" }
  // },
  // {
  //   path: '/verify',
  //   name: 'Verify',
  //   component: Verify,
  //   props: { default: true, menu: true }
  // },
  // {
  //   path: '/signin',
  //   name: 'Signin',
  //   component: Signin,
  //   props: { default: true, menu: true }
  // },
  // {
  //   path: '/signup',
  //   name: 'Signup',
  //   component: Signup,
  //   props: { default: true, menu: true }
  // },
  // Create
  // {
  //   path: '/create/survey',
  //   name: 'CreateSurvey',
  //   component: CreateSurvey,
  //   props: { default: true, menu: true }
  // },
  // {
  //   path: '/create/advertising',
  //   name: 'CreateAdvertising',
  //   component: CreateAdvertising,
  //   props: { default: true, menu: true }
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login,
  //   props: { default: true, menu:false }
  // },
  // {
  //   path: "/privacy_policy",
  //   name: "privacyPolicy",
  //   component: PrivacyPolicy,
  // },

  // {
  //   path: "/terms_confitions",
  //   name: "TermsConditions",
  //   component: TermsConditions,
  // },
  // {
  //   path: "/cookiepolicy",
  //   name: "cookiePolicy",
  //   component: CookiePolicy,
  // },
  // {
  //   path: "/privacynotice",
  //   name: "privacyNotice",
  //   component: PrivacyNotice,
  // },

  // ===============================================
  // ==================== ADMIN ====================
  // ===============================================
  {
    path: "/admin/login",
    name: "admin_login",
    component: Admin_Login,
    props: { default: true, menu: false },
  },
  {
    path: "/admin",
    name: "admin_dashboard",
    component: Admin_Dashboard,
    props: { default: true, menu: true },
  },
  {
    path: "/admin/game",
    name: "admin_game",
    component: Admin_Game,
    props: { default: true, menu: true },
  },
  {
    path: "/admin/gameplay",
    name: "admin_gameplay",
    component: Admin_Gameplay,
    props: { default: true, menu: true },
  },
  {
    path: "/admin/member",
    name: "admin_member",
    component: Admin_Member,
    props: { default: true, menu: true },
  },
  {
    path: "/admin/admin",
    name: "admin_admin",
    component: Admin_Admin,
    props: { default: true, menu: true },
  },

  {
    path: "/admin/reward",
    name: "admin_reward",
    component: Admin_Reward,
    props: { default: true, menu: true },
  },
  {
    path: "/admin/coin",
    name: "admin_coin",
    component: Admin_Coin,
    props: { default: true, menu: true },
  },
  {
    path: "/admin/rating",
    name: "admin_rating",
    component: Admin_Rating,
    props: { default: true, menu: true },
  },
  {
    path: "/admin/survey",
    name: "admin_survey",
    component: Admin_Survey,
    props: { default: true, menu: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

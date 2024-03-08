import { createRouter, createWebHistory } from 'vue-router'

import Index from '../views/App/Index.vue'
import About from '../views/App/About.vue'
// import Create from '../views/App/Create.vue'

// WH
import Tracking from '../views/App/WH/Tracking.vue'

// Member
import Survey from '../views/App/Member/Survey.vue'
import Advertising from '../views/App/Member/Advertising.vue'
import Profile from '../views/App/Member/Profile.vue'

import PosterDashboard from '../views/App/Poster/Dashboard.vue'
import PosterSurvey from '../views/App/Poster/Survey.vue' 
import PosterAdvertising from '../views/App/Poster/Advertising.vue'

// import Signin from '../views/App/Signin.vue'
// import Signup from '../views/App/Signup.vue'
import Verify from '../views/App/Verify.vue'

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
import Admin_Login from '../views/Admin/Login.vue'
import Admin_Dashboard from '../views/Admin/Dashboard.vue'
import Admin_Game from '../views/Admin/Game.vue'
import Admin_Member from '../views/Admin/Member.vue'
import Admin_Admin from '../views/Admin/Admin.vue'
import Admin_Gameplay from '../views/Admin/Gameplay.vue'
import Admin_Reward from '../views/Admin/Reward.vue'
import Admin_Coin from '../views/Admin/Coin.vue'
import Admin_Rating from '../views/Admin/Rating.vue'
import Admin_Survey from '../views/Admin/Survey.vue'

import Admin_PO from '../views/Admin/PO.vue'
import Admin_BudgetGroup from '../views/Admin/BudgetGroup.vue'
import Admin_BudgetRequest from '../views/Admin/BudgetRequest.vue'
import Admin_BudgetRequestOverApprove from '../views/Admin/BudgetRequestOverApprove.vue'
import Admin_BudgetRequestReport from '../views/Admin/BudgetRequestReport.vue'
import Admin_Department from '../views/Admin/Department.vue'
import SelectSearch from '../views/Admin/SelectSearch.vue'

const routes = [
  
  {
    path: '/ss',
    name: 'admin_SelectSearch',
    component: SelectSearch,
    props: { default: true, menu: true }
  },
  {
    path: '/PO',
    name: 'admin_PO',
    component: Admin_PO,
    props: { default: true, menu: true }
  },
  {
    path: '/Dep',
    name: 'admin_Department',
    component: Admin_Department,
    props: { default: true, menu: true }
  },
  {
    path: '/BG',
    name: 'Admin_BudgetGroup',
    component: Admin_BudgetGroup,
    props: { default: true, menu: true }
  },
  {
    path: '/BR',
    name: 'Admin_BudgetRequest',
    component: Admin_BudgetRequest,
    props: { default: true, menu: true }
  },
  {
    path: '/BRO',
    name: 'Admin_BudgetRequestOverApprove',
    component: Admin_BudgetRequestOverApprove,
    props: { default: true, menu: true }
  },
  {
    path: '/BRR',
    name: 'Admin_BudgetRequestReport',
    component: Admin_BudgetRequestReport,
    props: { default: true, menu: true }
  },


  {
    path: '/',
    name: 'Dashboard',
    component: Index,
    props: { default: true, menu: true, type: "default" }
  },

  {
    path: '/WH/Tracking',
    name: 'Tracking',
    component: Tracking,
    props: { default: true, menu: true, type: "member" }
  },


  {
    path: '/about',
    name: 'About',
    component: About,
    props: { default: true, menu: true, type: "default" }
  },
  // {
  //   path: '/create',
  //   name: 'Create',
  //   component: Create,
  //   props: { default: true, menu: true, type: "default" }
  // },
  {
    path: '/advertising',
    name: 'Advertising',
    component: Advertising,
    props: { default: true, menu: true, type: "member" }
  },
  {
    path: '/survey',
    name: 'Survey',
    component: Survey,
    props: { default: true, menu: true, type: "member" }
  },
  // {
  //   path: '/setting',
  //   name: 'Setting',
  //   component: Setting,
  //   props: { default: true, menu: true, type: "member" }
  // },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    props: { default: true, menu: true, type: "member" }
  },
  {
    path: '/poster/dashboard',
    name: 'PosterDashboard',
    component: PosterDashboard,
    props: { default: true, menu: true, type: "poster" }
  },
  {
    path: '/poster/survey',
    name: 'PosterSurvey',
    component: PosterSurvey,
    props: { default: true, menu: true, type: "poster" }
  },
  {
    path: '/poster/advertising',
    name: 'PosterAdvertising',
    component: PosterAdvertising,
    props: { default: true, menu: true, type: "poster" }
  },
  {
    path: '/verify',
    name: 'Verify',
    component: Verify,
    props: { default: true, menu: true }
  },
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
    path: '/admin/login',
    name: 'admin_login',
    component: Admin_Login,
    props: { default: true, menu: false }
  },
  {
    path: '/admin',
    name: 'admin_dashboard',
    component: Admin_Dashboard,
    props: { default: true, menu: true }
  },
  {
    path: '/admin/game',
    name: 'admin_game',
    component: Admin_Game,
    props: { default: true, menu: true }
  },
  {
    path: '/admin/gameplay',
    name: 'admin_gameplay',
    component: Admin_Gameplay,
    props: { default: true, menu: true }
  },
  {
    path: '/admin/member',
    name: 'admin_member',
    component: Admin_Member,
    props: { default: true, menu: true }
  },
  {
    path: '/admin/admin',
    name: 'admin_admin',
    component: Admin_Admin,
    props: { default: true, menu: true }
  },

  {
    path: '/admin/reward',
    name: 'admin_reward',
    component: Admin_Reward,
    props: { default: true, menu: true }
  },
  {
    path: '/admin/coin',
    name: 'admin_coin',
    component: Admin_Coin,
    props: { default: true, menu: true }
  },
  {
    path: '/admin/rating',
    name: 'admin_rating',
    component: Admin_Rating,
    props: { default: true, menu: true }
  },
  {
    path: '/admin/survey',
    name: 'admin_survey',
    component: Admin_Survey,
    props: { default: true, menu: true }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

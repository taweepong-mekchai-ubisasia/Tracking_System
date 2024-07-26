import { createRouter, createWebHistory } from "vue-router";
import Query from "@/assets/js/fetch.js";

import Index from "../views/App/Index.vue";
import Login from "../views/App/Login.vue";
import PageNotFound from "../views/PageNotFound.vue";
import News from "../views/App/News.vue";

/*-------------------------------------------------------------*/
import _DocRouter from "./_Doc";
/*-------------------------------------------------------------*/
import ACRouter from "../router/AC";
import HRRouter from "../router/HR";
import LabelPrintRouter from "../router/LabelPrint";
import LMRouter from "../router/LM";
import WMSRouter from "../router/WMS";
import PDRouter from "../router/PD";
import PURouter from "../router/PU";
import QARouter from "../router/QA";
import QCRouter from "../router/QC";
import RDRouter from "../router/RD";
import SuperDataRouter from "../router/SuperData";
import TRRRouter from "../router/TRR";
import WHRouter from "../router/WH";
import WHMRouter from "../router/WHM";
import CALRouter from "../router/Calibrate";
import InditectRoutes from "../router/WHIndirect";
import SalesRoutes from "../router/Sales";
/*-------------------------------------------------------------*/
import EventRouter from "../router/Event";
/*-------------------------------------------------------------*/
import SystemRouter from "../router/System";
/*-------------------------------------------------------------*/
import DocumentAlertRouter from "../router/DocumentAlert";

const routes = [
  {
    path: "/404",
    name: "404",
    component: PageNotFound,
  },
  {
    path: "/:pathMatch(.*)*",
    beforeEnter(to) {
      window.location = `/Login`;
    },
  },
  {
    path: "/",
    name: "Dashboard",
    component: Index,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/News",
    name: "News",
    component: News,
    props: { default: true, menu: true, type: "default" },
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    props: { default: true, menu: true, type: "default" },
  },
  /*-------------------------------------------------------------*/
  ..._DocRouter,
  /*-------------------------------------------------------------*/
  ...ACRouter,
  ...HRRouter,
  ...LMRouter,
  ...LabelPrintRouter,
  ...PDRouter,
  ...PURouter,
  ...QARouter,
  ...QCRouter,
  ...RDRouter,
  ...SuperDataRouter,
  ...TRRRouter,
  ...WHRouter,
  ...WHMRouter,
  ...WMSRouter,
  ...CALRouter,
  ...InditectRoutes,
  ...SalesRoutes,
  /*-------------------------------------------------------------*/
  ...EventRouter,
  /*-------------------------------------------------------------*/
  ...SystemRouter,
  /*-------------------------------------------------------------*/
  ...DocumentAlertRouter,
];
import store from "../store";
// console.log(store.getters.menu.HR)
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// let user = null;
// console.log(user)

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("user_token");
    if (token) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      next("/login");
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

router.afterEach(async (to, from) => {
  store.commit("user_token", localStorage.getItem("user_token"));
  store.commit(
    "language",
    localStorage.getItem("language") ? localStorage.getItem("language") : "th"
  );

  if (to.name == "Login" && store.getters.user_token) {
    return { name: "Dashboard" };
  }

  if (store.getters.user_token) {
    if (store.getters.user) {
      if (to.name == "Dashboard") {
        return true;
      }
      let checkaccess = await canUserAccess(to);
      if (checkaccess) {
        return true;
      } else {
        return router.push({ name: "Dashboard" });
      }
    } else {
      let auth = await authentication();
      // let checkuser = await haveUser();
      if (auth.status) {
        if (to.name == "Dashboard") {
          return true;
        }
        let checkaccess = await canUserAccess(to);
        if (checkaccess.status) {
          return true;
        } else {
          return router.push({ name: "Dashboard" });
        }
      } else {
        return router.push({ name: "Login" });
      }
    }
  } else {
    if (to.name == "Login") {
      return true;
    }
    return router.push({ name: "Login" });
  }
});

// function haveUser() {
//   if (store.getters.user) {
//     return true;
//   } else {
//     return false;
//   }
// }
function canUserAccess(to) {
  if (Object.keys(store.getters.user.access).length == 0) {
    return { status: false };
  }

  if (!store.getters.user.access[to.href.split("/")[1]]) {
    return { status: true };
  }
  if (
    store.getters.user.access[to.href.split("/")[1]][to.name] &&
    store.getters.user.access[to.href.split("/")[1]][to.name] != "none"
  ) {
    return { status: true };
  } else {
    return { status: false };
  }
}
async function authentication() {
  return await new Query(null,'get').get({ user_token: store.getters.user_token }, `${store.getters.serviceUrl}api/controllers/MYSQL/INTERNAL/GLOBAL/auth`, (res) => {
    // console.log(res)
    if (!res.success) {
      localStorage.removeItem("user_token");
    } else {
      res.row.image = res.row.image ? JSON.parse(res.row.image) : [];
      res.row.access = res.row.access ? JSON.parse(res.row.access) : {};
      store.commit("user", res.row);
      store.commit("user_token", store.getters.user_token);

      return { status: res.success };
    }
  });
}
export default router;

import { createRouter, createWebHistory } from "vue-router";

import Index from "../views/App/Index.vue";
import Login from "../views/App/Login.vue";
import PageNotFound from "../views/PageNotFound.vue";
import News from "../views/App/News.vue";

/*-------------------------------------------------------------*/
import _DocRouter from "./_Doc";
/*-------------------------------------------------------------*/
import ACRouter from "../router/AC";
import HRRouter from "../router/HR";
import LMRouter from "../router/LM";
import PDRouter from "../router/PD";
import PURRouter from "../router/PUR";
import QARouter from "../router/QA";
import QCRouter from "../router/QC";
import RDRouter from "../router/RD";
import SuperDataRouter from "../router/SuperData";
import TRRRouter from "../router/TRR";
import WHRouter from "../router/WH";
/*-------------------------------------------------------------*/
import EventRouter from "../router/Event";
/*-------------------------------------------------------------*/
import SystemRouter from "../router/System";
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
  ...PDRouter,
  ...PURRouter,
  ...QARouter,
  ...QCRouter,
  ...RDRouter,
  ...SuperDataRouter,
  ...TRRRouter,
  ...WHRouter,
  /*-------------------------------------------------------------*/
  ...EventRouter,
  /*-------------------------------------------------------------*/
  ...SystemRouter,
];
import store from "../store";
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// let user = null;
// console.log(user)
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
      let checkaccess = await canUserAccess(to);
      if (checkaccess) {
        if (to.name == "Dashboard") {
          return true;
        }
        return true;
      } else {
        return router.push({ name: "Dashboard" });
      }
    }

    await authentication();
    let checkuser = await haveUser();
    if (checkuser) {
      if (to.name == "Dashboard") {
        return true;
      }
      let checkaccess = await canUserAccess(to);
      if (checkaccess) {
        if (to.name == "Dashboard") {
          return true;
        }
        return true;
      } else {
        return router.push({ name: "Dashboard" });
      }
    } else {
      return router.push({ name: "Login" });
    }
  } else {
    if (to.name == "Login") {
      return true;
    }
    return router.push({ name: "Login" });
  }
});

function haveUser() {
  if (store.getters.user) {
    return true;
  } else {
    return false;
  }
}
function canUserAccess(to) {
  if (to.name == "Dashboard") {
    return true;
  }
  if (!store.getters.user.access) {
    return false;
  }
  if (!store.getters.user.access[to.href.split("/")[1]]) {
    return true;
  }
  if (
    store.getters.user.access[to.href.split("/")[1]][to.name] &&
    store.getters.user.access[to.href.split("/")[1]][to.name] != "none"
  ) {
    return true;
  } else {
    return false;
  }
}
async function authentication() {
  return await fetch(
    `${store.getters.serviceUrl}api/controllers/MYSQL/INTERNAL/GLOBAL/auth`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.getters.user_token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((res) => {
      if (!res.success) {
        localStorage.removeItem("user_token");
      } else {
        res.row.image = res.row.image ? JSON.parse(res.row.image) : [];
        res.row.access = res.row.access ? JSON.parse(res.row.access) : {};
        store.commit("user", res.row);
        store.commit("user_token", store.getters.user_token);
      }
    })
    .catch((error) => {
      localStorage.removeItem("user_token");
      console.error(error);
    });
}
export default router;

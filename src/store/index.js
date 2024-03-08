import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      user_token: false,

      test: {
        login: false,
        posting: false,
      },
      serviceUrl: `${
        window.location.origin == "http://localhost:8081"
          ? "http://localhost:8080/kay/rewrite_demo/services/api/"
          : //  `http://localhost:8080/kay/rewrite_demo/services/api/` :
            `${window.location.origin}/services/api/`
      }`,
      // serviceUrl: `https://publicly-quality-javelin.ngrok-free.app/dev/rewrite_demo/services/api/`
      // `${
      //   window.location.origin == 'http://localhost:8081' ?
      //   `https://publicly-quality-javelin.ngrok-free.app/dev/rewrite_demo/services/api/` :
      //       //  `http://localhost:8080/kay/rewrite_demo/services/api/` :
      //   `${location.host==='invirtualevent.com'?'https://invirtualevent.com/posting/aroca/':'http://poster-demo.atwebpages.com/service/'}`
      // }`
      isLogin: null,
      admin_isLogin: null,
      scrollTop: 0,

      jwt: null,
      user: null,
      rating: null,
      survey: null,
      coin: 0,
      veridated: false,
      gamelist: null,
      admin: null,
      game_type: null,
      // Vue3GoogleOauth:null,
      // gAuth:null
      language: "th",
      menu: {
        HR: [
          {
            title: "Employee",
            name: "HREmployee",
            access: false,
          },
        ],
        AC: [
          {
            title: "Budget",
            access: false,
            menu: [
              {
                title: "Group",
                name: "ACBudgetGroup",
                access: false,
              },
              {
                title: "Request",
                name: "ACBudgetRequest",
                access: false,
              },
              {
                title: "Approve",
                name: "ACBudgetRequestApprove",
                access: false,
              },
              {
                title: "Over Approve",
                name: "ACBudgetRequestOverApprove",
                access: false,
              },
              {
                title: "Report",
                name: "ACBudgetRequestReport",
                access: false,
              },
            ],
          },
        ],
        WH: [
          {
            title: "Bin Location",
            access: false,
            menu: [
              {
                title: "Management",
                name: "WHBinLocation",
                access: false,
              },
              {
                title: "Short Code",
                name: "WHShortCode",
                access: false,
              },
            ],
          },
          {
            title: "Tracking",
            name: "WHTracking",
            access: false,
          },
        ],
        PU: [
          {
            title: "Purchase Request",
            access: false,
            menu: [
              {
                title: "Request",
                name: "PUPORequest",
                access: false,
              },
              {
                title: "Approve",
                name: "PUPOApprove",
                access: false,
              },
              {
                title: "Recruitment",
                name: "PUPORecruitment",
                access: false,
              },
              {
                title: "Order",
                name: "PUPOOrder",
                access: false,
              },
              {
                title: "Follow",
                name: "PUPOFollow",
                access: false,
              },
              {
                title: "Supplier",
                name: "PUPOSupplier",
                access: false,
              },
              {
                title: "Receive",
                name: "PUPOReceive",
                access: false,
              },
            ],
          },
        ],
        PD: [
          {
            title: "Production Order",
            access: false,
            menu: [
              {
                title: "Request",
                name: "PDPORequest",
                access: false,
              },
              {
                title: "Approve",
                name: "PDPOApprove",
                access: false,
              },
              {
                title: "Complete",
                name: "PDPOComplete",
                access: false,
              },
            ],
          },
        ],
        RD: [
          {
            title: "QC Inspector",
            name: "RDQCInspec",
            access: false,
          },
        ],
        QC: [
          {
            title: "WH Retain",
            name: "WHRetain",
            access: false,
          },
        ],
        System: [
          {
            title: "Access",
            name: "SystemAccess",
            access: false,
          },
          {
            title: "Department",
            name: "SystemDepartment",
            access: false,
          },
          {
            title: "Branch",
            name: "SystemBranch",
            access: false,
          },
          {
            title: "Company",
            name: "SystemCompany",
            access: false,
          },
        ],
      },
    };
  },
  getters: {
    language(state) {
      return state.language;
    },
    menu(state) {
      return state.menu;
    },
    HR(state) {
      return state.menu.HR;
    },
    AC(state) {
      return state.menu.AC;
    },
    WH(state) {
      return state.menu.WH;
    },
    PU(state) {
      return state.menu.PU;
    },
    PD(state) {
      return state.menu.PD;
    },
    RD(state) {
      return state.menu.RD;
    },
    QC(state) {
      return state.menu.QC;
    },
    System(state) {
      return state.menu.System;
    },
    user_token(state) {
      return state.user_token;
    },

    testLogin(state) {
      // console.log(state)
      return state.test.login;
    },
    testPosting(state) {
      // console.log(state)
      return state.test.posting;
    },
    // gAuth(state) {
    //   // console.log(state)
    //   return state.gAuth
    // },
    // Vue3GoogleOauth(state) {
    //   // console.log(state)
    //   return state.Vue3GoogleOauth
    // },
    serviceUrl(state) {
      // console.log(state)
      return state.serviceUrl;
    },
    isLogin(state) {
      // console.log(state)
      return state.isLogin;
    },
    admin_isLogin(state) {
      // console.log(state)
      return state.admin_isLogin;
    },
    scrollTop(state) {
      // console.log(state)
      return state.scrollTop;
    },
    jwt(state) {
      // console.log(state)
      return state.jwt;
    },
    user(state) {
      // console.log(state)
      return state.user;
    },
    rating(state) {
      // console.log(state)
      return state.rating;
    },
    survey(state) {
      // console.log(state)
      return state.survey;
    },
    coin(state) {
      // console.log(state)
      return state.coin;
    },
    admin(state) {
      // console.log(state)
      return state.admin;
    },
    veridated(state) {
      // console.log(state)
      return state.veridated;
    },
    gamelist(state) {
      // console.log(state)
      return state.gamelist;
    },
    game_type(state) {
      // console.log(state)
      return state.game_type;
    },
  },
  mutations: {
    language(state, data) {
      return (state.language = data);
    },
    user_token(state, data) {
      return (state.user_token = data);
    },
    testLogin(state, data) {
      // console.log(state)
      return (state.test.login = data);
    },
    testPosting(state, data) {
      // console.log(state)
      return (state.test.posting = data);
    },
    gAuth(state, data) {
      // console.log(state)
      return (state.gAuth = data);
    },
    // Vue3GoogleOauth(state, data) {
    //   // console.log(state)
    //   return state.Vue3GoogleOauth = data
    // },
    serviceUrl(state, data) {
      // console.log(state)
      return (state.serviceUrl = data);
    },
    admin_isLogin(state, data) {
      // console.log(state)
      return (state.admin_isLogin = data);
    },
    isLogin(state, data) {
      // console.log(state)
      return (state.isLogin = data);
    },
    scrollTop(state, data) {
      // console.log(state)
      return (state.scrollTop = data);
    },
    jwt(state, data) {
      // console.log(state)
      return (state.jwt = data);
    },
    user(state, data) {
      // console.log(state)
      return (state.user = data);
    },
    rating(state, data) {
      // console.log(state)
      return (state.rating = data);
    },
    survey(state, data) {
      // console.log(state)
      return (state.survey = data);
    },
    coin(state, data) {
      // console.log(state)
      return (state.coin = data);
    },
    admin(state, data) {
      // console.log(state)
      return (state.admin = data);
    },
    veridated(state, data) {
      // console.log(state)
      return (state.veridated = data);
    },
    gamelist(state, data) {
      // console.log(state)
      return (state.gamelist = data);
    },
    game_type(state, data) {
      // console.log(state)
      return (state.game_type = data);
    },
  },
  actions: {},
  modules: {},
});

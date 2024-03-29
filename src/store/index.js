import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      fnScan:true,
      user_token: false,

      test: {
        login: false,
        posting: false,
      },
      serviceUrl: `${
        window.location.origin == "http://localhost:8081"
          ? "http://localhost:8080/kay/rewrite_demo/services/api/"
          : //  `http://localhost:8080/kay/rewrite_demo/services/api/` :
            // `${window.location.origin}/services/api/`
            `http://192.168.11.1/services/api/`
      }`,
      serviceImage: `${
        window.location.origin == "http://localhost:8081"
          ? "http://localhost:8080/kay/rewrite_demo/services/"
          : //  `http://localhost:8080/kay/rewrite_demo/services/` :
            // `${window.location.origin}/services/`
            `http://192.168.11.1/services/`
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
        AC: [
          {
            title: "CostCalculate",
            access: false,
            menu: [
              {
                title: "Dashboard",
                name: "ACCostCalculateDashboard",
                access: false,
              },
              {
                title: "CostView",
                name: "ACCostCalculateCostView",
                access: false,
              },
              {
                title: "CostAdjust",
                name: "ACCostCalculateCostAdjust",
                access: false,
              },
              {
                title: "CostCustom",
                name: "ACCostCalculateCostCustom",
                access: false,
              },
              {
                title: "Report",
                name: "ACCostCalculateReport",
                access: false,
              },
            ],
          },

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
        HR: [
          {
            title: "Employee",
            name: "HREmployee",
            access: false,
          },
        ],
        WH: [
          {
            title: "Item",
            access: false,
            menu: [
              {
                title: "Request",
                name: "WHItemRequest",
                access: false,
              },
              {
                title: "Approve",
                name: "WHItemApprove",
                access: false,
              },
            ],
          },
          {
            title: "Bin Location",
            access: false,
            menu: [
              {
                title: "Factory&External",
                name: "WHBinLocationManagement",
                access: false,
              },
              {
                title: "Short Code",
                name: "WHBinLocationShortCode",
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
        LM: [
          // {
          //   title: "",
          //   name: "LMShipping",
          //   access: false,
          // },
          {
            title: "Transportation",
            access: false,
            menu: [
              {
                title: "Transportation Vita",
                name: "LMTransportationVita",
                access: false,
              },
              {
                title: "Report",
                name: "LMTransportationReport",
                access: false,
              },
            ],
          },

          {
            title: "Vita",
            access: false,
            menu: [
              {
                title: "Receive",
                name: "LMVitaReceive",
                access: false,
              },
              {
                title: "Packing",
                name: "LMVitaPacking",
                access: false,
              },
              {
                title: "Report",
                name: "LMVitaReport",
                access: false,
              },
              {
                title: "StockOnHand",
                name: "LMVitaStockOnHand",
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
        QA: [
          {
            title: "WH Indirect",
            access: false,
            menu: [
              {
                title: "Report",
                name: "QAWHIndirectReport",
                access: false,
              },
              {
                title: "Item",
                name: "QAWHIndirectItem",
                access: false,
              },
              {
                title: "Manage",
                name: "QAWHIndirectManage",
                access: false,
              },
              {
                title: "Request",
                name: "QAWHIndirectRequest",
                access: false,
              },
              {
                title: "Approve",
                name: "QAWHIndirectApprove",
                access: false,
              },
            ],
          },
          
        ],
        QC: [
          // {
          //   title: "WH Retain",
          //   name: "WHRetain",
          //   access: false,
          // },
          {
            title: "Pick up",
            access: false,
            menu: [
              {
                title: "Request",
                name: "QCPickupRequest",
                access: false,
              },
              {
                title: "Approve",
                name: "QCPickupApprove",
                access: false,
              },
            ],
          },
          {
            title: "WH Retain",
            access: false,
            menu: [
              {
                title: "Management",
                name: "QCWHManagement",
                access: false,
              },
              {
                title: "Short Code",
                name: "QCWHShortCode",
                access: false,
              },
            ],
          },
          {
            title: "Inspector",
            access: false,
            menu: [
              {
                title: "Report",
                name: "QCInspecReport",
                access: false,
              },
              {
                title: "RM",
                name: "QCInspecRM",
                access: false,
              },
              {
                title: "FG",
                name: "QCInspecFG",
                access: false,
              },
              {
                title: "PD",
                name: "QCInspecPD",
                access: false,
              },
              {
                title: "Trackeability",
                name: "QCInspecTrackeability",
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
        PUR: [
          {
            title: "Purchase Request",
            access: false,
            menu: [
              {
                title: "Request",
                name: "PURPORequestOld",
                access: false,
              },
              {
                title: "Approve",
                name: "PURPOApproveOld",
                access: false,
              },
              {
                title: "Recruitment",
                name: "PURPORecruitmentOld",
                access: false,
              },
              {
                title: "Order",
                name: "PURPOOrderOld",
                access: false,
              },
              {
                title: "Follow",
                name: "PURPOFollowOld",
                access: false,
              },
              {
                title: "Supplier",
                name: "PURPOSupplierOld",
                access: false,
              },
              {
                title: "Receive",
                name: "PURPOReceiveOld",
                access: false,
              },
            ],
          },
          {
            title: "PR",
            access: false,
            menu: [
              {
                title: "Request",
                name: "PURPRRequest",
                access: false,
              },
              {
                title: "Approve",
                name: "PURPRApprove",
                access: false,
              },
            ],
          },
          {
            title: "PO",
            access: false,
            menu: [
              {
                title: "Request",
                name: "PURPORequest",
                access: false,
              },
              {
                title: "Approve",
                name: "PURPOApprove",
                access: false,
              },
            ],
          },
        ],
        SuperData: [
          {
            title: "Material",
            access: false,
            menu: [
              {
                title: "Raw Material",
                name: "SuperDataMaterialRawMaterial",
                access: false,
              },
              {
                title: "Master Formula",
                name: "SuperDataMaterialMasterFormula",
                access: false,
              },
              {
                title: "Product Cost",
                name: "SuperDataMaterialProductCost",
                access: false,
              },
            ],
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

      transpotation: [
        {
          code: "111111",
          en: "product_1234",
          packingList: "lotNumber_1234",
          shippingMark: "111",
          shippingDate: "2020-01-02",
          created_at: "2020-01-02",
          created_by: "tets",
          updated_at: "2020-01-02",
          updated_by: "tets",
          deleted_at: "2020-01-02",
          deleted_by: "tets",
          status: "pending",
        },
        {
          code: "2222222",
          en: "product_1234",
          packingList: "lotNumber_1234",
          shippingMark: "111",
          shippingDate: "2020-01-02",
          created_at: "2020-01-02",
          created_by: "tets",
          updated_at: "2020-01-02",
          updated_by: "tets",
          deleted_at: "2020-01-02",
          deleted_by: "tets",
          status: "shipping",
        },
        {
          code: "33333333",
          en: "product_1234",
          packingList: "lotNumber_1234",
          shippingMark: "111",
          shippingDate: "2020-01-02",
          created_at: "2020-01-02",
          created_by: "tets",
          updated_at: "2020-01-02",
          updated_by: "tets",
          deleted_at: "2020-01-02",
          deleted_by: "tets",
          status: "finish",
        },
      ],
      transpotationItem: [
        {
          code: "12321312",
          transpotation_code: "111111",
          product: "UBIS Compound XSA970-40NEW 23kg",
          product_code: "XFGCNASA970-40NEW-23",
          lotNumber: "lotNumber_1234",
          packing: "20",
          quantity: "111",
          mfg: "2020-01-02",
          exp: "2021-01-02",
          created_at: "2020-01-02",
          created_by: "tets",
          updated_at: "2020-01-02",
          updated_by: "tets",
          deleted_at: "2020-01-02",
          deleted_by: "tets",
          status: "pending",
        },
        {
          code: "321321fasd",
          transpotation_code: "2222222",
          product: "Semi T377-2P",
          product_code: "ST377-2P",
          lotNumber: "lotNumber_1234",
          packing: "20",
          quantity: "111",
          mfg: "2020-01-02",
          exp: "2021-01-02",
          created_at: "2020-01-02",
          created_by: "tets",
          updated_at: "2020-01-02",
          updated_by: "tets",
          deleted_at: "2020-01-02",
          deleted_by: "tets",
          status: "pending",
        },
        {
          code: "23opetig",
          transpotation_code: "111111",
          product: "Semi T377-2P",
          product_code: "ST377-2P",
          packing: "20",
          quantity: "111",
          lotNumber: "lotNumber_2222",
          mfg: "2020-01-02",
          exp: "2021-01-02",
          created_at: "2020-01-02",
          created_by: "tets",
          updated_at: "2020-01-02",
          updated_by: "tets",
          deleted_at: "2020-01-02",
          deleted_by: "tets",
          status: "pending",
        },
      ],

      transpotationVita: [
        {
          code : "12345",
          quantation: "quantation ex.",
          packing: "packing ex.",
          shipping: "shipping ex.",
          sending: "2024-01-01",
          customer: "บริษัทฮาไม่จำกัดมหาชน",
          created_date: "2023-12-28",
          created_by: "ศิระพิชญ หลีขาว",
          updated_at: "",
          updated_by: "",
          deleted_at: "",
          deleted_by: "",
          status: "pending",received_at:"2020-01-02",
        },
      ],
      transpotationVitaItem: [
        {
          code:'123213',
          transpotation_code : "12345",
          product: "product_1234",
          lot: "lotNumber_1234",
          quantity: "111",
          packing: "111",
          mfg: "2020-01-02",
          exp: "2021-01-02",
          created_at: "2020-01-02",
          created_by: "tets",
          updated_at: "2020-01-02",
          updated_by: "tets",
          deleted_at: "2020-01-02",
          deleted_by: "tets",
          received_at:"2020-01-02",
        },
        {
          
          code:'321321',
          transpotation_code : "12345",
          product: "product_1234",
          lot: "lotNumber_1234",
          quantity: "111",
          packing: "111",
          mfg: "2020-01-02",
          exp: "2021-01-02",
          created_at: "2020-01-02",
          created_by: "tets",
          updated_at: "2020-01-02",
          updated_by: "tets",
          deleted_at: "2020-01-02",
          deleted_by: "tets",       received_at:"2020-01-02",
        },
        {
          code:'23opet',
          transpotation_code : "12345",
          product: "product_1234",
          lot: "lotNumber_1234",
          quantity: "111",
          packing: "111",
          mfg: "2020-01-02",
          exp: "2021-01-02",
          created_at: "2020-01-02",
          created_by: "tets",
          updated_at: "2020-01-02",
          updated_by: "tets",
          deleted_at: "2020-01-02",
          deleted_by: "tets",       received_at:"2020-01-02",
        },
      ]
    };
  },
  getters: {
    transpotation(state) {
      return state.transpotation;
    },
    transpotationItem(state) {
      return state.transpotationItem;
    },
    transpotationVita(state) {
      return state.transpotationVita;
    },
    transpotationVitaItem(state) {
      return state.transpotationVitaItem;
    },
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
    LM(state) {
      return state.menu.LM;
    },
    PUR(state) {
      return state.menu.PUR;
    },
    PD(state) {
      return state.menu.PD;
    },
    RD(state) {
      return state.menu.RD;
    },
    QA(state) {
      return state.menu.QA;
    },
    QC(state) {
      return state.menu.QC;
    },
    System(state) {
      return state.menu.System;
    },
    SuperData(state) {
      return state.menu.SuperData;
    },
    test(state) {
      return state.menu.test;
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
    serviceImage(state) {
      // console.log(state)
      return state.serviceImage;
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
    fnScan(state) {
      // console.log(state)
      return state.fnScan;
    },
  },
  mutations: {
    
    transpotationVita(state, data) {
      return (state.transpotationVita = data);
    },
    transpotationVitaItem(state, data) {
      return (state.transpotationVitaItem = data);
    },
    transpotation(state, data) {
      return (state.transpotation = data);
    },
    transpotationItem(state, data) {
      return (state.transpotationItem = data);
    },
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

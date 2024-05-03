import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      theme: "ubis",
      user_token: false,
      serviceUrl: `${
        window.location.origin == "http://localhost:8081"
          ? "http://localhost:8080/kay/rewrite_demo/services/"
          : //  `http://localhost:8080/kay/rewrite_demo/services/` :
            // `${window.location.origin}/services/`
            `http://192.168.11.1/services/`
      }`,
      jwt: null,
      user: null,
      
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
        LM: [
          // {
          //   title: "",
          //   name: "LMShipping",
          //   access: false,
          // },

          {
            title: "Maps",
            access: false,
            menu: [
              {
                title: "Example",
                name: "LMMapsExample",
                access: false,
              },
            ],
          },
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
                title: "Receive",
                name: "QAWHIndirectReceive",
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

              {
                title: "Issue",
                name: "QAWHIndirectIssue",
                access: false,
              },

              {
                title: "Manage",
                name: "QAWHIndirectManage",
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
                name: "QCWHRetainManagement",
                access: false,
              },
              {
                title: "Short Code",
                name: "QCWHRetainShortCode",
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
        TRR: [
          {
            title: "Visitor",
            name: "TRRVisitor",
            access: false,
          },

          {
            title: "Automate Ticket",
            access: false,
            menu: [
              {
                title: "Report",
                name: "TRRAutomateTicketReport",
                access: false,
              },
              {
                title: "Timestamp",
                name: "TRRAutomateTicketTimestamp",
                access: false,
              },
              {
                title: "History",
                name: "TRRAutomateTicketHistory",
                access: false,
              },
            ],
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
                title: "Check Rac",
                name: "WHBinLocationCheckRac",
                access: false,
              },
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
        Event: [
          {
            title: "Coupon",
            name: "EventCoupon",
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
          code: "12345",
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
          status: "pending",
          received_at: "2020-01-02",
        },
      ],
      transpotationVitaItem: [
        {
          code: "123213",
          transpotation_code: "12345",
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
          received_at: "2020-01-02",
        },
        {
          code: "321321",
          transpotation_code: "12345",
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
          received_at: "2020-01-02",
        },
        {
          code: "23opet",
          transpotation_code: "12345",
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
          received_at: "2020-01-02",
        },
      ],
    };
  },
  getters: {
    theme(state){
      return state.theme;
    },
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
    AC(state) {
      return state.menu.AC;
    },
    HR(state) {
      return state.menu.HR;
    },
    LM(state) {
      return state.menu.LM;
    },
    PD(state) {
      return state.menu.PD;
    },
    PUR(state) {
      return state.menu.PUR;
    },
    QA(state) {
      return state.menu.QA;
    },
    QC(state) {
      return state.menu.QC;
    },
    RD(state) {
      return state.menu.RD;
    },
    SuperData(state) {
      return state.menu.SuperData;
    },
    TRR(state) {
      return state.menu.TRR;
    },
    WH(state) {
      return state.menu.WH;
    },
    Event(state) {
      return state.menu.Event;
    },
    System(state) {
      return state.menu.System;
    },
    test(state) {
      return state.menu.test;
    },
    user_token(state) {
      return state.user_token;
    },
    serviceUrl(state) {
      return state.serviceUrl;
    },
    jwt(state) {
      return state.jwt;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    theme(state, data) {
      return (state.theme = data);
    },

    menu(state, data) {
      return (state.menu = data);
    },
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
    jwt(state, data) {
      return (state.jwt = data);
    },
    user(state, data) {
      return (state.user = data);
    },
  },
  actions: {},
  modules: {},
});

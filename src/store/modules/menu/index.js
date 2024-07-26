import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
const menu = {
  namespaced: false,
  state: () => {
    return {
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
          {
            title: "Stationery",
            access: false,
            menu: [
              {
                title: "Dashboard",
                name: "HRDashboard",
                access: false,
              },
              {
                title: "Request Lists",
                name: "HRRequest",
                access: false,
              },
              {
                title: "Warehouse Shelfs",
                name: "HRShelfs",
                access: false,
              },
              {
                title: "Item Price Lists",
                name: "HRItem",
                access: false,
              },
            ],
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
        WMS: [
          {
            title: "Ubis",
            access: false,
            menu: [
              {
                title: "Transportation",
                name: "WMSUbisTransporation",
                access: false,
              },
              {
                title: "Report",
                name: "WMSUbisReport",
                access: false,
              },
            ],
          },
          {
            title: "Vita",
            access: false,
            menu: [
              {
                title: "Scan To Receive",
                name: "WMSVitaScanToReceive",
                access: false,
              },
              {
                title: "Management",
                name: "WMSVitaReceive",
                access: false,
              },
              {
                title: "Stock On Hand",
                name: "WMSVitaStockOnHand",
                access: false,
              },
              // {
              //   title: "Stock On Hand By Product",
              //   name: "WMSVitaStockOnHand",
              //   access: false,
              // },
              // {
              //   title: "Stock On Hand By Lot",
              //   name: "WMSVitaStockOnHandByLot",
              //   access: false,
              // },
              {
                title: "Customer",
                name: "WMSVitaCustomer",
                access: false,
              },
              {
                title: "Pick & Pack",
                name: "WMSVitaPickPack",
                access: false,
              },
              {
                title: "Deliver",
                name: "WMSVitaDeliver",
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
                title: "Item Master",
                name: "QAWHIndirectItem",
                access: false,
              },
              {
                title: "Manage Item",
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
            title: "Inspections",
            access: false,
            menu: [
              // {
              //   title: "Report",
              //   name: "QCInspecReport",
              //   access: false,
              // },
              {
                title: "RM Report",
                name: "QCInspecRM",
                access: false,
              },
              {
                title: "FG Report",
                name: "QCInspecFG",
                access: false,
              },
              {
                title: "PD Issue Report",
                name: "QCInspecPD",
                access: false,
              },
              {
                title: "TraceAbility FG",
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
        PU: [
          {
            title: "Purchase Request",
            access: false,
            menu: [
              {
                title: "Request",
                name: "PUPORequestOld",
                access: false,
              },
              {
                title: "Approve",
                name: "PUPOApproveOld",
                access: false,
              },
              {
                title: "Recruitment",
                name: "PUPORecruitmentOld",
                access: false,
              },
              {
                title: "Order",
                name: "PUPOOrderOld",
                access: false,
              },
              {
                title: "Follow",
                name: "PUPOFollowOld",
                access: false,
              },
              {
                title: "Supplier",
                name: "PUPOSupplierOld",
                access: false,
              },
              {
                title: "Receive",
                name: "PUPOReceiveOld",
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
                name: "PUPRRequest",
                access: false,
              },
              {
                title: "Approve",
                name: "PUPRApprove",
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
                name: "PUPORequest",
                access: false,
              },
              {
                title: "Approve",
                name: "PUPOApprove",
                access: false,
              },
            ],
          },
          {
            title: "Report",
            access: false,
            menu: [
              {
                title: "Purchase Approver Report",
                name: "PUPOData",
                access: false,
              },
              {
                title: "Last Indirect Report",
                name: "PULatest",
                access: false,
              },
              {
                title: "PR to PO Report",
                name: "PUReport",
                access: false,
              }
            ]
          }
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
        WHM: [
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
          {
            title: "News",
            name: "SystemNews",
            access: false,
          },
          {
            title: "Short",
            name: "SystemShort",
            access: false,
          },
        ],
        DocumentAlert: [
          {
            title: "Management",
            name: "DocumentAlertManagement",
            access: false,
          },
        ],
        Calibrate: [
          {
            title: "ItemMaster",
            name: "CALitemmaster",
            access: false,
          },
          {
            title: "Calibration",
            name: "CALcalibration",
            access: false,
          },
          {
            title: "ListPage",
            name: "CALlistpage",
            access: false,
          },
        ],
        WHIndirect: [
          {
            title: "Report",
            name: "WHIndirectReport",
            access: false,
          },
          {
            title: "Item Master",
            name: "WHIndirectItem",
            access: false,
          },
          {
            title: "Manage Item",
            name: "WHIndirectReceive",
            access: false,
          },
          {
            title: "Request",
            name: "WHIndirectRequest",
            access: false,
          },
          {
            title: "Approve",
            name: "WHIndirectApprove",
            access: false,
          },
          {
            title: "Issue",
            name: "WHIndirectIssue",
            access: false,
          },
          {
            title: "Manage",
            name: "WHIndirectManage",
            access: false,
          },
        ],
        Sales: [
          {
            title: "A/R Invoice Report",
            name: "SalesInvoice",
            access: false,
          },
        ]
      },
    };
  },
  actions,
  getters,
  mutations,
};

export default menu;

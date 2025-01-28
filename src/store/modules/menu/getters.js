const getters = {
  menu(state) {
    return (v) => state.menu[v];
  },
  // AC(state) {
  //   return state.menu.AC;
  // },
  // HR(state) {
  //   return state.menu.HR;
  // },
  // LM(state) {
  //   return state.menu.LM;
  // },
  // PD(state) {
  //   return state.menu.PD;
  // },
  // PUR(state) {
  //   return state.menu.PUR;
  // },
  // QA(state) {
  //   return state.menu.QA;
  // },
  // QC(state) {
  //   return state.menu.QC;
  // },
  // RD(state) {
  //   return state.menu.RD;
  // },
  // SuperData(state) {
  //   return state.menu.SuperData;
  // },
  // TRR(state) {
  //   return state.menu.TRR;
  // },
  // WH(state) {
  //   return state.menu.WH;
  // },
  // WHM(state) {
  //   return state.menu.WHM;
  // },
  // Event(state) {
  //   return state.menu.Event;
  // },
  // System(state) {
  //   return state.menu.System;
  // },
};

export default {
  ...getters,
};

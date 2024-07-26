import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
const menu = {
  namespaced: false,
  state: () => {
    return {
      theme: "ubis",
      user_token: false,
      serviceUrl: `${
        // window.location.origin == "http://localhost:8081" ? 
        // "http://localhost:8080/kay/rewrite_demo/services/"
          `http://192.168.11.1/dev_services/`
          // : `http://192.168.11.1/services/`
      }`,
      jwt: null,
      user: null,
      language: "th",
      colors: [
        "#ff6178",
        "#f5ef30",
        "#ff61a3",
        "#26e7a6",
        "#fe9e3b",
        "#26a0fc",
        "#8b75d7",
        "#E74645",
        "#FB7756",
        "#FACD60",
        "#FDFA66",
        "#1AC0C6",
        "#454D66",
        "#309975",
        "#58B368",
        "#DAD873",
        "#EFEEB4",
        "#F9B4AB",
        "#FDEBD3",
        "#264E70",
        "#679186",
        "#BBD4CE",
        "#52489C",
        "#4062BB",
        "#59C3C3",
        "#EBEBEB",
        "#F45B69",
      ],
    };
  },
  actions,
  getters,
  mutations,
};

export default menu;

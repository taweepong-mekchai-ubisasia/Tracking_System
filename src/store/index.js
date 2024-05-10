import { createStore } from "vuex";
import base from "./modules/base";
import menu from "./modules/menu";
import mockup from "./modules/mockup";
export default createStore({
  state() {
    return {};
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    base,
    menu,
    mockup
  },
});

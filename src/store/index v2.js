import { createStore } from "vuex";
import Mockup from "./mockup";
import Base from "../store/base";
import Menu from "../store/menu";
export default createStore({
  state() {
    return Object.assign(
      {},
      { ...Mockup.state },
      { ...Base.state },
      { ...Menu.state }
    );
  },
  getters: Object.assign(
    {},
    { ...Mockup.getters },
    { ...Base.getters },
    { ...Menu.getters }
  ),
  mutations: Object.assign(
    {},
    { ...Mockup.getters },
    { ...Base.getters },
    { ...Menu.mutations }
  ),
  actions: {},
  modules: {},
});

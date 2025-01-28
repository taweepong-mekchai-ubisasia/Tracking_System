import { defineStore } from "pinia";

export const usePinia = defineStore("pinia", {
  state: () => ({
    number: 0,
    wh: { tab: "reportDashboard" }
  }),
  actions: {
    setNumber(index) {
      this.number = index;
    },
		numberTen() {
			this.number = 10;
			console.log(this.number)
		},
		setCheckbox(tab) {
			this.wh.tab = tab
		},
  },
});

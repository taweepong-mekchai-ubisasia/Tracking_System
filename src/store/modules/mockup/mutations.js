const mutations = {
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
};

export default {
  ...mutations,
};

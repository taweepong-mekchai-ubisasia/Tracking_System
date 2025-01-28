const getters = {
  theme(state) {
    return state.theme;
  },
  language(state) {
    return state.language;
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
  colors(state) {
    return state.colors;
  },
};

export default {
  ...getters,
};

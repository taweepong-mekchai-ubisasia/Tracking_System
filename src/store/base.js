export default {
  state: {
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
  },
  getters: {
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
  },
  mutations: {
    theme(state, data) {
      return (state.theme = data);
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
};

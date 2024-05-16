const mutations = {
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
};

export default {
  ...mutations,
};

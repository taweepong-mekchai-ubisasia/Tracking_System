import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      test:{
        login:false,
        posting:false,
      },
      serviceUrl: `${window.location.origin == 'http://localhost:8080' ? `http://localhost/freelance/posting_service/` : `${location.host==='invirtualevent.com'?'https://invirtualevent.com/posting/aroca/':'http://poster-demo.atwebpages.com/service/'}`}`,
      isLogin: null,
      admin_isLogin: null,
      scrollTop: 0,
      jwt:null,
      user:null,
      rating:null,
      survey:null,
      coin:0,
      veridated:false,
      gamelist:null,
      admin:null,
      game_type:null,
      // Vue3GoogleOauth:null,
      // gAuth:null
    }
    
  },
  getters: {
    testLogin(state) {
      // console.log(state)
      return state.test.login
    },
    testPosting(state) {
      // console.log(state)
      return state.test.posting
    },
    // gAuth(state) {
    //   // console.log(state)
    //   return state.gAuth
    // },
    // Vue3GoogleOauth(state) {
    //   // console.log(state)
    //   return state.Vue3GoogleOauth
    // },
    serviceUrl(state) {
      // console.log(state)
      return state.serviceUrl
    },
    isLogin(state) {
      // console.log(state)
      return state.isLogin
    },
    admin_isLogin(state) {
      // console.log(state)
      return state.admin_isLogin
    },
    scrollTop(state) {
      // console.log(state)
      return state.scrollTop
    },
    jwt(state) {
      // console.log(state)
      return state.jwt
    },
    user(state) {
      // console.log(state)
      return state.user
    },
    rating(state) {
      // console.log(state)
      return state.rating
    },
    survey(state) {
      // console.log(state)
      return state.survey
    },
    coin(state) {
      // console.log(state)
      return state.coin
    },
    admin(state) {
      // console.log(state)
      return state.admin
    },
    veridated(state) {
      // console.log(state)
      return state.veridated
    },
    gamelist(state) {
      // console.log(state)
      return state.gamelist
    },
    game_type(state) {
      // console.log(state)
      return state.game_type
    },
    
  },
  mutations: {
    testLogin(state, data) {
      // console.log(state)
      return state.test.login = data
    },
    testPosting(state, data) {
      // console.log(state)
      return state.test.posting = data
    },
    gAuth(state, data) {
      // console.log(state)
      return state.gAuth = data
    },
    // Vue3GoogleOauth(state, data) {
    //   // console.log(state)
    //   return state.Vue3GoogleOauth = data
    // },
    serviceUrl(state, data) {
      // console.log(state)
      return state.serviceUrl = data
    },
    admin_isLogin(state, data) {
      // console.log(state)
      return state.admin_isLogin = data
    },
    isLogin(state, data) {
      // console.log(state)
      return state.isLogin = data
    },
    scrollTop(state, data) {
      // console.log(state)
      return state.scrollTop = data
    },
    jwt(state, data) {
      // console.log(state)
      return state.jwt = data
    },
    user(state, data) {
      // console.log(state)
      return state.user = data
    },
    rating(state, data) {
      // console.log(state)
      return state.rating = data
    },
    survey(state, data) {
      // console.log(state)
      return state.survey = data
    },
    coin(state, data) {
      // console.log(state)
      return state.coin = data
    },
    admin(state, data) {
      // console.log(state)
      return state.admin = data
    },
    veridated(state, data) {
      // console.log(state)
      return state.veridated = data
    },
    gamelist(state, data) {
      // console.log(state)
      return state.gamelist = data
    },
    game_type(state, data) {
      // console.log(state)
      return state.game_type = data
    },
  },
  actions: {
  },
  modules: {
  }
})

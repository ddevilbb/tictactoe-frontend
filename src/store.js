import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      sign: '',
      isLoggedIn: false
    },
    game: {
      id: '',
      difficulty: '',
      status: ''
    },
    board: []
  },
  mutations: {
    userId (state, userId) {
      state.user.id = userId
    },
    sign (state, sign) {
      state.user.sign = sign
    },
    isLoggedIn (state, isLoggedIn) {
      state.user.isLoggedIn = isLoggedIn
    },
    gameId (state, gameId) {
      state.game.id = gameId
    },
    difficulty (state, difficulty) {
      state.game.difficulty = difficulty
    },
    status (state, status) {
      state.game.status = status
    }
  },
  actions: {

  },
  getters: {
    userId (state) {
      return state.user.id
    },
    sign (state) {
      return state.user.sign
    },
    isLoggedIn (state) {
      return state.user.isLoggedIn
    },
    gameId (state) {
      return state.game.id
    },
    difficulty (state) {
      return state.game.difficulty
    },
    status (state) {
      return state.game.status
    }
  },
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, '30D')
    })
  ]
})

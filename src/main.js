import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import * as VueCookies from 'vue-cookies'
import { ModalPlugin } from 'bootstrap-vue'
import { prepareGameBoard, prepareGameDifficulty, prepareGameStatus } from './helpers/history'

Vue.config.productionTip = false
Vue.use(VueCookies)
Vue.use(ModalPlugin)

Vue.mixin({
  methods: {
    prepareGameDifficulty: difficulty => prepareGameDifficulty(difficulty),
    prepareGameStatus: status => prepareGameStatus(status),
    prepareGameBoard: (turns, lastTurn = null) => prepareGameBoard(turns, lastTurn)
  }
})

console.log(process.env.VUE_APP_API_URL)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

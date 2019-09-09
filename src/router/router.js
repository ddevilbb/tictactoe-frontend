import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import SelectParameters from '../views/SelectParameters'
import auth from '../middlewares/auth'
import store from '../store'
import middlewarePipeline from './middlewarePipeline'
import Board from '../views/Board'
import NewGame from '../views/NewGame'

Vue.use(Router)

const router = new Router({
  base: 'http://localhost:8080',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: '/select_parameters',
      name: 'select_parameters',
      component: SelectParameters,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: '/show_game',
      name: 'show_game',
      component: Board,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: '/new_game',
      name: 'new_game',
      component: NewGame,
      meta: {
        middleware: [
          auth
        ]
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware
  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router

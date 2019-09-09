import Api from './Api'
import getAuthorization from '../helpers/authorization'
import store from '../store'

const baseUrl = '/game'

export default {
  async create (difficulty) {
    return new Promise((resolve) => {
      Api().post(`${baseUrl}/new`, {
        difficulty
      }, {
        headers: getAuthorization()
      }).then(response => {
        store.commit('gameId', response.data.id)
        store.commit('difficulty', difficulty)
        store.commit('status', response.data.status)
        resolve()
      })
    })
  },
  async prepareBoard (gameId) {
    return new Promise((resolve, reject) => {
      Api().get(`${baseUrl}/prepare_board`, {
        params: {
          gameId
        },
        headers: getAuthorization()
      }).then(response => {
        resolve(response.data)
      })
    })
  }
}

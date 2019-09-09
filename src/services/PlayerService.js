import Api from './Api'
import getAuthorization from '../helpers/authorization'
import store from '../store'

const baseUrl = '/player'

export default {
  async create () {
    return new Promise((resolve, reject) => {
      Api().post(`${baseUrl}/new`).then(response => {
        window.$cookies.set('token', response.data.token, '30D')
        store.commit('isLoggedIn', true)
        store.commit('userId', response.data.id)
        resolve()
      }).catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  },
  async find () {
    return new Promise((resolve, reject) => {
      Api().get(`${baseUrl}/find`, {
        headers: getAuthorization()
      }).then(response => {
        store.commit('isLoggedIn', true)
        store.commit('userId', response.data.id)
        window.$cookies.set('token', response.data.token, '30D')
        resolve()
      }).catch(async (error) => {
        const code = error.response.data.code
        store.commit('isLoggedIn', false)
        if (code === 404) {
          await this.create()
        } else {
          console.log(error)
          reject(error)
        }
      })
    })
  },
  async saveSign (sign) {
    return new Promise((resolve, reject) => {
      Api().post(`${baseUrl}/save_sign`, {
        sign: sign
      }, {
        headers: getAuthorization()
      }).then(response => {
        store.commit('sign', sign)
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }
}

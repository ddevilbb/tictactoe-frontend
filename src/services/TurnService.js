import Api from './Api'
import getAuthorization from '../helpers/authorization'

const baseUrl = '/turn'

export default {
  async create (gameId, location) {
    return new Promise((resolve, reject) => {
      Api().post(`${baseUrl}/new`, {
        gameId,
        location
      }, {
        headers: getAuthorization()
      }).then(() => {
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }
}

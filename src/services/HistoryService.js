import Api from './Api'
import getAuthorization from '../helpers/authorization'

const baseUrl = '/history'

export default {
  async getGameList () {
    return new Promise((resolve, reject) => {
      Api().get(`${baseUrl}/gameList`, {
        headers: getAuthorization()
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }
}

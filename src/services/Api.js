import Axios from 'axios'

export default () => {
  return Axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

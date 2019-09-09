export default function getAuthorization () {
  return {
    'authorization': `Bearer ${window.$cookies.get('token')}`
  }
}

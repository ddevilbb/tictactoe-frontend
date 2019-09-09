import PlayerService from '../services/PlayerService'

export default function auth ({ next }) {
  if (!window.$cookies.get('token')) {
    PlayerService.create()
  } else {
    PlayerService.find()
  }

  return next()
}

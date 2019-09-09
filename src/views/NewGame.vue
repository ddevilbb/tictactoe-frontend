<script>
import GameService from '../services/GameService'
import store from '../store'
import router from '../router/router'

export default {
  name: 'NewGame',
  async mounted () {
    await GameService.create(store.getters.difficulty)
    await router.push('show_game')
  }
}
</script>

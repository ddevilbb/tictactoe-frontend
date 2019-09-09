<template>
    <b-modal id="historyModal" size="lg" scrollable v-bind:title="title" ok-only>
        <div class="table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th width="10">#</th>
                    <th>Игра</th>
                    <th>Сложность</th>
                    <th>Статус</th>
                    <th width="40">Доска</th>
                </tr>
                </thead>
                <tbody v-if="this.games.length > 0">
                <template v-for="(game, index) in this.games">
                    <tr v-bind:key="game.id">
                        <td>
                            <span class="toggle-turns" :class="{ 'active': game.active }" @click="toggleTurns(index)"></span>
                        </td>
                        <td>{{ game.id }}</td>
                        <td>{{ prepareGameDifficulty(game.difficulty) }}</td>
                        <td>{{ prepareGameStatus(game.status) }}</td>
                        <td>
                            <small-board :board="prepareGameBoard(game.turns)"/>
                        </td>
                    </tr>
                    <tr class="table-active" v-show="game.active === true" v-bind:key="index">
                        <td colspan="5">
                            <table class="table table-sm">
                                <thead>
                                <tr>
                                    <th>Ход</th>
                                    <th>Игрок</th>
                                    <th width="40">Доска</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(turn, index) of game.turns" v-bind:key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td v-if="turn.playerId === userId">Вы</td>
                                    <td v-else>AI</td>
                                    <td>
                                        <small-board :board="prepareGameBoard(game.turns, index + 1)"/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </template>
                </tbody>
                <tbody v-else>
                <tr>
                    <td colspan="5" class="text-center">Список пуст</td>
                </tr>
                </tbody>
            </table>
        </div>
    </b-modal>
</template>

<script>
import HistoryService from '../services/HistoryService'
import SmallBoard from './SmallBoard'
export default {
  name: 'HistoryModal',
  components: { SmallBoard },
  computed: {
    userId () {
      return this.$store.getters.userId
    }
  },
  data () {
    return {
      title: 'История игр',
      games: []
    }
  },
  mounted () {
    this.$root.$on('bv::modal::show', async (bvEvent, modalId) => {
      this.games = await HistoryService.getGameList()
      this.games = this.games.map(game => ({
        ...game,
        active: false
      }))
    })
  },
  methods: {
    showModal () {
      this.$bvModal.show('historyModal')
    },
    closeModal () {
      this.$bvModal.hide('historyModal')
    },
    toggleTurns (index) {
      this.games[index].active = !this.games[index].active
    }
  }
}
</script>

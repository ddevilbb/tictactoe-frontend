<template>
    <div class="container text-center">
        <h3>Игра #{{ this.game.id }}</h3>
        <div class="game-info">
            <div class="alert alert-success" v-if="this.game.status === 'win'">Вы победили!</div>
            <div class="alert alert-danger" v-else-if="this.game.status === 'loose'">Вы проиграли!</div>
            <div class="alert alert-secondary" v-else-if="this.game.status === 'tie'">Ничья!</div>
        </div>
        <div class="tic-board-wrapper">
            <div class="row tic-board">
                <div class="col-4 tic-cell"
                     v-bind:class="{
                     'tic-turn-x': value === 'x',
                     'tic-turn-o': value === 'o'
                     }"
                     v-for="(value, index) in board"
                     v-bind:key="index"
                     v-on:click="makeTurn(index)"></div>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client'
import store from '../store'
import GameService from '../services/GameService'
import TurnService from '../services/TurnService'

export default {
  name: 'Board',
  data () {
    return {
      websocket: null,
      aiPlayer: {
        sign: ''
      },
      user: {
        sign: ''
      },
      game: {
        id: '',
        status: '',
        difficulty: '',
        turns: [],
        busy: false
      },
      board: {}
    }
  },
  async created () {
    this.websocket = io(process.env.VUE_APP_SOCKET_URL)
    this.game.id = store.getters.gameId
    this.game.status = store.getters.status
    this.game.difficulty = store.getters.difficulty
    this.user.sign = store.getters.sign
    this.aiPlayer.sign = this.user.sign === 'x' ? 'o' : 'x'
    this.board = { ...await GameService.prepareBoard(this.game.id) }
    this.game.busy = this.isBoardBusy()
    this.runGame()
    this.listeners()
  },
  methods: {
    async makeTurn (index) {
      if (!this.game.busy) {
        this.board[index] = this.user.sign
        this.game.busy = true
        await TurnService.create(this.game.id, index)
        this.websocket.emit('AIPlay', {
          gameId: this.game.id,
          sign: this.aiPlayer.sign,
          difficulty: this.game.difficulty
        })
      }
    },
    runGame () {
      if (this.game.busy) {
        this.websocket.emit('AIPlay', {
          gameId: this.game.id,
          sign: this.aiPlayer.sign,
          difficulty: this.game.difficulty
        })
      }
    },
    isBoardBusy () {
      const count = Object.values(this.board).filter(item => item === this.user.sign || item === this.aiPlayer.sign).length
      let num = 3
      if (this.user.sign === 'x') {
        num = 2
      }

      if (count === 0) {
        return this.user.sign === 'o'
      } else {
        return count % num !== 0
      }
    },
    listeners () {
      this.websocket.on('AITurn', (data) => {
        this.board[data.location] = this.aiPlayer.sign
        this.game.busy = false
      })
      this.websocket.on('GameOver', (data) => {
        this.game.busy = true
        this.game.status = data.status
      })
    }
  }
}
</script>

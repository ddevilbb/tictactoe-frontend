<template>
  <div class="container">
    <h2 class="text-center">Выберите параметры игры</h2>
    <div class="row">
      <form class="col-sm-6 offset-sm-3 col-12" method="post">
        <div class="form-group row">
          <label class="col-form-label-sm col-12">Роль:</label>
          <div class="col-12">
            <div class="form-check form-check-inline">
              <input id="radio-sign-x" class="form-check-input" type="radio" value="x" checked v-model="sign"/>
              <label class="form-check-label" for="radio-sign-x">
                <span class="sign-x">X</span>
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input id="radio-sign-o" class="form-check-input" type="radio" value="o" v-model="sign"/>
              <label class="form-check-label" for="radio-sign-o">
                <span class="sign-o">O</span>
              </label>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-form-label-sm col-12">Сложность:</label>
          <div class="col-12">
            <select name="difficulty" class="form-control" v-model="difficulty">
              <option value="easy">Легко</option>
              <option value="hard">Сложно</option>
            </select>
          </div>
        </div>
        <div class="form-group text-center">
          <input type="button" class="btn btn-sm btn-primary" value="Начать игру" @click="submit"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import PlayerService from '../services/PlayerService'
import GameService from '../services/GameService'
import router from '../router/router'

export default {
  name: 'SelectParameters',
  data () {
    return {
      sign: '',
      difficulty: ''
    }
  },
  methods: {
    async submit () {
      await PlayerService.saveSign(this.sign)
      await GameService.create(this.difficulty)
      await router.push('show_game')
    }
  }
}
</script>

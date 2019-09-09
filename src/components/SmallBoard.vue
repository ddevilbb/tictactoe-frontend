<template>
    <div class="small-tic-board-wrapper">
        <div class="row small-tic-board">
            <div class="col-4 tic-cell"
                 v-bind:class="{
                 'tic-turn-x': value === 'x',
                 'tic-turn-o': value === 'o'
                 }"
                 v-for="(value, index) in this.board"
                 v-bind:key="index"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SmallBoard',
  props: [
    'board'
  ]
}
</script>

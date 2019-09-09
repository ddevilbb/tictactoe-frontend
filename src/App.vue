<template>
  <div id="app">
    <div class="border-bottom">
      <div class="container">
        <div class="navbar navbar-expand flex-column flex-md-row bd-navbar">
          <router-link to="/" class="navbar-brand mr-0 mr-md-2 logo"></router-link>
          <nav class="navbar-nav-scroll" role="navigation">
            <ul class="navbar-nav bd-navbar-nav flex-row">
              <li class="nav-item">
                <router-link to="select_parameters" class="nav-link">Новая игра</router-link>
              </li>
              <li class="nav-item" v-if="this.$route.name === 'show_game' && this.$store.getters.isLoggedIn">
                <router-link to="new_game" class="nav-link">Новая партия</router-link>
              </li>
              <li class="nav-item" v-if="this.$store.getters.isLoggedIn">
                <router-link to="#0" class="nav-link history-link" v-on:click.native="showModal">История игр</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <router-view/>
    <history-modal @close="closeModal"/>
  </div>
</template>

<script>
import HistoryModal from './components/HistoryModal'
export default {
  components: { HistoryModal },
  methods: {
    showModal () {
      this.$bvModal.show('historyModal')
    },
    closeModal () {
      this.$bvModal.hide('historyModal')
    }
  }
}
</script>

<style lang="scss">
  // Fonts
  @import url('https://fonts.googleapis.com/css?family=Nunito');

  // Bootstrap
  @import '~bootstrap/scss/bootstrap';
  @import "~bootstrap-vue/src/index";

  // Elements
  @import "assets/scss/elements";
</style>

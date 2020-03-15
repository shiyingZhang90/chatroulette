<template>
  <div id="app">
    <app-header></app-header>
    <app-container></app-container>
  </div>
</template>

<script>
import AppHeader from '../components/Header'
import AppContainer from '../components/Container'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppContainer
  }
}
</script>

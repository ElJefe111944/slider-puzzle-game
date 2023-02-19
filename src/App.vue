<template>
<h1>hello world</h1>
<Puzzles @puzzle-changed="selectedPuzzleID = $event"/>
</template>

<script>
import Puzzles from './components/Puzzles.vue';

export default {
  name: 'App',
  components: {
    Puzzles
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

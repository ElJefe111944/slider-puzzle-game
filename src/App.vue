<template>
<div>
  <Puzzles @puzzle-changed="selectedPuzzleID = $event"/>
  <Records />
  <SliderPuzzle :puzzleId="selectedPuzzleID" />
</div>
</template>

<script>
import SliderPuzzle  from './components/SliderPuzzle.vue';
import Puzzles from './components/Puzzles.vue';
import Records from './components/Records.vue';

export default {
  name: 'App',
  components: {
    Puzzles,
    SliderPuzzle,
    Records,
  },
  data(){
    return {
      // default puzzle
      selectedPuzzleID: "cut-easy"
    }
  }
}
</script>

<style>
/*-- Default styles --*/
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/*-- Button styles --*/
button {
  padding: 8px 10px;
  width: 125px;
  background-color: #2c3e50;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>

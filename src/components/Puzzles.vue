<template>
    <div class="options-container">
        <h1>Select a Puzzle</h1>
        <div v-for="p of puzzles" :key="p.id" class="row">
            <div>
                <img :src="require(`../assets/${p.image}`)" >
            </div>
            <div>
                <h2>{{ p.title }}</h2>
            </div>
            <div class="play-buttom">
                <button @click="selectPuzzle(p)">Play</button>
            </div>
        </div>
    </div>    
</template>

<script>

export default {
    name: "Puzzle-component",
    data(){
        return {
            // reactive properties
            // array object containing puzzlie id, image & title
            puzzles: [
                {
                    id: "cut-easy",
                    image: "easy.jpg",
                    title: "Easy"
                }, {
                    id: "cut-medium",
                    image: "medium.jpg",
                    title: "Medium"
                }, {
                    id: "cut-hard",
                    image: "hard.jpg",
                    title: "Hard"
                }
            ]
        }
    },
    methods: {
        // on click will set the choice of puzzle by user
        // puzzzle-chage event will be emited
        selectPuzzle(puzzle){
            // puzzle-changed - name of event
            // puzzle.id - payload
            this.$emit('puzzle-changed', puzzle.id)
        }
    }
}

</script>

<style scoped>
.row {
    display: flex;
    max-width: 90vw;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: auto;
}
.row img {
    width: 300px;
    height: auto;
}

.row .play-button {
    padding-top: 25px;
}
.play-buttom {
    display: flex;
    align-items: center;
}
@media(max-width: 768px){
    .row img {
    width: 100px;
    height: auto;
}
}

</style>
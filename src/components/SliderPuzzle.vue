<template>
    <div>
        <h1>Swap the Images to Win</h1>
        <button @click="start" id="start-button">Start Game</button>
        <button @click="stop" id="stop-button">Quit</button>
        <!-- Timer -->
        <p>Elapsed Time: {{ elapsedTime }}</p>
        <!-- Winning message -->
        <h1 v-if="isWinning">You Have Won!!</h1>
        <!-- Shuffled puzzle -->
        <div class="row">
            <!-- Idividual image slice -->
            <div class="column" v-for="(s, index) of shuffledPuzzleArray" :key="s" @click="swap(index)">
                <img :src="require(`../assets/${puzzleId}/${s}`)">
            </div>
        </div>
    </div>
</template>

<script>
// import moment library
import moment from "moment";

// correct order of array of puzzle images
// to be compared with user's ordered array of puzzle images
const correctPuzzleArray = [
    "image_part_001.jpg",
    "image_part_002.jpg",
    "image_part_003.jpg",
    "image_part_004.jpg",
    "image_part_005.jpg",
    "image_part_006.jpg",
    "image_part_007.jpg",
    "image_part_008.jpg",
    "image_part_009.jpg",
];

export default {
    name: "SliderPuzzle",
    props: {
        // puzzle selected by user to be played 
        puzzleId: {
            type: String,
            default: "cut-easy",
        },
    },
    data() {
        return {
            // reative properties
            correctPuzzleArray,
            // shuffled array is a copy of the correct array
            shuffledPuzzleArray: [...correctPuzzleArray].sort(
                // randon sort 
                () => Math.random() - 0.5
            ),
            // store images selected by user
            // must be a max of two
            indexesToSwap: [],
            timer: undefined,
            startDateTime: new Date(),
            currentDateTime: new Date(),
        };
    },
    computed: {
        isWinning() {
            // compares correct array to shuffled array
            for (let i = 0; i < correctPuzzleArray.length; i++) {
                // if order does NOT match
                if (correctPuzzleArray[i] !== this.shuffledPuzzleArray[i]) {
                    // games continues
                    return false;
                }
            }
            // if order DOES match
            // User wins
            return true; // isWinning message 
        },
        elapsedDiff() {
            const currentDateTime = moment(this.currentDateTime);
            const startDateTime = moment(this.startDateTime);
            // time taken for completion
            return currentDateTime.diff(startDateTime);

        },
        elapsedTime() {
            // display in human readable format 
            return moment.utc(this.elapsedDiff).format('HH:mm:ss');
        }
    },
    methods: {
        // method to enable user to swap thwo images that have been added to indexesToSwap array
        swap(index) {
            // check if timer is running
            if (!this.timer) {
                return;
            }
            // only push to indexesToSwap if less than 2 items in array
            if (this.indexesToSwap.length < 2) {
                this.indexesToSwap.push(index);
            }
            // swap the order of two indexes slected by user
            if (this.indexesToSwap.length === 2) {
                // destructure indexesToswap
                const [index1, index2] = this.indexesToSwap;
                // reverse order of indexes in array
                [this.shuffledPuzzleArray[index1], this.shuffledPuzzleArray[index2]] = [
                    this.shuffledPuzzleArray[index2],
                    this.shuffledPuzzleArray[index1]
                ];
                // empty indexesToSwap array so more items can be swapped
                this.indexesToSwap = [];
            }
        },
        // method to start the tiimer once the start button is clicked
        // slides are also re-shuffled 
        start() {
            // reset timer 
            this.resetTime();
            //re-shuffle
            this.shuffledPuzzleArray = [...correctPuzzleArray].sort(
                () => Math.random() - 0.5
            );
            // empty indexesToSwap array
            // allowing user to reselect items to be swapped
            this.indexesToSwap = [];
            // start timer 
            this.timer = setInterval(() => {
                this.currentDateTime = new Date();
                // stop timer if user has won
                if (this.isWinning) {
                    // record time
                    this.recordSpeedRecords();
                    this.stop();
                }
            }, 1000);
        },
        // rest timer once game has finished
        stop() {
            this.resetTime();
            clearInterval(this.timer);
        },
        // method to reset timer - on click
        resetTime() {
            this.startDateTime = new Date();
            this.currentDateTime = new Date();
        },
        // calculate score based on timing
        recordSpeedRecords() {
            // get times from local storage or return an empty array 
            let records = JSON.parse(localStorage.getItem("records")) || [];
            const { elapsedTime, elapsedDiff } = this;
            // push times to records array
            records.push({ elapsedTime, elapsedDiff });
            // sort from fastest to slowest
            // top 10 will be recorded
            const sortedRecords = records.sort((a, b) => a.elapsedDiff - b.elapsedDiff).slice(0, 10);
            // convert to a string to add to local stoarge 
            const stringifiedRecords = JSON.stringify(sortedRecords);
            // add to local storage - Tile: records, payload: stringfiedRecords
            localStorage.setItem('records', stringifiedRecords);
        },
    },
};

</script>

<style scoped>
.row {
    display: flex;
    max-width: 70vw;
    flex-wrap: wrap;
    margin: auto;
    margin-bottom: 60px;
}
.column {
    flex-grow: 1;
    width: 33%;
}
.column img {
    max-width: 100%;
    height: 100%;
}
@media(max-width: 768px){
    .row[data-v-4a1f852f] {
    display: flex;
    max-width: 90vw;
    max-height: 90vh;
    flex-wrap: wrap;
    margin: auto;
    margin-bottom: 60px;
}
}

</style>
<template>
    
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
    data(){
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
        isWinning(){
            // compares correct array to shuffled array
            for (let i = 0; i < correctPuzzleArray.length; i++){
                // if order does NOT match
                if(correctPuzzleArray[i] !== this.shuffledPuzzleArray[i]){
                    // games continues
                    return false;
                }
                // if order DOES match
                // User wins
                return true; // isWinning message 
            }
        },
        elapsedDiff(){
            const currentDateTime = moment(this.currentDateTime);
            const startDateTime = moment(this.startDateTime);
            // time taken for completion
            return currentDateTime.diff(startDateTime);
            
        },
        elapsedTime(){
            // ndisplay in human readable format 
            return moment.utc(this.elapsedDiff().format('HH:mm:SS'));
        }
    },
    methods: {
        // method to enable user to swap thwo images that have been added to indexesToSwap array
        swap(index){
            // check if timer is running
            if(!this.timer){
                return;
            }
            // only push to indexesToSwap if less than 2 items in array
            if(this.indexesToSwap.length < 2){
                this.indexesToSwap.push(index);
            }
            // swap the order of two indexes slected by user
            if(this.indexesToSwap.length === 2){
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
        }
    }

}

</script>

<style scoped>

</style>
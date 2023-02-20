import { mount } from "@vue/test-utils";
import Puzzles from "@/components/Puzzles.vue";

// testing for Puzzles.vue component

describe("Puzzles.vue", () => {

    // test 1 - when play btn is clicked, puzzle-changed event is emitted
    it('emit puzzle-changed event when Play button is clicked', () => {
        const wrapper = mount(Puzzles)
        wrapper.find('.play-button button').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('puzzle-changed');
    })

    // test 2 - when play btn is clicked, payload is puzzleId
    it('emit puzzle-changed event with the puzzle ID when  Play button is clicked', () => {
        const wrapper = mount(Puzzles)
        wrapper.find('.play-button button').trigger('click');
        const puzzleChanged = wrapper.emitted('puzzle-changed');
        // wrapper.rm.puzzles - reactive properties of Puzzles component
        expect(puzzleChanged[0]).toEqual([wrapper.vm.puzzles[0].id]);
    })


})
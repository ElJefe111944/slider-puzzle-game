import { mount } from "@vue/test-utils";
import SliderPuzzle from "@/components/SliderPuzzle.vue";
import "jest-localstorage-mock"
jest.useFakeTimers();

// testing for SliderPuzzle.vue component

describe("SliderPuzzle.vue", () => {

    // test 1 
    // swap function is called so that indexesToSwap reactive property has the
    // the index of the first image when the user clicks on an image.
    it('insert the index of the image to swap when we click on the image', () => {
        const wrapper = mount(SliderPuzzle)
        wrapper.find('#start-button').trigger('click');
        wrapper.find('img').trigger('click');
        // if greater than zero, we know that an indexes has been added
        expect(wrapper.vm.indexesToSwap.length).toBeGreaterThan(0)
    })

    // test 2
    // verify that when two images are added to indexesToSwap array
    // the indexes for each image are swapped around, i.e the position of the image
    it('swaps the image order when 2 images are clicked', () => {
        const wrapper = mount(SliderPuzzle)
        wrapper.find('#start-button').trigger('click');
        const [firstImage, secondImage] = wrapper.vm.shuffledPuzzleArray;
        wrapper.get('.column:nth-child(1) img').trigger('click');
        wrapper.get('.column:nth-child(2) img').trigger('click');
        // check has zero length arfetr swap
        expect(wrapper.vm.indexesToSwap.length).toBe(0);
        // compare items from wrapper against reactive property shuffledPuzzleArray
        const [newFirstImage, newSecondImage] = wrapper.vm.shuffledPuzzleArray;
        expect(firstImage).toBe(newSecondImage);
        expect(secondImage).toBe(newFirstImage);
    })

    // test 3
    // verify that the localstorage.set item is being called 
    it('records stored in local storage', () => {
        // override components original reactive properties currentDateTime & startDateTime
        const wrapper = mount(SliderPuzzle, {
            data(){
                return {
                    currentDateTime: new Date(),
                    startDateTime: new Date()
                }
            }
        })
        // call recordSpeedRecods method
        wrapper.vm.recordSpeedRecords();
        const { elapsedDiff, elapsedTime } = wrapper.vm;
        const stringifiedRecords = JSON.stringify([{elapsedTime, elapsedDiff}])
        expect(localStorage.setItem).toHaveBeenCalledWith('records', stringifiedRecords);
    })

    // test 4
    //  verify that the elapsedTime computed property in displaying correctlu
    it('shows the elapsed time', () => {
        const wrapper = mount(SliderPuzzle, {
            data(){
                return {
                    currentDateTime: new Date (2020, 0, 1, 0, 0, 1),
                    startDateTime: new Date (2020, 0, 1, 0, 0, 0),
                }
            }
        });
        // call wrapper html method to return the rendered html
        // in the wrapper component and check the elaspedTime is included
        expect(wrapper.html()).toContain('00:00:01')
    })

    // clear mocks after each test
    afterEach(() => {
        jest.clearAllMocks();
    })

})
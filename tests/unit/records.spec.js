import { mount, shallowMount } from "@vue/test-utils";
import "jest-localstorage-mock"
import Records from "@/components/Records.vue";

// testing for Records.vue component

describe("Records.vue", () => {

    // test 1 - if localstorage is called with the 'records' arguement
    it('gets records from localstorage', () => {
        shallowMount(Records, {})
        expect(localStorage.getItem).toHaveBeenCalledWith('records');
    })
})
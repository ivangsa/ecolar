/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config';
import HouseHoldDetailComponent from '@/entities/house-hold/house-hold-details.vue';
import HouseHoldClass from '@/entities/house-hold/house-hold-details.component';
import HouseHoldService from '@/entities/house-hold/house-hold.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

jest.mock('axios', () => ({
    get: jest.fn()
}));

describe('Component Tests', () => {
    describe('HouseHold Management Detail Component', () => {
        let wrapper: Wrapper<HouseHoldClass>;
        let comp: HouseHoldClass;

        beforeEach(() => {
            mockedAxios.get.mockReset();
            mockedAxios.get.mockReturnValue(Promise.resolve({}));

            wrapper = shallowMount<HouseHoldClass>(HouseHoldDetailComponent, {
                store,
                i18n,
                localVue,
                provide: { houseHoldService: () => new HouseHoldService() }
            });
            comp = wrapper.vm;
        });

        describe('OnInit', async () => {
            it('Should call load all on init', async () => {
                // GIVEN
                mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: '123' } }));

                // WHEN
                comp.retrieveHouseHold('123');
                await comp.$nextTick();

                // THEN
                expect(comp.houseHold).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});

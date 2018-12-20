/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config';
import MovementDetailComponent from '@/entities/movement/movement-details.vue';
import MovementClass from '@/entities/movement/movement-details.component';
import MovementService from '@/entities/movement/movement.service';

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
    describe('Movement Management Detail Component', () => {
        let wrapper: Wrapper<MovementClass>;
        let comp: MovementClass;

        beforeEach(() => {
            mockedAxios.get.mockReset();
            mockedAxios.get.mockReturnValue(Promise.resolve({}));

            wrapper = shallowMount<MovementClass>(MovementDetailComponent, {
                store,
                i18n,
                localVue,
                provide: { movementService: () => new MovementService() }
            });
            comp = wrapper.vm;
        });

        describe('OnInit', async () => {
            it('Should call load all on init', async () => {
                // GIVEN
                mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: '123' } }));

                // WHEN
                comp.retrieveMovement('123');
                await comp.$nextTick();

                // THEN
                expect(comp.movement).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});

/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config';
import MovementLineDetailComponent from '@/entities/movement-line/movement-line-details.vue';
import MovementLineClass from '@/entities/movement-line/movement-line-details.component';
import MovementLineService from '@/entities/movement-line/movement-line.service';

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
    describe('MovementLine Management Detail Component', () => {
        let wrapper: Wrapper<MovementLineClass>;
        let comp: MovementLineClass;

        beforeEach(() => {
            mockedAxios.get.mockReset();
            mockedAxios.get.mockReturnValue(Promise.resolve({}));

            wrapper = shallowMount<MovementLineClass>(MovementLineDetailComponent, {
                store,
                i18n,
                localVue,
                provide: { movementLineService: () => new MovementLineService() }
            });
            comp = wrapper.vm;
        });

        describe('OnInit', async () => {
            it('Should call load all on init', async () => {
                // GIVEN
                mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: '123' } }));

                // WHEN
                comp.retrieveMovementLine('123');
                await comp.$nextTick();

                // THEN
                expect(comp.movementLine).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});

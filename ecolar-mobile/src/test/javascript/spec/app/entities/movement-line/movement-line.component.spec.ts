/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import MovementLineComponent from '@/entities/movement-line/movement-line.vue';
import MovementLineClass from '@/entities/movement-line/movement-line.component';
import MovementLineService from '@/entities/movement-line/movement-line.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

jest.mock('axios', () => ({
    get: jest.fn(),
    delete: jest.fn()
}));

describe('Component Tests', () => {
    describe('MovementLine Management Component', () => {
        let wrapper: Wrapper<MovementLineClass>;
        let comp: MovementLineClass;

        beforeEach(() => {
            mockedAxios.get.mockReset();
            mockedAxios.get.mockReturnValue(Promise.resolve({}));

            wrapper = shallowMount<MovementLineClass>(MovementLineComponent, {
                store,
                i18n,
                localVue,
                stubs: { bModal: true },
                provide: { movementLineService: () => new MovementLineService() }
            });
            comp = wrapper.vm;
        });

        it('should be a Vue instance', () => {
            expect(wrapper.isVueInstance()).toBeTruthy();
        });

        it('Should call load all on init', async () => {
            // GIVEN
            mockedAxios.get.mockReturnValue(Promise.resolve({ data: [{ id: '123' }] }));

            // WHEN
            comp.retrieveAllMovementLines();
            await comp.$nextTick();

            // THEN
            expect(mockedAxios.get).toHaveBeenCalled();
            expect(comp.movementLines[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });

        it('Should call delete service on confirmDelete', async () => {
            // GIVEN
            mockedAxios.delete.mockReturnValue(Promise.resolve({}));
            mockedAxios.get.mockReturnValue(Promise.resolve({}));

            // WHEN
            comp.prepareRemove({ id: 'test' });
            comp.removeMovementLine();
            await comp.$nextTick();

            // THEN
            expect(mockedAxios.delete).toHaveBeenCalled();
            expect(mockedAxios.get).toHaveBeenCalled();
        });
    });
});

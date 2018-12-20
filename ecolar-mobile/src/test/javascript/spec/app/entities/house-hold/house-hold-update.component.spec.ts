/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';
import Router from 'vue-router';

import * as config from '@/shared/config';
import HouseHoldUpdateComponent from '@/entities/house-hold/house-hold-update.vue';
import HouseHoldClass from '@/entities/house-hold/house-hold-update.component';
import HouseHoldService from '@/entities/house-hold/house-hold.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

jest.mock('axios', () => ({
    post: jest.fn(),
    put: jest.fn()
}));

describe('Component Tests', () => {
    describe('HouseHold Management Update Component', () => {
        let wrapper: Wrapper<HouseHoldClass>;
        let comp: HouseHoldClass;

        beforeEach(() => {
            mockedAxios.post.mockReturnValue(Promise.resolve());
            mockedAxios.put.mockReturnValue(Promise.resolve());

            wrapper = shallowMount<HouseHoldClass>(HouseHoldUpdateComponent, {
                store,
                i18n,
                localVue,
                router,
                provide: { houseHoldService: () => new HouseHoldService() }
            });
            comp = wrapper.vm;
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', async () => {
                // GIVEN
                const entity = { id: '123' };
                comp.houseHold = entity;
                mockedAxios.put.mockReturnValue(Promise.resolve({ data: {} }));

                // WHEN
                comp.save();
                await comp.$nextTick();

                // THEN
                expect(mockedAxios.put).toHaveBeenCalledWith('api/house-holds', entity);
                expect(comp.isSaving).toEqual(false);
            });

            it('Should call create service on save for new entity', async () => {
                // GIVEN
                const entity = {};
                comp.houseHold = entity;
                mockedAxios.post.mockReturnValue(Promise.resolve({ data: {} }));

                // WHEN
                comp.save();
                await comp.$nextTick();

                // THEN
                expect(mockedAxios.post).toHaveBeenCalledWith('api/house-holds', entity);
                expect(comp.isSaving).toEqual(false);
            });
        });
    });
});

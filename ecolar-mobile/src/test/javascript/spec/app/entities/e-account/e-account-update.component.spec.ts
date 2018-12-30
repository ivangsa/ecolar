/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import EAccountUpdateComponent from '@/entities/e-account/e-account-update.vue';
import EAccountClass from '@/entities/e-account/e-account-update.component';
import EAccountService from '@/entities/e-account/e-account.service';

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
    describe('EAccount Management Update Component', () => {
        let wrapper: Wrapper<EAccountClass>;
        let comp: EAccountClass;

        beforeEach(() => {
            mockedAxios.post.mockReturnValue(Promise.resolve());
            mockedAxios.put.mockReturnValue(Promise.resolve());

            wrapper = shallowMount<EAccountClass>(EAccountUpdateComponent, {
                store,
                i18n,
                localVue,
                router,
                provide: { eAccountService: () => new EAccountService() }
            });
            comp = wrapper.vm;
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', async () => {
                // GIVEN
                const entity = { id: '123' };
                comp.eAccount = entity;
                mockedAxios.put.mockReturnValue(Promise.resolve({ data: {} }));

                // WHEN
                comp.save();
                await comp.$nextTick();

                // THEN
                expect(mockedAxios.put).toHaveBeenCalledWith('api/e-accounts', entity);
                expect(comp.isSaving).toEqual(false);
            });

            it('Should call create service on save for new entity', async () => {
                // GIVEN
                const entity = {};
                comp.eAccount = entity;
                mockedAxios.post.mockReturnValue(Promise.resolve({ data: {} }));

                // WHEN
                comp.save();
                await comp.$nextTick();

                // THEN
                expect(mockedAxios.post).toHaveBeenCalledWith('api/e-accounts', entity);
                expect(comp.isSaving).toEqual(false);
            });
        });
    });
});

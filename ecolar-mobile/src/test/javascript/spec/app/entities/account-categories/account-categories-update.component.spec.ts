/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';
import Router from 'vue-router';

import * as config from '@/shared/config';
import AccountCategoriesUpdateComponent from '@/entities/account-categories/account-categories-update.vue';
import AccountCategoriesClass from '@/entities/account-categories/account-categories-update.component';
import AccountCategoriesService from '@/entities/account-categories/account-categories.service';

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
    describe('AccountCategories Management Update Component', () => {
        let wrapper: Wrapper<AccountCategoriesClass>;
        let comp: AccountCategoriesClass;

        beforeEach(() => {
            mockedAxios.post.mockReturnValue(Promise.resolve());
            mockedAxios.put.mockReturnValue(Promise.resolve());

            wrapper = shallowMount<AccountCategoriesClass>(AccountCategoriesUpdateComponent, {
                store,
                i18n,
                localVue,
                router,
                provide: { accountCategoriesService: () => new AccountCategoriesService() }
            });
            comp = wrapper.vm;
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', async () => {
                // GIVEN
                const entity = { id: '123' };
                comp.accountCategories = entity;
                mockedAxios.put.mockReturnValue(Promise.resolve({ data: {} }));

                // WHEN
                comp.save();
                await comp.$nextTick();

                // THEN
                expect(mockedAxios.put).toHaveBeenCalledWith('api/account-categories', entity);
                expect(comp.isSaving).toEqual(false);
            });

            it('Should call create service on save for new entity', async () => {
                // GIVEN
                const entity = {};
                comp.accountCategories = entity;
                mockedAxios.post.mockReturnValue(Promise.resolve({ data: {} }));

                // WHEN
                comp.save();
                await comp.$nextTick();

                // THEN
                expect(mockedAxios.post).toHaveBeenCalledWith('api/account-categories', entity);
                expect(comp.isSaving).toEqual(false);
            });
        });
    });
});

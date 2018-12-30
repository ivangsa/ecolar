/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import AccountCategoriesDetailComponent from '@/entities/account-categories/account-categories-details.vue';
import AccountCategoriesClass from '@/entities/account-categories/account-categories-details.component';
import AccountCategoriesService from '@/entities/account-categories/account-categories.service';

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
    describe('AccountCategories Management Detail Component', () => {
        let wrapper: Wrapper<AccountCategoriesClass>;
        let comp: AccountCategoriesClass;

        beforeEach(() => {
            mockedAxios.get.mockReset();
            mockedAxios.get.mockReturnValue(Promise.resolve({}));

            wrapper = shallowMount<AccountCategoriesClass>(AccountCategoriesDetailComponent, {
                store,
                i18n,
                localVue,
                provide: { accountCategoriesService: () => new AccountCategoriesService() }
            });
            comp = wrapper.vm;
        });

        describe('OnInit', async () => {
            it('Should call load all on init', async () => {
                // GIVEN
                mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: '123' } }));

                // WHEN
                comp.retrieveAccountCategories('123');
                await comp.$nextTick();

                // THEN
                expect(comp.accountCategories).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});

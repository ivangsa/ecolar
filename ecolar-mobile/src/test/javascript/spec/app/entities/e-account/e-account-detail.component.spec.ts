/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import EAccountDetailComponent from '@/entities/e-account/e-account-details.vue';
import EAccountClass from '@/entities/e-account/e-account-details.component';
import EAccountService from '@/entities/e-account/e-account.service';

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
    describe('EAccount Management Detail Component', () => {
        let wrapper: Wrapper<EAccountClass>;
        let comp: EAccountClass;

        beforeEach(() => {
            mockedAxios.get.mockReset();
            mockedAxios.get.mockReturnValue(Promise.resolve({}));

            wrapper = shallowMount<EAccountClass>(EAccountDetailComponent, {
                store,
                i18n,
                localVue,
                provide: { eAccountService: () => new EAccountService() }
            });
            comp = wrapper.vm;
        });

        describe('OnInit', async () => {
            it('Should call load all on init', async () => {
                // GIVEN
                mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: '123' } }));

                // WHEN
                comp.retrieveEAccount('123');
                await comp.$nextTick();

                // THEN
                expect(comp.eAccount).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});

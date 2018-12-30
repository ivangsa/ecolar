/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import UserPreferencesDetailComponent from '@/entities/user-preferences/user-preferences-details.vue';
import UserPreferencesClass from '@/entities/user-preferences/user-preferences-details.component';
import UserPreferencesService from '@/entities/user-preferences/user-preferences.service';

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
    describe('UserPreferences Management Detail Component', () => {
        let wrapper: Wrapper<UserPreferencesClass>;
        let comp: UserPreferencesClass;

        beforeEach(() => {
            mockedAxios.get.mockReset();
            mockedAxios.get.mockReturnValue(Promise.resolve({}));

            wrapper = shallowMount<UserPreferencesClass>(UserPreferencesDetailComponent, {
                store,
                i18n,
                localVue,
                provide: { userPreferencesService: () => new UserPreferencesService() }
            });
            comp = wrapper.vm;
        });

        describe('OnInit', async () => {
            it('Should call load all on init', async () => {
                // GIVEN
                mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: '123' } }));

                // WHEN
                comp.retrieveUserPreferences('123');
                await comp.$nextTick();

                // THEN
                expect(comp.userPreferences).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});

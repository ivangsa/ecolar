/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config';
import UserPreferencesComponent from '@/entities/user-preferences/user-preferences.vue';
import UserPreferencesClass from '@/entities/user-preferences/user-preferences.component';
import UserPreferencesService from '@/entities/user-preferences/user-preferences.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-btn', {});
localVue.component('router-link', {});

jest.mock('axios', () => ({
    get: jest.fn(),
    delete: jest.fn()
}));

describe('Component Tests', () => {
    describe('UserPreferences Management Component', () => {
        let wrapper: Wrapper<UserPreferencesClass>;
        let comp: UserPreferencesClass;

        beforeEach(() => {
            mockedAxios.get.mockReset();
            mockedAxios.get.mockReturnValue(Promise.resolve({}));

            wrapper = shallowMount<UserPreferencesClass>(UserPreferencesComponent, {
                store,
                i18n,
                localVue,
                stubs: { bModal: true },
                provide: { userPreferencesService: () => new UserPreferencesService() }
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
            comp.retrieveAllUserPreferencess();
            await comp.$nextTick();

            // THEN
            expect(mockedAxios.get).toHaveBeenCalled();
            expect(comp.userPreferences[0]).toEqual(jasmine.objectContaining({ id: '123' }));
        });

        it('Should call delete service on confirmDelete', async () => {
            // GIVEN
            mockedAxios.delete.mockReturnValue(Promise.resolve({}));
            mockedAxios.get.mockReturnValue(Promise.resolve({}));

            // WHEN
            comp.prepareRemove({ id: 'test' });
            comp.removeUserPreferences();
            await comp.$nextTick();

            // THEN
            expect(mockedAxios.delete).toHaveBeenCalled();
            expect(mockedAxios.get).toHaveBeenCalled();
        });
    });
});

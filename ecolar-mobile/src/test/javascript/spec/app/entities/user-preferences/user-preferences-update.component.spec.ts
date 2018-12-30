/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import UserPreferencesUpdateComponent from '@/entities/user-preferences/user-preferences-update.vue';
import UserPreferencesClass from '@/entities/user-preferences/user-preferences-update.component';
import UserPreferencesService from '@/entities/user-preferences/user-preferences.service';

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
    describe('UserPreferences Management Update Component', () => {
        let wrapper: Wrapper<UserPreferencesClass>;
        let comp: UserPreferencesClass;

        beforeEach(() => {
            mockedAxios.post.mockReturnValue(Promise.resolve());
            mockedAxios.put.mockReturnValue(Promise.resolve());

            wrapper = shallowMount<UserPreferencesClass>(UserPreferencesUpdateComponent, {
                store,
                i18n,
                localVue,
                router,
                provide: { userPreferencesService: () => new UserPreferencesService() }
            });
            comp = wrapper.vm;
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', async () => {
                // GIVEN
                const entity = { id: '123' };
                comp.userPreferences = entity;
                mockedAxios.put.mockReturnValue(Promise.resolve({ data: {} }));

                // WHEN
                comp.save();
                await comp.$nextTick();

                // THEN
                expect(mockedAxios.put).toHaveBeenCalledWith('api/user-preferences', entity);
                expect(comp.isSaving).toEqual(false);
            });

            it('Should call create service on save for new entity', async () => {
                // GIVEN
                const entity = {};
                comp.userPreferences = entity;
                mockedAxios.post.mockReturnValue(Promise.resolve({ data: {} }));

                // WHEN
                comp.save();
                await comp.$nextTick();

                // THEN
                expect(mockedAxios.post).toHaveBeenCalledWith('api/user-preferences', entity);
                expect(comp.isSaving).toEqual(false);
            });
        });
    });
});

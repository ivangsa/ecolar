/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';
import Router from 'vue-router';

import * as config from '@/shared/config/config';
import CategoryUpdateComponent from '@/entities/category/category-update.vue';
import CategoryClass from '@/entities/category/category-update.component';
import CategoryService from '@/entities/category/category.service';

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
    describe('Category Management Update Component', () => {
        let wrapper: Wrapper<CategoryClass>;
        let comp: CategoryClass;

        beforeEach(() => {
            mockedAxios.post.mockReturnValue(Promise.resolve());
            mockedAxios.put.mockReturnValue(Promise.resolve());

            wrapper = shallowMount<CategoryClass>(CategoryUpdateComponent, {
                store,
                i18n,
                localVue,
                router,
                provide: { categoryService: () => new CategoryService() }
            });
            comp = wrapper.vm;
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', async () => {
                // GIVEN
                const entity = { id: '123' };
                comp.category = entity;
                mockedAxios.put.mockReturnValue(Promise.resolve({ data: {} }));

                // WHEN
                comp.save();
                await comp.$nextTick();

                // THEN
                expect(mockedAxios.put).toHaveBeenCalledWith('api/categories', entity);
                expect(comp.isSaving).toEqual(false);
            });

            it('Should call create service on save for new entity', async () => {
                // GIVEN
                const entity = {};
                comp.category = entity;
                mockedAxios.post.mockReturnValue(Promise.resolve({ data: {} }));

                // WHEN
                comp.save();
                await comp.$nextTick();

                // THEN
                expect(mockedAxios.post).toHaveBeenCalledWith('api/categories', entity);
                expect(comp.isSaving).toEqual(false);
            });
        });
    });
});

/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import CategoryDetailComponent from '@/entities/category/category-details.vue';
import CategoryClass from '@/entities/category/category-details.component';
import CategoryService from '@/entities/category/category.service';

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
    describe('Category Management Detail Component', () => {
        let wrapper: Wrapper<CategoryClass>;
        let comp: CategoryClass;

        beforeEach(() => {
            mockedAxios.get.mockReset();
            mockedAxios.get.mockReturnValue(Promise.resolve({}));

            wrapper = shallowMount<CategoryClass>(CategoryDetailComponent, {
                store,
                i18n,
                localVue,
                provide: { categoryService: () => new CategoryService() }
            });
            comp = wrapper.vm;
        });

        describe('OnInit', async () => {
            it('Should call load all on init', async () => {
                // GIVEN
                mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: '123' } }));

                // WHEN
                comp.retrieveCategory('123');
                await comp.$nextTick();

                // THEN
                expect(comp.category).toEqual(jasmine.objectContaining({ id: '123' }));
            });
        });
    });
});

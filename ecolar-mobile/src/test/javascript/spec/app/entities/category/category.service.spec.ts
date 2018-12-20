/* tslint:disable max-line-length */
import axios from 'axios';

import * as config from '@/shared/config';
import {} from '@/shared/date/filters';
import CategoryService from '@/entities/category/category.service';
import { Category, AccountType } from '@/shared/model/category.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
}));

describe('Service Tests', () => {
    describe('Category Service', () => {
        let service: CategoryService;
        let elemDefault;
        beforeEach(() => {
            service = new CategoryService();

            elemDefault = new Category('ID', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', AccountType.ASSETS);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                mockedAxios.get.mockReturnValue(Promise.resolve(returnedFromService));

                service.find('123').then(res => {
                    expect(res).toMatchObject(elemDefault);
                });
            });

            it('should create a Category', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);

                mockedAxios.post.mockReturnValue(Promise.resolve(returnedFromService));
                service.create({}).then(res => {
                    expect(res).toMatchObject(expected);
                });
            });

            it('should update a Category', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        description: 'BBBBBB',
                        path: 'BBBBBB',
                        parentId: 'BBBBBB',
                        accountType: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                mockedAxios.put.mockReturnValue(Promise.resolve(returnedFromService));

                service.update(expected).then(res => {
                    expect(res).toMatchObject(expected);
                });
            });

            it('should return a list of Category', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        description: 'BBBBBB',
                        path: 'BBBBBB',
                        parentId: 'BBBBBB',
                        accountType: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
                service.retrieve().then(res => {
                    expect(res).toContainEqual(expected);
                });
            });

            it('should delete a Category', async () => {
                mockedAxios.delete.mockReturnValue(Promise.resolve());
                service.delete('123').then(res => {
                    expect(res.ok);
                });
            });
        });
    });
});

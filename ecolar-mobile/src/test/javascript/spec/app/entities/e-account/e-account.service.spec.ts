/* tslint:disable max-line-length */
import axios from 'axios';

import * as config from '@/shared/config/config';
import {} from '@/shared/date/filters';
import EAccountService from '@/entities/e-account/e-account.service';
import { EAccount, AccountType } from '@/shared/model/e-account.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
}));

describe('Service Tests', () => {
    describe('EAccount Service', () => {
        let service: EAccountService;
        let elemDefault;
        beforeEach(() => {
            service = new EAccountService();

            elemDefault = new EAccount('ID', 'AAAAAAA', 'AAAAAAA', AccountType.ASSETS);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

                service.find('123').then(res => {
                    expect(res).toMatchObject(elemDefault);
                });
            });

            it('should create a EAccount', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);

                mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
                service.create({}).then(res => {
                    expect(res).toMatchObject(expected);
                });
            });

            it('should update a EAccount', async () => {
                const returnedFromService = Object.assign(
                    {
                        accountCode: 'BBBBBB',
                        accountName: 'BBBBBB',
                        type: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

                service.update(expected).then(res => {
                    expect(res).toMatchObject(expected);
                });
            });

            it('should return a list of EAccount', async () => {
                const returnedFromService = Object.assign(
                    {
                        accountCode: 'BBBBBB',
                        accountName: 'BBBBBB',
                        type: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
                service.retrieve().then(res => {
                    expect(res).toContainEqual(expected);
                });
            });

            it('should delete a EAccount', async () => {
                mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
                service.delete('123').then(res => {
                    expect(res.ok);
                });
            });
        });
    });
});

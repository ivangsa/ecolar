/* tslint:disable max-line-length */
import axios from 'axios';
import format from 'date-fns/format';

import * as config from '@/shared/config/config';
import { DATE_TIME_FORMAT } from '@/shared/date/filters';
import MovementService from '@/entities/movement/movement.service';
import { Movement, AccountType } from '@/shared/model/movement.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
}));

describe('Service Tests', () => {
    describe('Movement Service', () => {
        let service: MovementService;
        let elemDefault;
        let currentDate: Date;
        beforeEach(() => {
            service = new MovementService();
            currentDate = new Date();

            elemDefault = new Movement('ID', AccountType.ASSETS, currentDate, currentDate, 0, 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        eventTime: format(currentDate, DATE_TIME_FORMAT),
                        registrationTime: format(currentDate, DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

                service.find('123').then(res => {
                    expect(res).toMatchObject(elemDefault);
                });
            });

            it('should create a Movement', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 'ID',
                        eventTime: format(currentDate, DATE_TIME_FORMAT),
                        registrationTime: format(currentDate, DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        eventTime: currentDate,
                        registrationTime: currentDate
                    },
                    returnedFromService
                );

                mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
                service.create({}).then(res => {
                    expect(res).toMatchObject(expected);
                });
            });

            it('should update a Movement', async () => {
                const returnedFromService = Object.assign(
                    {
                        type: 'BBBBBB',
                        eventTime: format(currentDate, DATE_TIME_FORMAT),
                        registrationTime: format(currentDate, DATE_TIME_FORMAT),
                        amount: 1,
                        location: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        eventTime: currentDate,
                        registrationTime: currentDate
                    },
                    returnedFromService
                );
                mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

                service.update(expected).then(res => {
                    expect(res).toMatchObject(expected);
                });
            });

            it('should return a list of Movement', async () => {
                const returnedFromService = Object.assign(
                    {
                        type: 'BBBBBB',
                        eventTime: format(currentDate, DATE_TIME_FORMAT),
                        registrationTime: format(currentDate, DATE_TIME_FORMAT),
                        amount: 1,
                        location: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        eventTime: currentDate,
                        registrationTime: currentDate
                    },
                    returnedFromService
                );
                mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
                service.retrieve().then(res => {
                    expect(res).toContainEqual(expected);
                });
            });

            it('should delete a Movement', async () => {
                mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
                service.delete('123').then(res => {
                    expect(res.ok);
                });
            });
        });
    });
});

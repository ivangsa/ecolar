/* tslint:disable max-line-length */
import axios from 'axios';

import * as config from '@/shared/config/config';
import {} from '@/shared/date/filters';
import MovementLineService from '@/entities/movement-line/movement-line.service';
import { MovementLine, LineType } from '@/shared/model/movement-line.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
}));

describe('Service Tests', () => {
    describe('MovementLine Service', () => {
        let service: MovementLineService;
        let elemDefault;
        beforeEach(() => {
            service = new MovementLineService();

            elemDefault = new MovementLine('ID', 0, LineType.CREDIT);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

                service.find('123').then(res => {
                    expect(res).toMatchObject(elemDefault);
                });
            });

            it('should create a MovementLine', async () => {
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

            it('should update a MovementLine', async () => {
                const returnedFromService = Object.assign(
                    {
                        amount: 1,
                        lineType: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

                service.update(expected).then(res => {
                    expect(res).toMatchObject(expected);
                });
            });

            it('should return a list of MovementLine', async () => {
                const returnedFromService = Object.assign(
                    {
                        amount: 1,
                        lineType: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
                service.retrieve().then(res => {
                    expect(res).toContainEqual(expected);
                });
            });

            it('should delete a MovementLine', async () => {
                mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
                service.delete('123').then(res => {
                    expect(res.ok);
                });
            });
        });
    });
});

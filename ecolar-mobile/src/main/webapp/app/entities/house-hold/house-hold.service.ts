import axios from 'axios';

import { IHouseHold } from '@/shared/model/house-hold.model';

const baseApiUrl = 'api/house-holds';

export default class HouseHoldService {
    public find(id): Promise<IHouseHold> {
        return new Promise<IHouseHold>(resolve => {
            axios.get(`${baseApiUrl}/${id}`).then(function(res) {
                resolve(res.data);
            });
        });
    }

    public retrieve(paginationQuery?: any): Promise<any> {
        return new Promise<any>(resolve => {
            axios.get(baseApiUrl).then(function(res) {
                resolve(res);
            });
        });
    }

    public delete(id): Promise<any> {
        return new Promise<any>(resolve => {
            axios.delete(`${baseApiUrl}/${id}`).then(function(res) {
                resolve(res);
            });
        });
    }

    public create(entity): Promise<IHouseHold> {
        return new Promise<IHouseHold>(resolve => {
            axios.post(`${baseApiUrl}`, entity).then(function(res) {
                resolve(res.data);
            });
        });
    }

    public update(entity): Promise<IHouseHold> {
        return new Promise<IHouseHold>(resolve => {
            axios.put(`${baseApiUrl}`, entity).then(function(res) {
                resolve(res.data);
            });
        });
    }
}

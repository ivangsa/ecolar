import axios from 'axios';

import { IEAccount } from '@/shared/model/e-account.model';

const baseApiUrl = 'api/e-accounts';

export default class EAccountService {
    public find(id): Promise<IEAccount> {
        return new Promise<IEAccount>(resolve => {
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

    public create(entity): Promise<IEAccount> {
        return new Promise<IEAccount>(resolve => {
            axios.post(`${baseApiUrl}`, entity).then(function(res) {
                resolve(res.data);
            });
        });
    }

    public update(entity): Promise<IEAccount> {
        return new Promise<IEAccount>(resolve => {
            axios.put(`${baseApiUrl}`, entity).then(function(res) {
                resolve(res.data);
            });
        });
    }
}
